import { getProducts } from "@/config/content";
import { getDictionary } from "@/i18n/get-dictionary";
import { ProductCard } from "@/components/ui/ProductCard";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiktikiPhone } from "@/components/visuals/TiktikiPhone";
import { TrackingDashboard } from "@/components/visuals/TrackingDashboard";

function SultanMark() {
  return (
    <span className="flex flex-col leading-none" aria-hidden>
      <span className="font-display text-lg font-bold tracking-[0.22em] text-fg">SULTAN</span>
      <span className="mt-1 font-mono text-[0.55rem] tracking-[0.5em] text-(--product-accent)">TRACKER</span>
    </span>
  );
}

function TiktikiMark() {
  return (
    <span className="flex items-baseline gap-2 leading-none" aria-hidden>
      <span className="font-display text-2xl font-bold tracking-tight text-fg lowercase">
        tiktiki<span className="text-(--product-accent)">.</span>
      </span>
      <span className="font-mono text-[0.55rem] tracking-[0.3em] text-fg/50">GPS TRACKER</span>
    </span>
  );
}

export async function Products() {
  const dict = await getDictionary();
  const productsIntro = dict.products;
  const [sultan, tiktiki] = getProducts(dict);
  const cardText = {
    illustrative: productsIntro.illustrative,
    comingSoon: productsIntro.comingSoon,
    newTab: dict.common.newTab,
  };

  return (
    <section
      id="products"
      aria-labelledby="products-title"
      className="relative overflow-hidden bg-canvas-alt py-24 text-fg sm:py-32"
    >
      <div aria-hidden className="grid-bg mask-fade-b pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            id="products-title"
            label={productsIntro.label}
            title={productsIntro.headline}
            description={productsIntro.description}
          />
          <p className="max-w-xs text-sm leading-relaxed text-fg/55 lg:pb-2 lg:text-right">
            {productsIntro.parentNote.lead}{" "}
            <span className="font-semibold text-fg">FORBIT LIMITED</span>
            {productsIntro.parentNote.trail}
          </p>
        </div>

        <RevealGroup className="mt-14 grid grid-cols-1 gap-6 xl:grid-cols-2" stagger={0.15}>
          <RevealItem className="min-w-0">
            <ProductCard
              product={sultan}
              wordmark={<SultanMark />}
              text={cardText}
              visual={<TrackingDashboard aria={sultan.visualAria} />}
            />
          </RevealItem>
          <RevealItem className="min-w-0">
            <ProductCard
              product={tiktiki}
              wordmark={<TiktikiMark />}
              text={cardText}
              visual={<TiktikiPhone aria={tiktiki.visualAria} className="min-h-[300px] sm:min-h-[330px]" />}
            />
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
