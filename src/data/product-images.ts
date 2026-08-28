import { siteConfig } from './site';

/** User-provided Supabase originals — kept for provenance; site serves optimized WebP copies. */
export const PRODUCT_SCREENSHOT_SOURCES = [
	'https://boqgsoiwnpbisvrxulbe.supabase.co/storage/v1/object/public/valo/valo%20cheats/Screenshot%202026-08-13%20185425.png',
	'https://boqgsoiwnpbisvrxulbe.supabase.co/storage/v1/object/public/valo/valo%20cheats/Screenshot%202026-08-13%20185442.png',
	'https://boqgsoiwnpbisvrxulbe.supabase.co/storage/v1/object/public/valo/valo%20cheats/Screenshot%202026-08-13%20185513.png',
	'https://boqgsoiwnpbisvrxulbe.supabase.co/storage/v1/object/public/valo/valo%20cheats/Screenshot%202026-08-13%20185527.png',
	'https://boqgsoiwnpbisvrxulbe.supabase.co/storage/v1/object/public/valo/valo%20cheats/Screenshot%202026-08-13%20185540.png',
	'https://boqgsoiwnpbisvrxulbe.supabase.co/storage/v1/object/public/valo/valo%20cheats/Screenshot%202026-08-13%20185621.png',
	'https://boqgsoiwnpbisvrxulbe.supabase.co/storage/v1/object/public/valo/valo%20cheats/Screenshot%202026-08-13%20185635.png',
	'https://boqgsoiwnpbisvrxulbe.supabase.co/storage/v1/object/public/valo/valo%20cheats/Screenshot%202026-08-13%20185646.png',
] as const;

export const PRODUCT_SCREENSHOT_COUNT = PRODUCT_SCREENSHOT_SOURCES.length;

export type ProductScreenshotMeta = {
	id: number;
	src: string;
	url: string;
	sourceUrl: string;
	alt: string;
	title: string;
	caption: string;
};

const alts: Record<number, { alt: string; title: string; caption: string }> = {
	1: {
		alt: 'Delta Force ESP showing loot box and weapon labels through walls',
		title: 'Delta Force ESP loot and item detection',
		caption: 'Delta Force ESP wallhack with distance-tagged loot boxes and weapons',
	},
	2: {
		alt: 'Delta Force wallhack ESP highlighting weapons and corpses through geometry',
		title: 'Delta Force wallhack ESP overlay',
		caption: 'Delta Force wallhack ESP with loot tags visible through walls',
	},
	3: {
		alt: 'Delta Force third-person gameplay view on Windows PC',
		title: 'Delta Force cheats in-match view',
		caption: 'Delta Force gameplay session with cheats running on Windows PC',
	},
	4: {
		alt: 'Delta Force ESP player tracking with names and distance readouts',
		title: 'Delta Force ESP player tracking',
		caption: 'Delta Force ESP showing enemy names, health, and distance through the map',
	},
	5: {
		alt: 'Delta Force ESP radar-style player and loot markers in match',
		title: 'Delta Force ESP threat markers',
		caption: 'Delta Force ESP distance markers for players and loot in live matches',
	},
	6: {
		alt: 'Delta Force cheats ESP overlay during combat on Windows PC',
		title: 'Delta Force cheats combat ESP',
		caption: 'Delta Force cheats ESP active during a live Delta Force match',
	},
	7: {
		alt: 'Delta Force wallhack ESP with player outlines and corpse tags',
		title: 'Delta Force wallhack player ESP',
		caption: 'Delta Force wallhack ESP with player outlines and distance tags',
	},
	8: {
		alt: 'Delta Force ESP loot detection and in-match overlay',
		title: 'Delta Force ESP and loot ESP gameplay',
		caption: 'Delta Force ESP loot tags and wallhack overlay during ranked gameplay',
	},
};

export function screenshotSrc(n: number): string {
	const id = ((n - 1) % PRODUCT_SCREENSHOT_COUNT) + 1;
	return `/images/delta-force-screenshot-${String(id).padStart(2, '0')}.webp`;
}

export function absoluteScreenshotUrl(n: number): string {
	return new URL(screenshotSrc(n), siteConfig.url).href;
}

export function getProductScreenshot(n: number): ProductScreenshotMeta {
	const id = ((n - 1) % PRODUCT_SCREENSHOT_COUNT) + 1;
	const meta = alts[id] ?? {
		alt: `Delta Force Cheats gameplay screenshot ${id}`,
		title: `Delta Force Cheats screenshot ${id}`,
		caption: `Delta Force Cheats screenshot ${id} for Delta Force on Windows PC`,
	};
	const src = screenshotSrc(id);
	return {
		id,
		src,
		url: new URL(src, siteConfig.url).href,
		sourceUrl: PRODUCT_SCREENSHOT_SOURCES[id - 1]!,
		...meta,
	};
}

export const productScreenshots: ProductScreenshotMeta[] = Array.from(
	{ length: PRODUCT_SCREENSHOT_COUNT },
	(_, i) => getProductScreenshot(i + 1),
);

/** JSON-LD ImageObject nodes for gallery / sitemap parity. */
export function screenshotImageObjects(limit = PRODUCT_SCREENSHOT_COUNT) {
	return productScreenshots.slice(0, limit).map((shot) => ({
		'@type': 'ImageObject' as const,
		'@id': `${shot.url}#image`,
		url: shot.url,
		contentUrl: shot.url,
		name: shot.title,
		description: shot.caption,
		thumbnailUrl: shot.url,
	}));
}
