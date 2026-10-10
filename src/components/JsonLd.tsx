import { site, seo, projects, brandNames } from "@/lib/site";
import { dict } from "@/lib/i18n";
import type { Lang } from "@/lib/i18n";

/**
 * Structured data (schema.org) for Google, Bing and AI assistants.
 * One @graph: the agency, the person behind it, the website and this page.
 * The disambiguating text keeps SweGBG apart from similarly named companies.
 */
export default function JsonLd({ lang }: { lang: Lang }) {
  const url = site.url;
  const pageUrl = lang === "sv" ? `${url}/` : `${url}/en`;
  const sv = lang === "sv";

  const services = sv
    ? ["Hemsidor och landningssidor", "Bokningssystem och adminpaneler", "Webbutiker", "Egna AI-produktfilmer", "SEO och AEO"]
    : ["Websites and landing pages", "Booking systems and admin panels", "Online stores", "Original AI product films", "SEO and AEO"];

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["ProfessionalService", "Organization"],
        "@id": `${url}/#org`,
        name: "SweGBG",
        alternateName: [...brandNames.slice(1), "swegbg.com"],
        brand: brandNames.slice(1).map((name) => ({ "@type": "Brand", name })),
        keywords: seo[lang].keywords.join(", "),
        url: `${url}/`,
        logo: `${url}/icon.svg`,
        image: `${url}/og.jpg`,
        description: seo[lang].description,
        disambiguatingDescription: sv
          ? "SweGBG är en webbyrå i Göteborg som bygger hemsidor och webbappar i Next.js. Inte att förväxla med däckföretag eller holdingbolag med liknande namn."
          : "SweGBG is a web agency in Gothenburg, Sweden, building websites and web apps in Next.js. Not to be confused with tyre or holding companies with similar names.",
        slogan: sv ? "Hemsidor byggda för hand. Inte ur en mall." : "Websites built by hand. Not from a template.",
        email: site.email,
        telephone: "+46728758610",
        priceRange: "4999 SEK+",
        currenciesAccepted: "SEK",
        address: { "@type": "PostalAddress", addressLocality: "Göteborg", addressRegion: "Västra Götaland", addressCountry: "SE" },
        areaServed: [
          { "@type": "City", name: "Göteborg" },
          { "@type": "Country", name: sv ? "Sverige" : "Sweden" },
        ],
        founder: { "@id": `${url}/#lennie` },
        knowsAbout: ["Next.js", "TypeScript", "React", "Supabase", "Resend", "Vercel", "Figma", "Tailwind CSS", "SEO", "AEO", "CSS animation", "AI video"],
        knowsLanguage: ["sv", "en"],
        sameAs: [site.googleProfile, site.github],
        hasMap: site.googleProfile,
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          email: site.email,
          telephone: "+46728758610",
          availableLanguage: ["Swedish", "English"],
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: sv ? "Tjänster" : "Services",
          itemListElement: services.map((name) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name, provider: { "@id": `${url}/#org` }, areaServed: "SE" },
          })),
        },
        makesOffer: {
          "@type": "Offer",
          name: "Start",
          price: "4999",
          priceCurrency: "SEK",
          description: sv ? "Upp till fem sidor, mobilanpassad, kontaktformulär och Google-profil." : "Up to five pages, mobile-first, contact form and Google profile.",
          url: `${pageUrl}#priser`,
        },
      },
      {
        "@type": "Person",
        "@id": `${url}/#lennie`,
        name: "Lennie Söderberg",
        jobTitle: sv ? "Webbutvecklare och grundare" : "Web developer and founder",
        worksFor: { "@id": `${url}/#org` },
        homeLocation: { "@type": "City", name: "Göteborg" },
        sameAs: [site.github],
      },
      {
        "@type": "WebSite",
        "@id": `${url}/#website`,
        url: `${url}/`,
        name: "SweGBG",
        alternateName: brandNames.slice(1),
        inLanguage: ["sv-SE", "en-US"],
        publisher: { "@id": `${url}/#org` },
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: seo[lang].title,
        description: seo[lang].description,
        inLanguage: sv ? "sv-SE" : "en-US",
        isPartOf: { "@id": `${url}/#website` },
        about: { "@id": `${url}/#org` },
        primaryImageOfPage: `${url}/og.jpg`,
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        inLanguage: sv ? "sv-SE" : "en-US",
        isPartOf: { "@id": `${pageUrl}#webpage` },
        mainEntity: dict[lang].faq.items.map((it) => ({
          "@type": "Question",
          name: it.q,
          acceptedAnswer: { "@type": "Answer", text: it.a },
        })),
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#work`,
        name: sv ? "Hantverket – demosajter" : "The craft – demo sites",
        itemListElement: projects.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: { "@type": "CreativeWork", name: p.name, url: p.liveUrl, description: p.blurb[lang], creator: { "@id": `${url}/#org` } },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
    />
  );
}
