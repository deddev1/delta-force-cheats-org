/** Shared constants for i18n content generation. */

export const LOCALES = [
	'en', 'es', 'fr', 'de', 'pt', 'it', 'nl', 'pl', 'ru', 'tr',
	'ar', 'ja', 'ko', 'zh', 'hi', 'id', 'th', 'vi', 'uk', 'cs', 'ro', 'sv',
];

export const PAGE_IDS = [
	'home', 'delta-force-esp', 'delta-force-aimbot', 'features', 'pricing', 'setup',
	'updates', 'faq', 'support', 'undetected', 'wallhack', 'radar', 'ace',
	'cheats-2026', 'hacks', 'cheat-download', 'mod-menu', 'soft-aim', 'best-cheats',
	'aimbot-hack', 'esp-hack', 'unlock-all', 'privacy', 'refund', 'terms',
];

/** Hero image per page — simple delta force cheats keyword filenames. */
export const HERO_IMAGES = {
	home: '/images/delta-force-cheats-hero-1199w.webp',
	'delta-force-esp': '/images/delta-force-cheats-radar.webp',
	'delta-force-aimbot': '/images/delta-force-cheats-aimbot.webp',
	features: '/images/delta-force-cheats-aimbot-view.webp',
	pricing: '/images/delta-force-cheats-session.webp',
	setup: '/images/delta-force-cheats-radar.webp',
	updates: '/images/delta-force-cheats-esp.webp',
	faq: '/images/delta-force-cheats-aimbot-view.webp',
	support: '/images/delta-force-cheats-session.webp',
	undetected: '/images/delta-force-cheats-wallhack.webp',
	wallhack: '/images/delta-force-cheats-wallhack.webp',
	radar: '/images/delta-force-cheats-radar.webp',
	ace: '/images/delta-force-cheats-aimbot.webp',
	'cheats-2026': '/images/delta-force-cheats-esp.webp',
	hacks: '/images/delta-force-cheats-combat.webp',
	'cheat-download': '/images/delta-force-cheats-session.webp',
	'mod-menu': '/images/delta-force-cheats-radar.webp',
	'soft-aim': '/images/delta-force-cheats-aimbot-view.webp',
	'best-cheats': '/images/delta-force-cheats-esp.webp',
	'aimbot-hack': '/images/delta-force-cheats-aimbot-view.webp',
	'esp-hack': '/images/delta-force-cheats-wallhack.webp',
	'unlock-all': '/images/delta-force-cheats-radar.webp',
	privacy: '/images/delta-force-cheats-aimbot.webp',
	refund: '/images/delta-force-cheats-session.webp',
	terms: '/images/delta-force-cheats-aimbot-view.webp',
};

export const TS_HEADER = `import type { LocaleCode } from './locales';

export type PageSection = { h2: string; paragraphs: string[]; list?: string[] };
export type PageContent = {
\ttitle: string;
\tdescription: string;
\th1: string;
\tintro: string;
\timageAlt: string;
\tgalleryTitle: string;
\theroImage: string;
\tsections: PageSection[];
\tctaPrimary: string;
\tctaSecondary?: string;
\tctaSecondaryHref?: string;
};
export type LocaleUi = {
\tnav: { home: string; hacks: string; aimbot: string; esp: string; features: string; pricing: string; setup: string; updates: string; faq: string; buyNow: string };
\thero: { accent: string; accentShort: string; subtitle: string; subtitleShort: string; buyNow: string; seeFeatures: string };
\ttrust: { status: string; statusNote: string; statusShort: string; delivery: string; platform: string; antiCheat: string; antiCheatShort: string };
\tproduct: { title: string; addToCart: string; monthly: string; lifetime: string; available: string; gameBadge: string; platformBadge: string; statusBadge: string };
\treviews: { title: string; subtitle: string; outOf: string; countLabel: string };
\tcommon: { buyNow: string; readGuide: string; language: string; officialLanguageNote: string; relatedPages: string };
\tfooter: { explore: string; help: string; tagline: string };
\timages: {
\t\thero: string; espWallhack: string; aimbotCombat: string; squadFight: string; playerEsp: string;
\t\theaderArt: string; hacksPackage: string; matchFight: string; battleRoyale: string; matchMap: string;
\t};
};
export type PageId = 'home' | 'delta-force-esp' | 'delta-force-aimbot' | 'features' | 'pricing' | 'setup' | 'updates' | 'faq' | 'support' | 'undetected' | 'wallhack' | 'radar' | 'ace' | 'cheats-2026' | 'hacks' | 'cheat-download' | 'mod-menu' | 'soft-aim' | 'best-cheats' | 'aimbot-hack' | 'esp-hack' | 'unlock-all' | 'privacy' | 'refund' | 'terms';
`;

/** Clamp meta strings to SEO limits without ugly ellipsis. */
export function clampTitle(s) {
	if (s.length <= 60) return s;
	const trimmed = s.slice(0, 60);
	const lastSpace = trimmed.lastIndexOf(' ');
	return lastSpace > 45 ? trimmed.slice(0, lastSpace) : trimmed.slice(0, 60);
}

export function clampDesc(s) {
	let text = s.trim();
	const MIN = 140;
	const MAX = 160;
	if (text.length < MIN) {
		const pad = text.toLowerCase().includes('deltaforcecheats.org')
			? ' Windows PC license with ACE maintenance after patches.'
			: ' Compare plans and guides at deltaforcecheats.org.';
		text = `${text.replace(/[.…]+$/, '')}.${pad}`;
	}
	if (text.length <= MAX) return text;
	const trimmed = text.slice(0, MAX);
	const lastSpace = trimmed.lastIndexOf(' ');
	return lastSpace > 130 ? trimmed.slice(0, lastSpace) : trimmed.slice(0, MAX);
}

/** Remove Zadeyo from meta title/description strings only. */
export function stripZadeyoFromMeta(text) {
	return text
		.replace(/\s*[—–-]\s*checkout via Zadeyo\.?/gi, '.')
		.replace(/\s*[—–-]\s*checkout en Zadeyo\.?/gi, '.')
		.replace(/\s*[—–-]\s*checkout über Zadeyo\.?/gi, '.')
		.replace(/\s*with Zadeyo checkout\.?/gi, '.')
		.replace(/\s*via Zadeyo checkout\.?/gi, '.')
		.replace(/\s*Checkout via Zadeyo\.?/gi, '')
		.replace(/\s*Zadeyo checkout,?\s*/gi, ' ')
		.replace(/\s*Zadeyo delivery\.?/gi, ' instant digital delivery.')
		.replace(/\s*and Zadeyo delivery\.?/gi, ' and instant digital delivery.')
		.replace(/\|\s*Instant Zadeyo Delivery/g, '| Instant Digital Delivery')
		.replace(/Buy on Zadeyo/g, 'Buy Delta Force Cheats')
		.replace(/\s{2,}/g, ' ')
		.trim();
}

/** Build a page section. Pass 2+ paragraph strings; optional trailing string[] becomes list. */
export function section(h2, ...args) {
	let list;
	const paragraphs = [...args];
	if (paragraphs.length && Array.isArray(paragraphs[paragraphs.length - 1])) {
		list = paragraphs.pop();
	}
	if (paragraphs.length < 2) {
		throw new Error(`section "${h2}" needs at least 2 paragraphs`);
	}
	const sec = { h2, paragraphs };
	if (list?.length) sec.list = list;
	return sec;
}

/** Authoritative external citation helpers (open in new tab). */
export const EXT = {
	game:
		'<a href="https://store.steampowered.com/app/2507950/Delta_Force/" target="_blank" rel="noopener noreferrer">Delta Force</a>',
	activision:
		'<a href="https://store.steampowered.com/app/2507950/Delta_Force/" target="_blank" rel="noopener noreferrer">Delta Force</a>',
	rust:
		'<a href="https://store.steampowered.com/app/2507950/Delta_Force/" target="_blank" rel="noopener noreferrer">Delta Force</a>',
	finals:
		'<a href="https://store.steampowered.com/app/2507950/Delta_Force/" target="_blank" rel="noopener noreferrer">Delta Force</a>',
	game:
		'<a href="https://store.steampowered.com/app/2507950/Delta_Force/" target="_blank" rel="noopener noreferrer">Delta Force</a>',
	valorant:
		'<a href="https://store.steampowered.com/app/2507950/Delta_Force/" target="_blank" rel="noopener noreferrer">Delta Force</a>',
	status:
		'<a href="https://store.steampowered.com/app/2507950/news/" target="_blank" rel="noopener noreferrer">Delta Force patch notes</a>',
	eac:
		'<a href="https://www.pcgamingwiki.com/wiki/Delta_Force_(2024)#Anti-cheat" target="_blank" rel="noopener noreferrer">ACE anti-cheat</a>',
	ace:
		'<a href="https://www.pcgamingwiki.com/wiki/Delta_Force_(2024)#Anti-cheat" target="_blank" rel="noopener noreferrer">ACE anti-cheat</a>',
};
