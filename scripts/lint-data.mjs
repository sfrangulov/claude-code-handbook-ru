#!/usr/bin/env node
// Style linter for entry descriptions in data/*.json.
//
// Rules (from CONTRIBUTING.md):
//   1. desc does not begin with the resource's own name (no-self-name).
//   2. desc contains no marketing words: "must-have", "must have",
//      "революционн*", "прорывн*", "лучш*" (case-insensitive).
//   3. desc is a single line (no embedded newlines).
//
// Usage:
//   node scripts/lint-data.mjs        # fail with non-zero if issues found
//   node scripts/lint-data.mjs --warn # report only; always exit 0

import { readFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(dirname(__dirname), 'data');

const MARKETING_PATTERNS = [
  /\bmust[ -]have\b/i,
  /революционн/i,
  /прорывн/i,
  /\bлучш(ий|ая|ее|их|ие)\b/i,
];

function lintEntry(entry, refPath, errs) {
  const name = entry.name ?? entry.slug ?? entry.category;
  const desc = entry.desc;
  if (typeof desc !== 'string' || !desc) return; // validate-data.mjs handles missing

  if (desc.includes('\n')) {
    errs.push(`${refPath}: desc must be single-line`);
  }

  if (name && typeof name === 'string') {
    const head = desc.slice(0, name.length).toLowerCase();
    if (head === name.toLowerCase()) {
      errs.push(`${refPath}: desc starts with the resource's own name "${name}" (no-self-name)`);
    }
  }

  // Metalinguistic citation in «…» is allowed (e.g. the article describes a
  // scale from «must have» to «забей»). Strip those before matching marketing
  // patterns.
  const stripped = desc.replace(/«[^»]*»/g, '');
  for (const re of MARKETING_PATTERNS) {
    const m = stripped.match(re);
    if (m) {
      errs.push(`${refPath}: marketing word "${m[0]}" in desc`);
    }
  }

  if (entry.children) {
    entry.children.forEach((c, i) => lintEntry(c, `${refPath}.children[${i}]`, errs));
  }
}

function walkArrays(prefix, value, errs) {
  if (Array.isArray(value)) {
    value.forEach((entry, i) => {
      if (entry && typeof entry === 'object' && !Array.isArray(entry)) {
        lintEntry(entry, `${prefix}[${i}]`, errs);
      }
    });
    return;
  }
  if (value && typeof value === 'object') {
    for (const [k, v] of Object.entries(value)) {
      if (k.startsWith('_')) continue;
      walkArrays(prefix ? `${prefix}.${k}` : k, v, errs);
    }
  }
}

async function loadAllFiles() {
  const out = [];
  for (const f of (await readdir(DATA_DIR)).filter((x) => x.endsWith('.json'))) {
    out.push({
      prefix: f.replace(/\.json$/, ''),
      data: JSON.parse(await readFile(join(DATA_DIR, f), 'utf8')),
    });
  }
  try {
    for (const f of (await readdir(join(DATA_DIR, 'catalog'))).filter((x) => x.endsWith('.json'))) {
      out.push({
        prefix: `catalog/${f.replace(/\.json$/, '')}`,
        data: JSON.parse(await readFile(join(DATA_DIR, 'catalog', f), 'utf8')),
      });
    }
  } catch {}
  return out.sort((a, b) => a.prefix.localeCompare(b.prefix));
}

async function main() {
  const warnOnly = process.argv.includes('--warn');
  const files = await loadAllFiles();
  const errors = [];

  for (const f of files) {
    walkArrays(f.prefix, f.data, errors);
  }

  if (errors.length) {
    const tag = warnOnly ? '⚠' : '✗';
    process.stderr.write(`${tag} stylelint: ${errors.length} issue(s)\n`);
    for (const e of errors) process.stderr.write(`  ${e}\n`);
    if (!warnOnly) process.exit(1);
    return;
  }
  console.log(`✓ stylelint passed`);
}

main().catch((err) => {
  process.stderr.write((err.stack || err.message) + '\n');
  process.exit(1);
});
