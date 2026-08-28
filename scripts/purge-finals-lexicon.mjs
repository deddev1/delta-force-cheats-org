#!/usr/bin/env node
/**
 * Purge Rust / wrong-game lexicon from EN sources and i18n translation overlays.
 * Run: node scripts/purge-finals-lexicon.mjs
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/** @type {Array<[RegExp|string, string]>} */
const replacements = [
	['published by Facepunch', 'published by Team Jade'],
	['published by Facepunch', 'published by Team Jade'],
	['When Facepunch ships', 'When Team Jade ships'],
	['Player, apex, and vault', 'Player, objective, and vault'],
	['apex and base awareness', 'objective and vault awareness'],
	['players, scientists, and loot', 'players, objects, and loot'],
	['Boxes, distance, and filters for players, scientists, and loot.', 'Boxes, distance, and filters for players, objects, and loot.'],
	['See players, scientists, and loot through walls', 'See players, objects, and loot through walls'],
	['monument zones, compounds, and high-traffic PvP areas', 'arena zones, vault sectors, and high-traffic PvP areas'],
	['monument zones and loot runs', 'arena sectors and extract routes'],
	['Clear monument zones and loot runs', 'Clear arena sectors and extract routes'],
	['Heli and Bradley filters', 'Objective and vehicle filters'],
	['compound zone fights', 'zone fights'],
	['compound fights', 'zone fights'],
	['forest and monument edge ambushes', 'arena corners and vertical fights'],
	['hills, forests, and monument edges', 'arenas, rooftops, and vertical routes'],
	['survival tactical combats happen across open terrain', 'Map fights happen across open terrain'],
	['loot run', 'cashout route'],
	['loot runs', 'extract routes'],
	['scientists', 'contestants'],
	['Bradley', 'objective'],
	['monumentos', 'sectores de arena'],
	['monuments', 'arena sectors'],
	['monument', 'arena sector'],
	['compounds', 'vault sectors'],
	['compound', 'zone'],
];

const targets = [
	path.join(ROOT, 'scripts', 'i18n-data', 'pages-en.mjs'),
	path.join(ROOT, 'scripts', 'i18n-data', 'simple-pages-en.mjs'),
	path.join(ROOT, 'scripts', 'i18n-data', 'simple-pages-i18n.mjs'),
	path.join(ROOT, 'scripts', 'i18n-data', 'simple-page-content-translations-rest.mjs'),
	path.join(ROOT, 'scripts', 'i18n-data', 'simple-page-content.mjs'),
	path.join(ROOT, 'scripts', 'i18n-data', 'faq-i18n.mjs'),
	path.join(ROOT, 'src', 'data', 'i18n', 'gallery-ui.ts'),
];

let totalHits = 0;
for (const file of targets) {
	let src = readFileSync(file, 'utf8');
	let hits = 0;
	for (const [from, to] of replacements) {
		if (typeof from === 'string') {
			if (!src.includes(from)) continue;
			const count = src.split(from).length - 1;
			src = src.split(from).join(to);
			hits += count;
		} else {
			const next = src.replace(from, to);
			if (next !== src) {
				hits += (src.match(from) ?? []).length;
				src = next;
			}
		}
	}
	if (hits > 0) {
		writeFileSync(file, src);
		console.log(`${path.relative(ROOT, file)}: ${hits} replacements`);
		totalHits += hits;
	}
}

console.log(`Total: ${totalHits} replacements`);

const gen = spawnSync(process.execPath, [path.join(ROOT, 'scripts', 'generate-i18n-content.mjs')], {
	cwd: ROOT,
	stdio: 'inherit',
});
if (gen.status !== 0) process.exit(gen.status ?? 1);
console.log('Regenerated content.generated.ts');
