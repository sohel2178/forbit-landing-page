import type { SocialPlatform } from "@/types";

/** Minimal monochrome social glyphs (lucide no longer ships brand icons). */
export function SocialIcon({ platform, className }: { platform: SocialPlatform; className?: string }) {
  const common = { className, viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": true } as const;
  switch (platform) {
    case "facebook":
      return (
        <svg {...common}>
          <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H8v3h2.5V21h3z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...common}>
          <path d="M6.9 8.6H3.8V20h3.1V8.6zM5.4 3.5a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6zM20.2 13.5c0-3.1-1.7-4.6-3.9-4.6-1.8 0-2.6 1-3 1.7V8.6h-3.1V20h3.1v-6c0-1.6.6-2.6 2-2.6 1.3 0 1.8 1 1.8 2.6v6h3.1v-6.5z" />
        </svg>
      );
    case "youtube":
      return (
        <svg {...common}>
          <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8zM10 15V9l5.2 3L10 15z" />
        </svg>
      );
  }
}
