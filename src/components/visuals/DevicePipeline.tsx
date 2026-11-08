import { Cloud, Cpu, Gauge, Radio } from "lucide-react";

import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { formatIndex } from "@/i18n/format";
import { cn } from "@/lib/utils";

const icons = [Gauge, Cpu, Radio, Cloud];

/** Vertical signal path of a connected device: sensor → MCU → radio → cloud. */
export function DevicePipeline({
  stages,
  locale,
  className,
}: {
  stages: Dictionary["services"]["pipeline"];
  locale: Locale;
  className?: string;
}) {
  return (
    <div className={cn("relative h-full", className)} aria-hidden>
      <ol className="relative space-y-3">
        <span className="absolute top-5 bottom-5 left-5 w-px bg-fg/10" />
        <span className="flow-line-y absolute top-5 bottom-5 left-5 w-px" />
        {stages.map(({ label, sub }, i) => {
          const Icon = icons[i];
          return (
          <li key={label} className="relative flex items-center gap-4">
            <span className="relative z-10 flex size-10 items-center justify-center rounded-lg border border-fg/10 bg-canvas text-brand-fg">
              <Icon className="size-4" />
            </span>
            <span className="flex flex-1 items-center justify-between rounded-lg border border-fg/[0.06] bg-fg/[0.02] px-3 py-2">
              <span className="text-sm text-fg/80">{label}</span>
              <span className="font-mono text-[0.58rem] tracking-[0.16em] text-fg/35 uppercase">
                {formatIndex(i + 1, locale)} · {sub}
              </span>
            </span>
          </li>
          );
        })}
      </ol>
    </div>
  );
}
