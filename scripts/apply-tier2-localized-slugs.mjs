#!/usr/bin/env node
/**
 * Apply tier-2 localized slugs to routing.ts and sync 301 redirects for old URLs.
 * Run: node scripts/apply-tier2-localized-slugs.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { TIER2_LOCALES, tier2LocalizedSlugs } from './i18n-data/tier2-localized-slugs.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ROUTING = path.join(ROOT, 'src/data/i18n/routing.ts');
const PATH_REDIRECTS = path.join(ROOT, 'functions/path-redirects.json');

let routing = readFileSync(ROUTING, 'utf8');
const redirects = JSON.parse(readFileSync(PATH_REDIRECTS, 'utf8'));
let changed = 0;
let redirectCount = 0;

for (const [pageId, localeSlugs] of Object.entries(tier2LocalizedSlugs)) {
	for (const locale of TIER2_LOCALES) {
		const newSlug = localeSlugs[locale];
		if (!newSlug) continue;

		const blockNeedles = [`\t${pageId}: {`, `\t'${pageId}': {`, `\t"${pageId}": {`];
		const pageBlockStart = blockNeedles.map((n) => routing.indexOf(n)).find((i) => i !== -1) ?? -1;
		if (pageBlockStart === -1) {
			console.warn(`Missing pageId block: ${pageId}`);
			continue;
		}
		const pageBlockEnd = routing.indexOf('\n\t},', pageBlockStart);
		const block = routing.slice(pageBlockStart, pageBlockEnd);
		const localeLine = block.match(new RegExp(`\\t\\t${locale}: '([^']*)',`));
		if (!localeLine) continue;

		const oldSlug = localeLine[1];
		if (oldSlug === newSlug) continue;

		const oldLine = `\t\t${locale}: '${oldSlug}',`;
		const newLine = `\t\t${locale}: '${newSlug}',`;
		if (!routing.includes(oldLine)) continue;

		routing = routing.replace(oldLine, newLine);
		changed += 1;

		if (oldSlug) {
			const oldPath = `/${locale}/${oldSlug}/`;
			const newPath = `/${locale}/${newSlug}/`;
			redirects[oldPath] = newPath;
			redirects[oldPath.slice(0, -1)] = newPath;
			redirectCount += 2;
		}
	}
}

if (changed > 0) {
	writeFileSync(ROUTING, routing);
	console.log(`Updated ${changed} tier-2 slug(s) in routing.ts`);
}

const sorted = Object.fromEntries(
	Object.entries(redirects).sort(([a], [b]) => a.localeCompare(b)),
);
writeFileSync(PATH_REDIRECTS, `${JSON.stringify(sorted, null, 2)}\n`);
console.log(`path-redirects.json: ${redirectCount} tier-2 redirect entries added/updated (${Object.keys(sorted).length} total)`);
