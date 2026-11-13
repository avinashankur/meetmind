import Image from "next/image";

import { ZoomOnHover } from "../motion/hover";
import { BentoCaption, BentoTile } from "./bento-tile";

/** Photo-led tile: the agent shows up in the call like anyone else. */
export const ParticipantTile = () => (
  <BentoTile className="bg-slate-950">
    <ZoomOnHover className="-z-20">
      <Image
        src="/landing/ai-agent-and-human.jpg"
        alt="A video call participant lit by a monitor"
        fill
        sizes="(min-width: 1024px) 300px, (min-width: 768px) 50vw, 100vw"
        className="object-cover"
      />
    </ZoomOnHover>
    <div className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
    <BentoCaption
      tone="dark"
      title="Joins as a participant."
      description="One click and it’s in the call."
    />
  </BentoTile>
);
