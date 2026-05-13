#!/bin/bash
# ntfy.sh — push-уведомления на телефон через ntfy.sh
# Использование: вызывается из Notification и Stop hooks
# Установка: chmod +x .claude/hooks/ntfy.sh
# Конфигурация: export NTFY_TOPIC=claude-code-<your-random-suffix>

set -euo pipefail

TOPIC="${NTFY_TOPIC:-claude-code-please-set-NTFY_TOPIC}"
EVENT="${1:-event}"

INPUT=$(cat)
MESSAGE=$(echo "$INPUT" | jq -r '.message // .stop_reason // "Claude ждёт"' 2>/dev/null || echo "Claude ждёт")
CWD=$(echo "$INPUT" | jq -r '.cwd // empty' 2>/dev/null)
PROJECT=$(basename "${CWD:-$PWD}")

PRIORITY=3
[ "$EVENT" = "notification" ] && PRIORITY=4

curl -s -X POST "https://ntfy.sh/${TOPIC}" \
  -H "Title: Claude Code: ${PROJECT}" \
  -H "Priority: ${PRIORITY}" \
  -H "Tags: robot" \
  -d "${MESSAGE}" > /dev/null

exit 0
