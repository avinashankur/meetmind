"use client";

import { MotionConfig } from "motion/react";

/**
 * Shared motion settings for the landing page. `reducedMotion="user"` turns
 * transform animations off (opacity still fades) for visitors who ask for it.
 */
export const LandingMotionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => <MotionConfig reducedMotion="user">{children}</MotionConfig>;
