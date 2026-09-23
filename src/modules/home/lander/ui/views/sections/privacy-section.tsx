import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Shield, Lock, EyeOff, KeyRound, Trash2 } from "lucide-react";

export const PrivacySection = () => {
  const trustPillars = [
    {
      icon: (
        <Lock className="size-3.5 text-emerald-600 dark:text-emerald-400" />
      ),
      title: "TLS 1.3 Encryption",
      description:
        "All WebRTC video, audio streams, and transcripts are encrypted in transit and at rest.",
    },
    {
      icon: (
        <EyeOff className="size-3.5 text-emerald-600 dark:text-emerald-400" />
      ),
      title: "Zero Model Retraining",
      description:
        "Customer meeting discussions are never utilized to train base AI models.",
    },
    {
      icon: (
        <KeyRound className="size-3.5 text-emerald-600 dark:text-emerald-400" />
      ),
      title: "Isolated Account DBs",
      description:
        "Strict row-level tenant authorization enforced via Better Auth & OAuth sessions.",
    },
    {
      icon: (
        <Trash2 className="size-3.5 text-emerald-600 dark:text-emerald-400" />
      ),
      title: "1-Click Permanent Deletion",
      description:
        "Delete individual meetings or entire agent workspaces with immediate full data purge.",
    },
  ];

  const faqs = [
    {
      id: "data-collected",
      question: "What data does MeetMind collect during a meeting?",
      answer:
        "When you host a session, MeetMind processes the audio and video stream to generate a live transcript, recording, and an AI executive summary. Only the meeting metadata, transcript text, summary points, and action items are saved directly to your account.",
    },
    {
      id: "ai-training",
      question:
        "Does MeetMind or OpenAI use my meeting data to train AI models?",
      answer:
        "No. MeetMind processes your data via enterprise APIs provided by OpenAI and Stream. Under enterprise API terms, customer inputs and transcriptions are strictly isolated and never used to train base AI models.",
    },
    {
      id: "data-storage",
      question: "Where is my meeting data stored?",
      answer:
        "Your account settings, agent prompt instructions, and meeting records are stored in PostgreSQL on Neon Database. Transcripts and recordings are managed via Stream's global edge infrastructure.",
    },
    {
      id: "agent-customization",
      question: "How do custom AI agent instructions work?",
      answer:
        "When you create an agent, you define custom behavior rules (e.g. 'Act as a technical lead, focus on architecture questions, keep answers under 2 sentences'). These instructions are private to your workspace and guide the agent during live calls and post-meeting chats.",
    },
    {
      id: "access-control",
      question: "Who can access my meetings and transcripts?",
      answer:
        "Only users authenticated into your account can view your meetings, transcripts, and AI summaries. All API routes are protected with cryptographic session validation.",
    },
    {
      id: "deletion",
      question: "Can I permanently delete my meetings and agents?",
      answer:
        "Yes. Deleting a meeting or agent from your dashboard permanently deletes the associated database record and summaries from MeetMind immediately.",
    },
  ];

  return (
    <section
      id="security"
      className="border-t border-zinc-200/80 bg-white px-6 py-14 sm:py-20 dark:border-zinc-800/80 dark:bg-zinc-950"
    >
      <div className="mx-auto w-full max-w-4xl">
        {/* Section Header */}
        <div className="mx-auto max-w-xl text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-medium text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-950/60 dark:text-emerald-300">
            <Shield className="size-3" />
            <span>Enterprise Trust & Privacy</span>
          </div>
          <h2 className="mt-2.5 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-50">
            Private by design.{" "}
            <span className="font-serif font-normal text-emerald-600 italic dark:text-emerald-400">
              Safe by default
            </span>
            .
          </h2>
          <p className="mt-2 text-xs leading-relaxed text-zinc-500 sm:text-sm dark:text-zinc-400">
            Your conversations contain sensitive strategy, code, and customer
            data. We guard them with defense-in-depth principles.
          </p>
        </div>

        {/* Minimalist Trust Points */}
        <div className="mt-10 grid grid-cols-1 gap-6 border-y border-zinc-200/80 py-6 sm:grid-cols-2 lg:grid-cols-4 dark:border-zinc-800/80">
          {trustPillars.map((pillar, idx) => (
            <div key={idx} className="flex flex-col">
              <div className="flex items-center gap-1.5">
                {pillar.icon}
                <h3 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                  {pillar.title}
                </h3>
              </div>
              <p className="mt-1 text-[11px] leading-relaxed text-zinc-500 dark:text-zinc-400">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div id="faq" className="mx-auto mt-14 max-w-2xl">
          <div className="text-center">
            <h3 className="text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl dark:text-zinc-50">
              Frequently asked questions
            </h3>
            <p className="mt-1 text-xs text-zinc-400">
              Clear answers regarding privacy, data residency, and agent
              configurations.
            </p>
          </div>

          <div className="mt-6">
            <Accordion
              type="single"
              collapsible
              defaultValue="data-collected"
              className="w-full space-y-2"
            >
              {faqs.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className="rounded-xl border border-zinc-200/80 bg-zinc-50/50 px-4 py-0 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:bg-zinc-900"
                >
                  <AccordionTrigger className="py-3 text-left text-xs font-semibold text-zinc-900 hover:text-emerald-600 hover:no-underline dark:text-zinc-100 dark:hover:text-emerald-400">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-3 text-[11px] leading-relaxed text-zinc-500 dark:text-zinc-400">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};
