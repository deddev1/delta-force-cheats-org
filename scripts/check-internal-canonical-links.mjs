#!/usr/bin/env node
/**
 * Indexable pages must not link internally to EN cannibal URLs that 301 away.
 * Those paths have no HTML — link to pillar pages instead.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');

/** EN paths that 301 via Worker — never link here from indexable HTML. */
const REDIRECT_ONLY_PATHS = [
	'/delta-force-aimbot-hack/',
	'/delta-force-esp-hack/',
	'/delta-force-mod-menu/',
	'/delta-force-unlock-all/',
	'/delta-force-soft-aim/',
	'/delta-force-wallhack/',
	'/delta-force-cheat-download/',
];

const PILLAR_FOR_REDIRECT = {
	'/delta-force-aimbot-hack/': '/delta-force-aimbot/',
	'/delta-force-esp-hack/': '/delta-force-esp/',
	'/delta-force-mod-menu/': '/',
	'/delta-force-unlock-all/': '/',
	'/delta-force-soft-aim/': '/delta-force-aimbot/',
	'/delta-force-wallhack/': '/delta-force-esp/',
	'/delta-force-cheat-download/': '/setup/',
};

function walkHtml(dir, files = []) {
	if (!fs.existsSync(dir)) return files;
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) walkHtml(full, files);
		else if (entry.name.endsWith('.html')) files.push(full);
	}
	return files;
}

function main() {
	if (!fs.existsSync(DIST)) {
		console.error('[check-internal-canonical-links] dist/ missing — run build first');
		process.exit(1);
	}

	const issues = [];

	for (const file of walkHtml(DIST)) {
		const html = fs.readFileSync(file, 'utf8');
		if (/noindex/i.test(html)) continue;

		const rel = path.relative(ROOT, file);
		for (const badPath of REDIRECT_ONLY_PATHS) {
			const patterns = [
				`href="${badPath}"`,
				`href='${badPath}'`,
				`href="${badPath.replace(/\/$/, '')}"`,
			];
			for (const pattern of patterns) {
				if (html.includes(pattern)) {
					issues.push(
						`${rel}: internal link to redirect-only ${badPath} — use ${PILLAR_FOR_REDIRECT[badPath]}`,
					);
					break;
				}
			}
		}
	}

	console.log('=== Internal Canonical Link Check (dist/) ===');
	if (issues.length) {
		for (const issue of issues.slice(0, 40)) console.error(`✗ ${issue}`);
		if (issues.length > 40) console.error(`✗ …and ${issues.length - 40} more`);
		process.exit(1);
	}

	console.log('✓ No indexable page links internally to EN cannibal redirect URLs');
}

main();
