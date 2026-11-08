import { contactConfig, toE164 } from "@/config/contact";
import { productBrands } from "@/config/content";
import { siteConfig } from "@/config/site";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { Footer } from "@/components/layout/Footer";
import { Logo } from "@/components/layout/Logo";
import { Navbar } from "@/components/layout/Navbar";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Innovation } from "@/components/sections/Innovation";
import { Process } from "@/components/sections/Process";
import { Products } from "@/components/sections/Products";
import { Services } from "@/components/sections/Services";
import { Technologies } from "@/components/sections/Technologies";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";

async function OrganizationJsonLd() {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);
  const sameAs = Object.values(siteConfig.socials).filter((url): url is string => Boolean(url));
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: `${siteConfig.url}/${locale}`,
    logo: `${siteConfig.url}${siteConfig.logo.src}`,
    description: dict.meta.description,
    slogan: `${dict.footer.coreMessage.lead} ${dict.footer.coreMessage.accent}`,
    inLanguage: locale,
    address: {
      "@type": "PostalAddress",
      addressCountry: "BD",
      ...(contactConfig.address ? { streetAddress: contactConfig.address } : {}),
    },
    email: contactConfig.email,
    telephone: toE164(contactConfig.phone),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: contactConfig.email,
      telephone: toE164(contactConfig.phone),
      areaServed: "BD",
      availableLanguage: ["English", "Bengali"],
    },
    ...(sameAs.length ? { sameAs } : {}),
    brand: productBrands.map((b) => ({
      "@type": "Brand",
      name: b.name,
      ...(b.url ? { url: b.url } : {}),
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  );
}

export default async function Home() {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);
  return (
    <>
      <OrganizationJsonLd />
      <Navbar
        logo={<Logo priority wordmarkClassName="max-[359px]:hidden" />}
        nav={dict.nav}
        locale={locale}
        languageLabel={dict.common.language}
        theme={dict.theme}
      />
      <main id="main">
        <Hero />
        <About />
        <Services />
        <Products />
        <Innovation />
        <WhyChooseUs />
        <Technologies />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
