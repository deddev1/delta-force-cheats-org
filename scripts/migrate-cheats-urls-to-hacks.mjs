#!/usr/bin/env node
/**
 * Migrate URL slugs from delta-force-cheats → delta-force-cheats (paths + sitemaps).
 * Generates 301 redirects in functions/path-redirects.json from old routing slugs.
 * Run: node scripts/migrate-cheats-urls-to-hacks.mjs
 */
import { readFile, writeFile, readdir, rename, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ROUTING = path.join(ROOT, 'src/data/i18n/routing.ts');
const PATH_REDIRECTS = path.join(ROOT, 'functions/path-redirects.json');

const SKIP_DIRS = new Set([
	'node_modules',
	'dist',
	'.git',
	'tmp',
	'.astro',
	'the-finals-cheats-org',
	'delta-force-cheats-org-audit',
]);
const SKIP_FILES = new Set(['package-lock.json', 'migrate-cheats-urls-to-hacks.mjs']);

/** Ordered — longest / most specific first. Image asset names are excluded via guard. */
const SLUG_REPLACEMENTS = [
	['undetected-delta-force-cheats-eac', 'undetected-delta-force-cheats-eac'],
	['undetected-delta-force-cheats', 'undetected-delta-force-cheats'],
	['unentdeckte-delta-force-cheats', 'unentdeckte-delta-force-cheats'],
	['buy-undetected-delta-force-cheats-windows-pc', 'buy-undetected-delta-force-cheats-windows-pc'],
	['ace-anti-cheat-and-delta-force-cheats', 'ace-anti-cheat-and-delta-force-cheats'],
	['are-delta-force-cheats-undetected-in-2026', 'are-delta-force-cheats-undetected-in-2026'],
	['what-are-delta-force-cheats', 'what-are-delta-force-cheats'],
	['does-delta-force-cheats-include-radar-hack', 'does-delta-force-cheats-include-radar-hack'],
	['delta-force-cheats-vs-ghostware-features-pricing', 'delta-force-cheats-vs-ghostware-features-pricing'],
	['delta-force-cheats-vs-cheatvault-comparison', 'delta-force-cheats-vs-cheatvault-comparison'],
	['elitefn-vs-delta-force-cheats-two-week-test', 'elitefn-vs-delta-force-cheats-two-week-test'],
	['delta-force-cheats-complete-guide-2026', 'delta-force-cheats-complete-guide-2026'],
	['delta-force-cheats-2026-whats-new', 'delta-force-cheats-2026-whats-new'],
	['delta-force-cheats-buyers-guide', 'delta-force-cheats-buyers-guide'],
	['best-delta-force-cheats', 'best-delta-force-cheats'],
	['beste-delta-force-cheats', 'beste-delta-force-cheats'],
	['basta-delta-force-cheats', 'basta-delta-force-cheats'],
	['nejlepsi-delta-force-cheats', 'nejlepsi-delta-force-cheats'],
	['delta-force-cheats-2026', 'delta-force-cheats-2026'],
	['delta-force-cheats-funktionen', 'delta-force-cheats-funktionen'],
	['delta-force-cheats-functies', 'delta-force-cheats-functies'],
	['delta-force-cheats-funkce', 'delta-force-cheats-funkce'],
	['delta-force-cheats-funktioner', 'delta-force-cheats-funktioner'],
	['delta-force-cheats-features', 'delta-force-cheats-features'],
	['delta-force-cheats-preise', 'delta-force-cheats-preise'],
	['delta-force-cheats-prijzen', 'delta-force-cheats-prijzen'],
	['delta-force-cheats-priser', 'delta-force-cheats-priser'],
	['delta-force-cheats-pricing', 'delta-force-cheats-pricing'],
	['delta-force-cheats-ceny', 'delta-force-cheats-ceny'],
	['delta-force-cheats-installation', 'delta-force-cheats-installation'],
	['delta-force-cheats-installatie', 'delta-force-cheats-installatie'],
	['delta-force-cheats-instalace', 'delta-force-cheats-instalace'],
	['delta-force-cheats-setup', 'delta-force-cheats-setup'],
	['delta-force-cheats-updates', 'delta-force-cheats-updates'],
	['delta-force-cheats-uppdateringar', 'delta-force-cheats-uppdateringar'],
	['delta-force-cheats-aktualizace', 'delta-force-cheats-aktualizace'],
	['delta-force-cheats-faq', 'delta-force-cheats-faq'],
	['delta-force-cheats-support', 'delta-force-cheats-support'],
	['delta-force-cheats-podpora', 'delta-force-cheats-podpora'],
	['niewykrywalne-cheats-delta-force', 'niewykrywalne-cheats-delta-force'],
	['najlepsze-cheats-delta-force', 'najlepsze-hacks-valorant'],
	['melhores-cheats-delta-force', 'melhores-hacks-valorant'],
	['cele-mai-bune-cheats-delta-force', 'cele-mai-bune-hacks-valorant'],
	['cheats-delta-force-indetectaveis', 'cheats-delta-force-indetectaveis'],
	['cheats-delta-force-nedetectabile', 'cheats-delta-force-nedetectabile'],
	['cheats-delta-force-2026', 'hacks-valorant-2026'],
	['hacks-cheats-delta-force', 'hacks-valorant'],
	['faq-cheats-delta-force', 'faq-hacks-valorant'],
	['functii-cheats-delta-force', 'functii-hacks-valorant'],
	['preturi-cheats-delta-force', 'preturi-hacks-valorant'],
	['actualizari-cheats-delta-force', 'actualizari-hacks-valorant'],
	['instalare-cheats-delta-force', 'instalare-hacks-valorant'],
	['suport-cheats-delta-force', 'suport-hacks-valorant'],
	['recursos-cheats-delta-force', 'recursos-cheats-delta-force'],
	['precos-cheats-delta-force', 'precos-hacks-valorant'],
	['atualizacoes-cheats-delta-force', 'atualizacoes-hacks-valorant'],
	['instalacao-cheats-delta-force', 'instalacao-hacks-valorant'],
	['suporte-cheats-delta-force', 'suporte-hacks-valorant'],
	['download-cheats-delta-force', 'download-hacks-valorant'],
	['menu-mod-cheats-delta-force', 'menu-mod-hacks-valorant'],
	['meniu-mod-cheats-delta-force', 'meniu-mod-hacks-valorant'],
	['soft-aim-cheats-delta-force', 'soft-aim-hacks-valorant'],
	['aimbot-hack-cheats-delta-force', 'aimbot-hack-hacks-valorant'],
	['esp-hack-cheats-delta-force', 'esp-hack-hacks-valorant'],
	['unlock-all-cheats-delta-force', 'unlock-all-hacks-valorant'],
	['wallhack-cheats-delta-force', 'wallhack-hacks-valorant'],
	['radar-hack-cheats-delta-force', 'radar-hack-hacks-valorant'],
	['descarcare-cheats-delta-force', 'descarcare-hacks-valorant'],
	['cheats-delta-force-esp', 'hacks-delta-force-esp'],
	['cheats-delta-force-aimbot', 'hacks-delta-force-aimbot'],
	['ace-bypass-cheats', 'ace-bypass-hacks'],
	['/delta-force-cheats/', '/delta-force-cheats/'],
	['/delta-force-cheats', '/delta-force-cheats'],
	["'delta-force-cheats'", "'delta-force-cheats'"],
	['"delta-force-cheats"', '"delta-force-cheats"'],
];

const IMAGE_ASSET_PREFIX = '/images/delta-force-cheats';

function applySlugReplacements(text) {
	let out = text;
	for (const [from, to] of SLUG_REPLACEMENTS) {
		if (!out.includes(from)) continue;
		out = out
			.split('\n')
			.map((line) => {
				// Never rewrite static image asset filenames.
				if (line.includes('/images/delta-force-cheats')) {
					return line;
				}
				return line.split(from).join(to);
			})
			.join('\n');
	}
	return out;
}

function parseEnglishPaths(src) {
	const block = src.match(/export const englishPaths[\s\S]*?=\s*\{([\s\S]*?)\n\};/);
	if (!block) throw new Error('englishPaths block not found');
	/** @type {Record<string, string>} */
	const paths = {};
	for (const row of block[1].matchAll(/\t(?:'([^']+)'|(\w+)):\s*'([^']*)',/g)) {
		paths[row[1] ?? row[2]] = row[3];
	}
	return paths;
}

function parseLocalizedSlugs(src) {
	const localized = src.slice(src.indexOf('export const localizedSlugs'));
	/** @type {Record<string, Record<string, string>>} */
	const slugs = {};
	for (const block of localized.matchAll(/\t(?:'([^']+)'|(\w+)):\s*\{([\s\S]*?)\n\t\},/g)) {
		const pageId = block[1] ?? block[2];
		slugs[pageId] = {};
		for (const row of block[3].matchAll(/\t(\w+):\s*'([^']*)',/g)) {
			slugs[pageId][row[1]] = row[2];
		}
	}
	return slugs;
}

function localePath(locale, slug) {
	return slug ? `/${locale}/${slug}/` : `/${locale}/`;
}

function addRedirectPair(map, fromPath, toPath) {
	if (!fromPath || !toPath || fromPath === toPath) return;
	map[fromPath] = toPath;
	const noSlash = fromPath.replace(/\/$/, '');
	if (noSlash !== fromPath) map[noSlash] = toPath;
}

async function walk(dir, files = []) {
	const entries = await readdir(dir, { withFileTypes: true });
	for (const entry of entries) {
		if (SKIP_DIRS.has(entry.name)) continue;
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) await walk(full, files);
		else files.push(full);
	}
	return files;
}

function shouldProcess(file) {
	const rel = path.relative(ROOT, file);
	if (SKIP_FILES.has(path.basename(file))) return false;
	if (rel.startsWith('public/images/')) return false;
	if (/\.(png|jpg|jpeg|webp|gif|ico|woff2?|mp4)$/i.test(file)) return false;
	return true;
}

const DIR_RENAMES = [
	['src/pages/delta-force-cheats', 'src/pages/delta-force-cheats'],
	['src/pages/best-delta-force-cheats', 'src/pages/best-delta-force-cheats'],
	['src/pages/undetected-delta-force-cheats', 'src/pages/undetected-delta-force-cheats'],
	['src/pages/delta-force-cheats-2026', 'src/pages/delta-force-cheats-2026'],
];

// --- Parse routing before migration ---
const routingBefore = await readFile(ROUTING, 'utf8');
const englishBefore = parseEnglishPaths(routingBefore);
const slugsBefore = parseLocalizedSlugs(routingBefore);

// --- Apply text replacements across repo ---
let changed = 0;
const files = await walk(ROOT);
for (const file of files) {
	if (!shouldProcess(file)) continue;
	const original = await readFile(file, 'utf8');
	const updated = applySlugReplacements(original);
	if (updated !== original) {
		await writeFile(file, updated, 'utf8');
		changed++;
	}
}

// Fix duplicate check in routing.ts
let routing = await readFile(ROUTING, 'utf8');
routing = routing.replace(
	"if (withSlash === '/delta-force-cheats/' || withSlash === '/delta-force-cheats/')",
	"if (withSlash === '/delta-force-cheats/' || withSlash === '/delta-force-cheats/')",
);
await writeFile(ROUTING, routing, 'utf8');

// --- Rename page directories ---
for (const [fromRel, toRel] of DIR_RENAMES) {
	const from = path.join(ROOT, fromRel);
	const to = path.join(ROOT, toRel);
	try {
		await access(from);
		await rename(from, to);
		console.log(`renamed ${fromRel} → ${toRel}`);
	} catch {
		// already migrated
	}
}

// --- Build redirects from slug diff ---
const routingAfter = await readFile(ROUTING, 'utf8');
const englishAfter = parseEnglishPaths(routingAfter);
const slugsAfter = parseLocalizedSlugs(routingAfter);

const existingRedirects = JSON.parse(await readFile(PATH_REDIRECTS, 'utf8'));
const newRedirects = { ...existingRedirects };

for (const [pageId, oldPath] of Object.entries(englishBefore)) {
	const newPath = englishAfter[pageId];
	if (oldPath && newPath && oldPath !== newPath) {
		addRedirectPair(newRedirects, oldPath.replace(/\/$/, ''), newPath);
		addRedirectPair(newRedirects, oldPath, newPath);
	}
}

for (const [pageId, localeMap] of Object.entries(slugsBefore)) {
	const afterMap = slugsAfter[pageId] ?? {};
	for (const [locale, oldSlug] of Object.entries(localeMap)) {
		const newSlug = afterMap[locale];
		if (oldSlug === newSlug) continue;
		const from = localePath(locale, oldSlug);
		const to = localePath(locale, newSlug);
		addRedirectPair(newRedirects, from, to);
	}
}

await writeFile(PATH_REDIRECTS, `${JSON.stringify(newRedirects, null, 2)}\n`);

console.log(`\nmigrate-cheats-urls-to-hacks: ${changed} file(s) updated`);
console.log(
	`Added/updated ${Object.keys(newRedirects).length - Object.keys(existingRedirects).length} redirect entries in path-redirects.json`,
);
