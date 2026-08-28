#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs';

const SIMPLE =
	"images: { hero: 'delta force cheats', espWallhack: 'delta force cheats wallhack', aimbotCombat: 'delta force cheats aimbot', squadFight: 'delta force cheats', playerEsp: 'delta force cheats esp', headerArt: 'delta force cheats aimbot', hacksPackage: 'delta force cheats radar', matchFight: 'delta force cheats aimbot', battleRoyale: 'delta force cheats', matchMap: 'delta force cheats esp' }";

const re =
	/images: \{ hero: '[^']+', espWallhack: '[^']+', aimbotCombat: '[^']+', squadFight: '[^']+', playerEsp: '[^']+', headerArt: '[^']+', hacksPackage: '[^']+', matchFight: '[^']+', battleRoyale: '[^']+', matchMap: '[^']+' \}/g;

for (const f of ['scripts/i18n-data/ui-strings-part1.mjs', 'scripts/i18n-data/ui-strings-part2.mjs']) {
	const c = readFileSync(f, 'utf8');
	const n = c.replace(re, SIMPLE);
	writeFileSync(f, n);
	console.log(f, (c.match(re) || []).length, 'image blocks simplified');
}

const altMap = [
	["imageAlt: 'Delta Force ESP player tags hack'", "imageAlt: 'delta force cheats esp'"],
	["imageAlt: 'Delta Force ESP radar hack'", "imageAlt: 'delta force cheats radar'"],
	["imageAlt: 'Delta Force Aimbot sniper kill'", "imageAlt: 'delta force cheats aimbot'"],
	["imageAlt: 'Delta Force Aimbot skeleton targeting'", "imageAlt: 'delta force cheats aimbot'"],
	["imageAlt: 'delta force cheats ADS combat'", "imageAlt: 'delta force cheats'"],
	["imageAlt: 'delta force cheats setup PC activation'", "imageAlt: 'delta force cheats'"],
	["imageAlt: 'delta force cheats updates ACE maintenance'", "imageAlt: 'delta force cheats'"],
	["imageAlt: 'delta force cheats FAQ ESP aimbot'", "imageAlt: 'delta force cheats'"],
	["imageAlt: 'delta force cheats support license help'", "imageAlt: 'delta force cheats'"],
	["imageAlt: 'Undetected delta force cheats ESP wallhack'", "imageAlt: 'undetected delta force cheats'"],
	["imageAlt: 'thefinals wallhack skeleton ESP'", "imageAlt: 'delta force cheats wallhack'"],
	["imageAlt: 'ACE bypass rust ESP aimbot'", "imageAlt: 'delta force cheats eac'"],
	["imageAlt: 'delta force cheats 2026 ESP aimbot'", "imageAlt: 'delta force cheats'"],
	["imageAlt: 'delta force cheats combat aimbot'", "imageAlt: 'delta force cheats'"],
	["imageAlt: 'delta force cheat download ESP aimbot'", "imageAlt: 'delta force cheats download'"],
	["imageAlt: 'Delta Force mod menu ESP aimbot'", "imageAlt: 'delta force cheats mod menu'"],
	["imageAlt: 'Delta Force soft aim aimbot settings'", "imageAlt: 'delta force cheats soft aim'"],
	["imageAlt: 'Best delta force cheats 2026 ESP'", "imageAlt: 'best delta force cheats'"],
	["imageAlt: 'Delta Force Aimbot hack combat'", "imageAlt: 'delta force cheats aimbot'"],
	["imageAlt: 'Delta Force ESP hack wallhack'", "imageAlt: 'delta force cheats esp'"],
	["imageAlt: 'Delta Force unlock all items ESP aimbot guide'", "imageAlt: 'delta force cheats'"],
	["imageAlt: 'delta force cheats privacy policy'", "imageAlt: 'delta force cheats'"],
	["imageAlt: 'delta force cheats refund policy'", "imageAlt: 'delta force cheats'"],
	["imageAlt: 'delta force cheats terms of use'", "imageAlt: 'delta force cheats'"],
];

let pages = readFileSync('scripts/i18n-data/pages-en.mjs', 'utf8');
for (const [from, to] of altMap) pages = pages.split(from).join(to);
writeFileSync('scripts/i18n-data/pages-en.mjs', pages);
console.log('pages-en imageAlts simplified');

// productPage() imageAlt template in pages-i18n
let i18n = readFileSync('scripts/i18n-data/pages-i18n.mjs', 'utf8');
i18n = i18n
	.split("imageAlt: `Delta Force ${meta.altKeyword}`")
	.join("imageAlt: 'delta force cheats'")
	.split("galleryTitle: `Delta Force Cheats ${topicName}`")
	.join("galleryTitle: 'delta force cheats'")
	.split("imageAlt: `delta force cheats ${kind} policy`")
	.join("imageAlt: 'delta force cheats'")
	.split("galleryTitle: `Delta Force Cheats ${kind} resources`")
	.join("galleryTitle: 'delta force cheats'");
writeFileSync('scripts/i18n-data/pages-i18n.mjs', i18n);
console.log('pages-i18n image alts simplified');
