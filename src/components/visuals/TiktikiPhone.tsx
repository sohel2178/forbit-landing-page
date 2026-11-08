import { Bell, History, LocateFixed, ShieldCheck } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Illustrative mobile app concept for Tiktiki GPS Tracker (not a screenshot).
 * Accent is supplied by the parent via the --product-accent CSS variable.
 */
export function TiktikiPhone({ aria, className }: { aria: string; className?: string }) {
  return (
    <div
      className={cn("relative flex items-center justify-center", className)}
      role="img"
      aria-label={aria}
    >
      {/* Phone */}
      <div className="relative w-[200px] rounded-[2.1rem] border border-fg/15 bg-[#0a0e10] p-2 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.9)] sm:w-[220px]">
        <div className="relative overflow-hidden rounded-[1.65rem] bg-[#0d1316]">
          <div className="absolute top-2 left-1/2 z-10 h-4 w-16 -translate-x-1/2 rounded-full bg-black" />

          {/* App header */}
          <div className="flex items-center justify-between px-4 pt-9 pb-2">
            <span className="font-display text-sm font-bold tracking-tight text-fg lowercase">
              tiktiki<span className="text-(--product-accent)">.</span>
            </span>
            <Bell className="size-3.5 text-fg/50" aria-hidden />
          </div>

          {/* Map */}
          <div className="relative mx-2 h-[190px] overflow-hidden rounded-xl sm:h-[210px]">
            <svg viewBox="0 0 200 210" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden>
              <rect width="200" height="210" fill="#0f1619" />
              <g stroke="#1a2428" strokeWidth="9" strokeLinecap="round" fill="none">
                <path d="M0 120 H 200" />
                <path d="M70 0 V 210" />
                <path d="M0 30 L 200 90" />
              </g>
              <g stroke="#152024" strokeWidth="3" fill="none">
                <path d="M0 175 H 200 M140 0 V 210 M20 0 V 210" />
              </g>
              <path d="M10 200 C 40 170, 60 140, 70 120 S 110 110, 120 100" fill="none" stroke="var(--product-accent)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="1 6" />
              <circle cx="120" cy="100" r="34" fill="var(--product-accent)" fillOpacity="0.08" />
              <circle cx="120" cy="100" r="12" fill="var(--product-accent)" fillOpacity="0.45" className="animate-pulse-ring origin-svg-center" />
              {/* car marker */}
              <g transform="translate(108 88)">
                <rect width="24" height="24" rx="7" fill="var(--product-accent)" />
                <path d="M6 14 l1.6 -4.4 a2 2 0 0 1 1.9 -1.3 h5 a2 2 0 0 1 1.9 1.3 L18 14 v3 h-2 v-1.5 h-8 V17 h-2z" fill="#0b1012" />
              </g>
            </svg>
          </div>

          {/* Bottom sheet */}
          <div className="space-y-2.5 px-3 pt-3 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[0.68rem] font-semibold text-fg">My Vehicle</p>
                <p className="font-mono text-[0.55rem] text-fg/45">Parked · Location updated</p>
              </div>
              <span className="rounded-full bg-(--product-accent)/15 px-2 py-0.5 font-mono text-[0.5rem] tracking-wider text-(--product-accent) uppercase">
                Live
              </span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-fg/[0.07] bg-fg/[0.03] px-2.5 py-2">
              <span className="flex items-center gap-1.5 text-[0.62rem] text-fg/80">
                <ShieldCheck className="size-3.5 text-(--product-accent)" aria-hidden /> Security mode
              </span>
              <span className="relative h-4 w-7 rounded-full bg-(--product-accent)">
                <span className="absolute top-0.5 right-0.5 size-3 rounded-full bg-white" />
              </span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { t: "Locate", Icon: LocateFixed },
                { t: "History", Icon: History },
              ].map(({ t, Icon }) => (
                <span key={t} className="flex items-center justify-center gap-1 rounded-md bg-fg/[0.05] py-1.5 text-[0.58rem] text-fg/70">
                  <Icon className="size-3" aria-hidden /> {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating notification */}
      <div className="glass animate-float absolute top-[14%] -right-1 w-[150px] rounded-xl p-2.5 sm:right-[2%] sm:w-[170px]">
        <p className="flex items-center gap-1.5 font-mono text-[0.52rem] tracking-[0.14em] text-(--product-accent) uppercase">
          <Bell className="size-3" aria-hidden /> Smart alert
        </p>
        <p className="mt-1 text-[0.62rem] leading-snug text-fg/80">Movement detected near your vehicle</p>
      </div>
    </div>
  );
}
