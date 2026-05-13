# Claude Code Handbook на русском

> Практик-handbook для тех, кто использует [Claude Code](https://docs.claude.com/en/docs/claude-code/overview) в работе. Куратные top-N по каждой категории с пояснениями «зачем» и «когда применять», плюс полный каталог на 1400+ ссылок для углублённого поиска.
>
> Обновления и разборы — в Telegram [@cc_consultant](https://t.me/cc_consultant).

[![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

---

## 🚀 Quickstart: с чего начать за 10 минут

Если ставишь Claude Code в первый раз — этот блок закрывает 80% типичных задач из коробки.

```bash
# 1. Сам Claude Code
npm install -g @anthropic-ai/claude-code

# 2. Самая полная коллекция скиллов и субагентов (obra/superpowers, 20+ скиллов)
#    TDD, brainstorming, debugging, code-review, planning. ~600K совокупных установок.
claude plugin marketplace add obra/superpowers-marketplace

# 3. Три must-have MCP-сервера. Больше 5-7 подключать не рекомендую —
#    каждый MCP грызёт ~1-3K токенов контекста на discovery.
claude mcp add github       # @modelcontextprotocol/server-github
claude mcp add postgres     # @modelcontextprotocol/server-postgres
claude mcp add filesystem   # @modelcontextprotocol/server-filesystem
```

**Куда смотреть в первую очередь:**

1. [🏆 Топ скиллов](#-топ-скиллов-по-install-count-из-skillssh) — что 100K+ людей реально установили (по install-count из skills.sh).
2. [Hooks](#hooks) — поставь хотя бы `pre-commit-secrets` сразу, спасает от утечки API-ключей через `git commit`, который агент может сделать за 30 секунд.
3. [Шаблоны CLAUDE.md](#шаблоны-claudemd) — три production-шаблона: Next.js, Python/FastAPI, Terraform.
4. [Гайды на русском](#гайды-и-статьи-на-русском) — 19 статей с Habr + vc.ru + 11 YouTube-курсов + DTF.

> 📚 **[Полный каталог →](./catalog/README.md)** — 1400+ ресурсов с разбивкой по типам: 827 MCP-серверов, 162 скилла, 160 субагентов, плагины, шаблоны, RU-контент. Для специфического поиска.

---

## Что такое Claude Code

[Claude Code](https://docs.claude.com/en/docs/claude-code/overview) — CLI и IDE-агент от Anthropic для разработки. Работает в терминале, VS Code и JetBrains, поддерживает кастомные скиллы, hooks, MCP-серверы и плагины.

Под капотом — модель Claude (Opus 4.7 даёт контекст до 1M токенов на pro-тарифе с мая 2026). Сильные стороны: глубокая интеграция tool use, MCP как стандарт расширения, развитая экосистема скиллов и субагентов. Слабые: расходует много токенов в долгих сессиях (см. cost-tracker hook в секции [Hooks](#hooks)).

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

Самые установленные скиллы в community — ранжированы по реальной телеметрии маркетплейса skills.sh, не по звёздам на GitHub. Ставится одной командой: `npx skills add <owner/repo@skill>`.

Третья колонка — мой ответ на «когда это реально нужно», не пересказ официального описания.

| Скилл | Зачем и когда юзать | Установок |
|---|---|---:|
| [anthropics/skills@frontend-design](https://skills.sh/anthropics/skills/frontend-design) | Принудительно перестроить дизайн под bold-решения, а не дефолтные «AI slop»-карточки с серыми тенями. Триггерь когда видишь, что вышло generic. React + Tailwind. | **405K** |
| [vercel-labs/agent-skills@vercel-react-best-practices](https://skills.sh/vercel-labs/agent-skills/vercel-react-best-practices) | React/Next.js perf-практики от Vercel Engineering: правильные boundaries клиент-RSC, кэширование, оптимизация bundle. Подключай в любом Next.js-проекте. | **395K** |
| [vercel-labs/agent-skills@web-design-guidelines](https://skills.sh/vercel-labs/agent-skills/web-design-guidelines) | Чек-лист соответствия Web Interface Guidelines: a11y, hit-targets, focus rings. Запускай как ревью UI до коммита. | **316K** |
| [microsoft/azure-skills@azure-deploy](https://skills.sh/microsoft/azure-skills/azure-deploy) | Деплой в Azure: ARM/Bicep, App Service, Container Apps. Ставь только если реально работаешь в Azure-стэке — иначе мёртвый груз в контексте. | **312K** |
| [obra/superpowers@brainstorming](https://skills.sh/obra/superpowers/brainstorming) | Структурированный брейншторм с гипотезами и матрицей вариантов **до** начала кода. Включай когда задача расплывчатая («сделай auth»). Часть [obra/superpowers](https://github.com/obra/superpowers). | **155K** |
| [xixu-me/skills@github-actions-docs](https://skills.sh/xixu-me/skills/github-actions-docs) | Свежая официальная дока GitHub Actions: синтаксис, runners, OIDC, troubleshooting. Когда пишешь workflow и не хочешь искать в десяти вкладках. | **131K** |
| [larksuite/cli@lark-workflow-meeting-summary](https://skills.sh/larksuite/cli/lark-workflow-meeting-summary) | Авто-резюме встреч в Lark (китайский Slack-аналог). Релевантно если работаешь с китайской командой — иначе пропускай. | **122K** |
| [vercel-labs/agent-skills@vercel-react-native-skills](https://skills.sh/vercel-labs/agent-skills/vercel-react-native-skills) | React Native best practices от Vercel. Для мобильных проектов на RN — снимает с агента половину типичных багов. | **116K** |
| [mattpocock/skills@tdd](https://skills.sh/mattpocock/skills/tdd) | TDD-цикл (red-green-refactor) с дисциплиной — не даёт агенту писать код вперёд тестов. Включай в проектах где TDD действительно практикуется. От Matt Pocock. | **96K** |
| [arvindrk/extract-design-system@extract-design-system](https://skills.sh/arvindrk/extract-design-system/extract-design-system) | Скан существующего сайта → структурированный design-system (токены, паттерны, типографика). Для редизайна или нового проекта на базе старого. | **93K** |
| [obra/superpowers@systematic-debugging](https://skills.sh/obra/superpowers/systematic-debugging) | Дисциплина отладки: гипотезы → изоляция → root cause. Когда видишь, что агент «гадает на код-граниях» вместо системного подхода — этот скилл прерывает цикл. | **94K** |
| [obra/superpowers@requesting-code-review](https://skills.sh/obra/superpowers/requesting-code-review) | Запросить ревью у саб-агента **перед** коммитом. Эффективно когда работаешь автономно без живого ревьюера. | **82K** |
| [mattpocock/skills@grill-with-docs](https://skills.sh/mattpocock/skills/grill-with-docs) | «Допрашивай» документацию через find/grep — заменяет догадки точными цитатами из docs. Особенно ценно для библиотек где знание Claude устарело. | **79K** |
| [obra/superpowers@subagent-driven-development](https://skills.sh/obra/superpowers/subagent-driven-development) | Делегирование независимых задач саб-агентам параллельно. Включай для проектов где можно распараллелить (feature + tests, frontend + backend). | **70K** |
| [anthropics/skills@webapp-testing](https://skills.sh/anthropics/skills/webapp-testing) | Тестирование веб-приложений через Playwright. Заменяет «руками протыкать в браузере» на автоматизацию. Подключай в любом веб-проекте с frontend-логикой. | **68K** |
| [obra/superpowers@verification-before-completion](https://skills.sh/obra/superpowers/verification-before-completion) | Проверить что задача **реально** сделана (запустить тесты, открыть страницу), до того как агент скажет «готово». Главный антидот к false-positive отчётам. | **68K** |
| [obra/superpowers@receiving-code-review](https://skills.sh/obra/superpowers/receiving-code-review) | Принимать review-feedback с технической строгостью — не соглашаться на всё подряд, а аргументировать. Полезен при работе с строгими ревьюерами. | **65K** |
| [pbakaus/impeccable@frontend-design](https://skills.sh/pbakaus/impeccable/frontend-design) | Premium frontend design (Paul Bakaus, экс-Google). Альтернатива anthropics/frontend-design с другим эстетическим уклоном. Сравни оба, оставь подходящий. | **53K** |
| [leonxlnx/taste-skill@design-taste-frontend](https://skills.sh/leonxlnx/taste-skill/design-taste-frontend) | Senior UI/UX-инженер: переопределяет дефолтные LLM-биасы про дизайн (типа округлённых углов везде). Хорош в паре с дизайн-системой. | **53K** |
| [anthropics/skills@mcp-builder](https://skills.sh/anthropics/skills/mcp-builder) | Пошаговое создание MCP-сервера. Подключай **только** когда пишешь свой MCP — в обычной разработке не нужен. | **53K** |
| [vercel-labs/agent-skills@deploy-to-vercel](https://skills.sh/vercel-labs/agent-skills/deploy-to-vercel) | Деплой на Vercel со всеми их специфичными настройками (env vars, domains, edge functions). | **50K** |
| [get-convex/agent-skills@convex-performance-audit](https://skills.sh/get-convex/agent-skills/convex-performance-audit) | Performance-аудит для Convex-приложений. Узкий, но в Convex-стэке незаменим. | **45K** |
| [google-labs-code/stitch-skills@react:components](https://skills.sh/google-labs-code/stitch-skills/react:components) | React-компоненты по описанию (Google Stitch — design-to-code). Когда есть дизайн в Figma, и нужны компоненты быстро. | **44K** |
| [wshobson/agents@typescript-advanced-types](https://skills.sh/wshobson/agents/typescript-advanced-types) | Продвинутые TypeScript patterns: conditional, mapped, template literal types. Когда нужен реально типобезопасный API, а не `any`. | **41K** |
| [google-labs-code/stitch-skills@enhance-prompt](https://skills.sh/google-labs-code/stitch-skills/enhance-prompt) | Улучшение промпта перед отправкой модели. Полезен для меня самого, не для агента — auto-применяется не идеально. | **39K** |
| [github/awesome-copilot@git-commit](https://skills.sh/github/awesome-copilot/git-commit) | Conventional commit-сообщения на основе staged diff. Минималистично, но закрывает 90% коммитов. | **30K** |
| [wshobson/agents@python-performance-optimization](https://skills.sh/wshobson/agents/python-performance-optimization) | Python perf: profiling (cProfile/py-spy), типичные узкие места, оптимизация. Полезен когда видишь, что код в Python тормозит, и нужен системный подход. | **22K** |
| [firebase/agent-skills@firestore-security-rules-auditor](https://skills.sh/firebase/agent-skills/firestore-security-rules-auditor) | Аудит Firestore security rules — топовый источник дыр в Firebase-проектах. Запускай перед прод-релизом. | **20K** |

> **Совет практика:** ставь `obra/superpowers` целиком сразу — это **самая полная коллекция soft-скиллов** (TDD, debugging, planning, brainstorming, code-review). Пять из топ-15 — оттуда. Для конкретного стэка добавь stack-specific (Vercel React, Convex, Firebase, Supabase, Azure). Не ставь всё подряд — каждый скилл занимает ~3-5K токенов в context bootstrap.
>
> Источник: [skills.sh leaderboard](https://skills.sh) — install-count актуален на момент последнего пересмотра README, числа быстро растут. Автообновление таблицы: `python scripts/refresh-top-skills.py`.


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

### 144 субагента из VoltAgent: содержимое коллекции

[VoltAgent/awesome-claude-code-subagents](https://github.com/VoltAgent/awesome-claude-code-subagents) — 19k⭐, 144 готовых субагента в 10 категориях. Каждый — отдельный `.md`-файл с YAML-фронтматтером, ставится в `.claude/agents/`.

| Категория | Что внутри | Когда ставить |
|---|---|---|
| [🛠️ Core development](https://github.com/VoltAgent/awesome-claude-code-subagents/tree/main/categories/01-core-development) (11) | API-дизайнер, frontend/backend/fullstack, мобильный, GraphQL-архитектор, WebSocket-инженер | Если работаешь над приложением и хочешь делегировать узкие задачи (типа «спроектируй GraphQL-схему») |
| [🔤 Language specialists](https://github.com/VoltAgent/awesome-claude-code-subagents/tree/main/categories/02-language-specialists) (30) | python-pro, java-architect, rust-engineer, golang-pro, php-pro, typescript-pro и 24 ещё | Когда основной агент уходит в read-heavy работу по одному языку — субагент изолирует контекст |
| [☁️ Infrastructure](https://github.com/VoltAgent/awesome-claude-code-subagents/tree/main/categories/03-infrastructure) (16) | cloud-architect, devops, kubernetes, terraform, SRE, security-engineer | Для DevOps-задач, особенно когда есть Terraform или K8s в проекте |
| [✅ Quality & security](https://github.com/VoltAgent/awesome-claude-code-subagents/tree/main/categories/04-quality-security) (16) | code-reviewer, debugger, penetration-tester, performance-engineer, a11y-tester | Перед PR — запусти code-reviewer как блокирующий шаг |
| [🧠 Data & AI](https://github.com/VoltAgent/awesome-claude-code-subagents/tree/main/categories/05-data-ai) (13) | ML/MLOps, data-scientist, llm-architect, prompt-engineer, NLP, postgres-pro | Для data-инфры или ML-pipelines |
| [⚡ Developer experience](https://github.com/VoltAgent/awesome-claude-code-subagents/tree/main/categories/06-developer-experience) (14) | cli-developer, mcp-developer, refactoring-specialist, build-engineer, documentation-engineer | Для internal tooling и DX-задач |
| [🎯 Specialized domains](https://github.com/VoltAgent/awesome-claude-code-subagents/tree/main/categories/07-specialized-domains) (13) | blockchain, fintech, gamedev, IoT, embedded, mobile-app-builder | Если работаешь в нишевой области — снимает «общий» context и заменяет специализированным |
| [💼 Business & product](https://github.com/VoltAgent/awesome-claude-code-subagents/tree/main/categories/08-business-product) (12) | PM, scrum-master, technical-writer, UX-researcher, sales-engineer | Для не-кодовых задач: PRD, roadmap, customer success |
| [🎭 Meta & orchestration](https://github.com/VoltAgent/awesome-claude-code-subagents/tree/main/categories/09-meta-orchestration) (11) | agent-organizer, context-manager, multi-agent-coordinator, workflow-orchestrator | Для координации нескольких субагентов параллельно |
| [🔬 Research & analysis](https://github.com/VoltAgent/awesome-claude-code-subagents/tree/main/categories/10-research-analysis) (8) | competitive-analyst, market-researcher, search-specialist, trend-analyst | Для discovery-фазы продукта или анализа конкурентов |

> 📂 Полный inventory всех 144 субагентов с прямыми ссылками — в **[catalog/subagents.md](./catalog/subagents.md)** (160 записей включая VoltAgent + 16 из других коллекций).



## Plugins

[Claude Code Plugins](https://docs.claude.com/en/docs/claude-code/plugins) — packaging для скиллов, агентов, hooks и MCP-серверов. Один плагин = один артефакт, который ставится через `/plugin marketplace`.

> 📂 Полный каталог плагинов: **[16 записей →](./catalog/plugins.md)**

### Каталог плагинов: топ по категориям

Топ-4 плагина на категорию из [ccplugins/awesome-claude-code-plugins](https://github.com/ccplugins/awesome-claude-code-plugins) (782⭐). Полный список — в **[catalog/plugins.md](./catalog/plugins.md)**.

Ставится через `/plugin marketplace add ccplugins/awesome-claude-code-plugins` и `/plugin install <name>`.

#### 🏛️ Официальные плагины Claude Code

- [agent-sdk-dev](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/agent-sdk-dev) — Разработка через Claude Agent SDK
- [pr-review-toolkit](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/pr-review-toolkit") — Набор команд для PR-ревью
- [commit-commands](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/commit-commands) — Генерация commit-сообщений
- [feature-dev](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/feature-dev) — Pipeline разработки фичи
- *…ещё 1 в каталоге →* [catalog/plugins.md](./catalog/plugins.md)
#### ✅ Code quality & testing

- [api-tester](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/api-tester) — Тестирование API
- [bug-detective](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/bug-detective) — Поиск багов
- [code-review](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/code-review) — Code review плагин
- [code-review-assistant](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/code-review-assistant) — Асистент code review
- *…ещё 12 в каталоге →* [catalog/plugins.md](./catalog/plugins.md)
#### 💻 Development & engineering

- [ai-engineer](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/ai-engineer) — AI engineering — разработка AI-систем
- [api-integration-specialist](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/api-integration-specialist) — Интеграция со сторонними API
- [backend-architect](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/backend-architect) — Архитектура backend
- [code-architect](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/code-architect) — Архитектор кода
- *…ещё 11 в каталоге →* [catalog/plugins.md](./catalog/plugins.md)
#### 🔀 Git workflow

- [analyze-issue](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/analyze-issue) — Анализ GitHub issue
- [bug-fix](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/bug-fix) — Исправление багов
- [commit](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/commit) — Создание git-коммита
- [create-pr](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/create-pr) — Создание pull request
- *…ещё 10 в каталоге →* [catalog/plugins.md](./catalog/plugins.md)
#### ⚙️ Automation & DevOps

- [deployment-engineer](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/deployment-engineer) — Subagent для deployment
- [devops-automator](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/devops-automator) — DevOps automation — автоматизация процессов
- [infrastructure-maintainer](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/infrastructure-maintainer) — Обслуживание инфры
- [monitoring-observability-specialist](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/monitoring-observability-specialist) — Мониторинг и observability
- *…ещё 1 в каталоге →* [catalog/plugins.md](./catalog/plugins.md)
#### 📚 Documentation

- [analyze-codebase](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/analyze-codebase) — Анализ кодовой базы
- [changelog-generator](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/changelog-generator) — Генерация changelog
- [codebase-documenter](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/codebase-documenter) — Документирование кодовой базы
- [context7-docs-fetcher](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/context7-docs-fetcher) — Загрузка документации через Context7
- *…ещё 4 в каталоге →* [catalog/plugins.md](./catalog/plugins.md)
#### 🎭 Workflow orchestration

- [angelos-symbo](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/angelos-symbo) — мульти-агентная оркестрация задач
- [ceo-quality-controller-agent](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/ceo-quality-controller-agent) — CEO-агент: контроль качества вывода
- [claude-desktop-extension](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/claude-desktop-extension) — расширение для Claude Desktop
- [lyra](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/lyra) — AI workflow-ассистент
- *…ещё 4 в каталоге →* [catalog/plugins.md](./catalog/plugins.md)
#### 🔒 Security, compliance, legal

- [ai-ethics-governance-specialist](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/ai-ethics-governance-specialist) — AI ethics и governance
- [audit](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/audit) — Аудит проекта
- [compliance-automation-specialist](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/compliance-automation-specialist) — Автоматизация compliance
- [data-privacy-engineer](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/data-privacy-engineer) — Data privacy — GDPR/CCPA-соответствие
- *…ещё 3 в каталоге →* [catalog/plugins.md](./catalog/plugins.md)
#### 📊 Data & analytics

- [analytics-reporter](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/analytics-reporter) — Отчёты по аналитике
- [data-scientist](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/data-scientist) — Data science — анализ и моделирование
- [experiment-tracker](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/experiment-tracker) — Tracking A/B-экспериментов
- [feedback-synthesizer](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/feedback-synthesizer) — Синтез фидбэка от пользователей
- *…ещё 1 в каталоге →* [catalog/plugins.md](./catalog/plugins.md)
#### 🎨 Design & UX

- [brand-guardian](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/brand-guardian) — Хранитель бренда
- [joker](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/joker) — Развлекательный режим
- [mobile-ux-optimizer](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/mobile-ux-optimizer) — Mobile UX — оптимизация
- [onomastophes](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/onomastophes) — Naming-специалист
- *…ещё 4 в каталоге →* [catalog/plugins.md](./catalog/plugins.md)
#### 📋 Project & product management

- [discuss](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/discuss) — Дискуссия по теме
- [explore](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/explore) — Исследование кодовой базы
- [plan](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/plan) — Планирование задачи
- [planning-prd-agent](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/planning-prd-agent) — PRD planning — агент планирования
- *…ещё 6 в каталоге →* [catalog/plugins.md](./catalog/plugins.md)
#### 🎯 Marketing & growth

- [app-store-optimizer](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/app-store-optimizer) — ASO — App Store оптимизация
- [content-creator](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/content-creator) — создание контента
- [growth-hacker](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/growth-hacker) — Growth hacking — взлом роста
- [instagram-curator](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/instagram-curator) — Instagram-куратор
- *…ещё 3 в каталоге →* [catalog/plugins.md](./catalog/plugins.md)
#### 💼 Business & sales

- [b2b-project-shipper](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/b2b-project-shipper) — B2B project shipping
- [customer-success-manager](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/customer-success-manager) — Customer success — работа с клиентами
- [enterprise-onboarding-specialist](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/enterprise-onboarding-specialist) — Enterprise onboarding — внедрение в корпорации
- [finance-tracker](https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/finance-tracker) — Учёт финансов
- *…ещё 4 в каталоге →* [catalog/plugins.md](./catalog/plugins.md)
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

Каталог по доменам — топ-5 на категорию для быстрой ориентации. Полная развёртка (827 записей по 30 категориям) — в **[catalog/mcp-servers.md](./catalog/mcp-servers.md)**.

Описания на английском как в источнике [punkpeye/awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers) — большая часть терминов универсальная.

#### 🗄️ Базы данных

- [Aiven-Open/mcp-aiven](https://github.com/Aiven-Open/mcp-aiven) — 🐍 ☁️ 🎖️ - Navigate your [Aiven projects](https://go.aiven.io/mcp-server) и interact с the PostgreSQL®, Apache Kafka®, ClickHouse® и OpenSearch® сервисы
- [alexanderzuev/supabase-mcp-server](https://github.com/alexander-zuev/supabase-mcp-server) — Supabase MCP Server с поддержка SQL query execution и базы данных exploration tools
- [aliyun/alibabacloud-tablestore-mcp-server](https://github.com/aliyun/alibabacloud-tablestore-mcp-server) — ☕ 🐍 ☁️ - MCP сервис для Tablestore, features include adding documents, semantic search для documents на базе vectors и scalars, RAG-friendly, и serverless
- [amineelkouhen/mcp-cockroachdb](https://github.com/amineelkouhen/mcp-cockroachdb) — 🐍 ☁️ - A Model Context Protocol server для managing, monitoring, и querying data in [CockroachDB](https://cockroachlabs.com)
- [andyWang1688/sql-query-mcp](https://github.com/andyWang1688/sql-query-mcp) — A general-purpose MCP-сервер, который lets AI work с multiple баз данных within clear boundaries. поддерживает PostgreSQL and
- *…ещё 25 в каталоге →* [catalog/mcp-servers.md](./catalog/mcp-servers.md)
#### 🔀 Version control (Git, GitHub, GitLab)

- [adhikasp/mcp-git-ingest](https://github.com/adhikasp/mcp-git-ingest) — Read и analyze GitHub repositories с your LLM
- [costajohnt/oss-autopilot](https://github.com/costajohnt/oss-autopilot) — 📇 ☁️ 🏠 🍎 🪟 🐧 - Open source contribution manager с PR tracking across repos, issue discovery, CI failure diagnosis, и maintainer
- [ddukbg/github-enterprise-mcp](https://github.com/ddukbg/github-enterprise-mcp) — 📇 ☁️ 🏠 - MCP-сервер для GitHub Enterprise API integration
- [gitea/gitea-mcp](https://gitea.com/gitea/gitea-mcp) — 🎖️ 🏎️ ☁️ 🏠 🍎 🪟 🐧 - Interactive с Gitea instances с MCP
- [github/github-mcp-server](https://github.com/github/github-mcp-server) — 📇 ☁️ - Official GitHub server для integration с repository management, PRs, issues, и more
- *…ещё 14 в каталоге →* [catalog/mcp-servers.md](./catalog/mcp-servers.md)
#### 💻 Developer tools

- [masondelan/selvedge](https://github.com/masondelan/selvedge) — Change tracking для AI-era codebases. AI agents call it to log structured change events (entity + diff + reasoning) before the session ends,
- [sapph1re/mcp-billing-gateway-sdk](https://github.com/sapph1re/mcp-billing-gateway-sdk) — 📇 ☁️ - Billing infrastructure для MCP server operators. Add Stripe subscriptions, per-call credits, tiered p
- [agenticempire/axint](https://github.com/agenticempire/axint) — Apple-native execution layer для AI agents. Compiles TypeScript to validated Swift — App Intents, SwiftUI views, WidgetKit widgets, и full
- [drhalto/agentmako](https://github.com/drhalto/agentmako) — Local-first codebase intelligence engine. Gives coding agents structured context packets, indexed code/schema facts, и diagnostics через MCP
- [marin1321/mcp-devtools](https://github.com/marin1321/mcp-devtools) — Production-grade MCP-сервер для secure access to local dev environments (filesystem, баз данных, processes, OpenAPI). включает
- *…ещё 35 в каталоге →* [catalog/mcp-servers.md](./catalog/mcp-servers.md)
#### ☁️ Облачные платформы

- [4everland/4everland-hosting-mcp](https://github.com/4everland/4everland-hosting-mcp) — 🎖️ 📇 🏠 🍎 🐧 - An MCP server implementation для 4EVERLAND Hosting enabling instant deployment of AI-generated code to decentralized storage networks like Greenfield, IPFS, и Arweave
- [aashari/mcp-server-aws-sso](https://github.com/aashari/mcp-server-aws-sso) — 📇 ☁️ 🏠 - AWS Single Sign-On (SSO) integration enabling AI systems to securely interact с AWS resources by initiating SSO login, listing accounts/roles, и executing AWS CLI commands через temporary credentials
- [alexbakers/mcp-ipfs](https://github.com/alexbakers/mcp-ipfs) — 📇 ☁️ - upload и manipulation of IPFS storage
- [aparajithn/agent-deploy-dashboard-mcp](https://github.com/aparajithn/agent-deploy-dashboard-mcp) — 🐍 ☁️ - Unified deployment dashboard MCP server across Vercel, Render, Railway, и Fly.io. 9 tools для deploy stat
- [arnstarn/mcp-server-spotinst](https://github.com/arnstarn/mcp-server-spotinst) — 🐍 ☁️ - MCP-сервер для Spot.io (Spotinst) API с 23 tools для managing Ocean clusters, VNGs, Elastigroups, costs, right
- *…ещё 20 в каталоге →* [catalog/mcp-servers.md](./catalog/mcp-servers.md)
#### 🌐 Браузерная автоматизация

- [34892002/bilibili-mcp-js](https://github.com/34892002/bilibili-mcp-js) — A MCP-сервер, который поддерживает searching для Bilibili content. Provides LangChain integration examples и test scripts
- [achiya-automation/safari-mcp](https://github.com/achiya-automation/safari-mcp) — Native Safari браузерная автоматизация для AI agents с 80+ tools. No Chrome dependency, optimized для Apple Silicon с 60% less CPU
- [agent-infra/mcp-server-browser](https://github.com/bytedance/UI-TARS-desktop/tree/main/packages/agent-infra/mcp-servers/browser) — браузерная автоматизация capabilities через Puppeteer, both support local и remote browser connection
- [aparajithn/agent-scraper-mcp](https://github.com/aparajithn/agent-scraper-mcp) — 🐍 ☁️ - веб-скрейпинг MCP-сервер для AI agents. 6 tools: clean content extraction, structured scraping с CSS selectors, full-pag
- [apireno/DOMShell](https://github.com/apireno/DOMShell) — Browse the web через filesystem commands (ls, cd, grep, click). 38 MCP tools map Chrome's Accessibility Tree to a virtual filesystem через a Chrome Extension
- *…ещё 15 в каталоге →* [catalog/mcp-servers.md](./catalog/mcp-servers.md)
#### 🔍 Поиск и извлечение данных

- [mrslbt/rippr](https://github.com/mrslbt/rippr) — YouTube transcript extraction для AI agents. Clean text, timestamps, или structured JSON из any video. No API keys required. Install через `npx rippr-mcp
- [0xdaef0f/job-searchoor](https://github.com/0xDAEF0F/job-searchoor) — An MCP-сервер для searching job listings с filters для date, keywords, remote work options, и more
- [hanselhansel/aeo-cli](https://github.com/hanselhansel/aeo-cli) — Audit URLs для AI crawler readiness — checks robots.txt, llms.txt, JSON-LD schema, и content density с 0-100 AEO scoring
- [Aas-ee/open-webSearch](https://github.com/Aas-ee/open-webSearch) — 🐍 📇 ☁️ - поиск в вебе через free multi-engine search (NO API KEYS REQUIRED) — поддерживает Bing, Baidu, DuckDuckGo, Brave, Exa, и CSDN
- [AceDataCloud/MCPSerp](https://github.com/AceDataCloud/SerpMCP) — 🐍 ☁️ - Google SERP search including web, images, news, maps, places, videos, и граф знаний results через Ace Data Cloud API
- *…ещё 20 в каталоге →* [catalog/mcp-servers.md](./catalog/mcp-servers.md)
#### 💬 Коммуникации (Slack, Discord, email)

- [AbdelStark/nostr-mcp](https://github.com/AbdelStark/nostr-mcp) — ☁️ - A Nostr MCP-сервер, который allows to interact с Nostr, enabling posting notes, и more
- [adhikasp/mcp-twikit](https://github.com/adhikasp/mcp-twikit) — 🐍 ☁️ - Interact с Twitter search и timeline
- [agentmail-toolkit/mcp](https://github.com/agentmail-to/agentmail-toolkit/tree/main/mcp) — An MCP-сервер для create inboxes on the fly to send, receive, и take actions on email. We aren't AI agents для email, but email для AI Agents
- [bababoi-bibilabu/agent-mq](https://github.com/bababoi-bibilabu/agent-mq) — 📇 ☁️ 🏠 - Message queue для AI coding assistants. Let AI agents (Claude Code, Cursor, Codex) send messages to each other across sessions и machin
- [Beltran12138/wecom-docs-mcp-server](https://github.com/Beltran12138/wecom-docs-mcp-server) — WeCom (Enterprise WeChat) document operations через MCP: create, read, и edit docs и Smart
- *…ещё 20 в каталоге →* [catalog/mcp-servers.md](./catalog/mcp-servers.md)
#### 📊 Мониторинг и observability

- [alilxxey/openobserve-community-mcp](https://github.com/alilxxey/openobserve-community-mcp) — Read-only MCP-сервер для OpenObserve Community Edition через REST API. Search logs, traces,
- [Alog/alog-mcp](https://github.com/saikiyusuke/alog-mcp) — 📇 ☁️ - AI agent activity logger & monitor MCP server с 20 tools. Post logs, create articles, manage social interactions, и monitor AI agent activities on the Alog платформа
- [avivsinai/langfuse-mcp](https://github.com/avivsinai/langfuse-mcp) — 🐍 ☁️ - Query Langfuse traces, debug exceptions, analyze sessions, и manage prompts. Full observability toolkit для LLM приложения
- [alimuratkuslu/byok-observability-mcp](https://github.com/alimuratkuslu/byok-observability-mcp) — 📇 🏠 ☁️ 🍎 🪟 🐧 - Comprehensive MCP-сервер для Grafana, Prometheus, Kafka UI, и Datadog с a secure "Brin
- [clamp-sh/mcp](https://github.com/clamp-sh/mcp) — 📇 ☁️ 🍎 🪟 🐧 - AI-native web analytics. Query pageviews, top pages, referrers, countries, devices, и custom events. Create conversion funnels и alerts
- *…ещё 20 в каталоге →* [catalog/mcp-servers.md](./catalog/mcp-servers.md)
#### 🔒 Безопасность

- [alexfleetcommander/agent-trust-stack-mcp](https://github.com/alexfleetcommander/agent-trust-stack-mcp) — 🐍 📇 ☁️ 🏠 🍎 🪟 🐧 - Cryptographic provenance, bilateral blind reputation scoring, и tamper-evident loggi
- [123Ergo/unphurl-mcp](https://github.com/123Ergo/unphurl-mcp) — 📇 ☁️ - URL intelligence для AI agents. 13 tools для security signals и data quality: redirect behaviour, brand impersonation detection, domain age, SSL v
- [13bm/GhidraMCP](https://github.com/13bm/GhidraMCP) — MCP-сервер для integrating Ghidra с AI assistants. This plugin enables binary analysis, providing tools для function inspection, decompilation, memory exploration, и import/export analysis через the Model Context Protocol
- [82ch/MCP-Dandan](https://github.com/82ch/MCP-Dandan) — real-time security framework для MCP servers that detects и blocks malicious AI agent behavior by analyzing tool call patterns и intent across multiple threat detection engines
- [MARUCIE/authbox](https://github.com/MARUCIE/authbox) — 📇 🏎️ 🏠 🍎 🪟 🐧 - Zero-knowledge password manager с MCP credential gateway. BIP-39 seed phrase recovery, deterministic passwords, policy-gated AI agent access (scope,
- *…ещё 25 в каталоге →* [catalog/mcp-servers.md](./catalog/mcp-servers.md)
#### 🧠 Знания и память

- [aidesignblueprint/integrations](https://github.com/aidesignblueprint/integrations) — 🐍 ☁️ - Read-only doctrine access для Agentic AI Blueprint — the industry standard reference для safe, observab
- [andreas-roennestad/openhive-mcp](https://github.com/andreas-roennestad/openhive-mcp) — 📇 ☁️ - Shared база знаний where AI agents search и post problem-solution pairs. Agents query before solving, post after resol
- [Auctalis/nocturnusai](https://github.com/Auctalis/nocturnusai) — Deterministic reasoning engine для AI agent context compression. Extracts structured facts с logical inference, proof chains, и truth
- [0xshellming/mcp-summarizer](https://github.com/0xshellming/mcp-summarizer) — 📕 ☁️ - AI Summarization MCP Server, поддержка multiple content types: Plain text, веб-страницы, PDF documents, EPUB books, HTML content
- [20alexl/claude-engram](https://github.com/20alexl/claude-engram) — Persistent memory и session intelligence для Claude Code. Auto-tracks mistakes, decisions, и context через hooks. Mines session histo
- *…ещё 20 в каталоге →* [catalog/mcp-servers.md](./catalog/mcp-servers.md)
#### 🔗 Агрегаторы и hub-MCP

- [1mcp/agent](https://github.com/1mcp-app/agent) — 📇 ☁️ 🏠 🍎 🪟 🐧 - A unified Model Context Protocol server implementation that aggregates multiple MCP servers into one
- [8randonpickart5/alderpost-mcp](https://github.com/8randonpickart5/alderpost-mcp) — 📇 ☁️ - 8 bundled intelligence endpoints (security, company, threat, compliance, sales, sports, property, health) через x402 micropaymen
- [tadas-github/a2asearch-mcp](https://github.com/tadas-github/a2asearch-mcp) — 📇 ☁️ - MCP-сервер для search 4,800+ MCP servers, AI agents, CLI tools и agent skills. Install: `npx -y a2asearch-mcp`. Ask Cl
- [Aganium/agenium](https://github.com/Aganium/agenium) — 📇 ☁️ 🍎 🪟 🐧 - Bridge any MCP-сервер для the agent:// network — DNS-like identity, discovery, и trust для AI agents. Makes your tools discoverable и callable by other agents через `agent://` URIs с mTLS, trust scores, и capability search
- [elisymlabs/elisym](https://github.com/elisymlabs/elisym) — 📇 ☁️ 🍎 🪟 🐧 - AI agent discovery и marketplace on Nostr с Solana payments (SOL, USDC). NIP-89 discovery, NIP-90 jobs, NIP-44 v2 encryption, on-chain
- *…ещё 15 в каталоге →* [catalog/mcp-servers.md](./catalog/mcp-servers.md)
#### 🤖 Coding-агенты

- [agent-blueprint/mcp-server](https://github.com/agent-blueprint/mcp-server) — 📇 ☁️ - 8 MCP tools для exploring и downloading AI agent blueprints. List blueprints, get summaries, download full Agent Skil
- [agentic-mcp-tools/owlex](https://github.com/agentic-mcp-tools/owlex) — AI council server: query CLI agents (Claude Code, Codex, Gemini, и OpenCode) in parallel с deliberation rounds
- [alpadalar/netops-mcp](https://github.com/alpadalar/netops-mcp) — Comprehensive DevOps и networking MCP-сервер, предоставляющий standardized access to essential infrastructure tools. Features network monitoring, system diagnostics, automation workflow-процессы, и infrastructure management с AI-powered operational insights
- [askbudi/roundtable](https://github.com/askbudi/roundtable) — Zero-configuration MCP-сервер, который unifies multiple AI coding assistants (Claude Code, Cursor, Codex) through intelligent auto-discovery и standardized интерфейс. Essential infrastructure для autonomous agent development и multi-AI collaboration workflow-процессы
- [automateyournetwork/pyATS_MCP](https://github.com/automateyournetwork/pyATS_MCP) — Cisco pyATS server enabling structured, model-driven interaction с network devices
- *…ещё 15 в каталоге →* [catalog/mcp-servers.md](./catalog/mcp-servers.md)
#### ▶️ Выполнение кода и sandbox

- [alfonsograziano/node-code-sandbox-mcp](https://github.com/alfonsograziano/node-code-sandbox-mcp) — 📇 🏠 – A Node.js MCP-сервер, который spins up isolated Docker-based sandboxes для executing JavaScript snippets с on-the-fly npm dependency installation и clean teardown
- [alvii147/piston-mcp](https://github.com/alvii147/piston-mcp) — 🐍 ☁️ 🐧 🍎 🪟 - MCP-сервер, который lets LLMs execute code through the Piston remote выполнение кода engine, с a zero-config `uv` setup и a ready-to-use Claude Desktop config example
- [asif-nvc/e2b-sandbox-mcp](https://github.com/asif-nvc/e2b-sandbox-mcp) — 📇 ☁️ 🍎 🪟 🐧 - Connect Claude Code с E2B cloud sandboxes — 29 tools для creating isolated Linux VMs, cloning repos, running command
- [ckanthony/openapi-mcp](https://github.com/ckanthony/openapi-mcp) — 🏎️ ☁️ - OpenAPI-MCP: Dockerized MCP-сервер для allow your AI agent to access any API с existing API docs
- [dagger/container-use](https://github.com/dagger/container-use) — 🏎️ 🏠 🐧 🍎 🪟 - Containerized environments для coding agents. Multiple agents can work independently, isolated in fresh containers и git branches. No conflicts, many experiments. Full execution history, terminal access to agent environments, git workflow. Any agent/model/infra stack
- *…ещё 7 в каталоге →* [catalog/mcp-servers.md](./catalog/mcp-servers.md)
#### 📅 Рабочие инструменты

- [temporal-cortex/mcp](https://github.com/temporal-cortex/mcp) — 🦀 ☁️ 🏠 - AI-native calendar middleware для scheduling, availability, и conflict-free booking across Google Calendar, Outlook, и CalDAV. 15 tools acros
- [Agentled/mcp-server](https://github.com/Agentled/mcp-server) — 📇 ☁️ - AI-native workflow orchestration с long-term memory, 100+ integrations, и unified credits. 32 MCP tools для building и running intell
- [6figr-com/jobgpt-mcp-server](https://github.com/6figr-com/jobgpt-mcp-server) — 📇 ☁️ 🏠 🍎 🪟 🐧 - MCP-сервер для [JobGPT](https://6figr.com/jobgpt) — search jobs, auto-apply, generate tailored resumes, track app
- [backloghq/backlog](https://github.com/backloghq/backlog) — Persistent, cross-session task management для Claude Code. 24 MCP tools, 7 skills, и agent coordination с event-sourced storage и per-
- [bivex/kanboard-mcp](https://github.com/bivex/kanboard-mcp) — 🏎️ ☁️ 🏠 - A Model Context Protocol (MCP) server written in Go that empowers AI agents и Large Language Models (LLMs) to seamlessly interact с Kanboard. It transforms естественный язык commands into Kanboard API calls, enabling intelligent автоматизация project, task, и user management, streaml
- *…ещё 15 в каталоге →* [catalog/mcp-servers.md](./catalog/mcp-servers.md)
#### 📂 Файловые системы

- [8b-is/smart-tree](https://github.com/8b-is/smart-tree) — AI-native directory visualization с semantic analysis, ultra-compressed formats для AI consumption, и 10x token reduction. поддерживает quantum-semantic mode с intelligent file categorization
- [box/mcp-server-box-remote](https://github.com/box/mcp-server-box-remote/) — 🎖️ ☁️ - The Box MCP server allows third party AI agents to securely и seamlessly access Box content и use tools таких как search, asking questions из files и folders, и data extraction
- [ckanthony/Chisel](https://github.com/ckanthony/Chisel) — 🦀 🏠 🍎 🐧 ☁️ - Reduce context usage on file use. Send only unified diffs вместо full files (up to 20-100× fewer tokens), и read large files с targeted `grep`
- [cyberchitta/llm-context.py](https://github.com/cyberchitta/llm-context.py) — Share code context с LLMs через MCP или clipboard
- [ebbfijsf/agent-reader](https://github.com/ebbfijsf/agent-reader) — Document beautifier для AI agents. Converts Markdown to styled webpages (с sidebar TOC), Word, PDF, и full-screen image slideshows. Z
- *…ещё 10 в каталоге →* [catalog/mcp-servers.md](./catalog/mcp-servers.md)
#### ⌨️ CLI и shell

- [danmartuszewski/hop](https://github.com/danmartuszewski/hop) — 🏎️ 🖥️ - Fast SSH connection manager с TUI dashboard и MCP-сервер для discovering, searching, и executing commands on remote hosts
- [nvms/tui-mcp](https://github.com/nvms/tui-mcp) — What Chrome DevTools MCP is для browser, tui-mcp is для terminal. Launch, screenshot, и interact с any TUI app
- [raychao-oao/pty-mcp](https://github.com/raychao-oao/pty-mcp) — 🏎️ 🏠 🍎 🐧 - Interactive PTY sessions для AI agents — local shells, SSH с persistent sessions (ai-tmux daemon для attach/detach), и serial ports. Single Go
- [ferodrigop/forge](https://github.com/ferodrigop/forge) — Terminal MCP-сервер для AI coding agents с persistent PTY sessions, ring-buffer incremental reads, headless xterm screen capture, multi-agent orchestration, a
- [WhenLabs-org/when](https://github.com/WhenLabs-org/when) — Developer toolkit: auto-detect stack для AI context files, catch port conflicts, validate .env schemas, spot docs drift, audit dependency lic
- *…ещё 1 в каталоге →* [catalog/mcp-servers.md](./catalog/mcp-servers.md)
#### 🖥️ OS-автоматизация

- [sbuysse/gnome-desktop-mcp](https://github.com/sbuysse/gnome-desktop-mcp) — GNOME desktop automation для AI agents. 30 tools через D-Bus: screenshots, window management, mouse/keyboard injection, clipboard,
- [dimpagk92/cellar](https://github.com/dimpagk92/cellar) — Hybrid computer-use runtime. Fuses accessibility tree + Chrome DevTools Protocol + vision into structured context с per-element confidence. 4

#### 🎥 Мультимедиа

- [06ketan/slideshot](https://github.com/06ketan/slideshot) — Convert HTML to PDF/PNG/WebP/PPTX slide carousels с 11 themes (LinkedIn, Instagram, pitch decks, infographics). Pixel-perfect Puppeteer re
- [1000ri-jp/atsurae](https://github.com/1000ri-jp/atsurae) — 🐍 ☁️ 🍎 🪟 🐧 - AI-powered video editing MCP server с 10 tools для timeline editing, 5-layer compositing, semantic operations, и FFmpeg rendering (1920x1080, 30fps H.264+AAC)
- [AceDataCloud/MCPSuno](https://github.com/AceDataCloud/SunoMCP) — 🐍 ☁️ - Suno AI music generation, lyrics, covers, и vocal extraction через Ace Data Cloud API
- [agenticdecks/deckrun-mcp](https://github.com/agenticdecks/deckrun-mcp) — 🐍 ☁️ - Generate presentation PDFs, narrated videos, и MP3 audio из Markdown. Free tier requires no API key или local install — add a URL to yo
- [AIDC-AI/Pixelle-MCP](https://github.com/AIDC-AI/Pixelle-MCP) — 🐍 📇 🏠 🎥 🔊 🖼️ - An omnimodal AIGC framework that seamlessly converts ComfyUI workflow-процессы into MCP tools с zero code, enabling full-modal поддержка Text, Image, Sound, и Video generation с Chainlit-based web интерфейс
- *…ещё 10 в каталоге →* [catalog/mcp-servers.md](./catalog/mcp-servers.md)
#### 🧮 Data science

- [abhiphile/fermat-mcp](https://github.com/abhiphile/fermat-mcp) — The ultimate math engine unifying SymPy, NumPy & Matplotlib in one powerful server. Perfect для developers & researchers needing symbolic algebra, numerical computing, и data visualization
- [arrismo/kaggle-mcp](https://github.com/arrismo/kaggle-mcp) — 🐍 ☁️ - Connects to Kaggle, ability to download и analyze datasets
- [avisangle/calculator-server](https://github.com/avisangle/calculator-server) — 🏎️ 🏠 - A comprehensive Go-based MCP-сервер для mathematical computations, implementing 13 mathematical tools across basic arithmetic, advanced functions, statistical analysis, unit conversions, и financial calculations
- [bradleylab/stella-mcp](https://github.com/bradleylab/stella-mcp) — Create, read, validate, и save Stella system dynamics models (.stmx files in XMILE format) для scientific simulation и modeling
- [BlackMount-ai/blackmount-nlp-mcp](https://github.com/BlackMount-ai/blackmount-nlp-mcp) — Deterministic local text analysis: sentiment, readability scoring, keyword extraction, text simi
- *…ещё 10 в каталоге →* [catalog/mcp-servers.md](./catalog/mcp-servers.md)
#### 📊 Data-платформы

- [1luvc0d3/metabase-mcp](https://github.com/1luvc0d3/metabase-mcp) — MCP server connecting Claude to Metabase с 28 tools для естественный язык data analysis, dashboard management, SQL queries, и autom
- [carrierone/verilexdata-mcp](https://github.com/carrierone/verilexdata-mcp) — 📇 ☁️ - 20 structured datasets (NPI healthcare, SEC filings, OFAC sanctions, crypto whales, Polymarket signals, patents, econom
- [alkemiai/alkemi-mcp](https://github.com/alkemi-ai/alkemi-mcp) — 📇 ☁️ - MCP-сервер для естественный язык querying of Snowflake, Google BigQuery, и DataBricks Data Products through Alkemi.ai
- [avisangle/method-crm-mcp](https://github.com/avisangle/method-crm-mcp) — 🐍 ☁️ 🏠 🍎 🪟 🐧 - Production-ready MCP-сервер для Method CRM API integration с 20 comprehensive tools для tables, files, users, events, и API key management. Features rate limiting, retry logic, и dual transport support (stdio/HTTP)
- [aywengo/kafka-schema-reg-mcp](https://github.com/aywengo/kafka-schema-reg-mcp) — 🐍 ☁️ 🏠 🍎 🪟 🐧 - Comprehensive Kafka Schema Registry MCP server с 48 tools для multi-registry management, schema migration, и enterprise features
- *…ещё 7 в каталоге →* [catalog/mcp-servers.md](./catalog/mcp-servers.md)
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
- *…ещё 10 в каталоге →* [catalog/mcp-servers.md](./catalog/mcp-servers.md)
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
- *…ещё 3 в каталоге →* [catalog/mcp-servers.md](./catalog/mcp-servers.md)
#### 📱 Социальные сети

- [06ketan/substack-ops](https://github.com/06ketan/substack-ops) — Substack с **zero AI API keys**. 26 tools (posts, notes, comments, replies, reactions, restacks). Host LLM drafts через `propose_reply` →
- [anwerj/youtube-uploader-mcp](https://github.com/anwerj/youtube-uploader-mcp) — 🏎️ ☁️ - AI‑powered YouTube uploader—no CLI, no YouTube Studio. Uploade videos directly из MCP clients с all AI capabilities
- [arjun1194/insta-mcp](https://github.com/arjun1194/insta-mcp) — Instagram MCP-сервер для analytics и insights. Get account overviews, posts, followers, following lists, post insights, и search для users, hashtags, или places
- [BelleKou/mcp-viral-transformer](https://github.com/BelleKou/mcp-viral-transformer) — Turn URLs into viral posts через "remake" command
- [checkra1neth/xbird](https://github.com/checkra1neth/xbird-skill) — 📇 ☁️ 🏠 🍎 🪟 🐧 - Twitter/X MCP server с 34 tools — post tweets, search, read timelines, manage engagement, upload media. No API keys needed, uses browser cookies. Pay per call из $0.001 через x402 micropayments
- *…ещё 10 в каталоге →* [catalog/mcp-servers.md](./catalog/mcp-servers.md)
#### 🎧 Support & service

- [aikts/yandex-tracker-mcp](https://github.com/aikts/yandex-tracker-mcp) — 🐍 ☁️ 🏠 - MCP-сервер для Yandex Tracker. Provides tools для searching и retrieving information about issues, queues, users
- [Berckan/bugherd-mcp](https://github.com/Berckan/bugherd-mcp) — 📇 ☁️ - MCP-сервер для BugHerd bug tracking. List projects, view tasks с filtering by status/priority/tags, get task details, и read comments
- [effytech/freshdesk-mcp](https://github.com/effytech/freshdesk_mcp) — 🐍 ☁️ - MCP-сервер, который integrates с Freshdesk, enabling AI models to interact с Freshdesk modules и perform various support operations
- [incentivai/quickchat-ai-mcp](https://github.com/incentivai/quickchat-ai-mcp) — 🐍 🏠 ☁️ - Launch your conversational Quickchat AI agent as an MCP to give AI apps real-time access to its база знаний и conversational capabilities
- [nguyenvanduocit/jira-mcp](https://github.com/nguyenvanduocit/jira-mcp) — 🏎️ ☁️ - A Go-based MCP connector для Jira that enables AI assistants like Claude to interact с Atlassian Jira. This tool provides a seamless интерфейс для AI models to perform common Jira operations including issue management, sprint planning, и workflow transitions
- *…ещё 3 в каталоге →* [catalog/mcp-servers.md](./catalog/mcp-servers.md)
#### 🛒 E-commerce

- [agentlux/agentlux-mcp](https://github.com/agentlux/agentlux-mcp) — 📇 ☁️ 🍎 🪟 🐧 - Agent marketplace и сервисы MCP-сервер для AgentLux. Browse marketplace items, manage agent identity, creator workflow-процессы, serv
- [mrslbt/rakuten-mcp](https://github.com/mrslbt/rakuten-mcp) — 📇 ☁️ - Rakuten API integration для product search, hotel и travel booking, и recipe lookup across Japan's largest e-commerce платформа. Install через
- [laundromatic/shopgraph](https://github.com/laundromatic/shopgraph) — 📇 ☁️ - Structured product data из the open web — Schema.org + AI extraction для e-commerce enrichment. Pay per call через Stripe. [shopgra
- [lofder/dsers-mcp-product](https://github.com/lofder/dsers-mcp-product) — 📇 ☁️ - Automate AliExpress/Alibaba dropshipping product import to Shopify или Wix через DSers. Bulk import, variant editing, pricing rules, an
- [OFODevelopment/cerebrochain-mcp-server](https://github.com/OFODevelopment/cerebrochain-mcp-server) — 📇 ☁️ - Supply chain & logistics intelligence — rate shopping across 85+ carriers, inventor
- *…ещё 3 в каталоге →* [catalog/mcp-servers.md](./catalog/mcp-servers.md)
#### 💰 Финансы и Fintech

- [mrslbt/xendit-mcp](https://github.com/mrslbt/xendit-mcp) — 📇 ☁️ - Xendit payment gateway для Southeast Asia. Invoices, disbursements, balance checks, и bank transfers across Indonesia, Philippines, Thailand, Vi
- [@arbitova/mcp-server](https://github.com/jiayuanliang0716-max/Arbitova) — 📇 ☁️ - Non-custodial on-chain escrow + AI dispute arbitration для agent-to-agent USDC payments on Base. Seven tools c
- [@asterpay/mcp-server](https://github.com/timolein74/asterpay-mcp-server) — 📇 ☁️ - EUR settlement для AI agents через x402 protocol. Market data, AI tools, crypto analytics — pay-per-call in USDC on Base
- [@czagents/cnb](https://github.com/martinhavel/cz-agents-mcp) — 📇 ☁️ 🏠 🍎 🪟 🐧 - Czech National Bank (ČNB) daily FX rates: fetch official CZK exchange rates, convert между currencies, fetch his
- [@frihet/mcp-server](https://github.com/Frihet-io/frihet-mcp) — 📇 ☁️ - AI-native business management — invoices, expenses, clients, products, и quotes. 31 tools для Claude, Cursor, Windsurf, и Cline
- *…ещё 20 в каталоге →* [catalog/mcp-servers.md](./catalog/mcp-servers.md)
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
- *…ещё 5 в каталоге →* [catalog/mcp-servers.md](./catalog/mcp-servers.md)
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
