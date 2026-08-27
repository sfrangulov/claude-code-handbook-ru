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
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
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

**Свободного места на листе нет.** Замерено: вёрстка заполнена ровно до среза A4, и
**любая добавленная строка даёт вторую страницу** — вплоть до одного лишнего слова
в описании (`dontAsk` в перечне permission-режимов ломал лист). Поэтому перед
добавлением нового надо сначала освободить место: убрать дубли (`/effort` сейчас
повторяется в трёх секциях), сократить описание или перебалансировать секции по
колонкам через `<div class="col">`. Рендерить и считать страницы после каждой правки,
а не в конце.

**Chrome для рендера.** Если `/Applications/Google Chrome.app` нет, подойдёт любой
Chromium — например, тот, что ставит Playwright:
`~/Library/Caches/ms-playwright/chromium-*/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`.
Рендерить надо файл с расширением `.html`: `.bak` Chrome печатает как текст, получается 14 страниц.

## Атрибуция

Структура и идея вдохновлены [cc.storyfox.cz](https://cc.storyfox.cz/) (Martin Baláž, [@phasE89](https://x.com/phasE89)). Вёрстка переписана с нуля под русский язык и portrait-формат; контент — handbook-ru, под [CC0](../LICENSE).
