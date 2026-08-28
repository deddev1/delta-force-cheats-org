#!/usr/bin/env node
/**
 * Post-build performance smoke checks for dist/index.html.
 */
import { readFileSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const indexPath = join(root, 'dist', 'index.html');
const html = readFileSync(indexPath, 'utf8');

const reviewsPath = join(root, 'dist', 'reviews', 'index.html');
const reviewsHtml = readFileSync(reviewsPath, 'utf8');

const checks = [
	['hero preload', /rel="preload"[^>]+as="image"[^>]+fetchpriority="high"/i.test(html)],
	['hero srcset', /delta-force-cheats-hero-\d+w\.webp/.test(html)],
	['font preload', /fonts\/inter-latin-wght-normal\.woff2/.test(html)],
	['no hero react island', !/HeroApp|Hero\.Cl/i.test(html)],
	['lazy images on below-fold pages', /loading="lazy"/.test(reviewsHtml)],
	['supabase preconnect', /preconnect[^>]+supabase/i.test(html)],
];

let failed = 0;
for (const [label, ok] of checks) {
	console.log(`${ok ? '✓' : '✗'} ${label}`);
	if (!ok) failed += 1;
}

const heroIslandScripts = (html.match(/astro-island/g) || []).length;
console.log(`islands on homepage: ${heroIslandScripts}`);

const htmlKb = Math.round(statSync(indexPath).size / 1024);
console.log(`homepage HTML: ${htmlKb}KB`);

if (failed > 0) {
	console.error(`\ncheck-perf-html: ${failed} check(s) failed`);
	process.exit(1);
}

console.log('\ncheck-perf-html: OK');
