#!/usr/bin/env node
/** Adapt pages-en.mjs and pages-i18n.mjs from Delta Force source. */
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.resolve(ROOT, '..', 'amansand');

const REMOVE_PAGE_KEYS = [
	'hacks', 'cheat-download', 'mod-menu', 'soft-aim', 'best-cheats',
	'aimbot-hack', 'esp-hack', 'unlock-all',
];

const REPLACEMENTS = [
	['delta-force-esp', 'delta-force-esp'],
	['delta-force-aimbot', 'delta-force-aimbot'],
	["'ace'", "'ace'"],
	['ace-bypass', 'ace-bypass'],
	['undetected-delta-force-cheats', 'undetected-delta-force-cheats'],
	['delta-force-wallhack', 'delta-force-wallhack'],
	['delta-force-radar-hack', 'delta-force-radar-hack'],
	['delta-force-cheats-2026', 'delta-force-cheats-2026'],
	['delta-force-cheats', 'delta-force-cheats'],
	['the-rust', 'rust'],
	['Delta Force's, 'Delta Force's],
	['Delta Force's, 'Delta Force's],
	['Delta Force Cheats', 'Delta Force Cheats'],
	['delta force cheats', 'delta force cheats'],
	['delta force cheat', 'delta force cheat'],
	['Delta Force ESP', 'Delta Force ESP'],
	['Delta Force Aimbot', 'Delta Force Aimbot'],
	['delta force wallhack', 'Delta Force wallhack'],
	['delta force radar', 'Delta Force radar'],
	['Delta Force tactical combats', 'Delta Force tactical combats'],
	['Delta Force combat', 'Delta Force combat'],
	['Delta Force patches', 'Delta Force patches'],
	['Delta Force updates', 'Delta Force updates'],
	['Delta Force setup', 'Delta Force setup'],
	['Delta Force license', 'Delta Force license'],
	['Delta Force licenses', 'Delta Force licenses'],
	['Delta Force matches', 'Delta Force matches'],
	['in Delta Force', 'in Delta Force'],
	['for Delta Force', 'for Delta Force'],
	['Delta Force on', 'Delta Force on'],
	['Delta Force or', 'Delta Force or'],
	['Delta Force\'s', 'Delta Force\'s'],
	['Delta Force ', 'Delta Force '],
	['ACE', 'ACE'],
	['ACE maintenance', 'ACE maintenance'],
	['ACE bypass', 'ACE bypass'],
	['ACE Bypass', 'ACE Bypass'],
	['ACE', 'ACE'],
	['ace', 'ace'],
	['support@deltaforcecheats.org', 'support@deltaforcecheats.org'],
	['maps, objectives, and extraction points', 'maps, objectives, and extraction points'],
	['maps, objectives and extraction points', 'maps, objectives and extraction points'],
	['raid fights', 'raid fights'],
	['raid fight', 'raid fight'],
	['match rounds', 'match rounds'],
	['extract', 'extract'],
	['players', 'players'],
	['operator', 'player'],
	['players', 'Players'],
	['Operator', 'Player'],
	['raid timer', 'raid timer'],
	['Operations and Warfare matches', 'Operations and Warfare matches'],
	['Operations and Warfare matches', 'Operations and Warfare matches'],
	['operators & ranked teams', 'operators & ranked teams'],
	['high-value loot', 'high-value loot'],
	['high-value loot', 'high-value loot'],
	['contracts', 'chests'],
	['contract', 'chest'],
	['Activision\'s', 'Epic Games\''],
	['Call of Duty combat pace', 'Delta Force combat pace'],
	['COD', 'Delta Force's],
];

function apply(content) {
	let r = content;
	for (const [a, b] of REPLACEMENTS) r = r.split(a).join(b);
	return r;
}

function removePageObjectBlocks(content) {
	let r = content;
	for (const key of REMOVE_PAGE_KEYS) {
		const quoted = `'${key}'`;
		const patterns = [
			new RegExp(`\\t${quoted}: \\{[\\s\\S]*?\\},\\n`, 'g'),
			new RegExp(`\\t${key.replace(/-/g, '\\-')}: \\{[\\s\\S]*?\\},\\n`, 'g'),
		];
		for (const p of patterns) r = r.replace(p, '');
	}
	return r;
}

async function adaptFile(rel) {
	let content = await readFile(path.join(SRC, rel), 'utf8');
	content = apply(content);
	content = removePageObjectBlocks(content);
	await writeFile(path.join(ROOT, rel), content);
	console.log('Adapted', rel);
}

await adaptFile('scripts/i18n-data/pages-en.mjs');
await adaptFile('scripts/i18n-data/pages-i18n.mjs');
await adaptFile('scripts/i18n-data/phrases.mjs');

// Patch phrases KW object
let phrases = await readFile(path.join(ROOT, 'scripts/i18n-data/phrases.mjs'), 'utf8');
phrases = phrases.replace(
	/const KW = \{[\s\S]*?\};/,
	`const KW = {
	esp: 'ESP wallhack',
	radar: 'radar hack',
	aimbot: 'Aimbot',
	product: 'Delta Force Cheats',
	game: 'Delta Force's,
	checkout: 'Zadeyo',
	eac: 'ACE',
};`,
);
phrases = phrases.replace(/KW\.eac/g, 'KW.eac');
phrases = phrases.replace(/maps: '[^']*'/g, "maps: 'maps, objectives, and extraction points'");
await writeFile(path.join(ROOT, 'scripts/i18n-data/phrases.mjs'), phrases);

console.log('Done adapting i18n pages.');
