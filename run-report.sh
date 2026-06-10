#!/usr/bin/env bash
# run-report.sh — standalone audit wrapper for arc-board-check.sh
# Runs the board check without Hermes, writes timestamped evidence to reports/.
# Usage: ./run-report.sh
# Exit codes: 0=ok, 3=.env not found, 10/11/12=passthrough from arc-board-check.sh
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# .env guard
if [[ ! -f "$SCRIPT_DIR/.env" ]]; then
  printf 'Error: .env not found. Copy .env.example to .env and fill in values.\n' >&2
  exit 3
fi

# shellcheck source=/dev/null
source "$SCRIPT_DIR/.env"

# Ensure reports directory exists
mkdir -p "${ARC_REPORT_DIR:-$SCRIPT_DIR/reports}"

REPORT_FILE="${ARC_REPORT_DIR:-$SCRIPT_DIR/reports}/board-check-$(date +%Y%m%dT%H%M%S).log"

# Run main script, tee output to log file; propagate its exit code
"$SCRIPT_DIR/arc-board-check.sh" 2>&1 | tee "$REPORT_FILE"
EXIT_CODE="${PIPESTATUS[0]}"

printf '\nReporte guardado en: %s\n' "$REPORT_FILE"
exit "$EXIT_CODE"
