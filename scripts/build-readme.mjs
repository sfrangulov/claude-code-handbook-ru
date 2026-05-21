#!/usr/bin/env node
// Build README.md from README.template.md + data/*.json.
//
// Usage:
//   node scripts/build-readme.mjs           # regenerate README.md
//   node scripts/build-readme.mjs --check   # CI gate: fail if README.md is stale
//
// Marker syntax in README.template.md:
//   <!-- @list:file.path.to.key -->        bullet list of {name, url, desc, children?, bold?}
//   <!-- @bold-list:file.path -->          "- **name** — [linkText](linkUrl). desc"
//   <!-- @table:file.path -->              markdown table (renderer dispatched by ref)
//
// Path resolution: first dot-segment = data/<file>.json, rest navigates nested keys.
// If the resolved value is an object with `items` array, that array is used.

import { readFile, writeFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO = join(__dirname, '..');
const DATA_DIR = join(REPO, 'data');
const TEMPLATE = join(REPO, 'README.template.md');
const OUTPUT = join(REPO, 'README.md');

const dataCache = new Map();

async function loadData(file) {
  if (!dataCache.has(file)) {
    const raw = await readFile(join(DATA_DIR, `${file}.json`), 'utf8');
    dataCache.set(file, JSON.parse(raw));
  }
  return dataCache.get(file);
}

async function resolveRef(ref) {
  const [file, ...path] = ref.split('.');
  const data = await loadData(file);
  let cur = data;
  for (const key of path) {
    if (cur == null) throw new Error(`ref ${ref}: key ${key} missing`);
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

const MARKER_RE = /<!--\s*@(list|bold-list|table):([A-Za-z0-9_.-]+)\s*-->/g;

async function build() {
  const template = await readFile(TEMPLATE, 'utf8');
  const tasks = [];
  for (const m of template.matchAll(MARKER_RE)) {
    tasks.push({ whole: m[0], kind: m[1], ref: m[2], index: m.index });
  }

  const results = await Promise.all(
    tasks.map(async ({ kind, ref }) => {
      const data = await resolveRef(ref);
      if (kind === 'list') return renderList(asItems(data, ref));
      if (kind === 'bold-list') return renderBoldList(asItems(data, ref));
      if (kind === 'table') {
        const renderer = TABLES[ref];
        if (!renderer) throw new Error(`no table renderer for "${ref}"`);
        return renderer(asItems(data, ref));
      }
      throw new Error(`unknown kind: ${kind}`);
    }),
  );

  // Splice in order (descending index to keep offsets stable)
  const ordered = tasks
    .map((t, i) => ({ ...t, rendered: results[i] }))
    .sort((a, b) => b.index - a.index);

  let output = template;
  for (const t of ordered) {
    output = output.slice(0, t.index) + t.rendered + output.slice(t.index + t.whole.length);
  }
  return output;
}

async function listDataFiles() {
  return (await readdir(DATA_DIR)).filter((f) => f.endsWith('.json')).sort();
}

async function main() {
  const args = new Set(process.argv.slice(2));
  const check = args.has('--check');

  const output = await build();

  if (check) {
    const existing = await readFile(OUTPUT, 'utf8').catch(() => '');
    if (existing !== output) {
      console.error('README.md is out of sync with README.template.md + data/.');
      console.error('Run: node scripts/build-readme.mjs');
      process.exit(1);
    }
    console.log('README.md ✓ up to date');
    return;
  }

  await writeFile(OUTPUT, output);
  const files = await listDataFiles();
  console.log(`Wrote README.md (sources: README.template.md + ${files.length} data files)`);
}

main().catch((err) => {
  console.error(err.stack || err.message);
  process.exit(1);
});
