import { FooterLanding } from "../components/footer";
import { HeaderLanding } from "../components/header";
import { LandingSection } from "./sections/landing";
import { PrivacySection } from "./sections/privacy-section";

export const HomeView = () => {
  return (
    <>
      <HeaderLanding />
      <LandingSection />
      {/* <ProblemSection /> */}
      {/* <ProductValueSection /> */}
      {/* <HowItWorksSection /> */}
      <PrivacySection />
      <FooterLanding />
    </>
  );
};
