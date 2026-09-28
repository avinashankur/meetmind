import { HeaderLanding } from "../components/header";
import { PerformanceStage } from "../components/performance-stage";
import { StageVoiceEngine } from "../components/stage-voice-engine";
import { StageSynthesis } from "../components/stage-synthesis";
import { StageMemory } from "../components/stage-memory";
import { StageSecurityFaq } from "../components/stage-security-faq";
import { StageCta } from "../components/stage-cta";
import { FooterLanding } from "../components/footer";

export const HomeView = () => {
  return (
    <div className="selection:bg-brand/20 selection:text-brand min-h-screen bg-[var(--paper)]">
      <HeaderLanding />
      <PerformanceStage />
      <StageVoiceEngine />
      <StageSynthesis />
      <StageMemory />
      <StageSecurityFaq />
      <StageCta />
      <FooterLanding />
    </div>
  );
};
