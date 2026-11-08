"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useSyncExternalStore } from "react";

import { THEME_COLORS, THEME_STORAGE_KEY, type Theme } from "@/components/theme/theme-script";
import { cn } from "@/lib/utils";

/* ---- External store: the data-theme attribute on <html> ---------------- */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}
const getTheme = (): Theme =>
  document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
/** Server render: unknown — render a neutral icon until hydrated. */
const getServerTheme = (): Theme | null => null;

function applyTheme(theme: Theme, animate: boolean) {
  const root = document.documentElement;
  if (animate) {
    root.classList.add("theme-transition");
    window.setTimeout(() => root.classList.remove("theme-transition"), 400);
  }
  root.setAttribute("data-theme", theme);
  root.style.colorScheme = theme;
  document
    .querySelectorAll('meta[name="theme-color"]')
    .forEach((m) => m.setAttribute("content", THEME_COLORS[theme]));
}

function readSaved(): Theme | null {
  try {
    const v = localStorage.getItem(THEME_STORAGE_KEY);
    return v === "light" || v === "dark" ? v : null;
  } catch {
    return null;
  }
}

interface ThemeToggleProps {
  labels: { toLight: string; toDark: string };
  size?: "sm" | "lg";
  className?: string;
}

/** Light/dark toggle. Until the visitor chooses, the device setting is followed. */
export function ThemeToggle({ labels, size = "sm", className }: ThemeToggleProps) {
  const theme = useSyncExternalStore<Theme | null>(subscribe, getTheme, getServerTheme);

  // Follow live OS changes while no explicit choice has been saved.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = () => {
      if (!readSaved()) applyTheme(mq.matches ? "light" : "dark", true);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const next: Theme = theme === "light" ? "dark" : "light";
  const label = next === "light" ? labels.toLight : labels.toDark;

  return (
    <button
      type="button"
      onClick={() => {
        applyTheme(next, true);
        try {
          localStorage.setItem(THEME_STORAGE_KEY, next);
        } catch {
          /* storage unavailable: choice lasts for this page only */
        }
      }}
      aria-label={label}
      title={label}
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-fg/10 bg-fg/[0.04] text-fg/75 transition-colors hover:border-brand/50 hover:text-fg",
        size === "lg" ? "size-11" : "size-10",
        className,
      )}
    >
      {/* Both icons are rendered; CSS shows the right one, so there is no flash before hydration. */}
      <Sun
        aria-hidden
        className="size-[1.1rem] transition-transform duration-500 [[data-theme=dark]_&]:absolute [[data-theme=dark]_&]:translate-y-8 [[data-theme=dark]_&]:rotate-90"
      />
      <Moon
        aria-hidden
        className="size-[1.1rem] transition-transform duration-500 [[data-theme=light]_&]:absolute [[data-theme=light]_&]:-translate-y-8 [[data-theme=light]_&]:-rotate-90"
      />
    </button>
  );
}
