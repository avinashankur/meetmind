"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { CopyIcon, VideoIcon } from "lucide-react";
import { toast } from "sonner";
import { AgentsGetMany } from "../../types";
import GeneratedAvatar from "@/components/generated-avatar";
import { AgentRowActions } from "@/modules/agents/ui/components/agent-row-actions";

export const columns: ColumnDef<AgentsGetMany[number]>[] = [
  {
    accessorKey: "name",
    header: "Agent",
    cell: ({ row }) => {
      const handleCopyId = (e: React.MouseEvent) => {
        e.stopPropagation();
        navigator.clipboard.writeText(row.original.id);
        toast.success("Agent ID copied to clipboard");
      };

      return (
        <div className="flex items-center gap-3 py-1">
          <div className="bg-muted/60 relative flex size-10 shrink-0 items-center justify-center rounded-xl">
            <GeneratedAvatar
              variant="botttsNeutral"
              seed={row.original.name}
              className="size-9"
            />
          </div>

          <div className="flex min-w-0 flex-col">
            <span className="text-foreground group-hover:text-primary truncate text-sm font-medium transition-colors">
              {row.original.name}
            </span>
            <div className="mt-0.5 flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleCopyId}
                title="Copy Agent ID"
                className="hover:text-foreground text-muted-foreground/70 hover:bg-muted/50 inline-flex cursor-pointer items-center gap-1 rounded px-1.5 py-0.5 font-mono text-[10px] transition-colors"
              >
                <span>#{row.original.id.slice(0, 6)}</span>
                <CopyIcon className="size-2.5" />
              </button>
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "instructions",
    header: "Instructions",
    cell: ({ row }) => (
      <span className="text-muted-foreground block max-w-sm truncate text-xs font-normal sm:max-w-md">
        {row.original.instructions || "—"}
      </span>
    ),
  },
  {
    accessorKey: "meetingCount",
    header: "Meetings",
    cell: ({ row }) => (
      <span className="bg-muted/60 text-secondary inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium">
        <VideoIcon className="text-muted-foreground size-3" />
        <span>
          {row.original.meetingCount}{" "}
          {row.original.meetingCount === 1 ? "meeting" : "meetings"}
        </span>
      </span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => (
      <span className="text-muted-foreground/80 text-xs whitespace-nowrap">
        {row.original.createdAt
          ? format(new Date(row.original.createdAt), "MMM d, yyyy")
          : "—"}
      </span>
    ),
  },
  {
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => (
      <div
        className="flex justify-end pr-2"
        onClick={(e) => e.stopPropagation()}
      >
        <AgentRowActions agent={row.original} />
      </div>
    ),
  },
];
