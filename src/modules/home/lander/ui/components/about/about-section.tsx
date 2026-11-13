import { SparkleTile } from "../brand-logo";
import { Reveal, RevealGroup, RevealItem } from "../motion/reveal";
import { SectionHeader } from "../section-header";
import { AboutImageTile } from "./about-image-tile";
import { AboutQuoteTile } from "./about-quote-tile";
import { AboutStatsColumn } from "./about-stats-column";

export const AboutSection = () => (
  <section id="about" className="py-20 lg:py-32">
    <SectionHeader label="Create custom agents · Send them into calls" />

    <Reveal>
      <p className="font-tight mb-12 max-w-5xl text-2xl leading-tight font-medium tracking-tight md:text-3xl lg:text-4xl">
        MeetMind <SparkleTile size="lg" /> lets you create custom AI agents with
        your instructions and send them into live calls.{" "}
        <span className="text-slate-400">
          They listen live, follow your guidelines, and answer questions in chat
          long after you hang up.
        </span>
      </p>
    </Reveal>

    <RevealGroup className="grid grid-cols-1 gap-4 lg:h-112 lg:grid-cols-3">
      <RevealItem className="flex">
        <AboutImageTile />
      </RevealItem>
      <RevealItem className="flex">
        <AboutQuoteTile />
      </RevealItem>
      <RevealItem className="flex">
        <AboutStatsColumn />
      </RevealItem>
    </RevealGroup>
  </section>
);
