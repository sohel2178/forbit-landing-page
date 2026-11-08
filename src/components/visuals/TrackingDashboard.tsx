import { cn } from "@/lib/utils";

const vehicles = [
  { name: "Vehicle 01", status: "Moving", color: "#59D46B" },
  { name: "Vehicle 02", status: "Idle", color: "#E0A93B" },
  { name: "Vehicle 03", status: "Parked", color: "#89948E" },
];

/**
 * Illustrative fleet-tracking dashboard (concept visual, not a screenshot).
 * Accent is supplied by the parent via the --product-accent CSS variable.
 */
export function TrackingDashboard({ aria, className }: { aria: string; className?: string }) {
  const route = "M70 300 C 120 300, 150 250, 200 240 S 280 180, 330 170 S 410 110, 470 96";
  return (
    <div
      className={cn(
        "w-full min-w-0 overflow-hidden rounded-xl border border-fg/10 bg-[#0d1214] shadow-[0_40px_80px_-30px_rgb(0_0_0/0.8)]",
        className,
      )}
      role="img"
      aria-label={aria}
    >
      {/* Window chrome */}
      <div className="flex items-center gap-2 border-b border-fg/[0.06] bg-[#12181a] px-3 py-2">
        <span className="size-2 rounded-full bg-fg/15" />
        <span className="size-2 rounded-full bg-fg/15" />
        <span className="size-2 rounded-full bg-(--product-accent)" />
        <span className="ml-3 truncate font-mono text-[0.6rem] tracking-[0.12em] text-fg/40 uppercase">
          Fleet overview · Live
        </span>
      </div>

      <div className="grid grid-cols-[38%_minmax(0,1fr)] sm:grid-cols-[30%_minmax(0,1fr)]">
        {/* Sidebar */}
        <div className="min-w-0 space-y-2 border-r border-fg/[0.06] p-2.5 sm:p-3">
          <p className="font-mono text-[0.55rem] tracking-[0.16em] text-fg/35 uppercase">Vehicles</p>
          {vehicles.map((v, i) => (
            <div
              key={v.name}
              className={cn(
                "rounded-md border px-2 py-1.5",
                i === 0 ? "border-(--product-accent)/40 bg-(--product-accent)/10" : "border-fg/[0.06] bg-fg/[0.02]",
              )}
            >
              <p className="truncate text-[0.65rem] font-medium text-fg/85">{v.name}</p>
              <p className="mt-0.5 flex items-center gap-1 font-mono text-[0.55rem] text-fg/45">
                <span className="size-1.5 rounded-full" style={{ background: v.color }} />
                {v.status}
              </p>
            </div>
          ))}
          <div className="rounded-md border border-[#f26d6d]/30 bg-[#f26d6d]/10 px-2 py-1.5">
            <p className="font-mono text-[0.55rem] tracking-[0.1em] text-[#f6a3a3] uppercase">Alert</p>
            <p className="text-[0.6rem] text-fg/70">Overspeed event</p>
          </div>
        </div>

        {/* Map */}
        <div className="relative aspect-[4/5] min-w-0 sm:aspect-[16/11]">
          <svg viewBox="0 0 520 400" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden>
            <rect width="520" height="400" fill="#0b1012" />
            <g stroke="#182024" strokeWidth="14" strokeLinecap="round" fill="none">
              <path d="M0 260 H 520" />
              <path d="M150 0 V 400" />
              <path d="M360 0 V 400" />
              <path d="M0 80 L 520 160" />
            </g>
            <g stroke="#141b1e" strokeWidth="5" fill="none">
              <path d="M0 40 H 520 M0 340 H 520 M60 0 V 400 M250 0 V 400 M450 0 V 400 M0 190 H 520" />
            </g>
            <path d="M300 0 C 320 80, 280 140, 330 220 S 300 340, 340 400" stroke="#0f2a33" strokeWidth="22" fill="none" opacity="0.6" />
            <circle cx="330" cy="170" r="54" fill="var(--product-accent)" fillOpacity="0.07" stroke="var(--product-accent)" strokeOpacity="0.5" strokeDasharray="5 6" />
            <path d={route} fill="none" stroke="var(--product-accent)" strokeOpacity="0.25" strokeWidth="9" strokeLinecap="round" />
            <path d={route} fill="none" stroke="var(--product-accent)" strokeWidth="3" strokeLinecap="round" className="flow-stroke" />
            <circle cx="70" cy="300" r="6" fill="#0b1012" stroke="#89948E" strokeWidth="2.5" />
            <circle cx="330" cy="170" r="10" fill="var(--product-accent)" fillOpacity="0.5" className="animate-pulse-ring origin-svg-center" />
            <circle cx="330" cy="170" r="8" fill="var(--product-accent)" stroke="#0b1012" strokeWidth="3" />
            <circle cx="120" cy="80" r="6" fill="#E0A93B" stroke="#0b1012" strokeWidth="2.5" />
            <circle cx="430" cy="300" r="6" fill="#89948E" stroke="#0b1012" strokeWidth="2.5" />
            <path d="M470 96 m0 -20 a11 11 0 0 1 11 11 c0 9 -11 19 -11 19 s-11 -10 -11 -19 a11 11 0 0 1 11 -11z" fill="var(--product-accent)" />
            <circle cx="470" cy="87" r="4" fill="#0b1012" />
          </svg>

          <div className="glass absolute top-2.5 left-2.5 rounded-md px-2 py-1.5">
            <p className="font-mono text-[0.52rem] tracking-[0.14em] text-fg/45 uppercase">Vehicle 01</p>
            <p className="font-mono text-[0.62rem] text-fg">Moving · On route</p>
          </div>
          <div className="absolute right-2.5 bottom-2.5 flex gap-1.5">
            {["History", "Reports"].map((t) => (
              <span key={t} className="rounded border border-fg/10 bg-black/40 px-1.5 py-1 font-mono text-[0.52rem] tracking-[0.1em] text-fg/60 uppercase backdrop-blur">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
