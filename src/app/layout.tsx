import type { Metadata, Viewport } from "next";
import { site } from "@/lib/site";
import "@/styles/base.css";
import "@/styles/hero.css";
import "@/styles/sections.css";
import "@/styles/work.css";

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
};

export const viewport: Viewport = {
  themeColor: "#0a1330",
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@500;700;800&family=Instrument+Sans:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <noscript>
          <style>{`.rv *{animation:none!important;opacity:1!important;clip-path:none!important;width:auto!important;filter:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <div className="progress" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
