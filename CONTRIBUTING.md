# Contributing

Спасибо за интерес. Этот список курируется — добавляется только то, что реально полезно практикам Claude Code.

## Что подходит

- Скиллы, slash-команды, hooks, MCP-серверы, плагины — рабочие, с понятным README.
- Шаблоны `CLAUDE.md` под конкретный стек.
- Статьи и видео на русском с конкретным разбором (не «обзор AI-инструментов в целом»).
- Кейсы внедрения с фактами: что делали, что сломалось, что получилось.

## Что не подходит

- Промо-материалы без технической ценности.
- Англоязычные ресурсы без понятной пользы для русскоязычного читателя (для них есть [awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code)).
- Дубликаты уже добавленных позиций.
- Платные курсы и сервисы без бесплатной полезной части.
- Ресурсы, которые сломаны или не обновлялись больше года.

## Как добавить

`README.md` и `catalog/*.md` — генерируемые артефакты. Источник правды:

- `data/*.json` — кураторские списки и таблицы для главного README (skills, subagents, plugins, hooks, MCP, templates, ru-content, security, misc, skills-top).
- `data/catalog/*.json` — широкий каталог (8 файлов, 1400+ записей формата `{name, url}` без описаний).
- `README.template.md` и `catalog/*.template.md` — статичная проза, заголовки, маркеры вставки данных.

Шаги:

1. Форкните репозиторий.
2. Откройте подходящий файл и добавьте запись:
   - в `data/<секция>.json` для кураторской позиции (с `desc`):
     ```json
     { "name": "Название", "url": "https://...", "desc": "Одна строка о том, для чего это нужно." }
     ```
   - в `data/catalog/<секция>.json` для широкого каталога (только `name` и `url`):
     ```json
     { "name": "Название", "url": "https://..." }
     ```
   Разделитель в итоговом markdown — em-dash (`—`) с пробелами, его подставляет генератор. Осознанное отклонение от sindresorhus/awesome-lint: русская типографика важнее lint-conformance, в meta-list мы не пушим. См. [docs/research/awesome-lists-best-practices.md](./docs/research/awesome-lists-best-practices.md) §2.1.
3. Запустите `node scripts/build-readme.mjs` — он перегенерирует `README.md` из template + data.
4. Закоммитьте оба файла (`data/<секция>.json` и `README.md`).
5. Сохраняйте алфавитный порядок внутри подсекции, где это применимо.
6. Откройте PR с описанием: что добавили и почему это полезно.

CI-гейты на PR (последовательно, до первой ошибки):

```bash
node scripts/validate-data.mjs   # форма каждой записи: name/url/desc, типы
node scripts/lint-data.mjs       # стиль desc: no-self-name, без маркетинга
node scripts/build-readme.mjs --check  # README.md == template + data
```

Прогони их локально перед PR — то же самое запустит [`.github/workflows/readme-gen.yml`](./.github/workflows/readme-gen.yml). Если рассинхронизация попадёт в main мимо PR-гейта, [`readme-auto-regen.yml`](./.github/workflows/readme-auto-regen.yml) перегенерит README ботом.

Топ-15 скиллов обновляется автоматически: cron-workflow [`refresh-skills-top.yml`](./.github/workflows/refresh-skills-top.yml) раз в неделю опрашивает skills.sh и открывает PR при изменениях. Вручную:

```bash
node scripts/refresh-top-skills.mjs --write   # обновляет data/skills-top.json
node scripts/build-readme.mjs                  # перегенерирует README.md
```

## URL-слаги — английские, всегда

Имена скиллов, плагинов, MCP-серверов и пути к docs — **никогда не переводить**. `obra/superpowers@receiving-code-review` остаётся как есть, даже если описание на русском. Перевод слагов ломает реальные ссылки на skills.sh, GitHub и docs.claude.com.

**Хорошо:** `[mattpocock/skills@grill-with-docs](https://skills.sh/mattpocock/skills/grill-with-docs) — «допрашивай» документацию через find/grep.`

**Плохо:** `[mattpocock/skills@grill-с-docs](https://skills.sh/mattpocock/skills/grill-с-docs) — ...` ← 404, такого скилла не существует.

## Стиль описаний

- Одно предложение, по делу.
- Без маркетинга («лучший», «революционный», «must-have»).
- Конкретика: что инструмент делает, а не как он «упрощает работу».
- Полезно добавлять «когда брать»/«когда не брать» — это и отличает кураторский справочник от автогенерированного индекса.
- **Описание не начинается с имени самого ресурса.** `[ESLint] — ESLint is a linter…` — нет; `[ESLint] — линтер JavaScript-кода с настраиваемыми правилами.` — да. Имя уже в ссылке, повторение тратит слова. Это же правило кодифицировано в awesome-lint как [`no-repeat-item-in-description`](https://github.com/sindresorhus/awesome-lint/blob/main/rules/no-repeat-item-in-description.js).

**Хорошо:** `[pre-commit-claude](url) — запускает Claude как pre-commit hook для проверки diff на безопасность. Когда брать: проекты с высокими требованиями к secrets-hygiene.`

**Плохо:** `[pre-commit-claude](url) — must-have инструмент для современной разработки.`

## Один язык в скелете предложения

Худший паттерн — машинный перевод, при котором служебные слова заменены на русские, а содержательные оставлены на английском. Такой текст не читается ни одной аудиторией.

**Запрещено:**

> «What Chrome DevTools MCP is для browser, tui-mcp is для terminal. Launch, screenshot, и взаимодействие с any TUI app»

Здесь четыре переключения языка в одной фразе и калька с английской конструкции `What X is to Y`.

**Правило:** глаголы, союзы, предлоги и общие существительные — на одном языке (русский). Переключаться на английский можно только для:
- технических терминов, у которых нет нормального русского аналога: `MCP`, `TUI`, `pre-commit hook`, `subagent`;
- собственных имён (название продукта, репозитория, файла);
- цитирования кода или команд.

**Хорошо:**

> «Аналог Chrome DevTools MCP, но для терминала: запуск, скриншоты, взаимодействие с любым TUI-приложением.»

Если описание скопировано из английского awesome-list — **перепиши его на русском с нуля**, не пропускай через автоперевод. Пять минут на ручной рерайт лучше чем дефект в репо на полгода.

## Свои артефакты

Если у вас есть собственные скиллы или команды, которые хочется опубликовать как часть этого списка — кладите их в `examples/` через PR. Структура:

```
examples/
├── skills/<имя>/SKILL.md
├── commands/<имя>.md
├── hooks/<имя>.json
└── claude-md-templates/<стек>.md
```

## Спорные случаи

Если не уверены — открывайте Issue с тегом `[предложение]` до PR.
