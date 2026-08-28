#!/usr/bin/env node
/**
 * Fix path-redirects.json: rewrite valorant destinations → delta force and add legacy valorant → delta force 301s.
 * Run: node scripts/fix-delta-force-path-redirects.mjs
 */
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PATH_REDIRECTS = path.join(ROOT, 'functions/path-redirects.json');

const SLUG_MAP = [
	['valorant-hacks', 'delta-force-cheats'],
	['valorant-esp', 'delta-force-esp'],
	['valorant-aimbot', 'delta-force-aimbot'],
	['valorant-wallhack', 'delta-force-wallhack'],
	['valorant-radar-hack', 'delta-force-radar-hack'],
	['valorant-soft-aim', 'delta-force-soft-aim'],
	['valorant-mod-menu', 'delta-force-mod-menu'],
	['valorant-cheat-download', 'delta-force-cheat-download'],
	['valorant-aimbot-hack', 'delta-force-aimbot-hack'],
	['valorant-esp-hack', 'delta-force-esp-hack'],
	['valorant-unlock-all', 'delta-force-unlock-all'],
	['undetected-valorant-hacks', 'undetected-delta-force-cheats'],
	['best-valorant-hacks', 'best-delta-force-cheats'],
	['valorant-hacks-2026', 'delta-force-cheats-2026'],
	['ace-bypass', 'ace-bypass'],
	['valorant-cheats', 'delta-force-cheats'],
	['valorant-cheat', 'delta-force-cheat'],
	['hacks-valorant', 'cheats-delta-force'],
	['valorant', 'naraka'],
];

function rewritePath(p) {
	let out = p;
	for (const [from, to] of SLUG_MAP) {
		out = out.split(from).join(to);
	}
	return out;
}

function addPair(map, from, to) {
	if (!from || !to || from === to) return;
	map[from] = to;
	const noSlash = from.replace(/\/$/, '');
	if (noSlash !== from) map[noSlash] = to;
}

const raw = JSON.parse(await readFile(PATH_REDIRECTS, 'utf8'));
const fixed = {};

for (const [key, value] of Object.entries(raw)) {
	const newKey = rewritePath(key);
	const newValue = rewritePath(value);
	addPair(fixed, newKey, newValue);
}

// Legacy valorant EN paths → naraka
const EN_REDIRECTS = [
	['/valorant-hacks', '/delta-force-cheats/'],
	['/valorant-esp', '/delta-force-esp/'],
	['/valorant-aimbot', '/delta-force-aimbot/'],
	['/valorant-wallhack', '/delta-force-wallhack/'],
	['/valorant-radar-hack', '/delta-force-radar-hack/'],
	['/valorant-soft-aim', '/delta-force-soft-aim/'],
	['/valorant-mod-menu', '/delta-force-mod-menu/'],
	['/valorant-cheat-download', '/delta-force-cheat-download/'],
	['/valorant-aimbot-hack', '/delta-force-aimbot-hack/'],
	['/valorant-esp-hack', '/delta-force-esp-hack/'],
	['/valorant-unlock-all', '/delta-force-unlock-all/'],
	['/undetected-valorant-hacks', '/undetected-delta-force-cheats/'],
	['/best-valorant-hacks', '/best-delta-force-cheats/'],
	['/valorant-hacks-2026', '/delta-force-cheats-2026/'],
	['/ace-bypass', '/ace-bypass/'],
	['/valorant-cheats', '/delta-force-cheats/'],
];

for (const [from, to] of EN_REDIRECTS) {
	addPair(fixed, from, to);
	addPair(fixed, `${from}/`, to);
}

await writeFile(PATH_REDIRECTS, `${JSON.stringify(fixed, null, 2)}\n`);
console.log(`fix-delta-force-path-redirects: ${Object.keys(fixed).length} redirect entries`);
