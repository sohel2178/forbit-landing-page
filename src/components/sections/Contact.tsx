import { Clock, Mail, MapPin, Phone } from "lucide-react";

import { contactConfig, toTelHref } from "@/config/contact";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { ContactForm } from "@/components/forms/ContactForm";
import { Reveal } from "@/components/ui/Reveal";

interface Detail {
  icon: typeof Mail;
  label: string;
  value: string;
  href: string | null;
  external?: boolean;
}

export async function Contact() {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);
  const contactIntro = dict.contact;
  const bn = locale === "bn";
  const address = (bn ? contactConfig.addressBn : null) ?? contactConfig.address;
  const hours = (bn ? contactConfig.hoursBn : null) ?? contactConfig.hours;

  const details: Detail[] = [
    {
      icon: Mail,
      label: contactIntro.details.email,
      value: contactConfig.email,
      href: `mailto:${contactConfig.email}`,
    },
    {
      icon: Phone,
      label: contactIntro.details.phone,
      value: contactConfig.phone,
      href: toTelHref(contactConfig.phone),
    },
    {
      icon: MapPin,
      label: address ? contactIntro.details.address : contactIntro.details.location,
      value: address ?? dict.common.country,
      href: contactConfig.mapUrl,
      external: true,
    },
    ...(hours ? [{ icon: Clock, label: contactIntro.details.hours, value: hours, href: null }] : []),
  ];

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative isolate overflow-hidden bg-canvas py-24 sm:py-32"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-bg mask-radial absolute inset-0 opacity-50" />
        <div className="absolute -bottom-40 left-1/2 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(72_183_85/0.18),transparent)]" />
      </div>

      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-8">
        <Reveal>
          <p className="label-mono inline-flex items-center gap-3 text-brand-fg">
            <span aria-hidden className="h-px w-8 bg-brand/70" />
            {contactIntro.label}
          </p>
          <h2
            id="contact-title"
            className="font-display mt-5 text-[clamp(2.2rem,5vw,4rem)] leading-[1.02] font-semibold text-fg"
          >
            {contactIntro.headline.lead}{" "}
            <span className="text-gradient-brand">{contactIntro.headline.accent}</span>
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-fg/65 sm:text-lg">
            {contactIntro.description}
          </p>

          <ul className="mt-10 space-y-3">
            {details.map(({ icon: Icon, label, value, href, external }) => (
              <li key={label}>
                {href ? (
                  <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-center gap-4 rounded-xl border border-fg/[0.07] bg-fg/[0.02] p-4 transition-colors hover:border-brand/40"
                  >
                    <DetailBody Icon={Icon} label={label} value={value} />
                  </a>
                ) : (
                  <div className="flex items-center gap-4 rounded-xl border border-fg/[0.07] bg-fg/[0.02] p-4">
                    <DetailBody Icon={Icon} label={label} value={value} />
                  </div>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-10 rounded-xl border border-dashed border-fg/10 p-5">
            <p className="font-mono text-[0.65rem] tracking-[0.18em] text-fg/40 uppercase">{contactIntro.helpWith}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {contactConfig.serviceValues
                .filter((v) => v !== "other")
                .map((v) => (
                  <li key={v} className="rounded-md bg-fg/[0.04] px-2.5 py-1 text-xs text-fg/65">
                    {contactIntro.services[v]}
                  </li>
                ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="glass relative rounded-2xl p-6 sm:p-9">
            <span aria-hidden className="hairline absolute inset-x-8 top-0" />
            <h3 className="font-display text-xl font-semibold text-fg">{contactIntro.formTitle}</h3>
            <p className="mt-1.5 text-sm text-fg/50">
              {contactIntro.formIntro}
            </p>
            <div className="mt-7">
              <ContactForm
                locale={locale}
                form={contactIntro.form}
                errors={contactIntro.errors}
                services={contactIntro.services}
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function DetailBody({
  Icon,
  label,
  value,
}: {
  Icon: typeof Mail;
  label: string;
  value: string;
}) {
  return (
    <>
      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand-fg">
        <Icon className="size-4.5" aria-hidden />
      </span>
      <span>
        <span className="block font-mono text-[0.6rem] tracking-[0.18em] text-fg/40 uppercase">{label}</span>
        <span className="block text-sm break-words text-fg/85">{value}</span>
      </span>
    </>
  );
}
