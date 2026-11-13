"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUp, CornerDownRight } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  AGENT_CHAT,
  RECAP_HIGHLIGHTS,
  type ActionItemTag,
} from "../../../constants";
import { SparkleTile } from "../brand-logo";
import { ambientLoop, TRANSITION } from "../motion/transitions";
import { fadeUp, stagger } from "../motion/variants";
import { GlassPanel, SkyCard, SkyCardHeader, SkyChip } from "../sky-card";

/** Chat beats: question asked → agent typing → answer. */
type ChatPhase = "idle" | "asked" | "typing" | "answered";

const PHASE_TIMELINE: [ChatPhase, number][] = [
  ["asked", 700],
  ["typing", 1300],
  ["answered", 2700],
];

const highlightToneClasses: Record<ActionItemTag, string> = {
  blue: "text-blue-700",
  green: "text-green-700",
  red: "text-red-700",
  purple: "text-purple-700",
};

/** Chat bubbles rise in; the typing indicator fades out as the answer lands. */
const bubbleMotion = {
  initial: { opacity: 0, y: 8, scale: 0.96 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, scale: 0.96 },
  transition: TRANSITION.base,
} as const;

const TypingDots = () => (
  <span className="flex items-center gap-1">
    {[0, 1, 2].map((dot) => (
      <motion.span
        key={dot}
        className="size-1.5 rounded-full bg-slate-400"
        animate={{ y: [0, -3] }}
        transition={ambientLoop(0.35, dot * 0.12)}
      />
    ))}
  </span>
);

/**
 * Step 03: the recap totals land, then a follow-up question gets an answer
 * with a citation back to the moment in the call.
 */
export const AgentChatPreview = () => {
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<ChatPhase>("idle");

  useEffect(() => {
    const timers = PHASE_TIMELINE.map(([next, at]) =>
      setTimeout(() => setPhase(next), reduceMotion ? 0 : at),
    );
    return () => timers.forEach(clearTimeout);
  }, [reduceMotion]);

  return (
    <SkyCard className="min-h-88">
      <SkyCardHeader
        eyebrow="Recap · 42m"
        title="Ask Nova"
        chip={<SkyChip tone="success">Summary ready</SkyChip>}
      />

      <motion.ul
        className="grid grid-cols-3 gap-2"
        variants={stagger(0.1)}
        initial="hidden"
        animate="visible"
      >
        {RECAP_HIGHLIGHTS.map((highlight) => (
          <motion.li key={highlight.label} variants={fadeUp}>
            <GlassPanel className="px-2 py-2 text-center">
              <b
                className={cn(
                  "font-tight block text-xl leading-none font-semibold",
                  highlightToneClasses[highlight.tone],
                )}
              >
                {highlight.value}
              </b>
              <small className="text-xs text-slate-500">
                {highlight.label}
              </small>
            </GlassPanel>
          </motion.li>
        ))}
      </motion.ul>

      <div className="flex min-h-36 flex-col gap-2">
        <AnimatePresence>
          {phase !== "idle" && (
            <motion.p
              key="question"
              {...bubbleMotion}
              className="max-w-4/5 self-end rounded-2xl rounded-br-sm bg-slate-900 px-3 py-2 text-xs text-white shadow-sm"
            >
              {AGENT_CHAT.question}
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {phase === "typing" && (
            <motion.div key="typing" {...bubbleMotion} className="self-start">
              <GlassPanel className="rounded-bl-sm px-3 py-2.5">
                <TypingDots />
              </GlassPanel>
            </motion.div>
          )}
          {phase === "answered" && (
            <motion.div key="answer" {...bubbleMotion} className="max-w-11/12">
              <GlassPanel className="flex gap-2 rounded-2xl rounded-bl-sm px-3 py-2.5">
                <SparkleTile size="xs" className="mt-0.5" />
                <div>
                  <p className="text-xs leading-snug text-slate-800">
                    {AGENT_CHAT.answer}
                  </p>
                  <span className="font-dm-mono mt-1.5 inline-flex items-center gap-1 text-xs text-blue-700">
                    <CornerDownRight className="size-3" />
                    {AGENT_CHAT.citation}
                  </span>
                </div>
              </GlassPanel>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <GlassPanel className="mt-auto flex items-center justify-between gap-2 py-1.5 pr-1.5 pl-3 text-xs text-slate-400">
        Ask Nova anything about this call…
        <span className="grid size-6 place-items-center rounded-lg bg-blue-600 text-white">
          <ArrowUp className="size-3.5" />
        </span>
      </GlassPanel>
    </SkyCard>
  );
};
