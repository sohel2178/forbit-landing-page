import {
  ArrowDownToLine,
  Cloud,
  Info,
  MapPin,
  Power,
  Thermometer,
  Zap,
} from "lucide-react";
import type { ComponentType, ReactNode } from "react";

import type { Dictionary } from "@/i18n/dictionaries/en";
import { cn } from "@/lib/utils";

/* All values below are illustrative sample data for a concept interface. */
const SAMPLE = {
  soc: 72,
  voltage: "51.2 V",
  current: "+8.4 A",
  temperature: "31 °C",
  tempPct: 38,
};

type Labels = Dictionary["innovation"]["console"];

function Tile({
  label,
  sample,
  icon: Icon,
  children,
  className,
}: {
  label: string;
  sample: string;
  icon: ComponentType<{ className?: string }>;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex flex-col justify-between rounded-xl border border-fg/[0.07] bg-fg/[0.025] p-3 sm:p-3.5",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-1.5 font-mono text-[0.58rem] tracking-[0.14em] text-fg/50 uppercase">
          <Icon className="size-3.5 text-brand-fg" aria-hidden />
          {label}
        </span>
        <span className="rounded-sm border border-fg/10 px-1 font-mono text-[0.48rem] tracking-[0.12em] text-fg/35 uppercase">
          {sample}
        </span>
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function Battery({ soc }: { soc: string }) {
  const segments = 5;
  const h = 236;
  const fillH = (h * SAMPLE.soc) / 100;
  return (
    <div className="relative mx-auto w-[150px] sm:w-[170px]">
      <svg viewBox="0 0 170 290" className="h-auto w-full" aria-hidden>
        <defs>
          <linearGradient id="bv-fill" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#278B3C" />
            <stop offset="100%" stopColor="#59D46B" />
          </linearGradient>
          <linearGradient id="bv-sheen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fff" stopOpacity="0" />
            <stop offset="50%" stopColor="#fff" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <clipPath id="bv-clip">
            <rect x="21" y="41" width="128" height={h} rx="14" />
          </clipPath>
        </defs>
        {/* terminal */}
        <rect x="60" y="14" width="50" height="20" rx="5" fill="#1b2420" stroke="#27312B" />
        {/* body */}
        <rect x="14" y="34" width="142" height="250" rx="22" fill="#0b100e" stroke="#48B755" strokeOpacity="0.6" strokeWidth="2" />
        <g clipPath="url(#bv-clip)">
          <g className="animate-charge origin-svg-bottom">
            <rect x="21" y={41 + h - fillH} width="128" height={fillH} fill="url(#bv-fill)" />
          </g>
          <rect x="21" y="41" width="128" height="80" fill="url(#bv-sheen)" className="animate-sheen" />
          {Array.from({ length: segments - 1 }).map((_, i) => (
            <rect key={i} x="21" y={41 + ((i + 1) * h) / segments - 1.5} width="128" height="3" fill="#0b100e" />
          ))}
        </g>
      </svg>
      <div className="pointer-events-none absolute inset-x-0 top-[40%] text-center">
        <p className="font-display text-4xl font-semibold text-fg drop-shadow-[0_2px_12px_rgb(0_0_0/0.6)] sm:text-5xl">
          {SAMPLE.soc}
          <span className="text-xl text-fg/70">%</span>
        </p>
        <p className="mt-1 font-mono text-[0.55rem] tracking-[0.2em] text-fg/80 uppercase">{soc}</p>
      </div>
    </div>
  );
}

export function BatteryVisualization({ labels, className }: { labels: Labels; className?: string }) {
  return (
    <figure
      className={cn(
        "theme-dark relative overflow-hidden rounded-2xl border border-fg/10 bg-surface/80 shadow-[0_50px_100px_-40px_rgb(72_183_85/0.35)] backdrop-blur",
        className,
      )}
      aria-label={labels.aria}
    >
      <div className="flex items-center justify-between gap-3 border-b border-fg/[0.07] px-4 py-3 sm:px-5">
        <span className="flex items-center gap-2 font-mono text-[0.62rem] tracking-[0.18em] text-fg/70 uppercase">
          <span className="size-1.5 animate-pulse rounded-full bg-brand-bright" />
          {labels.title}
        </span>
        <span className="rounded-full border border-amber-300/25 bg-amber-300/10 px-2.5 py-0.5 font-mono text-[0.55rem] tracking-[0.14em] text-amber-200/90 uppercase">
          {labels.preview}
        </span>
      </div>

      <div className="grid gap-5 p-4 sm:grid-cols-[auto_1fr] sm:p-5">
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-fg/[0.06] bg-black/20 px-4 py-5">
          <Battery soc={labels.soc} />
          <span className="flex items-center gap-1.5 font-mono text-[0.58rem] tracking-[0.14em] text-brand-fg uppercase">
            <Zap className="size-3" aria-hidden /> {labels.charging}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
          <Tile label={labels.voltage} sample={labels.sample} icon={Zap}>
            <p className="font-display text-xl font-semibold text-fg sm:text-2xl">{SAMPLE.voltage}</p>
            <svg viewBox="0 0 100 24" className="mt-1.5 h-5 w-full" aria-hidden>
              <polyline points="0,18 12,15 24,16 36,10 48,12 60,7 72,9 84,5 100,6" fill="none" stroke="#59D46B" strokeWidth="1.8" strokeLinejoin="round" />
            </svg>
          </Tile>

          <Tile label={labels.current} sample={labels.sample} icon={ArrowDownToLine}>
            <p className="font-display text-xl font-semibold text-fg sm:text-2xl">{SAMPLE.current}</p>
            <div className="mt-2 flex gap-1 font-mono text-[0.55rem] uppercase">
              <span className="rounded bg-brand/20 px-1.5 py-0.5 text-brand-fg">{labels.charge}</span>
              <span className="rounded bg-fg/5 px-1.5 py-0.5 text-fg/35">{labels.discharge}</span>
            </div>
          </Tile>

          <Tile label={labels.temperature} sample={labels.sample} icon={Thermometer}>
            <p className="font-display text-xl font-semibold text-fg sm:text-2xl">{SAMPLE.temperature}</p>
            <div className="relative mt-2.5 h-1.5 rounded-full bg-gradient-to-r from-brand via-amber-300 to-red-400">
              <span
                className="absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-canvas bg-white"
                style={{ left: `${SAMPLE.tempPct}%` }}
              />
            </div>
          </Tile>

          <Tile label={labels.gps} sample={labels.sample} icon={MapPin}>
            <div className="flex items-center gap-3">
              <svg viewBox="0 0 40 40" className="size-10 shrink-0" aria-hidden>
                <circle cx="20" cy="20" r="18" fill="none" stroke="#27312B" />
                <circle cx="20" cy="20" r="11" fill="none" stroke="#27312B" />
                <path d="M20 20 L20 2 A18 18 0 0 1 36 12 Z" fill="#48B755" fillOpacity="0.25" className="animate-spin-slow origin-[20px_20px] [animation-duration:4s]" />
                <circle cx="27" cy="14" r="2.5" fill="#59D46B" />
              </svg>
              <div>
                <p className="text-sm font-semibold text-fg">{labels.locationFix}</p>
                <p className="font-mono text-[0.55rem] text-fg/45">Device ID · BMS-DEMO</p>
              </div>
            </div>
          </Tile>

          <Tile label={labels.output} sample={labels.sample} icon={Power}>
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-fg">{labels.enabled}</p>
              <span className="relative h-5 w-9 rounded-full bg-brand">
                <span className="absolute top-0.5 right-0.5 size-4 rounded-full bg-white shadow" />
              </span>
            </div>
            <p className="mt-1.5 font-mono text-[0.55rem] text-fg/45">{labels.remoteControl}</p>
          </Tile>

          <Tile label={labels.cloud} sample={labels.sample} icon={Cloud}>
            <div className="flex items-end gap-1" aria-hidden>
              {[40, 65, 50, 80, 60, 90, 75].map((v, i) => (
                <span key={i} className="w-full rounded-sm bg-brand/60" style={{ height: `${v * 0.28}px` }} />
              ))}
            </div>
            <p className="mt-1.5 font-mono text-[0.55rem] text-fg/45">{labels.telemetrySync}</p>
          </Tile>
        </div>
      </div>

      <figcaption className="flex items-start gap-2 border-t border-fg/[0.07] px-4 py-3 text-[0.72rem] leading-relaxed text-fg/50 sm:px-5">
        <Info className="mt-0.5 size-3.5 shrink-0 text-amber-200/70" aria-hidden />
        {labels.disclaimer}
      </figcaption>
    </figure>
  );
}
