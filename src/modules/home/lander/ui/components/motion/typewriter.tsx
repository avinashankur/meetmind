"use client";

import { useEffect, useEffectEvent } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";

import { cn } from "@/lib/utils";
import { ambientLoop } from "./transitions";

interface TypewriterProps {
  text: string;
  /** Seconds before typing starts. */
  delay?: number;
  /** Seconds per character. */
  speed?: number;
  onComplete?: () => void;
}

/** Types `text` out character by character, with a blinking caret. */
export const Typewriter = ({
  text,
  delay = 0,
  speed = 0.025,
  onComplete,
}: TypewriterProps) => {
  const reduceMotion = useReducedMotion();
  const count = useMotionValue(0);
  const visibleText = useTransform(count, (value) =>
    text.slice(0, Math.round(value)),
  );
  const handleComplete = useEffectEvent(() => onComplete?.());

  useEffect(() => {
    const controls = animate(count, text.length, {
      // Reduced motion: show the full text straight away.
      duration: reduceMotion ? 0 : text.length * speed,
      delay: reduceMotion ? 0 : delay,
      ease: "linear",
      onComplete: handleComplete,
    });
    return () => controls.stop();
  }, [count, text, delay, speed, reduceMotion]);

  return (
    <>
      <motion.span>{visibleText}</motion.span>
      <Caret />
    </>
  );
};

/** Blinking text caret. Size it with `className` to match the text. */
export const Caret = ({ className }: { className?: string }) => (
  <motion.span
    aria-hidden="true"
    className={cn(
      "ml-0.5 inline-block h-3 w-px translate-y-0.5 bg-blue-600",
      className,
    )}
    animate={{ opacity: [1, 0] }}
    transition={ambientLoop(0.55)}
  />
);
