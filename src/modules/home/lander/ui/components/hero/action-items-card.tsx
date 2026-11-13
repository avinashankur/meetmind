import { Check, MessageSquare } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  HERO_ACTION_ITEMS,
  HERO_ACTION_PROGRESS,
  type ActionItem,
} from "../../../constants";
import { SkyCardHeader, SkyChip, SkyTag } from "../sky-card";
import { DeckCard } from "./deck-card";

const ProgressSegments = () => (
  <div className="flex gap-1 rounded-full border border-white/80 bg-white/50 p-1">
    {Array.from({ length: HERO_ACTION_PROGRESS.total }, (_, index) => (
      <i
        key={index}
        className={cn(
          "h-1 flex-1 rounded-full",
          index < HERO_ACTION_PROGRESS.filled
            ? "bg-linear-to-r from-blue-500 to-blue-700 shadow-sm shadow-blue-600/30"
            : "bg-slate-900/10",
        )}
      />
    ))}
  </div>
);

const ActionItemRow = ({ item }: { item: ActionItem }) => (
  <div className="flex items-center gap-2 rounded-xl border border-white/95 bg-white/85 px-3 py-2 text-slate-900 shadow-sm backdrop-blur-md">
    <span
      className={cn(
        "grid size-5 flex-none place-items-center rounded-full",
        item.done
          ? "bg-blue-600 text-white shadow-sm shadow-blue-600/30"
          : "border-2 border-slate-300 bg-white/95",
      )}
    >
      {item.done && <Check className="size-3" strokeWidth={3} />}
    </span>
    <div className="min-w-0 flex-1">
      <b
        className={cn(
          "font-tight block truncate text-xs font-semibold",
          item.done ? "text-slate-800" : "text-slate-900",
        )}
      >
        {item.title}
      </b>
      <small className="text-xs font-medium text-slate-500">{item.meta}</small>
    </div>
    <SkyTag tone={item.tone}>{item.tag}</SkyTag>
  </div>
);

export const ActionItemsCard = () => (
  <DeckCard position="center">
    <SkyCardHeader
      eyebrow="Agent output"
      title="Action items"
      chip={
        <SkyChip>
          {HERO_ACTION_PROGRESS.filled}/{HERO_ACTION_PROGRESS.total} done
        </SkyChip>
      }
    />
    <ProgressSegments />
    {HERO_ACTION_ITEMS.map((item) => (
      <ActionItemRow key={item.title} item={item} />
    ))}
    <div className="flex items-center justify-center gap-1.5 rounded-xl border border-blue-600/30 bg-white/90 px-3 py-2.5 text-xs font-semibold text-blue-700 shadow-sm shadow-blue-600/15 backdrop-blur-sm">
      <MessageSquare className="mr-1 size-3.5" strokeWidth={2.2} />
      ask anything about this call &rarr;
    </div>
  </DeckCard>
);
