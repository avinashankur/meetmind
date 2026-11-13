import { cn } from "@/lib/utils";
import { Reveal } from "./motion/reveal";

/** Italic serif emphasis used inside headings. */
export const TitleAccent = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <em
    className={cn(
      "font-playfair font-medium tracking-normal text-blue-600 italic",
      className,
    )}
  >
    {children}
  </em>
);

interface SectionHeaderProps {
  label: string;
  title?: React.ReactNode;
  /** Content aligned to the bottom-right of the title (copy, controls…). */
  aside?: React.ReactNode;
  className?: string;
}

export const SectionHeader = ({
  label,
  title,
  aside,
  className,
}: SectionHeaderProps) => (
  <Reveal className={cn("mb-11", className)}>
    <header>
      <span className="font-playfair block text-sm font-medium text-slate-900 italic">
        | {label} |
      </span>
      {title && (
        <div className="mt-5 flex flex-col items-start gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <h2 className="font-tight max-w-3xl text-4xl leading-tight font-semibold tracking-tighter text-slate-900 md:text-5xl xl:text-6xl">
            {title}
          </h2>
          {aside && <div className="flex-none">{aside}</div>}
        </div>
      )}
    </header>
  </Reveal>
);

/** Muted paragraph that sits in a section header's `aside`. */
export const SectionAsideCopy = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <p className="max-w-sm text-base leading-relaxed text-slate-600">
    {children}
  </p>
);
