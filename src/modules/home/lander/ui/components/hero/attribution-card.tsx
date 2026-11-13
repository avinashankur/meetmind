import { cn } from "@/lib/utils";
import { ATTENDEE_AVATARS, HERO_SPEAKERS } from "../../../constants";
import { AvatarStack } from "../avatar-stack";
import { GlassPanel, SkyCardHeader, SkyChip } from "../sky-card";
import { DeckCard } from "./deck-card";

/** Radius giving a circumference of 100, so dash lengths read as percentages. */
const DONUT_RADIUS = 15.9155;

/** Each speaker's arc starts where the previous speakers' shares end. */
const DONUT_SEGMENTS = HERO_SPEAKERS.map((speaker, index) => ({
  ...speaker,
  start: HERO_SPEAKERS.slice(0, index).reduce((sum, s) => sum + s.share, 0),
}));

/** Compact talk-time ring: one stroked arc per speaker, sized by share. */
const TalkTimeDonut = () => (
  <div className="relative size-16 flex-none">
    <svg viewBox="0 0 36 36" className="size-full -rotate-90">
      {DONUT_SEGMENTS.map((segment) => (
        <circle
          key={segment.name}
          cx="18"
          cy="18"
          r={DONUT_RADIUS}
          fill="none"
          strokeWidth="5"
          strokeDasharray={`${segment.share} ${100 - segment.share}`}
          strokeDashoffset={-segment.start}
          className={segment.strokeClassName}
        />
      ))}
    </svg>
    <span className="font-tight absolute inset-0 grid place-items-center text-xs font-bold tracking-tight text-slate-900">
      42m
    </span>
  </div>
);

export const AttributionCard = () => (
  <DeckCard position="right">
    <SkyCardHeader
      eyebrow="Speakers"
      title="Attribution"
      chip={<SkyChip tone="success">{HERO_SPEAKERS.length} speakers</SkyChip>}
    />

    {/* Donut and legend side by side so both sit above the cloud bank */}
    <GlassPanel className="flex items-center gap-3 p-3">
      <TalkTimeDonut />
      <ul className="flex min-w-0 flex-1 flex-col gap-1.5">
        {HERO_SPEAKERS.map((speaker) => (
          <li
            key={speaker.name}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-800"
          >
            <i
              className={cn(
                "size-2 flex-none rounded-full",
                speaker.dotClassName,
              )}
            />
            <span className="truncate">{speaker.name}</span>
            <span className="ml-auto text-slate-500">{speaker.share}%</span>
          </li>
        ))}
      </ul>
    </GlassPanel>

    <GlassPanel className="px-3 py-2">
      <AvatarStack
        items={ATTENDEE_AVATARS}
        avatarClassName="-ml-2 size-6 border-2 text-xs shadow-sm"
      >
        <small className="ml-2 text-xs font-semibold text-slate-800">
          4 people + 1 agent
        </small>
      </AvatarStack>
    </GlassPanel>
  </DeckCard>
);
