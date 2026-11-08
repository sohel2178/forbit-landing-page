"use client";

import { ArrowUpRight, Menu } from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

import { mainNav } from "@/config/navigation";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import type { SectionId } from "@/types";

interface NavbarProps {
  /** Rendered on the server (next/image) and passed in as a slot. */
  logo: ReactNode;
  nav: Dictionary["nav"];
  locale: Locale;
  languageLabel: string;
  theme: Dictionary["theme"];
}

/** Sticky site navigation with section tracking and language switch. */
export function Navbar({ logo, nav, locale, languageLabel, theme }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<SectionId>("home");
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => {
    setOpen(false);
    menuButtonRef.current?.focus();
  }, []);
  const navigateFromMenu = useCallback(() => setOpen(false), []);

  // Background blur after the page starts scrolling.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track which nav section sits in the middle band of the viewport.
  useEffect(() => {
    const ids = mainNav.map((item) => item.id);
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
        scrolled || open
          ? "border-b border-fg/[0.06] bg-canvas/75 backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav
        aria-label={nav.primaryLabel}
        className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:h-[72px] lg:px-8"
      >
        <a
          href="#home"
          className="rounded-md"
          aria-label={nav.homeAria}
          onClick={() => setOpen(false)}
        >
          {logo}
        </a>

        <ul className="hidden items-center gap-1 rounded-full border border-fg/[0.07] bg-fg/[0.03] p-1 lg:flex">
          {mainNav.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id} className="relative">
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "relative z-10 block rounded-full py-2 text-sm font-medium whitespace-nowrap transition-colors duration-300",
                    locale === "bn" ? "px-3 xl:px-4" : "px-3.5 xl:px-4",
                    isActive ? "text-fg" : "text-fg/60 hover:text-fg",
                  )}
                >
                  {nav.items[item.id]}
                </a>
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    aria-hidden
                    className="absolute inset-0 rounded-full bg-fg/[0.08] ring-1 ring-brand/30"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  >
                    <span className="absolute -bottom-px left-1/2 h-px w-6 -translate-x-1/2 bg-brand-bright" />
                  </motion.span>
                )}
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle labels={theme} className="hidden min-[400px]:inline-flex" />
          <LanguageSwitcher locale={locale} hash={active} label={languageLabel} />
          <a
            href="#contact"
            className="group hidden h-10 items-center gap-1.5 rounded-md bg-brand px-4 text-sm font-semibold whitespace-nowrap text-on-brand transition-colors hover:bg-brand-bright sm:inline-flex lg:hidden xl:inline-flex"
          >
            {nav.letsTalk}
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <button
            ref={menuButtonRef}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-md border border-fg/10 text-fg transition-colors hover:border-brand/50 lg:hidden"
            aria-label={nav.openMenu}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
          >
            <Menu className="size-5" />
          </button>
        </div>
      </nav>
    </header>

    {/* Rendered outside <header>: its backdrop-filter would contain fixed children. */}
    <MobileMenu
      open={open}
      active={active}
      nav={nav}
      locale={locale}
      languageLabel={languageLabel}
      theme={theme}
      onClose={closeMenu}
      onNavigate={navigateFromMenu}
    />
    </>
  );
}
