"use client";

import { useTRPC } from "@/trpc/client";
import { useMeetingsFilter } from "../../hooks/use-meetings-filter";
import { useQuery } from "@tanstack/react-query";
import GeneratedAvatar from "@/components/generated-avatar";
import { BotIcon } from "lucide-react";
import { DEFAULT_PAGE } from "@/constants";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const AgentIdFilter = () => {
  const [filters, setFilters] = useMeetingsFilter();
  const trpc = useTRPC();
  const { data } = useQuery(
    trpc.agents.getMany.queryOptions({ pageSize: 100 }),
  );

  const handleValueChange = (value: string) => {
    setFilters({
      agentId: value === "all" ? "" : value,
      page: DEFAULT_PAGE,
    });
  };

  return (
    <Select value={filters.agentId || "all"} onValueChange={handleValueChange}>
      <SelectTrigger
        className="h-9 w-auto max-w-[200px] min-w-[140px] text-xs sm:text-sm"
        aria-label="Filter by agent"
      >
        <SelectValue placeholder="All agents" />
      </SelectTrigger>
      <SelectContent position="popper" align="start" className="max-h-72">
        <SelectGroup>
          <SelectItem value="all">
            <BotIcon className="text-muted-foreground size-3.5" />
            <span>All agents</span>
          </SelectItem>
          {(data?.items ?? []).map((agent) => (
            <SelectItem key={agent.id} value={agent.id}>
              <GeneratedAvatar
                seed={agent.name}
                variant="botttsNeutral"
                className="size-4 shrink-0 rounded-full"
              />
              <span className="truncate">{agent.name}</span>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
