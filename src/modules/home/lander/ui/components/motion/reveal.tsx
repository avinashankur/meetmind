"use client";

import { motion, type Variants } from "motion/react";

import { TRANSITION } from "./transitions";
import { stagger } from "./variants";

interface RevealProps {
  className?: string;
  children: React.ReactNode;
  /** Seconds to wait before animating. */
  delay?: number;
  /** Distance (px) the element rises from. */
  y?: number;
  /** Animate on mount instead of when scrolled into view (above the fold). */
  immediate?: boolean;
}

const VIEWPORT = { once: true, amount: 0.2 } as const;

/** Fades and lifts its children in, once, when they enter the viewport. */
export const Reveal = ({
  className,
  children,
  delay = 0,
  y = 24,
  immediate = false,
}: RevealProps) => {
  const visible = { opacity: 1, y: 0 };
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      {...(immediate
        ? { animate: visible }
        : { whileInView: visible, viewport: VIEWPORT })}
      transition={{ ...TRANSITION.slow, delay }}
    >
      {children}
    </motion.div>
  );
};

const revealItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: TRANSITION.slow },
};

/** Container that staggers its `RevealItem` children into view. */
export const RevealGroup = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <motion.div
    className={className}
    variants={stagger(0.1)}
    initial="hidden"
    whileInView="visible"
    viewport={VIEWPORT}
  >
    {children}
  </motion.div>
);

export const RevealItem = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <motion.div className={className} variants={revealItem}>
    {children}
  </motion.div>
);
