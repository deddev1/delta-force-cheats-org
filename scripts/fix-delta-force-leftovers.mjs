#!/usr/bin/env node
/** Second-pass cleanup after adapt-delta-force.mjs — removes Naraka leftovers. */
import { readFile, writeFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const REPLACEMENTS = [
	['https://zadeyo.com/go/QRH?to=%2Fproducts%2Fnaraka-bladepoint-novaxware', 'https://zadeyo.com/go/QRH?to=%2Fproducts%2Fdelta-force-novaxware'],
	['naraka-bladepoint-novaxware', 'delta-force-novaxware'],
	['naraka bladepoint hacks', 'delta force hacks'],
	['naraka bladepoint cheats', 'delta force cheats'],
	['Naraka bladepoint hacks', 'Delta Force hacks'],
	['Naraka bladepoint cheats', 'Delta Force cheats'],
	['naraka bladepoint hack', 'delta force hack'],
	['naraka bladepoint cheat', 'delta force cheat'],
	['naraka bladepoint', 'delta force'],
	['Bladepoint Hacks', 'Delta Force Hacks'],
	['Bladepoint', 'Delta Force'],
	['naraka soft aim', 'delta force soft aim'],
	['naraka ace bypass', 'delta force ace bypass'],
	['naraka mod menu', 'delta force mod menu'],
	['naraka external cheat', 'delta force external cheat'],
	['naraka 2d radar', 'delta force 2d radar'],
	['soft aim naraka', 'soft aim delta force'],
	['ace bypass naraka', 'ace bypass delta force'],
	['naraka anti cheat bypass', 'delta force anti cheat bypass'],
	['hwid spoofer naraka', 'hwid spoofer delta force'],
	['naraka hacks', 'delta force hacks'],
	['naraka-ace-bypass', 'delta-force-ace-bypass'],
	['naraka-ace-update', 'delta-force-ace-update'],
	['naraka-patch-notes', 'delta-force-patch-notes'],
	['naraka-cosmetics', 'delta-force-cosmetics'],
	['naraka-weapon-tier-list', 'delta-force-weapon-tier-list'],
	['naraka-loot-run-strategies', 'delta-force-loot-run-strategies'],
	['naraka-loot-routes-guide', 'delta-force-loot-routes-guide'],
	['naraka-pro-settings-guide', 'delta-force-pro-settings-guide'],
	['naraka-growth-run-meta', 'delta-force-operations-meta'],
	['naraka-skin-leaks', 'delta-force-skin-leaks'],
	['naraka-patch-notes-guide', 'delta-force-patch-notes-guide'],
	['naraka weapon builds', 'delta force weapon builds'],
	['naraka meta loadouts', 'delta force meta loadouts'],
	['best naraka weapons', 'best delta force weapons'],
	['ranked & Showdown', 'Operations & Warfare'],
	['ranked and Showdown', 'Operations and Warfare'],
	['Showdown on PC', 'Warfare on PC'],
	['Showdown use', 'Warfare use'],
	['hero tiers', 'operator tiers'],
	['hero esp', 'operator esp'],
	['Hero ESP', 'Operator ESP'],
	['enemy heroes', 'enemy operators'],
	['hero skill markers', 'operator loadout markers'],
	['hero markers', 'operator markers'],
	['Hero markers', 'Operator markers'],
	['melee holds', 'CQB holds'],
	['melee main', 'CQB main'],
	['Melee Soft Aim', 'CQB Soft Aim'],
	['melee soft aim', 'cqb soft aim'],
	['katana vs spear', 'SMG vs AR'],
	['asura lobbies', 'ranked lobbies'],
	['asura ranked', 'ranked Warfare'],
	['tian cheng', 'Zero Dam'],
	['yushan', 'Layali Grove'],
	['mori', 'Space City'],
	['huachi', 'Zero Dam'],
	['fushan', 'Layali Grove'],
	['vanLifeNaraka', 'vanLifeDeltaForce'],
	['vanlifenaraka', 'vanlifedeltaforce'],
	['growth-run', 'operations'],
	['Growth Run', 'Operations'],
	['farming-run', 'operations'],
	['https://www.narakathegame.com/', 'https://www.playdeltaforce.com/'],
	['https://www.naraka.com/en/', 'https://www.playdeltaforce.com/'],
	['https://steamcommunity.com/app/1203220', 'https://steamcommunity.com/app/2507950'],
	['meilleures-triches-naraka', 'meilleures-triches-delta-force'],
	['EXT.naraka', 'EXT.game'],
	["naraka:\n\t\t'", "game:\n\t\t'"],
	['Riot\'s hardware flags', 'Team Jade\'s hardware flags'],
	['Riot Games', 'Team Jade'],
	['mapy and loot', 'Maps and loot'],
	['Team Jade\' anti-cheat', 'Team Jade\'s anti-cheat'],
	['"naraka" "submit a guest post"', '"delta force" "submit a guest post"'],
	['naraka/', 'delta-force/'],
	['naraka-', 'delta-force-'],
	['Naraka ', 'Delta Force '],
	['Naraka,', 'Delta Force,'],
	['Naraka.', 'Delta Force.'],
	['Naraka', 'Delta Force'],
	['naraka ', 'delta force '],
	['narakacheats', 'deltaforcecheats'],
];

const SKIP_DIRS = new Set(['node_modules', 'dist', '.git', '.astro', 'tmp']);
const SKIP_FILES = new Set(['fix-delta-force-leftovers.mjs', 'adapt-delta-force.mjs', 'adapt-naraka.mjs', 'package-lock.json']);

const TEXT_EXT = new Set(['.ts', '.tsx', '.js', '.mjs', '.astro', '.css', '.json', '.toml', '.txt', '.md', '.mdc', '.svg']);

async function walk(dir, files = []) {
	for (const entry of await readdir(dir, { withFileTypes: true })) {
		if (SKIP_DIRS.has(entry.name)) continue;
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) await walk(full, files);
		else files.push(full);
	}
	return files;
}

let changed = 0;
for (const file of await walk(ROOT)) {
	if (SKIP_FILES.has(path.basename(file))) continue;
	if (!TEXT_EXT.has(path.extname(file))) continue;
	const original = await readFile(file, 'utf8');
	let updated = original;
	for (const [from, to] of REPLACEMENTS) {
		if (from === to) continue;
		updated = updated.split(from).join(to);
	}
	if (updated !== original) {
		await writeFile(file, updated, 'utf8');
		changed++;
	}
}
console.log(`Fixed ${changed} files`);
