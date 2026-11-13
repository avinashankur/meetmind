import Image from "next/image";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import type { ActionItemTag } from "../../constants";

/**
 * Frosted "sky" product card: the visual signature of the landing page. Used
 * for the fanned hero deck and the how-it-works step previews.
 */
export const SkyCard = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <div
    className={cn(
      "relative isolate flex flex-col gap-3 overflow-hidden rounded-3xl border border-slate-900/15 bg-sky-100 px-4 pt-6 pb-5 text-left text-slate-900 shadow-2xl shadow-blue-900/40",
      className,
    )}
  >
    <Image
      src="/landing/card-bg.png"
      alt=""
      fill
      sizes="384px"
      className="-z-10 object-cover"
    />
    {children}
    {/* Frosted inner bezel */}
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 rounded-3xl border-8 border-white/55 ring-1 ring-slate-900/15"
    />
  </div>
);

interface SkyCardHeaderProps {
  eyebrow: string;
  title: string;
  chip?: React.ReactNode;
}

export const SkyCardHeader = ({ eyebrow, title, chip }: SkyCardHeaderProps) => (
  // On narrow cards the chip wraps below rather than squeezing the title.
  <div className="flex flex-wrap items-start justify-between gap-2">
    <div className="shrink-0">
      <small className="font-dm-mono mb-0.5 block text-xs font-semibold tracking-wider whitespace-nowrap text-slate-600 uppercase">
        {eyebrow}
      </small>
      <b className="font-tight text-xl leading-tight font-semibold tracking-tight whitespace-nowrap text-slate-900">
        {title}
      </b>
    </div>
    {chip}
  </div>
);

const skyChipVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold whitespace-nowrap shadow-sm backdrop-blur-sm",
  {
    variants: {
      tone: {
        info: "border-white/95 bg-white/80 text-blue-700",
        success: "border-emerald-200/80 bg-emerald-50/90 text-emerald-700",
      },
    },
    defaultVariants: { tone: "info" },
  },
);

export const SkyChip = ({
  tone,
  children,
}: VariantProps<typeof skyChipVariants> & { children: React.ReactNode }) => (
  <span className={skyChipVariants({ tone })}>{children}</span>
);

const tagToneClasses: Record<ActionItemTag, string> = {
  blue: "border-blue-200 bg-blue-50 text-blue-800",
  green: "border-green-200 bg-green-50 text-green-800",
  red: "border-red-200 bg-red-50 text-red-800",
  purple: "border-purple-200 bg-purple-50 text-purple-800",
};

/** Small colored label, e.g. a task category or a transcript annotation. */
export const SkyTag = ({
  tone,
  className,
  children,
}: {
  tone: ActionItemTag;
  className?: string;
  children: React.ReactNode;
}) => (
  <span
    className={cn(
      "rounded-full border px-2 py-0.5 text-xs font-semibold whitespace-nowrap",
      tagToneClasses[tone],
      className,
    )}
  >
    {children}
  </span>
);

/** Frosted white panel used for rows inside sky cards. */
export const GlassPanel = ({
  as: Comp = "div",
  className,
  children,
}: {
  as?: "div" | "ul";
  className?: string;
  children: React.ReactNode;
}) => (
  <Comp
    className={cn(
      "rounded-xl border border-white/95 bg-white/85 shadow-sm backdrop-blur-sm",
      className,
    )}
  >
    {children}
  </Comp>
);
