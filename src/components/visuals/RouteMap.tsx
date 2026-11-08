import type { Dictionary } from "@/i18n/dictionaries/en";
import { cn } from "@/lib/utils";

/** Compact GPS route illustration for the vehicle tracking service card. */
export function RouteMap({
  labels,
  className,
}: {
  labels: Dictionary["services"]["routeMap"];
  className?: string;
}) {
  const route = "M24 186 C 70 186, 70 130, 120 128 S 170 70, 220 72 S 268 30, 300 34";
  return (
    <div
      className={cn(
        "theme-dark relative overflow-hidden rounded-xl border border-fg/[0.07] bg-[#0c1110]",
        className,
      )}
    >
      <svg viewBox="0 0 320 220" className="h-full w-full" aria-hidden>
        {/* streets */}
        <g stroke="#1b2420" strokeWidth="8" strokeLinecap="round" fill="none">
          <path d="M0 150 H 320" />
          <path d="M90 0 V 220" />
          <path d="M210 0 V 220" />
          <path d="M0 60 L 320 100" />
        </g>
        <g stroke="#151d1a" strokeWidth="3" fill="none">
          <path d="M0 30 H 320 M0 200 H 320 M40 0 V 220 M150 0 V 220 M270 0 V 220" />
        </g>
        {/* geofence */}
        <circle cx="220" cy="72" r="38" fill="#48B755" fillOpacity="0.06" stroke="#48B755" strokeOpacity="0.5" strokeDasharray="4 5" />
        {/* route */}
        <path d={route} fill="none" stroke="#48B755" strokeOpacity="0.25" strokeWidth="6" strokeLinecap="round" />
        <path d={route} fill="none" stroke="#59D46B" strokeWidth="2.5" strokeLinecap="round" className="flow-stroke" />
        {/* start */}
        <circle cx="24" cy="186" r="5" fill="#080B0D" stroke="#89948E" strokeWidth="2" />
        {/* vehicle */}
        <g>
          <circle cx="220" cy="72" r="7" fill="#59D46B" className="animate-pulse-ring origin-svg-center" fillOpacity="0.5" />
          <circle cx="220" cy="72" r="6" fill="#59D46B" stroke="#080B0D" strokeWidth="2" />
        </g>
        {/* destination pin */}
        <path d="M300 34 m0 -16 a9 9 0 0 1 9 9 c0 7 -9 15 -9 15 s-9 -8 -9 -15 a9 9 0 0 1 9 -9z" fill="#48B755" />
        <circle cx="300" cy="27" r="3" fill="#080B0D" />
      </svg>
      <div className="glass absolute bottom-3 left-3 rounded-md px-2.5 py-1.5">
        <p className="font-mono text-[0.58rem] tracking-[0.14em] text-fg-muted uppercase">{labels.title}</p>
        <p className="font-mono text-[0.68rem] text-fg">{labels.status}</p>
      </div>
    </div>
  );
}
