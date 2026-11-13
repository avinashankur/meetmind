import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { SkyCard } from "../sky-card";

const deckCardVariants = cva(
  // Cards are bottom-anchored to the hero and sink below the cloud bank; the
  // side cards fan out from the center card.
  "absolute -bottom-60 left-1/2 -ml-26 h-104 w-52 origin-bottom lg:-ml-30 lg:w-60 xl:-bottom-48 xl:-ml-32 xl:w-64",
  {
    variants: {
      position: {
        // Inner-edge padding keeps content clear of the overlapping center card.
        left: "z-20 -translate-x-4/5 translate-y-6 -rotate-6 pr-8",
        center: "z-30",
        right: "z-20 translate-x-4/5 translate-y-6 rotate-6 pl-8",
      },
    },
  },
);

interface DeckCardProps extends VariantProps<typeof deckCardVariants> {
  className?: string;
  children: React.ReactNode;
}

/** A `SkyCard` positioned in the hero's fanned card deck. */
export const DeckCard = ({ position, className, children }: DeckCardProps) => (
  <SkyCard className={cn(deckCardVariants({ position }), className)}>
    {children}
  </SkyCard>
);
