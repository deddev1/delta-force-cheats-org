import { siteConfig } from '../site';
import {
	defaultLocale,
	isLocaleCode,
	localeCodes,
	localeMap,
	type LocaleCode,
	locales,
} from './locales';
import { getCannibalTargetId, isCannibalPageId } from '../seo-cannibal-map';

/** Canonical page identifiers shared across all locales. */
export type PageId =
	| 'home'
	| 'delta-force-esp'
	| 'delta-force-aimbot'
	| 'features'
	| 'pricing'
	| 'setup'
	| 'updates'
	| 'faq'
	| 'support'
	| 'undetected'
	| 'wallhack'
	| 'radar'
	| 'ace'
	| 'cheats-2026'
	| 'hacks'
	| 'cheat-download'
	| 'mod-menu'
	| 'soft-aim'
	| 'best-cheats'
	| 'aimbot-hack'
	| 'esp-hack'
	| 'unlock-all'
	| 'privacy'
	| 'refund'
	| 'terms';

/** English (official) paths — served at site root without /en/ prefix. */
export const englishPaths: Record<PageId, string> = {
	home: '/',
	'delta-force-esp': '/delta-force-esp/',
	'delta-force-aimbot': '/delta-force-aimbot/',
	features: '/features/',
	pricing: '/pricing/',
	setup: '/setup/',
	updates: '/updates/',
	faq: '/faq/',
	support: '/support/',
	undetected: '/undetected-delta-force-cheats/',
	wallhack: '/delta-force-wallhack/',
	radar: '/delta-force-radar-hack/',
	'ace': '/ace-bypass/',
	'cheats-2026': '/delta-force-cheats-2026/',
	hacks: '/delta-force-cheats/',
	'cheat-download': '/delta-force-cheat-download/',
	'mod-menu': '/delta-force-mod-menu/',
	'soft-aim': '/delta-force-soft-aim/',
	'best-cheats': '/best-delta-force-cheats/',
	'aimbot-hack': '/delta-force-aimbot-hack/',
	'esp-hack': '/delta-force-esp-hack/',
	'unlock-all': '/delta-force-unlock-all/',
	privacy: '/privacy-policy/',
	refund: '/refund-policy/',
	terms: '/terms/',
};

/**
 * Localized URL slugs (path after /{lang}/).
 * English uses englishPaths at root; other locales use these slugs under /{lang}/.
 */
export const localizedSlugs: Record<PageId, Record<LocaleCode, string>> = {
	home: {
		en: '',
		es: '',
		fr: '',
		de: '',
		pt: '',
		it: '',
		nl: '',
		pl: '',
		ru: '',
		tr: '',
		ar: '',
		ja: '',
		ko: '',
		zh: '',
		hi: '',
		id: '',
		th: '',
		vi: '',
		uk: '',
		cs: '',
		ro: '',
		sv: '',
	},
	'delta-force-esp': {
		en: 'delta-force-esp',
		es: 'trucos-delta-force-esp',
		fr: 'triche-delta-force-esp',
		de: 'delta-force-esp-wallhack',
		pt: 'hacks-delta-force-esp',
		it: 'trucchi-delta-force-esp',
		nl: 'delta-force-esp-wallhack',
		pl: 'cheaty-delta-force-esp',
		ru: 'delta-force-esp-chity',
		tr: 'delta-force-esp-hile',
		ar: 'delta-force-esp-wallhack',
		ja: 'delta-force-esp-wallhack',
		ko: 'delta-force-esp-wallhack',
		zh: 'delta-force-esp-wallhack',
		hi: 'delta-force-esp-wallhack',
		id: 'delta-force-esp-wallhack',
		th: 'delta-force-esp-wallhack',
		vi: 'delta-force-esp-wallhack',
		uk: 'delta-force-esp-chity',
		cs: 'delta-force-esp-wallhack',
		ro: 'delta-force-esp-wallhack',
		sv: 'delta-force-esp-wallhack',
	},
	'delta-force-aimbot': {
		en: 'delta-force-aimbot',
		es: 'trucos-delta-force-aimbot',
		fr: 'triche-delta-force-aimbot',
		de: 'delta-force-aimbot',
		pt: 'hacks-delta-force-aimbot',
		it: 'trucchi-delta-force-aimbot',
		nl: 'delta-force-aimbot',
		pl: 'cheaty-delta-force-aimbot',
		ru: 'delta-force-aimbot-chity',
		tr: 'delta-force-aimbot-hile',
		ar: 'delta-force-aimbot',
		ja: 'delta-force-aimbot',
		ko: 'delta-force-aimbot',
		zh: 'delta-force-aimbot',
		hi: 'delta-force-aimbot',
		id: 'delta-force-aimbot',
		th: 'delta-force-aimbot',
		vi: 'delta-force-aimbot',
		uk: 'delta-force-aimbot-chity',
		cs: 'delta-force-aimbot',
		ro: 'delta-force-aimbot',
		sv: 'delta-force-aimbot',
	},
	features: {
		en: 'features',
		es: 'caracteristicas-trucos-delta-force',
		fr: 'fonctionnalites-triche-delta-force',
		de: 'delta-force-cheats-funktionen',
		pt: 'recursos-cheats-delta-force',
		it: 'funzioni-trucchi-delta-force',
		nl: 'delta-force-cheats-functies',
		pl: 'funkcje-cheatow-delta-force',
		ru: 'funkcii-chitov-delta-force',
		tr: 'delta-force-hile-ozellikleri',
		ar: 'delta-force-cheats-features',
		ja: 'delta-force-cheats-features',
		ko: 'delta-force-cheats-features',
		zh: 'delta-force-cheats-features',
		hi: 'delta-force-cheats-features',
		id: 'delta-force-cheats-features',
		th: 'delta-force-cheats-features',
		vi: 'delta-force-cheats-features',
		uk: 'funkcii-chitiv-delta-force',
		cs: 'delta-force-cheats-funkce',
		ro: 'functii-cheats-delta-force',
		sv: 'delta-force-cheats-funktioner',
	},
	pricing: {
		en: 'pricing',
		es: 'precios-trucos-delta-force',
		fr: 'prix-triche-delta-force',
		de: 'delta-force-cheats-preise',
		pt: 'precos-cheats-delta-force',
		it: 'prezzi-trucchi-delta-force',
		nl: 'delta-force-cheats-prijzen',
		pl: 'ceny-cheatow-delta-force',
		ru: 'ceny-chitov-delta-force',
		tr: 'delta-force-hile-fiyatlari',
		ar: 'delta-force-cheats-pricing',
		ja: 'delta-force-cheats-pricing',
		ko: 'delta-force-cheats-pricing',
		zh: 'delta-force-cheats-pricing',
		hi: 'delta-force-cheats-pricing',
		id: 'delta-force-cheats-pricing',
		th: 'delta-force-cheats-pricing',
		vi: 'delta-force-cheats-pricing',
		uk: 'ciny-chitiv-delta-force',
		cs: 'delta-force-cheats-ceny',
		ro: 'preturi-cheats-delta-force',
		sv: 'delta-force-cheats-priser',
	},
	setup: {
		en: 'setup',
		es: 'instalacion-trucos-delta-force',
		fr: 'installation-triche-delta-force',
		de: 'delta-force-cheats-installation',
		pt: 'instalacao-cheats-delta-force',
		it: 'installazione-trucchi-delta-force',
		nl: 'delta-force-cheats-installatie',
		pl: 'instalacja-cheatow-delta-force',
		ru: 'ustanovka-chitov-delta-force',
		tr: 'delta-force-hile-kurulum',
		ar: 'delta-force-cheats-setup',
		ja: 'delta-force-cheats-setup',
		ko: 'delta-force-cheats-setup',
		zh: 'delta-force-cheats-setup',
		hi: 'delta-force-cheats-setup',
		id: 'delta-force-cheats-setup',
		th: 'delta-force-cheats-setup',
		vi: 'delta-force-cheats-setup',
		uk: 'vstanovka-chitiv-delta-force',
		cs: 'delta-force-cheats-instalace',
		ro: 'instalare-cheats-delta-force',
		sv: 'delta-force-cheats-installation',
	},
	updates: {
		en: 'updates',
		es: 'actualizaciones-trucos-delta-force',
		fr: 'mises-a-jour-triche-delta-force',
		de: 'delta-force-cheats-updates',
		pt: 'atualizacoes-cheats-delta-force',
		it: 'aggiornamenti-trucchi-delta-force',
		nl: 'delta-force-cheats-updates',
		pl: 'aktualizacje-cheatow-delta-force',
		ru: 'obnovleniya-chitov-delta-force',
		tr: 'delta-force-hile-guncellemeleri',
		ar: 'delta-force-cheats-updates',
		ja: 'delta-force-cheats-updates',
		ko: 'delta-force-cheats-updates',
		zh: 'delta-force-cheats-updates',
		hi: 'delta-force-cheats-updates',
		id: 'delta-force-cheats-updates',
		th: 'delta-force-cheats-updates',
		vi: 'delta-force-cheats-updates',
		uk: 'onovlennya-chitiv-delta-force',
		cs: 'delta-force-cheats-aktualizace',
		ro: 'actualizari-cheats-delta-force',
		sv: 'delta-force-cheats-uppdateringar',
	},
	faq: {
		en: 'faq',
		es: 'preguntas-trucos-delta-force',
		fr: 'faq-triche-delta-force',
		de: 'delta-force-cheats-faq',
		pt: 'faq-cheats-delta-force',
		it: 'faq-trucchi-delta-force',
		nl: 'delta-force-cheats-faq',
		pl: 'faq-cheatow-delta-force',
		ru: 'faq-chitov-delta-force',
		tr: 'delta-force-hile-sss',
		ar: 'delta-force-cheats-faq',
		ja: 'delta-force-cheats-faq',
		ko: 'delta-force-cheats-faq',
		zh: 'delta-force-cheats-faq',
		hi: 'delta-force-cheats-faq',
		id: 'delta-force-cheats-faq',
		th: 'delta-force-cheats-faq',
		vi: 'delta-force-cheats-faq',
		uk: 'faq-chitiv-delta-force',
		cs: 'delta-force-cheats-faq',
		ro: 'faq-cheats-delta-force',
		sv: 'delta-force-cheats-faq',
	},
	support: {
		en: 'support',
		es: 'soporte-trucos-delta-force',
		fr: 'support-triche-delta-force',
		de: 'delta-force-cheats-support',
		pt: 'suporte-cheats-delta-force',
		it: 'supporto-trucchi-delta-force',
		nl: 'delta-force-cheats-support',
		pl: 'wsparcie-cheatow-delta-force',
		ru: 'podderzhka-chitov-delta-force',
		tr: 'delta-force-hile-destek',
		ar: 'delta-force-cheats-support',
		ja: 'delta-force-cheats-support',
		ko: 'delta-force-cheats-support',
		zh: 'delta-force-cheats-support',
		hi: 'delta-force-cheats-support',
		id: 'delta-force-cheats-support',
		th: 'delta-force-cheats-support',
		vi: 'delta-force-cheats-support',
		uk: 'pidtrymka-chitiv-delta-force',
		cs: 'delta-force-cheats-podpora',
		ro: 'suport-cheats-delta-force',
		sv: 'delta-force-cheats-support',
	},
	undetected: {
		en: 'undetected-delta-force-cheats',
		es: 'trucos-delta-force-indetectables',
		fr: 'triche-delta-force-indetectable',
		de: 'unentdeckte-delta-force-cheats',
		pt: 'cheats-delta-force-indetectaveis',
		it: 'trucchi-delta-force-indetectabili',
		nl: 'undetected-delta-force-cheats',
		pl: 'niewykrywalne-cheats-delta-force',
		ru: 'nedecektiruemye-chity-delta-force',
		tr: 'tespit-edilemeyen-delta-force-hileleri',
		ar: 'undetected-delta-force-cheats',
		ja: 'undetected-delta-force-cheats',
		ko: 'undetected-delta-force-cheats',
		zh: 'undetected-delta-force-cheats',
		hi: 'undetected-delta-force-cheats',
		id: 'undetected-delta-force-cheats',
		th: 'undetected-delta-force-cheats',
		vi: 'undetected-delta-force-cheats',
		uk: 'nedecektovani-chity-delta-force',
		cs: 'undetected-delta-force-cheats',
		ro: 'cheats-delta-force-nedetectabile',
		sv: 'undetected-delta-force-cheats',
	},
	wallhack: {
		en: 'delta-force-wallhack',
		es: 'wallhack-trucos-delta-force',
		fr: 'wallhack-triche-delta-force',
		de: 'delta-force-wallhack',
		pt: 'wallhack-cheats-delta-force',
		it: 'wallhack-trucchi-delta-force',
		nl: 'delta-force-wallhack',
		pl: 'wallhack-cheatow-delta-force',
		ru: 'wallhack-chity-delta-force',
		tr: 'delta-force-wallhack-hile',
		ar: 'delta-force-wallhack',
		ja: 'delta-force-wallhack',
		ko: 'delta-force-wallhack',
		zh: 'delta-force-wallhack',
		hi: 'delta-force-wallhack',
		id: 'delta-force-wallhack',
		th: 'delta-force-wallhack',
		vi: 'delta-force-wallhack',
		uk: 'wallhack-chity-delta-force',
		cs: 'delta-force-wallhack',
		ro: 'wallhack-cheats-delta-force',
		sv: 'delta-force-wallhack',
	},
	radar: {
		en: 'delta-force-radar-hack',
		es: 'radar-hack-trucos-delta-force',
		fr: 'radar-hack-triche-delta-force',
		de: 'delta-force-radar-hack',
		pt: 'radar-hack-cheats-delta-force',
		it: 'radar-hack-trucchi-delta-force',
		nl: 'delta-force-radar-hack',
		pl: 'radar-hack-cheatow-delta-force',
		ru: 'radar-hack-chity-delta-force',
		tr: 'delta-force-radar-hack',
		ar: 'delta-force-radar-hack',
		ja: 'delta-force-radar-hack',
		ko: 'delta-force-radar-hack',
		zh: 'delta-force-radar-hack',
		hi: 'delta-force-radar-hack',
		id: 'delta-force-radar-hack',
		th: 'delta-force-radar-hack',
		vi: 'delta-force-radar-hack',
		uk: 'radar-hack-chity-delta-force',
		cs: 'delta-force-radar-hack',
		ro: 'radar-hack-cheats-delta-force',
		sv: 'delta-force-radar-hack',
	},
	'ace': {
		en: 'ace-bypass',
		es: 'ace-bypass-trucos',
		fr: 'ace-bypass-triche',
		de: 'ace-bypass',
		pt: 'ace-bypass-hacks',
		it: 'ace-bypass-trucchi',
		nl: 'ace-bypass',
		pl: 'ace-bypass-cheatow',
		ru: 'ace-bypass-chity',
		tr: 'ace-bypass',
		ar: 'ace-bypass',
		ja: 'ace-bypass',
		ko: 'ace-bypass',
		zh: 'ace-bypass',
		hi: 'ace-bypass',
		id: 'ace-bypass',
		th: 'ace-bypass',
		vi: 'ace-bypass',
		uk: 'ace-bypass-chity',
		cs: 'ace-bypass',
		ro: 'ace-bypass-hacks',
		sv: 'ace-bypass',
	},
	'cheats-2026': {
		en: 'delta-force-cheats-2026',
		es: 'trucos-delta-force-2026',
		fr: 'triche-delta-force-2026',
		de: 'delta-force-cheats-2026',
		pt: 'cheats-delta-force-2026',
		it: 'trucchi-delta-force-2026',
		nl: 'delta-force-cheats-2026',
		pl: 'cheaty-delta-force-2026',
		ru: 'chity-delta-force-2026',
		tr: 'delta-force-hileleri-2026',
		ar: 'delta-force-cheats-2026',
		ja: 'delta-force-cheats-2026',
		ko: 'delta-force-cheats-2026',
		zh: 'delta-force-cheats-2026',
		hi: 'delta-force-cheats-2026',
		id: 'delta-force-cheats-2026',
		th: 'delta-force-cheats-2026',
		vi: 'delta-force-cheats-2026',
		uk: 'chity-delta-force-2026',
		cs: 'delta-force-cheats-2026',
		ro: 'cheats-delta-force-2026',
		sv: 'delta-force-cheats-2026',
	},
	hacks: {
		en: 'delta-force-cheats',
		es: 'hacks-trucos-delta-force',
		fr: 'hacks-triche-delta-force',
		de: 'delta-force-cheats',
		pt: 'cheats-delta-force',
		it: 'hacks-trucchi-delta-force',
		nl: 'delta-force-cheats',
		pl: 'hacks-cheatow-delta-force',
		ru: 'haksy-chity-delta-force',
		tr: 'delta-force-hile-hacks',
		ar: 'delta-force-cheats',
		ja: 'delta-force-cheats',
		ko: 'delta-force-cheats',
		zh: 'delta-force-cheats',
		hi: 'delta-force-cheats',
		id: 'delta-force-cheats',
		th: 'delta-force-cheats',
		vi: 'delta-force-cheats',
		uk: 'haksy-chity-delta-force',
		cs: 'delta-force-cheats',
		ro: 'cheats-delta-force',
		sv: 'delta-force-cheats',
	},
	'cheat-download': {
		en: 'delta-force-cheat-download',
		es: 'descarga-trucos-delta-force',
		fr: 'telechargement-triche-delta-force',
		de: 'delta-force-cheat-download',
		pt: 'download-cheats-delta-force',
		it: 'download-trucchi-delta-force',
		nl: 'delta-force-cheat-download',
		pl: 'pobieranie-cheatow-delta-force',
		ru: 'skachat-chity-delta-force',
		tr: 'delta-force-hile-indir',
		ar: 'delta-force-cheat-download',
		ja: 'delta-force-cheat-download',
		ko: 'delta-force-cheat-download',
		zh: 'delta-force-cheat-download',
		hi: 'delta-force-cheat-download',
		id: 'delta-force-cheat-download',
		th: 'delta-force-cheat-download',
		vi: 'delta-force-cheat-download',
		uk: 'zavantazhennya-chitiv-delta-force',
		cs: 'delta-force-cheat-download',
		ro: 'descarcare-cheats-delta-force',
		sv: 'delta-force-cheat-download',
	},
	'mod-menu': {
		en: 'delta-force-mod-menu',
		es: 'menu-mod-trucos-delta-force',
		fr: 'menu-mod-triche-delta-force',
		de: 'delta-force-mod-menu',
		pt: 'menu-mod-cheats-delta-force',
		it: 'menu-mod-trucchi-delta-force',
		nl: 'delta-force-mod-menu',
		pl: 'menu-mod-cheatow-delta-force',
		ru: 'mod-menu-chity-delta-force',
		tr: 'delta-force-mod-menu',
		ar: 'delta-force-mod-menu',
		ja: 'delta-force-mod-menu',
		ko: 'delta-force-mod-menu',
		zh: 'delta-force-mod-menu',
		hi: 'delta-force-mod-menu',
		id: 'delta-force-mod-menu',
		th: 'delta-force-mod-menu',
		vi: 'delta-force-mod-menu',
		uk: 'mod-menu-chity-delta-force',
		cs: 'delta-force-mod-menu',
		ro: 'meniu-mod-cheats-delta-force',
		sv: 'delta-force-mod-menu',
	},
	'soft-aim': {
		en: 'delta-force-soft-aim',
		es: 'soft-aim-trucos-delta-force',
		fr: 'soft-aim-triche-delta-force',
		de: 'delta-force-soft-aim',
		pt: 'soft-aim-cheats-delta-force',
		it: 'soft-aim-trucchi-delta-force',
		nl: 'delta-force-soft-aim',
		pl: 'soft-aim-cheatow-delta-force',
		ru: 'soft-aim-chity-delta-force',
		tr: 'delta-force-soft-aim',
		ar: 'delta-force-soft-aim',
		ja: 'delta-force-soft-aim',
		ko: 'delta-force-soft-aim',
		zh: 'delta-force-soft-aim',
		hi: 'delta-force-soft-aim',
		id: 'delta-force-soft-aim',
		th: 'delta-force-soft-aim',
		vi: 'delta-force-soft-aim',
		uk: 'soft-aim-chity-delta-force',
		cs: 'delta-force-soft-aim',
		ro: 'soft-aim-cheats-delta-force',
		sv: 'delta-force-soft-aim',
	},
	'best-cheats': {
		en: 'best-delta-force-cheats',
		es: 'mejores-trucos-delta-force',
		fr: 'meilleures-triches-delta-force',
		de: 'beste-delta-force-cheats',
		pt: 'melhores-cheats-delta-force',
		it: 'migliori-trucchi-delta-force',
		nl: 'beste-delta-force-cheats',
		pl: 'najlepsze-cheats-delta-force',
		ru: 'luchshie-chity-delta-force',
		tr: 'en-iyi-delta-force-hileleri',
		ar: 'best-delta-force-cheats',
		ja: 'best-delta-force-cheats',
		ko: 'best-delta-force-cheats',
		zh: 'best-delta-force-cheats',
		hi: 'best-delta-force-cheats',
		id: 'best-delta-force-cheats',
		th: 'best-delta-force-cheats',
		vi: 'best-delta-force-cheats',
		uk: 'naykrashchi-chity-delta-force',
		cs: 'nejlepsi-delta-force-cheats',
		ro: 'cele-mai-bune-cheats-delta-force',
		sv: 'basta-delta-force-cheats',
	},
	'aimbot-hack': {
		en: 'delta-force-aimbot-hack',
		es: 'aimbot-hack-trucos-delta-force',
		fr: 'aimbot-hack-triche-delta-force',
		de: 'delta-force-aimbot-hack',
		pt: 'aimbot-hack-cheats-delta-force',
		it: 'aimbot-hack-trucchi-delta-force',
		nl: 'delta-force-aimbot-hack',
		pl: 'aimbot-hack-cheatow-delta-force',
		ru: 'aimbot-hack-chity-delta-force',
		tr: 'delta-force-aimbot-hack',
		ar: 'delta-force-aimbot-hack',
		ja: 'delta-force-aimbot-hack',
		ko: 'delta-force-aimbot-hack',
		zh: 'delta-force-aimbot-hack',
		hi: 'delta-force-aimbot-hack',
		id: 'delta-force-aimbot-hack',
		th: 'delta-force-aimbot-hack',
		vi: 'delta-force-aimbot-hack',
		uk: 'aimbot-hack-chity-delta-force',
		cs: 'delta-force-aimbot-hack',
		ro: 'aimbot-hack-cheats-delta-force',
		sv: 'delta-force-aimbot-hack',
	},
	'esp-hack': {
		en: 'delta-force-esp-hack',
		es: 'esp-hack-trucos-delta-force',
		fr: 'esp-hack-triche-delta-force',
		de: 'delta-force-esp-hack',
		pt: 'esp-hack-cheats-delta-force',
		it: 'esp-hack-trucchi-delta-force',
		nl: 'delta-force-esp-hack',
		pl: 'esp-hack-cheatow-delta-force',
		ru: 'esp-hack-chity-delta-force',
		tr: 'delta-force-esp-hack',
		ar: 'delta-force-esp-hack',
		ja: 'delta-force-esp-hack',
		ko: 'delta-force-esp-hack',
		zh: 'delta-force-esp-hack',
		hi: 'delta-force-esp-hack',
		id: 'delta-force-esp-hack',
		th: 'delta-force-esp-hack',
		vi: 'delta-force-esp-hack',
		uk: 'esp-hack-chity-delta-force',
		cs: 'delta-force-esp-hack',
		ro: 'esp-hack-cheats-delta-force',
		sv: 'delta-force-esp-hack',
	},
	'unlock-all': {
		en: 'delta-force-unlock-all',
		es: 'unlock-all-trucos-delta-force',
		fr: 'unlock-all-triche-delta-force',
		de: 'delta-force-unlock-all',
		pt: 'unlock-all-cheats-delta-force',
		it: 'unlock-all-trucchi-delta-force',
		nl: 'delta-force-unlock-all',
		pl: 'unlock-all-cheatow-delta-force',
		ru: 'unlock-all-chity-delta-force',
		tr: 'delta-force-unlock-all',
		ar: 'delta-force-unlock-all',
		ja: 'delta-force-unlock-all',
		ko: 'delta-force-unlock-all',
		zh: 'delta-force-unlock-all',
		hi: 'delta-force-unlock-all',
		id: 'delta-force-unlock-all',
		th: 'delta-force-unlock-all',
		vi: 'delta-force-unlock-all',
		uk: 'unlock-all-chity-delta-force',
		cs: 'delta-force-unlock-all',
		ro: 'unlock-all-cheats-delta-force',
		sv: 'delta-force-unlock-all',
	},
	privacy: {
		en: 'privacy-policy',
		es: 'politica-privacidad',
		fr: 'politique-confidentialite',
		de: 'datenschutz',
		pt: 'politica-privacidade',
		it: 'privacy-policy',
		nl: 'privacybeleid',
		pl: 'polityka-prywatnosci',
		ru: 'politika-konfidencialnosti',
		tr: 'gizlilik-politikasi',
		ar: 'privacy-policy',
		ja: 'privacy-policy',
		ko: 'privacy-policy',
		zh: 'privacy-policy',
		hi: 'privacy-policy',
		id: 'privacy-policy',
		th: 'privacy-policy',
		vi: 'privacy-policy',
		uk: 'polityka-konfidentsijnosti',
		cs: 'ochrana-osobnich-udaju',
		ro: 'politica-confidentialitate',
		sv: 'integritetspolicy',
	},
	refund: {
		en: 'refund-policy',
		es: 'politica-reembolso',
		fr: 'politique-remboursement',
		de: 'rueckerstattung',
		pt: 'politica-reembolso',
		it: 'politica-rimborso',
		nl: 'terugbetalingsbeleid',
		pl: 'polityka-zwrotow',
		ru: 'politika-vozvrata',
		tr: 'iade-politikasi',
		ar: 'refund-policy',
		ja: 'refund-policy',
		ko: 'refund-policy',
		zh: 'refund-policy',
		hi: 'refund-policy',
		id: 'refund-policy',
		th: 'refund-policy',
		vi: 'refund-policy',
		uk: 'polityka-povorennya',
		cs: 'refund-policy',
		ro: 'politica-rambursare',
		sv: 'aterbetalningspolicy',
	},
	terms: {
		en: 'terms',
		es: 'terminos-uso',
		fr: 'conditions-utilisation',
		de: 'nutzungsbedingungen',
		pt: 'termos-uso',
		it: 'termini-uso',
		nl: 'gebruiksvoorwaarden',
		pl: 'regulamin',
		ru: 'usloviya-ispolzovaniya',
		tr: 'kullanim-kosullari',
		ar: 'terms',
		ja: 'terms',
		ko: 'terms',
		zh: 'terms',
		hi: 'terms',
		id: 'terms',
		th: 'terms',
		vi: 'terms',
		uk: 'umovy-vykorystannya',
		cs: 'podminky-uziti',
		ro: 'termeni-utilizare',
		sv: 'anvandarvillkor',
	},
};

export const pageIds = Object.keys(englishPaths) as PageId[];

export function getLocalizedPath(pageId: PageId, locale: LocaleCode): string {
	if (locale === defaultLocale) {
		return englishPaths[pageId];
	}
	const slug = localizedSlugs[pageId][locale];
	return slug ? `/${locale}/${slug}/` : `/${locale}/`;
}

/** Map English root paths to the correct locale URL (for CTAs and inline links). */
export function localizeInternalHref(href: string, locale: LocaleCode): string {
	if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('#')) {
		return href;
	}
	const trimmed = href.replace(/\/+$/, '') || '/';
	const withSlash = trimmed === '/' ? '/' : `${trimmed}/`;
	if (withSlash === '/delta-force-cheats/' || withSlash === '/delta-force-cheats/') {
		return getLocalizedPath('hacks', locale);
	}
	for (const pageId of pageIds) {
		const english = englishPaths[pageId];
		if (english === withSlash || english.replace(/\/+$/, '') === trimmed) {
			const targetId = getCannibalTargetId(pageId) as PageId;
			return getLocalizedPath(targetId, locale);
		}
	}
	return href;
}

/** Canonical absolute URL — always https apex with trailing slash (matches Layout.astro). */
export function buildCanonicalUrl(path: string): string {
	const normalized =
		!path || path === '/'
			? '/'
			: path.endsWith('/') || path.includes('.')
				? path
				: `${path}/`;
	return new URL(normalized, siteConfig.url).href;
}

export function absoluteLocalizedUrl(pageId: PageId, locale: LocaleCode): string {
	return buildCanonicalUrl(getLocalizedPath(pageId, locale));
}

export type HreflangAlternate = { hreflang: string; href: string };

/** Self-referential hreflang for single-locale pages (reviews, 404). */
export function getSelfHreflangAlternates(
	path: string,
	locale: LocaleCode = defaultLocale,
): HreflangAlternate[] {
	const href = buildCanonicalUrl(path);
	return [
		{ hreflang: localeMap[locale].hreflang, href },
		{ hreflang: 'x-default', href },
	];
}

export function getHreflangAlternates(pageId: PageId, currentLocale: LocaleCode = defaultLocale) {
	const resolvedId = (isCannibalPageId(pageId) ? getCannibalTargetId(pageId) : pageId) as PageId;
	const byLocale = localeCodes.map((code) => ({
		hreflang: localeMap[code].hreflang,
		href: absoluteLocalizedUrl(resolvedId, code),
		code,
	}));
	const self = byLocale.find((alt) => alt.code === currentLocale)!;
	const others = byLocale.filter((alt) => alt.code !== currentLocale);
	const xDefault = {
		hreflang: 'x-default' as const,
		href: absoluteLocalizedUrl(resolvedId, defaultLocale),
	};
	// Self-referential hreflang first — required by Google/Seobility for the active locale.
	return [
		{ hreflang: self.hreflang, href: self.href },
		...others.map(({ hreflang, href }) => ({ hreflang, href })),
		xDefault,
	];
}

export function resolvePageIdFromPath(path: string): PageId | undefined {
	const normalized = path.endsWith('/') ? path : `${path}/`;
	for (const id of pageIds) {
		if (englishPaths[id] === normalized) return id;
	}
	return undefined;
}

/** Parsed locale + page from any site URL (English root or /{lang}/…). */
export type PageContext = {
	locale: LocaleCode;
	pageId?: PageId;
	isBlogIndex?: boolean;
	blogSlug?: string;
	isReviewsIndex?: boolean;
	reviewSlug?: string;
};

function normalizePathname(pathname: string): string {
	if (!pathname || pathname === '/') return '/';
	if (pathname.includes('.') || pathname.endsWith('/')) return pathname;
	return `${pathname}/`;
}

/** Resolve locale and page/blog context from the current URL path. */
export function resolvePageContextFromPath(pathname: string): PageContext {
	const path = normalizePathname(pathname);

	if (path === '/') {
		return { locale: defaultLocale, pageId: 'home' };
	}

	const segments = path.split('/').filter(Boolean);
	let locale: LocaleCode = defaultLocale;
	let offset = 0;

	if (segments.length > 0 && isLocaleCode(segments[0]) && segments[0] !== defaultLocale) {
		locale = segments[0];
		offset = 1;
	}

	const rest = segments.slice(offset);

	if (rest.length === 0) {
		return { locale, pageId: 'home' };
	}

	if (rest[0] === 'blog') {
		if (rest.length === 1) {
			return { locale, isBlogIndex: true };
		}
		return { locale, blogSlug: rest[1] };
	}

	if (rest[0] === 'reviews') {
		if (rest.length === 1) {
			return { locale: defaultLocale, isReviewsIndex: true };
		}
		return { locale: defaultLocale, reviewSlug: rest[1] };
	}

	if (locale === defaultLocale) {
		return { locale, pageId: resolvePageIdFromPath(path) };
	}

	return { locale, pageId: resolvePageFromLocalizedPath(locale, rest[0]) };
}

/** Target URL for the same page in another locale (non-blog pages). */
export function getPageLocaleSwitchHref(context: PageContext, targetLocale: LocaleCode): string {
	if (context.isReviewsIndex) {
		return '/reviews/';
	}
	if (context.reviewSlug) {
		return `/reviews/${context.reviewSlug}/`;
	}
	if (context.pageId) {
		return getLocalizedPath(context.pageId, targetLocale);
	}
	return getLocalizedPath('home', targetLocale);
}

export function hreflangLinksXml(pageId: PageId, escapeXml: (v: string) => string): string {
	return getHreflangAlternates(pageId)
		.map(
			(alt) =>
				`    <xhtml:link rel="alternate" hreflang="${escapeXml(alt.hreflang)}" href="${escapeXml(alt.href)}"/>`,
		)
		.join('\n');
}

export function resolvePageFromLocalizedPath(
	locale: LocaleCode,
	slug: string | undefined,
): PageId | undefined {
	if (!slug) return 'home';
	for (const pageId of pageIds) {
		if (localizedSlugs[pageId][locale] === slug) return pageId;
	}
	return undefined;
}

/** Map Accept-Language header to preferred locale (region-aware). */
export function localeFromAcceptLanguage(header: string | null): LocaleCode {
	if (!header) return defaultLocale;
	const prefs = header
		.split(',')
		.map((part) => {
			const [tag, qPart] = part.trim().split(';');
			const q = qPart?.startsWith('q=') ? Number.parseFloat(qPart.slice(2)) : 1;
			return { tag: tag.toLowerCase(), q };
		})
		.sort((a, b) => b.q - a.q);

	for (const { tag } of prefs) {
		const primary = tag.split('-')[0];
		if (localeCodes.includes(primary as LocaleCode)) return primary as LocaleCode;
	}
	return defaultLocale;
}

export function getNavForLocale(locale: LocaleCode, labels: Record<string, string>) {
	const items: { label: string; href: string; pageId?: PageId }[] = [
		{ label: labels.home, href: getLocalizedPath('home', locale), pageId: 'home' },
	{ label: labels.hacks ?? 'Hacks', href: getLocalizedPath('hacks', locale), pageId: 'hacks' },
		{ label: labels.aimbot, href: getLocalizedPath('delta-force-aimbot', locale), pageId: 'delta-force-aimbot' },
		{ label: labels.esp, href: getLocalizedPath('delta-force-esp', locale), pageId: 'delta-force-esp' },
		{ label: 'Blog', href: locale === defaultLocale ? '/blog/' : `/${locale}/blog/` },
		{ label: labels.features, href: getLocalizedPath('features', locale), pageId: 'features' },
		{ label: labels.pricing, href: getLocalizedPath('pricing', locale), pageId: 'pricing' },
		{ label: labels.setup, href: getLocalizedPath('setup', locale), pageId: 'setup' },
		{ label: labels.updates, href: getLocalizedPath('updates', locale), pageId: 'updates' },
		{ label: labels.faq, href: getLocalizedPath('faq', locale), pageId: 'faq' },
	];
	return items;
}
