// Everything you are likely to edit lives here. Page text (SV/EN) lives in lib/i18n.ts.
import type { L } from "./i18n";

export const site = {
  brand: "SweGBG",
  url: "https://www.swegbg.com",
  email: "kontakt@swegbg.com",
  // Hero background: "aurora" = blood moon + animated northern lights,
  // "daynight" = the sun sets and the moon rises (25 s loop).
  heroScene: "aurora" as "aurora" | "daynight",
  title: "SweGBG | Hemsidor byggda för hand i Göteborg",
  description:
    "Digitalt hantverk från Göteborg: hemsidor, bokningssystem och egna produktfilmer åt småföretag. Personligt, efter din budget, och allt du köper är ditt.",
  github: "https://github.com/SweGBG",
  // SweGBG Lab: tools visitors can play with (own repo SweGBG/swegbg-lab)
  lab: "https://lab.swegbg.com",
  // Google Företagsprofil (SweGBG Agency) – share link from the profile
  googleProfile: "https://share.google/HRvK4Jl1S8zhPHI3O",
};

/** Search engine texts per language (title ≈ 50–60 chars, description ≈ 140–160). */
/** Names the business goes by. All of them are the same company in Gothenburg. */
export const brandNames = ["SweGBG", "SweGBG Agency", "SweGBG Lab", "SweGBG Trading"];

/** Search engine texts per language (title ≈ 50–60 chars, description ≈ 140–160). */
export const seo: Record<"sv" | "en", { title: string; description: string; ogAlt: string; keywords: string[] }> = {
  sv: {
    title: site.title,
    description:
      "SweGBG Agency i Göteborg bygger hemsidor från 4 999 kr åt småföretag i hela Sverige: bokningssystem, webbutiker och egen AI-film. Du äger allt.",
    ogAlt: "SweGBG: Hemsidor byggda för hand i Göteborg",
    keywords: [
      ...brandNames,
      "hemsida billigt", "billig hemsida", "hemsida billigt Sverige", "hemsida Sverige", "hemsida Göteborg",
      "bygga hemsida", "hur bygger jag en hemsida", "var kan jag bygga en hemsida billigt", "skaffa hemsida",
      "vad kostar en hemsida", "hemsida småföretag", "hemsida hantverkare", "hemsida företag",
      "webbyrå Göteborg", "webbyrå Sverige", "webbutvecklare Göteborg", "webbdesign Göteborg",
      "bokningssystem hemsida", "webbutik", "Next.js",
    ],
  },
  en: {
    title: "SweGBG | Hand-built websites from Gothenburg, Sweden",
    description:
      "SweGBG Agency in Gothenburg builds websites from 4,999 SEK for small businesses across Sweden: booking systems, online stores and original AI film. You own it all.",
    ogAlt: "SweGBG: Hand-built websites from Gothenburg",
    keywords: [
      ...brandNames,
      "cheap website Sweden", "affordable website", "website Sweden", "website Gothenburg",
      "how to build a website", "where to build a website cheap", "website cost Sweden",
      "small business website", "web agency Gothenburg", "web agency Sweden", "web developer Gothenburg",
      "booking system website", "Next.js developer",
    ],
  },
};

export type Project = {
  name: string;
  kind: L;
  blurb: L;
  liveUrl: string;
  tags: string[];
  /** "client" = real customer work, "demo" = concept / landing page demo. */
  group: "demo" | "demo";
  /**
   * Preview in the "See the craft" panel:
   * - image + "shot": a website screenshot (best, ~1100x688 webp in /public/img)
   * - image + "emblem": a logo/badge shown centred on the project's colours
   * - no image: a small live preview of the site itself is loaded in the card
   */
  image?: string;
  imageFit?: "shot" | "emblem";
  /** Gallery: a logo that materializes on its own dark stage (used for "emblem" projects). */
  logo?: string;
  /** Gallery backdrop for the logo; defaults to the image. */
  stage?: string;
  /**
   * Gallery "brand reveal": the site's own hero rebuilt live on the stage — the emblem gathers out of
   * gold dust and lands, then name, tagline and buttons rise in beside it (like the real site).
   */
  reveal?: {
    emblem: string;
    eyebrow: L;
    title: string;
    sub: L;
    lead: L;
    cta: { sv: [string, string]; en: [string, string] };
    status: L;
    /** The brand's own look: CSS custom properties on the stage (colours --a/--a-hi/--a-lo, title font --tf, logo size --ew/--eh …). */
    vars?: Record<string, string>;
  };
  /** Card colours: [background, accent]. */
  theme?: [string, string];
};

// Add more projects here and they show up in the "See the craft" panel.
// The first FEATURED_COUNT projects are dealt as a fanned hand of playing cards (pick one to see it big);
// the rest become mini cards.
export const FEATURED_COUNT = 6;
export const projects: Project[] = [
  {
    name: "SweProtein",
    kind: { sv: "Konceptsajt – proteinshake", en: "Concept site – protein shake" },
    blurb: {
      sv: "Konceptsajt för kunder. Allt kan anpassas efter din produkt och ditt varumärke.",
      en: "Concept site for clients. Everything can be adapted to your product and brand.",
    },
    image: "/img/work-sweprotein.webp",
    imageFit: "shot",
    stage: "/img/stage-sweprotein.webp",
    reveal: {
      emblem: "/img/emblem-sweprotein.webp",
      eyebrow: { sv: "Ny smak · Choklad", en: "New flavour · Chocolate" },
      title: "SweProtein",
      sub: { sv: "Proteinshake från Sverige", en: "Protein shake from Sweden" },
      lead: {
        sv: "30 g protein per flaska. Scrollstyrd produktfilm och fyra smaker som färgar hela sajten.",
        en: "30 g of protein per bottle. A scroll-driven product film and four flavours that colour the whole site.",
      },
      cta: { sv: ["Hitta din smak", "Näringsinnehåll"], en: ["Find your flavour", "Nutrition"] },
      status: { sv: "Fri frakt över 499 kr", en: "Free shipping over 499 kr" },
      vars: { "--a": "#ff3d8b", "--a-hi": "#ff9ec4", "--a-lo": "#c2185b", "--sheen": "#ffe6f0", "--ink": "#fbeef3", "--muted": "#b08a99", "--btn-ink": "#fff", "--night": "23, 12, 18", "--tf": "\"Bagel Fat One\", system-ui, sans-serif", "--tw": "400", "--tt": "none", "--tls": "0", "--tsz": "6.2cqw", "--sf": "var(--body)", "--sw": "700", "--ew": "auto", "--eh": "68cqh", "--radius": "999px" },
    },
    theme: ["#170c12", "#ff3d8b"],
    liveUrl: "https://sweprotein.vercel.app",
    tags: ["Next.js", "Egenproducerad AI-film", "Figma", "CSS-animation", "SV/EN"],
    group: "demo",
  },
  {
    name: "Botanicatural",
    kind: { sv: "Hudvård · e-handel", en: "Skincare · e-commerce" },
    blurb: {
      sv: "Demosajt för hudvård och e-handel, byggd kring en produktfilm vi själva producerat med AI (MiniMax H3), så ingen licensad stockfilm och inga upphovsrättsproblem. Filmen styrs av scrollen och varvas med Figma-designade bildlager. Konceptet anpassas efter din produkt och ditt varumärke.",
      en: "E-commerce demo for skincare, built around a product film we produce ourselves with AI (MiniMax H3), so no licensed stock footage and no copyright issues. The film is driven by scroll and layered with imagery designed in Figma. The concept adapts to your product and brand.",
    },
    image: "/img/work-botanic.webp",
    imageFit: "shot",
    stage: "/img/stage-botanic.webp",
    reveal: {
      emblem: "/img/emblem-botanic.webp",
      eyebrow: { sv: "Ren hudvård", en: "Pure skincare" },
      title: "Botanicatural",
      sub: { sv: "Från nordisk natur", en: "From Nordic nature" },
      lead: {
        sv: "Björk, nypon och havtorn. Produktfilm i scrollen, varukorg och kassa i samma lugna ton.",
        en: "Birch, rosehip and sea buckthorn. A product film in the scroll, cart and checkout in the same calm tone.",
      },
      cta: { sv: ["Upptäck kollektionen", "Våra råvaror"], en: ["Explore the collection", "Our ingredients"] },
      status: { sv: "Handgjort i små serier", en: "Handmade in small batches" },
      vars: { "--a": "#c8a96e", "--a-hi": "#e8d6a8", "--a-lo": "#8a7240", "--sheen": "#fbf3df", "--ink": "#ece8dc", "--muted": "#8f9783", "--night": "7, 9, 6", "--tf": "\"Cormorant Garamond\", Georgia, serif", "--tw": "500", "--tt": "none", "--tls": ".01em", "--tsz": "6.2cqw", "--sf": "\"Cormorant Garamond\", Georgia, serif", "--sw": "500", "--ew": "90%", "--radius": "999px" },
    },
    theme: ["#070906", "#c8a96e"],
    liveUrl: "https://botanic-psi.vercel.app",
    tags: ["Next.js", "Egenproducerad AI-film", "Figma", "Videoredigering", "SV/EN"],
    group: "demo",
  },
  {
    name: "Pizzeria dell'Anima",
    kind: { sv: "Premiumkoncept – pizzeria", en: "Premium concept – pizzeria" },
    blurb: {
      sv: "Premiumkoncept för restaurang. Heron är en film vi producerat själva med AI (MiniMax H3) som spolas fram med scrollen – från deg till färdig pizza, utan licensad stockfilm. Skräddarsydda animationer i Figma, CSS och TypeScript, med snabb laddning även på mobil. Meny, bordsbokning och öppettider ingår, och allt anpassas efter din verksamhet.",
      en: "Premium restaurant concept. The hero is a film we produce ourselves with AI (MiniMax H3), scrubbed by your scroll – from dough to finished pizza, with no licensed stock footage. Custom animations in Figma, CSS and TypeScript, fast-loading on phones too. Menu, table booking and opening hours are included, and everything adapts to your business.",
    },
    image: "/img/work-pizzeria.webp",
    imageFit: "shot",
    stage: "/img/stage-pizzeria.webp",
    reveal: {
      emblem: "/img/emblem-pizzeria.webp",
      eyebrow: { sv: "Benvenuti", en: "Benvenuti" },
      title: "Pizzeria dell’Anima",
      sub: { sv: "Pizza av själen · Göteborg", en: "Pizza of the soul · Gothenburg" },
      lead: {
        sv: "Stenugnsbakat. Filmen följer degen hela vägen till färdig pizza medan du scrollar.",
        en: "Stone-oven baked. The film follows the dough all the way to a finished pizza as you scroll.",
      },
      cta: { sv: ["Boka bord", "Se menyn"], en: ["Book a table", "See the menu"] },
      status: { sv: "Öppet ikväll · Göteborg", en: "Open tonight · Gothenburg" },
      vars: { "--a": "#e2412b", "--a-hi": "#f7a27c", "--a-lo": "#a3241a", "--sheen": "#fff0dc", "--ink": "#f6ecdf", "--muted": "#a8968a", "--btn-ink": "#fff8ef", "--night": "14, 12, 11", "--tf": "Fraunces, Georgia, serif", "--tw": "600", "--tt": "none", "--tls": "-.005em", "--tsz": "4.6cqw", "--sf": "Fraunces, Georgia, serif", "--sw": "600", "--ew": "86%" },
    },
    theme: ["#0e0c0b", "#e2412b"],
    liveUrl: "https://pizza-orcin-eight.vercel.app",
    tags: ["Next.js", "TypeScript", "Egenproducerad AI-film", "Figma", "CSS-animation", "SV/EN"],
    group: "demo",
  },
  {
    name: "Proviant",
    kind: { sv: "Delikatessbutik", en: "Delicatessen" },
    blurb: {
      sv: "Demosajt för en delikatessbutik där hela upplevelsen byggs kring loggan. Animationerna är handskriven CSS utan tunga bibliotek, vilket ger snabba laddtider och ett exklusivt intryck. Formspråk, färger och sortiment anpassas efter din butik.",
      en: "Demo site for a delicatessen where the whole experience is built around the logo. The animations are hand-written CSS with no heavy libraries, giving fast load times and a premium feel. Style, colours and range adapt to your shop.",
    },
    image: "/img/work-proviant.webp",
    imageFit: "shot",
    stage: "/img/stage-proviant.webp",
    reveal: {
      emblem: "/img/emblem-proviant.webp",
      eyebrow: { sv: "Le bon vivant", en: "Le bon vivant" },
      title: "Proviant",
      sub: { sv: "En butik för delikatesser", en: "A shop for delicacies" },
      lead: {
        sv: "Chark, ost, marmelad, nötter och vin. Hela sajten är byggd runt loggan, med animationer i ren CSS.",
        en: "Charcuterie, cheese, marmalade, nuts and wine. The whole site is built around the logo, animated in pure CSS.",
      },
      cta: { sv: ["Se sortimentet", "Hitta hit"], en: ["See the range", "Find us"] },
      status: { sv: "Öppet idag 10–19", en: "Open today 10–19" },
      vars: { "--a": "#c9a45c", "--a-hi": "#ecd49c", "--a-lo": "#8d6d32", "--sheen": "#fff4d6", "--ink": "#f3e9d8", "--muted": "#a58f86", "--night": "23, 10, 13", "--tf": "\"Cormorant Garamond\", Georgia, serif", "--tw": "500", "--tt": "uppercase", "--tls": ".06em", "--tsz": "6cqw", "--sf": "\"Cormorant Garamond\", Georgia, serif", "--sw": "500" },
    },
    theme: ["#170a0d", "#c9a45c"],
    liveUrl: "https://proviant-pi.vercel.app",
    tags: ["Next.js", "CSS-animation", "Varumärkesdesign", "SV/EN"],
    group: "demo",
  },
  {
    name: "Coal is King",
    kind: { sv: "Konceptsajt – kolgrill", en: "Concept site – charcoal grill" },
    blurb: {
      sv: "Konceptsajt för restaurang, byggd i Next.js och TypeScript. Meny med filter, bordsbokning, SV/EN och strukturerad data så att sökmotorer och AI-assistenter hittar rätt. Kan byggas om för din restaurang, café eller bar.",
      en: "Restaurant concept site built in Next.js and TypeScript. Filterable menu, table booking, SV/EN and structured data so search engines and AI assistants find you. Can be rebuilt for your restaurant, café or bar.",
    },
    image: "/img/work-coalisking.webp",
    imageFit: "shot",
    stage: "/img/stage-coalisking.webp",
    reveal: {
      emblem: "/img/emblem-coalisking.webp",
      eyebrow: { sv: "Authentic charcoal grill", en: "Authentic charcoal grill" },
      title: "Coal is King",
      sub: { sv: "Kolgrill · Stockholm", en: "Charcoal grill · Stockholm" },
      lead: {
        sv: "Kött och grönt över riktig glöd. Meny med filter, bordsbokning och strukturerad data för Google och AI.",
        en: "Meat and greens over real embers. Filterable menu, table booking and structured data for Google and AI.",
      },
      cta: { sv: ["Boka bord", "Menyn"], en: ["Book a table", "Menu"] },
      status: { sv: "Grillen är tänd · Stockholm", en: "The grill is lit · Stockholm" },
      vars: { "--a": "#ff5a1f", "--a-hi": "#ffb35e", "--a-lo": "#b8320c", "--sheen": "#fff1d6", "--ink": "#f6ede6", "--muted": "#a3928a", "--btn-ink": "#160b06", "--night": "12, 10, 9", "--tf": "\"Big Shoulders Display\", Impact, sans-serif", "--tw": "800", "--tt": "uppercase", "--tls": ".02em", "--tsz": "6.6cqw", "--sf": "\"Big Shoulders Display\", Impact, sans-serif", "--sw": "800", "--radius": "3px" },
    },
    theme: ["#0c0a09", "#ff5a1f"],
    liveUrl: "https://coalisking2.vercel.app/",
    tags: ["Next.js", "TypeScript", "Bokning", "SEO/AEO"],
    group: "demo",
  },
  {
    name: "Atilli Berg",
    kind: { sv: "Konceptsajt – barberare", en: "Concept site – barber" },
    blurb: {
      sv: "Komplett bokningssystem för frisör och barberare. Heron är en egenproducerad AI-film (MiniMax H3) som spolas med scrollen, och i slutet landar loggan i guld – en brand reveal i ren CSS. Bakom finns onlinebokning, adminpanel, kundregister, schema och automatiska påminnelser via mejl (Supabase + Resend). Passar alla verksamheter som tar emot tidsbokningar.",
      en: "Complete booking system for hairdressers and barbers. The hero is a self-produced AI film (MiniMax H3) scrubbed by your scroll, ending with the logo landing in gold – a brand reveal in pure CSS. Behind it: online booking, admin panel, client records, scheduling and automatic email reminders (Supabase + Resend). Fits any business that takes appointments.",
    },
    image: "/img/work-atilli.webp",
    imageFit: "shot",
    stage: "/img/stage-atilli.webp",
    reveal: {
      emblem: "/img/emblem-atilli.webp",
      eyebrow: { sv: "Välkommen till", en: "Welcome to" },
      title: "Atilli Berg",
      sub: { sv: "Frisör & Barberare", en: "Hairdresser & Barber" },
      lead: {
        sv: "Scrollstyrd film, logga som landar i guld och onlinebokning dygnet runt.",
        en: "Scroll-driven film, a logo that lands in gold and online booking around the clock.",
      },
      cta: { sv: ["Boka din tid", "Våra tjänster"], en: ["Book a time", "Our services"] },
      status: { sv: "Öppet för bokning · Göteborg", en: "Open for booking · Gothenburg" },
    },
    theme: ["#1a1512", "#b8956a"],
    liveUrl: "https://barberare.vercel.app",
    tags: ["Next.js", "Egenproducerad AI-film", "CSS-animation", "Supabase", "Adminpanel"],
    group: "demo",
  },
  {
    name: "IronDäck",
    kind: { sv: "Konceptsajt – däckverkstad", en: "Concept site – tyre workshop" },
    blurb: {
      sv: "Demosajt för verkstad med kalenderbokning, Mina sidor för kunden (garage och däckhotell) och adminpanel med dagens schema. Inloggning och data via Supabase, bekräftelser via Resend. Testa själv med demokontot, och anpassa flödet efter din verksamhet.",
      en: "Workshop demo with calendar booking, a customer portal (garage and tyre hotel) and an admin panel with today's schedule. Login and data via Supabase, confirmations via Resend. Try it with the demo account, and adapt the flow to your business.",
    },
    image: "/img/work-irondack.webp",
    imageFit: "shot",
    stage: "/img/stage-irondack.webp",
    reveal: {
      emblem: "/img/emblem-irondack.webp",
      eyebrow: { sv: "Däck & verkstad", en: "Tyres & workshop" },
      title: "IronDäck",
      sub: { sv: "Byt däck utan kö", en: "Swap tyres, skip the queue" },
      lead: {
        sv: "Boka tid i kalendern, se dina däck i däckhotellet och följ jobbet på Mina sidor.",
        en: "Book in the calendar, see your tyres in the tyre hotel and follow the job in your customer portal.",
      },
      cta: { sv: ["Boka däckbyte", "Mina sidor"], en: ["Book a tyre change", "My pages"] },
      status: { sv: "Lediga tider idag", en: "Free slots today" },
      vars: { "--a": "#ff6b2c", "--a-hi": "#ffad4a", "--a-lo": "#e2401f", "--sheen": "#fff2e2", "--ink": "#f3efe9", "--muted": "#9a948d", "--btn-ink": "#140804", "--night": "10, 10, 11", "--tf": "\"Barlow Condensed\", \"Arial Narrow\", sans-serif", "--tw": "700", "--tt": "uppercase", "--tls": ".02em", "--tsz": "7cqw", "--sf": "\"Barlow Condensed\", \"Arial Narrow\", sans-serif", "--sw": "700", "--ew": "74%", "--radius": "4px" },
    },
    theme: ["#0a0a0b", "#ff6b2c"],
    liveUrl: "https://verkstad-rose.vercel.app",
    tags: ["Next.js", "Supabase", "Resend", "Kundportal"],
    group: "demo",
  },
  {
    name: "HiTekk",
    kind: { sv: "Elektronikbutik · e-handel", en: "Electronics store · e-commerce" },
    blurb: {
      sv: "Demosajt för e-handel inom elektronik med kategorifilter, varukorg och kampanjnedräkning. Varumärket får liv genom animationer byggda direkt ur loggan. Upplägget fungerar för de flesta webbutiker och anpassas efter ditt sortiment.",
      en: "Electronics e-commerce demo with category filters, cart and campaign countdown. The brand comes alive through animations built straight from the logo. The setup suits most online stores and adapts to your range.",
    },
    image: "/img/work-hitekk.webp",
    imageFit: "shot",
    stage: "/img/stage-hitekk.webp",
    reveal: {
      emblem: "/img/emblem-hitekk.webp",
      eyebrow: { sv: "Veckans kampanj", en: "This week's deal" },
      title: "HiTekk",
      sub: { sv: "Ljud, teknik & prylar", en: "Audio, tech & gadgets" },
      lead: {
        sv: "Kategorifilter, varukorg och nedräkning till kampanjslut, med animationer byggda direkt ur loggan.",
        en: "Category filters, cart and a countdown to the end of the sale, with animations built straight from the logo.",
      },
      cta: { sv: ["Handla nu", "Kategorier"], en: ["Shop now", "Categories"] },
      status: { sv: "Fri frakt · Leverans 1–2 dagar", en: "Free shipping · Delivery in 1–2 days" },
      vars: { "--a": "#5fb4ff", "--a-hi": "#ace0ff", "--a-lo": "#1f6fd1", "--sheen": "#eef7ff", "--ink": "#e8f0fb", "--muted": "#7f8ea6", "--btn-ink": "#04101f", "--night": "6, 10, 20", "--tf": "Unbounded, system-ui, sans-serif", "--tw": "700", "--tt": "none", "--tls": "-.01em", "--tsz": "5.6cqw", "--sf": "var(--body)", "--sw": "600", "--ew": "76%", "--radius": "999px" },
    },
    theme: ["#060a14", "#5fb4ff"],
    liveUrl: "https://hitekk.vercel.app",
    tags: ["Next.js", "E-handel", "CSS-animation", "SV/EN"],
    group: "demo",
  },
  {
    name: "Stålco",
    kind: { sv: "Verktygsbutik · B2B", en: "Tool store · B2B" },
    blurb: {
      sv: "Demosajt för B2B och verktygshandel med filtrerbart sortiment och offertlista för företagskunder. En visuell identitet som sticker ut i en bransch där de flesta sajter ser likadana ut. Anpassas efter dina produkter och dina kunder.",
      en: "B2B tool store demo with a filterable range and a quote list for business customers. A visual identity that stands out in an industry where most sites look the same. Adapts to your products and customers.",
    },
    image: "/img/work-stalco.webp",
    imageFit: "shot",
    stage: "/img/stage-stalco.webp",
    reveal: {
      emblem: "/img/emblem-stalco.webp",
      eyebrow: { sv: "Proffsutrustning", en: "Pro equipment" },
      title: "Stålco",
      sub: { sv: "Stål & kvalitet", en: "Steel & quality" },
      lead: {
        sv: "Filtrerbart sortiment och offertlista för företagskunder, i en identitet som sticker ut i branschen.",
        en: "A filterable range and a quote list for business customers, in an identity that stands out in the trade.",
      },
      cta: { sv: ["Se sortimentet", "Begär offert"], en: ["See the range", "Request a quote"] },
      status: { sv: "Företagskund? Faktura 30 dagar", en: "Business customer? 30-day invoice" },
      vars: { "--a": "#f39c1e", "--a-hi": "#ffc766", "--a-lo": "#c56f05", "--sheen": "#fff4de", "--ink": "#eef1f5", "--muted": "#8b97a6", "--btn-ink": "#10161f", "--night": "14, 22, 33", "--tf": "Archivo, system-ui, sans-serif", "--tw": "800", "--tt": "uppercase", "--tls": ".01em", "--tsz": "6.4cqw", "--sf": "Archivo, system-ui, sans-serif", "--sw": "800", "--ew": "auto", "--eh": "70cqh", "--radius": "3px" },
    },
    theme: ["#0e1621", "#f39c1e"],
    liveUrl: "https://stalco-theta.vercel.app",
    tags: ["Next.js", "B2B", "Offertflöde", "SV/EN"],
    group: "demo",
  },
];

/** Desktop apps shown under "Appar" in the craft panel. */
export type App = { name: string; kind: L; blurb: L; features: { t: L; d: L }[]; downloadUrl: string; image: string; tags: string[]; theme: [string, string] };

export const apps: App[] = [
  {
    name: "SweGBGPlayer",
    kind: { sv: "Windows-app · tre appar i en", en: "Windows app · three apps in one" },
    blurb: {
      sv: "Jag bygger också skräddarsydda appar för ditt företag. SweGBGPlayer är ett exempel: en mediaspelare med inbyggd musik-grabber och automatiska undertexter, gratis att ladda ner och testa.",
      en: "I also build custom apps for your business. SweGBGPlayer is one example: a media player with a built-in music grabber and automatic subtitles, free to download and try.",
    },
    features: [
      { t: { sv: "Mediaspelare", en: "Media player" }, d: { sv: "MP4, MKV, AVI, MOV, MP3, FLAC m.fl. med spellista", en: "MP4, MKV, AVI, MOV, MP3, FLAC and more, with playlist" } },
      { t: { sv: "Undertexter", en: "Subtitles" }, d: { sv: "Hittas och laddas automatiskt, även via hash-sök", en: "Found and loaded automatically, incl. hash search" } },
      { t: { sv: "Music Grabber", en: "Music Grabber" }, d: { sv: "Klistra in en länk, få MP3 eller MP4 direkt i spellistan", en: "Paste a link, get MP3 or MP4 straight into the playlist" } },
    ],
    downloadUrl: "https://github.com/SweGBG/SweGBGPlayer/releases/latest/download/SweGBGPlayer-Setup.exe",
    image: "/img/app-swegbgplayer.webp",
    tags: ["Electron", "Windows 10/11", "v2.1"],
    theme: ["#12131f", "#ef4a64"],
  },
];

