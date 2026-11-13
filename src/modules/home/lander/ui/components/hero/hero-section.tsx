import Image from "next/image";

import { cn } from "@/lib/utils";
import { Crosshair, FrameEdges } from "../frame-guides";
import { DriftingCloud } from "../motion/drifting-cloud";
import { Reveal } from "../motion/reveal";
import { ActionItemsCard } from "./action-items-card";
import { AttributionCard } from "./attribution-card";
import { HeroCopy } from "./hero-copy";
import { MeetingsCard } from "./meetings-card";

const CLOUD_BANK = { width: 2172, height: 724 } as const;

const cloudBankClassName =
  "pointer-events-none absolute bottom-0 left-1/2 h-auto w-full max-w-none min-w-180 -translate-x-1/2";

/** Hairline frame with a rule under the header and crosshairs at the corners. */
const HeroFrame = () => (
  <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10">
    <span className="absolute inset-x-0 top-16 h-px bg-blue-900/15" />
    <FrameEdges>
      <Crosshair side="left" className="top-[calc(4rem+0.5px)]" />
      <Crosshair side="right" className="top-[calc(4rem+0.5px)]" />
    </FrameEdges>
  </div>
);

/** Three product cards fanned out and tucked into the cloud bank. */
const HeroCardDeck = () => (
  <Reveal
    immediate
    delay={0.35}
    y={80}
    className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-0"
  >
    <div aria-hidden="true">
      <MeetingsCard />
      <ActionItemsCard />
      <AttributionCard />
    </div>
  </Reveal>
);

export const HeroSection = () => (
  <header className="relative flex min-h-svh flex-col items-center overflow-hidden bg-linear-to-b from-blue-500 via-blue-300 via-70% to-blue-200 px-6 pt-24 pb-54 text-center lg:pb-60 xl:pb-80">
    {/* Soft highlight behind the headline */}
    <div className="pointer-events-none absolute inset-0 bg-radial from-white/25 to-transparent to-70%" />
    <HeroFrame />

    <DriftingCloud
      sizes="288px"
      preload
      className="top-14 right-1/12 z-20 w-36 md:w-48 lg:w-56 xl:w-72"
    />
    <DriftingCloud
      sizes="256px"
      distance={18}
      duration={17}
      className="top-3/5 left-1/12 z-20 w-32 md:top-1/3 md:w-44 lg:w-52 xl:w-64"
    />

    <HeroCopy />

    <Image
      src="/landing/cloud-rear.png"
      alt=""
      {...CLOUD_BANK}
      sizes="100vw"
      preload
      className={cn(cloudBankClassName, "z-20")}
    />
    <HeroCardDeck />
    <Image
      src="/landing/cloud-front.png"
      alt=""
      {...CLOUD_BANK}
      sizes="100vw"
      preload
      className={cn(
        cloudBankClassName,
        "z-40 translate-y-1/2 drop-shadow-xl drop-shadow-white",
      )}
    />
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-24 bg-linear-to-b from-blue-50/0 via-blue-50/80 via-65% to-blue-50 lg:h-32" />
  </header>
);
