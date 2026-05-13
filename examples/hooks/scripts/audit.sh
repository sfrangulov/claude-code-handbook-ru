#!/bin/bash
# audit.sh — JSONL-аудит всех действий Claude Code
# Использование: вызывается из SessionStart, UserPromptSubmit, PostToolUse, SessionEnd hooks
# Установка: chmod +x ~/.claude/hooks/audit.sh

set -euo pipefail

EVENT="${1:-unknown}"
LOG_DIR="${HOME}/.claude/audit"
mkdir -p "$LOG_DIR"
LOG_FILE="${LOG_DIR}/$(date +%Y-%m-%d).jsonl"

INPUT=$(cat)
TS=$(date -u +%Y-%m-%dT%H:%M:%SZ)

echo "$INPUT" | jq -c --arg ts "$TS" --arg event "$EVENT" \
  '{ ts: $ts, event: $event } + .' >> "$LOG_FILE"

exit 0
