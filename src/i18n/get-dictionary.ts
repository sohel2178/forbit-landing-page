import { notFound } from "next/navigation";
import { lang } from "next/root-params";

import { hasLocale, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("@/i18n/dictionaries/en").then((m) => m.default),
  bn: () => import("@/i18n/dictionaries/bn").then((m) => m.default),
};

/** Current locale from the `[lang]` root segment (Server Components only). */
export async function getLocale(): Promise<Locale> {
  const value = await lang();
  if (!hasLocale(value)) notFound();
  return value;
}

/** Dictionary for the current locale (Server Components only). */
export async function getDictionary(): Promise<Dictionary> {
  return dictionaries[await getLocale()]();
}

/** Dictionary for an explicit locale (metadata, sitemap…). */
export function loadDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}

export type { Dictionary };
