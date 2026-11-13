"use client";

import { motion } from "motion/react";

import { cn } from "@/lib/utils";
import { RevealItem } from "../motion/reveal";
import { lift } from "../motion/variants";

interface BentoTileProps {
  /** Grid placement classes (column / row spans). */
  span?: string;
  /** Surface classes: background, text color, padding overrides. */
  className?: string;
  children: React.ReactNode;
}

/** One tile of the features bento: a full-bleed surface with a short caption. */
export const BentoTile = ({ span, className, children }: BentoTileProps) => (
  <RevealItem className={cn("flex", span)}>
    <motion.article
      variants={lift}
      initial="rest"
      whileHover="hover"
      className={cn(
        "relative isolate flex min-h-72 w-full flex-col overflow-hidden rounded-3xl p-6 shadow-lg shadow-blue-900/5",
        className,
      )}
    >
      {children}
    </motion.article>
  </RevealItem>
);

/** The short caption at the bottom of a tile. */
export const BentoCaption = ({
  title,
  description,
  tone = "light",
  className,
}: {
  title: string;
  description?: string;
  tone?: "light" | "dark";
  className?: string;
}) => (
  <div className={cn("mt-auto", className)}>
    <h3
      className={cn(
        "font-tight text-xl leading-tight font-semibold tracking-tight",
        tone === "dark" ? "text-white" : "text-slate-900",
      )}
    >
      {title}
    </h3>
    {description && (
      <p
        className={cn(
          "mt-1 text-sm",
          tone === "dark" ? "text-white/70" : "text-slate-600",
        )}
      >
        {description}
      </p>
    )}
  </div>
);
