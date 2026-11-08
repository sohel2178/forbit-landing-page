import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";

interface SectionHeadingProps {
  id: string;
  label: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

/** Section label + h2 + supporting copy. `id` is used for aria-labelledby. */
export function SectionHeading({
  id,
  label,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <p
        className="label-mono inline-flex items-center gap-3 text-brand-fg"
      >
        <span
          aria-hidden
          className="h-px w-8 bg-brand/70"
        />
        {label}
      </p>
      <h2
        id={id}
        className={cn(
          "font-display mt-5 text-[clamp(2rem,4.6vw,3.5rem)] leading-[1.04] font-semibold text-balance text-fg",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed text-pretty sm:text-lg",
            "text-fg-muted",
            align === "center" && "mx-auto max-w-2xl",
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
