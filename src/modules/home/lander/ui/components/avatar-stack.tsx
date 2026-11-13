import { cn } from "@/lib/utils";
import type { AvatarItem } from "../../constants";

interface AvatarStackProps {
  items: AvatarItem[];
  /** Size, border and overlap classes applied to every avatar. */
  avatarClassName?: string;
  className?: string;
  children?: React.ReactNode;
}

/** Overlapping row of initials avatars, with optional trailing caption. */
export const AvatarStack = ({
  items,
  avatarClassName,
  className,
  children,
}: AvatarStackProps) => (
  <div className={cn("flex items-center", className)}>
    {items.map((item) => (
      <span
        key={item.label}
        className={cn(
          "grid place-items-center rounded-full border-white font-semibold text-white first:ml-0",
          item.className,
          avatarClassName,
        )}
      >
        {item.label}
      </span>
    ))}
    {children}
  </div>
);
