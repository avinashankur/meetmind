"use client";

import React, { useState } from "react";
import { Search, Clock, User, FileText, CheckCircle2 } from "lucide-react";

interface QueryCase {
  id: string;
  query: string;
  answer: string;
  meeting: string;
  speaker: string;
  timecode: string;
  confidence: string;
  tag: string;
}

const queryCases: QueryCase[] = [
  {
    id: "budget",
    query: "What was the agreed budget cap for third-party API tooling?",
    answer:
      "Avinash and Sarah capped third-party API spend at $1,200/month for Q3, prioritizing Stream and OpenAI allocations.",
    meeting: "Q3 Tooling & Infrastructure Sync",
    speaker: "Avinash Ankur",
    timecode: "18:42",
    confidence: "99.8%",
    tag: "Budget & Finance",
  },
  {
    id: "deployment",
    query: "What is the scheduled cutover time for the database migration?",
    answer:
      "Database connection cutover is finalized for Tuesday 09:00 UTC, with pre-release smoke tests verified by Sarah.",
    meeting: "Sprint 24 Architecture Review",
    speaker: "Sarah Chen",
    timecode: "31:14",
    confidence: "99.4%",
    tag: "Sprint Architecture",
  },
  {
    id: "retention",
    query:
      "What concerns did the enterprise client raise regarding data retention?",
    answer:
      "Client requested confirmation that audio streams and transcripts are encrypted under zero-retention policies with no model training.",
    meeting: "Enterprise Discovery Demo",
    speaker: "Prospective Client",
    timecode: "42:08",
    confidence: "98.9%",
    tag: "Enterprise Sales",
  },
];

export const StageMemory: React.FC = () => {
  const [activeCase, setActiveCase] = useState<QueryCase>(queryCases[0]);

  return (
    <section
      id="memory"
      className="border-border bg-background text-foreground relative border-t py-20 lg:py-28"
    >
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-16">
        {/* Masthead */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <div className="text-brand inline-flex items-center gap-2 font-mono text-xs tracking-wider uppercase">
              <span className="bg-brand size-1.5 rounded-full" />
              <span>Meeting Memory & Recall</span>
            </div>
            <div className="mt-2 flex flex-col gap-3 sm:gap-2 md:flex-row">
              <h2 className="text-primary text-3xl leading-tight font-normal tracking-tight sm:text-5xl">
                Total recall with{" "}
                <span className="text-brand">Ask AI & Transcripts</span>.
              </h2>
              <p className="text-secondary max-w-md text-xs font-normal sm:text-sm">
                Ask your AI agent follow-up questions in dedicated Stream Chat
                channels, review speaker-attributed transcripts, or replay 1080p
                recordings.
              </p>
            </div>
          </div>
        </div>

        {/* Unified Conversational Memory Surface Plate */}
        <div className="border-border bg-card mt-12 space-y-8 rounded-2xl border p-6 shadow-sm backdrop-blur-sm sm:p-8">
          {/* Seamless Interactive Query Strip */}
          <div className="border-border border-b pb-6">
            <div className="flex items-center gap-3">
              <Search className="text-brand size-4 shrink-0" />
              <div className="text-primary flex-1 font-mono text-base sm:text-lg">
                <span className="text-brand mr-2">&gt;</span>
                <span>{activeCase.query}</span>
                <span className="bg-brand ml-1 inline-block h-4 w-1.5 align-middle" />
              </div>
            </div>

            {/* Preset Query Filter Pills */}
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="text-secondary mr-2 font-mono text-xs tracking-wider uppercase">
                Preset Queries:
              </span>
              {queryCases.map((c) => {
                const isSelected = activeCase.id === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => {
                      setActiveCase(c);
                    }}
                    className={`cursor-pointer rounded-full px-3.5 py-1 font-mono text-xs transition-all ${
                      isSelected
                        ? "bg-primary text-primary-foreground font-medium shadow-xs"
                        : "border-border text-secondary hover:border-primary hover:text-primary border"
                    }`}
                  >
                    {c.tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Open Citation & Provenance Grid */}
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
            {/* Left: Verbatim Match & Audio Snippet (8 cols) */}
            <div className="space-y-6 lg:col-span-8">
              <div className="flex items-center gap-3 font-mono text-xs">
                <span className="rounded bg-emerald-50 px-2 py-0.5 font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                  ASK AI FOLLOW-UP CHAT
                </span>
                <span className="text-zinc-400 dark:text-zinc-600">•</span>
                <span className="text-secondary">
                  CONTEXT: MEETING SUMMARY + CHAT MEMORY
                </span>
              </div>

              <blockquote className="border-brand text-primary border-l-2 pl-6 text-lg leading-relaxed font-normal sm:text-2xl">
                &ldquo;{activeCase.answer}&rdquo;
              </blockquote>
            </div>

            {/* Right: Provenance Ledger (4 cols) */}
            <div className="border-border space-y-4 border-t pt-6 font-mono text-xs lg:col-span-4 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
              <span className="border-border text-secondary block border-b pb-2 text-xs tracking-wider uppercase">
                Source Provenance
              </span>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-2.5">
                  <FileText className="text-brand mt-0.5 size-3.5 shrink-0" />
                  <div>
                    <span className="block text-xs text-zinc-400 uppercase">
                      Meeting
                    </span>
                    <span className="text-primary font-medium">
                      {activeCase.meeting}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <User className="text-brand mt-0.5 size-3.5 shrink-0" />
                  <div>
                    <span className="block text-xs text-zinc-400 uppercase">
                      Speaker
                    </span>
                    <span className="text-primary font-medium">
                      {activeCase.speaker}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="text-brand mt-0.5 size-3.5 shrink-0" />
                  <div>
                    <span className="block text-xs text-zinc-400 uppercase">
                      Timecode
                    </span>
                    <span className="text-primary font-medium">
                      {activeCase.timecode} (WebRTC Stream)
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-border flex items-center gap-1.5 border-t pt-3 text-xs text-emerald-700 dark:text-emerald-400">
                <CheckCircle2 className="size-3" />
                <span>SPEAKER ATTRIBUTED & PERSISTED</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
