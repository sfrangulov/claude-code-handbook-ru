# Awesome Claude Code на русском

> Курируемый список ресурсов для тех, кто использует [Claude Code](https://docs.claude.com/en/docs/claude-code/overview) в работе — скиллы, slash-команды, hooks, MCP-серверы, шаблоны и кейсы.
>
> Обновления и разборы — в Telegram-канале [@cc_consultant](https://t.me/cc_consultant).

[![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

---

## Что такое Claude Code

[Claude Code](https://docs.claude.com/en/docs/claude-code/overview) — CLI и IDE-агент от Anthropic для разработки. Работает в терминале, VS Code и JetBrains, поддерживает кастомные скиллы, hooks, MCP-серверы и плагины.

## Содержание

- [Официальное](#официальное)
- [Скиллы (Skills)](#скиллы)
- [Slash-команды](#slash-команды)
- [Hooks](#hooks)
- [MCP-серверы](#mcp-серверы)
- [Плагины](#плагины)
- [Шаблоны CLAUDE.md](#шаблоны-claudemd)
- [Workflow и кейсы](#workflow-и-кейсы)
- [Безопасность и enterprise](#безопасность-и-enterprise)
- [Промптинг](#промптинг)
- [Гайды и статьи на русском](#гайды-и-статьи-на-русском)
- [Каналы и подкасты](#каналы-и-подкасты)
- [Сравнение с другими инструментами](#сравнение-с-другими-инструментами)
- [Как добавить ресурс](#как-добавить-ресурс)

---

## Официальное

- [Документация Claude Code](https://docs.claude.com/en/docs/claude-code/overview) — официальный референс по всем возможностям.
- [Quickstart](https://docs.claude.com/en/docs/claude-code/quickstart) — установка и первые шаги.
- [Settings и конфигурация](https://docs.claude.com/en/docs/claude-code/settings) — `settings.json`, permissions, env vars.
- [GitHub: anthropics/claude-code](https://github.com/anthropics/claude-code) — официальный репозиторий и changelog.
- [Anthropic Discord](https://www.anthropic.com/discord) — каналы `#claude-code`, `#skills-and-tools`, `#show-and-tell`.
- [r/ClaudeAI](https://www.reddit.com/r/ClaudeAI/) — активное англоязычное сообщество.

## Скиллы

Skills — переиспользуемые наборы инструкций, активируемые по триггеру. См. [официальный гайд](https://docs.claude.com/en/docs/claude-code/skills).

### Базовое и инфраструктура

<!-- Добавляйте сюда. Формат:
- [skill-name](url) — что делает. Автор: @handle.
-->

### Frontend

### Backend / API

### DevOps / инфраструктура

### Данные / ML

## Slash-команды

Кастомные команды в `.claude/commands/*.md`. См. [документацию](https://docs.claude.com/en/docs/claude-code/slash-commands).

<!-- - [/название](ссылка) — что делает. -->

## Hooks

Hooks в `settings.json` запускают shell-команды на события жизненного цикла. См. [hooks reference](https://docs.claude.com/en/docs/claude-code/hooks).

<!-- - [имя](ссылка) — событие, что делает. -->

## MCP-серверы

[Model Context Protocol](https://modelcontextprotocol.io/) — стандарт для подключения внешних инструментов к LLM.

- [Anthropic MCP servers](https://github.com/modelcontextprotocol/servers) — официальный набор: filesystem, git, postgres, slack и другие.
- [MCP registry](https://github.com/modelcontextprotocol/registry) — каталог серверов.

### Базы данных

### Communication / SaaS

### Разработка

## Плагины

[Claude Code marketplace](https://docs.claude.com/en/docs/claude-code/plugins) — экосистема плагинов для расширения CLI.

<!-- - [имя](ссылка) — что добавляет. -->

## Шаблоны CLAUDE.md

`CLAUDE.md` — файл с проектными инструкциями, который Claude Code автоматически подгружает в контекст. См. [docs](https://docs.claude.com/en/docs/claude-code/memory).

- [examples/claude-md-templates/nextjs.md](./examples/claude-md-templates/nextjs.md) — для Next.js проектов.
- [examples/claude-md-templates/python-fastapi.md](./examples/claude-md-templates/python-fastapi.md) — для Python/FastAPI.
- [examples/claude-md-templates/terraform.md](./examples/claude-md-templates/terraform.md) — для IaC.

<!-- Дополняйте по мере появления шаблонов. -->

## Workflow и кейсы

Реальные сценарии использования — миграции, рефакторинг, ревью, генерация тестов.

<!-- - [Заголовок](ссылка) — 1 строка о том, что в кейсе. -->

## Безопасность и enterprise

- [Security best practices](https://docs.claude.com/en/docs/claude-code/security) — официальный гайд.
- [Permissions](https://docs.claude.com/en/docs/claude-code/iam) — управление правами.

<!-- Добавляйте посты про CVE, корпоративное внедрение, изоляцию. -->

## Промптинг

- [Anthropic Prompting Guide](https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview) — официальный гайд по промпт-инжинирингу.
- [Anthropic Cookbook](https://github.com/anthropics/anthropic-cookbook) — примеры паттернов.

## Гайды и статьи на русском

<!-- - [Заголовок статьи](url) — площадка, дата, 1 строка о теме. Автор: @handle. -->

## Каналы и подкасты

### Telegram (RU)

- [@cc_consultant](https://t.me/cc_consultant) — этот список и ежедневные разборы Claude Code.

<!-- Добавляйте смежные каналы про AI, dev tooling, тимлидинг. -->

### Подкасты

## Сравнение с другими инструментами

- [Cursor](https://cursor.com/) — IDE-first, отдельный редактор на базе VS Code.
- [GitHub Copilot](https://github.com/features/copilot) — встроен в IDE, фокус на autocomplete + chat.
- [Aider](https://aider.chat/) — CLI-first, open-source, мульти-модельный.
- [Cline](https://github.com/cline/cline) — VS Code-расширение с агентным режимом.

<!-- Раздел будет расти по мере появления разборов в канале. -->

## Как добавить ресурс

1. Откройте Pull Request с одной строкой в соответствующем разделе.
2. Формат: `- [Название](url) — одна строка о том, для чего это нужно. Автор: @handle.`
3. Перед PR убедитесь, что ресурс:
   - реально работает с актуальной версией Claude Code;
   - не дублирует уже добавленный;
   - имеет публичную ссылку (GitHub, документация, статья).

Подробнее — в [CONTRIBUTING.md](./CONTRIBUTING.md).

## Лицензия

[CC0](./LICENSE) — список можно свободно использовать, копировать и адаптировать.
