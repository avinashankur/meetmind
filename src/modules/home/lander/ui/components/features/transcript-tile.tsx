import { cn } from "@/lib/utils";
import { LIVE_TRANSCRIPT } from "../../../constants";
import { BentoCaption, BentoTile } from "./bento-tile";

const EXCERPT = LIVE_TRANSCRIPT.slice(0, 2);

/** Script-style excerpt of the transcript, set large on a dark surface. */
export const TranscriptTile = () => (
  <BentoTile span="md:col-span-2" className="bg-slate-900">
    <div aria-hidden="true" className="flex flex-col gap-5">
      {EXCERPT.map((line, index) => (
        <div key={line.speaker} className="flex gap-4">
          <span
            className={cn(
              "grid size-9 flex-none place-items-center rounded-full text-xs font-semibold text-white ring-4 ring-white/10",
              line.avatarClassName,
            )}
          >
            {line.initials}
          </span>
          <div>
            <small className="font-dm-mono block text-xs tracking-widest text-slate-400 uppercase">
              {line.speaker}
            </small>
            <p
              className={cn(
                "font-tight mt-1 text-xl leading-snug font-medium tracking-tight lg:text-2xl",
                index === 0 ? "text-white" : "text-white/50",
              )}
            >
              {line.text}
            </p>
          </div>
        </div>
      ))}
    </div>

    <BentoCaption
      tone="dark"
      title="Every word, attributed."
      description="Full transcripts, split by speaker."
      className="pt-8"
    />
  </BentoTile>
);
