# Hooks

Три рабочих hook'а — копируются в `.claude/settings.json` (репозиторий) или `~/.claude/settings.json` (глобально).

Hooks вызываются Claude Code на события жизненного цикла. Если хочется реагировать на действия агента — auto-format, security scan, push-уведомления, аудит — это правильный механизм.

Документация: [docs.claude.com/en/docs/claude-code/hooks](https://docs.claude.com/en/docs/claude-code/hooks).

---

## 1. `pre-commit-secrets` — блокирует коммит секретов

Когда Claude собирается выполнить `git commit`, hook проверяет staged diff на признаки утечки секретов (API-ключи, токены, приватные ключи). При совпадении возвращает `permissionDecision: "deny"` и прерывает действие.

### settings.json

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "if": "Bash(git commit *)",
            "command": "${CLAUDE_PROJECT_DIR}/.claude/hooks/pre-commit-secrets.sh"
          }
        ]
      }
    ]
  }
}
```

### `.claude/hooks/pre-commit-secrets.sh`

```bash
#!/bin/bash
set -euo pipefail

PATTERNS=(
  'AKIA[0-9A-Z]{16}'
  'sk-[A-Za-z0-9]{20,}'
  'xox[baprs]-[A-Za-z0-9-]{10,}'
  'gh[pousr]_[A-Za-z0-9]{36,}'
  '-----BEGIN (RSA|EC|OPENSSH|PRIVATE) KEY-----'
  'AIza[0-9A-Za-z_-]{35}'
)

DIFF=$(git diff --cached 2>/dev/null || true)
[ -z "$DIFF" ] && exit 0

for pattern in "${PATTERNS[@]}"; do
  if echo "$DIFF" | grep -qE "$pattern"; then
    jq -n --arg p "$pattern" '{
      hookSpecificOutput: {
        hookEventName: "PreToolUse",
        permissionDecision: "deny",
        permissionDecisionReason: "Возможный секрет в staged diff: \($p). Удали из коммита и используй переменные окружения."
      }
    }'
    exit 0
  fi
done

exit 0
```

Не забудь `chmod +x .claude/hooks/pre-commit-secrets.sh`.

**Когда полезно:** в любых проектах. Стоит копейки производительности, спасает от инцидента, который раз в год случается даже у опытных команд.

---

## 2. `ntfy-notifications` — push на телефон, когда нужно внимание

Claude отправляет `Notification`-событие при запросе разрешения, и `Stop` при завершении хода. Hook ловит оба и шлёт push через [ntfy.sh](https://ntfy.sh) — бесплатный сервис, работает без аккаунта, у них есть мобильное приложение.

### Подготовка

1. Установи ntfy app (iOS/Android).
2. Подпишись на уникальный topic, например `claude-code-ivan-7xK9p2`. Не используй простые имена — это публичная шина.

### settings.json

```json
{
  "hooks": {
    "Notification": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "${CLAUDE_PROJECT_DIR}/.claude/hooks/ntfy.sh notification"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "${CLAUDE_PROJECT_DIR}/.claude/hooks/ntfy.sh stop"
          }
        ]
      }
    ]
  }
}
```

### `.claude/hooks/ntfy.sh`

```bash
#!/bin/bash
set -euo pipefail

TOPIC="${NTFY_TOPIC:-claude-code-ivan-7xK9p2}"
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
```

**Когда полезно:** запустил длинную задачу, ушёл, через 8 минут пришёл пуш «нужно разрешение на rm -rf node_modules». Особенно ценно, когда работаешь параллельно над двумя проектами или используешь `claude --bg`.

---

## 3. `session-log` — аудит всех действий агента в JSONL

Логирует каждое использование инструмента, каждый промпт пользователя и старт/конец сессии в `~/.claude/audit/<date>.jsonl`. Полезно для:

- Ретроспективы: что Claude делал на прошлой неделе?
- Compliance: фиксировать действия агента в enterprise.
- Отладки промптов: что именно отправлялось и какие инструменты вызвались.

### settings.json

```json
{
  "hooks": {
    "SessionStart": [
      { "hooks": [{ "type": "command", "command": "${HOME}/.claude/hooks/audit.sh session_start" }] }
    ],
    "UserPromptSubmit": [
      { "hooks": [{ "type": "command", "command": "${HOME}/.claude/hooks/audit.sh user_prompt" }] }
    ],
    "PostToolUse": [
      {
        "matcher": "*",
        "hooks": [{ "type": "command", "command": "${HOME}/.claude/hooks/audit.sh tool_use" }]
      }
    ],
    "SessionEnd": [
      { "hooks": [{ "type": "command", "command": "${HOME}/.claude/hooks/audit.sh session_end" }] }
    ]
  }
}
```

### `~/.claude/hooks/audit.sh`

```bash
#!/bin/bash
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
```

Лог потом легко парсится:

```bash
# Сколько раз Claude запускал Bash сегодня
cat ~/.claude/audit/$(date +%F).jsonl | jq -r 'select(.tool_name=="Bash") | .tool_input.command' | wc -l

# Все промпты за день
cat ~/.claude/audit/$(date +%F).jsonl | jq -r 'select(.event=="user_prompt") | .prompt'
```

**Когда полезно:** в любом проекте, где хочется видеть «как именно Claude добирался до результата». В enterprise — обязательно, для разбора инцидентов.

---

## Установка целиком

```bash
mkdir -p .claude/hooks
# Скопировать .sh файлы из этого README
chmod +x .claude/hooks/*.sh
# Скопировать соответствующие куски в .claude/settings.json
```

Проверка, что hook сработал, — `claude` запустит соответствующее действие, и hook выполнится. Логи самого Claude Code — `~/.claude/logs/`.

## Идеи для своих hooks

- `prevent-force-push` — `PreToolUse` на `Bash(git push --force *)` → deny.
- `auto-format` — `PostToolUse` на `Edit|Write` для `*.ts` → запуск `prettier --write`.
- `prod-confirmation` — `PreToolUse` если в команде встречается `production` → требовать дополнительное подтверждение через `permissionDecision: "ask"`.
- `cost-tracker` — `Stop` → парсить `total_cost_usd` из stop input и складывать в CSV.
- `cwd-switcher` — `CwdChanged` → автоматически переключать nvm/pyenv через `direnv`.
