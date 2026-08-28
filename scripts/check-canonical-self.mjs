#!/usr/bin/env node
/**
 * Indexable pages must self-reference in rel=canonical.
 * Cross-canonical HTML stubs (e.g. old redirect pages) confuse crawlers.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const SITE = 'https://deltaforcecheats.org';

const CANONICAL_RE =
	/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["'][^>]*>|<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["'][^>]*>/i;

function walkHtml(dir, files = []) {
	if (!fs.existsSync(dir)) return files;
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) walkHtml(full, files);
		else if (entry.name.endsWith('.html')) files.push(full);
	}
	return files;
}

function normalizeHref(href) {
	try {
		return new URL(href).href.replace(/\/$/, '/');
	} catch {
		return null;
	}
}

function pageUrlFromFile(file) {
	const rel = path.relative(DIST, file).replace(/\\/g, '/');
	if (rel === '404.html') return `${SITE}/404.html`;
	if (rel === 'index.html') return `${SITE}/`;
	const pathname = `/${rel.replace(/\/index\.html$/, '')}/`;
	return `${SITE}${pathname}`;
}

function main() {
	if (!fs.existsSync(DIST)) {
		console.error('[check-canonical-self] dist/ missing — run build first');
		process.exit(1);
	}

	const issues = [];
	let indexable = 0;
	let noindexCross = 0;

	for (const file of walkHtml(DIST)) {
		const html = fs.readFileSync(file, 'utf8');
		const noindex = /noindex/i.test(html);
		const match = html.match(CANONICAL_RE);
		const canonical = match?.[1] ?? match?.[2] ?? '';
		const pageUrl = pageUrlFromFile(file);
		const rel = path.relative(ROOT, file);

		if (!canonical) {
			if (!noindex) issues.push(`${rel}: missing canonical`);
			continue;
		}

		const pageNorm = normalizeHref(pageUrl);
		const canonNorm = normalizeHref(canonical);
		if (!pageNorm || !canonNorm) {
			issues.push(`${rel}: invalid canonical or page URL`);
			continue;
		}

		if (pageNorm === canonNorm) continue;

		if (noindex) {
			noindexCross++;
			continue;
		}

		indexable++;
		issues.push(`${rel}: canonical ${canonical} ≠ page ${pageUrl}`);
	}

	console.log('=== Canonical Self-Reference Check (dist/) ===');
	if (issues.length) {
		for (const issue of issues.slice(0, 40)) console.error(`✗ ${issue}`);
		if (issues.length > 40) console.error(`✗ …and ${issues.length - 40} more`);
		process.exit(1);
	}

	console.log(`✓ All indexable HTML pages self-reference in rel=canonical`);
	if (noindexCross > 0) {
		console.log(`✓ ${noindexCross} noindex page(s) with alternate canonical allowed`);
	}
}

main();
