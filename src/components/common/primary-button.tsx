import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/*
 * The app's primary action, modelled on the landing page's dark CTA: a
 * top-lit gradient, a hairline inset sheen and a soft drop shadow. The
 * stops flip per theme: near-black in light mode, a white key with a
 * deeper lower stop in dark mode so the gloss stays visible on dark.
 */
const primaryButtonVariants = cva(
  "bg-linear-to-b from-button-top to-button-bottom text-primary-foreground inset-shadow-xs inset-shadow-white/20 shadow-lg shadow-black/30 inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 font-medium whitespace-nowrap outline-none transition duration-300 hover:brightness-110 focus-visible:ring-2 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 dark:hover:brightness-95 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      size: {
        sm: "h-8 rounded-lg px-3 text-sm",
        default: "h-9 rounded-lg px-4 text-sm",
        lg: "h-10 rounded-lg px-5 text-sm",
        icon: "size-9 rounded-lg",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

interface PrimaryButtonProps
  extends
    React.ComponentProps<"button">,
    VariantProps<typeof primaryButtonVariants> {
  asChild?: boolean;
}

export const PrimaryButton = ({
  className,
  size,
  asChild = false,
  children,
  ...props
}: PrimaryButtonProps) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="primary-button"
      className={cn(primaryButtonVariants({ size }), className)}
      {...props}
    >
      {children}
    </Comp>
  );
};
