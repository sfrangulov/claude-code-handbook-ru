#!/bin/bash
# pre-commit-secrets.sh — блокирует попытку Claude закоммитить секреты
# Использование: вызывается из PreToolUse hook на Bash(git commit *)
# Установка: chmod +x .claude/hooks/pre-commit-secrets.sh

set -euo pipefail

PATTERNS=(
  'AKIA[0-9A-Z]{16}'                              # AWS access key
  'sk-[A-Za-z0-9]{20,}'                           # OpenAI / Anthropic style key
  'xox[baprs]-[A-Za-z0-9-]{10,}'                  # Slack token
  'gh[pousr]_[A-Za-z0-9]{36,}'                    # GitHub PAT / token
  '-----BEGIN (RSA|EC|OPENSSH|PRIVATE) KEY-----'  # private key block
  'AIza[0-9A-Za-z_-]{35}'                         # Google API key
)

DIFF=$(git diff --cached 2>/dev/null || true)
[ -z "$DIFF" ] && exit 0

for pattern in "${PATTERNS[@]}"; do
  if echo "$DIFF" | grep -qE "$pattern"; then
    jq -n --arg p "$pattern" '{
      hookSpecificOutput: {
        hookEventName: "PreToolUse",
        permissionDecision: "deny",
        permissionDecisionReason: "Возможный секрет в staged diff (паттерн: \($p)). Удали из коммита и используй переменные окружения."
      }
    }'
    exit 0
  fi
done

exit 0
