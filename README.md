<!--
README.md is generated from this template + data/*.json.
Edit this file or data/*.json, then run: node scripts/build-readme.mjs
CI gate: node scripts/build-readme.mjs --check
-->

# Claude Code Handbook на русском [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

> [Claude Code](https://code.claude.com/docs/en/overview) — CLI-агент Anthropic для разработки в терминале с поддержкой MCP, хуков и автономных субагентов.

Команды и настройки смотри в [официальной документации](https://code.claude.com/docs/ru/quickstart). Здесь я помогаю выбрать инструменты, настроить их под свои задачи и понять, что оказалось лишним.

Ежедневные разборы и обзоры релизов — в Telegram [@cc_consultant](https://t.me/cc_consultant). Связь и консультации: [@sfrangulov](https://t.me/sfrangulov).

**Полный каталог без отбора (1404 записи по типам)** — в [catalog/](./catalog/README.md). В эту подборку вошли инструменты, которыми я пользуюсь в клиентских проектах, и популярные инструменты с большим числом установок.

> 📄 **[Шпаргалка на 1 страницу A4 →](./cheatsheet/)** Все горячие клавиши, слэш-команды, MCP, память, рабочие процессы, скиллы, агенты и CLI-флаги на одном листе. Скачай [готовый PDF](./cheatsheet/cheatsheet.pdf) или открой [index.html](./cheatsheet/index.html) → `⌘P`.

---

## С чего начать

- **Первый запуск.** Пройди [быстрый старт](#quickstart-за-10-минут), а [шпаргалку](./cheatsheet/) держи под рукой.
- **Выбираю скиллы.** В [сравнении трёх семейств](./docs/skill-families-ru.md) разбираю, кому какой набор подойдёт.
- **Агент ошибается.** Начни с [правил проекта в CLAUDE.md](#шаблоны-claudemd). В разделе [Evals](#evals) описано, как проверить, помогли ли изменения.
- **Хочу разобраться с расходами.** Загляни в [мониторинг стоимости](#мониторинг-расхода-и-стоимости): там есть инструменты для учёта трат и способы их сократить.

## Содержание

- [Quickstart](#quickstart-за-10-минут)
- [Harness (обвязка)](#harness-обвязка) — идея «обвязка важнее модели» и автономный конвейер
- [Skills](#skills) — наборы инструкций для повторного использования
- [Sub-agents](#sub-agents) — параллельные агенты со своим контекстом
- [Терминал и сессии агентов](#терминал-и-сессии-агентов) — среда выполнения агентов: herdr и tmux
- [Оркестрация](#оркестрация-и-параллельные-агенты) — внешние инструменты для одновременной работы с несколькими агентами Claude
- [Методологии разработки](#методологии-разработки) — циклы с заданными правилами: спецификация → план → выпуск
- [Evals](#evals) — оценка качества агентов и промптов
- [Plugins](#plugins) — скиллы, субагенты, MCP и хуки в одном пакете
- [Hooks](#hooks) — shell-команды, привязанные к событиям сессии
- [Mods](#mods) — плагины, которые выводят элементы интерфейса и перехватывают события внутри Claude Code
- [MCP-серверы](#mcp-серверы) — подключение внешних инструментов через Model Context Protocol
- [Шаблоны CLAUDE.md](#шаблоны-claudemd) — готовые конфиги под твой стек
- [Строки состояния](#строки-состояния) — под промптом: лимиты, контекст и стоимость
- [Мониторинг расхода и стоимости](#мониторинг-расхода-и-стоимости) — учёт токенов, квот и трат
- [Гайды и контент на русском](#гайды-и-контент-на-русском)
- [Прочие ресурсы](#прочие-ресурсы) — каналы, подкасты, аналоги
- [Безопасность и корпоративное использование](#безопасность-и-корпоративное-использование)
- [Как добавить ресурс](#как-добавить-ресурс)

---

## Quickstart за 10 минут

Этого хватит для 80% типичных задач без дополнительной настройки.

```bash
# 1. Сам Claude Code
npm install -g @anthropic-ai/claude-code

# 2. MCP-серверы. Контекст перестал быть главным аргументом: с 2.1.7 тяжёлые
#    наборы инструментов откладываются и грузятся по требованию (замер — в разделе MCP).
#    Ограничивай себя из-за другого: каждый сервер — чужой код с доступом к твоему
#    окружению, плюс лишние похожие инструменты, среди которых модель промахивается.
claude mcp add github      # @modelcontextprotocol/server-github (issues, PR)
claude mcp add postgres    # @modelcontextprotocol/server-postgres (read-only прод)
```

**3.** Запусти `claude` в любом репозитории и установи superpowers командой:

```
/plugin install superpowers@claude-plugins-official
```

В наборе 14 связанных скиллов (TDD, brainstorming, systematic-debugging, code-review, planning, parallel-agents, subagent-driven-development и другие). Добавлять сторонний маркетплейс больше не нужно: superpowers теперь есть в официальном маркетплейсе Anthropic. Команда `claude plugin marketplace add obra/superpowers-marketplace` нужна только для установки [девяти дополнительных плагинов](./docs/skill-families-ru.md#установка) автора.

Если не уверен, что выбрать — superpowers, скиллы Matt Pocock или ECC, — прочитай **[разбор трёх семейств →](./docs/skill-families-ru.md)**: подходы, полные списки и рекомендации, кому что подойдёт.

**Куда смотреть в первую очередь:**

1. [Шпаргалка на одну страницу](./cheatsheet/) — PDF для печати, чтобы держать под рукой горячие клавиши, слэш-команды, MCP, память, рабочие процессы и CLI-флаги. A4, книжная ориентация, 3 колонки. Скачай готовый [cheatsheet.pdf](./cheatsheet/cheatsheet.pdf) или открой [index.html](./cheatsheet/index.html) и нажми `⌘P`.
2. [Топ-15 скиллов по числу установок](#топ-15-скиллов-skillssh) — то, что уже установили более 100 тысяч человек.
3. [Hooks](#hooks) — сразу поставь хотя бы `pre-commit-secrets`: он защищает от утечки API-ключей через git-коммит, который агент может сделать за 30 секунд.
4. [Шаблоны CLAUDE.md](#шаблоны-claudemd) — три шаблона для рабочих проектов: Next.js, Python/FastAPI, Terraform.
5. [Гайды на русском](#гайды-и-контент-на-русском) — 18 статей с Habr + 11 YouTube-курсов + DTF.

---

## Harness (обвязка)

В 2026 году результат всё меньше зависит от самой модели и всё больше — от **обвязки вокруг неё, harness**. Скиллы, субагенты, хуки, MCP, `CLAUDE.md` и песочница вместе превращают «умную модель» в воспроизводимый автономный процесс. Узкое место теперь в другом: искать баги и возможные фичи стало дёшево, а сам поиск легко распараллелить; дорого теперь **проверить находки, расставить приоритеты и внести правку**. Anthropic прямо говорит об этом на примере безопасности: «discovery is now straightforward to parallelize, and the bottleneck has shifted to verification, triage, and patching».

> 📐 Эталонная реализация — [anthropics/defending-code-reference-harness](https://github.com/anthropics/defending-code-reference-harness): скиллы `/threat-model`, `/vuln-scan`, `/triage`, `/patch` и автономный конвейер в песочнице, который можно настроить под свой стек через `/customize`. Разбор практик — [«Using LLMs to secure source code»](https://claude.com/blog/using-llms-to-secure-source-code) (копия в репозитории: [`docs/blog-post.md`](https://github.com/anthropics/defending-code-reference-harness/blob/main/docs/blog-post.md)). Репозиторий посвящён безопасности, но **та же архитектура обвязки работает для любой автономной задачи**.

### Из чего собрана обвязка

Все компоненты уже разобраны в справочнике. Ниже — только то, как из них собирается обвязка, без повторения этих страниц:

- **[Skills](#skills)** — отдельные процедуры. Один скилл = один шаг конвейера: поиск, разбор находок, исправление.
- **[Sub-agents](#sub-agents)** — изоляция контекста: на каждом шаге свой агент со своим контекстным окном.
- **[Hooks](#hooks)** — код обеспечивает жёсткие ограничения: хук на нужном событии блокирует запрещённое действие.
- **[Mods](#mods)** — ограничения и интерфейс внутри процесса: мод-ограничитель сохраняет состояние между вызовами и работает даже в `claude -p`.
- **[MCP-серверы](#mcp-серверы)** — инструменты и доступ к данным. Следи за тем, сколько контекста они занимают: 5 серверов лучше 20.
- **[Шаблоны CLAUDE.md](#шаблоны-claudemd)** — правила, память и рамки задачи: то, что модель читает перед началом работы (модель угроз, принятые соглашения, границы доверия).
- **[Оркестрация](#оркестрация-и-параллельные-агенты)** — запуск всего конвейера: фоновые процессы, параллельные агенты, автономные циклы.
- **Трекер задач вместо плана в Markdown** — то, чего в этом списке дольше всего не хватало. План в `PLAN.md` живёт ровно до сжатия контекста: агент забывает, что уже сделано и что было заблокировано. [gastownhall/beads](https://github.com/gastownhall/beads) (27k⭐) хранит задачи в виде графа зависимостей, `bd ready` выдаёт только незаблокированные задачи, `bd remember` сохраняет память и после сжатия контекста, и после `/clear`, а старые закрытые задачи сжимаются, чтобы не занимать контекст. Этот справочник тоже ведётся в beads.

### Как устроен автономный конвейер

Anthropic свёл опыт команд к циклу **модель угроз → песочница → поиск → проверка → разбор находок → исправление**. Первые два шага выполняешь один раз на проект, остальные четыре повторяешь при работе с кодом. Эти принципы применимы не только к безопасности:

1. **Сначала раздели поиск на участки, потом распараллель, а не просто запускай больше агентов.** Сначала разведка делит область поиска (8 парсеров, N эндпоинтов), потом параллельные агенты берут разные участки — иначе все находят одни и те же мелкие баги. «Просто слали больше агентов» → «tons of issues, most of them duplicates».
2. **Полнота и точность — на разных шагах.** При поиске собирают максимум возможных находок, даже маловероятных; при проверке отсекают неподтверждённые. Если один агент делает и то и другое сразу, он начинает отсеивать собственные идеи и отбрасывает реальные находки.
3. **Независимый проверяющий, который пытается опровергнуть находку.** Проверяющий работает в свежем контейнере, без общей истории и файловой системы с агентом, который её обнаружил, — иначе он соглашается вместо того, чтобы проверять. Промпт: считай находку ложной, ищи, почему она неверна. Одного проверяющего мало — запускай несколько, с разными моделями и подходами, принимай решение большинством голосов, а спорные случаи отдавай отдельному арбитру.
4. **Ограничения обеспечивают песочница и код, а не промпт.** «Сказали модели, что сети нет, — а она нашла путь в GitHub». Ограничения обеспечивает изоляция (gVisor/microVM, исходящие соединения только к API, никаких `~/.aws`/`~/.ssh`/`.env`), а не строчка в инструкции.
5. **Подтверждай фактом, а не словом.** Находка считается подтверждённой, только когда агент собрал PoC и воспроизвёл его на стенде. Степень серьёзности определяют после того, как модель ответила на вопросы по критериям: доступность уязвимого кода, возможности атакующего, необходимые условия, авторизация, масштаб последствий. А не назначают с потолка по принципу «SQL injection → critical».
6. **Минимальная правка и последовательные проверки.** Сначала тест, который падает на старом коде (да, это TDD). Патч проверяется поэтапно, от дешёвых проверок к дорогим: **сборка → PoC больше не срабатывает → старые тесты проходят → новый агент повторяет атаку**. Исправляй причину, а не место вызова; правка должна быть минимальной, без рефакторинга и попутной уборки — иначе «дыру закрыли, но порвали связь с сервисом».

> 🔁 Каждый проход улучшает следующий: подтверждённые находки и патчи учитываются в модели угроз и в контексте следующей проверки. Готовый GitHub Action с Claude-ревьюером для каждого PR — [anthropics/claude-code-security-review](https://github.com/anthropics/claude-code-security-review).

---

## Skills

Скиллы — это наборы инструкций для повторяющихся задач. Claude подгружает нужный скилл, когда задача подходит под его описание. Например, для разработки через тесты (TDD), проверки кода или поиска проблем с производительностью. См. [официальное руководство](https://code.claude.com/docs/en/skills).

> 📂 Полный каталог: **[159 записей →](./catalog/skills.md)**

### Топ-15 скиллов (skills.sh)

Скиллы отсортированы по числу установок на [skills.sh](https://skills.sh). В третьей колонке я объясняю, когда каждый из них пригодится. Установить можно одной командой: `npx skills add <owner/repo@skill>`.

| Скилл | Зачем и когда использовать | Установок |
|---|---|---:|
| [mattpocock/skills@grill-me](https://skills.sh/mattpocock/skills/grill-me) | Безжалостно разбирает твой план или дизайн: агент задаёт вопрос за вопросом, пока не найдёт слабые места. Вызывается только вручную, прежде чем писать код по ещё сырой идее. | **1.3M** |
| [mattpocock/skills@grill-with-docs](https://skills.sh/mattpocock/skills/grill-with-docs) | «Допрашивай» документацию через find/grep: вместо догадок получай точные цитаты. Особенно полезно для библиотек, о которых у Claude устаревшие сведения. | **1.1M** |
| [mattpocock/skills@improve-codebase-architecture](https://skills.sh/mattpocock/skills/improve-codebase-architecture) | Ищет в кодовой базе мелкие модули, которые стоит «углубить», начиная с участков, где код меняется чаще всего. Показывает находки в HTML-отчёте, а выбранную разбирает, задавая вопросы. Для планового рефакторинга, когда неясно, с чего начать. | **1.0M** |
| [mattpocock/skills@tdd](https://skills.sh/mattpocock/skills/tdd) | Дисциплинированный цикл TDD (red-green-refactor): не даёт агенту писать код раньше тестов. От Matt Pocock. | **1.0M** |
| [vercel-labs/agent-browser@agent-browser](https://skills.sh/vercel-labs/agent-browser/agent-browser) | CLI для управления браузером: агент открывает страницы, заполняет формы, кликает, делает скриншоты и извлекает данные. Бери, когда агенту нужно проверить веб-приложение своими глазами или выполнить задачу на сайте. Умеет управлять и Electron-приложениями. | **957K** |
| [anthropics/skills@frontend-design](https://skills.sh/anthropics/skills/frontend-design) | Помогает сделать интерфейс выразительнее. Используй, если результат выглядит шаблонно, например когда Claude снова собрал страницу из одинаковых карточек. Для React и Tailwind. | **954K** |
| [mattpocock/skills@setup-matt-pocock-skills](https://skills.sh/mattpocock/skills/setup-matt-pocock-skills) | Настраивает репозиторий для работы с инженерными скиллами Matt Pocock: трекер задач, метки для разбора и размещение документов. Запускается один раз, перед первым использованием остальных скиллов набора. | **941K** |
| [mattpocock/skills@handoff](https://skills.sh/mattpocock/skills/handoff) | Собирает краткое содержание текущего разговора в документ, по которому другой агент или новая сессия сможет продолжить работу. Пригодится, когда контекст на исходе или задачу нужно передать дальше. | **917K** |
| [mattpocock/skills@triage](https://skills.sh/mattpocock/skills/triage) | Разбирает задачи и внешние PR по ролям: определяет категорию, проверяет, при необходимости задаёт уточняющие вопросы и пишет бриф, по которому агент может сразу приступить к работе. Для репозиториев, куда постоянно поступают новые задачи. | **889K** |
| [mattpocock/skills@grilling](https://skills.sh/mattpocock/skills/grilling) | Тот же допрос, что в `grill-me`, но включается сам, когда ты просишь проверить план, решение или идею на прочность. `grill-me` — ручная команда для вызова этого скилла. | **834K** |
| [vercel-labs/agent-skills@vercel-react-best-practices](https://skills.sh/vercel-labs/agent-skills/vercel-react-best-practices) | Рекомендации Vercel по производительности React/Next.js: правильные границы между клиентом и RSC, кэширование, уменьшение размера бандла. Подключай в любом Next.js-проекте. | **771K** |
| [mattpocock/skills@domain-modeling](https://skills.sh/mattpocock/skills/domain-modeling) | Строит и уточняет модель предметной области проекта: записывает термины в `GLOSSARY.md`, а решения — в ADR. Включай, когда команда и агент называют одно и то же разными словами. | **754K** |
| [mattpocock/skills@codebase-design](https://skills.sh/mattpocock/skills/codebase-design) | Единый словарь для проектирования «глубоких модулей»: много возможностей за узким интерфейсом, границы в подходящих местах. Бери, когда спор идёт о границах, а команда называет одно и то же то компонентом, то сервисом, то API. | **731K** |
| [mattpocock/skills@diagnosing-bugs](https://skills.sh/mattpocock/skills/diagnosing-bugs) | Помогает диагностировать сложные баги и падение производительности. Сначала требует сделать быструю проверку, которая воспроизводит именно этот баг и даёт результат «прошло или упало», и только потом искать причину. Срабатывает, когда сообщаешь, что что-то сломалось, падает или тормозит. | **715K** |
| [vercel-labs/agent-skills@web-design-guidelines](https://skills.sh/vercel-labs/agent-skills/web-design-guidelines) | Чек-лист для проверки по Web Interface Guidelines: доступность, размеры областей нажатия, рамки фокуса. Используй для ревью интерфейса перед коммитом. | **700K** |

**Источник:** [рейтинг skills.sh](https://skills.sh) — число установок быстро растёт, данные актуальны на момент последнего обновления. Автообновление: `node scripts/refresh-top-skills.mjs --write && node scripts/build-readme.mjs`.

**Совет практика:** сразу ставь `obra/superpowers` целиком — все 14 скиллов складываются в единый рабочий процесс (TDD, отладка, планирование, мозговой штурм, ревью кода). В топ-15 скиллы superpowers почти не попадают: их сила в совместной работе, а не в числе установок, поэтому ставить их по одному особого смысла нет ([почему](./docs/skill-families-ru.md#obrasuperpowers--методология-которая-владеет-процессом)). Если у тебя уже есть свой процесс и готовая схема работы не нужна, бери вместо этого `mattpocock/skills` и вызывай скиллы по одному ([чем они отличаются](./docs/skill-families-ru.md#одна-таблица-чем-отличаются)). Затем добавь скиллы под свой стек (Vercel React, Convex, Firebase, Supabase, Azure). Не ставь всё подряд — каждый скилл занимает 3–5K токенов при начальной загрузке.

### Официальные скиллы Anthropic

Полный набор: [anthropics/skills](https://github.com/anthropics/skills).

- [anthropics/skills/docx](https://github.com/anthropics/skills/tree/main/skills/docx) — Word-документы с отслеживанием изменений и комментариями.
- [anthropics/skills/pdf](https://github.com/anthropics/skills/tree/main/skills/pdf) — Извлечение текста и таблиц, объединение и разделение PDF, заполнение форм.
- [anthropics/skills/pptx](https://github.com/anthropics/skills/tree/main/skills/pptx) — PowerPoint: макеты, шаблоны, графики, автоматическое создание слайдов.
- [anthropics/skills/xlsx](https://github.com/anthropics/skills/tree/main/skills/xlsx) — Excel: формулы, форматирование, анализ.
- [anthropics/skills/frontend-design](https://github.com/anthropics/skills/tree/main/skills/frontend-design) — Смелый дизайн без «AI slop». React + Tailwind.
- [anthropics/skills/web-artifacts-builder](https://github.com/anthropics/skills/tree/main/skills/web-artifacts-builder) — HTML-артефакты на React + Tailwind + shadcn/ui.
- [anthropics/skills/mcp-builder](https://github.com/anthropics/skills/tree/main/skills/mcp-builder) — Пошаговое создание MCP-серверов.
- [anthropics/skills/webapp-testing](https://github.com/anthropics/skills/tree/main/skills/webapp-testing) — Тестирование веб-приложений через Playwright.
- [anthropics/skills/skill-creator](https://github.com/anthropics/skills/tree/main/skills/skill-creator) — Интерактивное создание собственных скиллов через вопросы и ответы.
- [anthropics/cwc-workshops/eval-audit-and-sweep](https://github.com/anthropics/cwc-workshops/tree/main/rightmodel/.claude/skills/eval-audit-and-sweep) — Двухэтапная методика из воркшопа Picking the Right Model: сначала аудит evals по чек-листу надёжности (устройство задач, обвязка, метрики, LLM-судья), затем перебор сочетаний модели, thinking и effort с замером цены и скорости для каждого сочетания. Подходит для любого eval-фреймворка.

### Большие коллекции от сообщества

- [obra/superpowers](https://github.com/obra/superpowers) — 14 связанных скиллов, складывающихся в методологию: мозговой штурм → план → TDD → ревью → мерж. Срабатывают автоматически. Теперь в официальном маркетплейсе: `/plugin install superpowers@claude-plugins-official`. [Подробный разбор](./docs/skill-families-ru.md#obrasuperpowers--методология-которая-владеет-процессом).
- [obra/superpowers-lab](https://github.com/obra/superpowers-lab) — Экспериментальные скиллы из той же серии.
- [mattpocock/skills](https://github.com/mattpocock/skills) — 37 небольших скиллов от Matt Pocock, специально устроенных так, чтобы управление процессом оставалось у тебя: ставишь и вызываешь по одному. Его скиллы занимают большую часть топ-15 выше. В официальном маркетплейсе: `/plugin install mattpocock-skills`, либо `npx skills@latest add mattpocock/skills`, если хочешь править под себя. [Подробный разбор](./docs/skill-families-ru.md#mattpocockskills--маленькие-детали-которыми-владеешь-ты).
- [affaan-m/ECC](https://github.com/affaan-m/ECC) — 286 скиллов и 68 агентов для работы в том числе с редкими предметными областями, плюс инстинкты (паттерны, усвоенные из твоих сессий) и память, общая для разных сред запуска агентов. Ставить выборочно: правила всегда в контексте. [Подробный разбор](./docs/skill-families-ru.md#affaan-mecc--операционная-система-харнесса).
- [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) — Инженерные скиллы для работы в продакшене от Addy Osmani (Google Chrome). 93k⭐.
- [google/skills](https://github.com/google/skills) — Официальные скиллы Google для своих продуктов и технологий. 20k⭐.
- [pbakaus/impeccable](https://github.com/pbakaus/impeccable) — Язык дизайна для агента: 18 слэш-команд для всех этапов работы над интерфейсом (craft, audit, polish, harden) и 7 справочников — цвет, типографика, анимация, пространство, взаимодействия, адаптивность, UX-текст. Читает PRODUCT.md и DESIGN.md ещё до начала работы над дизайном. 67k⭐, 270K установок.
- [trailofbits/skills](https://github.com/trailofbits/skills) — Скиллы по безопасности от Trail of Bits: статический анализ через CodeQL/Semgrep, аудит кода, поиск уязвимостей.
- [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) — Vercel Engineering: производительность React, рекомендации по веб-интерфейсам, React Native, деплой на Vercel.
- [supabase/agent-skills](https://github.com/supabase/agent-skills) — Скиллы для Supabase и PostgreSQL.
- [firebase/agent-skills](https://github.com/firebase/agent-skills) — Firebase и Firestore, аудит правил безопасности.
- [microsoft/azure-skills](https://github.com/microsoft/azure-skills) — Деплой в Azure и рекомендации Microsoft.
- [get-convex/agent-skills](https://github.com/get-convex/agent-skills) — Convex — реактивный бэкенд.
- [expo/skills](https://github.com/expo/skills) — Expo. 25K+ установок.
- [shadcn/ui skills](https://ui.shadcn.com/docs/skills) — Сведения о компонентах shadcn и обязательное применение паттернов.
- [sfrangulov/skills](https://github.com/sfrangulov/skills) — Моя коллекция: методика консалтинга из 8 шагов (EN и RU), выбор следующего OSS-продукта, demo-video-pipeline (Playwright + Remotion + ElevenLabs), research-pipeline с проверкой источников.
- [travisvn/awesome-claude-skills](https://github.com/travisvn/awesome-claude-skills) — 15k⭐, регулярно обновляемая подборка скиллов.
- [ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) — Самая крупная подборка скиллов: 75k⭐.
- [karanb192/awesome-claude-skills](https://github.com/karanb192/awesome-claude-skills) — 50+ проверенных скиллов, сгруппированных по типам.

### Узкоспециализированные

- [Agents365-ai/drawio-skill](https://github.com/Agents365-ai/drawio-skill) — Диаграммы .drawio по тексту и реальным источникам: синхронизация изменений с сохранением ручной раскладки, несколько представлений одной схемы, проверка архитектуры тестами через CI-экшен, встроенный MCP-сервер. 9.2k⭐.
- [greensock/gsap-skills](https://github.com/greensock/gsap-skills) — Официальные скиллы GSAP: как правильно делать анимацию, какие паттерны и плагины использовать — от самих GreenSock. 15k⭐.
- [kepano/obsidian-skills](https://github.com/kepano/obsidian-skills) — Работа с Obsidian: CLI и открытые форматы — Markdown, Bases, JSON Canvas. От CEO Obsidian. 48k⭐.
- [conorluddy/ios-simulator-skill](https://github.com/conorluddy/ios-simulator-skill) — Сборка iOS-приложений, навигация по симулятору, тесты.
- [lackeyjb/playwright-skill](https://github.com/lackeyjb/playwright-skill) — Браузерная автоматизация через Playwright.
- [K-Dense-AI/scientific-agent-skills](https://github.com/K-Dense-AI/scientific-agent-skills) — Научные базы данных и библиотеки.
- [yusufkaraaslan/Skill_Seekers](https://github.com/yusufkaraaslan/Skill_Seekers) — Превращает сайт с документацией в скилл для Claude.
- [SawyerHood/dev-browser](https://github.com/SawyerHood/dev-browser) — Даёт агенту браузер: тот сам открывает страницу и проверяет свою работу глазами. Альтернатива Playwright MCP. 6.4k⭐.
- [bitjaru/styleseed](https://github.com/bitjaru/styleseed) — Движок для дизайна: учит агента дизайнерскому вкусу — 74 правила в Markdown, 7 тем оформления под разные бренды и система анимации с именами для её элементов. Слэш-скиллы `/ss-*`.
- [PolarSnowflake/skills-from-expertise](https://github.com/PolarSnowflake/skills-from-expertise) — Содержательная сторона создания скиллов: как превратить экспертные знания в методологию, а не в список советов. Когда брать: есть чужой материал — лекция, книга, таблица, код — и нужно сделать из него рабочий скилл.

### Локальные примеры

- [examples/skills/review-staged-changes/](./examples/skills/review-staged-changes/SKILL.md) — Проверка изменений, подготовленных к коммиту.

---

## Sub-agents

Субагент — отдельный экземпляр Claude со своим контекстом, который выполняет подзадачу и возвращает один итоговый ответ. Субагенты полезны для изучения материалов без внесения изменений и для параллельных задач. См. [официальную документацию](https://code.claude.com/docs/en/sub-agents).

> 📂 Полный каталог: **[152 записи →](./catalog/subagents.md)**

### Коллекции для рабочих проектов

| Репозиторий | Что внутри |
|---|---|
| [VoltAgent/awesome-claude-code-subagents](https://github.com/VoltAgent/awesome-claude-code-subagents) | **144 субагента** в 10 категориях, 25k⭐. Установка: `claude plugin marketplace add VoltAgent/awesome-claude-code-subagents`. |
| [obra/superpowers](https://github.com/obra/superpowers) | 14 скиллов и субагентов: TDD, отладка, планирование, мозговой штурм, ревью. Самая популярная коллекция. |
| [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | 100+ субагентов с единым форматом промптов и поддержкой нескольких языков, лицензия MIT. Не обновлялись с октября 2025. |
| [wshobson/agents](https://github.com/wshobson/agents) | 48 агентов для работы в продакшене со схемами оркестрации и продвинутыми рабочими процессами. |
| [vijaythecoder/awesome-claude-agents](https://github.com/vijaythecoder/awesome-claude-agents) | 26 агентов, организованных в ИИ-команду: Tech Lead, Analyst, специалисты по отдельным областям. 4.4k⭐, но без обновлений с октября 2025. |
| [davepoon/buildwithclaude](https://github.com/davepoon/buildwithclaude) | Скиллы, агенты, команды, хуки и плагины в одном месте; раньше назывался claude-code-subagents-collection. 3.4k⭐. |
| [rohitg00/awesome-claude-code-toolkit](https://github.com/rohitg00/awesome-claude-code-toolkit) | 135 агентов, 35 скиллов и 42 команды в одном наборе инструментов. |
| [peterkrueck/Claude-Code-Development-Kit](https://github.com/peterkrueck/Claude-Code-Development-Kit) | Мета-репозиторий: документация, шаблоны для работы с несколькими агентами, хуки, MCP-серверы. |

### 144 субагента VoltAgent — оглавление коллекции

Каждый субагент — отдельный `.md`-файл с YAML-заголовком, который устанавливается в `.claude/agents/`.

| Категория | Внутри | Когда брать |
|---|---|---|
| [🛠️ Core development (11)](https://github.com/VoltAgent/awesome-claude-code-subagents/tree/main/categories/01-core-development) | Проектировщик API, специалисты по фронтенду, бэкенду, фулстеку и мобильной разработке, GraphQL-архитектор, WebSocket-инженер | Когда делегируешь узкие задачи («спроектируй GraphQL-схему») |
| [🔤 Language specialists (30)](https://github.com/VoltAgent/awesome-claude-code-subagents/tree/main/categories/02-language-specialists) | python-pro, java-architect, rust-engineer, golang-pro, php-pro, typescript-pro и ещё 24 | Изолируют контекст, когда основной агент много читает код и материалы по одному языку |
| [☁️ Infrastructure (16)](https://github.com/VoltAgent/awesome-claude-code-subagents/tree/main/categories/03-infrastructure) | cloud-architect, devops, kubernetes, terraform, SRE, security-engineer | Для DevOps-задач, особенно если используешь Terraform или K8s |
| [✅ Quality & security (16)](https://github.com/VoltAgent/awesome-claude-code-subagents/tree/main/categories/04-quality-security) | code-reviewer, debugger, penetration-tester, performance-engineer, a11y-tester | Перед PR: обязательная проверка через `code-reviewer` |
| [🧠 Data & AI (13)](https://github.com/VoltAgent/awesome-claude-code-subagents/tree/main/categories/05-data-ai) | ML/MLOps, data-scientist, llm-architect, prompt-engineer, NLP, postgres-pro | Для инфраструктуры данных или ML-конвейеров |
| [⚡ Developer experience (14)](https://github.com/VoltAgent/awesome-claude-code-subagents/tree/main/categories/06-developer-experience) | cli-developer, mcp-developer, refactoring-specialist, build-engineer, documentation-engineer | Внутренние инструменты и задачи по улучшению удобства разработки |
| [🎯 Specialized domains (13)](https://github.com/VoltAgent/awesome-claude-code-subagents/tree/main/categories/07-specialized-domains) | blockchain, fintech, gamedev, IoT, embedded, mobile-app-builder | Когда работаешь в узкоспециализированной области |
| [💼 Business & product (12)](https://github.com/VoltAgent/awesome-claude-code-subagents/tree/main/categories/08-business-product) | PM, scrum-master, technical-writer, UX-researcher, sales-engineer | Задачи без написания кода: PRD, дорожная карта, работа с клиентами |
| [🎭 Meta & orchestration (11)](https://github.com/VoltAgent/awesome-claude-code-subagents/tree/main/categories/09-meta-orchestration) | agent-organizer, context-manager, multi-agent-coordinator, workflow-orchestrator | Координация нескольких субагентов, работающих параллельно |
| [🔬 Research & analysis (8)](https://github.com/VoltAgent/awesome-claude-code-subagents/tree/main/categories/10-research-analysis) | competitive-analyst, market-researcher, search-specialist, trend-analyst | Исследование на раннем этапе разработки продукта или анализ конкурентов |

---

## Терминал и сессии агентов

Оркестратор распределяет задачи между агентами, а herdr и tmux управляют терминалами, в которых они работают. Эти инструменты можно использовать вместе с оркестратором.

Они пригодятся в таких ситуациях:

1. **Закрыл ноутбук или оборвался SSH — работа остановилась.** Агент работает в процессе терминала, а тот привязан к клиенту.
2. **Открыто шесть панелей, и непонятно, какая ждёт ответа.** Агент задал вопрос и молча ждёт, пока ты смотришь в другую панель.
3. **Агенту нужно запустить интерактивную программу и увидеть её вывод.** Обычный инструмент `Bash` этого не умеет: процесс не возвращает управление.

### herdr — среда, в которой работают агенты

**[herdrdev/herdr](https://github.com/herdrdev/herdr)** — 37.3k⭐, один бинарный файл на Rust, без Electron, лицензия Apache-2.0. Он не служит обёрткой для агентов и не заменяет их, а **управляет их терминалами**: запускает то, что ты и так запускаешь, — Claude Code, Codex, Cursor, OpenCode, Grok.

- **Отключение без остановки работы.** Терминалы работают на фоновом сервере: закрыл клиент или потерял SSH — агенты продолжают работать. После перезагрузки машины herdr восстанавливает расположение панелей и умеет возобновлять сессии поддерживаемых агентов (сами процессы, разумеется, не переживают перезагрузку).
- **Несколько машин в одном окне.** Агенты на локальной машине и сохранённых SSH-машинах собраны в общий список. К каждой машине можно переподключиться независимо от остальных.
- **Статус каждой панели.** `working` · `blocked` · `idle`. Искать, кто застрял, не нужно: herdr сам показывает, кто ждёт ответа.
- **Управление из агентов.** Через CLI и API сокета **агенты сами управляют herdr**: создают панели, пишут друг другу и ждут, пока другой агент действительно перейдёт в состояние блокировки. Есть [готовый скилл](https://herdr.dev/docs/agent-skill/), который и превращает мультиплексор в оркестратор.
- **Клавиатура и мышь равноправны.** Сочетания с префиксной клавишей, как в tmux, *и* клики, перетаскивание, разделение панелей.

```bash
curl -fsSL https://herdr.dev/install.sh | sh   # или brew install herdr
herdr                                          # ctrl+b q — detach, herdr — обратно
```

Документация — [herdr.dev/docs](https://herdr.dev/docs/). В первую очередь стоит прочитать [session state](https://herdr.dev/docs/session-state/) (что именно сохраняется после перезагрузки) и [socket api](https://herdr.dev/docs/socket-api/).

#### Плагины и клиенты

Вокруг herdr выросла экосистема: доступ с телефона, ревью диффов, браузер в панели. Ниже — по одному инструменту для каждого сценария. Полный список есть в [маркетплейсе](https://herdr.dev/plugins/) и в подборке [yigitkonur/awesome-herdr](https://github.com/yigitkonur/awesome-herdr) (инструменты, конфиги, клиенты, скиллы, интеграции).

- [missuo/herdrm](https://github.com/missuo/herdrm) — Консоль для macOS: все агенты и их работающие терминалы, в том числе на других машинах. 668⭐.
- [AltanS/collie](https://github.com/AltanS/collie) — PWA для управления с телефона: доступ через tailnet, push-уведомления, быстрые действия. 1.2k⭐.
- [persiyanov/herdr-reviewr](https://github.com/persiyanov/herdr-reviewr) — Боковая панель для ревью кода: комментируешь дифф — комментарий уходит обратно агенту. Есть также статус PR и просмотр файлов. 648⭐.
- [smarzban/herdr-file-viewer](https://github.com/smarzban/herdr-file-viewer) — Просмотр файлов без возможности редактирования, с данными из git: дерево файлов, диффы, отображение Markdown, подсветка синтаксиса. 557⭐.
- [plannotator/herdr-annotate](https://github.com/plannotator/herdr-annotate) — Пометки к тексту в терминале и ответам агента: обратная связь уходит прямо в сессию. 620⭐.
- [ogulcancelik/herdr-browser](https://github.com/ogulcancelik/herdr-browser) — Работающий Chromium в панели, с управлением по CDP: проверка фронтенда рядом с агентом. 348⭐.
- [dcolinmorgan/herdr-remote](https://github.com/dcolinmorgan/herdr-remote) — Наблюдение и управление из строки меню, с телефона или через Telegram. Локально — без настройки, для удалённого доступа — свой туннель. 337⭐.

Есть и более нишевые инструменты: [herdr-nvim](https://github.com/ChmaraX/herdr-nvim) встраивает Neovim в рабочее пространство, [herdr-board](https://github.com/nelsonPires5/herdr-board) создаёт канбан-доску, где каждая карточка — промпт в видимой панели, [herdr-spreader](https://github.com/yuk1ty/herdr-spreader) открывает все панели в нужном расположении из одного YAML, а [Heeler](https://github.com/ZingerLittleBee/Heeler) — нативная iOS-консоль с настоящим терминалом на libghostty.

### tmux — если новая среда не нужна

tmux уже стоит у всех, и половина инструментов в этой нише построена на его основе. Начинать стоит с `tmux-cli`: это не оркестратор, а **базовый инструмент**, с помощью которого агент может запустить интерактивную программу и прочитать её вывод. Именно на таком инструменте построены скиллы проверки, о которых [Thariq рассказывает](./docs/tips-ru.md#thariq--как-мы-используем-скиллы-внутри-anthropic--17-марта-2026) как о внутренней практике Anthropic (`tmux-cli-driver` в их списке примеров).

- [pchalasani/claude-code-tools → tmux-cli](https://github.com/pchalasani/claude-code-tools) — Позволяет агенту управлять интерактивными программами в панелях: `launch`, `send`, `capture`, `wait_idle`, `interrupt`, `kill`. Именно на этой базовой возможности строятся скиллы для проверки. 2.0k⭐.
- [awslabs/cli-agent-orchestrator](https://github.com/awslabs/cli-agent-orchestrator) — Управляющий агент делегирует работу агентам-специалистам параллельно или последовательно. Каждый работает в отдельной tmux-сессии со своей аутентификацией. От AWS Labs. 1.2k⭐.
- [yohey-w/multi-agent-shogun](https://github.com/yohey-w/multi-agent-shogun) — Иерархия сёгун → каро → асигару на базе tmux: параллельные задачи с чёткими уровнями подчинения. 1.4k⭐.
- [Ataraxy-Labs/opensessions](https://github.com/Ataraxy-Labs/opensessions) — Боковая панель для tmux с маркерами тредов, текущим состоянием сессий и локальным HTTP API. Поддерживает Amp, Codex и OpenCode наравне с Claude Code. 1.2k⭐.
- [Dicklesworthstone/claude_code_agent_farm](https://github.com/Dicklesworthstone/claude_code_agent_farm) — Ферма из 20+ параллельных агентов: координация через блокировки, прогоны для поиска багов и проверки принятых практик, мониторинг в tmux. 916⭐.
- [alexei-led/ccgram](https://github.com/alexei-led/ccgram) — Связка Telegram ↔ tmux/herdr: читать вывод, отвечать на запросы агента и вести параллельные сессии с телефона. 263⭐.

**Критерий отбора:** пуш за последние три месяца и явная поддержка Claude Code (данные на 2026-09-10). В этой нише особенно много заброшенных проектов: у самого популярного в выдаче tmux-оркестратора (1.8k⭐) больше года не было коммитов, поэтому его здесь нет. Проверяй дату последнего пуша до установки, а не после.

---

## Оркестрация и параллельные агенты

Когда одного Claude мало: внешние инструменты для параллельного запуска нескольких агентов, автономных циклов «запустил-и-ушёл» и канбан-досок или графических интерфейсов поверх Claude Code. Субагенты (выше) — встроенная возможность Claude в рамках одной сессии. Этот раздел — про **внешние оркестраторы**, которые запускают несколько независимых сессий Claude (или Claude + Codex + Gemini) и координируют их работу через worktrees, канбан-доски или журнал аудита.

Три группы подходов:

- **Фоновые процессы** — агент работает без терминала, проходит обязательные тесты и автоматически делает коммиты. Для режима «забыл и ушёл».
- **Параллельные сессии в GUI / канбан** — настольное приложение или доска в терминале с несколькими параллельными сессиями в git worktrees. Для визуального контроля и сравнения подходов.
- **Автономные циклы (Ralph-подход)** — цикл «работай пока не готово», который сам определяет, когда задача завершена. Для однотипных многошаговых задач.

> **Практическое правило:** одного оркестратора достаточно. Не комбинируй их: все три группы конкурируют за worktrees, лимиты API и среду выполнения. Выбери по таблице ниже. Оговорка: [herdr и tmux](#терминал-и-сессии-агентов) из раздела выше — не четвёртая группа, а общий нижележащий слой, совместимый с любым из этих оркестраторов.

### Сравнение для разработчика, который работает один

Число звёзд и дата последнего пуша — по данным GitHub API на 2026-09-10. Сложность — субъективная оценка того, сколько времени потребуется до первого полезного запуска. Сначала смотри на дату пуша, потом на звёзды: половина проектов в этой нише живёт один сезон. ⚠️ — больше четырёх месяцев без коммитов.

| Инструмент | ⭐ | Последний пуш | «Забыл и ушёл» | Сложность | Для кого |
|---|---:|---|---|---|---|
| [gastownhall/gastown](https://github.com/gastownhall/gastown) | 17.9k | 2026-09-10 | ✅ полноценный режим | Высокая | Избыточен для одиночки, рассчитан на сложные сценарии с несколькими агентами |
| [sipyourdrink-ltd/bernstein](https://github.com/sipyourdrink-ltd/bernstein) | 1.1k | 2026-09-10 | ✅ полноценный режим | Средняя | Разработчик-одиночка, которому нужен журнал, пригодный для аудита |
| [ruvnet/ruflo](https://github.com/ruvnet/ruflo) | 71.8k | 2026-09-10 | ✅ рой агентов | Высокая | Команды и крупные компании, не для одиночки |
| [BloopAI/vibe-kanban](https://github.com/BloopAI/vibe-kanban) | 28.0k | 2026-04-24 ⚠️ | ❌ частично вручную | Низкая | Простой параллельный запуск через канбан-доску |
| [smtg-ai/claude-squad](https://github.com/smtg-ai/claude-squad) | 8.4k | 2026-08-20 | ❌ вручную | Низкая | Несколько сессий Claude в интерфейсе терминала |
| [stravu/crystal (Nimbalyst)](https://github.com/stravu/crystal) | 3.1k | 2026-02-26 ⚠️ | ❌ частично вручную | Низкая | Настольный графический интерфейс для сравнения подходов |
| [manaflow-ai/cmux](https://github.com/manaflow-ai/cmux) | 26.9k | 2026-09-10 | ❌ вручную | Низкая | Пользователь macOS, которому нужны вкладки и push-уведомления |
| [generalaction/emdash](https://github.com/generalaction/emdash) | 5.7k | 2026-09-09 | ❌ частично вручную | Низкая | Альтернатива vibe-kanban с открытым исходным кодом |
| [frankbria/ralph-claude-code](https://github.com/frankbria/ralph-claude-code) | 9.6k | 2026-07-18 | ⚠️ примитивный режим | Низкая | Эксперименты с Ralph-циклом |
| [humanlayer/humanlayer](https://github.com/humanlayer/humanlayer) | 11.5k | 2026-06-19 | ⚠️ требует подтверждений | Средняя | Сложные кодовые базы, где на контрольных этапах обязательно участие человека |

### Фоновые процессы — «забыл и ушёл»

- [gastownhall/gastown](https://github.com/gastownhall/gastown) — Менеджер рабочей среды для нескольких агентов от Steve Yegge. Сохраняет сведения о ходе работы, полноценно работает в фоне, рассчитан на сложные сценарии с несколькими агентами. 17.8k⭐.
- [sipyourdrink-ltd/bernstein](https://github.com/sipyourdrink-ltd/bernstein) — Детерминированный оркестратор с журналом аудита, в котором записи связаны цепочкой HMAC. Запускает агентов параллельно, проверяет результаты тестами, автоматически делает коммиты. Ноль LLM-токенов на координацию.
- [ruvnet/ruflo](https://github.com/ruvnet/ruflo) — Платформа для совместной работы множества агентов с RAG, самообучением и встроенной интеграцией с Claude Code. Бывший claude-flow, 69k⭐.

### Параллельные сессии в GUI / канбан

- [BloopAI/vibe-kanban](https://github.com/BloopAI/vibe-kanban) — Канбан-доска для управления агентами, которые параллельно пишут код. 26.5k⭐, самый популярный графический интерфейс для Claude Code и Codex.
- [smtg-ai/claude-squad](https://github.com/smtg-ai/claude-squad) — Менеджер параллельных терминальных сессий Claude/Codex/Amp/OpenCode с текстовым интерфейсом. Каждая сессия работает в своём worktree.
- [stravu/crystal (теперь Nimbalyst)](https://github.com/stravu/crystal) — Настольное приложение для параллельных сессий Claude и Codex в отдельных worktree. Просмотр изменений и сравнение подходов в одном окне.
- [manaflow-ai/cmux](https://github.com/manaflow-ai/cmux) — Терминал для macOS на базе Ghostty с вертикальными вкладками и push-уведомлениями для агентов, которые пишут код.
- [generalaction/emdash](https://github.com/generalaction/emdash) — IDE с открытым исходным кодом (YC W26) для параллельной работы агентов любого провайдера.

### Автономные циклы и работа с обязательными подтверждениями

- [frankbria/ralph-claude-code](https://github.com/frankbria/ralph-claude-code) — Автономный цикл «работай пока не готово», который определяет, когда пора завершить работу. Образцовая реализация подхода Ralph (Geoffrey Huntley) для Claude Code.
- [humanlayer/humanlayer](https://github.com/humanlayer/humanlayer) — Фреймворк для сложных задач в больших кодовых базах: на критичных шагах запрашивает подтверждение человека.

**Главный источник** — [andyrewlee/awesome-agent-orchestrators](https://github.com/andyrewlee/awesome-agent-orchestrators): 4 категории и сотня инструментов. Критерии нашего отбора: ≥3k⭐ и явная поддержка Claude Code (исключение — bernstein: 0.5k⭐, но он занимает уникальную нишу инструментов с журналом, пригодным для аудита).

---

## Методологии разработки <a id="workflow-методологии"></a>

Готовые процессы разработки для Claude Code. Они ведут агента от изучения задачи и составления плана до написания кода, проверки и выпуска. Такой процесс можно установить как плагин или набор скиллов.

> 📚 Основной англоязычный репозиторий для всего раздела ниже: [shanraisshan/claude-code-best-practice](https://github.com/shanraisshan/claude-code-best-practice) — 54.8k⭐, ежедневные обновления с учётом версий Claude Code, актуальные функции, советы Boris Cherny и подходы к совместной работе разных моделей.
>
> 🇷🇺 **Переводы тематических подборок советов** от Boris Cherny (создателя Claude Code) и Thariq (Anthropic): **[docs/tips-ru.md →](./docs/tips-ru.md)** — 8 подборок за январь–апрель 2026, разбор трёх фаз воркшопа How We Claude Code (Code with Claude 2026) и статья Anthropic о снижении стоимости без потери качества (сентябрь 2026).

### Методологии Spec → Plan → Ship

- [SuperClaude-Org/SuperClaude_Framework](https://github.com/SuperClaude-Org/SuperClaude_Framework) — Фреймворк для настройки Claude Code: специализированные команды, когнитивные «персоны» и методологии. 24k⭐.
- [github/spec-kit](https://github.com/github/spec-kit) — Разработка по спецификациям от GitHub. 134k⭐. /speckit.specify → clarify → plan → tasks → analyze → implement.
- [affaan-m/ECC](https://github.com/affaan-m/ECC) — Крупнейшая коллекция: 286 скиллов, 68 агентов, инстинкты и память, которые сохраняются между средами работы агентов. 255k⭐. [Подробный разбор](./docs/skill-families-ru.md#affaan-mecc--операционная-система-харнесса).
- [garrytan/gstack](https://github.com/garrytan/gstack) — Набор инструментов Garry Tan (Y Combinator): 23 инструмента в ролях CEO, дизайнера, руководителя разработки, релиз-менеджера и QA. 132k⭐.
- [open-gsd/gsd-core](https://github.com/open-gsd/gsd-core) — Метапромптинг и работа с контекстом: пять фаз discuss → plan → execute → verify → ship, каждая в свежем контексте субагента. Преемник get-shit-done, который теперь в архиве.
- [Fission-AI/OpenSpec](https://github.com/Fission-AI/OpenSpec) — Разработка по спецификациям с ИИ-ассистентами для программирования. /opsx:propose → apply → archive.
- [bmad-code-org/BMAD-METHOD](https://github.com/bmad-code-org/BMAD-METHOD) — Breakthrough Method for Agile AI-Driven Development. Краткое описание продукта → PRD → архитектура → эпики → планирование спринта → разработка → ревью.
- [EveryInc/compound-engineering-plugin](https://github.com/EveryInc/compound-engineering-plugin) — Официальный плагин Compound Engineering от Every Inc. /ce-ideate → brainstorm → plan → work → review → debug → optimize.

### Работа с разными моделями: связка Claude с Codex / Gemini / GPT

Три способа связать Claude Code с другими моделями (Codex, Gemini, GPT, Kimi, DeepSeek, локальными моделями):

- **Плагин** — CLI другой модели запускается внутри Claude Code через слэш-команду (`/codex:review`).
- **MCP** — Claude Code вызывает другую модель как инструмент через Model Context Protocol.
- **Маршрутизатор** — API-адрес Claude заменяется адресом любого OpenAI-совместимого провайдера.

- [musistudio/claude-code-router](https://github.com/musistudio/claude-code-router) — Маршрутизатор: заменяет API-адрес Claude на OpenRouter, DeepSeek, Ollama, Gemini, Kimi, Qwen, Groq. Позволяет выбирать модель под каждую задачу.
- [router-for-me/CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) — Обёртка, которая предоставляет доступ к Gemini CLI, Codex, Claude Code и Antigravity через API, совместимый с OpenAI/Gemini/Claude/Codex.
- [openai/codex-plugin-cc](https://github.com/openai/codex-plugin-cc) — Официальный плагин OpenAI: /codex:review, /codex:adversarial-review, /codex:rescue внутри Claude Code. Codex/GPT-5 помогает с QA.
- [BeehiveInnovations/pal-mcp-server](https://github.com/BeehiveInnovations/pal-mcp-server) — Не обновлялся с декабря 2025. MCP-сервер для работы с разными моделями (бывший zen-mcp): Gemini, OpenAI, Azure, Grok, Ollama, OpenRouter доступны как инструменты Claude. 50+ моделей.

---

## Evals

Evals помогают проверить, стал ли агент работать лучше после смены промпта, скилла или модели. Ему дают один и тот же набор задач и оценивают результаты по заранее заданным правилам. По одному удачному ответу этого не понять.

Два подхода из материалов Anthropic:

- **Оценка в два этапа.** Простые и недорогие программные проверки (разбор артефакта, подсчёт метрик) отсеивают грубые ошибки, а LLM-судья оценивает качество там, где программных проверок недостаточно. Каждую версию промпта проверяют на всём наборе задач.
- **Сначала аудит, потом перебор вариантов.** Если evals работают неправильно, перебор моделей по сетке даёт цифры, которым нельзя верить. Скилл [eval-audit-and-sweep](https://github.com/anthropics/cwc-workshops/tree/main/rightmodel/.claude/skills/eval-audit-and-sweep) из раздела [Skills](#skills) выполняет оба этапа: сначала аудит по чек-листу, затем перебор сочетаний модели, thinking и effort с указанием стоимости и скорости для каждой ячейки.

### Официальные материалы

- [Define success criteria (Claude Docs)](https://platform.claude.com/docs/en/test-and-evaluate/define-success) — Как задать критерии успеха до написания промпта: измеримые метрики и пороги вместо «работает вроде нормально».
- [Create strong empirical evaluations (Claude Docs)](https://platform.claude.com/docs/en/test-and-evaluate/develop-tests) — Официальное руководство по созданию evals: как составлять задания и выбирать способ оценки — код, LLM-судья или человек.
- [Evaluation tool (Anthropic Console)](https://platform.claude.com/docs/en/test-and-evaluate/eval-tool) — Проверка промпта на наборе тестовых примеров в Console и наглядное сравнение версий без кода.
- [cwc-workshops/eval-driven-agent-development](https://github.com/anthropics/cwc-workshops/tree/main/eval-driven-agent-development) — Учебный пример от Anthropic: PPTX-агент, шесть версий промпта, набор из 10 задач и оценка в два этапа — программные метрики по XML и LLM-судья, который оценивает слайды после рендеринга.

### Инструменты

- [promptfoo/promptfoo](https://github.com/promptfoo/promptfoo) — Декларативные конфиги для тестирования промптов, агентов и RAG: сравнение моделей, состязательное тестирование, CI/CD. 23k⭐.
- [UKGovernmentBEIS/inspect_ai](https://github.com/UKGovernmentBEIS/inspect_ai) — Фреймворк для evals от британского AISI: сочетание модулей решения задач (solvers) и оценки результатов (scorers), песочница для агентных задач, просмотр логов.
- [confident-ai/deepeval](https://github.com/confident-ai/deepeval) — Тесты для LLM-приложений в стиле pytest: готовые метрики (G-Eval, галлюцинации, RAG), интеграция с CI. 17k⭐.
- [Arize-ai/phoenix](https://github.com/Arize-ai/phoenix) — Наблюдение за работой приложений и evals: трассировка на OpenTelemetry, наборы данных, эксперименты, LLM-судьи. Развёртывается на собственном сервере.
- [sierra-research/tau2-bench](https://github.com/sierra-research/tau2-bench) — Бенчмарк агентов, использующих инструменты, от Sierra: диалог с симулятором пользователя в сферах авиаперевозок, розничной торговли и телекоммуникаций. Учебный полигон для воркшопа Picking the Right Model.

---

## Plugins

Плагин объединяет скиллы, субагентов, хуки, MCP-серверы и [моды](#mods) в один артефакт. Один плагин устанавливается одной командой `/plugin install <name>`. См. [официальное руководство](https://code.claude.com/docs/en/plugins).

> 📂 Полный каталог: **[16 записей →](./catalog/plugins.md)**

### Главные маркетплейсы

- [obra/superpowers-marketplace](https://github.com/obra/superpowers-marketplace) — Ещё девять плагинов от Jesse Vincent в дополнение к ядру superpowers: Chrome DevTools, автоматизация tmux, управление чужими сессиями Claude, семантический поиск по прошлым разговорам. Установка: `claude plugin marketplace add obra/superpowers-marketplace`.
- [ccplugins/awesome-claude-code-plugins](https://github.com/ccplugins/awesome-claude-code-plugins) — 935⭐, 50+ плагинов в 13 категориях (качество кода, git, devops, дизайн, бизнес). 782⭐. Установка: `claude plugin marketplace add ccplugins/awesome-claude-code-plugins`.
- [VoltAgent/awesome-claude-code-subagents](https://github.com/VoltAgent/awesome-claude-code-subagents) — 144 субагента, собранных в маркетплейс плагинов.
- [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official) — Официальный маркетплейс: добавлять источник не нужно, `/plugin install <имя>@claude-plugins-official` работает сразу. Внутри — `superpowers`, LSP-плагины `typescript-lsp` и `pyright-lsp` (агент видит ошибки типов и может переходить к символам без запуска сборки), `firecrawl` для сбора данных с сайтов и `pydantic-ai`.

### Полезные отдельные плагины

- [typescript-lsp и pyright-lsp](https://github.com/anthropics/claude-plugins-official) — Языковые серверы TypeScript и Python прямо в сессии: агент видит ошибки типов, может переходить к символам и находить ссылки на них без запуска сборки и поиска по файлам через grep. Установка из официального маркетплейса: `/plugin install typescript-lsp@claude-plugins-official`.
- [firecrawl](https://github.com/firecrawl/firecrawl) — Сбор данных и обход сайтов: превращает страницу в чистый Markdown или структурированный JSON по заданной схеме, умеет обходить разделы сайта и работать со страницами, где нужно кликать и входить в аккаунт. Плагин `firecrawl@claude-plugins-official`, движок — 179k⭐.
- [brennercruvinel/CCPlugins](https://github.com/brennercruvinel/CCPlugins) — Подборка самых ходовых слэш-команд автора. 2.8k⭐, но с июня 2026 проект в архиве и развиваться не будет; переехал из `notlikeDev/CCPlugins`.
- [ApurvBazari/claude-plugins](https://github.com/ApurvBazari/claude-plugins) — Уведомления о событиях через ntfy / Pushover / Telegram.
- [0xdesign/design-plugin](https://github.com/0xdesign/design-plugin) — Обвязка для работы над дизайном интерфейсов.
- [jeremylongshore/tons-of-skills-marketplace](https://github.com/jeremylongshore/tons-of-skills-marketplace) — Маркетплейс с 471 плагином, 3069 скиллами и 347 агентами, со своим пакетным менеджером ccpi.
- [TT-Wang/memem](https://github.com/TT-Wang/memem) — Постоянная память между сессиями: сохраняет выводы и решения в Markdown в хранилище Obsidian, ищет через SQLite FTS5, разбирает записи прошлых разговоров. Раньше назывался cortex-plugin.
- [Rich627/whatsapp-claude-plugin](https://github.com/Rich627/whatsapp-claude-plugin) — Интеграция с WhatsApp.
- [iurykrieger/claude-bedrock](https://github.com/iurykrieger/claude-bedrock) — Автоматизация «второго мозга» в Obsidian: работа с сущностями, загрузка, сжатие и синхронизация хранилища через скиллы Claude Code.
- [mnemoverse/claude-plugin](https://github.com/mnemoverse/claude-plugin) — Долговременная память между сессиями на удалённом сервере через MCP: вход по OAuth, ключ вставлять не нужно. Есть команды `/mnemoverse:*` (remember, recall, memory-status) и скилл `agent-memory-discipline` (CC0). Подойдёт, когда общая память нужна сразу в Claude Code, Cursor, VS Code и ChatGPT. Установка: `/plugin marketplace add mnemoverse/claude-plugin`, затем `/plugin install mnemoverse@mnemoverse`.

---

## Hooks

Хуки — shell-команды (или HTTP / MCP / prompt-агенты), которые запускаются при событиях сессии. См. [справочник по хукам](https://code.claude.com/docs/en/hooks). Function hooks работают внутри процесса Claude Code и могут выводить элементы интерфейса. Они описаны в разделе [Mods](#mods).

> 📂 Связанные проекты: **[8 записей →](./catalog/hooks.md)**. Большая часть хуков входит в состав плагинов — см. раздел [Plugins](#plugins) выше.

### Готовые хуки в этом репозитории

- [examples/hooks/](./examples/hooks/README.md) — Три рабочих хука с bash-скриптами и инструкциями по размещению:
  - **pre-commit-secrets.sh** — поиск секретов в изменениях, подготовленных к коммиту. Защищает от утечки API-ключей, когда агент коммитит без проверки.
  - **ntfy.sh** — push-уведомления через ntfy.sh по событиям `Notification` и `Stop`.
  - **audit.sh** — Запись каждого события PostToolUse в журнал JSONL для разбора инцидентов.

### Проекты сообщества

- [Hooks guide (Claude Docs)](https://code.claude.com/docs/en/hooks-guide) — Официальное руководство с рабочими примерами для каждого события сессии.
- [disler/claude-code-hooks-mastery](https://github.com/disler/claude-code-hooks-mastery) — Разбор восьми базовых событий с готовыми обработчиками. По-прежнему самый подробный набор примеров. 3.9k⭐, но обновлений нет с марта 2026 года: события команд агентов вроде `TeammateIdle` и `TaskCompleted` не описаны.
- [GowayLee/cchooks](https://github.com/GowayLee/cchooks) — Python-SDK: разбор входного JSON с типизацией и коды возврата вместо ручного разбора stdin.

### Наблюдение за работой агента — дашборды на основе хуков

Хуки передают поток событий сессии, а эти проекты показывают, что происходит: что делает агент, сколько субагентов работает параллельно, на что расходуются токены. Они подходят и для разбора инцидента после его завершения, и для наблюдения за автономным прогоном в реальном времени.

- [disler/claude-code-hooks-multi-agent-observability](https://github.com/disler/claude-code-hooks-multi-agent-observability) — Дашборд событий хуков, который в реальном времени показывает данные сразу по нескольким параллельным агентам. 1.5k⭐, последний пуш — в феврале 2026 года.
- [hoangsonww/Claude-Code-Agent-Monitor](https://github.com/hoangsonww/Claude-Code-Agent-Monitor) — Дашборд активности агента на хуках, разворачивается на своём сервере: сессии, использование инструментов, оркестрация субагентов, статусы на канбан-доске.
- [simple10/agents-observe](https://github.com/simple10/agents-observe) — Наблюдение в реальном времени за сессиями Claude Code и работой нескольких агентов, с фильтрацией и воспроизведением записей.
- [ColeMurray/claude-code-otel](https://github.com/ColeMurray/claude-code-otel) — Заброшен с июня 2025 года, но всё ещё полезен как пример архитектуры: OpenTelemetry → Grafana для мониторинга расхода, производительности и стоимости.

### Сценарии применения

**Безопасность:** проверка на секреты перед коммитом, запрет `git push --force` в `main` / `production`, `permissionDecision: "ask"` для команд со словом `production` или `prod-*`, запись каждого события PostToolUse в журнал JSONL, блокировка обращений через `curl` и `wget` к доменам вне белого списка.

**Качество:** автоматическое форматирование при событиях PostToolUse Edit / Write (`prettier --write`, `ruff format`), `tsc --noEmit` для изменённых файлов, `eslint --fix`, `terraform fmt -recursive`.

**Рабочий процесс:** отправка уведомлений в ntfy / Pushover / Telegram по событиям Notification и Stop, учёт стоимости в CSV по событию Stop, `direnv reload` по CwdChanged, автоматический коммит по Stop с сообщениями в формате Conventional Commits.

**Архитектура:** запрет редактирования `package.json` или lockfile без явного разрешения, поиск через grep перед редактированием, чтобы проверить, где используется функция, которую собираемся удалить, проверка структуры нового файла (`src/` / `tests/` / `docs/`).

## Mods

Мод — плагин, код которого выполняется внутри процесса Claude Code. Он состоит из функций на JavaScript или TypeScript: Claude Code вызывает их при событиях вроде вызова инструмента, отправки промпта или отрисовки части интерфейса. Функция может передать событие дальше без изменений, изменить его или сама на него ответить. Моды вышли 1 октября 2026 в версии 2.1.287 и включены по умолчанию. См. [официальный обзор](https://code.claude.com/docs/ru/plugins/mods/overview), он уже на русском.

Хуки, скиллы, строка состояния и MCP работают вне процесса Claude Code: запускают скрипты или передают Claude текст и инструменты. Мод работает внутри процесса, поэтому умеет то, чего снаружи не сделать:

- **Рисовать в интерфейсе.** Добавлять панель рядом с перепиской или полосу над промптом, с вкладками, кнопками и полями ввода. Встроенные элементы тоже можно перерисовать: строку вызова инструмента, спиннер, диалог с вопросом от Claude.
- **Вмешиваться в вызов инструмента или запрос.** Приостановить вызов и спросить тебя, ответить вместо инструмента, отправить один запрос в другую модель.
- **Хранить состояние между событиями.** У обработчиков одного мода общие переменные: один считает вызовы инструментов, другой показывает счётчик у спиннера. Shell-хук каждый раз запускается отдельным процессом, поэтому состояние ему приходится хранить снаружи.
- **Добавлять свои `/команды`.** Их выполняет код мода, без хода модели. Если при регистрации указать `immediate: true`, команда работает, даже пока Claude занят.

О терминах: документация тоже называет обработчик в моде словом hook, а привычные shell-hooks из `settings.json` — settings hooks. Они никуда не делись и работают вместе с модами.

### Мод, хук, скилл или MCP-сервер

| | Мод | Settings hook | Скилл | MCP-сервер |
|---|---|---|---|---|
| Что это | Функции в плагине, которые Claude Code вызывает в своём процессе | Shell-команда, HTTP-запрос или промпт, срабатывающие по событию сессии | `SKILL.md` с инструкциями для Claude | Внешний процесс или сервис с инструментами |
| Что меняет | Вызовы инструментов, промпты, команды, ходы и отрисовку интерфейса | Разрешение на вызов инструмента или отправку промпта, аргументы и результат вызова, дополнительный контекст | Что Claude знает и делает | Какие инструменты есть у Claude |
| Рисует в интерфейсе | Да | Нет | Нет | Нет |
| На чём пишется | JavaScript или TypeScript | Скрипт и запись в `settings.json` | Markdown | Сервер на любом языке |
| Когда брать | Нужна панель, полоса над промптом или своя команда, либо надо изменить событие | Надо заблокировать, разрешить или записать в лог событие с помощью готового скрипта | Вставляешь в чат одни и те же инструкции | Claude нужен доступ к внешней системе |

Таблица взята из официального обзора. Если с задачей справляется скилл, settings hook или MCP-сервер, мод не нужен. Он пригодится, когда нужен свой интерфейс, состояние в памяти или доступ к событиям, с которыми settings hooks не работают.

### Как получить мод

- **Попросить Claude.** Опиши мод словами в интерактивной сессии: «сделай мод, который показывает текущую git-ветку над промптом». Claude пишет его по встроенному скиллу `plugin-authoring` в папку `~/.claude/dev-mods/<id сессии>/` и после создания первого файла спрашивает, включить ли hot reload. Дальше мод перезагружается в конце каждого хода, в котором менялись его файлы. Работает он только в этой сессии. Чтобы сохранить мод, скопируй его папку к себе и запускай через `claude --plugin-dir ~/mods/git-branch`.
- **Поставить готовый.** Мод устанавливается как обычный плагин: `/plugin install <имя>@<маркетплейс>`. Если ставил из шелла при открытой сессии, выполни в ней `/reload-plugins`.
- **Включить встроенный.** Часть функций самого Claude Code уже реализована модами, например `/diff` и загрузка `AGENTS.md`; список находится в `/plugin` → **Installed** → **Built-in**. Там же есть выключенный по умолчанию `you-should-know`: фоновый агент следит за длинной задачей и пишет над промптом, если ты рискуешь пропустить что-то важное. Он включается командой `/plugin enable cc-plugin-you-should-know@builtin`, но пока доступен не всем.

Минимальный мод состоит из трёх файлов: манифеста `.claude-plugin/plugin.json`, файла `hooks/hooks.json` со ссылкой на модуль и самого модуля с функцией `register`.

### Проверь мод до установки

Мод работает с твоими правами, без песочницы. Он читает и пишет файлы, запускает процессы, обращается к сети, видит каждый промпт и каждый вызов инструмента, читает переменные окружения, включая ключи. [Sandboxing](https://code.claude.com/docs/en/sandboxing) изолирует только Bash-команды самого Claude: на процесс, запущенный модом, эта защита не распространяется.

Отдельно о разрешениях. Мод с обработчиком `tool.check` отвечает после проверки правил и выполнения `PreToolUse`-хуков, и его ответ может изменить принятое ими решение. Он способен одобрить вызов, для которого задано `ask`, и вызов, который заблокировал твой хук, если этот хук задан вне managed settings. В auto mode одобренный модом вызов выполняется без проверки классификатором. На личной машине без managed settings и без плана Team или Enterprise мод может одобрить даже то, что запрещает правило `deny`. А там, где `deny` продолжает действовать, правило касается только инструментов Claude: сам мод по-прежнему может прочитать файл через `$.fs.read` или запустить программу через `$.process.run`. Сам диалог запроса разрешения мод перерисовать не может. Подробности — в документации о [разрешениях и хуках](https://code.claude.com/docs/en/permissions#extend-permissions-with-hooks).

Что мод умеет, можно увидеть без запуска. `claude plugin validate` разбирает код статически:

```bash
git clone https://github.com/anthropics/claude-code-playground
claude plugin validate claude-code-playground/claude-code/mods/blast-radius
```

```text
  ❯ ./blast-radius.mjs hooks: tool.call{tool=Bash}, ui.render{component=Pane}, ui.render{component=AbovePrompt}
  ❯ ./blast-radius.mjs calls: $.clock.now, $.process.run, $.session.cwd, $.ui.close, $.ui.invalidate, $.ui.open, $.ui.resolve, $.ui.toast
```

Это вывод Claude Code 2.1.289 для официального примера. Строка `hooks:` перечисляет события, которые получает мод, а `calls:` показывает, какие функции Claude Code он вызывает. Этот мод перехватывает только Bash-вызовы, рисует панель и полосу. Прямых вызовов файлового и сетевого API у него нет, но через `$.process.run` он запускает `bash` и `git`, а запущенная программа может всё, что можешь ты. Что именно она делает, видно только в исходниках. Claude Code не загрузит мод, если валидатор не может разобрать его обращения к API.

В строке `calls:` смотри на такие вызовы:

- `$.fs.read`, `$.fs.write` — чтение и запись файлов везде, где у тебя есть доступ.
- `$.process.run`, `$.process.spawn` — запуск программ от твоего имени.
- `$.http.fetch` — сетевые запросы.
- `$.env.get`, `$.settings.read` — чтение переменных окружения и настроек, где нередко хранятся API-ключи.
- `$.model.complete` — вызовы модели за счёт твоего плана или ключа.
- `$.prompt.submit`, `$.session.send` — отправка промпта от твоего имени и сообщения в другую твою сессию.

В `hooks:` события `tool.call` и `prompt.submit` без фильтра означают, что мод видит и может менять каждый вызов инструмента и каждый промпт. Фильтр в фигурных скобках ограничивает набор событий: у этого примера он задан как `{tool=Bash}`. Событие `tool.check` означает, что мод может принять решение за тебя до появления диалога запроса разрешения.

Валидатор показывает, к чему у мода есть доступ, но не что он с этим делает, поэтому исходники читать всё равно придётся. Разбор с точки зрения атакующего есть у [Dash Security](https://dash.security/blog/claude-mods-the-new-attack-surface-built-in). Статья написана по предварительной версии 2.1.277, и детали с тех пор могли измениться.

Выключить моды можно на трёх уровнях:

- **Один мод.** Отключи или удали его плагин в `/plugin` → **Installed**.
- **Все установленные моды на одну сессию.** `claude --safe-mode`. Флаг заодно отключит остальные пользовательские настройки и расширения.
- **Все твои моды во всех сессиях.** `"disableAllHooks": true` в `~/.claude/settings.json`. Вместе с ними перестанут работать твои settings hooks и строка состояния. То, чем управляет организация, продолжит работать.

На встроенные моды последние два способа не действуют. В организации администратор может разрешить только моды самой организации. За это отвечает опция `allowManagedModsOnly` встроенного защитного мода: она задаётся в managed settings внутри `pluginConfigs` под ключом `cc-plugin-sec-default@builtin`, см. [управление модами для организации](https://code.claude.com/docs/ru/plugins/mods/admin).

### Где моды работают

Обработчики выполняются везде, где загрузился плагин: в терминале, во вкладке Code десктопного приложения, в расширении VS Code, в `claude -p`, в Agent SDK и в облачных сессиях, если плагин туда попал. Рисовать интерфейс мод может только в терминале и в Desktop. На практике мод, который ограничивает действия, работает и при запуске без интерфейса, а панель с дашбордом там не появится. Но по умолчанию при сбое ограничение не срабатывает: если обработчик упал, не уложился в таймаут или вернул неподходящий результат, Claude Code продолжает выполнение. Чтобы при сбое вызов блокировался, обработчику нужен [`.catch`](https://code.claude.com/docs/en/plugins/mods/events#handle-a-hook-that-fails). В WSL-сессиях Desktop моды не работают совсем, потому что там нет плагинов.

### Официальные материалы

- [Обзор модов (Claude Docs)](https://code.claude.com/docs/ru/plugins/mods/overview) — Вводный материал на русском: что мод умеет, где он рисует, как его включить и выключить, чему ты доверяешь при установке.
- [Создание мода (Claude Docs)](https://code.claude.com/docs/ru/plugins/mods/create) — Оба способа: попросить Claude и написать вручную. Разобраны цикл «правка → hot reload», типы для твоей версии Claude Code и публикация через маркетплейс.
- [Справочник по модам (Claude Docs)](https://code.claude.com/docs/ru/plugins/mods/reference) — События, методы `$`, элементы интерфейса и лимиты в одном списке. Открывай, когда уже пишешь мод.
- [Getting started with Claude Code mods](https://claude.dev/blog/getting-started-with-claude-code-mods/) — Руководство Эдди Османи в блоге Anthropic: мод Token Weather собирается с нуля примерно в 80 строк, затем идут разборы Blast Radius и Replay Theater. В конце — четыре полезные привычки, например хранить данные в `$.state`, потому что hot reload заново запускает `register`.
- [anthropics/claude-code-playground → mods](https://github.com/anthropics/claude-code-playground/tree/main/claude-code/mods) — Три примера от Anthropic: `token-weather` рисует над промптом прогноз заполнения контекста; `blast-radius` приостанавливает `rm -rf` и force push и показывает, что они изменят; `replay-theater` по команде `/replay` воспроизводит правки прошлого хода. Поддержки нет, но в README каждого описано, как он устроен. 113⭐.
- [anthropics/claude-code → mods](https://github.com/anthropics/claude-code/tree/main/mods) — Исходники встроенных модов с тестами: панель `/diff`, загрузка `AGENTS.md`, защитный мод `sec-default` и `telemetry`. Образец для собственного мода, который контролирует соблюдение правил.
- [Issue #91870: Mods — make Claude 10x more extensible](https://github.com/anthropics/claude-code/issues/91870) — История разработки: предложение function hooks от 3 сентября 2026 с архитектурным документом и минутными видео. По нему видно, почему API устроен как цепочка middleware с `next`.

### Community

На 5 октября 2026 с публичного релиза прошло четыре дня, хотя часть модов написана ещё на сентябрьской предварительной версии. У большинства всего несколько звёзд, и это пока ничего не значит: смотри на вывод `claude plugin validate` и на тесты. В описаниях ниже указано, что валидатор показал для каждого мода.

- [karanb192/awesome-claude-code-mods](https://github.com/karanb192/awesome-claude-code-mods) — Каталог публичных модов, который автоматически собирается сканером GitHub: больше 1700 на 4 октября 2026. Для каждого указано, что он, по отчёту валидатора, читает, пишет, запускает и отправляет в сеть. Каталог независимый, не от Anthropic; версия с поиском — на [mods.aidojo.si](https://mods.aidojo.si/). 178⭐.
- [hamzafer/claude-code-mods](https://github.com/hamzafer/claude-code-mods) — Двадцать модов в одном маркетплейсе, с CI. Для начала подойдёт `context-bar`: показывает, чем заполнен контекст, и, по данным валидатора, читает только статистику использования сессии. У `where-am-i` и `mission-control` в `calls:` указан `$.model.complete`, то есть они расходуют твой лимит; `mission-control` ещё пишет файлы и запускает процессы. 93⭐.
- [karanb192/cache-tax](https://github.com/karanb192/cache-tax) — Обновляет кэш промпта, пока тебя нет, и заранее показывает, во сколько обойдётся запрос после истечения срока действия кэша. Для обновления использует `$.model.fork`: это API-запрос с записью сессии, на него расходуются токены, а выигрыш зависит от длины перерыва и TTL кэша. По данным валидатора, прямых вызовов файлового, процессного и HTTP API нет. 40⭐.
- [artemnovichkov/xcode-mods](https://github.com/artemnovichkov/xcode-mods) — Сборка, тесты, консоль и SwiftUI-превью Xcode в панели Claude Code. Нужен Xcode 27+ с MCP-сервером в режиме без интерфейса, а для превью — ещё и терминал с kitty graphics protocol или Desktop. По клавише `x` отправляет Claude промпт вроде «почини тесты» (`$.prompt.submit`). 16⭐.

---

## MCP-серверы

[Model Context Protocol](https://modelcontextprotocol.io/) — стандарт для подключения внешних инструментов к LLM. Все MCP-серверы работают в Claude Code, Claude Desktop и Cursor.

> 📂 Полный каталог: **[810 записей →](./catalog/mcp-servers.md)** — собран из [punkpeye/awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers) и официального реестра.

> **Правило из практики:** пять хорошо подобранных MCP-серверов лучше двадцати, но причина не та, которую обычно называют.
>
> Совет «каждый сервер съедает 1–3K контекста» был актуален до версии 2.1.7. Начиная с неё по умолчанию включён [MCP tool search](https://code.claude.com/docs/en/mcp) в автоматическом режиме: если описания инструментов заняли бы больше **10% окна контекста**, при запуске они не загружаются. Остаются только имена инструментов и инструкции сервера, а определения подгружаются по мере необходимости через `MCPSearch`. Порог задаётся через `auto:N` (2.1.9).
>
> Замер на моей машине: `claude -p "ok" --output-format json --strict-mcp-config`, один и тот же промпт, сервер playwright с 25 инструментами и его копии под разными именами.
>
> | Серверов | Контекст на старте | Разница |
> |---:|---:|---:|
> | 0 | 27 070 | — |
> | 1 | 27 438 | +368 |
> | 3 | 28 174 | +1 104 |
>
> Ровно 368 токенов на сервер: расход растёт линейно. Откуда берётся это число, можно проверить отдельно: в том же прогоне на просьбу перечислить свои `mcp__*` модель выдаёт 25 имён без описаний. Значит, отложенная загрузка работала, а 368 токенов ушли на имена, а не на определения. Девятнадцать таких серверов — около 7K, а не половина окна.
>
> Оговорка: это **нижняя граница**. Пока набор инструментов не достигает порога, определения целиком загружаются при запуске, и расход будет заметно выше. Свой расход можно измерить двумя прогонами: с пустым `--mcp-config '{"mcpServers":{}}'` и со своим конфигом. Разница покажет, сколько токенов занимают серверы.
>
> Ограничивать число серверов всё равно стоит — из-за доверия к ним и ошибок при выборе инструментов: каждый сервер — чужой код с доступом к твоему окружению. Чем больше похожих инструментов, тем чаще модель выбирает не тот. Какие из подключённых серверов действительно вызываются, покажет мой [`npx mcp-graveyard`](https://github.com/sfrangulov/skill-graveyard/tree/main/packages/mcp-graveyard): он проводит аудит по локальным логам сессий, без сети и телеметрии.

### Официальные

- [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers) — Официальный набор серверов от Anthropic: `filesystem`, `git`, `postgres`, `slack`, `memory`, `sequentialthinking`.
- [github/github-mcp-server](https://github.com/github/github-mcp-server) — Официальный MCP-сервер GitHub. Превращает Claude из «генератора кода» в участника работы с задачами и PR.
- [MCP registry](https://github.com/modelcontextprotocol/registry) — Официальный каталог серверов с поиском.
- [modelcontextprotocol/python-sdk](https://github.com/modelcontextprotocol/python-sdk) — Официальный SDK для написания MCP-серверов и клиентов на Python. 24k⭐.
- [modelcontextprotocol.io](https://modelcontextprotocol.io/) — Документация протокола.

### Кураторы

- [punkpeye/awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers) — Самый большой каталог MCP-серверов, разбитый на категории.
- [MCP Servers Hub (mcp.so)](https://mcp.so/) — Каталог с поиском и интерактивными демо.
- [Glama AI MCP servers](https://glama.ai/mcp/servers) — Альтернативный каталог.
- [Pulse MCP](https://www.pulsemcp.com/) — Каталог серверов и примеров их использования.
- [Best Claude Code MCP Servers 2026 (Nimbalyst)](https://nimbalyst.com/blog/best-claude-code-mcp-servers/) — Обзор серверов для Claude Code с рейтингом.

### Главное для Claude Code (мой повседневный набор)

- **GitHub** — [github/github-mcp-server](https://github.com/github/github-mcp-server). Без него Claude видит только локальный репозиторий. С ним читает чужие задачи, комментирует PR и создаёт черновики PR.
- **PostgreSQL** — [crystaldba/postgres-mcp](https://github.com/crystaldba/postgres-mcp). Отладка запросов и схемы рабочей БД: можно выбрать режим только для чтения или для чтения и записи, а также анализировать производительность. Эталонный сервер из modelcontextprotocol/servers удалён; этот сервер — его актуальная замена.
- **Filesystem** — [modelcontextprotocol/servers/filesystem](https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem). Чтение файлов вне рабочей папки, например из общей базы знаний или соседнего проекта.
- **Playwright** — [microsoft/playwright-mcp](https://github.com/microsoft/playwright-mcp). Для тестирования интерфейсов и сбора данных с сайтов. Альтернатива — Browserbase с облачными браузерами.
- **Context7** — [upstash/context7](https://github.com/upstash/context7). Актуальная документация популярных библиотек: Claude перестаёт выдумывать API устаревших версий.
- **Локальный RAG** — [sfrangulov/minirag-mcp](https://github.com/sfrangulov/minirag-mcp). Гибридный поиск (семантический + BM25) по своим документам: база знаний проекта, поддержка 12 форматов через markitdown. Ничего не уходит с компьютера. Мой проект.
- **Linear** — [linear.app/docs/mcp](https://linear.app/docs/mcp). Если ведёшь задачи в Linear, агент сам читает спецификации и комментирует задачи. Официальный сервер для удалённого подключения, добавляется через `claude mcp add`.
- **Sequential thinking** — [modelcontextprotocol/servers/sequentialthinking](https://github.com/modelcontextprotocol/servers/tree/main/src/sequentialthinking). Последовательное, пошаговое рассуждение для сложных задач.

Полный список с разбивкой по 30 категориям — базы данных, системы контроля версий, инструменты разработки, облака, браузеры, поиск, коммуникации, мониторинг, безопасность, базы знаний, агрегаторы, изолированные среды, рабочие инструменты, файловые системы, ОС, мультимедиа, анализ данных, RAG, маркетинг, продукт, данные о клиентах, соцсети, поддержка, электронная коммерция, финтех, визуализация, путешествия — в **[catalog/mcp-servers.md](./catalog/mcp-servers.md)**.

---

## Шаблоны CLAUDE.md <a id="claudemd-шаблоны"></a>

`CLAUDE.md` в корне репозитория автоматически загружается в контекст. См. [документацию по памяти](https://code.claude.com/docs/en/memory).

> 📂 Полный каталог: **[10 записей →](./catalog/templates.md)**

### Шаблоны в этом репозитории

- [examples/claude-md-templates/nextjs.md](./examples/claude-md-templates/nextjs.md) — Next.js 16 + React 19 + TypeScript + Tailwind 4.
- [examples/claude-md-templates/python-fastapi.md](./examples/claude-md-templates/python-fastapi.md) — Python 3.13+ + FastAPI + SQLAlchemy 2.0 + Pydantic v2.
- [examples/claude-md-templates/terraform.md](./examples/claude-md-templates/terraform.md) — Terraform 1.13+ с акцентом на безопасность состояния.

В каждом пять блоков: стек, команды, структура, правила и антипаттерны, чек-лист перед PR.

### Известные сборники

- [multica-ai/andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills) — `CLAUDE.md`, составленный на основе практик Andrej Karpathy. 212k⭐.
- [garrytan/gstack](https://github.com/garrytan/gstack) — Настройка среды от Garry Tan: 23 инструмента с заданными подходами к работе. 132k⭐.
- [affaan-m/ECC](https://github.com/affaan-m/ECC) — Полная оптимизация обвязки: скиллы, инстинкты, память, разработка с предварительным исследованием. 255k⭐.
- [davila7/claude-code-templates](https://github.com/davila7/claude-code-templates) — CLI для настройки и мониторинга Claude Code с готовыми наборами настроек под стек. 31k⭐.

### Для конкретного стека

- [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) — Рекомендуемые практики Next.js, фактически эталонный шаблон от Vercel.
- [supabase/agent-skills](https://github.com/supabase/agent-skills) — Supabase и PostgreSQL.
- [callstackincubator/agent-skills](https://github.com/callstackincubator/agent-skills) — Шаблоны React Native.
- [shadcn/ui skills](https://ui.shadcn.com/docs/skills) — Компоненты shadcn с обязательным применением заданных паттернов.
- [expo/skills](https://github.com/expo/skills) — Expo. 25K+ установок.
- [get-convex/agent-skills](https://github.com/get-convex/agent-skills) — Convex — реактивный бэкенд.
- [microsoft/azure-skills](https://github.com/microsoft/azure-skills) — Развёртывание в Azure и рекомендуемые практики от Microsoft.
- [firebase/agent-skills](https://github.com/firebase/agent-skills) — Firebase и Firestore.
- [docs.stripe.com/agents](https://docs.stripe.com/agents) — Руководство Stripe по платежам через агентов: MCP-сервер, набор инструментов для агентов, правила интеграции платёжных систем.

### Тематические руководства

- [Anthropic engineering: Claude Code best practices](https://www.anthropic.com/engineering/claude-code-best-practices) — Официальный пост.
- [Год с Claude Code (alpinadigital, Habr)](https://habr.com/ru/companies/alpinadigital/articles/1032134/) — Опыт настройки за год.
- [Claude Code: практический гайд (Habr)](https://habr.com/ru/articles/987094/) — Настройка на русском.

---

## Строки состояния <a id="status-lines"></a>

Строка состояния под промптом Claude Code показывает лимиты, окно контекста, модель, git и стоимость сессии. Пара строк в конфиге избавляет от необходимости постоянно вызывать `/context` и `/cost`. См. [официальную документацию](https://code.claude.com/docs/en/statusline).

- [sirmalloc/ccstatusline](https://github.com/sirmalloc/ccstatusline) — Строка состояния в стиле Powerline с темами и настройкой каждого сегмента: лимиты, окно контекста, модель, git, стоимость. Устанавливается как npm-пакет. 12.6k⭐.
- [leeguooooo/claude-code-usage-bar](https://github.com/leeguooooo/claude-code-usage-bar) — Строка состояния с лимитами 5h/7d, обратным отсчётом до их сброса, моделью, окном контекста и временем с момента создания кэша промпта. 3 стиля × 9 тем, режим демона. 371⭐.
- [briansmith80/claude-code-status-bar](https://github.com/briansmith80/claude-code-status-bar) — Настраиваемая строка состояния на чистом bash без зависимостей: лимиты с индикаторами темпа расходования, окно контекста, git, стоимость сессии, 8 тем.
- [educlopez/ccvitals](https://github.com/educlopez/ccvitals) — Минималистичная строка состояния на чистом bash, которая не блокирует ввод: квота, окно контекста, git-статус.
- [kumamaki/Claude-Code-Personalities](https://github.com/kumamaki/Claude-Code-Personalities) — Лица каомодзи в строке состояния реагируют в реальном времени на то, чем занят агент, вплоть до нарастающего «раздражения».

---

## Мониторинг расхода и стоимости

Инструменты для отслеживания токенов, квот и расходов: от строки состояния с тратами за день до отдельного дашборда со шкалами лимитов запросов и прогнозом расхода до их сброса. Пригодятся на Pro/Max, чтобы не упереться в 5-часовой лимит посреди задачи. См. [документацию о стоимости](https://code.claude.com/docs/en/costs).

- [mag123c/toktrack](https://github.com/mag123c/toktrack) — Быстрый трекер токенов и стоимости для Claude Code и других LLM. 174⭐.
- [zihenghe04/CCDash](https://github.com/zihenghe04/CCDash) — Расход токенов, квоты и стоимость в Claude Code, claude.ai и API на одной панели.
- [backstabslash/goccc](https://github.com/backstabslash/goccc) — Калькулятор стоимости и строка состояния на Go в одном исполняемом файле: разбивка по модели, дню, проекту и ветке.
- [Ventuss-OvO/cc-costline](https://github.com/Ventuss-OvO/cc-costline) — Строка состояния с тратами за 7 и 30 дней.
- [fabioconcina/claumon](https://github.com/fabioconcina/claumon) — Панель для Pro/Max: шкалы лимитов с обновлением в реальном времени, откалиброванные прогнозы расхода, стоимость сессий, просмотр памяти. Один исполняемый файл, настройка не нужна.
- [EricAndrechek/Pacer](https://github.com/EricAndrechek/Pacer) — Нативное приложение для macOS: учёт токенов и стоимости, контроль темпа расхода с учётом лимитов, разбивка по проектам.

### Как считать и снижать расходы

Инструменты выше отвечают на вопрос «сколько потратил». Разобраться, «почему столько и как меньше», помогает официальный скилл [`claude-api`](https://github.com/anthropics/skills/tree/main/skills/claude-api) с тремя командами:

- **`/claude-api prompt-audit`** — убирает из промптов, скиллов и `CLAUDE.md` антипаттерны, оставшиеся от прошлых поколений моделей: ритуалы «проверь дважды», шаблоны для промежуточных рассуждений, противоречивые правила, устаревшие настройки thinking. По замерам Anthropic при переходе с Opus 4.8 на Opus 5 это снизило стоимость на 14.6% **и** повысило точность на 5.3%.
- **`/claude-api cost-optimize`** — проверяет расходы приложения на Claude API: определяет, куда уходят токены, и сокращает расход за счёт кэширования, пакетной обработки и ограничения объёма ответа. На публичных бенчмарках расходы снизились на 52–73%, а качество осталось в пределах доверительного интервала.
- **`/claude-api hillclimb`** — перебирает сочетания моделей и уровней effort на твоём наборе проверок, разделяя его на обучающую и тестовую части и разбирая примеры, на которых модель не справилась.

Разбор всех трёх способов — кэширования промптов, устранения антипаттернов и подбора effort — с цифрами: **[docs/tips-ru.md → подборка от 8 сентября 2026](./docs/tips-ru.md#anthropic--снижение-стоимости-без-потери-качества--8-сентября-2026)**.

---

## Гайды и контент на русском

> 📂 Полный список: **[12 записей →](./catalog/ru-content.md)**

### Официальная документация — теперь на русском

**[code.claude.com/docs/ru →](https://code.claude.com/docs/ru/quickstart)** — 122 страницы: быстрый старт, глоссарий, стоимость и лимиты, разбор ошибок, режимы разрешений, окно контекста, кэширование промптов, все базовые механизмы (скиллы, субагенты, хуки, MCP, плагины, память) и еженедельный [журнал изменений](https://code.claude.com/docs/ru/whats-new). Перевод местами машинный, но полный, и им можно пользоваться.

### В этом репозитории

- **[docs/tips-ru.md](./docs/tips-ru.md)** — переводы тематических подборок советов от Boris Cherny (создателя Claude Code) и Thariq (Anthropic). 8 подборок с января по апрель 2026: Boris × 6 (13/10/12/2/15/6 советов) + Thariq × 2 (скиллы, управление сессиями). Все 75 советов в обратном хронологическом порядке: сначала новые. Плюс разбор трёх этапов воркшопа How We Claude Code на Code with Claude 2026: подготовка спецификации через интервью, четыре HTML-варианта дизайна, архитектура компонентов, которую можно проверить. А также инженерная статья Anthropic от 8 сентября 2026 о трёх способах управлять стоимостью: кэширование промптов, антипаттерны в промптах, настройка effort.
- **[docs/skill-families-ru.md](./docs/skill-families-ru.md)** — разбор трёх основных семейств скиллов: `obra/superpowers` (14 скиллов, методология с обязательным автоматическим запуском), `mattpocock/skills` (37 скиллов, специально устроенных так, чтобы не перехватывать управление процессом) и `affaan-m/ECC` (286 скиллов, 68 агентов, инстинкты и память, общая для разных сред запуска агентов). Полные списки, принципы, установка и разбор того, кому что подходит и что с чем не сочетается.

### Habr — практические гайды

- [Claude Code в 2026: гайд для тех, кто еще пишет код руками](https://habr.com/ru/articles/987382/) — Подробный гайд по ИИ-агентам для написания кода, рекомендации по тарифам и CLI.
- [Год с Claude Code: рабочая конфигурация с первого запуска](https://habr.com/ru/companies/alpinadigital/articles/1032134/) — Как устроены rules, skills, agents, команды, MCP и hooks и как всё это связано через `routing.md`.
- [Claude Code: практический гайд по настройке, автоматизации и контексту](https://habr.com/ru/articles/987094/) — Полная настройка со скиллами, хуками, субагентами и MCP. Написано практиком.
- [Полное руководство по добавлению MCP-серверов](https://habr.com/ru/articles/938626/) — Способы настройки, решения частых проблем, проверенные серверы.
- [44 настройки Claude Code, о которых вы не знали](https://habr.com/ru/articles/987826/) — Настройки по важности: от «must have» до «забей».
- [10 настроек Claude Code, до которых большинство не доходит](https://habr.com/ru/articles/1028988/) — Возможности, которыми редко пользуются.
- [Что вы не знали о Claude Code: архитектура и практики](https://habr.com/ru/articles/1012412/) — Как агент устроен изнутри.
- [Айсберг Claude Code (YooMoney)](https://habr.com/ru/companies/yoomoney/articles/1015548/) — 30+ возможностей: от первых шагов до автоматизации.
- [Изоляция контекста через субагенты](https://habr.com/ru/articles/974448/) — Архитектурный подход к работе над долгими задачами.
- [3000+ часов в Claude Code](https://habr.com/ru/articles/1017110/) — Личный опыт автора, собранный в трёх плагинах.
- [Statusline для Claude Code с мониторингом VPS](https://habr.com/ru/articles/1013414/) — Настройка строки состояния.
- [Разработка с Obsidian + Claude](https://habr.com/ru/articles/1030316/) — Как работать с Claude и базой знаний в Obsidian.
- [Как использовать Claude Code: советы опытного разработчика (OTUS)](https://habr.com/ru/companies/otus/articles/929624/) — Материал из корпоративного блога.
- [Claude Code — полный гайд для новичков с нуля](https://habr.com/ru/articles/1033416/) — Функции, настройка и проверенные приёмы работы.
- [Claude Code: маршрут обучения и ресурсы 2026](https://habr.com/ru/articles/983214/) — План обучения.
- [Claude Code для тех, кто не пишет код](https://habr.com/ru/articles/1017668/) — Для специалистов по продукту и менеджеров.
- [Code с Claude 2026: что Anthropic показали разработчикам](https://habr.com/ru/articles/1032588/) — Отчёт со второй конференции Anthropic (6 мая 2026).
- [Claude Code бесплатно: ИИ бесплатно в 2026](https://habr.com/ru/articles/1018234/) — Об утечке карт исходного кода и форке OpenClaude.

### vc.ru — индустрия и кейсы

- [Кодинг с ИИ-агентом в терминале (vc.ru)](https://vc.ru/ai/2920853-ii-agenty-v-terminalye) — Как Claude Code и его аналоги работают изнутри.
- [Три парадигмы ИИ-агентов в 2026: Claude Code / OpenClaw / Hermes](https://vc.ru/ai/2911692-iskusstvennyj-intellekt-dlja-biznesa) — Opus 4.7, бюджеты задач, контекст на 1 млн токенов.
- [Anthropic ограничила OpenClaw в Claude-подписках](https://vc.ru/ai/2878137-anthropic-ogranichila-openclaw-v-claude) — Случай с отключением сторонних агентов.
- [Anthropic: 10 агентов для финансового сектора](https://vc.ru/id300496/2913405-anthropic-predstavila-ii-agentov-dlya-finansovogo-sektora) — ИИ-агенты для работы с финансами.
- [Anthropic признал, что два месяца поставлял дефектный Claude Code](https://vc.ru/ai/2885740-anthropic-priznal-defekty-v-claude-code) — Отчёт об инциденте.
- [Тарифы Claude 2026: гайд по планам, ценам API и доступу из России](https://vc.ru/ai/2757771-tarify-claude-2026-gayd-po-planam-i-dostupu-iz-rossii) — Цены и тарифы.
- [Как зарегистрироваться в Claude AI из России в 2026](https://vc.ru/ai/2878925-registratsiya-v-claude-ai-iz-rossii) — Регистрация.

### DTF — для тех, кто не занимается разработкой

- [Как использовать Claude в России в 2026: полный гайд](https://dtf.ru/howto/4796716-kak-zaregistrirovatsya-i-ispolzovat-claude-v-rossii) — Регистрация и работа с Claude из России.
- [AI-кодинг с Claude Code: три способа создания лендинга](https://dtf.ru/howto/4727219-ai-koding-s-claude-code-sozdanie-lendinga-i-ego-detali) — Как контекст влияет на результат.
- [Claude AI: возможности и готовые промпты](https://dtf.ru/howto/5013694-claude-ai-vozmozhnosti-nevroseti) — Сценарии использования и шаблоны.

### YouTube

- [Claude Code: ПОЛНЫЙ КУРС 2026 (4+ часа)](https://www.youtube.com/watch?v=e6JOw0PliRw) — Длинный курс с практикой.
- [Claude Code: ПОЛНЫЙ ГАЙД 2026 (2+ часа)](https://www.youtube.com/watch?v=kFpX1FftH70) — Курс с последовательной подачей материала.
- [Claude Code: настройка, MCP и Subagent Driven разработка](https://www.youtube.com/watch?v=_4ZcgpvDliA) — Основное внимание — MCP и субагентам.
- [Claude Code: всё за 2 часа](https://www.youtube.com/watch?v=dn3CuC-2NiI) — Ещё один обзор.
- [Я потратил на Claude Code 1000 часов. Вайб-кодинг](https://www.youtube.com/watch?v=sx6ZSbc51gY) — Личный опыт автора.
- [Claude на МАКСИМУМ — гайд за 11 минут](https://www.youtube.com/watch?v=erdJvTR0hcU) — Краткий обзор.
- [Создавай ИИ-агентов с Claude Code — все функции за 22 минуты](https://www.youtube.com/watch?v=iwyHt30Ty0c) — MCP, субагенты, скиллы, хуки и разрешения.
- [Claude Code или Codex? Честный тест](https://www.youtube.com/watch?v=OethkCDGwuM) — Сравнение на реальном продукте.
- [Claude Code для дизайнеров](https://www.youtube.com/watch?v=OiXq8xhJ-wg) — С акцентом на UX/UI.
- [Claude станет в 10 раз умнее, если подключишь это](https://www.youtube.com/watch?v=eTrUEZ9E9aI) — MCP-инструменты для расширения возможностей.
- [Регистрация в Claude AI в России](https://www.youtube.com/watch?v=2ypCr-Gz-t0) — Практический гайд.

---

## Безопасность и корпоративное использование <a id="безопасность-и-enterprise"></a>

- [Security best practices](https://code.claude.com/docs/en/security) — Официальное руководство.
- [Permissions / IAM](https://code.claude.com/docs/en/iam) — Настройка прав, `allowManagedHooksOnly` для корпоративного использования.
- [anthropics/defending-code-reference-harness](https://github.com/anthropics/defending-code-reference-harness) — Эталонная обвязка Anthropic: скиллы threat-model / vuln-scan / triage / patch и автономный конвейер в песочнице. Сопровождается разбором «Using LLMs to secure source code».
- [trailofbits/skills](https://github.com/trailofbits/skills) — Скиллы Trail of Bits для проверки безопасности: CodeQL / Semgrep, аудит кода.
- [anthropics/claude-code-security-review](https://github.com/anthropics/claude-code-security-review) — GitHub Action: Claude проверяет безопасность кода в каждом PR и отфильтровывает ложные срабатывания.
- [firebase/agent-skills@firestore-security-rules-auditor](https://www.skills.sh/firebase/agent-skills/firestore-security-rules-auditor) — Аудит правил безопасности Firestore перед релизом в продакшен. Более 20 тысяч установок.
- [Anthropic enterprise governance](https://www.anthropic.com/enterprise) — Корпоративное управление.

### Типовые решения для компаний

- [Managed plugin marketplaces](https://code.claude.com/docs/en/plugins#managed) — Только проверенные скиллы из собственного маркетплейса организации.
- [Permission policies](https://code.claude.com/docs/en/permissions#managed-settings) — Список Bash-команд, разрешённых в организации.
- [Hooks reference](https://code.claude.com/docs/en/hooks) — Схема всех событий для аудита и блокировки.
- [examples/hooks/audit.sh](./examples/hooks/scripts/audit.sh) — Аудит каждого события PostToolUse в формате JSONL для контроля соблюдения требований.

---

## Прочие ресурсы

### Промптинг

- [Anthropic Prompting Guide](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview) — Официальное руководство.
- [Anthropic Cookbook](https://github.com/anthropics/claude-cookbooks) — Примеры приёмов с кодом.
- [anthropics/cwc-workshops](https://github.com/anthropics/cwc-workshops) — Материалы девяти воркшопов с конференции Code with Claude: процесс «спека → варианты дизайна → верификация», скилл для аудита evals и подбора модели по цене и скорости, разработка агентов на Managed Agents с опорой на evals. Архив без поддержки, Apache-2.0.
- [Claude API Skills best practices](https://platform.claude.com/docs/ru/agents-and-tools/agent-skills/best-practices) — Официальный документ на русском.
- [dair-ai/Prompt-Engineering-Guide](https://github.com/dair-ai/Prompt-Engineering-Guide) — Академическое руководство, 50k+⭐.
- [f/prompts.chat](https://github.com/f/prompts.chat) — Готовые промпты, подходят и для Claude.
- [PatrickJS/awesome-cursorrules](https://github.com/PatrickJS/awesome-cursorrules) — `.cursorrules` для разных стеков, многие подходят и для CLAUDE.md.

### Каналы и сообщества

- [@cc_consultant (Telegram, RU)](https://t.me/cc_consultant) — Это руководство и ежедневные разборы.
- [Anthropic Discord](https://www.anthropic.com/discord) — Каналы `#claude-code`, `#skills-and-tools`, `#show-and-tell`.
- [r/ClaudeAI](https://www.reddit.com/r/ClaudeAI/) — Сообщество на Reddit.
- [r/Anthropic](https://www.reddit.com/r/Anthropic/) — Официальный сабреддит.

### Подкасты и YouTube (EN)

- [Latent Space (swyx)](https://www.latent.space/) — Инженерия ИИ, регулярные выпуски про Claude Code и MCP.
- [The Cognitive Revolution](https://www.cognitiverevolution.ai/) — Nathan Labenz, индустрия ИИ и тренды.
- [Practical AI (Changelog)](https://practicalai.show/) — Практические примеры использования ИИ.
- [Anthropic (YouTube)](https://www.youtube.com/@anthropic-ai) — Релизы и технические демо.
- [Matt Pocock](https://www.youtube.com/@mattpocockuk) — TypeScript и инструменты ИИ.
- [ThePrimeagen](https://www.youtube.com/@ThePrimeagen) — Критический взгляд на работу с ИИ.

### Twitter / X — практики

- [@AnthropicAI](https://twitter.com/AnthropicAI) — Официальный аккаунт.
- [@alexalbert__](https://twitter.com/alexalbert__) — Alex Albert, DevRel в Anthropic.
- [@swyx](https://twitter.com/swyx) — Инженерия ИИ, Latent Space.
- [@simonw](https://twitter.com/simonw) — Simon Willison, разборы LLM-инструментов.
- [@mattpocockuk](https://twitter.com/mattpocockuk) — Matt Pocock, скиллы для TDD.
- [@obra](https://twitter.com/obra) — Jesse Vincent, автор `obra/superpowers`.

### Сравнение с другими CLI-агентами

- [Cursor](https://cursor.com/) — Отдельный редактор на базе VS Code с упором на работу в IDE и сильным автокомплитом.
- [GitHub Copilot](https://github.com/features/copilot) — Встроен в IDE, основной упор на автокомплит и чат.
- [Aider](https://aider.chat/) — Работает прежде всего через CLI, имеет открытый исходный код и поддерживает разные модели.
- [Cline](https://github.com/cline/cline) — Расширение для VS Code с агентным режимом.
- [Continue](https://www.continue.dev/) — Автокомплит и чат в IDE с открытым исходным кодом.
- [OpenAI Codex CLI](https://github.com/openai/codex) — Официальный CLI-агент OpenAI.
- [Google Gemini CLI](https://github.com/google-gemini/gemini-cli) — CLI-агент от Google.
- [Devin Desktop (бывший Windsurf)](https://devin.ai/desktop) — Агент для IDE от Codeium: Windsurf перешёл к Cognition и был переименован.

### Утилиты

- [Anthropic Console](https://platform.claude.com/) — Площадка для экспериментов, библиотека промптов, выдача API-ключей.
- [Anthropic Workbench](https://platform.claude.com/workbench) — Интерфейс для экспериментов с промптами.
- [Anthropic Status](https://status.anthropic.com/) — Статус сервисов.
- [Claude release notes](https://code.claude.com/docs/en/changelog) — Официальный список изменений.
- [Skills.sh](https://www.skills.sh/) — Маркетплейс скиллов с числом установок.
- [vercel-labs/skills](https://github.com/vercel-labs/skills) — `npx skills` — установщик скиллов для любой среды работы агента: добавляет файлы прямо в репозиторий. Через него устанавливается половина коллекций из раздела Skills. Там же лежит скилл `find-skills`: агент сам ищет на skills.sh скиллы под задачу и, прежде чем предложить их, проверяет число установок и репутацию источника. 31k⭐.
- [zenbu-labs/terminal-browser](https://github.com/zenbu-labs/terminal-browser) — Браузер прямо в терминале: делит панель и показывает страницу рядом с сессией. Агент управляет страницей: делает снимки, кликает, вводит текст, выполняет eval. 2.8k⭐.
- [jackwener/OpenCLI](https://github.com/jackwener/OpenCLI) — Агент работает с сайтами через твой Chrome, в котором ты уже вошёл в аккаунты: расширение связывает браузер с агентом, а команды `opencli browser` позволяют открыть страницу, кликнуть, заполнить форму, извлечь данные и посмотреть сетевые запросы. Для частых задач есть детерминированные адаптеры вроде `opencli hackernews top`. Свои адаптеры можно писать по скиллу `opencli-adapter-author`, скиллы устанавливаются через `npx skills add jackwener/opencli`. Сайт — [opencli.info](https://opencli.info/). 29k⭐.
- [Panniantong/Agent-Reach](https://github.com/Panniantong/Agent-Reach) — Один инструмент для чтения и поиска в интернете: страницы, субтитры YouTube, RSS, GitHub, X, Reddit, LinkedIn. Для каждой площадки предусмотрены основной и запасной способы доступа, для сайтов со входом в аккаунт используется OpenCLI; `agent-reach doctor` показывает, что работает. Подходит, когда агенту нужно читать и искать, а не кликать. Агент устанавливает его по ссылке на `install.md` — прочитай файл, прежде чем передать ссылку. 82k⭐.
- [gastownhall/beads](https://github.com/gastownhall/beads) — Трекер задач для агентов на базе Dolt, который хранит связи между задачами в виде графа: `bd ready` выдаёт задачи, которым ничего не мешает, `bd remember` сохраняет память проекта между сессиями, а сжатие старых задач экономит контекст. Хэш-ID вида `bd-a1b2` не конфликтуют при слиянии параллельных веток. `bd setup claude` устанавливает хуки, `--stealth` позволяет работать без коммита в общий репозиторий. 27k⭐.
- [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) — Сохраняет контекст между сессиями: записывает работу агента, сжимает записи и добавляет нужное в следующие сессии. Claude Code, Codex, Gemini, Copilot, OpenCode. 94k⭐.
- [hesreallyhim/awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code) — Главный список ресурсов экосистемы: скиллы, агенты, строки состояния, инструменты, плагины. 54k⭐.
- [sfrangulov/skill-graveyard](https://github.com/sfrangulov/skill-graveyard) — Аудит установленных скиллов по локальным логам сессий: активные, неиспользуемые, отсутствующие и выдуманные. `npx skill-graveyard`, без сети и телеметрии; в монорепозитории — mcp-graveyard и memory-graveyard. Мой проект.
- [shanraisshan/claude-code-best-practice](https://github.com/shanraisshan/claude-code-best-practice) — Образцовый сборник рекомендаций на английском с ежедневными обновлениями под версии Claude Code. Охватывает все актуальные функции, советы Boris Cherny и приёмы работы с разными моделями.

---

## Как добавить ресурс

README.md генерируется автоматически. Исходные данные хранятся в `data/*.json` (списки) и `README.template.md` (постоянный текст, заголовки, маркеры).

1. Открой подходящий файл в [`data/`](./data/) и добавь запись:
   ```json
   { "name": "Название", "url": "https://...", "desc": "Одна строка о том, для чего полезно." }
   ```
2. Запусти локально три проверки — те же, что выполняются в PR:
   ```bash
   node scripts/validate-data.mjs        # форма записи: name/url/desc
   node scripts/lint-data.mjs            # стиль desc: no-self-name, без маркетинга
   node scripts/build-readme.mjs         # перегенерация README.md (`--check` — только проверка)
   ```
3. URL-слаги в ссылках на скиллы/плагины/MCP **оставляй на английском** (как в источнике). На русском пиши только `desc`. Перевод слагов ломает ссылки на skills.sh и GitHub.
4. Закоммить и `data/<section>.json`, и заново сгенерированный `README.md`.
5. Перед PR убедись, что:
   - ресурс работает с актуальной версией Claude Code;
   - его ещё нет в списке;
   - ссылка публичная (GitHub / документация / статья);
   - в описании нет маркетинговых слов («революционный», «must-have», «прорывной»).

Подробнее — в [CONTRIBUTING.md](./CONTRIBUTING.md).

## Лицензия

[CC0](./LICENSE) — список и тексты можно свободно использовать, копировать и адаптировать. Код в `examples/` — под лицензией MIT.
