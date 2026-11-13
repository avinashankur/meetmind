"use client";

import Image from "next/image";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";
import { ambientLoop } from "./transitions";

const SMALL_CLOUD = { width: 1782, height: 883 } as const;

interface DriftingCloudProps {
  /** Positioning and width classes for the cloud. */
  className?: string;
  /** Horizontal travel in px; negative drifts left. */
  distance?: number;
  /** Seconds for one leg of the drift. */
  duration?: number;
  sizes: string;
  preload?: boolean;
}

/** A small decorative cloud that slowly drifts back and forth. */
export const DriftingCloud = ({
  className,
  distance = -22,
  duration = 14,
  sizes,
  preload,
}: DriftingCloudProps) => (
  <motion.div
    aria-hidden="true"
    className={cn("pointer-events-none absolute", className)}
    animate={{ x: [0, distance] }}
    transition={ambientLoop(duration)}
  >
    <Image
      src="/landing/small-cloud.png"
      alt=""
      {...SMALL_CLOUD}
      sizes={sizes}
      preload={preload}
      className="h-auto w-full drop-shadow-xl drop-shadow-blue-900/20"
    />
  </motion.div>
);
