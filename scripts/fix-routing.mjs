#!/usr/bin/env node
/** Rebuild routing.ts and constants.mjs from clea Delta Force source. */
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.resolve(ROOT, '..', 'amansand');

const REMOVE_IDS = [
	'hacks', 'cheat-download', 'mod-menu', 'soft-aim', 'best-cheats',
	'aimbot-hack', 'esp-hack', 'unlock-all',
];

const REPLACEMENTS = [
	['delta-force-esp', 'delta-force-esp'],
	['delta-force-aimbot', 'delta-force-aimbot'],
	['ace', 'ace'],
	['undetected-delta-force-cheats', 'undetected-delta-force-cheats'],
	['delta-force-wallhack', 'delta-force-wallhack'],
	['delta-force-radar-hack', 'delta-force-radar-hack'],
	['delta-force-cheats-2026', 'delta-force-cheats-2026'],
	['ace-bypass', 'ace-bypass'],
	['deltaforcecheats.org', 'deltaforcecheats.org'],
	['trucos-delta-force', 'trucos-delta-force'],
	['triche-delta-force', 'triche-delta-force'],
	['delta-force-cheats', 'delta-force-cheats'],
	['cheats-delta-force', 'cheats-delta-force'],
	['trucchi-delta-force', 'trucchi-delta-force'],
	['cheaty-delta-force', 'cheaty-delta-force'],
	['chity-delta-force', 'chity-delta-force'],
	['chitov-delta-force', 'chitov-delta-force'],
	['chitiv-delta-force', 'chitiv-delta-force'],
	['cheatow-delta-force', 'cheatow-delta-force'],
	['hile-delta-force', 'hile-delta-force'],
	['delta-force-hile', 'delta-force-hile'],
	['delta-force-esp-chity', 'delta-force-esp-chity'],
	['delta-force-aimbot-chity', 'delta-force-aimbot-chity'],
	['unentdeckte-delta-force-cheats', 'unentdeckte-delta-force-cheats'],
	['cheats-delta-force-indetectaveis', 'cheats-delta-force-indetectaveis'],
	['trucchi-delta-force-indetectabili', 'trucchi-delta-force-indetectabili'],
	['niewykrywalne-cheats-delta-force', 'niewykrywalne-cheats-delta-force'],
	['nedecektiruemye-chity-delta-force', 'nedecektiruemye-chity-delta-force'],
	['tespit-edilemeyen-delta-force-hileleri', 'tespit-edilemeyen-delta-force-hileleri'],
	['nedecektovani-chity-delta-force', 'nedecektovani-chity-delta-force'],
	['cheats-delta-force-nedetectabile', 'cheats-delta-force-nedetectabile'],
	['basta-delta-force-cheats', 'basta-delta-force-cheats'],
	['ace-bypass-trucos-delta-force', 'ace-bypass-trucos-delta-force'],
	['ace-bypass-triche-delta-force', 'ace-bypass-triche-delta-force'],
	['ace-bypass-hacks-valorant', 'ace-bypass-hacks-valorant'],
	['ace-bypass-chity-delta-force', 'ace-bypass-chity-delta-force'],
	['ace-bypass-rust', 'ace-bypass'],
];

function apply(content) {
	let r = content;
	for (const [a, b] of REPLACEMENTS) r = r.split(a).join(b);
	return r;
}

function removePageBlocks(content, pageId) {
	const keyPatterns = [
		new RegExp(`\\t${pageId.replace(/-/g, '\\-')}: \\{[\\s\\S]*?\\},\\n`, 'g'),
		new RegExp(`\\t'${pageId.replace(/-/g, '\\-')}': \\{[\\s\\S]*?\\},\\n`, 'g'),
	];
	let r = content;
	for (const p of keyPatterns) r = r.replace(p, '');
	// Remove from PageId union
	r = r.replace(new RegExp(`\\s*\\|\\s*'${pageId}'`, 'g'), '');
	// Remove from englishPaths single line
	r = r.replace(new RegExp(`\\t${pageId.replace(/-/g, '\\-')}: '[^']*',\\n`, 'g'), '');
	r = r.replace(new RegExp(`\\t'${pageId.replace(/-/g, '\\-')}': '[^']*',\\n`, 'g'), '');
	return r;
}

async function fixRouting() {
	let content = await readFile(path.join(SRC, 'src/data/i18n/routing.ts'), 'utf8');
	content = apply(content);
	for (const id of REMOVE_IDS) content = removePageBlocks(content, id);
	// Fix eac key in englishPaths
	content = content.replace(/\teac: '/, "\t'ace': '");
	await writeFile(path.join(ROOT, 'src/data/i18n/routing.ts'), content);
	console.log('Fixed routing.ts');
}

async function fixConstants() {
	const heroImages = `/** Hero image per page topic — keyword-rich delta-force-cheats paths. */
export const HERO_IMAGES = {
	home: '/images/the-delta-force-cheats-hero.webp',
	'delta-force-esp': '/images/the-delta-force-cheats-esp-wallhack.webp',
	'delta-force-aimbot': '/images/the-delta-force-cheats-aimbot-combat.webp',
	features: '/images/delta-force-cheats-package.webp',
	pricing: '/images/delta-force-cheats-cover.webp',
	setup: '/images/rust-loadout-builder.webp',
	updates: '/images/rust-header-art.webp',
	faq: '/images/rust-pack-fight.webp',
	support: '/images/delta-force-cheats-package.webp',
	undetected: '/images/rust-survival-combat.webp',
	wallhack: '/images/the-delta-force-cheats-esp-wallhack.webp',
	radar: '/images/rust-player-esp.webp',
	'ace': '/images/rust-reboot-van-fight.webp',
	'cheats-2026': '/images/the-delta-force-cheats-hero.webp',
	privacy: '/images/the-delta-force-cheats-aimbot-combat.webp',
	refund: '/images/delta-force-cheats-cover.webp',
	terms: '/images/delta-force-cheats-package.webp',
};`;

	let content = await readFile(path.join(SRC, 'scripts/i18n-data/constants.mjs'), 'utf8');
	content = apply(content);
	for (const id of REMOVE_IDS) {
		content = content.replace(new RegExp(`'${id}',\\s*`, 'g'), '');
	}
	content = content.replace(
		/export const PAGE_IDS = \[[\s\S]*?\];/,
		`export const PAGE_IDS = [\n\t'home', 'delta-force-esp', 'delta-force-aimbot', 'features', 'pricing', 'setup',\n\t'updates', 'faq', 'support', 'undetected', 'wallhack', 'radar', 'ace',\n\t'cheats-2026', 'privacy', 'refund', 'terms',\n];`,
	);
	content = content.replace(/\/\*\* Hero image[\s\S]*?};/, heroImages);
	content = content.replace(
		/export type PageId = [^;]+;/,
		"export type PageId = 'home' | 'delta-force-esp' | 'delta-force-aimbot' | 'features' | 'pricing' | 'setup' | 'updates' | 'faq' | 'support' | 'undetected' | 'wallhack' | 'radar' | 'ace' | 'cheats-2026' | 'privacy' | 'refund' | 'terms';",
	);
	content = content.replace(/operatorEsp/g, 'playerEsp');
	content = content.replace(/extractFight/g, 'raidFight');
	content = content.replace(/alMazrah/g, 'raidMap');
	await writeFile(path.join(ROOT, 'scripts/i18n-data/constants.mjs'), content);
	console.log('Fixed constants.mjs');
}

await fixRouting();
await fixConstants();
