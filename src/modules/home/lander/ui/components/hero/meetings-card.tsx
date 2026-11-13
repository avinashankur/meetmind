import { cn } from "@/lib/utils";
import { HERO_AGENDA } from "../../../constants";
import { SkyCardHeader, SkyChip } from "../sky-card";
import { DeckCard } from "./deck-card";

export const MeetingsCard = () => (
  <DeckCard position="left">
    <SkyCardHeader
      eyebrow="Today"
      title="Meetings"
      chip={
        <SkyChip tone="success">
          <i className="size-1.5 rounded-full bg-emerald-500" />1 live
        </SkyChip>
      }
    />
    <div className="mt-4">
      {HERO_AGENDA.map((item) => (
        <div
          key={item.title}
          className="flex items-center gap-2.5 border-t border-slate-900/10 py-3 first:border-t-0 first:pt-0.5"
        >
          <span
            className={cn(
              "font-dm-mono w-10 flex-none text-xs font-medium",
              item.isLive ? "text-slate-900" : "text-slate-600",
            )}
          >
            {item.time}
            <em className="mt-0.5 block text-xs text-slate-400 not-italic">
              {item.duration}
            </em>
          </span>
          <div className="min-w-0">
            <b className="font-tight block text-sm leading-tight font-semibold text-slate-900">
              {item.title}
            </b>
            <small className="mt-1 flex items-center gap-1 text-xs font-medium text-slate-500">
              {item.isLive && (
                <i className="size-1.5 flex-none rounded-full bg-green-500" />
              )}
              {item.status}
            </small>
          </div>
        </div>
      ))}
    </div>
  </DeckCard>
);
