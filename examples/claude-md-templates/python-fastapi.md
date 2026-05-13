# Project: Python / FastAPI

> Шаблон `CLAUDE.md` для backend на FastAPI + SQLAlchemy + Postgres.
> Скопируйте в корень репозитория как `CLAUDE.md`, отредактируйте под свой стек.

## Стек

- **Python:** 3.13+ (3.14 рекомендуется — стабильная с октября 2025). Type hints обязательны везде, кроме тестов.
- **Framework:** FastAPI, async везде где возможно.
- **DB:** Postgres + SQLAlchemy 2.0 (новый стиль с `Mapped[]`) + Alembic для миграций.
- **Validation:** Pydantic v2.
- **Package manager:** uv (или poetry — указать).
- **Linter / formatter:** ruff (replaces black, isort, flake8).
- **Type checker:** mypy в strict mode.
- **Testing:** pytest + pytest-asyncio + httpx.AsyncClient.
- **Migrations:** Alembic.

## Команды

```bash
uv sync                        # установка зависимостей
uv run uvicorn app.main:app --reload     # dev server
uv run pytest                  # тесты
uv run pytest -x -vv tests/    # тесты с остановкой на первой ошибке
uv run ruff check .            # линтер
uv run ruff format .           # форматтер
uv run mypy app                # type check
uv run alembic upgrade head    # применить миграции
uv run alembic revision --autogenerate -m "msg"   # новая миграция
```

Перед PR — обязательно `ruff check && mypy app && pytest`.

## Структура

```
app/
  main.py             # точка входа, FastAPI()
  api/
    v1/
      routes/         # endpoints, тонкие — только парсинг и вызов сервиса
      deps.py         # DI dependencies
  core/
    config.py         # Settings через pydantic-settings
    security.py       # auth, password hashing
  db/
    base.py           # Base = declarative_base()
    session.py        # async session factory
  models/             # SQLAlchemy ORM models
  schemas/            # Pydantic schemas (Create, Update, Read)
  services/           # бизнес-логика, работает с моделями
  repositories/       # DB-доступ, изолирует ORM от сервисов (опц.)
alembic/
  versions/           # миграции
tests/
  conftest.py         # фикстуры
  integration/        # с реальной БД
  unit/               # с моками
```

## Правила и анти-паттерны

**Слои:**
- Роут — это thin layer: валидация Pydantic + вызов сервиса + сериализация. Никакой бизнес-логики и SQL.
- Бизнес-логика — в `services/`.
- Доступ к БД — в `repositories/` или прямо в `services/` (для маленьких проектов).
- Pydantic-схемы — отдельно от ORM-моделей. Не возвращать ORM из роута.

**Async:**
- Все эндпоинты — `async def`. Sync `def` только если действительно нет I/O.
- БД — через `AsyncSession`, не `Session`.
- Не вызывать sync-блокирующий код (`requests`, `time.sleep`) внутри async — использовать `httpx`, `asyncio.sleep`.

**Типизация:**
- Type hints обязательны на всех публичных функциях.
- `Any` — только с комментарием. `# type: ignore` — только с пояснением и точной ошибкой mypy.
- Pydantic v2: `model_config = ConfigDict(...)`, не `class Config`.

**Конфиги и секреты:**
- Через `pydantic-settings.BaseSettings`, читаем из `.env`.
- Никаких хардкодов URL и секретов в коде.
- Тестовые секреты — в `tests/conftest.py` через monkeypatch.

**Миграции:**
- Никогда не редактировать существующую миграцию, которая уже в main. Только новая.
- Проверять `alembic upgrade head && alembic downgrade -1 && alembic upgrade head` локально.
- Не использовать `--autogenerate` слепо — проверять SQL вручную.

**Тестирование:**
- Integration-тесты с реальной Postgres (через testcontainers или отдельную тестовую БД).
- Не мокать БД в integration-тестах — это ловушка, миграции и реальный SQL мокнутые тесты не проверят.
- Unit-тесты на чистую логику в `services/`.
- Использовать `httpx.AsyncClient(transport=ASGITransport(app=app))` для тестов API.
- Покрытие — цель, но не самоцель. Тестировать поведение, не строки.

**Error handling:**
- Бросать `HTTPException` только в роутах. В сервисах — доменные исключения.
- Глобальный exception handler в `main.py` для маппинга домена в HTTP.
- Не глотать исключения без логирования.

## Чего не делать

- Не использовать `requests` — только `httpx`.
- Не использовать sync `psycopg2` — только `asyncpg` через SQLAlchemy.
- Не возвращать ORM-модели напрямую из роутов — всегда через Pydantic-схему.
- Не делать N+1 запросы — использовать `selectinload`/`joinedload`.
- Не писать сырой SQL без причины — SQLAlchemy достаточно.
- Не использовать `print` для отладки в коммитах — структурный логгер (`structlog` или `logging`).
- Не добавлять `# noqa` без пояснения.

## Перед PR

- [ ] `uv run ruff check .` зелёный
- [ ] `uv run mypy app` без новых ошибок
- [ ] `uv run pytest` зелёный
- [ ] Если изменена схема БД — добавлена миграция и проверен rollback
- [ ] OpenAPI-схема собирается (`uv run python -c "from app.main import app; import json; print(json.dumps(app.openapi()))"`)

## Полезные паттерны

- DI через `Depends()` для сервисов, сессий, текущего пользователя.
- Settings как singleton: `@lru_cache` на `get_settings()`.
- Background tasks для лёгких задач, Celery/ARQ — для тяжёлых.
- `lifespan` context manager в `FastAPI()` для setup/teardown ресурсов.
