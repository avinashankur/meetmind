import * as React from "react";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { ShineOnHover } from "./motion/hover";

const landingButtonVariants = cva(
  // relative/isolate/overflow-hidden contain the hover shine.
  "relative isolate inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden border border-transparent font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900",
  {
    variants: {
      variant: {
        /** Frosted glass on the sky gradient. */
        glass:
          "border-white/50 bg-white/15 text-white shadow-lg inset-shadow-xs shadow-blue-900/20 inset-shadow-white/40 backdrop-blur-xs transition-colors duration-300 hover:border-white/70 hover:bg-white/30",
        /** Glossy near-black primary action. */
        dark: "bg-linear-to-b from-zinc-700 to-zinc-950 text-white shadow-lg inset-shadow-xs shadow-slate-950/40 inset-shadow-white/20",
        /** Translucent secondary action on the sky gradient. */
        ghost:
          "border-white/50 bg-white/20 text-white inset-shadow-xs inset-shadow-white/40 backdrop-blur-sm transition-colors duration-300 hover:border-white/70 hover:bg-white/30",
        /** Solid white action for dark surfaces. */
        light:
          "bg-white text-slate-900 shadow-sm transition-colors duration-300 hover:bg-blue-50",
        /** Bare text link styled to sit beside buttons. */
        link: "bg-transparent text-white/90 transition-colors duration-300 hover:text-white",
      },
      size: {
        sm: "rounded-md px-5 py-1.5 text-sm",
        md: "rounded-md px-4 py-2 text-sm",
        lg: "rounded-lg px-6 py-3 text-sm",
      },
    },
    compoundVariants: [{ variant: "link", className: "px-1" }],
    defaultVariants: { variant: "glass", size: "sm" },
  },
);

/** Variants that get the light sweep on hover. */
const SHINE_VARIANTS = new Set(["glass", "dark"]);

type LandingButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof landingButtonVariants> & { asChild?: boolean };

/**
 * Landing CTA. Use with `asChild` around a `MotionLink`: the link broadcasts
 * hover, which plays the shine on glass and dark buttons.
 */
export const LandingButton = ({
  className,
  variant = "glass",
  size,
  asChild = false,
  children,
  ...props
}: LandingButtonProps) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(landingButtonVariants({ variant, size }), className)}
      {...props}
    >
      <Slottable>{children}</Slottable>
      {SHINE_VARIANTS.has(variant ?? "") && <ShineOnHover />}
    </Comp>
  );
};
