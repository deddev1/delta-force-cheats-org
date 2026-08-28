/**
 * Import user-provided Delta Force cheat screenshots from Supabase.
 * Writes /images/delta-force-screenshot-01.webp … 08.webp + -480w / -960w variants
 * and legacy feature aliases. Does not touch hero assets.
 *
 * Run: node scripts/import-delta-force-user-screenshots.mjs
 */
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const imagesDir = path.join(ROOT, 'public/images');
const cacheDir = path.join(ROOT, 'scripts/assets/delta-force-screenshots');

/** User screenshots in display order (screenshot 01–08). */
const USER_SOURCES = [
	{
		url: 'https://boqgsoiwnpbisvrxulbe.supabase.co/storage/v1/object/public/delta/Screenshot%202026-08-28%20125100.png',
		label: 'Delta Force ESP loot and item labels through walls',
	},
	{
		url: 'https://boqgsoiwnpbisvrxulbe.supabase.co/storage/v1/object/public/delta/Screenshot%202026-08-28%20125112.png',
		label: 'Delta Force wallhack ESP with weapon and corpse tags',
	},
	{
		url: 'https://boqgsoiwnpbisvrxulbe.supabase.co/storage/v1/object/public/delta/Screenshot%202026-08-28%20125158.png',
		label: 'Delta Force third-person gameplay on Windows PC',
	},
	{
		url: 'https://boqgsoiwnpbisvrxulbe.supabase.co/storage/v1/object/public/delta/Screenshot%202026-08-28%20125206.png',
		label: 'Delta Force ESP player tracking with distance readouts',
	},
	{
		url: 'https://boqgsoiwnpbisvrxulbe.supabase.co/storage/v1/object/public/delta/Screenshot%202026-08-28%20125220.png',
		label: 'Delta Force ESP threat and loot markers in match',
	},
	{
		url: 'https://boqgsoiwnpbisvrxulbe.supabase.co/storage/v1/object/public/delta/Screenshot%202026-08-28%20125239.png',
		label: 'Delta Force cheats ESP overlay during combat',
	},
	{
		url: 'https://boqgsoiwnpbisvrxulbe.supabase.co/storage/v1/object/public/delta/Screenshot%202026-08-28%20125250.png',
		label: 'Delta Force wallhack player outlines and corpse tags',
	},
	{
		url: 'https://boqgsoiwnpbisvrxulbe.supabase.co/storage/v1/object/public/delta/Screenshot%202026-08-28%20125322.png',
		label: 'Delta Force ESP loot detection in Operations match',
	},
];

const SCREENSHOT_COUNT = USER_SOURCES.length;
const CONTENT_WIDTHS = [480, 960];
const MAX_WIDTH = 1280;
const WEBP = { quality: 82, effort: 6, smartSubsample: true };

const LEGACY_MAP = {
	'delta-force-screenshot-01': ['delta-force-cheats-esp.webp', 'delta-force-esp-player-tags.webp'],
	'delta-force-screenshot-02': ['delta-force-cheats-wallhack.webp', 'delta-force-cheats-session.webp'],
	'delta-force-screenshot-03': ['delta-force-cheats-aimbot.webp', 'delta-force-cheats-combat.webp'],
	'delta-force-screenshot-04': [
		'delta-force-cheats-aimbot-view.webp',
		'delta-force-aimbot-skeleton.webp',
		'delta-force-aimbot-sniper.webp',
	],
	'delta-force-screenshot-05': ['delta-force-cheats-radar.webp', 'delta-force-esp-radar.webp'],
	'delta-force-screenshot-06': ['delta-force-extract-fight.webp', 'delta-force-growth-run-combat.webp'],
	'delta-force-screenshot-07': ['delta-force-growth-run-mode.webp', 'delta-force-hero-banner.webp'],
	'delta-force-screenshot-08': ['delta-force-wallhack-skeleton.webp'],
};

async function fetchPng(url, destPath) {
	const res = await fetch(url, {
		headers: { 'User-Agent': 'delta-force-cheats-org/1.0 (+https://deltaforcecheats.org)' },
	});
	if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
	const buf = Buffer.from(await res.arrayBuffer());
	await writeFile(destPath, buf);
	return buf;
}

async function encodeWebp(input, width, options = WEBP) {
	const meta = await sharp(input).metadata();
	const nativeWidth = meta.width ?? width;
	const targetWidth = Math.min(width, nativeWidth);
	const height = Math.round(((meta.height ?? 720) / nativeWidth) * targetWidth);
	return sharp(input)
		.resize(targetWidth, height, { fit: 'inside', withoutEnlargement: true })
		.webp(options)
		.toBuffer();
}

async function writeScreenshotSet(pngBuffer, baseName) {
	const outputs = [];
	let canonical = null;

	for (const width of CONTENT_WIDTHS) {
		const file = `${baseName}-${width}w.webp`;
		const webp = await encodeWebp(pngBuffer, width);
		await writeFile(path.join(imagesDir, file), webp);
		outputs.push({ file, bytes: webp.length });
	}

	canonical = await encodeWebp(pngBuffer, MAX_WIDTH);
	await writeFile(path.join(imagesDir, `${baseName}.webp`), canonical);
	outputs.push({ file: `${baseName}.webp`, bytes: canonical.length });

	return { outputs, canonical };
}

await mkdir(imagesDir, { recursive: true });
await mkdir(cacheDir, { recursive: true });

const sourceBuffers = [];
for (let i = 0; i < USER_SOURCES.length; i += 1) {
	const { url, label } = USER_SOURCES[i];
	const cachePath = path.join(cacheDir, `source-${String(i + 1).padStart(2, '0')}.png`);
	console.log(`Fetching screenshot ${i + 1}/${USER_SOURCES.length}…`);
	const buf = await fetchPng(url, cachePath);
	sourceBuffers.push(buf);
	console.log(`  ✓ ${label} (${Math.round(buf.length / 1024)}KB PNG)`);
}

let totalBytes = 0;
const canonicalBySlot = {};

for (let n = 1; n <= SCREENSHOT_COUNT; n += 1) {
	const num = String(n).padStart(2, '0');
	const base = `delta-force-screenshot-${num}`;
	const png = sourceBuffers[n - 1];

	console.log(`Optimizing ${base}…`);
	const { outputs, canonical } = await writeScreenshotSet(png, base);
	canonicalBySlot[base] = canonical;
	for (const { file, bytes } of outputs) {
		totalBytes += bytes;
		console.log(`  ✓ ${file} (${Math.round(bytes / 1024)}KB)`);
	}

	for (const name of LEGACY_MAP[base] ?? []) {
		await writeFile(path.join(imagesDir, name), canonical);
		console.log(`  ✓ ${name} (alias)`);
	}
}

const reviewsCanonical = canonicalBySlot['delta-force-screenshot-04'];
await writeFile(path.join(imagesDir, 'reviews-banner.webp'), reviewsCanonical);
for (const width of CONTENT_WIDTHS) {
	const webp = await encodeWebp(sourceBuffers[3], width);
	await writeFile(path.join(imagesDir, `reviews-banner-${width}w.webp`), webp);
}
console.log('✓ reviews-banner.webp (+ responsive variants)');

console.log(
	`\nDone — ${SCREENSHOT_COUNT} screenshots optimized (~${Math.round(totalBytes / 1024)}KB webp total). Hero unchanged.`,
);
