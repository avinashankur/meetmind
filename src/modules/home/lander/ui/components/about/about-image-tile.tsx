import Image from "next/image";

import { ABOUT_STATS } from "../../../constants";
import { CountUp } from "../motion/count-up";
import { HoverGroup, ZoomOnHover } from "../motion/hover";

/** Full-bleed photo with its caption on a bottom fade, not covering it. */
export const AboutImageTile = () => (
  <HoverGroup className="relative isolate flex min-h-84 w-full flex-col justify-end overflow-hidden rounded-3xl bg-slate-950 p-6 lg:min-h-0">
    <ZoomOnHover className="-z-20">
      <Image
        src="/landing/card-image.jpg"
        alt="A person on a video call with a MeetMind agent"
        fill
        sizes="(min-width: 1024px) 400px, 100vw"
        className="object-cover"
      />
    </ZoomOnHover>
    <div className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-t from-slate-950/90 via-slate-950/30 via-40% to-transparent" />

    <span className="font-playfair text-6xl leading-none font-medium tracking-tight text-white italic">
      <CountUp {...ABOUT_STATS.tailored} />
    </span>
    <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/75">
      Tailored to you. Build an agent with your own instructions and let it join
      your calls.
    </p>
  </HoverGroup>
);
