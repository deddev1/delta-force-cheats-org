#!/usr/bin/env node
/**
 * Renames legacy rust-* blog slugs to finals-* and updates internal links.
 * Run: node scripts/fix-finals-blog-slugs.mjs && node scripts/generate-blog-posts.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

const SLUG_MAP = {
	'rust-patch-notes-guide': 'finals-patch-notes-guide',
	'rust-skin-leaks-guide': 'finals-cosmetics-guide',
	'rust-player-tier-list': 'finals-weapon-tier-list',
	'rust-operations-aggressive-strategies': 'finals-loot-run-strategies',
	'rust-competitive-meta-guide': 'finals-competitive-meta-guide',
	'rust-loot-routes-guide': 'finals-cashout-routes-guide',
	'rust-pro-settings-guide': 'finals-pro-settings-guide',
	'rust-warmup-maps-ranked': 'finals-warmup-routine',
};

const KEYWORD_REPLACEMENTS = [
	[/\bthe rust patch notes\b/gi, 'Delta Force patch notes'],
	[/\brust major update\b/gi, 'Delta Force major update'],
	[/\brust intel\b/gi, 'Finals intel'],
	[/\brust skins\b/gi, 'Delta Force cosmetics'],
	[/\brust cosmetics\b/gi, 'Delta Force cosmetics'],
	[/\bthe rust skins\b/gi, 'Delta Force cosmetics'],
	[/\brust player tier\b/gi, 'Delta Force weapon tier'],
	[/\brust loot routes\b/gi, 'Delta Force extract routes'],
	[/\brust warmup\b/gi, 'Delta Force warmup'],
	[/\brust pro settings\b/gi, 'Delta Force pro settings'],
	[/\brust competitive meta\b/gi, 'Delta Force competitive meta'],
	[/\brust farming run\b/gi, 'Delta Force loot run'],
	[/\bmonument edges\b/gi, 'arena edges'],
	[/\bmonument\b/gi, 'arena'],
	[/\brouble floor\b/gi, 'credit floor'],
	[/\bscrap\b/gi, 'credits'],
];

function applyMap(text) {
	let out = text;
	for (const [from, to] of Object.entries(SLUG_MAP)) {
		out = out.replaceAll(from, to);
	}
	for (const [re, to] of KEYWORD_REPLACEMENTS) {
		out = out.replace(re, to);
	}
	// Fix broken EXT key from prior migration
	out = out.replaceAll('EXT.rust', 'EXT.finals');
	out = out.replaceAll("rust:\n", "finals:\n");
	out = out.replaceAll("'rust-", "'finals-");
	out = out.replaceAll('"rust-', '"finals-');
	out = out.replaceAll('id: \'rust-', "id: 'finals-");
	return out;
}

const blogGen = join(ROOT, 'scripts', 'generate-blog-posts.mjs');
writeFileSync(blogGen, applyMap(readFileSync(blogGen, 'utf8')), 'utf8');

const posts = join(ROOT, 'src', 'data', 'blog', 'posts.generated.ts');
writeFileSync(posts, applyMap(readFileSync(posts, 'utf8')), 'utf8');

const validate = join(ROOT, 'scripts', 'validate-sitemaps.mjs');
writeFileSync(validate, applyMap(readFileSync(validate, 'utf8')), 'utf8');

const redirectsPath = join(ROOT, 'functions', 'path-redirects.json');
const redirects = JSON.parse(readFileSync(redirectsPath, 'utf8'));
for (const [from, to] of Object.entries(SLUG_MAP)) {
	redirects[`/blog/${from}/`] = `/blog/${to}/`;
	redirects[`/blog/${from}`] = `/blog/${to}/`;
}
writeFileSync(redirectsPath, `${JSON.stringify(redirects, null, 2)}\n`, 'utf8');

const cannibalPath = join(ROOT, 'functions', 'cannibal-redirects.json');
const cannibal = JSON.parse(readFileSync(cannibalPath, 'utf8'));
cannibal['/fr/meilleures-triches-finals/'] = '/fr/meilleures-triches-delta-force/';
cannibal['/fr/meilleures-triches-finals'] = '/fr/meilleures-triches-delta-force/';
delete cannibal['/fr/meilleures-triches-rust/'];
delete cannibal['/fr/meilleures-triches-rust'];
writeFileSync(cannibalPath, `${JSON.stringify(cannibal, null, 2)}\n`, 'utf8');

console.log('Updated blog slugs, redirects, and cannibal map.');
