import type { LocaleCode } from './locales';

export type GalleryUi = {
	eyebrow: string;
	title: string;
	subtitle: string;
	lead: string;
	highlights: { title: string; copy: string }[];
	updatesLabel: string;
	updatesShort: string;
};

export const galleryUi: Record<LocaleCode, GalleryUi> = {
	en: {
		eyebrow: 'Delta Force Cheats',
		title: 'Delta Force Cheats gallery',
		subtitle: 'Simple delta force cheats visuals — ESP, wallhack, aimbot, and radar for Delta Force on PC.',
		lead: 'Delta Force Cheats helps you spot enemy operators, loot, vehicles, and extraction zones with ESP, aimbot, and radar in one license.',
		highlights: [
			{ title: 'delta force cheats esp', copy: 'See players through walls with delta force cheats esp and wallhack overlays.' },
			{ title: 'delta force cheats radar', copy: 'Track nearby threats with delta force cheats radar before you push or rotate.' },
			{ title: 'delta force cheats aimbot', copy: 'Use soft aim and aimbot controls tuned for Delta Force matches on Windows PC.' },
		],
		updatesLabel: 'delta force cheats updates',
		updatesShort: 'Updates',
	},
	es: {
		eyebrow: 'Delta Force Cheats',
		title: 'Galería Delta Force',
		subtitle: 'Visuales de Delta Force con loadouts, peleas de equipo y combate match — junto a herramientas ESP, radar y Aimbot.',
		lead: 'Delta Force Cheats está pensado para el loop competitivo de Delta Force: leer el mapa, rastrear escuadrones enemigos, lootear y ganar rondas.',
		highlights: [
			{ title: 'ESP de players y escuadrones', copy: 'Detecta players enemigos y contornos de equipo en mapas y extract routes para elegir peleas con mejor información.' },
			{ title: 'Marcadores de loot y cofres', copy: 'Resalta loadouts, cofres y loot de alto nivel sin saturar la pantalla en plena partida.' },
			{ title: 'Controles Aimbot Delta Force', copy: 'Ajusta suavidad, prioridad de objetivo y teclas para AR, SMG y francotirador antes de comprar.' },
		],
		updatesLabel: 'Actualizaciones Delta Force Cheats',
		updatesShort: 'Updates',
	},
	fr: {
		eyebrow: 'Delta Force Cheats',
		title: 'Galerie Delta Force',
		subtitle: 'Visuels Delta Force — loadouts, combats d\'équipe et match — avec ESP, radar et Aimbot.',
		lead: 'Delta Force Cheats suit la boucle competitivo de Delta Force : lire la carte, suivre les équipes, loot et gagner les rounds.',
		highlights: [
			{ title: 'ESP players & équipes', copy: 'Repérez les players ennemis sur cartes et extract routes pour choisir vos engagements.' },
			{ title: 'Marqueurs loot & coffres', copy: 'Mettez en évidence loadouts, coffres et loot haut niveau sans encombrer l\'écran.' },
			{ title: 'Réglages Aimbot Delta Force', copy: 'Ajustez fluidité, priorité cible et raccourcis pour AR, SMG et sniper.' },
		],
		updatesLabel: 'Mises à jour Delta Force Cheats',
		updatesShort: 'Updates',
	},
	de: {
		eyebrow: 'Delta Force Cheats',
		title: 'Delta Force Galerie',
		subtitle: 'Delta Force-Bilder zu Loadouts, Squad-Kämpfen und match — mit ESP, Radar und Aimbot.',
		lead: 'Delta Force Cheats passt zur Raid-Schleife von Delta Force: Karte lesen, Gegner tracken, looten und matches überleben.',
		highlights: [
			{ title: 'Player- & Squad-ESP', copy: 'Erkenne feindliche Playeren auf Karten und extract routes für bessere Rotationsentscheidungen.' },
			{ title: 'Loot- & Vertragsmarker', copy: 'Hebe Loadout-Drops, Verträge und High-Tier-Loot hervor ohne Screen-Spam.' },
			{ title: 'Delta Force Aimbot Steuerung', copy: 'Feinjustiere Glätte, Zielpriorität und Hotkeys für AR, SMG und Sniper.' },
		],
		updatesLabel: 'Delta Force Cheats Updates',
		updatesShort: 'Updates',
	},
	pt: {
		eyebrow: 'Delta Force Cheats',
		title: 'Galeria Delta Force',
		subtitle: 'Visuais de Delta Force com loadouts, combates de esquadrão e match — com ESP, radar e Aimbot.',
		lead: 'Delta Force Cheats segue o loop BR do Delta Force: ler o mapa, rastrear equipes, lootar e sobreviver ao extract.',
		highlights: [
			{ title: 'ESP de players e equipes', copy: 'Detecte players inimigos em mappe e extract routes para escolher lutas com melhor intel.' },
			{ title: 'Marcadores de loot e cofres', copy: 'Destaque loadouts, cofres e loot de alto nível sem poluir a tela.' },
			{ title: 'Controles Aimbot Delta Force', copy: 'Ajuste suavidade, prioridade de alvo e atalhos para AR, SMG e sniper.' },
		],
		updatesLabel: 'Atualizações Delta Force Cheats',
		updatesShort: 'Updates',
	},
	it: {
		eyebrow: 'Delta Force Cheats',
		title: 'Galleria Delta Force',
		subtitle: 'Immagini Delta Force — loadout, scontri di squadra e match — con ESP, radar e Aimbot.',
		lead: 'Delta Force Cheats è pensato per il loop BR di Delta Force: leggere la mappa, tracciare squadre nemiche, loot e sopravvivere al extract.',
		highlights: [
			{ title: 'ESP playeri e squadre', copy: 'Individua playeri nemici su mappe e extract routes per scegliere i fight con più intel.' },
			{ title: 'Marker loot e coffreti', copy: 'Evidenzia loadout, coffreti e loot di alto livello senza riempire lo schermo.' },
			{ title: 'Controlli Aimbot Delta Force', copy: 'Regola smoothness, priorità bersaglio e hotkey per AR, SMG e sniper.' },
		],
		updatesLabel: 'Aggiornamenti Delta Force Cheats',
		updatesShort: 'Updates',
	},
	nl: {
		eyebrow: 'Delta Force Cheats',
		title: 'Delta Force galerij',
		subtitle: 'Delta Force-beelden van loadouts, squadgevechten en match — met ESP, radar en Aimbot.',
		lead: 'Delta Force Cheats volgt de match-loop va Delta Force: kaart lezen, vijandelijke squads volgen, jagen en objectives and extraction points overleven.',
		highlights: [
			{ title: 'Player- & squad-ESP', copy: 'Spot vijandelijke players op mappe en extract routes voor betere rotatiebeslissingen.' },
			{ title: 'Loot- & chestmarkers', copy: 'Markeer loadout-drops, chesten en high-tier loot zonder schermoverlast.' },
			{ title: 'Delta Force Aimbot instellingen', copy: 'Stel smoothness, doelprioriteit en hotkeys af voor AR, SMG en sniper.' },
		],
		updatesLabel: 'Delta Force Cheats updates',
		updatesShort: 'Updates',
	},
	pl: {
		eyebrow: 'Delta Force Cheats',
		title: 'Galeria Delta Force',
		subtitle: 'Grafiki Delta Force — loadouty, walki drużynowe i match — z ESP, radar i Aimbot.',
		lead: 'Delta Force Cheats pasuje do pętli BR Delta Force: czytaj mapę, śledź wrogie drużyny, lootuj i przeżyj extract.',
		highlights: [
			{ title: 'ESP players i drużyn', copy: 'Wykrywaj wrogich players na mapy i extract routes dla lepszych decyzji rotacyjnych.' },
			{ title: 'Markery lootu i skrzyń', copy: 'Podświetlaj loadouty, petity i wysokiej klasy loot bez zaśmiecania ekranu.' },
			{ title: 'Sterowanie Aimbot Delta Force', copy: 'Dostosuj płynność, priorytet celu i skróty dla AR, SMG i snajperki.' },
		],
		updatesLabel: 'Aktualizacje Delta Force Cheats',
		updatesShort: 'Updates',
	},
	ru: {
		eyebrow: 'Delta Force Cheats',
		title: 'Галерея Delta Force',
		subtitle: 'Визуалы Delta Force — лоадауты, бои отрядов и match — с ESP, радаром и Aimbot.',
		lead: 'Delta Force Cheats создан для рейд-циклу Delta Force: читать карту, отслеживать вражеские отряды, лут и выживать в extract.',
		highlights: [
			{ title: 'ESP игроков и отрядов', copy: 'Замечайте вражеских игроков на карты и extract routes для лучших решений по ротации.' },
			{ title: 'Маркеры лута и сундуков', copy: 'Подсвечивайте loadout, сундуки и высокий лут без перегрузки экрана.' },
			{ title: 'Настройки Aimbot Delta Force', copy: 'Настройте плавность, приоритет цели и горячие клавиши для AR, SMG и снайперки.' },
		],
		updatesLabel: 'Обновления Delta Force Cheats',
		updatesShort: 'Updates',
	},
	tr: {
		eyebrow: 'Delta Force Cheats',
		title: 'Delta Force galerisi',
		subtitle: 'Loadout, takım savaşları ve match görselleri — ESP, radar ve Aimbot ile.',
		lead: 'Delta Force Cheats, Delta Force BR döngüsü için: haritayı oku, düşman takımları izle, loot al ve extract\'da hayatta kal.',
		highlights: [
			{ title: 'Player ve takım ESP', copy: 'haritalar ve extract routes\'da düşman playerleri görerek daha iyi rotasyon kararları alın.' },
			{ title: 'Loot ve kontrat işaretleri', copy: 'Loadout, kontrat ve üst seviye loot\'u ekranı doldurmadan vurgulayın.' },
			{ title: 'Delta Force Aimbot kontrolleri', copy: 'AR, SMG ve sniper için yumuşaklık, hedef önceliği ve kısayolları ayarlayın.' },
		],
		updatesLabel: 'Delta Force Cheats güncellemeleri',
		updatesShort: 'Updates',
	},
	ar: {
		eyebrow: 'Delta Force Cheats',
		title: 'معرض Delta Force',
		subtitle: 'صور Delta Force — loadouts ومعارك الفرق وsession — مع ESP ورادار وAimbot.',
		lead: 'Delta Force Cheats مبني لحلقة BR في Delta Force: قراءة الخريطة، تتبع الفرق، جمع اللوت والنجاة في extract.',
		highlights: [
			{ title: 'ESP للمشغلين والفرق', copy: 'اكتشف players المعادين على خرائط وextract routes لاختيار القتالات بذكاء.' },
			{ title: 'علامات اللوت والصناديق', copy: 'أبرز loadouts والصناديق واللوت العالي دون ازدحام الشاشة.' },
			{ title: 'تحكم Aimbot Delta Force', copy: 'اضبط النعومة وأولوية الهدف والاختصارات للـ AR وSMG والقناص.' },
		],
		updatesLabel: 'تحديثات Delta Force Cheats',
		updatesShort: 'Updates',
	},
	ja: {
		eyebrow: 'Delta Force Cheats',
		title: 'Delta Force ギャラリー',
		subtitle: 'ロードアウト、スクワッド戦、BRコンバットのDelta Forceビジュアル — ESP、レーダー、エイムボット付き。',
		lead: 'Delta Force CheatsはDelta ForceのBRループ向け：マップを読み、敵スクワッドを追跡し、ルートしてextractを生き延びる。',
		highlights: [
			{ title: 'players＆スクワッドESP', copy: 'マップとextract routesで敵playersを把握し、ローテ判断を改善。' },
			{ title: 'ルート＆チェストマーカー', copy: 'ロードアウト、チェスト、高ティアルートを画面を埋めずに表示。' },
			{ title: 'Delta Forceエイムボット設定', copy: 'AR、SMG、スナイパー向けにスムーズさ、ターゲット優先度、ホットキーを調整。' },
		],
		updatesLabel: 'Delta Force Cheats更新',
		updatesShort: 'Updates',
	},
	ko: {
		eyebrow: 'Delta Force Cheats',
		title: 'Delta Force 갤러리',
		subtitle: '로드아웃, 스쿼드 전투, BR 컴뱃 Delta Force 비주얼 — ESP, 레이더, 에임봇 포함.',
		lead: 'Delta Force Cheats는 Delta Force survival loop용: 맵 읽기, 적 스쿼드 추적, 루트 수집, extract 생존.',
		highlights: [
			{ title: 'players & 스쿼드 ESP', copy: '맵과 extract routes에서 적 players를 파악해 로테이션 결정을 개선.' },
			{ title: '루트 & 상자 마커', copy: '로드아웃, 상자, 고티어 루트를 화면을 가리지 않고 강조.' },
			{ title: 'Delta Force 에임봇 컨트롤', copy: 'AR, SMG, 스나이퍼용 부드러움, 타겟 우선순위, 단축키 조정.' },
		],
		updatesLabel: 'Delta Force Cheats 업데이트',
		updatesShort: 'Updates',
	},
	zh: {
		eyebrow: 'Delta Force Cheats',
		title: 'Delta Force 图库',
		subtitle: 'Delta Force 视觉 — 配装、小队战斗和大逃杀 — 配合 ESP、雷达和自瞄。',
		lead: 'Delta Force Cheats 为 Delta Force match loop设计：读图、追踪敌方小队、搜刮并在 base survival。',
		highlights: [
			{ title: 'players与小队 ESP', copy: '在 地图和 extract routes 发现敌方players，做出更好的转点决策。' },
			{ title: '物资与宝箱标记', copy: '高亮配装、宝箱和高级物资，不遮挡屏幕。' },
			{ title: 'Delta Force 自瞄控制', copy: '调整 AR、SMG 和狙击的平滑度、目标优先级和热键。' },
		],
		updatesLabel: 'Delta Force Cheats 更新',
		updatesShort: 'Updates',
	},
	hi: {
		eyebrow: 'Delta Force Cheats',
		title: 'Delta Force गैलरी',
		subtitle: 'Loadout, team fights और match visuals — ESP, radar और Aimbot के साथ।',
		lead: 'Delta Force Cheats Delta Force match loop के लिए: map पढ़ें, enemy squads track करें, loot करें और base survival करें।',
		highlights: [
			{ title: 'Player & Squad ESP', copy: 'मैप और extract routes पर enemy players spot करें बेहतर rotation decisions के लिए।' },
			{ title: 'Loot & Chest Markers', copy: 'Loadout drops, chests और high-tier loot highlight करें screen clutter के बिना।' },
			{ title: 'Delta Force Aimbot Controls', copy: 'AR, SMG और sniper के लिए smoothness, target priority और hotkeys tune करें।' },
		],
		updatesLabel: 'Delta Force Cheats updates',
		updatesShort: 'Updates',
	},
	id: {
		eyebrow: 'Delta Force Cheats',
		title: 'Galeri Delta Force',
		subtitle: 'Visual Delta Force — loadout, pertempuran squad, dan match — dengan ESP, radar, dan Aimbot.',
		lead: 'Delta Force Cheats untuk loop BR Delta Force: baca peta, lacak squad musuh, loot, dan selamat di extract.',
		highlights: [
			{ title: 'ESP player & squad', copy: 'Deteksi player musuh di peta dan extract routes untuk keputusan rotasi lebih baik.' },
			{ title: 'Marker loot & peti', copy: 'Sorot loadout, peti, dan loot tier tinggi tanpa membanjiri layar.' },
			{ title: 'Kontrol Aimbot Delta Force', copy: 'Atur smoothness, prioritas target, dan hotkey untuk AR, SMG, dan sniper.' },
		],
		updatesLabel: 'Update Delta Force Cheats',
		updatesShort: 'Updates',
	},
	th: {
		eyebrow: 'Delta Force Cheats',
		title: 'แกลเลอรี Delta Force',
		subtitle: 'ภาพ Delta Force — loadout การต่อสู้ทีม และ match — พร้อม ESP เรดาร์และ Aimbot',
		lead: 'Delta Force Cheats สำหรับลูป BR ของ Delta Force: อ่านแผนที่ ติดตามทีมศัตรู เก็บ loot และรอด extract',
		highlights: [
			{ title: 'ESP ผู้เล่นและทีม', copy: 'มองเห็นศัตรูบน แผนที่และ extract routes เพื่อตัดสินใจหมุนเวียนได้ดีขึ้น' },
			{ title: 'มาร์กเกอร์ loot และหีบ', copy: 'เน้น loadout หีบและ loot ระดับสูงโดยไม่รกหน้าจอ' },
			{ title: 'ควบคุม Aimbot Delta Force', copy: 'ปรับความนุ่ม ลำดับเป้าหมาย และ hotkey สำหรับ AR SMG และ sniper' },
		],
		updatesLabel: 'อัปเดต Delta Force Cheats',
		updatesShort: 'Updates',
	},
	vi: {
		eyebrow: 'Delta Force Cheats',
		title: 'Thư viện Delta Force',
		subtitle: 'Hình ảnh Delta Force — loadout, chiến đấu squad và match — với ESP, radar và Aimbot.',
		lead: 'Delta Force Cheats cho vòng BR Delta Force: đọc bản đồ, theo dõi squad địch, loot và sống sót extract.',
		highlights: [
			{ title: 'ESP player & squad', copy: 'Phát hiện player địch trên bản đồ và extract routes để quyết định rotate tốt hơn.' },
			{ title: 'Đánh dấu loot & rương', copy: 'Làm nổi bật loadout, rương và loot cao cấp mà không che màn hình.' },
			{ title: 'Điều khiển Aimbot Delta Force', copy: 'Tinh chỉnh độ mượt, ưu tiên mục tiêu và phím tắt cho AR, SMG và sniper.' },
		],
		updatesLabel: 'Cập nhật Delta Force Cheats',
		updatesShort: 'Updates',
	},
	uk: {
		eyebrow: 'Delta Force Cheats',
		title: 'Галерея Delta Force',
		subtitle: 'Візуали Delta Force — loadout, бої загонів і match — з ESP, радаром і Aimbot.',
		lead: 'Delta Force Cheats для рейд-циклу Delta Force: читати карту, відстежувати ворожі загони, лут і виживати в extract.',
		highlights: [
			{ title: 'ESP гравців і загонів', copy: 'Помічайте ворожих гравців на Map і extract routes для кращих ротацій.' },
			{ title: 'Маркери луту й скринь', copy: 'Підсвічуйте loadout, контракти та високий лут без перевантаження екрана.' },
			{ title: 'Налаштування Aimbot Delta Force', copy: 'Налаштуйте плавність, пріоритет цілі та гарячі клавіші для AR, SMG і снайперки.' },
		],
		updatesLabel: 'Оновлення Delta Force Cheats',
		updatesShort: 'Updates',
	},
	cs: {
		eyebrow: 'Delta Force Cheats',
		title: 'Galerie Delta Force',
		subtitle: 'Delta Force vizuály — loadouty, squad souboje a match — s ESP, radarem a Aimbot.',
		lead: 'Delta Force Cheats pro BR smyčku Delta Force: číst mapu, sledovat nepřátelské squady, loot a přežít extract.',
		highlights: [
			{ title: 'ESP players a squadů', copy: 'Spozorujte nepřátelské operátory na mapy a extract routes pro lepší rotační rozhodnutí.' },
			{ title: 'Markery lootu a petitů', copy: 'Zvýrazněte loadouty, petity a high-tier loot bez přeplnění obrazovky.' },
			{ title: 'Ovládání Aimbot Delta Force', copy: 'Nastavte smoothness, prioritu cíle a hotkeys pro AR, SMG a sniper.' },
		],
		updatesLabel: 'Aktualizace Delta Force Cheats',
		updatesShort: 'Updates',
	},
	ro: {
		eyebrow: 'Delta Force Cheats',
		title: 'Galerie Delta Force',
		subtitle: 'Vizualuri Delta Force — loadout, lupte de squad și match — cu ESP, radar și Aimbot.',
		lead: 'Delta Force Cheats pentru bucla BR Delta Force: citește harta, urmărește squad-uri inamice, loot și supraviețuiește extract.',
		highlights: [
			{ title: 'ESP playeri și squad-uri', copy: 'Detectează playeri inamici pe Map și extract routes pentru decizii de rotație mai bune.' },
			{ title: 'Markere loot și cheste', copy: 'Evidențiază loadout-uri, cheste și loot de nivel înalt fără a aglomera ecranul.' },
			{ title: 'Controale Aimbot Delta Force', copy: 'Ajustează smoothness, prioritate țintă și hotkeys pentru AR, SMG și sniper.' },
		],
		updatesLabel: 'Actualizări Delta Force Cheats',
		updatesShort: 'Updates',
	},
	sv: {
		eyebrow: 'Delta Force Cheats',
		title: 'Delta Force galleri',
		subtitle: 'Delta Force-bilder — loadouts, squadstrider och match — med ESP, radar och Aimbot.',
		lead: 'Delta Force Cheats för Delta Force:s match-loop: läs kartan, spåra fiendesquads, loota och överlev extract.',
		highlights: [
			{ title: 'Player- & squad-ESP', copy: 'Spotta fiendeplayerer på kartor och extract routes för bättre rotationsbeslut.' },
			{ title: 'Loot- & petitsmarkörer', copy: 'Markera loadout-drops, petit och high-tier loot utan skärmklutter.' },
			{ title: 'Delta Force Aimbot-kontroller', copy: 'Justera smoothness, målprioritet och snabbtangenter för AR, SMG och sniper.' },
		],
		updatesLabel: 'Delta Force Cheats uppdateringar',
		updatesShort: 'Updates',
	},
};

export function getGalleryUi(locale: LocaleCode): GalleryUi {
	return galleryUi[locale];
}
