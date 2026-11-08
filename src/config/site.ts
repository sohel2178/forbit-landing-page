import type { SocialPlatform } from "@/types";

/**
 * Global site configuration.
 *
 * Set NEXT_PUBLIC_SITE_URL in the environment to the production domain so
 * canonical URLs, the sitemap and Open Graph tags resolve correctly.
 */
const rawUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const siteConfig = {
  name: "FORBIT LIMITED",
  shortName: "FORBIT",
  url: rawUrl.replace(/\/+$/, ""),

  // Titles, descriptions and taglines are translated: see src/i18n/dictionaries/*.
  keywords: [
    "FORBIT LIMITED",
    "IoT Bangladesh",
    "GPS tracking",
    "fleet management",
    "embedded systems",
    "hardware engineering",
    "software development",
    "smart battery management system",
  ],

  logo: {
    src: "/images/forbiticon.png",
    width: 250,
    height: 250,
    alt: "FORBIT LIMITED logo",
  },

  /**
   * Official social profiles. Leave as `null` until the real URLs are
   * confirmed — null entries are hidden from the footer and structured data.
   */
  socials: {
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL?.trim() || null,
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL?.trim() || null,
    youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL?.trim() || null,
  } satisfies Record<SocialPlatform, string | null> as Record<
    SocialPlatform,
    string | null
  >,

} as const;

export const socialLabels: Record<SocialPlatform, string> = {
  facebook: "Facebook",
  linkedin: "LinkedIn",
  youtube: "YouTube",
};
