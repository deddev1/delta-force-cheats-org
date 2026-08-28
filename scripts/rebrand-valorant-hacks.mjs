#!/usr/bin/env node
/**
 * Rebrand deltaforcecheats.org → deltaforcecheats.org (Delta Force Cheats → Delta Force Cheats).
 * Run from project root: node scripts/rebrand-delta-force-cheats.mjs
 */
import { readFile, writeFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const SKIP_DIRS = new Set(['node_modules', 'dist', '.git', 'tmp', '.astro']);
const SKIP_FILES = new Set(['package-lock.json', 'rebrand-delta-force-cheats.mjs']);

/** Ordered — most specific first. */
const REPLACEMENTS = [
	['https://www.deltaforcecheats.org', 'https://www.deltaforcecheats.org'],
	['https://deltaforcecheats.org', 'https://deltaforcecheats.org'],
	['www.deltaforcecheats.org', 'www.deltaforcecheats.org'],
	['support@deltaforcecheats.org', 'support@deltaforcecheats.org'],
	['deltaforcecheats.org', 'deltaforcecheats.org'],
	['project-name=deltaforcecheats', 'project-name=deltaforcecheats'],
	['name = "valorantcheats"', 'name = "delta-force-cheats-org"'],
	['Delta Force Cheats', 'Delta Force Cheats'],
];

async function walk(dir, files = []) {
	const entries = await readdir(dir, { withFileTypes: true });
	for (const entry of entries) {
		if (SKIP_DIRS.has(entry.name)) continue;
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) await walk(full, files);
		else files.push(full);
	}
	return files;
}

function shouldProcess(file) {
	const rel = path.relative(ROOT, file);
	if (SKIP_FILES.has(path.basename(file))) return false;
	if (rel.startsWith('public/images/')) return false;
	if (/\.(png|jpg|jpeg|webp|gif|ico|woff2?|mp4)$/i.test(file)) return false;
	return true;
}

let changed = 0;
const files = await walk(ROOT);
for (const file of files) {
	if (!shouldProcess(file)) continue;
	let text = await readFile(file, 'utf8');
	const original = text;
	for (const [from, to] of REPLACEMENTS) {
		text = text.split(from).join(to);
	}
	if (text !== original) {
		await writeFile(file, text, 'utf8');
		changed++;
		console.log('updated', path.relative(ROOT, file));
	}
}

console.log(`\nrebrand-delta-force-cheats: ${changed} file(s) updated`);
