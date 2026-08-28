#!/usr/bin/env node
/**
 * Remove source-only / orphan images from public/images before deploy.
 * Keeps runtime WebP assets; moves large PNG masters to scripts/assets when needed.
 */
import { mkdir, readdir, rename, stat, unlink } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const imagesDir = path.join(ROOT, 'public', 'images');
const assetsDir = path.join(ROOT, 'scripts', 'assets', 'image-masters');

/** Files never referenced in built HTML — safe to drop or archive. */
const ARCHIVE_TO_ASSETS = new Set([
	'delta-force-cheats-hero.png',
	'delta-force-demo-poster.png',
	'reviews-banner.png',
]);

const DELETE_ORPHANS = new Set([
	'hero-banner.webp',
	'delta-force-verdansk-map.webp',
	'zadeyo-logo.png',
	'delta-force-cheats-hero.webp',
]);

let archived = 0;
let deleted = 0;
let savedBytes = 0;

await mkdir(assetsDir, { recursive: true });

for (const name of ARCHIVE_TO_ASSETS) {
	const src = path.join(imagesDir, name);
	try {
		const { size } = await stat(src);
		const dest = path.join(assetsDir, name);
		await rename(src, dest);
		archived += 1;
		savedBytes += size;
		console.log(`archived ${name} → scripts/assets/image-masters/`);
	} catch (err) {
		if (err.code !== 'ENOENT') throw err;
	}
}

for (const name of DELETE_ORPHANS) {
	const src = path.join(imagesDir, name);
	try {
		const { size } = await stat(src);
		await unlink(src);
		deleted += 1;
		savedBytes += size;
		console.log(`removed orphan ${name}`);
	} catch (err) {
		if (err.code !== 'ENOENT') throw err;
	}
}

const files = await readdir(imagesDir);
const total = files.length;
console.log(
	`\nprune-public-images: archived ${archived}, deleted ${deleted}, ~${Math.round(savedBytes / 1024 / 1024)}MB saved (${total} files remain in public/images/)`,
);
