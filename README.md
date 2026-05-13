# Claude Code Handbook на русском

> Курируемый handbook для тех, кто использует [Claude Code](https://docs.claude.com/en/docs/claude-code/overview) в работе — скиллы, slash-команды, hooks, MCP-серверы, плагины, шаблоны и кейсы.
>
> Не «awesome-list ради списка», а отобранное — то, что я и контрибьюторы реально применяем в клиентских проектах. Каждая позиция со ссылкой на источник и короткой пометкой, для чего полезно.
>
> Обновления и разборы — в Telegram [@cc_consultant](https://t.me/cc_consultant).
>
> 📚 **[Полный каталог →](./catalog/README.md)** — 1411+ записей: все известные MCP-серверы (827), скиллы (162), субагенты (160), плагины, hooks и проекты экосистемы из 11 публичных awesome-lists. Главный README — куратный, каталог — для поиска по объёму.

[![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

---

## Что такое Claude Code

[Claude Code](https://docs.claude.com/en/docs/claude-code/overview) — CLI и IDE-агент от Anthropic для разработки. Работает в терминале, VS Code и JetBrains, поддерживает кастомные скиллы, hooks, MCP-серверы и плагины.

Установка:

```bash
npm install -g @anthropic-ai/claude-code
claude
```

## Содержание

- [Официальное](#официальное)
- [Скиллы (Skills)](#скиллы)
- [Sub-agents](#sub-agents)
- [Plugins](#plugins)
- [Hooks](#hooks)
- [Slash-команды](#slash-команды)
- [MCP-серверы](#mcp-серверы)
- [Шаблоны CLAUDE.md](#шаблоны-claudemd)
- [Workflow и кейсы](#workflow-и-кейсы)
- [Безопасность и enterprise](#безопасность-и-enterprise)
- [Промптинг](#промптинг)
- [Гайды и статьи на русском](#гайды-и-статьи-на-русском)
- [YouTube на русском](#youtube-на-русском)
- [Каналы и подкасты](#каналы-и-подкасты)
- [Сравнение с другими инструментами](#сравнение-с-другими-инструментами)
- [Как добавить ресурс](#как-добавить-ресурс)

---

## Официальное

- [Документация Claude Code](https://docs.claude.com/en/docs/claude-code/overview) — официальный референс.
- [Quickstart](https://docs.claude.com/en/docs/claude-code/quickstart) — установка и первые шаги.
- [Settings](https://docs.claude.com/en/docs/claude-code/settings) — `settings.json`, permissions, env vars.
- [Hooks reference](https://docs.claude.com/en/docs/claude-code/hooks) — события и схема hook'ов.
- [Skills documentation](https://docs.claude.com/en/docs/claude-code/skills) — что такое скиллы и как их писать.
- [Sub-agents](https://docs.claude.com/en/docs/claude-code/sub-agents) — параллельные агенты со своим контекстом.
- [Plugins](https://docs.claude.com/en/docs/claude-code/plugins) — система плагинов и marketplace.
- [GitHub: anthropics/claude-code](https://github.com/anthropics/claude-code) — официальный репозиторий, changelog, issues.
- [Anthropic Discord](https://www.anthropic.com/discord) — каналы `#claude-code`, `#skills-and-tools`, `#show-and-tell`.
- [r/ClaudeAI](https://www.reddit.com/r/ClaudeAI/) — активное англоязычное сообщество.

## Скиллы

Skills — переиспользуемые наборы инструкций, которые Claude подгружает по триггеру. См. [официальный гайд](https://docs.claude.com/en/docs/claude-code/skills).

> 📂 Полный каталог скиллов: **[162 записей →](./catalog/skills.md)**

### 🏆 Топ скиллов (по install-count из [skills.sh](https://skills.sh))

Самые установленные в community — ранжированы по реальной телеметрии маркетплейса skills.sh, не по звёздам на GitHub. Ставится одной командой: `npx skills add <owner/repo@skill>`.

| Скилл | Что делает | Установок |
|---|---|---:|
| [anthropics/skills@frontend-design](https://skills.sh/anthropics/skills/frontend-design) | Заставляет Claude не делать «AI slop»-дизайн. Работает с React + Tailwind. | **405K** |
| [vercel-labs/agent-skills@vercel-react-best-practices](https://skills.sh/vercel-labs/agent-skills/vercel-react-best-practices) | React/Next.js perf-практики от Vercel Engineering. | **395K** |
| [vercel-labs/agent-skills@web-design-guidelines](https://skills.sh/vercel-labs/agent-skills/web-design-guidelines) | Web Interface Guidelines — review UI на соответствие. | **316K** |
| [microsoft/azure-skills@azure-deploy](https://skills.sh/microsoft/azure-skills/azure-deploy) | Деплой в Azure из Claude Code. | **312K** |
| [obra/superpowers@brainstorming](https://skills.sh/obra/superpowers/brainstorming) | Структурированный брейншторм до начала работы. Часть [obra/superpowers](https://github.com/obra/superpowers). | **155K** |
| [xixu-me/skills@github-actions-docs](https://skills.sh/xixu-me/skills/github-actions-docs) | GitHub Actions: синтаксис, триггеры, runners, OIDC, troubleshooting. | **131K** |
| [larksuite/cli@lark-workflow-meeting-summary](https://skills.sh/larksuite/cli/lark-workflow-meeting-summary) | Авто-резюме встреч в Lark. | **122K** |
| [vercel-labs/agent-skills@vercel-react-native-skills](https://skills.sh/vercel-labs/agent-skills/vercel-react-native-skills) | React Native best practices. | **116K** |
| [mattpocock/skills@tdd](https://skills.sh/mattpocock/skills/tdd) | TDD-цикл (red-green-refactor) с дисциплиной. От Matt Pocock. | **96K** |
| [arvindrk/extract-design-system@extract-design-system](https://skills.sh/arvindrk/extract-design-system/extract-design-system) | Извлечение design-system из существующего сайта. | **93K** |
| [obra/superpowers@systematic-debugging](https://skills.sh/obra/superpowers/systematic-debugging) | Системный debugging — гипотезы, изоляция, root cause. | **94K** |
| [obra/superpowers@requesting-code-review](https://skills.sh/obra/superpowers/requesting-code-review) | Запросить ревью у саб-агента перед коммитом. | **82K** |
| [mattpocock/skills@grill-with-docs](https://skills.sh/mattpocock/skills/grill-with-docs) | «Допрашивай» документацию — find-grep по docs. | **79K** |
| [obra/superpowers@subagent-driven-development](https://skills.sh/obra/superpowers/subagent-driven-development) | Делегирование независимых задач саб-агентам. | **70K** |
| [anthropics/skills@webapp-testing](https://skills.sh/anthropics/skills/webapp-testing) | Тестирование веб-приложений через Playwright. | **68K** |
| [obra/superpowers@verification-before-completion](https://skills.sh/obra/superpowers/verification-before-completion) | Проверить что задача реально сделана, до отчёта «готово». | **68K** |
| [obra/superpowers@receiving-code-review](https://skills.sh/obra/superpowers/receiving-code-review) | Как принимать review-feedback с технической строгостью. | **65K** |
| [pbakaus/impeccable@frontend-design](https://skills.sh/pbakaus/impeccable/frontend-design) | Premium frontend design (Paul Bakaus). | **53K** |
| [leonxlnx/taste-skill@design-taste-frontend](https://skills.sh/leonxlnx/taste-skill/design-taste-frontend) | Senior UI/UX engineer — переопределяет дефолтные LLM-биасы. | **53K** |
| [anthropics/skills@mcp-builder](https://skills.sh/anthropics/skills/mcp-builder) | Пошаговое создание MCP-серверов. | **53K** |
| [vercel-labs/agent-skills@deploy-to-vercel](https://skills.sh/vercel-labs/agent-skills/deploy-to-vercel) | Деплой на Vercel. | **50K** |
| [get-convex/agent-skills@convex-performance-audit](https://skills.sh/get-convex/agent-skills/convex-performance-audit) | Performance-аудит Convex-приложений. | **45K** |
| [google-labs-code/stitch-skills@react:components](https://skills.sh/google-labs-code/stitch-skills/react:components) | React-компоненты по описанию (Google Stitch). | **44K** |
| [wshobson/agents@typescript-advanced-types](https://skills.sh/wshobson/agents/typescript-advanced-types) | Advanced TypeScript patterns. | **41K** |
| [google-labs-code/stitch-skills@enhance-prompt](https://skills.sh/google-labs-code/stitch-skills/enhance-prompt) | Улучшение промпта перед отправкой модели. | **39K** |
| [github/awesome-copilot@git-commit](https://skills.sh/github/awesome-copilot/git-commit) | Conventional commit-сообщения. | **30K** |
| [wshobson/agents@python-performance-optimization](https://skills.sh/wshobson/agents/python-performance-optimization) | Python perf: profiling, оптимизация. | **22K** |
| [firebase/agent-skills@firestore-security-rules-auditor](https://skills.sh/firebase/agent-skills/firestore-security-rules-auditor) | Аудит Firestore security rules. | **20K** |

> **Совет практика:** ставь сразу `obra/superpowers` целиком — это самая полная коллекция (TDD, debugging, planning, brainstorming, code-review). Для конкретного стэка добавь stack-specific (Vercel React, Convex, Firebase, Supabase, Azure, Stripe).
>
> Источник: [skills.sh leaderboard](https://skills.sh) — install-count актуален на момент последнего пересмотра README, числа быстро растут.

### Официальные (от Anthropic)

Полный набор: [anthropics/skills](https://github.com/anthropics/skills).

**Работа с документами:**
- [docx](https://github.com/anthropics/skills/tree/main/skills/docx) — создание, редактирование Word-документов с tracked changes и комментариями.
- [pdf](https://github.com/anthropics/skills/tree/main/skills/pdf) — извлечение текста и таблиц, merge/split, формы.
- [pptx](https://github.com/anthropics/skills/tree/main/skills/pptx) — PowerPoint: layouts, шаблоны, графики, авто-генерация слайдов.
- [xlsx](https://github.com/anthropics/skills/tree/main/skills/xlsx) — Excel: формулы, форматирование, анализ.

**Разработка:**
- [frontend-design](https://github.com/anthropics/skills/blob/main/skills/frontend-design) — заставляет Claude не делать «AI slop»-дизайн, лучше всего работает с React + Tailwind.
- [web-artifacts-builder](https://github.com/anthropics/skills/tree/main/skills/web-artifacts-builder) — HTML-артефакты на React + Tailwind + shadcn/ui.
- [mcp-builder](https://github.com/anthropics/skills/tree/main/skills/mcp-builder) — пошаговое создание MCP-серверов.
- [webapp-testing](https://github.com/anthropics/skills/tree/main/skills/webapp-testing) — тестирование web-приложений через Playwright.

**Дизайн и контент:**
- [algorithmic-art](https://github.com/anthropics/skills/tree/main/skills/algorithmic-art) — генеративное искусство на p5.js.
- [canvas-design](https://github.com/anthropics/skills/tree/main/skills/canvas-design) — статические постеры и арт в PNG/PDF.
- [slack-gif-creator](https://github.com/anthropics/skills/tree/main/skills/slack-gif-creator) — анимированные GIF под Slack.
- [brand-guidelines](https://github.com/anthropics/skills/tree/main/skills/brand-guidelines) — применение брендбука Anthropic в артефактах.
- [internal-comms](https://github.com/anthropics/skills/tree/main/skills/internal-comms) — статус-репорты, рассылки, FAQ.

**Мета:**
- [skill-creator](https://github.com/anthropics/skills/tree/main/skills/skill-creator) — интерактивное создание собственных скиллов через Q&A.

### Community

- [obra/superpowers](https://github.com/obra/superpowers) — 20+ боевых скиллов: TDD, debugging, brainstorming, написание планов. Самая популярная коллекция для Claude Code. Установка: `/plugin marketplace add obra/superpowers-marketplace`.
- [obra/superpowers-lab](https://github.com/obra/superpowers-lab) — экспериментальные скиллы из той же серии.
- [gsd-build/get-shit-done](https://github.com/gsd-build/get-shit-done) — мета-промптинг и spec-driven разработка для Claude Code.
- [trailofbits/skills](https://github.com/trailofbits/skills) — security skills от Trail of Bits: статический анализ через CodeQL/Semgrep, code auditing, поиск уязвимостей.
- [expo/skills](https://github.com/expo/skills) — официальные скиллы для разработки приложений на Expo.
- [shadcn/ui skills](https://ui.shadcn.com/docs/skills) — даёт Claude Code контекст по компонентам shadcn и enforce паттернов.
- [conorluddy/ios-simulator-skill](https://github.com/conorluddy/ios-simulator-skill) — сборка iOS-приложений, навигация по симулятору, тесты.
- [lackeyjb/playwright-skill](https://github.com/lackeyjb/playwright-skill) — браузерная автоматизация через Playwright.
- [chrisvoncsefalvay/claude-d3js-skill](https://github.com/chrisvoncsefalvay/claude-d3js-skill) — визуализации в d3.js.
- [K-Dense-AI/claude-scientific-skills](https://github.com/K-Dense-AI/claude-scientific-skills) — научные скиллы: библиотеки и базы данных.
- [jthack/ffuf_claude_skill](https://github.com/jthack/ffuf_claude_skill) — fuzzing через `ffuf` при пентесте.
- [yusufkaraaslan/Skill_Seekers](https://github.com/yusufkaraaslan/Skill_Seekers) — превращает сайт с документацией в Claude Skill.
- [alonw0/web-asset-generator](https://github.com/alonw0/web-asset-generator) — favicon, app-иконки, OG-картинки.

Большие подборки:
- [travisvn/awesome-claude-skills](https://github.com/travisvn/awesome-claude-skills) — 12k⭐, актуальный куратор скиллов.
- [karanb192/awesome-claude-skills](https://github.com/karanb192/awesome-claude-skills) — 50+ verified skills с разбивкой по типам.

### Локальные примеры

Здесь же, в репозитории:
- [examples/skills/review-staged-changes/](./examples/skills/review-staged-changes/SKILL.md) — sanity check staged изменений перед коммитом.

## Sub-agents

Sub-agent — отдельный экземпляр Claude со своим контекстом, который выполняет подзадачу и возвращает один итоговый ответ. Полезно для read-only исследования и параллельных задач. См. [официальную доку](https://docs.claude.com/en/docs/claude-code/sub-agents).

> 📂 Полный каталог субагентов: **[160 записей →](./catalog/subagents.md)**

- [VoltAgent/awesome-claude-code-subagents](https://github.com/VoltAgent/awesome-claude-code-subagents) — 19k⭐, 131+ субагентов разбитых по категориям: языки программирования, инфраструктура, тестирование, оркестрация. Ставится одной командой через плагин-маркетплейс.
- [rohitg00/awesome-claude-code-toolkit](https://github.com/rohitg00/awesome-claude-code-toolkit) — комплексный toolkit: 135 агентов + 35 скиллов.
- [rahulvrane/awesome-claude-agents](https://github.com/rahulvrane/awesome-claude-agents) — коллекция specialized агентов.

## Plugins

[Claude Code Plugins](https://docs.claude.com/en/docs/claude-code/plugins) — packaging для скиллов, агентов, hooks и MCP-серверов. Один плагин = один артефакт, который ставится через `/plugin marketplace`.

> 📂 Полный каталог плагинов: **[16 записей →](./catalog/plugins.md)**

### Подборки

- [ccplugins/awesome-claude-code-plugins](https://github.com/ccplugins/awesome-claude-code-plugins) — самый большой куратор плагинов по категориям: DevOps, тесты, доки, git, маркетинг, безопасность. Включает `agent-sdk-dev`, `pr-review-toolkit`, `commit-commands`, `feature-dev`, `security-guidance`.
- [athola/claude-night-market](https://github.com/athola/claude-night-market) — 19 production-ready плагинов: git workflows, code review, spec-driven.

## Hooks

Hooks — shell-команды (или HTTP/MCP/prompt-агенты), которые запускаются на события жизненного цикла. См. [hooks reference](https://docs.claude.com/en/docs/claude-code/hooks).

> 📂 Полный каталог связанных проектов: **[8 записей →](./catalog/hooks.md)** (нишевая категория — большая часть hooks живёт внутри плагинов и репозиториев индивидуальных пользователей).

### Локальные примеры

В этом репозитории — три рабочих hook'а с готовыми bash-скриптами:

- [examples/hooks/](./examples/hooks/README.md) — pre-commit на секреты, push-уведомления через ntfy.sh, JSONL-аудит всех действий агента.

Каждый hook — рабочий код, не плейсхолдер: bash + JSON для `settings.json`, с инструкцией куда положить и какие права выставить.

### Идеи и паттерны

Внутри README в [examples/hooks/](./examples/hooks/README.md) — секция «Идеи для своих hooks» с шаблонами:
- блокировка `git push --force` в защищённые ветки;
- авто-формат на `PostToolUse Edit|Write`;
- `permissionDecision: "ask"` для команд со словом `production`;
- cost tracking в CSV из `Stop` события;
- direnv-переключение nvm/pyenv на `CwdChanged`.

## Slash-команды

Кастомные команды в `.claude/commands/*.md`. См. [документацию](https://docs.claude.com/en/docs/claude-code/slash-commands).

Большинство коммьюнити-команд приходят в составе плагинов — см. раздел [Plugins](#plugins). Отдельно стоит посмотреть на пакеты вроде `commit-commands` и `pr-review-toolkit`.

## MCP-серверы

[Model Context Protocol](https://modelcontextprotocol.io/) — стандарт для подключения внешних tools к LLM. Все MCP-серверы работают и в Claude Code, и в Claude Desktop / Cursor.

> 📂 Полный каталог MCP-серверов: **[827 записей →](./catalog/mcp-servers.md)** — самая большая категория, взято из [punkpeye/awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers) и официального реестра.

### Официальные и базовые

- [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers) — официальный набор от Anthropic: `filesystem`, `git`, `postgres`, `slack`, `memory`, `sequentialthinking`, и др.
- [github/github-mcp-server](https://github.com/github/github-mcp-server) — официальный GitHub MCP. Главный must-have: превращает Claude из «генератора кода» в участника процесса issues/PR.
- [MCP registry](https://github.com/modelcontextprotocol/registry) — каталог серверов с поиском.

### Разработка и код

- [zilliztech/claude-context](https://github.com/zilliztech/claude-context) — семантический поиск по кодовой базе, даёт Claude глубокий контекст по всему репо.
- [steipete/claude-code-mcp](https://github.com/steipete/claude-code-mcp) — Claude Code как one-shot MCP-сервер: «агент в твоём агенте».
- [auchenberg/claude-code-mcp](https://github.com/auchenberg/claude-code-mcp) — альтернативная реализация Claude Code в MCP.

### Автоматизация и интеграции

- [czlonkowski/n8n-mcp](https://github.com/czlonkowski/n8n-mcp) — построение n8n workflow'ов через Claude.

### Кураторы под Claude Code

- [Best Claude Code MCP Servers 2026 (Nimbalyst)](https://nimbalyst.com/blog/best-claude-code-mcp-servers/) — ранжированный обзор серверов под Claude Code.
- [50+ Best MCP Servers for Claude Code](https://claudefa.st/blog/tools/mcp-extensions/best-addons) — большая подборка с инструкциями.

> **Правило практика:** пять хорошо подобранных MCP лучше двадцати. Каждый сервер расходует токены контекста на discovery — будь придирчив.

## Шаблоны CLAUDE.md

`CLAUDE.md` в корне репозитория автоматически подгружается в контекст. См. [docs](https://docs.claude.com/en/docs/claude-code/memory).

В этом репозитории три production-шаблона:

- [examples/claude-md-templates/nextjs.md](./examples/claude-md-templates/nextjs.md) — Next.js 16 + React 19 + TypeScript + Tailwind 4.
- [examples/claude-md-templates/python-fastapi.md](./examples/claude-md-templates/python-fastapi.md) — Python 3.13+ + FastAPI + SQLAlchemy 2.0 + Pydantic v2.
- [examples/claude-md-templates/terraform.md](./examples/claude-md-templates/terraform.md) — Terraform 1.13+ с упором на безопасность state.

Каждый шаблон закрывает пять блоков: стек, команды, структура, правила/анти-паттерны, чек-лист перед PR.

> 📂 Полный каталог CLAUDE.md шаблонов и opinionated setup-ов: **[10 записей →](./catalog/templates.md)**

### Известные сборники

- [multica-ai/andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills) — один CLAUDE.md, собранный из практик Andrej Karpathy.
- [garrytan/gstack](https://github.com/garrytan/gstack) — Claude Code-setup от Garry Tan: 23 opinionated tools.

## Workflow и кейсы

Реальные сценарии использования (см. также раздел [Гайды на русском](#гайды-и-статьи-на-русском)):

- [Superpowers blog post (Jesse Vincent)](https://blog.fsck.com/2025/10/09/superpowers/) — обзор автора `obra/superpowers` о том, зачем нужны скиллы и как их строить.
- [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) — persistent context across sessions: подход к памяти агента между сессиями.

## Безопасность и enterprise

- [Security best practices](https://docs.claude.com/en/docs/claude-code/security) — официальный гайд по безопасности.
- [Permissions / IAM](https://docs.claude.com/en/docs/claude-code/iam) — настройка прав, allowManagedHooksOnly для enterprise.
- [trailofbits/skills](https://github.com/trailofbits/skills) — security-скиллы от Trail of Bits.
- В этом репо: [hook для блокировки коммита секретов](./examples/hooks/README.md) — pre-commit detector, который ловит и человека, и агента.

## Промптинг

- [Anthropic Prompting Guide](https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview) — официальный гайд.
- [Anthropic Cookbook](https://github.com/anthropics/anthropic-cookbook) — примеры паттернов с кодом.
- [Claude API Skills best practices](https://platform.claude.com/docs/ru/agents-and-tools/agent-skills/best-practices) — официальный документ на русском.

## Гайды и статьи на русском

> 📂 Полный список RU-статей и YouTube-курсов: **[12 записей →](./catalog/ru-content.md)**

Статьи на Habr (2026):

- [Claude Code в 2026: гайд для тех, кто еще пишет код руками](https://habr.com/ru/articles/987382/) — подробный гайд по AI Coding Agents, рекомендации по тарифам и CLI.
- [Code with Claude 2026: что Anthropic показали разработчикам](https://habr.com/ru/articles/1032588/) — отчёт со второй конференции Anthropic (6 мая 2026, San Francisco).
- [Claude Code — полный гайд и обучение для новичков с нуля](https://habr.com/ru/articles/1033416/) — функции, настройка, best practices по состоянию на март 2026.
- [Claude Code: маршрут обучения и полезные ресурсы (2026)](https://habr.com/ru/articles/983214/) — учебная карта.
- [Claude Code для тех, кто не пишет код: полный разбор](https://habr.com/ru/articles/1017668/) — для продуктовых и менеджеров.
- [Claude Code бесплатно: как использовать ИИ бесплатно в 2026](https://habr.com/ru/articles/1018234/) — про утечку source maps и форк OpenClaude.
- [Claude AI: что умеет нейросеть Anthropic в 2026](https://habr.com/ru/amp/publications/1027572/) — обзорная статья.
- [Claude: как пользоваться нейросетью в России в 2026](https://habr.com/ru/companies/bothub/articles/1023070/) — практический гайд по доступу.

## YouTube на русском

- [Claude Code: ПОЛНЫЙ КУРС 2026 (4+ ЧАСА)](https://www.youtube.com/watch?v=e6JOw0PliRw) — длинный курс с практикой.
- [Claude Code: Полный гайд 2026 — настройка, MCP и Subagent Driven разработка](https://www.youtube.com/watch?v=_4ZcgpvDliA) — фокус на MCP-серверах и субагентах.
- [Claude Code: ПОЛНЫЙ ГАЙД 2026 (2+ часовой курс)](https://www.youtube.com/watch?v=kFpX1FftH70) — структурированный курс.
- [Создавай ИИ-агентов с Claude Code — ВСЕ функции за 22 минуты](https://www.youtube.com/watch?v=iwyHt30Ty0c) — компактный обзор: промпты, MCP, субагенты, скиллы, hooks, permissions.

## Каналы и подкасты

### Telegram (RU)

- [@cc_consultant](https://t.me/cc_consultant) — этот handbook и ежедневные разборы Claude Code из клиентских проектов.

> Раздел открыт для дополнений: PR с русскоязычными каналами про AI-инструменты приветствуется. Критерий — реальная практика и регулярные посты, не агрегатор новостей.

### Discord / Slack (EN)

- [Anthropic Discord](https://www.anthropic.com/discord) — каналы `#claude-code`, `#skills-and-tools`, `#show-and-tell`.

## Сравнение с другими инструментами

- [Cursor](https://cursor.com/) — IDE-first, отдельный редактор на базе VS Code, сильный autocomplete.
- [GitHub Copilot](https://github.com/features/copilot) — встроен в IDE, фокус на автокомплите + chat, корпоративная интеграция.
- [Aider](https://aider.chat/) — CLI-first, open-source, мульти-модельный.
- [Cline](https://github.com/cline/cline) — VS Code-расширение с агентным режимом.
- [OpenClaude](https://habr.com/ru/articles/1018234/) — форк Claude Code после утечки source maps (см. статью).

## Как добавить ресурс

1. Открой PR с одной строкой в соответствующем разделе.
2. Формат: `- [Название](url) — одна строка о том, для чего полезно. Автор: @handle.`
3. Перед PR убедись:
   - ресурс реально работает с актуальной версией Claude Code;
   - нет дубликата в списке;
   - ссылка публичная (GitHub / docs / статья);
   - описание без маркетинга («революционный», «must-have», «прорывной» — нет).

Подробнее — в [CONTRIBUTING.md](./CONTRIBUTING.md).

## Лицензия

[CC0](./LICENSE) — список и тексты можно свободно использовать, копировать, адаптировать. Код в `examples/` под MIT.
