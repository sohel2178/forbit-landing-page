import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import {
  Anek_Bangla,
  Inter,
  JetBrains_Mono,
  Noto_Sans_Bengali,
  Space_Grotesk,
} from "next/font/google";

import { siteConfig } from "@/config/site";
import { hasLocale, locales, ogLocale } from "@/i18n/config";
import { loadDictionary } from "@/i18n/get-dictionary";
import { themeScript } from "@/components/theme/theme-script";
import { MotionProvider } from "@/components/ui/MotionProvider";

import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["300", "400", "500"],
});

/*
 * Bengali fonts are only appended to the font stacks (see globals.css), so the
 * browser downloads them only when Bengali glyphs are actually rendered.
 */
const anekBangla = Anek_Bangla({
  subsets: ["bengali"],
  variable: "--font-anek-bangla",
  display: "swap",
  weight: ["500", "600", "700"],
  preload: false,
});

const notoBengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  variable: "--font-noto-bengali",
  display: "swap",
  weight: ["400", "500", "600"],
  preload: false,
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await loadDictionary(lang);
  const languages = Object.fromEntries(locales.map((l) => [l, `/${l}`]));

  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: dict.meta.title, template: `%s | ${siteConfig.name}` },
    description: dict.meta.description,
    applicationName: siteConfig.name,
    keywords: [...siteConfig.keywords],
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    alternates: {
      canonical: `/${lang}`,
      languages: { ...languages, "x-default": "/en" },
    },
    openGraph: {
      type: "website",
      url: `/${lang}`,
      siteName: siteConfig.name,
      title: dict.meta.title,
      description: dict.meta.description,
      locale: ogLocale[lang],
      alternateLocale: locales.filter((l) => l !== lang).map((l) => ogLocale[l]),
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    formatDetection: { telephone: false, email: false, address: false },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#080B0D" },
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
  ],
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await loadDictionary(lang);

  return (
    <html
      lang={lang}
      data-theme="dark"
      suppressHydrationWarning
      className={[
        inter.variable,
        spaceGrotesk.variable,
        jetbrainsMono.variable,
        anekBangla.variable,
        notoBengali.variable,
      ].join(" ")}
    >
      <head>
        {/* Sets data-theme before first paint (saved choice → device setting). */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-svh bg-canvas">
        <a
          href="#main"
          className="sr-only z-[100] rounded-md bg-brand px-4 py-2 font-semibold text-on-brand focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          {dict.common.skipToContent}
        </a>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
