# Issue draft for hesreallyhim/awesome-claude-code

Репозиторий **не принимает PR напрямую** — только через GitHub Issue форму. У них две формы:
1. `recommend-resource.yml` — для добавления отдельного ресурса.
2. `repository-enhancement.yml` — для предложения изменений в структуре или процессе.

Наш handbook — это **мета-ресурс** (курaтная подборка плюс собственные примеры). Прямой ресурс-сабмит может не пройти валидацию, потому что мы не один артефакт, а каталог-handbook. Поэтому рекомендую **подать через `repository-enhancement`** с предложением добавить «Localized resources / language collections» секцию.

---

## Что сделать руками

1. Открой: <https://github.com/hesreallyhim/awesome-claude-code/issues/new?template=repository-enhancement.yml>
2. Заполни поля как указано ниже.
3. Отправь.

---

## Поля формы

### Title

```
Enhancement: add a "Localized Resources" section for non-English curated handbooks
```

### Type of enhancement

`New section / structural addition`

### Description

```markdown
The Claude Code community is now meaningfully multilingual — there's an
emerging Russian-speaking developer community using Claude Code daily,
and similar pockets exist for Chinese, Spanish, and Portuguese.

Right now there's no dedicated place in `awesome-claude-code` for
language-specific curated handbooks. These are not individual tools or
skills — they are localized curation efforts that complement (rather
than duplicate) this list by adding native-language descriptions,
local-community resources (e.g. Habr articles, regional YouTube
channels), and country-specific context (payment, registration, legal).

I'm suggesting a new top-level section like:

## Localized Resources

Curated handbooks and resource lists maintained in non-English languages
by community contributors. These often add native-language commentary,
local sources, and country-specific context. Listed by language code.

- 🇷🇺 ru — [Claude Code Handbook на русском](https://github.com/sfrangulov/claude-code-handbook-ru)
  ~1000 curated entries with Russian descriptions, plus a 1400+ link catalog.
  Covers skills.sh leaderboard, VoltAgent subagents, ccplugins, MCP servers,
  19 Habr articles, 11 RU YouTube courses, hooks examples, and CLAUDE.md
  templates. CC0 + MIT.

This pattern keeps the canonical list focused on resources themselves
while creating a clear discovery path for non-English-speaking users.
```

### Why this matters

```
The repo's stated mission is to surface high-quality Claude Code resources
to as many developers as possible. Non-English speakers benefit
disproportionately from native-language curation:

1. Many developers in Russia/CIS, Latin America, China, etc. read tech
   content in their native language first. Habr alone has ~20 substantive
   Claude Code articles published in 2025-2026 that aren't surfaced
   anywhere in this list.

2. Local communities surface country-specific issues (Anthropic
   geo-blocking, payment workarounds, local AI tooling alternatives)
   that an English curator wouldn't be aware of.

3. Listing one curated handbook per language is much lighter maintenance
   than translating individual entries — and scales naturally as more
   communities form.

Happy to draft the section if the maintainers are open to it.
```

### Checklist confirmations

All five checkboxes get checked:
- [x] Не предлагалось раньше (проверено через search в issues).
- [x] Полностью прочитал CONTRIBUTING.
- [x] Это enhancement, не bug.
- [x] Я согласен помочь с реализацией если потребуется.
- [x] Я human submitter (а не AI).

---

## Альтернативный путь — recommend-resource

Если предыдущий enhancement-issue не пройдёт или его попросят переоформить — можно подать как обычный ресурс под категорией **Workflows & Knowledge Guides** или **Tooling**.

### Поля формы (recommend-resource):

| Поле | Значение |
|---|---|
| Display Name | `Claude Code Handbook (Russian)` |
| Category | `Workflows & Knowledge Guides` |
| Sub-Category | (по обстановке — `Curated Lists` если есть) |
| Primary Link | `https://github.com/sfrangulov/claude-code-handbook-ru` |
| Author Name | `Sergei Frangulov` |
| Author Link | `https://github.com/sfrangulov` |
| License | `CC0 1.0 Universal` |
| Description | `Curated Russian-language handbook for Claude Code: top picks per category with native commentary, plus a 1400+ link catalog covering MCP servers, skills, subagents, plugins, hooks examples, CLAUDE.md templates, and 30+ resources from Habr/vc.ru/YouTube in Russian.` |

---

## Что делать если откажут

Худший сценарий — модератор скажет «non-English content out of scope». В этом случае:

1. Открой issue с заголовком `[Question] Are non-English curated handbooks in scope for this list?` — пускай дадут официальный ответ.
2. Если official «no» — это нормально, идём через другие каналы (Anthropic Discord, r/ClaudeAI, прямые ссылки).

## Что делать пока ждём ответа

Параллельно подать handbook в:
- Reddit r/ClaudeAI (текст уже готов в `drafts/announcement-texts.md`).
- Anthropic Discord `#show-and-tell`.
- Подобные «awesome-X-ru» агрегаторы на GitHub (через GitHub search по `awesome-claude` + `language:ru`).
