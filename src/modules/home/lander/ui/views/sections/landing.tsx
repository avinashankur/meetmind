import Link from "next/link";
import { ArrowRight, Check, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SpatialVoiceStudio } from "../../components/spatial-voice-studio";

export const LandingSection = () => {
  return (
    <section className="relative overflow-hidden bg-white pt-10 pb-16 sm:pt-14 sm:pb-20 dark:bg-zinc-950">
      {/* Subtle Ambient Light */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 flex items-start justify-center opacity-50 dark:opacity-20"
      >
        <div className="h-[400px] w-full max-w-5xl rounded-full bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-emerald-100/60 via-zinc-50 to-transparent blur-3xl dark:from-emerald-950/30 dark:via-zinc-950 dark:to-transparent" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200/80 bg-zinc-50/80 px-3 py-1 text-[11px] font-medium text-zinc-800 shadow-2xs backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-200">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            <span className="font-mono text-zinc-400 dark:text-zinc-500">
              v2.4
            </span>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <span>Spatial Voice AI for Video Meetings</span>
            <Zap className="size-2.5 text-emerald-600 dark:text-emerald-400" />
          </div>

          {/* Compact, Refined Headline */}
          <h1 className="mt-5 text-3xl leading-[1.08] font-bold tracking-tight text-zinc-950 sm:text-5xl lg:text-5xl dark:text-white">
            <span className="font-display font-extrabold tracking-tight">
              The intelligence
            </span>{" "}
            <br />
            <span className="font-serif font-normal text-emerald-600 italic dark:text-emerald-400">
              inside the room
            </span>
            .
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-3.5 max-w-lg text-xs leading-relaxed text-zinc-500 sm:text-sm dark:text-zinc-400">
            MeetMind puts custom AI teammates directly into your video calls.
            They listen, respond verbally in real time, transcribe with zero
            latency, and turn discussions into permanent knowledge.
          </p>

          {/* Action Row */}
          <div className="mt-6 flex flex-col items-center justify-center gap-2.5 sm:flex-row sm:gap-3">
            <Button
              asChild
              size="sm"
              className="h-9 rounded-full px-5 text-xs font-semibold shadow-xs"
            >
              <Link href="/sign-up" className="flex items-center gap-1.5">
                <span>Start Free Meeting</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="dark:hover:bg-zinc-850 h-9 rounded-full border-zinc-200 px-4 text-xs font-medium hover:bg-zinc-100 dark:border-zinc-800"
            >
              <a href="#how-it-works">How It Works</a>
            </Button>
          </div>

          {/* Technical Telemetry Badges */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[11px] text-zinc-400">
            <span className="flex items-center gap-1 font-mono">
              <Check className="size-3 text-emerald-600 dark:text-emerald-400" />
              OpenAI Realtime WebRTC
            </span>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <span className="flex items-center gap-1 font-mono">
              <Check className="size-3 text-emerald-600 dark:text-emerald-400" />
              180ms Roundtrip Voice
            </span>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <span className="flex items-center gap-1 font-mono">
              <Check className="size-3 text-emerald-600 dark:text-emerald-400" />
              Zero AI Model Training
            </span>
          </div>
        </div>

        {/* Spatial Voice Studio Showcase */}
        <SpatialVoiceStudio />
      </div>
    </section>
  );
};
