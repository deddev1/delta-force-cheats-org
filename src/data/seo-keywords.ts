import type { PageId } from './i18n/routing';

/** Primary money keyword — drives {primaryKeyword} tokens sitewide. */
export const primarySeoKeyword = 'delta force cheats';

/**
 * Default meta keywords (fallback when no page-specific set).
 * Ordered by commercial intent + search volume fit for deltaforcecheats.org.
 */
export const globalSeoKeywords = [
	'delta force cheats',
	'delta force hacks',
	'undetected delta force cheats',
	'delta force cheats 2026',
	'best delta force cheats',
	'buy delta force cheats',
	'delta force esp',
	'delta force wallhack',
	'delta force aimbot',
	'delta force soft aim',
	'delta force radar hack',
	'delta force ace bypass',
	'delta force cheats pc',
	'delta force cheat download',
	'delta force mod menu',
	'delta force cheats undetected',
	'delta force aimbot hack',
	'delta force esp hack',
	'best delta force cheats 2026',
	'delta force cheats for ranked',
	'delta force external cheat',
] as const;

/** Page-level meta keywords — aligned to canonical URLs and on-page intent. */
export const pageSeoKeywords: Partial<Record<PageId, readonly string[]>> = {
	home: [
		'delta force cheats',
		'delta force cheats 2026',
		'undetected delta force cheats',
		'buy delta force cheats',
		'delta force esp',
		'delta force aimbot',
	],
	hacks: [
		'delta force cheats',
		'delta force cheats pc',
		'undetected delta force cheats',
		'delta force esp',
		'delta force aimbot',
	],
	'delta-force-esp': [
		'delta force esp',
		'delta force esp hack',
		'delta force wallhack',
		'delta force esp wallhack',
		'delta force cheats esp',
	],
	wallhack: [
		'delta force wallhack',
		'delta force esp wallhack',
		'delta force wallhack hack',
		'delta force esp',
	],
	'delta-force-aimbot': [
		'delta force aimbot',
		'delta force soft aim',
		'delta force aimbot hack',
		'legit delta force aimbot',
		'delta force cheats aimbot',
	],
	'aimbot-hack': ['delta force aimbot hack', 'delta force aimbot', 'delta force soft aim', 'delta force cheats aimbot'],
	'soft-aim': ['delta force soft aim', 'delta force aimbot', 'soft aim delta force', 'delta force cheats soft aim'],
	radar: ['delta force radar hack', 'delta force 2d radar', 'delta force radar', 'delta force cheats radar'],
	'esp-hack': ['delta force esp hack', 'delta force esp', 'delta force wallhack', 'delta force cheats esp'],
	features: [
		'delta force cheats features',
		'delta force esp',
		'delta force aimbot',
		'delta force radar hack',
		'delta force mod menu',
	],
	pricing: [
		'buy delta force cheats',
		'delta force cheats price',
		'delta force cheats monthly',
		'delta force cheats lifetime',
	],
	setup: [
		'delta force cheats setup',
		'delta force cheat download',
		'install delta force cheats',
	],
	'cheat-download': [
		'delta force cheat download',
		'delta force cheats download',
		'delta force cheats setup',
	],
	updates: [
		'undetected delta force cheats',
		'delta force cheats status',
		'ACE update',
		'delta force cheats undetected',
	],
	undetected: [
		'undetected delta force cheats',
		'delta force cheats undetected',
		'ACE undetected',
	],
	ace: [
		'delta force ace bypass',
		'ace bypass delta force',
		'delta force anti cheat bypass',
		'hwid spoofer delta force',
	],
	'cheats-2026': [
		'delta force cheats 2026',
		'best delta force cheats 2026',
		'undetected delta force cheats 2026',
	],
	'best-cheats': [
		'best delta force cheats',
		'best delta force cheats 2026',
		'delta force cheats comparison',
	],
	'mod-menu': ['delta force mod menu', 'delta force cheat menu', 'delta force cheats menu'],
	faq: ['delta force cheats faq', 'delta force cheats setup', 'undetected delta force cheats'],
	support: ['delta force cheats support', 'delta force cheats license help'],
};

/** Meta keywords for /reviews/ and individual review pages (English-only routes). */
export const reviewsSeoKeywords = [
	'delta force cheats reviews',
	'delta force hacks',
	'delta force cheats',
	'delta force hacks pc',
	'delta force esp',
	'delta force aimbot',
	'delta force radar hack',
	'undetected delta force cheats',
] as const;

export function getPageSeoKeywords(pageId?: PageId): string[] {
	if (!pageId) return [...globalSeoKeywords];
	const pageKeywords = pageSeoKeywords[pageId];
	return pageKeywords?.length ? [...pageKeywords] : [...globalSeoKeywords];
}
