"use client";

import {
  CommandResponsiveDialog,
  CommandInput,
  CommandItem,
  CommandList,
  CommandGroup,
} from "@/components/ui/command";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useState } from "react";
import { useTRPC } from "@/trpc/client";
import { VideoIcon } from "lucide-react";
import GeneratedAvatar from "@/components/generated-avatar";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const DashboardCommand = ({ open, setOpen }: Props) => {
  const router = useRouter();
  const trpc = useTRPC();

  const [search, setSearch] = useState("");

  const meetings = useQuery(
    trpc.meetings.getMany.queryOptions({
      search,
      pageSize: 50,
    }),
  );

  const agents = useQuery(
    trpc.agents.getMany.queryOptions({
      search,
      pageSize: 50,
    }),
  );

  return (
    <CommandResponsiveDialog
      shouldFilter={false}
      open={open}
      onOpenChange={setOpen}
    >
      <CommandInput
        value={search}
        onValueChange={(value) => setSearch(value)}
        placeholder="Search meetings and agents..."
      />
      <CommandList>
        <CommandGroup heading="Meetings">
          {meetings.data?.items.length === 0 ? (
            <div className="text-muted-foreground py-3 text-center text-xs">
              No meetings found
            </div>
          ) : (
            meetings.data?.items.map((meeting) => (
              <CommandItem
                key={meeting.id}
                className="flex cursor-pointer items-center gap-2 py-2"
                onSelect={() => {
                  router.push(`/meetings/${meeting.id}`);
                  setOpen(false);
                }}
              >
                <VideoIcon className="text-muted-foreground size-4 shrink-0" />
                <span className="truncate">{meeting.name}</span>
              </CommandItem>
            ))
          )}
        </CommandGroup>

        <CommandGroup heading="Agents">
          {agents.data?.items.length === 0 ? (
            <div className="text-muted-foreground py-3 text-center text-xs">
              No agents found
            </div>
          ) : (
            agents.data?.items.map((agent) => (
              <CommandItem
                key={agent.id}
                className="flex cursor-pointer items-center gap-2 py-2"
                onSelect={() => {
                  router.push(`/agents/${agent.id}`);
                  setOpen(false);
                }}
              >
                <GeneratedAvatar
                  seed={agent.name}
                  variant="botttsNeutral"
                  className="ring-border size-4 shrink-0 rounded-full ring-1"
                />
                <span className="truncate">{agent.name}</span>
              </CommandItem>
            ))
          )}
        </CommandGroup>
      </CommandList>
    </CommandResponsiveDialog>
  );
};
