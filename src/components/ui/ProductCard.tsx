import { ArrowUpRight, Clock } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  /** The product's own text mark (product brands are kept separate from FORBIT's logo). */
  wordmark: ReactNode;
  visual: ReactNode;
  text: { illustrative: string; comingSoon: string; newTab: string };
  className?: string;
}

export function ProductCard({ product, wordmark, visual, text, className }: ProductCardProps) {
  const headingId = `product-${product.id}`;
  return (
    <article
      aria-labelledby={headingId}
      style={{ "--product-accent": product.accent } as CSSProperties}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-fg/10 bg-surface shadow-[0_30px_60px_-40px_rgb(8_11_13/0.35)] transition-shadow duration-500 hover:shadow-[0_40px_80px_-40px_rgb(8_11_13/0.5)]",
        className,
      )}
    >
      {/* Stage */}
      <div className="theme-dark relative isolate flex flex-col overflow-hidden bg-canvas px-5 pt-6 pb-8 sm:px-8 sm:pt-8 xl:min-h-[560px]">
        <div aria-hidden className="dot-bg absolute inset-0 -z-10 opacity-60" />
        <div
          aria-hidden
          className="absolute -top-24 left-1/2 -z-10 h-72 w-[120%] -translate-x-1/2 rounded-full opacity-40 blur-3xl transition-opacity duration-700 group-hover:opacity-60"
          style={{ background: `radial-gradient(closest-side, ${product.accent}, transparent)` }}
        />
        <div className="flex items-center justify-between gap-4">
          {wordmark}
          <span className="rounded-full border border-fg/10 px-2.5 py-1 font-mono text-[0.55rem] tracking-[0.16em] text-fg/45 uppercase">
            {text.illustrative}
          </span>
        </div>
        <div className="mt-6 flex min-w-0 flex-1 flex-col justify-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1.5">
          {visual}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <p className="label-mono flex items-center gap-2.5 text-fg/55">
          <span aria-hidden className="size-2 rounded-[2px] bg-(--product-accent)" />
          {product.category}
        </p>
        <h3 id={headingId} className="font-display mt-3 text-3xl font-semibold text-fg">
          {product.name}
        </h3>
        <div className="mt-4 space-y-3 text-[0.95rem] leading-relaxed text-fg/70">
          {product.description.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>

        <ul className="mt-6 grid gap-x-6 gap-y-2.5 border-t border-fg/10 pt-6 sm:grid-cols-2">
          {product.features.map((f) => (
            <li key={f} className="flex items-center gap-2.5 text-sm text-fg/80">
              <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-(--product-accent)" />
              {f}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-8">
          {product.url ? (
            <a
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group/cta inline-flex h-12 items-center gap-2 rounded-md bg-fg px-6 text-sm font-semibold text-canvas transition-colors hover:bg-fg/85"
            >
              {product.cta}
              <ArrowUpRight className="size-4 text-(--product-accent) transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
              <span className="sr-only">{text.newTab}</span>
            </a>
          ) : (
            <span
              className="inline-flex min-h-12 cursor-not-allowed items-center gap-2 rounded-md border border-dashed py-3 border-fg/20 px-6 text-sm font-semibold text-fg/50"
              aria-disabled="true"
            >
              <Clock className="size-4" aria-hidden />
              {product.cta} — {text.comingSoon}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
