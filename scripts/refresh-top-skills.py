#!/usr/bin/env python3
"""
Refresh the 🏆 top-skills table in README.md from skills.sh marketplace.

Использование:
    python scripts/refresh-top-skills.py            # сухой прогон, печать таблицы
    python scripts/refresh-top-skills.py --write    # перезаписать README.md

Алгоритм:
1. Прогоняет `npx skills find <query>` по списку категорий (code-review, testing, debugging, и т.д.).
2. Парсит install-count и URL.
3. Дедуплицирует по slug `owner/repo@skill`.
4. Сохраняет top-N по убыванию install-count.
5. Подставляет описания «зачем и когда» из встроенного словаря (если в README они уже были — сохраняем; для новых нужно дописать вручную).
6. Перезаписывает блок между `### 🏆 Топ скиллов` и `### Официальные`.

Требует: установленный npx (Node.js), доступ в интернет.
"""
import argparse
import json
import re
import subprocess
import sys
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parent.parent
README = REPO_ROOT / "README.md"

# Категории, по которым опрашиваем skills.sh
SEARCH_QUERIES = [
    "code-review", "testing", "debugging", "security", "workflow",
    "react", "git", "refactor", "docs", "deploy", "tdd", "brainstorm",
    "performance", "typescript", "mcp", "planning", "design", "prompt",
    "verification", "subagent",
]

# Минимум установок для попадания в таблицу
MIN_INSTALLS = 20_000

# Сколько максимум в таблице
MAX_ROWS = 30

# Известные описания «зачем и когда» (расширяй когда появляются новые скиллы)
# Если скилл здесь не упомянут — таблица возьмёт пустое описание и человек дописывает руками.
DESCRIPTIONS = {
    "anthropics/skills@frontend-design": "Принудительно перестроить дизайн под bold-решения, а не дефолтные «AI slop»-карточки. Триггерь когда видишь, что вышло generic. React + Tailwind.",
    "vercel-labs/agent-skills@vercel-react-best-practices": "React/Next.js perf-практики от Vercel Engineering: boundaries клиент-RSC, кэширование, оптимизация bundle. Подключай в любом Next.js-проекте.",
    "vercel-labs/agent-skills@web-design-guidelines": "Чек-лист соответствия Web Interface Guidelines: a11y, hit-targets, focus rings. Запускай как ревью UI до коммита.",
    "microsoft/azure-skills@azure-deploy": "Деплой в Azure: ARM/Bicep, App Service, Container Apps. Ставь только если работаешь в Azure-стэке — иначе мёртвый груз в контексте.",
    "obra/superpowers@brainstorming": "Структурированный брейншторм с гипотезами и матрицей вариантов **до** начала кода. Включай когда задача расплывчатая.",
    "xixu-me/skills@github-actions-docs": "Свежая официальная дока GitHub Actions: синтаксис, runners, OIDC, troubleshooting. Когда пишешь workflow и не хочешь искать в десяти вкладках.",
    "larksuite/cli@lark-workflow-meeting-summary": "Авто-резюме встреч в Lark (китайский Slack-аналог). Релевантно если работаешь с китайской командой.",
    "vercel-labs/agent-skills@vercel-react-native-skills": "React Native best practices от Vercel. Для мобильных проектов на RN — снимает с агента половину типичных багов.",
    "mattpocock/skills@tdd": "TDD-цикл (red-green-refactor) с дисциплиной — не даёт агенту писать код вперёд тестов. От Matt Pocock.",
    "arvindrk/extract-design-system@extract-design-system": "Скан существующего сайта → структурированный design-system. Для редизайна или нового проекта на базе старого.",
    "obra/superpowers@systematic-debugging": "Дисциплина отладки: гипотезы → изоляция → root cause. Прерывает цикл «угадывания на код-граниях».",
    "obra/superpowers@requesting-code-review": "Запросить ревью у саб-агента перед коммитом. Эффективно когда работаешь автономно без живого ревьюера.",
    "mattpocock/skills@grill-with-docs": "«Допрашивай» документацию через find/grep — заменяет догадки точными цитатами из docs.",
    "obra/superpowers@subagent-driven-development": "Делегирование независимых задач саб-агентам параллельно (feature + tests, frontend + backend).",
    "anthropics/skills@webapp-testing": "Тестирование веб-приложений через Playwright. Заменяет «руками протыкать в браузере» на автоматизацию.",
    "obra/superpowers@verification-before-completion": "Проверить что задача реально сделана (запустить тесты, открыть страницу), до отчёта «готово». Антидот к false-positive.",
    "obra/superpowers@receiving-code-review": "Принимать review-feedback с технической строгостью — не соглашаться на всё подряд, а аргументировать.",
    "pbakaus/impeccable@frontend-design": "Premium frontend design (Paul Bakaus). Альтернатива anthropics/frontend-design с другим эстетическим уклоном.",
    "leonxlnx/taste-skill@design-taste-frontend": "Senior UI/UX-инженер: переопределяет дефолтные LLM-биасы про дизайн. Хорош в паре с дизайн-системой.",
    "anthropics/skills@mcp-builder": "Пошаговое создание MCP-сервера. Подключай только когда пишешь свой MCP.",
    "vercel-labs/agent-skills@deploy-to-vercel": "Деплой на Vercel со всеми их специфичными настройками (env vars, domains, edge functions).",
    "get-convex/agent-skills@convex-performance-audit": "Performance-аудит для Convex-приложений. Узкий, но в Convex-стэке незаменим.",
    "google-labs-code/stitch-skills@react:components": "React-компоненты по описанию (Google Stitch — design-to-code). Когда есть дизайн в Figma.",
    "wshobson/agents@typescript-advanced-types": "Продвинутые TypeScript patterns: conditional, mapped, template literal types.",
    "google-labs-code/stitch-skills@enhance-prompt": "Улучшение промпта перед отправкой модели.",
    "github/awesome-copilot@git-commit": "Conventional commit-сообщения на основе staged diff.",
    "wshobson/agents@python-performance-optimization": "Python perf: profiling (cProfile/py-spy), типичные узкие места, оптимизация.",
    "firebase/agent-skills@firestore-security-rules-auditor": "Аудит Firestore security rules — топовый источник дыр в Firebase-проектах. Запускай перед прод-релизом.",
}


def run_skills_find(query: str) -> str:
    """Run `npx skills find <query>` and return stdout."""
    try:
        result = subprocess.run(
            ["npx", "skills", "find", query],
            capture_output=True, text=True, timeout=60,
            check=False,
        )
        return result.stdout
    except (FileNotFoundError, subprocess.TimeoutExpired) as e:
        print(f"warn: failed query '{query}': {e}", file=sys.stderr)
        return ""


def parse_skills_output(text: str):
    """Extract skills + install counts from `npx skills find` output."""
    out = []
    lines = text.split("\n")
    for i in range(len(lines) - 1):
        # Strip ANSI escape codes
        line = re.sub(r"\x1b\[[0-9;]*m", "", lines[i])
        m = re.match(r"\s*(\S+/[^@\s]+@\S+)\s+([\d.]+[KM])\s+installs", line)
        if m:
            slug = m.group(1).strip()
            count_str = m.group(2)
            if count_str.endswith("K"):
                count = int(float(count_str[:-1]) * 1000)
            elif count_str.endswith("M"):
                count = int(float(count_str[:-1]) * 1_000_000)
            else:
                count = int(count_str)
            url = f"https://skills.sh/{slug.replace('@', '/')}"
            out.append({"slug": slug, "count": count, "url": url})
    return out


def parse_count(n: int) -> str:
    if n >= 1_000_000:
        return f"{n / 1_000_000:.1f}M"
    if n >= 1_000:
        return f"{n // 1000}K"
    return str(n)


def fetch_all():
    seen = {}
    for q in SEARCH_QUERIES:
        print(f"querying: {q}", file=sys.stderr)
        text = run_skills_find(q)
        for item in parse_skills_output(text):
            existing = seen.get(item["slug"])
            if not existing or item["count"] > existing["count"]:
                seen[item["slug"]] = item
    items = list(seen.values())
    items.sort(key=lambda x: -x["count"])
    return [x for x in items if x["count"] >= MIN_INSTALLS][:MAX_ROWS]


def render_table(items):
    lines = [
        "### 🏆 Топ скиллов (по install-count из [skills.sh](https://skills.sh))",
        "",
        "Самые установленные скиллы в community — ранжированы по реальной телеметрии маркетплейса skills.sh, не по звёздам на GitHub. Ставится одной командой: `npx skills add <owner/repo@skill>`.",
        "",
        "Третья колонка — мой ответ на «когда это реально нужно», не пересказ официального описания.",
        "",
        "| Скилл | Зачем и когда юзать | Установок |",
        "|---|---|---:|",
    ]
    for it in items:
        slug = it["slug"]
        desc = DESCRIPTIONS.get(slug, "_(новый в топе, допиши описание)_")
        count = parse_count(it["count"])
        lines.append(f"| [{slug}]({it['url']}) | {desc} | **{count}** |")
    lines += [
        "",
        "> **Совет практика:** ставь `obra/superpowers` целиком сразу — это самая полная коллекция soft-скиллов. Для конкретного стэка добавь stack-specific. Не ставь всё подряд — каждый скилл занимает ~3-5K токенов в context bootstrap.",
        "",
        "> Источник: [skills.sh leaderboard](https://skills.sh) — install-count актуален на момент последнего пересмотра README, числа быстро растут. Автообновление таблицы: `python scripts/refresh-top-skills.py --write`.",
        "",
    ]
    return "\n".join(lines)


def replace_in_readme(new_table: str):
    text = README.read_text()
    pattern = re.compile(
        r"### 🏆 Топ скиллов \(по install-count.+?(?=\n### Официальные)",
        re.S,
    )
    if not pattern.search(text):
        raise SystemExit("error: section markers not found in README.md")
    new_text = pattern.sub(new_table.rstrip() + "\n\n", text)
    README.write_text(new_text)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--write", action="store_true", help="overwrite README.md")
    args = ap.parse_args()

    items = fetch_all()
    if not items:
        raise SystemExit("error: no skills fetched")
    print(f"fetched {len(items)} skills from skills.sh", file=sys.stderr)

    table = render_table(items)
    if args.write:
        replace_in_readme(table)
        print("README.md updated.")
    else:
        print(table)


if __name__ == "__main__":
    main()
