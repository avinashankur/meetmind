"use client";

import React, { useState, useEffect } from "react";
import { LedDots } from "./led-dots";

export const StageVoiceEngine: React.FC = () => {
  const [tick, setTick] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTick((t) => (t + 1) % 60);
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="voice-engine"
      className="border-border bg-background text-foreground relative border-t py-20 lg:py-28"
    >
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-16">
        {/* Masthead */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <div className="text-accent inline-flex items-center gap-2 font-mono text-xs tracking-wider uppercase">
              <span className="bg-accent size-1.5 rounded-full" />
              <span>Realtime Acoustic Pipeline</span>
            </div>
            <div className="mt-2 flex flex-col gap-3 sm:gap-2 md:flex-row">
              <h2 className="text-primary text-3xl leading-tight font-normal tracking-tight sm:text-5xl">
                Dialogue at <span className="text-accent">human cadence</span>.
              </h2>
              <p className="text-secondary max-w-md text-xs font-normal sm:text-sm">
                Stream Video connects natively to OpenAI Realtime API. Your
                custom AI agent joins the call as a live participant to listen
                and speak.
              </p>
            </div>
          </div>
        </div>

        {/* Unified Acoustic Deck Surface Plate */}
        <div className="border-border bg-card mt-12 rounded-2xl border p-6 shadow-sm backdrop-blur-sm sm:p-8">
          {/* Telemetry Status Strip */}
          <div className="border-border text-secondary flex flex-wrap items-center justify-between gap-4 border-b pb-4 font-mono text-xs">
            <div className="flex items-center gap-3">
              <span className="bg-accent flex size-1.5 rounded-full" />
              <span className="text-primary font-medium tracking-wider uppercase">
                WEBRTC OPUS DUPLEX
              </span>
              <span className="text-zinc-400 dark:text-zinc-600">|</span>
              <span>48,000 HZ • 24-BIT</span>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                <span>VAD: ACTIVE</span>
              </div>
              <span className="text-zinc-400 dark:text-zinc-600">|</span>
              <span>PACKET LOSS: 0.00%</span>
            </div>
          </div>

          {/* Open Audio Waveform Visualizer */}
          <div className="border-border relative my-4 border-b py-10">
            {/* Visualizer Legend & Gap Marker */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
              <div className="text-secondary flex items-center gap-2">
                <span className="bg-primary size-2 rounded-full" />
                <span className="tracking-wider uppercase">
                  Speaker Utterance
                </span>
              </div>

              <div className="border-accent/20 bg-accent/5 text-accent inline-flex items-center gap-2 rounded-full border px-3 py-1">
                <span className="bg-accent size-1.5 rounded-full" />
                <span className="font-medium tracking-wider uppercase">
                  184ms Turnaround Latency
                </span>
              </div>

              <div className="text-accent flex items-center gap-2">
                <span className="bg-accent size-2 rounded-full" />
                <span className="tracking-wider uppercase">
                  MeetMind AI Synthesis
                </span>
              </div>
            </div>

            {/* Continuous Dialogue Streamline SVG */}
            <div className="relative flex h-28 w-full items-center">
              {/* Subtle hairline amplitude guides */}
              <div className="pointer-events-none absolute inset-0 flex flex-col justify-between opacity-25">
                <div className="border-border w-full border-b border-dashed" />
                <div className="border-border/50 w-full border-b" />
                <div className="border-border w-full border-b border-dashed" />
              </div>

              {/* Latency Divider Marker */}
              <div className="border-accent/50 pointer-events-none absolute inset-y-0 left-1/2 flex -translate-x-1/2 flex-col items-center justify-between border-l border-dashed">
                <span className="text-accent -translate-y-2 font-mono text-xs tracking-wider uppercase">
                  Gap
                </span>
                <span className="text-accent translate-y-2 font-mono text-xs tracking-wider uppercase">
                  184ms
                </span>
              </div>

              <svg
                viewBox="0 0 1000 120"
                className="h-full w-full overflow-visible"
                preserveAspectRatio="none"
              >
                {/* Waveform 1: Human Speech (0 -> 460) */}
                <path
                  d={`M 0 60 Q 60 ${60 + Math.sin(tick * 0.35) * 35} 120 60 T 240 ${60 + Math.cos(tick * 0.4) * -30} T 360 ${60 + Math.sin(tick * 0.3) * 20} T 440 60 L 460 60`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  className="text-primary"
                />

                {/* Waveform 2: AI Response Stream (520 -> 1000) */}
                <path
                  d={`M 520 60 L 540 60 Q 600 ${60 + Math.cos(tick * 0.38) * 45} 680 60 T 800 ${60 + Math.sin(tick * 0.45) * -42} T 920 ${60 + Math.cos(tick * 0.3) * 35} T 1000 60`}
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="2.25"
                />
              </svg>
            </div>

            {/* Timecode Scale */}
            <div className="mt-4 flex items-center justify-between font-mono text-xs text-zinc-400 dark:text-zinc-600">
              <span>00:00.00</span>
              <span>00:05.00</span>
              <span className="text-accent">00:10.18</span>
              <span>00:15.00</span>
              <span>00:20.00</span>
            </div>
          </div>

          {/* 3-Column Architecture Ledger directly on Paper */}
          <div className="divide-border grid grid-cols-1 divide-y pt-4 md:grid-cols-3 md:divide-x md:divide-y-0">
            {/* Spec 1 */}
            <div className="py-6 md:py-0 md:pr-8">
              <span className="text-secondary font-mono text-xs tracking-wider uppercase">
                01 // Roundtrip Latency
              </span>
              <div className="text-primary mt-3 flex items-baseline gap-2 text-2xl font-semibold sm:text-3xl">
                <div className="text-accent w-16">
                  <LedDots value="184" />
                </div>
                <span className="text-secondary font-mono text-xs font-normal">
                  ms total
                </span>
              </div>
              <p className="text-secondary mt-2 text-xs leading-relaxed font-normal sm:text-sm">
                Sub-250ms conversational cadence. Eliminates awkward pauses in
                multi-speaker discussions.
              </p>
            </div>

            {/* Spec 2 */}
            <div className="py-6 md:px-8 md:py-0">
              <span className="text-secondary font-mono text-xs tracking-wider uppercase">
                02 // In-Session Host
              </span>
              <div className="text-primary mt-3 flex items-baseline gap-2 text-2xl font-semibold sm:text-3xl">
                <div className="text-accent w-10">
                  <LedDots value="0" />
                </div>
                <span className="text-secondary font-mono text-xs font-normal">
                  bot invites
                </span>
              </div>
              <p className="text-secondary mt-2 text-xs leading-relaxed font-normal sm:text-sm">
                Direct in-session WebRTC audio peer. No awkward lurker bots or
                calendar hijacking.
              </p>
            </div>

            {/* Spec 3 */}
            <div className="py-6 md:py-0 md:pl-8">
              <span className="text-secondary font-mono text-xs tracking-wider uppercase">
                03 // Acoustic Capture
              </span>
              <div className="text-primary mt-3 flex items-baseline gap-2 font-mono text-2xl font-semibold sm:text-3xl">
                48
                <span className="text-secondary ml-1 text-xs font-normal">
                  kHz Opus
                </span>
              </div>
              <p className="text-secondary mt-2 text-xs leading-relaxed font-normal sm:text-sm">
                Fullband studio audio capture with hardware-accelerated dynamic
                echo cancellation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
