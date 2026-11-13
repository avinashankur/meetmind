import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { BrandLogo as BrandLogoBase, LogoMark } from "@/components/brand/logo";
import { cn } from "@/lib/utils";

const sparkleTileVariants = cva("inline-block align-middle", {
  variants: {
    size: {
      xs: "size-4 rounded-xs shadow-sm shadow-blue-600/40",
      sm: "size-6 rounded-sm shadow-md shadow-blue-600/35",
      lg: "size-9 rounded-lg shadow-md shadow-blue-600/40",
    },
  },
  defaultVariants: { size: "sm" },
});

interface SparkleTileProps extends VariantProps<typeof sparkleTileVariants> {
  className?: string;
}

/** The MeetMind mark, sized for inline use inside landing copy. */
export const SparkleTile = ({ size, className }: SparkleTileProps) => (
  <LogoMark className={cn(sparkleTileVariants({ size }), className)} />
);

type BrandLogoProps = ComponentProps<typeof BrandLogoBase>;

/** Landing brand lockup: the shared mark with the landing's tight wordmark. */
export const BrandLogo = ({ wordmarkClassName, ...props }: BrandLogoProps) => (
  <BrandLogoBase
    wordmarkClassName={cn("font-tight", wordmarkClassName)}
    {...props}
  />
);
