#!/usr/bin/env node
/**
 * Validate hreflang + og:locale:alternate in built HTML.
 * Run after `npm run build`.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '..', 'dist');

const FULL_HREFLANG = 23; // 22 locales + x-default
const EN_ONLY_HREFLANG = 2; // en + x-default

const SAMPLES = [
	{ file: 'index.html', hreflang: FULL_HREFLANG, ogAlternates: true, label: 'EN homepage' },
	{ file: 'es/index.html', hreflang: FULL_HREFLANG, ogAlternates: true, label: 'ES homepage' },
	{ file: 'ja/index.html', hreflang: FULL_HREFLANG, ogAlternates: true, label: 'JA homepage' },
	{ file: 'ar/index.html', hreflang: FULL_HREFLANG, ogAlternates: true, label: 'AR homepage' },
	{ file: 'blog/index.html', hreflang: EN_ONLY_HREFLANG, ogAlternates: false, label: 'Blog index' },
	{ file: 'reviews/index.html', hreflang: EN_ONLY_HREFLANG, ogAlternates: false, label: 'Reviews index' },
	{ file: 'faq/what-are-delta-force-cheats/index.html', hreflang: EN_ONLY_HREFLANG, ogAlternates: false, label: 'FAQ page' },
	{ file: 'guides/index.html', hreflang: EN_ONLY_HREFLANG, ogAlternates: false, label: 'Guides hub' },
	{ file: 'ja/delta-force-esp-chiito/index.html', hreflang: FULL_HREFLANG, ogAlternates: true, label: 'JA ESP (tier-2 slug)' },
];

function countHreflang(html) {
	return (html.match(/<link[^>]+rel="alternate"[^>]+hreflang=/gi) ?? []).length;
}

function countOgLocaleAlternates(html) {
	return (html.match(/property="og:locale:alternate"/gi) ?? []).length;
}

function canonicalHref(html) {
	return html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i)?.[1] ?? '';
}

function main() {
	if (!fs.existsSync(distDir)) {
		console.error('dist/ not found — run npm run build first');
		process.exit(1);
	}

	const issues = [];
	for (const sample of SAMPLES) {
		const filePath = path.join(distDir, sample.file);
		if (!fs.existsSync(filePath)) {
			issues.push(`${sample.label}: missing ${sample.file}`);
			continue;
		}
		const html = fs.readFileSync(filePath, 'utf8');
		const hreflang = countHreflang(html);
		const ogAlt = countOgLocaleAlternates(html);

		if (hreflang !== sample.hreflang) {
			issues.push(`${sample.label}: expected ${sample.hreflang} hreflang links, got ${hreflang}`);
		}
		if (sample.ogAlternates && ogAlt !== 21) {
			issues.push(`${sample.label}: expected 21 og:locale:alternate tags, got ${ogAlt}`);
		}
		if (!sample.ogAlternates && ogAlt > 0) {
			issues.push(`${sample.label}: expected no og:locale:alternate, got ${ogAlt}`);
		}
		if (!canonicalHref(html)) {
			issues.push(`${sample.label}: missing canonical link`);
		}
	}

	console.log('=== Hreflang HTML Check (dist/) ===');
	if (issues.length) {
		for (const issue of issues) console.error(`✗ ${issue}`);
		process.exit(1);
	}
	console.log(`✓ ${SAMPLES.length} sampled pages have correct hreflang and og:locale:alternate`);
}

main();
