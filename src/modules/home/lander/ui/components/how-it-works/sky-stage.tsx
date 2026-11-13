import Image from "next/image";

import { DriftingCloud } from "../motion/drifting-cloud";

/**
 * A miniature of the hero: sky gradient, drifting clouds and a cloud bank,
 * with a `SkyCard` floating in front. Ties the step previews to the hero.
 */
export const SkyStage = ({ children }: { children: React.ReactNode }) => (
  <div
    aria-hidden="true"
    className="relative isolate flex min-h-120 items-center justify-center overflow-hidden rounded-2xl bg-linear-to-b from-blue-500 via-blue-300 via-70% to-blue-200 px-5 py-8 sm:px-8"
  >
    <div className="pointer-events-none absolute inset-0 -z-10 bg-radial from-white/25 to-transparent to-70%" />
    <DriftingCloud sizes="112px" className="top-5 right-4 -z-10 w-28" />
    <DriftingCloud
      sizes="96px"
      distance={16}
      duration={16}
      className="top-1/3 left-3 -z-10 w-20 opacity-80"
    />
    <Image
      src="/landing/cloud-front.png"
      alt=""
      width={2172}
      height={724}
      sizes="640px"
      className="pointer-events-none absolute bottom-0 left-1/2 -z-10 h-auto w-full max-w-none min-w-xl -translate-x-1/2 translate-y-1/3"
    />
    <div className="relative w-full max-w-sm">{children}</div>
  </div>
);
