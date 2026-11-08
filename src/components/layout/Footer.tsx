import { ArrowUp, ArrowUpRight, Mail, Phone } from "lucide-react";
import type { ReactNode } from "react";

import { contactConfig, toTelHref } from "@/config/contact";
import { productBrands } from "@/config/content";
import { footerCompanyNav } from "@/config/navigation";
import { getDictionary } from "@/i18n/get-dictionary";
import { siteConfig, socialLabels } from "@/config/site";
import { Logo } from "@/components/layout/Logo";
import { SocialIcon } from "@/components/ui/SocialIcon";
import type { SocialPlatform } from "@/types";

const linkCls =
  "inline-flex items-center gap-1.5 text-sm text-fg/55 transition-colors duration-300 hover:text-fg";

function Column({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="font-mono text-[0.65rem] tracking-[0.2em] text-fg/35 uppercase">{title}</h2>
      <ul className="mt-5 space-y-3">{children}</ul>
    </div>
  );
}

export async function Footer() {
  const dict = await getDictionary();
  const { footer } = dict;
  const socials = Object.entries(siteConfig.socials) as [SocialPlatform, string | null][];

  return (
    <footer className="relative overflow-hidden border-t border-fg/[0.06] bg-canvas-alt">
      <div aria-hidden className="absolute top-0 left-1/2 h-px w-[70%] -translate-x-1/2 hairline" />

      <div className="mx-auto max-w-7xl px-4 pt-20 pb-10 sm:px-6 lg:px-8">
        {/* Core message */}
        <p className="font-display max-w-4xl text-[clamp(1.6rem,3.6vw,2.75rem)] leading-[1.1] font-semibold text-fg/90 text-balance">
          {footer.coreMessage.lead}{" "}
          <span className="text-gradient-brand">{footer.coreMessage.accent}</span>
        </p>

        <div className="mt-16 grid gap-12 border-t border-fg/[0.06] pt-14 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-[1.3fr_0.9fr_1fr_1fr_1.1fr_0.9fr]">
          <div className="sm:col-span-2 md:col-span-3 lg:col-span-1">
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-fg/50">{footer.tagline}</p>
            <p className="mt-4 font-mono text-[0.65rem] tracking-[0.18em] text-fg/30 uppercase">
              {footer.countryLine}
            </p>
          </div>

          <Column title={footer.columns.company}>
            {footerCompanyNav.map((l) => (
              <li key={l.key}>
                <a href={l.href} className={linkCls}>
                  {footer.companyLinks[l.key]}
                </a>
              </li>
            ))}
          </Column>

          <Column title={footer.columns.brands}>
            {productBrands.map((p) => (
              <li key={p.id}>
                {p.url ? (
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className={linkCls}>
                    {p.name}
                    <ArrowUpRight className="size-3.5" aria-hidden />
                    <span className="sr-only">{dict.common.newTab}</span>
                  </a>
                ) : (
                  <a href="#products" className={linkCls}>
                    {p.name}
                  </a>
                )}
              </li>
            ))}
          </Column>

          <Column title={footer.columns.services}>
            {footer.serviceLinks.map((label) => (
              <li key={label}>
                <a href="#services" className={linkCls}>
                  {label}
                </a>
              </li>
            ))}
          </Column>

          <Column title={footer.columns.contact}>
            <li>
              <a href={`mailto:${contactConfig.email}`} className={`${linkCls} break-all`}>
                <Mail className="size-4 shrink-0" aria-hidden />
                {contactConfig.email}
              </a>
            </li>
            <li>
              <a href={toTelHref(contactConfig.phone)} className={linkCls}>
                <Phone className="size-4 shrink-0" aria-hidden />
                {contactConfig.phone}
              </a>
            </li>
          </Column>

          <Column title={footer.columns.social}>
            {socials.map(([platform, url]) => (
              <li key={platform}>
                {url ? (
                  <a href={url} target="_blank" rel="noopener noreferrer" className={linkCls}>
                    <SocialIcon platform={platform} className="size-4" />
                    {socialLabels[platform]}
                    <span className="sr-only">{dict.common.newTab}</span>
                  </a>
                ) : (
                  // Official URL not configured yet (see src/config/site.ts).
                  <span className="inline-flex items-center gap-1.5 text-sm text-fg/30">
                    <SocialIcon platform={platform} className="size-4" />
                    {socialLabels[platform]}
                    <span className="font-mono text-[0.55rem] tracking-[0.14em] uppercase">· {footer.soon}</span>
                  </span>
                )}
              </li>
            ))}
          </Column>
        </div>

        <div className="mt-16 flex flex-col-reverse items-start justify-between gap-6 border-t border-fg/[0.06] pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-fg/40">{footer.copyright}</p>
          <a
            href="#home"
            className="group inline-flex items-center gap-3 rounded-full border border-fg/10 py-1.5 pr-1.5 pl-4 text-xs font-medium text-fg/60 transition-colors hover:border-brand/50 hover:text-fg"
          >
            {footer.backToTop}
            <span className="flex size-7 items-center justify-center rounded-full bg-fg/[0.06] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:bg-brand group-hover:text-on-brand">
              <ArrowUp className="size-3.5" aria-hidden />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
