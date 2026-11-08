import { getReasons } from "@/config/content";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export async function WhyChooseUs() {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);
  const whyIntro = dict.why;
  const reasons = getReasons(dict, locale);
  return (
    <section
      id="why-forbit"
      aria-labelledby="why-title"
      className="relative bg-canvas-alt py-24 text-fg sm:py-32"
    >
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:px-8">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            id="why-title"
            label={whyIntro.label}
            title={
              <>
                {whyIntro.headline.lead}{" "}
                <span className="text-brand-fg">{whyIntro.headline.accent}</span>{" "}
                {whyIntro.headline.trail}
              </>
            }
            description={whyIntro.description}
          />
        </div>

        <RevealGroup as="ol" className="border-t border-fg/10" stagger={0.12}>
          {reasons.map((r) => (
            <RevealItem
              as="li"
              key={r.index}
              className="group relative grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 border-b border-fg/10 py-8 sm:gap-x-10 sm:py-10"
            >
              <span className="font-mono text-4xl leading-none font-light text-fg/15 transition-colors duration-500 group-hover:text-brand sm:text-5xl">
                {r.index}
              </span>
              <div>
                <h3 className="font-display text-2xl font-semibold sm:text-[1.7rem]">{r.title}</h3>
                <p className="mt-3 max-w-lg leading-relaxed text-fg/65">{r.description}</p>
              </div>
              <span
                aria-hidden
                className="absolute -bottom-px left-0 h-px w-full origin-left scale-x-0 bg-brand transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
              />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
