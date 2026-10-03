import type { Metadata, Viewport } from "next";
import { site } from "@/lib/site";
import { LangProvider } from "@/lib/LangContext";
import { ContactProvider } from "@/components/ContactDialog";
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

// Share preview (SMS, Messenger, LinkedIn, Slack …): public/og.jpg, 1200x630.
// To update it, take a new 1200x630 screenshot of the hero and replace the file.
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "SweGBG",
    locale: "sv_SE",
    alternateLocale: ["en_US"],
    title: site.title,
    description: site.description,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "SweGBG: Var kreativ med din passion" }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/og.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#080c18",
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <head>
        <noscript>
          <style>{`.rv *{animation:none!important;opacity:1!important;clip-path:none!important;width:auto!important;filter:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <div className="progress" aria-hidden="true" />
        <LangProvider>
          <ContactProvider>{children}</ContactProvider>
        </LangProvider>
      </body>
    </html>
  );
}
