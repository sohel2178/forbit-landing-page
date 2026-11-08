export const locales = ["en", "bn"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Label shown in the language switcher (always in its own language). */
export const localeLabels: Record<Locale, string> = {
  en: "EN",
  bn: "বাংলা",
};

/** Accessible label for switching *to* a locale (in that locale's language). */
export const switchToLabels: Record<Locale, string> = {
  en: "Switch to English",
  bn: "বাংলায় দেখুন",
};

export const ogLocale: Record<Locale, string> = {
  en: "en_US",
  bn: "bn_BD",
};

/** BCP-47 tags for Intl APIs. */
export const intlLocale: Record<Locale, string> = {
  en: "en-US",
  bn: "bn-BD",
};

/** Cookie that remembers the visitor's language choice (read by src/proxy.ts). */
export const LOCALE_COOKIE = "NEXT_LOCALE";
