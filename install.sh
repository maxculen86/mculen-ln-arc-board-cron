#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DRY_RUN="false"
if [[ "${1:-}" == "--dry-run" ]]; then
  DRY_RUN="true"
fi
ENV_FILE="$SCRIPT_DIR/.env"
PROMPT_TEMPLATE="$SCRIPT_DIR/cron.prompt.md"
CHECK_SCRIPT_SOURCE="$SCRIPT_DIR/arc-board-check.sh"
HERMES_SCRIPT_DIR="${HERMES_HOME:-$HOME/.hermes}/scripts"
HERMES_SCRIPT_TARGET="$HERMES_SCRIPT_DIR/arc-board-check.sh"

if [[ ! -f "$ENV_FILE" ]]; then
  printf 'ERROR: missing %s\n' "$ENV_FILE" >&2
  printf 'Create it with: cp .env.example .env\n' >&2
  exit 1
fi

set -a
# shellcheck source=/dev/null
source "$ENV_FILE"
set +a

: "${ARC_BOARD_ORG:?Missing ARC_BOARD_ORG in .env}"
: "${ARC_BOARD_PROJECT:?Missing ARC_BOARD_PROJECT in .env}"
: "${ARC_BOARD_AREA_PATH:?Missing ARC_BOARD_AREA_PATH in .env}"
: "${ARC_BOARD_ASSIGNEE_EMAIL:?Missing ARC_BOARD_ASSIGNEE_EMAIL in .env}"
: "${ARC_BOARD_ASSIGNEE_NAME:?Missing ARC_BOARD_ASSIGNEE_NAME in .env}"
: "${ARC_REPO_PATH:?Missing ARC_REPO_PATH in .env}"
: "${ARC_CRON_SCHEDULE:?Missing ARC_CRON_SCHEDULE in .env}"
: "${ARC_CRON_DELIVER:=local}"
: "${ARC_CRON_WORKDIR:=$HOME}"
: "${ARC_CRON_NAME_PREFIX:=azure-devops-board-check}"

JOB_NAME="${ARC_CRON_NAME_PREFIX}-${ARC_BOARD_ASSIGNEE_NAME}"
PROMPT_RENDERED="$(mktemp)"
cleanup() {
  rm -f "$PROMPT_RENDERED"
}
trap cleanup EXIT

if ! command -v hermes >/dev/null 2>&1; then
  printf 'ERROR: hermes CLI is not installed or not in PATH.\n' >&2
  exit 2
fi

if ! command -v az >/dev/null 2>&1; then
  printf 'ERROR: az CLI is not installed or not in PATH.\n' >&2
  exit 3
fi

if [[ ! -d "$ARC_REPO_PATH/.git" ]]; then
  printf 'ERROR: ARC_REPO_PATH is not a git repo: %s\n' "$ARC_REPO_PATH" >&2
  exit 4
fi

mkdir -p "$HERMES_SCRIPT_DIR"
cp "$CHECK_SCRIPT_SOURCE" "$HERMES_SCRIPT_TARGET"
chmod +x "$HERMES_SCRIPT_TARGET"

python3 - "$PROMPT_TEMPLATE" "$PROMPT_RENDERED" <<'PY'
import os
import sys
from pathlib import Path
src = Path(sys.argv[1])
dst = Path(sys.argv[2])
text = src.read_text()
for key, value in os.environ.items():
    text = text.replace('{{' + key + '}}', value)
dst.write_text(text)
PY

printf 'Running local check script once before creating cron...\n\n'
ARC_BOARD_ORG="$ARC_BOARD_ORG" \
ARC_BOARD_PROJECT="$ARC_BOARD_PROJECT" \
ARC_BOARD_AREA_PATH="$ARC_BOARD_AREA_PATH" \
ARC_BOARD_ASSIGNEE_EMAIL="$ARC_BOARD_ASSIGNEE_EMAIL" \
ARC_BOARD_ASSIGNEE_NAME="$ARC_BOARD_ASSIGNEE_NAME" \
ARC_REPO_PATH="$ARC_REPO_PATH" \
bash "$HERMES_SCRIPT_TARGET"

printf '\nCreating Hermes cron job: %s\n' "$JOB_NAME"
PROMPT_CONTENT="$(python3 - "$PROMPT_RENDERED" <<'PY'
import sys
from pathlib import Path
print(Path(sys.argv[1]).read_text())
PY
)"

if [[ "$DRY_RUN" == "true" ]]; then
  printf '\nDRY RUN: cron creation skipped. Command that would run:\n'
  printf 'hermes cron create %q <rendered-prompt> --name %q --deliver %q --script %q --workdir %q\n' \
    "$ARC_CRON_SCHEDULE" "$JOB_NAME" "$ARC_CRON_DELIVER" "$(basename "$HERMES_SCRIPT_TARGET")" "$ARC_CRON_WORKDIR"
  printf '\nRendered prompt validated successfully.\n'
  printf 'Dry run OK.\n'
  exit 0
fi

hermes cron create "$ARC_CRON_SCHEDULE" "$PROMPT_CONTENT" \
  --name "$JOB_NAME" \
  --deliver "$ARC_CRON_DELIVER" \
  --script "$(basename "$HERMES_SCRIPT_TARGET")" \
  --workdir "$ARC_CRON_WORKDIR"

printf '\nInstalled. Current cron jobs:\n'
hermes cron list
