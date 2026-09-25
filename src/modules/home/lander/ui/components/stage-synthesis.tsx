"use client";

import React, { useState } from "react";
import { Check, ArrowRight, Cpu, FileText, Users } from "lucide-react";

export const StageSynthesis: React.FC = () => {
  const [checkedTasks, setCheckedTasks] = useState<{ [key: string]: boolean }>({
    "task-1": true,
    "task-2": false,
  });

  const toggleTask = (id: string) => {
    setCheckedTasks((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section
      id="synthesis"
      className="border-border bg-background text-foreground relative border-t py-20 lg:py-28"
    >
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-16">
        {/* Masthead */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <div className="text-brand inline-flex items-center gap-2 font-mono text-xs tracking-wider uppercase">
              <span className="bg-brand size-1.5 rounded-full" />
              <span>Automated Meeting Synthesis</span>
            </div>
            <div className="mt-2 flex flex-col gap-3 sm:gap-2 md:flex-row">
              <h2 className="text-primary text-3xl leading-tight font-normal tracking-tight sm:text-5xl">
                From conversation to{" "}
                <span className="text-brand">structured knowledge</span>.
              </h2>
              <p className="text-secondary max-w-md text-xs font-normal sm:text-sm">
                Inngest background workflows fetch transcripts, enrich speaker
                identities, and run GPT-4o to generate structured Overviews and
                Notes.
              </p>
            </div>
          </div>
        </div>

        {/* Unified Decision & Action Surface Plate */}
        <div className="border-border bg-card mt-12 rounded-2xl border p-6 shadow-sm backdrop-blur-sm sm:p-8">
          {/* Top Session Telemetry Bar */}
          <div className="border-border text-secondary flex flex-wrap items-center justify-between gap-4 border-b pb-4 font-mono text-xs">
            <div className="flex items-center gap-3">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              <span className="text-primary font-medium tracking-wider uppercase">
                SESSION // ARCHITECTURE & TOOLING SYNC
              </span>
              <span className="text-zinc-400 dark:text-zinc-600">|</span>
              <span>3 PARTICIPANTS • 42M RECORDING</span>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="bg-brand size-1.5 rounded-full" />
                <span className="text-brand">SYNTHESIZED VIA INNGEST</span>
              </div>
              <span className="text-zinc-400 dark:text-zinc-600">|</span>
              <span className="text-emerald-700 dark:text-emerald-400">
                MODEL: OPENAI GPT-4o
              </span>
            </div>
          </div>

          {/* 3-Column Deliverable Ledger directly on Paper */}
          <div className="divide-border border-border grid grid-cols-1 divide-y border-b py-8 md:grid-cols-3 md:divide-x md:divide-y-0">
            {/* Column 1: Executive Overview */}
            <div className="space-y-4 py-6 md:py-0 md:pr-8">
              <div className="flex items-center justify-between">
                <span className="text-secondary font-mono text-xs tracking-wider uppercase">
                  01 // Executive Overview
                </span>
                <span className="rounded bg-emerald-50 px-2 py-0.5 font-mono text-xs font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                  ### OVERVIEW
                </span>
              </div>

              <div>
                <h4 className="text-primary text-base font-medium">
                  Narrative Session Synthesis
                </h4>
                <p className="text-secondary mt-1.5 text-xs leading-relaxed font-normal">
                  The AI agent writes a detailed, engaging narrative of the
                  discussion, highlighting major features, architecture
                  consensus, and strategic decisions in full markdown format.
                </p>
              </div>

              <div className="border-border/50 text-secondary space-y-1 border-t pt-3 font-mono text-xs">
                <div className="flex items-center justify-between">
                  <span>MARKDOWN FORMAT</span>
                  <span className="text-zinc-700 dark:text-zinc-300">
                    POSTGRES STORED
                  </span>
                </div>
                <div className="text-xs text-zinc-400">
                  Persisted to Neon database for instant dashboard retrieval
                </div>
              </div>
            </div>

            {/* Column 2: Thematic Notes & Action Items */}
            <div className="space-y-4 py-6 md:px-8 md:py-0">
              <div className="flex items-center justify-between">
                <span className="text-secondary font-mono text-xs tracking-wider uppercase">
                  02 // Thematic Notes
                </span>
                <span className="font-mono text-xs text-zinc-400">
                  ### NOTES
                </span>
              </div>

              <div className="space-y-3">
                {/* Task 1 */}
                <div
                  onClick={() => toggleTask("task-1")}
                  className="group border-border flex cursor-pointer items-start gap-3 border-b py-2 transition-colors"
                >
                  <div
                    className={`mt-0.5 flex size-4 shrink-0 items-center justify-center rounded border transition-colors ${
                      checkedTasks["task-1"]
                        ? "border-brand bg-brand text-brand-foreground"
                        : "border-zinc-400 bg-white/50 dark:bg-zinc-800"
                    }`}
                  >
                    {checkedTasks["task-1"] && <Check className="size-3" />}
                  </div>
                  <div className="flex-1 text-xs">
                    <p
                      className={`font-medium ${checkedTasks["task-1"] ? "text-zinc-400 line-through" : "text-primary"}`}
                    >
                      Adopt Neon PostgreSQL with Drizzle schema
                    </p>
                    <div className="text-secondary mt-1 flex items-center gap-2 font-mono text-xs">
                      <span>@Avinash</span>
                      <span>•</span>
                      <span>18:42</span>
                      <span>•</span>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                        Consensus
                      </span>
                    </div>
                  </div>
                </div>

                {/* Task 2 */}
                <div
                  onClick={() => toggleTask("task-2")}
                  className="group flex cursor-pointer items-start gap-3 py-2 transition-colors"
                >
                  <div
                    className={`mt-0.5 flex size-4 shrink-0 items-center justify-center rounded border transition-colors ${
                      checkedTasks["task-2"]
                        ? "border-brand bg-brand text-brand-foreground"
                        : "border-zinc-400 bg-white/50 dark:bg-zinc-800"
                    }`}
                  >
                    {checkedTasks["task-2"] && <Check className="size-3" />}
                  </div>
                  <div className="flex-1 text-xs">
                    <p
                      className={`font-medium ${checkedTasks["task-2"] ? "text-zinc-400 line-through" : "text-primary"}`}
                    >
                      Verify Stream Video WebSockets audio stream
                    </p>
                    <div className="text-secondary mt-1 flex items-center gap-2 font-mono text-xs">
                      <span>@Sarah</span>
                      <span>•</span>
                      <span>31:14</span>
                      <span>•</span>
                      <span className="text-brand">Action Item</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-secondary pt-2 font-mono text-xs">
                <span>
                  Timestamped bullet breakdowns with attributed speakers
                </span>
              </div>
            </div>

            {/* Column 3: Inngest Pipeline */}
            <div className="space-y-4 py-6 md:py-0 md:pl-8">
              <div className="flex items-center justify-between">
                <span className="text-secondary font-mono text-xs tracking-wider uppercase">
                  03 // Processing Pipeline
                </span>
                <span className="font-mono text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                  BACKGROUND JOBS
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="flex items-start gap-2.5">
                  <FileText className="text-brand mt-0.5 size-3.5 shrink-0" />
                  <div>
                    <span className="text-primary font-medium">
                      1. Stream Webhook
                    </span>
                    <p className="text-secondary text-xs">
                      Transcript JSONL fetched automatically on call completion
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Users className="text-brand mt-0.5 size-3.5 shrink-0" />
                  <div>
                    <span className="text-primary font-medium">
                      2. Speaker Attribution
                    </span>
                    <p className="text-secondary text-xs">
                      Enriches raw speaker IDs with user & agent database
                      records
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Cpu className="text-brand mt-0.5 size-3.5 shrink-0" />
                  <div>
                    <span className="text-primary font-medium">
                      3. GPT-4o Summarization
                    </span>
                    <p className="text-secondary text-xs">
                      Inngest agent generates structured Overview & Notes
                      markdown
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Micro Telemetry Footer */}
          <div className="text-secondary flex flex-wrap items-center justify-between gap-4 pt-4 font-mono text-xs">
            <div className="flex items-center gap-3">
              <span>WORKFLOW: INNGEST STEP-FUNCTIONS</span>
              <span>•</span>
              <span>DATABASE: NEON POSTGRESQL</span>
              <span>•</span>
              <span>AI AGENTS: GPT-4o</span>
            </div>
            <div className="text-brand flex items-center gap-1.5">
              <span>STATUS: AUTOMATICALLY COMPLETED</span>
              <ArrowRight className="size-3" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
