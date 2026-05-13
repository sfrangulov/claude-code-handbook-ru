# Claude Code Handbook на русском

> Курируемый handbook для тех, кто использует [Claude Code](https://docs.claude.com/en/docs/claude-code/overview) в работе — скиллы, slash-команды, hooks, MCP-серверы, плагины, шаблоны и кейсы.
>
> Не «awesome-list ради списка», а отобранное — то, что я и контрибьюторы реально применяем в клиентских проектах. Каждая позиция со ссылкой на источник и короткой пометкой, для чего полезно.
>
> Обновления и разборы — в Telegram [@cc_consultant](https://t.me/cc_consultant).
>
> Этот README — **1013 кликабельных ресурсов с описаниями на русском**: 500+ MCP-серверов по 30 категориям, 144 субагента VoltAgent, 116 плагинов ccplugins, топ-28 скиллов с install-count из skills.sh, hooks-паттерны, шаблоны CLAUDE.md, кейсы, 41 материал на русском (Habr + vc.ru + YouTube + DTF). 97% записей с русским обрамлением, технические термины (Postgres, React, MCP) сохранены на английском как стандарт индустрии.
>
> 📚 **[Дополнительно — полный каталог →](./catalog/README.md)** — ещё 1400 ссылок без описаний для SEO/поиска: 827 MCP, 162 скилла, 160 субагентов и др. из 11 публичных awesome-lists.

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

- [Документация Claude Code](https://docs.claude.com/en/docs/claude-code/overview) — Официальный референс.
- [Quickstart](https://docs.claude.com/en/docs/claude-code/quickstart) — Установка и первые шаги.
- [Settings](https://docs.claude.com/en/docs/claude-code/settings) — Конфигурация Claude Code: `settings.json`, permissions, env vars
- [Hooks reference](https://docs.claude.com/en/docs/claude-code/hooks) — События и схема hook'ов.
- [Skills documentation](https://docs.claude.com/en/docs/claude-code/skills) — Что такое скиллы и как их писать.
- [Sub-agents](https://docs.claude.com/en/docs/claude-code/sub-agents) — Параллельные агенты со своим контекстом.
- [Plugins](https://docs.claude.com/en/docs/claude-code/plugins) — Система плагинов и marketplace.
- [GitHub: anthropics/claude-code](https://github.com/anthropics/claude-code) — Официальный репозиторий, changelog, issues.
- [Anthropic Discord](https://www.anthropic.com/discord) — Каналы `#claude-code`, `#skills-and-tools`, `#show-and-tell`.
- [r/ClaudeAI](https://www.reddit.com/r/ClaudeAI/) — Активное англоязычное сообщество.

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
- [docx](https://github.com/anthropics/skills/tree/main/skills/docx) — Создание, редактирование Word-документов с tracked changes и комментариями.
- [pdf](https://github.com/anthropics/skills/tree/main/skills/pdf) — Извлечение текста и таблиц, merge/split, формы.
- [pptx](https://github.com/anthropics/skills/tree/main/skills/pptx) — PowerPoint: layouts, шаблоны, графики, авто-генерация слайдов.
- [xlsx](https://github.com/anthropics/skills/tree/main/skills/xlsx) — Excel: формулы, форматирование, анализ.

**Разработка:**
- [frontend-design](https://github.com/anthropics/skills/blob/main/skills/frontend-design) — Заставляет Claude не делать «AI slop»-дизайн, лучше всего работает с React + Tailwind.
- [web-artifacts-builder](https://github.com/anthropics/skills/tree/main/skills/web-artifacts-builder) — HTML-артефакты на React + Tailwind + shadcn/ui.
- [mcp-builder](https://github.com/anthropics/skills/tree/main/skills/mcp-builder) — Пошаговое создание MCP-серверов.
- [webapp-testing](https://github.com/anthropics/skills/tree/main/skills/webapp-testing) — Тестирование web-приложений через Playwright.

**Дизайн и контент:**
- [algorithmic-art](https://github.com/anthropics/skills/tree/main/skills/algorithmic-art) — Генеративное искусство на p5.js.
- [canvas-design](https://github.com/anthropics/skills/tree/main/skills/canvas-design) — Статические постеры и арт в PNG/PDF.
- [slack-gif-creator](https://github.com/anthropics/skills/tree/main/skills/slack-gif-creator) — Анимированные GIF под Slack.
- [brand-guidelines](https://github.com/anthropics/skills/tree/main/skills/brand-guidelines) — Применение брендбука Anthropic в артефактах.
- [internal-comms](https://github.com/anthropics/skills/tree/main/skills/internal-comms) — Статус-репорты, рассылки, FAQ.

**Мета:**
- [skill-creator](https://github.com/anthropics/skills/tree/main/skills/skill-creator) — Интерактивное создание собственных скиллов через Q&A.

### Community

- [obra/superpowers](https://github.com/obra/superpowers) — 20+ боевых скиллов: TDD, debugging, brainstorming, написание планов. Самая популярная коллекция для Claude Code. Установка: `/plugin marketplace add obra/superpowers-marketplace`.
- [obra/superpowers-lab](https://github.com/obra/superpowers-lab) — Экспериментальные скиллы из той же серии.
- [gsd-build/get-shit-done](https://github.com/gsd-build/get-shit-done) — Мета-промптинг и spec-driven разработка для Claude Code.
- [trailofbits/skills](https://github.com/trailofbits/skills) — Security skills от Trail of Bits: статический анализ через CodeQL/Semgrep, code auditing, поиск уязвимостей.
- [expo/skills](https://github.com/expo/skills) — Официальные скиллы для разработки приложений на Expo.
- [shadcn/ui skills](https://ui.shadcn.com/docs/skills) — Даёт Claude Code контекст по компонентам shadcn и enforce паттернов.
- [conorluddy/ios-simulator-skill](https://github.com/conorluddy/ios-simulator-skill) — Сборка iOS-приложений, навигация по симулятору, тесты.
- [lackeyjb/playwright-skill](https://github.com/lackeyjb/playwright-skill) — Браузерная автоматизация через Playwright.
- [chrisvoncsefalvay/claude-d3js-skill](https://github.com/chrisvoncsefalvay/claude-d3js-skill) — Визуализации в d3.js.
- [K-Dense-AI/claude-scientific-skills](https://github.com/K-Dense-AI/claude-scientific-skills) — Научные скиллы: библиотеки и базы данных.
- [jthack/ffuf_claude_skill](https://github.com/jthack/ffuf_claude_skill) — Fuzzing через `ffuf` при пентесте.
- [yusufkaraaslan/Skill_Seekers](https://github.com/yusufkaraaslan/Skill_Seekers) — Превращает сайт с документацией в Claude Skill.
- [alonw0/web-asset-generator](https://github.com/alonw0/web-asset-generator) — Favicon, app-иконки, OG-картинки.

Большие подборки:
- [travisvn/awesome-claude-skills](https://github.com/travisvn/awesome-claude-skills) — 12k⭐, актуальный куратор скиллов.
- [karanb192/awesome-claude-skills](https://github.com/karanb192/awesome-claude-skills) — 50+ verified skills с разбивкой по типам.

### Локальные примеры

Здесь же, в репозитории:
- [examples/skills/review-staged-changes/](./examples/skills/review-staged-changes/SKILL.md) — Sanity check staged изменений перед коммитом.

## Sub-agents

Sub-agent — отдельный экземпляр Claude со своим контекстом, который выполняет подзадачу и возвращает один итоговый ответ. Полезно для read-only исследования и параллельных задач. См. [официальную доку](https://docs.claude.com/en/docs/claude-code/sub-agents).

> 📂 Полный каталог субагентов: **[160 записей →](./catalog/subagents.md)**

### Топ-коллекции субагентов

Production-ready коллекции из community. Полный каталог — в [catalog/subagents.md](./catalog/subagents.md).

| Репозиторий | Что внутри |
|---|---|
| **[VoltAgent/awesome-claude-code-subagents](https://github.com/VoltAgent/awesome-claude-code-subagents)** | **144 субагента** по 10 категориям (см. ниже). 19k⭐. Ставится через `claude plugin marketplace add VoltAgent/awesome-claude-code-subagents`. |
| **[obra/superpowers](https://github.com/obra/superpowers)** | 20+ скиллов + субагентов: TDD, debugging, brainstorming, planning, review. Самая популярная коллекция (см. таблицу скиллов выше). |
| **[0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents)** | 100+ субагентов с единым форматом промпта, multi-language, MIT. |
| **[wshobson/agents](https://github.com/wshobson/agents)** | 48 production-ready специалистов с orchestration-паттернами и продвинутыми workflow. |
| **[vijaythecoder/awesome-claude-agents](https://github.com/vijaythecoder/awesome-claude-agents)** | 26 агентов формата AI-команды: Tech Lead, Analyst, специалисты по доменам. |
| **[davepoon/claude-code-subagents-collection](https://github.com/davepoon/claude-code-subagents-collection)** | 36 субагентов с auto-delegation и гайдом по best practices. |
| **[rohitg00/awesome-claude-code-toolkit](https://github.com/rohitg00/awesome-claude-code-toolkit)** | 135 агентов + 35 скиллов + 42 команды в одном toolkit. |
| **[peterkrueck/Claude-Code-Development-Kit](https://github.com/peterkrueck/Claude-Code-Development-Kit)** | Meta-репо: настраивает docs, multi-agent шаблоны, hooks, MCP-серверы. |
| **[webdevtodayjason/sub-agents](https://github.com/webdevtodayjason/sub-agents)** | NPM-устанавливаемый CLI manager субагентов с context-forge интеграцией. |
| **[charles-adedotun/claude-code-sub-agents](https://github.com/charles-adedotun/claude-code-sub-agents)** | Полная экосистема: workflow-stage based, покрывает весь dev lifecycle. |
| **[hesreallyhim/awesome-claude-code-agents](https://github.com/hesreallyhim/awesome-claude-code-agents)** | Orchestration framework с чистым интерфейсом и sophisticated orchestration logic. |
| **[baryhuang/claude-code-by-agents](https://github.com/baryhuang/claude-code-by-agents)** | Desktop-приложение: multi-agent workspace, @agent mentions, локальные + remote агенты. |

### 144 субагента из VoltAgent (по категориям)

Полный inventory коллекции [VoltAgent/awesome-claude-code-subagents](https://github.com/VoltAgent/awesome-claude-code-subagents). Каждый — отдельный `.md`-файл, ставится в `.claude/agents/`. Все категории доступны через plugin-marketplace.

#### 🛠️ Core development

- [api-designer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/01-core-development/api-designer.md) — Дизайн API — REST/GraphQL/gRPC
- [backend-developer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/01-core-development/backend-developer.md) — Backend разработка
- [design-bridge](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/01-core-development/design-bridge.md) — мост между дизайном и кодом
- [electron-pro](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/01-core-development/electron-pro.md) — Разработка десктоп-приложений на Electron
- [frontend-developer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/01-core-development/frontend-developer.md) — Frontend разработка
- [fullstack-developer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/01-core-development/fullstack-developer.md) — Fullstack разработка
- [graphql-architect](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/01-core-development/graphql-architect.md) — Архитектура GraphQL
- [microservices-architect](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/01-core-development/microservices-architect.md) — Microservices архитектура
- [mobile-developer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/01-core-development/mobile-developer.md) — Mobile-приложения
- [ui-designer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/01-core-development/ui-designer.md) — UI-дизайн
- [websocket-engineer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/01-core-development/websocket-engineer.md) — WebSocket — real-time коммуникация

#### 🔤 Language specialists

- [angular-architect](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/02-language-specialists/angular-architect.md) — Архитектура Angular-приложений
- [cpp-pro](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/02-language-specialists/cpp-pro.md) — Разработка на C++
- [csharp-developer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/02-language-specialists/csharp-developer.md) — Разработка на C#
- [django-developer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/02-language-specialists/django-developer.md) — Разработка на Django
- [dotnet-core-expert](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/02-language-specialists/dotnet-core-expert.md) — Разработка на .NET Core
- [dotnet-framework-4.8-expert](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/02-language-specialists/dotnet-framework-4.8-expert.md) — Эксперт .NET Framework 4.8
- [elixir-expert](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/02-language-specialists/elixir-expert.md) — Эксперт по Elixir
- [expo-react-native-expert](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/02-language-specialists/expo-react-native-expert.md) — Expo + React Native — мобильные приложения
- [fastapi-developer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/02-language-specialists/fastapi-developer.md) — Разработка на FastAPI
- [flutter-expert](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/02-language-specialists/flutter-expert.md) — Разработка на Flutter
- [golang-pro](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/02-language-specialists/golang-pro.md) — Разработка на Go
- [java-architect](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/02-language-specialists/java-architect.md) — Java enterprise — архитектор
- [javascript-pro](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/02-language-specialists/javascript-pro.md) — Разработка на JavaScript
- [kotlin-specialist](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/02-language-specialists/kotlin-specialist.md) — Разработка на Kotlin
- [laravel-specialist](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/02-language-specialists/laravel-specialist.md) — Разработка на Laravel
- [nextjs-developer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/02-language-specialists/nextjs-developer.md) — Разработка на Next.js
- [node-specialist](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/02-language-specialists/node-specialist.md) — Node.js — специалист
- [php-pro](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/02-language-specialists/php-pro.md) — Разработка на PHP
- [powershell-5.1-expert](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/02-language-specialists/powershell-5.1-expert.md) — PowerShell 5.1 — эксперт
- [powershell-7-expert](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/02-language-specialists/powershell-7-expert.md) — PowerShell 7 — эксперт
- [python-pro](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/02-language-specialists/python-pro.md) — Разработка на Python
- [rails-expert](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/02-language-specialists/rails-expert.md) — Ruby on Rails — эксперт
- [react-specialist](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/02-language-specialists/react-specialist.md) — Специалист по React
- [rust-engineer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/02-language-specialists/rust-engineer.md) — Разработка на Rust
- [spring-boot-engineer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/02-language-specialists/spring-boot-engineer.md) — Spring Boot — backend на Java
- [sql-pro](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/02-language-specialists/sql-pro.md) — Запросы и оптимизация SQL
- [swift-expert](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/02-language-specialists/swift-expert.md) — Разработка на Swift / iOS
- [symfony-specialist](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/02-language-specialists/symfony-specialist.md) — Разработка на Symfony
- [typescript-pro](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/02-language-specialists/typescript-pro.md) — Разработка на TypeScript
- [vue-expert](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/02-language-specialists/vue-expert.md) — Эксперт по Vue.js

#### ☁️ Infrastructure & DevOps

- [azure-infra-engineer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/03-infrastructure/azure-infra-engineer.md) — Azure — инфраструктура
- [cloud-architect](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/03-infrastructure/cloud-architect.md) — Cloud-архитектор
- [database-administrator](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/03-infrastructure/database-administrator.md) — DBA — admin задачи
- [deployment-engineer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/03-infrastructure/deployment-engineer.md) — Инженер деплоя и pipelines
- [devops-engineer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/03-infrastructure/devops-engineer.md) — DevOps-инженер
- [devops-incident-responder](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/03-infrastructure/devops-incident-responder.md) — DevOps — реакция на инциденты
- [docker-expert](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/03-infrastructure/docker-expert.md) — Docker — контейнеризация
- [incident-responder](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/03-infrastructure/incident-responder.md) — Реагирование на инциденты
- [kubernetes-specialist](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/03-infrastructure/kubernetes-specialist.md) — Эксперт по Kubernetes
- [network-engineer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/03-infrastructure/network-engineer.md) — Сетевая инфра
- [platform-engineer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/03-infrastructure/platform-engineer.md) — Платформа engineering
- [security-engineer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/03-infrastructure/security-engineer.md) — Security engineering — безопасная разработка
- [sre-engineer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/03-infrastructure/sre-engineer.md) — SRE-инженер
- [terraform-engineer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/03-infrastructure/terraform-engineer.md) — Terraform / Infrastructure as Code — инженер
- [terragrunt-expert](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/03-infrastructure/terragrunt-expert.md) — Terragrunt — обвязка над Terraform
- [windows-infra-admin](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/03-infrastructure/windows-infra-admin.md) — Windows-инфраструктура

#### ✅ Quality & security

- [accessibility-tester](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/04-quality-security/accessibility-tester.md) — A11y тестирование
- [ad-security-reviewer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/04-quality-security/ad-security-reviewer.md) — Active Directory — security ревью
- [ai-writing-auditor](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/04-quality-security/ai-writing-auditor.md) — Аудит AI-сгенерированного текста
- [architect-reviewer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/04-quality-security/architect-reviewer.md) — Архитектурный ревьюер
- [chaos-engineer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/04-quality-security/chaos-engineer.md) — Chaos engineering — устойчивость к отказам
- [code-reviewer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/04-quality-security/code-reviewer.md) — Code review — ревьюер кода
- [compliance-auditor](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/04-quality-security/compliance-auditor.md) — Compliance аудит
- [debugger](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/04-quality-security/debugger.md) — Отладка
- [error-detective](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/04-quality-security/error-detective.md) — Поиск багов
- [penetration-tester](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/04-quality-security/penetration-tester.md) — Penetration testing — пентест
- [performance-engineer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/04-quality-security/performance-engineer.md) — Performance optimization — оптимизация
- [powershell-security-hardening](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/04-quality-security/powershell-security-hardening.md) — PowerShell — усиление безопасности
- [qa-expert](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/04-quality-security/qa-expert.md) — QA-эксперт
- [security-auditor](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/04-quality-security/security-auditor.md) — Security audit — аудит безопасности
- [test-automator](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/04-quality-security/test-automator.md) — Тестирование automation
- [ui-ux-tester](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/04-quality-security/ui-ux-tester.md) — UI/UX-тестирование

#### 🧠 Data & AI

- [ai-engineer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/05-data-ai/ai-engineer.md) — AI engineering — разработка AI-систем
- [data-analyst](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/05-data-ai/data-analyst.md) — Data analysis — аналитика данных
- [data-engineer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/05-data-ai/data-engineer.md) — Data engineering — пайплайны данных
- [data-scientist](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/05-data-ai/data-scientist.md) — Data science — анализ и моделирование
- [database-optimizer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/05-data-ai/database-optimizer.md) — Базы данных optimization
- [llm-architect](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/05-data-ai/llm-architect.md) — Архитектура LLM-систем
- [machine-learning-engineer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/05-data-ai/machine-learning-engineer.md) — ML engineering — продакшен ML
- [ml-engineer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/05-data-ai/ml-engineer.md) — ML engineering — продакшен ML (альт.)
- [mlops-engineer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/05-data-ai/mlops-engineer.md) — MLOps — pipeline для ML
- [nlp-engineer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/05-data-ai/nlp-engineer.md) — NLP — обработка естественного языка
- [postgres-pro](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/05-data-ai/postgres-pro.md) — PostgreSQL — эксперт
- [prompt-engineer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/05-data-ai/prompt-engineer.md) — Prompt engineering — проектирование промптов
- [reinforcement-learning-engineer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/05-data-ai/reinforcement-learning-engineer.md) — Reinforcement learning — RL-инженер

#### ⚡ Developer experience

- [build-engineer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/06-developer-experience/build-engineer.md) — Сборка systems
- [cli-developer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/06-developer-experience/cli-developer.md) — Разработка CLI-инструментов
- [dependency-manager](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/06-developer-experience/dependency-manager.md) — Управление зависимостями
- [documentation-engineer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/06-developer-experience/documentation-engineer.md) — Технический писатель документации
- [dx-optimizer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/06-developer-experience/dx-optimizer.md) — Developer experience — улучшение DX
- [git-workflow-manager](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/06-developer-experience/git-workflow-manager.md) — Git workflow-процессы
- [legacy-modernizer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/06-developer-experience/legacy-modernizer.md) — Legacy кода модернизация
- [mcp-developer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/06-developer-experience/mcp-developer.md) — MCP-сервера разработка
- [powershell-module-architect](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/06-developer-experience/powershell-module-architect.md) — Архитектура PowerShell-модулей
- [powershell-ui-architect](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/06-developer-experience/powershell-ui-architect.md) — PowerShell-UI архитектура
- [readme-generator](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/06-developer-experience/readme-generator.md) — генератор README
- [refactoring-specialist](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/06-developer-experience/refactoring-specialist.md) — Рефакторинг
- [slack-expert](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/06-developer-experience/slack-expert.md) — Slack — интеграции
- [tooling-engineer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/06-developer-experience/tooling-engineer.md) — Внутренние инструменты

#### 🎯 Specialized domains

- [api-documenter](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/07-specialized-domains/api-documenter.md) — Документация API
- [blockchain-developer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/07-specialized-domains/blockchain-developer.md) — Blockchain разработка
- [embedded-systems](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/07-specialized-domains/embedded-systems.md) — Embedded systems — встраиваемые системы
- [fintech-engineer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/07-specialized-domains/fintech-engineer.md) — Fintech — финансовые системы
- [game-developer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/07-specialized-domains/game-developer.md) — Game development — разработка игр
- [healthcare-admin](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/07-specialized-domains/healthcare-admin.md) — Healthcare-системы
- [iot-engineer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/07-specialized-domains/iot-engineer.md) — IoT-инженер
- [m365-admin](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/07-specialized-domains/m365-admin.md) — Microsoft 365 — администрирование
- [mobile-app-developer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/07-specialized-domains/mobile-app-developer.md) — Mobile development — мобильные приложения
- [payment-integration](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/07-specialized-domains/payment-integration.md) — Интеграция платёжных систем
- [quant-analyst](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/07-specialized-domains/quant-analyst.md) — Quantitative analysis — количественный анализ
- [risk-manager](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/07-specialized-domains/risk-manager.md) — Управление рисками
- [seo-specialist](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/07-specialized-domains/seo-specialist.md) — SEO-специалист

#### 💼 Business & product

- [business-analyst](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/08-business-product/business-analyst.md) — Бизнес-анализ
- [content-marketer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/08-business-product/content-marketer.md) — Content marketing — контент-маркетинг
- [customer-success-manager](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/08-business-product/customer-success-manager.md) — Customer success — работа с клиентами
- [legal-advisor](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/08-business-product/legal-advisor.md) — Правовая экспертиза
- [license-engineer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/08-business-product/license-engineer.md) — Управление лицензиями
- [product-manager](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/08-business-product/product-manager.md) — Product management — управление продуктом
- [project-manager](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/08-business-product/project-manager.md) — Управление проектами
- [sales-engineer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/08-business-product/sales-engineer.md) — Sales engineering — техническая поддержка продаж
- [scrum-master](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/08-business-product/scrum-master.md) — Scrum master — agile фасилитатор
- [technical-writer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/08-business-product/technical-writer.md) — Технический писатель
- [ux-researcher](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/08-business-product/ux-researcher.md) — UX research — исследование пользователей
- [wordpress-master](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/08-business-product/wordpress-master.md) — WordPress — разработка и поддержка

#### 🎭 Meta & orchestration

- [agent-installer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/09-meta-orchestration/agent-installer.md) — Установщик субагентов
- [agent-organizer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/09-meta-orchestration/agent-organizer.md) — Оркестрация субагентов
- [codebase-orchestrator](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/09-meta-orchestration/codebase-orchestrator.md) — Оркестрация работы по кодовой базе
- [context-manager](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/09-meta-orchestration/context-manager.md) — Управление контекстом сессии
- [error-coordinator](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/09-meta-orchestration/error-coordinator.md) — Координация обработки ошибок
- [it-ops-orchestrator](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/09-meta-orchestration/it-ops-orchestrator.md) — IT operations — оркестрация
- [knowledge-synthesizer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/09-meta-orchestration/knowledge-synthesizer.md) — Синтез знаний из разных источников
- [multi-agent-coordinator](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/09-meta-orchestration/multi-agent-coordinator.md) — Координация мульти-агентных систем
- [performance-monitor](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/09-meta-orchestration/performance-monitor.md) — Мониторинг производительности
- [task-distributor](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/09-meta-orchestration/task-distributor.md) — Распределение задач между агентами
- [workflow-orchestrator](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/09-meta-orchestration/workflow-orchestrator.md) — Оркестрация workflow

#### 🔬 Research & analysis

- [competitive-analyst](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/10-research-analysis/competitive-analyst.md) — Конкурентный анализ
- [data-researcher](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/10-research-analysis/data-researcher.md) — Data research — исследование данных
- [market-researcher](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/10-research-analysis/market-researcher.md) — Маркетинговое исследование
- [project-idea-validator](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/10-research-analysis/project-idea-validator.md) — Валидация продуктовых идей
- [research-analyst](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/10-research-analysis/research-analyst.md) — Аналитик-исследователь
- [scientific-literature-researcher](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/10-research-analysis/scientific-literature-researcher.md) — Research научной литературы
- [search-specialist](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/10-research-analysis/search-specialist.md) — Поиск и извлечение информации
- [trend-analyst](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/10-research-analysis/trend-analyst.md) — Анализ трендов



## Plugins

[Claude Code Plugins](https://docs.claude.com/en/docs/claude-code/plugins) — packaging для скиллов, агентов, hooks и MCP-серверов. Один плагин = один артефакт, который ставится через `/plugin marketplace`.

> 📂 Полный каталог плагинов: **[16 записей →](./catalog/plugins.md)**

### Каталог плагинов

Полный список плагинов из [ccplugins/awesome-claude-code-plugins](https://github.com/ccplugins/awesome-claude-code-plugins), 782⭐. Каждый ставится через `/plugin marketplace add ccplugins/awesome-claude-code-plugins` и `/plugin install <name>`.

#### 🏛️ Официальные плагины Claude Code

- [agent-sdk-dev](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/agent-sdk-dev) — Разработка через Claude Agent SDK
- [pr-review-toolkit](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/pr-review-toolkit") — Набор команд для PR-ревью
- [commit-commands](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/commit-commands) — Генерация commit-сообщений
- [feature-dev](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/feature-dev) — Pipeline разработки фичи
- [security-guidance](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/security-guidance) — Security-checklist по ходу работы

#### ✅ Code quality & testing

- [api-tester](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/api-tester) — Тестирование API
- [bug-detective](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/bug-detective) — Поиск багов
- [code-review](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/code-review) — Code review плагин
- [code-review-assistant](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/code-review-assistant) — Асистент code review
- [code-reviewer](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/code-reviewer) — Code review — ревьюер кода
- [database-performance-optimizer](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/database-performance-optimizer) — Оптимизация БД
- [debug-session](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/debug-session) — Структурированная отладка
- [debugger](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/debugger) — Debugger субагент
- [double-check](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/double-check) — Проверка перед commit
- [optimize](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/optimize) — Оптимизация кода
- [performance-benchmarker](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/performance-benchmarker) — Performance-бенчмарки
- [refractor](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/refractor) — Refactor (опечатка в оригинале)
- [test-file](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/test-file) — Генерация тестов
- [test-results-analyzer](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/test-results-analyzer) — Анализ результатов тестов
- [test-writer-fixer](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/test-writer-fixer) — TDD-pipeline: написание + правка тестов
- [unit-test-generator](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/unit-test-generator) — Генератор unit-тестов

#### 💻 Development & engineering

- [ai-engineer](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/ai-engineer) — AI engineering — разработка AI-систем
- [api-integration-specialist](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/api-integration-specialist) — Интеграция со сторонними API
- [backend-architect](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/backend-architect) — Архитектура backend
- [code-architect](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/code-architect) — Архитектор кода
- [desktop-app-dev](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/desktop-app-dev) — Десктоп-приложения
- [enterprise-integrator-architect](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/enterprise-integrator-architect) — Архитектор enterprise-интеграций
- [flutter-mobile-app-dev](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/flutter-mobile-app-dev) — Flutter — мобильная разработка
- [frontend-developer](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/frontend-developer) — Frontend-разработка
- [mobile-app-builder](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/mobile-app-builder) — Сборка мобильных приложений
- [project-curator](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/project-curator) — Куратор проекта
- [python-expert](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/python-expert) — Python — эксперт
- [rapid-prototyper](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/rapid-prototyper) — Быстрое прототипирование
- [react-native-dev](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/react-native-dev) — React Native — разработка
- [vision-specialist](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/vision-specialist) — Computer vision — компьютерное зрение
- [web-dev](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/web-dev) — Web-разработка

#### 🔀 Git workflow

- [analyze-issue](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/analyze-issue) — Анализ GitHub issue
- [bug-fix](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/bug-fix) — Исправление багов
- [commit](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/commit) — Создание git-коммита
- [create-pr](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/create-pr) — Создание pull request
- [create-pull-request](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/create-pull-request) — Создание pull request (альт.)
- [create-worktrees](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/create-worktrees) — Создание git worktrees
- [fix-github-issue](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/fix-github-issue) — Исправление GitHub issue
- [fix-issue](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/fix-issue) — Исправление проблемы
- [fix-pr](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/fix-pr) — Исправление PR
- [github-issue-fix](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/github-issue-fix) — Фикс GitHub issue (альт.)
- [husky](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/husky) — Husky — конфигурация git hooks
- [pr-issue-resolve](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/pr-issue-resolve) — Резолв PR/issue
- [pr-review](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/pr-review) — Ревью pull request
- [update-branch-name](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/update-branch-name) — Переименование git-ветки

#### ⚙️ Automation & DevOps

- [deployment-engineer](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/deployment-engineer) — Subagent для deployment
- [devops-automator](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/devops-automator) — DevOps automation — автоматизация процессов
- [infrastructure-maintainer](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/infrastructure-maintainer) — Обслуживание инфры
- [monitoring-observability-specialist](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/monitoring-observability-specialist) — Мониторинг и observability
- [n8n-workflow-builder](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/n8n-workflow-builder) — Построение n8n workflow-процессы

#### 📚 Documentation

- [analyze-codebase](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/analyze-codebase) — Анализ кодовой базы
- [changelog-generator](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/changelog-generator) — Генерация changelog
- [codebase-documenter](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/codebase-documenter) — Документирование кодовой базы
- [context7-docs-fetcher](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/context7-docs-fetcher) — Загрузка документации через Context7
- [documentation-generator](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/documentation-generator) — Генератор документации
- [generate-api-docs](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/generate-api-docs) — Генерация API-документации
- [openapi-expert](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/openapi-expert) — OpenAPI — спецификации
- [update-claudemd](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/update-claudemd) — Обновление CLAUDE.md

#### 🎭 Workflow orchestration

- [angelos-symbo](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/angelos-symbo) — мульти-агентная оркестрация задач
- [ceo-quality-controller-agent](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/ceo-quality-controller-agent) — CEO-агент: контроль качества вывода
- [claude-desktop-extension](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/claude-desktop-extension) — расширение для Claude Desktop
- [lyra](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/lyra) — AI workflow-ассистент
- [model-context-protocol-mcp-expert](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/model-context-protocol-mcp-expert) — эксперт по MCP
- [problem-solver-specialist](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/problem-solver-specialist) — специалист по решению нестандартных задач
- [studio-coach](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/studio-coach) — Персональный coach для разработки
- [ultrathink](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/ultrathink) — Расширенный режим размышления

#### 🔒 Security, compliance, legal

- [ai-ethics-governance-specialist](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/ai-ethics-governance-specialist) — AI ethics и governance
- [audit](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/audit) — Аудит проекта
- [compliance-automation-specialist](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/compliance-automation-specialist) — Автоматизация compliance
- [data-privacy-engineer](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/data-privacy-engineer) — Data privacy — GDPR/CCPA-соответствие
- [enterprise-security-reviewer](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/enterprise-security-reviewer) — Enterprise security ревью
- [legal-advisor](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/legal-advisor) — правовая экспертиза
- [legal-compliance-checker](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/legal-compliance-checker) — Legal compliance — юридический чек

#### 📊 Data & analytics

- [analytics-reporter](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/analytics-reporter) — Отчёты по аналитике
- [data-scientist](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/data-scientist) — Data science — анализ и моделирование
- [experiment-tracker](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/experiment-tracker) — Tracking A/B-экспериментов
- [feedback-synthesizer](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/feedback-synthesizer) — Синтез фидбэка от пользователей
- [trend-researcher](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/trend-researcher) — Исследователь трендов

#### 🎨 Design & UX

- [brand-guardian](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/brand-guardian) — Хранитель бренда
- [joker](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/joker) — Развлекательный режим
- [mobile-ux-optimizer](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/mobile-ux-optimizer) — Mobile UX — оптимизация
- [onomastophes](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/onomastophes) — Naming-специалист
- [ui-designer](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/ui-designer) — UI-дизайн
- [ux-researcher](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/ux-researcher) — UX research — исследование пользователей
- [visual-storyteller](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/visual-storyteller) — Визуальный сторителлинг
- [whimsy-injector](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/whimsy-injector) — Внесение креатива и delight

#### 📋 Project & product management

- [discuss](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/discuss) — Дискуссия по теме
- [explore](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/explore) — Исследование кодовой базы
- [plan](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/plan) — Планирование задачи
- [planning-prd-agent](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/planning-prd-agent) — PRD planning — агент планирования
- [prd-specialist](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/prd-specialist) — PRD specialist — Product Requirements Documents
- [project-shipper](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/project-shipper) — Project shipping — доставка проектов
- [sprint-prioritizer](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/sprint-prioritizer) — Приоритизация спринта
- [studio-producer](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/studio-producer) — Studio producer — координация продакшена
- [tool-evaluator](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/tool-evaluator) — Оценка инструментов
- [workflow-optimizer](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/workflow-optimizer) — Оптимизация workflow

#### 🎯 Marketing & growth

- [app-store-optimizer](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/app-store-optimizer) — ASO — App Store оптимизация
- [content-creator](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/content-creator) — создание контента
- [growth-hacker](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/growth-hacker) — Growth hacking — взлом роста
- [instagram-curator](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/instagram-curator) — Instagram-куратор
- [reddit-community-builder](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/reddit-community-builder) — Reddit — построение сообщества
- [tiktok-strategist](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/tiktok-strategist) — TikTok-стратегия
- [twitter-engager](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/twitter-engager) — Twitter engagement — вовлечение в Twitter

#### 💼 Business & sales

- [b2b-project-shipper](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/b2b-project-shipper) — B2B project shipping
- [customer-success-manager](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/customer-success-manager) — Customer success — работа с клиентами
- [enterprise-onboarding-specialist](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/enterprise-onboarding-specialist) — Enterprise onboarding — внедрение в корпорации
- [finance-tracker](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/finance-tracker) — Учёт финансов
- [pricing-packaging-specialist](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/pricing-packaging-specialist) — Pricing и packaging
- [product-sales-specialist](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/product-sales-specialist) — Sales специалист
- [support-responder](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/support-responder) — Поддержка пользователей
- [technical-sales-engineer](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/technical-sales-engineer) — Technical sales — техническая поддержка продаж



## Hooks

Hooks — shell-команды (или HTTP/MCP/prompt-агенты), которые запускаются на события жизненного цикла. См. [hooks reference](https://docs.claude.com/en/docs/claude-code/hooks).

> 📂 Полный каталог связанных проектов: **[8 записей →](./catalog/hooks.md)** (нишевая категория — большая часть hooks живёт внутри плагинов и репозиториев индивидуальных пользователей).

### Локальные примеры

В этом репозитории — три рабочих hook'а с готовыми bash-скриптами:

- [examples/hooks/](./examples/hooks/README.md) — Pre-commit на секреты, push-уведомления через ntfy.sh, JSONL-аудит всех действий агента.

Каждый hook — рабочий код, не плейсхолдер: bash + JSON для `settings.json`, с инструкцией куда положить и какие права выставить.

### Идеи и паттерны

Внутри README в [examples/hooks/](./examples/hooks/README.md) — секция «Идеи для своих hooks» с шаблонами:
- блокировка `git push --force` в защищённые ветки;
- авто-формат на `PostToolUse Edit|Write`;
- `permissionDecision: "ask"` для команд со словом `production`;
- cost tracking в CSV из `Stop` события;
- direnv-переключение nvm/pyenv на `CwdChanged`.

### Community hook-проекты и обвязки

- [Setting up Claude Code hooks (Anthropic blog)](https://www.anthropic.com/news/claude-code-hooks) — Официальный анонс с примерами.
- [claude-code-hooks (carapace-sh)](https://github.com/carapace-sh/claude-code-hooks) — TypeScript SDK для написания hook'ов с типизацией.
- [claude-hooks-toolkit (decoder3000)](https://github.com/decoder3000/claude-hooks-toolkit) — Набор pre-made hooks: format, lint, security check, audit.
- [claude-code-pre-commit (snyk)](https://github.com/snyk/claude-code-pre-commit) — Snyk security scan на pre-commit.
- [ccmgr (johnlindquist)](https://github.com/johnlindquist/ccmgr) — Менеджер для управления hook-конфигом.
- [hook-runner (mattt)](https://github.com/mattt/hook-runner) — Generic hook runner с retry и логированием.

### Сценарии применения hooks

**Безопасность и compliance:**
- Pre-commit detector секретов в staged diff (см. `examples/hooks/pre-commit-secrets.sh`).
- Запрет `git push --force` на main / master / production / release/*.
- `permissionDecision: "ask"` для любых команд со словом `production` или `prod-*`.
- JSONL-аудит каждого PostToolUse (audit-лог для разбора инцидентов).
- Блокировка curl/wget на внешние домены вне whitelist.

**Качество кода:**
- Автоматический `prettier --write` / `ruff format` на PostToolUse `Edit|Write`.
- Запуск `mypy` / `tsc --noEmit` на изменённых файлах.
- ESLint --fix перед сохранением.
- `terraform fmt -recursive` на любые .tf изменения.

**Workflow и удобство:**
- ntfy.sh / Pushover / Telegram push на Notification и Stop события.
- Cost tracking в CSV из Stop события (см. лонгрид).
- `direnv reload` на CwdChanged для переключения окружения.
- Auto-commit с conventional commit messages на Stop.
- Запись скринкаста сессии при SessionStart.

**Архитектурные:**
- Запрет редактирования `package.json` / `lockfile` без явного разрешения.
- Pre-edit grep на использование функции, которую собираемся удалить.
- Pre-create check, что новый файл соответствует структуре проекта (`src/`, `tests/`, `docs/`).

### Дополнительные паттерны

- [Hooks reference в официальной доке](https://docs.claude.com/en/docs/claude-code/hooks) — Полный список событий и схема.
- [Automate workflows with hooks (guide)](https://docs.claude.com/en/docs/claude-code/hooks-guide) — Пошаговый туториал.
- [PRE_COMPACT для context-resilient заметок](https://docs.claude.com/en/docs/claude-code/hooks#precompact) — Сохранение состояния до компактификации.
- [InstructionsLoaded для проверки CLAUDE.md](https://docs.claude.com/en/docs/claude-code/hooks#instructionsloaded) — Валидация что подгрузился ожидаемый CLAUDE.md.
- [FileChanged для watch-режима](https://docs.claude.com/en/docs/claude-code/hooks#filechanged) — Реактивно отвечать на изменения файлов на диске.


## Slash-команды

Кастомные команды в `.claude/commands/*.md`. См. [документацию](https://docs.claude.com/en/docs/claude-code/slash-commands).

Большинство коммьюнити-команд приходят в составе плагинов — см. раздел [Plugins](#plugins). Отдельно стоит посмотреть на пакеты вроде `commit-commands` и `pr-review-toolkit`.

## MCP-серверы

[Model Context Protocol](https://modelcontextprotocol.io/) — стандарт для подключения внешних tools к LLM. Все MCP-серверы работают и в Claude Code, и в Claude Desktop / Cursor.

> 📂 Полный каталог MCP-серверов: **[827 записей →](./catalog/mcp-servers.md)** — самая большая категория, взято из [punkpeye/awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers) и официального реестра.

### Официальные и базовые

- [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers) — Официальный набор от Anthropic: `filesystem`, `git`, `postgres`, `slack`, `memory`, `sequentialthinking`, и др.
- [github/github-mcp-server](https://github.com/github/github-mcp-server) — Официальный GitHub MCP. Главный must-have: превращает Claude из «генератора кода» в участника процесса issues/PR.
- [MCP registry](https://github.com/modelcontextprotocol/registry) — Каталог серверов с поиском.

### Кураторы под Claude Code

- [punkpeye/awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers) — Самый большой каталог MCP-серверов с категориями.
- [Best Claude Code MCP Servers 2026 (Nimbalyst)](https://nimbalyst.com/blog/best-claude-code-mcp-servers/) — Ранжированный обзор серверов под Claude Code.
- [50+ Best MCP Servers for Claude Code](https://claudefa.st/blog/tools/mcp-extensions/best-addons) — Большая подборка с инструкциями.

> **Правило практика:** пять хорошо подобранных MCP лучше двадцати. Каждый сервер расходует токены контекста на discovery — будь придирчив. Если включено 19 серверов — контекст 200k превращается в 70k ещё до старта работы.

### Топ MCP-серверов по категориям

Каталог по доменам — выборка из [punkpeye/awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers) (самый большой источник). Описания на английском как в источнике — большая часть терминов универсальная, переводить нет смысла.

Многим категориям соответствует **полная развёртка в [каталоге](./catalog/mcp-servers.md)** — здесь топ по релевантности для разработчика.

#### 🗄️ Базы данных

- [Aiven-Open/mcp-aiven](https://github.com/Aiven-Open/mcp-aiven) — 🐍 ☁️ 🎖️ - Navigate your [Aiven projects](https://go.aiven.io/mcp-server) и interact с the PostgreSQL®, Apache Kafka®, ClickHouse® и OpenSearch® сервисы
- [alexanderzuev/supabase-mcp-server](https://github.com/alexander-zuev/supabase-mcp-server) — Supabase MCP Server с поддержка SQL query execution и базы данных exploration tools
- [aliyun/alibabacloud-tablestore-mcp-server](https://github.com/aliyun/alibabacloud-tablestore-mcp-server) — ☕ 🐍 ☁️ - MCP сервис для Tablestore, features include adding documents, semantic search для documents на базе vectors и scalars, RAG-friendly, и serverless
- [amineelkouhen/mcp-cockroachdb](https://github.com/amineelkouhen/mcp-cockroachdb) — 🐍 ☁️ - A Model Context Protocol server для managing, monitoring, и querying data in [CockroachDB](https://cockroachlabs.com)
- [andyWang1688/sql-query-mcp](https://github.com/andyWang1688/sql-query-mcp) — A general-purpose MCP-сервер, который lets AI work с multiple баз данных within clear boundaries. поддерживает PostgreSQL and
- [ArcadeData/arcadedb](https://github.com/ArcadeData/arcadedb) — 🎖️ ☕ 🏠 - Built-in MCP-сервер для ArcadeDB, a multi-model базы данных (graph, document, key-value, time-se
- [benborla29/mcp-server-mysql](https://github.com/benborla/mcp-server-mysql) — ☁️ 🏠 - MySQL базы данных integration in NodeJS с configurable access controls и schema inspection
- [bram2w/baserow](https://github.com/bram2w/baserow) — Baserow базы данных integration с table search, list, и row create, read, update, и delete capabilities
- [c4pt0r/mcp-server-tidb](https://github.com/c4pt0r/mcp-server-tidb) — 🐍 ☁️ - TiDB базы данных integration с schema inspection и query capabilities
- [Canner/wren-engine](https://github.com/Canner/wren-engine) — The Semantic Engine для Model Context Protocol(MCP) Clients и AI Agents
- [centralmind/gateway](https://github.com/centralmind/gateway) — 🏎️ 🏠 🍎 🪟 - MCP и MCP SSE Server that automatically generate API на базе базы данных schema и data. поддерживает PostgreSQL, Clickhouse, MySQL, Snowflake, BigQuery, Supabase
- [ChristianHinge/dicom-mcp](https://github.com/ChristianHinge/dicom-mcp) — 🐍 ☁️ 🏠 - DICOM integration to query, read, и move medical images и reports из PACS и other DICOM compliant systems
- [chroma-core/chroma-mcp](https://github.com/chroma-core/chroma-mcp) — 🎖️ 🐍 ☁️ 🏠 - Chroma MCP-сервер для access local и cloud Chroma instances для retrieval capabilities
- [ClickHouse/mcp-clickhouse](https://github.com/ClickHouse/mcp-clickhouse) — 🐍 ☁️ - ClickHouse базы данных integration с schema inspection и query capabilities
- [codeurali/mcp-dataverse](https://github.com/codeurali/mcp-dataverse) — 📇 🏠 ☁️ - Microsoft Dataverse MCP server с 63 tools для entity CRUD, FetchXML/OData queries, metadata inspection, workflow execution, audit l
- [confluentinc/mcp-confluent](https://github.com/confluentinc/mcp-confluent) — 🐍 ☁️ - Confluent integration to interact с Confluent Kafka и Confluent Cloud REST API
- [corebasehq/coremcp](https://github.com/corebasehq/coremcp) — 🏎️ ☁️ 🏠 - A secure, tunnel-native базы данных bridge для AI agents. Connects localhost & on-premise баз данных (MSSQL, etc.) to LLMs с AST-based query safety и PII masking
- [Couchbase-Ecosystem/mcp-server-couchbase](https://github.com/Couchbase-Ecosystem/mcp-server-couchbase) — 🎖️ 🐍 ☁️ 🏠 - Couchbase MCP server provides unfied access to both Capella cloud и self-managed clusters для document operations, SQL++ queries и естественный язык data analysis
- [cr7258/elasticsearch-mcp-server](https://github.com/cr7258/elasticsearch-mcp-server) — MCP Server implementation that provides Elasticsearch interaction
- [crystaldba/postgres-mcp](https://github.com/crystaldba/postgres-mcp) — All-in-one MCP-сервер для Postgres development и operations, с tools для performance analysis, tuning, и health checks
- [Dataring-engineering/mcp-server-trino](https://github.com/Dataring-engineering/mcp-server-trino) — 🐍 ☁️ - Trino MCP-сервер для query и access data из Trino Clusters
- [davewind/mysql-mcp-server](https://github.com/dave-wind/mysql-mcp-server) — 🏎️ 🏠 A – user-friendly read-only mysql MCP-сервер для cursor и n8n
- [designcomputer/mysql_mcp_server](https://github.com/designcomputer/mysql_mcp_server) — MySQL базы данных integration с configurable access controls, schema inspection, и comprehensive security guidelines
- [domdomegg/airtable-mcp-server](https://github.com/domdomegg/airtable-mcp-server) — Airtable базы данных integration с schema inspection, read и write capabilities
- [edwinbernadus/nocodb-mcp-server](https://github.com/edwinbernadus/nocodb-mcp-server) — 📇 ☁️ - Nocodb базы данных integration, read и write capabilities
- [ergut/mcp-bigquery-server](https://github.com/ergut/mcp-bigquery-server) — 📇 ☁️ - Server implementation для Google BigQuery integration that enables direct BigQuery базы данных access и querying capabilities
- [f4ww4z/mcp-mysql-server](https://github.com/f4ww4z/mcp-mysql-server) — Node.js-based MySQL базы данных integration that provides secure MySQL базы данных operations
- [ferrants/memvid-mcp-server](https://github.com/ferrants/memvid-mcp-server) — Python Streamable HTTP Server you can run locally to interact с [memvid](https://github.com/Olow304/memvid) storage и semantic search
- [fireproof-storage/mcp-database-server](https://github.com/fireproof-storage/mcp-database-server) — 📇 ☁️ - Fireproof ledger базы данных с multi-user sync
- [Michael2150/flamerobin-mcp-server](https://github.com/Michael2150/flamerobin-mcp-server) — #️⃣ 🏠 🪟 - Firebird базы данных MCP-сервер, который reads connection details из [FlameRobin's](http://www.flame

#### 🔀 Version control (Git, GitHub, GitLab)

- [adhikasp/mcp-git-ingest](https://github.com/adhikasp/mcp-git-ingest) — Read и analyze GitHub repositories с your LLM
- [costajohnt/oss-autopilot](https://github.com/costajohnt/oss-autopilot) — 📇 ☁️ 🏠 🍎 🪟 🐧 - Open source contribution manager с PR tracking across repos, issue discovery, CI failure diagnosis, и maintainer
- [ddukbg/github-enterprise-mcp](https://github.com/ddukbg/github-enterprise-mcp) — 📇 ☁️ 🏠 - MCP-сервер для GitHub Enterprise API integration
- [gitea/gitea-mcp](https://gitea.com/gitea/gitea-mcp) — 🎖️ 🏎️ ☁️ 🏠 🍎 🪟 🐧 - Interactive с Gitea instances с MCP
- [github/github-mcp-server](https://github.com/github/github-mcp-server) — 📇 ☁️ - Official GitHub server для integration с repository management, PRs, issues, и more
- [gitopia/gitopia-mcp-server](https://github.com/gitopia/gitopia-mcp-server) — 🏎️ 🏠 🍎 🪟 🐧 - Decentralized Git с on-chain governance, bounties, и DAOs. Tools для repos, issues, PRs, labels, releases, bounties, и DAO pr
- [jmrplens/gitlab-mcp-server](https://github.com/jmrplens/gitlab-mcp-server) — 🏎️ ☁️ 🏠 🍎 🪟 🐧 - Complete GitLab REST API v4 coverage с 1006 MCP tools across 162 domains, 42 meta-tools, 24 resources, and
- [JaviMaligno/mcp-server-bitbucket](https://github.com/JaviMaligno/mcp-server-bitbucket) — 🐍 ☁️ - Bitbucket MCP server с 58 tools для repository management, PRs, pipelines, branches, commits, deployments, webhooks, tags, branch restrictions, и source browsing
- [kaiyuanxiaobing/atomgit-mcp-server](https://github.com/kaiyuanxiaobing/atomgit-mcp-server) — 📇 ☁️ - Official AtomGit server для integration с repository management, PRs, issues, branches, labels, и more
- [kopfrechner/gitlab-mr-mcp](https://github.com/kopfrechner/gitlab-mr-mcp) — 📇 ☁️ - Interact seamlessly с issues и merge requests of your GitLab projects
- [modelcontextprotocol/server-git](https://github.com/modelcontextprotocol/servers-archived/tree/main/src/git) — Direct Git repository operations including reading, searching, и analyzing local repositories
- [modelcontextprotocol/server-gitlab](https://github.com/modelcontextprotocol/servers-archived/tree/main/src/gitlab) — 📇 ☁️ 🏠 - GitLab платформа integration для управление проектами и CI/CD operations
- [mshegolev/gitlab-ci-mcp](https://github.com/mshegolev/gitlab-ci-mcp) — 🐍 ☁️ 🏠 - GitLab CI/CD — pipelines, jobs, schedules, MRs, files. Works с any GitLab (SaaS или self-hosted); published on PyPI и in t
- [QuentinCody/github-graphql-mcp-server](https://github.com/QuentinCody/github-graphql-mcp-server) — 🐍 ☁️ - Unofficial GitHub MCP-сервер, который provides access to GitHub's GraphQL API, enabling more powerful и flexible queries для repository data, issues, pull requests, и other GitHub resources
- [raohwork/forgejo-mcp](https://github.com/raohwork/forgejo-mcp) — 🏎️ ☁️ - An MCP-сервер для managing your repositories on Forgejo/Gitea server
- [TamiShaks-2/git-context-mcp](https://github.com/TamiShaks-2/git-context-mcp) — Local MCP-сервер, который provides structured Git repository analysis (project status, recent activity, code map, и risk hotspots) для AI coding agents
- [theonedev/tod](https://github.com/theonedev/tod/blob/main/mcp.md) — 🏎️ 🏠 - A MCP-сервер для OneDev для CI/CD pipeline editing, issue workflow automation, и pull request review
- [Tiberriver256/mcp-server-azure-devops](https://github.com/Tiberriver256/mcp-server-azure-devops) — 📇 ☁️ - Azure DevOps integration для repository management, work items, и pipelines
- [zach-snell/bbkt](https://github.com/zach-snell/bbkt) — 🏎️ ☁️ 🍎 🪟 🐧 - Bitbucket Cloud CLI и MCP server. Manages workspaces, repos, PRs, pipelines, issues, и исходный код. Token introspection hides tools the API key can't us

#### 💻 Developer tools

- [masondelan/selvedge](https://github.com/masondelan/selvedge) — Change tracking для AI-era codebases. AI agents call it to log structured change events (entity + diff + reasoning) before the session ends,
- [sapph1re/mcp-billing-gateway-sdk](https://github.com/sapph1re/mcp-billing-gateway-sdk) — 📇 ☁️ - Billing infrastructure для MCP server operators. Add Stripe subscriptions, per-call credits, tiered p
- [agenticempire/axint](https://github.com/agenticempire/axint) — Apple-native execution layer для AI agents. Compiles TypeScript to validated Swift — App Intents, SwiftUI views, WidgetKit widgets, и full
- [drhalto/agentmako](https://github.com/drhalto/agentmako) — Local-first codebase intelligence engine. Gives coding agents structured context packets, indexed code/schema facts, и diagnostics через MCP
- [marin1321/mcp-devtools](https://github.com/marin1321/mcp-devtools) — Production-grade MCP-сервер для secure access to local dev environments (filesystem, баз данных, processes, OpenAPI). включает
- [EtienneChollet/ontomics](https://github.com/EtienneChollet/ontomics) — Semantic code index that extracts domain concepts, naming conventions, и behavioral similarity из codebases. One tool cal
- [LWTlong/ai-dev-analytics](https://github.com/LWTlong/ai-dev-analytics) — An open-source observability layer для AI coding. Silently tracks dev tokens/time и auto-codifies AI deviations into persistent project rules
- [3KniGHtcZ/codebeamer-mcp](https://github.com/3KniGHtcZ/codebeamer-mcp) — 📇 ☁️ 🍎 🪟 🐧 - Codebeamer ALM integration для managing work items, trackers, и projects. Provides 17 tools для reading и writing items, asso
- [21st-dev/Magic-MCP](https://github.com/21st-dev/magic-mcp) — Создание crafted UI components inspired by the best 21st.dev design engineers
- [runyourempire/4DA](https://github.com/runyourempire/4DA/tree/main/mcp-4da-server) — Dependency intelligence для AI coding agents. Live CVE scanning, dependency health, upgrade planning, ecosystem news, и decision memory. 14
- [mvtandas/wp-cli-mcp](https://github.com/mvtandas/wp-cli-mcp) — Full WordPress management через WP-CLI с 30+ tools для themes, plugins, posts, menus, users, базы данных, scaffolding, и cache. Works locally
- [a-25/ios-mcp-code-quality-server](https://github.com/a-25/ios-mcp-code-quality-server) — iOS code quality analysis и test automation server. Provides comprehensive Xcode test execution, SwiftLint integration, и detailed failure analysis. Operates in both CLI и MCP server modes для direct developer usage и AI assistant integration
- [raye-deng/open-code-review](https://github.com/raye-deng/open-code-review) — 🏠 📇 ☁️ - AI code quality gate detecting hallucinated packages, phantom dependencies, stale API, и AI-specific code defects. MCP Server + CL
- [AaronVick/ECHO_RIFT_MCP](https://github.com/AaronVick/ECHO_RIFT_MCP) — 📇 ☁️ - MCP-сервер для EchoRift infrastructure primitives (BlockWire, CronSynth, Switchboard, Arbiter). Makes EchoRift's agent infrastructure callable as MCP tools so any MCP client can treat EchoRift like a native capability layer
- [AgiMaulana/HuaweiAppGalleryMcp](https://github.com/AgiMaulana/HuaweiAppGalleryMcp) — 🐍 ☁️ 🍎 🪟 🐧 - Huawei AppGallery Connect publishing: upload APK/AAB, update metadata и localizations, submit для r
- [aparajithn/agent-utils-mcp](https://github.com/aparajithn/agent-utils-mcp) — 🐍 ☁️ - Swiss-army-knife utility server для AI agents. 18 tools including JSON validation, base64, hashing, UUID generation, regex testi
- [AI-by-design/primitiv](https://github.com/AI-by-design/primitiv) — Design contract layer для your codebase. Scans Figma, code, Storybook, и token files, reconciles conflicts, и serves a single machine-read
- [aashari/mcp-server-atlassian-bitbucket](https://github.com/aashari/mcp-server-atlassian-bitbucket) — 📇 ☁️ - Atlassian Bitbucket Cloud integration. Enables AI systems to interact с repositories, pull requests, workspaces, и code in real-time
- [aashari/mcp-server-atlassian-confluence](https://github.com/aashari/mcp-server-atlassian-confluence) — 📇 ☁️ - Atlassian Confluence Cloud integration. Enables AI systems to interact с Confluence spaces, pages, и content с automatic ADF to Markdown conversion
- [aashari/mcp-server-atlassian-jira](https://github.com/aashari/mcp-server-atlassian-jira) — 📇 ☁️ - Atlassian Jira Cloud integration. Enables AI systems to interact с Jira projects, issues, comments, и related development information in real-time
- [GeiserX/atlassian-browser-mcp](https://github.com/GeiserX/atlassian-browser-mcp) — 🐍 ☁️ - Browser-backed MCP wrapper для mcp-atlassian с Playwright SSO auth. Enables AI tools to access Atlassian Se
- [abrinsmead/mindpilot-mcp](https://github.com/abrinsmead/mindpilot-mcp) — Visualizes code, architecture и other concepts as mermaid diagrams in a locally hosted web app. Just ask your agent to "show me this in a diagram"
- [admica/FileScopeMCP](https://github.com/admica/FileScopeMCP) — Analyzes your codebase identifying important files на базе dependency relationships. Generates diagrams и importance scores, helping AI assistants understand the codebase
- [mikusnuz/app-publish-mcp](https://github.com/mikusnuz/app-publish-mcp) — 📇 ☁️ - Unified MCP-сервер для App Store Connect & Google Play Console — 91 tools для iOS/Android app management, TestFlight, builds,
- [mikusnuz/cws-mcp](https://github.com/mikusnuz/cws-mcp) — 📇 ☁️ - MCP-сервер для Chrome Web Store extension management — 8 tools для upload, publish, status, staged rollout, и metadata updates
- [mikusnuz/npm-mcp](https://github.com/mikusnuz/npm-mcp) — MCP-сервер для npm package management — 36 tools для publish, version, search, audit, install, и more из your AI assistant
- [Wopee-io/wopee-mcp](https://github.com/Wopee-io/wopee-mcp) — 📇 ☁️ - Autonomous testing для web apps — dispatch AI agents that open real browsers, execute test cases, и report pass/fail с screenshots. Genera
- [wooxogh/adr-mcp-setup](https://github.com/wooxogh/adr-mcp-setup) — Automatically generates Architecture Decision Records (ADRs) из Claude Code conversations через Claude Opus. Features AI quality revi
- [agent-hanju/char-index-mcp](https://github.com/agent-hanju/char-index-mcp) — 🐍 🏠 ☁️ 🍎 🪟 🐧 - Precise character-level string indexing для LLMs. Provides tools для finding, extracting, и manipulating text by exact character position to solve position-based operations
- [CSCSoftware/AiDex](https://github.com/CSCSoftware/AiDex) — Persistent code index MCP server через Tree-sitter для fast, precise code search. Replaces grep с ~50 token responses вместо 2000+. поддерживает 11 languages including C#, TypeScript, Python, Rust, и Go
- [aidemd-mcp/server](https://github.com/aidemd-mcp/server) — Structured `.aide` spec files that give AI agents progressive disclosure into your codebase architecture через MCP
- [Elmoaid/TempoGraph](https://github.com/Elmoaid/TempoGraph) — Code graph context engine с 24 MCP tools для structural code intelligence. Tree-sitter parsing для 170+ languages, dependency graphs, blast rad
- [ellmos-ai/ellmos-codecommander-mcp](https://github.com/ellmos-ai/ellmos-codecommander-mcp) — Developer-focused MCP-сервер для code analysis, JSON repair, encoding fixes, и import or
- [ethbak/icon-composer-mcp](https://github.com/ethbak/icon-composer-mcp) — MCP-сервер для Apple's Icon Composer: programmatically create .icon bundles с Liquid Glass effects (iOS 26+). 12 tools fo
- [akramIOT/MCP_AI_SOC_Sher](https://github.com/akramIOT/MCP_AI_SOC_Sher) — 🐍 ☁️ 📇 - MCP-сервер для do dynamic AI SOC Security Threat analysis для a Text2SQL AI Agent
- [aktsmm/skill-ninja-mcp-server](https://github.com/aktsmm/skill-ninja-mcp-server) — Agent Skill Ninja для MCP: Search, install, и manage AI agent skills (SKILL.md files) из GitHub repositories. Features workspace analysis для personalized recommendations и поддерживает 140+ pre-indexed skills
- [alimo7amed93/webhook-tester-mcp](https://github.com/alimo7amed93/webhook-tester-mcp) — 🐍 ☁️ – A FastMCP-based server для interacting с webhook-test.com. Enables users to create, retrieve, и delete webhooks locally через Claude
- [ambar/simctl-mcp](https://github.com/ambar/simctl-mcp) — 📇 🏠 🍎 A MCP server implementation для iOS Simulator control
- [andrewschreiber/desktopinsights-mcp](https://github.com/andrewschreiber/desktopinsights-mcp) — 📇 ☁️ 🍎 🪟 🐧 - Look up SDKs, frameworks, и dependencies used by 12,000+ macOS и Windows desktop a
- [api7/apisix-mcp](https://github.com/api7/apisix-mcp) — 🎖️ 📇 🏠 MCP-сервер, который поддержка querying и managing all resource in [Apache APISIX](https://github.com/apache/apisix)

#### ☁️ Облачные платформы

- [4everland/4everland-hosting-mcp](https://github.com/4everland/4everland-hosting-mcp) — 🎖️ 📇 🏠 🍎 🐧 - An MCP server implementation для 4EVERLAND Hosting enabling instant deployment of AI-generated code to decentralized storage networks like Greenfield, IPFS, и Arweave
- [aashari/mcp-server-aws-sso](https://github.com/aashari/mcp-server-aws-sso) — 📇 ☁️ 🏠 - AWS Single Sign-On (SSO) integration enabling AI systems to securely interact с AWS resources by initiating SSO login, listing accounts/roles, и executing AWS CLI commands через temporary credentials
- [alexbakers/mcp-ipfs](https://github.com/alexbakers/mcp-ipfs) — 📇 ☁️ - upload и manipulation of IPFS storage
- [aparajithn/agent-deploy-dashboard-mcp](https://github.com/aparajithn/agent-deploy-dashboard-mcp) — 🐍 ☁️ - Unified deployment dashboard MCP server across Vercel, Render, Railway, и Fly.io. 9 tools для deploy stat
- [arnstarn/mcp-server-spotinst](https://github.com/arnstarn/mcp-server-spotinst) — 🐍 ☁️ - MCP-сервер для Spot.io (Spotinst) API с 23 tools для managing Ocean clusters, VNGs, Elastigroups, costs, right
- [antonio-mello-ai/mcp-pfsense](https://github.com/antonio-mello-ai/mcp-pfsense) — Manage pfSense firewalls through AI assistants — firewall rules, DHCP leases/reservations, DNS overrides, gateway monitoring, ARP t
- [antonio-mello-ai/mcp-proxmox](https://github.com/antonio-mello-ai/mcp-proxmox) — Manage Proxmox VE clusters through AI assistants — VMs, containers, snapshots, templates, cloud-init, firewall, и migrations. 29
- [alexei-led/aws-mcp-server](https://github.com/alexei-led/aws-mcp-server) — 🐍 ☁️ - A lightweight but powerful server that enables AI assistants to execute AWS CLI commands, use Unix pipes, и apply prompt templates для common AWS tasks in a safe Docker environment с multi-architecture support
- [alexei-led/k8s-mcp-server](https://github.com/alexei-led/k8s-mcp-server) — A lightweight yet robust server that empowers AI assistants to securely execute Kubernetes CLI commands (`kubectl`, `helm`, `istioctl`, и `argocd`) через Unix pipes in a safe Docker environment с multi-architecture support
- [alexpota/cloudscope-mcp](https://github.com/alexpota/cloudscope-mcp) — 📇 ☁️ - Azure cloud cost management — spending analysis, forecasts, anomaly detection, budgets, optimization recommendations, idle resou
- [aliyun/alibaba-cloud-ops-mcp-server](https://github.com/aliyun/alibaba-cloud-ops-mcp-server) — 🎖️ 🐍 ☁️ - A MCP-сервер, который enables AI assistants to operation resources on Alibaba Cloud, supporting ECS, Cloud Monitor, OOS и widely used cloud products
- [awslabs/mcp](https://github.com/awslabs/mcp) — 🎖️ ☁️ - AWS MCP servers для seamless integration с AWS сервисы и resources
- [bright8192/esxi-mcp-server](https://github.com/bright8192/esxi-mcp-server) — 🐍 ☁️ - A VMware ESXi/vCenter management server на базе MCP (Model Control Protocol), providing simple REST API interfaces для virtual machine management
- [cloudflare/mcp-server-cloudflare](https://github.com/cloudflare/mcp-server-cloudflare) — 🎖️ 📇 ☁️ - Integration с Cloudflare сервисы including Workers, KV, R2, и D1
- [davidlandais/ovh-api-mcp](https://github.com/davidlandais/ovh-api-mcp) — 🦀 ☁️ - Code Mode MCP-сервер для the entire OVH API. Two tools (search + execute) give LLMs access to all OVH endpoints через sandboxed JavaScript,
- [cyclops-ui/mcp-cyclops](https://github.com/cyclops-ui/mcp-cyclops) — 🎖️ 🏎️ ☁️ - An MCP-сервер, который allows AI agents to manage Kubernetes resources through Cyclops abstraction
- [elementfm/mcp](https://gitlab.com/elementfm/mcp) — 🎖️ 🐍 📇 🏠 ☁️ - Open source podcast hosting платформа
- [elevy99927/devops-mcp-webui](https://github.com/elevy99927/devops-mcp-webui) — 🐍 ☁️/🏠 - MCP-сервер для Kubernetes integrated с Open-WebUI, bridging the gap между DevOps и non-technical teams. поддерживает `kubectl` и `helm` operations through natural-language commands
- [erikhoward/adls-mcp-server](https://github.com/erikhoward/adls-mcp-server) — 🐍 ☁️/🏠 - MCP-сервер для Azure Data Lake Storage. It can perform manage containers, read/write/upload/download операции с container files и manage file metadata
- [espressif/esp-rainmaker-mcp](https://github.com/espressif/esp-rainmaker-mcp) — 🎖️ 🐍 🏠 ☁️ 📟 - Official Espressif MCP-сервер для manage и control ESP RainMaker Devices
- [flux159/mcp-server-kubernetes](https://github.com/Flux159/mcp-server-kubernetes) — 📇 ☁️/🏠 - Typescript implementation of Kubernetes cluster операции для pods, deployments, сервисы
- [GeiserX/spinnaker-mcp](https://github.com/GeiserX/spinnaker-mcp) — 🏎️ ☁️ - A bridge that exposes any Spinnaker instance as an MCP server через the Gate API, enabling управление приложения, pipelines, execu
- [hardik-id/azure-resource-graph-mcp-server](https://github.com/hardik-id/azure-resource-graph-mcp-server) — 📇 ☁️/🏠 - A Model Context Protocol server для querying и analyzing Azure resources at scale через Azure Resource Graph, enabling AI assistants to explore и monitor Azure infrastructure
- [hashicorp/terraform-mcp-server](https://github.com/hashicorp/terraform-mcp-server) — 🎖️🏎️☁️ - The official Terraform MCP Server seamlessly integrates с the Terraform ecosystem, enabling provider discovery, module analysis, и direct Registry API integration для advanced Infrastructure as Code workflow-процессы
- [jasonwilbur/cloud-cost-mcp](https://github.com/jasonwilbur/cloud-cost-mcp) — 📇 ☁️ 🍎 🪟 🐧 - Multi-cloud pricing comparison across AWS, Azure, GCP, и OCI с 2,700+ instance types. real-time pricing из public API, workload calculators, и migration savings estimator

#### 🌐 Браузерная автоматизация

- [34892002/bilibili-mcp-js](https://github.com/34892002/bilibili-mcp-js) — A MCP-сервер, который поддерживает searching для Bilibili content. Provides LangChain integration examples и test scripts
- [achiya-automation/safari-mcp](https://github.com/achiya-automation/safari-mcp) — Native Safari браузерная автоматизация для AI agents с 80+ tools. No Chrome dependency, optimized для Apple Silicon с 60% less CPU
- [agent-infra/mcp-server-browser](https://github.com/bytedance/UI-TARS-desktop/tree/main/packages/agent-infra/mcp-servers/browser) — браузерная автоматизация capabilities через Puppeteer, both support local и remote browser connection
- [aparajithn/agent-scraper-mcp](https://github.com/aparajithn/agent-scraper-mcp) — 🐍 ☁️ - веб-скрейпинг MCP-сервер для AI agents. 6 tools: clean content extraction, structured scraping с CSS selectors, full-pag
- [apireno/DOMShell](https://github.com/apireno/DOMShell) — Browse the web через filesystem commands (ls, cd, grep, click). 38 MCP tools map Chrome's Accessibility Tree to a virtual filesystem через a Chrome Extension
- [automatalabs/mcp-server-playwright](https://github.com/Automata-Labs-team/MCP-Server-Playwright) — An MCP-сервер для браузерная автоматизация через Playwright
- [BB-fat/browser-use-rs](https://github.com/BB-fat/browser-use-rs) — 🦀 Lightweight браузерная автоматизация MCP server in Rust с zero dependencies
- [bch1212/agentfetch-mcp](https://github.com/bch1212/agentfetch-mcp) — 🐍 ☁️ 🏠 🍎 🪟 🐧 - Token-budgeted web fetch для AI agents. Auto-routes между Trafilatura, Jina Reader, FireCrawl, и pypdf на базе URL pat
- [bighippoman/intercept-mcp](https://github.com/bighippoman/intercept-mcp) — Multi-tier fallback chain для fetching web content as clean markdown. Handles tweets, YouTube, arXiv, PDFs, и regular pag
- [blackwhite084/playwright-plus-python-mcp](https://github.com/blackwhite084/playwright-plus-python-mcp) — An MCP python server через Playwright для браузерная автоматизация,more suitable для llm
- [browserbase/mcp-server-browserbase](https://github.com/browserbase/mcp-server-browserbase) — 🎖️ 📇 - Automate browser interactions в cloud (e.g. web navigation, data extraction, form filling, и more)
- [browsermcp/mcp](https://github.com/browsermcp/mcp) — Automate your local Chrome browser
- [brutalzinn/simple-mcp-selenium](https://github.com/brutalzinn/simple-mcp-selenium) — An MCP Selenium Server для controlling browsers через естественный язык in Cursor IDE. Perfect для testing, automation, и multi-user scenarios
- [co-browser/browser-use-mcp-server](https://github.com/co-browser/browser-use-mcp-server) — browser-use packaged as an MCP server с SSE transport. включает a dockerfile to run chromium in docker + a vnc server
- [Custodia-Admin/pagebolt-mcp](https://github.com/Custodia-Admin/pagebolt-mcp) — 📇 ☁️ - MCP-сервер для screenshots, PDFs, OG images, и narrated video recording из Claude Desktop, Cursor, и Windsurf
- [eat-pray-ai/yutu](https://github.com/eat-pray-ai/yutu) — 🏎️ 🏠 🍎 🐧 🪟 - A fully functional MCP server и CLI для YouTube to automate YouTube operation
- [executeautomation/playwright-mcp-server](https://github.com/executeautomation/mcp-playwright) — An MCP server через Playwright для браузерная автоматизация и webscrapping
- [eyalzh/browser-control-mcp](https://github.com/eyalzh/browser-control-mcp) — An MCP server paired с a browser extension that enables LLM clients to control the user's browser (Firefox)
- [fradser/mcp-server-apple-reminders](https://github.com/FradSer/mcp-server-apple-reminders) — An MCP-сервер для interacting с Apple Reminders on macOS
- [freema/firefox-devtools-mcp](https://github.com/freema/firefox-devtools-mcp) — Firefox браузерная автоматизация через WebDriver BiDi для testing, scraping, и browser control. поддерживает snapshot/UID-based interactions, network monitoring, console capture, и screenshots

#### 🔍 Поиск и извлечение данных

- [mrslbt/rippr](https://github.com/mrslbt/rippr) — YouTube transcript extraction для AI agents. Clean text, timestamps, или structured JSON из any video. No API keys required. Install через `npx rippr-mcp
- [0xdaef0f/job-searchoor](https://github.com/0xDAEF0F/job-searchoor) — An MCP-сервер для searching job listings с filters для date, keywords, remote work options, и more
- [hanselhansel/aeo-cli](https://github.com/hanselhansel/aeo-cli) — Audit URLs для AI crawler readiness — checks robots.txt, llms.txt, JSON-LD schema, и content density с 0-100 AEO scoring
- [Aas-ee/open-webSearch](https://github.com/Aas-ee/open-webSearch) — 🐍 📇 ☁️ - поиск в вебе через free multi-engine search (NO API KEYS REQUIRED) — поддерживает Bing, Baidu, DuckDuckGo, Brave, Exa, и CSDN
- [AceDataCloud/MCPSerp](https://github.com/AceDataCloud/SerpMCP) — 🐍 ☁️ - Google SERP search including web, images, news, maps, places, videos, и граф знаний results через Ace Data Cloud API
- [AIMLPM/markcrawl](https://github.com/AIMLPM/markcrawl) — Crawl websites into clean Markdown, search pages, и extract structured data с LLMs. Built-in MCP-сервер для web research и RAG pipelines
- [ac3xx/mcp-servers-kagi](https://github.com/ac3xx/mcp-servers-kagi) — 📇 ☁️ - Kagi search API integration
- [adawalli/nexus](https://github.com/adawalli/nexus) — 📇 ☁️ - AI-powered поиск в вебе server через Perplexity Sonar models с source citations. Zero-install setup через NPX
- [ananddtyagi/webpage-screenshot-mcp](https://github.com/ananddtyagi/webpage-screenshot-mcp) — A MCP-сервер для taking screenshots of webpages to use as feedback during UI developement
- [andybrandt/mcp-simple-arxiv](https://github.com/andybrandt/mcp-simple-arxiv) — 🐍 ☁️ MCP для LLM to search и read papers из arXiv
- [andybrandt/mcp-simple-pubmed](https://github.com/andybrandt/mcp-simple-pubmed) — 🐍 ☁️ MCP to search и read medical / life sciences papers из PubMed
- [angheljf/nyt](https://github.com/angheljf/nyt) — 📇 ☁️ - Search articles через the NYTimes API
- [apify/mcp-server-rag-web-browser](https://github.com/apify/mcp-server-rag-web-browser) — 📇 ☁️ - An MCP-сервер для Apify's open-source RAG Web Browser Actor to perform web searches, scrape URLs, и return content in Markdown
- [atlasprzetargow/mcp-server](https://github.com/atlasprzetargow/mcp-server) — 📇 ☁️ - Search 800 000+ Polish public tenders (BZP + TED). Profiles of procuring entities и contractors by NIP, market statis
- [Khamel83/argus](https://github.com/Khamel83/argus) — Multi-provider search broker с automatic fallback, RRF ranking, content extraction, и budget enforcement
- [idapixl/idapixl-web-research-mcp](https://github.com/idapixl/idapixl-web-research-mcp) — 📇 ☁️ - Pay-per-use web research для AI agents on Apify. Search (Brave + DuckDuckGo), fetch pages to clean markdown, и multi-step r
- [Bigsy/Clojars-MCP-Server](https://github.com/Bigsy/Clojars-MCP-Server) — 📇 ☁️ - Clojars MCP-сервер для upto date dependency information of Clojure libraries
- [blazickjp/arxiv-mcp-server](https://github.com/blazickjp/arxiv-mcp-server) — ☁️ 🐍 - Search ArXiv research papers
- [boikot-xyz/boikot](https://github.com/boikot-xyz/boikot) — 🦀☁️ - Model Context Protocol Server для looking up company ethics information. Learn about the ethical и unethical actions of major companies
- [brave/brave-search-mcp-server](https://github.com/brave/brave-search-mcp-server) — 📇 ☁️ - поиск в вебе capabilities через Brave's Search API
- [cameronrye/activitypub-mcp](https://github.com/cameronrye/activitypub-mcp) — A comprehensive MCP-сервер, который enables LLMs to explore и interact с the Fediverse through ActivityPub protocol. Features WebFinger discovery, timeline fetching, instance exploration, и cross-платформа поддержка Mastodon, Pleroma, Misskey, и other ActivityPub servers
- [cameronrye/gopher-mcp](https://github.com/cameronrye/gopher-mcp) — Modern, cross-платформа MCP-сервер для AI assistants to browse и interact с both Gopher protocol и Gemini protocol resources safely и efficiently. Features dual protocol support, TLS security, и structured content extraction
- [cevatkerim/unsplash-mcp](https://github.com/cevatkerim/unsplash-mcp) — 🐍 ☁️ - Unsplash photo search с proper attribution. Returns ready-to-use attribution text и HTML для each photo, making it easy для LLMs to build content pages с properly credited images. включает search, random photos, и download tracking
- [chanmeng/google-news-mcp-server](https://github.com/ChanMeng666/server-google-news) — 📇 ☁️ - Google News integration с automatic topic categorization, multi-language support, и comprehensive search capabilities including headlines, stories, и related topics through [SerpAPI](https://serpapi.com/)
- [chasesaurabh/mcp-page-capture](https://github.com/chasesaurabh/mcp-page-capture) — MCP-сервер, который captures webpage screenshots, с viewport или full-page options и base64 PNG output

#### 💬 Коммуникации (Slack, Discord, email)

- [AbdelStark/nostr-mcp](https://github.com/AbdelStark/nostr-mcp) — ☁️ - A Nostr MCP-сервер, который allows to interact с Nostr, enabling posting notes, и more
- [adhikasp/mcp-twikit](https://github.com/adhikasp/mcp-twikit) — 🐍 ☁️ - Interact с Twitter search и timeline
- [agentmail-toolkit/mcp](https://github.com/agentmail-to/agentmail-toolkit/tree/main/mcp) — An MCP-сервер для create inboxes on the fly to send, receive, и take actions on email. We aren't AI agents для email, but email для AI Agents
- [bababoi-bibilabu/agent-mq](https://github.com/bababoi-bibilabu/agent-mq) — 📇 ☁️ 🏠 - Message queue для AI coding assistants. Let AI agents (Claude Code, Cursor, Codex) send messages to each other across sessions и machin
- [Beltran12138/wecom-docs-mcp-server](https://github.com/Beltran12138/wecom-docs-mcp-server) — WeCom (Enterprise WeChat) document operations через MCP: create, read, и edit docs и Smart
- [areweai/tsgram-mcp](https://github.com/areweai/tsgram-mcp) — TSgram: Telegram + Claude с local workspace access on your phone in typescript. Read, write, и vibe code on the go!
- [arpitbatra123/mcp-googletasks](https://github.com/arpitbatra123/mcp-googletasks) — 📇 ☁️ - An MCP-сервер для интерфейс с the Google Tasks API
- [Cactusinhand/mcp_server_notify](https://github.com/Cactusinhand/mcp_server_notify) — A MCP-сервер, который send desktop notifications с sound effect when agent tasks are completed
- [carterlasalle/mac_messages_mcp](https://github.com/carterlasalle/mac_messages_mcp) — An MCP-сервер, который securely interfaces с your iMessage базы данных через the Model Context Protocol (MCP), allowing LLMs to query и analyze iMessage conversations. It включает robust phone number validation, attachment processing, contact management, group chat handling, и full support для
- [chaindead/telegram-mcp](https://github.com/chaindead/telegram-mcp) — 🏎️ 🏠 - Telegram API integration для accessing user data, managing dialogs (chats, channels, groups), retrieving messages, и handling read status
- [chigwell/telegram-mcp](https://github.com/chigwell/telegram-mcp) — Telegram API integration для accessing user data, managing dialogs (chats, channels, groups), retrieving messages, sending messages и handling read status
- [clawaimail/mcp](https://github.com/joansongjr/clawaimail) — 📇 ☁️ 🍎 🪟 🐧 - Email infrastructure для AI agents. Create inboxes on the fly, send и receive real emails, search messages, и manage threads
- [codefuturist/email-mcp](https://github.com/codefuturist/email-mcp) — 📇 ☁️ 🍎 🪟 🐧 - IMAP/SMTP email MCP server с 42 tools для reading, searching, sending, scheduling, и managing emails across multiple accounts. поддерживает IMAP IDLE push, AI triage, desktop notifications, и auto-detects providers like Gmail, Outlook, и iCloud
- [conarti/mattermost-mcp](https://github.com/conarti/mattermost-mcp) — 📇 ☁️ - MCP-сервер для Mattermost API. List channels, read/post messages, manage threads и reactions, monitor topics. поддерживает flexible configuration через CLI args, environment variables, или config files
- [Danielpeter-99/calcom-mcp](https://github.com/Danielpeter-99/calcom-mcp) — MCP-сервер для Calcom. Manage event types, create bookings, и access Cal.com scheduling data through LLMs
- [discourse/discourse-mcp](https://github.com/discourse/discourse-mcp) — 🎖️ 💎 ☁️ 🏠 💬 🍎 🪟 🐧 - Official Discourse MCP-сервер для forum integration. Search topics, read posts, manage categories и tags, discover users, и interact с Discourse communities
- [cseguinlz/doubletick-cli](https://github.com/cseguinlz/doubletick-cli) — 📇 ☁️ - Email read tracking через Gmail. Send tracked emails, check if they were opened с open count, device, и timi
- [elie222/inbox-zero](https://github.com/elie222/inbox-zero/tree/main/apps/mcp-server) — 🐍 ☁️ - An MCP-сервер для Inbox Zero. Adds functionality on top of Gmail like finding out which emails you need to reply to или need to follow up on
- [ExpertVagabond/solmail-mcp](https://github.com/ExpertVagabond/solmail-mcp) — 📇 ☁️ - Send physical mail с Solana payments — AI agents can compose, price, и send letters и postcards через cryptocurren
- [FastAlertNow/mcp-server](https://github.com/FastAlertNow/mcp-server) — 🎖️ 📇 ☁️ - Official Model Context Protocol (MCP) server для FastAlert. This server allows AI agents (like Claude, ChatGPT, и Cursor) to list of your channels и send notifications directly through the FastAlert API
- [FantomaSkaRus1/telegram-bot-mcp](https://github.com/FantomaSkaRus1/telegram-bot-mcp) — 📇 ☁️ 🏠 - Full-featured Telegram Bot API MCP server с 174 tools covering the entire Bot API
- [gerkensm/callcenter.js-mcp](https://github.com/gerkensm/callcenter.js-mcp) — 📇 ☁️ - An MCP-сервер для make phone calls через VoIP/SIP и OpenAI's Realtime API и observe the transcript
- [GeiserX/telegram-archive-mcp](https://github.com/GeiserX/telegram-archive-mcp) — 🏎️ ☁️ 🍎 🪟 🐧 - Go-based MCP-сервер для Telegram Archive. Search и browse Telegram chat history, list chats, и retriev
- [gitmotion/ntfy-me-mcp](https://github.com/gitmotion/ntfy-me-mcp) — 📇 ☁️ 🏠 - An ntfy MCP-сервер для sending/fetching ntfy notifications to your self-hosted ntfy server из AI Agents 📤 (поддерживает secure token auth & more - use с npx или docker!)
- [gotoolkits/wecombot](https://github.com/gotoolkits/mcp-wecombot-server.git) — 🚀 ☁️ - An MCP server приложение that sends various types of messages к WeCom group robot

#### 📊 Мониторинг и observability

- [alilxxey/openobserve-community-mcp](https://github.com/alilxxey/openobserve-community-mcp) — Read-only MCP-сервер для OpenObserve Community Edition через REST API. Search logs, traces,
- [Alog/alog-mcp](https://github.com/saikiyusuke/alog-mcp) — 📇 ☁️ - AI agent activity logger & monitor MCP server с 20 tools. Post logs, create articles, manage social interactions, и monitor AI agent activities on the Alog платформа
- [avivsinai/langfuse-mcp](https://github.com/avivsinai/langfuse-mcp) — 🐍 ☁️ - Query Langfuse traces, debug exceptions, analyze sessions, и manage prompts. Full observability toolkit для LLM приложения
- [alimuratkuslu/byok-observability-mcp](https://github.com/alimuratkuslu/byok-observability-mcp) — 📇 🏠 ☁️ 🍎 🪟 🐧 - Comprehensive MCP-сервер для Grafana, Prometheus, Kafka UI, и Datadog с a secure "Brin
- [clamp-sh/mcp](https://github.com/clamp-sh/mcp) — 📇 ☁️ 🍎 🪟 🐧 - AI-native web analytics. Query pageviews, top pages, referrers, countries, devices, и custom events. Create conversion funnels и alerts
- [dragogargo/mcp-sysmon](https://github.com/dragogargo/mcp-sysmon) — Local system monitoring — CPU, memory, swap, disk, network, и process management. Find resource-hungry processes, diagnose perfor
- [dynatrace-oss/dynatrace-mcp](https://github.com/dynatrace-oss/dynatrace-mcp) — 🎖️ 📇 ☁️ 🍎 🪟 🐧 - Leverage AI-driven observability, security, и automation to analyze anomalies, logs, traces, events, metrics
- [edgedelta/edgedelta-mcp-server](https://github.com/edgedelta/edgedelta-mcp-server) — 🎖️ 🏎️ ☁️ – Interact с Edge Delta anomalies, query logs / patterns / events, и pinpoint root causes и optimize your pipelines
- [ejcho623/agent-breadcrumbs](https://github.com/ejcho623/agent-breadcrumbs) — 📇 ☁️ 🏠 - Unified agent work logging и observability across ChatGPT, Claude, Cursor, Codex, и OpenClaw с config-first schemas и pluggable sinks
- [getsentry/sentry-mcp](https://github.com/getsentry/sentry-mcp) — 🐍 ☁️ - Sentry.io integration для error tracking и performance monitoring
- [GeiserX/duplicacy-mcp](https://github.com/GeiserX/duplicacy-mcp) — 🏎️ ☁️ 🍎 🪟 🐧 - Go-based MCP-сервер для Duplicacy backup monitoring. Query backup job status и Prometheus metrics из a Duplicacy exporter.
- [GeiserX/genieacs-mcp](https://github.com/GeiserX/genieacs-mcp) — 🏎️ ☁️ 🍎 🪟 🐧 - Go-based MCP-сервер, который bridges any GenieACS (TR-069 ACS) instance, exposing device data, firmware management, и CPE actions (r
- [gjenkins20/unofficial-fortimonitor-mcp-server](https://github.com/gjenkins20/unofficial-fortimonitor-mcp-server) — 🐍 ☁️ 🍎 🪟 🐧 - Unofficial FortiMonitor v2 API integration с 241 tools для
- [gjenkins20/webmin-mcp-server](https://github.com/gjenkins20/webmin-mcp-server) — 🐍 ☁️ 🍎 🐧 - MCP-сервер для Webmin с 61 tools для Linux system administration: сервисы, users, storage, security, баз данных, an
- [grafana/mcp-grafana](https://github.com/grafana/mcp-grafana) — 🎖️ 🐍 🏠 ☁️ - Search dashboards, investigate incidents и query datasources in your Grafana instance
- [hyperb1iss/lucidity-mcp](https://github.com/hyperb1iss/lucidity-mcp) — Enhance AI-generated code quality through intelligent, prompt-based analysis across 10 critical dimensions из complexity to security vulnerabilities
- [iris-eval/mcp-server](https://github.com/iris-eval/mcp-server) — 📇 ☁️ 🏠 🍎 🪟 🐧 - MCP-native agent evaluation и observability server с trace logging, output quality evaluation, cost tracking, 12 built-in ev
- [imprvhub/mcp-status-observer](https://github.com/imprvhub/mcp-status-observer) — 📇 ☁️ - Model Context Protocol server для monitoring Operational Status of major digital платформы in Claude Desktop
- [ingero-io/ingero](https://github.com/ingero-io/ingero) — 🏎️ 🏠 🐧 - eBPF-based GPU causal observability agent с MCP server. Traces CUDA Runtime/Driver API и host kernel events to build causal chains explaining
- [inspektor-gadget/ig-mcp-server](https://github.com/inspektor-gadget/ig-mcp-server) — 🏎️ ☁️ 🏠 🐧 🪟 🍎 - Debug your Container и Kubernetes workloads с an AI интерфейс на базе eBPF
- [inventer-dev/mcp-internet-speed-test](https://github.com/inventer-dev/mcp-internet-speed-test) — 🐍 ☁️ - Internet speed testing с network performance metrics including download/upload speed, latency, jitter analysis, и CDN server detection с geographic mapping
- [last9/last9-mcp-server](https://github.com/last9/last9-mcp-server) — Seamlessly bring real-time production context—logs, metrics, и traces—into your local environment to auto-fix code faster
- [lodordev/mcp-tautulli](https://github.com/lodordev/mcp-tautulli) — Tautulli (Plex media server monitoring) с 11 read-only tools для activity, history, library stats, user stats, transcode analysis, и resolu
- [log-logn/langfuse-mcp-java](https://github.com/Log-LogN/langfuse-mcp-java) — ☕ ☁️ - Query Langfuse traces, debug exceptions, analyze sessions, scores, datasets, schema, observations и manage prompts. Full obser
- [mikusnuz/umami-mcp](https://github.com/mikusnuz/umami-mcp) — 📇 ☁️ - Full-coverage MCP-сервер для Umami Analytics API v2 — 66 tools для websites, stats, sessions, events, reports, users, teams, и realtime monit

#### 🔒 Безопасность

- [alexfleetcommander/agent-trust-stack-mcp](https://github.com/alexfleetcommander/agent-trust-stack-mcp) — 🐍 📇 ☁️ 🏠 🍎 🪟 🐧 - Cryptographic provenance, bilateral blind reputation scoring, и tamper-evident loggi
- [123Ergo/unphurl-mcp](https://github.com/123Ergo/unphurl-mcp) — 📇 ☁️ - URL intelligence для AI agents. 13 tools для security signals и data quality: redirect behaviour, brand impersonation detection, domain age, SSL v
- [13bm/GhidraMCP](https://github.com/13bm/GhidraMCP) — MCP-сервер для integrating Ghidra с AI assistants. This plugin enables binary analysis, providing tools для function inspection, decompilation, memory exploration, и import/export analysis через the Model Context Protocol
- [82ch/MCP-Dandan](https://github.com/82ch/MCP-Dandan) — real-time security framework для MCP servers that detects и blocks malicious AI agent behavior by analyzing tool call patterns и intent across multiple threat detection engines
- [MARUCIE/authbox](https://github.com/MARUCIE/authbox) — 📇 🏎️ 🏠 🍎 🪟 🐧 - Zero-knowledge password manager с MCP credential gateway. BIP-39 seed phrase recovery, deterministic passwords, policy-gated AI agent access (scope,
- [Acacian/aegis](https://github.com/Acacian/aegis) — Policy-based governance для AI agent tool calls. YAML policies, approval gates, risk assessment, и audit logging. Cross-платформа: LangChain, OpenAI, Anthropic,
- [adeptus-innovatio/solvitor-mcp](https://github.com/Adeptus-Innovatio/solvitor-mcp) — Solvitor MCP server provides tools to access reverse engineering tools that help developers extract IDL files из closed-source Solana smart contracts и decompile them
- [KOVY/agentforge-trust-mcp](https://github.com/KOVY/agentforge-trust-mcp) — 📇 ☁️ - Query the AgentForge Trust Score (0-100 across five dimensions: security, code health, behavioral audit, community trust, EU co
- [agentgraph-co/agentgraph](https://github.com/agentgraph-co/agentgraph) — 🐍 ☁️ 🍎 🪟 🐧 - Trust verification и security scanning для AI agents. Checks security posture of third-party MCP servers и tools wi
- [arian-gogani/nobulex](https://github.com/arian-gogani/nobulex) — Proof-of-behavior enforcement для AI agents. Define behavioral covenant rules (permit/forbid/require), enforce at runtime before execu
- [agentward-ai/agentward](https://github.com/agentward-ai/agentward) — Permission control plane для AI agents. MCP proxy that enforces least-privilege YAML policies on every tool call, classifies sensitive d
- [agntor/mcp](https://github.com/agntor/mcp) — 📇 ☁️ 🍎 🪟 🐧 - MCP audit server для agent discovery и certification. Provides trust и payment rail для AI agents including identity verification, escrow, settlement, и reputation management
- [vinaybhosle/agentstamp](https://github.com/vinaybhosle/agentstamp) — 📇 ☁️ - Trust intelligence для AI agents — identity stamps, reputation scoring (0-100), registry, forensic audit trails, и A2A passports
- [jimmyracheta/AI-Runtime-Guard](https://github.com/runtimeguard/runtime-guard) — Runtime policy enforcement для AI agents - prevents accidental damage to your systems, unauthorized agent access и automates back
- [airblackbox/air-blackbox-mcp](https://github.com/airblackbox/air-blackbox-mcp) — EU AI Act compliance scanner для Python AI agents. Scans, analyzes, и remediates LangChain/CrewAI/AutoGen/OpenAI cod
- [AIM-Intelligence/AIM-Guard-MCP](https://github.com/AIM-Intelligence/AIM-MCP) — Security-focused MCP-сервер, который provides safety guidelines и content analysis для AI agents
- [alberthild/shieldapi-mcp](https://github.com/alberthild/shieldapi-mcp) — 📇 ☁️ 🍎 🪟 🐧 - Security intelligence для AI agents: password breach checks (900M+ HIBP hashes), email/domain/IP/URL reputation, prompt injec
- [jagmarques/asqav-mcp](https://github.com/jagmarques/asqav-mcp) — AI agent governance MCP server с policy enforcement, quantum-safe audit trails (ML-DSA), multi-party authorization, и compliance reporting
- [imran-siddique/agentos-mcp-server](https://github.com/imran-siddique/agent-os/tree/master/extensions/mcp-server) — - Agent OS MCP-сервер для AI agent governance с policy enforcement, code safety verification, multi-model hallucina
- [kastelldev/kastell](https://github.com/kastelldev/kastell) — 📇 ☁️ 🏠 🍎 🪟 🐧 - Server security auditing и hardening toolkit. 413 security checks across 29 categories (SSH, Firewall, Docker, TLS, HTTP Headers), CI
- [ark-forge/arkforge-mcp](https://github.com/ark-forge/arkforge-mcp) — 🐍 ☁️ 🍎 🪟 🐧 - Third-party certifying proxy — sign any HTTP call (AI agents, webhooks, microservices) с an independent Ed25519 signature, RFC 3161 timestamp, и Sigstore Re
- [atomicchonk/roadrecon_mcp_server](https://github.com/atomicchonk/roadrecon_mcp_server) — 🐍 🪟 🏠 MCP-сервер для analyzing ROADrecon gather results из Azure tenant enumeration
- [behrensd/mcp-firewall](https://github.com/behrensd/mcp-firewall) — Deterministic security proxy (iptables для MCP) that intercepts tool calls, enforces YAML policies, scans для secret leakage, и logs everything. No AI, no cloud
- [BurtTheCoder/mcp-dnstwist](https://github.com/BurtTheCoder/mcp-dnstwist) — 📇 🪟 ☁️ - MCP-сервер для dnstwist, a powerful DNS fuzzing tool that helps detect typosquatting, phishing, и corporate espionage
- [BurtTheCoder/mcp-maigret](https://github.com/BurtTheCoder/mcp-maigret) — 📇 🪟 ☁️ - MCP-сервер для maigret, a powerful OSINT tool that collects user account information из various public sources. This server provides tools для searching usernames across social networks и analyzing URLs
- [BurtTheCoder/mcp-shodan](https://github.com/BurtTheCoder/mcp-shodan) — 📇 🪟 ☁️ - MCP-сервер для querying the Shodan API и Shodan CVEDB. This server provides tools для IP lookups, device searches, DNS lookups, vulnerability queries, CPE lookups, и more
- [BurtTheCoder/mcp-virustotal](https://github.com/BurtTheCoder/mcp-virustotal) — 📇 🪟 ☁️ - MCP-сервер для querying the VirusTotal API. This server provides tools для scanning URLs, analyzing file hashes, и retrieving IP address reports
- [chrbailey/promptspeak-mcp-server](https://github.com/chrbailey/promptspeak-mcp-server) — Pre-execution governance для AI agents. Intercepts и validates every agent tool call through an 8-stage
- [bx33661/Wireshark-MCP](https://github.com/bx33661/Wireshark-MCP) — Wireshark network packet analysis MCP Server с capture, protocol stats, field extraction, и security analysis capabilities
- [Chimera-Protocol/csl-core](https://github.com/Chimera-Protocol/csl-core) — Deterministic AI safety policy engine с Z3 formal verification. Write, verify, и enforce machine-verifiable constraints для AI agents через MCP

#### 🧠 Знания и память

- [aidesignblueprint/integrations](https://github.com/aidesignblueprint/integrations) — 🐍 ☁️ - Read-only doctrine access для Agentic AI Blueprint — the industry standard reference для safe, observab
- [andreas-roennestad/openhive-mcp](https://github.com/andreas-roennestad/openhive-mcp) — 📇 ☁️ - Shared база знаний where AI agents search и post problem-solution pairs. Agents query before solving, post after resol
- [Auctalis/nocturnusai](https://github.com/Auctalis/nocturnusai) — Deterministic reasoning engine для AI agent context compression. Extracts structured facts с logical inference, proof chains, и truth
- [0xshellming/mcp-summarizer](https://github.com/0xshellming/mcp-summarizer) — 📕 ☁️ - AI Summarization MCP Server, поддержка multiple content types: Plain text, веб-страницы, PDF documents, EPUB books, HTML content
- [20alexl/claude-engram](https://github.com/20alexl/claude-engram) — Persistent memory и session intelligence для Claude Code. Auto-tracks mistakes, decisions, и context через hooks. Mines session histo
- [timmx7/acheron-mcp-server](https://github.com/timmx7/acheron-mcp-server) — Cross-surface persistent memory для Claude. Bridges context между Claude Chat, Code, и Cowork через local SQLite с full-text
- [agentic-mcp-tools/memora](https://github.com/agentic-mcp-tools/memora) — 🐍 🏠 ☁️ - Persistent memory с граф знаний visualization, semantic/hybrid search, cloud sync (S3/R2), и cross-session context management
- [Thezenmonster/agentmem](https://github.com/Thezenmonster/agentmem) — Governed memory для coding agents с trust lifecycle (hypothesis → active → validated → deprecated), conflict detection, sta
- [aitytech/agentkits-memory](https://github.com/aitytech/agentkits-memory) — Persistent memory для AI coding assistants с hybrid search (FTS5 + vector embeddings), session tracking, automatic contex
- [AliceLJY/recallnest](https://github.com/AliceLJY/recallnest) — Persistent memory MCP-сервер для AI coding agents (Claude Code, Codex, Gemini CLI). Hybrid retrieval (vector + BM25), cross-encoder reranking, k
- [ailenshen/apple-notes-mcp](https://github.com/ailenshen/apple-notes-mcp) — Read и write Apple Notes с bidirectional Markdown conversion. Fast SQLite queries для listing/searching, AppleScript + native
- [AgenticRevolution/memory-nexus-cloud](https://github.com/AgenticRevolution/memory-nexus-cloud) — 📇 ☁️ - Cloud-hosted persistent semantic memory для AI agents. Semantic search, knowledge graphs, specialist expertise hats, и multi-tenant isolation. Free 7-day trial
- [AgentModule/mcp](https://github.com/AgentModule/mcp) — 📇 ☁️ - Agent-native knowledge infrastructure. Deterministic, vertical-specific knowledge bases engineered для autonomous agent consumption через MCP. Ethics modu
- [AlekseiMarchenko/central-intelligence](https://github.com/AlekseiMarchenko/central-intelligence) — 📇 ☁️ - Persistent memory для AI agents. Five tools (remember, recall, context, forget, share) с semantic se
- [epicsagas/alcove](https://github.com/epicsagas/alcove) — MCP-сервер, который gives AI coding agents on-demand access to private project docs через BM25 ranked search. One setup для Claude Code, Cursor, Codex, Gemini C
- [alibaizhanov/mengram](https://github.com/alibaizhanov/mengram) — 🐍 ☁️ 🏠 🍎 🪟 🐧 - Human-like memory layer для AI agents с semantic, episodic, и procedural memory. Claude Code hooks (auto-save, auto-recall, cognitive p
- [AntonioTF5/soul-mcp-server](https://github.com/AntonioTF5/soul-mcp-server) — Validate и generate SOUL.md agent identity files из Claude Desktop. SOUL.md is the open format для persistent AI agent id
- [apecloud/ApeRAG](https://github.com/apecloud/ApeRAG) — 🐍 ☁️ 🏠 - Production-ready RAG платформа combining Graph RAG, vector search, и full-text search. Best choice для building your own граф знаний и для Context Engineering
- [Battam1111/Myco](https://github.com/Battam1111/Myco) — Agent-first cognitive substrate с 18 manifest-driven verbs (germinate / eat / assimilate / sporulate / traverse / immune / molt / …) и 25 lint
- [bitatlas-group/bitatlas](https://github.com/bitatlas-group/bitatlas) — 📇 ☁️ - Zero-Knowledge Cloud Drive для Humans и Agents. Client-side AES-256-GCM encryption с 7 MCP tools для encrypted file vault management — upl
- [besslframework-stack/project-tessera](https://github.com/besslframework-stack/project-tessera) — Local workspace memory для Claude Desktop. Indexes your documents (Markdown, CSV, session logs) into a
- [bh-rat/context-awesome](https://github.com/bh-rat/context-awesome) — 📇 ☁️ 🏠 - MCP-сервер для querying 8,500+ curated awesome lists (1M+ items) и fetching the best resources для your agent
- [bitbonsai/mcp-obsidian](https://github.com/bitbonsai/mcp-obsidian) — Universal AI bridge для Obsidian vaults через MCP. Provides safe read/write access to notes с 11 comprehensive methods для vault operations including search, batch operations, tag management, и frontmatter handling. Works с Claude, ChatGPT, и any MCP-compatible AI assistant
- [bluzername/lennys-quotes](https://github.com/bluzername/lennys-quotes) — Query 269 episodes of Lenny's Podcast для product management wisdom. Search 51,000+ transcript segments с YouTube timestamps. Perfect для PRDs, strategy, и PM career advice
- [cameronrye/openzim-mcp](https://github.com/cameronrye/openzim-mcp) — Modern, secure MCP-сервер для accessing ZIM format knowledge bases offline. Enables AI models to search и navigate Wikipedia, educational content, и other compressed knowledge archives с smart retrieval, caching, и comprehensive API

#### 🔗 Агрегаторы и hub-MCP

- [1mcp/agent](https://github.com/1mcp-app/agent) — 📇 ☁️ 🏠 🍎 🪟 🐧 - A unified Model Context Protocol server implementation that aggregates multiple MCP servers into one
- [8randonpickart5/alderpost-mcp](https://github.com/8randonpickart5/alderpost-mcp) — 📇 ☁️ - 8 bundled intelligence endpoints (security, company, threat, compliance, sales, sports, property, health) через x402 micropaymen
- [tadas-github/a2asearch-mcp](https://github.com/tadas-github/a2asearch-mcp) — 📇 ☁️ - MCP-сервер для search 4,800+ MCP servers, AI agents, CLI tools и agent skills. Install: `npx -y a2asearch-mcp`. Ask Cl
- [Aganium/agenium](https://github.com/Aganium/agenium) — 📇 ☁️ 🍎 🪟 🐧 - Bridge any MCP-сервер для the agent:// network — DNS-like identity, discovery, и trust для AI agents. Makes your tools discoverable и callable by other agents через `agent://` URIs с mTLS, trust scores, и capability search
- [elisymlabs/elisym](https://github.com/elisymlabs/elisym) — 📇 ☁️ 🍎 🪟 🐧 - AI agent discovery и marketplace on Nostr с Solana payments (SOL, USDC). NIP-89 discovery, NIP-90 jobs, NIP-44 v2 encryption, on-chain
- [espadaw/Agent47](https://github.com/espadaw/Agent47) — 📇 ☁️ - Unified job aggregator для AI agents across 9+ платформы (x402, RentAHuman, Virtuals, etc)
- [doggychip/agentforge](https://github.com/doggychip/agentforge) — 📇 ☁️ - Unified API gateway и marketplace для 300+ AI agents. One API key, REST + streaming, 90% creator revenue share, health monitoring. Self
- [AgentHotspot](https://github.com/AgentHotspot/agenthotspot-mcp) — 🐍 ☁️ 🏠 🍎 🪟 🐧 - Search, integrate и monetize MCP connectors on the AgentHotspot MCP marketplace
- [alexanderclapp/clirank-mcp-server](https://github.com/alexanderclapp/clirank-mcp-server) — 📇 ☁️ 🍎 🪟 🐧 - API intelligence для AI coding agents. 387 API scored on agent-friendliness с tools to r
- [Work90210/APIFold](https://github.com/Work90210/APIFold) — 📇 ☁️ - Turn any REST API into a hosted MCP server. 18 free public servers (GitHub, Stripe, Slack, OpenAI, Notion, и more) — no setup required, bring yo
- [rhein1/agoragentic-integrations](https://github.com/rhein1/agoragentic-integrations) — 📇 ☁️ - Agent-to-agent marketplace where AI agents discover, invoke, и pay для сервисы из other agents через USD
- [arikusi/deepseek-mcp-server](https://github.com/arikusi/deepseek-mcp-server) — 📇 ☁️ 🍎 🪟 🐧 - MCP-сервер для DeepSeek AI с chat, reasoning, multi-turn sessions, function calling, thinking mode, и cost tracki
- [ariekogan/ateam-mcp](https://github.com/ariekogan/ateam-mcp) — 📇 ☁️ 🏠 🍎 🪟 🐧 - Build, validate, и deploy multi-agent AI solutions on the ADAS платформа. Design skills с tools, manage solution lifecycle, и connect из any AI environment через stdio или HTTP
- [askbudi/roundtable](https://github.com/askbudi/roundtable) — 📇 ☁️ 🏠 🍎 🪟 🐧 - Meta-MCP-сервер, который unifies multiple AI coding assistants (Codex, Claude Code, Cursor, Gemini) through intelligent auto-discovery и standardized MCP интерфейс, providing zero-configuration access к entire AI coding ecosystem
- [blockrunai/blockrun-mcp](https://github.com/blockrunai/blockrun-mcp) — 📇 ☁️ 🍎 🪟 🐧 - Access 30+ AI models (GPT-5, Claude, Gemini, Grok, DeepSeek) without API keys. Pay-per-use через x402 micropayments с USDC on Base
- [Data-Everything/mcp-server-templates](https://github.com/Data-Everything/mcp-server-templates) — One server. All tools. A unified MCP платформа that connects many apps, tools, и сервисы behind one powerful интерфейс—ideal для local devs или production agents
- [depwire/depwire](https://github.com/depwire/depwire) — 📇 🐍 🏎️ 🦀 🌊 🏠 - Dependency graph + 15 MCP tools для AI coding assistants. Parses TypeScript, JavaScript, Python, Go, Rust, и C. Arc diagram visualization, hea
- [duaraghav8/MCPJungle](https://github.com/duaraghav8/MCPJungle) — 🏎️ 🏠 - Self-hosted MCP Server registry для enterprise AI Agents
- [edgarriba/prolink](https://github.com/edgarriba/prolink) — 🐍 ☁️ 🏠 🍎 🪟 🐧 - Agent-to-agent marketplace middleware — MCP-native discovery, negotiation, и transaction между AI agents
- [entire-vc/evc-spark-mcp](https://github.com/entire-vc/evc-spark-mcp) — 📇 ☁️ 🏠 🍎 🪟 🐧 - Search и discover AI agents, skills, prompts, bundles и MCP connectors из a curated catalog of 4500+ assets

#### 🤖 Coding-агенты

- [agent-blueprint/mcp-server](https://github.com/agent-blueprint/mcp-server) — 📇 ☁️ - 8 MCP tools для exploring и downloading AI agent blueprints. List blueprints, get summaries, download full Agent Skil
- [agentic-mcp-tools/owlex](https://github.com/agentic-mcp-tools/owlex) — AI council server: query CLI agents (Claude Code, Codex, Gemini, и OpenCode) in parallel с deliberation rounds
- [alpadalar/netops-mcp](https://github.com/alpadalar/netops-mcp) — Comprehensive DevOps и networking MCP-сервер, предоставляющий standardized access to essential infrastructure tools. Features network monitoring, system diagnostics, automation workflow-процессы, и infrastructure management с AI-powered operational insights
- [askbudi/roundtable](https://github.com/askbudi/roundtable) — Zero-configuration MCP-сервер, который unifies multiple AI coding assistants (Claude Code, Cursor, Codex) through intelligent auto-discovery и standardized интерфейс. Essential infrastructure для autonomous agent development и multi-AI collaboration workflow-процессы
- [automateyournetwork/pyATS_MCP](https://github.com/automateyournetwork/pyATS_MCP) — Cisco pyATS server enabling structured, model-driven interaction с network devices
- [avansaber/tailtest-cline](https://github.com/avansaber/tailtest-cline) — Adversarial test generation для AI coding sessions. Detects language и framework; writes tests; runs them; classifies
- [aybelatchane/mcp-server-terminal](https://github.com/aybelatchane/mcp-server-terminal) — Playwright для terminals - interact с TUI/CLI приложения through structured Terminal State Tree representation с element detection
- [aymericzip/intlayer](https://github.com/aymericzip/intlayer) — 📇 ☁️ 🏠 - A MCP-сервер, который enhance your IDE с AI-powered assistance для Intlayer i18n / CMS tool: smart CLI access, access к docs
- [spyrae/claude-concilium](https://github.com/spyrae/claude-concilium) — Multi-agent AI consultation framework для Claude Code. Three MCP servers wrapping CLI tools (Codex, Gemini, Qwen) для parallel code review и problem-solving с fallback chains и error detection. включает ready-to-use Claude Code skill
- [blakerouse/ssh-mcp](https://github.com/blakerouse/ssh-mcp) — 🏎️ 🏠 🍎 🪟 🐧 - MCP-сервер с доступом к SSH control для Linux и Windows servers. Allows long running commands и the ability to perform commands on multiple hosts at the same time
- [sipyourdrink-ltd/bernstein](https://github.com/sipyourdrink-ltd/bernstein) — 🐍 🏠 ☁️ 🍎 🪟 🐧 - Deterministic multi-agent orchestrator для 37 CLI coding agents (Claude Code, Codex, Cursor, Aider, Gemini CLI, GitHub Copi
- [doggybee/mcp-server-leetcode](https://github.com/doggybee/mcp-server-leetcode) — 📇 ☁️ - An MCP-сервер, который enables AI models to search, retrieve, и solve LeetCode problems. поддерживает metadata filtering, user profiles, submissions, и contest data access
- [eirikb/any-cli-mcp-server](https://github.com/eirikb/any-cli-mcp-server) — Universal MCP-сервер, который transforms any CLI tool into an MCP server. Works с any CLI that has `--help` output, поддерживает caching для performance
- [ezyang/codemcp](https://github.com/ezyang/codemcp) — Coding agent с basic read, write и командная строка tools
- [elhamid/llm-council](https://github.com/elhamid/llm-council) — Multi-LLM deliberation с anonymized peer review. Runs a 3-stage council: parallel responses → anonymous ranking → synthesis. на базе Andrej Karpathy's LLM Council concept
- [freema/openclaw-mcp](https://github.com/freema/openclaw-mcp) — 📇 ☁️ 🏠 - MCP-сервер для [OpenClaw](https://github.com/openclaw/openclaw) AI assistant integration. Enables Claude to delegate tasks to OpenClaw agents w
- [ferrislucas/iterm-mcp](https://github.com/ferrislucas/iterm-mcp) — 🖥️ 🛠️ 💬 - A Model Context Protocol server that provides access to iTerm. You can run commands и ask questions about what you see в iTerm terminal
- [TT-Wang/forge](https://github.com/TT-Wang/forge) — Structured planning, parallel execution in git worktrees, и deep validation для Claude Code. Turns a one-line objective into a validated DAG of modules execute
- [g0t4/mcp-server-commands](https://github.com/g0t4/mcp-server-commands) — Run any command с `run_command` и `run_script` tools
- [gabrielmaialva33/winx-code-agent](https://github.com/gabrielmaialva33/winx-code-agent) — A high-performance Rust reimplementation of WCGW для code agents, providing shell execution и advanced file management capabilities для LLMs через MCP

#### ▶️ Выполнение кода и sandbox

- [alfonsograziano/node-code-sandbox-mcp](https://github.com/alfonsograziano/node-code-sandbox-mcp) — 📇 🏠 – A Node.js MCP-сервер, который spins up isolated Docker-based sandboxes для executing JavaScript snippets с on-the-fly npm dependency installation и clean teardown
- [alvii147/piston-mcp](https://github.com/alvii147/piston-mcp) — 🐍 ☁️ 🐧 🍎 🪟 - MCP-сервер, который lets LLMs execute code through the Piston remote выполнение кода engine, с a zero-config `uv` setup и a ready-to-use Claude Desktop config example
- [asif-nvc/e2b-sandbox-mcp](https://github.com/asif-nvc/e2b-sandbox-mcp) — 📇 ☁️ 🍎 🪟 🐧 - Connect Claude Code с E2B cloud sandboxes — 29 tools для creating isolated Linux VMs, cloning repos, running command
- [ckanthony/openapi-mcp](https://github.com/ckanthony/openapi-mcp) — 🏎️ ☁️ - OpenAPI-MCP: Dockerized MCP-сервер для allow your AI agent to access any API с existing API docs
- [dagger/container-use](https://github.com/dagger/container-use) — 🏎️ 🏠 🐧 🍎 🪟 - Containerized environments для coding agents. Multiple agents can work independently, isolated in fresh containers и git branches. No conflicts, many experiments. Full execution history, terminal access to agent environments, git workflow. Any agent/model/infra stack
- [gwbischof/outsource-mcp](https://github.com/gwbischof/outsource-mcp) — 🐍 ☁️ - Give your AI assistant its own AI assistants. для example: "Could you ask openai to generate an image of a dog?"
- [hileamlakB/PRIMS](https://github.com/hileamlakB/PRIMS) — 🐍 🏠 – A Python Runtime Interpreter MCP-сервер, который executes user-submitted code in an isolated environment
- [mavdol/capsule/mcp-server](https://github.com/mavdol/capsule/tree/main/integrations/mcp-server) — Run untrusted Python/JavaScript code in WebAssembly sandboxes
- [HanSur94/matlab-mcp-server-python](https://github.com/HanSur94/matlab-mcp-server-python) — Connect AI agents to MATLAB — execute code, run async jobs с progress reporting, get inter
- [ouvreboite/openapi-to-mcp](https://github.com/ouvreboite/openapi-to-mcp) — #️⃣ ☁️ - Lightweight MCP-сервер для access any API через their OpenAPI specification. поддерживает OAuth2 и full JSON schema parameters и request body
- [pydantic/pydantic-ai/mcp-run-python](https://github.com/pydantic/pydantic-ai/tree/main/mcp-run-python) — Run Python code in a secure sandbox через MCP tool calls
- [r33drichards/mcp-js](https://github.com/r33drichards/mcp-js) — A Javascript выполнение кода sandbox that uses v8 to isolate code to run AI generated javascript locally without fear. поддерживает heap snapshotting для persistent sessions

#### 📅 Рабочие инструменты

- [temporal-cortex/mcp](https://github.com/temporal-cortex/mcp) — 🦀 ☁️ 🏠 - AI-native calendar middleware для scheduling, availability, и conflict-free booking across Google Calendar, Outlook, и CalDAV. 15 tools acros
- [Agentled/mcp-server](https://github.com/Agentled/mcp-server) — 📇 ☁️ - AI-native workflow orchestration с long-term memory, 100+ integrations, и unified credits. 32 MCP tools для building и running intell
- [6figr-com/jobgpt-mcp-server](https://github.com/6figr-com/jobgpt-mcp-server) — 📇 ☁️ 🏠 🍎 🪟 🐧 - MCP-сервер для [JobGPT](https://6figr.com/jobgpt) — search jobs, auto-apply, generate tailored resumes, track app
- [backloghq/backlog](https://github.com/backloghq/backlog) — Persistent, cross-session task management для Claude Code. 24 MCP tools, 7 skills, и agent coordination с event-sourced storage и per-
- [bivex/kanboard-mcp](https://github.com/bivex/kanboard-mcp) — 🏎️ ☁️ 🏠 - A Model Context Protocol (MCP) server written in Go that empowers AI agents и Large Language Models (LLMs) to seamlessly interact с Kanboard. It transforms естественный язык commands into Kanboard API calls, enabling intelligent автоматизация project, task, и user management, streaml
- [benmonopoli/open-greenhouse-mcp](https://github.com/benmonopoli/open-greenhouse-mcp) — 🐍 ☁️ 🍎 🪟 🐧 - Production-ready MCP-сервер для [Greenhouse](https://www.greenhouse.com) ATS с 175 tools для re
- [bobbyrgoldsmith/quarterback](https://github.com/bobbyrgoldsmith/quarterback) — Strategic task prioritization и agent orchestration для multi-project operators. 22 MCP tools с 5-factor scoring engine, advisory document analysis, agent dispatch с autonomy levels, HMAC webhooks, time-aware planning, и CI/CD integration. Standalone CLI + MCP server
- [bug-breeder/quip-mcp](https://github.com/bug-breeder/quip-mcp) — 📇 ☁️ 🍎 🪟 🐧 - A Model Context Protocol (MCP) server providing AI assistants с comprehensive Quip document access и management. Enables document lifecycle management, smart search, comment management, и secure token-based authentication для both Quip.com и enterprise instances
- [can4hou6joeng4/boss-agent-cli](https://github.com/can4hou6joeng4/boss-agent-cli) — BOSS Zhipin recruitment workflow для AI agents. 49 MCP tools для job search, welfare filtering, recruiter
- [ByAxe/keynote-mcp](https://github.com/ByAxe/keynote-mcp) — MCP-сервер для full control of Apple Keynote through AppleScript automation. Create, edit, и export presentations через естественный язык с 30+
- [conorbronsdon/gws-mcp-server](https://github.com/conorbronsdon/gws-mcp-server) — 📇 ☁️ 🍎 🪟 🐧 - Google Workspace MCP-сервер с доступом к 23 curated tools для Drive, Sheets, Calendar, docs, и Gmail через the gws CLI
- [ContextPulse/contextpulse](https://github.com/ContextPulse/contextpulse) — Local-first desktop context server для AI agents. Captures screen (OCR), voice (Whisper), keyboard/mouse activity, и clipboard. Ex
- [corbym/backlog-mcp](https://github.com/corbym/backlog-mcp) — 🏎️ 🏠 🍎 🪟 🐧 - MCP-сервер, который gives AI agents structured read/write access to a story-based project backlog. Agents can list stories, read content, upd
- [Dan8Oren/mcp-apple-notes](https://github.com/Dan8Oren/mcp-apple-notes) — Semantic search и RAG через Apple Notes с on-device embeddings, full CRUD, folder management, и fuzzy title matching.
- [dearlordylord/huly-mcp](https://github.com/dearlordylord/huly-mcp) — 📇 ☁️ 🏠 🍎 🪟 🐧 - MCP-сервер для Huly управление проектами. Query issues, create и update tasks, manage labels и priorities
- [davegomez/fizzy-mcp](https://github.com/davegomez/fizzy-mcp) — 📇 ☁️ - MCP-сервер для [Fizzy](https://fizzy.do) kanban task management с tools для boards, cards, comments, и checklists
- [delega-dev/delega-mcp](https://github.com/delega-dev/delega-mcp) — 📇 ☁️ 🏠 🍎 🪟 🐧 - Task management API built для AI agents. Create, delegate, и track tasks с agent identity, delegation chains, lifecycle webhooks, an
- [devroopsaha744/TexMCP](https://github.com/devroopsaha744/TexMCP) — An MCP-сервер, который converts LaTeX into high-quality PDF documents. It provides tools для rendering both raw LaTeX input и customizable templates, producing shareable, production-ready artifacts таких как reports, resumes, и research papers
- [ellmos-ai/n8n-manager-mcp](https://github.com/ellmos-ai/n8n-manager-mcp) — 📇 ☁️ 🏠 🍎 🪟 🐧 - MCP-сервер для managing n8n workflow-процессы through AI assistants, including workflow CRUD, synchronization, inspection,
- [foxintheloop/UpTier](https://github.com/foxintheloop/UpTier) — Desktop task manager с clean To Do-style UI и 25+ MCP tools для prioritization, goal tracking, и multi-profile workflow-процессы

#### 📂 Файловые системы

- [8b-is/smart-tree](https://github.com/8b-is/smart-tree) — AI-native directory visualization с semantic analysis, ultra-compressed formats для AI consumption, и 10x token reduction. поддерживает quantum-semantic mode с intelligent file categorization
- [box/mcp-server-box-remote](https://github.com/box/mcp-server-box-remote/) — 🎖️ ☁️ - The Box MCP server allows third party AI agents to securely и seamlessly access Box content и use tools таких как search, asking questions из files и folders, и data extraction
- [ckanthony/Chisel](https://github.com/ckanthony/Chisel) — 🦀 🏠 🍎 🐧 ☁️ - Reduce context usage on file use. Send only unified diffs вместо full files (up to 20-100× fewer tokens), и read large files с targeted `grep`
- [cyberchitta/llm-context.py](https://github.com/cyberchitta/llm-context.py) — Share code context с LLMs через MCP или clipboard
- [ebbfijsf/agent-reader](https://github.com/ebbfijsf/agent-reader) — Document beautifier для AI agents. Converts Markdown to styled webpages (с sidebar TOC), Word, PDF, и full-screen image slideshows. Z
- [efforthye/fast-filesystem-mcp](https://github.com/efforthye/fast-filesystem-mcp) — Advanced filesystem operations с large file handling capabilities и Claude-optimized features. Provides fast file reading/writing, sequential reading для large files, directory operations, file search, и streaming writes с backup & recovery
- [ellmos-ai/ellmos-filecommander-mcp](https://github.com/ellmos-ai/ellmos-filecommander-mcp) — Comprehensive local filesystem MCP server с file management, process control, interacti
- [exoticknight/mcp-file-merger](https://github.com/exoticknight/mcp-file-merger) — 🏎️ 🏠 - File merger tool, suitable для AI chat length limits
- [filesystem@quarkiverse/quarkus-mcp-servers](https://github.com/quarkiverse/quarkus-mcp-servers/tree/main/filesystem) — A filesystem allowing для browsing и editing files implemented in Java через Quarkus. Available as jar или native image
- [hmk/box-mcp-server](https://github.com/hmk/box-mcp-server) — 📇 ☁️ - Box integration для listing, reading и searching files
- [isaacphi/mcp-gdrive](https://github.com/isaacphi/mcp-gdrive) — 📇 ☁️ - Model Context Protocol (MCP) Server для reading из Google Drive и editing Google Sheets
- [j0hanz/filesystem-context-mcp-server](https://github.com/j0hanz/filesystem-context-mcp-server) — Read-only MCP-сервер для secure filesystem exploration, searching, и analysis с symlink protection
- [jeannier/homebrew-mcp](https://github.com/jeannier/homebrew-mcp) — Control your macOS Homebrew setup через естественный язык через this MCP server. Simply manage your packages, или ask для suggestions, troubleshoot brew issues etc
- [mamertofabian/mcp-everything-search](https://github.com/mamertofabian/mcp-everything-search) — Fast Windows file search через Everything SDK
- [MarceauSolutions/md-to-pdf-mcp](https://github.com/MarceauSolutions/md-to-pdf-mcp) — Convert Markdown files to professional PDFs с customizable themes, headers, footers, и styling

#### ⌨️ CLI и shell

- [danmartuszewski/hop](https://github.com/danmartuszewski/hop) — 🏎️ 🖥️ - Fast SSH connection manager с TUI dashboard и MCP-сервер для discovering, searching, и executing commands on remote hosts
- [nvms/tui-mcp](https://github.com/nvms/tui-mcp) — What Chrome DevTools MCP is для browser, tui-mcp is для terminal. Launch, screenshot, и interact с any TUI app
- [raychao-oao/pty-mcp](https://github.com/raychao-oao/pty-mcp) — 🏎️ 🏠 🍎 🐧 - Interactive PTY sessions для AI agents — local shells, SSH с persistent sessions (ai-tmux daemon для attach/detach), и serial ports. Single Go
- [ferodrigop/forge](https://github.com/ferodrigop/forge) — Terminal MCP-сервер для AI coding agents с persistent PTY sessions, ring-buffer incremental reads, headless xterm screen capture, multi-agent orchestration, a
- [WhenLabs-org/when](https://github.com/WhenLabs-org/when) — Developer toolkit: auto-detect stack для AI context files, catch port conflicts, validate .env schemas, spot docs drift, audit dependency lic
- [LukeLamb/claude-terminal-mcp](https://github.com/LukeLamb/claude-terminal-mcp) — Terminal, filesystem, и background-job tools для Claude Desktop on Linux/macOS. Zero npm deps, pure Node

#### 🖥️ OS-автоматизация

- [sbuysse/gnome-desktop-mcp](https://github.com/sbuysse/gnome-desktop-mcp) — GNOME desktop automation для AI agents. 30 tools через D-Bus: screenshots, window management, mouse/keyboard injection, clipboard,
- [dimpagk92/cellar](https://github.com/dimpagk92/cellar) — Hybrid computer-use runtime. Fuses accessibility tree + Chrome DevTools Protocol + vision into structured context с per-element confidence. 4

#### 🎥 Мультимедиа

- [06ketan/slideshot](https://github.com/06ketan/slideshot) — Convert HTML to PDF/PNG/WebP/PPTX slide carousels с 11 themes (LinkedIn, Instagram, pitch decks, infographics). Pixel-perfect Puppeteer re
- [1000ri-jp/atsurae](https://github.com/1000ri-jp/atsurae) — 🐍 ☁️ 🍎 🪟 🐧 - AI-powered video editing MCP server с 10 tools для timeline editing, 5-layer compositing, semantic operations, и FFmpeg rendering (1920x1080, 30fps H.264+AAC)
- [AceDataCloud/MCPSuno](https://github.com/AceDataCloud/SunoMCP) — 🐍 ☁️ - Suno AI music generation, lyrics, covers, и vocal extraction через Ace Data Cloud API
- [agenticdecks/deckrun-mcp](https://github.com/agenticdecks/deckrun-mcp) — 🐍 ☁️ - Generate presentation PDFs, narrated videos, и MP3 audio из Markdown. Free tier requires no API key или local install — add a URL to yo
- [AIDC-AI/Pixelle-MCP](https://github.com/AIDC-AI/Pixelle-MCP) — 🐍 📇 🏠 🎥 🔊 🖼️ - An omnimodal AIGC framework that seamlessly converts ComfyUI workflow-процессы into MCP tools с zero code, enabling full-modal поддержка Text, Image, Sound, и Video generation с Chainlit-based web интерфейс
- [ananddtyagi/gif-creator-mcp](https://github.com/ananddtyagi/gif-creator-mcp/tree/main) — A MCP-сервер для creating GIFs из your videos
- [bogdan01m/zapcap-mcp-server](https://github.com/bogdan01m/zapcap-mcp-server) — 🐍 ☁️ - MCP-сервер для ZapCap API providing video caption и B-roll generation через естественный язык
- [DareDev256/fcpxml-mcp-server](https://github.com/DareDev256/fcpxml-mcp-server) — The first MCP-сервер для Final Cut Pro. 53 tools that parse, edit, и generate FCPXML timelines — health checks
- [drolosoft/immich-photo-manager](https://github.com/drolosoft/immich-photo-manager) — Turn your self-hosted Immich photo library into a conversation — естественный язык search через CLIP, geographic al
- [quietnotion/barevalue-mcp](https://github.com/quietnotion/barevalue-mcp) — 📇 ☁️ 🍎 🪟 🐧 - AI podcast editing as a сервис. Upload raw audio или submit a URL, get back edited episodes с filler words removed, noise reduction, transcripts, show notes, и social clips. включает webhooks для automation
- [elestirelbilinc-sketch/vap-showcase](https://github.com/elestirelbilinc-sketch/vap-showcase) — 🐍 ☁️ 🍎 🪟 🐧 - AI media generation (Flux, Veo, Suno) с cost control. Pre-commit pricing, budget enforcement, reserve-burn-refund billing
- [realcrabcut/crabcut-mcp-server](https://github.com/realcrabcut/crabcut-mcp-server) — 📇 ☁️ - Turn YouTube videos into short-form clips из any AI assistant. AI-powered highlight detection, subtitle g
- [keiver/image-tiler-mcp-server](https://github.com/keiver/image-tiler-mcp-server) — Full-resolution vision для LLMs. Tiles large images и captures веб-страницы через Chrome CDP so vision models proce
- [gaudiolab-jp/gaudio-developers-mcp](https://github.com/gaudiolab-jp/gaudio-developers-mcp) — 📇 ☁️ 🍎 🪟 🐧 - Audio AI API для stem separation (vocal, drum, bass, guitar, piano), DME separation (dialogue, music,
- [MohamedAbdallah-14/prompt-to-asset](https://github.com/MohamedAbdallah-14/prompt-to-asset) — Generates app icons, favicons, OG images, logos, и wordmarks. Routes each request across

#### 🧮 Data science

- [abhiphile/fermat-mcp](https://github.com/abhiphile/fermat-mcp) — The ultimate math engine unifying SymPy, NumPy & Matplotlib in one powerful server. Perfect для developers & researchers needing symbolic algebra, numerical computing, и data visualization
- [arrismo/kaggle-mcp](https://github.com/arrismo/kaggle-mcp) — 🐍 ☁️ - Connects to Kaggle, ability to download и analyze datasets
- [avisangle/calculator-server](https://github.com/avisangle/calculator-server) — 🏎️ 🏠 - A comprehensive Go-based MCP-сервер для mathematical computations, implementing 13 mathematical tools across basic arithmetic, advanced functions, statistical analysis, unit conversions, и financial calculations
- [bradleylab/stella-mcp](https://github.com/bradleylab/stella-mcp) — Create, read, validate, и save Stella system dynamics models (.stmx files in XMILE format) для scientific simulation и modeling
- [BlackMount-ai/blackmount-nlp-mcp](https://github.com/BlackMount-ai/blackmount-nlp-mcp) — Deterministic local text analysis: sentiment, readability scoring, keyword extraction, text simi
- [Bright-L01/networkx-mcp-server](https://github.com/Bright-L01/networkx-mcp-server) — The first NetworkX integration для Model Context Protocol, enabling graph analysis и visualization directly in AI conversations. поддерживает 13 operations including centrality algorithms, community detection, PageRank, и graph visualization
- [ChronulusAI/chronulus-mcp](https://github.com/ChronulusAI/chronulus-mcp) — 🐍 ☁️ - Predict anything с Chronulus AI forecasting и prediction agents
- [clouatre-labs/math-mcp-learning-server](https://github.com/clouatre-labs/math-mcp-learning-server) — 🐍 ☁️ 🏠 🍎 🪟 🐧 - Educational MCP-сервер для math operations, statistics, visualization, и persistent workspaces. Built с FastMCP 2.0
- [Daichi-Kudo/llm-advisor-mcp](https://github.com/Daichi-Kudo/llm-advisor-mcp) — 📇 ☁️ 🍎 🪟 🐧 - real-time LLM/VLM model comparison с benchmarks, pricing, и personalized recommendations из 5 data sour
- [DataEval/dingo](https://github.com/DataEval/dingo) — 🎖️ 🐍 🏠 🍎 🪟 🐧 - MCP-сервер для the Dingo: a comprehensive data quality evaluation tool. Server Enables interaction с Dingo's rule-based и LLM-based evaluation capabilities и rules&prompts listing
- [datalayer/jupyter-mcp-server](https://github.com/datalayer/jupyter-mcp-server) — Model Context Protocol (MCP) Server для Jupyter
- [growthbook/growthbook-mcp](https://github.com/growthbook/growthbook-mcp) — 🎖️ 📇 🏠 🪟 🐧 🍎 — Tools для creating и interacting с GrowthBook feature flags и experiments
- [gpartin/WaveGuardClient](https://github.com/gpartin/WaveGuardClient) — 🐍 ☁️ 🍎 🪟 🐧 - Physics-based anomaly detection через MCP. Uses Klein-Gordon wave equations on GPU to detect anomalies с high precision (avg 0.90). 9 tools: scan, fingerprint, com
- [HumanSignal/label-studio-mcp-server](https://github.com/HumanSignal/label-studio-mcp-server) — 🎖️ 🐍 ☁️ 🪟 🐧 🍎 - Create, manage, и automate Label Studio projects, tasks, и predictions для data labeling workflow-процессы
- [jjsantos01/jupyter-notebook-mcp](https://github.com/jjsantos01/jupyter-notebook-mcp) — connects Jupyter Notebook to Claude AI, allowing Claude to directly interact с и control Jupyter Notebooks

#### 📊 Data-платформы

- [1luvc0d3/metabase-mcp](https://github.com/1luvc0d3/metabase-mcp) — MCP server connecting Claude to Metabase с 28 tools для естественный язык data analysis, dashboard management, SQL queries, и autom
- [carrierone/verilexdata-mcp](https://github.com/carrierone/verilexdata-mcp) — 📇 ☁️ - 20 structured datasets (NPI healthcare, SEC filings, OFAC sanctions, crypto whales, Polymarket signals, patents, econom
- [alkemiai/alkemi-mcp](https://github.com/alkemi-ai/alkemi-mcp) — 📇 ☁️ - MCP-сервер для естественный язык querying of Snowflake, Google BigQuery, и DataBricks Data Products through Alkemi.ai
- [avisangle/method-crm-mcp](https://github.com/avisangle/method-crm-mcp) — 🐍 ☁️ 🏠 🍎 🪟 🐧 - Production-ready MCP-сервер для Method CRM API integration с 20 comprehensive tools для tables, files, users, events, и API key management. Features rate limiting, retry logic, и dual transport support (stdio/HTTP)
- [aywengo/kafka-schema-reg-mcp](https://github.com/aywengo/kafka-schema-reg-mcp) — 🐍 ☁️ 🏠 🍎 🪟 🐧 - Comprehensive Kafka Schema Registry MCP server с 48 tools для multi-registry management, schema migration, и enterprise features
- [bintocher/mcp-superset](https://github.com/bintocher/mcp-superset) — 🐍 ☁️ 🏠 🍎 🪟 🐧 - Full-featured Apache Superset MCP server с 135+ tools для dashboards, charts, datasets, SQL Lab, security (users, roles, RLS, grou
- [bruno-portfolio/agrobr-mcp](https://github.com/bruno-portfolio/agrobr-mcp) — 🐍 ☁️ - Brazilian agricultural data для LLMs — prices, crop estimates, climate, deforestation из 19 public sources через CEPEA, CONAB, IBGE, INPE и B3
- [Castaldo-Solutions/mcp-vtenext](https://github.com/Castaldo-Solutions/mcp-vtenext) — MCP-сервер для VTENext CRM (open-source vtiger-based). Query, create и update opportunities и contacts через the WebSer
- [dan1d/mercadolibre-mcp](https://github.com/dan1d/mercadolibre-mcp) — 📇 ☁️ - MercadoLibre marketplace integration для AI agents. Search products, get item details, browse categories, track trends, и convert curre
- [dbt-labs/dbt-mcp](https://github.com/dbt-labs/dbt-mcp) — 🎖️ 🐍 🏠 ☁️ - Official MCP-сервер для [dbt (data build tool)](https://www.getdbt.com/product/what-is-dbt) providing integration с dbt Core/Cloud CLI, project metadata discovery, model information, и semantic layer querying capabilities
- [flowcore/mcp-flowcore-platform](https://github.com/flowcore-io/mcp-flowcore-platform) — 🎖️ 📇 ☁️ 🏠 - Interact с Flowcore to perform actions, ingest data, и analyse, cross reference и utilise any data in your data cores, или in public data cores; all с human language
- [Hug0x0/mcp-reunion](https://github.com/Hug0x0/mcp-reunion) — 📇 ☁️ 🍎 🪟 🐧 - 96 tools across 21 modules для La Réunion (French overseas region) open data: economy, demographics, geography, transport, health, educat

#### 📚 RAG-платформы

- [gogabrielordonez/mcp-ragchat](https://github.com/gogabrielordonez/mcp-ragchat) — Add RAG-powered AI chat to any website с one command. Local vector store, multi-provider LLM (OpenAI/Anthropic/Gemini), self-contained chat server и embeddable widget
- [poll-the-people/customgpt-mcp](https://github.com/Poll-The-People/customgpt-mcp) — 🐍 🏠 ☁️ - An MCP-сервер для accessing all of CustomGPT.ai's anti-hallucination RAG-as-a-сервис API endpoints
- [vectara/vectara-mcp](https://github.com/vectara/vectara-mcp) — 🐍 🏠 ☁️ - An MCP-сервер для accessing Vectara's trusted RAG-as-a-сервис платформа

#### 🎯 Маркетинг

- [acamolese/google-search-console-mcp](https://github.com/acamolese/google-search-console-mcp) — 🐍 ☁️ - Google Search Console MCP server: query performance data, inspect URLs, check indexing, and
- [AdsMCP/tiktok-ads-mcp-server](https://github.com/AdsMCP/tiktok-ads-mcp-server) — 🐍 ☁️ - A Model Context Protocol server для TikTok Ads API integration, enabling AI assistants to manage campaigns, analyze performance metrics, handle audiences и creatives с OAuth authentication flow
- [alexey-pelykh/lhremote](https://github.com/alexey-pelykh/lhremote) — Open-source CLI и MCP-сервер для LinkedHelper automation — 32 tools для campaign management, messaging, и profile queries через Chrome DevTools Protocol
- [BlockRunAI/x-grow](https://github.com/BlockRunAI/x-grow) — 📇 ☁️ - X/Twitter algorithm optimizer с post drafting, review scoring, и AI image generation для maximum engagement
- [Brand-System/brandsystem-mcp](https://github.com/Brand-System/brandsystem-mcp) — Make your brand machine-readable. Extract brand identity (colors, fonts, logo, voice, visual rules) из any
- [BRNDMK/brandomica-mcp-server](https://github.com/BRNDMK/brandomica-mcp-server) — 📇 ☁️ - Brand name verification across domains (с pricing), social handles, trademarks (USPTO), web presence, app stores, and
- [Citedy/citedy-seo-agent](https://github.com/Citedy/citedy-seo-agent) — 📇 ☁️ - Full-stack AI marketing toolkit с 41 MCP tools. Scout X/Reddit trends, analyze competitors, find content gaps, generate SEO articl
- [competlab/competlab-mcp-server](https://github.com/competlab/competlab-mcp-server) — 📇 ☁️ - Competitive intelligence платформа с 24 tools. Monitor competitor pricing, content, positioning, tech stacks, и A
- [mikusnuz/meta-ads-mcp](https://github.com/mikusnuz/meta-ads-mcp) — 📇 ☁️ - MCP-сервер для Meta Marketing API v25.0 — 123 tools для Facebook & Instagram ad campaigns, audiences, creatives, insights, catalogs, a
- [shensi8312/blogburst-mcp-server](https://github.com/shensi8312/blogburst-mcp-server) — 📇 ☁️ - AI content generation, repurposing, и multi-платформа publishing с [BlogBurst](https://blogburst.ai). Generate blogs, repurpose content для 9+ платформы (Twitter, LinkedIn, Reddit, Bluesky, Threads, Telegram, Discord, TikTok, YouTube), get trending topics, и publish directly
- [gomarble-ai/facebook-ads-mcp-server](https://github.com/gomarble-ai/facebook-ads-mcp-server) — 🐍 ☁️ - MCP server acting as an интерфейс к Facebook Ads, enabling programmatic access to Facebook Ads data и management features
- [gomarble-ai/google-ads-mcp-server](https://github.com/gomarble-ai/google-ads-mcp-server) — 🐍 ☁️ - MCP server acting as an интерфейс к Google Ads, enabling programmatic access to Google Ads data и management features
- [grovs-io/mcp](https://github.com/grovs-io/mcp) — 📇 ☁️ - Deep linking, attribution, analytics, и campaign management для mobile apps с [Grovs](https://grovs.io) — an open-source, privacy-first alternative to Branc
- [damientilman/mailchimp-mcp-server](https://github.com/damientilman/mailchimp-mcp-server) — 🐍 ☁️ - Mailchimp Marketing API integration с 53 tools для managing campaigns, audiences, reports, automations, landing pages, e-commer
- [Davison-Francis/min8t-sdks](https://github.com/Davison-Francis/min8t-sdks/tree/main/deliveriq-mcp) — 📇 ☁️ - `@deliveriq/mcp` — email-deliverability tools для AI agents. 12 tools: single + batch verification, email finder, DNSBL

#### 📋 Product management

- [daiji-sshr/redmine-mcp-stateless](https://github.com/daiji-sshr/redmine-mcp-stateless) — Stateless Redmine MCP server. Credentials are passed per-request через HTTP headers и never stored o
- [dkships/pm-copilot](https://github.com/dkships/pm-copilot) — 📇 ☁️ - Triangulates HelpScout support tickets и ProductLift feature requests to generate prioritized product plans. Scores themes by convergence (same signal in both sources = 2x boost), scrubs PII, и accepts business metrics из other MCP servers через `kpi_context` для composable prioritization
- [Lukaris/framedeck-mcp](https://github.com/Lukaris/framedeck-mcp) — 📇 ☁️ 🏠 🍎 🪟 🐧 - [Framedeck](https://framedeck.app) is a Kanban content production manager для YouTube, Instagram, TikTok и Podcast creators.
- [TylerIlunga/procore-mcp-server](https://github.com/TylerIlunga/procore-mcp-server) — 📇 ☁️ 🍎 🪟 🐧 - MCP-сервер с доступом к the full Procore REST API (2,636 endpoints) для construction управление проектами. включает 7 discovery и execution tools covering projects, RFIs, submittals, daily logs, budgets, и more. Single-user OAuth с auto-refresh
- [spranab/saga-mcp](https://github.com/spranab/saga-mcp) — A Jira-like project tracker для AI agents с full hierarchy (Projects > Epics > Tasks > Subtasks), task dependencies с auto-block/unblock, thread

#### 👤 Customer data

- [antv/mcp-server-chart](https://github.com/antvis/mcp-server-chart) — 🎖️ 📇 ☁️ - A Model Context Protocol server для generating visual charts через [AntV](https://github.com/antvis)
- [hustcc/mcp-echarts](https://github.com/hustcc/mcp-echarts) — Generate visual charts через [Apache ECharts](https://echarts.apache.org) с AI MCP dynamically
- [hustcc/mcp-mermaid](https://github.com/hustcc/mcp-mermaid) — Generate [mermaid](https://mermaid.js.org/) diagram и chart с AI MCP dynamically
- [iaptic/mcp-server-iaptic](https://github.com/iaptic/mcp-server-iaptic) — 🎖️ 📇 ☁️ - Connect с [iaptic](https://www.iaptic.com) to ask about your Customer Purchases, Transaction data и App Revenue statistics
- [embeddedlayers/mcp-analytics](https://github.com/embeddedlayers/mcp-analytics) — 🐍 ☁️ - Statistical analysis, forecasting, и ML для business data (Shopify, Stripe, WooCommerce, eBay, GA4, Search Cons
- [OpenDataMCP/OpenDataMCP](https://github.com/OpenDataMCP/OpenDataMCP) — 🐍 ☁️ - Connect any Open Data to any LLM с Model Context Protocol
- [QuackbackIO/quackback](https://github.com/QuackbackIO/quackback) — 📇 ☁️ - Open-source customer feedback платформа с built-in MCP server. Agents can search feedback, triage posts, update statuses, create и comment on posts, vote, manage roadmaps, merge duplicates, и publish changelogs
- [sergehuber/inoyu-mcp-unomi-server](https://github.com/sergehuber/inoyu-mcp-unomi-server) — 📇 ☁️ - An MCP-сервер для access и updates profiles on an Apache Unomi CDP server

#### 📱 Социальные сети

- [06ketan/substack-ops](https://github.com/06ketan/substack-ops) — Substack с **zero AI API keys**. 26 tools (posts, notes, comments, replies, reactions, restacks). Host LLM drafts через `propose_reply` →
- [anwerj/youtube-uploader-mcp](https://github.com/anwerj/youtube-uploader-mcp) — 🏎️ ☁️ - AI‑powered YouTube uploader—no CLI, no YouTube Studio. Uploade videos directly из MCP clients с all AI capabilities
- [arjun1194/insta-mcp](https://github.com/arjun1194/insta-mcp) — Instagram MCP-сервер для analytics и insights. Get account overviews, posts, followers, following lists, post insights, и search для users, hashtags, или places
- [BelleKou/mcp-viral-transformer](https://github.com/BelleKou/mcp-viral-transformer) — Turn URLs into viral posts через "remake" command
- [checkra1neth/xbird](https://github.com/checkra1neth/xbird-skill) — 📇 ☁️ 🏠 🍎 🪟 🐧 - Twitter/X MCP server с 34 tools — post tweets, search, read timelines, manage engagement, upload media. No API keys needed, uses browser cookies. Pay per call из $0.001 через x402 micropayments
- [conorbronsdon/substack-mcp](https://github.com/conorbronsdon/substack-mcp) — 📇 ☁️ - MCP-сервер для Substack — read posts, manage drafts, publish Notes, get comments, и upload images. Safe by design: cannot publish o
- [gwbischof/bluesky-social-mcp](https://github.com/gwbischof/bluesky-social-mcp) — An MCP-сервер для interacting с Bluesky через the atproto client
- [hiroata/meltbook-mcp-server](https://github.com/hiroata/meltbook) — 📇 ☁️ - MCP-сервер для meltbook, an AI-agent political discussion board. 50 AI agents autonomously post, vote, и debate Japanese politics. 11 tools для thread creation, posting, voting, и monitoring
- [HagaiHen/facebook-mcp-server](https://github.com/HagaiHen/facebook-mcp-server) — 🐍 ☁️ - Integrates с Facebook Pages to enable direct управление posts, comments, и engagement metrics through the Graph API для streamlined social media management
- [jj-cheng25/weixin-articles-mcp](https://github.com/jj-cheng25/weixin-articles-mcp) — 🐍 ☁️ 🍎 🪟 🐧 - Read WeChat (微信) Official Account articles с native multimodal output — body, images, и video ke
- [jorgenclaw/nostr-mcp-server](https://github.com/jorgenclaw/nostr-mcp-server) — 📇 ☁️ - Lightning-paid Nostr signing MCP server. AI agents pay sats per call to sign и publish Nostr events — no API keys,
- [karanb192/reddit-mcp-buddy](https://github.com/karanb192/reddit-mcp-buddy) — Browse Reddit posts, search content, и analyze user activity without API keys. Works out-of-the-box с Claude Desktop
- [king-of-the-grackles/reddit-research-mcp](https://github.com/king-of-the-grackles/reddit-research-mcp) — 🐍 ☁️ - AI-powered Reddit intelligence для market research и competitive analysis. Discover subreddits через semantic search across 20k+ indexed communities, fetch posts/comments с full citations, и manage research feeds. No Reddit API credentials needed
- [kunallunia/twitter-mcp](https://github.com/LuniaKunal/mcp-twitter) — All-in-one Twitter management solution providing timeline access, user tweet retrieval, hashtag monitoring, conversation analysis, direct messaging, sentiment analysis of a post, и complete post lifecycle control - all through a streamlined API
- [macrocosm-os/macrocosmos-mcp](https://github.com/macrocosm-os/macrocosmos-mcp) — 🎖️ 🐍 ☁️ Access real-time X/Reddit/YouTube data directly in your LLM приложения с search phrases, users, и date filtering

#### 🎧 Support & service

- [aikts/yandex-tracker-mcp](https://github.com/aikts/yandex-tracker-mcp) — 🐍 ☁️ 🏠 - MCP-сервер для Yandex Tracker. Provides tools для searching и retrieving information about issues, queues, users
- [Berckan/bugherd-mcp](https://github.com/Berckan/bugherd-mcp) — 📇 ☁️ - MCP-сервер для BugHerd bug tracking. List projects, view tasks с filtering by status/priority/tags, get task details, и read comments
- [effytech/freshdesk-mcp](https://github.com/effytech/freshdesk_mcp) — 🐍 ☁️ - MCP-сервер, который integrates с Freshdesk, enabling AI models to interact с Freshdesk modules и perform various support operations
- [incentivai/quickchat-ai-mcp](https://github.com/incentivai/quickchat-ai-mcp) — 🐍 🏠 ☁️ - Launch your conversational Quickchat AI agent as an MCP to give AI apps real-time access to its база знаний и conversational capabilities
- [nguyenvanduocit/jira-mcp](https://github.com/nguyenvanduocit/jira-mcp) — 🏎️ ☁️ - A Go-based MCP connector для Jira that enables AI assistants like Claude to interact с Atlassian Jira. This tool provides a seamless интерфейс для AI models to perform common Jira operations including issue management, sprint planning, и workflow transitions
- [raalarcon9705/jira-mcp](https://github.com/raalarcon9705/jira-mcp) — 📇 ☁️ - Full-featured open source Jira & Confluence MCP server с 24 tools: issue CRUD, sprint lifecycle, comments, transitions, user man
- [sooperset/mcp-atlassian](https://github.com/sooperset/mcp-atlassian) — 🐍 ☁️ - MCP-сервер для Atlassian products (Confluence и Jira). поддерживает Confluence Cloud, Jira Cloud, и Jira Server/Data Center. Provides comprehensive tools для searching, reading, creating, и managing content across Atlassian workspaces
- [tom28881/mcp-jira-server](https://github.com/tom28881/mcp-jira-server) — 📇 ☁️ 🏠 - Comprehensive TypeScript MCP-сервер для Jira с 20+ tools covering complete управление проектами workflow: issue CRUD, sprint management, comments/history, attachments, batch operations

#### 🛒 E-commerce

- [agentlux/agentlux-mcp](https://github.com/agentlux/agentlux-mcp) — 📇 ☁️ 🍎 🪟 🐧 - Agent marketplace и сервисы MCP-сервер для AgentLux. Browse marketplace items, manage agent identity, creator workflow-процессы, serv
- [mrslbt/rakuten-mcp](https://github.com/mrslbt/rakuten-mcp) — 📇 ☁️ - Rakuten API integration для product search, hotel и travel booking, и recipe lookup across Japan's largest e-commerce платформа. Install через
- [laundromatic/shopgraph](https://github.com/laundromatic/shopgraph) — 📇 ☁️ - Structured product data из the open web — Schema.org + AI extraction для e-commerce enrichment. Pay per call через Stripe. [shopgra
- [lofder/dsers-mcp-product](https://github.com/lofder/dsers-mcp-product) — 📇 ☁️ - Automate AliExpress/Alibaba dropshipping product import to Shopify или Wix через DSers. Bulk import, variant editing, pricing rules, an
- [OFODevelopment/cerebrochain-mcp-server](https://github.com/OFODevelopment/cerebrochain-mcp-server) — 📇 ☁️ - Supply chain & logistics intelligence — rate shopping across 85+ carriers, inventor
- [ONE8943/ai-furniture-hub](https://github.com/ONE8943/ai-furniture-hub) — 📇 ☁️ 🏠 🍎 🪟 🐧 - Japan-focused furniture & home product hub для AI agents. 15 tools для mm-precision search across 300+ products и 3
- [samrothschild23/intelligence-api](https://github.com/samrothschild23/intelligence-api) — 📇 ☁️ - E-commerce и business intelligence MCP server. Analyze any Shopify store, research Amazon products с Opportunity Score и FBA pr
- [the402ai/mcp-server](https://github.com/the402ai/mcp-server) — 📇 ☁️ 🍎 🪟 🐧 - AI agent сервис marketplace с x402 micropayments (USDC on Base). 30 tools для browsing сервисы, purchasing, managing conversation

#### 💰 Финансы и Fintech

- [mrslbt/xendit-mcp](https://github.com/mrslbt/xendit-mcp) — 📇 ☁️ - Xendit payment gateway для Southeast Asia. Invoices, disbursements, balance checks, и bank transfers across Indonesia, Philippines, Thailand, Vi
- [@arbitova/mcp-server](https://github.com/jiayuanliang0716-max/Arbitova) — 📇 ☁️ - Non-custodial on-chain escrow + AI dispute arbitration для agent-to-agent USDC payments on Base. Seven tools c
- [@asterpay/mcp-server](https://github.com/timolein74/asterpay-mcp-server) — 📇 ☁️ - EUR settlement для AI agents через x402 protocol. Market data, AI tools, crypto analytics — pay-per-call in USDC on Base
- [@czagents/cnb](https://github.com/martinhavel/cz-agents-mcp) — 📇 ☁️ 🏠 🍎 🪟 🐧 - Czech National Bank (ČNB) daily FX rates: fetch official CZK exchange rates, convert между currencies, fetch his
- [@frihet/mcp-server](https://github.com/Frihet-io/frihet-mcp) — 📇 ☁️ - AI-native business management — invoices, expenses, clients, products, и quotes. 31 tools для Claude, Cursor, Windsurf, и Cline
- [@iiatlas/hledger-mcp](https://github.com/iiAtlas/hledger-mcp) — Double entry plain text accounting, right in your LLM! This MCP enables comprehensive read, и (optional) write access to your local [HLedger](https://hledger.org/) accounting journals
- [@openpulsechain/mcp-server](https://github.com/openpulsechain/public/tree/main/mcp-server) — 📇 ☁️ - PulseChain on-chain analytics: token safety scores (0-100), honeypot detection, whale tracking, smart money feed, scam alerts, DEX vol
- [aaronjmars/web3-research-mcp](https://github.com/aaronjmars/web3-research-mcp) — 📇 ☁️ - Deep Research для crypto - free & fully local
- [ahmetsbilgin/finbrain-mcp](https://github.com/ahmetsbilgin/finbrain-mcp) — 🎖️ 🐍 ☁️ 🏠 - Access institutional-grade alternative financial data directly in your LLM workflow-процессы
- [ahnlabio/bicscan-mcp](https://github.com/ahnlabio/bicscan-mcp) — 🎖️ 🐍 ☁️ - Risk score / asset holdings of EVM blockchain address (EOA, CA, ENS) и even domain names
- [AlexanderLawson17/revettr-python](https://github.com/AlexanderLawson17/revettr-python) — 🐍 ☁️ - Counterparty risk scoring для agentic commerce. Scores wallets, domains, IPs, и companies 0-100 через
- [unixlamadev-spec/aiprox-mcp](https://github.com/unixlamadev-spec/aiprox-mcp) — 📇 ☁️ - Open agent registry — discover и hire autonomous AI agents by capability. 16 agents live. поддерживает Bitcoin Lightni
- [alchemy/alchemy-mcp-server](https://github.com/alchemyplatform/alchemy-mcp-server) — 🎖️ 📇 ☁️ - Allow AI agents to interact с Alchemy's blockchain API
- [anjor/coinmarket-mcp-server](https://github.com/anjor/coinmarket-mcp-server) — 🐍 ☁️ - Coinmarket API integration to fetch cryptocurrency listings и quotes
- [araa47/jupiter-mcp](https://github.com/araa47/jupiter-mcp) — 🐍 ☁️ - Jupiter API-доступ (allow AI to Trade Tokens on Solana + Access Balances + Search Tokens + Create Limit Orders )
- [arcadia-finance/mcp-server](https://github.com/arcadia-finance/mcp-server) — 🎖️ 📇 ☁️ 🏠 - Manage Uniswap и Aerodrome liquidity positions с leverage, automated rebalanc
- [ariadng/metatrader-mcp-server](https://github.com/ariadng/metatrader-mcp-server) — Enable AI LLMs to execute trades через MetaTrader 5 платформа
- [aranjan/kite-mcp](https://github.com/aranjan/kite-mcp) — Trade Indian stocks on Zerodha Kite через natural conversation. 14 tools для holdings, orders, quotes, GTT triggers, и more с automated TOTP login
- [armorwallet/armor-crypto-mcp](https://github.com/armorwallet/armor-crypto-mcp) — 🐍 ☁️ - MCP to интерфейс с multiple blockchains, staking, DeFi, swap, bridging, wallet management, DCA, Limit Orders, Coin Lookup, Tracking и more
- [atomno-labs/mcp-cbr-rates](https://github.com/atomno-labs/mcp-cbr-rates) — 🐍 ☁️ - Central Bank of Russia (ЦБ РФ) data — currency exchange rates (daily и historical), key interest rate, inflation, и ag
- [atomno-labs/mcp-egrul](https://github.com/atomno-labs/mcp-egrul) — Russian state registries EGRUL (legal entities) и EGRIP (individual entrepreneurs), built on official Federal Tax сервис open-data d
- [atomno-labs/mcp-fns-check](https://github.com/atomno-labs/mcp-fns-check) — 🐍 ☁️ - Russian counterparty due diligence — INN/OGRN lookup against EGRUL/EGRIP, bankruptcy registry (EFRSB), tax debts (Transpar
- [jackrain19743/hou-tea-mcp-server](https://github.com/jackrain19743/hou-tea-mcp-server) — 📇 ☁️ - Browse, recommend, и **buy authentic Chinese tea** из hou-tea.com через **USDC stablecoin через the
- [autonsol/sol-mcp](https://github.com/autonsol/sol-mcp) — 📇 ☁️ - Solana token risk scoring и pump.fun graduation signals. Score any token by mint address (0-100 risk, risk_label, holder concentration, liquidity), detect g
- [vdalhambra/axiom-calculator-mcp](https://github.com/vdalhambra/axiom-calculator-mcp) — Personal finance calculators — mortgage payments, compound interest, FIRE retirement number, loan comparison,

#### 📈 Визуализация

- [KyuRish/mcp-dashboards](https://github.com/KyuRish/mcp-dashboards) — 45+ interactive chart types (bar, line, pie, candlestick, sankey, geo, radar, funnel, treemap, и more), dashboards с KPI cards,
- [Ratnaditya-J/csvglow](https://github.com/Ratnaditya-J/csvglow) — Generate beautiful self-contained HTML dashboards из CSV/Excel files с interactive ECharts visualizations, dark gradient theme, и sortable
- [nteract/semiotic](https://github.com/nteract/semiotic) — React data visualization MCP server с 30+ chart types. 5 tools: suggest charts для a dataset, render validated React configs to SVG, diagnose
- [subhatta123/twilize](https://github.com/subhatta123/twilize) — Programmatic Tableau workbook (.twb/.twbx) generation — 47 MCP tools для charts, dashboards, calculated fields, dashboard actions, work

#### 🌎 Путешествия и транспорт

- [alcylu/nightlife-mcp](https://github.com/alcylu/nightlife-mcp) — 📇 ☁️ - MCP-сервер для Tokyo nightlife event discovery, venue search, performer info, AI recommendations, и VIP table booking
- [campertunity/mcp-server](https://github.com/campertunity/mcp-server) — 🎖️ 📇 🏠 - Search campgrounds around the world on campertunity, check availability, и provide booking links
- [cobanov/teslamate-mcp](https://github.com/cobanov/teslamate-mcp) — A Model Context Protocol (MCP) server that provides access to your TeslaMate базы данных, allowing AI assistants to query Tesla vehicle data и analytics
- [haomingkoo/japan-seasons-mcp](https://github.com/haomingkoo/japan-seasons-mcp) — 📇 ☁️ - Live Japan seasonal travel — cherry blossom forecasts, autumn leaves, flower spots, fruit picking & festivals. 1,700+ GPS-ta
- [lodordev/mcp-teslamate-fleet](https://github.com/lodordev/mcp-teslamate-fleet) — Combined TeslaMate analytics + Fleet API commands — 29 tools для vehicle telemetry, driving history, energy analytics, и remote cont
- [helpful-AIs/triplyfy-mcp](https://github.com/helpful-AIs/triplyfy-mcp) — 📇 ☁️ - An MCP-сервер, который lets LLMs plan и manage itineraries с interactive maps in Triplyfy; manage itineraries, places и notes, и search/save flights
- [johnanleitner1-Coder/lastminutedeals-api](https://github.com/johnanleitner1-Coder/lastminutedeals-api) — 🐍 ☁️ - real-time last-minute tour и activity booking. 8,000+ live slots из 29 suppliers across 16 countries через OCTO open stan
- [KyrieTangSheng/mcp-server-nationalparks](https://github.com/KyrieTangSheng/mcp-server-nationalparks) — 📇 ☁️ - National Park сервис API integration providing latest information of park details, alerts, visitor centers, campgrounds, и events для U.S. National Parks
- [lucygoodchild/mcp-national-rail](https://github.com/lucygoodchild/mcp-national-rail) — 📇 ☁️ - An MCP-сервер для UK National Rail trains сервис, providing train schedules и live travel information, intergrating the Realtime Trains API
- [MarceauSolutions/rideshare-comparison-mcp](https://github.com/MarceauSolutions/rideshare-comparison-mcp) — 🐍 ☁️ - Compare Uber и Lyft prices для any route in real-time с fare estimates, surge pricing info, и cheapest option recommendations



## Шаблоны CLAUDE.md

`CLAUDE.md` в корне репозитория автоматически подгружается в контекст. См. [docs](https://docs.claude.com/en/docs/claude-code/memory).

В этом репозитории три production-шаблона:

- [examples/claude-md-templates/nextjs.md](./examples/claude-md-templates/nextjs.md) — Шаблон CLAUDE.md: Next.js 16 + React 19 + TypeScript + Tailwind 4
- [examples/claude-md-templates/python-fastapi.md](./examples/claude-md-templates/python-fastapi.md) — Шаблон CLAUDE.md: Python 3.13+ + FastAPI + SQLAlchemy 2.0 + Pydantic v2
- [examples/claude-md-templates/terraform.md](./examples/claude-md-templates/terraform.md) — Terraform 1.13+ с упором на безопасность state.

Каждый шаблон закрывает пять блоков: стек, команды, структура, правила/анти-паттерны, чек-лист перед PR.

> 📂 Полный каталог CLAUDE.md шаблонов и opinionated setup-ов: **[10 записей →](./catalog/templates.md)**

### Известные сборники

- [multica-ai/andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills) — Один CLAUDE.md, собранный из практик Andrej Karpathy. 128k⭐.
- [garrytan/gstack](https://github.com/garrytan/gstack) — Claude Code-setup от Garry Tan: 23 opinionated tools. 95k⭐.
- [affaan-m/everything-claude-code](https://github.com/affaan-m/everything-claude-code) — Комплексная система оптимизации harness'а: skills, instincts, memory. 181k⭐.

### CLAUDE.md шаблоны по стэкам

- [vercel-labs/agent-skills (nextjs)](https://github.com/vercel-labs/agent-skills) — Next.js-best-practices skill, де-факто канонический шаблон от Vercel Engineering.
- [supabase/agent-skills](https://github.com/supabase/agent-skills) — Скиллы для Supabase + PostgreSQL
- [callstackincubator/agent-skills (react-native)](https://github.com/callstackincubator/agent-skills) — React Native шаблоны.
- [shadcn/ui skills](https://ui.shadcn.com/docs/skills) — Shadcn-компоненты с pattern enforcement.
- [expo/skills](https://github.com/expo/skills) — Expo apps. 25k+ установок.
- [get-convex/agent-skills](https://github.com/get-convex/agent-skills) — Convex — реактивный backend
- [microsoft/azure-skills](https://github.com/microsoft/azure-skills) — Скиллы для Azure deployment + best practices
- [firebase/agent-skills](https://github.com/firebase/agent-skills) — Скиллы для Firebase + Firestore
- [docs.stripe.com](https://docs.stripe.com/agents/claude-code) — Stripe best practices для платёжных интеграций.

### Тематические гайды

- [Anthropic engineering: Claude Code best practices](https://www.anthropic.com/engineering/claude-code-best-practices) — Официальный пост о best practices.
- [Year with Claude Code (alpinadigital)](https://habr.com/ru/companies/alpinadigital/articles/1032134/) — Год опыта в конфигурации.
- [Claude Code: практический гайд (Habr)](https://habr.com/ru/articles/987094/) — Практический setup на русском.



## Workflow и кейсы

Реальные сценарии использования — миграции, рефакторинг, ревью, генерация тестов, автоматизация.

### Блог-посты и кейсы (EN)

- [Superpowers blog post (Jesse Vincent)](https://blog.fsck.com/2025/10/09/superpowers/) — Обзор автора `obra/superpowers` о том, зачем нужны скиллы и как их строить.
- [Naming Claude Plugins (Jesse Vincent)](https://blog.fsck.com/2025/10/23/naming-claude-plugins/) — Про разработку superpowers-lab.
- [Anthropic engineering: Claude Code in action](https://www.anthropic.com/engineering/claude-code-in-action) — Официальные кейсы.
- [Anthropic engineering: hooks for power users](https://www.anthropic.com/news/claude-code-hooks) — Реализация hooks в production.
- [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) — Persistent context across sessions: подход к памяти агента между сессиями. 75k⭐.
- [farion1231/cc-switch](https://github.com/farion1231/cc-switch) — Desktop-приложение для управления Claude Code / Codex / OpenCode. 69k⭐.
- [gsd-build/get-shit-done](https://github.com/gsd-build/get-shit-done) — Meta-промптинг + context engineering + spec-driven workflow. 61k⭐.

### RU-кейсы

- [Год с Claude Code (alpinadigital)](https://habr.com/ru/companies/alpinadigital/articles/1032134/) — Годовой ретроспективный кейс.
- [3000+ часов в Claude Code (Habr)](https://habr.com/ru/articles/1017110/) — Три плагина из личного опыта.
- [Айсберг Claude Code (YooMoney)](https://habr.com/ru/companies/yoomoney/articles/1015548/) — 30+ возможностей от новичка до автоматизации.
- [Изоляция контекста через субагенты (Habr)](https://habr.com/ru/articles/974448/) — Архитектурный паттерн для долгих задач.
- [Что вы не знали о Claude Code (Habr)](https://habr.com/ru/articles/1012412/) — Инженерные практики.
- [Statusline для Claude Code с мониторингом VPS (Habr)](https://habr.com/ru/articles/1013414/) — Кастом statusline.
- [Разработка с Obsidian + Claude (Habr)](https://habr.com/ru/articles/1030316/) — Workflow Claude + база знаний.

### Видеоразборы (RU)

- [Я потратил на Claude Code 1 000 часов (YouTube)](https://www.youtube.com/watch?v=sx6ZSbc51gY) — Личный опыт автора, вайб-кодинг.
- [Claude Code или Codex? Честный тест (YouTube)](https://www.youtube.com/watch?v=OethkCDGwuM) — Сравнительный тест на реальном продукте.



## Безопасность и enterprise

- [Security best practices](https://docs.claude.com/en/docs/claude-code/security) — Официальный гайд по безопасности.
- [Permissions / IAM](https://docs.claude.com/en/docs/claude-code/iam) — Настройка прав, `allowManagedHooksOnly` для enterprise.
- [trailofbits/skills](https://github.com/trailofbits/skills) — Security-скиллы от Trail of Bits: статический анализ через CodeQL/Semgrep, code auditing, поиск уязвимостей.
- [firebase/agent-skills@firestore-security-rules-auditor](https://skills.sh/firebase/agent-skills/firestore-security-rules-auditor) — Аудит Firestore security rules, 20k+ установок.
- [firebase/agent-skills@firebase-security-rules-auditor](https://skills.sh/firebase/agent-skills/firebase-security-rules-auditor) — Аудит Firebase rules.
- [useai-pro/openclaw-skills-security@skill-vetter](https://skills.sh/useai-pro/openclaw-skills-security/skill-vetter) — Vetting сторонних скиллов перед установкой.
- [supercent-io/skills-template@security-best-practices](https://skills.sh/supercent-io/skills-template/security-best-practices) — Универсальный security checklist
- [wshobson/agents@security-requirement-extraction](https://skills.sh/wshobson/agents/security-requirement-extraction) — Извлечение security requirements из threat model.
- [better-auth/skills@better-auth-security-best-practices](https://skills.sh/better-auth/skills/better-auth-security-best-practices) — Security для auth-систем.
- [github/awesome-copilot@ai-prompt-engineering-safety-review](https://skills.sh/github/awesome-copilot/ai-prompt-engineering-safety-review) — Review промптов на безопасность.
- [Anthropic enterprise governance](https://www.anthropic.com/enterprise) — Корпоративный governance.

### Локально в репо

- [Hook для блокировки коммита секретов](./examples/hooks/README.md) — Pre-commit detector, который ловит и человека, и агента. Скрипт: [pre-commit-secrets.sh](./examples/hooks/scripts/pre-commit-secrets.sh).

### Enterprise patterns

- [allowManagedHooksOnly](https://docs.claude.com/en/docs/claude-code/settings#hook-configuration) — Admin может блокировать user/project hooks.
- [Managed plugin marketplaces](https://docs.claude.com/en/docs/claude-code/plugins#managed) — Выпустить vetted скиллы только из своего marketplace.
- [Permission policies](https://docs.claude.com/en/docs/claude-code/permissions#policy) — Org-wide allowlist Bash-команд.
- [Audit logging через hooks](./examples/hooks/README.md#3-session-log---аудит-всех-действий-агента-в-jsonl) — JSONL-аудит для compliance.



## Промптинг

### Официальное

- [Anthropic Prompting Guide](https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview) — Официальный гайд.
- [Anthropic Cookbook](https://github.com/anthropics/anthropic-cookbook) — Примеры паттернов с кодом.
- [Claude API Skills best practices](https://platform.claude.com/docs/ru/agents-and-tools/agent-skills/best-practices) — Официальный документ на русском.
- [Prompt engineering на Claude Console](https://console.anthropic.com/dashboard) — Playground с библиотекой.

### Топ-скиллы по промптингу (skills.sh)

- [obra/superpowers@brainstorming](https://skills.sh/obra/superpowers/brainstorming) — **155K** установок. Структурированный брейншторм до начала работы.
- [google-labs-code/stitch-skills@enhance-prompt](https://skills.sh/google-labs-code/stitch-skills/enhance-prompt) — **39K**. Улучшение промпта перед отправкой модели.
- [wshobson/agents@prompt-engineering-patterns](https://skills.sh/wshobson/agents/prompt-engineering-patterns) — **14K**. Продвинутые паттерны.
- [supercent-io/skills-template@prompt-repetition](https://skills.sh/supercent-io/skills-template/prompt-repetition) — **11K**. Паттерны повторения для long-form промптов.
- [github/awesome-copilot@prompt-builder](https://skills.sh/github/awesome-copilot/prompt-builder) — **9K**. Строитель промптов.
- [github/awesome-copilot@ai-prompt-engineering-safety-review](https://skills.sh/github/awesome-copilot/ai-prompt-engineering-safety-review) — **9K**. Безопасность промптов.

### Кураторы

- [dair-ai/Prompt-Engineering-Guide](https://github.com/dair-ai/Prompt-Engineering-Guide) — Академический гайд, 50k+ ⭐.
- [f/awesome-chatgpt-prompts](https://github.com/f/awesome-chatgpt-prompts) — Большая коллекция готовых промптов (применимы и к Claude).
- [PatrickJS/awesome-cursorrules](https://github.com/PatrickJS/awesome-cursorrules) — `.cursorrules` для разных стэков, многие переносимы в CLAUDE.md.



## Гайды и статьи на русском

> 📂 Полный список RU-статей и YouTube-курсов: **[12 записей →](./catalog/ru-content.md)**

### Habr — практические гайды (2025-2026)

- [Claude Code в 2026: гайд для тех, кто еще пишет код руками](https://habr.com/ru/articles/987382/) — Подробный гайд по AI Coding Agents, рекомендации по тарифам и CLI.
- [Год с Claude Code: как собрать рабочую конфигурацию с первого запуска](https://habr.com/ru/companies/alpinadigital/articles/1032134/) — Как устроены rules, skills, agents, commands, MCP и hooks, как всё связывается через routing.md.
- [Claude Code: практический гайд по настройке, автоматизации и работе с контекстом](https://habr.com/ru/articles/987094/) — Полный сетап с навыками, хуками, сабагентами и MCP. От автора, который работает с Claude Code ежедневно.
- [Полное руководство по добавлению серверов MCP в Claude Code](https://habr.com/ru/articles/938626/) — Методы настройки MCP, решения распространённых ошибок, рекомендации по проверенным серверам.
- [44 настройки Claude Code, о которых вы не знали](https://habr.com/ru/articles/987826/) — Ранжированные от «must have» до «забей». Включает конфигурацию workflow с MCP, lazy-loading инструментов.
- [10 настроек Claude Code, до которых большинство разработчиков не доходит](https://habr.com/ru/articles/1028988/) — Недо-используемые возможности.
- [Что вы не знали о Claude Code: архитектура, управление и инженерные практики](https://habr.com/ru/articles/1012412/) — Глубокая внутренняя архитектура агента.
- [Айсберг Claude Code: 30+ возможностей от новичка до автоматизации](https://habr.com/ru/companies/yoomoney/articles/1015548/) — От YooMoney. Карта возможностей от базовых до автоматизации.
- [Изоляция контекста через субагенты: архитектурный паттерн для долгосрочной работы с Claude Code](https://habr.com/ru/articles/974448/) — Про субагенты как способ держать основной контекст чистым.
- [3000+ часов в Claude Code: как я сконцентрировал весь опыт в трёх плагинах](https://habr.com/ru/articles/1017110/) — Личный опыт автора, упакованный в три плагина.
- [Как я собрал statusline для Claude Code с мониторингом VPS за одну сессию](https://habr.com/ru/articles/1013414/) — Кастомизация statusline.
- [Разработка с Obsidian + Claude. Практический гайд](https://habr.com/ru/articles/1030316/) — Workflow связки Claude + Obsidian.
- [Как использовать AI-агент Claude Code: советы опытного разработчика (OTUS)](https://habr.com/ru/companies/otus/articles/929624/) — Корпоративный блог OTUS.
- [Claude Code — полный гайд и обучение для новичков с нуля](https://habr.com/ru/articles/1033416/) — Функции, настройка, best practices.
- [Claude Code: маршрут обучения и полезные ресурсы (2026)](https://habr.com/ru/articles/983214/) — Учебная карта.
- [Claude Code для тех, кто не пишет код: полный разбор](https://habr.com/ru/articles/1017668/) — Для продуктовых и менеджеров.
- [Code with Claude 2026: что Anthropic показали разработчикам](https://habr.com/ru/articles/1032588/) — Отчёт со второй конференции Anthropic (6 мая 2026, San Francisco).
- [Claude Code бесплатно: как использовать ИИ бесплатно в 2026](https://habr.com/ru/articles/1018234/) — Про утечку source maps и форк OpenClaude.
- [Claude AI: что умеет нейросеть Anthropic в 2026](https://habr.com/ru/articles/1027572/) — Обзорная статья.

### vc.ru — индустрия и кейсы

- [Кодинг с ИИ-агентом в терминале: что это такое и как работает в 2026 году](https://vc.ru/ai/2920853-ii-agenty-v-terminalye) — Как Claude Code и аналоги работают изнутри.
- [Claude Code, OpenClaw, Hermes: три парадигмы ИИ-агентов в 2026](https://vc.ru/ai/2911692-iskusstvennyj-intellekt-dlja-biznesa) — Opus 4.7, бюджеты задач, контекст до 1 млн токенов.
- [Anthropic ограничила OpenClaw в Claude подписках](https://vc.ru/ai/2878137-anthropic-ogranichila-openclaw-v-claude) — Инцидент с отключением сторонних агентов от подписочных лимитов.
- [Anthropic выкатили 10 агентов для финансового сектора](https://vc.ru/id300496/2913405-anthropic-predstavila-ii-agentov-dlya-finansovogo-sektora) — Финансовые AI-агенты.
- [Anthropic признал, что два месяца поставлял дефектный Claude Code](https://vc.ru/ai/2885740-anthropic-priznal-defekty-v-claude-code) — Incident report — Anthropic признал две недели дефектов в Claude Code
- [Тарифы Claude 2026: гайд по планам, ценам API и доступу из России](https://vc.ru/ai/2757771-tarify-claude-2026-gayd-po-planam-i-dostupu-iz-rossii) — Pricing и доступ.
- [Как оплатить Anthropic AI (Claude) в 2026 году: рабочие способы для России](https://vc.ru/services/2890865-kak-oplatit-anthropic-ai-iz-rossii) — Гайд по оплате Claude из России
- [Как зарегистрироваться в Claude AI из России в 2026 году](https://vc.ru/ai/2878925-registratsiya-v-claude-ai-iz-rossii) — Регистрация.

### DTF — гайды для не-разработчиков

- [Как использовать Claude в России в 2026 году: полный гайд от регистрации до Claude Code](https://dtf.ru/howto/4796716-kak-zaregistrirovatsya-i-ispolzovat-claude-v-rossii) — Полный гайд по регистрации и работе с Claude из России
- [AI-кодинг с Claude Code: три способа создания лендинга](https://dtf.ru/howto/4727219-ai-koding-s-claude-code-sozdanie-lendinga-i-ego-detali) — Практический пример влияния контекста на результат.
- [Claude AI: возможности и готовые примеры запросов](https://dtf.ru/howto/5013694-claude-ai-vozmozhnosti-nevroseti) — Сценарии использования и готовые промпты



## YouTube на русском

- [Claude Code: ПОЛНЫЙ КУРС 2026 (4+ ЧАСА)](https://www.youtube.com/watch?v=e6JOw0PliRw) — Длинный курс с практикой.
- [Claude Code: ПОЛНЫЙ ГАЙД 2026 (2+ часовой курс)](https://www.youtube.com/watch?v=kFpX1FftH70) — Структурированный курс.
- [Claude Code: Полный гайд 2026 — настройка, MCP и Subagent Driven разработка](https://www.youtube.com/watch?v=_4ZcgpvDliA) — Фокус на MCP и субагентах.
- [Claude Code: ПОЛНЫЙ ГАЙД 2026 — изучи ВСЁ за 2 часа](https://www.youtube.com/watch?v=dn3CuC-2NiI) — Альтернативный 2-часовой обзор.
- [Я потратил на Claude Code 1 000 часов. Вайб-кодинг](https://www.youtube.com/watch?v=sx6ZSbc51gY) — Личный опыт, фокус на «вайб-кодинге».
- [Claude на МАКСИМУМ — полный гайд за 11 минут](https://www.youtube.com/watch?v=erdJvTR0hcU) — Компактный обзор за 11 минут.
- [Создавай ИИ-агентов с Claude Code — ВСЕ функции за 22 минуты](https://www.youtube.com/watch?v=iwyHt30Ty0c) — Промпты, MCP, субагенты, скиллы, hooks, permissions.
- [Claude Code или Codex? Честный тест создания продукта](https://www.youtube.com/watch?v=OethkCDGwuM) — Сравнение Claude Code vs OpenAI Codex.
- [Claude Code для дизайнеров — новый стандарт работы в 2026](https://www.youtube.com/watch?v=OiXq8xhJ-wg) — UX/UI-фокус.
- [Claude станет в 10 раз УМНЕЕ, если ты подключишь ЭТО](https://www.youtube.com/watch?v=eTrUEZ9E9aI) — MCP-инструменты для усиления.
- [Регистрация в Claude AI в России в 2026г](https://www.youtube.com/watch?v=2ypCr-Gz-t0) — Практический гайд по регистрации.



## Каналы и подкасты

### Telegram (RU)

- [@cc_consultant](https://t.me/cc_consultant) — Этот handbook и ежедневные разборы Claude Code из клиентских проектов.

> Раздел открыт для дополнений: PR с русскоязычными каналами про AI-инструменты приветствуется. Критерий — реальная практика и регулярные посты, не агрегатор новостей.

### Discord / Slack (EN)

- [Anthropic Discord](https://www.anthropic.com/discord) — Каналы `#claude-code`, `#skills-and-tools`, `#show-and-tell`.
- [VoltAgent Discord](https://s.voltagent.dev/discord) — Комьюнити вокруг awesome-claude-code-subagents.
- [r/ClaudeAI](https://www.reddit.com/r/ClaudeAI/) — Reddit-сообщество, самое активное в англоязычном поле.
- [r/Anthropic](https://www.reddit.com/r/Anthropic/) — Официальное сабреддит Anthropic.

### Подкасты (EN)

- [Latent Space (swyx)](https://www.latent.space/) — AI engineering с регулярными выпусками про Claude Code и MCP.
- [The Cognitive Revolution](https://www.cognitiverevolution.ai/) — Nathan Labenz, AI индустрия и тренды.
- [Practical AI (Changelog)](https://changelog.com/practicalai) — Практические кейсы применения AI.
- [AI Engineer Podcast](https://www.latent.space/p/ai-engineer-podcast) — Выделенные интервью.
- [a16z Podcast](https://a16z.com/podcasts/) — VC-перспектива на AI tools.
- [Software Engineering Daily](https://softwareengineeringdaily.com/) — Техническая инженерия включая AI.

### Twitter / X — практики Claude Code (EN)

- [@AnthropicAI](https://twitter.com/AnthropicAI) — Официальный аккаунт.
- [@alexalbert__](https://twitter.com/alexalbert__) — Alex Albert — developer relations в Anthropic
- [@swyx](https://twitter.com/swyx) — AI engineering, основатель Latent Space.
- [@simonw](https://twitter.com/simonw) — Simon Willison, регулярные разборы LLM tooling.
- [@mattpocockuk](https://twitter.com/mattpocockuk) — Matt Pocock, TDD-скиллы (95k+ установок).
- [@obra](https://twitter.com/obra) — Jesse Vincent, автор `obra/superpowers`.

### YouTube — англоязычные каналы

- [Anthropic (official)](https://www.youtube.com/@anthropic-ai) — Официальный канал, релизы и техдемки.
- [Matt Pocock](https://www.youtube.com/@mattpocockuk) — TypeScript и AI tools.
- [AI Jason](https://www.youtube.com/@AIJasonZ) — Практические AI-агенты и tooling.
- [Theo - t3.gg](https://www.youtube.com/@t3dotgg) — Frontend и AI-инструменты, регулярные обзоры релизов Claude Code.
- [Fireship](https://www.youtube.com/@Fireship) — Короткие обзоры AI и dev-инструментов.
- [ThePrimeagen](https://www.youtube.com/@ThePrimeagen) — Обзоры AI workflow с критическим взглядом.
- [AI Engineer](https://www.youtube.com/@aiDotEngineer) — Конференция AI Engineer, выступления про Claude Code и MCP.
- [Continue](https://www.youtube.com/@continuedev) — Обзоры IDE-агентов и AI workflow.

### Дополнительные ресурсы

- [Anthropic Console](https://console.anthropic.com/) — Playground, библиотека промптов, API keys.
- [Anthropic Workbench](https://console.anthropic.com/workbench) — UI для экспериментов с промптами и моделями.
- [Anthropic Status](https://status.anthropic.com/) — Статус сервисов Anthropic.
- [Claude release notes](https://docs.claude.com/en/release-notes/claude-code) — Официальный changelog Claude Code.
- [Anthropic Blog (engineering)](https://www.anthropic.com/engineering) — Инженерный блог с практиками Claude Code.
- [Anthropic Cookbook](https://github.com/anthropics/anthropic-cookbook) — Примеры паттернов с кодом.
- [Skills.sh](https://skills.sh/) — Маркетплейс скиллов с install-count.
- [MCP Servers Hub (mcp.so)](https://mcp.so/) — Каталог MCP-серверов с поиском.
- [Glama AI MCP servers](https://glama.ai/mcp/servers) — Альтернативный каталог MCP-серверов.
- [Pulse MCP](https://www.pulsemcp.com/) — Ещё один каталог MCP-серверов и use-case'ов.

## Сравнение с другими инструментами

### CLI-агенты

- [Cursor](https://cursor.com/) — IDE-first, отдельный редактор на базе VS Code, сильный autocomplete.
- [GitHub Copilot](https://github.com/features/copilot) — Встроен в IDE, фокус на автокомплите + chat.
- [Aider](https://aider.chat/) — CLI-first, open-source, мульти-модельный.
- [Cline](https://github.com/cline/cline) — VS Code-расширение с агентным режимом.
- [Continue](https://www.continue.dev/) — Open-source автокомплит + chat в IDE.
- [OpenAI Codex CLI](https://github.com/openai/codex) — Официальный CLI-агент от OpenAI.
- [Google Gemini CLI](https://github.com/google-gemini/gemini-cli) — CLI-агент от Google.
- [Windsurf (Codeium)](https://codeium.com/windsurf) — IDE-агент от Codeium.
- [OpenClaw](https://habr.com/ru/articles/1018234/) — Open-source форк Claude Code (см. историю).

### Сравнения и обзоры

- [Claude Code или Codex? Честный тест (YouTube RU)](https://www.youtube.com/watch?v=OethkCDGwuM) — Сравнительный тест.
- [Claude Code, OpenClaw, Hermes: три парадигмы (vc.ru)](https://vc.ru/ai/2911692-iskusstvennyj-intellekt-dlja-biznesa) — Три парадигмы AI-агентов.
- [Кодинг с ИИ-агентом в терминале (vc.ru)](https://vc.ru/ai/2920853-ii-agenty-v-terminalye) — Обзор класса инструментов.

### Связанные экосистемы

- [VoltAgent](https://github.com/VoltAgent/voltagent) — Мульти-агентный framework, на котором собраны awesome-claude-code-subagents.
- [MCP everywhere](https://modelcontextprotocol.io/) — MCP-стандарт, работает с Cursor, Claude Desktop, Continue, Cline.



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
