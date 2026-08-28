#!/usr/bin/env node
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..');
const publicDir = path.join(root, 'public');
const imagesDir = path.join(publicDir, 'images');
const sourceSvg = path.join(imagesDir, 'delta-force-cheats-logo.svg');
const BG = { r: 13, g: 15, b: 14, alpha: 1 };

async function main() {
	await mkdir(imagesDir, { recursive: true });

	const logoPng = await sharp(sourceSvg)
		.resize(512, 512, { fit: 'contain', background: BG })
		.png()
		.toBuffer();

	await writeFile(path.join(imagesDir, 'delta-force-cheats-logo.png'), logoPng);
	await writeFile(
		path.join(imagesDir, 'delta-force-cheats-logo.webp'),
		await sharp(logoPng).webp({ quality: 90, effort: 6 }).toBuffer(),
	);
	await writeFile(
		path.join(imagesDir, 'delta-force-cheats-logo-mark.webp'),
		await sharp(path.join(imagesDir, 'delta-force-cheats-logo-mark.svg'))
			.resize(128, 128)
			.webp({ quality: 90, effort: 6 })
			.toBuffer(),
	);

	console.log('Generated Delta Force logo assets (navbar/schema). Favicons: npm run sync:zadeyo-favicons');
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
