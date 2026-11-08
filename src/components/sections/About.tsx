import { getCapabilities } from "@/config/content";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { formatIndex } from "@/i18n/format";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { IoTNetwork } from "@/components/visuals/IoTNetwork";

export async function About() {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);
  const { about } = dict;
  const capabilities = getCapabilities(dict);
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="relative overflow-hidden bg-canvas-alt py-24 text-fg sm:py-32"
    >
      <div aria-hidden className="grid-bg mask-fade-b pointer-events-none absolute inset-0 opacity-70" />

      <div className="relative mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:px-8">
        <div>
          <Reveal>
            <p className="label-mono inline-flex items-center gap-3 text-brand-fg">
              <span aria-hidden className="h-px w-8 bg-brand-deep/60" />
              {about.label}
            </p>
            <h2
              id="about-title"
              className="font-display mt-5 text-[clamp(2rem,4.6vw,3.5rem)] leading-[1.04] font-semibold text-balance"
            >
              {about.headline.lead}{" "}
              <span className="text-brand-fg">{about.headline.accent}</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="mt-7 space-y-4 text-base leading-relaxed text-fg/75 sm:text-lg">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>

          <RevealGroup
            as="ul"
            className="mt-10 grid gap-px overflow-hidden rounded-xl border border-fg/10 bg-fg/10 sm:grid-cols-2"
          >
            {capabilities.map(({ title, description, icon: Icon }, i) => (
              <RevealItem
                as="li"
                key={title}
                className="group relative bg-surface p-5 transition-colors duration-300 hover:bg-surface-2"
              >
                <div className="flex items-start justify-between">
                  <span className="flex size-10 items-center justify-center rounded-lg bg-canvas text-brand-fg transition-transform duration-300 group-hover:-translate-y-0.5">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span className="font-mono text-[0.65rem] text-fg/35">
                    {formatIndex(i + 1, locale)}
                  </span>
                </div>
                <h3 className="font-display mt-4 text-lg font-semibold tracking-tight">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-fg/60">{description}</p>
                <span aria-hidden className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100" />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <Reveal delay={0.15} className="lg:sticky lg:top-28 lg:self-start">
          <IoTNetwork labels={about.visual} />
          <p className="mt-4 text-center font-mono text-[0.68rem] tracking-[0.14em] text-fg/45 uppercase">
            {about.visual.caption}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
