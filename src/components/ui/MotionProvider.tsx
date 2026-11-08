"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/** Makes every Framer Motion animation respect prefers-reduced-motion. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
