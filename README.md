<!--
README.md is generated from this template + data/*.json.
Edit this file or data/*.json, then run: node scripts/build-readme.mjs
CI gate: node scripts/build-readme.mjs --check
-->

# Claude Code Handbook на русском [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

> [Claude Code](https://code.claude.com/docs/en/overview) — CLI-агент Anthropic для разработки в терминале с поддержкой MCP, hooks и автономных субагентов.

Ежедневные разборы и обзоры релизов — в Telegram [@cc_consultant](https://t.me/cc_consultant). Связь и консультации: [@sfrangulov](https://t.me/sfrangulov).

**Полный сырой каталог (1416 записей по типам)** — в [catalog/](./catalog/README.md). Здесь — курируемая подборка: только то, что я реально применяю в клиентских проектах либо что массово проверено сообществом по install-count.

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

# 3. MCP-серверы. Контекст перестал быть главным аргументом: с 2.1.7 тяжёлые
#    наборы тулов откладываются и грузятся по требованию (замер — в разделе MCP).
#    Ограничивай себя из-за другого: каждый сервер — чужой код с доступом к твоему
#    окружению, плюс лишние похожие тулы, среди которых модель промахивается.
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
5. [Гайды на русском](#гайды-и-контент-на-русском) — 18 статей с Habr + 11 YouTube-курсов + DTF.

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

> 📂 Полный каталог: **[164 записи →](./catalog/skills.md)**

### Топ-15 скиллов (skills.sh)

Ранжированы по install-count из [skills.sh](https://skills.sh) — реальной телеметрии маркетплейса, не звёздам. Описания в третьей колонке — мой ответ на «когда это реально нужно», а не пересказ официального README. Установка одной командой: `npx skills add <owner/repo@skill>`.

| Скилл | Зачем и когда юзать | Установок |
|---|---|---:|
| [mattpocock/skills@grill-with-docs](https://www.skills.sh/mattpocock/skills/grill-with-docs) | «Допрашивай» документацию через find/grep — заменяет догадки точными цитатами. Особенно ценно для библиотек, где знание Claude устарело. | **835K** |
| [anthropics/skills@frontend-design](https://www.skills.sh/anthropics/skills/frontend-design) | Перестраивает дизайн в пользу bold-решений вместо дефолтных «AI slop»-карточек. Триггерь, когда видишь, что вышло generic. React + Tailwind. | **824K** |
| [mattpocock/skills@tdd](https://www.skills.sh/mattpocock/skills/tdd) | TDD-цикл (red-green-refactor) с дисциплиной — не даёт агенту писать код раньше тестов. От Matt Pocock. | **777K** |
| [vercel-labs/agent-skills@vercel-react-best-practices](https://www.skills.sh/vercel-labs/agent-skills/vercel-react-best-practices) | React/Next.js — производительность по гайду Vercel: правильные границы между клиентом и RSC, кэширование, оптимизация размера бандла. Подключай в любом Next.js-проекте. | **668K** |
| [vercel-labs/agent-skills@web-design-guidelines](https://www.skills.sh/vercel-labs/agent-skills/web-design-guidelines) | Чек-лист соответствия Web Interface Guidelines: a11y, hit-targets, focus rings. Запускай как ревью UI до коммита. | **582K** |
| [microsoft/azure-skills@azure-deploy](https://www.skills.sh/microsoft/azure-skills/azure-deploy) | Деплой в Azure: ARM/Bicep, App Service, Container Apps. Ставь только если работаешь в Azure-стеке — иначе мёртвый груз в контексте. | **548K** |
| [mattpocock/skills@codebase-design](https://www.skills.sh/mattpocock/skills/codebase-design) | Единый словарь для проектирования «глубоких модулей»: много поведения за узким интерфейсом, шов в чистом месте. Берёшь, когда спор идёт о границах, а команда называет одно и то же то компонентом, то сервисом, то API. | **491K** |
| [mattpocock/skills@code-review](https://www.skills.sh/mattpocock/skills/code-review) | Ревью диффа от заданной точки сразу по двум осям: соответствие стандартам репозитория и соответствие исходной задаче. Оси гоняются параллельными субагентами, чтобы не засоряли контекст друг другу. | **424K** |
| [leonxlnx/taste-skill@design-taste-frontend](https://www.skills.sh/leonxlnx/taste-skill/design-taste-frontend) | Выводит дизайн-направление из брифа и собирает не-шаблонный интерфейс; на редизайне сначала аудитит текущий. Для лендингов и портфолио, когда generic-вид не годится. | **409K** |
| [obra/superpowers@brainstorming](https://www.skills.sh/obra/superpowers/brainstorming) | Структурированный брейншторм с гипотезами и матрицей вариантов **до** начала кода. Включай, когда задача расплывчатая («сделай auth»). | **341K** |
| [leonxlnx/taste-skill@high-end-visual-design](https://www.skills.sh/leonxlnx/taste-skill/high-end-visual-design) | Конкретные шрифты, отступы, тени и анимации, от которых сайт выглядит дорого; убирает дефолты, по которым виден AI-дизайн. Когда нужен premium-look, а не просто «аккуратно». | **304K** |
| [leonxlnx/taste-skill@redesign-existing-projects](https://www.skills.sh/leonxlnx/taste-skill/redesign-existing-projects) | Аудит живого интерфейса: находит generic AI-паттерны и подтягивает до premium, не ломая функциональность. Для редизайна существующего проекта, а не старта с нуля. | **301K** |
| [mattpocock/skills@git-guardrails-claude-code](https://www.skills.sh/mattpocock/skills/git-guardrails-claude-code) | Ставит PreToolUse-хук, который блокирует `git push`, `reset --hard`, `clean -f` и `branch -D` до выполнения. Дешёвая страховка, если гоняешь агента в обход подтверждений. | **276K** |
| [leonxlnx/taste-skill@stitch-design-taste](https://www.skills.sh/leonxlnx/taste-skill/stitch-design-taste) | Генерирует `DESIGN.md` под Google Stitch: строгая типографика, выверенный цвет, асимметричные сетки. Нужен, только если генеришь экраны в Stitch — вне его бесполезен. | **258K** |
| [obra/superpowers@systematic-debugging](https://www.skills.sh/obra/superpowers/systematic-debugging) | Дисциплина отладки: гипотезы → изоляция → root cause. Прерывает цикл бесконечных правок наугад. | **238K** |

**Источник:** [skills.sh leaderboard](https://skills.sh) — числа быстро растут, актуальны на момент последнего обновления. Автообновление: `node scripts/refresh-top-skills.mjs --write && node scripts/build-readme.mjs`.

**Совет практика:** ставь `obra/superpowers` целиком сразу — самая полная коллекция soft-скиллов (TDD, отладка, планирование, брейншторм, код-ревью). Два скилла оттуда держатся в топ-15, остальные двенадцать в рейтинг не попадают — берут связностью, а не установками. Дальше добавь скиллы под свой стек (Vercel React, Convex, Firebase, Supabase, Azure). Не ставь всё подряд — каждый скилл съедает 3–5K токенов на bootstrap.

### Официальные от Anthropic

Полный набор: [anthropics/skills](https://github.com/anthropics/skills).

- [anthropics/skills/docx](https://github.com/anthropics/skills/tree/main/skills/docx) — Word-документы с tracked changes и комментариями.
- [anthropics/skills/pdf](https://github.com/anthropics/skills/tree/main/skills/pdf) — Извлечение текста и таблиц, merge/split, заполнение форм.
- [anthropics/skills/pptx](https://github.com/anthropics/skills/tree/main/skills/pptx) — PowerPoint: layouts, шаблоны, графики, авто-генерация слайдов.
- [anthropics/skills/xlsx](https://github.com/anthropics/skills/tree/main/skills/xlsx) — Excel: формулы, форматирование, анализ.
- [anthropics/skills/frontend-design](https://github.com/anthropics/skills/tree/main/skills/frontend-design) — Bold-дизайн без «AI slop». React + Tailwind.
- [anthropics/skills/web-artifacts-builder](https://github.com/anthropics/skills/tree/main/skills/web-artifacts-builder) — HTML-артефакты на React + Tailwind + shadcn/ui.
- [anthropics/skills/mcp-builder](https://github.com/anthropics/skills/tree/main/skills/mcp-builder) — Пошаговое создание MCP-серверов.
- [anthropics/skills/webapp-testing](https://github.com/anthropics/skills/tree/main/skills/webapp-testing) — Тестирование веб-приложений через Playwright.
- [anthropics/skills/skill-creator](https://github.com/anthropics/skills/tree/main/skills/skill-creator) — Интерактивное создание собственных скиллов через Q&A.
- [anthropics/cwc-workshops/eval-audit-and-sweep](https://github.com/anthropics/cwc-workshops/tree/main/rightmodel/.claude/skills/eval-audit-and-sweep) — Двухфазный playbook из воркшопа Picking the Right Model: аудит evals по чеклисту надёжности (дизайн задач, harness, метрики, LLM-судья), затем sweep по сетке модель × thinking × effort с ценой и скоростью на ячейку. Подходит для любого eval-фреймворка.

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
- [sfrangulov/skills](https://github.com/sfrangulov/skills) — Коллекция мейнтейнера этого handbook: consulting-фреймворк на 8 шагов (EN и RU), выбор следующего OSS-продукта, demo-video-pipeline (Playwright + Remotion + ElevenLabs), research-pipeline с верификацией источников.
- [travisvn/awesome-claude-skills](https://github.com/travisvn/awesome-claude-skills) — 12k⭐, актуальный куратор скиллов.
- [karanb192/awesome-claude-skills](https://github.com/karanb192/awesome-claude-skills) — 50+ проверенных скиллов с разбивкой по типам.

### Узкоспециализированные

- [conorluddy/ios-simulator-skill](https://github.com/conorluddy/ios-simulator-skill) — Сборка iOS-приложений, навигация по симулятору, тесты.
- [lackeyjb/playwright-skill](https://github.com/lackeyjb/playwright-skill) — Браузерная автоматизация через Playwright.
- [chrisvoncsefalvay/claude-d3js-skill](https://github.com/chrisvoncsefalvay/claude-d3js-skill) — Визуализации в d3.js.
- [K-Dense-AI/scientific-agent-skills](https://github.com/K-Dense-AI/scientific-agent-skills) — Научные базы данных и библиотеки.
- [jthack/ffuf_claude_skill](https://github.com/jthack/ffuf_claude_skill) — Fuzzing через `ffuf` при пентесте.
- [yusufkaraaslan/Skill_Seekers](https://github.com/yusufkaraaslan/Skill_Seekers) — Превращает сайт документации в Claude Skill.
- [alonw0/web-asset-generator](https://github.com/alonw0/web-asset-generator) — Favicon, app-иконки, OG-картинки.
- [SawyerHood/dev-browser](https://github.com/SawyerHood/dev-browser) — Даёт агенту браузер: сам открывает страницу и проверяет свою работу глазами. Альтернатива Playwright MCP. 6.4k⭐.
- [bitjaru/styleseed](https://github.com/bitjaru/styleseed) — Дизайн-движок: учит агента дизайнерскому вкусу — 74 правила в markdown, 7 бренд-скинов и именованная motion-система. Слэш-скиллы `/ss-*`.
- [PolarSnowflake/skills-from-expertise](https://github.com/PolarSnowflake/skills-from-expertise) — Смысловая сторона написания скиллов: как превратить экспертизу в методологию, а не в список советов. Когда брать: есть чужой материал — лекция, книга, таблица, код — и нужен из него рабочий скилл.

### Локальные примеры

- [examples/skills/review-staged-changes/](./examples/skills/review-staged-changes/SKILL.md) — Проверка staged-изменений перед коммитом.

---

## Sub-agents

Sub-agent — отдельный экземпляр Claude со своим контекстом, который выполняет подзадачу и возвращает один итоговый ответ. Полезно для read-only исследования и параллельных задач. См. [официальную доку](https://code.claude.com/docs/en/sub-agents).

> 📂 Полный каталог: **[160 записей →](./catalog/subagents.md)**

### Production-коллекции

| Репозиторий | Что внутри |
|---|---|
| [VoltAgent/awesome-claude-code-subagents](https://github.com/VoltAgent/awesome-claude-code-subagents) | **144 субагента** по 10 категориям, 19k⭐. Установка: `claude plugin marketplace add VoltAgent/awesome-claude-code-subagents`. |
| [obra/superpowers](https://github.com/obra/superpowers) | 20+ скиллов и субагентов: TDD, отладка, планирование, брейншторм, ревью. Самая популярная коллекция. |
| [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | 100+ субагентов в едином формате промпта, мультиязычные, MIT. |
| [wshobson/agents](https://github.com/wshobson/agents) | 48 production-агентов с паттернами оркестрации и продвинутыми workflow. |
| [vijaythecoder/awesome-claude-agents](https://github.com/vijaythecoder/awesome-claude-agents) | 26 агентов формата AI-команды: Tech Lead, Analyst, доменные специалисты. |
| [davepoon/buildwithclaude](https://github.com/davepoon/buildwithclaude) | Хаб со скиллами, агентами, командами, хуками и плагинами разом; бывший claude-code-subagents-collection. 3.4k⭐. |
| [rohitg00/awesome-claude-code-toolkit](https://github.com/rohitg00/awesome-claude-code-toolkit) | 135 агентов, 35 скиллов и 42 команды в одном тулките. |
| [peterkrueck/Claude-Code-Development-Kit](https://github.com/peterkrueck/Claude-Code-Development-Kit) | Мета-репозиторий: документация, multi-agent шаблоны, hooks, MCP-серверы. |

### 144 субагента VoltAgent — оглавление коллекции

Каждый — отдельный `.md`-файл с YAML-фронтматтером, ставится в `.claude/agents/`.

| Категория | Внутри | Когда брать |
|---|---|---|
| [🛠️ Core development (11)](https://github.com/VoltAgent/awesome-claude-code-subagents/tree/main/categories/01-core-development) | API-дизайнер, frontend/backend/fullstack, mobile, GraphQL-архитектор, WebSocket-инженер | Когда делегируешь узкие задачи («спроектируй GraphQL-схему») |
| [🔤 Language specialists (30)](https://github.com/VoltAgent/awesome-claude-code-subagents/tree/main/categories/02-language-specialists) | python-pro, java-architect, rust-engineer, golang-pro, php-pro, typescript-pro и ещё 24 | Изолируют контекст, когда основной агент уходит в read-heavy работу по одному языку |
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

- [gastownhall/gastown](https://github.com/gastownhall/gastown) — Multi-agent workspace manager от Steve Yegge. Персистентный трекинг работы, true background, рассчитан на сложные multi-agent сценарии. 17.8k⭐.
- [sipyourdrink-ltd/bernstein](https://github.com/sipyourdrink-ltd/bernstein) — Детерминистский оркестратор с HMAC-chained audit-log. Spawn'ит параллельные агенты, верифицирует тестами, авто-коммитит. Ноль LLM-токенов на координацию.
- [ruvnet/ruflo](https://github.com/ruvnet/ruflo) — Multi-agent swarm-платформа с RAG, self-learning и нативной интеграцией Claude Code. Бывший claude-flow, 69k⭐.

### Parallel GUI / kanban

- [BloopAI/vibe-kanban](https://github.com/BloopAI/vibe-kanban) — Kanban-доска для управления параллельными coding agents. 26.5k⭐, самый популярный GUI под Claude Code и Codex.
- [smtg-ai/claude-squad](https://github.com/smtg-ai/claude-squad) — TUI-менеджер параллельных терминальных Claude/Codex/Amp/OpenCode-сессий. Каждая в своём worktree.
- [stravu/crystal (теперь Nimbalyst)](https://github.com/stravu/crystal) — Desktop-приложение для параллельных Claude и Codex сессий в worktrees. Diff-viewer, сравнение подходов в одном окне.
- [manaflow-ai/cmux](https://github.com/manaflow-ai/cmux) — Ghostty-based macOS-терминал с вертикальными табами и push-нотификациями для coding agents.
- [generalaction/emdash](https://github.com/generalaction/emdash) — Open-source agentic IDE (YC W26) для параллельных coding agents любого провайдера.

### Autonomous loops и approval-gated

- [frankbria/ralph-claude-code](https://github.com/frankbria/ralph-claude-code) — Autonomous-цикл «работай пока не готово» с intelligent exit detection. Эталонный Ralph-pattern (Geoffrey Huntley) под Claude Code.
- [humanlayer/humanlayer](https://github.com/humanlayer/humanlayer) — Фреймворк для сложных задач в больших кодовых базах: human-in-loop approval-чекпоинты на критичных шагах.

**Главный источник** — [andyrewlee/awesome-agent-orchestrators](https://github.com/andyrewlee/awesome-agent-orchestrators) с 4 категориями и сотней тулов. Наш отбор: ≥3k⭐ + явная поддержка Claude Code (исключение — bernstein: 0.5k⭐, но уникальная audit-grade ниша).

---

## Workflow-методологии

Готовые opinionated-методологии под Claude Code: полные циклы **Research → Plan → Execute → Review → Ship**, упакованные в плагины или skill-коллекции. В отличие от skills (атомарных — одна задача) и orchestration (запуск нескольких сессий), это **полные многошаговые workflow под цикл фичи** одной сессией.

> 📚 Основной EN-репо для всего раздела ниже: [shanraisshan/claude-code-best-practice](https://github.com/shanraisshan/claude-code-best-practice) — 54.8k⭐, ежедневные апдейты под версии Claude Code, hot-features, Boris Cherny tips, cross-model паттерны.
>
> 🇷🇺 **Переводы тематических батчей советов** от Boris Cherny (создатель Claude Code) и Thariq (Anthropic): **[docs/tips-ru.md →](./docs/tips-ru.md)** — 8 батчей за январь–апрель 2026 плюс разбор трёх фаз воркшопа How We Claude Code (Code with Claude 2026).

### Spec → Plan → Ship методологии

- [github/spec-kit](https://github.com/github/spec-kit) — Spec-Driven Development от GitHub. 106k⭐. /speckit.specify → clarify → plan → tasks → analyze → implement.
- [affaan-m/ECC](https://github.com/affaan-m/ECC) — Крупнейшая коллекция: 48 агентов + 143 команды + 230 скиллов. Оптимизация harness'а под Claude, Codex, Cursor. 243k⭐.
- [garrytan/gstack](https://github.com/garrytan/gstack) — Сетап Garry Tan (Y Combinator): 23 инструмента в ролях CEO, Designer, Eng Manager, Release Manager, QA. 102k⭐.
- [open-gsd/gsd-core](https://github.com/open-gsd/gsd-core) — Meta-prompting и context-engineering: пять фаз discuss → plan → execute → verify → ship, каждая в свежем контексте субагента. Преемник get-shit-done, тот заархивирован.
- [Fission-AI/OpenSpec](https://github.com/Fission-AI/OpenSpec) — Spec-driven development под AI coding assistants. /opsx:propose → apply → archive.
- [bmad-code-org/BMAD-METHOD](https://github.com/bmad-code-org/BMAD-METHOD) — Breakthrough Method for Agile AI-Driven Development. Product brief → PRD → architecture → epics → sprint planning → dev → review.
- [EveryInc/compound-engineering-plugin](https://github.com/EveryInc/compound-engineering-plugin) — Официальный Compound Engineering plugin от Every Inc. /ce-ideate → brainstorm → plan → work → review → debug → optimize.

### Cross-model: связка Claude с Codex / Gemini / GPT

Три механизма интеграции Claude Code с другими моделями (Codex, Gemini, GPT, Kimi, DeepSeek, локальные):

- **Plugin** — CLI другой модели запускается внутри Claude Code как слэш-команда (`/codex:review`).
- **MCP** — Claude Code вызывает другую модель как tool через Model Context Protocol.
- **Router** — API-endpoint Claude подменяется на любого OpenAI-совместимого провайдера.

- [musistudio/claude-code-router](https://github.com/musistudio/claude-code-router) — Router: подменяет API-endpoint Claude на OpenRouter, DeepSeek, Ollama, Gemini, Kimi, Qwen, Groq. Per-task model selection.
- [router-for-me/CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) — Обёртка для Gemini CLI, Codex, Claude Code, Antigravity как OpenAI/Gemini/Claude/Codex-совместимого API.
- [openai/codex-plugin-cc](https://github.com/openai/codex-plugin-cc) — Официальный OpenAI-plugin: /codex:review, /codex:adversarial-review, /codex:rescue внутри Claude Code. Codex/GPT-5 как QA-партнёр.
- [BeehiveInnovations/pal-mcp-server](https://github.com/BeehiveInnovations/pal-mcp-server) — Multi-model MCP-сервер (бывш. zen-mcp): Gemini, OpenAI, Azure, Grok, Ollama, OpenRouter как Claude tools. 50+ моделей.

---

## Evals

Evals — регрессионные тесты для агентного workflow: golden-набор задач, грейдер и прогон при каждом изменении промпта, скилла или модели. Без них изменение оценивается на глаз по одному прогону, и поломки всплывают уже у пользователей.

Два паттерна из материалов Anthropic:

- **Двухслойный грейдер.** Дешёвые программные проверки (парсинг артефакта, подсчёт метрик) отсеивают грубые провалы, LLM-судья оценивает качество там, где кода недостаточно. Каждая версия промпта измеряется по всему набору задач.
- **Сначала аудит, потом sweep.** Прогон по сетке моделей поверх сломанных evals даёт цифры, которым нельзя верить. Скилл [eval-audit-and-sweep](https://github.com/anthropics/cwc-workshops/tree/main/rightmodel/.claude/skills/eval-audit-and-sweep) из раздела [Skills](#skills) закрывает обе фазы: чеклист-аудит, затем sweep модель × thinking × effort с ценой и скоростью на ячейку.

### Официальные материалы

- [Define success criteria (Claude Docs)](https://platform.claude.com/docs/en/test-and-evaluate/define-success) — Критерии успеха до написания промпта: измеримые метрики и пороги вместо «работает вроде нормально».
- [Create strong empirical evaluations (Claude Docs)](https://platform.claude.com/docs/en/test-and-evaluate/develop-tests) — Официальный гайд по построению evals: дизайн задач, типы грейдеров — код, LLM-судья, человек.
- [Evaluation tool (Anthropic Console)](https://platform.claude.com/docs/en/test-and-evaluate/eval-tool) — Прогон промпта по набору тест-кейсов в Console и сравнение версий бок о бок, без кода.
- [cwc-workshops/eval-driven-agent-development](https://github.com/anthropics/cwc-workshops/tree/main/eval-driven-agent-development) — Учебный пример от Anthropic: PPTX-агент, шесть версий промпта, набор из 10 задач и двухслойный грейдер — программные метрики по XML плюс LLM-судья по отрендеренным слайдам.

### Инструменты

- [promptfoo/promptfoo](https://github.com/promptfoo/promptfoo) — Декларативные конфиги для тестов промптов, агентов и RAG: сравнение моделей, red teaming, CI/CD. 23k⭐.
- [UKGovernmentBEIS/inspect_ai](https://github.com/UKGovernmentBEIS/inspect_ai) — Фреймворк evals от британского AISI: композиция из solvers и scorers, sandbox для агентных задач, просмотр логов.
- [confident-ai/deepeval](https://github.com/confident-ai/deepeval) — Тесты для LLM-приложений в стиле pytest: готовые метрики (G-Eval, hallucination, RAG), CI-интеграция. 17k⭐.
- [Arize-ai/phoenix](https://github.com/Arize-ai/phoenix) — Observability и evals: трейсинг на OpenTelemetry, датасеты, эксперименты, LLM-судьи. Self-hosted.
- [sierra-research/tau2-bench](https://github.com/sierra-research/tau2-bench) — Бенчмарк tool-агентов от Sierra: диалог с симулятором пользователя в доменах airline, retail, telecom. Учебный полигон воркшопа Picking the Right Model.

---

## Plugins

Плагин — упаковка скиллов, субагентов, hooks и MCP-серверов в один артефакт. Один плагин = один `/plugin install <name>`. См. [официальный гайд](https://code.claude.com/docs/en/plugins).

> 📂 Полный каталог: **[16 записей →](./catalog/plugins.md)**

### Главные маркетплейсы

- [obra/superpowers-marketplace](https://github.com/obra/superpowers-marketplace) — Маркетплейс с 20+ soft-скиллами и плагинами от Jesse Vincent. Базовая установка: `claude plugin marketplace add obra/superpowers-marketplace`.
- [ccplugins/awesome-claude-code-plugins](https://github.com/ccplugins/awesome-claude-code-plugins) — 50+ плагинов по 13 категориям (качество кода, git, devops, дизайн, бизнес). 782⭐. Установка: `claude plugin marketplace add ccplugins/awesome-claude-code-plugins`.
- [VoltAgent/awesome-claude-code-subagents](https://github.com/VoltAgent/awesome-claude-code-subagents) — 144 субагента, оформленные как плагин-маркетплейс.
- [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official) — Официальные плагины Anthropic.

### Полезные одиночные плагины

- [notlikeDev/CCPlugins](https://github.com/notlikeDev/CCPlugins) — Сборка самых ходовых slash-команд автора.
- [ApurvBazari/claude-plugins](https://github.com/ApurvBazari/claude-plugins) — Уведомления о событиях через ntfy / Pushover / Telegram.
- [0xdesign/design-plugin](https://github.com/0xdesign/design-plugin) — Дизайн-ориентированная обвязка для UI-задач.
- [jeremylongshore/tons-of-skills-marketplace](https://github.com/jeremylongshore/tons-of-skills-marketplace) — Маркетплейс на 471 плагин, 3069 скиллов и 347 агентов со своим пакетным менеджером ccpi.
- [TT-Wang/memem](https://github.com/TT-Wang/memem) — Постоянная память между сессиями: уроки и решения в markdown внутри Obsidian-хранилища, поиск через SQLite FTS5, разбор прошлых транскриптов. Бывший cortex-plugin.
- [Rich627/whatsapp-claude-plugin](https://github.com/Rich627/whatsapp-claude-plugin) — Интеграция с WhatsApp.
- [iurykrieger/claude-bedrock](https://github.com/iurykrieger/claude-bedrock) — Автоматизация «второго мозга» в Obsidian: сущности, загрузка, сжатие и синхронизация vault через скиллы Claude Code.

---

## Hooks

Hooks — shell-команды (или HTTP / MCP / prompt-агенты), которые запускаются по событиям сессии. См. [hooks reference](https://code.claude.com/docs/en/hooks).

> 📂 Связанные проекты: **[8 записей →](./catalog/hooks.md)**. Большая часть hooks живёт внутри плагинов — см. раздел [Plugins](#plugins) выше.

### Готовые hooks в этом репо

- [examples/hooks/](./examples/hooks/README.md) — Три рабочих hook'а с bash-скриптами и инструкциями, куда положить:
  - **pre-commit-secrets.sh** — детектор секретов в staged-diff. Спасает от утечки API-ключей, когда агент коммитит без проверки.
  - **ntfy.sh** — push-уведомления через ntfy.sh по событиям `Notification` и `Stop`.
  - **audit.sh** — JSONL-аудит каждого PostToolUse для разбора инцидентов.

### Community-проекты

- [Hooks guide (Claude Docs)](https://code.claude.com/docs/en/hooks-guide) — Официальное руководство с рабочими примерами на каждое событие сессии.
- [disler/claude-code-hooks-mastery](https://github.com/disler/claude-code-hooks-mastery) — Разбор всех восьми событий с готовыми обработчиками — самый полный набор примеров в сообществе. 3.9k⭐.
- [GowayLee/cchooks](https://github.com/GowayLee/cchooks) — Python-SDK: типизированный разбор входного JSON и коды возврата вместо ручного парсинга stdin.

### Observability — дашборды поверх hooks

Hooks дают поток событий сессии; эти проекты собирают его в живую картину: что делает агент, сколько субагентов работает параллельно, куда уходят токены. Годится и на разбор инцидента постфактум, и на наблюдение за автономным прогоном вживую.

- [disler/claude-code-hooks-multi-agent-observability](https://github.com/disler/claude-code-hooks-multi-agent-observability) — Real-time дашборд hook-событий сразу по нескольким параллельным агентам. 1.5k⭐.
- [hoangsonww/Claude-Code-Agent-Monitor](https://github.com/hoangsonww/Claude-Code-Agent-Monitor) — Self-hosted дашборд активности агента через hooks: сессии, tool-usage, оркестрация субагентов, kanban-статусы.
- [simple10/agents-observe](https://github.com/simple10/agents-observe) — Real-time observability сессий Claude Code и мульти-агентов, с фильтрацией и replay.
- [ColeMurray/claude-code-otel](https://github.com/ColeMurray/claude-code-otel) — Dockerized-стек OpenTelemetry → Grafana для мониторинга расхода, производительности и стоимости.

### Сценарии применения

**Безопасность:** pre-commit на секреты, запрет `git push --force` в `main` / `production`, `permissionDecision: "ask"` для команд со словом `production` или `prod-*`, JSONL-аудит каждого PostToolUse, блокировка `curl` и `wget` к доменам не из белого списка.

**Качество:** автоформат на PostToolUse Edit / Write (`prettier --write`, `ruff format`), `tsc --noEmit` на изменённых файлах, `eslint --fix`, `terraform fmt -recursive`.

**Workflow:** push в ntfy / Pushover / Telegram по событиям Notification и Stop, учёт стоимости в CSV по событию Stop, `direnv reload` по CwdChanged, авто-коммит по Stop с conventional-сообщениями.

**Архитектурные:** запрет редактирования `package.json` или lockfile без явного разрешения, pre-edit grep на использование функции, которую собираемся удалить, проверка структуры нового файла (`src/` / `tests/` / `docs/`).

---

## MCP-серверы

[Model Context Protocol](https://modelcontextprotocol.io/) — стандарт подключения внешних инструментов к LLM. Все MCP-серверы работают и в Claude Code, и в Claude Desktop, и в Cursor.

> 📂 Полный каталог: **[828 записей →](./catalog/mcp-servers.md)** — взято из [punkpeye/awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers) и официального реестра.

> **Правило практика:** пять хорошо подобранных MCP-серверов лучше двадцати — но не по той причине, которую обычно называют.
>
> Совет «каждый сервер съедает 1–3K контекста» описывает мир до версии 2.1.7. С неё по умолчанию работает [MCP tool search](https://code.claude.com/docs/en/mcp) в auto-режиме: когда описания тулов перевалили бы за **10% окна контекста**, они не грузятся на старте — остаются только имена и инструкции сервера, а определения подтягиваются по требованию через `MCPSearch`. Порог настраивается синтаксисом `auto:N` (2.1.9).
>
> Замер на моей машине: `claude -p "ok" --output-format json --strict-mcp-config`, один и тот же промпт, сервер playwright на 25 тулов, копии под разными именами.
>
> | Серверов | Контекст на старте | Дельта |
> |---:|---:|---:|
> | 0 | 27 070 | — |
> | 1 | 27 438 | +368 |
> | 3 | 28 174 | +1 104 |
>
> Ровно 368 токенов на сервер, линейно. Что это за число, проверяется отдельно: в том же прогоне модель на просьбу перечислить свои `mcp__*` выдаёт 25 имён и ни одного описания — то есть отложение работало, и 368 токенов это цена имён, а не определений. Девятнадцать таких серверов — около 7K, а не половина окна.
>
> Оговорка: это **нижняя граница**. Пока набор тулов не дотягивает до порога, определения грузятся на старте целиком, и цена будет заметно выше. Своё число снимаешь двумя прогонами — с пустым `--mcp-config '{"mcpServers":{}}'` и со своим конфигом; разница и есть цена.
>
> Ограничивать себя всё равно стоит, но из-за доверия и промахов, а не из-за токенов: каждый сервер — чужой код с доступом к твоему окружению, и чем больше похожих тулов, тем чаще модель берёт не тот. Какие из подключённых реально вызываются, покажет [`npx mcp-graveyard`](https://github.com/sfrangulov/skill-graveyard/tree/main/packages/mcp-graveyard) — аудит по локальным логам сессий, без сети и телеметрии.

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
- **PostgreSQL** — [crystaldba/postgres-mcp](https://github.com/crystaldba/postgres-mcp). Дебаг запросов и схемы прод-БД: настраиваемый режим read-only или read/write плюс анализ производительности. Референсный сервер из modelcontextprotocol/servers удалён, это живая замена.
- **Filesystem** — [modelcontextprotocol/servers/filesystem](https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem). Чтение файлов вне рабочей директории (например, общая база знаний или соседний проект).
- **Playwright** — [microsoft/playwright-mcp](https://github.com/microsoft/playwright-mcp). Для тестов UI и скрейпинга. Альтернатива — Browserbase для облачных браузеров.
- **Context7** — [upstash/context7](https://github.com/upstash/context7). Свежая документация популярных библиотек — Claude перестаёт выдумывать API устаревших версий.
- **Локальный RAG** — [sfrangulov/minirag-mcp](https://github.com/sfrangulov/minirag-mcp). Гибридный поиск (семантика + BM25) по своим документам: база знаний проекта, 12 входных форматов через markitdown, ничего не уходит с машины. От мейнтейнера этого handbook.
- **Linear** — [linear.app/docs/mcp](https://linear.app/docs/mcp). Если ведёшь задачи в Linear — агент сам читает спеки и комментирует issues. Официальный remote-сервер, ставится через `claude mcp add`.
- **Sequential thinking** — [modelcontextprotocol/servers/sequentialthinking](https://github.com/modelcontextprotocol/servers/tree/main/src/sequentialthinking). Структурированное пошаговое мышление для сложных задач.

Полная разбивка по 30 категориям — базы данных, version control, dev-инструменты, облака, браузеры, поиск, коммуникации, мониторинг, безопасность, базы знаний, агрегаторы, sandbox-окружения, рабочие инструменты, файловые системы, OS, мультимедиа, data science, RAG, маркетинг, продукт, customer data, соцсети, поддержка, e-commerce, fintech, визуализация, путешествия — в **[catalog/mcp-servers.md](./catalog/mcp-servers.md)**.

---

## CLAUDE.md шаблоны

`CLAUDE.md` в корне репозитория автоматически подгружается в контекст. См. [memory docs](https://code.claude.com/docs/en/memory).

> 📂 Полный каталог: **[10 записей →](./catalog/templates.md)**

### Шаблоны в этом репо

- [examples/claude-md-templates/nextjs.md](./examples/claude-md-templates/nextjs.md) — Next.js 16 + React 19 + TypeScript + Tailwind 4.
- [examples/claude-md-templates/python-fastapi.md](./examples/claude-md-templates/python-fastapi.md) — Python 3.13+ + FastAPI + SQLAlchemy 2.0 + Pydantic v2.
- [examples/claude-md-templates/terraform.md](./examples/claude-md-templates/terraform.md) — Terraform 1.13+ с упором на безопасность state.

Каждый закрывает пять блоков: стек, команды, структура, правила/анти-паттерны, чек-лист перед PR.

### Известные сборники

- [multica-ai/andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills) — `CLAUDE.md`, собранный из практик Andrej Karpathy. 128k⭐.
- [garrytan/gstack](https://github.com/garrytan/gstack) — Сетап Garry Tan: 23 opinionated-инструмента. 95k⭐.
- [affaan-m/ECC](https://github.com/affaan-m/ECC) — Полная оптимизация harness'а: скиллы, повадки, память, research-first разработка. 243k⭐.

### Под конкретный стек

- [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) — Best-practices Next.js, де-факто эталонный шаблон от Vercel.
- [supabase/agent-skills](https://github.com/supabase/agent-skills) — Supabase и PostgreSQL.
- [callstackincubator/agent-skills](https://github.com/callstackincubator/agent-skills) — Шаблоны React Native.
- [shadcn/ui skills](https://ui.shadcn.com/docs/skills) — Компоненты shadcn с принудительным применением паттернов.
- [expo/skills](https://github.com/expo/skills) — Expo. 25K+ установок.
- [get-convex/agent-skills](https://github.com/get-convex/agent-skills) — Convex — реактивный бэкенд.
- [microsoft/azure-skills](https://github.com/microsoft/azure-skills) — Деплой в Azure и best-practices от Microsoft.
- [firebase/agent-skills](https://github.com/firebase/agent-skills) — Firebase и Firestore.
- [docs.stripe.com/agents](https://docs.stripe.com/agents) — Гайд Stripe по агентным платежам: MCP-сервер, agent toolkit, правила для платёжных интеграций.

### Тематические гайды

- [Anthropic engineering: Claude Code best practices](https://www.anthropic.com/engineering/claude-code-best-practices) — Официальный пост.
- [Год с Claude Code (alpinadigital, Habr)](https://habr.com/ru/companies/alpinadigital/articles/1032134/) — Год опыта в конфигурации.
- [Claude Code: практический гайд (Habr)](https://habr.com/ru/articles/987094/) — Сетап на русском.

---

## Status Lines

Статуслайн — строка под промптом Claude Code, куда выводятся лимиты, окно контекста, модель, git и стоимость сессии. Пара строк конфига убирает постоянные `/context` и `/cost`. См. [официальную доку](https://code.claude.com/docs/en/statusline).

- [sirmalloc/ccstatusline](https://github.com/sirmalloc/ccstatusline) — Powerline-статуслайн с темами и настройкой каждого сегмента: лимиты, окно контекста, модель, git, стоимость. Ставится как npm-пакет. 12.6k⭐.
- [leeguooooo/claude-code-usage-bar](https://github.com/leeguooooo/claude-code-usage-bar) — Статуслайн с лимитами 5h/7d, обратным отсчётом до сброса, моделью, окном контекста и возрастом prompt-cache. 3 стиля × 9 тем, daemon-режим. 302⭐.
- [briansmith80/claude-code-status-bar](https://github.com/briansmith80/claude-code-status-bar) — Настраиваемый статуслайн на чистом bash без зависимостей: лимиты с маркерами pacing, окно контекста, git, стоимость сессии, 8 тем.
- [educlopez/ccvitals](https://github.com/educlopez/ccvitals) — Минималистичный статуслайн на чистом bash — не блокирует ввод: квота, окно контекста, git-статус.
- [kumamaki/Claude-Code-Personalities](https://github.com/kumamaki/Claude-Code-Personalities) — Kaomoji-лица в статуслайне реагируют в реальном времени на то, чем занят агент, вплоть до эскалации «раздражения».

---

## Мониторинг расхода и стоимости

Трекеры токенов, квоты и денег: от статуслайна с тратами за день до отдельного дашборда со шкалами rate-limit и прогнозом до сброса. Пригодится на Pro/Max, чтобы не упереться в 5-часовой лимит посреди задачи. См. [про стоимость](https://code.claude.com/docs/en/costs).

- [mag123c/toktrack](https://github.com/mag123c/toktrack) — Быстрый трекер токенов и стоимости для Claude Code и других LLM. 174⭐.
- [zihenghe04/CCDash](https://github.com/zihenghe04/CCDash) — Единая панель расхода токенов, квоты и стоимости по Claude Code, claude.ai и API в одном окне.
- [backstabslash/goccc](https://github.com/backstabslash/goccc) — Калькулятор стоимости и статуслайн на Go, single binary: разбивка по модели, дню, проекту и ветке.
- [Ventuss-OvO/cc-costline](https://github.com/Ventuss-OvO/cc-costline) — Статуслайн с тратами за 7 и 30 дней.
- [fabioconcina/claumon](https://github.com/fabioconcina/claumon) — Дашборд для Pro/Max: живые шкалы rate-limit, калиброванные прогнозы расхода, стоимость сессий, просмотр памяти. Один бинарник, zero config.
- [EricAndrechek/Pacer](https://github.com/EricAndrechek/Pacer) — Нативное macOS-приложение для учёта токенов, стоимости и pacing по rate-limit, с разбивкой по проектам.

---

## Гайды и контент на русском

> 📂 Полный список: **[12 записей →](./catalog/ru-content.md)**

### Официальная документация — теперь на русском

**[code.claude.com/docs/ru →](https://code.claude.com/docs/ru/quickstart)** — 122 страницы: быстрый старт, глоссарий, стоимость и лимиты, разбор ошибок, режимы разрешений, окно контекста, prompt caching, все примитивы (skills, субагенты, hooks, MCP, плагины, память) и еженедельный [журнал изменений](https://code.claude.com/docs/ru/whats-new). Перевод местами машинный, но полный и рабочий.

Начинай отсюда, а не с чужих пересказов. Справочник закрыт вендором — этот хендбук про другое: не что умеет каждый примитив по отдельности, а **что из этого брать, в каком порядке собирать и что выключить через месяц**.

### В этом репо

- **[docs/tips-ru.md](./docs/tips-ru.md)** — переводы тематических батчей советов от Boris Cherny (создатель Claude Code) и Thariq (Anthropic). 8 батчей с января по апрель 2026: Boris × 6 (13/10/12/2/15/6 советов) + Thariq × 2 (Skills, Session Management). Все 75 советов в хронологическом порядке, newest-first. Плюс разбор трёх фаз воркшопа How We Claude Code с Code with Claude 2026: спека через интервью, четыре HTML-варианта дизайна, верифицируемая архитектура компонентов.

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

- [Security best practices](https://code.claude.com/docs/en/security) — Официальный гайд.
- [Permissions / IAM](https://code.claude.com/docs/en/iam) — Настройка прав, `allowManagedHooksOnly` для enterprise.
- [anthropics/defending-code-reference-harness](https://github.com/anthropics/defending-code-reference-harness) — Эталонный харнесс Anthropic: скиллы threat-model / vuln-scan / triage / patch + автономный pipeline в песочнице. Сопровождается разбором «Using LLMs to secure source code».
- [trailofbits/skills](https://github.com/trailofbits/skills) — Security-скиллы Trail of Bits: CodeQL / Semgrep, аудит кода.
- [anthropics/claude-code-security-review](https://github.com/anthropics/claude-code-security-review) — GitHub Action: Claude-ревьюер безопасности на каждый PR, с фильтрацией ложных срабатываний.
- [firebase/agent-skills@firestore-security-rules-auditor](https://www.skills.sh/firebase/agent-skills/firestore-security-rules-auditor) — Аудит security-rules Firestore перед прод-релизом. 20K+ установок.
- [Anthropic enterprise governance](https://www.anthropic.com/enterprise) — Корпоративный governance.

### Enterprise-паттерны

- [Managed plugin marketplaces](https://code.claude.com/docs/en/plugins#managed) — Только проверенные скиллы из собственного маркетплейса организации.
- [Permission policies](https://code.claude.com/docs/en/permissions#managed-settings) — Список разрешённых Bash-команд на уровне организации.
- [Hooks reference](https://code.claude.com/docs/en/hooks) — Схема всех событий — для аудита и блокировки.
- [examples/hooks/audit.sh](./examples/hooks/scripts/audit.sh) — JSONL-аудит каждого PostToolUse для compliance.

---

## Прочие ресурсы

### Промптинг

- [Anthropic Prompting Guide](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview) — Официальный гайд.
- [Anthropic Cookbook](https://github.com/anthropics/claude-cookbooks) — Примеры паттернов с кодом.
- [anthropics/cwc-workshops](https://github.com/anthropics/cwc-workshops) — Материалы девяти воркшопов с конференции Code with Claude: workflow «спека → варианты дизайна → верификация», скилл для аудита evals и подбора модели по цене и скорости, eval-driven разработка агентов на Managed Agents. Архив без поддержки, Apache-2.0.
- [Claude API Skills best practices](https://platform.claude.com/docs/ru/agents-and-tools/agent-skills/best-practices) — Официальный документ на русском.
- [dair-ai/Prompt-Engineering-Guide](https://github.com/dair-ai/Prompt-Engineering-Guide) — Академический гайд, 50k+⭐.
- [f/prompts.chat](https://github.com/f/prompts.chat) — Готовые промпты, применимы и к Claude.
- [PatrickJS/awesome-cursorrules](https://github.com/PatrickJS/awesome-cursorrules) — `.cursorrules` для разных стеков, многие подходят и для CLAUDE.md.

### Каналы и сообщества

- [@cc_consultant (Telegram, RU)](https://t.me/cc_consultant) — Этот handbook и ежедневные разборы.
- [Anthropic Discord](https://www.anthropic.com/discord) — Каналы `#claude-code`, `#skills-and-tools`, `#show-and-tell`.
- [r/ClaudeAI](https://www.reddit.com/r/ClaudeAI/) — Reddit-сообщество.
- [r/Anthropic](https://www.reddit.com/r/Anthropic/) — Официальный сабреддит.

### Подкасты и YouTube (EN)

- [Latent Space (swyx)](https://www.latent.space/) — AI-инженерия, регулярные выпуски про Claude Code и MCP.
- [The Cognitive Revolution](https://www.cognitiverevolution.ai/) — Nathan Labenz, AI-индустрия и тренды.
- [Practical AI (Changelog)](https://practicalai.show/) — Практические кейсы AI.
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
- [Devin Desktop (бывший Windsurf)](https://devin.ai/desktop) — IDE-агент Codeium: Windsurf перешёл к Cognition и переименован.

### Утилиты

- [Anthropic Console](https://platform.claude.com/) — Playground, библиотека промптов, выдача API-ключей.
- [Anthropic Workbench](https://platform.claude.com/workbench) — UI для экспериментов с промптами.
- [Anthropic Status](https://status.anthropic.com/) — Статус сервисов.
- [Claude release notes](https://code.claude.com/docs/en/changelog) — Официальный changelog.
- [Skills.sh](https://www.skills.sh/) — Маркетплейс скиллов с количеством установок.
- [sfrangulov/skill-graveyard](https://github.com/sfrangulov/skill-graveyard) — Аудит установленных скиллов по локальным логам сессий: active / dead / missing / hallucinated. `npx skill-graveyard`, без сети и телеметрии; в монорепо — mcp-graveyard и memory-graveyard. От мейнтейнера этого handbook.
- [shanraisshan/claude-code-best-practice](https://github.com/shanraisshan/claude-code-best-practice) — Эталонный EN-сборник best practices с ежедневными апдейтами под версии Claude Code. Покрывает все hot-features, Boris Cherny tips, cross-model паттерны.

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
