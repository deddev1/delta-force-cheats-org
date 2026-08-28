/**
 * SINGLE SOURCE OF TRUTH for template rebrands.
 * Employees: use Brand Studio at http://localhost:4321/brand-studio/ during `astro dev`.
 * Do not scatter brand strings across components.
 */
export const brand = {
	/** Public brand name (nav, footer, H1 hero, schema Organization) */
	name: 'Delta Force Cheats',
	/** Short product label if needed */
	shortName: 'Delta Force Cheats',
	/** Canonical origin — no trailing slash */
	url: 'https://deltaforcecheats.org',
	locale: 'en',
	market: 'Worldwide',
	supportEmail: 'support@deltaforcecheats.org',
	checkoutUrl: 'https://zadeyo.com/go/QRH?to=%2Fproducts%2Fdelta-force-novaxware',

	/** Public profiles for Organization sameAs + Twitter cards (edit in Brand Studio). */
	social: {
		twitterSite: '@deltaforcecheats',
		sameAs: [
			'https://x.com/deltaforcecheats',
			'https://www.reddit.com/r/DeltaForceGame/',
			'https://store.steampowered.com/app/2507950/Delta_Force/',
		],
	} as const,

	/** Game this template instance targets */
	game: 'Delta Force',
	/** Official game page — linked from the hero image */
	gameUrl: 'https://store.steampowered.com/app/2507950/Delta_Force/',
	/** Anti-cheat name used in Status / FAQ copy */
	antiCheat: 'ACE',

	logo: '/images/delta-force-cheats-logo.webp',
	logoRaster: '/images/delta-force-cheats-logo.png',
	logoRasterWidth: 512,
	logoRasterHeight: 512,
	logoAlt: 'Delta Force Cheats logo',
	defaultOgImage: '/images/delta-force-cheats-hero-1199w.webp',
	heroImage: '/images/delta-force-cheats-hero-1199w.webp',
	/** Product demo clip — lazy-loaded on homepage; fetched only after play */
	demoVideoUrl: 'https://deltaforcecheats.org/videos/hero.webm',
	demoVideoPoster: '/images/delta-force-screenshot-06.webp',

	plans: [
		{ id: 'monthly', label: 'Monthly', price: 35, duration: 'P30D' },
		{ id: 'lifetime', label: 'Lifetime', price: 150, duration: 'P99Y' },
	] as const,
	currency: 'USD',
	platforms: ['Windows PC'] as const,

	/**
	 * Site color tones — accent + canvas + soft/deep/hover/panel.
	 * Edit in Brand Studio → Colors (tones are fully customizable).
	 */
	theme: {
		accent: '#4ADE80',
		bg: '#07090A',
		soft: '#FFFFFF',
		deep: '#166534',
		hover: '#22C55E',
		panel: '#0E1113',
		elevated: '#15191B',
		line: '#252A2C',
		ink: '#F1F3F3',
		inkHeading: '#FFFFFF',
		inkSecondary: '#C5CACA',
		inkMuted: '#8D9698',
		link: '#4ADE80',
	},

	/**
	 * Keyword system — primary drives titles; list feeds schema / meta keywords.
	 * Page-specific targeting lives in src/data/seo-keywords.ts
	 */
	keywords: {
		primary: 'delta force cheats',
		list: [
			'delta force cheats',
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
			'undetected delta force cheats',
			'delta force cheats undetected',
			'delta force aimbot hack',
			'delta force esp hack',
			'best delta force cheats 2026',
			'delta force cheats for ranked',
			'delta force external cheat',
		] as const,
	},

	/**
	 * Editable SEO meta — tokens: {brand} {game} {antiCheat} {email} {primaryKeyword}
	 * Aim ~50–60 chars titles, ~140–160 chars descriptions.
	 */
	seo: {
		homeTitle: 'Delta Force Cheats 2026 | ESP, Aimbot & Radar',
		homeDescription:
			'Buy undetected Delta Force cheats — ESP, aimbot, wallhack & radar for Operations & Warfare on PC. ACE updates included. Plans from $35/month.',
		featuresTitle: 'Delta Force Cheats Features | ESP & Aimbot',
		featuresDescription:
			'Full Delta Force cheats feature list — ESP wallhack, soft aim, 2D radar & toggles for Operations & Warfare on PC. ACE maintenance at deltaforcecheats.org.',
		storeTitle: 'Delta Force Cheats Pricing | $35/mo Lifetime',
		storeDescription:
			'Buy Delta Force cheats — $35/month or $150 lifetime. ESP, aimbot & radar for Operations & Warfare on PC. Instant digital delivery worldwide.',
		statusTitle: 'Delta Force Status | Undetected {antiCheat} Updates',
		statusDescription:
			'Live status after {game} & {antiCheat} patches. Check undetected ESP, aimbot & radar rebuilds on PC before you queue. Status updated at deltaforcecheats.org.',
		previewTitle: 'Delta Force Cheats | ESP, Aimbot & Radar Guide',
		previewDescription:
			'Delta Force cheats guide — undetected ESP wallhack, soft aim, radar & {antiCheat} rebuilds for Operations & Warfare on PC. Buy from $35 at deltaforcecheats.org.',
		setupTitle: 'Delta Force Cheats Setup | Windows PC Install Guide',
		setupDescription:
			'Install {brand} on PC — activate ESP, soft aim & radar step by step. Setup guide at deltaforcecheats.org. Check {antiCheat} status before your first match.',
		supportTitle: 'Delta Force Cheats Support | License & Setup Help',
		supportDescription:
			'Support for license delivery, ESP setup & billing on PC. Email {email} with your order ID. Fast help at deltaforcecheats.org/support before you play.',
		faqTitle: 'Delta Force Cheats FAQ | ESP, Aimbot & ACE',
		faqDescription:
			'FAQ for Delta Force cheats — delivery, setup, Operations & Warfare use, {antiCheat} updates & pricing on PC. Answers at deltaforcecheats.org before you buy.',
		reviewsTitle: 'Delta Force Cheats Reviews | Hacks & Cheats',
		reviewsDescription:
			'Real buyer reviews for Delta Force cheats and Delta Force hacks — ESP, soft aim, radar & {antiCheat} maintenance on PC. See license holder feedback at deltaforcecheats.org.',
		blogTitle: 'Delta Force Blog | Guides & Patch Tips | {brand}',
		blogDescription:
			'Delta Force guides — ranked tips, ESP & aimbot notes, operator tiers & {antiCheat} updates for PC. Read patch notes and buyer guides at deltaforcecheats.org/blog.',
	},

	/** On-page marketing copy (tokens allowed) */
	copy: {
		tagline: 'Undetected {primaryKeyword} — ESP, aimbot, and radar for PC',
		summary: '{brand} is an undetected {game} cheats package for Windows PC. Includes ESP, soft aim, and radar, with {antiCheat} maintenance after patches.',
		heroLede: 'Undetected ESP, soft aim, and radar for Delta Force on Windows PC.',
		blogLabel: 'Delta Force Intel',
		ctaBuy: 'Get Access',
		ctaBuyShort: 'Buy',
		featuresIntro: 'Everything included in one license for {game} on Windows PC.',
		storeIntro: 'Pick a plan. Same features on both. Instant delivery after payment.',
		statusIntro: 'Check here after a {game} or {antiCheat} patch before you queue.',
		previewIntro: '{brand} for Delta Force — ESP wallhack, soft aim, 2D radar, and ACE rebuilds after patches.',
		setupIntro: 'Install {brand} on Windows PC after you buy. Follow these short steps.',
		supportIntro: 'Need help with {brand}? Email {email} with your order ID.',
		faqIntro: 'Short answers about delivery, setup, updates, and refunds.',
		reviewsIntro:
			'Real feedback on Delta Force cheats and Delta Force hacks — ESP, soft aim, radar, and support from {brand} buyers.',
		chipEsp: 'ESP / wallhack',
		chipAim: 'Soft aim',
		chipRadar: '2D radar',
		chipUpdates: 'Patch updates',
		navPreview: 'Cheats',
		navFeatures: 'Features',
		navStore: 'Store',
		navStatus: 'Status',
		navReviews: 'Reviews',
	},

	/**
	 * Sitemap labels — XML is generated at build/dev from routes + these strings.
	 * Domain comes from `url` (also written to robots.txt via sync:brand).
	 * Tokens: {brand} {game} {antiCheat} {email} {primaryKeyword}
	 */
		sitemap: {
		/** YYYY-MM-DD — Brand Studio can bump this on refresh crawl dates */
		contentLastmod: '2026-08-25',
		blogImageTitle: '{brand} blog',
		blogImageCaption: 'Tips and updates for {primaryKeyword}',
		reviewsImageTitle: '{brand} reviews',
		reviewsImageCaption: 'Delta Force cheats & Delta Force hacks — what buyers say about {primaryKeyword}',
		images: [
			{
				src: '/images/delta-force-screenshot-01.webp',
				title: 'Delta Force ESP loot and item detection',
				caption: 'Delta Force ESP wallhack with distance-tagged loot boxes and weapons',
			},
			{
				src: '/images/delta-force-screenshot-02.webp',
				title: 'Delta Force wallhack ESP overlay',
				caption: 'Delta Force wallhack ESP with loot tags visible through walls',
			},
			{
				src: '/images/delta-force-screenshot-03.webp',
				title: 'Delta Force cheats in-match view',
				caption: 'Delta Force gameplay session with cheats running on Windows PC',
			},
			{
				src: '/images/delta-force-screenshot-04.webp',
				title: 'Delta Force ESP player tracking',
				caption: 'Delta Force ESP showing enemy names, health, and distance through the map',
			},
			{
				src: '/images/delta-force-screenshot-05.webp',
				title: 'Delta Force ESP threat markers',
				caption: 'Delta Force ESP distance markers for players and loot in live matches',
			},
			{
				src: '/images/delta-force-screenshot-06.webp',
				title: 'Delta Force cheats combat ESP',
				caption: 'Delta Force cheats ESP active during a live Delta Force match',
			},
			{
				src: '/images/delta-force-screenshot-07.webp',
				title: 'Delta Force wallhack player ESP',
				caption: 'Delta Force wallhack ESP with player outlines and distance tags',
			},
			{
				src: '/images/delta-force-screenshot-08.webp',
				title: 'Delta Force ESP and loot ESP gameplay',
				caption: 'Delta Force ESP loot tags and wallhack overlay during ranked gameplay',
			},
		],
	},
} as const;

export type Brand = typeof brand;

/** Replace {brand} {game} {antiCheat} {email} {primaryKeyword} {checkout} */
export function fillBrandTokens(input: string): string {
	return input
		.replaceAll('{brand}', brand.name)
		.replaceAll('{game}', brand.game)
		.replaceAll('{antiCheat}', brand.antiCheat)
		.replaceAll('{email}', brand.supportEmail)
		.replaceAll('{primaryKeyword}', brand.keywords.primary)
		.replaceAll('{checkout}', brand.checkoutUrl);
}

/** Locked title formula fallback: `{Game} {Topic} | {Brand}` */
export function seoTitle(topic: string): string {
	const title = `${brand.game} ${topic} | ${brand.name}`;
	return title.length <= 60 ? title : `${topic} | ${brand.name}`;
}

/** Keep descriptions in Google's preferred range (~140–160 chars). */
export function seoDescription(template: string): string {
	let text = fillBrandTokens(template).trim();
	if (text.length < 140) {
		const pad = text.toLowerCase().includes('deltaforcecheats.org')
			? ' Windows PC license with ACE maintenance after patches.'
			: ' Compare plans and guides at deltaforcecheats.org.';
		text = `${text.replace(/[.…]+$/, '')}.${pad}`;
	}
	if (text.length <= 160) return text;
	const trimmed = text.slice(0, 160);
	const lastSpace = trimmed.lastIndexOf(' ');
	return lastSpace > 130 ? trimmed.slice(0, lastSpace) : trimmed.slice(0, 160);
}

/** Resolved EN home meta from brand.seo (title clamp lives in site-core.seoPageTitle). */
export function homeSeo() {
	return {
		title: fillBrandTokens(brand.seo.homeTitle),
		description: seoDescription(brand.seo.homeDescription),
	};
}
