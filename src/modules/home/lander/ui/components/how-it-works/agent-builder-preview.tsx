"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, CalendarDays, Check } from "lucide-react";

import { AGENT_DRAFT } from "../../../constants";
import { TRANSITION } from "../motion/transitions";
import { Typewriter } from "../motion/typewriter";
import { pop, stagger } from "../motion/variants";
import { GlassPanel, SkyCard, SkyCardHeader, SkyChip } from "../sky-card";

/**
 * Step 01: the instructions type themselves out, the agent's skills pop in,
 * then the agent is sent into the meeting.
 */
export const AgentBuilderPreview = () => {
  const [isTyped, setIsTyped] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);

  useEffect(() => {
    if (!isTyped) return;
    const timer = setTimeout(() => setHasJoined(true), 1100);
    return () => clearTimeout(timer);
  }, [isTyped]);

  return (
    <SkyCard className="min-h-88">
      <SkyCardHeader
        eyebrow="New agent"
        title={AGENT_DRAFT.name}
        chip={<SkyChip>{AGENT_DRAFT.role}</SkyChip>}
      />

      <GlassPanel className="px-3 py-2.5">
        <small className="font-dm-mono block text-xs font-medium tracking-wider text-slate-400 uppercase">
          Instructions
        </small>
        <p className="mt-1 min-h-16 text-xs leading-relaxed text-slate-700">
          <Typewriter
            text={AGENT_DRAFT.instructions}
            delay={0.4}
            onComplete={() => setIsTyped(true)}
          />
        </p>
      </GlassPanel>

      <motion.ul
        className="flex min-h-7 flex-wrap gap-1.5"
        variants={stagger(0.08)}
        initial="hidden"
        animate={isTyped ? "visible" : "hidden"}
      >
        {AGENT_DRAFT.skills.map((skill) => (
          <motion.li key={skill} variants={pop}>
            <SkyChip>
              <Check className="size-3" strokeWidth={3} />
              {skill}
            </SkyChip>
          </motion.li>
        ))}
      </motion.ul>

      <GlassPanel className="mt-auto flex flex-wrap items-center gap-2.5 px-3 py-2.5">
        <span className="grid size-8 flex-none place-items-center rounded-lg bg-blue-50 text-blue-600">
          <CalendarDays className="size-4" />
        </span>
        <div className="min-w-0">
          <b className="font-tight block truncate text-sm font-semibold">
            {AGENT_DRAFT.meeting.title}
          </b>
          <small className="block text-xs text-slate-500">
            {AGENT_DRAFT.meeting.time}
          </small>
        </div>
        <AnimatePresence mode="wait" initial={false}>
          {hasJoined ? (
            <motion.span
              key="joined"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={TRANSITION.pop}
              className="ml-auto inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold whitespace-nowrap text-emerald-700"
            >
              <Check className="size-3" strokeWidth={3} />
              Joined
            </motion.span>
          ) : (
            <motion.span
              key="send"
              exit={{ opacity: 0, scale: 0.8 }}
              transition={TRANSITION.pop}
              className="ml-auto inline-flex items-center gap-1 rounded-full bg-slate-900 px-2.5 py-1 text-xs font-semibold whitespace-nowrap text-white"
            >
              Send to call
              <ArrowRight className="size-3" />
            </motion.span>
          )}
        </AnimatePresence>
      </GlassPanel>
    </SkyCard>
  );
};
