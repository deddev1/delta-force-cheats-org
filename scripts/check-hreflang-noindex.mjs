#!/usr/bin/env node
/**
 * Ensures hreflang annotations only reference indexable URLs.
 * Run after `npm run build`.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');

const HREFLANG_LINK_RE =
	/<link[^>]+rel=["']alternate["'][^>]+hreflang=["']([^"']+)["'][^>]+href=["']([^"']+)["'][^>]*>/gi;

function walkHtml(dir, files = []) {
	if (!fs.existsSync(dir)) return files;
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) walkHtml(full, files);
		else if (entry.name.endsWith('.html')) files.push(full);
	}
	return files;
}

function fileToPathname(file) {
	let rel = path.relative(DIST, file).replace(/\\/g, '/');
	if (rel === '404.html') return '/404.html';
	rel = rel.replace(/\/index\.html$/, '').replace(/^index\.html$/, '');
	if (!rel.startsWith('/')) rel = `/${rel}`;
	return rel.endsWith('/') ? rel : `${rel}/`;
}

function extractHreflangLinks(html) {
	const links = [];
	let m;
	const re = new RegExp(HREFLANG_LINK_RE.source, HREFLANG_LINK_RE.flags);
	while ((m = re.exec(html)) !== null) {
		links.push({ hreflang: m[1], href: m[2] });
	}
	return links;
}

function main() {
	if (!fs.existsSync(DIST)) {
		console.error('[check-hreflang-noindex] dist/ missing — run build first');
		process.exit(1);
	}

	const pages = new Map();
	for (const file of walkHtml(DIST)) {
		const html = fs.readFileSync(file, 'utf8');
		const pathname = fileToPathname(file);
		const noindex = /noindex/i.test(html);
		pages.set(pathname, {
			file: path.relative(ROOT, file),
			noindex,
			hreflang: extractHreflangLinks(html),
		});
	}

	const noindexPaths = new Set([...pages.entries()].filter(([, p]) => p.noindex).map(([p]) => p));

	const issues = [];

	for (const [fromPath, meta] of pages) {
		if (meta.noindex && meta.hreflang.length > 0) {
			issues.push(`${meta.file}: noindex page must not emit hreflang (${meta.hreflang.length} link(s))`);
		}
		if (meta.noindex) continue;
		for (const { hreflang, href } of meta.hreflang) {
			let targetPath;
			try {
				targetPath = new URL(href).pathname;
			} catch {
				issues.push(`${meta.file}: invalid hreflang href ${href}`);
				continue;
			}
			if (!targetPath.endsWith('/')) targetPath = `${targetPath}/`;
			if (targetPath === '/404.html/') targetPath = '/404.html';
			if (noindexPaths.has(targetPath)) {
				issues.push(
					`${meta.file}: hreflang=${hreflang} points at noindex URL ${targetPath}`,
				);
			}
		}
	}

	for (const name of fs.readdirSync(DIST).filter((f) => f.startsWith('sitemap') && f.endsWith('.xml'))) {
		const xml = fs.readFileSync(path.join(DIST, name), 'utf8');
		for (const m of xml.matchAll(/hreflang="([^"]+)"[^>]*href="([^"]+)"/g)) {
			const targetPath = new URL(m[2]).pathname.endsWith('/')
				? new URL(m[2]).pathname
				: `${new URL(m[2]).pathname}/`;
			if (noindexPaths.has(targetPath)) {
				issues.push(`${name}: sitemap hreflang=${m[1]} points at noindex URL ${targetPath}`);
			}
		}
	}

	console.log('=== Hreflang / Noindex Check (dist/) ===');
	if (issues.length) {
		for (const issue of issues.slice(0, 40)) console.error(`✗ ${issue}`);
		if (issues.length > 40) console.error(`✗ …and ${issues.length - 40} more`);
		process.exit(1);
	}

	console.log(`✓ ${pages.size} HTML pages — no hreflang links on noindex pages`);
	console.log('✓ No indexable page or sitemap hreflang targets a noindex URL');
}

main();
