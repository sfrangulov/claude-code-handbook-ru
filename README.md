# Claude Code Handbook на русском

> Курируемый handbook для тех, кто использует [Claude Code](https://docs.claude.com/en/docs/claude-code/overview) в работе — скиллы, slash-команды, hooks, MCP-серверы, плагины, шаблоны и кейсы.
>
> Не «awesome-list ради списка», а отобранное — то, что я и контрибьюторы реально применяем в клиентских проектах. Каждая позиция со ссылкой на источник и короткой пометкой, для чего полезно.
>
> Обновления и разборы — в Telegram [@cc_consultant](https://t.me/cc_consultant).
>
> Этот README — **1014 кликабельных ресурсов с описаниями**: 500+ MCP-серверов по 30 категориям, 144 субагента VoltAgent, 116 плагинов ccplugins, топ-28 скиллов с install-count из skills.sh, hooks-паттерны, шаблоны CLAUDE.md, кейсы, 38 материалов на русском (Habr + vc.ru + YouTube + DTF).
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

- [api-designer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/01-core-development/api-designer.md) — API design — REST/GraphQL/gRPC
- [backend-developer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/01-core-development/backend-developer.md) — Backend разработка
- [design-bridge](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/01-core-development/design-bridge.md)
- [electron-pro](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/01-core-development/electron-pro.md) — Electron desktop apps
- [frontend-developer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/01-core-development/frontend-developer.md) — Frontend разработка
- [fullstack-developer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/01-core-development/fullstack-developer.md) — Fullstack разработка
- [graphql-architect](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/01-core-development/graphql-architect.md) — GraphQL architecture
- [microservices-architect](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/01-core-development/microservices-architect.md) — Microservices архитектура
- [mobile-developer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/01-core-development/mobile-developer.md) — Mobile-приложения
- [ui-designer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/01-core-development/ui-designer.md) — UI-дизайн
- [websocket-engineer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/01-core-development/websocket-engineer.md) — WebSocket / real-time

#### 🔤 Language specialists

- [angular-architect](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/02-language-specialists/angular-architect.md) — Angular
- [cpp-pro](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/02-language-specialists/cpp-pro.md) — C++
- [csharp-developer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/02-language-specialists/csharp-developer.md) — C#
- [django-developer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/02-language-specialists/django-developer.md) — Django
- [dotnet-core-expert](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/02-language-specialists/dotnet-core-expert.md) — .NET Core
- [dotnet-framework-4.8-expert](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/02-language-specialists/dotnet-framework-4.8-expert.md)
- [elixir-expert](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/02-language-specialists/elixir-expert.md)
- [expo-react-native-expert](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/02-language-specialists/expo-react-native-expert.md)
- [fastapi-developer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/02-language-specialists/fastapi-developer.md)
- [flutter-expert](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/02-language-specialists/flutter-expert.md) — Flutter
- [golang-pro](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/02-language-specialists/golang-pro.md) — Go
- [java-architect](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/02-language-specialists/java-architect.md) — Java enterprise
- [javascript-pro](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/02-language-specialists/javascript-pro.md) — JavaScript
- [kotlin-specialist](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/02-language-specialists/kotlin-specialist.md) — Kotlin
- [laravel-specialist](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/02-language-specialists/laravel-specialist.md) — Laravel
- [nextjs-developer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/02-language-specialists/nextjs-developer.md) — Next.js
- [node-specialist](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/02-language-specialists/node-specialist.md)
- [php-pro](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/02-language-specialists/php-pro.md) — PHP
- [powershell-5.1-expert](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/02-language-specialists/powershell-5.1-expert.md)
- [powershell-7-expert](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/02-language-specialists/powershell-7-expert.md)
- [python-pro](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/02-language-specialists/python-pro.md) — Python
- [rails-expert](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/02-language-specialists/rails-expert.md) — Ruby on Rails
- [react-specialist](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/02-language-specialists/react-specialist.md) — React
- [rust-engineer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/02-language-specialists/rust-engineer.md) — Rust
- [spring-boot-engineer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/02-language-specialists/spring-boot-engineer.md) — Spring Boot
- [sql-pro](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/02-language-specialists/sql-pro.md) — SQL
- [swift-expert](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/02-language-specialists/swift-expert.md) — Swift / iOS
- [symfony-specialist](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/02-language-specialists/symfony-specialist.md)
- [typescript-pro](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/02-language-specialists/typescript-pro.md) — TypeScript
- [vue-expert](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/02-language-specialists/vue-expert.md) — Vue.js

#### ☁️ Infrastructure & DevOps

- [azure-infra-engineer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/03-infrastructure/azure-infra-engineer.md)
- [cloud-architect](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/03-infrastructure/cloud-architect.md) — Cloud architecture
- [database-administrator](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/03-infrastructure/database-administrator.md) — DBA — admin задачи
- [deployment-engineer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/03-infrastructure/deployment-engineer.md) — Deployment pipelines
- [devops-engineer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/03-infrastructure/devops-engineer.md) — DevOps
- [devops-incident-responder](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/03-infrastructure/devops-incident-responder.md) — DevOps incident response
- [docker-expert](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/03-infrastructure/docker-expert.md)
- [incident-responder](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/03-infrastructure/incident-responder.md)
- [kubernetes-specialist](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/03-infrastructure/kubernetes-specialist.md) — Kubernetes
- [network-engineer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/03-infrastructure/network-engineer.md) — Сетевая инфра
- [platform-engineer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/03-infrastructure/platform-engineer.md) — Platform engineering
- [security-engineer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/03-infrastructure/security-engineer.md) — Security engineering
- [sre-engineer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/03-infrastructure/sre-engineer.md)
- [terraform-engineer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/03-infrastructure/terraform-engineer.md) — Terraform / IaC
- [terragrunt-expert](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/03-infrastructure/terragrunt-expert.md)
- [windows-infra-admin](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/03-infrastructure/windows-infra-admin.md)

#### ✅ Quality & security

- [accessibility-tester](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/04-quality-security/accessibility-tester.md) — A11y тестирование
- [ad-security-reviewer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/04-quality-security/ad-security-reviewer.md)
- [ai-writing-auditor](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/04-quality-security/ai-writing-auditor.md)
- [architect-reviewer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/04-quality-security/architect-reviewer.md) — Архитектурный ревьюер
- [chaos-engineer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/04-quality-security/chaos-engineer.md) — Chaos engineering
- [code-reviewer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/04-quality-security/code-reviewer.md) — Code review
- [compliance-auditor](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/04-quality-security/compliance-auditor.md) — Compliance аудит
- [debugger](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/04-quality-security/debugger.md) — Debugging
- [error-detective](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/04-quality-security/error-detective.md) — Поиск багов
- [penetration-tester](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/04-quality-security/penetration-tester.md) — Penetration testing
- [performance-engineer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/04-quality-security/performance-engineer.md) — Performance optimization
- [powershell-security-hardening](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/04-quality-security/powershell-security-hardening.md)
- [qa-expert](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/04-quality-security/qa-expert.md) — QA
- [security-auditor](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/04-quality-security/security-auditor.md) — Security audit
- [test-automator](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/04-quality-security/test-automator.md) — Test automation
- [ui-ux-tester](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/04-quality-security/ui-ux-tester.md)

#### 🧠 Data & AI

- [ai-engineer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/05-data-ai/ai-engineer.md) — AI engineering
- [data-analyst](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/05-data-ai/data-analyst.md) — Data analysis
- [data-engineer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/05-data-ai/data-engineer.md) — Data engineering
- [data-scientist](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/05-data-ai/data-scientist.md) — Data science
- [database-optimizer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/05-data-ai/database-optimizer.md) — Database optimization
- [llm-architect](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/05-data-ai/llm-architect.md) — LLM architecture
- [machine-learning-engineer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/05-data-ai/machine-learning-engineer.md) — ML engineering
- [ml-engineer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/05-data-ai/ml-engineer.md) — ML engineering (alt)
- [mlops-engineer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/05-data-ai/mlops-engineer.md) — MLOps
- [nlp-engineer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/05-data-ai/nlp-engineer.md) — NLP
- [postgres-pro](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/05-data-ai/postgres-pro.md)
- [prompt-engineer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/05-data-ai/prompt-engineer.md) — Prompt engineering
- [reinforcement-learning-engineer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/05-data-ai/reinforcement-learning-engineer.md)

#### ⚡ Developer experience

- [build-engineer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/06-developer-experience/build-engineer.md) — Build systems
- [cli-developer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/06-developer-experience/cli-developer.md) — CLI tools
- [dependency-manager](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/06-developer-experience/dependency-manager.md) — Управление зависимостями
- [documentation-engineer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/06-developer-experience/documentation-engineer.md) — Tech writing
- [dx-optimizer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/06-developer-experience/dx-optimizer.md) — Developer experience
- [git-workflow-manager](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/06-developer-experience/git-workflow-manager.md) — Git workflows
- [legacy-modernizer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/06-developer-experience/legacy-modernizer.md) — Legacy кода модернизация
- [mcp-developer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/06-developer-experience/mcp-developer.md) — MCP-сервера разработка
- [powershell-module-architect](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/06-developer-experience/powershell-module-architect.md)
- [powershell-ui-architect](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/06-developer-experience/powershell-ui-architect.md)
- [readme-generator](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/06-developer-experience/readme-generator.md)
- [refactoring-specialist](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/06-developer-experience/refactoring-specialist.md) — Рефакторинг
- [slack-expert](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/06-developer-experience/slack-expert.md)
- [tooling-engineer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/06-developer-experience/tooling-engineer.md) — Internal tools

#### 🎯 Specialized domains

- [api-documenter](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/07-specialized-domains/api-documenter.md)
- [blockchain-developer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/07-specialized-domains/blockchain-developer.md) — Blockchain
- [embedded-systems](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/07-specialized-domains/embedded-systems.md) — Embedded
- [fintech-engineer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/07-specialized-domains/fintech-engineer.md) — Fintech
- [game-developer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/07-specialized-domains/game-developer.md) — Game development
- [healthcare-admin](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/07-specialized-domains/healthcare-admin.md)
- [iot-engineer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/07-specialized-domains/iot-engineer.md) — IoT
- [m365-admin](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/07-specialized-domains/m365-admin.md)
- [mobile-app-developer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/07-specialized-domains/mobile-app-developer.md) — Mobile apps
- [payment-integration](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/07-specialized-domains/payment-integration.md)
- [quant-analyst](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/07-specialized-domains/quant-analyst.md) — Quantitative analysis
- [risk-manager](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/07-specialized-domains/risk-manager.md) — Risk management
- [seo-specialist](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/07-specialized-domains/seo-specialist.md)

#### 💼 Business & product

- [business-analyst](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/08-business-product/business-analyst.md) — Бизнес-анализ
- [content-marketer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/08-business-product/content-marketer.md) — Content marketing
- [customer-success-manager](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/08-business-product/customer-success-manager.md) — Customer success
- [legal-advisor](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/08-business-product/legal-advisor.md) — Legal
- [license-engineer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/08-business-product/license-engineer.md)
- [product-manager](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/08-business-product/product-manager.md) — Product management
- [project-manager](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/08-business-product/project-manager.md) — Project management
- [sales-engineer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/08-business-product/sales-engineer.md) — Sales engineering
- [scrum-master](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/08-business-product/scrum-master.md) — Scrum master
- [technical-writer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/08-business-product/technical-writer.md) — Tech writing
- [ux-researcher](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/08-business-product/ux-researcher.md) — UX research
- [wordpress-master](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/08-business-product/wordpress-master.md) — WordPress

#### 🎭 Meta & orchestration

- [agent-installer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/09-meta-orchestration/agent-installer.md)
- [agent-organizer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/09-meta-orchestration/agent-organizer.md) — Agent orchestration
- [codebase-orchestrator](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/09-meta-orchestration/codebase-orchestrator.md)
- [context-manager](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/09-meta-orchestration/context-manager.md) — Context management
- [error-coordinator](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/09-meta-orchestration/error-coordinator.md) — Error coordination
- [it-ops-orchestrator](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/09-meta-orchestration/it-ops-orchestrator.md)
- [knowledge-synthesizer](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/09-meta-orchestration/knowledge-synthesizer.md) — Knowledge synthesis
- [multi-agent-coordinator](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/09-meta-orchestration/multi-agent-coordinator.md) — Multi-agent coordination
- [performance-monitor](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/09-meta-orchestration/performance-monitor.md) — Performance monitoring
- [task-distributor](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/09-meta-orchestration/task-distributor.md) — Task distribution
- [workflow-orchestrator](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/09-meta-orchestration/workflow-orchestrator.md) — Workflow orchestration

#### 🔬 Research & analysis

- [competitive-analyst](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/10-research-analysis/competitive-analyst.md) — Competitive analysis
- [data-researcher](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/10-research-analysis/data-researcher.md)
- [market-researcher](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/10-research-analysis/market-researcher.md) — Market research
- [project-idea-validator](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/10-research-analysis/project-idea-validator.md)
- [research-analyst](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/10-research-analysis/research-analyst.md) — Research analysis
- [scientific-literature-researcher](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/10-research-analysis/scientific-literature-researcher.md)
- [search-specialist](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/10-research-analysis/search-specialist.md) — Search
- [trend-analyst](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/10-research-analysis/trend-analyst.md) — Trend analysis



## Plugins

[Claude Code Plugins](https://docs.claude.com/en/docs/claude-code/plugins) — packaging для скиллов, агентов, hooks и MCP-серверов. Один плагин = один артефакт, который ставится через `/plugin marketplace`.

> 📂 Полный каталог плагинов: **[16 записей →](./catalog/plugins.md)**

### Каталог плагинов

Полный список плагинов из [ccplugins/awesome-claude-code-plugins](https://github.com/ccplugins/awesome-claude-code-plugins), 782⭐. Каждый ставится через `/plugin marketplace add ccplugins/awesome-claude-code-plugins` и `/plugin install <name>`.

#### 🏛️ Официальные плагины Claude Code

- [agent-sdk-dev](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/agent-sdk-dev) — разработка через Claude Agent SDK
- [pr-review-toolkit](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/pr-review-toolkit") — набор команд для PR-ревью
- [commit-commands](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/commit-commands) — генерация commit-сообщений
- [feature-dev](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/feature-dev) — pipeline разработки фичи
- [security-guidance](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/security-guidance) — security-checklist по ходу работы

#### ✅ Code quality & testing

- [api-tester](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/api-tester) — тестирование API
- [bug-detective](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/bug-detective) — поиск багов
- [code-review](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/code-review) — code review плагин
- [code-review-assistant](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/code-review-assistant) — асистент code review
- [code-reviewer](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/code-reviewer) — code reviewer
- [database-performance-optimizer](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/database-performance-optimizer) — оптимизация БД
- [debug-session](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/debug-session) — структурированная отладка
- [debugger](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/debugger) — debugger субагент
- [double-check](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/double-check) — проверка перед commit
- [optimize](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/optimize) — оптимизация кода
- [performance-benchmarker](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/performance-benchmarker) — performance benchmarks
- [refractor](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/refractor) — refactor (sic)
- [test-file](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/test-file) — генерация тестов
- [test-results-analyzer](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/test-results-analyzer) — анализ результатов тестов
- [test-writer-fixer](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/test-writer-fixer) — TDD-pipeline
- [unit-test-generator](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/unit-test-generator) — генератор unit-тестов

#### 💻 Development & engineering

- [ai-engineer](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/ai-engineer)
- [api-integration-specialist](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/api-integration-specialist)
- [backend-architect](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/backend-architect)
- [code-architect](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/code-architect)
- [desktop-app-dev](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/desktop-app-dev)
- [enterprise-integrator-architect](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/enterprise-integrator-architect)
- [flutter-mobile-app-dev](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/flutter-mobile-app-dev)
- [frontend-developer](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/frontend-developer)
- [mobile-app-builder](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/mobile-app-builder)
- [project-curator](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/project-curator)
- [python-expert](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/python-expert)
- [rapid-prototyper](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/rapid-prototyper)
- [react-native-dev](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/react-native-dev)
- [vision-specialist](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/vision-specialist)
- [web-dev](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/web-dev)

#### 🔀 Git workflow

- [analyze-issue](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/analyze-issue)
- [bug-fix](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/bug-fix)
- [commit](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/commit)
- [create-pr](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/create-pr)
- [create-pull-request](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/create-pull-request)
- [create-worktrees](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/create-worktrees)
- [fix-github-issue](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/fix-github-issue)
- [fix-issue](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/fix-issue)
- [fix-pr](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/fix-pr)
- [github-issue-fix](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/github-issue-fix)
- [husky](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/husky)
- [pr-issue-resolve](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/pr-issue-resolve)
- [pr-review](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/pr-review)
- [update-branch-name](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/update-branch-name)

#### ⚙️ Automation & DevOps

- [deployment-engineer](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/deployment-engineer) — subagent для deployment
- [devops-automator](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/devops-automator) — DevOps automation
- [infrastructure-maintainer](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/infrastructure-maintainer) — обслуживание инфры
- [monitoring-observability-specialist](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/monitoring-observability-specialist) — мониторинг и observability
- [n8n-workflow-builder](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/n8n-workflow-builder) — построение n8n workflows

#### 📚 Documentation

- [analyze-codebase](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/analyze-codebase)
- [changelog-generator](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/changelog-generator)
- [codebase-documenter](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/codebase-documenter)
- [context7-docs-fetcher](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/context7-docs-fetcher)
- [documentation-generator](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/documentation-generator)
- [generate-api-docs](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/generate-api-docs)
- [openapi-expert](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/openapi-expert)
- [update-claudemd](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/update-claudemd)

#### 🎭 Workflow orchestration

- [angelos-symbo](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/angelos-symbo)
- [ceo-quality-controller-agent](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/ceo-quality-controller-agent)
- [claude-desktop-extension](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/claude-desktop-extension)
- [lyra](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/lyra) — AI workflow assistant
- [model-context-protocol-mcp-expert](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/model-context-protocol-mcp-expert)
- [problem-solver-specialist](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/problem-solver-specialist)
- [studio-coach](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/studio-coach) — персональный coach для разработки
- [ultrathink](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/ultrathink) — расширенный режим размышления

#### 🔒 Security, compliance, legal

- [ai-ethics-governance-specialist](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/ai-ethics-governance-specialist)
- [audit](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/audit)
- [compliance-automation-specialist](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/compliance-automation-specialist)
- [data-privacy-engineer](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/data-privacy-engineer)
- [enterprise-security-reviewer](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/enterprise-security-reviewer)
- [legal-advisor](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/legal-advisor)
- [legal-compliance-checker](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/legal-compliance-checker)

#### 📊 Data & analytics

- [analytics-reporter](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/analytics-reporter)
- [data-scientist](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/data-scientist)
- [experiment-tracker](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/experiment-tracker)
- [feedback-synthesizer](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/feedback-synthesizer)
- [trend-researcher](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/trend-researcher)

#### 🎨 Design & UX

- [brand-guardian](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/brand-guardian)
- [joker](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/joker)
- [mobile-ux-optimizer](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/mobile-ux-optimizer)
- [onomastophes](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/onomastophes)
- [ui-designer](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/ui-designer)
- [ux-researcher](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/ux-researcher)
- [visual-storyteller](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/visual-storyteller)
- [whimsy-injector](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/whimsy-injector)

#### 📋 Project & product management

- [discuss](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/discuss)
- [explore](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/explore)
- [plan](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/plan)
- [planning-prd-agent](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/planning-prd-agent)
- [prd-specialist](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/prd-specialist)
- [project-shipper](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/project-shipper)
- [sprint-prioritizer](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/sprint-prioritizer)
- [studio-producer](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/studio-producer)
- [tool-evaluator](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/tool-evaluator)
- [workflow-optimizer](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/workflow-optimizer)

#### 🎯 Marketing & growth

- [app-store-optimizer](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/app-store-optimizer)
- [content-creator](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/content-creator)
- [growth-hacker](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/growth-hacker)
- [instagram-curator](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/instagram-curator)
- [reddit-community-builder](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/reddit-community-builder)
- [tiktok-strategist](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/tiktok-strategist)
- [twitter-engager](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/twitter-engager)

#### 💼 Business & sales

- [b2b-project-shipper](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/b2b-project-shipper) — B2B shipping
- [customer-success-manager](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/customer-success-manager) — customer success
- [enterprise-onboarding-specialist](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/enterprise-onboarding-specialist) — enterprise onboarding
- [finance-tracker](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/finance-tracker) — учёт финансов
- [pricing-packaging-specialist](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/pricing-packaging-specialist) — pricing & packaging
- [product-sales-specialist](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/product-sales-specialist) — sales специалист
- [support-responder](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/support-responder) — support response
- [technical-sales-engineer](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/technical-sales-engineer) — technical sales



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

### Community hook-проекты и обвязки

- [Setting up Claude Code hooks (Anthropic blog)](https://www.anthropic.com/news/claude-code-hooks) — официальный анонс с примерами.
- [claude-code-hooks (carapace-sh)](https://github.com/carapace-sh/claude-code-hooks) — TypeScript SDK для написания hook'ов с типизацией.
- [claude-hooks-toolkit (decoder3000)](https://github.com/decoder3000/claude-hooks-toolkit) — набор pre-made hooks: format, lint, security check, audit.
- [claude-code-pre-commit (snyk)](https://github.com/snyk/claude-code-pre-commit) — Snyk security scan на pre-commit.
- [ccmgr (johnlindquist)](https://github.com/johnlindquist/ccmgr) — менеджер для управления hook-конфигом.
- [hook-runner (mattt)](https://github.com/mattt/hook-runner) — generic hook runner с retry и логированием.

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

- [Hooks reference в официальной доке](https://docs.claude.com/en/docs/claude-code/hooks) — полный список событий и схема.
- [Automate workflows with hooks (guide)](https://docs.claude.com/en/docs/claude-code/hooks-guide) — пошаговый туториал.
- [PRE_COMPACT для context-resilient заметок](https://docs.claude.com/en/docs/claude-code/hooks#precompact) — сохранение состояния до компактификации.
- [InstructionsLoaded для проверки CLAUDE.md](https://docs.claude.com/en/docs/claude-code/hooks#instructionsloaded) — валидация что подгрузился ожидаемый CLAUDE.md.
- [FileChanged для watch-режима](https://docs.claude.com/en/docs/claude-code/hooks#filechanged) — реактивно отвечать на изменения файлов на диске.


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

### Кураторы под Claude Code

- [punkpeye/awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers) — самый большой каталог MCP-серверов с категориями.
- [Best Claude Code MCP Servers 2026 (Nimbalyst)](https://nimbalyst.com/blog/best-claude-code-mcp-servers/) — ранжированный обзор серверов под Claude Code.
- [50+ Best MCP Servers for Claude Code](https://claudefa.st/blog/tools/mcp-extensions/best-addons) — большая подборка с инструкциями.

> **Правило практика:** пять хорошо подобранных MCP лучше двадцати. Каждый сервер расходует токены контекста на discovery — будь придирчив. Если включено 19 серверов — контекст 200k превращается в 70k ещё до старта работы.

### Топ MCP-серверов по категориям

Каталог по доменам — выборка из [punkpeye/awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers) (самый большой источник). Описания на английском как в источнике — большая часть терминов универсальная, переводить нет смысла.

Многим категориям соответствует **полная развёртка в [каталоге](./catalog/mcp-servers.md)** — здесь топ по релевантности для разработчика.

#### 🗄️ Базы данных

- [Aiven-Open/mcp-aiven](https://github.com/Aiven-Open/mcp-aiven) — 🐍 ☁️ 🎖️ - Navigate your [Aiven projects](https://go.aiven.io/mcp-server) and interact with the PostgreSQL®, Apache Kafka®, ClickHouse® and OpenSearch® services
- [alexanderzuev/supabase-mcp-server](https://github.com/alexander-zuev/supabase-mcp-server) — Supabase MCP Server with support for SQL query execution and database exploration tools
- [aliyun/alibabacloud-tablestore-mcp-server](https://github.com/aliyun/alibabacloud-tablestore-mcp-server) — ☕ 🐍 ☁️ - MCP service for Tablestore, features include adding documents, semantic search for documents based on vectors and scalars, RAG-friendly, and serverless
- [amineelkouhen/mcp-cockroachdb](https://github.com/amineelkouhen/mcp-cockroachdb) — 🐍 ☁️ - A Model Context Protocol server for managing, monitoring, and querying data in [CockroachDB](https://cockroachlabs.com)
- [andyWang1688/sql-query-mcp](https://github.com/andyWang1688/sql-query-mcp) — [](https://glama.ai/mcp/servers/andyWang1688/sql-query-mcp) 🐍 🏠 - A general-purpose MCP server that lets AI work with multiple databases within clear boundaries. Supports PostgreSQL and
- [ArcadeData/arcadedb](https://github.com/ArcadeData/arcadedb) — [](https://glama.ai/mcp/servers/@ArcadeData/arcade-db-multi-model-dbms) 🎖️ ☕ 🏠 - Built-in MCP server for ArcadeDB, a multi-model database (graph, document, key-value, time-se
- [benborla29/mcp-server-mysql](https://github.com/benborla/mcp-server-mysql) — ☁️ 🏠 - MySQL database integration in NodeJS with configurable access controls and schema inspection
- [bram2w/baserow](https://github.com/bram2w/baserow) — Baserow database integration with table search, list, and row create, read, update, and delete capabilities
- [c4pt0r/mcp-server-tidb](https://github.com/c4pt0r/mcp-server-tidb) — 🐍 ☁️ - TiDB database integration with schema inspection and query capabilities
- [Canner/wren-engine](https://github.com/Canner/wren-engine) — 🐍 🦀 🏠 - The Semantic Engine for Model Context Protocol(MCP) Clients and AI Agents
- [centralmind/gateway](https://github.com/centralmind/gateway) — 🏎️ 🏠 🍎 🪟 - MCP and MCP SSE Server that automatically generate API based on database schema and data. Supports PostgreSQL, Clickhouse, MySQL, Snowflake, BigQuery, Supabase
- [ChristianHinge/dicom-mcp](https://github.com/ChristianHinge/dicom-mcp) — 🐍 ☁️ 🏠 - DICOM integration to query, read, and move medical images and reports from PACS and other DICOM compliant systems
- [chroma-core/chroma-mcp](https://github.com/chroma-core/chroma-mcp) — 🎖️ 🐍 ☁️ 🏠 - Chroma MCP server to access local and cloud Chroma instances for retrieval capabilities
- [ClickHouse/mcp-clickhouse](https://github.com/ClickHouse/mcp-clickhouse) — 🐍 ☁️ - ClickHouse database integration with schema inspection and query capabilities
- [codeurali/mcp-dataverse](https://github.com/codeurali/mcp-dataverse) — [](https://glama.ai/mcp/servers/@codeurali/mcp-dataverse) 📇 🏠 ☁️ - Microsoft Dataverse MCP server with 63 tools for entity CRUD, FetchXML/OData queries, metadata inspection, workflow execution, audit l
- [confluentinc/mcp-confluent](https://github.com/confluentinc/mcp-confluent) — 🐍 ☁️ - Confluent integration to interact with Confluent Kafka and Confluent Cloud REST APIs
- [corebasehq/coremcp](https://github.com/corebasehq/coremcp) — [](https://glama.ai/mcp/servers/CoreBaseHQ/coremcp) 🏎️ ☁️ 🏠 - A secure, tunnel-native database bridge for AI agents. Connects localhost & on-premise databases (MSSQL, etc.) to LLMs with AST-based query safety and PII masking
- [Couchbase-Ecosystem/mcp-server-couchbase](https://github.com/Couchbase-Ecosystem/mcp-server-couchbase) — 🎖️ 🐍 ☁️ 🏠 - Couchbase MCP server provides unfied access to both Capella cloud and self-managed clusters for document operations, SQL++ queries and natural language data analysis
- [cr7258/elasticsearch-mcp-server](https://github.com/cr7258/elasticsearch-mcp-server) — 🐍 🏠 - MCP Server implementation that provides Elasticsearch interaction
- [crystaldba/postgres-mcp](https://github.com/crystaldba/postgres-mcp) — 🐍 🏠 - All-in-one MCP server for Postgres development and operations, with tools for performance analysis, tuning, and health checks
- [Dataring-engineering/mcp-server-trino](https://github.com/Dataring-engineering/mcp-server-trino) — 🐍 ☁️ - Trino MCP Server to query and access data from Trino Clusters
- [davewind/mysql-mcp-server](https://github.com/dave-wind/mysql-mcp-server) — 🏎️ 🏠 A – user-friendly read-only mysql mcp server for cursor and n8n
- [designcomputer/mysql_mcp_server](https://github.com/designcomputer/mysql_mcp_server) — 🐍 🏠 - MySQL database integration with configurable access controls, schema inspection, and comprehensive security guidelines
- [domdomegg/airtable-mcp-server](https://github.com/domdomegg/airtable-mcp-server) — 📇 🏠 - Airtable database integration with schema inspection, read and write capabilities
- [edwinbernadus/nocodb-mcp-server](https://github.com/edwinbernadus/nocodb-mcp-server) — 📇 ☁️ - Nocodb database integration, read and write capabilities
- [ergut/mcp-bigquery-server](https://github.com/ergut/mcp-bigquery-server) — 📇 ☁️ - Server implementation for Google BigQuery integration that enables direct BigQuery database access and querying capabilities
- [f4ww4z/mcp-mysql-server](https://github.com/f4ww4z/mcp-mysql-server) — 📇 🏠 - Node.js-based MySQL database integration that provides secure MySQL database operations
- [ferrants/memvid-mcp-server](https://github.com/ferrants/memvid-mcp-server) — 🐍 🏠 - Python Streamable HTTP Server you can run locally to interact with [memvid](https://github.com/Olow304/memvid) storage and semantic search
- [fireproof-storage/mcp-database-server](https://github.com/fireproof-storage/mcp-database-server) — 📇 ☁️ - Fireproof ledger database with multi-user sync
- [Michael2150/flamerobin-mcp-server](https://github.com/Michael2150/flamerobin-mcp-server) — [](https://glama.ai/mcp/servers/Michael2150/flamerobin-mcp-server) #️⃣ 🏠 🪟 - Firebird database MCP server that reads connection details from [FlameRobin's](http://www.flame

#### 🔀 Version control (Git, GitHub, GitLab)

- [adhikasp/mcp-git-ingest](https://github.com/adhikasp/mcp-git-ingest) — 🐍 🏠 - Read and analyze GitHub repositories with your LLM
- [costajohnt/oss-autopilot](https://github.com/costajohnt/oss-autopilot) — [](https://glama.ai/mcp/servers/costajohnt/oss-autopilot) 📇 ☁️ 🏠 🍎 🪟 🐧 - Open source contribution manager with PR tracking across repos, issue discovery, CI failure diagnosis, and maintainer
- [ddukbg/github-enterprise-mcp](https://github.com/ddukbg/github-enterprise-mcp) — 📇 ☁️ 🏠 - MCP server for GitHub Enterprise API integration
- [gitea/gitea-mcp](https://gitea.com/gitea/gitea-mcp) — 🎖️ 🏎️ ☁️ 🏠 🍎 🪟 🐧 - Interactive with Gitea instances with MCP
- [github/github-mcp-server](https://github.com/github/github-mcp-server) — 📇 ☁️ - Official GitHub server for integration with repository management, PRs, issues, and more
- [gitopia/gitopia-mcp-server](https://github.com/gitopia/gitopia-mcp-server) — [](https://glama.ai/mcp/servers/gitopia/gitopia-mcp-server) 🏎️ 🏠 🍎 🪟 🐧 - Decentralized Git with on-chain governance, bounties, and DAOs. Tools for repos, issues, PRs, labels, releases, bounties, and DAO pr
- [jmrplens/gitlab-mcp-server](https://github.com/jmrplens/gitlab-mcp-server) — [](https://glama.ai/mcp/servers/jmrplens/gitlab-mcp-server) 🏎️ ☁️ 🏠 🍎 🪟 🐧 - Complete GitLab REST API v4 coverage with 1006 MCP tools across 162 domains, 42 meta-tools, 24 resources, and
- [JaviMaligno/mcp-server-bitbucket](https://github.com/JaviMaligno/mcp-server-bitbucket) — 🐍 ☁️ - Bitbucket MCP server with 58 tools for repository management, PRs, pipelines, branches, commits, deployments, webhooks, tags, branch restrictions, and source browsing
- [kaiyuanxiaobing/atomgit-mcp-server](https://github.com/kaiyuanxiaobing/atomgit-mcp-server) — 📇 ☁️ - Official AtomGit server for integration with repository management, PRs, issues, branches, labels, and more
- [kopfrechner/gitlab-mr-mcp](https://github.com/kopfrechner/gitlab-mr-mcp) — 📇 ☁️ - Interact seamlessly with issues and merge requests of your GitLab projects
- [modelcontextprotocol/server-git](https://github.com/modelcontextprotocol/servers-archived/tree/main/src/git) — 🐍 🏠 - Direct Git repository operations including reading, searching, and analyzing local repositories
- [modelcontextprotocol/server-gitlab](https://github.com/modelcontextprotocol/servers-archived/tree/main/src/gitlab) — 📇 ☁️ 🏠 - GitLab platform integration for project management and CI/CD operations
- [mshegolev/gitlab-ci-mcp](https://github.com/mshegolev/gitlab-ci-mcp) — [](https://glama.ai/mcp/servers/mshegolev/gitlab-ci-mcp) 🐍 ☁️ 🏠 - GitLab CI/CD — pipelines, jobs, schedules, MRs, files. Works with any GitLab (SaaS or self-hosted); published on PyPI and in t
- [QuentinCody/github-graphql-mcp-server](https://github.com/QuentinCody/github-graphql-mcp-server) — 🐍 ☁️ - Unofficial GitHub MCP server that provides access to GitHub's GraphQL API, enabling more powerful and flexible queries for repository data, issues, pull requests, and other GitHub resources
- [raohwork/forgejo-mcp](https://github.com/raohwork/forgejo-mcp) — 🏎️ ☁️ - An MCP server for managing your repositories on Forgejo/Gitea server
- [TamiShaks-2/git-context-mcp](https://github.com/TamiShaks-2/git-context-mcp) — 🐍 🏠 - Local MCP server that provides structured Git repository analysis (project status, recent activity, code map, and risk hotspots) for AI coding agents
- [theonedev/tod](https://github.com/theonedev/tod/blob/main/mcp.md) — 🏎️ 🏠 - A MCP server for OneDev for CI/CD pipeline editing, issue workflow automation, and pull request review
- [Tiberriver256/mcp-server-azure-devops](https://github.com/Tiberriver256/mcp-server-azure-devops) — 📇 ☁️ - Azure DevOps integration for repository management, work items, and pipelines
- [zach-snell/bbkt](https://github.com/zach-snell/bbkt) — [](https://glama.ai/mcp/servers/zach-snell/bbkt) 🏎️ ☁️ 🍎 🪟 🐧 - Bitbucket Cloud CLI and MCP server. Manages workspaces, repos, PRs, pipelines, issues, and source code. Token introspection hides tools the API key can't us

#### 💻 Developer tools

- [masondelan/selvedge](https://github.com/masondelan/selvedge) — [](https://glama.ai/mcp/servers/masondelan/selvedge) 🐍 🏠 - Change tracking for AI-era codebases. AI agents call it to log structured change events (entity + diff + reasoning) before the session ends,
- [sapph1re/mcp-billing-gateway-sdk](https://github.com/sapph1re/mcp-billing-gateway-sdk) — [](https://glama.ai/mcp/servers/sapph1re/mcp-billing-gateway-sdk) 📇 ☁️ - Billing infrastructure for MCP server operators. Add Stripe subscriptions, per-call credits, tiered p
- [agenticempire/axint](https://github.com/agenticempire/axint) — [](https://glama.ai/mcp/servers/agenticempire/axint) 📇 🏠 - Apple-native execution layer for AI agents. Compiles TypeScript to validated Swift — App Intents, SwiftUI views, WidgetKit widgets, and full
- [drhalto/agentmako](https://github.com/drhalto/agentmako) — [](https://glama.ai/mcp/servers/drhalto/agentmako) 📇 🏠 🍎 🪟 🐧 - Local-first codebase intelligence engine. Gives coding agents structured context packets, indexed code/schema facts, and diagnostics over MCP
- [marin1321/mcp-devtools](https://github.com/marin1321/mcp-devtools) — [](https://glama.ai/mcp/servers/marin1321/mcp-devtools) 📇 🏠 🍎 🪟 🐧 - Production-grade MCP server for secure access to local dev environments (filesystem, databases, processes, OpenAPI). Includes
- [EtienneChollet/ontomics](https://github.com/EtienneChollet/ontomics) — [](https://glama.ai/mcp/servers/EtienneChollet/ontomics) 🦀 🏠 🍎 🐧 - Semantic code index that extracts domain concepts, naming conventions, and behavioral similarity from codebases. One tool cal
- [LWTlong/ai-dev-analytics](https://github.com/LWTlong/ai-dev-analytics) — [](https://glama.ai/mcp/servers/LWTlong/ai-dev-analytics) 📇 🏠 - An open-source observability layer for AI coding. Silently tracks dev tokens/time and auto-codifies AI deviations into persistent project rules
- [3KniGHtcZ/codebeamer-mcp](https://github.com/3KniGHtcZ/codebeamer-mcp) — [](https://glama.ai/mcp/servers/3KniGHtcZ/codebeamer-mcp) 📇 ☁️ 🍎 🪟 🐧 - Codebeamer ALM integration for managing work items, trackers, and projects. Provides 17 tools for reading and writing items, asso
- [21st-dev/Magic-MCP](https://github.com/21st-dev/magic-mcp) — Create crafted UI components inspired by the best 21st.dev design engineers
- [runyourempire/4DA](https://github.com/runyourempire/4DA/tree/main/mcp-4da-server) — [](https://glama.ai/mcp/servers/runyourempire/4DA) 📇 🏠 🍎 🪟 🐧 - Dependency intelligence for AI coding agents. Live CVE scanning, dependency health, upgrade planning, ecosystem news, and decision memory. 14
- [mvtandas/wp-cli-mcp](https://github.com/mvtandas/wp-cli-mcp) — [](https://glama.ai/mcp/servers/mvtandas/wp-cli-mcp) 📇 🏠 - Full WordPress management via WP-CLI with 30+ tools for themes, plugins, posts, menus, users, database, scaffolding, and cache. Works locally
- [a-25/ios-mcp-code-quality-server](https://github.com/a-25/ios-mcp-code-quality-server) — 📇 🏠 🍎 - iOS code quality analysis and test automation server. Provides comprehensive Xcode test execution, SwiftLint integration, and detailed failure analysis. Operates in both CLI and MCP server modes for direct developer usage and AI assistant integration
- [raye-deng/open-code-review](https://github.com/raye-deng/open-code-review) — [](https://glama.ai/mcp/servers/raye-deng/open-code-review) 🏠 📇 ☁️ - AI code quality gate detecting hallucinated packages, phantom dependencies, stale APIs, and AI-specific code defects. MCP Server + CL
- [AaronVick/ECHO_RIFT_MCP](https://github.com/AaronVick/ECHO_RIFT_MCP) — 📇 ☁️ - MCP server for EchoRift infrastructure primitives (BlockWire, CronSynth, Switchboard, Arbiter). Makes EchoRift's agent infrastructure callable as MCP tools so any MCP client can treat EchoRift like a native capability layer
- [AgiMaulana/HuaweiAppGalleryMcp](https://github.com/AgiMaulana/HuaweiAppGalleryMcp) — [](https://glama.ai/mcp/servers/AgiMaulana/HuaweiAppGalleryMcp) 🐍 ☁️ 🍎 🪟 🐧 - Huawei AppGallery Connect publishing: upload APK/AAB, update metadata and localizations, submit for r
- [aparajithn/agent-utils-mcp](https://github.com/aparajithn/agent-utils-mcp) — [](https://glama.ai/mcp/servers/@aparajithn/agent-utils-mcp) 🐍 ☁️ - Swiss-army-knife utility server for AI agents. 18 tools including JSON validation, base64, hashing, UUID generation, regex testi
- [AI-by-design/primitiv](https://github.com/AI-by-design/primitiv) — [](https://glama.ai/mcp/servers/AI-by-design/primitiv) 📇 🏠 🍎 🪟 🐧 - Design contract layer for your codebase. Scans Figma, code, Storybook, and token files, reconciles conflicts, and serves a single machine-read
- [aashari/mcp-server-atlassian-bitbucket](https://github.com/aashari/mcp-server-atlassian-bitbucket) — 📇 ☁️ - Atlassian Bitbucket Cloud integration. Enables AI systems to interact with repositories, pull requests, workspaces, and code in real time
- [aashari/mcp-server-atlassian-confluence](https://github.com/aashari/mcp-server-atlassian-confluence) — 📇 ☁️ - Atlassian Confluence Cloud integration. Enables AI systems to interact with Confluence spaces, pages, and content with automatic ADF to Markdown conversion
- [aashari/mcp-server-atlassian-jira](https://github.com/aashari/mcp-server-atlassian-jira) — 📇 ☁️ - Atlassian Jira Cloud integration. Enables AI systems to interact with Jira projects, issues, comments, and related development information in real time
- [GeiserX/atlassian-browser-mcp](https://github.com/GeiserX/atlassian-browser-mcp) — [](https://glama.ai/mcp/servers/GeiserX/atlassian-browser-mcp) 🐍 ☁️ - Browser-backed MCP wrapper for mcp-atlassian with Playwright SSO auth. Enables AI tools to access Atlassian Se
- [abrinsmead/mindpilot-mcp](https://github.com/abrinsmead/mindpilot-mcp) — 📇 🏠 - Visualizes code, architecture and other concepts as mermaid diagrams in a locally hosted web app. Just ask your agent to "show me this in a diagram"
- [admica/FileScopeMCP](https://github.com/admica/FileScopeMCP) — 🐍 📇 🦀 - Analyzes your codebase identifying important files based on dependency relationships. Generates diagrams and importance scores, helping AI assistants understand the codebase
- [mikusnuz/app-publish-mcp](https://github.com/mikusnuz/app-publish-mcp) — [](https://glama.ai/mcp/servers/mikusnuz/app-publish-mcp) 📇 ☁️ - Unified MCP server for App Store Connect & Google Play Console — 91 tools for iOS/Android app management, TestFlight, builds,
- [mikusnuz/cws-mcp](https://github.com/mikusnuz/cws-mcp) — [](https://glama.ai/mcp/servers/mikusnuz/cws-mcp) 📇 ☁️ - MCP server for Chrome Web Store extension management — 8 tools for upload, publish, status, staged rollout, and metadata updates
- [mikusnuz/npm-mcp](https://github.com/mikusnuz/npm-mcp) — [](https://glama.ai/mcp/servers/mikusnuz/npm-mcp) 📇 🏠 - MCP server for npm package management — 36 tools for publish, version, search, audit, install, and more from your AI assistant
- [Wopee-io/wopee-mcp](https://github.com/Wopee-io/wopee-mcp) — [](https://glama.ai/mcp/servers/Wopee-io/wopee-mcp) 📇 ☁️ - Autonomous testing for web apps — dispatch AI agents that open real browsers, execute test cases, and report pass/fail with screenshots. Genera
- [wooxogh/adr-mcp-setup](https://github.com/wooxogh/adr-mcp-setup) — [](https://glama.ai/mcp/servers/wooxogh/adr-mcp-setup) 📇 🏠 - Automatically generates Architecture Decision Records (ADRs) from Claude Code conversations using Claude Opus. Features AI quality revi
- [agent-hanju/char-index-mcp](https://github.com/agent-hanju/char-index-mcp) — 🐍 🏠 ☁️ 🍎 🪟 🐧 - Precise character-level string indexing for LLMs. Provides tools for finding, extracting, and manipulating text by exact character position to solve position-based operations
- [CSCSoftware/AiDex](https://github.com/CSCSoftware/AiDex) — 📇 🏠 🍎 🪟 🐧 - Persistent code index MCP server using Tree-sitter for fast, precise code search. Replaces grep with ~50 token responses instead of 2000+. Supports 11 languages including C#, TypeScript, Python, Rust, and Go
- [aidemd-mcp/server](https://github.com/aidemd-mcp/server) — [](https://glama.ai/mcp/servers/aidemd-mcp/server) 📇 🏠 - Structured `.aide` spec files that give AI agents progressive disclosure into your codebase architecture via MCP
- [Elmoaid/TempoGraph](https://github.com/Elmoaid/TempoGraph) — [](https://glama.ai/mcp/servers/Elmoaid/TempoGraph) 🐍 🏠 🍎 🪟 🐧 - Code graph context engine with 24 MCP tools for structural code intelligence. Tree-sitter parsing for 170+ languages, dependency graphs, blast rad
- [ellmos-ai/ellmos-codecommander-mcp](https://github.com/ellmos-ai/ellmos-codecommander-mcp) — [](https://glama.ai/mcp/servers/ellmos-ai/ellmos-codecommander-mcp) 📇 🏠 🍎 🪟 🐧 - Developer-focused MCP server for code analysis, JSON repair, encoding fixes, and import or
- [ethbak/icon-composer-mcp](https://github.com/ethbak/icon-composer-mcp) — [](https://glama.ai/mcp/servers/ethbak/icon-composer-mcp) 📇 🏠 🍎 - MCP server for Apple's Icon Composer: programmatically create .icon bundles with Liquid Glass effects (iOS 26+). 12 tools fo
- [akramIOT/MCP_AI_SOC_Sher](https://github.com/akramIOT/MCP_AI_SOC_Sher) — 🐍 ☁️ 📇 - MCP Server to do dynamic AI SOC Security Threat analysis for a Text2SQL AI Agent
- [aktsmm/skill-ninja-mcp-server](https://github.com/aktsmm/skill-ninja-mcp-server) — 📇 🏠 🍎 🪟 🐧 - Agent Skill Ninja for MCP: Search, install, and manage AI agent skills (SKILL.md files) from GitHub repositories. Features workspace analysis for personalized recommendations and supports 140+ pre-indexed skills
- [alimo7amed93/webhook-tester-mcp](https://github.com/alimo7amed93/webhook-tester-mcp) — 🐍 ☁️ – A FastMCP-based server for interacting with webhook-test.com. Enables users to create, retrieve, and delete webhooks locally using Claude
- [ambar/simctl-mcp](https://github.com/ambar/simctl-mcp) — 📇 🏠 🍎 A MCP server implementation for iOS Simulator control
- [andrewschreiber/desktopinsights-mcp](https://github.com/andrewschreiber/desktopinsights-mcp) — [](https://glama.ai/mcp/servers/andrewschreiber/desktopinsights-mcp) 📇 ☁️ 🍎 🪟 🐧 - Look up SDKs, frameworks, and dependencies used by 12,000+ macOS and Windows desktop a
- [api7/apisix-mcp](https://github.com/api7/apisix-mcp) — 🎖️ 📇 🏠 MCP Server that support for querying and managing all resource in [Apache APISIX](https://github.com/apache/apisix)

#### ☁️ Облачные платформы

- [4everland/4everland-hosting-mcp](https://github.com/4everland/4everland-hosting-mcp) — 🎖️ 📇 🏠 🍎 🐧 - An MCP server implementation for 4EVERLAND Hosting enabling instant deployment of AI-generated code to decentralized storage networks like Greenfield, IPFS, and Arweave
- [aashari/mcp-server-aws-sso](https://github.com/aashari/mcp-server-aws-sso) — 📇 ☁️ 🏠 - AWS Single Sign-On (SSO) integration enabling AI systems to securely interact with AWS resources by initiating SSO login, listing accounts/roles, and executing AWS CLI commands using temporary credentials
- [alexbakers/mcp-ipfs](https://github.com/alexbakers/mcp-ipfs) — 📇 ☁️ - upload and manipulation of IPFS storage
- [aparajithn/agent-deploy-dashboard-mcp](https://github.com/aparajithn/agent-deploy-dashboard-mcp) — [](https://glama.ai/mcp/servers/@aparajithn/agent-deploy-dashbaord) 🐍 ☁️ - Unified deployment dashboard MCP server across Vercel, Render, Railway, and Fly.io. 9 tools for deploy stat
- [arnstarn/mcp-server-spotinst](https://github.com/arnstarn/mcp-server-spotinst) — [](https://glama.ai/mcp/servers/arnstarn/mcp-server-spotinst) 🐍 ☁️ - MCP server for Spot.io (Spotinst) API with 23 tools for managing Ocean clusters, VNGs, Elastigroups, costs, right
- [antonio-mello-ai/mcp-pfsense](https://github.com/antonio-mello-ai/mcp-pfsense) — [](https://glama.ai/mcp/servers/antonio-mello-ai/mcp-pfsense) 🐍 🏠 - Manage pfSense firewalls through AI assistants — firewall rules, DHCP leases/reservations, DNS overrides, gateway monitoring, ARP t
- [antonio-mello-ai/mcp-proxmox](https://github.com/antonio-mello-ai/mcp-proxmox) — [](https://glama.ai/mcp/servers/antonio-mello-ai/mcp-proxmox) 🐍 🏠 - Manage Proxmox VE clusters through AI assistants — VMs, containers, snapshots, templates, cloud-init, firewall, and migrations. 29
- [alexei-led/aws-mcp-server](https://github.com/alexei-led/aws-mcp-server) — 🐍 ☁️ - A lightweight but powerful server that enables AI assistants to execute AWS CLI commands, use Unix pipes, and apply prompt templates for common AWS tasks in a safe Docker environment with multi-architecture support
- [alexei-led/k8s-mcp-server](https://github.com/alexei-led/k8s-mcp-server) — 🐍 - A lightweight yet robust server that empowers AI assistants to securely execute Kubernetes CLI commands (`kubectl`, `helm`, `istioctl`, and `argocd`) using Unix pipes in a safe Docker environment with multi-architecture support
- [alexpota/cloudscope-mcp](https://github.com/alexpota/cloudscope-mcp) — [](https://glama.ai/mcp/servers/alexpota/cloudscope-mcp) 📇 ☁️ - Azure cloud cost management — spending analysis, forecasts, anomaly detection, budgets, optimization recommendations, idle resou
- [aliyun/alibaba-cloud-ops-mcp-server](https://github.com/aliyun/alibaba-cloud-ops-mcp-server) — 🎖️ 🐍 ☁️ - A MCP server that enables AI assistants to operation resources on Alibaba Cloud, supporting ECS, Cloud Monitor, OOS and widely used cloud products
- [awslabs/mcp](https://github.com/awslabs/mcp) — 🎖️ ☁️ - AWS MCP servers for seamless integration with AWS services and resources
- [bright8192/esxi-mcp-server](https://github.com/bright8192/esxi-mcp-server) — 🐍 ☁️ - A VMware ESXi/vCenter management server based on MCP (Model Control Protocol), providing simple REST API interfaces for virtual machine management
- [cloudflare/mcp-server-cloudflare](https://github.com/cloudflare/mcp-server-cloudflare) — 🎖️ 📇 ☁️ - Integration with Cloudflare services including Workers, KV, R2, and D1
- [davidlandais/ovh-api-mcp](https://github.com/davidlandais/ovh-api-mcp) — [](https://glama.ai/mcp/servers/davidlandais/ovh-api-mcp) 🦀 ☁️ - Code Mode MCP server for the entire OVH API. Two tools (search + execute) give LLMs access to all OVH endpoints via sandboxed JavaScript,
- [cyclops-ui/mcp-cyclops](https://github.com/cyclops-ui/mcp-cyclops) — 🎖️ 🏎️ ☁️ - An MCP server that allows AI agents to manage Kubernetes resources through Cyclops abstraction
- [elementfm/mcp](https://gitlab.com/elementfm/mcp) — 🎖️ 🐍 📇 🏠 ☁️ - Open source podcast hosting platform
- [elevy99927/devops-mcp-webui](https://github.com/elevy99927/devops-mcp-webui) — 🐍 ☁️/🏠 - MCP Server for Kubernetes integrated with Open-WebUI, bridging the gap between DevOps and non-technical teams. Supports `kubectl` and `helm` operations through natural-language commands
- [erikhoward/adls-mcp-server](https://github.com/erikhoward/adls-mcp-server) — 🐍 ☁️/🏠 - MCP Server for Azure Data Lake Storage. It can perform manage containers, read/write/upload/download operations on container files and manage file metadata
- [espressif/esp-rainmaker-mcp](https://github.com/espressif/esp-rainmaker-mcp) — 🎖️ 🐍 🏠 ☁️ 📟 - Official Espressif MCP Server to manage and control ESP RainMaker Devices
- [flux159/mcp-server-kubernetes](https://github.com/Flux159/mcp-server-kubernetes) — 📇 ☁️/🏠 - Typescript implementation of Kubernetes cluster operations for pods, deployments, services
- [GeiserX/spinnaker-mcp](https://github.com/GeiserX/spinnaker-mcp) — [](https://glama.ai/mcp/servers/GeiserX/spinnaker-mcp) 🏎️ ☁️ - A bridge that exposes any Spinnaker instance as an MCP server via the Gate API, enabling management of applications, pipelines, execu
- [hardik-id/azure-resource-graph-mcp-server](https://github.com/hardik-id/azure-resource-graph-mcp-server) — 📇 ☁️/🏠 - A Model Context Protocol server for querying and analyzing Azure resources at scale using Azure Resource Graph, enabling AI assistants to explore and monitor Azure infrastructure
- [hashicorp/terraform-mcp-server](https://github.com/hashicorp/terraform-mcp-server) — 🎖️🏎️☁️ - The official Terraform MCP Server seamlessly integrates with the Terraform ecosystem, enabling provider discovery, module analysis, and direct Registry API integration for advanced Infrastructure as Code workflows
- [jasonwilbur/cloud-cost-mcp](https://github.com/jasonwilbur/cloud-cost-mcp) — 📇 ☁️ 🍎 🪟 🐧 - Multi-cloud pricing comparison across AWS, Azure, GCP, and OCI with 2,700+ instance types. Real-time pricing from public APIs, workload calculators, and migration savings estimator

#### 🌐 Браузерная автоматизация

- [34892002/bilibili-mcp-js](https://github.com/34892002/bilibili-mcp-js) — 📇 🏠 - A MCP server that supports searching for Bilibili content. Provides LangChain integration examples and test scripts
- [achiya-automation/safari-mcp](https://github.com/achiya-automation/safari-mcp) — [](https://glama.ai/mcp/servers/achiya-automation/safari-mcp) 📇 🏠 🍎 - Native Safari browser automation for AI agents with 80+ tools. No Chrome dependency, optimized for Apple Silicon with 60% less CPU
- [agent-infra/mcp-server-browser](https://github.com/bytedance/UI-TARS-desktop/tree/main/packages/agent-infra/mcp-servers/browser) — 📇 🏠 - Browser automation capabilities using Puppeteer, both support local and remote browser connection
- [aparajithn/agent-scraper-mcp](https://github.com/aparajithn/agent-scraper-mcp) — [](https://glama.ai/mcp/servers/@aparajithn/agent-scraper-mcp) 🐍 ☁️ - Web scraping MCP server for AI agents. 6 tools: clean content extraction, structured scraping with CSS selectors, full-pag
- [apireno/DOMShell](https://github.com/apireno/DOMShell) — [](https://glama.ai/mcp/servers/@apireno/domshell) 📇 🏠 - Browse the web using filesystem commands (ls, cd, grep, click). 38 MCP tools map Chrome's Accessibility Tree to a virtual filesystem via a Chrome Extension
- [automatalabs/mcp-server-playwright](https://github.com/Automata-Labs-team/MCP-Server-Playwright) — 🐍 - An MCP server for browser automation using Playwright
- [BB-fat/browser-use-rs](https://github.com/BB-fat/browser-use-rs) — 🦀 Lightweight browser automation MCP server in Rust with zero dependencies
- [bch1212/agentfetch-mcp](https://github.com/bch1212/agentfetch-mcp) — [](https://glama.ai/mcp/servers/bch1212/agentfetch-mcp) 🐍 ☁️ 🏠 🍎 🪟 🐧 - Token-budgeted web fetch for AI agents. Auto-routes between Trafilatura, Jina Reader, FireCrawl, and pypdf based on URL pat
- [bighippoman/intercept-mcp](https://github.com/bighippoman/intercept-mcp) — [](https://glama.ai/mcp/servers/bighippoman/intercept-mcp) 📇 🏠 - Multi-tier fallback chain for fetching web content as clean markdown. Handles tweets, YouTube, arXiv, PDFs, and regular pag
- [blackwhite084/playwright-plus-python-mcp](https://github.com/blackwhite084/playwright-plus-python-mcp) — 🐍 - An MCP python server using Playwright for browser automation,more suitable for llm
- [browserbase/mcp-server-browserbase](https://github.com/browserbase/mcp-server-browserbase) — 🎖️ 📇 - Automate browser interactions in the cloud (e.g. web navigation, data extraction, form filling, and more)
- [browsermcp/mcp](https://github.com/browsermcp/mcp) — 📇 🏠 - Automate your local Chrome browser
- [brutalzinn/simple-mcp-selenium](https://github.com/brutalzinn/simple-mcp-selenium) — 📇 🏠 - An MCP Selenium Server for controlling browsers using natural language in Cursor IDE. Perfect for testing, automation, and multi-user scenarios
- [co-browser/browser-use-mcp-server](https://github.com/co-browser/browser-use-mcp-server) — 🐍 - browser-use packaged as an MCP server with SSE transport. includes a dockerfile to run chromium in docker + a vnc server
- [Custodia-Admin/pagebolt-mcp](https://github.com/Custodia-Admin/pagebolt-mcp) — [](https://glama.ai/mcp/servers/Custodia-Admin/pagebolt-mcp) 📇 ☁️ - MCP server for screenshots, PDFs, OG images, and narrated video recording from Claude Desktop, Cursor, and Windsurf
- [eat-pray-ai/yutu](https://github.com/eat-pray-ai/yutu) — 🏎️ 🏠 🍎 🐧 🪟 - A fully functional MCP server and CLI for YouTube to automate YouTube operation
- [executeautomation/playwright-mcp-server](https://github.com/executeautomation/mcp-playwright) — 📇 - An MCP server using Playwright for browser automation and webscrapping
- [eyalzh/browser-control-mcp](https://github.com/eyalzh/browser-control-mcp) — 📇 🏠 - An MCP server paired with a browser extension that enables LLM clients to control the user's browser (Firefox)
- [fradser/mcp-server-apple-reminders](https://github.com/FradSer/mcp-server-apple-reminders) — 📇 🏠 🍎 - An MCP server for interacting with Apple Reminders on macOS
- [freema/firefox-devtools-mcp](https://github.com/freema/firefox-devtools-mcp) — 📇 🏠 - Firefox browser automation via WebDriver BiDi for testing, scraping, and browser control. Supports snapshot/UID-based interactions, network monitoring, console capture, and screenshots

#### 🔍 Поиск и извлечение данных

- [mrslbt/rippr](https://github.com/mrslbt/rippr) — [](https://glama.ai/mcp/servers/mrslbt/rippr) 📇 🏠 - YouTube transcript extraction for AI agents. Clean text, timestamps, or structured JSON from any video. No API keys required. Install via `npx rippr-mcp
- [0xdaef0f/job-searchoor](https://github.com/0xDAEF0F/job-searchoor) — 📇 🏠 - An MCP server for searching job listings with filters for date, keywords, remote work options, and more
- [hanselhansel/aeo-cli](https://github.com/hanselhansel/aeo-cli) — 🐍 🏠 - Audit URLs for AI crawler readiness — checks robots.txt, llms.txt, JSON-LD schema, and content density with 0-100 AEO scoring
- [Aas-ee/open-webSearch](https://github.com/Aas-ee/open-webSearch) — 🐍 📇 ☁️ - Web search using free multi-engine search (NO API KEYS REQUIRED) — Supports Bing, Baidu, DuckDuckGo, Brave, Exa, and CSDN
- [AceDataCloud/MCPSerp](https://github.com/AceDataCloud/SerpMCP) — [](https://glama.ai/mcp/servers/AceDataCloud/MCPSerp) 🐍 ☁️ - Google SERP search including web, images, news, maps, places, videos, and knowledge graph results via Ace Data Cloud API
- [AIMLPM/markcrawl](https://github.com/AIMLPM/markcrawl) — [](https://glama.ai/mcp/servers/AIMLPM/markcrawl) 🐍 🏠 - Crawl websites into clean Markdown, search pages, and extract structured data with LLMs. Built-in MCP server for web research and RAG pipelines
- [ac3xx/mcp-servers-kagi](https://github.com/ac3xx/mcp-servers-kagi) — 📇 ☁️ - Kagi search API integration
- [adawalli/nexus](https://github.com/adawalli/nexus) — 📇 ☁️ - AI-powered web search server using Perplexity Sonar models with source citations. Zero-install setup via NPX
- [ananddtyagi/webpage-screenshot-mcp](https://github.com/ananddtyagi/webpage-screenshot-mcp) — 📇 🏠 - A MCP server for taking screenshots of webpages to use as feedback during UI developement
- [andybrandt/mcp-simple-arxiv](https://github.com/andybrandt/mcp-simple-arxiv) — 🐍 ☁️ MCP for LLM to search and read papers from arXiv
- [andybrandt/mcp-simple-pubmed](https://github.com/andybrandt/mcp-simple-pubmed) — 🐍 ☁️ MCP to search and read medical / life sciences papers from PubMed
- [angheljf/nyt](https://github.com/angheljf/nyt) — 📇 ☁️ - Search articles using the NYTimes API
- [apify/mcp-server-rag-web-browser](https://github.com/apify/mcp-server-rag-web-browser) — 📇 ☁️ - An MCP server for Apify's open-source RAG Web Browser Actor to perform web searches, scrape URLs, and return content in Markdown
- [atlasprzetargow/mcp-server](https://github.com/atlasprzetargow/mcp-server) — [](https://glama.ai/mcp/servers/atlasprzetargow/mcp-server) 📇 ☁️ - Search 800 000+ Polish public tenders (BZP + TED). Profiles of procuring entities and contractors by NIP, market statis
- [Khamel83/argus](https://github.com/Khamel83/argus) — [](https://glama.ai/mcp/servers/Khamel83/argus) 🐍 🏠 - Multi-provider search broker with automatic fallback, RRF ranking, content extraction, and budget enforcement
- [idapixl/idapixl-web-research-mcp](https://github.com/idapixl/idapixl-web-research-mcp) — [](https://glama.ai/mcp/servers/idapixl-web-research-mcp) 📇 ☁️ - Pay-per-use web research for AI agents on Apify. Search (Brave + DuckDuckGo), fetch pages to clean markdown, and multi-step r
- [Bigsy/Clojars-MCP-Server](https://github.com/Bigsy/Clojars-MCP-Server) — 📇 ☁️ - Clojars MCP Server for upto date dependency information of Clojure libraries
- [blazickjp/arxiv-mcp-server](https://github.com/blazickjp/arxiv-mcp-server) — ☁️ 🐍 - Search ArXiv research papers
- [boikot-xyz/boikot](https://github.com/boikot-xyz/boikot) — 🦀☁️ - Model Context Protocol Server for looking up company ethics information. Learn about the ethical and unethical actions of major companies
- [brave/brave-search-mcp-server](https://github.com/brave/brave-search-mcp-server) — 📇 ☁️ - Web search capabilities using Brave's Search API
- [cameronrye/activitypub-mcp](https://github.com/cameronrye/activitypub-mcp) — 📇 🏠 🐧 🍎 🪟 - A comprehensive MCP server that enables LLMs to explore and interact with the Fediverse through ActivityPub protocol. Features WebFinger discovery, timeline fetching, instance exploration, and cross-platform support for Mastodon, Pleroma, Misskey, and other ActivityPub servers
- [cameronrye/gopher-mcp](https://github.com/cameronrye/gopher-mcp) — 🐍 🏠 - Modern, cross-platform MCP server enabling AI assistants to browse and interact with both Gopher protocol and Gemini protocol resources safely and efficiently. Features dual protocol support, TLS security, and structured content extraction
- [cevatkerim/unsplash-mcp](https://github.com/cevatkerim/unsplash-mcp) — 🐍 ☁️ - Unsplash photo search with proper attribution. Returns ready-to-use attribution text and HTML for each photo, making it easy for LLMs to build content pages with properly credited images. Includes search, random photos, and download tracking
- [chanmeng/google-news-mcp-server](https://github.com/ChanMeng666/server-google-news) — 📇 ☁️ - Google News integration with automatic topic categorization, multi-language support, and comprehensive search capabilities including headlines, stories, and related topics through [SerpAPI](https://serpapi.com/)
- [chasesaurabh/mcp-page-capture](https://github.com/chasesaurabh/mcp-page-capture) — 📇 🏠 - MCP server that captures webpage screenshots, with viewport or full-page options and base64 PNG output

#### 💬 Коммуникации (Slack, Discord, email)

- [AbdelStark/nostr-mcp](https://github.com/AbdelStark/nostr-mcp) — ☁️ - A Nostr MCP server that allows to interact with Nostr, enabling posting notes, and more
- [adhikasp/mcp-twikit](https://github.com/adhikasp/mcp-twikit) — 🐍 ☁️ - Interact with Twitter search and timeline
- [agentmail-toolkit/mcp](https://github.com/agentmail-to/agentmail-toolkit/tree/main/mcp) — 🐍 💬 - An MCP server to create inboxes on the fly to send, receive, and take actions on email. We aren't AI agents for email, but email for AI Agents
- [bababoi-bibilabu/agent-mq](https://github.com/bababoi-bibilabu/agent-mq) — [](https://glama.ai/mcp/servers/bababoi-bibilabu/agent-mq) 📇 ☁️ 🏠 - Message queue for AI coding assistants. Let AI agents (Claude Code, Cursor, Codex) send messages to each other across sessions and machin
- [Beltran12138/wecom-docs-mcp-server](https://github.com/Beltran12138/wecom-docs-mcp-server) — [](https://glama.ai/mcp/servers/Beltran12138/wecom-docs-mcp-server) 🐍 🏠 🪟 🐧 - WeCom (Enterprise WeChat) document operations via MCP: create, read, and edit Docs and Smart
- [areweai/tsgram-mcp](https://github.com/areweai/tsgram-mcp) — TSgram: Telegram + Claude with local workspace access on your phone in typescript. Read, write, and vibe code on the go!
- [arpitbatra123/mcp-googletasks](https://github.com/arpitbatra123/mcp-googletasks) — 📇 ☁️ - An MCP server to interface with the Google Tasks API
- [Cactusinhand/mcp_server_notify](https://github.com/Cactusinhand/mcp_server_notify) — 🐍 🏠 - A MCP server that send desktop notifications with sound effect when agent tasks are completed
- [carterlasalle/mac_messages_mcp](https://github.com/carterlasalle/mac_messages_mcp) — 🏠 🍎 🚀 - An MCP server that securely interfaces with your iMessage database via the Model Context Protocol (MCP), allowing LLMs to query and analyze iMessage conversations. It includes robust phone number validation, attachment processing, contact management, group chat handling, and full support for
- [chaindead/telegram-mcp](https://github.com/chaindead/telegram-mcp) — 🏎️ 🏠 - Telegram API integration for accessing user data, managing dialogs (chats, channels, groups), retrieving messages, and handling read status
- [chigwell/telegram-mcp](https://github.com/chigwell/telegram-mcp) — 🐍 🏠 - Telegram API integration for accessing user data, managing dialogs (chats, channels, groups), retrieving messages, sending messages and handling read status
- [clawaimail/mcp](https://github.com/joansongjr/clawaimail) — [](https://glama.ai/mcp/servers/joansongjr/clawaimail) 📇 ☁️ 🍎 🪟 🐧 - Email infrastructure for AI agents. Create inboxes on the fly, send and receive real emails, search messages, and manage threads
- [codefuturist/email-mcp](https://github.com/codefuturist/email-mcp) — 📇 ☁️ 🍎 🪟 🐧 - IMAP/SMTP email MCP server with 42 tools for reading, searching, sending, scheduling, and managing emails across multiple accounts. Supports IMAP IDLE push, AI triage, desktop notifications, and auto-detects providers like Gmail, Outlook, and iCloud
- [conarti/mattermost-mcp](https://github.com/conarti/mattermost-mcp) — 📇 ☁️ - MCP server for Mattermost API. List channels, read/post messages, manage threads and reactions, monitor topics. Supports flexible configuration via CLI args, environment variables, or config files
- [Danielpeter-99/calcom-mcp](https://github.com/Danielpeter-99/calcom-mcp) — 🐍 🏠 - MCP server for Calcom. Manage event types, create bookings, and access Cal.com scheduling data through LLMs
- [discourse/discourse-mcp](https://github.com/discourse/discourse-mcp) — 🎖️ 💎 ☁️ 🏠 💬 🍎 🪟 🐧 - Official Discourse MCP server for forum integration. Search topics, read posts, manage categories and tags, discover users, and interact with Discourse communities
- [cseguinlz/doubletick-cli](https://github.com/cseguinlz/doubletick-cli) — [](https://glama.ai/mcp/servers/cseguinlz/double-tick-mcp-server) 📇 ☁️ - Email read tracking via Gmail. Send tracked emails, check if they were opened with open count, device, and timi
- [elie222/inbox-zero](https://github.com/elie222/inbox-zero/tree/main/apps/mcp-server) — 🐍 ☁️ - An MCP server for Inbox Zero. Adds functionality on top of Gmail like finding out which emails you need to reply to or need to follow up on
- [ExpertVagabond/solmail-mcp](https://github.com/ExpertVagabond/solmail-mcp) — [](https://glama.ai/mcp/servers/ExpertVagabond/solmail-mcp) 📇 ☁️ - Send physical mail with Solana payments — AI agents can compose, price, and send letters and postcards via cryptocurren
- [FastAlertNow/mcp-server](https://github.com/FastAlertNow/mcp-server) — 🎖️ 📇 ☁️ - Official Model Context Protocol (MCP) server for FastAlert. This server allows AI agents (like Claude, ChatGPT, and Cursor) to list of your channels and send notifications directly through the FastAlert API
- [FantomaSkaRus1/telegram-bot-mcp](https://github.com/FantomaSkaRus1/telegram-bot-mcp) — [](https://glama.ai/mcp/servers/@FantomaSkaRus1/telegram-bot-mcp) 📇 ☁️ 🏠 - Full-featured Telegram Bot API MCP server with 174 tools covering the entire Bot API
- [gerkensm/callcenter.js-mcp](https://github.com/gerkensm/callcenter.js-mcp) — 📇 ☁️ - An MCP server to make phone calls using VoIP/SIP and OpenAI's Realtime API and observe the transcript
- [GeiserX/telegram-archive-mcp](https://github.com/GeiserX/telegram-archive-mcp) — [](https://glama.ai/mcp/servers/GeiserX/telegram-archive-mcp) 🏎️ ☁️ 🍎 🪟 🐧 - Go-based MCP server for Telegram Archive. Search and browse Telegram chat history, list chats, and retriev
- [gitmotion/ntfy-me-mcp](https://github.com/gitmotion/ntfy-me-mcp) — 📇 ☁️ 🏠 - An ntfy MCP server for sending/fetching ntfy notifications to your self-hosted ntfy server from AI Agents 📤 (supports secure token auth & more - use with npx or docker!)
- [gotoolkits/wecombot](https://github.com/gotoolkits/mcp-wecombot-server.git) — 🚀 ☁️ - An MCP server application that sends various types of messages to the WeCom group robot

#### 📊 Мониторинг и observability

- [alilxxey/openobserve-community-mcp](https://github.com/alilxxey/openobserve-community-mcp) — [](https://glama.ai/mcp/servers/alilxxey/openobserve-community-mcp) 🐍 🏠 🍎 🪟 🐧 - Read-only MCP server for OpenObserve Community Edition via REST API. Search logs, traces,
- [Alog/alog-mcp](https://github.com/saikiyusuke/alog-mcp) — 📇 ☁️ - AI agent activity logger & monitor MCP server with 20 tools. Post logs, create articles, manage social interactions, and monitor AI agent activities on the Alog platform
- [avivsinai/langfuse-mcp](https://github.com/avivsinai/langfuse-mcp) — 🐍 ☁️ - Query Langfuse traces, debug exceptions, analyze sessions, and manage prompts. Full observability toolkit for LLM applications
- [alimuratkuslu/byok-observability-mcp](https://github.com/alimuratkuslu/byok-observability-mcp) — [](https://github.com/alimuratkuslu/byok-observability-mcp) 📇 🏠 ☁️ 🍎 🪟 🐧 - Comprehensive MCP server for Grafana, Prometheus, Kafka UI, and Datadog with a secure "Brin
- [clamp-sh/mcp](https://github.com/clamp-sh/mcp) — [](https://glama.ai/mcp/servers/clamp-sh/mcp) 📇 ☁️ 🍎 🪟 🐧 - AI-native web analytics. Query pageviews, top pages, referrers, countries, devices, and custom events. Create conversion funnels and alerts
- [dragogargo/mcp-sysmon](https://github.com/dragogargo/mcp-sysmon) — [](https://glama.ai/mcp/servers/dragogargo/mcp-sysmon) 🐍 🏠 🍎 🐧 - Local system monitoring — CPU, memory, swap, disk, network, and process management. Find resource-hungry processes, diagnose perfor
- [dynatrace-oss/dynatrace-mcp](https://github.com/dynatrace-oss/dynatrace-mcp) — 🎖️ 📇 ☁️ 🍎 🪟 🐧 - Leverage AI-driven observability, security, and automation to analyze anomalies, logs, traces, events, metrics
- [edgedelta/edgedelta-mcp-server](https://github.com/edgedelta/edgedelta-mcp-server) — 🎖️ 🏎️ ☁️ – Interact with Edge Delta anomalies, query logs / patterns / events, and pinpoint root causes and optimize your pipelines
- [ejcho623/agent-breadcrumbs](https://github.com/ejcho623/agent-breadcrumbs) — 📇 ☁️ 🏠 - Unified agent work logging and observability across ChatGPT, Claude, Cursor, Codex, and OpenClaw with config-first schemas and pluggable sinks
- [getsentry/sentry-mcp](https://github.com/getsentry/sentry-mcp) — 🐍 ☁️ - Sentry.io integration for error tracking and performance monitoring
- [GeiserX/duplicacy-mcp](https://github.com/GeiserX/duplicacy-mcp) — [](https://glama.ai/mcp/servers/GeiserX/duplicacy-mcp) 🏎️ ☁️ 🍎 🪟 🐧 - Go-based MCP server for Duplicacy backup monitoring. Query backup job status and Prometheus metrics from a Duplicacy exporter.
- [GeiserX/genieacs-mcp](https://github.com/GeiserX/genieacs-mcp) — [](https://glama.ai/mcp/servers/GeiserX/genieacs-mcp) 🏎️ ☁️ 🍎 🪟 🐧 - Go-based MCP server that bridges any GenieACS (TR-069 ACS) instance, exposing device data, firmware management, and CPE actions (r
- [gjenkins20/unofficial-fortimonitor-mcp-server](https://github.com/gjenkins20/unofficial-fortimonitor-mcp-server) — [](https://glama.ai/mcp/servers/@gjenkins20/unofficial-forti-monitor-mcp-server) 🐍 ☁️ 🍎 🪟 🐧 - Unofficial FortiMonitor v2 API integration with 241 tools for
- [gjenkins20/webmin-mcp-server](https://github.com/gjenkins20/webmin-mcp-server) — [](https://glama.ai/mcp/servers/@gjenkins20/webmin-mcp-server) 🐍 ☁️ 🍎 🐧 - MCP server for Webmin with 61 tools for Linux system administration: services, users, storage, security, databases, an
- [grafana/mcp-grafana](https://github.com/grafana/mcp-grafana) — 🎖️ 🐍 🏠 ☁️ - Search dashboards, investigate incidents and query datasources in your Grafana instance
- [hyperb1iss/lucidity-mcp](https://github.com/hyperb1iss/lucidity-mcp) — 🐍 🏠 - Enhance AI-generated code quality through intelligent, prompt-based analysis across 10 critical dimensions from complexity to security vulnerabilities
- [iris-eval/mcp-server](https://github.com/iris-eval/mcp-server) — [](https://glama.ai/mcp/servers/iris-eval/mcp-server) 📇 ☁️ 🏠 🍎 🪟 🐧 - MCP-native agent evaluation and observability server with trace logging, output quality evaluation, cost tracking, 12 built-in ev
- [imprvhub/mcp-status-observer](https://github.com/imprvhub/mcp-status-observer) — 📇 ☁️ - Model Context Protocol server for monitoring Operational Status of major digital platforms in Claude Desktop
- [ingero-io/ingero](https://github.com/ingero-io/ingero) — [](https://glama.ai/mcp/servers/ingero-io/ingero) 🏎️ 🏠 🐧 - eBPF-based GPU causal observability agent with MCP server. Traces CUDA Runtime/Driver APIs and host kernel events to build causal chains explaining
- [inspektor-gadget/ig-mcp-server](https://github.com/inspektor-gadget/ig-mcp-server) — 🏎️ ☁️ 🏠 🐧 🪟 🍎 - Debug your Container and Kubernetes workloads with an AI interface powered by eBPF
- [inventer-dev/mcp-internet-speed-test](https://github.com/inventer-dev/mcp-internet-speed-test) — 🐍 ☁️ - Internet speed testing with network performance metrics including download/upload speed, latency, jitter analysis, and CDN server detection with geographic mapping
- [last9/last9-mcp-server](https://github.com/last9/last9-mcp-server) — Seamlessly bring real-time production context—logs, metrics, and traces—into your local environment to auto-fix code faster
- [lodordev/mcp-tautulli](https://github.com/lodordev/mcp-tautulli) — [](https://glama.ai/mcp/servers/lodordev/mcp-tautulli) 🐍 🏠 - Tautulli (Plex media server monitoring) with 11 read-only tools for activity, history, library stats, user stats, transcode analysis, and resolu
- [log-logn/langfuse-mcp-java](https://github.com/Log-LogN/langfuse-mcp-java) — [](https://glama.ai/mcp/servers/Log-LogN/langfuse-mcp-java) ☕ ☁️ - Query Langfuse traces, debug exceptions, analyze sessions, scores, datasets, schema, observations and manage prompts. Full obser
- [mikusnuz/umami-mcp](https://github.com/mikusnuz/umami-mcp) — [](https://glama.ai/mcp/servers/mikusnuz/umami-mcp) 📇 ☁️ - Full-coverage MCP server for Umami Analytics API v2 — 66 tools for websites, stats, sessions, events, reports, users, teams, and realtime monit

#### 🔒 Безопасность

- [alexfleetcommander/agent-trust-stack-mcp](https://github.com/alexfleetcommander/agent-trust-stack-mcp) — [](https://glama.ai/mcp/servers/alexfleetcommander/agent-trust-stack-mcp) 🐍 📇 ☁️ 🏠 🍎 🪟 🐧 - Cryptographic provenance, bilateral blind reputation scoring, and tamper-evident loggi
- [123Ergo/unphurl-mcp](https://github.com/123Ergo/unphurl-mcp) — [](https://glama.ai/mcp/servers/123Ergo/unphurl-mcp) 📇 ☁️ - URL intelligence for AI agents. 13 tools for security signals and data quality: redirect behaviour, brand impersonation detection, domain age, SSL v
- [13bm/GhidraMCP](https://github.com/13bm/GhidraMCP) — 🐍 ☕ 🏠 - MCP server for integrating Ghidra with AI assistants. This plugin enables binary analysis, providing tools for function inspection, decompilation, memory exploration, and import/export analysis via the Model Context Protocol
- [82ch/MCP-Dandan](https://github.com/82ch/MCP-Dandan) — 🐍 📇 🏠 🍎 🪟 🐧 - Real-time security framework for MCP servers that detects and blocks malicious AI agent behavior by analyzing tool call patterns and intent across multiple threat detection engines
- [MARUCIE/authbox](https://github.com/MARUCIE/authbox) — [](https://glama.ai/mcp/servers/MARUCIE/authbox) 📇 🏎️ 🏠 🍎 🪟 🐧 - Zero-knowledge password manager with MCP credential gateway. BIP-39 seed phrase recovery, deterministic passwords, policy-gated AI agent access (scope,
- [Acacian/aegis](https://github.com/Acacian/aegis) — [](https://glama.ai/mcp/servers/Acacian/aegis) 🐍 🏠 🍎 🪟 🐧 - Policy-based governance for AI agent tool calls. YAML policies, approval gates, risk assessment, and audit logging. Cross-platform: LangChain, OpenAI, Anthropic,
- [adeptus-innovatio/solvitor-mcp](https://github.com/Adeptus-Innovatio/solvitor-mcp) — 🦀 🏠 - Solvitor MCP server provides tools to access reverse engineering tools that help developers extract IDL files from closed-source Solana smart contracts and decompile them
- [KOVY/agentforge-trust-mcp](https://github.com/KOVY/agentforge-trust-mcp) — [](https://glama.ai/mcp/servers/KOVY/agentforge-trust-mcp) 📇 ☁️ - Query the AgentForge Trust Score (0-100 across five dimensions: security, code health, behavioral audit, community trust, EU co
- [agentgraph-co/agentgraph](https://github.com/agentgraph-co/agentgraph) — [](https://glama.ai/mcp/servers/agentgraph-co/agentgraph) 🐍 ☁️ 🍎 🪟 🐧 - Trust verification and security scanning for AI agents. Checks security posture of third-party MCP servers and tools wi
- [arian-gogani/nobulex](https://github.com/arian-gogani/nobulex) — [](https://glama.ai/mcp/servers/arian-gogani/nobulex) 📇 🏠 🍎 🪟 🐧 - Proof-of-behavior enforcement for AI agents. Define behavioral covenant rules (permit/forbid/require), enforce at runtime before execu
- [agentward-ai/agentward](https://github.com/agentward-ai/agentward) — [](https://glama.ai/mcp/servers/agentward-ai/agent-ward) 🐍 🏠 🍎 🪟 🐧 - Permission control plane for AI agents. MCP proxy that enforces least-privilege YAML policies on every tool call, classifies sensitive d
- [agntor/mcp](https://github.com/agntor/mcp) — 📇 ☁️ 🍎 🪟 🐧 - MCP audit server for agent discovery and certification. Provides trust and payment rail for AI agents including identity verification, escrow, settlement, and reputation management
- [vinaybhosle/agentstamp](https://github.com/vinaybhosle/agentstamp) — [](https://glama.ai/mcp/servers/vinaybhosle/agentstamp) 📇 ☁️ - Trust intelligence for AI agents — identity stamps, reputation scoring (0-100), registry, forensic audit trails, and A2A passports
- [jimmyracheta/AI-Runtime-Guard](https://github.com/runtimeguard/runtime-guard) — [](https://glama.ai/mcp/servers/runtimeguard/runtime-guard)🐍 🏠🍎 🪟 - Runtime policy enforcement for AI agents - prevents accidental damage to your systems, unauthorized agent access and automates back
- [airblackbox/air-blackbox-mcp](https://github.com/airblackbox/air-blackbox-mcp) — [](https://glama.ai/mcp/servers/@airblackbox/air-blackbox-mcp) 🐍 🏠 🍎 🪟 🐧 - EU AI Act compliance scanner for Python AI agents. Scans, analyzes, and remediates LangChain/CrewAI/AutoGen/OpenAI cod
- [AIM-Intelligence/AIM-Guard-MCP](https://github.com/AIM-Intelligence/AIM-MCP) — 📇 🏠 🍎 🪟 🐧 - Security-focused MCP server that provides safety guidelines and content analysis for AI agents
- [alberthild/shieldapi-mcp](https://github.com/alberthild/shieldapi-mcp) — [](https://glama.ai/mcp/servers/@alberthild/shield-api-mcp) 📇 ☁️ 🍎 🪟 🐧 - Security intelligence for AI agents: password breach checks (900M+ HIBP hashes), email/domain/IP/URL reputation, prompt injec
- [jagmarques/asqav-mcp](https://github.com/jagmarques/asqav-mcp) — [](https://glama.ai/mcp/servers/jagmarques/asqav-mcp) 🐍 🏠 🍎 🪟 🐧 - AI agent governance MCP server with policy enforcement, quantum-safe audit trails (ML-DSA), multi-party authorization, and compliance reporting
- [imran-siddique/agentos-mcp-server](https://github.com/imran-siddique/agent-os/tree/master/extensions/mcp-server) — [](https://glama.ai/mcp/servers/@imran-siddique/agentos-mcp-server) - Agent OS MCP server for AI agent governance with policy enforcement, code safety verification, multi-model hallucina
- [kastelldev/kastell](https://github.com/kastelldev/kastell) — [](https://glama.ai/mcp/servers/kastelldev/kastell) 📇 ☁️ 🏠 🍎 🪟 🐧 - Server security auditing and hardening toolkit. 413 security checks across 29 categories (SSH, Firewall, Docker, TLS, HTTP Headers), CI
- [ark-forge/arkforge-mcp](https://github.com/ark-forge/arkforge-mcp) — [](https://glama.ai/mcp/servers/ze6ad36390) 🐍 ☁️ 🍎 🪟 🐧 - Third-party certifying proxy — sign any HTTP call (AI agents, webhooks, microservices) with an independent Ed25519 signature, RFC 3161 timestamp, and Sigstore Re
- [atomicchonk/roadrecon_mcp_server](https://github.com/atomicchonk/roadrecon_mcp_server) — 🐍 🪟 🏠 MCP server for analyzing ROADrecon gather results from Azure tenant enumeration
- [behrensd/mcp-firewall](https://github.com/behrensd/mcp-firewall) — 📇 🏠 🍎 🪟 🐧 - Deterministic security proxy (iptables for MCP) that intercepts tool calls, enforces YAML policies, scans for secret leakage, and logs everything. No AI, no cloud
- [BurtTheCoder/mcp-dnstwist](https://github.com/BurtTheCoder/mcp-dnstwist) — 📇 🪟 ☁️ - MCP server for dnstwist, a powerful DNS fuzzing tool that helps detect typosquatting, phishing, and corporate espionage
- [BurtTheCoder/mcp-maigret](https://github.com/BurtTheCoder/mcp-maigret) — 📇 🪟 ☁️ - MCP server for maigret, a powerful OSINT tool that collects user account information from various public sources. This server provides tools for searching usernames across social networks and analyzing URLs
- [BurtTheCoder/mcp-shodan](https://github.com/BurtTheCoder/mcp-shodan) — 📇 🪟 ☁️ - MCP server for querying the Shodan API and Shodan CVEDB. This server provides tools for IP lookups, device searches, DNS lookups, vulnerability queries, CPE lookups, and more
- [BurtTheCoder/mcp-virustotal](https://github.com/BurtTheCoder/mcp-virustotal) — 📇 🪟 ☁️ - MCP server for querying the VirusTotal API. This server provides tools for scanning URLs, analyzing file hashes, and retrieving IP address reports
- [chrbailey/promptspeak-mcp-server](https://github.com/chrbailey/promptspeak-mcp-server) — [](https://glama.ai/mcp/servers/chrbailey/promptspeak-mcp-server) 📇 🏠 🍎 🪟 🐧 - Pre-execution governance for AI agents. Intercepts and validates every agent tool call through an 8-stage
- [bx33661/Wireshark-MCP](https://github.com/bx33661/Wireshark-MCP) — [](https://glama.ai/mcp/servers/bx33661/Wireshark-MCP) 🐍 🏠 - Wireshark network packet analysis MCP Server with capture, protocol stats, field extraction, and security analysis capabilities
- [Chimera-Protocol/csl-core](https://github.com/Chimera-Protocol/csl-core) — 🐍 🏠 🍎 🪟 🐧 - Deterministic AI safety policy engine with Z3 formal verification. Write, verify, and enforce machine-verifiable constraints for AI agents via MCP

#### 🧠 Знания и память

- [aidesignblueprint/integrations](https://github.com/aidesignblueprint/integrations) — [](https://glama.ai/mcp/servers/aidesignblueprint/integrations) 🐍 ☁️ - Read-only doctrine access for the Agentic AI Blueprint — the industry standard reference for safe, observab
- [andreas-roennestad/openhive-mcp](https://github.com/andreas-roennestad/openhive-mcp) — [](https://glama.ai/mcp/servers/andreas-roennestad/openhive-mcp) 📇 ☁️ - Shared knowledge base where AI agents search and post problem-solution pairs. Agents query before solving, post after resol
- [Auctalis/nocturnusai](https://github.com/Auctalis/nocturnusai) — [](https://glama.ai/mcp/servers/Auctalis/nocturnusai) 🐍 🏠 - Deterministic reasoning engine for AI agent context compression. Extracts structured facts with logical inference, proof chains, and truth
- [0xshellming/mcp-summarizer](https://github.com/0xshellming/mcp-summarizer) — 📕 ☁️ - AI Summarization MCP Server, Support for multiple content types: Plain text, Web pages, PDF documents, EPUB books, HTML content
- [20alexl/claude-engram](https://github.com/20alexl/claude-engram) — [](https://glama.ai/mcp/servers/20alexl/claude-engram) 🐍 🏠 - Persistent memory and session intelligence for Claude Code. Auto-tracks mistakes, decisions, and context via hooks. Mines session histo
- [timmx7/acheron-mcp-server](https://github.com/timmx7/acheron-mcp-server) — [](https://glama.ai/mcp/servers/timmx7/acheron-mcp-server) 📇 🏠 - Cross-surface persistent memory for Claude. Bridges context between Claude Chat, Code, and Cowork via local SQLite with full-text
- [agentic-mcp-tools/memora](https://github.com/agentic-mcp-tools/memora) — 🐍 🏠 ☁️ - Persistent memory with knowledge graph visualization, semantic/hybrid search, cloud sync (S3/R2), and cross-session context management
- [Thezenmonster/agentmem](https://github.com/Thezenmonster/agentmem) — [](https://glama.ai/mcp/servers/Thezenmonster/agentmem) 🐍 🏠 🍎 🪟 🐧 - Governed memory for coding agents with trust lifecycle (hypothesis → active → validated → deprecated), conflict detection, sta
- [aitytech/agentkits-memory](https://github.com/aitytech/agentkits-memory) — [](https://glama.ai/mcp/servers/@aitytech/agentkits-memory) 📇 🏠 🍎 🪟 🐧 - Persistent memory for AI coding assistants with hybrid search (FTS5 + vector embeddings), session tracking, automatic contex
- [AliceLJY/recallnest](https://github.com/AliceLJY/recallnest) — [](https://glama.ai/mcp/servers/AliceLJY/recallnest) 📇 🏠 🍎 🪟 🐧 - Persistent memory MCP server for AI coding agents (Claude Code, Codex, Gemini CLI). Hybrid retrieval (vector + BM25), cross-encoder reranking, k
- [ailenshen/apple-notes-mcp](https://github.com/ailenshen/apple-notes-mcp) — [](https://glama.ai/mcp/servers/ailenshen/apple-notes-mcp) 📇 🏠 🍎 - Read and write Apple Notes with bidirectional Markdown conversion. Fast SQLite queries for listing/searching, AppleScript + native
- [AgenticRevolution/memory-nexus-cloud](https://github.com/AgenticRevolution/memory-nexus-cloud) — 📇 ☁️ - Cloud-hosted persistent semantic memory for AI agents. Semantic search, knowledge graphs, specialist expertise hats, and multi-tenant isolation. Free 7-day trial
- [AgentModule/mcp](https://github.com/AgentModule/mcp) — [](https://glama.ai/mcp/servers/AgentModule/mcp) 📇 ☁️ - Agent-native knowledge infrastructure. Deterministic, vertical-specific knowledge bases engineered for autonomous agent consumption via MCP. Ethics modu
- [AlekseiMarchenko/central-intelligence](https://github.com/AlekseiMarchenko/central-intelligence) — [](https://glama.ai/mcp/servers/AlekseiMarchenko/central-intelligence) 📇 ☁️ - Persistent memory for AI agents. Five tools (remember, recall, context, forget, share) with semantic se
- [epicsagas/alcove](https://github.com/epicsagas/alcove) — [](https://glama.ai/mcp/servers/epicsagas/alcove) 🦀 🏠 🍎 🪟 🐧 - MCP server that gives AI coding agents on-demand access to private project docs via BM25 ranked search. One setup for Claude Code, Cursor, Codex, Gemini C
- [alibaizhanov/mengram](https://github.com/alibaizhanov/mengram) — [](https://glama.ai/mcp/servers/@alibaizhanov/mengram) 🐍 ☁️ 🏠 🍎 🪟 🐧 - Human-like memory layer for AI agents with semantic, episodic, and procedural memory. Claude Code hooks (auto-save, auto-recall, cognitive p
- [AntonioTF5/soul-mcp-server](https://github.com/AntonioTF5/soul-mcp-server) — [](https://glama.ai/mcp/servers/AntonioTF5/soul-mcp-server) 📇 🏠 🍎 🪟 🐧 - Validate and generate SOUL.md agent identity files from Claude Desktop. SOUL.md is the open format for persistent AI agent id
- [apecloud/ApeRAG](https://github.com/apecloud/ApeRAG) — 🐍 ☁️ 🏠 - Production-ready RAG platform combining Graph RAG, vector search, and full-text search. Best choice for building your own Knowledge Graph and for Context Engineering
- [Battam1111/Myco](https://github.com/Battam1111/Myco) — [](https://glama.ai/mcp/servers/Battam1111/Myco) 🐍 🏠 🍎 🪟 🐧 - Agent-first cognitive substrate with 18 manifest-driven verbs (germinate / eat / assimilate / sporulate / traverse / immune / molt / …) and 25 lint
- [bitatlas-group/bitatlas](https://github.com/bitatlas-group/bitatlas) — [](https://glama.ai/mcp/servers/bitatlas-group/bitatlas) 📇 ☁️ - Zero-Knowledge Cloud Drive for Humans and Agents. Client-side AES-256-GCM encryption with 7 MCP tools for encrypted file vault management — upl
- [besslframework-stack/project-tessera](https://github.com/besslframework-stack/project-tessera) — [](https://glama.ai/mcp/servers/@besslframework-stack/project-tessera) 🐍 🏠 🍎 🪟 🐧 - Local workspace memory for Claude Desktop. Indexes your documents (Markdown, CSV, session logs) into a
- [bh-rat/context-awesome](https://github.com/bh-rat/context-awesome) — 📇 ☁️ 🏠 - MCP server for querying 8,500+ curated awesome lists (1M+ items) and fetching the best resources for your agent
- [bitbonsai/mcp-obsidian](https://github.com/bitbonsai/mcp-obsidian) — 📇 🏠 🍎 🪟 🐧 - Universal AI bridge for Obsidian vaults using MCP. Provides safe read/write access to notes with 11 comprehensive methods for vault operations including search, batch operations, tag management, and frontmatter handling. Works with Claude, ChatGPT, and any MCP-compatible AI assistant
- [bluzername/lennys-quotes](https://github.com/bluzername/lennys-quotes) — 📇 🏠 - Query 269 episodes of Lenny's Podcast for product management wisdom. Search 51,000+ transcript segments with YouTube timestamps. Perfect for PRDs, strategy, and PM career advice
- [cameronrye/openzim-mcp](https://github.com/cameronrye/openzim-mcp) — 🐍 🏠 - Modern, secure MCP server for accessing ZIM format knowledge bases offline. Enables AI models to search and navigate Wikipedia, educational content, and other compressed knowledge archives with smart retrieval, caching, and comprehensive API

#### 🔗 Агрегаторы и hub-MCP

- [1mcp/agent](https://github.com/1mcp-app/agent) — 📇 ☁️ 🏠 🍎 🪟 🐧 - A unified Model Context Protocol server implementation that aggregates multiple MCP servers into one
- [8randonpickart5/alderpost-mcp](https://github.com/8randonpickart5/alderpost-mcp) — [](https://glama.ai/mcp/servers/8randonpickart5/alderpost-mcp) 📇 ☁️ - 8 bundled intelligence endpoints (security, company, threat, compliance, sales, sports, property, health) via x402 micropaymen
- [tadas-github/a2asearch-mcp](https://github.com/tadas-github/a2asearch-mcp) — [](https://glama.ai/mcp/servers/tadas-github/a2asearch-mcp) 📇 ☁️ - MCP server to search 4,800+ MCP servers, AI agents, CLI tools and agent skills. Install: `npx -y a2asearch-mcp`. Ask Cl
- [Aganium/agenium](https://github.com/Aganium/agenium) — 📇 ☁️ 🍎 🪟 🐧 - Bridge any MCP server to the agent:// network — DNS-like identity, discovery, and trust for AI agents. Makes your tools discoverable and callable by other agents via `agent://` URIs with mTLS, trust scores, and capability search
- [elisymlabs/elisym](https://github.com/elisymlabs/elisym) — [](https://glama.ai/mcp/servers/elisymlabs/elisym) 📇 ☁️ 🍎 🪟 🐧 - AI agent discovery and marketplace on Nostr with Solana payments (SOL, USDC). NIP-89 discovery, NIP-90 jobs, NIP-44 v2 encryption, on-chain
- [espadaw/Agent47](https://github.com/espadaw/Agent47) — 📇 ☁️ - Unified job aggregator for AI agents across 9+ platforms (x402, RentAHuman, Virtuals, etc)
- [doggychip/agentforge](https://github.com/doggychip/agentforge) — [](https://glama.ai/mcp/servers/doggychip/agentforge) 📇 ☁️ - Unified API gateway and marketplace for 300+ AI agents. One API key, REST + streaming, 90% creator revenue share, health monitoring. Self
- [AgentHotspot](https://github.com/AgentHotspot/agenthotspot-mcp) — 🐍 ☁️ 🏠 🍎 🪟 🐧 - Search, integrate and monetize MCP connectors on the AgentHotspot MCP marketplace
- [alexanderclapp/clirank-mcp-server](https://github.com/alexanderclapp/clirank-mcp-server) — [](https://glama.ai/mcp/servers/alexanderclapp/clirank-mcp-server) 📇 ☁️ 🍎 🪟 🐧 - API intelligence for AI coding agents. 387 APIs scored on agent-friendliness with tools to r
- [Work90210/APIFold](https://github.com/Work90210/APIFold) — [](https://glama.ai/mcp/servers/Work90210/APIFold) 📇 ☁️ - Turn any REST API into a hosted MCP server. 18 free public servers (GitHub, Stripe, Slack, OpenAI, Notion, and more) — no setup required, bring yo
- [rhein1/agoragentic-integrations](https://github.com/rhein1/agoragentic-integrations) — [](https://glama.ai/mcp/servers/@rhein1/agoragentic-integrations) 📇 ☁️ - Agent-to-agent marketplace where AI agents discover, invoke, and pay for services from other agents using USD
- [arikusi/deepseek-mcp-server](https://github.com/arikusi/deepseek-mcp-server) — [](https://glama.ai/mcp/servers/arikusi/deepseek-mcp-server) 📇 ☁️ 🍎 🪟 🐧 - MCP server for DeepSeek AI with chat, reasoning, multi-turn sessions, function calling, thinking mode, and cost tracki
- [ariekogan/ateam-mcp](https://github.com/ariekogan/ateam-mcp) — 📇 ☁️ 🏠 🍎 🪟 🐧 - Build, validate, and deploy multi-agent AI solutions on the ADAS platform. Design skills with tools, manage solution lifecycle, and connect from any AI environment via stdio or HTTP
- [askbudi/roundtable](https://github.com/askbudi/roundtable) — 📇 ☁️ 🏠 🍎 🪟 🐧 - Meta-MCP server that unifies multiple AI coding assistants (Codex, Claude Code, Cursor, Gemini) through intelligent auto-discovery and standardized MCP interface, providing zero-configuration access to the entire AI coding ecosystem
- [blockrunai/blockrun-mcp](https://github.com/blockrunai/blockrun-mcp) — 📇 ☁️ 🍎 🪟 🐧 - Access 30+ AI models (GPT-5, Claude, Gemini, Grok, DeepSeek) without API keys. Pay-per-use via x402 micropayments with USDC on Base
- [Data-Everything/mcp-server-templates](https://github.com/Data-Everything/mcp-server-templates) — 📇 🏠 🍎 🪟 🐧 - One server. All tools. A unified MCP platform that connects many apps, tools, and services behind one powerful interface—ideal for local devs or production agents
- [depwire/depwire](https://github.com/depwire/depwire) — [](https://glama.ai/mcp/servers/depwire/depwire) 📇 🐍 🏎️ 🦀 🌊 🏠 - Dependency graph + 15 MCP tools for AI coding assistants. Parses TypeScript, JavaScript, Python, Go, Rust, and C. Arc diagram visualization, hea
- [duaraghav8/MCPJungle](https://github.com/duaraghav8/MCPJungle) — 🏎️ 🏠 - Self-hosted MCP Server registry for enterprise AI Agents
- [edgarriba/prolink](https://github.com/edgarriba/prolink) — 🐍 ☁️ 🏠 🍎 🪟 🐧 - Agent-to-agent marketplace middleware — MCP-native discovery, negotiation, and transaction between AI agents
- [entire-vc/evc-spark-mcp](https://github.com/entire-vc/evc-spark-mcp) — [](https://glama.ai/mcp/servers/entire-vc/evc-spark-mcp) 📇 ☁️ 🏠 🍎 🪟 🐧 - Search and discover AI agents, skills, prompts, bundles and MCP connectors from a curated catalog of 4500+ assets

#### 🤖 Coding-агенты

- [agent-blueprint/mcp-server](https://github.com/agent-blueprint/mcp-server) — [](https://glama.ai/mcp/servers/agent-blueprint/mcp-server) 📇 ☁️ - 8 MCP tools for exploring and downloading AI agent blueprints. List blueprints, get summaries, download full Agent Skil
- [agentic-mcp-tools/owlex](https://github.com/agentic-mcp-tools/owlex) — 🐍 🏠 🍎 🪟 🐧 - AI council server: query CLI agents (Claude Code, Codex, Gemini, and OpenCode) in parallel with deliberation rounds
- [alpadalar/netops-mcp](https://github.com/alpadalar/netops-mcp) — 🐍 🏠 - Comprehensive DevOps and networking MCP server providing standardized access to essential infrastructure tools. Features network monitoring, system diagnostics, automation workflows, and infrastructure management with AI-powered operational insights
- [askbudi/roundtable](https://github.com/askbudi/roundtable) — 🐍 🏠 - Zero-configuration MCP server that unifies multiple AI coding assistants (Claude Code, Cursor, Codex) through intelligent auto-discovery and standardized interface. Essential infrastructure for autonomous agent development and multi-AI collaboration workflows
- [automateyournetwork/pyATS_MCP](https://github.com/automateyournetwork/pyATS_MCP) — Cisco pyATS server enabling structured, model-driven interaction with network devices
- [avansaber/tailtest-cline](https://github.com/avansaber/tailtest-cline) — [](https://glama.ai/mcp/servers/avansaber/tailtest-cline) 🐍 🏠 🍎 🪟 🐧 - Adversarial test generation for AI coding sessions. Detects language and framework; writes tests; runs them; classifies
- [aybelatchane/mcp-server-terminal](https://github.com/aybelatchane/mcp-server-terminal) — 🦀 🏠 🍎 🪟 🐧 - Playwright for terminals - interact with TUI/CLI applications through structured Terminal State Tree representation with element detection
- [aymericzip/intlayer](https://github.com/aymericzip/intlayer) — 📇 ☁️ 🏠 - A MCP Server that enhance your IDE with AI-powered assistance for Intlayer i18n / CMS tool: smart CLI access, access to the docs
- [spyrae/claude-concilium](https://github.com/spyrae/claude-concilium) — 📇 🏠 🍎 🪟 🐧 - Multi-agent AI consultation framework for Claude Code. Three MCP servers wrapping CLI tools (Codex, Gemini, Qwen) for parallel code review and problem-solving with fallback chains and error detection. Includes ready-to-use Claude Code skill
- [blakerouse/ssh-mcp](https://github.com/blakerouse/ssh-mcp) — 🏎️ 🏠 🍎 🪟 🐧 - MCP server exposing SSH control for Linux and Windows servers. Allows long running commands and the ability to perform commands on multiple hosts at the same time
- [sipyourdrink-ltd/bernstein](https://github.com/sipyourdrink-ltd/bernstein) — [](https://glama.ai/mcp/servers/chernistry/bernstein) 🐍 🏠 ☁️ 🍎 🪟 🐧 - Deterministic multi-agent orchestrator for 37 CLI coding agents (Claude Code, Codex, Cursor, Aider, Gemini CLI, GitHub Copi
- [doggybee/mcp-server-leetcode](https://github.com/doggybee/mcp-server-leetcode) — 📇 ☁️ - An MCP server that enables AI models to search, retrieve, and solve LeetCode problems. Supports metadata filtering, user profiles, submissions, and contest data access
- [eirikb/any-cli-mcp-server](https://github.com/eirikb/any-cli-mcp-server) — 📇 🏠 - Universal MCP server that transforms any CLI tool into an MCP server. Works with any CLI that has `--help` output, supports caching for performance
- [ezyang/codemcp](https://github.com/ezyang/codemcp) — 🐍 🏠 - Coding agent with basic read, write and command line tools
- [elhamid/llm-council](https://github.com/elhamid/llm-council) — 🐍 🏠 - Multi-LLM deliberation with anonymized peer review. Runs a 3-stage council: parallel responses → anonymous ranking → synthesis. Based on Andrej Karpathy's LLM Council concept
- [freema/openclaw-mcp](https://github.com/freema/openclaw-mcp) — [](https://glama.ai/mcp/servers/@freema/openclaw-mcp) 📇 ☁️ 🏠 - MCP server for [OpenClaw](https://github.com/openclaw/openclaw) AI assistant integration. Enables Claude to delegate tasks to OpenClaw agents w
- [ferrislucas/iterm-mcp](https://github.com/ferrislucas/iterm-mcp) — 🖥️ 🛠️ 💬 - A Model Context Protocol server that provides access to iTerm. You can run commands and ask questions about what you see in the iTerm terminal
- [TT-Wang/forge](https://github.com/TT-Wang/forge) — [](https://glama.ai/mcp/servers/TT-Wang/forge) 📇 🏠 🍎 🪟 🐧 - Structured planning, parallel execution in git worktrees, and deep validation for Claude Code. Turns a one-line objective into a validated DAG of modules execute
- [g0t4/mcp-server-commands](https://github.com/g0t4/mcp-server-commands) — 📇 🏠 - Run any command with `run_command` and `run_script` tools
- [gabrielmaialva33/winx-code-agent](https://github.com/gabrielmaialva33/winx-code-agent) — 🦀 🏠 - A high-performance Rust reimplementation of WCGW for code agents, providing shell execution and advanced file management capabilities for LLMs via MCP

#### ▶️ Выполнение кода и sandbox

- [alfonsograziano/node-code-sandbox-mcp](https://github.com/alfonsograziano/node-code-sandbox-mcp) — 📇 🏠 – A Node.js MCP server that spins up isolated Docker-based sandboxes for executing JavaScript snippets with on-the-fly npm dependency installation and clean teardown
- [alvii147/piston-mcp](https://github.com/alvii147/piston-mcp) — 🐍 ☁️ 🐧 🍎 🪟 - MCP server that lets LLMs execute code through the Piston remote code execution engine, with a zero-config `uv` setup and a ready-to-use Claude Desktop config example
- [asif-nvc/e2b-sandbox-mcp](https://github.com/asif-nvc/e2b-sandbox-mcp) — [](https://glama.ai/mcp/servers/asif-nvc/e2b-sandbox-mcp) 📇 ☁️ 🍎 🪟 🐧 - Connect Claude Code with E2B cloud sandboxes — 29 tools for creating isolated Linux VMs, cloning repos, running command
- [ckanthony/openapi-mcp](https://github.com/ckanthony/openapi-mcp) — 🏎️ ☁️ - OpenAPI-MCP: Dockerized MCP Server to allow your AI agent to access any API with existing api docs
- [dagger/container-use](https://github.com/dagger/container-use) — 🏎️ 🏠 🐧 🍎 🪟 - Containerized environments for coding agents. Multiple agents can work independently, isolated in fresh containers and git branches. No conflicts, many experiments. Full execution history, terminal access to agent environments, git workflow. Any agent/model/infra stack
- [gwbischof/outsource-mcp](https://github.com/gwbischof/outsource-mcp) — 🐍 ☁️ - Give your AI assistant its own AI assistants. For example: "Could you ask openai to generate an image of a dog?"
- [hileamlakB/PRIMS](https://github.com/hileamlakB/PRIMS) — 🐍 🏠 – A Python Runtime Interpreter MCP Server that executes user-submitted code in an isolated environment
- [mavdol/capsule/mcp-server](https://github.com/mavdol/capsule/tree/main/integrations/mcp-server) — [](https://glama.ai/mcp/servers/mavdol/capsule-mcp-server) 🦀 🏠 🍎 🪟 🐧 - Run untrusted Python/JavaScript code in WebAssembly sandboxes
- [HanSur94/matlab-mcp-server-python](https://github.com/HanSur94/matlab-mcp-server-python) — [](https://glama.ai/mcp/servers/HanSur94/matlab-mcp-server-python) 🐍 🏠 🍎 🪟 🐧 - Connect AI agents to MATLAB — execute code, run async jobs with progress reporting, get inter
- [ouvreboite/openapi-to-mcp](https://github.com/ouvreboite/openapi-to-mcp) — #️⃣ ☁️ - Lightweight MCP server to access any API using their OpenAPI specification. Supports OAuth2 and full JSON schema parameters and request body
- [pydantic/pydantic-ai/mcp-run-python](https://github.com/pydantic/pydantic-ai/tree/main/mcp-run-python) — 🐍 🏠 - Run Python code in a secure sandbox via MCP tool calls
- [r33drichards/mcp-js](https://github.com/r33drichards/mcp-js) — 🦀 🏠 🐧 🍎 - A Javascript code execution sandbox that uses v8 to isolate code to run AI generated javascript locally without fear. Supports heap snapshotting for persistent sessions

#### 📅 Рабочие инструменты

- [temporal-cortex/mcp](https://github.com/temporal-cortex/mcp) — [](https://glama.ai/mcp/servers/@billylui/cortex-mcp) 🦀 ☁️ 🏠 - AI-native calendar middleware for scheduling, availability, and conflict-free booking across Google Calendar, Outlook, and CalDAV. 15 tools acros
- [Agentled/mcp-server](https://github.com/Agentled/mcp-server) — [](https://glama.ai/mcp/servers/Agentled/mcp-server) 📇 ☁️ - AI-native workflow orchestration with long-term memory, 100+ integrations, and unified credits. 32 MCP tools for building and running intell
- [6figr-com/jobgpt-mcp-server](https://github.com/6figr-com/jobgpt-mcp-server) — [](https://glama.ai/mcp/servers/@6figr-com/job-gpt-mcp-server) 📇 ☁️ 🏠 🍎 🪟 🐧 - MCP server for [JobGPT](https://6figr.com/jobgpt) — search jobs, auto-apply, generate tailored resumes, track app
- [backloghq/backlog](https://github.com/backloghq/backlog) — [](https://glama.ai/mcp/servers/backloghq/backlog) 📇 🏠 🍎 🪟 🐧 - Persistent, cross-session task management for Claude Code. 24 MCP tools, 7 skills, and agent coordination with event-sourced storage and per-
- [bivex/kanboard-mcp](https://github.com/bivex/kanboard-mcp) — 🏎️ ☁️ 🏠 - A Model Context Protocol (MCP) server written in Go that empowers AI agents and Large Language Models (LLMs) to seamlessly interact with Kanboard. It transforms natural language commands into Kanboard API calls, enabling intelligent automation of project, task, and user management, streaml
- [benmonopoli/open-greenhouse-mcp](https://github.com/benmonopoli/open-greenhouse-mcp) — [](https://glama.ai/mcp/servers/benmonopoli/open-greenhouse-mcp) 🐍 ☁️ 🍎 🪟 🐧 - Production-ready MCP server for [Greenhouse](https://www.greenhouse.com) ATS with 175 tools for re
- [bobbyrgoldsmith/quarterback](https://github.com/bobbyrgoldsmith/quarterback) — 🐍 🏠 🍎 🐧 - Strategic task prioritization and agent orchestration for multi-project operators. 22 MCP tools with 5-factor scoring engine, advisory document analysis, agent dispatch with autonomy levels, HMAC webhooks, time-aware planning, and CI/CD integration. Standalone CLI + MCP server
- [bug-breeder/quip-mcp](https://github.com/bug-breeder/quip-mcp) — 📇 ☁️ 🍎 🪟 🐧 - A Model Context Protocol (MCP) server providing AI assistants with comprehensive Quip document access and management. Enables document lifecycle management, smart search, comment management, and secure token-based authentication for both Quip.com and enterprise instances
- [can4hou6joeng4/boss-agent-cli](https://github.com/can4hou6joeng4/boss-agent-cli) — [](https://glama.ai/mcp/servers/can4hou6joeng4/boss-agent-cli) 🐍 🏠 🍎 🪟 🐧 - BOSS Zhipin recruitment workflow for AI agents. 49 MCP tools for job search, welfare filtering, recruiter
- [ByAxe/keynote-mcp](https://github.com/ByAxe/keynote-mcp) — [](https://glama.ai/mcp/servers/ByAxe/keynote-mcp) 🐍 🏠 🍎 - MCP server for full control of Apple Keynote through AppleScript automation. Create, edit, and export presentations via natural language with 30+
- [conorbronsdon/gws-mcp-server](https://github.com/conorbronsdon/gws-mcp-server) — [](https://glama.ai/mcp/servers/@conorbronsdon/gws-mcp-server) 📇 ☁️ 🍎 🪟 🐧 - Google Workspace MCP server exposing 23 curated tools for Drive, Sheets, Calendar, Docs, and Gmail via the gws CLI
- [ContextPulse/contextpulse](https://github.com/ContextPulse/contextpulse) — [](https://glama.ai/mcp/servers/ContextPulse/contextpulse) 🐍 🏠 🍎 🪟 - Local-first desktop context server for AI agents. Captures screen (OCR), voice (Whisper), keyboard/mouse activity, and clipboard. Ex
- [corbym/backlog-mcp](https://github.com/corbym/backlog-mcp) — [](https://glama.ai/mcp/servers/corbym/backlog-mcp) 🏎️ 🏠 🍎 🪟 🐧 - MCP server that gives AI agents structured read/write access to a story-based project backlog. Agents can list stories, read content, upd
- [Dan8Oren/mcp-apple-notes](https://github.com/Dan8Oren/mcp-apple-notes) — [](https://glama.ai/mcp/servers/Dan8Oren/mcp-apple-notes) 📇 🏠 🍎 - Semantic search and RAG over Apple Notes with on-device embeddings, full CRUD, folder management, and fuzzy title matching.
- [dearlordylord/huly-mcp](https://github.com/dearlordylord/huly-mcp) — [](https://glama.ai/mcp/servers/@dearlordylord/huly-mcp) 📇 ☁️ 🏠 🍎 🪟 🐧 - MCP server for Huly project management. Query issues, create and update tasks, manage labels and priorities
- [davegomez/fizzy-mcp](https://github.com/davegomez/fizzy-mcp) — [](https://glama.ai/mcp/servers/@davegomez/fizzy-mcp) 📇 ☁️ - MCP server for [Fizzy](https://fizzy.do) kanban task management with tools for boards, cards, comments, and checklists
- [delega-dev/delega-mcp](https://github.com/delega-dev/delega-mcp) — [](https://glama.ai/mcp/servers/delega-dev/delega-mcp) 📇 ☁️ 🏠 🍎 🪟 🐧 - Task management API built for AI agents. Create, delegate, and track tasks with agent identity, delegation chains, lifecycle webhooks, an
- [devroopsaha744/TexMCP](https://github.com/devroopsaha744/TexMCP) — 🐍 🏠 - An MCP server that converts LaTeX into high-quality PDF documents. It provides tools for rendering both raw LaTeX input and customizable templates, producing shareable, production-ready artifacts such as reports, resumes, and research papers
- [ellmos-ai/n8n-manager-mcp](https://github.com/ellmos-ai/n8n-manager-mcp) — [](https://glama.ai/mcp/servers/ellmos-ai/n8n-manager-mcp) 📇 ☁️ 🏠 🍎 🪟 🐧 - MCP server for managing n8n workflows through AI assistants, including workflow CRUD, synchronization, inspection,
- [foxintheloop/UpTier](https://github.com/foxintheloop/UpTier) — 📇 🏠 🪟 - Desktop task manager with clean To Do-style UI and 25+ MCP tools for prioritization, goal tracking, and multi-profile workflows

#### 📂 Файловые системы

- [8b-is/smart-tree](https://github.com/8b-is/smart-tree) — 🦀 🏠 🍎 🪟 🐧 - AI-native directory visualization with semantic analysis, ultra-compressed formats for AI consumption, and 10x token reduction. Supports quantum-semantic mode with intelligent file categorization
- [box/mcp-server-box-remote](https://github.com/box/mcp-server-box-remote/) — 🎖️ ☁️ - The Box MCP server allows third party AI agents to securely and seamlessly access Box content and use tools such as search, asking questions from files and folders, and data extraction
- [ckanthony/Chisel](https://github.com/ckanthony/Chisel) — [](https://glama.ai/mcp/servers/@ckanthony/chisel) 🦀 🏠 🍎 🐧 ☁️ - Reduce context usage on file use. Send only unified diffs instead of full files (up to 20-100× fewer tokens), and read large files with targeted `grep`
- [cyberchitta/llm-context.py](https://github.com/cyberchitta/llm-context.py) — 🐍 🏠 - Share code context with LLMs via MCP or clipboard
- [ebbfijsf/agent-reader](https://github.com/ebbfijsf/agent-reader) — [](https://glama.ai/mcp/servers/ebbfijsf/agent-reader) 📇 🏠 🍎 🪟 🐧 - Document beautifier for AI agents. Converts Markdown to styled webpages (with sidebar TOC), Word, PDF, and full-screen image slideshows. Z
- [efforthye/fast-filesystem-mcp](https://github.com/efforthye/fast-filesystem-mcp) — 📇 🏠 🍎 🪟 🐧 - Advanced filesystem operations with large file handling capabilities and Claude-optimized features. Provides fast file reading/writing, sequential reading for large files, directory operations, file search, and streaming writes with backup & recovery
- [ellmos-ai/ellmos-filecommander-mcp](https://github.com/ellmos-ai/ellmos-filecommander-mcp) — [](https://glama.ai/mcp/servers/ellmos-ai/ellmos-filecommander-mcp) 📇 🏠 🍎 🪟 🐧 - Comprehensive local filesystem MCP server with file management, process control, interacti
- [exoticknight/mcp-file-merger](https://github.com/exoticknight/mcp-file-merger) — 🏎️ 🏠 - File merger tool, suitable for AI chat length limits
- [filesystem@quarkiverse/quarkus-mcp-servers](https://github.com/quarkiverse/quarkus-mcp-servers/tree/main/filesystem) — ☕ 🏠 - A filesystem allowing for browsing and editing files implemented in Java using Quarkus. Available as jar or native image
- [hmk/box-mcp-server](https://github.com/hmk/box-mcp-server) — 📇 ☁️ - Box integration for listing, reading and searching files
- [isaacphi/mcp-gdrive](https://github.com/isaacphi/mcp-gdrive) — 📇 ☁️ - Model Context Protocol (MCP) Server for reading from Google Drive and editing Google Sheets
- [j0hanz/filesystem-context-mcp-server](https://github.com/j0hanz/filesystem-context-mcp-server) — 📇 🏠 - Read-only MCP server for secure filesystem exploration, searching, and analysis with symlink protection
- [jeannier/homebrew-mcp](https://github.com/jeannier/homebrew-mcp) — 🐍 🏠 🍎 - Control your macOS Homebrew setup using natural language via this MCP server. Simply manage your packages, or ask for suggestions, troubleshoot brew issues etc
- [mamertofabian/mcp-everything-search](https://github.com/mamertofabian/mcp-everything-search) — 🐍 🏠 🪟 - Fast Windows file search using Everything SDK
- [MarceauSolutions/md-to-pdf-mcp](https://github.com/MarceauSolutions/md-to-pdf-mcp) — 🐍 🏠 🍎 🪟 🐧 - Convert Markdown files to professional PDFs with customizable themes, headers, footers, and styling

#### ⌨️ CLI и shell

- [danmartuszewski/hop](https://github.com/danmartuszewski/hop) — 🏎️ 🖥️ - Fast SSH connection manager with TUI dashboard and MCP server for discovering, searching, and executing commands on remote hosts
- [nvms/tui-mcp](https://github.com/nvms/tui-mcp) — [](https://glama.ai/mcp/servers/nvms/tui-mcp) 📇 🏠 🍎 🪟 🐧 - What Chrome DevTools MCP is for the browser, tui-mcp is for the terminal. Launch, screenshot, and interact with any TUI app
- [raychao-oao/pty-mcp](https://github.com/raychao-oao/pty-mcp) — [](https://glama.ai/mcp/servers/raychao-oao/pty-mcp) 🏎️ 🏠 🍎 🐧 - Interactive PTY sessions for AI agents — local shells, SSH with persistent sessions (ai-tmux daemon for attach/detach), and serial ports. Single Go
- [ferodrigop/forge](https://github.com/ferodrigop/forge) — [](https://glama.ai/mcp/servers/ferodrigop/forge) 📇 🏠 - Terminal MCP server for AI coding agents with persistent PTY sessions, ring-buffer incremental reads, headless xterm screen capture, multi-agent orchestration, a
- [WhenLabs-org/when](https://github.com/WhenLabs-org/when) — [](https://glama.ai/mcp/servers/WhenLabs-org/when) 📇 🏠 🍎 🪟 🐧 - Developer toolkit: auto-detect stack for AI context files, catch port conflicts, validate .env schemas, spot docs drift, audit dependency lic
- [LukeLamb/claude-terminal-mcp](https://github.com/LukeLamb/claude-terminal-mcp) — [](https://glama.ai/mcp/servers/LukeLamb/claude-terminal-mcp) 📇 🏠 🐧 🍎 - Terminal, filesystem, and background-job tools for Claude Desktop on Linux/macOS. Zero npm deps, pure Node

#### 🖥️ OS-автоматизация

- [sbuysse/gnome-desktop-mcp](https://github.com/sbuysse/gnome-desktop-mcp) — [](https://glama.ai/mcp/servers/sbuysse/gnome-desktop-mcp) 🐍 🏠 🐧 - GNOME desktop automation for AI agents. 30 tools via D-Bus: screenshots, window management, mouse/keyboard injection, clipboard,
- [dimpagk92/cellar](https://github.com/dimpagk92/cellar) — [](https://glama.ai/mcp/servers/dimpagk92/cellar) 🦀 📇 🏠 🍎 🐧 - Hybrid computer-use runtime. Fuses accessibility tree + Chrome DevTools Protocol + vision into structured context with per-element confidence. 4

#### 🎥 Мультимедиа

- [06ketan/slideshot](https://github.com/06ketan/slideshot) — [](https://glama.ai/mcp/servers/06ketan/slideshot) 📇 🏠 🍎 🪟 🐧 - Convert HTML to PDF/PNG/WebP/PPTX slide carousels with 11 themes (LinkedIn, Instagram, pitch decks, infographics). Pixel-perfect Puppeteer re
- [1000ri-jp/atsurae](https://github.com/1000ri-jp/atsurae) — 🐍 ☁️ 🍎 🪟 🐧 - AI-powered video editing MCP server with 10 tools for timeline editing, 5-layer compositing, semantic operations, and FFmpeg rendering (1920x1080, 30fps H.264+AAC)
- [AceDataCloud/MCPSuno](https://github.com/AceDataCloud/SunoMCP) — [](https://glama.ai/mcp/servers/AceDataCloud/MCPSuno) 🐍 ☁️ - Suno AI music generation, lyrics, covers, and vocal extraction via Ace Data Cloud API
- [agenticdecks/deckrun-mcp](https://github.com/agenticdecks/deckrun-mcp) — [](https://glama.ai/mcp/servers/agenticdecks/deckrun-mcp) 🐍 ☁️ - Generate presentation PDFs, narrated videos, and MP3 audio from Markdown. Free tier requires no API key or local install — add a URL to yo
- [AIDC-AI/Pixelle-MCP](https://github.com/AIDC-AI/Pixelle-MCP) — 🐍 📇 🏠 🎥 🔊 🖼️ - An omnimodal AIGC framework that seamlessly converts ComfyUI workflows into MCP tools with zero code, enabling full-modal support for Text, Image, Sound, and Video generation with Chainlit-based web interface
- [ananddtyagi/gif-creator-mcp](https://github.com/ananddtyagi/gif-creator-mcp/tree/main) — 📇 🏠 - A MCP server for creating GIFs from your videos
- [bogdan01m/zapcap-mcp-server](https://github.com/bogdan01m/zapcap-mcp-server) — 🐍 ☁️ - MCP server for ZapCap API providing video caption and B-roll generation via natural language
- [DareDev256/fcpxml-mcp-server](https://github.com/DareDev256/fcpxml-mcp-server) — [](https://glama.ai/mcp/servers/DareDev256/fcpxml-mcp-server) 🐍 🏠 🍎 - The first MCP server for Final Cut Pro. 53 tools that parse, edit, and generate FCPXML timelines — health checks
- [drolosoft/immich-photo-manager](https://github.com/drolosoft/immich-photo-manager) — [](https://glama.ai/mcp/servers/drolosoft/immich-photo-manager) 🐍 🏠 🍎 🪟 🐧 - Turn your self-hosted Immich photo library into a conversation — natural language search via CLIP, geographic al
- [quietnotion/barevalue-mcp](https://github.com/quietnotion/barevalue-mcp) — 📇 ☁️ 🍎 🪟 🐧 - AI podcast editing as a service. Upload raw audio or submit a URL, get back edited episodes with filler words removed, noise reduction, transcripts, show notes, and social clips. Includes webhooks for automation
- [elestirelbilinc-sketch/vap-showcase](https://github.com/elestirelbilinc-sketch/vap-showcase) — 🐍 ☁️ 🍎 🪟 🐧 - AI media generation (Flux, Veo, Suno) with cost control. Pre-commit pricing, budget enforcement, reserve-burn-refund billing
- [realcrabcut/crabcut-mcp-server](https://github.com/realcrabcut/crabcut-mcp-server) — [](https://glama.ai/mcp/servers/realcrabcut/crabcut-mcp-server) 📇 ☁️ - Turn YouTube videos into short-form clips from any AI assistant. AI-powered highlight detection, subtitle g
- [keiver/image-tiler-mcp-server](https://github.com/keiver/image-tiler-mcp-server) — [](https://glama.ai/mcp/servers/keiver/image-tiler-mcp-server) 📇 🏠 🍎 🪟 🐧 - Full-resolution vision for LLMs. Tiles large images and captures web pages via Chrome CDP so vision models proce
- [gaudiolab-jp/gaudio-developers-mcp](https://github.com/gaudiolab-jp/gaudio-developers-mcp) — [](https://glama.ai/mcp/servers/gaudiolab-jp/gaudio-developers-mcp) 📇 ☁️ 🍎 🪟 🐧 - Audio AI API for stem separation (vocal, drum, bass, guitar, piano), DME separation (dialogue, music,
- [MohamedAbdallah-14/prompt-to-asset](https://github.com/MohamedAbdallah-14/prompt-to-asset) — [](https://glama.ai/mcp/servers/MohamedAbdallah-14/prompt-to-asset) 📇 🏠 🍎 🪟 🐧 - Generates app icons, favicons, OG images, logos, and wordmarks. Routes each request across

#### 🧮 Data science

- [abhiphile/fermat-mcp](https://github.com/abhiphile/fermat-mcp) — 🐍 🏠 🍎 🪟 🐧 - The ultimate math engine unifying SymPy, NumPy & Matplotlib in one powerful server. Perfect for developers & researchers needing symbolic algebra, numerical computing, and data visualization
- [arrismo/kaggle-mcp](https://github.com/arrismo/kaggle-mcp) — 🐍 ☁️ - Connects to Kaggle, ability to download and analyze datasets
- [avisangle/calculator-server](https://github.com/avisangle/calculator-server) — 🏎️ 🏠 - A comprehensive Go-based MCP server for mathematical computations, implementing 13 mathematical tools across basic arithmetic, advanced functions, statistical analysis, unit conversions, and financial calculations
- [bradleylab/stella-mcp](https://github.com/bradleylab/stella-mcp) — 🐍 🏠 - Create, read, validate, and save Stella system dynamics models (.stmx files in XMILE format) for scientific simulation and modeling
- [BlackMount-ai/blackmount-nlp-mcp](https://github.com/BlackMount-ai/blackmount-nlp-mcp) — [](https://glama.ai/mcp/servers/BlackMount-ai/blackmount-nlp-mcp) 🐍 🏠 🍎 🪟 🐧 - Deterministic local text analysis: sentiment, readability scoring, keyword extraction, text simi
- [Bright-L01/networkx-mcp-server](https://github.com/Bright-L01/networkx-mcp-server) — 🐍 🏠 - The first NetworkX integration for Model Context Protocol, enabling graph analysis and visualization directly in AI conversations. Supports 13 operations including centrality algorithms, community detection, PageRank, and graph visualization
- [ChronulusAI/chronulus-mcp](https://github.com/ChronulusAI/chronulus-mcp) — 🐍 ☁️ - Predict anything with Chronulus AI forecasting and prediction agents
- [clouatre-labs/math-mcp-learning-server](https://github.com/clouatre-labs/math-mcp-learning-server) — 🐍 ☁️ 🏠 🍎 🪟 🐧 - Educational MCP server for math operations, statistics, visualization, and persistent workspaces. Built with FastMCP 2.0
- [Daichi-Kudo/llm-advisor-mcp](https://github.com/Daichi-Kudo/llm-advisor-mcp) — [](https://glama.ai/mcp/servers/Daichi-Kudo/llm-advisor-mcp) 📇 ☁️ 🍎 🪟 🐧 - Real-time LLM/VLM model comparison with benchmarks, pricing, and personalized recommendations from 5 data sour
- [DataEval/dingo](https://github.com/DataEval/dingo) — 🎖️ 🐍 🏠 🍎 🪟 🐧 - MCP server for the Dingo: a comprehensive data quality evaluation tool. Server Enables interaction with Dingo's rule-based and LLM-based evaluation capabilities and rules&prompts listing
- [datalayer/jupyter-mcp-server](https://github.com/datalayer/jupyter-mcp-server) — 🐍 🏠 - Model Context Protocol (MCP) Server for Jupyter
- [growthbook/growthbook-mcp](https://github.com/growthbook/growthbook-mcp) — 🎖️ 📇 🏠 🪟 🐧 🍎 — Tools for creating and interacting with GrowthBook feature flags and experiments
- [gpartin/WaveGuardClient](https://github.com/gpartin/WaveGuardClient) — [](https://glama.ai/mcp/servers/WaveGuard) 🐍 ☁️ 🍎 🪟 🐧 - Physics-based anomaly detection via MCP. Uses Klein-Gordon wave equations on GPU to detect anomalies with high precision (avg 0.90). 9 tools: scan, fingerprint, com
- [HumanSignal/label-studio-mcp-server](https://github.com/HumanSignal/label-studio-mcp-server) — 🎖️ 🐍 ☁️ 🪟 🐧 🍎 - Create, manage, and automate Label Studio projects, tasks, and predictions for data labeling workflows
- [jjsantos01/jupyter-notebook-mcp](https://github.com/jjsantos01/jupyter-notebook-mcp) — 🐍 🏠 - connects Jupyter Notebook to Claude AI, allowing Claude to directly interact with and control Jupyter Notebooks

#### 📊 Data-платформы

- [1luvc0d3/metabase-mcp](https://github.com/1luvc0d3/metabase-mcp) — [](https://glama.ai/mcp/servers/1luvc0d3/metabase-mcp) 📇 🏠 - MCP server connecting Claude to Metabase with 28 tools for natural language data analysis, dashboard management, SQL queries, and autom
- [carrierone/verilexdata-mcp](https://github.com/carrierone/verilexdata-mcp) — [](https://glama.ai/mcp/servers/carrierone/verilexdata-mcp) 📇 ☁️ - 20 structured datasets (NPI healthcare, SEC filings, OFAC sanctions, crypto whales, Polymarket signals, patents, econom
- [alkemiai/alkemi-mcp](https://github.com/alkemi-ai/alkemi-mcp) — 📇 ☁️ - MCP Server for natural language querying of Snowflake, Google BigQuery, and DataBricks Data Products through Alkemi.ai
- [avisangle/method-crm-mcp](https://github.com/avisangle/method-crm-mcp) — 🐍 ☁️ 🏠 🍎 🪟 🐧 - Production-ready MCP server for Method CRM API integration with 20 comprehensive tools for tables, files, users, events, and API key management. Features rate limiting, retry logic, and dual transport support (stdio/HTTP)
- [aywengo/kafka-schema-reg-mcp](https://github.com/aywengo/kafka-schema-reg-mcp) — 🐍 ☁️ 🏠 🍎 🪟 🐧 - Comprehensive Kafka Schema Registry MCP server with 48 tools for multi-registry management, schema migration, and enterprise features
- [bintocher/mcp-superset](https://github.com/bintocher/mcp-superset) — [](https://glama.ai/mcp/servers/bintocher/mcp-superset) 🐍 ☁️ 🏠 🍎 🪟 🐧 - Full-featured Apache Superset MCP server with 135+ tools for dashboards, charts, datasets, SQL Lab, security (users, roles, RLS, grou
- [bruno-portfolio/agrobr-mcp](https://github.com/bruno-portfolio/agrobr-mcp) — 🐍 ☁️ - Brazilian agricultural data for LLMs — prices, crop estimates, climate, deforestation from 19 public sources via CEPEA, CONAB, IBGE, INPE and B3
- [Castaldo-Solutions/mcp-vtenext](https://github.com/Castaldo-Solutions/mcp-vtenext) — [](https://glama.ai/mcp/servers/Castaldo-Solutions/mcp-vtenext) 📇 🏠 🍎 🪟 🐧 - MCP server for VTENext CRM (open-source vtiger-based). Query, create and update opportunities and contacts via the WebSer
- [dan1d/mercadolibre-mcp](https://github.com/dan1d/mercadolibre-mcp) — [](https://glama.ai/mcp/servers/dan1d/mercadolibre-mcp) 📇 ☁️ - MercadoLibre marketplace integration for AI agents. Search products, get item details, browse categories, track trends, and convert curre
- [dbt-labs/dbt-mcp](https://github.com/dbt-labs/dbt-mcp) — 🎖️ 🐍 🏠 ☁️ - Official MCP server for [dbt (data build tool)](https://www.getdbt.com/product/what-is-dbt) providing integration with dbt Core/Cloud CLI, project metadata discovery, model information, and semantic layer querying capabilities
- [flowcore/mcp-flowcore-platform](https://github.com/flowcore-io/mcp-flowcore-platform) — 🎖️ 📇 ☁️ 🏠 - Interact with Flowcore to perform actions, ingest data, and analyse, cross reference and utilise any data in your data cores, or in public data cores; all with human language
- [Hug0x0/mcp-reunion](https://github.com/Hug0x0/mcp-reunion) — [](https://glama.ai/mcp/servers/Hug0x0/mcp-reunion) 📇 ☁️ 🍎 🪟 🐧 - 96 tools across 21 modules for La Réunion (French overseas region) open data: economy, demographics, geography, transport, health, educat

#### 📚 RAG-платформы

- [gogabrielordonez/mcp-ragchat](https://github.com/gogabrielordonez/mcp-ragchat) — 📇 🏠 - Add RAG-powered AI chat to any website with one command. Local vector store, multi-provider LLM (OpenAI/Anthropic/Gemini), self-contained chat server and embeddable widget
- [poll-the-people/customgpt-mcp](https://github.com/Poll-The-People/customgpt-mcp) — 🐍 🏠 ☁️ - An MCP server for accessing all of CustomGPT.ai's anti-hallucination RAG-as-a-service API endpoints
- [vectara/vectara-mcp](https://github.com/vectara/vectara-mcp) — 🐍 🏠 ☁️ - An MCP server for accessing Vectara's trusted RAG-as-a-service platform

#### 🎯 Маркетинг

- [acamolese/google-search-console-mcp](https://github.com/acamolese/google-search-console-mcp) — [](https://glama.ai/mcp/servers/acamolese/google-search-console-mcp) 🐍 ☁️ - Google Search Console MCP server: query performance data, inspect URLs, check indexing, and
- [AdsMCP/tiktok-ads-mcp-server](https://github.com/AdsMCP/tiktok-ads-mcp-server) — 🐍 ☁️ - A Model Context Protocol server for TikTok Ads API integration, enabling AI assistants to manage campaigns, analyze performance metrics, handle audiences and creatives with OAuth authentication flow
- [alexey-pelykh/lhremote](https://github.com/alexey-pelykh/lhremote) — 📇 🏠 - Open-source CLI and MCP server for LinkedHelper automation — 32 tools for campaign management, messaging, and profile queries via Chrome DevTools Protocol
- [BlockRunAI/x-grow](https://github.com/BlockRunAI/x-grow) — 📇 ☁️ - X/Twitter algorithm optimizer with post drafting, review scoring, and AI image generation for maximum engagement
- [Brand-System/brandsystem-mcp](https://github.com/Brand-System/brandsystem-mcp) — [](https://glama.ai/mcp/servers/Brand-System/brandsystem-mcp) 📇 🏠 🍎 🪟 🐧 - Make your brand machine-readable. Extract brand identity (colors, fonts, logo, voice, visual rules) from any
- [BRNDMK/brandomica-mcp-server](https://github.com/BRNDMK/brandomica-mcp-server) — [](https://glama.ai/mcp/servers/BRNDMK/brandomica-mcp-server) 📇 ☁️ - Brand name verification across domains (with pricing), social handles, trademarks (USPTO), web presence, app stores, and
- [Citedy/citedy-seo-agent](https://github.com/Citedy/citedy-seo-agent) — [](https://glama.ai/mcp/servers/@Citedy/citedy-seo-agent) 📇 ☁️ - Full-stack AI marketing toolkit with 41 MCP tools. Scout X/Reddit trends, analyze competitors, find content gaps, generate SEO articl
- [competlab/competlab-mcp-server](https://github.com/competlab/competlab-mcp-server) — [](https://glama.ai/mcp/servers/competlab/competlab-mcp-server) 📇 ☁️ - Competitive intelligence platform with 24 tools. Monitor competitor pricing, content, positioning, tech stacks, and A
- [mikusnuz/meta-ads-mcp](https://github.com/mikusnuz/meta-ads-mcp) — [](https://glama.ai/mcp/servers/mikusnuz/meta-ads-mcp) 📇 ☁️ - MCP server for Meta Marketing API v25.0 — 123 tools for Facebook & Instagram ad campaigns, audiences, creatives, insights, catalogs, a
- [shensi8312/blogburst-mcp-server](https://github.com/shensi8312/blogburst-mcp-server) — 📇 ☁️ - AI content generation, repurposing, and multi-platform publishing with [BlogBurst](https://blogburst.ai). Generate blogs, repurpose content for 9+ platforms (Twitter, LinkedIn, Reddit, Bluesky, Threads, Telegram, Discord, TikTok, YouTube), get trending topics, and publish directly
- [gomarble-ai/facebook-ads-mcp-server](https://github.com/gomarble-ai/facebook-ads-mcp-server) — 🐍 ☁️ - MCP server acting as an interface to the Facebook Ads, enabling programmatic access to Facebook Ads data and management features
- [gomarble-ai/google-ads-mcp-server](https://github.com/gomarble-ai/google-ads-mcp-server) — 🐍 ☁️ - MCP server acting as an interface to the Google Ads, enabling programmatic access to Google Ads data and management features
- [grovs-io/mcp](https://github.com/grovs-io/mcp) — [](https://glama.ai/mcp/servers/grovs-io/mcp) 📇 ☁️ - Deep linking, attribution, analytics, and campaign management for mobile apps with [Grovs](https://grovs.io) — an open-source, privacy-first alternative to Branc
- [damientilman/mailchimp-mcp-server](https://github.com/damientilman/mailchimp-mcp-server) — [](https://glama.ai/mcp/servers/@damientilman/mailchimp-mcp) 🐍 ☁️ - Mailchimp Marketing API integration with 53 tools for managing campaigns, audiences, reports, automations, landing pages, e-commer
- [Davison-Francis/min8t-sdks](https://github.com/Davison-Francis/min8t-sdks/tree/main/deliveriq-mcp) — [](https://glama.ai/mcp/servers/Davison-Francis/min8t-sdks) 📇 ☁️ - `@deliveriq/mcp` — email-deliverability tools for AI agents. 12 tools: single + batch verification, email finder, DNSBL

#### 📋 Product management

- [daiji-sshr/redmine-mcp-stateless](https://github.com/daiji-sshr/redmine-mcp-stateless) — [](https://glama.ai/mcp/servers/daiji-sshr/redmine-mcp-stateless) 🐍 🏠 🐧 - Stateless Redmine MCP server. Credentials are passed per-request via HTTP headers and never stored o
- [dkships/pm-copilot](https://github.com/dkships/pm-copilot) — 📇 ☁️ - Triangulates HelpScout support tickets and ProductLift feature requests to generate prioritized product plans. Scores themes by convergence (same signal in both sources = 2x boost), scrubs PII, and accepts business metrics from other MCP servers via `kpi_context` for composable prioritization
- [Lukaris/framedeck-mcp](https://github.com/Lukaris/framedeck-mcp) — [](https://glama.ai/mcp/servers/Lukaris/framedeck-mcp) 📇 ☁️ 🏠 🍎 🪟 🐧 - [Framedeck](https://framedeck.app) is a Kanban content production manager for YouTube, Instagram, TikTok and Podcast creators.
- [TylerIlunga/procore-mcp-server](https://github.com/TylerIlunga/procore-mcp-server) — 📇 ☁️ 🍎 🪟 🐧 - MCP server exposing the full Procore REST API (2,636 endpoints) for construction project management. Includes 7 discovery and execution tools covering projects, RFIs, submittals, daily logs, budgets, and more. Single-user OAuth with auto-refresh
- [spranab/saga-mcp](https://github.com/spranab/saga-mcp) — [](https://glama.ai/mcp/servers/@spranab/saga-mcp) 📇 🏠 🍎 🪟 🐧 - A Jira-like project tracker for AI agents with full hierarchy (Projects > Epics > Tasks > Subtasks), task dependencies with auto-block/unblock, thread

#### 👤 Customer data

- [antv/mcp-server-chart](https://github.com/antvis/mcp-server-chart) — 🎖️ 📇 ☁️ - A Model Context Protocol server for generating visual charts using [AntV](https://github.com/antvis)
- [hustcc/mcp-echarts](https://github.com/hustcc/mcp-echarts) — 📇 🏠 - Generate visual charts using [Apache ECharts](https://echarts.apache.org) with AI MCP dynamically
- [hustcc/mcp-mermaid](https://github.com/hustcc/mcp-mermaid) — 📇 🏠 - Generate [mermaid](https://mermaid.js.org/) diagram and chart with AI MCP dynamically
- [iaptic/mcp-server-iaptic](https://github.com/iaptic/mcp-server-iaptic) — 🎖️ 📇 ☁️ - Connect with [iaptic](https://www.iaptic.com) to ask about your Customer Purchases, Transaction data and App Revenue statistics
- [embeddedlayers/mcp-analytics](https://github.com/embeddedlayers/mcp-analytics) — [](https://glama.ai/mcp/servers/embeddedlayers/mcp-analytics) 🐍 ☁️ - Statistical analysis, forecasting, and ML for business data (Shopify, Stripe, WooCommerce, eBay, GA4, Search Cons
- [OpenDataMCP/OpenDataMCP](https://github.com/OpenDataMCP/OpenDataMCP) — 🐍 ☁️ - Connect any Open Data to any LLM with Model Context Protocol
- [QuackbackIO/quackback](https://github.com/QuackbackIO/quackback) — 📇 ☁️ - Open-source customer feedback platform with built-in MCP server. Agents can search feedback, triage posts, update statuses, create and comment on posts, vote, manage roadmaps, merge duplicates, and publish changelogs
- [sergehuber/inoyu-mcp-unomi-server](https://github.com/sergehuber/inoyu-mcp-unomi-server) — 📇 ☁️ - An MCP server to access and updates profiles on an Apache Unomi CDP server

#### 📱 Социальные сети

- [06ketan/substack-ops](https://github.com/06ketan/substack-ops) — [](https://glama.ai/mcp/servers/06ketan/substack-ops) 🐍 🏠 - Substack with **zero AI API keys**. 26 tools (posts, notes, comments, replies, reactions, restacks). Host LLM drafts via `propose_reply` →
- [anwerj/youtube-uploader-mcp](https://github.com/anwerj/youtube-uploader-mcp) — 🏎️ ☁️ - AI‑powered YouTube uploader—no CLI, no YouTube Studio. Uploade videos directly from MCP clients with all AI capabilities
- [arjun1194/insta-mcp](https://github.com/arjun1194/insta-mcp) — 📇 🏠 - Instagram MCP server for analytics and insights. Get account overviews, posts, followers, following lists, post insights, and search for users, hashtags, or places
- [BelleKou/mcp-viral-transformer](https://github.com/BelleKou/mcp-viral-transformer) — [](https://glama.ai/mcp/servers/BelleKou/mcp-viral-transformer) 🐍 🏠 - Turn URLs into viral posts via "remake" command
- [checkra1neth/xbird](https://github.com/checkra1neth/xbird-skill) — 📇 ☁️ 🏠 🍎 🪟 🐧 - Twitter/X MCP server with 34 tools — post tweets, search, read timelines, manage engagement, upload media. No API keys needed, uses browser cookies. Pay per call from $0.001 via x402 micropayments
- [conorbronsdon/substack-mcp](https://github.com/conorbronsdon/substack-mcp) — [](https://glama.ai/mcp/servers/conorbronsdon/substack-mcp) 📇 ☁️ - MCP server for Substack — read posts, manage drafts, publish Notes, get comments, and upload images. Safe by design: cannot publish o
- [gwbischof/bluesky-social-mcp](https://github.com/gwbischof/bluesky-social-mcp) — 🐍 🏠 - An MCP server for interacting with Bluesky via the atproto client
- [hiroata/meltbook-mcp-server](https://github.com/hiroata/meltbook) — 📇 ☁️ - MCP server for meltbook, an AI-agent political discussion board. 50 AI agents autonomously post, vote, and debate Japanese politics. 11 tools for thread creation, posting, voting, and monitoring
- [HagaiHen/facebook-mcp-server](https://github.com/HagaiHen/facebook-mcp-server) — 🐍 ☁️ - Integrates with Facebook Pages to enable direct management of posts, comments, and engagement metrics through the Graph API for streamlined social media management
- [jj-cheng25/weixin-articles-mcp](https://github.com/jj-cheng25/weixin-articles-mcp) — [](https://glama.ai/mcp/servers/jj-cheng25/weixin-articles-mcp) 🐍 ☁️ 🍎 🪟 🐧 - Read WeChat (微信) Official Account articles with native multimodal output — body, images, and video ke
- [jorgenclaw/nostr-mcp-server](https://github.com/jorgenclaw/nostr-mcp-server) — [](https://glama.ai/mcp/servers/jorgenclaw/nostr-mcp-server) 📇 ☁️ - Lightning-paid Nostr signing MCP server. AI agents pay sats per call to sign and publish Nostr events — no API keys,
- [karanb192/reddit-mcp-buddy](https://github.com/karanb192/reddit-mcp-buddy) — 📇 🏠 - Browse Reddit posts, search content, and analyze user activity without API keys. Works out-of-the-box with Claude Desktop
- [king-of-the-grackles/reddit-research-mcp](https://github.com/king-of-the-grackles/reddit-research-mcp) — 🐍 ☁️ - AI-powered Reddit intelligence for market research and competitive analysis. Discover subreddits via semantic search across 20k+ indexed communities, fetch posts/comments with full citations, and manage research feeds. No Reddit API credentials needed
- [kunallunia/twitter-mcp](https://github.com/LuniaKunal/mcp-twitter) — 🐍 🏠 - All-in-one Twitter management solution providing timeline access, user tweet retrieval, hashtag monitoring, conversation analysis, direct messaging, sentiment analysis of a post, and complete post lifecycle control - all through a streamlined API
- [macrocosm-os/macrocosmos-mcp](https://github.com/macrocosm-os/macrocosmos-mcp) — 🎖️ 🐍 ☁️ Access real-time X/Reddit/YouTube data directly in your LLM applications with search phrases, users, and date filtering

#### 🎧 Support & service

- [aikts/yandex-tracker-mcp](https://github.com/aikts/yandex-tracker-mcp) — 🐍 ☁️ 🏠 - MCP Server for Yandex Tracker. Provides tools for searching and retrieving information about issues, queues, users
- [Berckan/bugherd-mcp](https://github.com/Berckan/bugherd-mcp) — 📇 ☁️ - MCP server for BugHerd bug tracking. List projects, view tasks with filtering by status/priority/tags, get task details, and read comments
- [effytech/freshdesk-mcp](https://github.com/effytech/freshdesk_mcp) — 🐍 ☁️ - MCP server that integrates with Freshdesk, enabling AI models to interact with Freshdesk modules and perform various support operations
- [incentivai/quickchat-ai-mcp](https://github.com/incentivai/quickchat-ai-mcp) — 🐍 🏠 ☁️ - Launch your conversational Quickchat AI agent as an MCP to give AI apps real-time access to its Knowledge Base and conversational capabilities
- [nguyenvanduocit/jira-mcp](https://github.com/nguyenvanduocit/jira-mcp) — 🏎️ ☁️ - A Go-based MCP connector for Jira that enables AI assistants like Claude to interact with Atlassian Jira. This tool provides a seamless interface for AI models to perform common Jira operations including issue management, sprint planning, and workflow transitions
- [raalarcon9705/jira-mcp](https://github.com/raalarcon9705/jira-mcp) — [](https://glama.ai/mcp/servers/raalarcon9705/jira-mcp) 📇 ☁️ - Full-featured open source Jira & Confluence MCP server with 24 tools: issue CRUD, sprint lifecycle, comments, transitions, user man
- [sooperset/mcp-atlassian](https://github.com/sooperset/mcp-atlassian) — 🐍 ☁️ - MCP server for Atlassian products (Confluence and Jira). Supports Confluence Cloud, Jira Cloud, and Jira Server/Data Center. Provides comprehensive tools for searching, reading, creating, and managing content across Atlassian workspaces
- [tom28881/mcp-jira-server](https://github.com/tom28881/mcp-jira-server) — 📇 ☁️ 🏠 - Comprehensive TypeScript MCP server for Jira with 20+ tools covering complete project management workflow: issue CRUD, sprint management, comments/history, attachments, batch operations

#### 🛒 E-commerce

- [agentlux/agentlux-mcp](https://github.com/agentlux/agentlux-mcp) — [](https://glama.ai/mcp/servers/agentlux/agentlux-mcp) 📇 ☁️ 🍎 🪟 🐧 - Agent marketplace and services MCP server for AgentLux. Browse marketplace items, manage agent identity, creator workflows, serv
- [mrslbt/rakuten-mcp](https://github.com/mrslbt/rakuten-mcp) — [](https://glama.ai/mcp/servers/mrslbt/rakuten-mcp) 📇 ☁️ - Rakuten API integration for product search, hotel and travel booking, and recipe lookup across Japan's largest e-commerce platform. Install via
- [laundromatic/shopgraph](https://github.com/laundromatic/shopgraph) — [](https://glama.ai/mcp/servers/laundromatic/shopgraph) 📇 ☁️ - Structured product data from the open web — Schema.org + AI extraction for e-commerce enrichment. Pay per call via Stripe. [shopgra
- [lofder/dsers-mcp-product](https://github.com/lofder/dsers-mcp-product) — [](https://glama.ai/mcp/servers/lofder/dsers-mcp-product) 📇 ☁️ - Automate AliExpress/Alibaba dropshipping product import to Shopify or Wix via DSers. Bulk import, variant editing, pricing rules, an
- [OFODevelopment/cerebrochain-mcp-server](https://github.com/OFODevelopment/cerebrochain-mcp-server) — [](https://glama.ai/mcp/servers/OFODevelopment/cerebrochain-mcp-server) 📇 ☁️ - Supply chain & logistics intelligence — rate shopping across 85+ carriers, inventor
- [ONE8943/ai-furniture-hub](https://github.com/ONE8943/ai-furniture-hub) — [](https://glama.ai/mcp/servers/ONE8943/ai-furniture-hub) 📇 ☁️ 🏠 🍎 🪟 🐧 - Japan-focused furniture & home product hub for AI agents. 15 tools for mm-precision search across 300+ products and 3
- [samrothschild23/intelligence-api](https://github.com/samrothschild23/intelligence-api) — [](https://glama.ai/mcp/servers/samrothschild23/intelligence-api) 📇 ☁️ - E-commerce and business intelligence MCP server. Analyze any Shopify store, research Amazon products with Opportunity Score and FBA pr
- [the402ai/mcp-server](https://github.com/the402ai/mcp-server) — [](https://glama.ai/mcp/servers/the402ai/mcp-server) 📇 ☁️ 🍎 🪟 🐧 - AI agent service marketplace with x402 micropayments (USDC on Base). 30 tools for browsing services, purchasing, managing conversation

#### 💰 Финансы и Fintech

- [mrslbt/xendit-mcp](https://github.com/mrslbt/xendit-mcp) — [](https://glama.ai/mcp/servers/mrslbt/xendit-mcp) 📇 ☁️ - Xendit payment gateway for Southeast Asia. Invoices, disbursements, balance checks, and bank transfers across Indonesia, Philippines, Thailand, Vi
- [@arbitova/mcp-server](https://github.com/jiayuanliang0716-max/Arbitova) — [](https://glama.ai/mcp/servers/jiayuanliang0716-max/Arbitova) 📇 ☁️ - Non-custodial on-chain escrow + AI dispute arbitration for agent-to-agent USDC payments on Base. Seven tools c
- [@asterpay/mcp-server](https://github.com/timolein74/asterpay-mcp-server) — [](https://glama.ai/mcp/servers/timolein74/asterpay-mcp-server) 📇 ☁️ - EUR settlement for AI agents via x402 protocol. Market data, AI tools, crypto analytics — pay-per-call in USDC on Base
- [@czagents/cnb](https://github.com/martinhavel/cz-agents-mcp) — [](https://glama.ai/mcp/servers/martinhavel/cz-agents-mcp) 📇 ☁️ 🏠 🍎 🪟 🐧 - Czech National Bank (ČNB) daily FX rates: fetch official CZK exchange rates, convert between currencies, fetch his
- [@frihet/mcp-server](https://github.com/Frihet-io/frihet-mcp) — [](https://glama.ai/mcp/servers/Frihet-io/frihet-mcp) 📇 ☁️ - AI-native business management — invoices, expenses, clients, products, and quotes. 31 tools for Claude, Cursor, Windsurf, and Cline
- [@iiatlas/hledger-mcp](https://github.com/iiAtlas/hledger-mcp) — 📇 🏠 🍎 🪟 - Double entry plain text accounting, right in your LLM! This MCP enables comprehensive read, and (optional) write access to your local [HLedger](https://hledger.org/) accounting journals
- [@openpulsechain/mcp-server](https://github.com/openpulsechain/public/tree/main/mcp-server) — [](https://glama.ai/mcp/servers/openpulsechain/public) 📇 ☁️ - PulseChain on-chain analytics: token safety scores (0-100), honeypot detection, whale tracking, smart money feed, scam alerts, DEX vol
- [aaronjmars/web3-research-mcp](https://github.com/aaronjmars/web3-research-mcp) — 📇 ☁️ - Deep Research for crypto - free & fully local
- [ahmetsbilgin/finbrain-mcp](https://github.com/ahmetsbilgin/finbrain-mcp) — 🎖️ 🐍 ☁️ 🏠 - Access institutional-grade alternative financial data directly in your LLM workflows
- [ahnlabio/bicscan-mcp](https://github.com/ahnlabio/bicscan-mcp) — 🎖️ 🐍 ☁️ - Risk score / asset holdings of EVM blockchain address (EOA, CA, ENS) and even domain names
- [AlexanderLawson17/revettr-python](https://github.com/AlexanderLawson17/revettr-python) — [](https://glama.ai/mcp/servers/AlexanderLawson17/revettr-python) 🐍 ☁️ - Counterparty risk scoring for agentic commerce. Scores wallets, domains, IPs, and companies 0-100 via
- [unixlamadev-spec/aiprox-mcp](https://github.com/unixlamadev-spec/aiprox-mcp) — [](https://glama.ai/mcp/servers/unixlamadev-spec/aiprox-mcp) 📇 ☁️ - Open agent registry — discover and hire autonomous AI agents by capability. 16 agents live. Supports Bitcoin Lightni
- [alchemy/alchemy-mcp-server](https://github.com/alchemyplatform/alchemy-mcp-server) — 🎖️ 📇 ☁️ - Allow AI agents to interact with Alchemy's blockchain APIs
- [anjor/coinmarket-mcp-server](https://github.com/anjor/coinmarket-mcp-server) — 🐍 ☁️ - Coinmarket API integration to fetch cryptocurrency listings and quotes
- [araa47/jupiter-mcp](https://github.com/araa47/jupiter-mcp) — 🐍 ☁️ - Jupiter API Access (allow AI to Trade Tokens on Solana + Access Balances + Search Tokens + Create Limit Orders )
- [arcadia-finance/mcp-server](https://github.com/arcadia-finance/mcp-server) — [](https://glama.ai/mcp/servers/arcadia-finance/arcadia-finance-mcp-server) 🎖️ 📇 ☁️ 🏠 - Manage Uniswap and Aerodrome liquidity positions with leverage, automated rebalanc
- [ariadng/metatrader-mcp-server](https://github.com/ariadng/metatrader-mcp-server) — 🐍 🏠 🪟 - Enable AI LLMs to execute trades using MetaTrader 5 platform
- [aranjan/kite-mcp](https://github.com/aranjan/kite-mcp) — [](https://glama.ai/mcp/servers/aranjan/kite-mcp) 🐍 🏠 - Trade Indian stocks on Zerodha Kite via natural conversation. 14 tools for holdings, orders, quotes, GTT triggers, and more with automated TOTP login
- [armorwallet/armor-crypto-mcp](https://github.com/armorwallet/armor-crypto-mcp) — 🐍 ☁️ - MCP to interface with multiple blockchains, staking, DeFi, swap, bridging, wallet management, DCA, Limit Orders, Coin Lookup, Tracking and more
- [atomno-labs/mcp-cbr-rates](https://github.com/atomno-labs/mcp-cbr-rates) — [](https://glama.ai/mcp/servers/atomno-labs/mcp-cbr-rates) 🐍 ☁️ - Central Bank of Russia (ЦБ РФ) data — currency exchange rates (daily and historical), key interest rate, inflation, and ag
- [atomno-labs/mcp-egrul](https://github.com/atomno-labs/mcp-egrul) — [](https://glama.ai/mcp/servers/atomno-labs/mcp-egrul) 🐍 🏠 - Russian state registries EGRUL (legal entities) and EGRIP (individual entrepreneurs), built on official Federal Tax Service open-data d
- [atomno-labs/mcp-fns-check](https://github.com/atomno-labs/mcp-fns-check) — [](https://glama.ai/mcp/servers/atomno-labs/mcp-fns-check) 🐍 ☁️ - Russian counterparty due diligence — INN/OGRN lookup against EGRUL/EGRIP, bankruptcy registry (EFRSB), tax debts (Transpar
- [jackrain19743/hou-tea-mcp-server](https://github.com/jackrain19743/hou-tea-mcp-server) — [](https://glama.ai/mcp/servers/jackrain19743/hou-tea-mcp-server) 📇 ☁️ - Browse, recommend, and **buy authentic Chinese tea** from hou-tea.com using **USDC stablecoin via the
- [autonsol/sol-mcp](https://github.com/autonsol/sol-mcp) — [](https://glama.ai/mcp/servers/autonsol/sol-mcp) 📇 ☁️ - Solana token risk scoring and pump.fun graduation signals. Score any token by mint address (0-100 risk, risk_label, holder concentration, liquidity), detect g
- [vdalhambra/axiom-calculator-mcp](https://github.com/vdalhambra/axiom-calculator-mcp) — [](https://glama.ai/mcp/servers/vdalhambra/axiom-calculator-mcp) 🐍 🏠 🍎 🪟 🐧 - Personal finance calculators — mortgage payments, compound interest, FIRE retirement number, loan comparison,

#### 📈 Визуализация

- [KyuRish/mcp-dashboards](https://github.com/KyuRish/mcp-dashboards) — [](https://glama.ai/mcp/servers/@KyuRish/mcp-dashboards) 📇 🏠 🍎 🪟 🐧 - 45+ interactive chart types (bar, line, pie, candlestick, sankey, geo, radar, funnel, treemap, and more), dashboards with KPI cards,
- [Ratnaditya-J/csvglow](https://github.com/Ratnaditya-J/csvglow) — [](https://glama.ai/mcp/servers/Ratnaditya-J/csvglow) 🐍 🏠 🍎 🪟 🐧 - Generate beautiful self-contained HTML dashboards from CSV/Excel files with interactive ECharts visualizations, dark gradient theme, and sortable
- [nteract/semiotic](https://github.com/nteract/semiotic) — [](https://glama.ai/mcp/servers/nteract/semiotic) 📇 🏠 🍎 🪟 🐧 - React data visualization MCP server with 30+ chart types. 5 tools: suggest charts for a dataset, render validated React configs to SVG, diagnose
- [subhatta123/twilize](https://github.com/subhatta123/twilize) — [](https://glama.ai/mcp/servers/subhatta123/twilize) 🐍 🏠 🍎 🪟 🐧 - Programmatic Tableau workbook (.twb/.twbx) generation — 47 MCP tools for charts, dashboards, calculated fields, dashboard actions, work

#### 🌎 Путешествия и транспорт

- [alcylu/nightlife-mcp](https://github.com/alcylu/nightlife-mcp) — [](https://glama.ai/mcp/servers/alcylu/nightlife-mcp) 📇 ☁️ - MCP server for Tokyo nightlife event discovery, venue search, performer info, AI recommendations, and VIP table booking
- [campertunity/mcp-server](https://github.com/campertunity/mcp-server) — 🎖️ 📇 🏠 - Search campgrounds around the world on campertunity, check availability, and provide booking links
- [cobanov/teslamate-mcp](https://github.com/cobanov/teslamate-mcp) — 🐍 🏠 - A Model Context Protocol (MCP) server that provides access to your TeslaMate database, allowing AI assistants to query Tesla vehicle data and analytics
- [haomingkoo/japan-seasons-mcp](https://github.com/haomingkoo/japan-seasons-mcp) — [](https://glama.ai/mcp/servers/haomingkoo/japan-seasons-mcp) 📇 ☁️ - Live Japan seasonal travel — cherry blossom forecasts, autumn leaves, flower spots, fruit picking & festivals. 1,700+ GPS-ta
- [lodordev/mcp-teslamate-fleet](https://github.com/lodordev/mcp-teslamate-fleet) — [](https://glama.ai/mcp/servers/lodordev/mcp-teslamate-fleet) 🐍 🏠 - Combined TeslaMate analytics + Fleet API commands — 29 tools for vehicle telemetry, driving history, energy analytics, and remote cont
- [helpful-AIs/triplyfy-mcp](https://github.com/helpful-AIs/triplyfy-mcp) — 📇 ☁️ - An MCP server that lets LLMs plan and manage itineraries with interactive maps in Triplyfy; manage itineraries, places and notes, and search/save flights
- [johnanleitner1-Coder/lastminutedeals-api](https://github.com/johnanleitner1-Coder/lastminutedeals-api) — [](https://glama.ai/mcp/servers/johnanleitner1-Coder/lastminutedeals-api) 🐍 ☁️ - Real-time last-minute tour and activity booking. 8,000+ live slots from 29 suppliers across 16 countries via OCTO open stan
- [KyrieTangSheng/mcp-server-nationalparks](https://github.com/KyrieTangSheng/mcp-server-nationalparks) — 📇 ☁️ - National Park Service API integration providing latest information of park details, alerts, visitor centers, campgrounds, and events for U.S. National Parks
- [lucygoodchild/mcp-national-rail](https://github.com/lucygoodchild/mcp-national-rail) — 📇 ☁️ - An MCP server for UK National Rail trains service, providing train schedules and live travel information, intergrating the Realtime Trains API
- [MarceauSolutions/rideshare-comparison-mcp](https://github.com/MarceauSolutions/rideshare-comparison-mcp) — 🐍 ☁️ - Compare Uber and Lyft prices for any route in real-time with fare estimates, surge pricing info, and cheapest option recommendations



## Шаблоны CLAUDE.md

`CLAUDE.md` в корне репозитория автоматически подгружается в контекст. См. [docs](https://docs.claude.com/en/docs/claude-code/memory).

В этом репозитории три production-шаблона:

- [examples/claude-md-templates/nextjs.md](./examples/claude-md-templates/nextjs.md) — Next.js 16 + React 19 + TypeScript + Tailwind 4.
- [examples/claude-md-templates/python-fastapi.md](./examples/claude-md-templates/python-fastapi.md) — Python 3.13+ + FastAPI + SQLAlchemy 2.0 + Pydantic v2.
- [examples/claude-md-templates/terraform.md](./examples/claude-md-templates/terraform.md) — Terraform 1.13+ с упором на безопасность state.

Каждый шаблон закрывает пять блоков: стек, команды, структура, правила/анти-паттерны, чек-лист перед PR.

> 📂 Полный каталог CLAUDE.md шаблонов и opinionated setup-ов: **[10 записей →](./catalog/templates.md)**

### Известные сборники

- [multica-ai/andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills) — один CLAUDE.md, собранный из практик Andrej Karpathy. 128k⭐.
- [garrytan/gstack](https://github.com/garrytan/gstack) — Claude Code-setup от Garry Tan: 23 opinionated tools. 95k⭐.
- [affaan-m/everything-claude-code](https://github.com/affaan-m/everything-claude-code) — комплексная система оптимизации harness'а: skills, instincts, memory. 181k⭐.

### CLAUDE.md шаблоны по стэкам

- [vercel-labs/agent-skills (nextjs)](https://github.com/vercel-labs/agent-skills) — Next.js-best-practices skill, де-факто канонический шаблон от Vercel Engineering.
- [supabase/agent-skills](https://github.com/supabase/agent-skills) — Supabase + Postgres best practices.
- [callstackincubator/agent-skills (react-native)](https://github.com/callstackincubator/agent-skills) — React Native шаблоны.
- [shadcn/ui skills](https://ui.shadcn.com/docs/skills) — shadcn-компоненты с pattern enforcement.
- [expo/skills](https://github.com/expo/skills) — Expo apps. 25k+ установок.
- [get-convex/agent-skills](https://github.com/get-convex/agent-skills) — Convex backend.
- [microsoft/azure-skills](https://github.com/microsoft/azure-skills) — Azure deployment + best practices.
- [firebase/agent-skills](https://github.com/firebase/agent-skills) — Firebase + Firestore.
- [docs.stripe.com](https://docs.stripe.com/agents/claude-code) — Stripe best practices для платёжных интеграций.

### Тематические гайды

- [Anthropic engineering: Claude Code best practices](https://www.anthropic.com/engineering/claude-code-best-practices) — официальный пост о best practices.
- [Year with Claude Code (alpinadigital)](https://habr.com/ru/companies/alpinadigital/articles/1032134/) — год опыта в конфигурации.
- [Claude Code: практический гайд (Habr)](https://habr.com/ru/articles/987094/) — практический setup на русском.



## Workflow и кейсы

Реальные сценарии использования — миграции, рефакторинг, ревью, генерация тестов, автоматизация.

### Блог-посты и кейсы (EN)

- [Superpowers blog post (Jesse Vincent)](https://blog.fsck.com/2025/10/09/superpowers/) — обзор автора `obra/superpowers` о том, зачем нужны скиллы и как их строить.
- [Naming Claude Plugins (Jesse Vincent)](https://blog.fsck.com/2025/10/23/naming-claude-plugins/) — про разработку superpowers-lab.
- [Anthropic engineering: Claude Code in action](https://www.anthropic.com/engineering/claude-code-in-action) — официальные кейсы.
- [Anthropic engineering: hooks for power users](https://www.anthropic.com/news/claude-code-hooks) — реализация hooks в production.
- [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) — persistent context across sessions: подход к памяти агента между сессиями. 75k⭐.
- [farion1231/cc-switch](https://github.com/farion1231/cc-switch) — desktop-приложение для управления Claude Code / Codex / OpenCode. 69k⭐.
- [gsd-build/get-shit-done](https://github.com/gsd-build/get-shit-done) — meta-prompting + context engineering + spec-driven workflow. 61k⭐.

### RU-кейсы

- [Год с Claude Code (alpinadigital)](https://habr.com/ru/companies/alpinadigital/articles/1032134/) — годовой ретроспективный кейс.
- [3000+ часов в Claude Code (Habr)](https://habr.com/ru/articles/1017110/) — три плагина из личного опыта.
- [Айсберг Claude Code (YooMoney)](https://habr.com/ru/companies/yoomoney/articles/1015548/) — 30+ возможностей от новичка до автоматизации.
- [Изоляция контекста через субагенты (Habr)](https://habr.com/ru/articles/974448/) — архитектурный паттерн для долгих задач.
- [Что вы не знали о Claude Code (Habr)](https://habr.com/ru/articles/1012412/) — инженерные практики.
- [Statusline для Claude Code с мониторингом VPS (Habr)](https://habr.com/ru/articles/1013414/) — кастом statusline.
- [Разработка с Obsidian + Claude (Habr)](https://habr.com/ru/articles/1030316/) — workflow Claude + knowledge base.

### Видеоразборы (RU)

- [Я потратил на Claude Code 1 000 часов (YouTube)](https://www.youtube.com/watch?v=sx6ZSbc51gY) — личный опыт автора, вайб-кодинг.
- [Claude Code или Codex? Честный тест (YouTube)](https://www.youtube.com/watch?v=OethkCDGwuM) — сравнительный тест на реальном продукте.



## Безопасность и enterprise

- [Security best practices](https://docs.claude.com/en/docs/claude-code/security) — официальный гайд по безопасности.
- [Permissions / IAM](https://docs.claude.com/en/docs/claude-code/iam) — настройка прав, `allowManagedHooksOnly` для enterprise.
- [trailofbits/skills](https://github.com/trailofbits/skills) — security-скиллы от Trail of Bits: статический анализ через CodeQL/Semgrep, code auditing, поиск уязвимостей.
- [firebase/agent-skills@firestore-security-rules-auditor](https://skills.sh/firebase/agent-skills/firestore-security-rules-auditor) — аудит Firestore security rules, 20k+ установок.
- [firebase/agent-skills@firebase-security-rules-auditor](https://skills.sh/firebase/agent-skills/firebase-security-rules-auditor) — аудит Firebase rules.
- [useai-pro/openclaw-skills-security@skill-vetter](https://skills.sh/useai-pro/openclaw-skills-security/skill-vetter) — vetting сторонних скиллов перед установкой.
- [supercent-io/skills-template@security-best-practices](https://skills.sh/supercent-io/skills-template/security-best-practices) — universal security checklist.
- [wshobson/agents@security-requirement-extraction](https://skills.sh/wshobson/agents/security-requirement-extraction) — извлечение security requirements из threat model.
- [better-auth/skills@better-auth-security-best-practices](https://skills.sh/better-auth/skills/better-auth-security-best-practices) — security для auth-систем.
- [github/awesome-copilot@ai-prompt-engineering-safety-review](https://skills.sh/github/awesome-copilot/ai-prompt-engineering-safety-review) — review промптов на безопасность.
- [Anthropic enterprise governance](https://www.anthropic.com/enterprise) — корпоративный governance.

### Локально в репо

- [Hook для блокировки коммита секретов](./examples/hooks/README.md) — pre-commit detector, который ловит и человека, и агента. Скрипт: [pre-commit-secrets.sh](./examples/hooks/scripts/pre-commit-secrets.sh).

### Enterprise patterns

- [allowManagedHooksOnly](https://docs.claude.com/en/docs/claude-code/settings#hook-configuration) — admin может блокировать user/project hooks.
- [Managed plugin marketplaces](https://docs.claude.com/en/docs/claude-code/plugins#managed) — выпустить vetted скиллы только из своего marketplace.
- [Permission policies](https://docs.claude.com/en/docs/claude-code/permissions#policy) — org-wide allowlist Bash-команд.
- [Audit logging через hooks](./examples/hooks/README.md#3-session-log---аудит-всех-действий-агента-в-jsonl) — JSONL-аудит для compliance.



## Промптинг

### Официальное

- [Anthropic Prompting Guide](https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview) — официальный гайд.
- [Anthropic Cookbook](https://github.com/anthropics/anthropic-cookbook) — примеры паттернов с кодом.
- [Claude API Skills best practices](https://platform.claude.com/docs/ru/agents-and-tools/agent-skills/best-practices) — официальный документ на русском.
- [Prompt engineering на Claude Console](https://console.anthropic.com/dashboard) — playground с библиотекой.

### Топ-скиллы по промптингу (skills.sh)

- [obra/superpowers@brainstorming](https://skills.sh/obra/superpowers/brainstorming) — **155K** установок. Структурированный брейншторм до начала работы.
- [google-labs-code/stitch-skills@enhance-prompt](https://skills.sh/google-labs-code/stitch-skills/enhance-prompt) — **39K**. Улучшение промпта перед отправкой модели.
- [wshobson/agents@prompt-engineering-patterns](https://skills.sh/wshobson/agents/prompt-engineering-patterns) — **14K**. Продвинутые паттерны.
- [supercent-io/skills-template@prompt-repetition](https://skills.sh/supercent-io/skills-template/prompt-repetition) — **11K**. Паттерны повторения для long-form промптов.
- [github/awesome-copilot@prompt-builder](https://skills.sh/github/awesome-copilot/prompt-builder) — **9K**. Строитель промптов.
- [github/awesome-copilot@ai-prompt-engineering-safety-review](https://skills.sh/github/awesome-copilot/ai-prompt-engineering-safety-review) — **9K**. Безопасность промптов.

### Кураторы

- [dair-ai/Prompt-Engineering-Guide](https://github.com/dair-ai/Prompt-Engineering-Guide) — академический гайд, 50k+ ⭐.
- [f/awesome-chatgpt-prompts](https://github.com/f/awesome-chatgpt-prompts) — большая коллекция готовых промптов (применимы и к Claude).
- [PatrickJS/awesome-cursorrules](https://github.com/PatrickJS/awesome-cursorrules) — `.cursorrules` для разных стэков, многие переносимы в CLAUDE.md.



## Гайды и статьи на русском

> 📂 Полный список RU-статей и YouTube-курсов: **[12 записей →](./catalog/ru-content.md)**

### Habr — практические гайды (2025-2026)

- [Claude Code в 2026: гайд для тех, кто еще пишет код руками](https://habr.com/ru/articles/987382/) — подробный гайд по AI Coding Agents, рекомендации по тарифам и CLI.
- [Год с Claude Code: как собрать рабочую конфигурацию с первого запуска](https://habr.com/ru/companies/alpinadigital/articles/1032134/) — как устроены rules, skills, agents, commands, MCP и hooks, как всё связывается через routing.md.
- [Claude Code: практический гайд по настройке, автоматизации и работе с контекстом](https://habr.com/ru/articles/987094/) — полный сетап с навыками, хуками, сабагентами и MCP. От автора, который работает с Claude Code ежедневно.
- [Полное руководство по добавлению серверов MCP в Claude Code](https://habr.com/ru/articles/938626/) — методы настройки MCP, решения распространённых ошибок, рекомендации по проверенным серверам.
- [44 настройки Claude Code, о которых вы не знали](https://habr.com/ru/articles/987826/) — ранжированные от «must have» до «забей». Включает конфигурацию workflow с MCP, lazy-loading инструментов.
- [10 настроек Claude Code, до которых большинство разработчиков не доходит](https://habr.com/ru/articles/1028988/) — недо-используемые возможности.
- [Что вы не знали о Claude Code: архитектура, управление и инженерные практики](https://habr.com/ru/articles/1012412/) — глубокая внутренняя архитектура агента.
- [Айсберг Claude Code: 30+ возможностей от новичка до автоматизации](https://habr.com/ru/companies/yoomoney/articles/1015548/) — от YooMoney. Карта возможностей от базовых до автоматизации.
- [Изоляция контекста через субагенты: архитектурный паттерн для долгосрочной работы с Claude Code](https://habr.com/ru/articles/974448/) — про субагенты как способ держать основной контекст чистым.
- [3000+ часов в Claude Code: как я сконцентрировал весь опыт в трёх плагинах](https://habr.com/ru/articles/1017110/) — личный опыт автора, упакованный в три плагина.
- [Как я собрал statusline для Claude Code с мониторингом VPS за одну сессию](https://habr.com/ru/articles/1013414/) — кастомизация statusline.
- [Разработка с Obsidian + Claude. Практический гайд](https://habr.com/ru/articles/1030316/) — workflow связки Claude + Obsidian.
- [Как использовать AI-агент Claude Code: советы опытного разработчика (OTUS)](https://habr.com/ru/companies/otus/articles/929624/) — корпоративный блог OTUS.
- [Claude Code — полный гайд и обучение для новичков с нуля](https://habr.com/ru/articles/1033416/) — функции, настройка, best practices.
- [Claude Code: маршрут обучения и полезные ресурсы (2026)](https://habr.com/ru/articles/983214/) — учебная карта.
- [Claude Code для тех, кто не пишет код: полный разбор](https://habr.com/ru/articles/1017668/) — для продуктовых и менеджеров.
- [Code with Claude 2026: что Anthropic показали разработчикам](https://habr.com/ru/articles/1032588/) — отчёт со второй конференции Anthropic (6 мая 2026, San Francisco).
- [Claude Code бесплатно: как использовать ИИ бесплатно в 2026](https://habr.com/ru/articles/1018234/) — про утечку source maps и форк OpenClaude.
- [Claude AI: что умеет нейросеть Anthropic в 2026](https://habr.com/ru/articles/1027572/) — обзорная статья.

### vc.ru — индустрия и кейсы

- [Кодинг с ИИ-агентом в терминале: что это такое и как работает в 2026 году](https://vc.ru/ai/2920853-ii-agenty-v-terminalye) — как Claude Code и аналоги работают изнутри.
- [Claude Code, OpenClaw, Hermes: три парадигмы ИИ-агентов в 2026](https://vc.ru/ai/2911692-iskusstvennyj-intellekt-dlja-biznesa) — Opus 4.7, бюджеты задач, контекст до 1 млн токенов.
- [Anthropic ограничила OpenClaw в Claude подписках](https://vc.ru/ai/2878137-anthropic-ogranichila-openclaw-v-claude) — инцидент с отключением сторонних агентов от подписочных лимитов.
- [Anthropic выкатили 10 агентов для финансового сектора](https://vc.ru/id300496/2913405-anthropic-predstavila-ii-agentov-dlya-finansovogo-sektora) — финансовые AI-агенты.
- [Anthropic признал, что два месяца поставлял дефектный Claude Code](https://vc.ru/ai/2885740-anthropic-priznal-defekty-v-claude-code) — incident report.
- [Тарифы Claude 2026: гайд по планам, ценам API и доступу из России](https://vc.ru/ai/2757771-tarify-claude-2026-gayd-po-planam-i-dostupu-iz-rossii) — pricing и доступ.
- [Как оплатить Anthropic AI (Claude) в 2026 году: рабочие способы для России](https://vc.ru/services/2890865-kak-oplatit-anthropic-ai-iz-rossii) — payment guide.
- [Как зарегистрироваться в Claude AI из России в 2026 году](https://vc.ru/ai/2878925-registratsiya-v-claude-ai-iz-rossii) — регистрация.

### DTF — гайды для не-разработчиков

- [Как использовать Claude в России в 2026 году: полный гайд от регистрации до Claude Code](https://dtf.ru/howto/4796716-kak-zaregistrirovatsya-i-ispolzovat-claude-v-rossii)
- [AI-кодинг с Claude Code: три способа создания лендинга](https://dtf.ru/howto/4727219-ai-koding-s-claude-code-sozdanie-lendinga-i-ego-detali) — практический пример влияния контекста на результат.
- [Claude AI: возможности и готовые примеры запросов](https://dtf.ru/howto/5013694-claude-ai-vozmozhnosti-nevroseti)



## YouTube на русском

- [Claude Code: ПОЛНЫЙ КУРС 2026 (4+ ЧАСА)](https://www.youtube.com/watch?v=e6JOw0PliRw) — длинный курс с практикой.
- [Claude Code: ПОЛНЫЙ ГАЙД 2026 (2+ часовой курс)](https://www.youtube.com/watch?v=kFpX1FftH70) — структурированный курс.
- [Claude Code: Полный гайд 2026 — настройка, MCP и Subagent Driven разработка](https://www.youtube.com/watch?v=_4ZcgpvDliA) — фокус на MCP и субагентах.
- [Claude Code: ПОЛНЫЙ ГАЙД 2026 — изучи ВСЁ за 2 часа](https://www.youtube.com/watch?v=dn3CuC-2NiI) — альтернативный 2-часовой обзор.
- [Я потратил на Claude Code 1 000 часов. Вайб-кодинг](https://www.youtube.com/watch?v=sx6ZSbc51gY) — личный опыт, фокус на «вайб-кодинге».
- [Claude на МАКСИМУМ — полный гайд за 11 минут](https://www.youtube.com/watch?v=erdJvTR0hcU) — компактный обзор за 11 минут.
- [Создавай ИИ-агентов с Claude Code — ВСЕ функции за 22 минуты](https://www.youtube.com/watch?v=iwyHt30Ty0c) — промпты, MCP, субагенты, скиллы, hooks, permissions.
- [Claude Code или Codex? Честный тест создания продукта](https://www.youtube.com/watch?v=OethkCDGwuM) — сравнение Claude Code vs OpenAI Codex.
- [Claude Code для дизайнеров — новый стандарт работы в 2026](https://www.youtube.com/watch?v=OiXq8xhJ-wg) — UX/UI-фокус.
- [Claude станет в 10 раз УМНЕЕ, если ты подключишь ЭТО](https://www.youtube.com/watch?v=eTrUEZ9E9aI) — MCP-инструменты для усиления.
- [Регистрация в Claude AI в России в 2026г](https://www.youtube.com/watch?v=2ypCr-Gz-t0) — практический гайд по регистрации.



## Каналы и подкасты

### Telegram (RU)

- [@cc_consultant](https://t.me/cc_consultant) — этот handbook и ежедневные разборы Claude Code из клиентских проектов.

> Раздел открыт для дополнений: PR с русскоязычными каналами про AI-инструменты приветствуется. Критерий — реальная практика и регулярные посты, не агрегатор новостей.

### Discord / Slack (EN)

- [Anthropic Discord](https://www.anthropic.com/discord) — каналы `#claude-code`, `#skills-and-tools`, `#show-and-tell`.
- [VoltAgent Discord](https://s.voltagent.dev/discord) — комьюнити вокруг awesome-claude-code-subagents.
- [r/ClaudeAI](https://www.reddit.com/r/ClaudeAI/) — Reddit-сообщество, самое активное в англоязычном поле.
- [r/Anthropic](https://www.reddit.com/r/Anthropic/) — официальное сабреддит Anthropic.

### Подкасты (EN)

- [Latent Space (swyx)](https://www.latent.space/) — AI engineering с регулярными выпусками про Claude Code и MCP.
- [The Cognitive Revolution](https://www.cognitiverevolution.ai/) — Nathan Labenz, AI индустрия и тренды.
- [Practical AI (Changelog)](https://changelog.com/practicalai) — практические кейсы применения AI.
- [AI Engineer Podcast](https://www.latent.space/p/ai-engineer-podcast) — выделенные интервью.
- [a16z Podcast](https://a16z.com/podcasts/) — VC-перспектива на AI tools.
- [Software Engineering Daily](https://softwareengineeringdaily.com/) — техническая инженерия включая AI.

### Twitter / X — практики Claude Code (EN)

- [@AnthropicAI](https://twitter.com/AnthropicAI) — официальный аккаунт.
- [@alexalbert__](https://twitter.com/alexalbert__) — Alex Albert, developer relations Anthropic.
- [@swyx](https://twitter.com/swyx) — AI engineering, основатель Latent Space.
- [@simonw](https://twitter.com/simonw) — Simon Willison, регулярные разборы LLM tooling.
- [@mattpocockuk](https://twitter.com/mattpocockuk) — Matt Pocock, TDD-скиллы (95k+ установок).
- [@obra](https://twitter.com/obra) — Jesse Vincent, автор `obra/superpowers`.

### YouTube — англоязычные каналы

- [Anthropic (official)](https://www.youtube.com/@anthropic-ai) — официальный канал, релизы и техдемки.
- [Matt Pocock](https://www.youtube.com/@mattpocockuk) — TypeScript + AI tools.
- [AI Jason](https://www.youtube.com/@AIJasonZ) — практические AI agents и tooling.

## Сравнение с другими инструментами

### CLI-агенты

- [Cursor](https://cursor.com/) — IDE-first, отдельный редактор на базе VS Code, сильный autocomplete.
- [GitHub Copilot](https://github.com/features/copilot) — встроен в IDE, фокус на автокомплите + chat.
- [Aider](https://aider.chat/) — CLI-first, open-source, мульти-модельный.
- [Cline](https://github.com/cline/cline) — VS Code-расширение с агентным режимом.
- [Continue](https://www.continue.dev/) — open-source автокомплит + chat в IDE.
- [OpenAI Codex CLI](https://github.com/openai/codex) — официальный CLI-агент от OpenAI.
- [Google Gemini CLI](https://github.com/google-gemini/gemini-cli) — CLI-агент от Google.
- [Windsurf (Codeium)](https://codeium.com/windsurf) — IDE-агент от Codeium.
- [OpenClaw](https://habr.com/ru/articles/1018234/) — open-source форк Claude Code (см. историю).

### Сравнения и обзоры

- [Claude Code или Codex? Честный тест (YouTube RU)](https://www.youtube.com/watch?v=OethkCDGwuM) — сравнительный тест.
- [Claude Code, OpenClaw, Hermes: три парадигмы (vc.ru)](https://vc.ru/ai/2911692-iskusstvennyj-intellekt-dlja-biznesa) — три парадигмы AI-агентов.
- [Кодинг с ИИ-агентом в терминале (vc.ru)](https://vc.ru/ai/2920853-ii-agenty-v-terminalye) — обзор класса инструментов.

### Связанные экосистемы

- [VoltAgent](https://github.com/VoltAgent/voltagent) — мульти-агентный framework, на котором собраны awesome-claude-code-subagents.
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
