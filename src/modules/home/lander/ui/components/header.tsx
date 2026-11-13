import { LANDING_ROUTES } from "../../constants";
import { BrandLogo } from "./brand-logo";
import { FrameWrap } from "./frame-guides";
import { LandingButton } from "./landing-button";
import { MotionLink } from "./motion/hover";

export const HeaderLanding = () => (
  <nav aria-label="Main" className="absolute inset-x-0 top-0 z-60">
    <FrameWrap className="flex h-16 items-center justify-between">
      <BrandLogo tone="light" wordmarkClassName="text-lg" />
      <div className="flex gap-2.5">
        <LandingButton asChild variant="link" className="max-md:hidden">
          <MotionLink href={LANDING_ROUTES.signIn}>Sign in</MotionLink>
        </LandingButton>
        <LandingButton asChild variant="glass">
          <MotionLink href={LANDING_ROUTES.signUp}>Start free</MotionLink>
        </LandingButton>
      </div>
    </FrameWrap>
  </nav>
);
