<!--
README.md is generated from this template + data/*.json.
Edit this file or data/*.json, then run: node scripts/build-readme.mjs
CI gate: node scripts/build-readme.mjs --check
-->

# Claude Code Handbook на русском [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

> [Claude Code](https://docs.claude.com/en/docs/claude-code/overview) — CLI-агент Anthropic для разработки в терминале с поддержкой MCP, hooks и автономных субагентов.

Ежедневные разборы и обзоры релизов — в Telegram [@cc_consultant](https://t.me/cc_consultant). Связь и консультации: [@sfrangulov](https://t.me/sfrangulov).

**Полный сырой каталог (1411 записей по типам)** — в [catalog/](./catalog/README.md). Здесь — курируемая подборка: только то, что я реально применяю в клиентских проектах либо что массово проверено сообществом по install-count.

> 📄 **[Шпаргалка на 1 страницу A4 →](./cheatsheet/)** Все горячие клавиши, слэш-команды, MCP, память, workflows, skills/agents и CLI-флаги на одном листе. Скачать [готовый PDF](./cheatsheet/cheatsheet.pdf) или открыть [index.html](./cheatsheet/index.html) → `⌘P`.

---

## Содержание

- [Quickstart](#quickstart-за-10-минут)
- [Skills](#skills) — переиспользуемые наборы инструкций
- [Sub-agents](#sub-agents) — параллельные агенты со своим контекстом
- [Оркестрация](#оркестрация-и-параллельные-агенты) — внешние тулы для нескольких Claude разом
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

1. [Шпаргалка на одну страницу](./cheatsheet/) — печатный PDF под рукой: горячие клавиши, слэш-команды, MCP, память, workflows, CLI-флаги. A4 portrait, 3 колонки. Скачать готовый [cheatsheet.pdf](./cheatsheet/cheatsheet.pdf) или открыть [index.html](./cheatsheet/index.html) и `⌘P`.
2. [Топ-15 скиллов по install-count](#топ-15-скиллов-skillssh) — то, что 100K+ людей реально установили.
3. [Hooks](#hooks) — поставь хотя бы `pre-commit-secrets` сразу: спасает от утечки API-ключей через git-коммит, который агент может сделать за 30 секунд.
4. [Шаблоны CLAUDE.md](#claudemd-шаблоны) — три production-шаблона: Next.js, Python/FastAPI, Terraform.
5. [Гайды на русском](#гайды-и-контент-на-русском) — 18 статей с Habr + 11 YouTube-курсов + DTF.

---

## Skills

Skills — переиспользуемые наборы инструкций, которые Claude подгружает по триггеру. Один скилл = одна задача (TDD-цикл, code-review, performance-аудит). См. [официальный гайд](https://docs.claude.com/en/docs/claude-code/skills).

> 📂 Полный каталог: **[162 записи →](./catalog/skills.md)**

### Топ-15 скиллов (skills.sh)

Ранжированы по install-count из [skills.sh](https://skills.sh) — реальной телеметрии маркетплейса, не звёздам. Описания в третьей колонке — мой ответ на «когда это реально нужно», а не пересказ официального README. Установка одной командой: `npx skills add <owner/repo@skill>`.

| Скилл | Зачем и когда юзать | Установок |
|---|---|---:|
| [anthropics/skills@frontend-design](https://skills.sh/anthropics/skills/frontend-design) | Перестраивает дизайн в пользу bold-решений вместо дефолтных «AI slop»-карточек. Триггерь когда видишь, что вышло generic. React + Tailwind. | **405K** |
| [vercel-labs/agent-skills@vercel-react-best-practices](https://skills.sh/vercel-labs/agent-skills/vercel-react-best-practices) | React/Next.js — производительность по гайду Vercel: правильные границы между клиентом и RSC, кэширование, оптимизация размера бандла. Подключай в любом Next.js-проекте. | **395K** |
| [vercel-labs/agent-skills@web-design-guidelines](https://skills.sh/vercel-labs/agent-skills/web-design-guidelines) | Чек-лист соответствия Web Interface Guidelines: a11y, hit-targets, focus rings. Запускай как ревью UI до коммита. | **316K** |
| [microsoft/azure-skills@azure-deploy](https://skills.sh/microsoft/azure-skills/azure-deploy) | Деплой в Azure: ARM/Bicep, App Service, Container Apps. Ставь только если работаешь в Azure-стеке — иначе мёртвый груз в контексте. | **312K** |
| [obra/superpowers@brainstorming](https://skills.sh/obra/superpowers/brainstorming) | Структурированный брейншторм с гипотезами и матрицей вариантов **до** начала кода. Включай когда задача расплывчатая («сделай auth»). | **155K** |
| [xixu-me/skills@github-actions-docs](https://skills.sh/xixu-me/skills/github-actions-docs) | Свежая официальная дока GitHub Actions: синтаксис, runners, OIDC, troubleshooting. Когда пишешь workflow и не хочешь искать в десяти вкладках. | **131K** |
| [vercel-labs/agent-skills@vercel-react-native-skills](https://skills.sh/vercel-labs/agent-skills/vercel-react-native-skills) | React Native по гайду Vercel: снимает с агента половину типичных багов в RN-проектах. | **116K** |
| [mattpocock/skills@tdd](https://skills.sh/mattpocock/skills/tdd) | TDD-цикл (red-green-refactor) с дисциплиной — не даёт агенту писать код раньше тестов. От Matt Pocock. | **96K** |
| [obra/superpowers@systematic-debugging](https://skills.sh/obra/superpowers/systematic-debugging) | Дисциплина отладки: гипотезы → изоляция → root cause. Прерывает цикл бесконечных правок наугад. | **94K** |
| [arvindrk/extract-design-system@extract-design-system](https://skills.sh/arvindrk/extract-design-system/extract-design-system) | Скан существующего сайта → структурированный design-system (токены, паттерны, типографика). Для редизайна или нового проекта на базе старого. | **93K** |
| [obra/superpowers@requesting-code-review](https://skills.sh/obra/superpowers/requesting-code-review) | Запросить ревью у субагента **перед** коммитом. Эффективно когда работаешь автономно без живого ревьюера. | **82K** |
| [mattpocock/skills@grill-with-docs](https://skills.sh/mattpocock/skills/grill-with-docs) | «Допрашивай» документацию через find/grep — заменяет догадки точными цитатами. Особенно ценно для библиотек, где знание Claude устарело. | **79K** |
| [obra/superpowers@subagent-driven-development](https://skills.sh/obra/superpowers/subagent-driven-development) | Делегирование независимых задач субагентам параллельно (feature + tests, frontend + backend). | **70K** |
| [anthropics/skills@webapp-testing](https://skills.sh/anthropics/skills/webapp-testing) | Тестирование веб-приложений через Playwright. Заменяет «руками протыкать в браузере» на автоматизацию. | **68K** |
| [obra/superpowers@verification-before-completion](https://skills.sh/obra/superpowers/verification-before-completion) | Проверить что задача реально сделана (запустить тесты, открыть страницу), до отчёта «готово». Антидот к false-positive отчётам. | **68K** |

**Источник:** [skills.sh leaderboard](https://skills.sh) — числа быстро растут, актуальны на момент последнего обновления. Автообновление: `node scripts/refresh-top-skills.mjs --write && node scripts/build-readme.mjs`.

**Совет практика:** ставь `obra/superpowers` целиком сразу — самая полная коллекция soft-скиллов (TDD, отладка, планирование, брейншторм, код-ревью). Пять из топ-15 — оттуда. Дальше добавь скиллы под свой стек (Vercel React, Convex, Firebase, Supabase, Azure). Не ставь всё подряд — каждый скилл съедает 3–5K токенов на bootstrap.

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
- [trailofbits/skills](https://github.com/trailofbits/skills) — Security-скиллы от Trail of Bits: статический анализ через CodeQL/Semgrep, аудит кода, поиск уязвимостей.
- [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) — Vercel Engineering: производительность React, web-guidelines, React Native, деплой на Vercel.
- [supabase/agent-skills](https://github.com/supabase/agent-skills) — Скиллы для Supabase и PostgreSQL.
- [firebase/agent-skills](https://github.com/firebase/agent-skills) — Firebase и Firestore, аудит security-rules.
- [microsoft/azure-skills](https://github.com/microsoft/azure-skills) — Деплой в Azure и best-practices от Microsoft.
- [get-convex/agent-skills](https://github.com/get-convex/agent-skills) — Convex — реактивный бэкенд.
- [expo/skills](https://github.com/expo/skills) — Expo. 25K+ установок.
- [shadcn/ui skills](https://ui.shadcn.com/docs/skills) — Контекст по компонентам shadcn и принудительное применение паттернов.
- [travisvn/awesome-claude-skills](https://github.com/travisvn/awesome-claude-skills) — 12k⭐, актуальный куратор скиллов.
- [karanb192/awesome-claude-skills](https://github.com/karanb192/awesome-claude-skills) — 50+ проверенных скиллов с разбивкой по типам.

### Узкоспециализированные

- [conorluddy/ios-simulator-skill](https://github.com/conorluddy/ios-simulator-skill) — Сборка iOS-приложений, навигация по симулятору, тесты.
- [lackeyjb/playwright-skill](https://github.com/lackeyjb/playwright-skill) — Браузерная автоматизация через Playwright.
- [chrisvoncsefalvay/claude-d3js-skill](https://github.com/chrisvoncsefalvay/claude-d3js-skill) — Визуализации в d3.js.
- [K-Dense-AI/claude-scientific-skills](https://github.com/K-Dense-AI/claude-scientific-skills) — Научные базы данных и библиотеки.
- [jthack/ffuf_claude_skill](https://github.com/jthack/ffuf_claude_skill) — Fuzzing через `ffuf` при пентесте.
- [yusufkaraaslan/Skill_Seekers](https://github.com/yusufkaraaslan/Skill_Seekers) — Превращает сайт документации в Claude Skill.
- [alonw0/web-asset-generator](https://github.com/alonw0/web-asset-generator) — Favicon, app-иконки, OG-картинки.

### Локальные примеры

- [examples/skills/review-staged-changes/](./examples/skills/review-staged-changes/SKILL.md) — Проверка staged-изменений перед коммитом.

---

## Sub-agents

Sub-agent — отдельный экземпляр Claude со своим контекстом, который выполняет подзадачу и возвращает один итоговый ответ. Полезно для read-only исследования и параллельных задач. См. [официальную доку](https://docs.claude.com/en/docs/claude-code/sub-agents).

> 📂 Полный каталог: **[160 записей →](./catalog/subagents.md)**

### Production-коллекции

| Репозиторий | Что внутри |
|---|---|
| [VoltAgent/awesome-claude-code-subagents](https://github.com/VoltAgent/awesome-claude-code-subagents) | **144 субагента** по 10 категориям, 19k⭐. Установка: `claude plugin marketplace add VoltAgent/awesome-claude-code-subagents`. |
| [obra/superpowers](https://github.com/obra/superpowers) | 20+ скиллов и субагентов: TDD, отладка, планирование, брейншторм, ревью. Самая популярная коллекция. |
| [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | 100+ субагентов в едином формате промпта, мультиязычные, MIT. |
| [wshobson/agents](https://github.com/wshobson/agents) | 48 production-агентов с паттернами оркестрации и продвинутыми workflow. |
| [vijaythecoder/awesome-claude-agents](https://github.com/vijaythecoder/awesome-claude-agents) | 26 агентов формата AI-команды: Tech Lead, Analyst, доменные специалисты. |
| [davepoon/claude-code-subagents-collection](https://github.com/davepoon/claude-code-subagents-collection) | 36 субагентов с авто-делегированием и гайдом по best-practices. |
| [rohitg00/awesome-claude-code-toolkit](https://github.com/rohitg00/awesome-claude-code-toolkit) | 135 агентов, 35 скиллов и 42 команды в одном тулките. |
| [peterkrueck/Claude-Code-Development-Kit](https://github.com/peterkrueck/Claude-Code-Development-Kit) | Мета-репозиторий: документация, multi-agent шаблоны, hooks, MCP-серверы. |

### 144 субагента VoltAgent — оглавление коллекции

Каждый — отдельный `.md`-файл с YAML-фронтматтером, ставится в `.claude/agents/`.

| Категория | Внутри | Когда брать |
|---|---|---|
| [🛠️ Core development (11)](https://github.com/VoltAgent/awesome-claude-code-subagents/tree/main/categories/01-core-development) | API-дизайнер, frontend/backend/fullstack, mobile, GraphQL-архитектор, WebSocket-инженер | Когда делегируешь узкие задачи («спроектируй GraphQL-схему») |
| [🔤 Language specialists (30)](https://github.com/VoltAgent/awesome-claude-code-subagents/tree/main/categories/02-language-specialists) | python-pro, java-architect, rust-engineer, golang-pro, php-pro, typescript-pro и 24 ещё | Изолируют контекст, когда основной агент уходит в read-heavy работу по одному языку |
| [☁️ Infrastructure (16)](https://github.com/VoltAgent/awesome-claude-code-subagents/tree/main/categories/03-infrastructure) | cloud-architect, devops, kubernetes, terraform, SRE, security-engineer | Для DevOps-задач, особенно если есть Terraform или K8s |
| [✅ Quality & security (16)](https://github.com/VoltAgent/awesome-claude-code-subagents/tree/main/categories/04-quality-security) | code-reviewer, debugger, penetration-tester, performance-engineer, a11y-tester | Перед PR — `code-reviewer` как блокирующий шаг |
| [🧠 Data & AI (13)](https://github.com/VoltAgent/awesome-claude-code-subagents/tree/main/categories/05-data-ai) | ML/MLOps, data-scientist, llm-architect, prompt-engineer, NLP, postgres-pro | Для data-инфры или ML-pipelines |
| [⚡ Developer experience (14)](https://github.com/VoltAgent/awesome-claude-code-subagents/tree/main/categories/06-developer-experience) | cli-developer, mcp-developer, refactoring-specialist, build-engineer, documentation-engineer | Внутренние инструменты и DX-задачи |
| [🎯 Specialized domains (13)](https://github.com/VoltAgent/awesome-claude-code-subagents/tree/main/categories/07-specialized-domains) | blockchain, fintech, gamedev, IoT, embedded, mobile-app-builder | Когда работаешь в нишевой области |
| [💼 Business & product (12)](https://github.com/VoltAgent/awesome-claude-code-subagents/tree/main/categories/08-business-product) | PM, scrum-master, technical-writer, UX-researcher, sales-engineer | Не-кодовые задачи: PRD, roadmap, работа с клиентами |
| [🎭 Meta & orchestration (11)](https://github.com/VoltAgent/awesome-claude-code-subagents/tree/main/categories/09-meta-orchestration) | agent-organizer, context-manager, multi-agent-coordinator, workflow-orchestrator | Координация нескольких субагентов параллельно |
| [🔬 Research & analysis (8)](https://github.com/VoltAgent/awesome-claude-code-subagents/tree/main/categories/10-research-analysis) | competitive-analyst, market-researcher, search-specialist, trend-analyst | Discovery-фаза продукта или анализ конкурентов |

---

## Оркестрация и параллельные агенты

Когда одного Claude мало: внешние тулы для запуска нескольких агентов параллельно, autonomous-циклов «запустил-и-ушёл» и kanban/GUI поверх Claude Code. Sub-agents (выше) — встроенная фича Claude в рамках одной сессии. Этот раздел — про **внешние оркестраторы**, которые запускают несколько независимых сессий Claude (или Claude + Codex + Gemini) и координируют их через worktrees, kanban или audit-log.

Три семьи паттернов:

- **Background runners** — настоящие фоновые процессы. Агент работает без терминала, тесты-гейты, авто-коммиты. Под «забыл и ушёл».
- **Parallel GUI / kanban** — desktop или TUI-доска с множеством параллельных сессий в git worktrees. Под визуальный контроль и сравнение подходов.
- **Autonomous loops (Ralph-pattern)** — цикл «работай пока не готово» с intelligent exit detection. Под однотипные многошаговые задачи.

> **Правило практика:** одного оркестратора достаточно. Не комбинируй — все три семьи конфликтуют за worktrees, лимиты API и runtime. Выбери по таблице ниже.

### Сравнение под соло-разработчика

Звёзды и категории — на 2026-05-25, GitHub API. Сложность — субъективная оценка времени до первого полезного запуска.

| Тулза | ⭐ | «Забыл и ушёл» | Сложность | Под кого |
|---|---:|---|---|---|
| [steveyegge/gastown](https://github.com/steveyegge/gastown) | 15.6k | ✅ настоящий | Высокая | Overkill для одиночки, под сложные multi-agent сценарии |
| [chernistry/bernstein](https://github.com/chernistry/bernstein) | 0.5k | ✅ настоящий | Средняя | Соло-разработчик с требованием audit-grade лога |
| [ruvnet/claude-flow](https://github.com/ruvnet/claude-flow) | 55k | ✅ swarm | Высокая | Команды и enterprise, не для одиночки |
| [BloopAI/vibe-kanban](https://github.com/BloopAI/vibe-kanban) | 26.5k | ❌ полу-ручное | Низкая | Простая параллельность через kanban-доску |
| [smtg-ai/claude-squad](https://github.com/smtg-ai/claude-squad) | 7.6k | ❌ ручное | Низкая | Несколько Claude-сессий в TUI |
| [stravu/crystal (Nimbalyst)](https://github.com/stravu/crystal) | 3.1k | ❌ полу-ручное | Низкая | Desktop GUI для сравнения подходов |
| [manaflow-ai/cmux](https://github.com/manaflow-ai/cmux) | 19.4k | ❌ ручное | Низкая | macOS-юзеру с табами и push-нотификациями |
| [generalaction/emdash](https://github.com/generalaction/emdash) | 4.6k | ❌ полу-ручное | Низкая | Open-source альтернатива vibe-kanban |
| [frankbria/ralph-claude-code](https://github.com/frankbria/ralph-claude-code) | 9.2k | ⚠️ примитивный | Низкая | Эксперименты с Ralph-loop |
| [humanlayer/humanlayer](https://github.com/humanlayer/humanlayer) | 10.9k | ⚠️ approval-gated | Средняя | Сложные кодовые базы с обязательными человеческими чекпоинтами |

### Background runners — «забыл и ушёл»

- [steveyegge/gastown](https://github.com/steveyegge/gastown) — Multi-agent workspace manager от Steve Yegge. Персистентный трекинг работы, true background, рассчитан на сложные multi-agent сценарии.
- [chernistry/bernstein](https://github.com/chernistry/bernstein) — Детерминистский оркестратор с HMAC-chained audit-log. Spawn'ит параллельные агенты, верифицирует тестами, авто-коммитит. Zero LLM tokens на координацию.
- [ruvnet/claude-flow](https://github.com/ruvnet/claude-flow) — Multi-agent swarm-платформа с RAG, self-learning intelligence, native Claude Code integration. 55k⭐ — фактический индустриальный стандарт под swarms.

### Parallel GUI / kanban

- [BloopAI/vibe-kanban](https://github.com/BloopAI/vibe-kanban) — Kanban-доска для управления параллельными coding agents. 26.5k⭐, самый популярный GUI под Claude Code и Codex.
- [smtg-ai/claude-squad](https://github.com/smtg-ai/claude-squad) — TUI-менеджер параллельных терминальных Claude/Codex/Amp/OpenCode-сессий. Каждая в своём worktree.
- [stravu/crystal (теперь Nimbalyst)](https://github.com/stravu/crystal) — Desktop-приложение для параллельных Claude и Codex сессий в worktrees. Diff-viewer, сравнение подходов в одном окне.
- [manaflow-ai/cmux](https://github.com/manaflow-ai/cmux) — Ghostty-based macOS-терминал с вертикальными табами и push-нотификациями для coding agents.
- [generalaction/emdash](https://github.com/generalaction/emdash) — Open-source agentic IDE (YC W26) для параллельных coding agents любого провайдера.

### Autonomous loops и approval-gated

- [frankbria/ralph-claude-code](https://github.com/frankbria/ralph-claude-code) — Autonomous-цикл «работай пока не готово» с intelligent exit detection. Канонический Ralph-pattern (Geoffrey Huntley) под Claude Code.
- [humanlayer/humanlayer](https://github.com/humanlayer/humanlayer) — Фреймворк для сложных задач в больших кодовых базах: human-in-loop approval-чекпоинты на критичных шагах.

**Канонический источник** — [andyrewlee/awesome-agent-orchestrators](https://github.com/andyrewlee/awesome-agent-orchestrators) с 4 категориями и сотней тулов. Наш отбор: ≥3k⭐ + явная поддержка Claude Code (исключение — bernstein: 0.5k⭐, но уникальная audit-grade ниша).

---

## Plugins

Плагин — упаковка скиллов, субагентов, hooks и MCP-серверов в один артефакт. Один плагин = один `/plugin install <name>`. См. [официальный гайд](https://docs.claude.com/en/docs/claude-code/plugins).

> 📂 Полный каталог: **[16 записей →](./catalog/plugins.md)**

### Главные маркетплейсы

- [obra/superpowers-marketplace](https://github.com/obra/superpowers-marketplace) — Маркетплейс с 20+ soft-скиллами и плагинами от Jesse Vincent. Базовая установка: `claude plugin marketplace add obra/superpowers-marketplace`.
- [ccplugins/awesome-claude-code-plugins](https://github.com/ccplugins/awesome-claude-code-plugins) — 50+ плагинов по 13 категориям (качество кода, git, devops, дизайн, бизнес). 782⭐. Установка: `claude plugin marketplace add ccplugins/awesome-claude-code-plugins`.
- [VoltAgent/awesome-claude-code-subagents](https://github.com/VoltAgent/awesome-claude-code-subagents) — 144 субагента, оформленные как плагин-маркетплейс.
- [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official) — Официальные плагины Anthropic.

### Полезные одиночные плагины

- [brennercruvinel/CCPlugins](https://github.com/brennercruvinel/CCPlugins) — Сборка самых ходовых slash-команд автора.
- [ApurvBazari/claude-plugins](https://github.com/ApurvBazari/claude-plugins) — Уведомления о событиях через ntfy / Pushover / Telegram.
- [browserbase/claude-code-plugin](https://github.com/browserbase/claude-code-plugin) — Browserbase: облачные браузеры для тестирования и скрейпинга.
- [0xdesign/design-plugin](https://github.com/0xdesign/design-plugin) — Дизайн-ориентированная обвязка для UI-задач.
- [jeremylongshore/claude-code-plugins-plus-skills](https://github.com/jeremylongshore/claude-code-plugins-plus-skills) — Связка плагинов и скиллов в одном репозитории.
- [TT-Wang/cortex-plugin](https://github.com/TT-Wang/cortex-plugin) — Структурированное мышление и планирование задач.
- [Rich627/whatsapp-claude-plugin](https://github.com/Rich627/whatsapp-claude-plugin) — Интеграция с WhatsApp.

---

## Hooks

Hooks — shell-команды (или HTTP / MCP / prompt-агенты), которые запускаются по событиям сессии. См. [hooks reference](https://docs.claude.com/en/docs/claude-code/hooks).

> 📂 Связанные проекты: **[8 записей →](./catalog/hooks.md)**. Большая часть hooks живёт внутри плагинов — см. раздел [Plugins](#plugins) выше.

### Готовые hooks в этом репо

- [examples/hooks/](./examples/hooks/README.md) — Три рабочих hook'а с bash-скриптами и инструкциями куда положить:
  - **pre-commit-secrets.sh** — детектор секретов в staged-diff. Спасает от утечки API-ключей, когда агент коммитит без проверки.
  - **ntfy.sh** — push-уведомления через ntfy.sh по событиям `Notification` и `Stop`.
  - **audit.sh** — JSONL-аудит каждого PostToolUse для разбора инцидентов.

### Community-проекты

- [carapace-sh/claude-code-hooks](https://github.com/carapace-sh/claude-code-hooks) — TypeScript SDK для написания hooks с типизацией.
- [decoder3000/claude-hooks-toolkit](https://github.com/decoder3000/claude-hooks-toolkit) — Готовые hooks: форматирование, линт, security-проверка, аудит.
- [snyk/claude-code-pre-commit](https://github.com/snyk/claude-code-pre-commit) — Security-скан Snyk на pre-commit.
- [johnlindquist/ccmgr](https://github.com/johnlindquist/ccmgr) — Менеджер для конфигов hooks.
- [Setting up Claude Code hooks (Anthropic blog)](https://www.anthropic.com/news/claude-code-hooks) — Официальный анонс с примерами.

### Сценарии применения

**Безопасность:** pre-commit на секреты, запрет `git push --force` в `main` / `production`, `permissionDecision: "ask"` для команд со словом `production` или `prod-*`, JSONL-аудит каждого PostToolUse, блокировка `curl` и `wget` к доменам не из белого списка.

**Качество:** автоформат на PostToolUse Edit / Write (`prettier --write`, `ruff format`), `tsc --noEmit` на изменённых файлах, `eslint --fix`, `terraform fmt -recursive`.

**Workflow:** push в ntfy / Pushover / Telegram по событиям Notification и Stop, учёт стоимости в CSV по событию Stop, `direnv reload` по CwdChanged, авто-коммит по Stop с conventional-сообщениями.

**Архитектурные:** запрет редактирования `package.json` или lockfile без явного разрешения, pre-edit grep на использование функции, которую собираемся удалить, проверка структуры нового файла (`src/` / `tests/` / `docs/`).

---

## MCP-серверы

[Model Context Protocol](https://modelcontextprotocol.io/) — стандарт подключения внешних инструментов к LLM. Все MCP-серверы работают и в Claude Code, и в Claude Desktop, и в Cursor.

> 📂 Полный каталог: **[827 записей →](./catalog/mcp-servers.md)** — взято из [punkpeye/awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers) и официального реестра.

> **Правило практика:** пять хорошо подобранных MCP-серверов лучше двадцати. Каждый сервер расходует токены контекста на discovery — будь придирчив. С 19 включёнными серверами 200K-контекст превращается в 70K ещё до старта работы.

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

- **GitHub** — [github/github-mcp-server](https://github.com/github/github-mcp-server). Без него Claude видит только локальный репозиторий. С ним — читает чужие issues, комментирует PR, открывает черновики PR.
- **PostgreSQL** — [modelcontextprotocol/servers/postgres](https://github.com/modelcontextprotocol/servers/tree/main/src/postgres). Read-only по умолчанию, для дебага запросов и схемы продакшен-БД.
- **Filesystem** — [modelcontextprotocol/servers/filesystem](https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem). Чтение файлов вне рабочей директории (например, общая база знаний или соседний проект).
- **Playwright** — [microsoft/playwright-mcp](https://github.com/microsoft/playwright-mcp). Для тестов UI и скрейпинга. Альтернатива — Browserbase для облачных браузеров.
- **Context7** — [upstash/context7](https://github.com/upstash/context7). Свежая документация популярных библиотек — Claude перестаёт выдумывать API устаревших версий.
- **Linear** — [linear/linear-mcp](https://github.com/linear/linear-mcp). Если ведёшь задачи в Linear — агент сам читает спеки и комментирует issues.
- **Sequential thinking** — [modelcontextprotocol/servers/sequentialthinking](https://github.com/modelcontextprotocol/servers/tree/main/src/sequentialthinking). Структурированное пошаговое мышление для сложных задач.

Полная разбивка по 30 категориям — базы данных, version control, dev-инструменты, облака, браузеры, поиск, коммуникации, мониторинг, безопасность, базы знаний, агрегаторы, sandbox-окружения, рабочие инструменты, файловые системы, OS, мультимедиа, data science, RAG, маркетинг, продукт, customer data, соцсети, поддержка, e-commerce, fintech, визуализация, путешествия — в **[catalog/mcp-servers.md](./catalog/mcp-servers.md)**.

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

- [multica-ai/andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills) — `CLAUDE.md`, собранный из практик Andrej Karpathy. 128k⭐.
- [garrytan/gstack](https://github.com/garrytan/gstack) — Сетап Garry Tan: 23 opinionated-инструмента. 95k⭐.
- [affaan-m/everything-claude-code](https://github.com/affaan-m/everything-claude-code) — Комплексная оптимизация harness'а: скиллы, повадки, память. 181k⭐.

### Под конкретный стек

- [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) — Best-practices Next.js, де-факто канонический шаблон от Vercel.
- [supabase/agent-skills](https://github.com/supabase/agent-skills) — Supabase и PostgreSQL.
- [callstackincubator/agent-skills](https://github.com/callstackincubator/agent-skills) — Шаблоны React Native.
- [shadcn/ui skills](https://ui.shadcn.com/docs/skills) — Компоненты shadcn с принудительным применением паттернов.
- [expo/skills](https://github.com/expo/skills) — Expo. 25K+ установок.
- [get-convex/agent-skills](https://github.com/get-convex/agent-skills) — Convex — реактивный бэкенд.
- [microsoft/azure-skills](https://github.com/microsoft/azure-skills) — Деплой в Azure и best-practices от Microsoft.
- [firebase/agent-skills](https://github.com/firebase/agent-skills) — Firebase и Firestore.
- [docs.stripe.com](https://docs.stripe.com/agents/claude-code) — Best-practices Stripe для платёжных интеграций.

### Тематические гайды

- [Anthropic engineering: Claude Code best practices](https://www.anthropic.com/engineering/claude-code-best-practices) — Официальный пост.
- [Год с Claude Code (alpinadigital, Habr)](https://habr.com/ru/companies/alpinadigital/articles/1032134/) — Год опыта в конфигурации.
- [Claude Code: практический гайд (Habr)](https://habr.com/ru/articles/987094/) — Сетап на русском.

---

## Гайды и контент на русском

> 📂 Полный список: **[12 записей →](./catalog/ru-content.md)**

### Habr — практические гайды

- [Claude Code в 2026: гайд для тех, кто еще пишет код руками](https://habr.com/ru/articles/987382/) — Подробный гайд по AI Coding Agents, рекомендации по тарифам и CLI.
- [Год с Claude Code: рабочая конфигурация с первого запуска](https://habr.com/ru/companies/alpinadigital/articles/1032134/) — Как устроены rules, skills, agents, команды, MCP и hooks; как всё связывается через `routing.md`.
- [Claude Code: практический гайд по настройке, автоматизации и контексту](https://habr.com/ru/articles/987094/) — Полный сетап со скиллами, hooks, субагентами и MCP. От практика.
- [Полное руководство по добавлению MCP-серверов](https://habr.com/ru/articles/938626/) — Методы настройки, решения частых ошибок, проверенные серверы.
- [44 настройки Claude Code, о которых вы не знали](https://habr.com/ru/articles/987826/) — Ранжированы от «must have» до «забей».
- [10 настроек Claude Code, до которых большинство не доходит](https://habr.com/ru/articles/1028988/) — Малоиспользуемые возможности.
- [Что вы не знали о Claude Code: архитектура и практики](https://habr.com/ru/articles/1012412/) — Внутренняя архитектура агента.
- [Айсберг Claude Code (YooMoney)](https://habr.com/ru/companies/yoomoney/articles/1015548/) — 30+ возможностей от новичка до автоматизации.
- [Изоляция контекста через субагенты](https://habr.com/ru/articles/974448/) — Архитектурный паттерн для долгих задач.
- [3000+ часов в Claude Code](https://habr.com/ru/articles/1017110/) — Личный опыт автора, оформленный в виде трёх плагинов.
- [Statusline для Claude Code с мониторингом VPS](https://habr.com/ru/articles/1013414/) — Кастомизация statusline.
- [Разработка с Obsidian + Claude](https://habr.com/ru/articles/1030316/) — Workflow связки Claude и базы знаний.
- [Как использовать Claude Code: советы опытного разработчика (OTUS)](https://habr.com/ru/companies/otus/articles/929624/) — Корпоративный блог.
- [Claude Code — полный гайд для новичков с нуля](https://habr.com/ru/articles/1033416/) — Функции, настройка, best-practices.
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
- [trailofbits/skills](https://github.com/trailofbits/skills) — Security-скиллы Trail of Bits: CodeQL / Semgrep, аудит кода.
- [firebase/agent-skills@firestore-security-rules-auditor](https://skills.sh/firebase/agent-skills/firestore-security-rules-auditor) — Аудит security-rules Firestore перед прод-релизом. 20K+ установок.
- [snyk/claude-code-pre-commit](https://github.com/snyk/claude-code-pre-commit) — Security-скан Snyk на pre-commit.
- [Anthropic enterprise governance](https://www.anthropic.com/enterprise) — Корпоративный governance.

### Enterprise-паттерны

- [Managed plugin marketplaces](https://docs.claude.com/en/docs/claude-code/plugins#managed) — Только проверенные скиллы из собственного маркетплейса организации.
- [Permission policies](https://docs.claude.com/en/docs/claude-code/permissions#policy) — Список разрешённых Bash-команд на уровне организации.
- [Hooks reference](https://docs.claude.com/en/docs/claude-code/hooks) — Схема всех событий — для аудита и блокировки.
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

- [Latent Space (swyx)](https://www.latent.space/) — AI-инженерия, регулярные выпуски про Claude Code и MCP.
- [The Cognitive Revolution](https://www.cognitiverevolution.ai/) — Nathan Labenz, AI-индустрия и тренды.
- [Practical AI (Changelog)](https://changelog.com/practicalai) — Практические кейсы AI.
- [Anthropic (YouTube)](https://www.youtube.com/@anthropic-ai) — Релизы и техдемки.
- [Matt Pocock](https://www.youtube.com/@mattpocockuk) — TypeScript и AI-инструменты.
- [ThePrimeagen](https://www.youtube.com/@ThePrimeagen) — AI-workflow с критическим взглядом.

### Twitter / X — практики

- [@AnthropicAI](https://twitter.com/AnthropicAI) — Официальный аккаунт.
- [@alexalbert__](https://twitter.com/alexalbert__) — Alex Albert, DevRel в Anthropic.
- [@swyx](https://twitter.com/swyx) — AI-инженерия, Latent Space.
- [@simonw](https://twitter.com/simonw) — Simon Willison, разборы LLM-инструментов.
- [@mattpocockuk](https://twitter.com/mattpocockuk) — Matt Pocock, TDD-скиллы.
- [@obra](https://twitter.com/obra) — Jesse Vincent, автор `obra/superpowers`.

### Сравнение с другими CLI-агентами

- [Cursor](https://cursor.com/) — IDE-first, отдельный редактор на базе VS Code, сильный автокомплит.
- [GitHub Copilot](https://github.com/features/copilot) — Встроен в IDE, фокус на автокомплите и чате.
- [Aider](https://aider.chat/) — CLI-first, open-source, мульти-модельный.
- [Cline](https://github.com/cline/cline) — Расширение для VS Code с агентным режимом.
- [Continue](https://www.continue.dev/) — Open-source автокомплит и чат в IDE.
- [OpenAI Codex CLI](https://github.com/openai/codex) — Официальный CLI-агент OpenAI.
- [Google Gemini CLI](https://github.com/google-gemini/gemini-cli) — CLI-агент от Google.
- [Windsurf (Codeium)](https://codeium.com/windsurf) — IDE-агент от Codeium.

### Утилиты

- [Anthropic Console](https://console.anthropic.com/) — Playground, библиотека промптов, выдача API-ключей.
- [Anthropic Workbench](https://console.anthropic.com/workbench) — UI для экспериментов с промптами.
- [Anthropic Status](https://status.anthropic.com/) — Статус сервисов.
- [Claude release notes](https://docs.claude.com/en/release-notes/claude-code) — Официальный changelog.
- [Skills.sh](https://skills.sh/) — Маркетплейс скиллов с количеством установок.

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
