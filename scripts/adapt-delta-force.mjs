#!/usr/bin/env node
/**
 * One-time migration: Naraka Cheats → Delta Force Cheats (deltaforcecheats.org).
 * Run from project root: node scripts/adapt-delta-force.mjs
 */
import { readFile, writeFile, readdir, rename } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const RENAME_PAGE_DIRS = [
	['naraka-aimbot', 'delta-force-aimbot'],
	['naraka-esp', 'delta-force-esp'],
	['naraka-wallhack', 'delta-force-wallhack'],
	['naraka-radar-hack', 'delta-force-radar-hack'],
	['undetected-naraka-cheats', 'undetected-delta-force-cheats'],
	['naraka-cheats-2026', 'delta-force-cheats-2026'],
	['neac-bypass', 'ace-bypass'],
	['naraka-cheats', 'delta-force-cheats'],
	['naraka-cheat-download', 'delta-force-cheat-download'],
	['naraka-mod-menu', 'delta-force-mod-menu'],
	['naraka-soft-aim', 'delta-force-soft-aim'],
	['best-naraka-cheats', 'best-delta-force-cheats'],
	['naraka-aimbot-hack', 'delta-force-aimbot-hack'],
	['naraka-esp-hack', 'delta-force-esp-hack'],
	['naraka-unlock-all', 'delta-force-unlock-all'],
];

/** Ordered replacements — specific patterns first. */
const REPLACEMENTS = [
	['https://www.narakacheats.org', 'https://www.deltaforcecheats.org'],
	['https://narakacheats.org', 'https://deltaforcecheats.org'],
	['https://narakacheats.net', 'https://deltaforcecheats.org'],
	['www.narakacheats.org', 'www.deltaforcecheats.org'],
	['narakacheats.org', 'deltaforcecheats.org'],
	['narakacheats.net', 'deltaforcecheats.org'],
	['support@narakacheats.org', 'support@deltaforcecheats.org'],
	['project-name=narakacheats', 'project-name=deltaforcecheats'],
	['name = "naraka-cheats-org"', 'name = "delta-force-cheats-org"'],
	['name = "naraka-cheats"', 'name = "delta-force-cheats"'],
	['"name": "naraka-cheats"', '"name": "delta-force-cheats"'],
	['https://store.steampowered.com/app/1203220/NARAKA_BLADEPOINT/', 'https://store.steampowered.com/app/2507950/Delta_Force/'],
	['https://store.steampowered.com/app/1203220/news/', 'https://store.steampowered.com/app/2507950/news/'],
	['https://store.steampowered.com/app/1203220', 'https://store.steampowered.com/app/2507950'],
	['https://naraka.fandom.com/wiki/NARAKA:_BLADEPOINT', 'https://deltaforce.fandom.com/wiki/Delta_Force'],
	['https://naraka.fandom.com', 'https://deltaforce.fandom.com'],
	['store.steampowered.com/app/1203220', 'store.steampowered.com/app/2507950'],
	['naraka.fandom.com', 'deltaforce.fandom.com'],
	['https://www.reddit.com/r/NARAKA/', 'https://www.reddit.com/r/DeltaForceGame/'],
	['https://x.com/narakacheats', 'https://x.com/deltaforcecheats'],
	['@narakacheats', '@deltaforcecheats'],
	['/products/naraka-bladepoint-novaxware', '/products/delta-force-novaxware'],
	['/products/naraka', '/products/delta-force'],
	['undetected-naraka-cheats', 'undetected-delta-force-cheats'],
	['best-naraka-cheats', 'best-delta-force-cheats'],
	['naraka-cheat-download', 'delta-force-cheat-download'],
	['naraka-cheats-2026', 'delta-force-cheats-2026'],
	['naraka-radar-hack', 'delta-force-radar-hack'],
	['naraka-aimbot-hack', 'delta-force-aimbot-hack'],
	['naraka-esp-hack', 'delta-force-esp-hack'],
	['naraka-unlock-all', 'delta-force-unlock-all'],
	['naraka-soft-aim', 'delta-force-soft-aim'],
	['naraka-mod-menu', 'delta-force-mod-menu'],
	['naraka-wallhack', 'delta-force-wallhack'],
	['naraka-aimbot', 'delta-force-aimbot'],
	['naraka-esp', 'delta-force-esp'],
	["'naraka-esp'", "'delta-force-esp'"],
	['"naraka-esp"', '"delta-force-esp"'],
	["'naraka-aimbot'", "'delta-force-aimbot'"],
	['"naraka-aimbot"', '"delta-force-aimbot"'],
	['naraka-cheats', 'delta-force-cheats'],
	['naraka-cheat', 'delta-force-cheat'],
	['narakaImages', 'deltaForceImages'],
	["from './naraka'", "from './delta-force'"],
	["from '../data/naraka'", "from '../data/delta-force'"],
	["from '../../data/naraka'", "from '../../data/delta-force'"],
	['fetch-naraka-images', 'fetch-delta-force-images'],
	['fetch-naraka-hero', 'fetch-delta-force-hero'],
	['import-naraka-screenshots', 'import-delta-force-screenshots'],
	['naraka-hack-overlays', 'delta-force-hack-overlays'],
	['fix-naraka-copy', 'fix-delta-force-copy'],
	['fix-naraka-content', 'fix-delta-force-content'],
	['fix-naraka-lexicon', 'fix-delta-force-lexicon'],
	['adapt-naraka', 'adapt-delta-force'],
	['rebrand-naraka-cheats', 'rebrand-delta-force-cheats'],
	['trucos-naraka', 'trucos-delta-force'],
	['triche-naraka', 'triche-delta-force'],
	['cheats-naraka', 'cheats-delta-force'],
	['trucchi-naraka', 'trucchi-delta-force'],
	['cheaty-naraka', 'cheaty-delta-force'],
	['chity-naraka', 'chity-delta-force'],
	['chitov-naraka', 'chitov-delta-force'],
	['chitiv-naraka', 'chitiv-delta-force'],
	['cheatow-naraka', 'cheatow-delta-force'],
	['hile-naraka', 'hile-delta-force'],
	['naraka-hile', 'delta-force-hile'],
	['naraka-esp-chity', 'delta-force-esp-chity'],
	['naraka-aimbot-chity', 'delta-force-aimbot-chity'],
	['unentdeckte-naraka-cheats', 'unentdeckte-delta-force-cheats'],
	['cheats-naraka-indetectaveis', 'cheats-delta-force-indetectaveis'],
	['trucchi-naraka-indetectabili', 'trucchi-delta-force-indetectabili'],
	['niewykrywalne-cheats-naraka', 'niewykrywalne-cheats-delta-force'],
	['nedecektiruemye-chity-naraka', 'nedecektiruemye-chity-delta-force'],
	['tespit-edilemeyen-naraka-hileleri', 'tespit-edilemeyen-delta-force-hileleri'],
	['nedecektovani-chity-naraka', 'nedecektovani-chity-delta-force'],
	['cheats-naraka-nedetectabile', 'cheats-delta-force-nedetectabile'],
	['basta-naraka-cheats', 'basta-delta-force-cheats'],
	['naraka-cheats-funktionen', 'delta-force-cheats-funktionen'],
	['naraka-cheats-functies', 'delta-force-cheats-functies'],
	['caracteristicas-trucos-naraka', 'caracteristicas-trucos-delta-force'],
	['fonctionnalites-triche-naraka', 'fonctionnalites-triche-delta-force'],
	['recursos-cheats-naraka', 'recursos-cheats-delta-force'],
	['maps, zones, and combat points', 'maps, objectives, and extraction points'],
	['maps, zones and combat points', 'maps, objectives and extraction points'],
	['battle royale rounds and ranked matches', 'Operations and Warfare matches'],
	['heroes & ranked teams', 'operators & ranked teams'],
	['hero markers', 'operator markers'],
	['combat zones', 'objectives and extraction points'],
	['maps and combat zones', 'maps and objectives'],
	['near combat zones and choke points', 'near objectives and choke points'],
	['grapple routes', 'extract routes'],
	['Hero and weapon ESP', 'Operator and weapon ESP'],
	['hero ESP', 'operator ESP'],
	['elimination worth the push', 'extraction worth the push'],
	['melee combat tools', 'tactical combat tools'],
	['24 Entertainment', 'Team Jade'],
	['melee combat sessions', 'tactical combat sessions'],
	['melee combat', 'tactical combat'],
	['battle royale tips', 'tactical FPS tips'],
	['map zones', 'map callouts'],
	['in combat zones', 'at objectives'],
	['NarakaCheatsSite', 'DeltaForceCheatsSite'],
	['Naraka Intel', 'Delta Force Intel'],
	['Naraka Cheats', 'Delta Force Cheats'],
	['naraka cheats', 'delta force cheats'],
	['naraka cheat', 'delta force cheat'],
	['Naraka Bladepoint Cheats', 'Delta Force Cheats'],
	['Naraka Bladepoint Hacks', 'Delta Force Hacks'],
	['Naraka Bladepoint', 'Delta Force'],
	['Naraka Hacks', 'Delta Force Hacks'],
	['Naraka ESP', 'Delta Force ESP'],
	['Naraka Aimbot', 'Delta Force Aimbot'],
	['naraka esp', 'delta force esp'],
	['naraka aimbot', 'delta force aimbot'],
	['naraka wallhack', 'delta force wallhack'],
	['naraka radar', 'delta force radar'],
	['Buy Naraka Cheats', 'Buy Delta Force Cheats'],
	['what-are-naraka-cheats', 'what-are-delta-force-cheats'],
	['are-naraka-cheats-undetected-in-2026', 'are-delta-force-cheats-undetected-in-2026'],
	['battle-royale-rounds-and-ranked-sessions', 'operations-and-warfare-sessions'],
	['what-is-a-naraka-wallhack', 'what-is-a-delta-force-wallhack'],
	['does-naraka-cheats-include-radar-hack', 'does-delta-force-cheats-include-radar-hack'],
	['neac-anti-cheat-and-naraka-cheats', 'ace-anti-cheat-and-delta-force-cheats'],
	['buy-undetected-naraka-cheats-windows-pc', 'buy-undetected-delta-force-cheats-windows-pc'],
	['naraka-soft-aim-review', 'delta-force-soft-aim-review'],
	['naraka-esp-ranked-review', 'delta-force-esp-ranked-review'],
	['naraka-cloud-dma-review', 'delta-force-cloud-dma-review'],
	['naraka-cheat-setup-review', 'delta-force-cheat-setup-review'],
	['naraka-hero-esp-review', 'delta-force-operator-esp-review'],
	['naraka-soft-aim-ranked-review', 'delta-force-soft-aim-ranked-review'],
	['naraka-radar-hack-review', 'delta-force-radar-hack-review'],
	['naraka-neac-update-review', 'delta-force-ace-update-review'],
	['naraka-melee-soft-aim-review', 'delta-force-operator-soft-aim-review'],
	['xKrypt0_Naraka', 'xKrypt0_DeltaForce'],
	['vanLifeNaraka', 'vanLifeDeltaForce'],
	['naraka-screenshot', 'delta-force-screenshot'],
	['naraka-cheats-logo', 'delta-force-cheats-logo'],
	['naraka-cheats-hero', 'delta-force-cheats-hero'],
	['naraka-hero-banner', 'delta-force-hero-banner'],
	['naraka-hero-ghost', 'delta-force-hero-ghost'],
	['naraka-hero-source', 'delta-force-hero-source'],
	['naraka-esp-player-tags', 'delta-force-esp-player-tags'],
	['naraka-wallhack-skeleton', 'delta-force-wallhack-skeleton'],
	['naraka-aimbot-skeleton', 'delta-force-aimbot-skeleton'],
	['naraka-aimbot-sniper', 'delta-force-aimbot-sniper'],
	['naraka-aimbot-melee', 'delta-force-aimbot-operator'],
	['naraka-esp-radar', 'delta-force-esp-radar'],
	['naraka-cheats-combat', 'delta-force-cheats-combat'],
	['naraka-cheats-wallhack', 'delta-force-cheats-wallhack'],
	['naraka-cheats-aimbot-view', 'delta-force-cheats-aimbot-view'],
	['naraka-cheats-aimbot', 'delta-force-cheats-aimbot'],
	['naraka-cheats-radar', 'delta-force-cheats-radar'],
	['naraka-cheats-session', 'delta-force-cheats-session'],
	['naraka-cheats-esp', 'delta-force-cheats-esp'],
	['naraka-extract-fight', 'delta-force-extract-fight'],
	['naraka-growth-run-combat', 'delta-force-operations-combat'],
	['naraka-growth-run-mode', 'delta-force-operations-mode'],
	['Naraka Features', 'Delta Force Features'],
	['Naraka Status', 'Delta Force Status'],
	['Naraka patches', 'Delta Force patches'],
	['Naraka updates', 'Delta Force updates'],
	['Naraka setup', 'Delta Force setup'],
	['Naraka license', 'Delta Force license'],
	['Naraka licenses', 'Delta Force licenses'],
	['Naraka on PC', 'Delta Force on PC'],
	['Naraka on Steam', 'Delta Force on Steam'],
	['neac-bypass', 'ace-bypass'],
	['NEAC bypass', 'ACE bypass'],
	['NEAC Bypass', 'ACE Bypass'],
	['NEAC maintenance', 'ACE maintenance'],
	['NEAC rebuilds', 'ACE rebuilds'],
	['NEAC update', 'ACE update'],
	['NEAC updates', 'ACE updates'],
	['NEAC patch', 'ACE patch'],
	['NEAC patches', 'ACE patches'],
	["'neac'", "'ace'"],
	['| neac', '| ace'],
	['neac-anti-cheat', 'ace-anti-cheat'],
	['nc_locale', 'dfc_locale'],
	['in Naraka', 'in Delta Force'],
	['for Naraka', 'for Delta Force'],
	['Naraka on', 'Delta Force on'],
	['Naraka or', 'Delta Force or'],
	["Naraka's", "Delta Force's"],
	['Naraka ', 'Delta Force '],
	['Naraka,', 'Delta Force,'],
	['Naraka.', 'Delta Force.'],
	['Naraka', 'Delta Force'],
	['NEAC', 'ACE'],
	['neac', 'ace'],
];

const TEXT_EXTENSIONS = new Set([
	'.ts', '.tsx', '.js', '.mjs', '.astro', '.css', '.json', '.toml', '.txt', '.md', '.mdc',
]);

const SKIP_DIRS = new Set(['node_modules', 'dist', '.git', '.astro', 'tmp', 'naraka-cheats-org']);
const SKIP_FILES = new Set([
	'adapt-warzone.mjs',
	'adapt-fortnite.mjs',
	'adapt-tarkov.mjs',
	'adapt-theisle.mjs',
	'adapt-rust.mjs',
	'adapt-finals.mjs',
	'adapt-valorant.mjs',
	'adapt-naraka.mjs',
	'adapt-delta-force.mjs',
]);

async function walk(dir, files = []) {
	const entries = await readdir(dir, { withFileTypes: true });
	for (const entry of entries) {
		if (SKIP_DIRS.has(entry.name)) continue;
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			await walk(full, files);
		} else {
			files.push(full);
		}
	}
	return files;
}

function applyReplacements(content) {
	let result = content;
	for (const [from, to] of REPLACEMENTS) {
		if (from === to) continue;
		result = result.split(from).join(to);
	}
	return result;
}

async function transformTextFiles() {
	const files = await walk(ROOT);
	let changed = 0;
	for (const file of files) {
		const ext = path.extname(file);
		if (!TEXT_EXTENSIONS.has(ext)) continue;
		if (SKIP_FILES.has(path.basename(file))) continue;
		const original = await readFile(file, 'utf8');
		const updated = applyReplacements(original);
		if (updated !== original) {
			await writeFile(file, updated, 'utf8');
			changed++;
		}
	}
	console.log(`Transformed ${changed} text files`);
}

async function renamePageDirs() {
	for (const [from, to] of RENAME_PAGE_DIRS) {
		const src = path.join(ROOT, 'src', 'pages', from);
		const dest = path.join(ROOT, 'src', 'pages', to);
		try {
			await rename(src, dest);
			console.log(`Renamed page: ${from} → ${to}`);
		} catch (e) {
			console.warn(`Skip rename ${from}: ${e.message}`);
		}
	}
}

async function renameDataTs() {
	const from = path.join(ROOT, 'src', 'data', 'naraka.ts');
	const to = path.join(ROOT, 'src', 'data', 'delta-force.ts');
	try {
		await rename(from, to);
		console.log('Renamed naraka.ts → delta-force.ts');
	} catch (e) {
		console.warn(`naraka.ts rename: ${e.message}`);
	}
}

async function renameScripts() {
	const pairs = [
		['fetch-naraka-images.mjs', 'fetch-delta-force-images.mjs'],
		['fetch-naraka-hero.mjs', 'fetch-delta-force-hero.mjs'],
		['import-naraka-screenshots.mjs', 'import-delta-force-screenshots.mjs'],
		['import-naraka-user-screenshots.mjs', 'import-delta-force-user-screenshots.mjs'],
		['naraka-hack-overlays.mjs', 'delta-force-hack-overlays.mjs'],
		['fix-naraka-copy.mjs', 'fix-delta-force-copy.mjs'],
		['fix-naraka-content.mjs', 'fix-delta-force-content.mjs'],
		['fix-naraka-lexicon.mjs', 'fix-delta-force-lexicon.mjs'],
		['fix-naraka-path-redirects.mjs', 'fix-delta-force-path-redirects.mjs'],
	];
	for (const [from, to] of pairs) {
		try {
			await rename(path.join(ROOT, 'scripts', from), path.join(ROOT, 'scripts', to));
			console.log(`Renamed script: ${from} → ${to}`);
		} catch (e) {
			console.warn(`Skip script rename ${from}: ${e.message}`);
		}
	}
}

async function updatePageAstroFiles() {
	const idMap = {
		'delta-force-aimbot': 'delta-force-aimbot',
		'delta-force-esp': 'delta-force-esp',
		'delta-force-wallhack': 'wallhack',
		'delta-force-radar-hack': 'radar',
		'undetected-delta-force-cheats': 'undetected',
		'delta-force-cheats-2026': 'cheats-2026',
		'ace-bypass': 'ace',
		'delta-force-cheats': 'hacks',
		'delta-force-cheat-download': 'cheat-download',
		'delta-force-mod-menu': 'mod-menu',
		'delta-force-soft-aim': 'soft-aim',
		'best-delta-force-cheats': 'best-cheats',
		'delta-force-aimbot-hack': 'aimbot-hack',
		'delta-force-esp-hack': 'esp-hack',
		'delta-force-unlock-all': 'unlock-all',
	};

	for (const [dir, pageId] of Object.entries(idMap)) {
		const file = path.join(ROOT, 'src', 'pages', dir, 'index.astro');
		try {
			const content = `---
import LocalizedPage from '../../components/LocalizedPage.astro';
---

<LocalizedPage locale="en" pageId="${pageId}" />
`;
			await writeFile(file, content, 'utf8');
		} catch {
			// ignore missing dirs
		}
	}
}

async function renameImages() {
	const imagesDir = path.join(ROOT, 'public', 'images');
	let files;
	try {
		files = await readdir(imagesDir);
	} catch {
		return;
	}
	for (const file of files) {
		if (!file.includes('naraka')) continue;
		const newName = file
			.replace(/naraka-cheats/g, 'delta-force-cheats')
			.replace(/naraka/g, 'delta-force');
		if (newName !== file) {
			try {
				await rename(path.join(imagesDir, file), path.join(imagesDir, newName));
				console.log(`Renamed image: ${file} → ${newName}`);
			} catch (e) {
				console.warn(`Skip image ${file}: ${e.message}`);
			}
		}
	}
}

async function main() {
	console.log('Adapting Naraka Cheats → Delta Force Cheats (deltaforcecheats.org)...\n');
	await renamePageDirs();
	await renameDataTs();
	await renameScripts();
	await transformTextFiles();
	await updatePageAstroFiles();
	await renameImages();
	console.log('\nDone. Next: update brand.ts, sync:brand, regenerate i18n/blog.');
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
