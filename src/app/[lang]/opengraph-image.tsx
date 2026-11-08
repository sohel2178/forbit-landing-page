import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

import { loadDictionary } from "@/i18n/get-dictionary";

export const alt = "FORBIT LIMITED — Engineering Intelligence. Connecting Tomorrow.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The share card is always rendered in English: the OG renderer (Satori) does
 * not support Bengali text shaping, so Bangla conjuncts would render
 * incorrectly. Page titles/descriptions in <head> are still localized.
 */
export default async function OpengraphImage() {
  const dict = await loadDictionary("en");
  const logo = await readFile(join(process.cwd(), "public/images/forbiticon.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#080B0D",
          backgroundImage:
            "radial-gradient(circle at 80% 20%, rgba(72,183,85,0.35), transparent 45%), linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "100% 100%, 56px 56px, 56px 56px",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              width: 84,
              height: 84,
              borderRadius: 16,
              background: "#F7F9F8",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={logoSrc} width={68} height={68} alt="" />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 34, fontWeight: 700, letterSpacing: 2 }}>FORBIT</span>
            <span style={{ fontSize: 16, letterSpacing: 10, color: "#89948E" }}>LIMITED</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.02 }}>{dict.hero.headline[0]}</span>
          <span style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.02, color: "#59D46B" }}>
            {dict.hero.headline[1]}
          </span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#89948E" }}>
          <span>{dict.meta.ogTagline}</span>
          <span>{dict.common.country}</span>
        </div>
      </div>
    ),
    size,
  );
}
