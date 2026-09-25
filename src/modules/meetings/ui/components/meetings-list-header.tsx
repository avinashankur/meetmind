"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon, RotateCcwIcon } from "lucide-react";
import { NewMeetingDialog } from "./new-meeting-dialog";
import { useState } from "react";
import { MeetingsSearchFilter } from "./meetings-search-filter";
import { useMeetingsFilter } from "../../hooks/use-meetings-filter";
import { DEFAULT_PAGE } from "@/constants";
import { AgentIdFilter } from "./agent-id-filter";
import { StatusFilter } from "./status-filter";

export const MeetingsListHeader = () => {
  const [filters, setFilters] = useMeetingsFilter();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const isAnyFilterModified =
    Boolean(filters.search) ||
    Boolean(filters.status) ||
    Boolean(filters.agentId);

  const onClearFilters = () => {
    setFilters({
      status: null,
      agentId: "",
      search: "",
      page: DEFAULT_PAGE,
    });
  };

  return (
    <>
      <NewMeetingDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />

      <div className="flex flex-col gap-3 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-wrap items-center gap-2">
          <MeetingsSearchFilter />
          <StatusFilter />
          <AgentIdFilter />
          {isAnyFilterModified && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClearFilters}
              className="text-muted-foreground hover:text-foreground h-9 gap-1.5 rounded-md px-3 text-xs font-normal sm:text-sm"
            >
              <RotateCcwIcon className="size-3.5" />
              <span>Reset</span>
            </Button>
          )}
        </div>

        <Button
          onClick={() => setIsDialogOpen(true)}
          className="bg-primary text-primary-foreground flex h-9 shrink-0 items-center gap-2 self-start rounded-md px-4 text-sm font-medium transition-all hover:opacity-90 sm:self-auto"
        >
          <PlusIcon className="size-4" />
          <span>New meeting</span>
        </Button>
      </div>
    </>
  );
};
