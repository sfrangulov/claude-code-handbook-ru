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

Текущая версия в шапке: «соответствует Claude Code 2.1.217». При апдейтах Claude Code:

1. Сверить новые слэш-команды и флаги с [changelog](https://code.claude.com/docs/en/changelog).
2. Добавить новые строки в соответствующую секцию `index.html`. NEW-бэйдж — `<span class="badge-new">NEW</span>`.
3. Обновить `header-meta` (дата + версия CC).
4. Перерендерить `cheatsheet.pdf` командой выше.
5. Сверить вёрстку: после правок может переполнить колонку — при необходимости перебалансировать секции по колонкам через `<div class="col">`.

## Атрибуция

Структура и идея вдохновлены [cc.storyfox.cz](https://cc.storyfox.cz/) (Martin Baláž, [@phasE89](https://x.com/phasE89)). Вёрстка переписана с нуля под русский язык и portrait-формат; контент — handbook-ru, под [CC0](../LICENSE).
