"use client";

import { motion, type Variants } from "motion/react";

import { cn } from "@/lib/utils";
import { LIVE_TRANSCRIPT } from "../../../constants";
import { ambientLoop, TRANSITION } from "../motion/transitions";
import { fadeUp, pop, stagger } from "../motion/variants";
import {
  GlassPanel,
  SkyCard,
  SkyCardHeader,
  SkyChip,
  SkyTag,
} from "../sky-card";

/** A transcript line; its tag (a `pop` child) lands a beat after the line. */
const lineVariants: Variants = {
  ...fadeUp,
  visible: {
    ...fadeUp.visible,
    transition: { ...TRANSITION.base, delayChildren: 0.45 },
  },
};

const WAVE_BARS = Array.from({ length: 28 }, (_, index) => index);

const LiveDot = () => (
  <motion.span
    className="size-1.5 rounded-full bg-emerald-500"
    animate={{ opacity: [1, 0.3] }}
    transition={ambientLoop(0.8)}
  />
);

/** Audio level bars that bounce at slightly different rhythms. */
const Waveform = () => (
  <div className="flex h-6 items-center gap-0.5">
    {WAVE_BARS.map((bar) => (
      <motion.span
        key={bar}
        className={cn(
          "h-full w-0.5 origin-center rounded-full",
          bar % 3 === 0 ? "bg-blue-400" : "bg-blue-600",
        )}
        initial={{ scaleY: 0.35 }}
        animate={{ scaleY: [0.35, 1] }}
        // Slightly different rhythm per bar so the levels never sync up.
        transition={ambientLoop(0.5 + (bar % 5) * 0.12, (bar % 7) * 0.07)}
      />
    ))}
  </div>
);

/**
 * Step 02: transcript lines stream in and the agent tags each one according
 * to its instructions, while the waveform shows it listening.
 */
export const LiveTranscriptPreview = () => (
  <SkyCard className="min-h-88">
    <SkyCardHeader
      eyebrow="Live · Roadmap sync"
      title="Listening"
      chip={
        <SkyChip tone="success">
          <LiveDot />
          Nova
        </SkyChip>
      }
    />

    <motion.ul
      className="flex flex-col gap-2"
      variants={stagger(0.9, 0.3)}
      initial="hidden"
      animate="visible"
    >
      {LIVE_TRANSCRIPT.map((line) => (
        <motion.li key={line.speaker} variants={lineVariants}>
          <GlassPanel className="flex items-start gap-2.5 px-3 py-2.5">
            <span
              className={cn(
                "grid size-7 flex-none place-items-center rounded-full text-xs font-semibold text-white",
                line.avatarClassName,
              )}
            >
              {line.initials}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <b className="font-tight text-xs font-semibold">
                  {line.speaker}
                </b>
                <motion.span variants={pop}>
                  <SkyTag tone={line.tag.tone}>{line.tag.label}</SkyTag>
                </motion.span>
              </div>
              <p className="mt-0.5 text-xs leading-snug text-slate-600">
                {line.text}
              </p>
            </div>
          </GlassPanel>
        </motion.li>
      ))}
    </motion.ul>

    <GlassPanel className="mt-auto flex items-center justify-between gap-3 px-3 py-2">
      <span className="font-dm-mono text-xs font-medium tracking-wider text-slate-500 uppercase">
        Taking notes
      </span>
      <Waveform />
    </GlassPanel>
  </SkyCard>
);
