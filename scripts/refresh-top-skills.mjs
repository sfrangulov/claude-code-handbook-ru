#!/usr/bin/env node
// Refresh data/skills-top.json from skills.sh marketplace.
//
// Usage:
//   node scripts/refresh-top-skills.mjs            # dry run, prints fetched table
//   node scripts/refresh-top-skills.mjs --write    # overwrite data/skills-top.json
//
// Pipeline:
//   1. Run `npx skills find <query>` for a list of categories.
//   2. Parse install-count and URL out of stdout.
//   3. Deduplicate by `owner/repo@skill`, keep highest count.
//   4. Drop entries below MIN_INSTALLS, take top MAX_ROWS by count.
//   5. Merge `desc` from existing data/skills-top.json (so manual prose isn't lost).
//   6. Write data/skills-top.json. Then run `node scripts/build-readme.mjs` to update README.
//
// Requires: npx (Node.js) and network access.

import { readFile, writeFile } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const execFileP = promisify(execFile);

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO = join(__dirname, '..');
const TARGET = join(REPO, 'data', 'skills-top.json');

const SEARCH_QUERIES = [
  'code-review', 'testing', 'debugging', 'security', 'workflow',
  'react', 'git', 'refactor', 'docs', 'deploy', 'tdd', 'brainstorm',
  'performance', 'typescript', 'mcp', 'planning', 'design', 'prompt',
  'verification', 'subagent',
];

const MIN_INSTALLS = 20_000;
const MAX_ROWS = 15;

// Skills excluded from the curated top list regardless of install-count.
// Matched by prefix of the `owner/repo@skill` slug. larksuite/* — Lark-workflow
// skills (meeting-summary, standup-report): high installs but too narrow for a
// general Claude Code handbook. The filter runs before the top-N cut, so the
// list always backfills to MAX_ROWS with allowed skills.
const DENYLIST_PREFIXES = ['larksuite/'];

function isDenied(slug) {
  return DENYLIST_PREFIXES.some((p) => slug.startsWith(p));
}

const STRIP_ANSI = /\x1b\[[0-9;]*m/g;
const ROW_RE = /^\s*(\S+\/[^@\s]+@\S+)\s+([\d.]+[KM])\s+installs/;

async function runFind(query) {
  try {
    const { stdout } = await execFileP('npx', ['skills', 'find', query], {
      timeout: 60_000,
      maxBuffer: 4 * 1024 * 1024,
    });
    return stdout;
  } catch (err) {
    process.stderr.write(`warn: query "${query}" failed: ${err.message}\n`);
    return '';
  }
}

function parseFindOutput(text) {
  const out = [];
  for (const raw of text.split('\n')) {
    const line = raw.replace(STRIP_ANSI, '');
    const m = line.match(ROW_RE);
    if (!m) continue;
    const [, slug, countStr] = m;
    let count;
    if (countStr.endsWith('K')) count = Math.round(parseFloat(countStr) * 1000);
    else if (countStr.endsWith('M')) count = Math.round(parseFloat(countStr) * 1_000_000);
    else count = parseInt(countStr, 10);
    const url = `https://skills.sh/${slug.replace('@', '/')}`;
    out.push({ slug, url, count });
  }
  return out;
}

async function fetchAll() {
  const seen = new Map();
  for (const q of SEARCH_QUERIES) {
    process.stderr.write(`querying: ${q}\n`);
    const text = await runFind(q);
    for (const item of parseFindOutput(text)) {
      const prev = seen.get(item.slug);
      if (!prev || item.count > prev.count) seen.set(item.slug, item);
    }
  }
  return [...seen.values()]
    .filter((x) => x.count >= MIN_INSTALLS && !isDenied(x.slug))
    .sort((a, b) => b.count - a.count)
    .slice(0, MAX_ROWS);
}

async function loadExistingDescriptions() {
  try {
    const raw = await readFile(TARGET, 'utf8');
    const data = JSON.parse(raw);
    const map = new Map();
    for (const it of data.items ?? []) {
      if (it.slug && it.desc) map.set(it.slug, it.desc);
    }
    return map;
  } catch {
    return new Map();
  }
}

function fmtInstalls(n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${Math.round(n / 1000)}K`;
  return String(n);
}

async function main() {
  const args = new Set(process.argv.slice(2));
  const write = args.has('--write');

  const items = await fetchAll();
  if (!items.length) {
    process.stderr.write('error: no skills fetched\n');
    process.exit(1);
  }
  process.stderr.write(`fetched ${items.length} skills from skills.sh\n`);

  const descs = await loadExistingDescriptions();
  const enriched = items.map((it) => ({
    slug: it.slug,
    url: it.url,
    desc: descs.get(it.slug) ?? '_(новый в топе, допиши описание в data/skills-top.json)_',
    count: it.count,
  }));

  if (!write) {
    for (const it of enriched) {
      console.log(`${it.slug.padEnd(60)} ${fmtInstalls(it.count).padStart(6)}  ${it.desc.slice(0, 60)}`);
    }
    process.stderr.write('\nDry run. Re-run with --write to persist to data/skills-top.json.\n');
    return;
  }

  const payload = {
    _comment: 'Топ-15 скиллов по install-count с skills.sh. Обновляется через scripts/refresh-top-skills.mjs.',
    items: enriched,
  };
  await writeFile(TARGET, JSON.stringify(payload, null, 2) + '\n');
  process.stderr.write(`Wrote ${TARGET}\nRun: node scripts/build-readme.mjs\n`);
}

main().catch((err) => {
  process.stderr.write((err.stack || err.message) + '\n');
  process.exit(1);
});
