import type { Variants } from "motion/react";

import { DURATION, EASE, TRANSITION } from "./transitions";

/* Entrance variants: animate from `hidden` to `visible`. */

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: TRANSITION.base },
};

export const pop: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: TRANSITION.pop },
};

/** Parent variant that reveals its children one after another. */
export const stagger = (gap = 0.1, delay = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: gap, delayChildren: delay } },
});

/*
 * Hover variants: a parent with `initial="rest" whileHover="hover"` drives any
 * descendant using these, with no extra state (motion propagates the label).
 */

export const lift: Variants = {
  rest: { y: 0, transition: TRANSITION.hover },
  hover: { y: -4, transition: TRANSITION.hover },
};

export const zoom: Variants = {
  rest: { scale: 1, transition: { duration: 0.8, ease: EASE.out } },
  hover: { scale: 1.05, transition: { duration: 0.8, ease: EASE.out } },
};

export const nudgeX: Variants = {
  rest: { x: 0, transition: TRANSITION.fast },
  hover: { x: 3, transition: TRANSITION.fast },
};

/** Light sweep across a button: plays on hover, snaps back instantly. */
export const shine: Variants = {
  rest: { x: "-150%", transition: { duration: 0 } },
  hover: {
    x: "350%",
    transition: { duration: DURATION.slow, ease: EASE.standard },
  },
};

export const nudgeY: Variants = {
  rest: { y: 0, transition: TRANSITION.fast },
  hover: { y: 2, transition: TRANSITION.fast },
};
