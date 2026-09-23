import { Bot, Video, FileText, MessageSquare, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const HowItWorksSection = () => {
  const steps = [
    {
      step: "01",
      title: "Configure Agent Directives",
      description:
        "Define custom instructions for your AI teammate: specify tone, domain expertise, and participation guidelines.",
      icon: <Bot className="size-3.5 text-emerald-600 dark:text-emerald-400" />,
    },
    {
      step: "02",
      title: "Live Video & Voice Co-Pilot",
      description:
        "Launch your room with crystal-clear WebRTC video. Your AI agent speaks with low latency when prompted.",
      icon: <Video className="size-3.5 text-indigo-600 dark:text-indigo-400" />,
    },
    {
      step: "03",
      title: "Automated Synthesis",
      description:
        "The moment the call ends, Inngest jobs generate a formatted executive brief, speaker transcript, and action matrix.",
      icon: (
        <FileText className="size-3.5 text-amber-600 dark:text-amber-400" />
      ),
    },
    {
      step: "04",
      title: "Lifelong Searchable Memory",
      description:
        "Return anytime to query past decisions, draft follow-up communications, and retrieve exact timestamps.",
      icon: (
        <MessageSquare className="size-3.5 text-purple-600 dark:text-purple-400" />
      ),
    },
  ];

  return (
    <section
      id="how-it-works"
      className="border-t border-zinc-200/80 bg-white px-6 py-14 sm:py-20 dark:border-zinc-800/80 dark:bg-zinc-950"
    >
      <div className="mx-auto w-full max-w-5xl">
        {/* Section Header */}
        <div className="mx-auto max-w-xl text-center">
          <span className="text-[11px] font-semibold tracking-wider text-emerald-600 uppercase dark:text-emerald-400">
            Frictionless Architecture
          </span>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-50">
            From live voice to{" "}
            <span className="font-serif font-normal text-emerald-600 italic dark:text-emerald-400">
              permanent knowledge
            </span>
            .
          </h2>
          <p className="mt-2 text-xs leading-relaxed text-zinc-500 sm:text-sm dark:text-zinc-400">
            No complex installations, bot invites, or calendar permissions. Run
            meetings directly in your browser.
          </p>
        </div>

        {/* Fluid Connected Timeline - Scaled Down */}
        <div className="relative mt-12">
          {/* Horizontal connecting line on desktop */}
          <div className="absolute top-7 right-10 left-10 hidden h-px bg-gradient-to-r from-emerald-500/30 via-indigo-500/30 to-purple-500/30 lg:block" />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((item, idx) => (
              <div key={idx} className="relative flex flex-col pt-1">
                {/* Number node with icon */}
                <div className="flex items-center gap-2.5">
                  <div className="relative z-10 flex size-9 shrink-0 items-center justify-center rounded-xl border border-zinc-200 bg-white shadow-2xs dark:border-zinc-800 dark:bg-zinc-900">
                    {item.icon}
                  </div>
                  <span className="font-mono text-[10px] font-bold text-zinc-400 dark:text-zinc-600">
                    STEP {item.step}
                  </span>
                </div>

                {/* Content */}
                <div className="mt-3.5">
                  <h3 className="text-xs font-semibold text-zinc-900 sm:text-sm dark:text-zinc-100">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-[11px] leading-relaxed text-zinc-500 dark:text-zinc-400">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-10 flex justify-center">
          <Button
            asChild
            size="sm"
            className="h-8.5 rounded-full px-5 text-xs font-medium shadow-2xs"
          >
            <Link href="/sign-up" className="flex items-center gap-1.5">
              <span>Start Free Meeting</span>
              <ArrowRight className="size-3" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
