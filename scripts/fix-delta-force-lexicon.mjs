#!/usr/bin/env node
/**
 * Final-pass Delta Force lexicon cleanup — removes leftover Valorant/Vanguard strings.
 * Run: node scripts/fix-delta-force-lexicon.mjs
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const SKIP_DIRS = new Set(['node_modules', 'dist', '.git', 'tmp', '.astro', 'valorant-hacks-org']);

/** Ordered — specific patterns first. */
const REPLACEMENTS = [
	['valorant vanguard bypass', 'delta force ace bypass'],
	['valorant soft aim', 'delta force soft aim'],
	['valorant mod menu', 'delta force mod menu'],
	['valorant external hack', 'delta force external cheat'],
	['valorant 2d radar', 'delta force 2d radar'],
	['soft aim valorant', 'soft aim delta force'],
	['vanguard bypass valorant', 'ace bypass delta force'],
	['valorant anti cheat bypass', 'delta force anti cheat bypass'],
	['hwid spoofer valorant', 'hwid spoofer delta force'],
	['vanguard update', 'ACE update'],
	['vanguard undetected', 'ACE undetected'],
	['Vanguard Safe', 'ACE Safe'],
	['Vanguard maintenance', 'ACE maintenance'],
	['Vanguard rebuilds', 'ACE rebuilds'],
	['Vanguard patches', 'ACE patches'],
	['Vanguard and Delta Force', 'ACE and Delta Force'],
	['Vanguard or Delta Force', 'ACE or Delta Force'],
	['Vanguard', 'ACE'],
	['vanguard', 'ace'],
	['vanlifevalorant', 'vanlifedeltaforce'],
	['vanLifeValorant', 'vanLifeDeltaForce'],
	['valo hack', 'delta force cheat'],
	['valo cheats', 'delta force cheats'],
	['valorant-patch-notes', 'delta-force-patch-notes'],
	['valorant-cosmetics', 'delta-force-cosmetics'],
	['valorant-weapon-tier-list', 'delta-force-weapon-tier-list'],
	['valorant-loot-run', 'delta-force-loot-run'],
	['valorant-competitive-meta', 'delta-force-competitive-meta'],
	['valorant-cashout-routes', 'delta-force-loot-routes'],
	['valorant-pro-settings', 'delta-force-pro-settings'],
	['valorant-warmup-routine', 'delta-force-warmup-routine'],
	['free-valorant-hack-download', 'free-delta-force-cheat-download'],
	['how-long-valorant-hack-setup-takes', 'how-long-delta-force-cheat-setup-takes'],
	['agent tiers', 'operator tiers'],
	['agents and abilities', 'heroes and weapons'],
	['agents &', 'heroes &'],
	['agent ESP', 'operator ESP'],
	['agent markers', 'operator markers'],
	['internalLinks.vanguard', 'internalLinks.ace'],
	['Delta Force hacks', 'Delta Force cheats'],
	['delta force hacks', 'delta force cheats'],
	['delta force hack', 'delta force cheat'],
	['{game} hacks', '{game} cheats'],
	['Hacks FAQ', 'Cheats FAQ'],
	['navPreview: \'Hacks\'', "navPreview: 'Cheats'"],
	["navPreview: 'Hacks'", "navPreview: 'Cheats'"],
	['/products/valorant', '/products/delta-force'],
	['valo/valo cheats', 'delta-force/delta force cheats'],
	['antiCheat: \'Vanguard\'', "antiCheat: 'ACE'"],
	['sitemap-meta.ts', 'sitemap-meta.ts'], // noop anchor
];

function walk(dir, files = []) {
	for (const name of readdirSync(dir)) {
		if (SKIP_DIRS.has(name)) continue;
		const full = path.join(dir, name);
		if (statSync(full).isDirectory()) walk(full, files);
		else files.push(full);
	}
	return files;
}

const TEXT_EXT = /\.(ts|tsx|js|mjs|astro|css|json|toml|txt|md|mdc)$/i;
let changed = 0;

for (const file of walk(ROOT)) {
	if (!TEXT_EXT.test(file)) continue;
	if (path.basename(file) === 'fix-delta-force-lexicon.mjs') continue;
	if (path.basename(file) === 'adapt-delta-force.mjs') continue;
	if (path.basename(file) === 'adapt-valorant.mjs') continue;
	let text = readFileSync(file, 'utf8');
	const original = text;
	for (const [from, to] of REPLACEMENTS) {
		if (from === to) continue;
		text = text.split(from).join(to);
	}
	if (text !== original) {
		writeFileSync(file, text, 'utf8');
		changed++;
	}
}

console.log(`fix-delta-force-lexicon: ${changed} file(s) updated`);
