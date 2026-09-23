"use client";

import { useState } from "react";
import {
  Search,
  Sparkles,
  MessageSquare,
  Clock,
  CornerDownLeft,
  Bot,
} from "lucide-react";

interface SearchCase {
  id: string;
  query: string;
  response: string;
  meetingName: string;
  speaker: string;
  timestamp: string;
  tag: string;
}

const searchCases: SearchCase[] = [
  {
    id: "budget",
    query: "What was the agreed budget cap for third-party API tooling?",
    response:
      "Avinash and Sarah capped the third-party API spend at $1,200/month for Q3, with Stream and OpenAI allocations prioritized.",
    meetingName: "Q3 Tooling & Infrastructure Sync",
    speaker: "Avinash Ankur",
    timestamp: "18:42",
    tag: "Budget & Finance",
  },
  {
    id: "deadline",
    query:
      "Who is responsible for the Webhook ngrok integration and what is the deadline?",
    response:
      "Avinash is assigned to wrap the ngrok webhook tunnels and Inngest event triggers by end of week.",
    meetingName: "Sprint Backlog & Integrations",
    speaker: "MeetMind AI",
    timestamp: "09:15",
    tag: "Sprint Planning",
  },
  {
    id: "client-objection",
    query: "What concerns did the client raise regarding data retention?",
    response:
      "The client requested confirmation that transcripts and audio streams are stored exclusively on private enterprise infrastructure with no AI model retraining.",
    meetingName: "Enterprise Customer Discovery Demo",
    speaker: "Prospective Client",
    timestamp: "31:04",
    tag: "Enterprise Sales",
  },
];

export const InteractiveMemoryExplorer = () => {
  const [selectedCase, setSelectedCase] = useState<SearchCase>(searchCases[0]);
  const [searchQuery, setSearchQuery] = useState<string>(searchCases[0].query);

  const selectCase = (c: SearchCase) => {
    setSelectedCase(c);
    setSearchQuery(c.query);
  };

  return (
    <section className="relative border-t border-zinc-200/80 bg-zinc-50/50 px-6 py-14 sm:py-20 dark:border-zinc-800/80 dark:bg-zinc-950">
      <div className="mx-auto w-full max-w-3xl">
        <div className="mx-auto max-w-xl text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/20 bg-indigo-50/70 px-2.5 py-0.5 text-[11px] font-medium text-indigo-700 dark:border-indigo-500/30 dark:bg-indigo-950/60 dark:text-indigo-300">
            <Sparkles className="size-3" />
            <span>Searchable Conversational Memory</span>
          </div>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-50">
            Ask your meeting history{" "}
            <span className="font-serif font-normal text-emerald-600 italic dark:text-emerald-400">
              anything
            </span>
            .
          </h2>
          <p className="mt-2 text-xs leading-relaxed text-zinc-500 sm:text-sm dark:text-zinc-400">
            Forget scanning 40-minute audio recordings. Type any question and
            MeetMind extracts exact answers, quotes, and timestamps instantly.
          </p>
        </div>

        {/* Command Palette Interactive Box - Scaled Down */}
        <div className="mt-8 overflow-hidden rounded-xl border border-zinc-200/90 bg-white shadow-lg shadow-zinc-900/5 dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-black/40">
          {/* Search Header */}
          <div className="flex items-center gap-2.5 border-b border-zinc-100 px-4 py-3 dark:border-zinc-800">
            <Search className="size-4 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ask anything about past discussions, decisions, or owners..."
              className="flex-1 bg-transparent text-xs font-medium text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-zinc-100"
            />
            <div className="flex items-center gap-1 rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[10px] text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
              <CornerDownLeft className="size-2.5" />
              <span>Enter</span>
            </div>
          </div>

          {/* Quick Query Pills */}
          <div className="flex flex-wrap items-center gap-1.5 border-b border-zinc-100 bg-zinc-50/60 px-4 py-2.5 dark:border-zinc-800 dark:bg-zinc-950/40">
            <span className="text-[10px] font-medium text-zinc-400">
              Suggested queries:
            </span>
            {searchCases.map((c) => (
              <button
                key={c.id}
                onClick={() => selectCase(c)}
                className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium transition-all ${
                  selectedCase.id === c.id
                    ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                    : "border border-zinc-200/80 bg-white text-zinc-600 hover:bg-zinc-200/60 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400"
                }`}
              >
                {c.tag}
              </button>
            ))}
          </div>

          {/* Query Response Content */}
          <div className="p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-emerald-600 text-white dark:bg-emerald-500">
                <Bot className="size-3.5" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-semibold text-zinc-900 dark:text-zinc-100">
                    MeetMind AI Response
                  </span>
                  <span className="py-0.2 rounded-full bg-emerald-50 px-1.5 text-[9px] font-medium text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                    Exact Match Found
                  </span>
                </div>

                <p className="mt-1.5 text-xs leading-relaxed text-zinc-700 sm:text-[13px] dark:text-zinc-300">
                  {selectedCase.response}
                </p>

                {/* Source Attribution Card */}
                <div className="mt-3.5 rounded-lg border border-zinc-200/80 bg-zinc-50/80 p-2.5 dark:border-zinc-800 dark:bg-zinc-800/40">
                  <div className="flex flex-col gap-1.5 text-[11px] sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-1.5">
                      <MessageSquare className="size-3 text-zinc-400" />
                      <span className="font-medium text-zinc-800 dark:text-zinc-200">
                        {selectedCase.meetingName}
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5 text-zinc-500 dark:text-zinc-400">
                      <span>
                        Speaker: <strong>{selectedCase.speaker}</strong>
                      </span>
                      <span className="flex items-center gap-1 font-mono">
                        <Clock className="size-2.5" />
                        {selectedCase.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
