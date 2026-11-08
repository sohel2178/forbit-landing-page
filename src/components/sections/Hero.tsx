import { ArrowDown, ArrowRight } from "lucide-react";

import { getDictionary } from "@/i18n/get-dictionary";
import { LinkButton } from "@/components/ui/LinkButton";
import { HeroVisual } from "@/components/visuals/HeroVisual";

export async function Hero() {
  const { hero } = await getDictionary();
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-canvas pt-24 pb-16 lg:pt-28"
    >
      {/* Lighting + grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-bg mask-radial absolute inset-0 opacity-70" />
        <div className="absolute -top-40 left-1/2 h-[640px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(72_183_85/0.22),transparent)]" />
        <div className="absolute right-[-10%] bottom-[-20%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgb(39_139_60/0.25),transparent)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-canvas" />
      </div>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.08fr_1fr] lg:gap-8 lg:px-8">
        <div className="relative z-10">
          <p className="animate-rise label-mono inline-flex items-center gap-2.5 rounded-full border border-fg/10 bg-fg/[0.03] px-3.5 py-1.5 !text-[0.64rem] text-fg/75 sm:!text-[0.7rem]">
            <span className="relative flex size-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-brand opacity-60" />
              <span className="relative size-2 rounded-full bg-brand-bright" />
            </span>
            {hero.trust}
          </p>

          <h1
            id="hero-title"
            className="font-display mt-7 text-[clamp(2.6rem,7.2vw,5.6rem)] leading-[0.98] font-semibold text-fg"
          >
            <span className="block">{hero.headline[0]}</span>
            <span className="text-gradient-brand block pb-1">{hero.headline[1]}</span>
          </h1>

          <p
            className="animate-rise mt-6 font-mono text-sm tracking-[0.08em] text-brand-fg/90 sm:text-base"
            style={{ animationDelay: "120ms" }}
          >
            {"// "}
            {hero.subheadline}
          </p>

          <p
            className="animate-rise mt-5 max-w-xl text-base leading-relaxed text-fg/65 sm:text-lg"
            style={{ animationDelay: "200ms" }}
          >
            {hero.description}
          </p>

          <div
            className="animate-rise mt-9 flex flex-col gap-3 sm:flex-row"
            style={{ animationDelay: "300ms" }}
          >
            <LinkButton href="#services">
              {hero.primaryCta}
              <ArrowDown className="size-4 transition-transform duration-300 group-hover/btn:translate-y-0.5" />
            </LinkButton>
            <LinkButton href="#contact" variant="outline">
              {hero.secondaryCta}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
            </LinkButton>
          </div>

          <ul
            aria-label={hero.stackLabel}
            className="animate-rise mt-12 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[0.68rem] tracking-[0.16em] text-fg/40 uppercase"
            style={{ animationDelay: "420ms" }}
          >
            {hero.stack.map((item, i) => (
              <li key={item} className="flex items-center gap-3">
                {i > 0 && <span aria-hidden className="h-px w-4 bg-brand/50" />}
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-[520px] lg:max-w-[600px]">
          <HeroVisual labels={hero.visual} />
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-fg/35 transition-colors hover:text-fg/70 md:flex"
        aria-label={hero.scrollAria}
      >
        <span className="label-mono !text-[0.6rem]">{hero.scroll}</span>
        <span className="h-10 w-px overflow-hidden bg-fg/10">
          <span className="block h-1/2 w-full animate-[float_2.4s_ease-in-out_infinite] bg-brand" />
        </span>
      </a>
    </section>
  );
}
