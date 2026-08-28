#!/usr/bin/env node
/**
 * Audit external guide pages — 1:1 URL mapping, IGN images, blog isolation checks.
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const guidesFile = readFileSync(path.join(ROOT, 'src/data/guides/guides.generated.ts'), 'utf8');
const guides = JSON.parse(
	guidesFile.replace(/^\/\*\*[\s\S]*?\*\/\s*/, '').replace(/^import[\s\S]*?;\s*/, '').replace(/export const guides: GuideDefinition\[] = /, '').replace(/;\s*$/, ''),
);

const RAW_URLS = readFileSync(path.join(ROOT, 'scripts', 'generate-guides.mjs'), 'utf8')
	.match(/const RAW_URLS = `([\s\S]*?)`\.trim\(\)/)?.[1]
	?.trim()
	.split(/\s+/) ?? [];

function normalizeUrl(raw) {
	return raw.trim().replace(/^http:/i, 'https:').replace(/\/$/, '');
}

const provided = RAW_URLS.map(normalizeUrl);
const providedUnique = [...new Set(provided)];
const guideUrls = guides.map((g) => g.externalUrl);
const guideUrlSet = new Set(guideUrls);
const slugSet = new Set(guides.map((g) => g.slug));

const missing = providedUnique.filter((u) => !guideUrlSet.has(u));
const extra = guideUrls.filter((u) => !providedUnique.includes(u));
const dupUrls = guideUrls.length - guideUrlSet.size;
const dupSlugs = guides.length - slugSet.size;

const blogGenerated = readFileSync(path.join(ROOT, 'src/data/blog/posts.generated.ts'), 'utf8');
const blogMentionsGuideSlugs = guides.some((g) => blogGenerated.includes(g.slug));

let lines = [];
lines.push('# Guides Hub Audit');
lines.push('');
lines.push(`- **Total Provided (raw):** ${provided.length}`);
lines.push(`- **Total Provided (unique):** ${providedUnique.length}`);
lines.push(`- **Dedicated Pages Created:** ${guides.length}`);
lines.push(`- **Missing:** ${missing.length}`);
lines.push(`- **Duplicates (URLs):** ${dupUrls}`);
lines.push(`- **Duplicates (slugs):** ${dupSlugs}`);
lines.push(`- **Extra URLs (not in list):** ${extra.length}`);
lines.push('');
lines.push('## Checks');
lines.push('');
lines.push(`- Footer Guides link: ${readFileSync(path.join(ROOT, 'src/components/SiteFooter.astro'), 'utf8').includes("href: '/guides/'") ? 'yes' : 'no'}`);
lines.push(`- Guides hub native section first: ${readFileSync(path.join(ROOT, 'src/components/GuideIndexPage.astro'), 'utf8').includes('guides-hub__native') ? 'yes' : 'no'}`);
lines.push(`- Guides grouped by game below fold: ${readFileSync(path.join(ROOT, 'src/components/GuideIndexPage.astro'), 'utf8').includes('guides-hub__game-group') ? 'yes' : 'no'}`);
lines.push(`- Blog feed references guide slugs: ${blogMentionsGuideSlugs ? 'yes (FAIL)' : 'no (pass)'}`);
lines.push(`- Every guide has IGN image: ${guides.every((g) => /ignimgs\.com|ign\.com/i.test(g.imageUrl)) ? 'yes' : 'no'}`);
lines.push('');
lines.push('## URL Mapping');
lines.push('');
lines.push('| Provided URL | Game/Niche | Created Page Path | IGN Image Used | Anchor Text Used |');
lines.push('| --- | --- | --- | --- | --- |');
for (const guide of guides) {
	const img = guide.imageUrl.length > 72 ? `${guide.imageUrl.slice(0, 69)}…` : guide.imageUrl;
	lines.push(
		`| ${guide.externalUrl} | ${guide.game} | /guides/${guide.slug}/ | ${img} | ${guide.anchorText} |`,
	);
}

if (missing.length) {
	lines.push('');
	lines.push('### Missing URLs');
	for (const u of missing) lines.push(`- ${u}`);
}

console.log(lines.join('\n'));
