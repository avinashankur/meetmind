"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";

import type { StatValue } from "../../../constants";
import { EASE } from "./transitions";

/** Counts a stat up from zero the first time it scrolls into view. */
export const CountUp = ({ value, decimals = 0, suffix = "" }: StatValue) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();
  const count = useMotionValue(0);
  const display = useTransform(
    count,
    (latest) =>
      latest.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }) + suffix,
  );

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(count, value, {
      duration: reduceMotion ? 0 : 1.6,
      ease: EASE.out,
    });
    return () => controls.stop();
  }, [isInView, count, value, reduceMotion]);

  return (
    <span ref={ref} className="tabular-nums">
      {/* Final value for assistive tech; the animated digits are decorative. */}
      <span className="sr-only">
        {value.toLocaleString("en-US")}
        {suffix}
      </span>
      <motion.span aria-hidden="true">{display}</motion.span>
    </span>
  );
};
