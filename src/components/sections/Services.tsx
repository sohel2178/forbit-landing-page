import { getServices } from "@/config/content";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { DevicePipeline } from "@/components/visuals/DevicePipeline";
import { RouteMap } from "@/components/visuals/RouteMap";

export async function Services() {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);
  const servicesIntro = dict.services;
  const [tracking, iot, software, hardware] = getServices(dict, locale);
  const cardText = { explore: servicesIntro.explore, exploreAria: servicesIntro.exploreAria };

  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="relative overflow-hidden bg-canvas py-24 sm:py-32"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 h-px w-[80%] -translate-x-1/2 hairline" />
        <div className="absolute top-1/3 -left-40 size-[480px] rounded-full bg-[radial-gradient(closest-side,rgb(72_183_85/0.10),transparent)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            id="services-title"
            label={servicesIntro.label}
            title={servicesIntro.headline}
            description={servicesIntro.description}
          />
          <p className="font-mono text-xs tracking-[0.18em] text-fg/35 uppercase lg:pb-2">
            {servicesIntro.tagline}
          </p>
        </div>

        <RevealGroup className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-3 lg:grid-rows-[auto_auto]">
          <RevealItem className="lg:col-span-2">
            <ServiceCard
              service={tracking}
              variant="feature"
              text={cardText}
              visual={<RouteMap labels={servicesIntro.routeMap} className="aspect-[16/11] w-full" />}
            />
          </RevealItem>

          <RevealItem className="lg:row-span-2">
            <ServiceCard
              service={iot}
              variant="tall"
              text={cardText}
              visual={<DevicePipeline stages={servicesIntro.pipeline} locale={locale} />}
            />
          </RevealItem>

          <RevealItem>
            <ServiceCard service={software} variant="standard" text={cardText} />
          </RevealItem>

          <RevealItem>
            <ServiceCard service={hardware} variant="accent" text={cardText} />
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
