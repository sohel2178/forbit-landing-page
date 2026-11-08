"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

type Tag = "div" | "li" | "ul" | "ol" | "article" | "section";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: Tag;
}

/** Fades and lifts content into view once. */
export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      variants={itemVariants}
      transition={{ delay }}
    >
      {children}
    </Comp>
  );
}

interface RevealGroupProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  as?: Tag;
}

/** Parent that staggers its RevealItem children. */
export function RevealGroup({
  children,
  className,
  stagger = 0.1,
  as = "div",
}: RevealGroupProps) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </Comp>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: Tag;
}) {
  const Comp = motion[as];
  return (
    <Comp className={className} variants={itemVariants}>
      {children}
    </Comp>
  );
}

/** A line that draws itself in along the X (or Y) axis when in view. */
export function DrawLine({
  className,
  axis = "x",
}: {
  className?: string;
  axis?: "x" | "y";
}) {
  return (
    <motion.span
      aria-hidden
      className={className}
      style={{ originX: 0, originY: 0 }}
      initial={axis === "x" ? { scaleX: 0 } : { scaleY: 0 }}
      whileInView={axis === "x" ? { scaleX: 1 } : { scaleY: 1 }}
      viewport={{ once: true, margin: "0px 0px -20% 0px" }}
      transition={{ duration: 1.4, ease: EASE }}
    />
  );
}
