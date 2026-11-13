import { HOW_IT_WORKS_STEPS } from "../../../constants";
import {
  SectionAsideCopy,
  SectionHeader,
  TitleAccent,
} from "../section-header";
import { AgentBuilderPreview } from "./agent-builder-preview";
import { AgentChatPreview } from "./agent-chat-preview";
import { LiveTranscriptPreview } from "./live-transcript-preview";
import { StepAccordion } from "./step-accordion";

export const HowItWorksSection = () => (
  <section id="how" className="py-20 lg:py-32">
    <SectionHeader
      label="From prompt to call participant"
      title={
        <>
          Set your instructions.
          <br />
          Send your agent to <TitleAccent>work.</TitleAccent>
        </>
      }
      aside={
        <SectionAsideCopy>
          Create an agent with custom guidelines, invite it to your call, and
          get structured notes and interactive chat tailored to your team.
        </SectionAsideCopy>
      }
    />
    <StepAccordion
      steps={HOW_IT_WORKS_STEPS}
      previews={{
        invite: <AgentBuilderPreview />,
        talk: <LiveTranscriptPreview />,
        recap: <AgentChatPreview />,
      }}
    />
  </section>
);
