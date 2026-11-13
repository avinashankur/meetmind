import Image from "next/image";

import { LANDING_ROUTES } from "../../constants";
import { LandingButton } from "./landing-button";
import { MotionLink } from "./motion/hover";
import { Reveal } from "./motion/reveal";
import { TitleAccent } from "./section-header";

export const CtaSection = () => (
  <Reveal>
    <section className="relative my-18 overflow-hidden rounded-4xl bg-linear-to-b from-blue-500 via-blue-400 via-70% to-blue-300 px-6 pt-20 pb-24 text-center text-white lg:my-24">
      <Image
        src="/landing/cloud-front.png"
        alt=""
        width={2172}
        height={724}
        sizes="(min-width: 1240px) 1152px, 100vw"
        className="pointer-events-none absolute bottom-0 left-0 h-auto w-full translate-y-1/3"
      />
      <h2 className="font-tight relative z-10 mx-auto max-w-2xl text-3xl leading-tight font-medium tracking-tight md:text-4xl xl:text-5xl">
        Put a custom-instructed agent into your{" "}
        <TitleAccent className="text-white">next call.</TitleAccent>
      </h2>
      <p className="relative z-10 mt-4 mb-8 text-base text-white/90">
        Create your first agent with custom prompts and guidelines in under two
        minutes. Free to start, no credit card required.
      </p>
      <LandingButton asChild variant="glass" size="lg" className="z-10">
        <MotionLink href={LANDING_ROUTES.signUp}>
          Create your first agent free
        </MotionLink>
      </LandingButton>
    </section>
  </Reveal>
);
