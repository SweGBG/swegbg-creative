import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { landings, landingPath } from "@/lib/landing";

// Start page plus every search landing page, in both languages, each pointing at its counterpart (hreflang).
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const home = { "sv-SE": `${site.url}/`, "en-US": `${site.url}/en` };
  return [
    { url: `${site.url}/`, lastModified, changeFrequency: "weekly", priority: 1, alternates: { languages: home } },
    { url: `${site.url}/en`, lastModified, changeFrequency: "weekly", priority: 0.9, alternates: { languages: home } },
    ...landings.flatMap((l) => {
      const languages = { "sv-SE": `${site.url}${landingPath(l, "sv")}`, "en-US": `${site.url}${landingPath(l, "en")}` };
      return [
        { url: languages["sv-SE"], lastModified, changeFrequency: "monthly" as const, priority: 0.8, alternates: { languages } },
        { url: languages["en-US"], lastModified, changeFrequency: "monthly" as const, priority: 0.7, alternates: { languages } },
      ];
    }),
  ];
}
