"use client";

import {
  BatteryCharging,
  Cloud,
  MapPin,
  Smartphone,
  Thermometer,
  Wifi,
} from "lucide-react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect, type ComponentType } from "react";

import type { Dictionary } from "@/i18n/dictionaries/en";
import { cn } from "@/lib/utils";

/* Coordinates are in a 600×600 viewBox; nodes are placed with percentages. */
type NodeId = keyof Dictionary["hero"]["visual"]["nodes"];

const nodes: {
  id: NodeId;
  x: number;
  y: number;
  Icon: ComponentType<{ className?: string }>;
}[] = [
  { id: "cloud", x: 300, y: 70, Icon: Cloud },
  { id: "gps", x: 505, y: 170, Icon: MapPin },
  { id: "battery", x: 520, y: 400, Icon: BatteryCharging },
  { id: "app", x: 330, y: 535, Icon: Smartphone },
  { id: "sensor", x: 90, y: 430, Icon: Thermometer },
  { id: "net", x: 90, y: 180, Icon: Wifi },
];

/* Orthogonal circuit traces from the core chip to each node. */
const traces = [
  "M300 240 V 70",
  "M340 240 V 170 H 505",
  "M360 320 H 450 V 400 H 520",
  "M330 360 V 535",
  "M260 360 V 430 H 90",
  "M240 280 H 160 V 180 H 90",
];

/* Decorative secondary traces (no node). */
const ghostTraces = [
  "M240 320 H 190 V 520 H 40",
  "M360 280 H 420 V 60 H 580",
  "M270 240 V 120 H 160 V 40",
  "M380 360 V 470 H 590",
];

function useParallax(strength: number, mx: MotionValue<number>, my: MotionValue<number>) {
  const x = useTransform(mx, (v) => v * strength);
  const y = useTransform(my, (v) => v * strength);
  return { x, y };
}

export function HeroVisual({
  labels,
  className,
}: {
  labels: Dictionary["hero"]["visual"];
  className?: string;
}) {
  const reduce = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mx = useSpring(rawX, { stiffness: 60, damping: 18, mass: 0.6 });
  const my = useSpring(rawY, { stiffness: 60, damping: 18, mass: 0.6 });

  const back = useParallax(-10, mx, my);
  const mid = useParallax(14, mx, my);
  const front = useParallax(26, mx, my);

  useEffect(() => {
    if (reduce) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      rawX.set(e.clientX / window.innerWidth - 0.5);
      rawY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, rawX, rawY]);

  return (
    <motion.div
      className={cn("relative aspect-square w-full select-none", className)}
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      role="img"
      aria-label={labels.aria}
    >
      {/* Back layer: orbit rings */}
      <motion.div className="absolute inset-0" style={back}>
        <svg viewBox="0 0 600 600" className="h-full w-full" aria-hidden>
          <defs>
            <radialGradient id="hv-core-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#48B755" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#48B755" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="300" cy="300" r="250" fill="url(#hv-core-glow)" />
          <circle cx="300" cy="300" r="270" fill="none" className="stroke-(--t-trace)" strokeWidth="1" />
          <circle cx="300" cy="300" r="200" fill="none" className="stroke-(--t-trace)" strokeWidth="1" strokeDasharray="2 6" />
          <g className="animate-spin-slow origin-svg-center">
            <circle cx="300" cy="300" r="235" fill="none" stroke="#48B755" strokeOpacity="0.35" strokeWidth="1" strokeDasharray="60 420" />
            <circle cx="535" cy="300" r="3" fill="#59D46B" />
          </g>
          {ghostTraces.map((d) => (
            <path key={d} d={d} fill="none" className="stroke-(--t-trace-ghost)" strokeWidth="1.5" />
          ))}
        </svg>
      </motion.div>

      {/* Mid layer: live traces + core chip */}
      <motion.div className="absolute inset-0" style={mid}>
        <svg viewBox="0 0 600 600" className="h-full w-full" aria-hidden>
          <defs>
            <linearGradient id="hv-chip" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#18231d" />
              <stop offset="100%" stopColor="#0c1210" />
            </linearGradient>
          </defs>
          {traces.map((d) => (
            <g key={d}>
              <path d={d} fill="none" className="stroke-(--t-trace)" strokeWidth="2" strokeLinejoin="round" />
              <path
                d={d}
                fill="none"
                stroke="#59D46B"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="flow-stroke"
              />
            </g>
          ))}
          {/* Vias */}
          {[
            [340, 170],
            [450, 400],
            [260, 430],
            [160, 180],
          ].map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4" className="fill-(--t-base)" stroke="#48B755" strokeWidth="1.5" />
          ))}

          {/* Core chip */}
          <g>
            {Array.from({ length: 6 }).map((_, i) => {
              const o = 252 + i * 19;
              return (
                <g key={i} fill="#3a4a40">
                  <rect x={o} y="230" width="6" height="12" rx="1" />
                  <rect x={o} y="358" width="6" height="12" rx="1" />
                  <rect x="230" y={o} width="12" height="6" rx="1" />
                  <rect x="358" y={o} width="12" height="6" rx="1" />
                </g>
              );
            })}
            <rect x="240" y="240" width="120" height="120" rx="16" fill="url(#hv-chip)" stroke="#48B755" strokeOpacity="0.6" strokeWidth="1.5" />
            <rect x="262" y="262" width="76" height="76" rx="8" fill="none" stroke="#48B755" strokeOpacity="0.25" />
            {Array.from({ length: 4 }).map((_, r) =>
              Array.from({ length: 4 }).map((__, c) => (
                <rect
                  key={`${r}-${c}`}
                  x={272 + c * 15}
                  y={272 + r * 15}
                  width="9"
                  height="9"
                  rx="1.5"
                  fill="#48B755"
                  fillOpacity={(r + c) % 3 === 0 ? 0.9 : 0.18}
                />
              )),
            )}
          </g>
        </svg>
      </motion.div>

      {/* Front layer: device nodes */}
      <motion.div className="absolute inset-0" style={front}>
        {nodes.map(({ id, x, y, Icon }, i) => (
          <div
            key={id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${(x / 600) * 100}%`, top: `${(y / 600) * 100}%` }}
          >
            <div
              className="animate-float flex flex-col items-center gap-1.5"
              style={{ animationDelay: `${i * -1.1}s` }}
            >
              <span className="relative flex size-11 items-center justify-center rounded-xl border border-brand/35 bg-canvas/80 text-brand-fg shadow-[0_0_24px_-4px_rgb(72_183_85/0.55)] backdrop-blur sm:size-14">
                <span aria-hidden className="animate-pulse-ring absolute inset-0 rounded-xl border border-brand/40" style={{ animationDelay: `${i * 0.4}s` }} />
                <Icon className="size-5 sm:size-6" />
              </span>
              <span className="font-mono text-[0.55rem] tracking-[0.2em] text-fg/50 uppercase sm:text-[0.6rem]">
                {labels.nodes[id]}
              </span>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Floating status chips */}
      <motion.div
        className="glass absolute top-[8%] left-[-2%] hidden rounded-lg px-3 py-2 sm:block"
        style={front}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
      >
        <p className="flex items-center gap-2 font-mono text-[0.62rem] tracking-[0.14em] text-fg/80 uppercase">
          <span className="size-1.5 rounded-full bg-brand-bright shadow-[0_0_8px_#59D46B]" />
          {labels.telemetry}
        </p>
      </motion.div>
      <motion.div
        className="glass absolute right-[-2%] bottom-[10%] hidden rounded-lg px-3 py-2 sm:block"
        style={mid}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.8 }}
      >
        <p className="font-mono text-[0.6rem] tracking-[0.14em] text-fg-muted uppercase">{labels.link}</p>
        <p className="mt-0.5 font-mono text-[0.7rem] text-fg">MQTT · LTE · GNSS</p>
      </motion.div>
    </motion.div>
  );
}
