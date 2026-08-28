import { brand } from './brand';
import type { PageId } from './i18n/routing';

export type ExternalResource = {
	id: string;
	label: string;
	href: string;
	note?: string;
};

export type GuideCta = {
	label: string;
	href: string;
};

/** Canonical outbound URLs — single source for CTAs, pills, and resource blocks. */
export const externalUrls = {
	steam: brand.gameUrl,
	steamNews: 'https://store.steampowered.com/app/2507950/news/',
	officialSite: 'https://www.playdeltaforce.com/',
	wiki: 'https://deltaforce.fandom.com/wiki/Delta_Force',
	steamCommunity: 'https://steamcommunity.com/app/2507950',
} as const;

/** Authoritative third-party guides — cite official game sources for readers and search engines. */
export const externalResources: ExternalResource[] = [
	{
		id: 'steam',
		label: 'Delta Force on PC',
		href: externalUrls.steam,
		note: 'Official store page, system requirements, and player reviews.',
	},
	{
		id: 'patch',
		label: 'Delta Force patch notes & news',
		href: externalUrls.steamNews,
		note: 'Read official update posts before you change your loadout.',
	},
	{
		id: 'official',
		label: 'Official Delta Force website',
		href: externalUrls.officialSite,
		note: 'Game overview from Team Jade.',
	},
	{
		id: 'wiki',
		label: 'Delta Force Wiki (Fandom)',
		href: externalUrls.wiki,
		note: 'Player stats, maps, and survival mechanics.',
	},
	{
		id: 'community',
		label: 'Delta Force Community hub',
		href: externalUrls.steamCommunity,
		note: 'Announcements and community discussions.',
	},
];

/** Compact above-the-fold guide links for blogs and page banners. */
export const featuredGuidePills: GuideCta[] = [
	{ label: 'Delta Force on PC', href: externalUrls.steam },
	{ label: 'Official patch notes', href: externalUrls.steamNews },
	{ label: 'Delta Force Wiki', href: externalUrls.wiki },
];

/**
 * Secondary banner buttons that should point to official guides — not internal sales pages.
 * Keeps primary Buy CTAs while giving Google clear outbound citations.
 */
export const externalSecondaryByPageId: Partial<Record<PageId, GuideCta>> = {
	features: { label: 'Official patch notes', href: externalUrls.steamNews },
	updates: { label: 'Delta Force patch notes', href: externalUrls.steamNews },
	hacks: { label: 'Delta Force Wiki', href: externalUrls.wiki },
	'delta-force-esp': { label: 'Delta Force Wiki', href: externalUrls.wiki },
	'delta-force-aimbot': { label: 'Delta Force Wiki', href: externalUrls.wiki },
	radar: { label: 'Delta Force Wiki', href: externalUrls.wiki },
	setup: { label: 'Official game site', href: externalUrls.officialSite },
	support: { label: 'Delta Force community', href: externalUrls.steamCommunity },
	faq: { label: 'Delta Force Wiki', href: externalUrls.wiki },
	undetected: { label: 'Delta Force patch notes', href: externalUrls.steamNews },
	wallhack: { label: 'Delta Force Wiki', href: externalUrls.wiki },
	ace: { label: 'Official patch notes', href: externalUrls.steamNews },
	'cheats-2026': { label: 'Delta Force on PC', href: externalUrls.steam },
	'cheat-download': { label: 'Official game site', href: externalUrls.officialSite },
	'mod-menu': { label: 'Delta Force Wiki', href: externalUrls.wiki },
	'soft-aim': { label: 'Delta Force Wiki', href: externalUrls.wiki },
	'best-cheats': { label: 'Delta Force community', href: externalUrls.steamCommunity },
	'aimbot-hack': { label: 'Delta Force Wiki', href: externalUrls.wiki },
	'esp-hack': { label: 'Delta Force Wiki', href: externalUrls.wiki },
	'unlock-all': { label: 'Official game site', href: externalUrls.officialSite },
	pricing: { label: 'Delta Force on PC', href: externalUrls.steam },
};

export function getExternalSecondaryCta(pageId: PageId): GuideCta | undefined {
	return externalSecondaryByPageId[pageId];
}

export function isExternalHref(href: string): boolean {
	return href.startsWith('http');
}
