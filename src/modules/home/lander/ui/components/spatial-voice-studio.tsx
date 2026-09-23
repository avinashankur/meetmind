"use client";

import { useState, useEffect } from "react";
import { Mic, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface VoiceQuery {
  id: string;
  tag: string;
  question: string;
  voiceText: string;
  insight: string;
  timestamp: string;
  frequency: number[];
}

const voiceQueries: VoiceQuery[] = [
  {
    id: "consensus",
    tag: "Architecture",
    question:
      "MeetMind, what was our final consensus on the database migration?",
    voiceText:
      "Sarah and Avinash agreed on Neon Serverless Postgres. The primary factor was zero-idle compute and instant DB branching for staging previews.",
    insight: "Neon Serverless approved • Cutover scheduled for Tuesday",
    timestamp: "14:22",
    frequency: [
      35, 60, 45, 75, 30, 65, 80, 40, 70, 50, 85, 60, 45, 75, 35, 65, 50,
    ],
  },
  {
    id: "actions",
    tag: "Sprint Sync",
    question: "Extract all deliverables committed by the team in this sync.",
    voiceText:
      "Avinash committed to shipping the WebRTC audio streaming hooks by Friday. Sarah will benchmark query latency against 10k concurrent sessions.",
    insight: "2 commitments tagged • Deadlines assigned",
    timestamp: "22:15",
    frequency: [
      25, 50, 75, 35, 60, 85, 65, 50, 70, 40, 75, 55, 30, 70, 55, 40, 60,
    ],
  },
  {
    id: "client-recap",
    tag: "Executive",
    question: "Draft a 1-sentence recap for the VP of Engineering.",
    voiceText:
      "We verified sub-250ms audio latency using OpenAI Realtime WebSockets; pilot deployment with 50 internal seats begins Monday.",
    insight: "Executive briefing ready to copy to Slack or email",
    timestamp: "38:40",
    frequency: [
      45, 60, 30, 70, 50, 80, 40, 65, 85, 60, 50, 75, 35, 60, 70, 50, 75,
    ],
  },
];

export const SpatialVoiceStudio = () => {
  const [activeQuery, setActiveQuery] = useState<VoiceQuery>(voiceQueries[0]);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(true);
  const [streamIndex, setStreamIndex] = useState<number>(100);

  // Restart streaming effect when prompt changes
  useEffect(() => {
    const interval = setInterval(() => {
      setStreamIndex((prev) => {
        if (prev >= activeQuery.voiceText.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 6;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [activeQuery]);

  return (
    <div className="relative mx-auto mt-8 w-full max-w-4xl">
      {/* Outer Spatial Glow Container - Scaled Down */}
      <div className="relative overflow-hidden rounded-2xl border border-zinc-200/80 bg-zinc-950 p-4 text-white shadow-xl shadow-zinc-950/15 sm:p-6 dark:border-zinc-800">
        {/* Background Ambient Radiance */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 -right-32 size-[350px] rounded-full bg-emerald-500/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -left-32 size-[350px] rounded-full bg-indigo-500/10 blur-3xl"
        />

        {/* Studio Top Control Strip */}
        <div className="relative z-10 flex flex-col gap-2.5 border-b border-zinc-800/80 pb-3.5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-emerald-500" />
            <span className="font-mono text-[11px] font-semibold tracking-wider text-zinc-300 uppercase">
              Spatial Voice Co-Pilot
            </span>
            <span className="rounded border border-zinc-800 bg-zinc-900 px-1.5 py-0.5 font-mono text-[9px] text-emerald-400">
              ⚡ 180ms
            </span>
          </div>

          {/* Interactive Voice Queries Selector */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="hidden text-[11px] text-zinc-500 sm:inline">
              Try speaking:
            </span>
            {voiceQueries.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveQuery(item);
                  setIsSpeaking(true);
                  setStreamIndex(0);
                }}
                className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium transition-all ${
                  activeQuery.id === item.id
                    ? "bg-white font-semibold text-zinc-950 shadow-xs"
                    : "border border-zinc-800 bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                }`}
              >
                {item.tag}
              </button>
            ))}
          </div>
        </div>

        {/* Spatial Audio Grid */}
        <div className="relative z-10 mt-5 grid grid-cols-1 items-center gap-6 lg:grid-cols-12">
          {/* Left: Compact Radiating AI Voice Orb (5 cols) */}
          <div className="flex flex-col items-center justify-center rounded-xl border border-zinc-900 bg-zinc-900/60 p-5 backdrop-blur-md lg:col-span-5">
            {/* The Compact Sphere */}
            <div className="relative flex size-20 items-center justify-center sm:size-24">
              <div
                className={`absolute inset-0 rounded-full border border-emerald-500/30 transition-all duration-700 ${
                  isSpeaking ? "scale-110 opacity-70" : "scale-100 opacity-20"
                }`}
              />
              <div
                className={`relative flex size-14 items-center justify-center rounded-full bg-gradient-to-tr from-emerald-500 via-teal-400 to-indigo-500 shadow-md transition-all duration-500 sm:size-16 ${
                  isSpeaking
                    ? "scale-105 shadow-emerald-500/40"
                    : "scale-95 opacity-80 shadow-zinc-950"
                }`}
              >
                <div className="flex size-10 items-center justify-center rounded-full bg-zinc-950/80 backdrop-blur-xs sm:size-12">
                  <Mic className="size-4.5 text-white transition-transform" />
                </div>
              </div>
            </div>

            {/* Compact Soundwave */}
            <div className="mt-4 flex h-6 w-full items-center justify-center gap-1 px-4">
              {activeQuery.frequency.map((val, idx) => (
                <span
                  key={idx}
                  style={{
                    height: isSpeaking ? `${Math.max(4, val * 0.24)}px` : "3px",
                    animationDelay: `${idx * 40}ms`,
                  }}
                  className={`w-0.5 rounded-full transition-all duration-150 ${
                    isSpeaking
                      ? "bg-gradient-to-t from-emerald-400 to-teal-200"
                      : "bg-zinc-800"
                  }`}
                />
              ))}
            </div>

            <div className="mt-2.5 flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-emerald-400" />
              <span className="font-mono text-[10px] text-zinc-400">
                {isSpeaking
                  ? "Active audio synthesis (OpenAI Realtime)"
                  : "Paused"}
              </span>
            </div>
          </div>

          {/* Right: Conversational Stream (7 cols) */}
          <div className="flex flex-col justify-between space-y-3.5 lg:col-span-7">
            {/* User Prompt Box */}
            <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-3.5 backdrop-blur-md">
              <div className="flex items-center justify-between text-[10px] text-zinc-500">
                <span className="font-mono tracking-wider text-zinc-400 uppercase">
                  Attendee Question
                </span>
                <span className="font-mono">{activeQuery.timestamp}</span>
              </div>
              <p className="mt-1 text-xs font-medium text-zinc-100">
                &ldquo;{activeQuery.question}&rdquo;
              </p>
            </div>

            {/* AI Realtime Voice Response */}
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-3.5 backdrop-blur-md">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400">
                <Sparkles className="size-3" />
                <span>MeetMind AI In-Call Answer</span>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-zinc-200">
                {activeQuery.voiceText.slice(0, streamIndex)}
                {streamIndex < activeQuery.voiceText.length && (
                  <span className="ml-0.5 inline-block h-3 w-1 bg-emerald-400" />
                )}
              </p>
            </div>

            {/* Auto-Extracted Instant Insight */}
            <div className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900/80 px-3 py-2 text-[11px]">
              <div className="flex items-center gap-2">
                <div className="size-1.5 rounded-full bg-emerald-400" />
                <span className="font-medium text-zinc-300">
                  {activeQuery.insight}
                </span>
              </div>
              <span className="font-mono text-[9px] tracking-wider text-zinc-500 uppercase">
                Auto-Tagged
              </span>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              <span className="text-[11px] text-zinc-400">
                Zero bot lag • Browser WebRTC
              </span>
              <Button
                asChild
                size="sm"
                className="h-7.5 rounded-full bg-white px-3.5 text-[11px] font-semibold text-zinc-950 hover:bg-zinc-200"
              >
                <Link href="/sign-up" className="flex items-center gap-1">
                  <span>Deploy In Your Call</span>
                  <ArrowRight className="size-3" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
