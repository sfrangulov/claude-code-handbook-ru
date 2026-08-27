<!--
README.md is generated from this template + data/*.json.
Edit this file or data/*.json, then run: node scripts/build-readme.mjs
CI gate: node scripts/build-readme.mjs --check
-->

# Claude Code Handbook на русском [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

> [Claude Code](https://code.claude.com/docs/en/overview) — CLI-агент Anthropic для разработки в терминале с поддержкой MCP, hooks и автономных субагентов.

Ежедневные разборы и обзоры релизов — в Telegram [@cc_consultant](https://t.me/cc_consultant). Связь и консультации: [@sfrangulov](https://t.me/sfrangulov).

**Полный сырой каталог (<!-- @sum-count-ru:catalog --> по типам)** — в [catalog/](./catalog/README.md). Здесь — курируемая подборка: только то, что я реально применяю в клиентских проектах либо что массово проверено сообществом по install-count.

> 📄 **[Шпаргалка на 1 страницу A4 →](./cheatsheet/)** Все горячие клавиши, слэш-команды, MCP, память, workflows, skills/agents и CLI-флаги на одном листе. Скачать [готовый PDF](./cheatsheet/cheatsheet.pdf) или открыть [index.html](./cheatsheet/index.html) → `⌘P`.

---

## Содержание

- [Quickstart](#quickstart-за-10-минут)
- [Harness (обвязка)](#harness-обвязка) — концепт «обвязка важнее модели» + автономный pipeline
- [Skills](#skills) — переиспользуемые наборы инструкций
- [Sub-agents](#sub-agents) — параллельные агенты со своим контекстом
- [Оркестрация](#оркестрация-и-параллельные-агенты) — внешние тулы для нескольких Claude разом
- [Workflow-методологии](#workflow-методологии) — opinionated циклы spec → plan → ship
- [Evals](#evals) — измерение качества агентов и промптов
- [Plugins](#plugins) — упаковка скиллов / субагентов / MCP / hooks в один артефакт
- [Hooks](#hooks) — shell-команды, привязанные к событиям сессии
- [MCP-серверы](#mcp-серверы) — подключение внешних инструментов через Model Context Protocol
- [CLAUDE.md шаблоны](#claudemd-шаблоны) — готовые конфиги под стек
- [Status Lines](#status-lines) — статуслайн: лимиты, контекст и стоимость в строке под промптом
- [Мониторинг расхода и стоимости](#мониторинг-расхода-и-стоимости) — трекеры токенов, квоты и трат
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

Это 14 скиллов (TDD, brainstorming, systematic-debugging, code-review, planning, parallel-agents, subagent-driven-development и другие). Два из них — в [топ-15 на skills.sh](#топ-15-скиллов-skillssh).

**Куда смотреть в первую очередь:**

1. [Шпаргалка на одну страницу](./cheatsheet/) — печатный PDF под рукой: горячие клавиши, слэш-команды, MCP, память, workflows, CLI-флаги. A4 portrait, 3 колонки. Скачать готовый [cheatsheet.pdf](./cheatsheet/cheatsheet.pdf) или открыть [index.html](./cheatsheet/index.html) и `⌘P`.
2. [Топ-15 скиллов по install-count](#топ-15-скиллов-skillssh) — то, что 100K+ людей реально установили.
3. [Hooks](#hooks) — поставь хотя бы `pre-commit-secrets` сразу: спасает от утечки API-ключей через git-коммит, который агент может сделать за 30 секунд.
4. [Шаблоны CLAUDE.md](#claudemd-шаблоны) — три production-шаблона: Next.js, Python/FastAPI, Terraform.
5. [Гайды на русском](#гайды-и-контент-на-русском) — <!-- @count-ru:ru-content.habr|статья|статьи|статей --> с Habr + <!-- @count-ru:ru-content.youtube|YouTube-курс|YouTube-курса|YouTube-курсов --> + DTF.

---

## Harness (обвязка)

Сдвиг 2026 года: результат всё меньше зависит от самой модели и всё больше — от **harness'а**, обвязки вокруг неё. Скиллы, субагенты, hooks, MCP, `CLAUDE.md` и песочница вместе превращают «умную модель» в воспроизводимый автономный процесс. Узкое место сместилось: найти кандидата (баг, фичу) стало дёшево и параллелится; дорого теперь **проверить, отсортировать и внести правку**. Anthropic формулирует это прямо, на материале безопасности: «discovery is now straightforward to parallelize, and the bottleneck has shifted to verification, triage, and patching».

> 📐 Эталонная реализация — [anthropics/defending-code-reference-harness](https://github.com/anthropics/defending-code-reference-harness): скиллы `/threat-model`, `/vuln-scan`, `/triage`, `/patch` плюс автономный pipeline в песочнице, который можно `/customize` под свой стек. Разбор практик — [«Using LLMs to secure source code»](https://claude.com/blog/using-llms-to-secure-source-code) (копия в репо: [`docs/blog-post.md`](https://github.com/anthropics/defending-code-reference-harness/blob/main/docs/blog-post.md)). Репозиторий про безопасность, но **та же архитектура harness'а работает для любой автономной задачи**.

### Из чего собран harness

Все компоненты уже разобраны в справочнике. Ниже — только как они складываются в обвязку, без повтора этих страниц:

- **[Skills](#skills)** — атомарные процедуры. Один скилл = один шаг pipeline (scan, triage, patch).
- **[Sub-agents](#sub-agents)** — изоляция контекста: под каждый шаг свой агент со своим окном.
- **[Hooks](#hooks)** — жёсткие ограничения держит код: hook на нужном событии не даёт выполнить запретное.
- **[MCP-серверы](#mcp-серверы)** — инструменты и доступ к данным. И следи за бюджетом контекста: 5 серверов лучше 20.
- **[CLAUDE.md шаблоны](#claudemd-шаблоны)** — правила, память и scope: что модель читает до старта (threat model, конвенции, границы доверия).
- **[Оркестрация](#оркестрация-и-параллельные-агенты)** — запуск pipeline целиком: фоновые runner'ы, parallel-агенты, autonomous-циклы.

### Паттерн автономного pipeline

Anthropic свёл практику команд в петлю **threat model → sandbox → discovery → verification → triage → patch**. Первые два шага — настройка раз на проект, остальные четыре гоняешь по коду повторно. Принципы работают не только в безопасности:

1. **Partition → parallel, а не тупой fan-out.** Сначала recon делит пространство поиска (8 парсеров, N эндпоинтов), потом параллельные агенты берут разные участки — иначе все сходятся на одних и тех же мелких багах. «Просто слали больше агентов» → «tons of issues, most of them duplicates».
2. **Recall и precision — на разных шагах.** Discovery ищет максимум (даже маловероятное), verification отсекает неподтверждённое. Один агент, делающий и то и другое сразу, начинает самоцензуру и выкидывает настоящие находки.
3. **Независимый adversarial verifier.** Проверяющий — в свежем контейнере, без общей истории и файловой системы с искателем, иначе соглашается вместо проверки. Промпт: считай находку ложной, ищи, почему она неверна. Одного мало — гоняй несколько (разные модели, разные ракурсы), бери majority vote, спорное отдавай отдельному judge.
4. **Enforcement песочницей и кодом, не промптом.** «Сказали модели, что сети нет, — а она нашла путь в GitHub». Ограничения держит изоляция (gVisor/microVM, egress только к API, никаких `~/.aws`/`~/.ssh`/`.env`), а не строчка в инструкции.
5. **Верификация фактом, не словом.** True positive — только когда агент собрал PoC и воспроизвёл его на стенде. Severity — после того как модель выписала ответы по критериям (reachability, attacker control, preconditions, auth, blast radius), а не «SQL injection → critical» с потолка.
6. **Minimal-patch + ladder of checks.** Сначала тест, падающий на старом коде (да, это TDD). Патч проверяется лесенкой от дешёвого к дорогому: **build → PoC больше не срабатывает → старые тесты зелёные → re-attack свежим агентом**. Чинить корень, а не call-site; правка минимальная, без рефактора и попутной уборки — иначе «дыру закрыли, но порвали связь с сервисом».

> 🔁 Каждый проход улучшает следующий: верифицированные находки и патчи возвращаются в threat model и в контекст следующего скана. Готовый GitHub Action с Claude-ревьюером на каждый PR — [anthropics/claude-code-security-review](https://github.com/anthropics/claude-code-security-review).

---

## Skills

Skills — переиспользуемые наборы инструкций, которые Claude подгружает по триггеру. Один скилл = одна задача (TDD-цикл, code-review, performance-аудит). См. [официальный гайд](https://code.claude.com/docs/en/skills).

> 📂 Полный каталог: **[<!-- @count-ru:catalog/skills.items --> →](./catalog/skills.md)**

### Топ-15 скиллов (skills.sh)

Ранжированы по install-count из [skills.sh](https://skills.sh) — реальной телеметрии маркетплейса, не звёздам. Описания в третьей колонке — мой ответ на «когда это реально нужно», а не пересказ официального README. Установка одной командой: `npx skills add <owner/repo@skill>`.

<!-- @table:skills-top -->

**Источник:** [skills.sh leaderboard](https://skills.sh) — числа быстро растут, актуальны на момент последнего обновления. Автообновление: `node scripts/refresh-top-skills.mjs --write && node scripts/build-readme.mjs`.

**Совет практика:** ставь `obra/superpowers` целиком сразу — самая полная коллекция soft-скиллов (TDD, отладка, планирование, брейншторм, код-ревью). Два скилла оттуда держатся в топ-15, остальные двенадцать в рейтинг не попадают — берут связностью, а не установками. Дальше добавь скиллы под свой стек (Vercel React, Convex, Firebase, Supabase, Azure). Не ставь всё подряд — каждый скилл съедает 3–5K токенов на bootstrap.

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

Sub-agent — отдельный экземпляр Claude со своим контекстом, который выполняет подзадачу и возвращает один итоговый ответ. Полезно для read-only исследования и параллельных задач. См. [официальную доку](https://code.claude.com/docs/en/sub-agents).

> 📂 Полный каталог: **[<!-- @count-ru:catalog/subagents.items --> →](./catalog/subagents.md)**

### Production-коллекции

<!-- @table:subagents.productionCollections -->

### 144 субагента VoltAgent — оглавление коллекции

Каждый — отдельный `.md`-файл с YAML-фронтматтером, ставится в `.claude/agents/`.

<!-- @table:subagents.voltagentCategories -->

---

## Оркестрация и параллельные агенты

Когда одного Claude мало: внешние тулы для запуска нескольких агентов параллельно, autonomous-циклов «запустил-и-ушёл» и kanban/GUI поверх Claude Code. Sub-agents (выше) — встроенная фича Claude в рамках одной сессии. Этот раздел — про **внешние оркестраторы**, которые запускают несколько независимых сессий Claude (или Claude + Codex + Gemini) и координируют их через worktrees, kanban или audit-log.

Три семьи паттернов:

- **Background runners** — настоящие фоновые процессы. Агент работает без терминала, тесты-гейты, авто-коммиты. Под «забыл и ушёл».
- **Parallel GUI / kanban** — desktop или TUI-доска с множеством параллельных сессий в git worktrees. Под визуальный контроль и сравнение подходов.
- **Autonomous loops (Ralph-pattern)** — цикл «работай пока не готово» с intelligent exit detection. Под однотипные многошаговые задачи.

> **Правило практика:** одного оркестратора достаточно. Не комбинируй — все три семьи конфликтуют за worktrees, лимиты API и runtime. Выбери по таблице ниже.

### Сравнение под соло-разработчика

Звёзды и дата последнего пуша — на 2026-08-27, GitHub API. Сложность — субъективная оценка времени до первого полезного запуска. Смотри на пуш раньше, чем на звёзды: половина ниши живёт один сезон.

| Тулза | ⭐ | Пуш | «Забыл и ушёл» | Сложность | Под кого |
|---|---:|---|---|---|---|
| [gastownhall/gastown](https://github.com/gastownhall/gastown) | 17.8k | 2026-08-19 | ✅ настоящий | Высокая | Overkill для одиночки, под сложные multi-agent сценарии |
| [sipyourdrink-ltd/bernstein](https://github.com/sipyourdrink-ltd/bernstein) | 1.0k | 2026-08-27 | ✅ настоящий | Средняя | Соло-разработчик с требованием audit-grade лога |
| [ruvnet/ruflo](https://github.com/ruvnet/ruflo) | 69.5k | 2026-08-27 | ✅ swarm | Высокая | Команды и enterprise, не для одиночки |
| [BloopAI/vibe-kanban](https://github.com/BloopAI/vibe-kanban) | 27.9k | 2026-04-24 | ❌ полу-ручное | Низкая | Простая параллельность через kanban-доску |
| [smtg-ai/claude-squad](https://github.com/smtg-ai/claude-squad) | 8.4k | 2026-08-20 | ❌ ручное | Низкая | Несколько Claude-сессий в TUI |
| [stravu/crystal (Nimbalyst)](https://github.com/stravu/crystal) | 3.1k | 2026-02-26 | ❌ полу-ручное | Низкая | Desktop GUI для сравнения подходов |
| [manaflow-ai/cmux](https://github.com/manaflow-ai/cmux) | 26.5k | 2026-08-27 | ❌ ручное | Низкая | macOS-юзеру с табами и push-нотификациями |
| [generalaction/emdash](https://github.com/generalaction/emdash) | 5.5k | 2026-08-25 | ❌ полу-ручное | Низкая | Open-source альтернатива vibe-kanban |
| [frankbria/ralph-claude-code](https://github.com/frankbria/ralph-claude-code) | 9.6k | 2026-07-18 | ⚠️ примитивный | Низкая | Эксперименты с Ralph-loop |
| [humanlayer/humanlayer](https://github.com/humanlayer/humanlayer) | 11.3k | 2026-06-19 | ⚠️ approval-gated | Средняя | Сложные кодовые базы с обязательными человеческими чекпоинтами |

### Background runners — «забыл и ушёл»

<!-- @list:misc.orchestrationBackground -->

### Parallel GUI / kanban

<!-- @list:misc.orchestrationGui -->

### Autonomous loops и approval-gated

<!-- @list:misc.orchestrationLoop -->

**Главный источник** — [andyrewlee/awesome-agent-orchestrators](https://github.com/andyrewlee/awesome-agent-orchestrators) с 4 категориями и сотней тулов. Наш отбор: ≥3k⭐ + явная поддержка Claude Code (исключение — bernstein: 0.5k⭐, но уникальная audit-grade ниша).

---

## Workflow-методологии

Готовые opinionated-методологии под Claude Code: полные циклы **Research → Plan → Execute → Review → Ship**, упакованные в плагины или skill-коллекции. В отличие от skills (атомарных — одна задача) и orchestration (запуск нескольких сессий), это **полные многошаговые workflow под цикл фичи** одной сессией.

> 📚 Основной EN-репо для всего раздела ниже: [shanraisshan/claude-code-best-practice](https://github.com/shanraisshan/claude-code-best-practice) — 54.8k⭐, ежедневные апдейты под версии Claude Code, hot-features, Boris Cherny tips, cross-model паттерны.
>
> 🇷🇺 **Переводы тематических батчей советов** от Boris Cherny (создатель Claude Code) и Thariq (Anthropic): **[docs/tips-ru.md →](./docs/tips-ru.md)** — 8 батчей за январь–апрель 2026 плюс разбор трёх фаз воркшопа How We Claude Code (Code with Claude 2026).

### Spec → Plan → Ship методологии

<!-- @list:misc.workflowMethodologies -->

### Cross-model: связка Claude с Codex / Gemini / GPT

Три механизма интеграции Claude Code с другими моделями (Codex, Gemini, GPT, Kimi, DeepSeek, локальные):

- **Plugin** — CLI другой модели запускается внутри Claude Code как слэш-команда (`/codex:review`).
- **MCP** — Claude Code вызывает другую модель как tool через Model Context Protocol.
- **Router** — API-endpoint Claude подменяется на любого OpenAI-совместимого провайдера.

<!-- @list:misc.crossModel -->

---

## Evals

Evals — регрессионные тесты для агентного workflow: golden-набор задач, грейдер и прогон при каждом изменении промпта, скилла или модели. Без них изменение оценивается на глаз по одному прогону, и поломки всплывают уже у пользователей.

Два паттерна из материалов Anthropic:

- **Двухслойный грейдер.** Дешёвые программные проверки (парсинг артефакта, подсчёт метрик) отсеивают грубые провалы, LLM-судья оценивает качество там, где кода недостаточно. Каждая версия промпта измеряется по всему набору задач.
- **Сначала аудит, потом sweep.** Прогон по сетке моделей поверх сломанных evals даёт цифры, которым нельзя верить. Скилл [eval-audit-and-sweep](https://github.com/anthropics/cwc-workshops/tree/main/rightmodel/.claude/skills/eval-audit-and-sweep) из раздела [Skills](#skills) закрывает обе фазы: чеклист-аудит, затем sweep модель × thinking × effort с ценой и скоростью на ячейку.

### Официальные материалы

<!-- @list:evals.official -->

### Инструменты

<!-- @list:evals.tools -->

---

## Plugins

Плагин — упаковка скиллов, субагентов, hooks и MCP-серверов в один артефакт. Один плагин = один `/plugin install <name>`. См. [официальный гайд](https://code.claude.com/docs/en/plugins).

> 📂 Полный каталог: **[<!-- @count-ru:catalog/plugins.items --> →](./catalog/plugins.md)**

### Главные маркетплейсы

<!-- @list:plugins.marketplaces -->

### Полезные одиночные плагины

<!-- @list:plugins.singles -->

---

## Hooks

Hooks — shell-команды (или HTTP / MCP / prompt-агенты), которые запускаются по событиям сессии. См. [hooks reference](https://code.claude.com/docs/en/hooks).

> 📂 Связанные проекты: **[<!-- @count-ru:catalog/hooks.items --> →](./catalog/hooks.md)**. Большая часть hooks живёт внутри плагинов — см. раздел [Plugins](#plugins) выше.

### Готовые hooks в этом репо

<!-- @list:hooks.local -->

### Community-проекты

<!-- @list:hooks.community -->

### Observability — дашборды поверх hooks

Hooks дают поток событий сессии; эти проекты собирают его в живую картину: что делает агент, сколько субагентов работает параллельно, куда уходят токены. Годится и на разбор инцидента постфактум, и на наблюдение за автономным прогоном вживую.

<!-- @list:hooks.observability -->

### Сценарии применения

**Безопасность:** pre-commit на секреты, запрет `git push --force` в `main` / `production`, `permissionDecision: "ask"` для команд со словом `production` или `prod-*`, JSONL-аудит каждого PostToolUse, блокировка `curl` и `wget` к доменам не из белого списка.

**Качество:** автоформат на PostToolUse Edit / Write (`prettier --write`, `ruff format`), `tsc --noEmit` на изменённых файлах, `eslint --fix`, `terraform fmt -recursive`.

**Workflow:** push в ntfy / Pushover / Telegram по событиям Notification и Stop, учёт стоимости в CSV по событию Stop, `direnv reload` по CwdChanged, авто-коммит по Stop с conventional-сообщениями.

**Архитектурные:** запрет редактирования `package.json` или lockfile без явного разрешения, pre-edit grep на использование функции, которую собираемся удалить, проверка структуры нового файла (`src/` / `tests/` / `docs/`).

---

## MCP-серверы

[Model Context Protocol](https://modelcontextprotocol.io/) — стандарт подключения внешних инструментов к LLM. Все MCP-серверы работают и в Claude Code, и в Claude Desktop, и в Cursor.

> 📂 Полный каталог: **[<!-- @count-ru:catalog/mcp-servers.items --> →](./catalog/mcp-servers.md)** — взято из [punkpeye/awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers) и официального реестра.

> **Правило практика:** пять хорошо подобранных MCP-серверов лучше двадцати. Каждый сервер расходует токены контекста на discovery — будь придирчив. С 19 включёнными серверами 200K-контекст превращается в 70K ещё до старта работы. Какие из подключённых серверов реально вызываются, покажет [`npx mcp-graveyard`](https://github.com/sfrangulov/skill-graveyard/tree/main/packages/mcp-graveyard) — аудит по локальным логам сессий, без сети и телеметрии.

### Официальные

<!-- @list:mcp.official -->

### Кураторы

<!-- @list:mcp.curators -->

### Топ под Claude Code (мой ежедневный сетап)

<!-- @bold-list:mcp.topDaily -->

Полная разбивка по 30 категориям — базы данных, version control, dev-инструменты, облака, браузеры, поиск, коммуникации, мониторинг, безопасность, базы знаний, агрегаторы, sandbox-окружения, рабочие инструменты, файловые системы, OS, мультимедиа, data science, RAG, маркетинг, продукт, customer data, соцсети, поддержка, e-commerce, fintech, визуализация, путешествия — в **[catalog/mcp-servers.md](./catalog/mcp-servers.md)**.

---

## CLAUDE.md шаблоны

`CLAUDE.md` в корне репозитория автоматически подгружается в контекст. См. [memory docs](https://code.claude.com/docs/en/memory).

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

## Status Lines

Статуслайн — строка под промптом Claude Code, куда выводятся лимиты, окно контекста, модель, git и стоимость сессии. Пара строк конфига убирает постоянные `/context` и `/cost`. См. [официальную доку](https://code.claude.com/docs/en/statusline).

<!-- @list:statuslines.items -->

---

## Мониторинг расхода и стоимости

Трекеры токенов, квоты и денег: от статуслайна с тратами за день до отдельного дашборда со шкалами rate-limit и прогнозом до сброса. Пригодится на Pro/Max, чтобы не упереться в 5-часовой лимит посреди задачи. См. [про стоимость](https://code.claude.com/docs/en/costs).

<!-- @list:usage-cost.items -->

---

## Гайды и контент на русском

> 📂 Полный список: **[<!-- @sum-count-ru:catalog/ru-content --> →](./catalog/ru-content.md)**

### В этом репо

- **[docs/tips-ru.md](./docs/tips-ru.md)** — переводы тематических батчей советов от Boris Cherny (создатель Claude Code) и Thariq (Anthropic). 8 батчей с января по апрель 2026: Boris × 6 (13/10/12/2/15/6 советов) + Thariq × 2 (Skills, Session Management). Все 75 советов в хронологическом порядке, newest-first. Плюс разбор трёх фаз воркшопа How We Claude Code с Code with Claude 2026: спека через интервью, четыре HTML-варианта дизайна, верифицируемая архитектура компонентов.

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
