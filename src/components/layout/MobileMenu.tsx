"use client";

import { ArrowUpRight, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";

import { mainNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { formatIndex } from "@/i18n/format";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import type { SectionId } from "@/types";

interface MobileMenuProps {
  open: boolean;
  active: SectionId;
  nav: Dictionary["nav"];
  locale: Locale;
  languageLabel: string;
  theme: Dictionary["theme"];
  onClose: () => void;
  onNavigate: () => void;
}

export function MobileMenu({
  open,
  active,
  nav,
  locale,
  languageLabel,
  theme,
  onClose,
  onNavigate,
}: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusables = () =>
      Array.from(
        panel?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? [],
      );
    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    // Close if the viewport grows to desktop width.
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = () => mq.matches && onClose();

    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="mobile-menu"
          id="mobile-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={nav.siteMenu}
          className="fixed inset-0 z-[60] flex flex-col bg-canvas/[0.97] backdrop-blur-xl lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div aria-hidden className="grid-bg mask-radial pointer-events-none absolute inset-0 opacity-60" />
          <div className="relative flex h-16 items-center justify-between px-4 sm:px-6">
            <span className="label-mono text-fg-muted">{nav.menu}</span>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex size-11 items-center justify-center rounded-md border border-fg/10 text-fg transition-colors hover:border-brand/50"
              aria-label={nav.closeMenu}
            >
              <X className="size-5" />
            </button>
          </div>

          <nav aria-label={nav.mobileLabel} className="relative flex-1 overflow-y-auto px-4 pt-6 sm:px-6">
            <ul className="space-y-1">
              {mainNav.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={onNavigate}
                    aria-current={active === item.id ? "location" : undefined}
                    className={cn(
                      "flex items-baseline gap-4 border-b border-fg/[0.06] py-4 font-display text-3xl font-semibold transition-colors",
                      active === item.id ? "text-fg" : "text-fg/55 hover:text-fg",
                    )}
                  >
                    <span className="font-mono text-xs text-brand">
                      {formatIndex(i + 1, locale)}
                    </span>
                    {nav.items[item.id]}
                  </a>
                </motion.li>
              ))}
            </ul>
          </nav>

          <motion.div
            className="relative space-y-4 px-4 pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <div className="flex items-center justify-between gap-4">
              <span className="label-mono text-fg-muted">{languageLabel}</span>
              <LanguageSwitcher locale={locale} hash={active} label={languageLabel} size="lg" />
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="label-mono text-fg-muted">{theme.label}</span>
              <ThemeToggle labels={theme} size="lg" />
            </div>
            <a
              href="#contact"
              onClick={onNavigate}
              className="flex h-12 items-center justify-center gap-2 rounded-md bg-brand text-sm font-semibold text-on-brand"
            >
              {nav.letsTalk} <ArrowUpRight className="size-4" />
            </a>
            <p className="text-center font-mono text-[0.68rem] tracking-[0.2em] text-fg-muted uppercase">
              {siteConfig.name}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
