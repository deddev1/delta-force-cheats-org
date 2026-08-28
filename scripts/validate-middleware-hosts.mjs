#!/usr/bin/env node
/**
 * Guardrail: Cloudflare Pages middleware must not treat the canonical apex as a legacy host.
 * That causes a 301 loop on every request (including /sitemap.xml) and breaks Google Search Console.
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const MIDDLEWARE = path.join(ROOT, 'functions/_middleware.js');
const BRAND = path.join(ROOT, 'src/data/brand.ts');

function readCanonicalHost() {
	const src = readFileSync(BRAND, 'utf8');
	const m = src.match(/(?:^|\n)\turl:\s*'((?:\\'|[^'])*)'/);
	if (!m) throw new Error('brand.ts missing url');
	return new URL(m[1].replace(/\\'/g, "'")).hostname.toLowerCase();
}

const apex = readCanonicalHost();
const www = `www.${apex}`;
const src = readFileSync(MIDDLEWARE, 'utf8');

const block = src.match(/const LEGACY_HOSTS = new Set\(\[([\s\S]*?)\]\);/);
if (!block) {
	console.error('[validate-middleware-hosts] Could not parse LEGACY_HOSTS in functions/_middleware.js');
	process.exit(1);
}

const hosts = [...block[1].matchAll(/'([^']+)'/g)].map((m) => m[1].toLowerCase());
const forbidden = new Set([apex, www]);
const bad = hosts.filter((h) => forbidden.has(h));

if (bad.length) {
	console.error(
		`[validate-middleware-hosts] Canonical host(s) must not be in LEGACY_HOSTS: ${bad.join(', ')}`,
	);
	process.exit(1);
}

// Simulate middleware host redirect for apex — must not redirect to itself.
const needsHostRedirect = (host) => host === www || hosts.includes(host);
if (needsHostRedirect(apex)) {
	console.error(`[validate-middleware-hosts] Apex host ${apex} would 301-loop (needsHostRedirect=true)`);
	process.exit(1);
}

console.log(`[validate-middleware-hosts] OK — ${hosts.length} legacy hosts; apex ${apex} is not redirected`);
