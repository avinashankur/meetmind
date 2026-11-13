import { ArrowRight } from "lucide-react";

import { LANDING_ROUTES } from "../../../constants";
import { LandingButton } from "../landing-button";
import { MotionLink, NudgeOnHover } from "../motion/hover";
import { Reveal } from "../motion/reveal";
import { TitleAccent } from "../section-header";

/** Handwritten "create your agent here" note pointing at the primary CTA. */
const HandNote = () => (
  <span
    aria-hidden="true"
    className="font-hand absolute top-full left-1 mt-0.5 flex -rotate-3 items-end gap-1 text-2xl font-semibold text-white text-shadow-blue-900/35 text-shadow-md max-md:hidden"
  >
    <svg
      viewBox="0 0 52 46"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-9 w-10"
    >
      <path d="M6 2C3 18 10 36 40 38" />
      <path d="M32 30l9 8-10 6" />
    </svg>
    create your agent here
  </span>
);

export const HeroCopy = () => (
  <div className="relative z-50 my-auto max-w-4xl pb-20">
    <Reveal immediate y={12}>
      <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/20 px-3.5 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
        <b className="size-1.5 rounded-full bg-white ring-3 ring-white/30" />
        custom instructions &middot; live calls
      </span>
    </Reveal>

    <Reveal immediate delay={0.1}>
      <h1 className="font-tight text-2xl leading-tight font-medium tracking-tight text-white text-shadow-blue-900/30 text-shadow-lg sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
        <span className="inline-block whitespace-nowrap">
          Instruct your <TitleAccent className="text-white">agent.</TitleAccent>
        </span>
        <br />
        <span className="inline-block whitespace-nowrap">
          Send it into your{" "}
          <TitleAccent className="text-white">calls.</TitleAccent>
        </span>
      </h1>
    </Reveal>

    <Reveal immediate delay={0.2}>
      <p className="mx-auto mt-5 mb-8 max-w-md text-sm leading-relaxed text-white lg:text-base">
        Build custom AI agents with your own prompts and guidelines. Send them
        into video calls to follow your instructions and answer questions in
        chat.
      </p>
    </Reveal>

    <Reveal
      immediate
      delay={0.3}
      className="relative inline-flex flex-wrap justify-center gap-3"
    >
      <LandingButton asChild variant="dark" size="lg" className="max-md:w-full">
        <MotionLink href={LANDING_ROUTES.signUp}>
          Try MeetMind free
          <NudgeOnHover>
            <ArrowRight className="size-4" />
          </NudgeOnHover>
        </MotionLink>
      </LandingButton>
      <LandingButton
        asChild
        variant="ghost"
        size="lg"
        className="max-md:w-full"
      >
        <MotionLink href={LANDING_ROUTES.howItWorks}>
          See how it works
        </MotionLink>
      </LandingButton>
      <HandNote />
    </Reveal>
  </div>
);
