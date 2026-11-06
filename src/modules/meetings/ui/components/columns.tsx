"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format, isThisYear, isToday, isYesterday } from "date-fns";

import GeneratedAvatar from "@/components/generated-avatar";
import { formatDuration } from "@/lib/utils";
import { MeetingGetMany, MeetingStatus } from "../../types";
import { MeetingActions } from "./meeting-actions";
import { MeetingStatusBadge } from "./meeting-status-badge";

type Meeting = MeetingGetMany[number];

const formatMeetingDate = (value: string | Date) => {
  const date = new Date(value);
  const time = format(date, "h:mm a");

  if (isToday(date)) return `Today, ${time}`;
  if (isYesterday(date)) return `Yesterday, ${time}`;
  return format(date, isThisYear(date) ? "MMM d, h:mm a" : "MMM d, yyyy");
};

const DurationCell = ({ meeting }: { meeting: Meeting }) => {
  if (meeting.status === MeetingStatus.Active) {
    return <span className="text-brand text-xs font-medium">In progress</span>;
  }

  if (typeof meeting.duration === "number" && meeting.duration > 0) {
    return (
      <span className="text-foreground font-mono text-xs tabular-nums">
        {formatDuration(meeting.duration)}
      </span>
    );
  }

  return <span className="text-muted-foreground/60 text-xs">—</span>;
};

export const columns: ColumnDef<Meeting>[] = [
  {
    accessorKey: "name",
    header: "Meeting",
    cell: ({ row }) => (
      <div className="flex min-w-0 items-center gap-3 py-0.5">
        <GeneratedAvatar
          className="size-8 shrink-0"
          seed={row.original.agent.name}
          variant="botttsNeutral"
        />
        <div className="flex min-w-0 flex-col gap-0.5">
          <span className="text-foreground truncate text-sm font-medium">
            {row.original.name}
          </span>
          <span className="text-muted-foreground truncate text-xs">
            {row.original.agent.name}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <MeetingStatusBadge status={row.original.status} />,
  },
  {
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }) => <DurationCell meeting={row.original} />,
  },
  {
    id: "date",
    header: "Date",
    cell: ({ row }) => (
      <span className="text-muted-foreground text-xs whitespace-nowrap">
        {formatMeetingDate(row.original.startedAt ?? row.original.createdAt)}
      </span>
    ),
  },
  {
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => (
      <div className="flex justify-end">
        <MeetingActions meeting={row.original} context="list" />
      </div>
    ),
  },
];
