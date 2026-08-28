#!/usr/bin/env node
/**
 * One-time migration: The Final Cheats → Valorant Hacks (valoranthacks.org).
 * Run from project root: node scripts/adapt-valorant.mjs
 */
import { readFile, writeFile, readdir, rename } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const RENAME_PAGE_DIRS = [
	['finals-aimbot', 'valorant-aimbot'],
	['finals-esp', 'valorant-esp'],
	['finals-wallhack', 'valorant-wallhack'],
	['finals-radar-hack', 'valorant-radar-hack'],
	['undetected-finals-cheats', 'undetected-valorant-hacks'],
	['finals-cheats-2026', 'valorant-hacks-2026'],
	['eac-bypass', 'vanguard-bypass'],
	['finals-cheats', 'valorant-hacks'],
	['finals-cheat-download', 'valorant-cheat-download'],
	['finals-mod-menu', 'valorant-mod-menu'],
	['finals-soft-aim', 'valorant-soft-aim'],
	['best-finals-cheats', 'best-valorant-hacks'],
	['finals-aimbot-hack', 'valorant-aimbot-hack'],
	['finals-esp-hack', 'valorant-esp-hack'],
	['finals-unlock-all', 'valorant-unlock-all'],
];

/** Ordered replacements — specific patterns first. */
const REPLACEMENTS = [
	['https://www.thefinalscheats.org', 'https://www.valoranthacks.org'],
	['https://thefinalscheats.org', 'https://valoranthacks.org'],
	['www.thefinalscheats.org', 'www.valoranthacks.org'],
	['thefinalscheats.org', 'valoranthacks.org'],
	['support@thefinalscheats.org', 'support@valoranthacks.org'],
	['project-name=thefinalscheats', 'project-name=valoranthacks'],
	['name = "thefinalscheats"', 'name = "valoranthacks"'],
	['"name": "the-finals-cheats"', '"name": "valorant-hacks"'],
	['https://store.steampowered.com/app/2073850/THE_FINALS/', 'https://playvalorant.com/'],
	['https://store.steampowered.com/app/2073850/news/', 'https://playvalorant.com/en-us/news/'],
	['https://store.steampowered.com/app/2073850', 'https://playvalorant.com'],
	['https://steamcommunity.com/app/2073850', 'https://playvalorant.com'],
	['https://www.reachthefinals.com/', 'https://playvalorant.com/'],
	['https://thefinals.fandom.com/wiki/The_Finals', 'https://valorant.fandom.com/wiki/VALORANT'],
	['https://thefinals.fandom.com', 'https://valorant.fandom.com'],
	['reachthefinals.com', 'playvalorant.com'],
	['thefinals.fandom.com', 'valorant.fandom.com'],
	['/products/the-finals', '/products/valorant'],
	['undetected-finals-cheats', 'undetected-valorant-hacks'],
	['best-finals-cheats', 'best-valorant-hacks'],
	['finals-cheat-download', 'valorant-cheat-download'],
	['finals-cheats-2026', 'valorant-hacks-2026'],
	['finals-radar-hack', 'valorant-radar-hack'],
	['finals-aimbot-hack', 'valorant-aimbot-hack'],
	['finals-esp-hack', 'valorant-esp-hack'],
	['finals-unlock-all', 'valorant-unlock-all'],
	['finals-soft-aim', 'valorant-soft-aim'],
	['finals-mod-menu', 'valorant-mod-menu'],
	['finals-wallhack', 'valorant-wallhack'],
	['finals-aimbot', 'valorant-aimbot'],
	['finals-esp', 'valorant-esp'],
	["'finals-esp'", "'valorant-esp'"],
	['"finals-esp"', '"valorant-esp"'],
	["'finals-aimbot'", "'valorant-aimbot'"],
	['"finals-aimbot"', '"valorant-aimbot"'],
	['finals-cheats', 'valorant-hacks'],
	['finals-cheat', 'valorant-cheat'],
	['finalsImages', 'valorantImages'],
	["from './finals'", "from './valorant'"],
	["from '../data/finals'", "from '../data/valorant'"],
	["from '../../data/finals'", "from '../../data/valorant'"],
	['fetch-finals-images', 'fetch-valorant-images'],
	['fetch-finals-hero', 'fetch-valorant-hero'],
	['import-finals-screenshots', 'import-valorant-screenshots'],
	['finals-hack-overlays', 'valorant-hack-overlays'],
	['fix-finals-copy', 'fix-valorant-copy'],
	['fix-finals-content', 'fix-valorant-content'],
	['adapt-finals', 'adapt-valorant'],
	['trucos-finals', 'trucos-valorant'],
	['triche-finals', 'triche-valorant'],
	['cheats-finals', 'cheats-valorant'],
	['trucchi-finals', 'trucchi-valorant'],
	['cheaty-finals', 'cheaty-valorant'],
	['chity-finals', 'chity-valorant'],
	['chitov-finals', 'chitov-valorant'],
	['chitiv-finals', 'chitiv-valorant'],
	['cheatow-finals', 'cheatow-valorant'],
	['hile-finals', 'hile-valorant'],
	['finals-hile', 'valorant-hile'],
	['finals-esp-chity', 'valorant-esp-chity'],
	['finals-aimbot-chity', 'valorant-aimbot-chity'],
	['unentdeckte-finals-cheats', 'unentdeckte-valorant-hacks'],
	['cheats-finals-indetectaveis', 'hacks-valorant-indetectaveis'],
	['trucchi-finals-indetectabili', 'trucchi-valorant-indetectabili'],
	['niewykrywalne-cheats-finals', 'niewykrywalne-hacks-valorant'],
	['nedecektiruemye-chity-finals', 'nedecektiruemye-chity-valorant'],
	['tespit-edilemeyen-finals-hileleri', 'tespit-edilemeyen-valorant-hileleri'],
	['nedecektovani-chity-finals', 'nedecektovani-chity-valorant'],
	['cheats-finals-nedetectabile', 'hacks-valorant-nedetectabile'],
	['basta-finals-cheats', 'basta-valorant-hacks'],
	['finals-cheats-funktionen', 'valorant-hacks-funktionen'],
	['finals-cheats-functies', 'valorant-hacks-functies'],
	['caracteristicas-trucos-finals', 'caracteristicas-trucos-valorant'],
	['fonctionnalites-triche-finals', 'fonctionnalites-triche-valorant'],
	['recursos-cheats-finals', 'recursos-hacks-valorant'],
	['arenas, stadiums, and cashout zones', 'maps, sites, and spike zones'],
	['arenas, stadiums and cashout zones', 'maps, sites and spike zones'],
	['cashout rounds and arena PvP sessions', 'competitive rounds and ranked matches'],
	['cashout rounds and arena PvP fights', 'competitive rounds and ranked matches'],
	['contestants & cashout teams', 'agents & ranked teams'],
	['vault markers', 'agent markers'],
	['cashout zones', 'spike zones'],
	['arenas and cashout vaults', 'maps and bomb sites'],
	['near arenas and cashout vaults', 'near bomb sites and choke points'],
	['cashout routes', 'spike plant routes'],
	['Vault and cashout ESP', 'Agent and ability ESP'],
	['vault ESP', 'agent ESP'],
	['cashout worth the detour', 'round win worth the push'],
	['arena tools', 'tactical tools'],
	['Embark Studios', 'Team Jade'],
	['arena fight', 'competitive fight'],
	['arena fights', 'competitive fights'],
	['arena tips', 'competitive tips'],
	['arena map', 'map callouts'],
	['in stadiums', 'on maps'],
	['in cashout zones', 'on bomb sites'],
	['Arena', 'Map'],
	['FinalsCheatsSite', 'ValorantCheatsSite'],
	['Finals Intel', 'Valorant Intel'],
	['The Final Cheats', 'Valorant Hacks'],
	['the finals cheats', 'valorant cheats'],
	['the finals cheat', 'valorant cheat'],
	['thefinals cheats', 'valorant cheats'],
	['thefinals cheat', 'valorant cheat'],
	['thefinals hacks', 'valorant hacks'],
	['thefinals hack', 'valorant hack'],
	['The Finals ESP', 'Valorant ESP'],
	['The Finals Aimbot', 'Valorant Aimbot'],
	['the finals esp', 'valorant esp'],
	['the finals aimbot', 'valorant aimbot'],
	['the finals wallhack', 'valorant wallhack'],
	['the finals radar', 'valorant radar'],
	['Buy The Finals Cheats', 'Buy Valorant Hacks'],
	['what-are-finals-cheats', 'what-are-valorant-hacks'],
	['are-finals-cheats-undetected-in-2026', 'are-valorant-hacks-undetected-in-2026'],
	['cashout-rounds-and-arena-sessions', 'competitive-rounds-and-ranked-sessions'],
	['what-is-a-finals-wallhack', 'what-is-a-valorant-wallhack'],
	['does-finals-cheats-include-radar-hack', 'does-valorant-hacks-include-radar-hack'],
	['eac-anti-cheat-and-finals-cheats', 'vanguard-anti-cheat-and-valorant-hacks'],
	['buy-undetected-finals-cheats-windows-pc', 'buy-undetected-valorant-hacks-windows-pc'],
	['finals-soft-aim-review', 'valorant-soft-aim-review'],
	['finals-esp-cashout-review', 'valorant-esp-ranked-review'],
	['finals-cloud-dma-review', 'valorant-cloud-dma-review'],
	['finals-cheat-setup-review', 'valorant-cheat-setup-review'],
	['finals-vault-esp-review', 'valorant-agent-esp-review'],
	['finals-soft-aim-match-review', 'valorant-soft-aim-ranked-review'],
	['finals-radar-hack-review', 'valorant-radar-hack-review'],
	['finals-eac-update-review', 'valorant-vanguard-update-review'],
	['finals-sniper-soft-aim-review', 'valorant-operator-soft-aim-review'],
	['xKrypt0_Finals', 'xKrypt0_Valorant'],
	['vanLifeFinals', 'vanLifeValorant'],
	['finals-screenshot', 'valorant-screenshot'],
	['finals-cheats-logo', 'valorant-hacks-logo'],
	['finals-cheats-hero', 'valorant-hacks-hero'],
	['finals-hero-banner', 'valorant-hero-banner'],
	['finals-hero-ghost', 'valorant-hero-ghost'],
	['finals-hero-source', 'valorant-hero-source'],
	['finals-esp-player-tags', 'valorant-esp-player-tags'],
	['finals-wallhack-skeleton', 'valorant-wallhack-skeleton'],
	['finals-aimbot-skeleton', 'valorant-aimbot-skeleton'],
	['finals-aimbot-sniper', 'valorant-aimbot-operator'],
	['finals-esp-radar', 'valorant-esp-radar'],
	['finals-cheats-combat', 'valorant-hacks-combat'],
	['finals-cheats-wallhack', 'valorant-hacks-wallhack'],
	['finals-cheats-aimbot-view', 'valorant-hacks-aimbot-view'],
	['finals-cheats-aimbot', 'valorant-hacks-aimbot'],
	['finals-cheats-radar', 'valorant-hacks-radar'],
	['finals-cheats-session', 'valorant-hacks-session'],
	['finals-cheats-esp', 'valorant-hacks-esp'],
	['The Finals Hacks', 'Valorant Hacks'],
	['The Finals Features', 'Valorant Features'],
	['The Finals Status', 'Valorant Status'],
	['The Finals patches', 'Valorant patches'],
	['The Finals updates', 'Valorant updates'],
	['The Finals setup', 'Valorant setup'],
	['The Finals license', 'Valorant license'],
	['The Finals licenses', 'Valorant licenses'],
	['The Finals on Steam', 'Valorant on PC'],
	['eac-bypass', 'vanguard-bypass'],
	['EAC bypass', 'Vanguard bypass'],
	['EAC Bypass', 'Vanguard Bypass'],
	['EAC maintenance', 'Vanguard maintenance'],
	['EAC rebuilds', 'Vanguard rebuilds'],
	['EAC update', 'Vanguard update'],
	['EAC updates', 'Vanguard updates'],
	['EAC patch', 'Vanguard patch'],
	['EAC patches', 'Vanguard patches'],
	['Easy Anti-Cheat (EAC)', 'Vanguard'],
	['Easy Anti-Cheat', 'Vanguard'],
	["'eac'", "'vanguard'"],
	['| eac', '| vanguard'],
	['eac-anti-cheat', 'vanguard-anti-cheat'],
	['fc_locale', 'vc_locale'],
	['in The Finals', 'in Valorant'],
	['for The Finals', 'for Valorant'],
	['The Finals on', 'Valorant on'],
	['The Finals or', 'Valorant or'],
	["The Finals'", "Valorant's"],
	['The Finals ', 'Valorant '],
	['The Finals,', 'Valorant,'],
	['The Finals.', 'Valorant.'],
	['The Finals', 'Valorant'],
];

const TEXT_EXTENSIONS = new Set([
	'.ts', '.tsx', '.js', '.mjs', '.astro', '.css', '.json', '.toml', '.txt', '.md', '.mdc',
]);

const SKIP_DIRS = new Set(['node_modules', 'dist', '.git', '.astro', 'tmp']);
const SKIP_FILES = new Set([
	'adapt-warzone.mjs',
	'adapt-fortnite.mjs',
	'adapt-tarkov.mjs',
	'adapt-theisle.mjs',
	'adapt-rust.mjs',
	'adapt-finals.mjs',
	'adapt-valorant.mjs',
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

async function renameFinalsTs() {
	const from = path.join(ROOT, 'src', 'data', 'finals.ts');
	const to = path.join(ROOT, 'src', 'data', 'valorant.ts');
	try {
		await rename(from, to);
		console.log('Renamed finals.ts → valorant.ts');
	} catch (e) {
		console.warn(`finals.ts rename: ${e.message}`);
	}
}

async function renameScripts() {
	const pairs = [
		['fetch-finals-images.mjs', 'fetch-valorant-images.mjs'],
		['fetch-finals-hero.mjs', 'fetch-valorant-hero.mjs'],
		['import-finals-screenshots.mjs', 'import-valorant-screenshots.mjs'],
		['finals-hack-overlays.mjs', 'valorant-hack-overlays.mjs'],
		['fix-finals-copy.mjs', 'fix-valorant-copy.mjs'],
		['fix-finals-content.mjs', 'fix-valorant-content.mjs'],
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
		'valorant-aimbot': 'valorant-aimbot',
		'valorant-esp': 'valorant-esp',
		'valorant-wallhack': 'wallhack',
		'valorant-radar-hack': 'radar',
		'undetected-valorant-hacks': 'undetected',
		'valorant-hacks-2026': 'cheats-2026',
		'vanguard-bypass': 'vanguard',
		'valorant-hacks': 'hacks',
		'valorant-cheat-download': 'cheat-download',
		'valorant-mod-menu': 'mod-menu',
		'valorant-soft-aim': 'soft-aim',
		'best-valorant-hacks': 'best-cheats',
		'valorant-aimbot-hack': 'aimbot-hack',
		'valorant-esp-hack': 'esp-hack',
		'valorant-unlock-all': 'unlock-all',
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
		if (!file.includes('finals')) continue;
		const newName = file
			.replace(/finals-cheats/g, 'valorant-hacks')
			.replace(/finals/g, 'valorant');
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
	console.log('Adapting The Final Cheats → Valorant Hacks (valoranthacks.org)...\n');
	await renamePageDirs();
	await renameFinalsTs();
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
