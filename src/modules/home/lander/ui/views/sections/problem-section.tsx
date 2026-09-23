import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const ProblemSection = () => {
  return (
    <section
      id="features"
      className="border-t border-zinc-200/80 bg-white px-6 py-14 sm:py-20 dark:border-zinc-800/80 dark:bg-zinc-950"
    >
      <div className="mx-auto w-full max-w-5xl">
        {/* Typographic Split Statement - Compact & High-Density */}
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          {/* Left: The Old Way (Muted & Crossed out) */}
          <div className="space-y-5 lg:col-span-5">
            <div>
              <span className="text-[11px] font-semibold tracking-wider text-rose-500 uppercase">
                The Legacy Way
              </span>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-100">
                What happens to{" "}
                <span className="font-serif font-normal text-zinc-400 italic dark:text-zinc-500">
                  most meetings
                </span>
                .
              </h2>
            </div>

            <div className="space-y-4 text-xs text-zinc-500 dark:text-zinc-400">
              <div className="border-l-2 border-zinc-200 pl-3 dark:border-zinc-800">
                <p className="font-medium text-zinc-400 line-through dark:text-zinc-500">
                  Scattered notes in three different tools
                </p>
                <p className="mt-0.5 text-[11px]">
                  Decisions get buried in DMs, forgotten in personal docs, or
                  lost forever.
                </p>
              </div>

              <div className="border-l-2 border-zinc-200 pl-3 dark:border-zinc-800">
                <p className="font-medium text-zinc-400 line-through dark:text-zinc-500">
                  Typing notes while pretending to listen
                </p>
                <p className="mt-0.5 text-[11px]">
                  The person taking notes can never fully contribute to the
                  brainstorm or negotiation.
                </p>
              </div>

              <div className="border-l-2 border-zinc-200 pl-3 dark:border-zinc-800">
                <p className="font-medium text-zinc-400 line-through dark:text-zinc-500">
                  Unclear ownership on action items
                </p>
                <p className="mt-0.5 text-[11px]">
                  Deliverables evaporate, creating endless status meetings just
                  to re-align.
                </p>
              </div>
            </div>
          </div>

          {/* Center Divider with Glow */}
          <div className="hidden lg:col-span-2 lg:flex lg:justify-center">
            <div className="h-44 w-px bg-gradient-to-b from-transparent via-emerald-500/40 to-transparent" />
          </div>

          {/* Right: The MeetMind Standard (Clean, Luminous, Empowering) */}
          <div className="space-y-5 lg:col-span-5">
            <div>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wider text-emerald-600 uppercase dark:text-emerald-400">
                <Sparkles className="size-3" />
                <span>The MeetMind Standard</span>
              </span>
              <h3 className="mt-2 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-50">
                Conversations turned into{" "}
                <span className="font-serif font-normal text-emerald-600 italic dark:text-emerald-400">
                  permanent intelligence
                </span>
                .
              </h3>
            </div>

            <div className="space-y-4 text-xs">
              <div className="border-l-2 border-emerald-500 pl-3">
                <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                  Real-time voice participation
                </p>
                <p className="mt-0.5 text-[11px] text-zinc-600 dark:text-zinc-400">
                  An AI teammate in the room that answers questions verbally,
                  fact-checks, and keeps momentum high.
                </p>
              </div>

              <div className="border-l-2 border-emerald-500 pl-3">
                <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                  Sub-5s structured executive briefs
                </p>
                <p className="mt-0.5 text-[11px] text-zinc-600 dark:text-zinc-400">
                  Formatted markdown briefs, core takeaways, and auto-tagged
                  deliverables ready to paste anywhere.
                </p>
              </div>

              <div className="border-l-2 border-emerald-500 pl-3">
                <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                  Queryable meeting memory forever
                </p>
                <p className="mt-0.5 text-[11px] text-zinc-600 dark:text-zinc-400">
                  Revisit any discussion months later and ask questions in plain
                  English to get immediate answers.
                </p>
              </div>
            </div>

            <div className="pt-1">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="h-8 rounded-full px-3.5 text-[11px] font-medium"
              >
                <Link href="/sign-up" className="flex items-center gap-1.5">
                  <span>Experience The Difference</span>
                  <ArrowRight className="size-3" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
