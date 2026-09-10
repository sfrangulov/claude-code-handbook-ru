#!/usr/bin/env node
// Сверка метаданных GitHub-репозиториев из data/*.json и README.template.md.
//
// Дополняет link-check.yml, а не дублирует его. markdown-link-check отвечает на
// вопрос «отдаёт ли URL 200», и три частых случая для него невидимы:
//   - репозиторий переименован  -> GitHub отдаёт 301, ссылка «живая», но адрес устарел;
//   - репозиторий заархивирован -> 200, хотя развития не будет;
//   - репозиторий заброшен      -> 200, хотя последний коммит был год назад.
// Плюс здесь же сверяются числа звёзд, записанные в описаниях руками.
//
// Usage:
//   node scripts/check-repos.mjs                 # отчёт; exit 1, если есть ошибки
//   node scripts/check-repos.mjs --warn          # только отчёт, всегда exit 0
//   node scripts/check-repos.mjs --markdown      # вывод для issue в CI
//   node scripts/check-repos.mjs --max-age=180   # порог заброшенности, дней
//   node scripts/check-repos.mjs --star-drift=25 # порог расхождения звёзд, %
//   node scripts/check-repos.mjs --fix           # переписать URL переименованных
//
// Осознанные исключения (архив или заброшенность, оставленные намеренно)
// перечисляются в .github/repo-check-ignore.json как { "owner/repo": "причина" }.
//
// Курируемая подборка (data/*.json, README.template.md) и сырой каталог
// (data/catalog/*.json) разведены по строгости: в подборке переименование или
// архив — ошибка и красный CI, в каталоге те же находки лишь попадают в отчёт.
// Каталог набран из чужих awesome-list'ов, и чужие переезды — не повод
// блокировать чей-то PR.
//
// Токен: GITHUB_TOKEN из окружения, иначе `gh auth token`. Без токена
// GraphQL API недоступен — скрипт завершится с понятной ошибкой.

import { readFile, readdir } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const execFileP = promisify(execFile);
const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO = dirname(__dirname);
const DATA_DIR = join(REPO, 'data');

const argv = process.argv.slice(2);
const has = (f) => argv.includes(f);
const num = (f, dflt) => {
  const hit = argv.find((a) => a.startsWith(`${f}=`));
  return hit ? Number(hit.split('=')[1]) : dflt;
};

const WARN_ONLY = has('--warn');
const FIX = has('--fix');
const MARKDOWN = has('--markdown');
const MAX_AGE_DAYS = num('--max-age', 180);
const STAR_DRIFT = num('--star-drift', 25) / 100;
const BATCH = 80;

// ----- сбор ссылок ----------------------------------------------------------

// Только корень репозитория: ссылки на файлы и подпапки внутри репозитория
// проверяет link-check, здесь они дали бы ложные срабатывания.
const REPO_URL = /^https?:\/\/github\.com\/([A-Za-z0-9._-]+)\/([A-Za-z0-9._-]+?)(?:\.git)?\/?$/;

// github.com/<не-владелец>/... — продуктовые страницы GitHub, а не репозитории.
const NOT_OWNERS = new Set([
  'features', 'sponsors', 'orgs', 'topics', 'marketplace', 'apps', 'collections',
  'explore', 'about', 'pricing', 'security', 'settings', 'notifications', 'trending', 'login', 'join', 'new',
]);

function collectFromJson(node, file, out) {
  if (Array.isArray(node)) {
    for (const item of node) collectFromJson(item, file, out);
    return;
  }
  if (node && typeof node === 'object') {
    if (typeof node.url === 'string') {
      out.push({ file, name: node.name ?? node.url, url: node.url, desc: node.desc ?? '' });
    }
    for (const value of Object.values(node)) collectFromJson(value, file, out);
  }
}

async function collectEntries() {
  const out = [];
  const roots = [
    { dir: DATA_DIR, prefix: 'data/' },
    { dir: join(DATA_DIR, 'catalog'), prefix: 'data/catalog/' },
  ];
  for (const { dir, prefix } of roots) {
    let files;
    try {
      files = (await readdir(dir)).filter((f) => f.endsWith('.json'));
    } catch {
      continue;
    }
    for (const f of files) {
      const data = JSON.parse(await readFile(join(dir, f), 'utf8'));
      collectFromJson(data, prefix + f, out);
    }
  }

  // README.template.md: таблица оркестраторов и прочие упоминания вписаны
  // текстом, в data их нет — без этого куска сверка пропускает целый раздел.
  const tpl = await readFile(join(REPO, 'README.template.md'), 'utf8');
  for (const line of tpl.split('\n')) {
    for (const m of line.matchAll(/\[([^\]]+)\]\((https?:\/\/github\.com\/[^)\s]+)\)/g)) {
      out.push({ file: 'README.template.md', name: m[1], url: m[2], desc: line });
    }
  }
  return out;
}

// ----- GitHub GraphQL -------------------------------------------------------

async function token() {
  if (process.env.GITHUB_TOKEN) return process.env.GITHUB_TOKEN;
  try {
    const { stdout } = await execFileP('gh', ['auth', 'token']);
    return stdout.trim();
  } catch {
    throw new Error('нет токена: задай GITHUB_TOKEN или выполни `gh auth login`');
  }
}

async function fetchMeta(slugs, auth) {
  const meta = new Map();
  for (let i = 0; i < slugs.length; i += BATCH) {
    const chunk = slugs.slice(i, i + BATCH);
    const query = `{${chunk
      .map(([owner, name], j) => `r${j}: repository(owner:"${owner}",name:"${name}"){nameWithOwner stargazerCount pushedAt isArchived}`)
      .join(' ')}}`;
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `bearer ${auth}`,
        'Content-Type': 'application/json',
        'User-Agent': 'claude-code-handbook-ru-repo-check',
      },
      body: JSON.stringify({ query }),
    });
    if (!res.ok) throw new Error(`GraphQL HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
    const body = await res.json();
    // Отсутствующие репозитории приезжают как data.rN === null рядом с errors —
    // это ожидаемо и не повод падать, поэтому errors здесь не фатальны.
    const data = body.data ?? {};
    chunk.forEach(([owner, name], j) => {
      meta.set(`${owner}/${name}`.toLowerCase(), data[`r${j}`] ?? null);
    });
  }
  return meta;
}

// ----- проверки -------------------------------------------------------------

// Осознанные исключения: репозиторий заархивирован или заброшен, но остаётся
// в подборке намеренно — как правило, потому что описание об этом прямо
// предупреждает. Формат: { "owner/repo": "причина" }.
const IGNORE_FILE = join(REPO, '.github', 'repo-check-ignore.json');

async function loadIgnores() {
  try {
    return JSON.parse(await readFile(IGNORE_FILE, 'utf8'));
  } catch {
    return {};
  }
}

function claimedStars(desc) {
  const m = desc.match(/([\d.]+)\s*(k?)⭐/i);
  if (!m) return null;
  return Number(m[1]) * (m[2].toLowerCase() === 'k' ? 1000 : 1);
}

function daysSince(iso, now) {
  return Math.floor((now - Date.parse(iso)) / 86400000);
}

// Переписывает URL переименованных репозиториев прямо в JSON-данных.
// Правится только адрес: `name` — это человекочитаемая подпись, и менять её
// автоматически нельзя, иначе «claude-balancer» превратится в «ccflare»
// в тексте, который на старое имя и ссылается.
async function applyRenames(renames) {
  let changed = 0;
  const dirs = [
    { dir: DATA_DIR, prefix: 'data/' },
    { dir: join(DATA_DIR, 'catalog'), prefix: 'data/catalog/' },
  ];
  for (const { dir } of dirs) {
    let files;
    try {
      files = (await readdir(dir)).filter((f) => f.endsWith('.json'));
    } catch {
      continue;
    }
    for (const f of files) {
      const path = join(dir, f);
      const before = await readFile(path, 'utf8');
      let after = before;
      for (const [oldSlug, newSlug] of renames) {
        // Экранировать нечего: слаг — [A-Za-z0-9._-], но точка в regexp значима.
        const re = new RegExp(`https://github\\.com/${oldSlug.replace(/[.]/g, '\\.')}(?=["/\\s)])`, 'gi');
        after = after.replace(re, `https://github.com/${newSlug}`);
      }
      if (after !== before) {
        const { writeFile } = await import('node:fs/promises');
        await writeFile(path, after);
        changed += 1;
      }
    }
  }
  return changed;
}

async function main() {
  const entries = await collectEntries();
  const byRepo = new Map();
  for (const e of entries) {
    const m = e.url.match(REPO_URL);
    if (!m) continue;
    if (NOT_OWNERS.has(m[1].toLowerCase())) continue;
    const slug = `${m[1]}/${m[2]}`.toLowerCase();
    if (!byRepo.has(slug)) byRepo.set(slug, []);
    byRepo.get(slug).push(e);
  }

  const ignores = await loadIgnores();
  const ignored = new Set(Object.keys(ignores).map((k) => k.toLowerCase()));
  const slugs = [...byRepo.keys()].map((s) => s.split('/'));
  const meta = await fetchMeta(slugs, await token());
  const now = Date.now();

  const errors = [];      // курируемая подборка: ломает CI
  const warnings = [];    // курируемая подборка: попадает в отчёт
  const catalogNotes = []; // сырой каталог: только отчёт
  const renames = new Map();

  const isCurated = (file) => !file.startsWith('data/catalog/');

  for (const [slug, uses] of byRepo) {
    const v = meta.get(slug);
    const files = [...new Set(uses.map((u) => u.file))];
    const where = files.join(', ');
    const curated = files.some(isCurated);
    const sink = curated ? errors : catalogNotes;

    if (v === null || v === undefined) {
      sink.push({ slug, kind: 'нет репозитория', detail: 'GitHub отдаёт 404', where });
      continue;
    }
    if (v.nameWithOwner.toLowerCase() !== slug) {
      sink.push({ slug, kind: 'переименован', detail: `теперь ${v.nameWithOwner}`, where });
      renames.set(slug, v.nameWithOwner);
    }
    if (v.isArchived && !ignored.has(slug)) {
      sink.push({ slug, kind: 'архив', detail: `последний пуш ${v.pushedAt.slice(0, 10)}`, where });
    }
    const age = daysSince(v.pushedAt, now);
    if (!v.isArchived && age > MAX_AGE_DAYS && !ignored.has(slug)) {
      (curated ? warnings : catalogNotes).push({
        slug, kind: 'заброшен', detail: `${age} дней без пуша (${v.pushedAt.slice(0, 10)})`, where,
      });
    }
    for (const use of uses) {
      // В шаблоне desc — вся строка целиком, и «≥3k⭐» из описания критерия
      // отбора неотличимо от заявленных звёзд. Сверяем только JSON-данные.
      if (!use.file.endsWith('.json')) continue;
      const claimed = claimedStars(use.desc);
      if (claimed === null) continue;
      const drift = Math.abs(v.stargazerCount - claimed) / Math.max(v.stargazerCount, 1);
      if (drift > STAR_DRIFT) {
        (isCurated(use.file) ? warnings : catalogNotes).push({
          slug,
          kind: 'звёзды',
          detail: `заявлено ${claimed.toLocaleString('ru')}, факт ${v.stargazerCount.toLocaleString('ru')} (${Math.round(drift * 100)}%)`,
          where: use.file,
        });
      }
    }
  }

  if (FIX && renames.size) {
    const changed = await applyRenames(renames);
    console.log(`--fix: переписано ${renames.size} адресов в ${changed} файлах\n`);
  }

  const checked = byRepo.size;
  if (MARKDOWN) {
    const rows = (list) =>
      list.length
        ? list.map((r) => `| \`${r.slug}\` | ${r.kind} | ${r.detail} | ${r.where} |`).join('\n')
        : '| — | — | (нет) | — |';
    console.log(`### Метаданные репозиториев\n`);
    console.log(`Проверено репозиториев: ${checked}.\n`);
    console.log(`**Ошибки** (ссылка ведёт не туда или проект закрыт):\n`);
    console.log(`| Репозиторий | Что | Детали | Где |\n|---|---|---|---|\n${rows(errors)}\n`);
    console.log(`**Предупреждения** (порог: ${MAX_AGE_DAYS} дней, ${Math.round(STAR_DRIFT * 100)}% по звёздам):\n`);
    console.log(`| Репозиторий | Что | Детали | Где |\n|---|---|---|---|\n${rows(warnings)}\n`);
    console.log(`<details><summary>Сырой каталог: ${catalogNotes.length} находок (CI не ломают)</summary>\n`);
    console.log(`| Репозиторий | Что | Детали | Где |\n|---|---|---|---|\n${rows(catalogNotes)}\n</details>`);
  } else {
    const line = (r) => `  ${r.slug.padEnd(48)} ${r.kind.padEnd(14)} ${r.detail}   [${r.where}]`;
    console.log(`Проверено репозиториев: ${checked}`);
    console.log(`\n✗ ошибок: ${errors.length}`);
    errors.forEach((r) => console.log(line(r)));
    console.log(`\n⚠ предупреждений: ${warnings.length}`);
    warnings.forEach((r) => console.log(line(r)));
    console.log(`\n· сырой каталог: ${catalogNotes.length} находок (CI не ломают)`);
    if (!has('--quiet-catalog')) catalogNotes.forEach((r) => console.log(line(r)));
  }

  if (errors.length && !WARN_ONLY) process.exit(1);
}

main().catch((err) => {
  process.stderr.write((err.stack || err.message) + '\n');
  process.exit(2);
});
