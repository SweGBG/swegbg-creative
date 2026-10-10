import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Both language versions, each telling Google about the other (hreflang).
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = { "sv-SE": `${site.url}/`, "en-US": `${site.url}/en` };
  const lastModified = new Date();
  return [
    { url: `${site.url}/`, lastModified, changeFrequency: "weekly", priority: 1, alternates: { languages } },
    { url: `${site.url}/en`, lastModified, changeFrequency: "weekly", priority: 0.9, alternates: { languages } },
  ];
}
