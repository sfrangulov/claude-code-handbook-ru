# Claude Code Handbook на русском

> Кураторский справочник для тех, кто использует [Claude Code](https://docs.claude.com/en/docs/claude-code/overview) в работе. Только то, что я реально применяю в клиентских проектах либо что массово проверено сообществом по install-count.

[![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

Ежедневные разборы и release-watch — в Telegram [@cc_consultant](https://t.me/cc_consultant). Связь и консультации: [@sfrangulov](https://t.me/sfrangulov).

**Полный сырой каталог (1400+ записей по типам)** — в [catalog/](./catalog/README.md). Здесь — куратная выжимка.

---

## Содержание

- [Quickstart](#quickstart-за-10-минут)
- [Skills](#skills) — переиспользуемые наборы инструкций
- [Sub-agents](#sub-agents) — параллельные агенты со своим контекстом
- [Plugins](#plugins) — packaging для скиллов/агентов/MCP/hooks
- [Hooks](#hooks) — shell-команды на события lifecycle
- [MCP-серверы](#mcp-серверы) — внешние tools через Model Context Protocol
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

# 2. Самая полная коллекция soft-скиллов от obra (TDD, brainstorming, debugging,
#    code-review, planning). Пять из топ-15 на skills.sh — оттуда.
claude plugin marketplace add obra/superpowers-marketplace

# 3. Три must-have MCP-сервера. Больше 5-7 не подключай —
#    каждый MCP-сервер расходует 1-3K токенов контекста на discovery.
claude mcp add github      # @modelcontextprotocol/server-github
claude mcp add postgres    # @modelcontextprotocol/server-postgres
claude mcp add filesystem  # @modelcontextprotocol/server-filesystem
```

**Куда смотреть в первую очередь:**

1. [Топ-15 скиллов по install-count](#топ-15-скиллов-skillssh) — то, что 100K+ людей реально установили.
2. [Hooks](#hooks) — поставь хотя бы `pre-commit-secrets` сразу: спасает от утечки API-ключей через git-коммит, который агент может сделать за 30 секунд.
3. [Шаблоны CLAUDE.md](#claudemd-шаблоны) — три production-шаблона: Next.js, Python/FastAPI, Terraform.
4. [Гайды на русском](#гайды-и-контент-на-русском) — 19 статей с Habr + 11 YouTube-курсов + DTF.

---

## Skills

Skills — переиспользуемые наборы инструкций, которые Claude подгружает по триггеру. Один скилл = одна задача (TDD-цикл, code-review, performance-аудит). См. [официальный гайд](https://docs.claude.com/en/docs/claude-code/skills).

> 📂 Полный каталог: **[162 записи →](./catalog/skills.md)**

### Топ-15 скиллов (skills.sh)

Ранжированы по install-count из [skills.sh](https://skills.sh) — реальной телеметрии маркетплейса, не звёздам. Описания в третьей колонке — мой ответ на «когда это реально нужно», не пересказ официального README. Установка одной командой: `npx skills add <owner/repo@skill>`.

| Скилл | Зачем и когда юзать | Установок |
|---|---|---:|
| [anthropics/skills@frontend-design](https://skills.sh/anthropics/skills/frontend-design) | Принудительно перестроить дизайн под bold-решения, а не дефолтные «AI slop»-карточки. Триггерь когда видишь, что вышло generic. React + Tailwind. | **405K** |
| [vercel-labs/agent-skills@vercel-react-best-practices](https://skills.sh/vercel-labs/agent-skills/vercel-react-best-practices) | React/Next.js perf-практики от Vercel: boundaries клиент-RSC, кэширование, оптимизация bundle. Подключай в любом Next.js-проекте. | **395K** |
| [vercel-labs/agent-skills@web-design-guidelines](https://skills.sh/vercel-labs/agent-skills/web-design-guidelines) | Чек-лист соответствия Web Interface Guidelines: a11y, hit-targets, focus rings. Запускай как ревью UI до коммита. | **316K** |
| [microsoft/azure-skills@azure-deploy](https://skills.sh/microsoft/azure-skills/azure-deploy) | Деплой в Azure: ARM/Bicep, App Service, Container Apps. Ставь только если работаешь в Azure-стеке — иначе мёртвый груз в контексте. | **312K** |
| [obra/superpowers@brainstorming](https://skills.sh/obra/superpowers/brainstorming) | Структурированный брейншторм с гипотезами и матрицей вариантов **до** начала кода. Включай когда задача расплывчатая («сделай auth»). | **155K** |
| [xixu-me/skills@github-actions-docs](https://skills.sh/xixu-me/skills/github-actions-docs) | Свежая официальная дока GitHub Actions: синтаксис, runners, OIDC, troubleshooting. Когда пишешь workflow и не хочешь искать в десяти вкладках. | **131K** |
| [vercel-labs/agent-skills@vercel-react-native-skills](https://skills.sh/vercel-labs/agent-skills/vercel-react-native-skills) | React Native best practices от Vercel. Снимает с агента половину типичных багов в RN-проектах. | **116K** |
| [mattpocock/skills@tdd](https://skills.sh/mattpocock/skills/tdd) | TDD-цикл (red-green-refactor) с дисциплиной — не даёт агенту писать код вперёд тестов. От Matt Pocock. | **96K** |
| [obra/superpowers@systematic-debugging](https://skills.sh/obra/superpowers/systematic-debugging) | Дисциплина отладки: гипотезы → изоляция → root cause. Прерывает цикл «угадывания на код-граниях». | **94K** |
| [arvindrk/extract-design-system@extract-design-system](https://skills.sh/arvindrk/extract-design-system/extract-design-system) | Скан существующего сайта → структурированный design-system (токены, паттерны, типографика). Для редизайна или нового проекта на базе старого. | **93K** |
| [obra/superpowers@requesting-code-review](https://skills.sh/obra/superpowers/requesting-code-review) | Запросить ревью у саб-агента **перед** коммитом. Эффективно когда работаешь автономно без живого ревьюера. | **82K** |
| [mattpocock/skills@grill-with-docs](https://skills.sh/mattpocock/skills/grill-with-docs) | «Допрашивай» документацию через find/grep — заменяет догадки точными цитатами. Особенно ценно для библиотек, где знание Claude устарело. | **79K** |
| [obra/superpowers@subagent-driven-development](https://skills.sh/obra/superpowers/subagent-driven-development) | Делегирование независимых задач саб-агентам параллельно (feature + tests, frontend + backend). | **70K** |
| [anthropics/skills@webapp-testing](https://skills.sh/anthropics/skills/webapp-testing) | Тестирование веб-приложений через Playwright. Заменяет «руками протыкать в браузере» на автоматизацию. | **68K** |
| [obra/superpowers@verification-before-completion](https://skills.sh/obra/superpowers/verification-before-completion) | Проверить что задача реально сделана (запустить тесты, открыть страницу), до отчёта «готово». Антидот к false-positive отчётам. | **68K** |

**Источник:** [skills.sh leaderboard](https://skills.sh) — числа быстро растут, актуальны на момент последнего пересмотра. Автообновление: `python scripts/refresh-top-skills.py --write`.

**Совет практика:** ставь `obra/superpowers` целиком сразу — это самая полная коллекция soft-скиллов (TDD, debugging, planning, brainstorming, code-review). Пять из топ-15 — оттуда. Для конкретного стека добавь stack-specific (Vercel React, Convex, Firebase, Supabase, Azure). Не ставь всё подряд — каждый скилл занимает 3-5K токенов в context bootstrap.

### Официальные от Anthropic

Полный набор: [anthropics/skills](https://github.com/anthropics/skills).

- [anthropics/skills/docx](https://github.com/anthropics/skills/tree/main/skills/docx) — Word-документы с tracked changes и комментариями.
- [anthropics/skills/pdf](https://github.com/anthropics/skills/tree/main/skills/pdf) — Извлечение текста и таблиц, merge/split, заполнение форм.
- [anthropics/skills/pptx](https://github.com/anthropics/skills/tree/main/skills/pptx) — PowerPoint: layouts, шаблоны, графики, авто-генерация слайдов.
- [anthropics/skills/xlsx](https://github.com/anthropics/skills/tree/main/skills/xlsx) — Excel: формулы, форматирование, анализ.
- [anthropics/skills/frontend-design](https://github.com/anthropics/skills/blob/main/skills/frontend-design) — Bold-дизайн без «AI slop». React + Tailwind.
- [anthropics/skills/web-artifacts-builder](https://github.com/anthropics/skills/tree/main/skills/web-artifacts-builder) — HTML-артефакты на React + Tailwind + shadcn/ui.
- [anthropics/skills/mcp-builder](https://github.com/anthropics/skills/tree/main/skills/mcp-builder) — Пошаговое создание MCP-серверов.
- [anthropics/skills/webapp-testing](https://github.com/anthropics/skills/tree/main/skills/webapp-testing) — Тестирование веб-приложений через Playwright.
- [anthropics/skills/skill-creator](https://github.com/anthropics/skills/tree/main/skills/skill-creator) — Интерактивное создание собственных скиллов через Q&A.

### Большие community-коллекции

- [obra/superpowers](https://github.com/obra/superpowers) — 20+ боевых скиллов: TDD, debugging, brainstorming, написание планов. Самая популярная коллекция. Установка: `claude plugin marketplace add obra/superpowers-marketplace`.
- [obra/superpowers-lab](https://github.com/obra/superpowers-lab) — Экспериментальные скиллы из той же серии.
- [trailofbits/skills](https://github.com/trailofbits/skills) — Security-скиллы от Trail of Bits: статический анализ через CodeQL/Semgrep, code auditing, поиск уязвимостей.
- [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) — Vercel Engineering: React perf, web guidelines, RN, deploy-to-vercel.
- [supabase/agent-skills](https://github.com/supabase/agent-skills) — Скиллы для Supabase + PostgreSQL.
- [firebase/agent-skills](https://github.com/firebase/agent-skills) — Firebase + Firestore, security rules audit.
- [microsoft/azure-skills](https://github.com/microsoft/azure-skills) — Azure deploy + best practices.
- [get-convex/agent-skills](https://github.com/get-convex/agent-skills) — Convex (реактивный backend).
- [expo/skills](https://github.com/expo/skills) — Expo apps. 25K+ установок.
- [shadcn/ui skills](https://ui.shadcn.com/docs/skills) — Контекст по компонентам shadcn и enforce паттернов.
- [travisvn/awesome-claude-skills](https://github.com/travisvn/awesome-claude-skills) — 12k⭐, актуальный куратор скиллов.
- [karanb192/awesome-claude-skills](https://github.com/karanb192/awesome-claude-skills) — 50+ verified skills с разбивкой по типам.

### Узкоспециализированные

- [conorluddy/ios-simulator-skill](https://github.com/conorluddy/ios-simulator-skill) — Сборка iOS-приложений, навигация по симулятору, тесты.
- [lackeyjb/playwright-skill](https://github.com/lackeyjb/playwright-skill) — Браузерная автоматизация через Playwright.
- [chrisvoncsefalvay/claude-d3js-skill](https://github.com/chrisvoncsefalvay/claude-d3js-skill) — Визуализации в d3.js.
- [K-Dense-AI/claude-scientific-skills](https://github.com/K-Dense-AI/claude-scientific-skills) — Научные базы данных и библиотеки.
- [jthack/ffuf_claude_skill](https://github.com/jthack/ffuf_claude_skill) — Fuzzing через `ffuf` при пентесте.
- [yusufkaraaslan/Skill_Seekers](https://github.com/yusufkaraaslan/Skill_Seekers) — Превращает сайт документации в Claude Skill.
- [alonw0/web-asset-generator](https://github.com/alonw0/web-asset-generator) — Favicon, app-иконки, OG-картинки.

### Локальные примеры

- [examples/skills/review-staged-changes/](./examples/skills/review-staged-changes/SKILL.md) — Sanity-check staged-изменений перед коммитом.

---

## Sub-agents

Sub-agent — отдельный экземпляр Claude со своим контекстом, который выполняет подзадачу и возвращает один итоговый ответ. Полезно для read-only исследования и параллельных задач. См. [официальную доку](https://docs.claude.com/en/docs/claude-code/sub-agents).

> 📂 Полный каталог: **[160 записей →](./catalog/subagents.md)**

### Production-коллекции

| Репозиторий | Что внутри |
|---|---|
| [VoltAgent/awesome-claude-code-subagents](https://github.com/VoltAgent/awesome-claude-code-subagents) | **144 субагента** по 10 категориям, 19k⭐. Установка: `claude plugin marketplace add VoltAgent/awesome-claude-code-subagents`. |
| [obra/superpowers](https://github.com/obra/superpowers) | 20+ скиллов + субагентов (TDD, debugging, planning, brainstorming, review). Самая популярная. |
| [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | 100+ субагентов в едином формате промпта, multi-language, MIT. |
| [wshobson/agents](https://github.com/wshobson/agents) | 48 production-агентов с orchestration-паттернами и продвинутыми workflow. |
| [vijaythecoder/awesome-claude-agents](https://github.com/vijaythecoder/awesome-claude-agents) | 26 агентов формата AI-команды: Tech Lead, Analyst, доменные специалисты. |
| [davepoon/claude-code-subagents-collection](https://github.com/davepoon/claude-code-subagents-collection) | 36 субагентов с auto-delegation и гайдом best practices. |
| [rohitg00/awesome-claude-code-toolkit](https://github.com/rohitg00/awesome-claude-code-toolkit) | 135 агентов + 35 скиллов + 42 команды в одном toolkit. |
| [peterkrueck/Claude-Code-Development-Kit](https://github.com/peterkrueck/Claude-Code-Development-Kit) | Meta-репо: docs, multi-agent шаблоны, hooks, MCP-серверы. |

### 144 субагента VoltAgent — оглавление коллекции

Каждый — отдельный `.md`-файл с YAML-фронтматтером, ставится в `.claude/agents/`.

| Категория | Внутри | Когда брать |
|---|---|---|
| [🛠️ Core development (11)](https://github.com/VoltAgent/awesome-claude-code-subagents/tree/main/categories/01-core-development) | API-дизайнер, frontend/backend/fullstack, mobile, GraphQL-архитектор, WebSocket-инженер | Когда делегируешь узкие задачи («спроектируй GraphQL-схему») |
| [🔤 Language specialists (30)](https://github.com/VoltAgent/awesome-claude-code-subagents/tree/main/categories/02-language-specialists) | python-pro, java-architect, rust-engineer, golang-pro, php-pro, typescript-pro и 24 ещё | Изолируют контекст, когда основной агент уходит в read-heavy работу по одному языку |
| [☁️ Infrastructure (16)](https://github.com/VoltAgent/awesome-claude-code-subagents/tree/main/categories/03-infrastructure) | cloud-architect, devops, kubernetes, terraform, SRE, security-engineer | Для DevOps-задач, особенно если есть Terraform или K8s |
| [✅ Quality & security (16)](https://github.com/VoltAgent/awesome-claude-code-subagents/tree/main/categories/04-quality-security) | code-reviewer, debugger, penetration-tester, performance-engineer, a11y-tester | Перед PR — `code-reviewer` как блокирующий шаг |
| [🧠 Data & AI (13)](https://github.com/VoltAgent/awesome-claude-code-subagents/tree/main/categories/05-data-ai) | ML/MLOps, data-scientist, llm-architect, prompt-engineer, NLP, postgres-pro | Для data-инфры или ML-pipelines |
| [⚡ Developer experience (14)](https://github.com/VoltAgent/awesome-claude-code-subagents/tree/main/categories/06-developer-experience) | cli-developer, mcp-developer, refactoring-specialist, build-engineer, documentation-engineer | Internal tooling и DX-задачи |
| [🎯 Specialized domains (13)](https://github.com/VoltAgent/awesome-claude-code-subagents/tree/main/categories/07-specialized-domains) | blockchain, fintech, gamedev, IoT, embedded, mobile-app-builder | Когда работаешь в нишевой области |
| [💼 Business & product (12)](https://github.com/VoltAgent/awesome-claude-code-subagents/tree/main/categories/08-business-product) | PM, scrum-master, technical-writer, UX-researcher, sales-engineer | Не-кодовые задачи: PRD, roadmap, customer success |
| [🎭 Meta & orchestration (11)](https://github.com/VoltAgent/awesome-claude-code-subagents/tree/main/categories/09-meta-orchestration) | agent-organizer, context-manager, multi-agent-coordinator, workflow-orchestrator | Координация нескольких субагентов параллельно |
| [🔬 Research & analysis (8)](https://github.com/VoltAgent/awesome-claude-code-subagents/tree/main/categories/10-research-analysis) | competitive-analyst, market-researcher, search-specialist, trend-analyst | Discovery-фаза продукта или анализ конкурентов |

---

## Plugins

Плагин — packaging для скиллов, агентов, hooks и MCP-серверов в одном артефакте. Один плагин = один `/plugin install <name>`. См. [официальный гайд](https://docs.claude.com/en/docs/claude-code/plugins).

> 📂 Полный каталог: **[16 записей →](./catalog/plugins.md)**

### Главные маркетплейсы

- [obra/superpowers-marketplace](https://github.com/obra/superpowers-marketplace) — Маркетплейс с 20+ soft-скиллами и плагинами от Jesse Vincent. **Главный must-have**: `claude plugin marketplace add obra/superpowers-marketplace`.
- [ccplugins/awesome-claude-code-plugins](https://github.com/ccplugins/awesome-claude-code-plugins) — 50+ плагинов по 13 категориям (code quality, git, devops, design, business). 782⭐. Установка: `claude plugin marketplace add ccplugins/awesome-claude-code-plugins`.
- [VoltAgent/awesome-claude-code-subagents](https://github.com/VoltAgent/awesome-claude-code-subagents) — 144 субагента как плагин-маркетплейс.
- [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official) — Официальные плагины Anthropic.

### Полезные одиночные плагины

- [brennercruvinel/CCPlugins](https://github.com/brennercruvinel/CCPlugins) — Сборка из самых ходовых slash-команд автора.
- [ApurvBazari/claude-plugins](https://github.com/ApurvBazari/claude-plugins) — Notify-плагин: ntfy/Pushover/Telegram-нотификации событий.
- [browserbase/claude-code-plugin](https://github.com/browserbase/claude-code-plugin) — Browserbase: облачные браузеры для тестирования и скрейпинга.
- [0xdesign/design-plugin](https://github.com/0xdesign/design-plugin) — Design-первая обвязка для UI-задач.
- [jeremylongshore/claude-code-plugins-plus-skills](https://github.com/jeremylongshore/claude-code-plugins-plus-skills) — Связка плагины + скиллы в одном репо.
- [TT-Wang/cortex-plugin](https://github.com/TT-Wang/cortex-plugin) — Структурированное мышление и планирование задач.
- [Rich627/whatsapp-claude-plugin](https://github.com/Rich627/whatsapp-claude-plugin) — Интеграция с WhatsApp.

---

## Hooks

Hooks — shell-команды (или HTTP/MCP/prompt-агенты), которые запускаются на события жизненного цикла сессии. См. [hooks reference](https://docs.claude.com/en/docs/claude-code/hooks).

> 📂 Связанные проекты: **[8 записей →](./catalog/hooks.md)**. Большая часть hooks живёт внутри плагинов — см. раздел [Plugins](#plugins) выше.

### Готовые hooks в этом репо

- [examples/hooks/](./examples/hooks/README.md) — Три рабочих hook'а с bash-скриптами и инструкциями куда положить:
  - **pre-commit-secrets.sh** — детектор секретов в staged diff. Спасает от утечки API-ключей, когда агент коммитит без проверки.
  - **ntfy.sh** — push-уведомления через ntfy.sh на `Notification`/`Stop` события.
  - **audit.sh** — JSONL-аудит каждого PostToolUse для разбора инцидентов.

### Community-проекты

- [carapace-sh/claude-code-hooks](https://github.com/carapace-sh/claude-code-hooks) — TypeScript SDK для hooks с типизацией.
- [decoder3000/claude-hooks-toolkit](https://github.com/decoder3000/claude-hooks-toolkit) — Pre-made hooks: format, lint, security check, audit.
- [snyk/claude-code-pre-commit](https://github.com/snyk/claude-code-pre-commit) — Snyk security scan на pre-commit.
- [johnlindquist/ccmgr](https://github.com/johnlindquist/ccmgr) — Менеджер для управления hook-конфигом.
- [Setting up Claude Code hooks (Anthropic blog)](https://www.anthropic.com/news/claude-code-hooks) — Официальный анонс с примерами.

### Сценарии применения

**Безопасность:** pre-commit-секреты, запрет `git push --force` в `main/production`, `permissionDecision: "ask"` для команд с `production`/`prod-*`, JSONL-аудит каждого PostToolUse, блокировка curl/wget вне whitelist.

**Качество:** автоформат на PostToolUse Edit/Write (`prettier --write`, `ruff format`), `tsc --noEmit` на изменённых, ESLint --fix, `terraform fmt -recursive`.

**Workflow:** ntfy/Pushover/Telegram-push на Notification и Stop, cost-tracking в CSV из Stop, `direnv reload` на CwdChanged, авто-коммит на Stop с conventional messages.

**Архитектурные:** запрет редактирования `package.json`/lockfile без явного разрешения, pre-edit grep на использование функции, проверка структуры нового файла (`src/`/`tests/`/`docs/`).

---

## MCP-серверы

[Model Context Protocol](https://modelcontextprotocol.io/) — стандарт подключения внешних tools к LLM. Все MCP-серверы работают и в Claude Code, и в Claude Desktop, и в Cursor.

> 📂 Полный каталог: **[827 записей по 30 категориям →](./catalog/mcp-servers.md)** — взято из [punkpeye/awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers) и официального реестра.

> **Правило практика:** пять хорошо подобранных MCP лучше двадцати. Каждый сервер расходует токены контекста на discovery — будь придирчив. С 19 включёнными серверами 200K-контекст превращается в 70K ещё до старта работы.

### Официальные

- [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers) — Официальный набор от Anthropic: `filesystem`, `git`, `postgres`, `slack`, `memory`, `sequentialthinking`.
- [github/github-mcp-server](https://github.com/github/github-mcp-server) — Официальный GitHub MCP. Превращает Claude из «генератора кода» в участника процесса issues/PR.
- [MCP registry](https://github.com/modelcontextprotocol/registry) — Официальный каталог серверов с поиском.
- [modelcontextprotocol.io](https://modelcontextprotocol.io/) — Документация протокола.

### Кураторы

- [punkpeye/awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers) — Самый большой каталог MCP-серверов с категориями.
- [MCP Servers Hub (mcp.so)](https://mcp.so/) — Каталог с поиском и live-демо.
- [Glama AI MCP servers](https://glama.ai/mcp/servers) — Альтернативный каталог.
- [Pulse MCP](https://www.pulsemcp.com/) — Каталог серверов и use-case'ов.
- [Best Claude Code MCP Servers 2026 (Nimbalyst)](https://nimbalyst.com/blog/best-claude-code-mcp-servers/) — Ранжированный обзор под Claude Code.

### Топ под Claude Code (мой ежедневный сетап)

- **GitHub** — [github/github-mcp-server](https://github.com/github/github-mcp-server). Без него Claude видит только локальный репозиторий — с ним умеет читать чужие issues, PR-комментарии, открывать draft-PR.
- **PostgreSQL** — [modelcontextprotocol/servers/postgres](https://github.com/modelcontextprotocol/servers/tree/main/src/postgres). Read-only по умолчанию, для дебага запросов и схемы продакшен-БД.
- **Filesystem** — [modelcontextprotocol/servers/filesystem](https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem). Чтение файлов вне cwd (например, общая база знаний или соседний проект).
- **Playwright** — [microsoft/playwright-mcp](https://github.com/microsoft/playwright-mcp). Для тестов UI и скрейпинга. Альтернатива — Browserbase для облачных браузеров.
- **Context7** — [upstash/context7](https://github.com/upstash/context7). Свежие docs популярных библиотек — Claude перестаёт галлюцинировать API устаревших версий.
- **Linear** — [linear/linear-mcp](https://github.com/linear/linear-mcp). Если ведёшь задачи в Linear — агент сам читает спеки и комментирует issues.
- **Sequential thinking** — [modelcontextprotocol/servers/sequentialthinking](https://github.com/modelcontextprotocol/servers/tree/main/src/sequentialthinking). Структурированное multi-step мышление для сложных задач.

Полная развёртка по 30 категориям (БД, version control, dev tools, cloud, browsers, search, communications, monitoring, security, knowledge, aggregators, sandboxes, work tools, file systems, OS, multimedia, data science, RAG, marketing, product, customer data, social, support, e-commerce, fintech, viz, travel) — в **[catalog/mcp-servers.md](./catalog/mcp-servers.md)**.

---

## CLAUDE.md шаблоны

`CLAUDE.md` в корне репозитория автоматически подгружается в контекст. См. [memory docs](https://docs.claude.com/en/docs/claude-code/memory).

> 📂 Полный каталог: **[10 записей →](./catalog/templates.md)**

### Шаблоны в этом репо

- [examples/claude-md-templates/nextjs.md](./examples/claude-md-templates/nextjs.md) — Next.js 16 + React 19 + TypeScript + Tailwind 4.
- [examples/claude-md-templates/python-fastapi.md](./examples/claude-md-templates/python-fastapi.md) — Python 3.13+ + FastAPI + SQLAlchemy 2.0 + Pydantic v2.
- [examples/claude-md-templates/terraform.md](./examples/claude-md-templates/terraform.md) — Terraform 1.13+ с упором на безопасность state.

Каждый закрывает пять блоков: стек, команды, структура, правила/анти-паттерны, чек-лист перед PR.

### Известные сборники

- [multica-ai/andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills) — CLAUDE.md, собранный из практик Andrej Karpathy. 128k⭐.
- [garrytan/gstack](https://github.com/garrytan/gstack) — Setup Garry Tan: 23 opinionated tools. 95k⭐.
- [affaan-m/everything-claude-code](https://github.com/affaan-m/everything-claude-code) — Комплексная оптимизация harness'а: skills, instincts, memory. 181k⭐.

### Stack-specific

- [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) — Next.js best-practices, де-факто канонический шаблон от Vercel.
- [supabase/agent-skills](https://github.com/supabase/agent-skills) — Supabase + PostgreSQL.
- [callstackincubator/agent-skills](https://github.com/callstackincubator/agent-skills) — React Native шаблоны.
- [shadcn/ui skills](https://ui.shadcn.com/docs/skills) — Shadcn-компоненты с pattern enforcement.
- [expo/skills](https://github.com/expo/skills) — Expo apps. 25K+ установок.
- [get-convex/agent-skills](https://github.com/get-convex/agent-skills) — Convex (реактивный backend).
- [microsoft/azure-skills](https://github.com/microsoft/azure-skills) — Azure deploy + best practices.
- [firebase/agent-skills](https://github.com/firebase/agent-skills) — Firebase + Firestore.
- [docs.stripe.com](https://docs.stripe.com/agents/claude-code) — Stripe best practices для платёжных интеграций.

### Тематические гайды

- [Anthropic engineering: Claude Code best practices](https://www.anthropic.com/engineering/claude-code-best-practices) — Официальный пост.
- [Год с Claude Code (alpinadigital, Habr)](https://habr.com/ru/companies/alpinadigital/articles/1032134/) — Год опыта в конфигурации.
- [Claude Code: практический гайд (Habr)](https://habr.com/ru/articles/987094/) — Setup на русском.

---

## Гайды и контент на русском

> 📂 Полный список: **[12 записей →](./catalog/ru-content.md)**

### Habr — практические гайды

- [Claude Code в 2026: гайд для тех, кто еще пишет код руками](https://habr.com/ru/articles/987382/) — Подробный гайд по AI Coding Agents, рекомендации по тарифам и CLI.
- [Год с Claude Code: рабочая конфигурация с первого запуска](https://habr.com/ru/companies/alpinadigital/articles/1032134/) — Как устроены rules, skills, agents, команды, MCP и hooks; как всё связывается через `routing.md`.
- [Claude Code: практический гайд по настройке, автоматизации и контексту](https://habr.com/ru/articles/987094/) — Полный сетап со скиллами, hooks, субагентами, MCP. От практика.
- [Полное руководство по добавлению MCP-серверов](https://habr.com/ru/articles/938626/) — Методы настройки, решения частых ошибок, проверенные серверы.
- [44 настройки Claude Code, о которых вы не знали](https://habr.com/ru/articles/987826/) — Ранжированы от «must have» до «забей».
- [10 настроек Claude Code, до которых большинство не доходит](https://habr.com/ru/articles/1028988/) — Недо-используемые возможности.
- [Что вы не знали о Claude Code: архитектура и практики](https://habr.com/ru/articles/1012412/) — Внутренняя архитектура агента.
- [Айсберг Claude Code (YooMoney)](https://habr.com/ru/companies/yoomoney/articles/1015548/) — 30+ возможностей от новичка до автоматизации.
- [Изоляция контекста через субагенты](https://habr.com/ru/articles/974448/) — Архитектурный паттерн для долгих задач.
- [3000+ часов в Claude Code](https://habr.com/ru/articles/1017110/) — Личный опыт автора, упакованный в три плагина.
- [Statusline для Claude Code с мониторингом VPS](https://habr.com/ru/articles/1013414/) — Кастомизация statusline.
- [Разработка с Obsidian + Claude](https://habr.com/ru/articles/1030316/) — Workflow Claude + база знаний.
- [Как использовать Claude Code: советы опытного разработчика (OTUS)](https://habr.com/ru/companies/otus/articles/929624/) — Корпоративный блог.
- [Claude Code — полный гайд для новичков с нуля](https://habr.com/ru/articles/1033416/) — Функции, настройка, best practices.
- [Claude Code: маршрут обучения и ресурсы 2026](https://habr.com/ru/articles/983214/) — Учебная карта.
- [Claude Code для тех, кто не пишет код](https://habr.com/ru/articles/1017668/) — Для продуктовых и менеджеров.
- [Code с Claude 2026: что Anthropic показали разработчикам](https://habr.com/ru/articles/1032588/) — Отчёт со второй конференции Anthropic (6 мая 2026).
- [Claude Code бесплатно: ИИ бесплатно в 2026](https://habr.com/ru/articles/1018234/) — Про утечку source maps и форк OpenClaude.

### vc.ru — индустрия и кейсы

- [Кодинг с ИИ-агентом в терминале (vc.ru)](https://vc.ru/ai/2920853-ii-agenty-v-terminalye) — Как Claude Code и аналоги работают изнутри.
- [Три парадигмы ИИ-агентов в 2026: Claude Code / OpenClaw / Hermes](https://vc.ru/ai/2911692-iskusstvennyj-intellekt-dlja-biznesa) — Opus 4.7, бюджеты задач, контекст 1M токенов.
- [Anthropic ограничила OpenClaw в Claude-подписках](https://vc.ru/ai/2878137-anthropic-ogranichila-openclaw-v-claude) — Инцидент с отключением сторонних агентов.
- [Anthropic: 10 агентов для финансового сектора](https://vc.ru/id300496/2913405-anthropic-predstavila-ii-agentov-dlya-finansovogo-sektora) — Финансовые AI-агенты.
- [Anthropic признал, что два месяца поставлял дефектный Claude Code](https://vc.ru/ai/2885740-anthropic-priznal-defekty-v-claude-code) — Incident report.
- [Тарифы Claude 2026: гайд по планам, ценам API и доступу из России](https://vc.ru/ai/2757771-tarify-claude-2026-gayd-po-planam-i-dostupu-iz-rossii) — Pricing.
- [Как зарегистрироваться в Claude AI из России в 2026](https://vc.ru/ai/2878925-registratsiya-v-claude-ai-iz-rossii) — Регистрация.

### DTF — для не-разработчиков

- [Как использовать Claude в России в 2026: полный гайд](https://dtf.ru/howto/4796716-kak-zaregistrirovatsya-i-ispolzovat-claude-v-rossii) — Регистрация и работа с Claude из России.
- [AI-кодинг с Claude Code: три способа создания лендинга](https://dtf.ru/howto/4727219-ai-koding-s-claude-code-sozdanie-lendinga-i-ego-detali) — Влияние контекста на результат.
- [Claude AI: возможности и готовые промпты](https://dtf.ru/howto/5013694-claude-ai-vozmozhnosti-nevroseti) — Сценарии и шаблоны.

### YouTube

- [Claude Code: ПОЛНЫЙ КУРС 2026 (4+ часа)](https://www.youtube.com/watch?v=e6JOw0PliRw) — Длинный курс с практикой.
- [Claude Code: ПОЛНЫЙ ГАЙД 2026 (2+ часа)](https://www.youtube.com/watch?v=kFpX1FftH70) — Структурированный курс.
- [Claude Code: настройка, MCP и Subagent Driven разработка](https://www.youtube.com/watch?v=_4ZcgpvDliA) — Фокус на MCP и субагентах.
- [Claude Code: всё за 2 часа](https://www.youtube.com/watch?v=dn3CuC-2NiI) — Альтернативный обзор.
- [Я потратил на Claude Code 1000 часов. Вайб-кодинг](https://www.youtube.com/watch?v=sx6ZSbc51gY) — Личный опыт автора.
- [Claude на МАКСИМУМ — гайд за 11 минут](https://www.youtube.com/watch?v=erdJvTR0hcU) — Компактный обзор.
- [Создавай ИИ-агентов с Claude Code — все функции за 22 минуты](https://www.youtube.com/watch?v=iwyHt30Ty0c) — MCP, субагенты, скиллы, hooks, permissions.
- [Claude Code или Codex? Честный тест](https://www.youtube.com/watch?v=OethkCDGwuM) — Сравнение на реальном продукте.
- [Claude Code для дизайнеров](https://www.youtube.com/watch?v=OiXq8xhJ-wg) — UX/UI-фокус.
- [Claude станет в 10 раз умнее, если подключишь это](https://www.youtube.com/watch?v=eTrUEZ9E9aI) — MCP-инструменты для усиления.
- [Регистрация в Claude AI в России](https://www.youtube.com/watch?v=2ypCr-Gz-t0) — Практический гайд.

---

## Безопасность и enterprise

- [Security best practices](https://docs.claude.com/en/docs/claude-code/security) — Официальный гайд.
- [Permissions / IAM](https://docs.claude.com/en/docs/claude-code/iam) — Настройка прав, `allowManagedHooksOnly` для enterprise.
- [trailofbits/skills](https://github.com/trailofbits/skills) — Security-скиллы Trail of Bits: CodeQL/Semgrep, code auditing.
- [firebase/agent-skills@firestore-security-rules-auditor](https://skills.sh/firebase/agent-skills/firestore-security-rules-auditor) — Аудит Firestore rules перед прод-релизом, 20K+ установок.
- [snyk/claude-code-pre-commit](https://github.com/snyk/claude-code-pre-commit) — Snyk security scan на pre-commit.
- [Anthropic enterprise governance](https://www.anthropic.com/enterprise) — Корпоративный governance.

### Enterprise patterns

- [Managed plugin marketplaces](https://docs.claude.com/en/docs/claude-code/plugins#managed) — Vetted скиллы только из своего marketplace.
- [Permission policies](https://docs.claude.com/en/docs/claude-code/permissions#policy) — Org-wide allowlist Bash-команд.
- [Hooks reference](https://docs.claude.com/en/docs/claude-code/hooks) — Schema всех событий для аудита/блокировок.
- [examples/hooks/audit.sh](./examples/hooks/scripts/audit.sh) — JSONL-аудит каждого PostToolUse для compliance.

---

## Прочие ресурсы

### Промптинг

- [Anthropic Prompting Guide](https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview) — Официальный гайд.
- [Anthropic Cookbook](https://github.com/anthropics/anthropic-cookbook) — Примеры паттернов с кодом.
- [Claude API Skills best practices](https://platform.claude.com/docs/ru/agents-and-tools/agent-skills/best-practices) — Официальный документ на русском.
- [dair-ai/Prompt-Engineering-Guide](https://github.com/dair-ai/Prompt-Engineering-Guide) — Академический гайд, 50k+⭐.
- [f/awesome-chatgpt-prompts](https://github.com/f/awesome-chatgpt-prompts) — Готовые промпты, применимы и к Claude.
- [PatrickJS/awesome-cursorrules](https://github.com/PatrickJS/awesome-cursorrules) — `.cursorrules` для разных стеков, многие переносимы в CLAUDE.md.

### Каналы и сообщества

- [@cc_consultant (Telegram, RU)](https://t.me/cc_consultant) — Этот handbook и ежедневные разборы.
- [Anthropic Discord](https://www.anthropic.com/discord) — Каналы `#claude-code`, `#skills-and-tools`, `#show-and-tell`.
- [r/ClaudeAI](https://www.reddit.com/r/ClaudeAI/) — Reddit-сообщество.
- [r/Anthropic](https://www.reddit.com/r/Anthropic/) — Официальный сабреддит.

### Подкасты и YouTube (EN)

- [Latent Space (swyx)](https://www.latent.space/) — AI engineering, регулярные выпуски про Claude Code и MCP.
- [The Cognitive Revolution](https://www.cognitiverevolution.ai/) — Nathan Labenz, AI-индустрия и тренды.
- [Practical AI (Changelog)](https://changelog.com/practicalai) — Практические кейсы AI.
- [Anthropic (YouTube)](https://www.youtube.com/@anthropic-ai) — Релизы и техдемки.
- [Matt Pocock](https://www.youtube.com/@mattpocockuk) — TypeScript и AI tools.
- [ThePrimeagen](https://www.youtube.com/@ThePrimeagen) — AI workflow с критическим взглядом.

### Twitter / X — практики

- [@AnthropicAI](https://twitter.com/AnthropicAI) — Официальный аккаунт.
- [@alexalbert__](https://twitter.com/alexalbert__) — Alex Albert, DevRel в Anthropic.
- [@swyx](https://twitter.com/swyx) — AI engineering, Latent Space.
- [@simonw](https://twitter.com/simonw) — Simon Willison, разборы LLM tooling.
- [@mattpocockuk](https://twitter.com/mattpocockuk) — Matt Pocock, TDD-скиллы.
- [@obra](https://twitter.com/obra) — Jesse Vincent, автор `obra/superpowers`.

### Сравнение с другими CLI-агентами

- [Cursor](https://cursor.com/) — IDE-first, отдельный редактор на VS Code, сильный autocomplete.
- [GitHub Copilot](https://github.com/features/copilot) — Встроен в IDE, фокус на autocomplete + chat.
- [Aider](https://aider.chat/) — CLI-first, open-source, мульти-модельный.
- [Cline](https://github.com/cline/cline) — VS Code-расширение с агентным режимом.
- [Continue](https://www.continue.dev/) — Open-source autocomplete + chat в IDE.
- [OpenAI Codex CLI](https://github.com/openai/codex) — Официальный CLI-агент OpenAI.
- [Google Gemini CLI](https://github.com/google-gemini/gemini-cli) — CLI-агент от Google.
- [Windsurf (Codeium)](https://codeium.com/windsurf) — IDE-агент Codeium.

### Утилиты

- [Anthropic Console](https://console.anthropic.com/) — Playground, библиотека промптов, API keys.
- [Anthropic Workbench](https://console.anthropic.com/workbench) — UI для экспериментов с промптами.
- [Anthropic Status](https://status.anthropic.com/) — Статус сервисов.
- [Claude release notes](https://docs.claude.com/en/release-notes/claude-code) — Официальный changelog.
- [Skills.sh](https://skills.sh/) — Маркетплейс скиллов с install-count.

---

## Как добавить ресурс

1. Открой PR с одной строкой в подходящем разделе.
2. Формат: `- [Название](url) — одна строка о том, для чего полезно.`
3. URL-слаги в ссылках на скиллы/плагины/MCP **остаются английскими** (как в источнике). Только описание на русском. Перевод слагов ломает реальные ссылки на skills.sh и GitHub.
4. Перед PR убедись:
   - ресурс работает с актуальной версией Claude Code;
   - нет дубликата в списке;
   - ссылка публичная (GitHub / docs / статья);
   - описание без маркетинга («революционный», «must-have», «прорывной» — нет).

Подробнее — в [CONTRIBUTING.md](./CONTRIBUTING.md).

## Лицензия

[CC0](./LICENSE) — список и тексты можно свободно использовать, копировать, адаптировать. Код в `examples/` под MIT.
