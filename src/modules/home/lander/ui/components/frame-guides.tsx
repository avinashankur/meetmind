import { cn } from "@/lib/utils";

// Hairline "blueprint" guides along the edges of the centered content frame.
// The frame is a `max-w-6xl` column inset from the viewport by `px-3.5 md:px-6`.

const frameInsetClassName = "px-3.5 md:px-6";

/** Small "+" mark placed where two guides intersect. */
export const Crosshair = ({
  side,
  className,
}: {
  side: "left" | "right";
  className?: string;
}) => (
  <svg
    viewBox="-6 -6 12 12"
    aria-hidden="true"
    className={cn(
      "pointer-events-none absolute size-3 -translate-x-1/2 -translate-y-1/2 text-blue-900/50",
      side === "left" ? "left-[0.5px]" : "left-[calc(100%-0.5px)]",
      className,
    )}
  >
    <line
      x1="-5.5"
      y1="0"
      x2="5.5"
      y2="0"
      stroke="currentColor"
      strokeWidth="1"
      shapeRendering="crispEdges"
    />
    <line
      x1="0"
      y1="-5.5"
      x2="0"
      y2="5.5"
      stroke="currentColor"
      strokeWidth="1"
      shapeRendering="crispEdges"
    />
  </svg>
);

/**
 * Vertical guides on both frame edges, spanning the parent's height.
 * Children are positioned relative to the frame box (e.g. crosshairs).
 */
export const FrameEdges = ({ children }: { children?: React.ReactNode }) => (
  <div
    aria-hidden="true"
    className={cn("pointer-events-none absolute inset-0", frameInsetClassName)}
  >
    <div className="relative mx-auto h-full max-w-6xl">
      <span className="pointer-events-none absolute inset-y-0 left-0 w-px bg-blue-900/15" />
      <span className="pointer-events-none absolute inset-y-0 right-0 w-px bg-blue-900/15" />
      {children}
    </div>
  </div>
);

/** Full-bleed horizontal rule with crosshairs where it meets the frame. */
export const FrameDivider = () => (
  <div aria-hidden="true" className="relative h-px w-full bg-blue-900/15">
    <div className={frameInsetClassName}>
      <div className="relative mx-auto max-w-6xl">
        <Crosshair side="left" className="top-[0.5px]" />
        <Crosshair side="right" className="top-[0.5px]" />
      </div>
    </div>
  </div>
);

/** Centered content column that lines up with the frame guides. */
export const FrameWrap = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <div className={frameInsetClassName}>
    <div className={cn("relative mx-auto max-w-6xl px-7", className)}>
      {children}
    </div>
  </div>
);
