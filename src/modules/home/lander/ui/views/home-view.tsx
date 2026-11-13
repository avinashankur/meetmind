import { cn } from "@/lib/utils";
import { AboutSection } from "../components/about/about-section";
import { CtaSection } from "../components/cta-section";
import { FeaturesSection } from "../components/features/features-section";
import { FooterLanding } from "../components/footer";
import {
  FrameDivider,
  FrameEdges,
  FrameWrap,
} from "../components/frame-guides";
import { HeaderLanding } from "../components/header";
import { HeroSection } from "../components/hero/hero-section";
import { HowItWorksSection } from "../components/how-it-works/how-it-works-section";
import { LandingMotionProvider } from "../components/motion/landing-motion-provider";
import { TestimonialsSection } from "../components/testimonials/testimonials-section";
import { landingFontVariables } from "../fonts";

export const HomeView = () => (
  <LandingMotionProvider>
    <div
      className={cn(
        "relative bg-white text-zinc-900 antialiased",
        landingFontVariables,
      )}
    >
      <HeaderLanding />
      <HeroSection />

      <main className="relative bg-blue-50 text-slate-900">
        <FrameEdges />
        <FrameWrap>
          <AboutSection />
          <FeaturesSection />
          <HowItWorksSection />
          <TestimonialsSection />
          <CtaSection />
        </FrameWrap>
        <FrameDivider />
        <FooterLanding />
      </main>
    </div>
  </LandingMotionProvider>
);
