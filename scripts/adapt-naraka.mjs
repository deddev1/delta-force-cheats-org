#!/usr/bin/env node
/**
 * One-time migration: Valorant Hacks → Naraka Cheats (narakacheats.org).
 * Run from project root: node scripts/adapt-naraka.mjs
 */
import { readFile, writeFile, readdir, rename } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const RENAME_PAGE_DIRS = [
	['valorant-aimbot', 'naraka-aimbot'],
	['valorant-esp', 'naraka-esp'],
	['valorant-wallhack', 'naraka-wallhack'],
	['valorant-radar-hack', 'naraka-radar-hack'],
	['undetected-valorant-hacks', 'undetected-naraka-cheats'],
	['valorant-hacks-2026', 'naraka-cheats-2026'],
	['ace-bypass', 'neac-bypass'],
	['valorant-hacks', 'naraka-cheats'],
	['valorant-cheat-download', 'naraka-cheat-download'],
	['valorant-mod-menu', 'naraka-mod-menu'],
	['valorant-soft-aim', 'naraka-soft-aim'],
	['best-valorant-hacks', 'best-naraka-cheats'],
	['valorant-aimbot-hack', 'naraka-aimbot-hack'],
	['valorant-esp-hack', 'naraka-esp-hack'],
	['valorant-unlock-all', 'naraka-unlock-all'],
];

/** Ordered replacements — specific patterns first. */
const REPLACEMENTS = [
	['https://www.valoranthacks.org', 'https://www.narakacheats.org'],
	['https://valoranthacks.org', 'https://narakacheats.org'],
	['https://www.valorantcheats.org', 'https://www.narakacheats.org'],
	['https://valorantcheats.org', 'https://narakacheats.org'],
	['www.valoranthacks.org', 'www.narakacheats.org'],
	['www.valorantcheats.org', 'www.narakacheats.org'],
	['valoranthacks.org', 'narakacheats.org'],
	['valorantcheats.org', 'narakacheats.org'],
	['support@valoranthacks.org', 'support@narakacheats.org'],
	['support@valorantcheats.org', 'support@narakacheats.org'],
	['project-name=valoranthacks', 'project-name=narakacheats'],
	['name = "valorant-hacks-org"', 'name = "naraka-cheats-org"'],
	['name = "valoranthacks"', 'name = "naraka-cheats-org"'],
	['"name": "valorant-hacks"', '"name": "naraka-cheats"'],
	['https://playvalorant.com/en-us/news/', 'https://store.steampowered.com/app/1203220/news/'],
	['https://playvalorant.com/', 'https://store.steampowered.com/app/1203220/NARAKA_BLADEPOINT/'],
	['https://playvalorant.com', 'https://store.steampowered.com/app/1203220'],
	['https://valorant.fandom.com/wiki/VALORANT', 'https://naraka.fandom.com/wiki/NARAKA:_BLADEPOINT'],
	['https://valorant.fandom.com', 'https://naraka.fandom.com'],
	['playvalorant.com', 'store.steampowered.com/app/1203220'],
	['valorant.fandom.com', 'naraka.fandom.com'],
	['https://www.reddit.com/r/VALORANT/', 'https://www.reddit.com/r/NARAKA/'],
	['https://x.com/valoranthacks', 'https://x.com/narakacheats'],
	['@valoranthacks', '@narakacheats'],
	['/products/delta-force', '/products/naraka'],
	['undetected-valorant-hacks', 'undetected-naraka-cheats'],
	['best-valorant-hacks', 'best-naraka-cheats'],
	['valorant-cheat-download', 'naraka-cheat-download'],
	['valorant-hacks-2026', 'naraka-cheats-2026'],
	['valorant-radar-hack', 'naraka-radar-hack'],
	['valorant-aimbot-hack', 'naraka-aimbot-hack'],
	['valorant-esp-hack', 'naraka-esp-hack'],
	['valorant-unlock-all', 'naraka-unlock-all'],
	['valorant-soft-aim', 'naraka-soft-aim'],
	['valorant-mod-menu', 'naraka-mod-menu'],
	['valorant-wallhack', 'naraka-wallhack'],
	['valorant-aimbot', 'naraka-aimbot'],
	['valorant-esp', 'naraka-esp'],
	["'valorant-esp'", "'naraka-esp'"],
	['"valorant-esp"', '"naraka-esp"'],
	["'valorant-aimbot'", "'naraka-aimbot'"],
	['"valorant-aimbot"', '"naraka-aimbot"'],
	['valorant-hacks', 'naraka-cheats'],
	['valorant-cheat', 'naraka-cheat'],
	['valorantImages', 'narakaImages'],
	["from './valorant'", "from './naraka'"],
	["from '../data/valorant'", "from '../data/naraka'"],
	["from '../../data/valorant'", "from '../../data/naraka'"],
	['fetch-valorant-images', 'fetch-naraka-images'],
	['fetch-valorant-hero', 'fetch-naraka-hero'],
	['import-valorant-screenshots', 'import-naraka-screenshots'],
	['valorant-hack-overlays', 'naraka-hack-overlays'],
	['fix-valorant-copy', 'fix-naraka-copy'],
	['fix-valorant-content', 'fix-naraka-content'],
	['fix-valorant-lexicon', 'fix-naraka-lexicon'],
	['adapt-valorant', 'adapt-naraka'],
	['rebrand-valorant-hacks', 'rebrand-naraka-cheats'],
	['trucos-valorant', 'trucos-naraka'],
	['triche-valorant', 'triche-naraka'],
	['cheats-valorant', 'cheats-naraka'],
	['trucchi-valorant', 'trucchi-naraka'],
	['cheaty-valorant', 'cheaty-naraka'],
	['chity-valorant', 'chity-naraka'],
	['chitov-valorant', 'chitov-naraka'],
	['chitiv-valorant', 'chitiv-naraka'],
	['cheatow-valorant', 'cheatow-naraka'],
	['hile-valorant', 'hile-naraka'],
	['valorant-hile', 'naraka-hile'],
	['valorant-esp-chity', 'naraka-esp-chity'],
	['valorant-aimbot-chity', 'naraka-aimbot-chity'],
	['unentdeckte-valorant-hacks', 'unentdeckte-naraka-cheats'],
	['hacks-valorant-indetectaveis', 'cheats-naraka-indetectaveis'],
	['trucchi-valorant-indetectabili', 'trucchi-naraka-indetectabili'],
	['niewykrywalne-hacks-valorant', 'niewykrywalne-cheats-naraka'],
	['nedecektiruemye-chity-valorant', 'nedecektiruemye-chity-naraka'],
	['tespit-edilemeyen-valorant-hileleri', 'tespit-edilemeyen-naraka-hileleri'],
	['nedecektovani-chity-valorant', 'nedecektovani-chity-naraka'],
	['hacks-valorant-nedetectabile', 'cheats-naraka-nedetectabile'],
	['basta-valorant-hacks', 'basta-naraka-cheats'],
	['valorant-hacks-funktionen', 'naraka-cheats-funktionen'],
	['valorant-hacks-functies', 'naraka-cheats-functies'],
	['caracteristicas-trucos-valorant', 'caracteristicas-trucos-naraka'],
	['fonctionnalites-triche-valorant', 'fonctionnalites-triche-naraka'],
	['recursos-hacks-valorant', 'recursos-cheats-naraka'],
	['maps, sites, and spike zones', 'maps, zones, and combat points'],
	['maps, sites and spike zones', 'maps, zones and combat points'],
	['competitive rounds and ranked matches', 'battle royale rounds and ranked matches'],
	['heroes & ranked teams', 'heroes & ranked teams'],
	['operator markers', 'hero markers'],
	['spike zones', 'combat zones'],
	['maps and bomb sites', 'maps and combat zones'],
	['near bomb sites and choke points', 'near combat zones and choke points'],
	['spike plant routes', 'grapple routes'],
	['Agent and ability ESP', 'Hero and weapon ESP'],
	['operator ESP', 'hero ESP'],
	['round win worth the push', 'elimination worth the push'],
	['tactical tools', 'melee combat tools'],
	['Riot Games', '24 Entertainment'],
	['competitive fight', 'melee combat'],
	['competitive fights', 'melee combat sessions'],
	['competitive tips', 'battle royale tips'],
	['map callouts', 'map zones'],
	['on bomb sites', 'in combat zones'],
	['ValorantCheatsSite', 'NarakaCheatsSite'],
	['Valorant Intel', 'Naraka Intel'],
	['Valorant Hacks', 'Naraka Cheats'],
	['valorant cheats', 'naraka cheats'],
	['valorant cheat', 'naraka cheat'],
	['valorant hacks', 'naraka cheats'],
	['valorant hack', 'naraka cheat'],
	['Valorant ESP', 'Naraka ESP'],
	['Valorant Aimbot', 'Naraka Aimbot'],
	['valorant esp', 'naraka esp'],
	['valorant aimbot', 'naraka aimbot'],
	['valorant wallhack', 'naraka wallhack'],
	['valorant radar', 'naraka radar'],
	['Buy Valorant Hacks', 'Buy Naraka Cheats'],
	['what-are-valorant-hacks', 'what-are-naraka-cheats'],
	['are-valorant-hacks-undetected-in-2026', 'are-naraka-cheats-undetected-in-2026'],
	['competitive-rounds-and-ranked-sessions', 'battle-royale-rounds-and-ranked-sessions'],
	['what-is-a-valorant-wallhack', 'what-is-a-naraka-wallhack'],
	['does-valorant-hacks-include-radar-hack', 'does-naraka-cheats-include-radar-hack'],
	['ace-anti-cheat-and-valorant-hacks', 'neac-anti-cheat-and-naraka-cheats'],
	['buy-undetected-valorant-hacks-windows-pc', 'buy-undetected-naraka-cheats-windows-pc'],
	['valorant-soft-aim-review', 'naraka-soft-aim-review'],
	['valorant-esp-ranked-review', 'naraka-esp-ranked-review'],
	['valorant-cloud-dma-review', 'naraka-cloud-dma-review'],
	['valorant-cheat-setup-review', 'naraka-cheat-setup-review'],
	['valorant-agent-esp-review', 'naraka-hero-esp-review'],
	['valorant-soft-aim-ranked-review', 'naraka-soft-aim-ranked-review'],
	['valorant-radar-hack-review', 'naraka-radar-hack-review'],
	['valorant-ace-update-review', 'naraka-neac-update-review'],
	['valorant-operator-soft-aim-review', 'naraka-melee-soft-aim-review'],
	['xKrypt0_Valorant', 'xKrypt0_Naraka'],
	['vanLifeDeltaForce', 'vanLifeNaraka'],
	['valorant-screenshot', 'naraka-screenshot'],
	['valorant-hacks-logo', 'naraka-cheats-logo'],
	['valorant-hacks-hero', 'naraka-cheats-hero'],
	['valorant-hero-banner', 'naraka-hero-banner'],
	['valorant-hero-ghost', 'naraka-hero-ghost'],
	['valorant-hero-source', 'naraka-hero-source'],
	['valorant-esp-player-tags', 'naraka-esp-player-tags'],
	['valorant-wallhack-skeleton', 'naraka-wallhack-skeleton'],
	['valorant-aimbot-skeleton', 'naraka-aimbot-skeleton'],
	['valorant-aimbot-operator', 'naraka-aimbot-melee'],
	['valorant-esp-radar', 'naraka-esp-radar'],
	['valorant-hacks-combat', 'naraka-cheats-combat'],
	['valorant-hacks-wallhack', 'naraka-cheats-wallhack'],
	['valorant-hacks-aimbot-view', 'naraka-cheats-aimbot-view'],
	['valorant-hacks-aimbot', 'naraka-cheats-aimbot'],
	['valorant-hacks-radar', 'naraka-cheats-radar'],
	['valorant-hacks-session', 'naraka-cheats-session'],
	['valorant-hacks-esp', 'naraka-cheats-esp'],
	['Valorant Features', 'Naraka Features'],
	['Valorant Status', 'Naraka Status'],
	['Valorant patches', 'Naraka patches'],
	['Valorant updates', 'Naraka updates'],
	['Valorant setup', 'Naraka setup'],
	['Valorant license', 'Naraka license'],
	['Valorant licenses', 'Naraka licenses'],
	['Valorant on PC', 'Naraka on PC'],
	['Valorant on Steam', 'Naraka on Steam'],
	['ace-bypass', 'neac-bypass'],
	['ACE bypass', 'NEAC bypass'],
	['ACE Bypass', 'NEAC Bypass'],
	['ACE maintenance', 'NEAC maintenance'],
	['ACE rebuilds', 'NEAC rebuilds'],
	['ACE update', 'NEAC update'],
	['ACE updates', 'NEAC updates'],
	['ACE patch', 'NEAC patch'],
	['ACE patches', 'NEAC patches'],
	["'ace'", "'neac'"],
	['| ace', '| neac'],
	['ace-anti-cheat', 'neac-anti-cheat'],
	['vc_locale', 'nc_locale'],
	['in Valorant', 'in Naraka'],
	['for Valorant', 'for Naraka'],
	['Valorant on', 'Naraka on'],
	['Valorant or', 'Naraka or'],
	["Valorant's", "Naraka's"],
	['Valorant ', 'Naraka '],
	['Valorant,', 'Naraka,'],
	['Valorant.', 'Naraka.'],
	['Valorant', 'Naraka'],
	['delta force cheats', 'naraka cheats'],
	['delta force cheats', 'naraka cheats'],
	['valo/delta force cheats', 'naraka/naraka cheats'],
];

const TEXT_EXTENSIONS = new Set([
	'.ts', '.tsx', '.js', '.mjs', '.astro', '.css', '.json', '.toml', '.txt', '.md', '.mdc',
]);

const SKIP_DIRS = new Set(['node_modules', 'dist', '.git', '.astro', 'tmp', 'valorant-hacks-org']);
const SKIP_FILES = new Set([
	'adapt-warzone.mjs',
	'adapt-fortnite.mjs',
	'adapt-tarkov.mjs',
	'adapt-theisle.mjs',
	'adapt-rust.mjs',
	'adapt-finals.mjs',
	'adapt-valorant.mjs',
	'adapt-naraka.mjs',
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

async function renameValorantTs() {
	const from = path.join(ROOT, 'src', 'data', 'valorant.ts');
	const to = path.join(ROOT, 'src', 'data', 'naraka.ts');
	try {
		await rename(from, to);
		console.log('Renamed valorant.ts → naraka.ts');
	} catch (e) {
		console.warn(`valorant.ts rename: ${e.message}`);
	}
}

async function renameScripts() {
	const pairs = [
		['fetch-valorant-images.mjs', 'fetch-naraka-images.mjs'],
		['fetch-valorant-hero.mjs', 'fetch-naraka-hero.mjs'],
		['import-valorant-screenshots.mjs', 'import-naraka-screenshots.mjs'],
		['valorant-hack-overlays.mjs', 'naraka-hack-overlays.mjs'],
		['fix-valorant-copy.mjs', 'fix-naraka-copy.mjs'],
		['fix-valorant-content.mjs', 'fix-naraka-content.mjs'],
		['fix-valorant-lexicon.mjs', 'fix-naraka-lexicon.mjs'],
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
		'naraka-aimbot': 'naraka-aimbot',
		'naraka-esp': 'naraka-esp',
		'naraka-wallhack': 'wallhack',
		'naraka-radar-hack': 'radar',
		'undetected-naraka-cheats': 'undetected',
		'naraka-cheats-2026': 'cheats-2026',
		'neac-bypass': 'neac',
		'naraka-cheats': 'hacks',
		'naraka-cheat-download': 'cheat-download',
		'naraka-mod-menu': 'mod-menu',
		'naraka-soft-aim': 'soft-aim',
		'best-naraka-cheats': 'best-cheats',
		'naraka-aimbot-hack': 'aimbot-hack',
		'naraka-esp-hack': 'esp-hack',
		'naraka-unlock-all': 'unlock-all',
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
		if (!file.includes('valorant')) continue;
		const newName = file
			.replace(/valorant-hacks/g, 'naraka-cheats')
			.replace(/valorant/g, 'naraka');
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
	console.log('Adapting Valorant Hacks → Naraka Cheats (narakacheats.org)...\n');
	await renamePageDirs();
	await renameValorantTs();
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
