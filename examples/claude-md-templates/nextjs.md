# Project: Next.js App

> Шаблон `CLAUDE.md` для проектов на Next.js 16 (App Router) + React 19 + TypeScript + Tailwind v4.
> Скопируйте в корень репозитория как `CLAUDE.md`, отредактируйте под свой стек.

## Стек

- **Framework:** Next.js 16, App Router (`app/`, не `pages/`).
- **React:** 19.x (Server Components, Server Actions, `use` hook).
- **Language:** TypeScript, strict mode. Никаких `any` без явного комментария почему.
- **Styling:** Tailwind CSS 4.x + CSS variables для токенов.
- **UI:** shadcn/ui (компоненты в `components/ui/`, не редактируем без причины).
- **State:** React Server Components по умолчанию. Client-side state — только когда нужна интерактивность.
- **Data fetching:** Server Actions для мутаций, fetch + cache в RSC для чтения.
- **DB:** Postgres через [укажите ORM — Drizzle / Prisma / Kysely].
- **Auth:** [Clerk / NextAuth / Lucia — указать].
- **Package manager:** pnpm.

## Команды

```bash
pnpm dev              # dev server
pnpm build            # production build (запускать перед PR)
pnpm typecheck        # tsc --noEmit
pnpm lint             # eslint
pnpm test             # vitest
pnpm test:e2e         # playwright
```

Перед тем как заявить, что задача готова — обязательно прогнать `pnpm typecheck && pnpm lint && pnpm test`.

## Структура

```
app/                  # роуты, layouts, RSC
  (marketing)/        # route groups для разделения layouts
  api/                # route handlers, минимум — всё через server actions
components/
  ui/                 # shadcn/ui, не редактировать вручную
  <feature>/          # фичевые компоненты
lib/
  db/                 # схема и миграции
  actions/            # server actions
  utils.ts            # cn() и общие хелперы
hooks/                # client-side React hooks
```

## Правила и анти-паттерны

**RSC vs Client:**
- По умолчанию всё — Server Component. `'use client'` добавляется только когда реально нужен state, effect, browser API.
- Не оборачивать всё дерево в client component — это ломает RSC.

**Data fetching:**
- В RSC — прямой вызов БД или внешнего API через `fetch()` с правильным `cache` / `revalidate`.
- Не дублировать одни и те же запросы в child-компонентах — использовать `cache()` из `react` или `unstable_cache`.
- Мутации — только через Server Actions, не REST API.

**TypeScript:**
- `any` запрещён. Если действительно нужен — комментарий «// any: причина».
- Props компонентов — отдельный type/interface, не inline.
- Zod-схемы — единственный источник типов для форм и API.

**Стили:**
- Tailwind classes, никакого inline `style={...}` кроме динамических значений.
- Утилиту `cn()` использовать для условных классов.
- Не плодить ad-hoc CSS-файлы — добавлять токены в `globals.css` через `@theme`.

**Тестирование:**
- Unit-тесты на чистую логику (`lib/`, утилиты).
- Component-тесты на интерактивные компоненты — vitest + @testing-library.
- E2E на критические пользовательские пути — playwright.
- Не писать тесты на одну строку getter-ов и shadcn-обёрток.

## Чего не делать

- Не создавать `pages/` директорию.
- Не использовать `getServerSideProps` / `getStaticProps` — это устарело.
- Не ставить `"use client"` в корневой layout.
- Не коммитить `console.log` — линтер заругается.
- Не редактировать `components/ui/` — они генерируются shadcn CLI.
- Не делать миграции БД руками — только через [Drizzle Kit / Prisma migrate].
- Не добавлять npm-пакет без обсуждения, если есть альтернатива в стандартной библиотеке или уже установлена аналогичная.

## Перед PR

- [ ] `pnpm typecheck` зелёный
- [ ] `pnpm lint` зелёный
- [ ] `pnpm test` зелёный
- [ ] `pnpm build` собирается без warning'ов в Server Components
- [ ] Запустить страницу локально и кликнуть руками golden path

## Полезные паттерны

- Loading UI — `loading.tsx` в сегменте роута.
- Error boundaries — `error.tsx` в сегменте роута.
- Параллельная загрузка данных — `Promise.all` в RSC.
- Optimistic updates — `useOptimistic` в client component.
