#!/usr/bin/env node
/**
 * Extract a poster frame from the homepage demo video.
 * Run: node scripts/extract-demo-poster.mjs
 */
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import sharp from 'sharp';

const execFileAsync = promisify(execFile);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const imagesDir = path.join(ROOT, 'public', 'images');
const videoUrl =
	'https://boqgsoiwnpbisvrxulbe.supabase.co/storage/v1/object/public/delta/delta-clip.mp4';
const pngOut = path.join(imagesDir, 'delta-force-demo-poster.png');
const webpOut = path.join(imagesDir, 'delta-force-demo-poster.webp');

await mkdir(imagesDir, { recursive: true });
await execFileAsync('ffmpeg', ['-y', '-ss', '00:00:01.5', '-i', videoUrl, '-vframes', '1', '-update', '1', pngOut], {
	stdio: 'inherit',
});
await sharp(pngOut).webp({ quality: 88, effort: 6 }).toFile(webpOut);
console.log(`Wrote ${webpOut}`);
