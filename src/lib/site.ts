// Everything you are likely to edit lives here. Page text (SV/EN) lives in lib/i18n.ts.
import type { L } from "./i18n";

export const site = {
  brand: "SweGBG",
  url: "https://www.swegbg.com",
  // Hero background: "aurora" = blood moon + animated northern lights,
  // "daynight" = the sun sets and the moon rises (25 s loop).
  heroScene: "aurora" as "aurora" | "daynight",
  title: "SweGBG | Var kreativ med din passion",
  description:
    "Skräddarsydda hemsidor och webbappar i Next.js från Göteborg, för dig som vågar starta något.",
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
  /** Card colours: [background, accent]. */
  theme?: [string, string];
};

// Add more projects here and they show up in the "See the craft" panel.
// The FIRST project is featured as the big card, so put the newest one on top.
export const projects: Project[] = [
  {
    name: "Proviant",
    kind: { sv: "Delikatessbutik", en: "Delicatessen" },
    blurb: {
      sv: "Etiketten materialiseras ur gulddamm, smakens DNA som dubbelhelix, prislappar på snöre och vaxsigill. Ren CSS-animation.",
      en: "The label materializes out of gold dust, the DNA of taste as a double helix, price tags on twine and wax seals. Pure CSS animation.",
    },
    image: "/img/work-proviant.webp",
    imageFit: "shot",
    theme: ["#170a0d", "#c9a45c"],
    liveUrl: "https://proviant-pi.vercel.app",
    tags: ["Next.js", "CSS animation", "SV/EN"],
    group: "demo",
  },
  {
    name: "Coal is King",
    kind: { sv: "Konceptsajt – kolgrill", en: "Concept site – charcoal grill" },
    blurb: {
      sv: "Komplett ombyggnad i Next.js: glödpartiklar, menykort med filter, bokningsformulär, SV/EN-växling och strukturerad data för sök.",
      en: "Full Next.js rebuild: ember particles, menu card with filters, booking form, SV/EN switch and structured data for search.",
    },
    image: "/img/work-coalisking.webp",
    imageFit: "shot",
    theme: ["#0c0a09", "#ff5a1f"],
    liveUrl: "https://coalisking2.vercel.app/",
    tags: ["Next.js", "TypeScript", "CSS animation", "SEO"],
    group: "demo",
  },
  {
    name: "Atilli Berg",
    kind: { sv: "Konceptsajt – barberare", en: "Concept site – barber" },
    blurb: {
      sv: "Bokningssystem med adminpanel, kundregister, schemaläggning och automatiska påminnelser via mejl.",
      en: "Booking system with admin panel, client records, scheduling and automatic email reminders.",
    },
    image: "/img/work-atilli.webp",
    imageFit: "emblem",
    theme: ["#1a1512", "#b8956a"],
    liveUrl: "https://barberare.vercel.app",
    tags: ["Next.js", "Supabase", "Resend"],
    group: "demo",
  },
  {
    name: "SweGBG Trading",
    kind: { sv: "E-handelsdemo", en: "E-commerce demo" },
    blurb: {
      sv: "Butik med katalog, varukorg och kassa, plus en adminsida med egen prisbevakare via API.",
      en: "Shop with catalogue, cart and checkout, plus an admin page with a custom price tracker API.",
    },
    image: "/img/work-trading.webp",
    imageFit: "emblem",
    theme: ["#0d1320", "#f0b347"],
    liveUrl: "https://swegbgtrading.vercel.app",
    tags: ["Next.js", "Supabase", "Stripe"],
    group: "demo",
  },
  {
    name: "HiTekk",
    kind: { sv: "Elektronikbutik · e-handel", en: "Electronics store · e-commerce" },
    blurb: {
      sv: "Kretsbanor som tänds och ljudvågor ur loggan, kategorier som filtrerar, varukorg med fraktmätare och live-nedräkning.",
      en: "Circuit traces that light up and sound waves from the logo, filtering categories, a cart with shipping meter and a live countdown.",
    },
    image: "/img/work-hitekk.webp",
    imageFit: "shot",
    theme: ["#060a14", "#5fb4ff"],
    liveUrl: "https://hitekk.vercel.app",
    tags: ["Next.js", "CSS animation", "SV/EN"],
    group: "demo",
  },
  {
    name: "Stålco",
    kind: { sv: "Verktygsbutik · B2B", en: "Tool store · B2B" },
    blurb: {
      sv: "Smedja möter ritning: hammaren slår gnistor ur loggan, kugghjul som filtrerar sortimentet och offertlista för företag.",
      en: "Forge meets blueprint: the hammer strikes sparks from the logo, meshing gears filter the range, plus a B2B quote list.",
    },
    image: "/img/work-stalco.webp",
    imageFit: "shot",
    theme: ["#0e1621", "#f39c1e"],
    liveUrl: "https://stalco-theta.vercel.app",
    tags: ["Next.js", "CSS animation", "SV/EN"],
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
      sv: "Mediaspelare med inbyggd musik-grabber och undertexter som laddas ner automatiskt. Gratis att ladda ner.",
      en: "Media player with a built-in music grabber and subtitles that download automatically. Free to download.",
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

