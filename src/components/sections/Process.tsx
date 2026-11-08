import { getProcessSteps } from "@/config/content";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { DrawLine, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export async function Process() {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);
  const processIntro = dict.process;
  const processSteps = getProcessSteps(dict, locale);
  return (
    <section
      id="process"
      aria-labelledby="process-title"
      className="relative overflow-hidden bg-canvas-alt py-24 text-fg sm:py-32"
    >
      <div aria-hidden className="grid-bg mask-fade-b pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="process-title"
          label={processIntro.label}
          title={processIntro.headline}
          description={processIntro.description}
        />

        <div className="relative mt-16">
          {/* Rails: vertical on mobile, horizontal on desktop */}
          <span aria-hidden className="absolute top-0 bottom-0 left-6 w-px bg-fg/10 lg:hidden" />
          <DrawLine axis="y" className="absolute top-0 bottom-0 left-6 w-px bg-brand lg:hidden" />
          <span aria-hidden className="absolute top-6 right-0 left-0 hidden h-px bg-fg/10 lg:block" />
          <DrawLine axis="x" className="absolute top-6 right-0 left-0 hidden h-px bg-brand lg:block" />

          <RevealGroup as="ol" className="relative grid gap-10 lg:grid-cols-4 lg:gap-8" stagger={0.18}>
            {processSteps.map(({ index, title, description, icon: Icon }) => (
              <RevealItem as="li" key={index} className="group relative pl-20 lg:pt-20 lg:pl-0">
                <span className="absolute top-0 left-0 flex size-12 items-center justify-center rounded-full border border-brand/40 bg-canvas text-brand-fg shadow-[0_0_0_6px_var(--color-base-alt)] transition-transform duration-500 group-hover:scale-110">
                  <Icon className="size-5" aria-hidden />
                </span>
                <span className="font-mono text-xs tracking-[0.2em] text-brand-fg uppercase">
                  {processIntro.stepLabel} {index}
                </span>
                <h3 className="font-display mt-2 text-2xl font-semibold">{title}</h3>
                <p className="mt-3 leading-relaxed text-fg/65">{description}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
