import { NextResponse, type NextRequest } from "next/server";

import { defaultLocale, hasLocale, LOCALE_COOKIE, locales, type Locale } from "@/i18n/config";

/** Picks the best supported locale from an Accept-Language header. */
function fromAcceptLanguage(header: string | null): Locale | null {
  if (!header) return null;
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().toLowerCase().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      return { base: tag.split("-")[0], q: q ? Number(q.trim().slice(2)) || 0 : 1 };
    })
    .filter((x) => x.q > 0)
    .sort((a, b) => b.q - a.q);
  return ranked.map((x) => x.base).find(hasLocale) ?? null;
}

function pickLocale(request: NextRequest): Locale {
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookie && hasLocale(cookie)) return cookie;
  return fromAcceptLanguage(request.headers.get("accept-language")) ?? defaultLocale;
}

/** Redirects locale-less URLs (e.g. "/") to "/en" or "/bn". */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasPrefix = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasPrefix) return;

  const url = request.nextUrl.clone();
  url.pathname = `/${pickLocale(request)}${pathname === "/" ? "" : pathname}`;
  const res = NextResponse.redirect(url);
  res.headers.set("Vary", "Accept-Language, Cookie");
  return res;
}

export const config = {
  // Skip Next internals, API routes and any path with a file extension
  // (sitemap.xml, robots.txt, icon.png, /images/*, opengraph-image…).
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
