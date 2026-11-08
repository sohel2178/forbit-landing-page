import { getTechGroups } from "@/config/content";
import type { Locale } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { formatIndex } from "@/i18n/format";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechnologyItem } from "@/components/ui/TechnologyItem";
import type { TechGroup } from "@/types";

function GroupPanel({
  group,
  index,
  side,
  locale,
  ariaSuffix,
}: {
  group: TechGroup;
  index: number;
  side: "left" | "right";
  locale: Locale;
  ariaSuffix: string;
}) {
  const Icon = group.icon;
  return (
    <div className="group relative h-full rounded-2xl border border-fg/[0.08] bg-surface/80 p-6 backdrop-blur transition-colors duration-500 hover:border-brand/40 sm:p-7">
      {/* Connector to the core (desktop only) */}
      <span
        aria-hidden
        className={cn(
          "flow-line absolute top-1/2 hidden h-px w-14 lg:block",
          side === "left" ? "-right-14" : "-left-14 rotate-180",
        )}
      />
      <span
        aria-hidden
        className={cn(
          "absolute top-1/2 hidden size-2 -translate-y-1/2 rounded-full bg-brand shadow-[0_0_10px_#59D46B] lg:block",
          side === "left" ? "-right-1" : "-left-1",
        )}
      />

      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-lg bg-brand/10 text-brand-fg ring-1 ring-brand/25">
            <Icon className="size-5" aria-hidden />
          </span>
          <h3 className="font-display text-lg font-semibold text-fg">{group.title}</h3>
        </div>
        <span className="font-mono text-[0.65rem] text-fg/30">
          {formatIndex(index + 1, locale)}
        </span>
      </div>
      <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${group.title} ${ariaSuffix}`}>
        {group.items.map((item) => (
          <TechnologyItem key={item} name={item} />
        ))}
      </ul>
    </div>
  );
}

function Core() {
  return (
    <div className="relative mx-auto flex size-56 items-center justify-center sm:size-64" aria-hidden>
      <div className="absolute inset-0 rounded-full border border-fg/[0.07]" />
      <div className="absolute inset-5 animate-spin-slow rounded-full border border-dashed border-brand/30" />
      <div className="absolute inset-10 rounded-full border border-fg/[0.07]" />
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(closest-side,rgb(72_183_85/0.25),transparent)]" />
      <div className="relative flex size-28 flex-col items-center justify-center rounded-2xl border border-brand/40 bg-canvas text-center shadow-[0_0_60px_-10px_rgb(72_183_85/0.6)]">
        <span className="font-display text-sm font-bold tracking-[0.14em] text-fg">FULL</span>
        <span className="font-display text-sm font-bold tracking-[0.14em] text-fg">STACK</span>
        <span className="mt-1.5 font-mono text-[0.5rem] tracking-[0.2em] text-brand-fg">ENGINEERING</span>
      </div>
      {["Silicon", "Signals", "Software", "Servers"].map((t, i) => (
        <span
          key={t}
          className="absolute font-mono text-[0.55rem] tracking-[0.2em] text-fg/40 uppercase"
          style={{
            top: ["4%", "50%", "92%", "50%"][i],
            left: ["50%", "96%", "50%", "4%"][i],
            transform: `translate(-50%, -50%) ${i % 2 ? "rotate(90deg)" : ""}`,
          }}
        >
          {t}
        </span>
      ))}
    </div>
  );
}

export async function Technologies() {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);
  const techIntro = dict.tech;
  const [a, b, c, d] = getTechGroups(dict);
  const shared = { locale, ariaSuffix: techIntro.groupAria };
  return (
    <section
      id="technologies"
      aria-labelledby="tech-title"
      className="relative overflow-hidden bg-canvas py-24 sm:py-32"
    >
      <div aria-hidden className="grid-bg mask-radial pointer-events-none absolute inset-0 opacity-50" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="tech-title"
          align="center"
          label={techIntro.label}
          title={techIntro.headline}
          description={techIntro.description}
        />

        <Reveal className="mt-16 grid items-center gap-5 lg:grid-cols-[1fr_auto_1fr] lg:gap-14">
          <div className="grid gap-5 lg:order-1">
            <GroupPanel group={a} index={0} side="left" {...shared} />
            <GroupPanel group={c} index={2} side="left" {...shared} />
          </div>
          <div className="order-first py-4 lg:order-2 lg:py-0">
            <Core />
          </div>
          <div className="grid gap-5 lg:order-3">
            <GroupPanel group={b} index={1} side="right" {...shared} />
            <GroupPanel group={d} index={3} side="right" {...shared} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
