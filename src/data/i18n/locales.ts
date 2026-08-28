export type LocaleCode =
	| 'en'
	| 'es'
	| 'fr'
	| 'de'
	| 'pt'
	| 'it'
	| 'nl'
	| 'pl'
	| 'ru'
	| 'tr'
	| 'ar'
	| 'ja'
	| 'ko'
	| 'zh'
	| 'hi'
	| 'id'
	| 'th'
	| 'vi'
	| 'uk'
	| 'cs'
	| 'ro'
	| 'sv';

export type LocaleMeta = {
	code: LocaleCode;
	name: string;
	nativeName: string;
	hreflang: string;
	ogLocale: string;
	dir: 'ltr' | 'rtl';
	region: string;
};

/** 22 locales for global Delta Force Cheats blog SEO coverage. */
export const locales: LocaleMeta[] = [
	{ code: 'en', name: 'English', nativeName: 'English', hreflang: 'en', ogLocale: 'en_US', dir: 'ltr', region: 'Worldwide' },
	{ code: 'es', name: 'Spanish', nativeName: 'Español', hreflang: 'es', ogLocale: 'es_ES', dir: 'ltr', region: 'Worldwide' },
	{ code: 'fr', name: 'French', nativeName: 'Français', hreflang: 'fr', ogLocale: 'fr_FR', dir: 'ltr', region: 'Worldwide' },
	{ code: 'de', name: 'German', nativeName: 'Deutsch', hreflang: 'de', ogLocale: 'de_DE', dir: 'ltr', region: 'Worldwide' },
	{ code: 'pt', name: 'Portuguese', nativeName: 'Português', hreflang: 'pt', ogLocale: 'pt_BR', dir: 'ltr', region: 'Worldwide' },
	{ code: 'it', name: 'Italian', nativeName: 'Italiano', hreflang: 'it', ogLocale: 'it_IT', dir: 'ltr', region: 'Worldwide' },
	{ code: 'nl', name: 'Dutch', nativeName: 'Nederlands', hreflang: 'nl', ogLocale: 'nl_NL', dir: 'ltr', region: 'Worldwide' },
	{ code: 'pl', name: 'Polish', nativeName: 'Polski', hreflang: 'pl', ogLocale: 'pl_PL', dir: 'ltr', region: 'Worldwide' },
	{ code: 'ru', name: 'Russian', nativeName: 'Русский', hreflang: 'ru', ogLocale: 'ru_RU', dir: 'ltr', region: 'Worldwide' },
	{ code: 'tr', name: 'Turkish', nativeName: 'Türkçe', hreflang: 'tr', ogLocale: 'tr_TR', dir: 'ltr', region: 'Worldwide' },
	{ code: 'ar', name: 'Arabic', nativeName: 'العربية', hreflang: 'ar', ogLocale: 'ar_SA', dir: 'rtl', region: 'Worldwide' },
	{ code: 'ja', name: 'Japanese', nativeName: '日本語', hreflang: 'ja', ogLocale: 'ja_JP', dir: 'ltr', region: 'Worldwide' },
	{ code: 'ko', name: 'Korean', nativeName: '한국어', hreflang: 'ko', ogLocale: 'ko_KR', dir: 'ltr', region: 'Worldwide' },
	{ code: 'zh', name: 'Chinese', nativeName: '中文', hreflang: 'zh', ogLocale: 'zh_CN', dir: 'ltr', region: 'Worldwide' },
	{ code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', hreflang: 'hi', ogLocale: 'hi_IN', dir: 'ltr', region: 'Worldwide' },
	{ code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', hreflang: 'id', ogLocale: 'id_ID', dir: 'ltr', region: 'Worldwide' },
	{ code: 'th', name: 'Thai', nativeName: 'ไทย', hreflang: 'th', ogLocale: 'th_TH', dir: 'ltr', region: 'Worldwide' },
	{ code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', hreflang: 'vi', ogLocale: 'vi_VN', dir: 'ltr', region: 'Worldwide' },
	{ code: 'uk', name: 'Ukrainian', nativeName: 'Українська', hreflang: 'uk', ogLocale: 'uk_UA', dir: 'ltr', region: 'Worldwide' },
	{ code: 'cs', name: 'Czech', nativeName: 'Čeština', hreflang: 'cs', ogLocale: 'cs_CZ', dir: 'ltr', region: 'Worldwide' },
	{ code: 'ro', name: 'Romanian', nativeName: 'Română', hreflang: 'ro', ogLocale: 'ro_RO', dir: 'ltr', region: 'Worldwide' },
	{ code: 'sv', name: 'Swedish', nativeName: 'Svenska', hreflang: 'sv', ogLocale: 'sv_SE', dir: 'ltr', region: 'Worldwide' },
];

export const defaultLocale: LocaleCode = 'en';

export const localeCodes = locales.map((l) => l.code);

export const localeMap = Object.fromEntries(locales.map((l) => [l.code, l])) as Record<
	LocaleCode,
	LocaleMeta
>;

export function isLocaleCode(value: string): value is LocaleCode {
	return localeCodes.includes(value as LocaleCode);
}

export function getLocale(code: string): LocaleMeta | undefined {
	return isLocaleCode(code) ? localeMap[code] : undefined;
}

/** UI strings for blog index pages per locale. */
export const blogUi: Record<
	LocaleCode,
	{
		blogTitle: string;
		blogDescription: string;
		blogH1: string;
		blogIntro: string;
		readMore: string;
		published: string;
		updated: string;
		relatedPosts: string;
		allPosts: string;
		home: string;
		language: string;
	}
> = {
	en: {
		blogTitle: 'Delta Force Cheats Blog | Guides & Patch Tips',
		blogDescription:
			'Delta Force guides — tactical FPS tips, ESP, aimbot notes, extract routes, and ACE update coverage. English blog at deltaforcecheats.org/blog/.',
		blogH1: 'Delta Force Cheats Intel',
		blogIntro:
			'Short Delta Force guides for Operations and Warfare matches. Pair these tips with Delta Force Cheats product pages when you need ESP, soft aim, or radar.',
		readMore: 'Read guide',
		published: 'Published',
		updated: 'Updated',
		relatedPosts: 'Related guides',
		allPosts: 'All blog posts',
		home: 'Delta Force Cheats home',
		language: 'Language',
	},
	es: {
		blogTitle: 'Blog Delta Force Cheats 2026 | Guías en 22 idiomas',
		blogDescription:
			'Blog de Delta Force Cheats con guías de trucos indetectables, ESP wallhack, radar y Aimbot para Delta Force en PC Windows.',
		blogH1: 'Blog Delta Force Cheats — Guías globales',
		blogIntro:
			'Guías SEO de trucos Delta Force indetectables, ESP wallhack, radar hack, Aimbot y mantenimiento ACE en 22 idiomas.',
		readMore: 'Leer guía',
		published: 'Publicado',
		updated: 'Actualizado',
		relatedPosts: 'Guías Delta Force relacionadas',
		allPosts: 'Todos los artículos',
		home: 'Inicio Delta Force Cheats',
		language: 'Idioma',
	},
	fr: {
		blogTitle: 'Blog Delta Force Cheats 2026 | Guides en 22 langues',
		blogDescription:
			'Blog Delta Force Cheats : triches indétectables, ESP wallhack, radar et Aimbot pour Delta Force sur PC Windows.',
		blogH1: 'Blog Delta Force Cheats — Guides mondiaux',
		blogIntro:
			'Guides SEO triches Delta Force indétectables, ESP wallhack, radar hack, Aimbot et ACE en 22 langues.',
		readMore: 'Lire le guide',
		published: 'Publié',
		updated: 'Mis à jour',
		relatedPosts: 'Guides Delta Force associés',
		allPosts: 'Tous les articles',
		home: 'Accueil Delta Force Cheats',
		language: 'Langue',
	},
	de: {
		blogTitle: 'Delta Force Cheats Blog 2026 | Guides in 22 Sprachen',
		blogDescription:
			'Delta Force Cheats Blog mit undetected ESP, Wallhack, Radar und Aimbot Guides für Delta Force auf Windows PC.',
		blogH1: 'Delta Force Cheats Blog — Globale Guides',
		blogIntro:
			'SEO-Guides für undetected Delta Force Cheats, ESP Wallhack, Radar Hack, Aimbot und ACE in 22 Sprachen.',
		readMore: 'Guide lesen',
		published: 'Veröffentlicht',
		updated: 'Aktualisiert',
		relatedPosts: 'Verwandte Delta Force Guides',
		allPosts: 'Alle Beiträge',
		home: 'Delta Force Cheats Start',
		language: 'Sprache',
	},
	pt: {
		blogTitle: 'Blog Delta Force Cheats 2026 | Guias em 22 idiomas',
		blogDescription:
			'Blog Delta Force Cheats com guias de cheats indetectáveis, ESP wallhack, radar e Aimbot para Delta Force no PC.',
		blogH1: 'Blog Delta Force Cheats — Guias globais',
		blogIntro:
			'Guias SEO de cheats Delta Force indetectáveis, ESP wallhack, radar hack, Aimbot e ACE em 22 idiomas.',
		readMore: 'Ler guia',
		published: 'Publicado',
		updated: 'Atualizado',
		relatedPosts: 'Guias Delta Force relacionados',
		allPosts: 'Todos os posts',
		home: 'Início Delta Force Cheats',
		language: 'Idioma',
	},
	it: {
		blogTitle: 'Blog Delta Force Cheats 2026 | Guide in 22 lingue',
		blogDescription:
			'Blog Delta Force Cheats con guide cheat indetectable, ESP wallhack, radar e Aimbot per Delta Force su PC Windows.',
		blogH1: 'Blog Delta Force Cheats — Guide globali',
		blogIntro:
			'Guide SEO cheat Delta Force indetectable, ESP wallhack, radar hack, Aimbot e ACE in 22 lingue.',
		readMore: 'Leggi guida',
		published: 'Pubblicato',
		updated: 'Aggiornato',
		relatedPosts: 'Guide Delta Force correlate',
		allPosts: 'Tutti gli articoli',
		home: 'Home Delta Force Cheats',
		language: 'Lingua',
	},
	nl: {
		blogTitle: 'Delta Force Cheats Blog 2026 | Gidsen in 22 talen',
		blogDescription:
			'Delta Force Cheats blog met undetected ESP, wallhack, radar en Aimbot gidsen voor Delta Force op Windows PC.',
		blogH1: 'Delta Force Cheats Blog — Wereldwijde gidsen',
		blogIntro:
			'SEO-gidsen voor undetected delta force cheats, ESP wallhack, radar hack, Aimbot en ACE in 22 talen.',
		readMore: 'Lees gids',
		published: 'Gepubliceerd',
		updated: 'Bijgewerkt',
		relatedPosts: 'Gerelateerde Delta Force gidsen',
		allPosts: 'Alle posts',
		home: 'Delta Force Cheats home',
		language: 'Taal',
	},
	pl: {
		blogTitle: 'Blog Delta Force Cheats 2026 | Poradniki w 22 językach',
		blogDescription:
			'Blog Delta Force Cheats z poradnikami undetected ESP, wallhack, radar i Aimbot dla Delta Force na PC.',
		blogH1: 'Blog Delta Force Cheats — Globalne poradniki',
		blogIntro:
			'Poradniki SEO undetected cheatów Delta Force, ESP wallhack, radar hack, Aimbot i ACE w 22 językach.',
		readMore: 'Czytaj poradnik',
		published: 'Opublikowano',
		updated: 'Zaktualizowano',
		relatedPosts: 'Powiązane poradniki Delta Force',
		allPosts: 'Wszystkie artykuły',
		home: 'Strona główna Delta Force Cheats',
		language: 'Język',
	},
	ru: {
		blogTitle: 'Блог Delta Force Cheats 2026 | Гайды на 22 языках',
		blogDescription:
			'Блог Delta Force Cheats: undetected ESP, wallhack, radar и Aimbot для Delta Force на Windows PC.',
		blogH1: 'Блог Delta Force Cheats — Глобальные гайды',
		blogIntro:
			'SEO-гайды по undetected читам Delta Force, ESP wallhack, radar hack, Aimbot и ACE на 22 языках.',
		readMore: 'Читать гайд',
		published: 'Опубликовано',
		updated: 'Обновлено',
		relatedPosts: 'Похожие гайды Delta Force',
		allPosts: 'Все статьи',
		home: 'Главная Delta Force Cheats',
		language: 'Язык',
	},
	tr: {
		blogTitle: 'Delta Force Cheats Blog 2026 | 22 dilde rehberler',
		blogDescription:
			'Delta Force Cheats blog: undetected ESP, wallhack, radar ve Aimbot rehberleri Delta Force Windows PC.',
		blogH1: 'Delta Force Cheats Blog — Küresel rehberler',
		blogIntro:
			'Undetected Delta Force hileleri, ESP wallhack, radar hack, Aimbot ve ACE SEO rehberleri 22 dilde.',
		readMore: 'Rehberi oku',
		published: 'Yayınlandı',
		updated: 'Güncellendi',
		relatedPosts: 'İlgili Delta Force rehberleri',
		allPosts: 'Tüm yazılar',
		home: 'Delta Force Cheats ana sayfa',
		language: 'Dil',
	},
	ar: {
		blogTitle: 'مدونة Delta Force Cheats 2026 | أدلة بـ 22 لغة',
		blogDescription:
			'مدونة Delta Force Cheats: غش undetected وESP wallhack ورadar وAimbot لـ Delta Force على Windows PC.',
		blogH1: 'مدونة Delta Force Cheats — أدلة عالمية',
		blogIntro:
			'أدلة SEO لغش Delta Force undetected وESP wallhack ورadar hack وAimbot وACE بـ 22 لغة.',
		readMore: 'اقرأ الدليل',
		published: 'نُشر',
		updated: 'تم التحديث',
		relatedPosts: 'أدلة Delta Force ذات صلة',
		allPosts: 'جميع المقالات',
		home: 'الرئيسية Delta Force Cheats',
		language: 'اللغة',
	},
	ja: {
		blogTitle: 'Delta Force Cheats ブログ 2026 | 22言語ガイド',
		blogDescription:
			'Delta Force Cheatsブログ：undetected ESP、wallhack、radar、Aimbotガイド。Delta Force Windows PC向け。',
		blogH1: 'Delta Force Cheats ブログ — グローバルガイド',
		blogIntro:
			'undetected Delta Forceチート、ESP wallhack、radar hack、Aimbot、ACEのSEOガイドを22言語で提供。',
		readMore: 'ガイドを読む',
		published: '公開日',
		updated: '更新日',
		relatedPosts: '関連Delta Forceガイド',
		allPosts: 'すべての記事',
		home: 'Delta Force Cheats ホーム',
		language: '言語',
	},
	ko: {
		blogTitle: 'Delta Force Cheats 블로그 2026 | 22개 언어 가이드',
		blogDescription:
			'Delta Force Cheats 블로그: undetected ESP, wallhack, radar, Aimbot 가이드. Delta Force Windows PC.',
		blogH1: 'Delta Force Cheats 블로그 — 글로벌 가이드',
		blogIntro:
			'undetected Delta Force 치트, ESP wallhack, radar hack, Aimbot, ACE SEO 가이드를 22개 언어로 제공.',
		readMore: '가이드 읽기',
		published: '게시일',
		updated: '업데이트',
		relatedPosts: '관련 Delta Force 가이드',
		allPosts: '모든 게시물',
		home: 'Delta Force Cheats 홈',
		language: '언어',
	},
	zh: {
		blogTitle: 'Delta Force Cheats 博客 2026 | 22种语言指南',
		blogDescription:
			'Delta Force Cheats博客：undetected ESP、wallhack、radar和Aimbot指南，适用于Delta Force Windows PC。',
		blogH1: 'Delta Force Cheats 博客 — 全球指南',
		blogIntro:
			'undetected Delta Force作弊、ESP wallhack、radar hack、Aimbot和ACE的SEO指南，共22种语言。',
		readMore: '阅读指南',
		published: '发布',
		updated: '更新',
		relatedPosts: '相关Delta Force指南',
		allPosts: '所有文章',
		home: 'Delta Force Cheats 首页',
		language: '语言',
	},
	hi: {
		blogTitle: 'Delta Force Cheats ब्लॉग 2026 | 22 भाषाओं में गाइड',
		blogDescription:
			'Delta Force Cheats ब्लॉग: undetected ESP, wallhack, radar और Aimbot गाइड Delta Force Windows PC के लिए।',
		blogH1: 'Delta Force Cheats ब्लॉग — वैश्विक गाइड',
		blogIntro:
			'undetected delta force cheats, ESP wallhack, radar hack, Aimbot और ACE SEO गाइड 22 भाषाओं में।',
		readMore: 'गाइड पढ़ें',
		published: 'प्रकाशित',
		updated: 'अपडेट',
		relatedPosts: 'संबंधित Delta Force गाइड',
		allPosts: 'सभी पोस्ट',
		home: 'Delta Force Cheats होम',
		language: 'भाषा',
	},
	id: {
		blogTitle: 'Blog Delta Force Cheats 2026 | Panduan 22 bahasa',
		blogDescription:
			'Blog Delta Force Cheats: panduan undetected ESP, wallhack, radar dan Aimbot untuk Delta Force di PC Windows.',
		blogH1: 'Blog Delta Force Cheats — Panduan global',
		blogIntro:
			'Panduan SEO cheat Delta Force undetected, ESP wallhack, radar hack, Aimbot dan ACE dalam 22 bahasa.',
		readMore: 'Baca panduan',
		published: 'Dipublikasikan',
		updated: 'Diperbarui',
		relatedPosts: 'Pandua Delta Force terkait',
		allPosts: 'Semua artikel',
		home: 'Beranda Delta Force Cheats',
		language: 'Bahasa',
	},
	th: {
		blogTitle: 'บล็อก Delta Force Cheats 2026 | คู่มือ 22 ภาษา',
		blogDescription:
			'บล็อก Delta Force Cheats: คู่มือ undetected ESP, wallhack, radar และ Aimbot สำหรับ Delta Force บน PC',
		blogH1: 'บล็อก Delta Force Cheats — คู่มือทั่วโลก',
		blogIntro:
			'คู่มือ SEO สำหรับ cheat Delta Force undetected, ESP wallhack, radar hack, Aimbot และ ACE 22 ภาษา',
		readMore: 'อ่านคู่มือ',
		published: 'เผยแพร่',
		updated: 'อัปเดต',
		relatedPosts: 'คู่มือ Delta Force ที่เกี่ยวข้อง',
		allPosts: 'บทความทั้งหมด',
		home: 'หน้าแรก Delta Force Cheats',
		language: 'ภาษา',
	},
	vi: {
		blogTitle: 'Blog Delta Force Cheats 2026 | Hướng dẫn 22 ngôn ngữ',
		blogDescription:
			'Blog Delta Force Cheats: hướng dẫn undetected ESP, wallhack, radar và Aimbot cho Delta Force trên PC.',
		blogH1: 'Blog Delta Force Cheats — Hướng dẫn toàn cầu',
		blogIntro:
			'Hướng dẫn SEO cheat Delta Force undetected, ESP wallhack, radar hack, Aimbot và ACE bằng 22 ngôn ngữ.',
		readMore: 'Đọc hướng dẫn',
		published: 'Xuất bản',
		updated: 'Cập nhật',
		relatedPosts: 'Hướng dẫn Delta Force liên quan',
		allPosts: 'Tất cả bài viết',
		home: 'Trang chủ Delta Force Cheats',
		language: 'Ngôn ngữ',
	},
	uk: {
		blogTitle: 'Блог Delta Force Cheats 2026 | Гайди 22 мовами',
		blogDescription:
			'Блог Delta Force Cheats: undetected ESP, wallhack, radar та Aimbot для Delta Force на Windows PC.',
		blogH1: 'Блог Delta Force Cheats — Глобальні гайди',
		blogIntro:
			'SEO-гайди з undetected читів Delta Force, ESP wallhack, radar hack, Aimbot та ACE 22 мовами.',
		readMore: 'Читати гайд',
		published: 'Опубліковано',
		updated: 'Оновлено',
		relatedPosts: "Пов'язані гайди Delta Force",
		allPosts: 'Усі статті',
		home: 'Головна Delta Force Cheats',
		language: 'Мова',
	},
	cs: {
		blogTitle: 'Blog Delta Force Cheats 2026 | Průvodce ve 22 jazycích',
		blogDescription:
			'Blog Delta Force Cheats: undetected ESP, wallhack, radar a Aimbot pro Delta Force na Windows PC.',
		blogH1: 'Blog Delta Force Cheats — Globální průvodce',
		blogIntro:
			'SEO průvodce undetected delta force cheaty, ESP wallhack, radar hack, Aimbot a ACE ve 22 jazycích.',
		readMore: 'Číst průvodce',
		published: 'Publikováno',
		updated: 'Aktualizováno',
		relatedPosts: 'Související Delta Force průvodce',
		allPosts: 'Všechny články',
		home: 'Domů Delta Force Cheats',
		language: 'Jazyk',
	},
	ro: {
		blogTitle: 'Blog Delta Force Cheats 2026 | Ghiduri în 22 de limbi',
		blogDescription:
			'Blog Delta Force Cheats: ghiduri undetected ESP, wallhack, radar și Aimbot pentru Delta Force pe PC.',
		blogH1: 'Blog Delta Force Cheats — Ghiduri globale',
		blogIntro:
			'Ghiduri SEO cheat-uri Delta Force undetected, ESP wallhack, radar hack, Aimbot și ACE în 22 de limbi.',
		readMore: 'Citește ghidul',
		published: 'Publicat',
		updated: 'Actualizat',
		relatedPosts: 'Ghiduri Delta Force related',
		allPosts: 'Toate articolele',
		home: 'Acasă Delta Force Cheats',
		language: 'Limbă',
	},
	sv: {
		blogTitle: 'Delta Force Cheats Blogg 2026 | Guider på 22 språk',
		blogDescription:
			'Delta Force Cheats blogg med undetected ESP, wallhack, radar och Aimbot guider för Delta Force på PC.',
		blogH1: 'Delta Force Cheats Blogg — Globala guider',
		blogIntro:
			'SEO-guider för undetected delta force cheats, ESP wallhack, radar hack, Aimbot och ACE på 22 språk.',
		readMore: 'Läs guide',
		published: 'Publicerad',
		updated: 'Uppdaterad',
		relatedPosts: 'Relaterade Delta Force guider',
		allPosts: 'Alla inlägg',
		home: 'Delta Force Cheats hem',
		language: 'Språk',
	},
};
