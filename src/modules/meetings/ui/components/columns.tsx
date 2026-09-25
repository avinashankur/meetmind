"use client";

import { ColumnDef } from "@tanstack/react-table";
import GeneratedAvatar from "@/components/generated-avatar";
import {
  CircleCheckIcon,
  LoaderIcon,
  CircleXIcon,
  ClockArrowUpIcon,
  VideoIcon,
  Clock,
  Calendar,
  ArrowRight,
} from "lucide-react";
import { MeetingGetMany } from "../../types";
import { format } from "date-fns";
import { cn, formatDuration } from "@/lib/utils";

const statusIconMap = {
  upcoming: ClockArrowUpIcon,
  processing: LoaderIcon,
  active: VideoIcon,
  completed: CircleCheckIcon,
  cancelled: CircleXIcon,
};

const statusStyleMap: Record<
  string,
  {
    className: string;
    label: string;
  }
> = {
  upcoming: {
    className: "border-sky-500/25 bg-sky-500/10 text-sky-700 dark:text-sky-300",
    label: "Upcoming",
  },
  processing: {
    className:
      "border-amber-500/25 bg-amber-500/10 text-amber-700 dark:text-amber-300",
    label: "Processing",
  },
  active: {
    className: "border-brand/30 bg-brand/10 text-brand",
    label: "Active",
  },
  completed: {
    className:
      "border-emerald-500/25 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    label: "Completed",
  },
  cancelled: {
    className:
      "border-rose-500/25 bg-rose-500/10 text-rose-700 dark:text-rose-300",
    label: "Cancelled",
  },
};

export const columns: ColumnDef<MeetingGetMany[number]>[] = [
  {
    accessorKey: "name",
    header: "Meeting",
    cell: ({ row }) => (
      <div className="flex flex-col gap-y-1 py-1">
        <span className="text-foreground group-hover:text-primary text-sm font-medium tracking-tight transition-colors">
          {row.original.name}
        </span>

        <div className="text-muted-foreground flex items-center gap-x-2 text-xs">
          <div className="flex items-center gap-x-1.5">
            <GeneratedAvatar
              className="ring-border size-4 rounded-full ring-1"
              seed={row.original.agent.name}
              variant="botttsNeutral"
            />
            <span className="text-foreground/80 max-w-[140px] truncate sm:max-w-[200px]">
              {row.original.agent.name}
            </span>
          </div>
          <span>
            {row.original.createdAt
              ? format(new Date(row.original.createdAt), "MMM d, yyyy")
              : ""}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const statusKey = row.original.status as keyof typeof statusStyleMap;
      const config = statusStyleMap[statusKey] ?? statusStyleMap.upcoming;
      const Icon =
        statusIconMap[statusKey as keyof typeof statusIconMap] ??
        ClockArrowUpIcon;

      return (
        <div
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
            config.className,
          )}
        >
          <Icon
            className={cn(
              "size-3 shrink-0",
              row.original.status === "processing" && "animate-spin",
            )}
          />
          <span>{config.label}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }) => {
      const hasDuration =
        typeof row.original.duration === "number" && row.original.duration > 0;

      return (
        <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
          <Clock className="text-muted-foreground/70 size-3.5 shrink-0" />
          <span>
            {hasDuration ? formatDuration(row.original.duration) : "--:--"}
          </span>
        </div>
      );
    },
  },
  {
    id: "timestamp",
    header: "Date",
    cell: ({ row }) => {
      const date = row.original.startedAt ?? row.original.createdAt;
      return (
        <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
          <Calendar className="text-muted-foreground/70 size-3.5 shrink-0" />
          <span>{date ? format(new Date(date), "HH:mm") : "--:--"}</span>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "",
    cell: () => (
      <div className="flex items-center justify-end">
        <div className="text-muted-foreground group-hover:text-primary inline-flex items-center gap-1 pr-1 text-xs transition-colors">
          <span className="hidden sm:inline">Open</span>
          <ArrowRight className="text-muted-foreground group-hover:text-brand size-3.5 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    ),
  },
];
