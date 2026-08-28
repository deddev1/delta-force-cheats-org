#!/usr/bin/env node
/**
 * Locale blog URLs 301 to English blog (Worker runtime — no HTML redirect stubs in dist).
 */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const POSTS = path.join(ROOT, 'src/data/blog/posts.generated.ts');
const LOCALES = path.join(ROOT, 'src/data/i18n/locales.ts');
const JSON_OUT = path.join(ROOT, 'functions/locale-blog-redirects.json');

function readLocaleCodes() {
	const src = readFileSync(LOCALES, 'utf8');
	const codes = [...src.matchAll(/code:\s*'([a-z]{2})'/g)].map((m) => m[1]);
	if (codes.length < 2) throw new Error('locale codes missing in locales.ts');
	return [...new Set(codes)];
}

function readEnglishBlogSlugs() {
	const src = readFileSync(POSTS, 'utf8');
	const slugs = [];
	for (const block of src.matchAll(/en:\s*\{[\s\S]*?slug:\s*["']([^"']+)["']/g)) {
		slugs.push(block[1]);
	}
	if (!slugs.length) throw new Error('No English blog slugs parsed from posts.generated.ts');
	return slugs;
}

const localeCodes = readLocaleCodes();
const defaultLocale = 'en';
const blogSlugs = readEnglishBlogSlugs();
const map = {};

for (const locale of localeCodes) {
	if (locale === defaultLocale) continue;
	map[`/${locale}/blog/`] = '/blog/';
	map[`/${locale}/blog`] = '/blog/';
	for (const slug of blogSlugs) {
		map[`/${locale}/blog/${slug}/`] = `/blog/${slug}/`;
		map[`/${locale}/blog/${slug}`] = `/blog/${slug}/`;
	}
}

writeFileSync(JSON_OUT, `${JSON.stringify(map, null, 2)}\n`);
console.log(
	`Synced ${Object.keys(map).length / 2} locale blog redirect pairs → functions/locale-blog-redirects.json`,
);
