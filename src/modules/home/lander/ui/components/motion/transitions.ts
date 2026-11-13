import type { Transition } from "motion/react";

/**
 * Motion design tokens for the landing page. Every animation pulls its timing
 * from here so the whole page moves with one rhythm.
 */

export const EASE = {
  /** Fast start, long gentle settle: entrances, fades, hovers. */
  out: [0.22, 1, 0.36, 1],
  /** Symmetric: layout changes such as expanding panels. */
  inOut: [0.65, 0, 0.35, 1],
  /** The CSS `ease` curve: even sweeps such as the button shine. */
  standard: [0.25, 0.1, 0.25, 1],
} as const;

export const DURATION = {
  fast: 0.25,
  base: 0.5,
  slow: 0.8,
} as const;

export const TRANSITION = {
  fast: { duration: DURATION.fast, ease: EASE.out },
  base: { duration: DURATION.base, ease: EASE.out },
  slow: { duration: DURATION.slow, ease: EASE.out },
  /** Panels growing or collapsing. */
  expand: { duration: 0.7, ease: EASE.inOut },
  /** Small elements popping in: chips, tags, badges. */
  pop: { type: "spring", stiffness: 380, damping: 28 },
  /** Hover lifts and presses. */
  hover: { type: "spring", stiffness: 300, damping: 26 },
} satisfies Record<string, Transition>;

/** Endless, eased back-and-forth for ambient motion (drifting, blinking). */
export const ambientLoop = (duration: number, delay = 0): Transition => ({
  duration,
  delay,
  ease: "easeInOut",
  repeat: Infinity,
  repeatType: "reverse",
});

/** Endless restarting loop for pulses (voice rings, typing dots, levels). */
export const pulseLoop = (duration: number, delay = 0): Transition => ({
  duration,
  delay,
  ease: "easeOut",
  repeat: Infinity,
});
