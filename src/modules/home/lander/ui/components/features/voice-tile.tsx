"use client";

import { motion } from "motion/react";

import { VOICE_LINE } from "../../../constants";
import { SparkleTile } from "../brand-logo";
import { DriftingCloud } from "../motion/drifting-cloud";
import { pulseLoop } from "../motion/transitions";
import { GlassPanel } from "../sky-card";
import { BentoCaption, BentoTile } from "./bento-tile";

const RINGS = [0, 1, 2];

/** The agent speaking in the call: a pulsing voice orb and its line. */
export const VoiceTile = () => (
  <BentoTile
    span="md:col-span-2"
    className="bg-linear-to-b from-blue-500 via-blue-300 via-70% to-blue-200"
  >
    <div className="pointer-events-none absolute inset-0 -z-10 bg-radial from-white/30 to-transparent to-70%" />
    <DriftingCloud sizes="112px" className="top-4 right-6 -z-10 w-28" />

    <div
      aria-hidden="true"
      className="flex flex-1 flex-col items-center justify-center gap-5 pb-6 sm:flex-row sm:justify-start sm:gap-10 sm:pb-0 sm:pl-10"
    >
      <div className="relative grid size-16 flex-none place-items-center">
        {RINGS.map((ring) => (
          <motion.span
            key={ring}
            className="absolute inset-0 rounded-full border-2 border-white/70"
            initial={{ scale: 1, opacity: 0.7 }}
            animate={{ scale: 2.2, opacity: 0 }}
            transition={pulseLoop(2.4, ring * 0.8)}
          />
        ))}
        <span className="grid size-16 place-items-center rounded-full bg-white/90 shadow-xl shadow-blue-900/20">
          <SparkleTile size="lg" />
        </span>
      </div>

      <GlassPanel className="max-w-xs rounded-2xl rounded-bl-sm px-4 py-3">
        <small className="font-dm-mono block text-xs font-medium tracking-wider text-blue-600 uppercase">
          Nova · speaking
        </small>
        <p className="mt-0.5 text-sm text-slate-800">
          &ldquo;{VOICE_LINE}&rdquo;
        </p>
      </GlassPanel>
    </div>

    <BentoCaption
      title="Talks back in real time."
      description="Not just a notetaker: your agent can speak up in the call."
    />
  </BentoTile>
);
