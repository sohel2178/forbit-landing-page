import type { ServiceValue } from "@/types";

/** Reads an env var; empty / whitespace-only values count as "not set". */
function env(value: string | undefined): string | null {
  const v = value?.trim();
  return v ? v : null;
}

/**
 * Contact configuration.
 *
 * Every value can be overridden with an environment variable (see
 * .env.example). NEXT_PUBLIC_* values are inlined at build time, so rebuild
 * after changing them. `null` values are simply not rendered.
 *
 * Note: process.env.NEXT_PUBLIC_* must be referenced literally (not via a
 * dynamic key) for Next.js to inline them.
 */
export const contactConfig = {
  email: env(process.env.NEXT_PUBLIC_CONTACT_EMAIL) ?? "admin@forbit.tech",
  /** Shown exactly as written. The tel: link is normalised by `toTelHref`. */
  phone: env(process.env.NEXT_PUBLIC_CONTACT_PHONE) ?? "01409962090",

  /** Street address (English). When null, the translated country name is shown. */
  address: env(process.env.NEXT_PUBLIC_CONTACT_ADDRESS),
  /** Bangla address; falls back to the English address. */
  addressBn: env(process.env.NEXT_PUBLIC_CONTACT_ADDRESS_BN),
  /** Optional Google Maps (or other) link for the address card. */
  mapUrl: env(process.env.NEXT_PUBLIC_CONTACT_MAP_URL),

  /** Optional business hours, e.g. "Sat–Thu, 10:00–19:00". */
  hours: env(process.env.NEXT_PUBLIC_BUSINESS_HOURS),
  hoursBn: env(process.env.NEXT_PUBLIC_BUSINESS_HOURS_BN),

  endpoint: "/api/contact",

  /** Dropdown options. Labels are translated in src/i18n/dictionaries/*. */
  serviceValues: [
    "vehicle-tracking",
    "iot-solutions",
    "software-development",
    "hardware-engineering",
    "smart-bms",
    "other",
  ] satisfies ServiceValue[] as ServiceValue[],
};

/**
 * Converts a phone number to an international tel: href.
 * Bangladeshi local numbers ("01409962090") become "+8801409962090".
 */
export function toTelHref(phone: string): string {
  const digits = phone.replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) return `tel:${digits}`;
  if (digits.startsWith("880")) return `tel:+${digits}`;
  if (digits.startsWith("0")) return `tel:+880${digits.slice(1)}`;
  return `tel:${digits}`;
}

/** E.164 form (for structured data), e.g. "+8801409962090". */
export function toE164(phone: string): string {
  return toTelHref(phone).slice(4);
}

/** Custom DOM event used by "Explore service" links to pre-select a service. */
export const SELECT_SERVICE_EVENT = "forbit:select-service";
