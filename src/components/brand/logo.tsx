import Link from "next/link";
import type { SVGProps } from "react";

import { cn } from "@/lib/utils";

/*
 * The canonical MeetMind mark: a four-point sparkle on a blue gradient tile.
 * This file is the single source of truth for the logo. The static copies in
 * `public/logo.svg` (external/email use) and `src/app/icon.svg` (favicon) must
 * mirror the geometry and colours defined here.
 */

/** Gradient id shared by every mark instance. All copies are identical. */
const MARK_GRADIENT_ID = "meetmind-mark-gradient";

/** Four-point sparkle, drawn on the 40×40 tile grid. */
const SPARKLE_PATH =
  "M20 11l2.34 6.66L29 20l-6.66 2.34L20 29l-2.34-6.66L11 20l6.66-2.34z";

type LogoTheme = "light" | "dark";

interface LogoMarkProps extends SVGProps<SVGSVGElement> {
  /** Rendered size in pixels. Defaults to 32. */
  size?: number;
}

export const LogoMark = ({ size = 32, className, ...props }: LogoMarkProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    aria-hidden="true"
    focusable="false"
    className={cn("shrink-0", className)}
    {...props}
  >
    <defs>
      <linearGradient
        id={MARK_GRADIENT_ID}
        x1="0"
        y1="0"
        x2="40"
        y2="40"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#60a5fa" />
        <stop offset="1" stopColor="#2563eb" />
      </linearGradient>
    </defs>
    <rect width="40" height="40" rx="10" fill={`url(#${MARK_GRADIENT_ID})`} />
    <path d={SPARKLE_PATH} fill="#ffffff" />
  </svg>
);

interface LogoWordmarkProps {
  tone?: LogoTheme;
  className?: string;
}

export const LogoWordmark = ({
  tone = "dark",
  className,
}: LogoWordmarkProps) => (
  <span
    className={cn(
      "text-base font-semibold tracking-tight",
      tone === "light" ? "text-white" : "text-foreground",
      className,
    )}
  >
    MeetMind
  </span>
);

interface LogoProps {
  /** Wordmark colour: `light` for dark/coloured backgrounds. */
  tone?: LogoTheme;
  size?: number;
  /** Set to `false` for the mark on its own. */
  wordmark?: boolean;
  className?: string;
  markClassName?: string;
  wordmarkClassName?: string;
}

/** The mark with its wordmark, without link behaviour. */
export const Logo = ({
  tone = "dark",
  size = 26,
  wordmark = true,
  className,
  markClassName,
  wordmarkClassName,
}: LogoProps) => (
  <span className={cn("inline-flex items-center gap-2.5", className)}>
    <LogoMark size={size} className={markClassName} />
    {wordmark && <LogoWordmark tone={tone} className={wordmarkClassName} />}
  </span>
);

interface BrandLogoProps extends LogoProps {
  href?: string;
}

/** The logo as the home link, used in headers, auth and the dashboard. */
export const BrandLogo = ({
  href = "/",
  tone,
  size,
  wordmark,
  className,
  markClassName,
  wordmarkClassName,
}: BrandLogoProps) => (
  <Link
    href={href}
    className={cn(
      "group inline-flex items-center gap-2.5 transition-opacity hover:opacity-85",
      className,
    )}
  >
    <Logo
      tone={tone}
      size={size}
      wordmark={wordmark}
      markClassName={cn(
        "transition-transform group-hover:scale-105",
        markClassName,
      )}
      wordmarkClassName={wordmarkClassName}
    />
  </Link>
);
