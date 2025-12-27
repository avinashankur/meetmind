import {
  CommandResponsiveDialog,
  CommandInput,
  CommandItem,
  CommandList,
  CommandGroup,
  CommandEmpty,
} from "@/components/ui/command";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useState } from "react";
import { useTRPC } from "@/trpc/client";

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
      pageSize: 100,
    }),
  );

  const agents = useQuery(
    trpc.agents.getMany.queryOptions({
      search,
      pageSize: 100,
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
        placeholder="Find a meeting or agent"
      />
      <CommandList>
        <CommandGroup heading="Meetings">
          <CommandEmpty>
            <span>No meetings found</span>
          </CommandEmpty>
          {meetings.data?.items.map((meeting) => (
            <CommandItem
              key={meeting.id}
              onSelect={() => {
                router.push(`/meetings/${meeting.id}`);
                setOpen(false);
              }}
            >
              {meeting.name}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandGroup heading="Agents">
          <CommandEmpty>
            <span>No agents found</span>
          </CommandEmpty>
          {agents.data?.items.map((agent) => (
            <CommandItem
              key={agent.id}
              onSelect={() => {
                router.push(`/agents/${agent.id}`);
                setOpen(false);
              }}
            >
              {agent.name}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandResponsiveDialog>
  );
};
