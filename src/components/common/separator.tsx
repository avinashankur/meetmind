import React from "react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils"; 

interface SeparatorProps {
  children?: React.ReactNode;
  orientation?: "horizontal" | "vertical";
  className?: string;
  textClassName?: string;
}

export function SeparatorPro({
  children,
  orientation = "horizontal",
  className,
  textClassName,
}: SeparatorProps) {
  const isHorizontal = orientation === "horizontal";

  return (
    <div
      className={cn(
        "flex items-center",
        isHorizontal ? "w-full flex-row" : "h-full flex-col",
        className
      )}
    >
      {/* First Line Segment */}
      <Separator
        orientation={orientation}
        className={cn("shrink-0 flex-1", isHorizontal ? "" : "w-px")}
      />

      {/* Optional Text */}
      {children && (
        <span
          className={cn(
            "text-xs text-muted-foreground font-medium",
            isHorizontal ? "mx-3 whitespace-nowrap" : "my-3 py-1",
            textClassName
          )}
        >
          {children}
        </span>
      )}

      {/* Second Line Segment */}
      <Separator
        orientation={orientation}
        className={cn("shrink-0 flex-1", isHorizontal ? "" : "w-px")}
      />
    </div>
  );
}