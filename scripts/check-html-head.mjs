#!/usr/bin/env node
/**
 * Ensures every built HTML file has a valid <head> before <body>.
 * Astro.redirect() stubs omit <html>/<head> — those routes must 301 via Worker only.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');

function walkHtml(dir, files = []) {
	if (!fs.existsSync(dir)) return files;
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) walkHtml(full, files);
		else if (entry.name.endsWith('.html')) files.push(full);
	}
	return files;
}

function validateHead(html) {
	const lower = html.toLowerCase();
	const htmlIdx = lower.indexOf('<html');
	const headIdx = lower.indexOf('<head');
	const bodyIdx = lower.indexOf('<body');

	if (htmlIdx === -1 || headIdx === -1 || bodyIdx === -1) {
		return 'missing <html>, <head>, or <body>';
	}
	if (headIdx < htmlIdx) return '<head> appears before <html>';
	if (headIdx > bodyIdx) return '<head> must come before <body>';
	return null;
}

function main() {
	if (!fs.existsSync(DIST)) {
		console.error('[check-html-head] dist/ missing — run build first');
		process.exit(1);
	}

	const issues = [];
	for (const file of walkHtml(DIST)) {
		const html = fs.readFileSync(file, 'utf8');
		const problem = validateHead(html);
		if (problem) {
			issues.push(`${path.relative(ROOT, file)}: ${problem}`);
		}
	}

	if (issues.length) {
		console.error('[check-html-head] invalid document structure:');
		for (const issue of issues) console.error(`  - ${issue}`);
		process.exit(1);
	}

	console.log(`✓ ${walkHtml(DIST).length} HTML files have a valid <head> before <body>`);
}

main();
