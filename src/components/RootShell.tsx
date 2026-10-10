import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { site, seo } from "@/lib/site";
import type { Lang } from "@/lib/i18n";
import { LangProvider } from "@/lib/LangContext";
import { ContactProvider } from "@/components/ContactDialog";
import JsonLd from "@/components/JsonLd";
// Fonts from the original swegbg.com, self-hosted (no Google request, no layout jump)
import "@fontsource/chakra-petch/500.css";
import "@fontsource/chakra-petch/600.css";
import "@fontsource/chakra-petch/700.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/ibm-plex-mono/600.css";
import "@/styles/base.css";
import "@/styles/hero.css";
import "@/styles/sections.css";
import "@/styles/work.css";
import "@/styles/contact.css";
import "@/styles/home.css";

/**
 * Metadata for one language version. "/" is Swedish, "/en" is English.
 * Both point at each other with hreflang so Google shows the right one.
 * Share preview (SMS, Messenger, LinkedIn …): public/og.jpg, 1200x630.
 */
export function buildMetadata(lang: Lang): Metadata {
  const s = seo[lang];
  const path = lang === "sv" ? "/" : "/en";
  return {
    metadataBase: new URL(site.url),
    title: s.title,
    description: s.description,
    keywords: s.keywords,
    applicationName: "SweGBG",
    authors: [{ name: "Lennie Söderberg", url: site.url }],
    creator: "Lennie Söderberg",
    publisher: "SweGBG",
    category: "Web development",
    alternates: {
      canonical: path,
      languages: { "sv-SE": "/", "en-US": "/en", "x-default": "/" },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    },
    openGraph: {
      type: "website",
      url: path,
      siteName: "SweGBG",
      locale: lang === "sv" ? "sv_SE" : "en_US",
      alternateLocale: [lang === "sv" ? "en_US" : "sv_SE"],
      title: s.title,
      description: s.description,
      images: [{ url: "/og.jpg", width: 1200, height: 630, alt: s.ogAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: s.title,
      description: s.description,
      images: ["/og.jpg"],
    },
    formatDetection: { telephone: true, email: true, address: false },
    // Paste the code from Google Search Console here (or set the env var in Vercel)
    // if you verify with the "HTML tag" method instead of DNS.
    verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION
      ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION }
      : undefined,
  };
}

export const viewport: Viewport = {
  themeColor: "#080c18",
  viewportFit: "cover",
};

export default function RootShell({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return (
    <html lang={lang}>
      <head>
        <noscript>
          <style>{`.rv *{animation:none!important;opacity:1!important;clip-path:none!important;width:auto!important;filter:none!important}`}</style>
        </noscript>
        <JsonLd lang={lang} />
      </head>
      <body>
        <div className="progress" aria-hidden="true" />
        <LangProvider initial={lang}>
          <ContactProvider>{children}</ContactProvider>
        </LangProvider>
        <Analytics />
      </body>
    </html>
  );
}
