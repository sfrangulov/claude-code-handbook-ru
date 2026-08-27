# Claude Code — шпаргалка (1 страница)

Печатная reference-карточка по Claude Code на русском: горячие клавиши, слэш-команды, MCP, память, приёмы, оркестрация (multi-agent), конфиг, skills/agents, CLI-флаги. A4 portrait, 3 колонки, всё на одну страницу.

## Артефакты

- **[index.html](./index.html)** — source-of-truth, single-file (inline CSS, Google Fonts через CDN). Открыть в браузере → `⌘P` / `Ctrl+P` → Save as PDF, A4 portrait, без полей.
- **[cheatsheet.pdf](./cheatsheet.pdf)** — pre-rendered PDF той же страницы для прямого скачивания.

## Использование

**В браузере:**
```bash
open cheatsheet/index.html         # macOS
xdg-open cheatsheet/index.html     # Linux
```

**Печать в PDF из CLI** (headless Chrome):
```bash
CHROME=$(ls -d ~/Applications/"Google Chrome.app" /Applications/"Google Chrome.app" 2>/dev/null | head -1)
"$CHROME/Contents/MacOS/Google Chrome" \
  --headless --disable-gpu \
  --no-pdf-header-footer --print-to-pdf-no-header \
  --virtual-time-budget=15000 \
  --print-to-pdf=cheatsheet/cheatsheet.pdf \
  "file://$(pwd)/cheatsheet/index.html"
```

`--virtual-time-budget=15000` нужен, чтобы headless дождался загрузки Google Fonts; иначе fallback-шрифт шире и колонки переполняются.

## Что внутри (по колонкам)

| Колонка 1 | Колонка 2 | Колонка 3 |
|---|---|---|
| ⌨️ Горячие клавиши | 🔌 MCP-серверы | ⚙️ Конфиг и env |
| ⚡ Слэш-команды | 📁 Память и файлы | 🔧 Skills и agents |
|  | 🧠 Приёмы и режимы | 🖥 CLI и флаги |
|  | 🧩 Оркестрация (multi-agent) |  |

Footer внизу: атрибуция + ссылки.

Секция «🧩 Оркестрация» покрывает multi-agent-слой Claude Code (mid-2026): dynamic
workflows (`/workflows`), agent teams (`CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS`),
agent view (`claude agents`), routines (`/schedule`), ultracode (`/effort ultracode`),
hook-события (`TeammateIdle`/`TaskCompleted`) и практическое правило «когда fan-out
оправдан, а когда выигрывает solo». Бэйджи статуса: `preview` (research preview),
`exp` (experimental) — отличаются от оранжевого `NEW` (новизна, не зрелость).

## Поддержание актуальности

Текущая версия в шапке: «соответствует Claude Code 2.1.247». При апдейтах Claude Code:

1. Сверить слэш-команды и флаги с `claude --help` и [changelog](https://code.claude.com/docs/en/changelog).
2. Добавить новые строки в соответствующую секцию `index.html`. NEW-бэйдж — `<span class="badge-new">NEW</span>`.
3. Обновить `header-meta` (дата + версия CC).
4. Перерендерить `cheatsheet.pdf` командой выше.
5. **Проверить, что страниц по-прежнему одна:** `pdfinfo cheatsheet/cheatsheet.pdf | grep Pages`.

### Две ловушки, проверено на 2.1.247

**Часть рабочих флагов скрыта из `--help`.** `--max-turns`, `--channels` и `--remote`
принимаются, но в справке не выводятся. Не удаляй строку только потому, что её там нет —
проверь флаг напрямую: `claude -p "x" --флаг`. Несуществующий даст `unknown option`,
скрытый — доменную ошибку или обычный прогон. И помни, что часть флагов живёт на
подкомандах (`claude auth login --console`), а не на корне.

**Запас места считается по колонкам, а не по листу.** Высоту страницы задаёт самая
длинная колонка, поэтому «влезет ли ещё строка» зависит от того, в какую колонку её
класть. Замерено на 2.1.247:

| Колонка | Секции | Запас |
|---|---|---|
| 1 | Горячие клавиши, Слэш-команды | ~6 строк |
| 2 | MCP, Память, Приёмы, Оркестрация | ≥3 строки |
| 3 | Конфиг и env, Skills и agents, CLI и флаги | **0** |

Колонка 3 упирается в срез A4 и держит высоту всего листа: любая строка, добавленная
туда, даёт вторую страницу, и её приходится оплачивать удалением из той же колонки.
Колонки 1 и 2 свободно принимают новые строки, не меняя высоту.

Переполняет обычно не сама строка, а длина описания: `dontAsk` в перечне
permission-режимов и слово «multi-agent» в описании `claude ultrareview` ломали лист
поодиночке. Если не влезло — сначала сокращай описание, потом ищи, что удалить.
Кандидаты на удаление — дубли между колонками: `/loop` был в трёх секциях сразу,
`/effort` до сих пор в трёх.

**Рендерить только настоящим Chrome.** Он может стоять и в `~/Applications`, а не только
в `/Applications` — команда выше это учитывает. Chromium от Playwright не подходит:
у него нет системного emoji-шрифта, и в PDF молча пропадают все иконки секций
(⌨️ 🔌 📁 🧠 🧩 ⚙️ 🔧 🖥) — страница при этом остаётся одна, на глаз почти незаметно.
Проверка после рендера:

```bash
pdftotext cheatsheet/cheatsheet.pdf - | grep -c '[⌨🔌📁🧠🧩⚙🔧🖥]'   # ожидается 8
```

И рендерить надо файл с расширением `.html`: копию вида `index.html.bak` Chrome
печатает как обычный текст — получается 14 страниц исходника.

## Атрибуция

Структура и идея вдохновлены [cc.storyfox.cz](https://cc.storyfox.cz/) (Martin Baláž, [@phasE89](https://x.com/phasE89)). Вёрстка переписана с нуля под русский язык и portrait-формат; контент — handbook-ru, под [CC0](../LICENSE).
