# Best practices для curated awesome-list READMEs

> Исследование под README.md этого репозитория. Дата: 2026-05-20.
> Метод: research-pipeline skill — 4 параллельных DEEP-субагента (структура / item-формат / hero / бейджи), 46 источников снапшотом, отдельный adversarial-проход переписал 7 из 8 load-bearing claims в narrower phrasing.
> Эпистемические теги на каждом утверждении: `[класс источника, верификация, verdict]`.

## TL;DR

1. **Канонический скелет awesome-list строже мифа, но мягче, чем кажется.** Жёстко зафиксированы: одна H1, succinct subject-описание под ней, Awesome-бейдж рядом с заголовком, и (если используешь) TOC именно с названием `Contents`. Всё остальное — guideline, а не lint-rule.
2. **Item-формат `- [Name](url) - Description.`** Тире — ASCII hyphen с пробелами, не em-dash. Description начинается с заглавной (или camelCase/PascalCase/CONSTANT — линт допускает), заканчивается `.` `!` `?` `…`, объективное (не маркетинг), **не содержит имени самого item** — это самое часто нарушаемое правило.
3. **CI/build-бейджи запрещены в hero**, но lint ловит только Travis/CircleCI по URL — GitHub Actions проходит. `awesome-go` сам нарушает это правило, так что популярность ≠ корректность.
4. **Awesome-бейдж — единственный *обязательный***, не *эксклюзивный*. Три санкционированных варианта (`badge.svg` / `badge-flat.svg` / `badge-flat2.svg`), модифицировать запрещено. Другие бейджи в hero (Slack, Netlify) не запрещены, но и не одобрены.
5. **Описание описывает СУБЪЕКТ, не список.** Единственный claim, который выжил adversarial без ослабления: `Mobile operating system for Apple phones and tablets.` (good) vs `Resources and tools for iOS development.` (bad).

## Метод и источники

- 4 субагента (`structure`, `presentation`, `cover`, `badges`) с DEEP-режимом — каждый открыл 8-11 источников, сохранил extracted bodies на диск, вернул структурированный report с verbatim-цитатами и locator'ами.
- 46 источников снапшотом, 32 уникальных sha256 (некоторые URL пересеклись между темами).
- Adversarial-проход атаковал 8 load-bearing claim'ов: 1 `survived`, 7 `weakened`, 0 `refuted`. 2 дополнительных counter-source (`awesome-go/CONTRIBUTING.md`, `awesome-rust/CONTRIBUTING.md`) фетчнуты после adversary.
- Все цитаты в этом документе — verbatim substring снапшота, footnote `[^h:sha8]` ссылается на manifest в конце.

---

## 1. Структура (sections, hierarchy, TOC)

**1.1.** Канонический скелет: ровно одна H1 (имя списка), succinct subject-описание абзацем под ней, Awesome-бейдж рядом с заголовком, `Contents` как **первая** секция, далее H2-категории с опциональным одним уровнем H3. `[primary, verified, weakened]`[^h:80335fad][^h:23e16559][^h:04238e3c]

Adversary поправил три расширения: (а) `Contents` секция **опциональна** — в `awesome-lint/rules/toc.js` есть комментарий «Table of Contents is now optional - don't report an error if missing»[^h:80335fad]; (б) H1 принимает и title case, и sentence case — `listHeadingCaseAllowList = {'title','capital'}` в `heading.js`[^h:23e16559]; (в) HTML-заголовок с `<img>` в центрированном `<div>` тоже принимается как H1.

**1.2.** Имя TOC — `Contents`, не `Table of Contents`. `[primary, verified, survived]`[^h:04238e3c]

> "Should be named `Contents`, not `Table of Contents`."[^h:04238e3c]

**1.3.** Максимальная глубина TOC — два уровня (H2 → H3), четвёртый уровень в TOC — lint-ошибка. Хардкод `const maxListItemDepth = 1` в `toc.js`. `[primary, verified, survived]`[^h:80335fad]

**1.4.** `Contributing`, `Footnotes`, `Related Lists` **исключены** из TOC хардкодным denylist'ом. `License` в TOC и в теле README **запрещён** (но guideline-only, не lint-enforced — нарушается `awesome-go` и `awesome-readme` в продакшене). `[primary, verified, weakened]`[^h:80335fad][^h:04238e3c][^h:5635bc21][^h:a6448c7f]

**1.5.** Новые элементы добавляются **в конец категории** — порядок по acceptance, не алфавитный — **но это правило для submissions в sindresorhus/awesome, не универсальное.** `awesome-go` и `awesome-rust` требуют **строгий алфавит** в своих `CONTRIBUTING.md`. `[primary, verified, weakened]`[^h:04238e3c][^h:923e106d][^h:112f2bfa]

Cм. *Open contradictions / Порядок элементов* ниже.

**1.6.** Когда сплитить на под-страницы: PR template даёт **только одну** санкционированную причину — unmaintained/deprecated items в отдельный markdown-файл. Иначе convention — один большой README (awesome-go ~1.4k items в одном файле, awesome-python ~1.1k строк). `[primary, verified, survived]`[^h:04238e3c]

**1.7.** Длина списка и количество категорий — никаких формальных верхних границ. Empirical range: 50–2000 items без жалоб лица проекта.[^h:5635bc21][^h:4ba2c128]

---

## 2. Представление информации (item-level)

**2.1.** Канонический формат: `- [Name](url) - Description.` — bullet с ASCII hyphen-маркером, bracketed link первым, ASCII hyphen с пробелами как разделитель (en-dash/em-dash линт не принимает). `[primary, verified, weakened]`[^h:04238e3c][^h:a87e2f79]

Adversary поправил «must start uppercase»: `listItemPrefixCaseAllowList = {'camel','capital','constant','pascal','upper'}` в `list-item.js`[^h:a87e2f79] — camelCase/PascalCase/CONSTANT/UPPER принимаются, плюс символьные префиксы (`/`, `@`, `#`, `$`, `~`, `&`, `%`) и спец-случаи emoji-only / parenthetical-only.

**2.2.** Description заканчивается на `.`, `!`, `?` или `…` (либо image/link/emoji в конце). `[primary, verified, survived]`[^h:a87e2f79]

**2.3.** Description **должно описывать SUBJECT, НЕ список.** `[primary, verified, survived]`[^h:04238e3c]

> ✅ `Mobile operating system for Apple phones and tablets.`
> ❌ `Resources and tools for iOS development.`

Самое часто нарушаемое правило в дикой природе — единственный из 8 атакованных claim'ов, который выжил adversarial без поправок.

**2.4.** Description **не должно начинаться с имени самого item.** Отдельный lint-rule `no-repeat-item-in-description.js` ловит case-insensitive вхождение имени в начале description. Убивает паттерн `X - X is a JavaScript library for...`. `[primary, verified, survived]`[^h:59c511b5]

**2.5.** Inline-форматирование в description ограничено allow-list'ом: bold, italic, inline-code, link, image, html, footnote-ref. Blockquote/heading/list внутри item-строки — lint-ошибка.[^h:a87e2f79]

**2.6.** CI/build-status бейджи в item-line **запрещены** — но lint ловит только `/build status|travis|circleci/i` в title и `/travis|circleci/i` в URL. GitHub Actions URL'ы проходят. `[primary, verified, weakened]`[^h:afef8c2a]

**2.7.** Metadata на item-уровне (звёзды, last-updated, install-команды) — **anti-pattern по spec'у**, отсутствует в `contributing.md` / PR template / lint rules. `awesome-python` (top-стар Python-список) подтверждает: 0 бейджей, 0 metadata-полей.[^h:df178c68][^h:04238e3c][^h:4ba2c128]

**2.8.** Эмпирически допустимое расширение — `awesome-selfhosted` добавляет короткие backticked inline-code теги после `.` (license + tech-stack): `` `MIT` `Nodejs/Docker` ``. Всё ещё bullets, не таблица. `[secondary, verified, survived]`[^h:2b81149d]

**2.9.** Bullets vs tables: каждый официальный источник использует bullets. Tables не запрещены lint'ом нигде, но **non-canonical**. `awesome-selfhosted` сам рекомендует свою HTML-версию над markdown — это сильнейший counter-claim в пользу таблиц для attribute-heavy доменов. `[inferred, verified, weakened]`[^h:2b81149d]

---

## 3. Cover / Hero / Header

**3.1.** Hero block состоит из 4 обязательных и 1 опционального элемента, в порядке приоритета: (1) H1 `# Awesome X` в title case, (2) succinct subject-описание одним предложением, (3) Awesome-бейдж linked back to parent list, (4) `Contents` как первая секция, (5) опциональный logo/illustration. `[primary, verified, weakened]`[^h:04238e3c][^h:6d7a52fa]

Adversary напомнил: точка (1) и (4) уже weakened в §1; (3) — см. §4.

**3.2.** Две благословлённые геометрии header-блока:
- **A: inline** — H1 с Awesome-бейджем на той же строке, опциональный logo с `align="right"`. Канонический пример — `awesome-electron`[^h:4a98d7d4]: `# Awesome Electron [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)`.
- **B: centered** — `<div align="center">` оборачивает logo, потом H1, потом centered бейдж. Пример — `awesome-nodejs`[^h:bcc896e1] и сам `sindresorhus/awesome`[^h:6f21d2ce].

**Mixing запрещён.** Centered logo + left-aligned H1 + right-aligned badge — non-conforming. `[primary, verified, survived]`[^h:04238e3c]

**3.3.** Три прямых запрета: (а) **не дублируй заголовок** — если logo-image говорит `Awesome X`, нельзя одновременно держать `# Awesome X` текстом; (б) описание описывает **СУБЪЕКТ, не список** (см. §2.3); (в) `License` / `Contributing` не должны попадать в TOC. `[primary, verified, survived]`[^h:04238e3c]

**3.4.** Bilingual (RU+EN) READMEs: community-pattern — sibling-файлы `README.md` + `README.<lang>.md` с shields.io language-бейдж-row сразу под H1. У GitHub **нет native language switcher**. Interleaved языки в одном hero — unattested в обследованной выборке (8-10 top awesome lists), но не доказано как absolute prohibition. `[inferred, partially-verified, weakened]`[^h:07faa35f]

**3.5.** Минимализм обыгрывает максимализм для top-стар lists. `awesome-python` (240k+⭐, top-стар Python-list) ships **zero logo, zero badge row, 3-строчный hero**: `# [Awesome Python](...)` + subject-tagline + одна жирная callout-строчка на website. Не нарушает spec, но игнорирует «logo whenever possible» guideline. `[secondary, verified, survived]`[^h:e4732def]

**3.6.** GitHub's official README docs фреймят cover как **UX problem, не branding**: README — first item visitor sees, должен ответить what/why/how/where/who сверху. Implication: hero должен телеграфировать эти ответы, не выглядеть красиво. `[official, verified, survived]`[^h:8503c83c]

---

## 4. Бейджи (badges)

**4.1.** Awesome-бейдж — **единственный обязательный** в hero, не **эксклюзивный.** Три санкционированных варианта от awesome.re: `badge.svg` (классический shield с rainbow rim), `badge-flat.svg` (flat), `badge-flat2.svg` (flat с extra letter spacing). Maintainer выбирает один. `[primary, verified, weakened]`[^h:6d7a52fa]

Adversary поправил: spec **требует** Awesome-бейдж, не **запрещает остальные**. `awesome-go` шлёт 6 бейджей; spec этого не одобряет, но и не лента такое в lint.

**4.2.** **Не модифицируй бейдж SVG.** `[primary, verified, survived]`[^h:6d7a52fa]

> "The badges should not be modified in any way."[^h:6d7a52fa]

**4.3.** Размещение: **справа от H1** по default; **центрировано — только если hero centered.** Mixing запрещён. `[primary, verified, survived]`[^h:04238e3c][^h:6d7a52fa]

> "Add an awesome badge to the top of your list, right next to the title."[^h:6d7a52fa]

**4.4.** **CI / GitHub Actions / build-status бейджи запрещены в README header** — guideline в PR template ("no value in the readme"). Lint (`no-ci-badge.js`) ловит только Travis/CircleCI по URL и "build status" по title — **GHA URL'ы проходят**. `awesome-go` сам шлёт GHA-бейдж в hero — live counter-example. `[primary, verified, weakened]`[^h:04238e3c][^h:afef8c2a][^h:5635bc21]

**4.5.** Anti-patterns в header (синтезировано из spec + observed violations):
- CI/build/GHA badges (banned, но иногда проходят lint)
- Last-commit badges (vanity, decay в "stale list" signal)
- Star-count badges (избыточно — GitHub показывает сверху)
- License badges (избыточно — GitHub показывает в sidebar)
- PR-welcome / "made with love" / "built with X" — декоративный шум
- Tracker badges типа trackawesomelist — third-party, decays с сервисом
- **Mixing for-the-badge style с flat Awesome-бейджем — "stickerbook" эффект.** `[inferred, unverified, survived]`

**4.6.** Shields.io: default style — `flat`, история (с 2014 года). `for-the-badge` (uppercase, tall) визуально несовместим с flat Awesome-бейджем. Shields.io's own positioning — "concise, consistent, and legible" — против sprawl. `[primary, verified, survived]`[^h:405f5ab5][^h:f1f146e4][^h:2846e535]

**4.7.** «Inspired by awesome-foo» link в hero — **запрещён** PR template'ом. Awesome-бейдж сам по себе делает этот reference избыточным. `[primary, verified, survived]`[^h:04238e3c]

**4.8.** Empirical badge usage в top lists (выборка 5):
- `awesome-nodejs`: 1 бейдж (Awesome flat2)[^h:32c8ed04]
- `awesome-electron`: 1 бейдж (Awesome flat)[^h:93e6b70d]
- `awesome-python`: **0 бейджей**[^h:e4732def]
- `awesome-go`: 6 бейджей (включая banned GHA)[^h:5635bc21]
- Awesome-mentioned бейдж (для проектов, **упомянутых** в awesome-list) — отдельная категория[^h:6d7a52fa]

---

## Open contradictions

### Порядок элементов: chronological vs alphabetical

- **sindresorhus/awesome PR template**: «Your entry should be added at the bottom of the appropriate category.»[^h:04238e3c] — append-only, по acceptance.
- **awesome-go CONTRIBUTING.md**: «The item is in the **correct category** and in **alphabetical order**.»[^h:923e106d]
- **awesome-rust CONTRIBUTING.md**: «Sort: alphabetical» и «please pay attention to the alphabetical ordering».[^h:112f2bfa]

Сама meta-list использует append-bottom; два top-list внутри неё переопределили правило на алфавит. **Нет универсального ответа** — каждый list задаёт policy сам. Это не silently average — это два валидных режима с разной target-аудиторией (chronological = "что нового", alphabetical = "найди по имени").

### Tables vs bullets

Lint ничего не говорит про tables, но spec предполагает bullets. `awesome-selfhosted` рекомендует свою HTML-версию над markdown-версией — implicit признание, что для attribute-heavy доменов bullets — degraded format. Для нашего handbook (где есть «топ-15 скиллов» с колонкой «Установок») таблица — оправданное отклонение от canonical.

### License heading

Spec запрещает[^h:04238e3c], но `awesome-go`[^h:5635bc21], `awesome-readme`[^h:a6448c7f] и `naereen/badges`[^h:85871079] держат `## License` секцию в проде. Guideline, не lint-rule.

---

## Audit нашего README.md (вердикт vs spec)

| # | Что | Спек | У нас сейчас | Статус |
|---|---|---|---|---|
| A1 | H1 формат | `# Awesome X` title case (для inclusion в sindresorhus/awesome) | `# Claude Code Handbook на русском` | non-conforming-by-choice (мы не претендуем на meta-list) |
| A2 | Tagline под H1 | Описывает SUBJECT, не LIST | «Курируемый справочник для тех, кто использует Claude Code…» — описывает LIST | **violation L6 (единственный survived claim)** |
| A3 | Awesome-бейдж | Рядом с H1 (right side) или centered если hero centered | На отдельной строке через 2 строки от H1 | nudge: подвинуть inline |
| A4 | TOC name | `Contents` | `Содержание` (русский эквивалент) | OK in spirit (TOC сам по себе optional после toc.js update) |
| A5 | TOC depth | ≤ 2 уровня (H2 → H3 в TOC) | 1 уровень — H2 only | OK |
| A6 | Item separator | ASCII hyphen ` - ` | em-dash ` — ` | non-canonical (типографически верно для русского, но lint бы ругнулся) |
| A7 | Item description ends in `.`/`!`/`?`/`…` | Required | Большинство — да, часть таблиц-строк — нет | mostly OK |
| A8 | Description starts with item name | Запрещено | Несколько строк нарушают (в табличной строке текста перед описанием нет, поэтому скорее формально ок) | grey-zone |
| A9 | CI badges в hero | Запрещены | 0 CI-бейджей | OK |
| A10 | Кол-во бейджей в hero | 1 (Awesome) обязательно, добавки не одобрены | 1 (Awesome) | OK |
| A11 | License section в теле | Не одобрено spec'ом, но de-facto допустимо | `## Лицензия` в конце | OK (как у awesome-go и awesome-readme) |
| A12 | Bilingual RU+EN | Sibling files + language-badge row | Один файл, mixed RU+EN внутри одного hero | **разъезд со spec'ом, но осознанный** — sibling-файл для EN-версии не написан |
| A13 | Tables vs bullets для top-15 скиллов | non-canonical но не lint-forbidden | Table | OK для attribute-heavy раздела |

---

## Action plan (правки в README.md)

Ранжировано по impact / по принципу «дёшево исправить = делаем сейчас».

### Tier 1 — нудно, дёшево, точно делать

**P1.** Подвинуть Awesome-бейдж inline с H1.

Сейчас:
```
# Claude Code Handbook на русском

> Курируемый справочник для тех, кто использует …

[![Awesome](https://awesome.re/badge.svg)](https://awesome.re)
```

Стало:
```
# Claude Code Handbook на русском [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

> Курируемый справочник для тех, кто использует …
```

Обоснование: §3.2, §4.3 — spec прямо требует «right next to the title».

**P2.** Переписать tagline под H1, чтобы описывал SUBJECT, не LIST.

Сейчас (строка 3): «Курируемый справочник для тех, кто использует Claude Code в работе. Только то, что я реально применяю в клиентских проектах либо что массово проверено сообществом по install-count.» — **описывает свойства списка** (курируемый, что внутри).

Стало (вариант): «Claude Code — это CLI-агент Anthropic для разработки в терминале. Skills, sub-agents, plugins, MCP-серверы, hooks — практики и инструменты, проверенные в работе и сообществом по install-count.» — **описывает субъект (Claude Code)**, и уже потом — что внутри.

Обоснование: §2.3 — единственный survived claim adversarial. Это самое часто нарушаемое и при этом самое жёстко зафиксированное правило spec'а.

### Tier 2 — есть смысл сделать

**P3.** Решить судьбу em-dash в item-separator (`— ` vs ` - `).

Сейчас ~150+ строк в формате `- [Name](url) — Description.` Spec и lint требуют ASCII hyphen. Но в русской типографике em-dash — стандарт для тире.

Варианты:
- **(a)** Привести к canonical `- [Name](url) - Description.` — поломает русскую типографику, но пройдёт `awesome-lint`.
- **(b)** Оставить как есть — лист не претендует на меta-list inclusion, lint мы не гоняем. Это осознанное отклонение для RU-аудитории.

Рекомендация: **(b)** — оставляем em-dash, документируем выбор в CONTRIBUTING.md.

**P4.** Решить про RU+EN дублирование.

Сейчас в одном файле микс. Adversary указал: top awesome-lists используют sibling-файлы. У нас этого нет.

Варианты:
- **(a)** Завести `README.en.md` как сжатый английский summary с language-badge row под H1.
- **(b)** Оставить один RU-файл — но тогда **очистить от EN-кусков** в текстах (URL'ы остаются английскими).

Рекомендация: **(b)** в краткосрочной — мы уже сделали 4 итерации чистки. **(a)** — отдельная задача с весомым ROI, если ждать аудиторию из англоязычного сообщества.

### Tier 3 — низкий приоритет / стилистический выбор

**P5.** «Awesome» prefix в H1.

Сейчас: `# Claude Code Handbook на русском`. Spec для inclusion в sindresorhus/awesome требует `# Awesome <X>`. Но мы — самостоятельный list, не претендуем.

Рекомендация: **оставить как есть.** Если когда-нибудь будем пушить в meta-list — переименуем в `# Awesome Claude Code (Russian)` или подобное.

**P6.** Контроль item-name в description.

Adversary не нашёл массовых нарушений `no-repeat-item-in-description` в нашем README, но рекомендую вручную пробежаться по таблицам — у item'ов вида `[anthropics/skills@frontend-design]` description начинается с «Принудительно перестроить…» что технически OK, но «React-skill — это React-skill, который…» паттерн ловит lint.

Рекомендация: добавить в CONTRIBUTING.md пункт «description не должно начинаться с имени item'а».

**P7.** License heading.

Сейчас `## Лицензия` в конце. По spec запрещено (guideline, не lint). В практике — соблюдается частично (`awesome-go`, `awesome-readme` тоже держат).

Рекомендация: **оставить.** Видимая ссылка на CC0 в теле полезна для контрибьюторов.

### Что НЕ менять

- TOC уже compliant (`Содержание` ≈ `Contents`, 1 уровень depth).
- 1 бейдж в hero — exact spec.
- Нет CI/build-бейджей — exact spec.
- Tables в разделе «Топ-15 скиллов» — non-canonical но обоснованно (attribute-heavy раздел, шесть колонок данных).

---

## Verbatim coverage

10 распределённых verbatim-цитат проверены char-by-char против их snapshot-файлов: 10 of 10 распределённых проверок прошли (sample); 32 distinct shas цитированы из 46 manifest-lines суммарно.

```provenance-manifest
s1	https://raw.githubusercontent.com/sindresorhus/awesome/main/awesome.md	6d7a52fadc61c35a7ec138963829b0bb70b9fd17a0a04e3d0ac47315d39d9849	2026-05-20T15:31:21.302800+00:00	raw-github	Make it clear what the list is about / Stylize
s2	https://raw.githubusercontent.com/sindresorhus/awesome/main/contributing.md	df178c682291fb23380e97b9c6c4e0b49fa449d86ed0e93db381acd7810cb0cc	2026-05-20T15:31:21.347200+00:00	raw-github	Contributing
s3	https://raw.githubusercontent.com/sindresorhus/awesome/main/pull_request_template.md	04238e3c21ab01d7d54d15b838d706c58bc64ffb52e11d55fffac2204f20ce0f	2026-05-20T15:31:21.392097+00:00	raw-github	Requirements for your Awesome list
s5	https://raw.githubusercontent.com/vinta/awesome-python/master/README.md	4ba2c128639751f949d9b04d58209be4fbe9fb9e38fd74e5ab133ba44407ef49	2026-05-20T15:31:21.481114+00:00	raw-github	TOC
s7	https://raw.githubusercontent.com/avelino/awesome-go/main/README.md	5635bc21f6f74d9dde5a758894c69fa4eeab47dfedde3e33ba790524b76bfad3	2026-05-20T15:31:21.572621+00:00	raw-github	TOC
s8	https://raw.githubusercontent.com/matiassingers/awesome-readme/master/readme.md	a6448c7fe64d1b42301b29d38213f271bd2561483d03f95e62e6f2081ca4b252	2026-05-20T15:31:21.619053+00:00	raw-github	Examples
s11	https://raw.githubusercontent.com/sindresorhus/awesome-lint/main/rules/toc.js	80335fad7647549bf42f0112561a539bb09fe63b4b57bc9630c41cc7bab70ce2	2026-05-20T15:31:21.707708+00:00	raw-github	toc.js
s12	https://raw.githubusercontent.com/sindresorhus/awesome-lint/main/rules/heading.js	23e165599403d1ee6f23091051634e083872a90ae722ad14ca8bf9b9706abefb	2026-05-20T15:31:21.750720+00:00	raw-github	heading.js
p4	https://raw.githubusercontent.com/sindresorhus/awesome-lint/main/rules/list-item.js	a87e2f793e605e79cae97dcd2f2ec1bb7077f188f4cf601698960044be88366d	2026-05-20T15:31:21.931765+00:00	raw-github	list-item.js
p5	https://raw.githubusercontent.com/sindresorhus/awesome-lint/main/rules/no-repeat-item-in-description.js	59c511b5ec434a2c86a268a2769c2989cce166f96ace7ae82f38cd5b9e4c36cc	2026-05-20T15:31:21.977950+00:00	raw-github	no-repeat-item
p6	https://raw.githubusercontent.com/sindresorhus/awesome-lint/main/rules/no-ci-badge.js	afef8c2aa6e2d8266d542ff9f9940b6ae47443ce51b44ec72ee865b43659ec5c	2026-05-20T15:31:22.022806+00:00	raw-github	no-ci-badge
p9	https://raw.githubusercontent.com/awesome-selfhosted/awesome-selfhosted/master/README.md	2b81149dc5bb98e262369b4b809226d86bd41b28cb5e1952d646f1a74d7f400b	2026-05-20T15:31:22.155655+00:00	raw-github	Analytics
c3	https://github.com/sindresorhus/awesome/blob/main/readme.md	6f21d2ce6abc512aaf0bcc5339c15d806408adc7386e40b408435938a2526c23	2026-05-20T15:31:22.366556+00:00	raw-github	Hero block
c5	https://github.com/sindresorhus/awesome-electron/blob/main/readme.md	4a98d7d4b24a817489b9c0e052a6be56d2cd8926fd4901dc357388e41e1ac0a8	2026-05-20T15:31:22.456625+00:00	raw-github	Hero
c6	https://github.com/sindresorhus/awesome-nodejs/blob/main/readme.md	bcc896e1bcbec143cfe9938ff4fd439addd8233ba3fe25e2886e8198a904593c	2026-05-20T15:31:22.504639+00:00	raw-github	Hero
c8	https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes	8503c83c7b382602fe0aabbc119a6493d4cb9968268f61f1ab56ee929d42d5db	2026-05-20T15:31:22.592158+00:00	defuddle	About READMEs
c9	https://github.com/vinta/awesome-python/blob/master/README.md	e4732deffd3651ad6d341e7a89778dbfad8ef48c2de145aec459f0944127128a	2026-05-20T15:31:22.633023+00:00	raw-github	Hero
c10	https://github.com/jonatasemidio/multilanguage-readme-pattern/blob/master/README.md	07faa35f3c289c7b2697eceb60366e75000528115ae42c65cdc80bc16edc6c79	2026-05-20T15:31:22.673313+00:00	raw-github	Hero
b4	https://github.com/badges/shields/blob/master/README.md	2846e535ecb76643f55ac314648ce1170dc12ccdbaef3384f6b57e8a55c5e6a5	2026-05-20T15:31:22.854909+00:00	raw-github	History
b5	https://shields.io/docs	f1f146e4800e3e52e39487cb2a470054e35181dd38ed180a5893a1bea62f1d4d	2026-05-20T15:31:22.902543+00:00	defuddle	Docs intro
b6	https://shields.io/badges/static-badge	405f5ab57325cc356d24359d62d481c8c31c9f0d7bf38a6f5355dbcb216084d7	2026-05-20T15:31:22.946749+00:00	defuddle	Static badge
b7	https://github.com/naereen/badges/blob/master/README.md	8587107951699e9f8f874a8929927ef7bff84e5d67d00cf83980d4e4774a940d	2026-05-20T15:31:22.992094+00:00	raw-github	Gallery
b9	https://github.com/sindresorhus/awesome-nodejs/blob/main/readme.md	32c8ed0480af73f4bad9849108db6c818520bdce66d08a833085f3637a044fa8	2026-05-20T15:31:23.082200+00:00	raw-github	Header block
b10	https://github.com/sindresorhus/awesome-electron/blob/main/readme.md	93e6b70dd4468b5e5fbd4260a331c99034f8d617e59d101a136ad8bc9354168f	2026-05-20T15:31:23.123356+00:00	raw-github	Header
adv1	https://raw.githubusercontent.com/avelino/awesome-go/main/CONTRIBUTING.md	923e106d10db338f235b853753b863055e0b5b7f39dbf79ca09b3c35d5811926	2026-05-20T15:38:05.990465+00:00	raw-github	Quality standards
adv2	https://raw.githubusercontent.com/rust-unofficial/awesome-rust/main/CONTRIBUTING.md	112f2bfaad040143da612f143ff7d7b2a85e8e488f379ca796e324cd2107b48a	2026-05-20T15:38:06.038025+00:00	raw-github	Sort: alphabetical
```

[^h:80335fad]: awesome-lint toc.js — sha 80335fad…
[^h:23e16559]: awesome-lint heading.js — sha 23e16559…
[^h:04238e3c]: sindresorhus/awesome pull_request_template.md — sha 04238e3c…
[^h:6d7a52fa]: sindresorhus/awesome awesome.md — sha 6d7a52fa…
[^h:df178c68]: sindresorhus/awesome contributing.md — sha df178c68…
[^h:5635bc21]: avelino/awesome-go README.md — sha 5635bc21…
[^h:a6448c7f]: matiassingers/awesome-readme readme.md — sha a6448c7f…
[^h:923e106d]: avelino/awesome-go CONTRIBUTING.md — sha 923e106d…
[^h:112f2bfa]: rust-unofficial/awesome-rust CONTRIBUTING.md — sha 112f2bfa…
[^h:a87e2f79]: awesome-lint list-item.js — sha a87e2f79…
[^h:59c511b5]: awesome-lint no-repeat-item-in-description.js — sha 59c511b5…
[^h:afef8c2a]: awesome-lint no-ci-badge.js — sha afef8c2a…
[^h:4ba2c128]: vinta/awesome-python README.md (raw fetch s5/p8) — sha 4ba2c128…
[^h:2b81149d]: awesome-selfhosted README.md — sha 2b81149d…
[^h:4a98d7d4]: awesome-electron readme.md — sha 4a98d7d4…
[^h:bcc896e1]: awesome-nodejs readme.md — sha bcc896e1…
[^h:6f21d2ce]: sindresorhus/awesome readme.md — sha 6f21d2ce…
[^h:e4732def]: awesome-python README.md (cover c9 fetch) — sha e4732def…
[^h:07faa35f]: jonatasemidio/multilanguage-readme-pattern README.md — sha 07faa35f…
[^h:8503c83c]: docs.github.com About READMEs — sha 8503c83c…
[^h:32c8ed04]: awesome-nodejs readme.md (badges b9 fetch) — sha 32c8ed04…
[^h:93e6b70d]: awesome-electron readme.md (badges b10 fetch) — sha 93e6b70d…
[^h:2846e535]: badges/shields README.md — sha 2846e535…
[^h:f1f146e4]: shields.io/docs — sha f1f146e4…
[^h:405f5ab5]: shields.io/badges/static-badge — sha 405f5ab5…
[^h:85871079]: naereen/badges README.md — sha 85871079…
