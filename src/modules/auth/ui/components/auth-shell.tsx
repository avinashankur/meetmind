import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { TitleAccent } from "@/modules/home/lander/ui/components/section-header";
import { SparkleTile } from "@/modules/home/lander/ui/components/brand-logo";
import type { AuthPageCopy } from "@/modules/auth/constants";
import { AUTH_NAV, AUTH_ROUTES } from "@/modules/auth/constants";

const authShellVariants = cva(
  "mx-auto w-full rounded-4xl border border-white/60 bg-white/25 p-2 shadow-2xl inset-shadow-xs shadow-blue-900/30 inset-shadow-white/50 backdrop-blur-md",
  {
    variants: {
      size: {
        /** Short forms (sign-in). */
        md: "max-w-md",
        /** Longer forms (sign-up): wider so fields can pair up in a row. */
        lg: "max-w-xl",
      },
    },
    defaultVariants: { size: "md" },
  },
);

interface AuthShellProps extends VariantProps<typeof authShellVariants> {
  copy: AuthPageCopy;
  /** Href of the other auth page, linked from the card footer. */
  switchHref: string;
  children: React.ReactNode;
}

/**
 * The auth card: a frosted glass frame around a white panel, floating on the
 * sky layout. Sign-in and sign-up differ only in width, copy and fields.
 * Vertical spacing is deliberately tight so the card fits the viewport without
 * scrolling.
 */
export const AuthShell = ({
  copy,
  switchHref,
  size,
  children,
}: AuthShellProps) => {
  const compact = size === "lg";

  return (
    <div className={authShellVariants({ size })}>
      <div className="overflow-hidden rounded-3xl bg-white ring-1 ring-slate-900/10">
        <div
          className={cn(
            "px-6 sm:px-8",
            compact ? "pt-4 pb-4 sm:px-10" : "pt-5 pb-5",
          )}
        >
          <header className={cn("text-center", compact ? "mb-4" : "mb-5")}>
            <Link
              href={AUTH_ROUTES.home}
              aria-label={AUTH_NAV.backHome}
              className={cn(
                "mx-auto block w-fit rounded-lg transition-transform duration-300 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-900",
                compact ? "mb-3" : "mb-4",
              )}
            >
              <SparkleTile size="lg" className="block" />
            </Link>
            <h1 className="font-tight text-3xl leading-tight font-semibold tracking-tight text-slate-900">
              {copy.title} <TitleAccent>{copy.titleAccent}</TitleAccent>
            </h1>
            <p className="mt-1.5 text-sm text-slate-500">{copy.description}</p>
          </header>

          {children}
        </div>

        <p className="border-t border-slate-100 bg-slate-50 px-6 py-3 text-center text-sm text-slate-600">
          {copy.switchPrompt}{" "}
          <Link
            href={switchHref}
            className="font-medium text-blue-600 transition-colors duration-300 hover:text-blue-700 hover:underline"
          >
            {copy.switchAction}
          </Link>
        </p>
      </div>
    </div>
  );
};
