import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/*
 * The app's primary action. It is deliberately squarer than the surrounding
 * cards and carries an inset sheen plus a soft lift (see `--button-primary-shadow`
 * in globals.css), so it reads as a physical button in both themes: near-black
 * in light mode, white in dark mode.
 */
const primaryButtonVariants = cva(
  "bg-primary text-primary-foreground shadow-button-primary inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 font-medium whitespace-nowrap transition-colors outline-none hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      size: {
        sm: "h-8 rounded-md px-3 text-sm",
        default: "h-9 rounded-md px-4 text-sm",
        lg: "h-10 rounded-md px-5 text-sm",
        icon: "size-9 rounded-md",
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
