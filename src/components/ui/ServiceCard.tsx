import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { ServiceLink } from "@/components/ui/ServiceLink";
import type { Service } from "@/types";

export type ServiceCardVariant = "feature" | "tall" | "standard" | "accent";

interface ServiceCardProps {
  service: Service;
  variant?: ServiceCardVariant;
  visual?: ReactNode;
  text: { explore: string; exploreAria: string };
  className?: string;
}

const surface: Record<ServiceCardVariant, string> = {
  feature: "bg-surface",
  tall: "bg-gradient-to-b from-[color-mix(in_oklab,var(--color-brand)_7%,var(--t-surface))] to-surface",
  standard: "bg-surface",
  accent: "bg-[linear-gradient(135deg,color-mix(in_oklab,var(--color-brand)_18%,var(--t-surface))_0%,var(--t-surface)_55%)]",
};

export function ServiceCard({
  service,
  variant = "standard",
  visual,
  text,
  className,
}: ServiceCardProps) {
  const { index, title, description, capabilities, icon: Icon, slug } = service;
  const isFeature = variant === "feature";
  const headingId = `service-${slug}`;

  return (
    <article
      aria-labelledby={headingId}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-fg/[0.07] p-6 transition-[border-color,transform,box-shadow] duration-500 hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_30px_60px_-30px_rgb(72_183_85/0.45)] sm:p-8",
        surface[variant],
        className,
      )}
    >
      {/* Hover light */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-32 size-72 rounded-full bg-[radial-gradient(closest-side,rgb(72_183_85/0.22),transparent)] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
      />

      <div className={cn("relative flex flex-1 flex-col", isFeature && "md:grid md:grid-cols-[1fr_0.9fr] md:gap-8")}>
        <div className="flex flex-1 flex-col">
          <div className="flex items-center justify-between">
            <span className="flex size-12 items-center justify-center rounded-xl border border-brand/30 bg-brand/10 text-brand-fg transition-all duration-500 group-hover:scale-105 group-hover:bg-brand group-hover:text-on-brand">
              <Icon className="size-6" aria-hidden />
            </span>
            <span className="font-mono text-sm text-fg/25 transition-colors duration-500 group-hover:text-brand-fg">
              {index}
            </span>
          </div>

          <h3 id={headingId} className="font-display mt-6 text-2xl font-semibold text-fg">
            {title}
          </h3>
          <p className="mt-3 text-[0.95rem] leading-relaxed text-fg/60">{description}</p>

          <ul
            className={cn(
              "mt-6 grid gap-x-4 gap-y-2.5",
              variant === "tall" ? "sm:grid-cols-2 lg:grid-cols-1" : "sm:grid-cols-2",
              !isFeature && variant !== "tall" && "lg:grid-cols-1 xl:grid-cols-2",
            )}
          >
            {capabilities.map((cap) => (
              <li key={cap} className="flex items-start gap-2.5 text-sm text-fg/75">
                <span aria-hidden className="mt-[0.45rem] size-1.5 shrink-0 rotate-45 bg-brand" />
                {cap}
              </li>
            ))}
          </ul>

          {visual && !isFeature && <div className="relative mt-8 flex-1">{visual}</div>}

          <div className="mt-auto pt-8">
            <ServiceLink
              service={slug}
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-fg transition-colors hover:text-fg"
              aria-label={`${text.exploreAria} ${title}`}
            >
              {text.explore}
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </ServiceLink>
          </div>
        </div>

        {visual && isFeature && <div className="relative mt-8 md:mt-0">{visual}</div>}
      </div>
    </article>
  );
}
