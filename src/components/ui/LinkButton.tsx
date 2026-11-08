import type { AnchorHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand text-on-brand hover:bg-brand-bright shadow-[0_10px_30px_-12px_rgb(72_183_85/0.8)]",
  outline:
    "border border-fg/15 bg-fg/[0.03] text-fg hover:border-brand/60 hover:bg-brand/10",
  ghost: "text-fg/80 hover:text-fg",
};

export function linkButtonClass(variant: Variant = "primary", className?: string) {
  return cn(
    "group/btn inline-flex h-12 items-center justify-center gap-2 rounded-md px-6 text-sm font-semibold tracking-wide transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand active:translate-y-px",
    variants[variant],
    className,
  );
}

interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  children: ReactNode;
  external?: boolean;
}

/** Anchor styled as a button. Use for in-page and external navigation. */
export function LinkButton({
  variant = "primary",
  className,
  external,
  children,
  ...props
}: LinkButtonProps) {
  return (
    <a
      className={linkButtonClass(variant, className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    >
      {children}
    </a>
  );
}
