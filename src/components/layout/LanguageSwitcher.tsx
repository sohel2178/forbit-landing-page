"use client";

import { motion } from "motion/react";
import { useId } from "react";

import {
  LOCALE_COOKIE,
  localeLabels,
  locales,
  switchToLabels,
  type Locale,
} from "@/i18n/config";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  locale: Locale;
  /** Section id to keep the reader in place after switching (e.g. "products"). */
  hash?: string;
  label: string;
  size?: "sm" | "lg";
  className?: string;
}

function rememberLocale(locale: Locale) {
  // One year; read by src/proxy.ts on the next visit to "/".
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
}

/**
 * EN | বাংলা segmented toggle. Plain links (each locale is its own static
 * page), so it works without JavaScript too.
 */
export function LanguageSwitcher({
  locale,
  hash,
  label,
  size = "sm",
  className,
}: LanguageSwitcherProps) {
  const layoutId = useId();
  const lg = size === "lg";

  return (
    <div
      role="group"
      aria-label={label}
      className={cn(
        "relative inline-flex items-center rounded-full border border-fg/10 bg-fg/[0.04] p-1",
        className,
      )}
    >
      {locales.map((l) => {
        const active = l === locale;
        return (
          <a
            key={l}
            href={`/${l}${hash && hash !== "home" ? `#${hash}` : ""}`}
            hrefLang={l}
            lang={l}
            aria-current={active ? "true" : undefined}
            aria-label={active ? undefined : switchToLabels[l]}
            onClick={(e) => {
              if (active) {
                e.preventDefault();
                return;
              }
              rememberLocale(l);
            }}
            className={cn(
              "relative z-10 inline-flex items-center justify-center rounded-full font-semibold transition-colors duration-300",
              lg ? "h-11 min-w-[5.5rem] px-5 text-base" : "h-8 min-w-[3.25rem] px-3 text-[0.8rem]",
              active ? "text-on-brand" : "text-fg/65 hover:text-fg",
              l === "bn" && "font-[family-name:var(--font-noto-bengali)]",
            )}
          >
            {active && (
              <motion.span
                layoutId={`lang-pill-${layoutId}`}
                aria-hidden
                className="absolute inset-0 -z-10 rounded-full bg-brand"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            {localeLabels[l]}
          </a>
        );
      })}
    </div>
  );
}
