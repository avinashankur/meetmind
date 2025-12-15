"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
import { AgentGetOne } from "../../types";
import GeneratedAvatar from "@/components/generated-avatar";
import { CornerDownRightIcon, VideoIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<AgentGetOne>[] = [
  {
    accessorKey: "name",
    header: "Agent Name",
    cell: ({ row }) => (
      <div className="flex flex-col gap-y-1 p-3">
        <div className="flex items-center gap-x-2">
          <GeneratedAvatar variant="botttsNeutral" seed={row.original.name} />
          <span className="font-medium capitalize">{row.original.name}</span>
        </div>

        <div className="flex items-center gap-x-1">
          <CornerDownRightIcon className="text-muted-foreground size-3" />
          <span className="text-muted-foreground max-w-[200px] truncate text-sm capitalize">
            {row.original.instructions}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "meetingCount",
    header: "Meeting Count",
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className="flex items-center gap-x-2 rounded-sm py-1 [&>svg]:size-4"
      >
        <VideoIcon className="text-blue-700" />
        {row.original.meetingCount}{" "}
        {row.original.meetingCount === 1 ? "meeting" : "meetings"}
      </Badge>
    ),
  },
];
