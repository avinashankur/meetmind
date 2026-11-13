import { ArrowRight } from "lucide-react";

import { ABOUT_STATS, AGENT_AVATARS, LANDING_ROUTES } from "../../../constants";
import { AvatarStack } from "../avatar-stack";
import { SparkleTile } from "../brand-logo";
import { LandingButton } from "../landing-button";
import { MotionLink, NudgeOnHover } from "../motion/hover";
import { CountUp } from "../motion/count-up";

/** Headline number on a soft sky glow. */
const MinutesStat = () => (
  <div className="relative isolate flex flex-1 flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-6">
    {/* Soft sky glow rising from the bottom corner */}
    <div className="pointer-events-none absolute -right-16 -bottom-24 -z-10 size-72 rounded-full bg-radial from-blue-200 via-blue-100/60 to-transparent to-70%" />

    <div className="flex items-center justify-between">
      <small className="font-dm-mono text-xs font-medium tracking-widest text-blue-600 uppercase">
        Meeting minutes
      </small>
      <SparkleTile size="sm" />
    </div>

    <div className="mt-auto pt-8">
      <b className="font-tight block text-6xl leading-none font-semibold tracking-tighter text-slate-900">
        <CountUp {...ABOUT_STATS.minutes} />
      </b>
      <p className="mt-2 text-sm text-slate-500">
        Transcribed word for word, speaker by speaker.
      </p>
    </div>
  </div>
);

/** Dark call-to-action card with the agents stat. */
const AgentsStat = () => (
  <div className="flex items-center justify-between gap-4 rounded-3xl bg-slate-900 p-5 text-white">
    <div className="flex items-center gap-4">
      {/* Hidden only where the desktop column is at its narrowest */}
      <AvatarStack
        items={AGENT_AVATARS}
        className="lg:max-xl:hidden"
        avatarClassName="-ml-2.5 size-9 border-2 border-slate-900 text-xs"
      />
      <div>
        <b className="font-tight block text-2xl leading-none font-semibold tracking-tight">
          <CountUp {...ABOUT_STATS.agents} />
        </b>
        <small className="text-xs whitespace-nowrap text-slate-400">
          custom agents deployed
        </small>
      </div>
    </div>
    <LandingButton
      asChild
      variant="light"
      size="md"
      className="flex-none lg:size-10 lg:px-0"
    >
      <MotionLink
        href={LANDING_ROUTES.signUp}
        aria-label="Create an agent free"
      >
        {/* Icon-only in the narrow desktop column */}
        <span className="lg:sr-only">Create an agent</span>
        <NudgeOnHover>
          <ArrowRight className="size-4" />
        </NudgeOnHover>
      </MotionLink>
    </LandingButton>
  </div>
);

export const AboutStatsColumn = () => (
  <div className="flex min-h-0 w-full flex-col gap-4">
    <MinutesStat />
    <AgentsStat />
  </div>
);
