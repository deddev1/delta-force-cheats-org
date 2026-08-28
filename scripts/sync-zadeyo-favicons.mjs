#!/usr/bin/env node
/**
 * Sync browser favicons from zadeyo.com (checkout provider).
 * Run: node scripts/sync-zadeyo-favicons.mjs
 */
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const publicDir = path.join(ROOT, 'public');
const imagesDir = path.join(publicDir, 'images');

const SOURCES = {
	ico: 'https://zadeyo.com/favicon.ico',
	png512: 'https://zadeyo.com/icons/zadeyo-512.png',
	png192: 'https://zadeyo.com/icons/zadeyo-192.png',
	apple: 'https://zadeyo.com/apple-touch-icon.png',
};

async function fetchBuffer(url) {
	const res = await fetch(url, {
		headers: { 'User-Agent': 'delta-force-cheats-org/1.0 (+https://deltaforcecheats.org)' },
	});
	if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
	return Buffer.from(await res.arrayBuffer());
}

async function main() {
	await mkdir(imagesDir, { recursive: true });

	const [ico, source512, source192, apple] = await Promise.all([
		fetchBuffer(SOURCES.ico),
		fetchBuffer(SOURCES.png512),
		fetchBuffer(SOURCES.png192),
		fetchBuffer(SOURCES.apple),
	]);

	await writeFile(path.join(imagesDir, 'zadeyo-favicon-source.png'), source512);
	await writeFile(path.join(publicDir, 'favicon.ico'), ico);
	await writeFile(path.join(publicDir, 'favicon.png'), source192);
	await writeFile(path.join(publicDir, 'apple-touch-icon.png'), apple);
	await writeFile(
		path.join(publicDir, 'favicon-32x32.png'),
		await sharp(source512).resize(32, 32).png().toBuffer(),
	);
	await writeFile(
		path.join(publicDir, 'favicon-16x16.png'),
		await sharp(source512).resize(16, 16).png().toBuffer(),
	);

	const svgBase64 = source192.toString('base64');
	await writeFile(
		path.join(publicDir, 'favicon.svg'),
		`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 192 192"><image width="192" height="192" href="data:image/png;base64,${svgBase64}"/></svg>`,
	);

	console.log('Synced Zadeyo favicons → public/favicon*');
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
