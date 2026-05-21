#!/usr/bin/env node
// Build README.md and catalog/*.md from .template.md siblings + data/*.json.
//
// Usage:
//   node scripts/build-readme.mjs           # regenerate every <X>.md from <X>.template.md
//   node scripts/build-readme.mjs --check   # CI gate: fail if any output is stale
//
// Marker syntax in template files:
//   <!-- @list:<ref> -->        bullet list of {name, url, desc?, children?, bold?}
//   <!-- @bold-list:<ref> -->   "- **name** — [linkText](linkUrl). desc"
//   <!-- @table:<ref> -->       markdown table (renderer dispatched by ref)
//   <!-- @count:<ref> -->       integer count of array length
//
// <ref> is `dir/file.dotted.path` (slash separates directory from file,
// dots navigate JSON keys). Examples:
//   skills.official              -> data/skills.json -> .official
//   catalog/skills.items         -> data/catalog/skills.json -> .items
// If the resolved value is { items: [...] }, the array is auto-extracted.

import { readFile, writeFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO = dirname(__dirname);
const DATA_DIR = join(REPO, 'data');

const dataCache = new Map();

function refToFilePath(ref) {
  // ref like "catalog/skills.items" or "skills.official" or "skills-top"
  const slashIdx = ref.lastIndexOf('/');
  const dir = slashIdx === -1 ? '' : ref.slice(0, slashIdx);
  const tail = slashIdx === -1 ? ref : ref.slice(slashIdx + 1);
  const [file, ...path] = tail.split('.');
  return { rel: join(dir, `${file}.json`), path };
}

async function loadData(relPath) {
  if (!dataCache.has(relPath)) {
    const raw = await readFile(join(DATA_DIR, relPath), 'utf8');
    dataCache.set(relPath, JSON.parse(raw));
  }
  return dataCache.get(relPath);
}

async function resolveRef(ref) {
  const { rel, path } = refToFilePath(ref);
  const data = await loadData(rel);
  let cur = data;
  for (const key of path) {
    if (cur == null) throw new Error(`ref ${ref}: missing key ${key}`);
    cur = cur[key];
  }
  if (cur === undefined) throw new Error(`ref ${ref} not found`);
  return cur;
}

function asItems(data, ref) {
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.items)) return data.items;
  throw new Error(`ref ${ref}: expected array or { items: [] }`);
}

function renderListItem(item, depth) {
  const indent = '  '.repeat(depth);
  let head;
  if (item.bold) {
    head = `**${item.name}**`;
  } else if (item.url) {
    head = `[${item.name}](${item.url})`;
  } else {
    head = item.name;
  }
  let line = `${indent}- ${head}`;
  if (item.desc) line += ` — ${item.desc}`;
  const out = [line];
  if (item.children) {
    for (const child of item.children) {
      out.push(renderListItem(child, depth + 1));
    }
  }
  return out.join('\n');
}

function renderList(items) {
  return items.map((it) => renderListItem(it, 0)).join('\n');
}

function renderBoldList(items) {
  return items
    .map((it) => `- **${it.name}** — [${it.link.text}](${it.link.url}). ${it.desc}`)
    .join('\n');
}

function fmtInstalls(n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${Math.round(n / 1000)}K`;
  return String(n);
}

const TABLES = {
  'skills-top': (items) => {
    const out = [
      '| Скилл | Зачем и когда юзать | Установок |',
      '|---|---|---:|',
    ];
    for (const it of items) {
      out.push(`| [${it.slug}](${it.url}) | ${it.desc} | **${fmtInstalls(it.count)}** |`);
    }
    return out.join('\n');
  },
  'subagents.productionCollections': (items) => {
    const out = ['| Репозиторий | Что внутри |', '|---|---|'];
    for (const it of items) {
      out.push(`| [${it.name}](${it.url}) | ${it.desc} |`);
    }
    return out.join('\n');
  },
  'subagents.voltagentCategories': (items) => {
    const out = ['| Категория | Внутри | Когда брать |', '|---|---|---|'];
    for (const it of items) {
      const head = `[${it.emoji} ${it.category} (${it.count})](${it.categoryUrl})`;
      out.push(`| ${head} | ${it.inside} | ${it.when} |`);
    }
    return out.join('\n');
  },
};

const MARKER_RE = /<!--\s*@(list|bold-list|table|count):([A-Za-z0-9_/.-]+)\s*-->/g;

async function buildOne(templatePath) {
  const template = await readFile(templatePath, 'utf8');
  const tasks = [];
  for (const m of template.matchAll(MARKER_RE)) {
    tasks.push({ whole: m[0], kind: m[1], ref: m[2], index: m.index });
  }
  const results = await Promise.all(
    tasks.map(async ({ kind, ref }) => {
      const data = await resolveRef(ref);
      if (kind === 'count') {
        const items = asItems(data, ref);
        return String(items.length);
      }
      const items = asItems(data, ref);
      if (kind === 'list') return renderList(items);
      if (kind === 'bold-list') return renderBoldList(items);
      if (kind === 'table') {
        const renderer = TABLES[ref];
        if (!renderer) throw new Error(`no table renderer for "${ref}"`);
        return renderer(items);
      }
      throw new Error(`unknown kind: ${kind}`);
    }),
  );
  const ordered = tasks
    .map((t, i) => ({ ...t, rendered: results[i] }))
    .sort((a, b) => b.index - a.index);
  let output = template;
  for (const t of ordered) {
    output = output.slice(0, t.index) + t.rendered + output.slice(t.index + t.whole.length);
  }
  return output;
}

async function findTemplates() {
  // README.template.md + catalog/*.template.md
  const out = [];
  const rootEntries = await readdir(REPO);
  for (const e of rootEntries) {
    if (e.endsWith('.template.md')) out.push(join(REPO, e));
  }
  try {
    const catalogEntries = await readdir(join(REPO, 'catalog'));
    for (const e of catalogEntries) {
      if (e.endsWith('.template.md')) out.push(join(REPO, 'catalog', e));
    }
  } catch {}
  return out;
}

function outputPathFor(templatePath) {
  return templatePath.replace(/\.template\.md$/, '.md');
}

async function main() {
  const args = new Set(process.argv.slice(2));
  const check = args.has('--check');

  const templates = await findTemplates();
  if (!templates.length) {
    process.stderr.write('no *.template.md files found\n');
    process.exit(1);
  }

  let stale = 0;
  for (const tpl of templates) {
    const output = await buildOne(tpl);
    const outPath = outputPathFor(tpl);
    if (check) {
      const existing = await readFile(outPath, 'utf8').catch(() => '');
      if (existing !== output) {
        process.stderr.write(`✗ ${relative(REPO, outPath)} is out of sync with ${relative(REPO, tpl)}\n`);
        stale++;
      } else {
        process.stdout.write(`✓ ${relative(REPO, outPath)}\n`);
      }
    } else {
      await writeFile(outPath, output);
      process.stdout.write(`wrote ${relative(REPO, outPath)} (from ${relative(REPO, tpl)})\n`);
    }
  }
  if (check && stale) {
    process.stderr.write(`\n${stale} file(s) out of sync. Run: node scripts/build-readme.mjs\n`);
    process.exit(1);
  }
}

main().catch((err) => {
  process.stderr.write((err.stack || err.message) + '\n');
  process.exit(1);
});
