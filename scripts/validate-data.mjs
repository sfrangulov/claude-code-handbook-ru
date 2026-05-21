#!/usr/bin/env node
// Validate every entry in data/*.json conforms to its expected shape.
//
// Usage:
//   node scripts/validate-data.mjs
//
// Exits 0 if everything is valid, 1 with a per-file error report otherwise.
//
// Schemas are inlined per file path — the matching ref is the dotted path
// build-readme.mjs uses (e.g. "skills.official", "subagents.voltagentCategories.items").
// Adding a new section: add an entry to PATH_SCHEMAS below.

import { readFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(dirname(__dirname), 'data');

// ----- entry validators -----------------------------------------------------

function isString(v) {
  return typeof v === 'string' && v.length > 0;
}
function isUrlLike(v) {
  return isString(v) && (/^https?:\/\//.test(v) || v.startsWith('./') || v.startsWith('#'));
}

function checkPlainEntry(entry, path, errs) {
  // { name, url, desc, children? }
  if (!isString(entry.name)) errs.push(`${path}: missing or empty "name"`);
  if (!isUrlLike(entry.url)) errs.push(`${path}: "url" must be http(s)://… or ./… (got ${JSON.stringify(entry.url)})`);
  if (!isString(entry.desc)) errs.push(`${path}: missing or empty "desc"`);
  if (entry.children !== undefined) {
    if (!Array.isArray(entry.children)) {
      errs.push(`${path}.children: must be array`);
    } else {
      entry.children.forEach((c, i) => checkChildEntry(c, `${path}.children[${i}]`, errs));
    }
  }
  const allowed = new Set(['name', 'url', 'desc', 'children']);
  for (const k of Object.keys(entry)) {
    if (!allowed.has(k)) errs.push(`${path}: unexpected key "${k}"`);
  }
}

function checkChildEntry(entry, path, errs) {
  // { name, bold: true, desc }
  if (!isString(entry.name)) errs.push(`${path}: missing or empty "name"`);
  if (entry.bold !== true) errs.push(`${path}: child entries must set "bold": true`);
  if (!isString(entry.desc)) errs.push(`${path}: missing or empty "desc"`);
  const allowed = new Set(['name', 'bold', 'desc']);
  for (const k of Object.keys(entry)) {
    if (!allowed.has(k)) errs.push(`${path}: unexpected key "${k}"`);
  }
}

function checkBoldLinkEntry(entry, path, errs) {
  // { name, link: { text, url }, desc }
  if (!isString(entry.name)) errs.push(`${path}: missing or empty "name"`);
  if (!entry.link || typeof entry.link !== 'object') {
    errs.push(`${path}: missing "link" object`);
  } else {
    if (!isString(entry.link.text)) errs.push(`${path}.link: missing "text"`);
    if (!isUrlLike(entry.link.url)) errs.push(`${path}.link: bad "url" (${JSON.stringify(entry.link.url)})`);
  }
  if (!isString(entry.desc)) errs.push(`${path}: missing or empty "desc"`);
  const allowed = new Set(['name', 'link', 'desc']);
  for (const k of Object.keys(entry)) {
    if (!allowed.has(k)) errs.push(`${path}: unexpected key "${k}"`);
  }
}

function checkSkillsTopEntry(entry, path, errs) {
  // { slug, url, desc, count: number }
  if (!isString(entry.slug)) errs.push(`${path}: missing "slug"`);
  if (entry.slug && !/^[\w.-]+\/[\w.-]+@[\w.-]+$/.test(entry.slug)) {
    errs.push(`${path}: slug must look like "owner/repo@skill" (got ${entry.slug})`);
  }
  if (!isUrlLike(entry.url)) errs.push(`${path}: bad "url"`);
  if (!isString(entry.desc)) errs.push(`${path}: missing "desc"`);
  if (typeof entry.count !== 'number' || entry.count <= 0) {
    errs.push(`${path}: "count" must be a positive number`);
  }
  const allowed = new Set(['slug', 'url', 'desc', 'count']);
  for (const k of Object.keys(entry)) {
    if (!allowed.has(k)) errs.push(`${path}: unexpected key "${k}"`);
  }
}

function checkVoltAgentCategory(entry, path, errs) {
  const required = ['emoji', 'category', 'count', 'categoryUrl', 'inside', 'when'];
  for (const k of required) {
    if (k === 'count') {
      if (typeof entry.count !== 'number' || entry.count <= 0) errs.push(`${path}: "count" must be positive number`);
    } else if (k === 'categoryUrl') {
      if (!isUrlLike(entry.categoryUrl)) errs.push(`${path}: bad "categoryUrl"`);
    } else {
      if (!isString(entry[k])) errs.push(`${path}: missing or empty "${k}"`);
    }
  }
  const allowed = new Set(required);
  for (const k of Object.keys(entry)) {
    if (!allowed.has(k)) errs.push(`${path}: unexpected key "${k}"`);
  }
}

// ----- per-ref dispatch -----------------------------------------------------

const PATH_SCHEMAS = {
  // file:dotted.path → validator for each entry
  'skills.official': checkPlainEntry,
  'skills.communityCollections': checkPlainEntry,
  'skills.specialized': checkPlainEntry,
  'skills.local': checkPlainEntry,
  'subagents.productionCollections.items': checkPlainEntry,
  'subagents.voltagentCategories.items': checkVoltAgentCategory,
  'plugins.marketplaces': checkPlainEntry,
  'plugins.singles': checkPlainEntry,
  'hooks.local': checkPlainEntry,
  'hooks.community': checkPlainEntry,
  'mcp.official': checkPlainEntry,
  'mcp.curators': checkPlainEntry,
  'mcp.topDaily.items': checkBoldLinkEntry,
  'templates.local': checkPlainEntry,
  'templates.collections': checkPlainEntry,
  'templates.stacks': checkPlainEntry,
  'templates.guides': checkPlainEntry,
  'ru-content.habr': checkPlainEntry,
  'ru-content.vc': checkPlainEntry,
  'ru-content.dtf': checkPlainEntry,
  'ru-content.youtube': checkPlainEntry,
  'security.main': checkPlainEntry,
  'security.enterprise': checkPlainEntry,
  'misc.prompting': checkPlainEntry,
  'misc.channels': checkPlainEntry,
  'misc.podcasts': checkPlainEntry,
  'misc.twitter': checkPlainEntry,
  'misc.competitors': checkPlainEntry,
  'misc.utilities': checkPlainEntry,
  'skills-top.items': checkSkillsTopEntry,
};

function resolveByPath(obj, parts) {
  let cur = obj;
  for (const p of parts) {
    if (cur == null) return undefined;
    cur = cur[p];
  }
  return cur;
}

async function loadFile(name) {
  const raw = await readFile(join(DATA_DIR, name), 'utf8');
  return JSON.parse(raw);
}

function findEntryArrays(file, data, prefix, out) {
  // walk known schema paths under this file's prefix
  for (const ref of Object.keys(PATH_SCHEMAS)) {
    const [f, ...path] = ref.split('.');
    if (f !== prefix) continue;
    const value = resolveByPath(data, path);
    if (value === undefined) {
      out.errors.push(`${file}: schema expects path "${ref}" but it's missing`);
      continue;
    }
    if (!Array.isArray(value)) {
      out.errors.push(`${file}:${path.join('.')} expected array, got ${typeof value}`);
      continue;
    }
    out.arrays.push({ ref, value, validator: PATH_SCHEMAS[ref] });
  }
}

async function main() {
  const files = (await readdir(DATA_DIR)).filter((f) => f.endsWith('.json')).sort();
  const errors = [];
  let total = 0;

  for (const fname of files) {
    const prefix = fname.replace(/\.json$/, '');
    const data = await loadFile(fname);
    const local = { errors: [], arrays: [] };
    findEntryArrays(fname, data, prefix, local);
    errors.push(...local.errors);
    for (const arr of local.arrays) {
      arr.value.forEach((entry, i) => {
        total++;
        arr.validator(entry, `${arr.ref}[${i}]`, errors);
      });
    }
  }

  if (errors.length) {
    process.stderr.write(`✗ data validation failed (${errors.length} issue(s) across ${total} entries):\n`);
    for (const e of errors) process.stderr.write(`  ${e}\n`);
    process.exit(1);
  }
  console.log(`✓ data validation passed: ${total} entries across ${files.length} files`);
}

main().catch((err) => {
  process.stderr.write((err.stack || err.message) + '\n');
  process.exit(1);
});
