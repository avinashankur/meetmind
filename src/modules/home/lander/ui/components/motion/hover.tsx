"use client";

import Link from "next/link";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";
import { nudgeX, nudgeY, shine, zoom } from "./variants";

const MotionNextLink = motion.create(Link);

/**
 * A Next.js `Link` that broadcasts hover/press to motion children (e.g.
 * `NudgeOnHover`) and presses down slightly on tap. Works as the child of
 * `LandingButton asChild`.
 */
export const MotionLink = (
  props: React.ComponentProps<typeof MotionNextLink>,
) => (
  <MotionNextLink
    initial="rest"
    whileHover="hover"
    whileTap={{ scale: 0.97 }}
    {...props}
  />
);

/** Container that broadcasts hover to motion children without moving itself. */
export const HoverGroup = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <motion.div className={className} initial="rest" whileHover="hover">
    {children}
  </motion.div>
);

/** Shifts its content a few pixels while the parent group is hovered. */
export const NudgeOnHover = ({
  axis = "x",
  className,
  children,
}: {
  axis?: "x" | "y";
  className?: string;
  children: React.ReactNode;
}) => (
  <motion.span
    aria-hidden="true"
    variants={axis === "x" ? nudgeX : nudgeY}
    className={cn("inline-flex", className)}
  >
    {children}
  </motion.span>
);

/**
 * Diagonal light sweep across its parent on group hover. The parent needs
 * `relative isolate overflow-hidden` (as `LandingButton` has).
 */
export const ShineOnHover = () => (
  <motion.span
    aria-hidden="true"
    variants={shine}
    className="pointer-events-none absolute inset-y-0 left-0 -z-10 w-2/5 -skew-x-12 bg-linear-to-r from-transparent via-white/40 to-transparent"
  />
);

/** Fills its (relative) parent and slowly scales up on group hover. */
export const ZoomOnHover = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <motion.div variants={zoom} className={cn("absolute inset-0", className)}>
    {children}
  </motion.div>
);
