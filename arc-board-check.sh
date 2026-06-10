#!/usr/bin/env bash
set -euo pipefail

# Azure DevOps board check for ARC.
# Designed to be copied into ~/.hermes/scripts/ and used as a Hermes cron pre-run script.

ORG="${ARC_BOARD_ORG:-https://dev.azure.com/lndigital/}"
PROJECT="${ARC_BOARD_PROJECT:-Gestion LANACION-ARC}"
AREA_PATH="${ARC_BOARD_AREA_PATH:-Gestion LANACION-ARC\\Contenidos-Web-LN}"
ASSIGNEE_EMAIL="${ARC_BOARD_ASSIGNEE_EMAIL:-mculen@lanacion.com.ar}"
ASSIGNEE_NAME="${ARC_BOARD_ASSIGNEE_NAME:-mculen}"
REPO_PATH="${ARC_REPO_PATH:-/home/mculen/Arc}"

ASSIGNED_JSON="$(mktemp)"
CHILDREN_JSON="$(mktemp)"
PARENT_IDS_FILE="$(mktemp)"
cleanup() {
  rm -f "$ASSIGNED_JSON" "$CHILDREN_JSON" "$PARENT_IDS_FILE"
}
trap cleanup EXIT

printf '=== Azure DevOps Board Check - %s ===\n\n' "$(date)"
printf 'Org: %s\nProject: %s\nArea: %s\nAssignee: %s (%s)\nRepo: %s\n\n' \
  "$ORG" "$PROJECT" "$AREA_PATH" "$ASSIGNEE_EMAIL" "$ASSIGNEE_NAME" "$REPO_PATH"
printf '%s\n\n' '[MODO AUDITORÍA] Salida = evidencia candidata para revisión. No se modifica Azure DevOps ni Google Sheets.'

if ! command -v az >/dev/null 2>&1; then
  printf 'ERROR: Azure CLI (az) is not installed or not in PATH.\n' >&2
  exit 10
fi

if ! az extension show --name azure-devops >/dev/null 2>&1; then
  printf 'ERROR: Azure DevOps extension is missing. Install with: az extension add --name azure-devops\n' >&2
  exit 11
fi

if [[ ! -d "$REPO_PATH/.git" ]]; then
  printf 'ERROR: ARC repo path is not a git repo: %s\n' "$REPO_PATH" >&2
  exit 12
fi

az boards query --org "$ORG" --project "$PROJECT" --wiql "
SELECT [System.Id], [System.Title], [System.State], [System.WorkItemType], [System.AssignedTo], [System.ChangedDate]
FROM WorkItems
WHERE [System.AreaPath] UNDER '$AREA_PATH'
AND [System.AssignedTo] = '$ASSIGNEE_EMAIL'
AND [System.State] NOT IN ('Closed', 'Finished')
ORDER BY [System.Id] ASC
" >"$ASSIGNED_JSON" 2>&1 || true

printf '%s\n' '--- Work items assigned to user (non-terminal: not Closed/Finished) ---'
python3 - "$ASSIGNED_JSON" "$PARENT_IDS_FILE" <<'PY'
import json
import sys
from pathlib import Path
raw = Path(sys.argv[1]).read_text()
ids_path = Path(sys.argv[2])
try:
    data = json.loads(raw)
except Exception as exc:
    print(f"  ERROR parsing az output: {exc}")
    print(raw)
    ids_path.write_text("")
    raise SystemExit(0)
if not data:
    print("  (no hay items pendientes asignados)")
ids = []
for item in data:
    f = item.get("fields", {})
    wi_id = f.get("System.Id", "?")
    ids.append(str(wi_id))
    title = f.get("System.Title", "?")
    state = f.get("System.State", "?")
    wi_type = f.get("System.WorkItemType", "?")
    assigned = f.get("System.AssignedTo", {})
    if isinstance(assigned, dict):
        assigned = assigned.get("uniqueName") or assigned.get("displayName") or "?"
    changed = f.get("System.ChangedDate", "?")[:10] if f.get("System.ChangedDate") else "?"
    print(f"  WI {wi_id} | {state:12s} | {wi_type:12s} | {assigned} | {title} (last change: {changed})")
ids_path.write_text(",".join(ids))
PY
PARENT_IDS="$(python3 - "$PARENT_IDS_FILE" <<'PY'
import sys
from pathlib import Path
print(Path(sys.argv[1]).read_text().strip())
PY
)"

az boards query --org "$ORG" --project "$PROJECT" --wiql "
SELECT [System.Id], [System.Title], [System.State], [System.WorkItemType], [System.AssignedTo], [System.Parent], [System.ChangedDate]
FROM WorkItems
WHERE [System.AreaPath] UNDER '$AREA_PATH'
AND [System.Title] CONTAINS 'Desarrollo:'
AND [System.State] NOT IN ('Closed', 'Finished')
ORDER BY [System.Id] ASC
" >"$CHILDREN_JSON" 2>&1 || true

printf '\n%s\n' '--- Desarrollo children whose parent is in user scope (assigned or unassigned, non-terminal) ---'
ARC_PARENT_IDS="$PARENT_IDS" python3 - "$CHILDREN_JSON" <<'PY'
import json
import os
import sys
from pathlib import Path
parent_ids = {x for x in os.environ.get("ARC_PARENT_IDS", "").split(",") if x}
raw = Path(sys.argv[1]).read_text()
try:
    data = json.loads(raw)
except Exception as exc:
    print(f"  ERROR parsing az output: {exc}")
    print(raw)
    raise SystemExit(0)
matched = []
for item in data:
    f = item.get("fields", {})
    parent = str(f.get("System.Parent", ""))
    if parent in parent_ids:
        matched.append(item)
if not matched:
    print("  (no hay Desarrollo pendientes con padre en scope)")
for item in matched:
    f = item.get("fields", {})
    wi_id = f.get("System.Id", "?")
    title = f.get("System.Title", "?")
    state = f.get("System.State", "?")
    assigned = f.get("System.AssignedTo")
    if isinstance(assigned, dict):
        assigned = assigned.get("uniqueName") or assigned.get("displayName") or "?"
    if not assigned:
        assigned = "UNASSIGNED"
    parent = f.get("System.Parent", "?")
    changed = f.get("System.ChangedDate", "?")[:10] if f.get("System.ChangedDate") else "?"
    print(f"  WI {wi_id} | {state:12s} | parent={parent} | {assigned} | {title} (last change: {changed})")
PY

printf '\n%s\n' '--- Recent git activity by assignee hint (2 weeks, all refs) ---'
git -C "$REPO_PATH" log --all --oneline --author="$ASSIGNEE_NAME\|$ASSIGNEE_EMAIL" --since="2 weeks ago" --format="%h %s" -20 || true

printf '\n%s\n' '--- Most recent remote branches ---'
git -C "$REPO_PATH" branch -r --sort=-committerdate | python3 -c 'import sys; [print(line.rstrip()) for _, line in zip(range(20), sys.stdin)]' || true

printf '\n=== End board check ===\n'
