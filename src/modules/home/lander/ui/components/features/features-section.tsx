import { RevealGroup } from "../motion/reveal";
import {
  SectionAsideCopy,
  SectionHeader,
  TitleAccent,
} from "../section-header";
import { InstructionsTile } from "./instructions-tile";
import { ParticipantTile } from "./participant-tile";
import { TechTile } from "./tech-tile";
import { TranscriptTile } from "./transcript-tile";
import { VoiceTile } from "./voice-tile";
import { ZeroUploadsTile } from "./zero-uploads-tile";

export const FeaturesSection = () => (
  <section id="features" className="py-20 lg:py-32">
    <SectionHeader
      label="Custom agents in action"
      title={
        <>
          AI agents built around your{" "}
          <TitleAccent>own instructions.</TitleAccent>
        </>
      }
      aside={
        <SectionAsideCopy>
          Run a different agent for every kind of meeting, each with its own
          role, voice and brief.
        </SectionAsideCopy>
      }
    />

    {/*
      Bento, 4 columns on desktop:
      [ Instructions 2×2 ][ Voice 2×1          ]
      [                  ][ Participant ][ Zero ]
      [ Transcript 2×1   ][ Tech 2×1           ]
    */}
    <RevealGroup className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <InstructionsTile />
      <VoiceTile />
      <ParticipantTile />
      <ZeroUploadsTile />
      <TranscriptTile />
      <TechTile />
    </RevealGroup>
  </section>
);
