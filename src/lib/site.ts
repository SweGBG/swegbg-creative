// Everything you are likely to edit lives here.
export const site = {
  brand: "SweGBG",
  title: "Be Creative With Your Passion",
  description:
    "Custom-built Next.js websites and web apps for people who dare to start something.",
  // Where the buttons point. Replace with your own contact page / mailto: link.
  contactHref: "https://swegbg.com",
  heroLines: ["Be Creative", "With Your Passion"],
  lead: "Custom-built Next.js sites and web apps for people who dare to start something.",
  footer: "© SweGBG. Concept page. Photos and example numbers are placeholders.",
};

export type Project = {
  name: string;
  kind: string;
  blurb: string;
  image: string;
  liveUrl: string;
  repoUrl?: string;
  tags: string[];
};

// Add more projects here and they show up in the "See the craft" panel.
export const projects: Project[] = [
  {
    name: "Coal is King",
    kind: "Charcoal grill, Stockholm",
    blurb: "Full Next.js rebuild: ember particles, menu card with filters, booking form, SV/EN switch and structured data for search.",
    image: "/img/work-coalisking.webp",
    liveUrl: "https://coalisking2.vercel.app/",
    repoUrl: "https://github.com/SweGBG/coalisking2",
    tags: ["Next.js", "TypeScript", "CSS animation", "SEO"],
  },
];
