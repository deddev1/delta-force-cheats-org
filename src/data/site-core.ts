import { brand, fillBrandTokens, seoDescription, seoTitle } from './brand';
import { globalSeoKeywords } from './seo-keywords';

/**
 * Title clamp lives here — NOT in brand.ts.
 * Brand Studio rewrites brand.ts on every save; helpers here stay stable.
 */
export function seoPageTitle(template: string): string {
	let text = fillBrandTokens(template).trim();
	if (text.length < 30) {
		text = `${text} | Delta Force Cheats PC`;
	}
	/** Google SERP titles typically display ~50–60 chars; clamp at 60. */
	if (text.length <= 60) return text;
	const trimmed = text.slice(0, 60);
	const lastSpace = trimmed.lastIndexOf(' ');
	return lastSpace > 45 ? trimmed.slice(0, lastSpace) : trimmed.slice(0, 60);
}

export { brand, fillBrandTokens, seoDescription, seoTitle };

const copyDefaults = {
	tagline: 'Undetected {primaryKeyword} — ESP, aimbot, and radar for PC',
	summary:
		'{brand} is an undetected {game} cheat package for Windows PC. Includes ESP, soft aim, and radar, with {antiCheat} maintenance after patches.',
	heroLede: 'Hacks and cheats available — 0% detection.',
	blogLabel: '{game} Intel',
	ctaBuy: 'Buy now',
	ctaBuyShort: 'Buy',
	featuresIntro: 'Everything included in one license for {game} on Windows PC.',
	storeIntro: 'Pick a plan. Same features on both. Instant delivery after payment.',
	statusIntro: 'Check here after a {game} or {antiCheat} patch before you play.',
	previewIntro: 'A quick look at {brand} — ESP, aimbot, radar, and updates after patches.',
	setupIntro: 'Install {brand} on Windows PC after you buy. Follow these short steps.',
	supportIntro: 'Need help with {brand}? Email {email} with your order ID.',
	faqIntro: 'Short answers about delivery, setup, updates, and refunds.',
	reviewsIntro:
		'Real feedback on Delta Force cheats and Delta Force hacks — ESP, soft aim, radar, and support from {brand} buyers.',
	chipEsp: 'ESP / wallhack',
	chipAim: 'Soft aim',
	chipRadar: '2D radar',
	chipUpdates: 'Patch updates',
	navPreview: 'Preview',
	navFeatures: 'Features',
	navStore: 'Store',
	navStatus: 'Status',
	navReviews: 'Reviews',
} as const;

const seoDefaults = {
	homeTitle: 'Delta Force Cheats | Undetected ESP, Aimbot & Radar',
	homeDescription:
		'Buy undetected Delta Force cheats at deltaforcecheats.org — ESP, aimbot, wallhack & radar for PC. ACE updates included. Plans from $35/month.',
	featuresTitle: 'Delta Force Cheats Features | ESP, Aimbot & Radar',
	featuresDescription:
		'Full Delta Force cheats feature list — ESP wallhack, soft aim, 2D radar & mod menu toggles on PC. {antiCheat} maintenance at deltaforcecheats.org.',
	storeTitle: 'Delta Force Cheats Pricing | $35/mo or $150 Lifetime',
	storeDescription:
		'Buy Delta Force cheats at deltaforcecheats.org — $35/month or $150 lifetime. ESP, aimbot & radar on PC. Same features, instant delivery.',
	statusTitle: 'Delta Force Status | Undetected {antiCheat} Updates',
	statusDescription:
		'Live status after {game} & {antiCheat} patches. Check undetected ESP, aimbot & radar rebuilds on PC before you queue. deltaforcecheats.org.',
	previewTitle: 'Delta Force Cheats | ESP, Aimbot & Wallhack Guide',
	previewDescription:
		'Delta Force cheats guide — undetected ESP wallhack, soft aim, radar & {antiCheat} rebuilds on PC. Compare features & buy from $35 at deltaforcecheats.org.',
	setupTitle: 'Delta Force Cheats Setup | Windows PC Install Guide',
	setupDescription:
		'Install {brand} on PC — activate ESP, soft aim & radar step by step. Setup guide at deltaforcecheats.org. Check {antiCheat} status before your first match.',
	supportTitle: 'Delta Force Cheats Support | License & Setup Help',
	supportDescription:
		'Support for license delivery, ESP setup & billing on PC. Email {email} with your order ID. deltaforcecheats.org/support.',
	faqTitle: 'Delta Force Cheats FAQ | ESP, Aimbot & {antiCheat}',
	faqDescription:
		'FAQ for delta force cheats — delivery, setup, undetected status, {antiCheat} updates & pricing on PC. Answers at deltaforcecheats.org before you buy.',
	reviewsTitle: 'Delta Force Cheats Reviews | Delta Force Hacks & Cheats',
	reviewsDescription:
		'Real buyer reviews for Delta Force cheats and Delta Force hacks — ESP, soft aim, radar & {antiCheat} maintenance on PC. See what license holders say at deltaforcecheats.org.',
	blogTitle: 'Delta Force Blog | Guides & Patch Tips | {brand}',
	blogDescription:
		'Delta Force guides — ranked tips, ESP & aimbot notes, operator tiers & {antiCheat} updates for PC. Read the blog at deltaforcecheats.org/blog.',
} as const;

type SeoShape = typeof seoDefaults;
type CopyShape = typeof copyDefaults;

/** Always-safe copy/seo — Brand Studio saves must never crash the site. */
const brandExtra = brand as typeof brand & { seo?: Partial<SeoShape>; copy?: Partial<CopyShape> };
export const brandSeo: SeoShape = { ...seoDefaults, ...brandExtra.seo };
export const brandCopy: CopyShape = { ...copyDefaults, ...brandExtra.copy };

/** Resolved EN home meta */
export function homeSeo() {
	return {
		title: seoPageTitle(brandSeo.homeTitle),
		description: seoDescription(brandSeo.homeDescription),
	};
}

/** Site config derived from brand — import this in layouts/components. */
export const siteConfig = {
	name: brand.name,
	url: brand.url,
	locale: brand.locale,
	market: brand.market,
	supportEmail: brand.supportEmail,
	logo: brand.logo,
	logoRaster: brand.logoRaster,
	logoRasterWidth: brand.logoRasterWidth,
	logoRasterHeight: brand.logoRasterHeight,
	logoAlt: brand.logoAlt,
	checkoutUrl: brand.checkoutUrl,
	gameUrl: brand.gameUrl,
	defaultOgImage: brand.defaultOgImage,
	heroImage: brand.heroImage,
	demoVideoUrl: brand.demoVideoUrl,
	demoVideoPoster: brand.demoVideoPoster,
	twitterSite: brand.social.twitterSite,
	socialSameAs: [...brand.social.sameAs],
} as const;

/** Prefer brand.keywords — kept for Layout meta keywords. */
export const seoKeywords = globalSeoKeywords;

/** Blog eyebrow / title suffix */
export const blogLabel = fillBrandTokens(brandCopy.blogLabel);

export const productInfo = {
	name: brand.name,
	shortName: brand.game,
	brand: brand.name,
	tagline: fillBrandTokens(brandCopy.tagline),
	summary: fillBrandTokens(brandCopy.summary),
	game: brand.game,
	delivery: 'Digital license delivery after purchase confirmation',
	platforms: [...brand.platforms],
	updateCadence: fillBrandTokens(
		'Updates are published when {game} or {antiCheat} patches need a rebuild',
	),
	supportHours: 'Support requests are reviewed daily',
	plans: brand.plans.map((p) => ({ ...p })),
	currency: brand.currency,
	heroLede: fillBrandTokens(brandCopy.heroLede),
	features: {
		esp: [
			'Solo farmers and matchers ESP / wallhack',
			'Player growth stage and threat cues',
			'Loot and operator markers',
			'Distance readouts',
			'Toggleable ESP categories',
			'Corpse and loot highlights',
		],
		aimbot: [
			'Soft aim and aimbot controls',
			'Smoothness and FOV settings',
			'Bone priority',
			'Hotkeys mid-session',
			'Per-weapon profiles',
		],
		radar: ['2D radar overlay', 'Adjustable range', 'Works in Operations and Warfare matches'],
		general: [
			fillBrandTokens('{antiCheat} maintenance after patches'),
			'Digital delivery after checkout',
			'Setup guide and support',
		],
	},
} as const;
