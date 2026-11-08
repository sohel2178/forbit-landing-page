import { ArrowRight } from "lucide-react";

import { getInnovationFeatures } from "@/config/content";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { formatIndex } from "@/i18n/format";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ServiceLink } from "@/components/ui/ServiceLink";
import { linkButtonClass } from "@/components/ui/LinkButton";
import { BatteryVisualization } from "@/components/visuals/BatteryVisualization";

export async function Innovation() {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);
  const { innovation } = dict;
  const features = getInnovationFeatures(dict);
  const [statusA, statusB] = innovation.status;

  return (
    <section
      id="innovation"
      aria-labelledby="innovation-title"
      className="relative isolate overflow-hidden bg-canvas py-24 sm:py-32"
    >
      {/* Energy backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-bg mask-radial absolute inset-0 opacity-50" />
        <div className="absolute top-1/4 right-[-10%] h-[700px] w-[700px] rounded-full bg-[radial-gradient(closest-side,rgb(72_183_85/0.22),transparent)]" />
        <div className="absolute bottom-[-20%] left-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(closest-side,rgb(39_139_60/0.18),transparent)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <Reveal>
              <p className="label-mono inline-flex items-center gap-3 text-brand-fg">
                <span aria-hidden className="h-px w-8 bg-brand/70" />
                {innovation.label}
              </p>
              <h2
                id="innovation-title"
                className="font-display mt-5 text-[clamp(2.2rem,5vw,4rem)] leading-[1.02] font-semibold text-fg"
              >
                {innovation.headline.lead}{" "}
                <span className="text-gradient-brand">{innovation.headline.accent}</span>
              </h2>
            </Reveal>

            <Reveal delay={0.1} className="mt-8 rounded-xl border border-fg/10 bg-fg/[0.03] p-5">
              <p className="font-mono text-[0.62rem] tracking-[0.2em] text-fg/45 uppercase">{innovation.projectLabel}</p>
              <p className="font-display mt-1.5 text-xl font-semibold tracking-tight text-fg uppercase sm:text-2xl">
                {innovation.projectName}
              </p>
              <p className="mt-4 inline-flex flex-wrap items-center gap-2" role="status">
                <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-300/15 px-3 py-1 font-mono text-[0.62rem] tracking-[0.16em] text-amber-700 uppercase dark:border-amber-300/30 dark:bg-amber-300/10 dark:text-amber-200">
                  <span className="relative flex size-2">
                    <span className="absolute inset-0 animate-ping rounded-full bg-amber-400 opacity-60" />
                    <span className="relative size-2 rounded-full bg-amber-400" />
                  </span>
                  {statusA}
                </span>
                <span className="rounded-full border border-fg/15 px-3 py-1 font-mono text-[0.62rem] tracking-[0.16em] text-fg/70 uppercase">
                  {statusB}
                </span>
              </p>
            </Reveal>

            <Reveal delay={0.15} className="mt-7 space-y-4 text-base leading-relaxed text-fg/65 sm:text-lg">
              {innovation.description.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </Reveal>

            <Reveal delay={0.2} className="mt-9">
              <ServiceLink service="smart-bms" className={linkButtonClass("primary")}>
                {innovation.cta}
                <ArrowRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
              </ServiceLink>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="min-w-0">
            <BatteryVisualization labels={innovation.console} />
          </Reveal>
        </div>

        {/* Planned features */}
        <div className="mt-20 sm:mt-24">
          <div className="flex items-center gap-4">
            <h3 className="label-mono text-fg/55">{innovation.plannedTitle}</h3>
            <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-fg/15 to-transparent" />
          </div>
          <RevealGroup
            as="ol"
            className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-fg/[0.07] bg-fg/[0.07] sm:grid-cols-2 lg:grid-cols-3"
          >
            {features.map(({ title, points, icon: Icon }, i) => (
              <RevealItem as="li" key={title} className="group relative bg-surface p-6 transition-colors duration-500 hover:bg-surface-2 sm:p-7">
                <div className="flex items-center justify-between">
                  <span className="flex size-11 items-center justify-center rounded-lg border border-brand/25 bg-brand/[0.08] text-brand-fg transition-colors duration-500 group-hover:border-brand/60">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span className="font-mono text-xs text-fg/25">{formatIndex(i + 1, locale)}</span>
                </div>
                <h4 className="font-display mt-5 text-lg font-semibold text-fg">{title}</h4>
                <ul className="mt-3 space-y-1.5">
                  {points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2 text-sm text-fg/55">
                      <span aria-hidden className="mt-2 h-px w-2.5 shrink-0 bg-brand" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </RevealItem>
            ))}
          </RevealGroup>
          <p className="mt-6 text-sm text-fg/40">
            {innovation.notAvailable}
          </p>
        </div>
      </div>
    </section>
  );
}
