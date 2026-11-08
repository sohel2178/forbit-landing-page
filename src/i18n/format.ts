import { intlLocale, type Locale } from "@/i18n/config";

/** Zero-padded index in the locale's digits: "01" (en) / "০১" (bn). */
export function formatIndex(n: number, locale: Locale): string {
  return new Intl.NumberFormat(intlLocale[locale], {
    minimumIntegerDigits: 2,
    useGrouping: false,
  }).format(n);
}
