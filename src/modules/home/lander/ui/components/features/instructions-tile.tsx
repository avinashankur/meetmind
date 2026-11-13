import Image from "next/image";

import { SparkleTile } from "../brand-logo";
import { Caret } from "../motion/typewriter";
import { TitleAccent } from "../section-header";
import { BentoCaption, BentoTile } from "./bento-tile";

/** The anchor tile: an agent's brief, set large, is the visual. */
export const InstructionsTile = () => (
  <BentoTile
    span="md:col-span-2 lg:row-span-2"
    className="bg-sky-100 p-8 lg:min-h-148"
  >
    <Image
      src="/landing/card-bg.png"
      alt=""
      fill
      sizes="(min-width: 1024px) 600px, 100vw"
      className="-z-10 object-cover"
    />

    <span className="inline-flex items-center gap-2 self-start rounded-full border border-white bg-white/80 py-1 pr-3 pl-1.5 text-xs font-medium text-slate-600 shadow-sm backdrop-blur-sm">
      <SparkleTile size="xs" />
      Nova&rsquo;s instructions
    </span>

    <p className="font-tight my-auto py-10 text-3xl leading-tight font-medium tracking-tight text-slate-900 xl:text-4xl">
      Follow our <TitleAccent>RFC template.</TitleAccent> Flag{" "}
      <TitleAccent>blockers</TitleAccent> before the recap. Log every{" "}
      <TitleAccent>decision</TitleAccent> with its owner.
      <Caret className="ml-1 h-8 w-0.5 translate-y-1" />
    </p>

    <BentoCaption
      title="Your agent, your rules."
      description="Write instructions in plain language. No prompt engineering."
    />
  </BentoTile>
);
