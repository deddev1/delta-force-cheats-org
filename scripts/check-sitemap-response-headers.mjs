#!/usr/bin/env node
/**
 * Ensures sitemap XML is served with crawler-safe headers (no CSP/CORP on machine-readable XML).
 * Run after build against dist/ static files — production Worker applies the same policy.
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const FORBIDDEN_ON_SITEMAPS = [
	'Content-Security-Policy',
	'Cross-Origin-Resource-Policy',
	'Cross-Origin-Embedder-Policy',
	'Cross-Origin-Opener-Policy',
	'X-Content-Type-Options',
	'require-trusted-types-for',
];

function read(pathname) {
	return readFileSync(path.join(ROOT, pathname), 'utf8');
}

let errors = 0;
const fail = (msg) => {
	console.error(`✗ ${msg}`);
	errors += 1;
};
const ok = (msg) => console.log(`✓ ${msg}`);

// Worker + middleware must use applySitemapHeaders (minimal XML headers).
for (const file of ['src/worker.ts', 'functions/_middleware.js']) {
	const src = read(file);
	if (!src.includes('applySitemapHeaders')) {
		fail(`${file} must use applySitemapHeaders for sitemap responses`);
	}
	for (const header of FORBIDDEN_ON_SITEMAPS) {
		if (src.includes(`applySecurityHeaders(headers, { html: false })`) && src.includes('isSitemap')) {
			// legacy pattern — applySecurityHeaders on sitemap path
		}
	}
}

const worker = read('src/worker.ts');
const workerSitemapBlock = worker.match(/async function fetchSitemapAsset[\s\S]*?^}/m)?.[0] ?? '';
if (!workerSitemapBlock.includes('applySitemapHeaders')) {
	fail('src/worker.ts fetchSitemapAsset must call applySitemapHeaders');
}
if (workerSitemapBlock.includes('applySecurityHeaders')) {
	fail('src/worker.ts fetchSitemapAsset must not call applySecurityHeaders');
}

const middleware = read('functions/_middleware.js');
const middlewareSitemapBlock = middleware.match(/if \(isSitemap\) \{[\s\S]*?\n\t\}/)?.[0] ?? '';
if (!middlewareSitemapBlock.includes('applySitemapHeaders')) {
	fail('functions/_middleware.js isSitemap block must call applySitemapHeaders');
}
if (middlewareSitemapBlock.includes('applySecurityHeaders')) {
	fail('functions/_middleware.js isSitemap block must not call applySecurityHeaders');
}

// Built XML must be well-formed and start with declaration (no BOM).
const distSitemap = path.join(ROOT, 'dist', 'sitemap-en.xml');
try {
	const xml = readFileSync(distSitemap, 'utf8');
	if (xml.charCodeAt(0) === 0xfeff) fail('dist/sitemap-en.xml has UTF-8 BOM (GSC parse risk)');
	if (!xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')) {
		fail('dist/sitemap-en.xml must start with XML declaration on line 1');
	}
	const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
	for (const loc of locs) {
		if (loc.includes('&') && !loc.includes('&amp;') && !loc.includes('&#')) {
			fail(`Unescaped & in sitemap <loc>: ${loc}`);
			break;
		}
	}
	if (errors === 0) ok(`dist/sitemap-en.xml well-formed (${locs.length} URLs, no BOM/unescaped entities)`);
} catch {
	fail('dist/sitemap-en.xml missing — run astro build first');
}

const robots = read('public/robots.txt');
if (!robots.includes('Allow: /sitemap')) fail('robots.txt must Allow: /sitemap for crawler access');
else ok('robots.txt explicitly allows /sitemap paths');

if (errors > 0) {
	console.error(`\ncheck-sitemap-response-headers: ${errors} error(s)`);
	process.exit(1);
}
console.log('\ncheck-sitemap-response-headers: OK');
