# FORBIT LIMITED — Corporate Website

Next.js 16 (App Router, Cache Components) · TypeScript · Tailwind CSS v4 · shadcn/ui (Base UI) · Motion (Framer Motion) · Lucide.

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build && npm run start
```

## Configuration

All settings live in `.env.local` (see `.env.example`) or in the files below. Nothing is invented: unset
values are hidden.

| What | Env variable | Default / file |
| --- | --- | --- |
| Production domain | `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` |
| Contact email | `NEXT_PUBLIC_CONTACT_EMAIL` | `admin@forbit.tech` |
| Contact phone | `NEXT_PUBLIC_CONTACT_PHONE` | `01409962090` (link: `tel:+8801409962090`) |
| Address (EN / BN) | `NEXT_PUBLIC_CONTACT_ADDRESS`, `…_BN` | not shown → "Bangladesh" |
| Map link | `NEXT_PUBLIC_CONTACT_MAP_URL` | none |
| Business hours (EN / BN) | `NEXT_PUBLIC_BUSINESS_HOURS`, `…_BN` | not shown |
| Facebook / LinkedIn / YouTube | `NEXT_PUBLIC_FACEBOOK_URL`, `…LINKEDIN_URL`, `…YOUTUBE_URL` | shown as "soon" |
| Tiktiki website | `NEXT_PUBLIC_TIKTIKI_URL` | "website coming soon" |
| Contact form delivery | `CONTACT_WEBHOOK_URL` | form reports "not sent" (503) |

Defaults are defined in `src/config/contact.ts` and `src/config/site.ts`. `NEXT_PUBLIC_*` values are
inlined at build time — rebuild after changing them.

## Light / dark theme

- Visitors get their device's light/dark setting by default; the sun/moon button (navbar and mobile
  menu) overrides it and is remembered (`localStorage["forbit-theme"]`).
- An inline script in `<head>` (`src/components/theme/theme-script.ts`) applies the theme before
  first paint, so there is no flash on load.
- Colours are semantic tokens in `src/app/globals.css` (`canvas`, `canvas-alt`, `surface`, `fg`,
  `fg-muted`, `brand-fg`, `on-brand`) with values per `[data-theme]`. Use these instead of fixed
  colours. Wrap anything that must always look dark (device mockups, consoles) in `.theme-dark`.

## Languages (English / বাংলা)

The site is served at `/en` and `/bn` (both statically generated). `/` redirects via
`src/proxy.ts`: saved choice (`NEXT_LOCALE` cookie) → browser `Accept-Language` → English.
The EN | বাংলা switch in the navbar (and mobile menu) keeps the visitor on the same section.

- All copy: `src/i18n/dictionaries/en.ts` (defines the shape) and `bn.ts` (must match — missing
  keys fail `tsc`). Brand names and technical terms (ESP32, MQTT…) stay in English by design.
- Structure/icons/links: `src/config/content.ts`.
- To add a language: add it to `locales` in `src/i18n/config.ts`, create a dictionary, and register
  it in `src/i18n/get-dictionary.ts`.
- Bengali text uses Anek Bangla (headings) and Noto Sans Bengali (body), loaded only when Bengali
  glyphs appear. The social share image stays English (the OG renderer can't shape Bengali).

## Structure

- `src/config/` — all copy and settings (`content.ts`, `site.ts`, `contact.ts`, `navigation.ts`)
- `src/components/sections/` — page sections (Server Components)
- `src/components/visuals/` — original SVG/CSS illustrations (concept mockups, not screenshots)
- `src/components/layout/` — Navbar, MobileMenu, Footer, Logo
- `src/components/ui/` — shadcn primitives + shared building blocks
- `src/lib/contact-validation.ts` — validator shared by the form and the API route

The official logo lives at `public/images/forbiticon.png` (also `src/app/icon.png` for the favicon).
On dark surfaces it sits on a light tile so its black stroke stays visible — it is never recoloured.
