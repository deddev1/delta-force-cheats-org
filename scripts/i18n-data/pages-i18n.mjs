import { HERO_IMAGES, clampTitle, clampDesc, section, stripZadeyoFromMeta } from './constants.mjs';
import { phrases } from './phrases.mjs';
import { PAGE_IMAGE_ALTS } from './image-alts.mjs';
import { FOCUS_I18N } from './focus-i18n.mjs';
import { LEGAL_I18N } from './legal-i18n.mjs';

/** Page-specific translated meta for home across locales. */
export const PAGE_META_HOME = {
	es: { title: 'Delta Force Cheats 2026 | ESP, Wallhack y Aimbot', desc: 'Trucos Delta Force indetectables para Delta Force en PC. ESP wallhack, radar hack y Aimbot con mantenimiento ACE. Entrega digital instantánea.', h1: 'cheats indetectables para Delta Force', intro: 'Paquete undetected para Delta Force en Windows PC: ESP wallhack, radar y Aimbot con mantenimiento ACE tras cada parche.', imageAlt: 'Delta Force ESP — etiquetas de jugador hack', gallery: 'Galería Delta Force Cheats — ESP, Aimbot y wallhack', cta2: 'Ver funciones', h2a: 'Por qué eligen Delta Force Cheats en 2026', h2b: 'ESP wallhack, radar y Aimbot en una licencia', topicA: 'Ideal para leer escuadrones enemigos en BR y Quick Match sessions.', topicB: 'Una licencia en lugar de herramientas separadas.' },
	fr: { title: 'Delta Force Cheats 2026 | ESP, Wallhack et Aimbot', desc: 'Triches Delta Force indétectables pour Delta Force sur PC. ESP wallhack, radar hack et Aimbot avec maintenance ACE. Livraison numérique instantanée.', h1: 'triches indétectables pour Delta Force', intro: 'Pack undetected pour Delta Force sur PC Windows : ESP wallhack, radar et Aimbot avec maintenance ACE après chaque patch.', imageAlt: 'Delta Force ESP — tags joueur hack', gallery: 'Galerie Delta Force Cheats — ESP, Aimbot et wallhack', cta2: 'Voir les fonctions', h2a: 'Pourquoi choisir Delta Force Cheats en 2026', h2b: 'ESP wallhack, radar et Aimbot en une licence', topicA: 'Parfait pour lire les équipes ennemies en BR et Quick Match sessions.', topicB: 'Une licence au lieu d\'outils séparés.' },
	de: { title: 'Delta Force Cheats 2026 | ESP, Wallhack & Aimbot', desc: 'Undetected Delta Force Cheats für Delta Force auf PC. ESP Wallhack, Radar Hack und Aimbot mit ACE-Wartung. Sofortige digitale Lieferung.', h1: 'undetected Cheats für Delta Force', intro: 'Undetected Windows PC Paket für Delta Force: ESP Wallhack, Radar und Aimbot mit ACE-Wartung nach jedem Patch.', imageAlt: 'Delta Force ESP — Spieler-Tags Hack', gallery: 'Delta Force Cheats Galerie — ESP, Aimbot und Wallhack', cta2: 'Features ansehen', h2a: 'Warum Delta Force Cheats 2026 führt', h2b: 'ESP Wallhack, Radar und Aimbot in einer Lizenz', topicA: 'Ideal um feindliche Squads in BR und Quick Match sessions zu lesen.', topicB: 'Eine Lizenz statt separater Tools.' },
	pt: { title: 'Delta Force Cheats 2026 | ESP, Wallhack e Aimbot', desc: 'Cheats Delta Force indetectáveis para Delta Force no PC. ESP wallhack, radar hack e Aimbot com manutenção ACE. Entrega digital instantánea.', h1: 'cheats indetectáveis para Delta Force', intro: 'Pacote undetected para Delta Force no Windows PC: ESP wallhack, radar e Aimbot com manutenção ACE após cada patch.', imageAlt: 'Delta Force ESP player tags hack', gallery: 'Galeria Delta Force Cheats — ESP, Aimbot e wallhack', cta2: 'Ver recursos', h2a: 'Por que escolher Delta Force Cheats em 2026', h2b: 'ESP wallhack, radar e Aimbot numa licença', topicA: 'Ideal para ler equipes inimigos em BR e Quick Match sessions.', topicB: 'Uma licença em vez de ferramentas separadas.' },
	it: { title: 'Delta Force Cheats 2026 | ESP, Wallhack e Aimbot', desc: 'Cheat Delta Force indetectable per Delta Force su PC. ESP wallhack, radar hack e Aimbot con manutenzione ACE. Consegna digitale istantanea.', h1: 'cheat indetectable per Delta Force', intro: 'Pacchetto undetected per Delta Force su PC Windows: ESP wallhack, radar e Aimbot con manutenzione ACE dopo ogni patch.', imageAlt: 'Delta Force ESP player tags hack', gallery: 'Galleria Delta Force Cheats — ESP, Aimbot e wallhack', cta2: 'Vedi funzioni', h2a: 'Perché scegliere Delta Force Cheats nel 2026', h2b: 'ESP wallhack, radar e Aimbot in una licenza', topicA: 'Ideale per leggere squadre nemiche in BR e Quick Match sessions.', topicB: 'Una licenza invece di tool separati.' },
	nl: { title: 'Delta Force Cheats 2026 | ESP, Wallhack & Aimbot', desc: 'Undetected delta force cheats voor Delta Force op PC. ESP wallhack, radar hack en Aimbot met ACE-onderhoud. Directe digitale levering.', h1: 'undetected cheats voor Delta Force', intro: 'Undetected Windows PC pakket voor Delta Force: ESP wallhack, radar en Aimbot met ACE-onderhoud na elke patch.', imageAlt: 'Delta Force ESP player tags hack', gallery: 'Delta Force Cheats galerij — ESP, Aimbot en wallhack', cta2: 'Bekijk functies', h2a: 'Waarom Delta Force Cheats in 2026', h2b: 'ESP wallhack, radar en Aimbot in één licentie', topicA: 'Ideaal om vijandelijke squads te lezen in BR en Quick Match sessions.', topicB: 'Eén licentie in plaats van losse tools.' },
	pl: { title: 'Delta Force Cheats 2026 | ESP, Wallhack i Aimbot', desc: 'Undetected cheaty Delta Force dla Delta Force na PC. ESP wallhack, radar hack i Aimbot z konserwacją ACE. Natychmiastowa dostawa cyfrowa.', h1: 'undetected cheaty dla Delta Force', intro: 'Pakiet undetected dla Delta Force na Windows PC: ESP wallhack, radar i Aimbot z konserwacją ACE po każdym patchu.', imageAlt: 'Delta Force ESP player tags hack', gallery: 'Galeria Delta Force Cheats — ESP, Aimbot i wallhack', cta2: 'Zobacz funkcje', h2a: 'Dlaczego Delta Force Cheats w 2026', h2b: 'ESP wallhack, radar i Aimbot w jednej licencji', topicA: 'Idealny do czytania wrogich squadów w BR i Quick Match sessions.', topicB: 'Jedna licencja zamiast osobnych narzędzi.' },
	ru: { title: 'Delta Force Cheats 2026 | ESP, Wallhack и Aimbot', desc: 'Undetected читы Delta Force для Delta Force на PC. ESP wallhack, radar hack и Aimbot с обслуживанием ACE. Мгновенная цифровая доставка.', h1: 'undetected читы для Delta Force', intro: 'Undetected пакет для Delta Force на Windows PC: ESP wallhack, radar и Aimbot с обслуживанием ACE после патчей.', imageAlt: 'Delta Force ESP — теги игроков hack', gallery: 'Галерея Delta Force Cheats — ESP, Aimbot и wallhack', cta2: 'Смотреть функции', h2a: 'Почему выбирают Delta Force Cheats в 2026', h2b: 'ESP wallhack, radar и Aimbot в одной лицензии', topicA: 'Идеально для чтения вражеских отрядов в BR и Quick Match sessions.', topicB: 'Одна лицензия вместо отдельных инструментов.' },
	tr: { title: 'Delta Force Cheats 2026 | ESP, Wallhack ve Aimbot', desc: 'Delta Force için undetected hileler. ESP wallhack, radar hack ve Aimbot — ACE bakımı. Anında dijital teslimat.', h1: 'Delta Force için undetected hileler', intro: 'Delta Force Windows PC undetected paketi: ESP wallhack, radar ve Aimbot — ACE bakımı dahil.', imageAlt: 'Delta Force ESP player tags hack', gallery: 'Delta Force Cheats galeri — ESP, Aimbot ve wallhack', cta2: 'Özellikleri gör', h2a: '2026\'da neden Delta Force Cheats', h2b: 'ESP wallhack, radar ve Aimbot tek lisans', topicA: 'BR ve Quick Match sessions\'da düşman squad okumak için ideal.', topicB: 'Ayrı araçlar yerine tek lisans.' },
	ar: { title: 'Delta Force Cheats 2026 | ESP وWallhack وAimbot', desc: 'غش Delta Force undetected لـ Delta Force على PC. ESP wallhack ورadar hack وAimbot مع صيانة ACE. تسليم رقمي فوري.', h1: 'غش غير مكتشف لـ Delta Force', intro: 'حزمة undetected لـ Delta Force على Windows PC: ESP wallhack ورadar وAimbot مع صيانة ACE.', imageAlt: 'Delta Force ESP player tags hack', gallery: 'معرض Delta Force Cheats — ESP وAimbot وwallhack', cta2: 'عرض الميزات', h2a: 'لماذا Delta Force Cheats في 2026', h2b: 'ESP wallhack ورadar وAimbot في ترخيص واحد', topicA: 'مثالي لقراءة فرق العدو في BR وQuick Match sessions.', topicB: 'ترخيص واحد بدلاً من أدوات منفصلة.' },
	ja: { title: 'Delta Force Cheats 2026 | ESP・Wallhack・Aimbot', desc: 'Delta Force向けundetectedチート。ESP wallhack、radar hack、Aimbot、ACEメンテナンス。即時デジタル配信。', h1: 'Delta Force向けundetectedチート', intro: 'Delta Force Windows PC向けundetectedパッケージ：ESP wallhack、radar、Aimbot、ACEメンテナンス付き。', imageAlt: 'delta force cheats operator ESP aimbot wallhack', gallery: 'Delta Force Cheatsギャラリー — ESP、Aimbot、wallhack', cta2: '機能を見る', h2a: '2026年にDelta Force Cheatsを選ぶ理由', h2b: 'ESP wallhack、radar、Aimbotが1ライセンス', topicA: 'BRとQuick Match sessionsで敵スクワッドを読むのに最適。', topicB: '別ツールではなく1ライセンス。' },
	ko: { title: 'Delta Force Cheats 2026 | ESP, Wallhack, Aimbot', desc: 'Delta Force undetected 치트. ESP wallhack, radar hack, Aimbot, ACE 유지보수. 즉시 디지털 배송.', h1: 'Delta Force용 undetected 치트', intro: 'Delta Force Windows PC undetected 패키지: ESP wallhack, radar, Aimbot, ACE 유지보수 포함.', imageAlt: 'delta force cheats operator ESP aimbot wallhack', gallery: 'Delta Force Cheats 갤러리 — ESP, Aimbot, wallhack', cta2: '기능 보기', h2a: '2026년 Delta Force Cheats를 선택하는 이유', h2b: 'ESP wallhack, radar, Aimbot 단일 라이선스', topicA: 'BR 및 Quick Match sessions에서 적 분대 읽기에 이상적.', topicB: '별도 도구 대신 단일 라이선스.' },
	zh: { title: 'Delta Force Cheats 2026 | ESP、Wallhack、Aimbot', desc: 'Delta Force undetected作弊。ESP wallhack、radar hack、Aimbot、ACE维护。即时数字交付。', h1: 'Delta Force的undetected外挂', intro: 'Delta Force Windows PC undetected套餐：ESP wallhack、radar、Aimbot，含ACE维护。', imageAlt: 'delta force cheats operator ESP aimbot wallhack', gallery: 'Delta Force Cheats图库 — ESP、Aimbot、wallhack', cta2: '查看功能', h2a: '2026年选择Delta Force Cheats的原因', h2b: 'ESP wallhack、radar、Aimbot单一许可证', topicA: '适合在BR和Quick Match sessions中读取敌方小队。', topicB: '一个许可证而非多个工具。' },
	hi: { title: 'Delta Force Cheats 2026 | ESP, Wallhack और Aimbot', desc: 'Delta Force undetected hacks. ESP wallhack, radar hack, Aimbot, ACE maintenance. Instant digital delivery.', h1: 'Delta Force ke liye undetected cheats', intro: 'Delta Force Windows PC undetected पैकेज: ESP wallhack, radar, Aimbot, ACE maintenance सहित.', imageAlt: 'delta force cheats operator ESP aimbot wallhack', gallery: 'Delta Force Cheats gallery — ESP, Aimbot, wallhack', cta2: 'फ़ीचर्स देखें', h2a: '2026 में Delta Force Cheats क्यों', h2b: 'ESP wallhack, radar, Aimbot एक लाइसेंस में', topicA: 'BR और Quick Match sessions में दुश्मन squad पढ़ने के लिए आदर्श.', topicB: 'अलग टूल्स के बजाय एक लाइसेंस.' },
	id: { title: 'Delta Force Cheats 2026 | ESP, Wallhack & Aimbot', desc: 'Cheat Delta Force undetected untuk Delta Force di PC. ESP wallhack, radar hack, Aimbot, pemeliharaan ACE. Pengiriman digital instan.', h1: 'cheat undetected untuk Delta Force', intro: 'Paket undetected Delta Force di Windows PC: ESP wallhack, radar, Aimbot dengan pemeliharaan ACE.', imageAlt: 'Delta Force ESP player tags hack', gallery: 'Galeri Delta Force Cheats — ESP, Aimbot, wallhack', cta2: 'Lihat fitur', h2a: 'Mengapa Delta Force Cheats di 2026', h2b: 'ESP wallhack, radar, Aimbot dalam satu lisensi', topicA: 'Ideal membaca squad musuh di BR dan Quick Match sessions.', topicB: 'Satu lisensi alih-alih alat terpisah.' },
	th: { title: 'Delta Force Cheats 2026 | ESP, Wallhack และ Aimbot', desc: 'Cheat Delta Force undetected สำหรับ Delta Force บน PC. ESP wallhack, radar hack, Aimbot, ACE maintenance. จัดส่งดิจิทัลทันที.', h1: 'cheat undetected สำหรับ Delta Force', intro: 'แพ็ก undetected สำหรับ Delta Force บน Windows PC: ESP wallhack, radar, Aimbot พร้อม ACE maintenance', imageAlt: 'Delta Force ESP player tags hack', gallery: 'แกลเลอรี Delta Force Cheats — ESP, Aimbot, wallhack', cta2: 'ดูฟีเจอร์', h2a: 'ทำไมเลือก Delta Force Cheats ปี 2026', h2b: 'ESP wallhack, radar, Aimbot ในใบอนุญาตเดียว', topicA: 'เหมาะสำหรับอ่าน squad ศัตรูใน BR และ Quick Match sessions', topicB: 'ใบอนุญาตเดียวแทนเครื่องมือแยก' },
	vi: { title: 'Delta Force Cheats 2026 | ESP, Wallhack & Aimbot', desc: 'Cheat Delta Force undetected cho Delta Force trên PC. ESP wallhack, radar hack, Aimbot, bảo trì ACE. Giao hàng kỹ thuật số tức thì.', h1: 'cheat undetected cho Delta Force', intro: 'Gói undetected Delta Force trên Windows PC: ESP wallhack, radar, Aimbot với bảo trì ACE.', imageAlt: 'Delta Force ESP player tags hack', gallery: 'Thư viện Delta Force Cheats — ESP, Aimbot, wallhack', cta2: 'Xem tính năng', h2a: 'Vì sao chọn Delta Force Cheats 2026', h2b: 'ESP wallhack, radar, Aimbot trong một giấy phép', topicA: 'Lý tưởng đọc squad địch trong BR và Quick Match sessions.', topicB: 'Một giấy phép thay vì công cụ riêng.' },
	uk: { title: 'Delta Force Cheats 2026 | ESP, Wallhack і Aimbot', desc: 'Undetected чіти Delta Force для Delta Force на PC. ESP wallhack, radar hack, Aimbot, обслуговування ACE. Мгновенная цифровая доставка.', h1: 'undetected чіти для Delta Force', intro: 'Undetected пакет для Delta Force на Windows PC: ESP wallhack, radar, Aimbot з обслуговуванням ACE.', imageAlt: 'Delta Force ESP player tags hack', gallery: 'Галерея Delta Force Cheats — ESP, Aimbot, wallhack', cta2: 'Дивитися функції', h2a: 'Чому Delta Force Cheats у 2026', h2b: 'ESP wallhack, radar і Aimbot в одній ліцензії', topicA: 'Ідеально для читання ворожих загонів у BR і Quick Match sessions.', topicB: 'Одна ліцензія замість окремих інструментів.' },
	cs: { title: 'Delta Force Cheats 2026 | ESP, Wallhack a Aimbot', desc: 'Undetected delta force cheaty pro Delta Force na PC. ESP wallhack, radar hack, Aimbot, údržba ACE. Okamžité digitální doručení.', h1: 'undetected cheaty pro Delta Force', intro: 'Undetected balíček pro Delta Force na Windows PC: ESP wallhack, radar, Aimbot s údržbou ACE.', imageAlt: 'Delta Force ESP player tags hack', gallery: 'Galerie Delta Force Cheats — ESP, Aimbot, wallhack', cta2: 'Zobrazit funkce', h2a: 'Proč Delta Force Cheats v roce 2026', h2b: 'ESP wallhack, radar a Aimbot v jedné licenci', topicA: 'Ideální pro čtení nepřátelských squadů v BR a Quick Match sessions.', topicB: 'Jedna licence místo samostatných nástrojů.' },
	ro: { title: 'Delta Force Cheats 2026 | ESP, Wallhack și Aimbot', desc: 'Cheats Delta Force undetected pentru Delta Force pe PC. ESP wallhack, radar hack, Aimbot, mentenanță ACE. Livrare digitală instantă.', h1: 'cheat-uri undetected pentru Delta Force', intro: 'Pachet undetected Delta Force pe Windows PC: ESP wallhack, radar, Aimbot cu mentenanță ACE.', imageAlt: 'Delta Force ESP player tags hack', gallery: 'Galerie Delta Force Cheats — ESP, Aimbot, wallhack', cta2: 'Vezi funcții', h2a: 'De ce Delta Force Cheats în 2026', h2b: 'ESP wallhack, radar și Aimbot într-o licență', topicA: 'Ideal pentru citirea squad-urilor inamice în BR și Quick Match sessions.', topicB: 'O licență în loc de instrumente separate.' },
	sv: { title: 'Delta Force Cheats 2026 | ESP, Wallhack & Aimbot', desc: 'Undetected delta force cheats för Delta Force på PC. ESP wallhack, radar hack, Aimbot, ACE-underhåll. Omedelbar digital leverans.', h1: 'undetected cheats för Delta Force', intro: 'Undetected paket för Delta Force på Windows PC: ESP wallhack, radar, Aimbot med ACE-underhåll.', imageAlt: 'Delta Force ESP player tags hack', gallery: 'Delta Force Cheats galleri — ESP, Aimbot, wallhack', cta2: 'Se funktioner', h2a: 'Varför Delta Force Cheats 2026', h2b: 'ESP wallhack, radar och Aimbot i en licens', topicA: 'Ideal för att läsa fiendesquads i BR och Quick Match sessions.', topicB: 'En licens istället för separata verktyg.' },
};

export function buildHome(locale) {
	const p = phrases[locale];
	const m = PAGE_META_HOME[locale];
	return {
		title: clampTitle(stripZadeyoFromMeta(m.title)),
		description: clampDesc(stripZadeyoFromMeta(m.desc)),
		h1: m.h1,
		intro: m.intro,
		imageAlt: m.imageAlt,
		galleryTitle: m.gallery,
		heroImage: HERO_IMAGES.home,
		ctaPrimary: p.buy,
		ctaSecondary: m.cta2,
		ctaSecondaryHref: '/features/',
		sections: [
			section(m.h2a, p.s1(m.topicA), p.s2()),
			section(m.h2b, p.s1(m.topicB), p.s3()),
		],
	};
}

/** Unique title/desc tails per page — English base + locale overrides for hero H1/subtitle. */
export const PAGE_META_TAILS = {
	'delta-force-esp': { suffix: 'Player Boxes & Wallhack', focus: 'player boxes, operator markers, and wallhack overlays', altKeyword: 'ESP wallhack overlay' },
	'delta-force-aimbot': { suffix: 'Soft Aim Controls', focus: 'soft aim, FOV, and per-weapon Aimbot profiles', altKeyword: 'aimbot combat' },
	features: { suffix: 'Full Feature List', focus: 'ESP, soft aim, radar controls', altKeyword: 'cheats package ESP aimbot' },
	pricing: { suffix: 'Monthly & Lifetime', focus: '$35 monthly or $150 lifetime licenses', altKeyword: 'cheats pricing' },
	setup: { suffix: 'PC Setup Guide', focus: 'Windows PC activation and first-launch setup', altKeyword: 'setup PC activation' },
	updates: { suffix: 'Live Status Log', focus: 'ACE patch status and rebuild notes', altKeyword: 'updates ACE maintenance' },
	faq: { suffix: 'Common Answers', focus: 'ESP, soft aim, delivery, and ACE questions', altKeyword: 'FAQ ESP aimbot' },
	support: { suffix: 'Help & Contact', focus: 'order help and license support contact', altKeyword: 'support license help' },
	undetected: { suffix: 'ACE Safe Status', focus: 'undetected maintenance after ACE patches', altKeyword: 'undetected cheats ESP' },
	wallhack: { suffix: 'ESP Visibility', focus: 'wallhack ESP for players, loot, and distance', altKeyword: 'wallhack ESP visibility' },
	radar: { suffix: '2D Threat Overlay', focus: '2D radar cues for flanks and rotations', altKeyword: 'radar hack overlay' },
	ace: { suffix: 'Patch Maintenance', focus: 'how ACE updates are handled for Delta Force cheats', altKeyword: 'ACE bypass ESP aimbot' },
	'cheats-2026': { suffix: 'Buyer Guide', focus: '2026 delta force cheats checklist before checkout', altKeyword: 'hacks 2026 ESP aimbot' },
	hacks: { suffix: 'ESP Aimbot Guide', focus: 'Delta Force Cheats pillar for ESP and Aimbot', altKeyword: 'hacks ESP aimbot' },
	'cheat-download': { suffix: 'Instant Access', focus: 'digital license download after payment', altKeyword: 'cheat download ESP aimbot' },
	'mod-menu': { suffix: 'In-Game Toggles', focus: 'in-client ESP and soft aim toggles', altKeyword: 'mod menu ESP aimbot' },
	'soft-aim': { suffix: 'Smooth Aim Settings', focus: 'smooth soft aim settings for Windows PC', altKeyword: 'soft aim aimbot' },
	'best-cheats': { suffix: 'Buyer Checklist', focus: 'what to compare before buying delta force cheats', altKeyword: 'best hacks ESP aimbot' },
	'aimbot-hack': { suffix: 'Soft Aim Assist', focus: 'undetected Aimbot hack assist for Delta Force', altKeyword: 'aimbot hack combat' },
	'esp-hack': { suffix: 'Boxes & Loot', focus: 'ESP hack boxes, loot pins, and distance', altKeyword: 'ESP hack wallhack' },
	'unlock-all': { suffix: 'What It Means', focus: 'unlock-all searches vs real ESP and Aimbot tools', altKeyword: 'unlock all items ESP aimbot' },
};

/** Localized H1 suffixes (title/subtitle language change on product pages). */
export const SUFFIX_I18N = {
	es: {
		'delta-force-esp': 'Cajas de jugador y wallhack',
		'delta-force-aimbot': 'Controles soft aim',
		features: 'Lista completa de funciones',
		pricing: 'Mensual y de por vida',
		setup: 'Guía de instalación PC',
		updates: 'Registro de estado',
		faq: 'Preguntas frecuentes',
		support: 'Ayuda y contacto',
		undetected: 'Estado indetectable',
		wallhack: 'Visibilidad ESP',
		radar: 'Radar 2D de amenazas',
		ace: 'Mantenimiento de parches',
		'cheats-2026': 'Guía del comprador',
		hacks: 'Guía ESP y Aimbot',
		'cheat-download': 'Acceso instantáneo',
		'mod-menu': 'Controles en partida',
		'soft-aim': 'Ajustes soft aim',
		'best-cheats': 'Lista de compra',
		'aimbot-hack': 'Asistencia soft aim',
		'esp-hack': 'Cajas y loot',
		'unlock-all': 'Qué significa',
	},
	fr: {
		'delta-force-esp': 'Boîtes joueur et wallhack',
		'delta-force-aimbot': 'Contrôles soft aim',
		features: 'Liste complète des fonctions',
		pricing: 'Mensuel et à vie',
		setup: 'Guide d\'installation PC',
		updates: 'Journal de statut',
		faq: 'Questions fréquentes',
		support: 'Aide et contact',
		undetected: 'Statut indétectable',
		wallhack: 'Visibilité ESP',
		radar: 'Radar 2D des menaces',
		ace: 'Maintenance des patchs',
		'cheats-2026': 'Guide acheteur',
		hacks: 'Guide ESP et Aimbot',
		'cheat-download': 'Accès instantané',
		'mod-menu': 'Contrôles en jeu',
		'soft-aim': 'Réglages soft aim',
		'best-cheats': 'Checklist acheteur',
		'aimbot-hack': 'Assistance soft aim',
		'esp-hack': 'Boîtes et loot',
		'unlock-all': 'Ce que ça signifie',
	},
	de: {
		'delta-force-esp': 'Spielerboxen & Wallhack',
		'delta-force-aimbot': 'Soft-Aim Steuerung',
		features: 'Vollständige Feature-Liste',
		pricing: 'Monatlich & Lifetime',
		setup: 'PC Setup-Anleitung',
		updates: 'Wartungsprotokoll',
		faq: 'Häufige Fragen',
		support: 'Hilfe & Kontakt',
		undetected: 'Undetected Status',
		wallhack: 'ESP Sichtbarkeit',
		radar: '2D Bedrohungsradar',
		ace: 'Patch-Wartung',
		'cheats-2026': 'Käuferleitfaden',
		hacks: 'ESP Aimbot Guide',
		'cheat-download': 'Sofortzugang',
		'mod-menu': 'In-Game Toggles',
		'soft-aim': 'Soft-Aim Einstellungen',
		'best-cheats': 'Käufer-Checkliste',
		'aimbot-hack': 'Soft-Aim Assist',
		'esp-hack': 'Boxen & Loot',
		'unlock-all': 'Was es bedeutet',
	},
	pt: {
		'delta-force-esp': 'Caixas de jogador e wallhack',
		'delta-force-aimbot': 'Controles soft aim',
		features: 'Lista completa de recursos',
		pricing: 'Mensal e vitalício',
		setup: 'Guia de instalação PC',
		updates: 'Registro de estado',
		faq: 'Perguntas frequentes',
		support: 'Ajuda e contato',
		undetected: 'Status indetectável',
		wallhack: 'Visibilidade ESP',
		radar: 'Radar 2D de ameaças',
		ace: 'Manutenção de patches',
		'cheats-2026': 'Guia do comprador',
		hacks: 'Guia ESP e Aimbot',
		'cheat-download': 'Acesso instantâneo',
		'mod-menu': 'Controles in-game',
		'soft-aim': 'Ajustes soft aim',
		'best-cheats': 'Checklist do comprador',
		'aimbot-hack': 'Assistência soft aim',
		'esp-hack': 'Caixas e loot',
		'unlock-all': 'O que significa',
	},
	it: {
		'delta-force-esp': 'Box giocatore e wallhack',
		'delta-force-aimbot': 'Controlli soft aim',
		features: 'Elenco completo funzioni',
		pricing: 'Mensile e lifetime',
		setup: 'Guida setup PC',
		updates: 'Log manutenzione',
		faq: 'Domande frequenti',
		support: 'Aiuto e contatto',
		undetected: 'Stato indetectable',
		wallhack: 'Visibilità ESP',
		radar: 'Radar 2D minacce',
		ace: 'Manutenzione patch',
		'cheats-2026': 'Guida acquirente',
		hacks: 'Guida ESP e Aimbot',
		'cheat-download': 'Accesso istantaneo',
		'mod-menu': 'Toggle in-game',
		'soft-aim': 'Impostazioni soft aim',
		'best-cheats': 'Checklist acquirente',
		'aimbot-hack': 'Assist soft aim',
		'esp-hack': 'Box e loot',
		'unlock-all': 'Cosa significa',
	},
	ru: {
		'delta-force-esp': 'Боксы игроков и wallhack',
		'delta-force-aimbot': 'Управление soft aim',
		features: 'Полный список функций',
		pricing: 'Месяц и lifetime',
		setup: 'Гайд по установке',
		updates: 'Журнал обновлений',
		faq: 'Частые вопросы',
		support: 'Помощь и контакт',
		undetected: 'Статус undetected',
		wallhack: 'Видимость ESP',
		radar: '2D радар угроз',
		ace: 'Обслуживание патчей',
		'cheats-2026': 'Гайд покупателя',
		hacks: 'Гайд ESP и Aimbot',
		'cheat-download': 'Мгновенный доступ',
		'mod-menu': 'Игровые переключатели',
		'soft-aim': 'Настройки soft aim',
		'best-cheats': 'Чеклист покупателя',
		'aimbot-hack': 'Soft aim ассист',
		'esp-hack': 'Боксы и лут',
		'unlock-all': 'Что это значит',
	},
};

function productPage(locale, pageKey, topicName, cta2href) {
	const p = phrases[locale];
	const home = PAGE_META_HOME[locale];
	const meta = PAGE_META_TAILS[pageKey] ?? { suffix: 'Delta Force Cheats', focus: 'ESP wallhack, radar, and Aimbot', altKeyword: 'ESP aimbot wallhack' };
	const focus = FOCUS_I18N[locale]?.[pageKey] ?? meta.focus;
	const suffix = SUFFIX_I18N[locale]?.[pageKey] ?? meta.suffix;
	const titleBase = `${topicName} | ${suffix}`;
	return {
		title: clampTitle(stripZadeyoFromMeta(titleBase)),
		description: clampDesc(
			stripZadeyoFromMeta(
				`${topicName} for Delta Force Operations & Warfare on Windows PC — ${focus}. ${p.delivery}. ${p.undetected}. Official delta force cheats at deltaforcecheats.org.`,
			),
		),
		h1: topicName,
		intro: p.s1(`${topicName}.`),
		imageAlt: PAGE_IMAGE_ALTS[pageKey] || `${topicName} — Delta Force Cheats screenshot`,
		galleryTitle: topicName,
		heroImage: HERO_IMAGES[pageKey],
		ctaPrimary: p.buy,
		ctaSecondary: home.cta2,
		ctaSecondaryHref: cta2href,
		sections: [
			section(topicName, p.s1(`${focus}.`), p.s2()),
			section(`${p.undetected}`, p.s3(), p.s2()),
			section(p.delivery, p.s2(), p.legal()),
		],
	};
}

export const TOPIC_NAMES = {
	'delta-force-esp': { en: 'Delta Force ESP', es: 'ESP Delta Force', fr: 'ESP Delta Force', de: 'Delta Force ESP', pt: 'ESP Delta Force', it: 'ESP Delta Force', nl: 'Delta Force ESP', pl: 'ESP Delta Force', ru: 'ESP Delta Force', tr: 'Delta Force ESP', ar: 'ESP Delta Force', ja: 'Delta Force ESP', ko: 'Delta Force ESP', zh: 'Delta Force ESP', hi: 'Delta Force ESP', id: 'ESP Delta Force', th: 'Delta Force ESP', vi: 'ESP Delta Force', uk: 'ESP Delta Force', cs: 'Delta Force ESP', ro: 'ESP Delta Force', sv: 'Delta Force ESP' },
	'delta-force-aimbot': { en: 'Delta Force Aimbot', es: 'Aimbot Delta Force', fr: 'Aimbot Delta Force', de: 'Delta Force Aimbot', pt: 'Aimbot Delta Force', it: 'Aimbot Delta Force', nl: 'Delta Force Aimbot', pl: 'Aimbot Delta Force', ru: 'Aimbot Delta Force', tr: 'Delta Force Aimbot', ar: 'Aimbot Delta Force', ja: 'Delta Force Aimbot', ko: 'Delta Force Aimbot', zh: 'Delta Force Aimbot', hi: 'Delta Force Aimbot', id: 'Aimbot Delta Force', th: 'Delta Force Aimbot', vi: 'Aimbot Delta Force', uk: 'Aimbot Delta Force', cs: 'Delta Force Aimbot', ro: 'Aimbot Delta Force', sv: 'Delta Force Aimbot' },
	features: { en: 'Features', es: 'Funciones', fr: 'Fonctions', de: 'Features', pt: 'Recursos', it: 'Funzioni', nl: 'Functies', pl: 'Funkcje', ru: 'Функции', tr: 'Özellikler', ar: 'الميزات', ja: '機能', ko: '기능', zh: '功能', hi: 'फ़ीचर्स', id: 'Fitur', th: 'ฟีเจอร์', vi: 'Tính năng', uk: 'Функції', cs: 'Funkce', ro: 'Funcții', sv: 'Funktioner' },
	pricing: { en: 'Pricing', es: 'Precios', fr: 'Tarifs', de: 'Preise', pt: 'Preços', it: 'Prezzi', nl: 'Prijzen', pl: 'Cennik', ru: 'Цены', tr: 'Fiyatlar', ar: 'الأسعار', ja: '料金', ko: '가격', zh: '价格', hi: 'कीमत', id: 'Harga', th: 'ราคา', vi: 'Giá', uk: 'Ціни', cs: 'Ceny', ro: 'Prețuri', sv: 'Priser' },
	setup: { en: 'Setup', es: 'Instalación', fr: 'Installation', de: 'Setup', pt: 'Instalação', it: 'Setup', nl: 'Setup', pl: 'Instalacja', ru: 'Установка', tr: 'Kurulum', ar: 'التثبيت', ja: 'セットアップ', ko: '설치', zh: '安装', hi: 'सेटअप', id: 'Setup', th: 'ติดตั้ง', vi: 'Cài đặt', uk: 'Встановлення', cs: 'Instalace', ro: 'Instalare', sv: 'Installation' },
	updates: { en: 'Updates', es: 'Actualizaciones', fr: 'Mises à jour', de: 'Updates', pt: 'Atualizações', it: 'Aggiornamenti', nl: 'Updates', pl: 'Aktualizacje', ru: 'Обновления', tr: 'Güncellemeler', ar: 'التحديثات', ja: '更新', ko: '업데이트', zh: '更新', hi: 'अपडेट', id: 'Pembaruan', th: 'อัปเดต', vi: 'Cập nhật', uk: 'Оновлення', cs: 'Aktualizace', ro: 'Actualizări', sv: 'Uppdateringar' },
	faq: { en: 'FAQ', es: 'FAQ', fr: 'FAQ', de: 'FAQ', pt: 'FAQ', it: 'FAQ', nl: 'FAQ', pl: 'FAQ', ru: 'FAQ', tr: 'SSS', ar: 'الأسئلة', ja: 'FAQ', ko: 'FAQ', zh: '常见问题', hi: 'FAQ', id: 'FAQ', th: 'FAQ', vi: 'FAQ', uk: 'FAQ', cs: 'FAQ', ro: 'FAQ', sv: 'FAQ' },
	support: { en: 'Support', es: 'Soporte', fr: 'Support', de: 'Support', pt: 'Suporte', it: 'Supporto', nl: 'Support', pl: 'Wsparcie', ru: 'Поддержка', tr: 'Destek', ar: 'الدعم', ja: 'サポート', ko: '지원', zh: '支持', hi: 'सहायता', id: 'Dukungan', th: 'สนับสนุน', vi: 'Hỗ trợ', uk: 'Підтримка', cs: 'Podpora', ro: 'Suport', sv: 'Support' },
	undetected: { en: 'Undetected Cheats', es: 'Trucos indetectables', fr: 'Triches indétectables', de: 'Undetected Cheats', pt: 'Cheats indetectáveis', it: 'Cheat indetectable', nl: 'Undetected Cheats', pl: 'Cheaty undetected', ru: 'Undetected читы', tr: 'Undetected hileler', ar: 'غش undetected', ja: 'Undetectedチート', ko: 'Undetected 치트', zh: 'Undetected作弊', hi: 'Undetected cheats', id: 'Cheat undetected', th: 'Cheats undetected', vi: 'Cheat undetected', uk: 'Undetected чіти', cs: 'Undetected cheaty', ro: 'Cheats undetected', sv: 'Undetected cheats' },
	wallhack: { en: 'Delta Force Wallhack', es: 'Delta Force Wallhack', fr: 'Delta Force Wallhack', de: 'Delta Force Wallhack', pt: 'Delta Force Wallhack', it: 'Delta Force Wallhack', nl: 'Delta Force Wallhack', pl: 'Delta Force Wallhack', ru: 'Delta Force Wallhack', tr: 'Delta Force Wallhack', ar: 'Delta Force Wallhack', ja: 'Delta Force Wallhack', ko: 'Delta Force Wallhack', zh: 'Delta Force Wallhack', hi: 'Delta Force Wallhack', id: 'Delta Force Wallhack', th: 'Delta Force Wallhack', vi: 'Delta Force Wallhack', uk: 'Delta Force Wallhack', cs: 'Delta Force Wallhack', ro: 'Delta Force Wallhack', sv: 'Delta Force Wallhack' },
	radar: { en: 'Radar Hack', es: 'Radar hack', fr: 'Radar hack', de: 'Radar Hack', pt: 'Radar hack', it: 'Radar hack', nl: 'Radar Hack', pl: 'Radar hack', ru: 'Radar hack', tr: 'Radar hack', ar: 'Radar hack', ja: 'Radar Hack', ko: 'Radar Hack', zh: 'Radar Hack', hi: 'Radar Hack', id: 'Radar hack', th: 'Radar Hack', vi: 'Radar hack', uk: 'Radar hack', cs: 'Radar Hack', ro: 'Radar hack', sv: 'Radar Hack' },
	ace: { en: 'ACE Bypass', es: 'Bypass ACE', fr: 'Bypass ACE', de: 'ACE Bypass', pt: 'Bypass ACE', it: 'Bypass ACE', nl: 'ACE Bypass', pl: 'Bypass ACE', ru: 'Bypass ACE', tr: 'ACE bypass', ar: 'Bypass ACE', ja: 'ACE Bypass', ko: 'ACE Bypass', zh: 'ACE Bypass', hi: 'ACE Bypass', id: 'Bypass ACE', th: 'ACE Bypass', vi: 'Bypass ACE', uk: 'Bypass ACE', cs: 'ACE Bypass', ro: 'Bypass ACE', sv: 'ACE Bypass' },
	'cheats-2026': { en: 'Delta Force Cheats 2026', es: 'Trucos Delta Force 2026', fr: 'Triches Delta Force 2026', de: 'Delta Force Cheats 2026', pt: 'Cheats Delta Force 2026', it: 'Cheat Delta Force 2026', nl: 'Delta Force Cheats 2026', pl: 'Cheaty Delta Force 2026', ru: 'Читы Delta Force 2026', tr: 'Delta Force Hileleri 2026', ar: 'غش Delta Force 2026', ja: 'Delta Force Cheats 2026', ko: 'Delta Force Cheats 2026', zh: 'Delta Force作弊 2026', hi: 'Delta Force Cheats 2026', id: 'Cheat Delta Force 2026', th: 'Delta Force Cheats 2026', vi: 'Cheat Delta Force 2026', uk: 'Чіти Delta Force 2026', cs: 'delta force cheaty 2026', ro: 'Cheats Delta Force 2026', sv: 'Delta Force Cheats 2026' },
	hacks: { en: 'Delta Force Cheats', es: 'Trucos Delta Force', fr: 'Triches Delta Force', de: 'Delta Force Cheats', pt: 'Cheats Delta Force', it: 'Cheat Delta Force', nl: 'Delta Force Cheats', pl: 'Cheaty Delta Force', ru: 'Читы Delta Force', tr: 'Delta Force Hileleri', ar: 'غش Delta Force', ja: 'Delta Force Cheats', ko: 'Delta Force Cheats', zh: 'Delta Force作弊', hi: 'Delta Force Cheats', id: 'Cheat Delta Force', th: 'Delta Force Cheats', vi: 'Cheat Delta Force', uk: 'Чіти Delta Force', cs: 'delta force cheaty', ro: 'Cheats Delta Force', sv: 'Delta Force Cheats' },
	'cheat-download': { en: 'Delta Force Cheat Download', es: 'Descarga Delta Force Cheats', fr: 'Téléchargement Delta Force Cheats', de: 'Delta Force Cheat Download', pt: 'Download Delta Force Cheats', it: 'Download Delta Force Cheats', nl: 'Delta Force Cheat Download', pl: 'Pobieranie Delta Force Cheats', ru: 'Скачать Delta Force Cheats', tr: 'Delta Force Hile İndir', ar: 'تحميل Delta Force Cheats', ja: 'Delta Force Cheat Download', ko: 'Delta Force Cheat Download', zh: 'Delta Force作弊下载', hi: 'Delta Force Cheat Download', id: 'Download Cheat Delta Force', th: 'ดาวน์โหลด Delta Force Cheats', vi: 'Tải Cheat Delta Force', uk: 'Завантаження Delta Force Cheats', cs: 'Stáhnout Delta Force Cheats', ro: 'Descărcare Delta Force Cheats', sv: 'Delta Force Cheat Download' },
	'mod-menu': { en: 'Delta Force Mod Menu', es: 'Menú mod Delta Force', fr: 'Menu mod Delta Force', de: 'Delta Force Mod-Menü', pt: 'Menu mod Delta Force', it: 'Mod menu Delta Force', nl: 'Delta Force Mod Menu', pl: 'Mod menu Delta Force', ru: 'Мод-меню Delta Force', tr: 'Delta Force Mod Menü', ar: 'قائمة مود Delta Force', ja: 'Delta Force Mod Menu', ko: 'Delta Force 모드 메뉴', zh: 'Delta Force修改菜单', hi: 'Delta Force Mod Menu', id: 'Menu mod Delta Force', th: 'เมนูมอด Delta Force', vi: 'Mod menu Delta Force', uk: 'Мод-меню Delta Force', cs: 'Delta Force mod menu', ro: 'Meniu mod Delta Force', sv: 'Delta Force Mod-meny' },
	'soft-aim': { en: 'Delta Force Soft Aim', es: 'Soft aim Delta Force', fr: 'Soft aim Delta Force', de: 'Delta Force Soft Aim', pt: 'Soft aim Delta Force', it: 'Soft aim Delta Force', nl: 'Delta Force Soft Aim', pl: 'Soft aim Delta Force', ru: 'Soft aim Delta Force', tr: 'Delta Force Soft Aim', ar: 'Soft aim Delta Force', ja: 'Delta Force Soft Aim', ko: 'Delta Force Soft Aim', zh: 'Delta Force Soft Aim', hi: 'Delta Force Soft Aim', id: 'Soft aim Delta Force', th: 'Delta Force Soft Aim', vi: 'Soft aim Delta Force', uk: 'Soft aim Delta Force', cs: 'Delta Force Soft Aim', ro: 'Soft aim Delta Force', sv: 'Delta Force Soft Aim' },
	'best-cheats': { en: 'Best Delta Force Cheats', es: 'Mejores trucos Delta Force', fr: 'Meilleures triches Delta Force', de: 'Beste Delta Force Cheats', pt: 'Melhores cheats Delta Force', it: 'Migliori cheat Delta Force', nl: 'Beste Delta Force Cheats', pl: 'Najlepsze cheaty Delta Force', ru: 'Лучшие читы Delta Force', tr: 'En İyi Delta Force Hileleri', ar: 'أفضل غش Delta Force', ja: '最強Delta Forceチート', ko: '최고의 Delta Force 치트', zh: '最佳Delta Force作弊', hi: 'सर्वश्रेष्ठ Delta Force Cheats', id: 'Cheat Delta Force terbaik', th: 'Cheat Delta Force ที่ดีที่สุด', vi: 'Cheat Delta Force tốt nhất', uk: 'Найкращі чіти Delta Force', cs: 'Nejlepší delta force cheaty', ro: 'Cele mai bune cheats Delta Force', sv: 'Bästa Delta Force Cheats' },
	'aimbot-hack': { en: 'Delta Force Aimbot Hack', es: 'Hack aimbot Delta Force', fr: 'Hack aimbot Delta Force', de: 'Delta Force Aimbot Hack', pt: 'Hack aimbot Delta Force', it: 'Hack aimbot Delta Force', nl: 'Delta Force Aimbot Hack', pl: 'Hack aimbot Delta Force', ru: 'Хак aimbot Delta Force', tr: 'Delta Force Aimbot Hilesi', ar: 'هاك Aimbot Delta Force', ja: 'Delta Force Aimbot Hack', ko: 'Delta Force 에임봇 핵', zh: 'Delta Force自瞄外挂', hi: 'Delta Force Aimbot Hack', id: 'Hack aimbot Delta Force', th: 'Hack Aimbot Delta Force', vi: 'Hack aimbot Delta Force', uk: 'Хак aimbot Delta Force', cs: 'Delta Force Aimbot hack', ro: 'Hack aimbot Delta Force', sv: 'Delta Force Aimbot Hack' },
	'esp-hack': { en: 'Delta Force ESP Hack', es: 'Hack ESP Delta Force', fr: 'Hack ESP Delta Force', de: 'Delta Force ESP Hack', pt: 'Hack ESP Delta Force', it: 'Hack ESP Delta Force', nl: 'Delta Force ESP Hack', pl: 'Hack ESP Delta Force', ru: 'Хак ESP Delta Force', tr: 'Delta Force ESP Hilesi', ar: 'هاك ESP Delta Force', ja: 'Delta Force ESP Hack', ko: 'Delta Force ESP 핵', zh: 'Delta Force ESP外挂', hi: 'Delta Force ESP Hack', id: 'Hack ESP Delta Force', th: 'Hack ESP Delta Force', vi: 'Hack ESP Delta Force', uk: 'Хак ESP Delta Force', cs: 'Delta Force ESP hack', ro: 'Hack ESP Delta Force', sv: 'Delta Force ESP Hack' },
	'unlock-all': { en: 'Delta Force Unlock All', es: 'Unlock all Delta Force', fr: 'Unlock all Delta Force', de: 'Delta Force Unlock All', pt: 'Unlock all Delta Force', it: 'Unlock all Delta Force', nl: 'Delta Force Unlock All', pl: 'Unlock all Delta Force', ru: 'Unlock all Delta Force', tr: 'Delta Force Unlock All', ar: 'Unlock all Delta Force', ja: 'Delta Force Unlock All', ko: 'Delta Force Unlock All', zh: 'Delta Force Unlock All', hi: 'Delta Force Unlock All', id: 'Unlock all Delta Force', th: 'Delta Force Unlock All', vi: 'Unlock all Delta Force', uk: 'Unlock all Delta Force', cs: 'Delta Force Unlock All', ro: 'Unlock all Delta Force', sv: 'Delta Force Unlock All' },
};

export const CTA2_HREF = {
	'delta-force-esp': '/delta-force-cheats/',
	'delta-force-aimbot': '/delta-force-esp/',
	features: '/pricing/',
	pricing: '/setup/',
	setup: '/support/',
	updates: '/delta-force-cheats/',
	faq: '/support/',
	support: '/setup/',
	undetected: '/delta-force-cheats/',
	wallhack: '/delta-force-esp/',
	radar: '/delta-force-esp/',
	ace: '/updates/',
	'cheats-2026': '/delta-force-cheats/',
	hacks: '/features/',
	'cheat-download': '/setup/',
	'mod-menu': '/features/',
	'soft-aim': '/delta-force-aimbot/',
	'best-cheats': '/pricing/',
	'aimbot-hack': '/delta-force-aimbot/',
	'esp-hack': '/delta-force-esp/',
	'unlock-all': '/features/',
};

export function buildLegal(locale, pageKey, kind) {
	const p = phrases[locale];
	const titles = {
		privacy: { es: 'Política de privacidad', fr: 'Politique de confidentialité', de: 'Datenschutz', pt: 'Política de privacidade', it: 'Informativa privacy', nl: 'Privacybeleid', pl: 'Polityka prywatności', ru: 'Политика конфиденциальности', tr: 'Gizlilik politikası', ar: 'سياسة الخصوصية', ja: 'プライバシーポリシー', ko: '개인정보 처리방침', zh: '隐私政策', hi: 'गोपनीयता नीति', id: 'Kebijakan privasi', th: 'นโยบายความเป็นส่วนตัว', vi: 'Chính sách bảo mật', uk: 'Політика конфіденційності', cs: 'Zásady ochrany soukromí', ro: 'Politica de confidențialitate', sv: 'Integritetspolicy' },
		refund: { es: 'Política de reembolso', fr: 'Politique de remboursement', de: 'Rückerstattung', pt: 'Política de reembolso', it: 'Politica di rimborso', nl: 'Restitutiebeleid', pl: 'Polityka zwrotów', ru: 'Политика возврата', tr: 'İade politikası', ar: 'سياسة الاسترداد', ja: '返金ポリシー', ko: '환불 정책', zh: '退款政策', hi: 'रिफंड नीति', id: 'Kebijakan refund', th: 'นโยบายการคืนเงิน', vi: 'Chính sách hoàn tiền', uk: 'Політика повернення', cs: 'Zásady vrácení peněz', ro: 'Politica de rambursare', sv: 'Återbetalningspolicy' },
		terms: { es: 'Términos de uso', fr: 'Conditions d\'utilisation', de: 'Nutzungsbedingungen', pt: 'Termos de uso', it: 'Termini di utilizzo', nl: 'Gebruiksvoorwaarden', pl: 'Warunki użytkowania', ru: 'Условия использования', tr: 'Kullanım şartları', ar: 'شروط الاستخدام', ja: '利用規約', ko: '이용 약관', zh: '使用条款', hi: 'उपयोग की शर्तें', id: 'Syarat penggunaan', th: 'ข้อกำหนดการใช้งาน', vi: 'Điều khoản sử dụng', uk: 'Умови використання', cs: 'Podmínky použití', ro: 'Termeni de utilizare', sv: 'Användarvillkor' },
	};
	const h1 = titles[kind][locale] ?? (kind === 'privacy' ? 'Privacy Policy' : kind === 'refund' ? 'Refund Policy' : 'Terms of Use');
	const L = LEGAL_I18N[locale];
	const pageCopy = L?.[kind] ?? {};
	const h2 = pageCopy.h2 ?? ['Information we collect', 'How we use data', 'Your rights'];
	return {
		title: clampTitle(stripZadeyoFromMeta(`${h1} | Delta Force Cheats`)),
		description: clampDesc(stripZadeyoFromMeta(`${h1} ${L?.descFor ?? 'for Delta Force Cheats — ESP wallhack, Aimbot'}, ${p.win}.`)),
		h1,
		intro: p.s1(`${h1} ${L?.introTopic ?? 'for deltaforcecheats.org and Delta Force licenses.'}`),
		imageAlt: 'Delta Force Cheats',
		galleryTitle: 'Delta Force Cheats',
		heroImage: HERO_IMAGES[pageKey],
		ctaPrimary: L?.emailSupport ?? 'Email support',
		ctaSecondary:
			kind === 'privacy'
				? L?.readTerms ?? 'Read terms'
				: L?.readPrivacy ?? 'Read privacy',
		ctaSecondaryHref: kind === 'privacy' ? '/terms/' : '/privacy-policy/',
		sections: [
			section(
				h2[0],
				p.s1(L?.sec1p1 ?? 'Contact email, Zadeyo order references, and basic site security data.'),
				kind === 'privacy'
					? L?.privacy?.sec1p2 ?? 'Payment details are processed by Zadeyo checkout — not stored on deltaforcecheats.org.'
					: p.s2(),
			),
			section(
				h2[1],
				p.s1(L?.privacy?.sec2p1 ?? 'Support responses, order resolution, and legal compliance when required.'),
				kind === 'terms'
					? L?.terms?.sec2p2 ?? 'Using cheats may violate Team Jade terms — you assume all ban risk.'
					: p.s3(),
			),
			section(h2[2], p.legal(), `${L?.emailLabel ?? 'Email:'} support@deltaforcecheats.org`),
		],
	};
}

/** Build all pages for a non-English locale. */
export function buildPagesForLocale(locale) {
	const pages = { home: buildHome(locale) };
	for (const [pageKey, names] of Object.entries(TOPIC_NAMES)) {
		pages[pageKey] = productPage(locale, pageKey, names[locale], CTA2_HREF[pageKey]);
	}
	for (const kind of ['privacy', 'refund', 'terms']) {
		pages[kind] = buildLegal(locale, kind, kind);
	}
	return pages;
}
