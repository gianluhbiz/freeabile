// Business info gathered from Instagram (@freeabile.sondrio), Google Maps and press.
// Photos prefixed "ig-" / "gm-" are the venue's own; "u-" are Unsplash placeholders
// to be swapped with real shots from the client.

export const INFO = {
  name: "Freeabile",
  tagline: "Bar · Pasticceria · Bistrot",
  claim: "Vieni per il cibo, resta per la community",
  hashtag: "#ilgustodelsolidale",
  address: "Via Ragazzi del '99, 11",
  city: "23100 Sondrio",
  phone: "375 532 0408",
  phoneHref: "tel:+393755320408",
  instagram: "https://www.instagram.com/freeabile.sondrio/",
  maps: "https://www.google.com/maps/place/Freeabile+%E2%80%A2+Bar+%E2%80%A2+Pasticceria+%E2%80%A2+Bistrot+%E2%80%A2/@46.1695452,9.8676271,17z/data=!4m9!3m8!1s0x47838fcf11210c57:0x1ba2ab5353533478!5m2!4m1!1i2!8m2!3d46.1695415!4d9.8702074!16s%2Fg%2F11kb_bs69z",
  rating: "4,7",
  reviews: 246,
} as const

export const HOURS = [
  { day: "Lunedì", time: "07:00 › 16:00" },
  { day: "Martedì › Domenica", time: "07:00 › 22:00" },
]

export type Photo = { src: string; alt: string; pos?: string }

export const P = {
  bakery: { src: "/img/u-bakery-display.jpg", alt: "Vetrina della pasticceria piena di dolci" },
  brunch: { src: "/img/ig-brunch-crop.jpg", alt: "Filetto di pesce su crema allo zafferano con capperi" },
  pizzoccheri: { src: "/img/gm-1.jpg", alt: "Pizzoccheri alla valtellinese serviti al tavolo", pos: "50% 85%" },
  aperitivo: { src: "/img/ig-aperitivo.jpg", alt: "Tagliere di formaggi con arancia e mirtilli" },
  cocktail: { src: "/img/ig-cocktail.jpg", alt: "Cocktail all'arancia al bancone" },
  bar: { src: "/img/ig-sogno.jpg", alt: "Melissa al bancone con il buffet dell'aperitivo" },
  lasagna: { src: "/img/ig-lasagna.jpg", alt: "Lasagna al ragù d'anatra, il piatto scelto dallo chef", pos: "50% 82%" },
  colazioneBoard: { src: "/img/ig-orari.jpg", alt: "Cornetto, torta di mele e cappuccino Freeabile", pos: "50% 80%" },
  pizzaNight: { src: "/img/ig-pizza.jpg", alt: "Locandina della serata giro pizza" },
  paellaNight: { src: "/img/ig-0718.jpg", alt: "Locandina della serata paella con musica dal vivo" },
  seaNight: { src: "/img/ig-serata-mare.jpg", alt: "Band dal vivo sotto il gazebo nel giardino" },
  summer: { src: "/img/ig-pizza-promo.jpg", alt: "Locandina delle serate estive al Freeabile" },
  menuBoard: { src: "/img/ig-0728.jpg", alt: "Menu del giorno scritto a mano" },
  cappuccino: { src: "/img/u-cappuccino-top.jpg", alt: "Cappuccino e cornetto visti dall'alto" },
  croissantCoffee: { src: "/img/u-croissant-coffee.jpg", alt: "Cornetto e caffè" },
  croissant: { src: "/img/u-croissant.jpg", alt: "Cornetti appena sfornati" },
  brioche: { src: "/img/u-brioche.jpg", alt: "Brioche dorate" },
  pastryHand: { src: "/img/u-pastry-hand.jpg", alt: "Pasticcino tenuto in mano" },
  tiramisu: { src: "/img/u-tiramisu.jpg", alt: "Tiramisù in coppa" },
  tiramisuSlice: { src: "/img/u-tiramisu-slice.jpg", alt: "Fetta di tiramisù" },
  latteArt: { src: "/img/u-latte-art.jpg", alt: "Latte art su un cappuccino" },
  latteArt2: { src: "/img/u-latte-art-2.jpg", alt: "Cappuccino con cuore di latte" },
  espresso: { src: "/img/u-espresso.jpg", alt: "Tazzina di espresso" },
  pizza: { src: "/img/u-pizza-dark.jpg", alt: "Pizza appena uscita dal forno" },
  margherita: { src: "/img/u-pizza-margherita.jpg", alt: "Pizza margherita" },
  spritzDuo: { src: "/img/u-spritz-duo.jpg", alt: "Due spritz al tramonto" },
  spritz: { src: "/img/u-spritz.jpg", alt: "Spritz con fetta d'arancia" },
  spritzOrange: { src: "/img/u-spritz-orange.jpg", alt: "Spritz arancione con ghiaccio" },
  pastryCounter: { src: "/img/u-pastry-counter.jpg", alt: "Bancone della pasticceria" },
  cannoli: { src: "/img/u-cannoli.jpg", alt: "Cannoli ripieni" },
  cannoliBerries: { src: "/img/u-cannoli-berries.jpg", alt: "Cannoli con frutti rossi" },
  bruschetta: { src: "/img/u-bruschetta.jpg", alt: "Bruschette al pomodoro" },
  focaccia: { src: "/img/u-focaccia.jpg", alt: "Focaccia appena sfornata" },
  dough: { src: "/img/u-dough-hands.jpg", alt: "Mani che lavorano l'impasto" },
  tarts: { src: "/img/u-tarts.jpg", alt: "Crostatine alla frutta" },
  chocoTart: { src: "/img/u-choco-tart.jpg", alt: "Crostata al cioccolato" },
  fruitTarts: { src: "/img/u-fruit-tarts.jpg", alt: "Tartellette alla frutta fresca" },
  lattePour: { src: "/img/u-latte-pour.jpg", alt: "Barista che versa il latte" },
  barista: { src: "/img/u-barista.jpg", alt: "Barista al lavoro" },
  pasta: { src: "/img/u-pasta.jpg", alt: "Piatto di pasta" },
} satisfies Record<string, Photo>

export const REVIEWS = [
  {
    who: "Davide Z.",
    text: "Arrivati per caso dopo che tutti gli altri ristoranti ci avevano rimbalzato. Scelta più azzeccata di sempre. Pizzoccheri speciali.",
  },
  {
    who: "Barbara T.",
    text: "I ragazzi sono bravi e preparati. Piatti curati, ingredienti di ottima qualità. Si esce arricchiti.",
  },
  {
    who: "Ilaria",
    text: "Locale carino con un'ampia vetrata sul giardino. Tanti piatti fra cui scegliere, porzioni abbondanti.",
  },
  {
    who: "Evelina B.",
    text: "Personale gentilissimo, ti senti accolto. Una tappa per chiunque passi da Sondrio.",
  },
]

export type MenuItem = { name: string; desc?: string; price: string; img: Photo; tag?: string }
export type MenuCategory = { id: string; title: string; accent: string; blurb: string; hours: string; cover: Photo[]; items: MenuItem[] }

// Prices from Instagram posts: pranzo, lasagne, serate. Caffetteria, pasticceria
// and aperitivo prices are indicative, to confirm with the client.
export const MENU: MenuCategory[] = [
  {
    id: "caffetteria",
    title: "Caffetteria",
    accent: "e colazione",
    blurb: "Miscela Lavazza, latte fresco, brioche del nostro laboratorio.",
    hours: "dalle 07:00",
    cover: [P.cappuccino, P.lattePour],
    items: [
      { name: "Espresso", price: "1,30", img: P.espresso },
      { name: "Cappuccino", desc: "anche con latte di soia o senza lattosio", price: "1,70", img: P.latteArt },
      { name: "Marocchino", desc: "espresso, cacao, schiuma di latte", price: "1,90", img: P.latteArt2 },
      { name: "Cioccolata calda", desc: "densa, con panna a richiesta", price: "3,00", img: P.cappuccino },
      { name: "Spremuta d'arancia", price: "3,50", img: P.spritzOrange },
      { name: "Cornetto e cappuccino", desc: "la colazione al banco", price: "3,00", img: P.croissantCoffee, tag: "Al banco" },
    ],
  },
  {
    id: "pasticceria",
    title: "Pasticceria",
    accent: "fatta qui",
    blurb: "Il laboratorio impasta ogni mattina. Torte intere su ordinazione.",
    hours: "tutto il giorno",
    cover: [P.fruitTarts, P.bakery],
    items: [
      { name: "Brioche", desc: "vuota, crema, marmellata, cioccolato", price: "1,50", img: P.brioche },
      { name: "Torta di mele", desc: "la fetta", price: "3,50", img: P.colazioneBoard },
      { name: "Crostatina alla frutta", desc: "frolla, crema pasticcera, frutta di stagione", price: "3,50", img: P.tarts },
      { name: "Cannolo", desc: "ricotta e scorza d'arancia", price: "3,00", img: P.cannoli },
      { name: "Tiramisù", desc: "savoiardi, mascarpone, caffè della casa", price: "4,50", img: P.tiramisuSlice },
      { name: "Strudel di mele", desc: "con crema alla vaniglia", price: "4,00", img: P.pastryHand },
      { name: "Crema catalana", price: "4,00", img: P.chocoTart },
    ],
  },
  {
    id: "pranzo",
    title: "Pranzo",
    accent: "dallo chef",
    blurb: "Il menu cambia ogni giorno. Questi sono i piatti delle ultime settimane.",
    hours: "a pranzo",
    cover: [P.pizzoccheri, P.brunch],
    items: [
      { name: "Lasagne al ragù d'anatra", desc: "besciamella, granella di noci, noce moscata", price: "12", img: P.lasagna, tag: "Scelto dallo chef" },
      { name: "Pizzoccheri alla valtellinese", desc: "grano saraceno, verza, patate, Casera", price: "12", img: P.pizzoccheri },
      { name: "Ditaloni rigati alle cozze", desc: "pomodoro, prezzemolo, sfumati al vino bianco", price: "12", img: P.pasta },
      { name: "Fusilli al cavolfiore", desc: "crema di cavolfiore, tartufo, fiori di cappero", price: "12", img: P.pasta },
      { name: "Filetto di trota al vapore", desc: "datterini, olive taggiasche, origano, zucchine alla piastra", price: "12", img: P.brunch },
      { name: "Carpaccio di bresaola", desc: "basilico fresco, cialda croccante di Grana Padano", price: "12", img: P.aperitivo },
      { name: "Menu completo", desc: "primo e secondo del giorno", price: "16", img: P.menuBoard, tag: "Consigliato" },
    ],
  },
  {
    id: "aperitivo",
    title: "Aperitivo",
    accent: "a buffet",
    blurb: "Dalle 19 il bancone si riempie. Scegli il bicchiere, il resto lo trovi lì.",
    hours: "dalle 19:00",
    cover: [P.bar, P.spritzDuo],
    items: [
      { name: "Spritz", desc: "Aperol, Campari o Hugo", price: "6", img: P.spritz },
      { name: "Cocktail classici", desc: "Negroni, Americano, Gin tonic", price: "7", img: P.cocktail },
      { name: "Analcolico della casa", price: "5", img: P.spritzOrange },
      { name: "Calice di vino", desc: "rossi della Valtellina, bianchi lombardi", price: "5", img: P.spritzDuo },
      { name: "Tagliere della valle", desc: "Bitto, Casera, bresaola, focaccia", price: "12", img: P.aperitivo },
      { name: "Bruschette miste", price: "6", img: P.bruschetta },
    ],
  },
]

export const NIGHTS = [
  {
    title: "Serata paella",
    price: "35",
    img: P.paellaNight,
    lines: ["Cocktail di benvenuto", "Stuzzichini della casa", "Paella mista da condividere", "Crema catalana e caffè", "Acqua e un calice di vino"],
  },
  {
    title: "Giro pizza",
    price: "35",
    img: P.pizzaNight,
    lines: ["Cocktail di benvenuto", "Antipasti della casa", "Pizza finché non sei sazio", "Strudel con crema alla vaniglia", "Acqua e un calice di vino"],
  },
  {
    title: "Serata di mare",
    price: "30",
    img: P.seaNight,
    lines: ["Antipasto di mare", "Fritto misto", "Linguine allo scoglio", "Dessert dal buffet", "Vino della casa e acqua"],
  },
]

export const ALL_PHOTOS: Photo[] = Object.values(P)
