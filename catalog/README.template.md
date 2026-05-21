<!--
Generated from this template + data/catalog/*.json by scripts/build-readme.mjs.
Edit the template or the JSON data, then run: node scripts/build-readme.mjs
-->

# Полный каталог

Тематические подборки, собранные из публичных awesome-lists и кураторских источников.

**Здесь — широта.** Кураторские рекомендации (то, что я реально применяю в работе) — в [главном README](../README.md).

**Всего записей: <!-- @sum-count:catalog -->.**

## Разделы

| Раздел | Описание | Записей |
|---|---|---:|
| [MCP-серверы](./mcp-servers.md) | все известные серверы из публичных awesome-lists | <!-- @count:catalog/mcp-servers.items --> |
| [Скиллы](./skills.md) | скиллы под конкретные задачи | <!-- @count:catalog/skills.items --> |
| [Sub-agents](./subagents.md) | специализированные субагенты | <!-- @count:catalog/subagents.items --> |
| [Плагины](./plugins.md) | упаковка скиллов, субагентов и MCP в один артефакт | <!-- @count:catalog/plugins.items --> |
| [Hooks](./hooks.md) | связанные проекты и идеи | <!-- @count:catalog/hooks.items --> |
| [CLAUDE.md шаблоны и opinionated-сетапы](./templates.md) | авторские конфиги | <!-- @count:catalog/templates.items --> |
| [Экосистема](./ecosystem.md) | утилиты, фреймворки, CLI-обёртки, статус-лайны | <!-- @count:catalog/ecosystem.items --> |
| [Русскоязычный контент](./ru-content.md) | Habr и YouTube | <!-- @sum-count:catalog/ru-content --> |

## Чем отличается от главного README

- **[Главный README](../README.md)** — кураторский справочник на ~100 ссылок. Каждая позиция отобрана: либо я её использую в клиентских проектах, либо она многократно проверена сообществом.
- **Каталог (вы здесь)** — широкая выборка из ~10 публичных awesome-lists. Качество смешанное, но если ищешь что-то специфическое — здесь шансов больше.

## Гигиена

- Дедупликация по GitHub `owner/repo` — повторов нет.
- Шум отфильтрован: бейджи, профили без репозитория, sponsor-ссылки, файлы внутри репозитория.
- Битые ссылки (404, мёртвые репозитории) удаляются через PR — открывай issue с тегом `[dead-link]`, если что-то нашёл.

## Источники

- [anthropics/skills](https://github.com/anthropics/skills) — официальные скиллы Anthropic.
- [hesreallyhim/awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code) — 43k⭐, главный куратор.
- [travisvn/awesome-claude-skills](https://github.com/travisvn/awesome-claude-skills) — 12k⭐, куратор скиллов.
- [karanb192/awesome-claude-skills](https://github.com/karanb192/awesome-claude-skills) — 50+ проверенных скиллов.
- [VoltAgent/awesome-claude-code-subagents](https://github.com/VoltAgent/awesome-claude-code-subagents) — 19k⭐, 131+ субагентов.
- [rohitg00/awesome-claude-code-toolkit](https://github.com/rohitg00/awesome-claude-code-toolkit) — 135 агентов и 35 скиллов в одном тулките.
- [rahulvrane/awesome-claude-agents](https://github.com/rahulvrane/awesome-claude-agents) — агенты с фокусом на оркестрации.
- [ccplugins/awesome-claude-code-plugins](https://github.com/ccplugins/awesome-claude-code-plugins) — плагины по категориям.
- [jqueryscript/awesome-claude-code](https://github.com/jqueryscript/awesome-claude-code) — утилиты и IDE-интеграции.
- [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers) — официальные MCP-серверы.
- [punkpeye/awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers) — самый большой каталог MCP-серверов.

WebSearch по Habr и YouTube использован для русскоязычной секции.
