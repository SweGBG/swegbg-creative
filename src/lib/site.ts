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
    name: "Hitekk",
    kind: { sv: "Landningssida", en: "Landing page" },
    blurb: { sv: "Koncept för en landningssida.", en: "One-page landing concept." },
    theme: ["#0b1220", "#4fc3f7"],
    liveUrl: "https://hitekk.vercel.app",
    tags: ["Next.js"],
    group: "demo",
  },
  {
    name: "Stalco",
    kind: { sv: "Landningssida", en: "Landing page" },
    blurb: { sv: "Koncept för en landningssida.", en: "One-page landing concept." },
    theme: ["#141414", "#c9c9c9"],
    liveUrl: "https://stalco-theta.vercel.app",
    tags: ["Next.js"],
    group: "demo",
  },
];
