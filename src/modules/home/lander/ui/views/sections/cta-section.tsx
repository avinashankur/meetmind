import Link from "next/link";
import { ArrowRight, Sparkles, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CtaSection = () => {
  return (
    <section className="relative overflow-hidden border-t border-zinc-200/80 bg-gradient-to-b from-zinc-50 to-zinc-100/80 px-6 py-14 sm:py-20 dark:border-zinc-800/80 dark:from-zinc-950 dark:to-zinc-900/50">
      {/* Background Subtle Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center opacity-30 dark:opacity-10"
      >
        <div className="h-[250px] w-[450px] rounded-full bg-emerald-300 blur-3xl dark:bg-emerald-900" />
      </div>

      <div className="mx-auto max-w-2xl text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-white/80 px-3 py-1 text-[11px] font-medium text-emerald-800 shadow-2xs backdrop-blur-xs dark:border-emerald-500/30 dark:bg-zinc-900/80 dark:text-emerald-300">
          <Sparkles className="size-3" />
          <span>Get Started Today</span>
        </div>

        <h2 className="mt-4 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-50">
          Make every conversation{" "}
          <span className="font-serif font-normal text-emerald-600 italic dark:text-emerald-400">
            actionable
          </span>
          .
        </h2>

        <p className="mx-auto mt-2.5 max-w-md text-xs leading-relaxed text-zinc-500 sm:text-sm dark:text-zinc-400">
          Join teams who never lose a meeting decision again. Create your custom
          AI agent and conduct your first call in seconds.
        </p>

        <div className="mt-6 flex flex-col items-center justify-center gap-2.5 sm:flex-row">
          <Button
            asChild
            size="sm"
            className="h-9 rounded-full px-5 text-xs font-semibold shadow-xs"
          >
            <Link href="/sign-up" className="flex items-center gap-1.5">
              <span>Create Free Account</span>
              <ArrowRight className="size-3" />
            </Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="h-9 rounded-full px-4 text-xs font-medium hover:bg-zinc-200/60 dark:hover:bg-zinc-800"
          >
            <Link href="/sign-in">Sign In to Existing Account</Link>
          </Button>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[11px] text-zinc-400">
          <span className="flex items-center gap-1">
            <Check className="size-3 text-emerald-600 dark:text-emerald-400" />
            No credit card needed
          </span>
          <span className="text-zinc-300 dark:text-zinc-700">•</span>
          <span className="flex items-center gap-1">
            <Check className="size-3 text-emerald-600 dark:text-emerald-400" />
            Instant browser onboarding
          </span>
          <span className="text-zinc-300 dark:text-zinc-700">•</span>
          <span className="flex items-center gap-1">
            <Check className="size-3 text-emerald-600 dark:text-emerald-400" />
            Unlimited meeting memory
          </span>
        </div>
      </div>
    </section>
  );
};
