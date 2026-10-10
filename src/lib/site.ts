// Everything you are likely to edit lives here. Page text (SV/EN) lives in lib/i18n.ts.
import type { L } from "./i18n";

export const site = {
  brand: "SweGBG",
  url: "https://www.swegbg.com",
  phone: "072-875 86 10",
  phoneHref: "tel:+46728758610",
  email: "kontakt@swegbg.com",
  // Hero background: "aurora" = blood moon + animated northern lights,
  // "daynight" = the sun sets and the moon rises (25 s loop).
  heroScene: "aurora" as "aurora" | "daynight",
  title: "SweGBG | Hemsidor byggda för hand i Göteborg",
  description:
    "Digitalt hantverk från Göteborg: hemsidor, bokningssystem och egna produktfilmer åt småföretag. Personligt, efter din budget, och allt du köper är ditt.",
  github: "https://github.com/SweGBG",
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
  /** Card colours: [background, accent]. */
  theme?: [string, string];
};

// Add more projects here and they show up in the "See the craft" panel.
// The FIRST project is featured as the big card, so put the newest one on top.
export const projects: Project[] = [
  {
    name: "Botanicatural",
    kind: { sv: "Hudvård · e-handel", en: "Skincare · e-commerce" },
    blurb: {
      sv: "Demosajt för hudvård och e-handel, byggd kring en produktfilm vi själva producerat med AI (MiniMax H3), så ingen licensad stockfilm och inga upphovsrättsproblem. Filmen styrs av scrollen och varvas med Figma-designade bildlager. Konceptet anpassas efter din produkt och ditt varumärke.",
      en: "E-commerce demo for skincare, built around a product film we produce ourselves with AI (MiniMax H3), so no licensed stock footage and no copyright issues. The film is driven by scroll and layered with imagery designed in Figma. The concept adapts to your product and brand.",
    },
    image: "/img/work-botanic.webp",
    imageFit: "shot",
    theme: ["#070906", "#c8a96e"],
    liveUrl: "https://botanic-psi.vercel.app",
    tags: ["Next.js", "Egenproducerad AI-film", "Figma", "Videoredigering", "SV/EN"],
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
    theme: ["#0c0a09", "#ff5a1f"],
    liveUrl: "https://coalisking2.vercel.app/",
    tags: ["Next.js", "TypeScript", "Bokning", "SEO/AEO"],
    group: "demo",
  },
  {
    name: "Atilli Berg",
    kind: { sv: "Konceptsajt – barberare", en: "Concept site – barber" },
    blurb: {
      sv: "Komplett bokningssystem för frisör och barberare: onlinebokning, adminpanel, kundregister, schema och automatiska påminnelser via mejl. Databas i Supabase, utskick via Resend. Passar alla verksamheter som tar emot tidsbokningar.",
      en: "Complete booking system for hairdressers and barbers: online booking, admin panel, client records, scheduling and automatic email reminders. Database in Supabase, emails via Resend. Fits any business that takes appointments.",
    },
    image: "/img/work-atilli.webp",
    imageFit: "emblem",
    theme: ["#1a1512", "#b8956a"],
    liveUrl: "https://barberare.vercel.app",
    tags: ["Next.js", "Supabase", "Resend", "Adminpanel"],
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

