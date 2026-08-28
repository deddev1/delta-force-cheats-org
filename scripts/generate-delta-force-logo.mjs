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
		await sharp(logoPng).resize(128, 128).webp({ quality: 90, effort: 6 }).toBuffer(),
	);

	const faviconSizes = [
		{ name: 'favicon-16x16.png', size: 16 },
		{ name: 'favicon-32x32.png', size: 32 },
		{ name: 'apple-touch-icon.png', size: 180 },
		{ name: 'favicon.png', size: 192 },
	];

	for (const { name, size } of faviconSizes) {
		await writeFile(
			path.join(publicDir, name),
			await sharp(logoPng).resize(size, size).png().toBuffer(),
		);
	}

	await writeFile(
		path.join(publicDir, 'favicon.ico'),
		await sharp(logoPng).resize(32, 32).png().toBuffer(),
	);

	const svgBase64 = logoPng.toString('base64');
	await writeFile(
		path.join(publicDir, 'favicon.svg'),
		`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><rect width="512" height="512" fill="#0D0F0E"/><image width="512" height="512" href="data:image/png;base64,${svgBase64}"/></svg>`,
	);

	console.log('Generated Delta Force logo, mark, and favicons.');
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
