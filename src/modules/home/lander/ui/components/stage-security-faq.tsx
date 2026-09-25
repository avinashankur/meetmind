"use client";

import React, { useState } from "react";
import { Shield, CheckCircle2, ChevronRight } from "lucide-react";

export const StageSecurityFaq: React.FC = () => {
  const [activeFaqIndex, setActiveFaqIndex] = useState<number>(0);

  const securityLedger = [
    {
      protocol: "SEC-01 // TRANSPORT",
      title: "TLS 1.3 / DTLS-SRTP Media Encryption",
      desc: "All WebRTC video, audio frames, and WebSocket packets encrypted end-to-end in transit and at rest.",
      status: "ENFORCED",
      statusColor: "text-emerald-500",
    },
    {
      protocol: "SEC-02 // PRIVACY",
      title: "Strict Zero-Model Retraining Policy",
      desc: "Proprietary meeting audio, code discussions, and transcripts are never utilized to train AI models.",
      status: "POLICY LOCKED",
      statusColor: "text-brand",
    },
    {
      protocol: "SEC-03 // TENANCY",
      title: "Row-Level Neon PostgreSQL Isolation",
      desc: "Database records locked to cryptographic authenticated workspace session tokens.",
      status: "ISOLATED",
      statusColor: "text-emerald-500",
    },
    {
      protocol: "SEC-04 // LIFECYCLE",
      title: "1-Click Irreversible Database Purge",
      desc: "Immediate cryptographic cascade deletion across primary Neon databases and storage replicas.",
      status: "PURGE READY",
      statusColor: "text-zinc-400",
    },
  ];

  const faqs = [
    {
      id: "media-protection",
      category: "STREAM ENCRYPTION",
      question: "How does MeetMind protect audio and video streams?",
      answer:
        "Audio and video streams are transmitted through Stream's enterprise edge network with end-to-end TLS 1.3 encryption. Real-time reasoning runs via private enterprise OpenAI Realtime API endpoints under strict zero-retention agreements.",
      spec: "RFC 8446 / AES-256",
    },
    {
      id: "model-training",
      category: "DATA TRAINING",
      question: "Is customer meeting data used to train any AI models?",
      answer:
        "No. Enterprise contractual agreements strictly prohibit OpenAI and Stream from utilizing any customer meeting audio, transcripts, or notes for training public or internal foundational models.",
      spec: "Zero-Retention Enterprise SLA",
    },
    {
      id: "agent-directives",
      category: "WORKSPACE AGENTS",
      question: "How do custom agent instructions and directives work?",
      answer:
        "Each agent you configure receives a private system prompt defining its persona, tone, and domain rules. Directives are encrypted and strictly scoped to your authenticated workspace.",
      spec: "Row-Level Policy Isolation",
    },
    {
      id: "data-purge",
      category: "RETENTION & DELETION",
      question: "Can I permanently purge past transcripts and recordings?",
      answer:
        "Yes. Deleting a meeting or agent executes an immediate, irreversible cascade purge across our Neon PostgreSQL database and connected storage replicas within seconds.",
      spec: "Instant Cascade Purge",
    },
  ];

  return (
    <section
      id="security"
      className="border-border bg-background text-foreground relative border-t py-20 lg:py-28"
    >
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-16">
        {/* Masthead */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <div className="text-brand inline-flex items-center gap-2 font-mono text-xs tracking-wider uppercase">
              <Shield className="text-brand size-3" />
              <span>Zero-Trust Architecture</span>
            </div>
            <div className="mt-2 flex flex-col gap-3 sm:gap-2 md:flex-row">
              <h2 className="text-primary text-3xl leading-tight font-normal tracking-tight sm:text-5xl">
                Private <span className="text-brand">architecture</span> by
                default.
              </h2>
              <p className="text-secondary max-w-md text-xs font-normal sm:text-sm">
                Zero-trust security and end-to-end media encryption enforced by
                default.
              </p>
            </div>
          </div>
        </div>

        {/* Cryptographic Security Ledger (Unified Surface Plate) */}
        <div className="border-border bg-card mt-12 rounded-2xl border p-6 shadow-sm backdrop-blur-sm sm:p-8">
          <div className="border-border text-secondary flex items-center justify-between border-b pb-4 font-mono text-xs">
            <span className="text-primary font-semibold tracking-wider uppercase">
              CRYPTOGRAPHIC DEFENSE LEDGER
            </span>
            <span className="text-brand">ALL PROTOCOLS ACTIVE</span>
          </div>

          <div className="divide-border divide-y">
            {securityLedger.map((row, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between gap-3 py-5 sm:flex-row sm:items-center"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
                    <span>{row.protocol}</span>
                  </div>
                  <h3 className="text-primary text-sm font-semibold">
                    {row.title}
                  </h3>
                  <p className="text-secondary max-w-xl text-xs">{row.desc}</p>
                </div>

                <div className="shrink-0 sm:text-right">
                  <span
                    className={`inline-flex items-center gap-1.5 font-mono text-xs font-bold ${row.statusColor}`}
                  >
                    <span className="size-1.5 rounded-full bg-current" />
                    {row.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Disclosure / Interactive FAQ Deck */}
        <div id="faq" className="border-border mt-16 border-t pt-12">
          <div className="mb-8">
            <span className="text-brand font-mono text-xs tracking-wider uppercase">
              SPECIFICATIONS & FAQ
            </span>
            <h3 className="text-primary mt-1 text-2xl font-normal tracking-tight sm:text-3xl">
              Technical disclosures.
            </h3>
          </div>

          {/* Interactive Disclosure Grid (Open on Paper Canvas) */}
          <div className="mt-8 grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
            {/* Left Column: Questions Navigation (5 cols) */}
            <div className="space-y-2 lg:col-span-5">
              {faqs.map((f, idx) => {
                const isActive = activeFaqIndex === idx;
                return (
                  <button
                    key={f.id}
                    onClick={() => setActiveFaqIndex(idx)}
                    className={`flex w-full cursor-pointer items-center justify-between rounded-xl border p-3.5 text-left transition-all ${
                      isActive
                        ? "border-primary bg-primary text-primary-foreground font-semibold shadow-xs"
                        : "border-border text-secondary hover:border-border/60 bg-transparent"
                    }`}
                  >
                    <div>
                      <span
                        className={`block font-mono text-xs tracking-wider uppercase ${isActive ? "text-brand" : "text-zinc-400"}`}
                      >
                        {f.category}
                      </span>
                      <span className="mt-0.5 block text-xs font-medium sm:text-sm">
                        {f.question}
                      </span>
                    </div>
                    <ChevronRight
                      className={`size-4 shrink-0 transition-transform ${isActive ? "translate-x-1" : "opacity-40"}`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Right Column: Verified Technical Disclosure (7 cols) on Paper Canvas */}
            <div className="border-border flex min-h-64 flex-col justify-between border-t pt-6 lg:col-span-7 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
              <div>
                <div className="border-border text-secondary flex items-center justify-between border-b pb-3 font-mono text-xs">
                  <span className="text-brand uppercase">
                    {faqs[activeFaqIndex].category}
                  </span>
                  <span>STANDARD: {faqs[activeFaqIndex].spec}</span>
                </div>

                <h4 className="text-primary mt-4 text-base font-semibold sm:text-lg">
                  {faqs[activeFaqIndex].question}
                </h4>

                <p className="text-secondary mt-3 text-xs leading-relaxed sm:text-sm">
                  {faqs[activeFaqIndex].answer}
                </p>
              </div>

              <div className="border-border text-secondary mt-6 flex items-center justify-between border-t pt-4 font-mono text-xs">
                <div className="flex items-center gap-1.5 font-semibold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="size-3.5" />
                  <span>CONTRACTUALLY GUARANTEED</span>
                </div>
                <span>AUDITED Q3 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
