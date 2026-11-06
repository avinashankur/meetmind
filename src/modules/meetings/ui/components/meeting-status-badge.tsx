import {
  CircleCheckIcon,
  CircleXIcon,
  ClockArrowUpIcon,
  LoaderIcon,
  VideoIcon,
  type LucideIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { MeetingStatus } from "../../types";

// Status colors are the one sanctioned use of raw palette classes (DESIGN.md §8.3).
const statusConfig: Record<
  MeetingStatus,
  { label: string; icon: LucideIcon; className: string }
> = {
  upcoming: {
    label: "Upcoming",
    icon: ClockArrowUpIcon,
    className: "border-sky-500/25 bg-sky-500/10 text-sky-700 dark:text-sky-300",
  },
  active: {
    label: "Live",
    icon: VideoIcon,
    className: "border-brand/30 bg-brand/10 text-brand",
  },
  processing: {
    label: "Processing",
    icon: LoaderIcon,
    className:
      "border-amber-500/25 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  },
  completed: {
    label: "Completed",
    icon: CircleCheckIcon,
    className:
      "border-emerald-500/25 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  },
  cancelled: {
    label: "Cancelled",
    icon: CircleXIcon,
    className:
      "border-rose-500/25 bg-rose-500/10 text-rose-700 dark:text-rose-300",
  },
};

interface Props {
  status: string;
  className?: string;
}

export const MeetingStatusBadge = ({ status, className }: Props) => {
  const config = statusConfig[status as MeetingStatus] ?? statusConfig.upcoming;
  const Icon = config.icon;

  return (
    <Badge
      variant="outline"
      className={cn(
        "gap-1 rounded-full font-medium",
        config.className,
        className,
      )}
    >
      <Icon
        className={cn(status === MeetingStatus.Processing && "animate-spin")}
      />
      {config.label}
    </Badge>
  );
};

/** Statuses that change on the server without user action. */
export const isTransitionalStatus = (status: string) =>
  status === MeetingStatus.Active || status === MeetingStatus.Processing;

/** Poll while a meeting is live or being summarised, so status updates appear without a reload. */
export const MEETING_POLL_INTERVAL_MS = 5000;
