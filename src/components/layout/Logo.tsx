import Image from "next/image";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface LogoProps {
  /**
   * `tile` places the original logo on a light tile so its black stroke stays
   * visible on dark surfaces (no recolouring). `bare` renders it as-is for
   * light surfaces.
   */
  variant?: "tile" | "bare";
  withWordmark?: boolean;
  size?: "sm" | "md";
  priority?: boolean;
  className?: string;
  wordmarkClassName?: string;
}

export function Logo({
  variant = "tile",
  withWordmark = true,
  size = "md",
  priority,
  className,
  wordmarkClassName,
}: LogoProps) {
  const box = size === "sm" ? "size-8" : "size-10";
  const px = size === "sm" ? 32 : 40;

  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <span
        className={cn(
          "relative inline-flex shrink-0 items-center justify-center",
          box,
          variant === "tile" &&
            "rounded-[9px] bg-[#F7F9F8] p-1 shadow-[0_0_0_1px_rgb(23_27_25/0.08),0_6px_20px_-6px_rgb(72_183_85/0.45)]",
        )}
      >
        <Image
          src={siteConfig.logo.src}
          width={siteConfig.logo.width}
          height={siteConfig.logo.height}
          alt={withWordmark ? "" : siteConfig.logo.alt}
          sizes={`${px}px`}
          priority={priority}
          className="h-full w-full object-contain"
        />
      </span>
      {withWordmark && (
        <span className={cn("flex flex-col leading-none", wordmarkClassName)}>
          <span className="font-display text-[1.05rem] font-bold tracking-[0.04em] text-fg">
            FORBIT
          </span>
          <span className="mt-1 font-mono text-[0.58rem] tracking-[0.42em] text-fg-muted">
            LIMITED
          </span>
          <span className="sr-only">{siteConfig.name}</span>
        </span>
      )}
    </span>
  );
}
