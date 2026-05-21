<!--
README.md is generated from this template + data/*.json.
Edit this file or data/*.json, then run: node scripts/build-readme.mjs
CI gate: node scripts/build-readme.mjs --check
-->

# Claude Code Handbook на русском [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

> [Claude Code](https://docs.claude.com/en/docs/claude-code/overview) — CLI-агент Anthropic для разработки в терминале с поддержкой MCP, hooks и автономных субагентов.

Ежедневные разборы и обзоры релизов — в Telegram [@cc_consultant](https://t.me/cc_consultant). Связь и консультации: [@sfrangulov](https://t.me/sfrangulov).

**Полный сырой каталог (<!-- @sum-count-ru:catalog --> по типам)** — в [catalog/](./catalog/README.md). Здесь — курируемая подборка: только то, что я реально применяю в клиентских проектах либо что массово проверено сообществом по install-count.

---

## Содержание

- [Quickstart](#quickstart-за-10-минут)
- [Skills](#skills) — переиспользуемые наборы инструкций
- [Sub-agents](#sub-agents) — параллельные агенты со своим контекстом
- [Plugins](#plugins) — упаковка скиллов / субагентов / MCP / hooks в один артефакт
- [Hooks](#hooks) — shell-команды, привязанные к событиям сессии
- [MCP-серверы](#mcp-серверы) — подключение внешних инструментов через Model Context Protocol
- [CLAUDE.md шаблоны](#claudemd-шаблоны) — готовые конфиги под стек
- [Гайды и контент на русском](#гайды-и-контент-на-русском)
- [Прочие ресурсы](#прочие-ресурсы) — каналы, подкасты, аналоги
- [Безопасность и enterprise](#безопасность-и-enterprise)
- [Как добавить ресурс](#как-добавить-ресурс)

---

## Quickstart за 10 минут

Закрывает 80% типичных задач из коробки.

```bash
# 1. Сам Claude Code
npm install -g @anthropic-ai/claude-code

# 2. Маркетплейс soft-скиллов от obra. `marketplace add` только регистрирует
#    источник; сам плагин ставится отдельной слэш-командой (шаг 4 ниже).
claude plugin marketplace add obra/superpowers-marketplace

# 3. Два MCP-сервера ежедневного использования. Больше 5-7 не подключай —
#    каждый MCP-сервер расходует 1-3K токенов контекста на discovery.
claude mcp add github      # @modelcontextprotocol/server-github (issues, PR)
claude mcp add postgres    # @modelcontextprotocol/server-postgres (read-only прод)
```

**4.** Запусти `claude` в любом репозитории и поставь плагин слэш-командой:

```
/plugin install superpowers@superpowers-marketplace
```

Это 24 скилла (TDD, brainstorming, debugging, systematic-debugging, code-review, planning, parallel-agents, subagent-driven-development). Пять из них — в [топ-15 на skills.sh](#топ-15-скиллов-skillssh).

**Куда смотреть в первую очередь:**

1. [Топ-15 скиллов по install-count](#топ-15-скиллов-skillssh) — то, что 100K+ людей реально установили.
2. [Hooks](#hooks) — поставь хотя бы `pre-commit-secrets` сразу: спасает от утечки API-ключей через git-коммит, который агент может сделать за 30 секунд.
3. [Шаблоны CLAUDE.md](#claudemd-шаблоны) — три production-шаблона: Next.js, Python/FastAPI, Terraform.
4. [Гайды на русском](#гайды-и-контент-на-русском) — <!-- @count-ru:ru-content.habr|статья|статьи|статей --> с Habr + <!-- @count-ru:ru-content.youtube|YouTube-курс|YouTube-курса|YouTube-курсов --> + DTF.

---

## Skills

Skills — переиспользуемые наборы инструкций, которые Claude подгружает по триггеру. Один скилл = одна задача (TDD-цикл, code-review, performance-аудит). См. [официальный гайд](https://docs.claude.com/en/docs/claude-code/skills).

> 📂 Полный каталог: **[<!-- @count-ru:catalog/skills.items --> →](./catalog/skills.md)**

### Топ-15 скиллов (skills.sh)

Ранжированы по install-count из [skills.sh](https://skills.sh) — реальной телеметрии маркетплейса, не звёздам. Описания в третьей колонке — мой ответ на «когда это реально нужно», а не пересказ официального README. Установка одной командой: `npx skills add <owner/repo@skill>`.

<!-- @table:skills-top -->

**Источник:** [skills.sh leaderboard](https://skills.sh) — числа быстро растут, актуальны на момент последнего обновления. Автообновление: `node scripts/refresh-top-skills.mjs --write && node scripts/build-readme.mjs`.

**Совет практика:** ставь `obra/superpowers` целиком сразу — самая полная коллекция soft-скиллов (TDD, отладка, планирование, брейншторм, код-ревью). Пять из топ-15 — оттуда. Дальше добавь скиллы под свой стек (Vercel React, Convex, Firebase, Supabase, Azure). Не ставь всё подряд — каждый скилл съедает 3–5K токенов на bootstrap.

### Официальные от Anthropic

Полный набор: [anthropics/skills](https://github.com/anthropics/skills).

<!-- @list:skills.official -->

### Большие community-коллекции

<!-- @list:skills.communityCollections -->

### Узкоспециализированные

<!-- @list:skills.specialized -->

### Локальные примеры

<!-- @list:skills.local -->

---

## Sub-agents

Sub-agent — отдельный экземпляр Claude со своим контекстом, который выполняет подзадачу и возвращает один итоговый ответ. Полезно для read-only исследования и параллельных задач. См. [официальную доку](https://docs.claude.com/en/docs/claude-code/sub-agents).

> 📂 Полный каталог: **[<!-- @count-ru:catalog/subagents.items --> →](./catalog/subagents.md)**

### Production-коллекции

<!-- @table:subagents.productionCollections -->

### 144 субагента VoltAgent — оглавление коллекции

Каждый — отдельный `.md`-файл с YAML-фронтматтером, ставится в `.claude/agents/`.

<!-- @table:subagents.voltagentCategories -->

---

## Plugins

Плагин — упаковка скиллов, субагентов, hooks и MCP-серверов в один артефакт. Один плагин = один `/plugin install <name>`. См. [официальный гайд](https://docs.claude.com/en/docs/claude-code/plugins).

> 📂 Полный каталог: **[<!-- @count-ru:catalog/plugins.items --> →](./catalog/plugins.md)**

### Главные маркетплейсы

<!-- @list:plugins.marketplaces -->

### Полезные одиночные плагины

<!-- @list:plugins.singles -->

---

## Hooks

Hooks — shell-команды (или HTTP / MCP / prompt-агенты), которые запускаются по событиям сессии. См. [hooks reference](https://docs.claude.com/en/docs/claude-code/hooks).

> 📂 Связанные проекты: **[<!-- @count-ru:catalog/hooks.items --> →](./catalog/hooks.md)**. Большая часть hooks живёт внутри плагинов — см. раздел [Plugins](#plugins) выше.

### Готовые hooks в этом репо

<!-- @list:hooks.local -->

### Community-проекты

<!-- @list:hooks.community -->

### Сценарии применения

**Безопасность:** pre-commit на секреты, запрет `git push --force` в `main` / `production`, `permissionDecision: "ask"` для команд со словом `production` или `prod-*`, JSONL-аудит каждого PostToolUse, блокировка `curl` и `wget` к доменам не из белого списка.

**Качество:** автоформат на PostToolUse Edit / Write (`prettier --write`, `ruff format`), `tsc --noEmit` на изменённых файлах, `eslint --fix`, `terraform fmt -recursive`.

**Workflow:** push в ntfy / Pushover / Telegram по событиям Notification и Stop, учёт стоимости в CSV по событию Stop, `direnv reload` по CwdChanged, авто-коммит по Stop с conventional-сообщениями.

**Архитектурные:** запрет редактирования `package.json` или lockfile без явного разрешения, pre-edit grep на использование функции, которую собираемся удалить, проверка структуры нового файла (`src/` / `tests/` / `docs/`).

---

## MCP-серверы

[Model Context Protocol](https://modelcontextprotocol.io/) — стандарт подключения внешних инструментов к LLM. Все MCP-серверы работают и в Claude Code, и в Claude Desktop, и в Cursor.

> 📂 Полный каталог: **[<!-- @count-ru:catalog/mcp-servers.items --> →](./catalog/mcp-servers.md)** — взято из [punkpeye/awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers) и официального реестра.

> **Правило практика:** пять хорошо подобранных MCP-серверов лучше двадцати. Каждый сервер расходует токены контекста на discovery — будь придирчив. С 19 включёнными серверами 200K-контекст превращается в 70K ещё до старта работы.

### Официальные

<!-- @list:mcp.official -->

### Кураторы

<!-- @list:mcp.curators -->

### Топ под Claude Code (мой ежедневный сетап)

<!-- @bold-list:mcp.topDaily -->

Полная разбивка по 30 категориям — базы данных, version control, dev-инструменты, облака, браузеры, поиск, коммуникации, мониторинг, безопасность, базы знаний, агрегаторы, sandbox-окружения, рабочие инструменты, файловые системы, OS, мультимедиа, data science, RAG, маркетинг, продукт, customer data, соцсети, поддержка, e-commerce, fintech, визуализация, путешествия — в **[catalog/mcp-servers.md](./catalog/mcp-servers.md)**.

---

## CLAUDE.md шаблоны

`CLAUDE.md` в корне репозитория автоматически подгружается в контекст. См. [memory docs](https://docs.claude.com/en/docs/claude-code/memory).

> 📂 Полный каталог: **[<!-- @count-ru:catalog/templates.items --> →](./catalog/templates.md)**

### Шаблоны в этом репо

<!-- @list:templates.local -->

Каждый закрывает пять блоков: стек, команды, структура, правила/анти-паттерны, чек-лист перед PR.

### Известные сборники

<!-- @list:templates.collections -->

### Под конкретный стек

<!-- @list:templates.stacks -->

### Тематические гайды

<!-- @list:templates.guides -->

---

## Гайды и контент на русском

> 📂 Полный список: **[<!-- @sum-count-ru:catalog/ru-content --> →](./catalog/ru-content.md)**

### Habr — практические гайды

<!-- @list:ru-content.habr -->

### vc.ru — индустрия и кейсы

<!-- @list:ru-content.vc -->

### DTF — для не-разработчиков

<!-- @list:ru-content.dtf -->

### YouTube

<!-- @list:ru-content.youtube -->

---

## Безопасность и enterprise

<!-- @list:security.main -->

### Enterprise-паттерны

<!-- @list:security.enterprise -->

---

## Прочие ресурсы

### Промптинг

<!-- @list:misc.prompting -->

### Каналы и сообщества

<!-- @list:misc.channels -->

### Подкасты и YouTube (EN)

<!-- @list:misc.podcasts -->

### Twitter / X — практики

<!-- @list:misc.twitter -->

### Сравнение с другими CLI-агентами

<!-- @list:misc.competitors -->

### Утилиты

<!-- @list:misc.utilities -->

---

## Как добавить ресурс

README.md — генерируемый файл. Источник правды: `data/*.json` (списки) и `README.template.md` (статичная проза, заголовки, маркеры).

1. Открой подходящий файл в [`data/`](./data/) и добавь запись:
   ```json
   { "name": "Название", "url": "https://...", "desc": "Одна строка о том, для чего полезно." }
   ```
2. Прогони локально три гейта (то же, что упадёт на PR):
   ```bash
   node scripts/validate-data.mjs        # форма записи: name/url/desc
   node scripts/lint-data.mjs            # стиль desc: no-self-name, без маркетинга
   node scripts/build-readme.mjs         # перегенерация README.md (`--check` — только проверка)
   ```
3. URL-слаги в ссылках на скиллы/плагины/MCP **остаются английскими** (как в источнике). Только `desc` на русском. Перевод слагов ломает реальные ссылки на skills.sh и GitHub.
4. Закоммить и `data/<section>.json`, и регенерированный `README.md`.
5. Перед PR убедись:
   - ресурс работает с актуальной версией Claude Code;
   - нет дубликата в списке;
   - ссылка публичная (GitHub / docs / статья);
   - описание без маркетинга («революционный», «must-have», «прорывной» — нет).

Подробнее — в [CONTRIBUTING.md](./CONTRIBUTING.md).

## Лицензия

[CC0](./LICENSE) — список и тексты можно свободно использовать, копировать, адаптировать. Код в `examples/` под MIT.
