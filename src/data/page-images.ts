import { siteConfig } from './site';
import { pageIds, type PageId } from './i18n/routing';
import { pageSitemapImageLabels } from './brand-sitemap';

import { screenshotSrc, PRODUCT_SCREENSHOT_COUNT } from './product-images';

const shot = screenshotSrc;

/** Rotating product screenshots for FAQ / review detail URLs. */
export const crawlPhotoPool = Array.from({ length: PRODUCT_SCREENSHOT_COUNT }, (_, i) => shot(i + 1));

/**
 * One primary crawl/OG photo per product page.
 * Prefer compressed WebP screenshots so Google can fetch them quickly.
 */
export const pageImageSrcById: Record<PageId, string> = {
	home: '/images/delta-force-cheats-hero-1199w.webp',
	'delta-force-esp': shot(1),
	'delta-force-aimbot': shot(3),
	features: shot(4),
	pricing: shot(2),
	setup: shot(5),
	updates: shot(6),
	faq: shot(7),
	support: shot(2),
	undetected: shot(6),
	wallhack: shot(2),
	radar: shot(5),
	ace: shot(3),
	'cheats-2026': shot(1),
	hacks: shot(3),
	'cheat-download': shot(8),
	'mod-menu': shot(4),
	'soft-aim': shot(3),
	'best-cheats': shot(1),
	'aimbot-hack': shot(3),
	'esp-hack': shot(2),
	'unlock-all': shot(7),
	privacy: shot(8),
	refund: shot(6),
	terms: shot(4),
};

for (const pageId of pageIds) {
	if (!pageImageSrcById[pageId]) {
		throw new Error(`[page-images] No image path configured for pageId: ${pageId}`);
	}
}

export function absoluteImageUrl(path: string): string {
	return new URL(path, siteConfig.url).href;
}

export function getPageImageSrc(pageId: PageId): string {
	return pageImageSrcById[pageId];
}

export function getPageCrawlImage(pageId: PageId): {
	src: string;
	url: string;
	title: string;
	caption: string;
} {
	const src = pageImageSrcById[pageId];
	const labels = pageSitemapImageLabels(pageId);
	return {
		src,
		url: absoluteImageUrl(src),
		title: labels.title,
		caption: labels.caption,
	};
}

/** Stable pick from the photo pool (FAQ answers, reviews, etc.). */
export function pickCrawlPhoto(seed: string): string {
	let hash = 0;
	for (let i = 0; i < seed.length; i += 1) {
		hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
	}
	return crawlPhotoPool[hash % crawlPhotoPool.length];
}

export function crawlPhotoMeta(
	seed: string,
	title: string,
	caption: string,
): { src: string; url: string; title: string; caption: string } {
	const src = pickCrawlPhoto(seed);
	return {
		src,
		url: absoluteImageUrl(src),
		title,
		caption,
	};
}

/** Default large social / SERP image when a page has no specific asset. */
export const defaultCrawlImageSrc = pageImageSrcById.home;

/** Reviews index banner — user in-match screenshot with -480w / -960w variants. */
export const reviewsImageSrc = '/images/reviews-banner.webp';
