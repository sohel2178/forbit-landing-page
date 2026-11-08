import type { Dictionary } from "@/i18n/dictionaries/en";
import { cn } from "@/lib/utils";

/**
 * Hardware → cloud → web dashboard + mobile app.
 * Pure SVG with CSS animation (server component).
 */
export function IoTNetwork({
  labels,
  className,
}: {
  labels: Dictionary["about"]["visual"];
  className?: string;
}) {
  return (
    <figure
      className={cn(
        "theme-dark relative overflow-hidden rounded-2xl border border-fg/10 bg-canvas p-4 shadow-[0_40px_80px_-40px_rgb(8_11_13/0.6)] sm:p-6",
        className,
      )}
    >
      <div aria-hidden className="grid-bg absolute inset-0 opacity-60" />
      <div aria-hidden className="absolute -top-24 -right-24 size-72 rounded-full bg-[radial-gradient(closest-side,rgb(72_183_85/0.25),transparent)]" />

      <div className="relative flex items-center justify-between">
        <span className="label-mono !text-[0.6rem] text-fg-muted">{labels.title}</span>
        <span className="flex items-center gap-1.5 font-mono text-[0.6rem] tracking-[0.15em] text-brand-fg uppercase">
          <span className="size-1.5 animate-pulse rounded-full bg-brand-bright" /> {labels.status}
        </span>
      </div>

      <svg
        viewBox="0 0 560 420"
        className="relative mt-2 h-auto w-full"
        role="img"
        aria-label={labels.aria}
      >
        <defs>
          <linearGradient id="iot-pcb" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#13221a" />
            <stop offset="100%" stopColor="#0b1410" />
          </linearGradient>
          <linearGradient id="iot-cloud" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1b2a21" />
            <stop offset="100%" stopColor="#111820" />
          </linearGradient>
        </defs>

        {/* ---------- Connections ---------- */}
        {[
          "M150 235 C 160 160, 200 120, 236 112",
          "M352 110 C 410 112, 440 140, 446 178",
          "M300 150 C 300 250, 330 320, 382 335",
        ].map((d) => (
          <g key={d}>
            <path d={d} fill="none" stroke="#27312B" strokeWidth="2" />
            <path d={d} fill="none" stroke="#59D46B" strokeWidth="2" strokeLinecap="round" className="flow-stroke" />
          </g>
        ))}
        {[
          { x: 128, y: 150, t: "LTE · MQTT" },
          { x: 420, y: 128, t: "REST / WS" },
          { x: 248, y: 285, t: "PUSH" },
        ].map((l) => (
          <g key={l.t}>
            <rect x={l.x - 4} y={l.y - 12} width={l.t.length * 7 + 8} height="18" rx="4" fill="#080B0D" stroke="#27312B" />
            <text x={l.x} y={l.y + 1} fill="#89948E" fontSize="10" fontFamily="var(--font-jetbrains-mono)" letterSpacing="1">
              {l.t}
            </text>
          </g>
        ))}

        {/* ---------- Hardware device (PCB) ---------- */}
        <g>
          <line x1="70" y1="235" x2="70" y2="198" stroke="#48B755" strokeWidth="2" />
          <circle cx="70" cy="194" r="4" fill="#59D46B" />
          <rect x="30" y="235" width="170" height="120" rx="10" fill="url(#iot-pcb)" stroke="#48B755" strokeOpacity="0.55" />
          {/* traces */}
          <path d="M45 255 H 85 V 285 M45 335 H 95 V 315 M185 255 H 150 V 280 M185 335 H 140 V 318" fill="none" stroke="#48B755" strokeOpacity="0.35" strokeWidth="1.5" />
          {/* MCU */}
          <rect x="92" y="272" width="50" height="50" rx="5" fill="#0a0f0c" stroke="#48B755" strokeOpacity="0.7" />
          {Array.from({ length: 5 }).map((_, i) => (
            <g key={i} fill="#48B755" fillOpacity="0.55">
              <rect x={97 + i * 9} y="266" width="4" height="6" />
              <rect x={97 + i * 9} y="322" width="4" height="6" />
            </g>
          ))}
          <text x="117" y="301" textAnchor="middle" fill="#59D46B" fontSize="9" fontFamily="var(--font-jetbrains-mono)">MCU</text>
          {/* components */}
          <rect x="155" y="292" width="28" height="14" rx="2" fill="#1d2a22" stroke="#27312B" />
          <rect x="45" y="292" width="22" height="22" rx="3" fill="#1d2a22" stroke="#27312B" />
          <circle cx="186" cy="248" r="4" fill="#59D46B" className="animate-pulse" />
          <text x="115" y="378" textAnchor="middle" fill="#89948E" fontSize="10" letterSpacing="2" fontFamily="var(--font-jetbrains-mono)">DEVICE</text>
        </g>

        {/* ---------- Cloud ---------- */}
        <g>
          <path
            d="M248 132 C 222 132, 222 96, 250 94 C 254 66, 296 58, 310 82 C 330 66, 362 80, 356 104 C 380 108, 378 134, 354 134 Z"
            fill="url(#iot-cloud)"
            stroke="#48B755"
            strokeOpacity="0.6"
            strokeWidth="1.5"
          />
          {[0, 1, 2].map((i) => (
            <rect key={i} x={276 + i * 22} y="104" width="16" height="4" rx="2" fill="#48B755" fillOpacity={0.35 + i * 0.25} />
          ))}
          <text x="300" y="38" textAnchor="middle" fill="#89948E" fontSize="10" letterSpacing="2" fontFamily="var(--font-jetbrains-mono)">CLOUD</text>
        </g>

        {/* ---------- Web dashboard ---------- */}
        <g>
          <rect x="330" y="178" width="200" height="128" rx="8" fill="#111820" stroke="#27312B" />
          <rect x="330" y="178" width="200" height="20" rx="8" fill="#141A1D" />
          {[0, 1, 2].map((i) => (
            <circle key={i} cx={342 + i * 9} cy="188" r="2.5" fill={i === 2 ? "#48B755" : "#27312B"} />
          ))}
          <rect x="340" y="206" width="44" height="90" rx="4" fill="#141A1D" />
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x="346" y={214 + i * 18} width={30 - i * 4} height="5" rx="2" fill={i === 0 ? "#48B755" : "#27312B"} />
          ))}
          <rect x="392" y="206" width="128" height="52" rx="4" fill="#0c1210" />
          <polyline
            points="398,248 414,236 428,240 444,224 460,230 476,214 492,220 512,208"
            fill="none"
            stroke="#59D46B"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <rect x="392" y="264" width="60" height="32" rx="4" fill="#141A1D" />
          <rect x="458" y="264" width="62" height="32" rx="4" fill="#141A1D" />
          <circle cx="474" cy="280" r="4" fill="#59D46B" />
          <circle cx="474" cy="280" r="9" fill="none" stroke="#59D46B" strokeOpacity="0.4" />
          <rect x="400" y="272" width="30" height="5" rx="2" fill="#27312B" />
          <rect x="400" y="282" width="40" height="5" rx="2" fill="#48B755" fillOpacity="0.6" />
          <text x="430" y="322" textAnchor="middle" fill="#89948E" fontSize="10" letterSpacing="2" fontFamily="var(--font-jetbrains-mono)">WEB PLATFORM</text>
        </g>

        {/* ---------- Mobile app ---------- */}
        <g>
          <rect x="382" y="330" width="58" height="84" rx="10" fill="#111820" stroke="#48B755" strokeOpacity="0.5" />
          <rect x="400" y="335" width="22" height="4" rx="2" fill="#27312B" />
          <rect x="389" y="345" width="44" height="34" rx="4" fill="#0c1210" />
          <circle cx="411" cy="362" r="4" fill="#59D46B" />
          <rect x="389" y="385" width="44" height="6" rx="2" fill="#27312B" />
          <rect x="389" y="395" width="28" height="6" rx="2" fill="#48B755" fillOpacity="0.6" />
          <text x="458" y="376" fill="#89948E" fontSize="10" letterSpacing="2" fontFamily="var(--font-jetbrains-mono)">MOBILE</text>
          <text x="458" y="390" fill="#89948E" fontSize="10" letterSpacing="2" fontFamily="var(--font-jetbrains-mono)">APP</text>
        </g>
      </svg>
    </figure>
  );
}
