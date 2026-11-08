import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { locales } from "@/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(locales.map((l) => [l, `${siteConfig.url}/${l}`]));
  return locales.map((locale) => ({
    url: `${siteConfig.url}/${locale}`,
    changeFrequency: "monthly",
    priority: locale === "en" ? 1 : 0.9,
    alternates: { languages },
  }));
}
