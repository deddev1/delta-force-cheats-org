#!/usr/bin/env node
/**
 * Generates public/locales/{locale}/translation.json for all 22 locales.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { LOCALES } from './i18n-data/constants.mjs';
import { allUiStrings } from './i18n-data/ui-strings.mjs';
import { buildLocaleOverlay } from './i18n-data/locale-overlays.mjs';
import { FAQ_I18N } from './i18n-data/faq-i18n.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const EN_FILE = path.join(ROOT, 'public', 'locales', 'en', 'translation.json');
const ES_FILE = path.join(ROOT, 'public', 'locales', 'es', 'translation.json');

function deepMerge(base, overlay) {
	const out = structuredClone(base);
	for (const [key, value] of Object.entries(overlay)) {
		if (value && typeof value === 'object' && !Array.isArray(value)) {
			out[key] = deepMerge(out[key] ?? {}, value);
		} else if (value !== undefined) {
			out[key] = value;
		}
	}
	return out;
}

function flattenExternalResources(ext) {
	if (!ext) return {};
	const { title, lede, pillsTitle, pillsLabel, steam, patch, official, wiki, community, ...rest } = ext;
	return {
		title,
		lede,
		pillsTitle,
		pillsLabel,
		steam,
		patch,
		official,
		wiki,
		community,
		...rest,
	};
}

function buildFaqOverlay(locale, enFaq) {
	const map = FAQ_I18N[locale];
	if (!map) return {};
	return { items: map };
}

/** English FAQ seed for translation.json */
const EN_FAQ_ITEMS = {
	'what-are-delta-force-cheats': {
		q: 'What is Delta Force Cheats?',
		a: 'Delta Force Cheats is an undetected delta force cheats package for Delta Force on Windows PC. It includes ESP wallhack, 2D radar, and aimbot controls, with ACE maintenance and setup support.',
	},
	'are-delta-force-cheats-undetected-in-2026': {
		q: 'Are delta force cheats undetected in 2026?',
		a: 'Delta Force Cheats is maintained for Delta Force with rebuilds after ACE and game patches. Check the Status page before you queue. No cheat can guarantee permanent undetected status — maintenance and responsible use matter.',
	},
	'solo-farmer-and-raider-sessions': {
		q: 'Does this work in Operations and Warfare matches?',
		a: 'Yes. ESP, radar, and aimbot are built for Delta Force match flow — reading enemy operators, tracking loot and soul jades, and staying aware near POIs and objectives and extraction points in Quick Match and Ranked.',
	},
	'esp-wallhack-radar-or-aimbot': {
		q: 'What is included — ESP, wallhack, radar, or Aimbot?',
		a: 'Delta Force Cheats bundles ESP wallhack, operator markers, 2D radar cues, and configurable Aimbot in one license. See Features for the full list.',
	},
	'how-are-licenses-delivered': {
		q: 'How are licenses delivered?',
		a: 'After payment is confirmed, Delta Force Cheats license details are delivered digitally through checkout. Timing can vary by payment method and order review. Keep your order confirmation ready if you contact support.',
	},
	'where-to-check-updates': {
		q: 'Where do I check updates after a Delta Force or ACE patch?',
		a: 'Maintenance notes are posted on the Status page when a Delta Force or ACE update affects the package. That is the fastest place to confirm whether a new Delta Force Cheats build is live.',
	},
	'how-to-contact-support': {
		q: 'How do I contact support?',
		a: 'Use the Support page or email support@deltaforcecheats.org. Include your order details, package length, and a clear description of the setup issue so replies can be faster.',
	},
	'what-is-a-delta-force-wallhack': {
		q: 'What is a Delta Force wallhack?',
		a: 'A Delta Force wallhack is an ESP overlay that shows enemy operators through terrain. Delta Force Cheats includes distance readouts, grapple and ult cues, and toggleable categories.',
	},
	'does-delta-force-cheats-include-radar-hack': {
		q: 'Does Delta Force Cheats include a radar hack?',
		a: 'Yes. Delta Force Cheats includes 2D radar overlays that highlight nearby threats outside your view — useful for flanks and objectives and extraction points.',
	},
	'ace-anti-cheat-and-delta-force-cheats': {
		q: 'How does ACE affect delta force cheats?',
		a: 'ACE monitors Delta Force on Windows PC. Delta Force Cheats posts maintenance notes after patches that may need a rebuild. Check Status before you queue.',
	},
	'buy-undetected-delta-force-cheats-windows-pc': {
		q: 'Can I buy undetected Delta Force cheats for Windows PC?',
		a: 'Yes — Delta Force Cheats sells monthly and lifetime licenses for Windows PC with ESP, radar, and aimbot in one stack. Compare plans on Store before checkout.',
	},
	'how-much-do-delta-force-cheats-cost': {
		q: 'How much do delta force cheats cost in 2026?',
		a: 'Delta Force Cheats is $35 per month or $150 lifetime USD on Windows PC. Both plans include ESP wallhack, 2D radar, soft aim, and ACE maintenance rebuilds. See Pricing for the latest plan details before checkout.',
	},
	'what-is-delta-force-esp-hack': {
		q: 'What is a Delta Force ESP hack?',
		a: 'A Delta Force ESP hack is a visibility overlay that shows enemy operators, weapons, and loot through walls. Delta Force Cheats ESP includes player boxes, distance tags, grapple and ult cues, and toggleable categories for Quick Match and Ranked.',
	},
	'what-is-delta-force-aimbot-hack': {
		q: 'What is a Delta Force aimbot hack?',
		a: 'A Delta Force aimbot hack provides aim assist with configurable FOV, smoothing, and bone priority. Delta Force Cheats uses soft aim profiles designed to feel natural in team fights and duels — tune settings in the mod menu before Ranked queues.',
	},
	'how-to-install-delta-force-cheats': {
		q: 'How do I install delta force cheats on Windows PC?',
		a: 'After checkout, follow the Setup guide: download the loader, disable conflicting overlays, launch Delta Force Cheats, and enable ESP, radar, or aimbot toggles in the mod menu. Most buyers finish first launch in under 15 minutes. Email support@deltaforcecheats.org if activation fails.',
	},
	'best-delta-force-cheats-in-2026': {
		q: 'What are the best delta force cheats in 2026?',
		a: 'Top delta force cheats in 2026 combine undetected ESP, soft aim, 2D radar, and fast ACE maintenance after patches. Delta Force Cheats bundles all three in one license with status notes, setup support, and monthly or lifetime pricing — compare Features and Reviews before you buy.',
	},
	'monthly-vs-lifetime-delta-force-cheats': {
		q: 'Should I buy monthly or lifetime delta force cheats?',
		a: 'Choose monthly ($35) if you want a lower entry cost or only play a few seasons. Choose lifetime ($150) if you plan long-term Delta Force play and want one payment for ESP, radar, aimbot, and future maintenance rebuilds. Both plans ship the same feature set.',
	},
	'delta-force-cheats-windows-11': {
		q: 'Do delta force cheats work on Windows 11?',
		a: 'Yes. Delta Force Cheats supports Windows 10 and Windows 11 on PC. Use a clean install path from the Setup guide, keep ACE status green on the Updates page, and avoid running outdated builds after major patches.',
	},
	'what-is-delta-force-soft-aim': {
		q: 'What is Delta Force soft aim?',
		a: 'Delta Force soft aim gently guides aim toward targets inside a set FOV instead of snapping instantly. Delta Force Cheats lets you adjust smoothing, bone priority, and per-weapon-type profiles so assist feels controlled in Quick Match and Ranked.',
	},
	'free-delta-force-cheat-download': {
		q: 'Is there a free Delta Force hack download?',
		a: 'Delta Force Cheats is a paid license — there is no official free download. Avoid random “free delta force cheat” sites; they often ship malware or detected loaders. Compare monthly and lifetime plans on Pricing for legitimate ESP, radar, and aimbot access with support.',
	},
	'delta-force-ace-bypass': {
		q: 'How does ACE bypass work for delta force cheats?',
		a: 'There is no permanent ACE bypass. Delta Force Cheats is maintained with rebuilds after Delta Force and ACE patches — check the Updates page before you queue. Responsible settings and loading the latest build matter more than any “bypass” claim.',
	},
	'delta-force-cheats-for-ranked': {
		q: 'Do delta force cheats work in ranked competitive?',
		a: 'Yes. ESP, radar, and soft aim are built for Ranked and Quick Match Delta Force on Windows PC. Use conservative overlay settings, read maintenance notes after patches, and confirm undetected status on the Updates page before competitive queues.',
	},
	'what-is-delta-force-mod-menu': {
		q: 'What is a Delta Force mod menu?',
		a: 'A Delta Force mod menu is an in-game overlay to toggle ESP wallhack, radar, aimbot, and visual settings without alt-tabbing. Delta Force Cheats ships a lightweight mod menu for Windows PC — see Features for the full toggle list.',
	},
	'external-vs-internal-delta-force-cheats': {
		q: 'What is the difference between external and internal delta force cheats?',
		a: 'External hacks read game memory from outside the client; internal hooks run inside the process. Delta Force Cheats is built as an external-style package for easier setup on Windows PC, bundling ESP, radar, and soft aim with ACE maintenance after patches.',
	},
	'how-long-delta-force-cheat-setup-takes': {
		q: 'How long does delta force cheats setup take?',
		a: 'Most buyers finish Delta Force Cheats setup in 10–20 minutes on Windows PC: install the loader, activate the license, and enable ESP or aimbot in the mod menu. If Windows Defender or another AV blocks the loader, follow Setup troubleshooting or email support@deltaforcecheats.org with your order ID.',
	},
	'does-delta-force-cheats-include-triggerbot': {
		q: 'Does Delta Force Cheats include triggerbot?',
		a: 'Delta Force Cheats focuses on ESP wallhack, 2D radar, and soft aim profiles. Triggerbot is not advertised as a standalone module — review the Features page for the current toggle list before checkout.',
	},
};

FAQ_I18N.en = EN_FAQ_ITEMS;

async function main() {
	const en = JSON.parse(await readFile(EN_FILE, 'utf8'));
	en.faq = { items: EN_FAQ_ITEMS };
	en.media = {
		demoVideoTitle: 'Delta Force Cheats ESP, aimbot and radar demo',
		playVideo: 'Play video',
	};
	const enUi = allUiStrings.en;
	en.hero = {
		...enUi.hero,
		title: enUi.hero.title,
		priceFrom: en.hero?.priceFrom ?? 'from',
		imageAlt: en.hero?.imageAlt ?? '{{brand}} — Delta Force ESP and aimbot overlay',
		chipEsp: en.hero?.chipEsp ?? 'ESP / wallhack',
		chipAim: en.hero?.chipAim ?? 'Soft aim',
		chipRadar: en.hero?.chipRadar ?? '2D radar',
		chipUpdates: en.hero?.chipUpdates ?? 'Patch updates',
	};
	en.nav = { ...en.nav, ...enUi.nav, preview: enUi.nav.hacks, store: enUi.nav.pricing, status: enUi.nav.updates };
	en.externalResources = {
		title: 'Official game guides & resources',
		lede: 'We link to trusted third-party sources so you can verify patch notes, player stats, and map info outside our site.',
		pillsTitle: 'Official guides',
		pillsLabel: 'Official Delta Force guides',
		steam: { label: 'Delta Force on PC', note: 'Official store page, system requirements, and player reviews.' },
		patch: { label: 'Delta Force patch notes & news', note: 'Read official update posts before you change your loadout.' },
		official: { label: 'Official Delta Force website', note: 'Game overview from Team Jade.' },
		wiki: { label: 'Delta Force Wiki (Fandom)', note: 'Player stats, maps, and hero abilities.' },
		community: { label: 'Delta Force community hub', note: 'Announcements and community discussions.' },
	};
	en.internalLinks = {
		relatedLede: 'Explore more Delta Force Cheats guides — the same topics covered on other cheat sites, mapped to our canonical pages.',
		topicsTitle: 'Product guides',
		topicsLabel: 'Product topic guides',
		topicsLede: 'Jump to the main Delta Force Cheats pages for ESP, aimbot, radar, setup, and status.',
		overview: 'Delta Force Cheats overview',
		esp: 'ESP & wallhack',
		aimbot: 'Aimbot & soft aim',
		radar: 'Radar hack',
		features: 'Full feature list',
		pricing: 'Store & pricing',
		setup: 'Setup guide',
		status: 'Live status',
		faq: 'FAQ',
		support: 'Support',
		blog: 'Blog',
		reviews: 'Buyer reviews',
		hacks: 'Delta Force Cheats pillar',
		undetected: 'Undetected status',
	};
	en.images = { ...en.images, ...enUi.images };
	en.gallery = {
		eyebrow: 'Delta Force Cheats',
		title: 'Delta Force Cheats gallery',
		subtitle: 'Delta Force Cheats visuals — ESP, wallhack, aimbot, and radar for Delta Force on PC.',
		lead: 'Delta Force Cheats helps you spot enemy operators, loot, and high-traffic POIs with ESP, aimbot, and radar in one license.',
		highlightEspTitle: 'Delta Force Cheats ESP',
		highlightEspCopy: 'See enemy operators through walls with Delta Force Cheats ESP and wallhack overlays.',
		highlightRadarTitle: 'Delta Force Cheats radar',
		highlightRadarCopy: 'Track nearby threats with Delta Force Cheats radar before you push or rotate.',
		highlightAimbotTitle: 'Delta Force Cheats aimbot',
		highlightAimbotCopy: 'Use soft aim and aimbot controls tuned for Delta Force matches on Windows PC.',
		updatesLabel: 'Delta Force Cheats updates',
		updatesShort: 'Updates',
	};
	en.home = {
		...en.home,
		aboutTitle: 'undetected cheats for Delta Force',
		aboutP1:
			'Delta Force Cheats is an undetected delta force cheats package for Delta Force on Windows PC. One license includes ESP wallhack, soft aim, and 2D radar, with ACE rebuilds after game patches. Check Status before you queue.',
		volumeLabel: 'Volume',
		seekLabel: 'Video progress',
		muteVideo: 'Mute video',
		unmuteVideo: 'Unmute video',
	};
	en.homeSeo = {
		...en.homeSeo,
		linkFinalsCheats: 'Delta Force Cheats',
	};
	en.reviews = {
		...(en.reviews ?? {}),
		eyebrow: 'Delta Force Cheats',
		homeTitle: 'Delta Force Cheats reviews',
		subtitle: 'Recent feedback from Delta Force Cheats buyers',
		buyerReviews: '{{count}} Delta Force Cheats buyer reviews',
		averageAria: '{{rating}} average from {{count}} Delta Force Cheats buyer reviews',
		readAll: 'Read all Delta Force Cheats reviews →',
	};
	en.blog = {
		...(en.blog ?? {}),
		blogTitle: 'Delta Force Cheats Blog | Guides & Patch Tips',
		blogDescription:
			'Delta Force guides — tactical FPS tips, ESP, aimbot notes, extract routes, and ACE update coverage. English blog at deltaforcecheats.org/blog/.',
		blogH1: 'Delta Force Cheats Intel',
		blogIntro:
			'Actionable Delta Force guides for ranked and Quick Match sessions — meta breakdowns, extract routes, operator tiers, and pro warmup routines. Pair these tips with our Delta Force Cheats pages for ESP, soft aim, and radar when you need in-match tools.',
	};

	let es;
	try {
		es = JSON.parse(await readFile(ES_FILE, 'utf8'));
		es.faq = { items: FAQ_I18N.es };
		es.home = {
			...(es.home ?? {}),
			aboutTitle: 'cheats indetectables para Delta Force',
		};
	} catch {
		es = en;
	}

	for (const locale of LOCALES) {
		const dir = path.join(ROOT, 'public', 'locales', locale);
		await mkdir(dir, { recursive: true });

		let translation = en;
		if (locale === 'es') {
			translation = deepMerge(en, es);
		} else if (locale !== 'en') {
			const ui = allUiStrings[locale];
			const overlay = buildLocaleOverlay(locale, ui);
			const faqOverlay = buildFaqOverlay(locale);
			translation = deepMerge(en, {
				...overlay,
				externalResources: flattenExternalResources(overlay.externalResources),
				faq: faqOverlay,
			});
		}

		const ui = allUiStrings[locale];
		if (ui?.nav?.hacks) {
			translation.nav = {
				...translation.nav,
				hacks: ui.nav.hacks,
				preview: ui.nav.hacks,
			};
		}

		const out = path.join(dir, 'translation.json');
		await writeFile(out, `${JSON.stringify(translation, null, 2)}\n`, 'utf8');
		console.log('✓', out);
	}

	// Refresh canonical EN with faq/media keys
	await writeFile(EN_FILE, `${JSON.stringify(en, null, 2)}\n`, 'utf8');
	console.log(`Generated ${LOCALES.length} locale translation files.`);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
