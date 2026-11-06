"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  AlertTriangleIcon,
  PlusIcon,
  RotateCcwIcon,
  SearchXIcon,
  VideoIcon,
} from "lucide-react";

import { useTRPC } from "@/trpc/client";
import { DataTable } from "@/components/data-table";
import { DataPagination } from "@/components/data-pagination";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { DEFAULT_PAGE } from "@/constants";
import { columns } from "../components/columns";
import { NewMeetingDialog } from "../components/new-meeting-dialog";
import {
  isTransitionalStatus,
  MEETING_POLL_INTERVAL_MS,
} from "../components/meeting-status-badge";
import { useMeetingsFilter } from "../../hooks/use-meetings-filter";

export const MeetingsView = () => {
  const trpc = useTRPC();
  const router = useRouter();
  const [filters, setFilters] = useMeetingsFilter();
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const { data } = useSuspenseQuery({
    ...trpc.meetings.getMany.queryOptions({ ...filters }),
    // Live and processing meetings change on the server (webhooks, Inngest).
    // Poll only while one is on screen so the status updates without a reload.
    refetchInterval: (query) =>
      query.state.data?.items.some((m) => isTransitionalStatus(m.status))
        ? MEETING_POLL_INTERVAL_MS
        : false,
  });

  const isAnyFilterActive =
    Boolean(filters.search) ||
    Boolean(filters.status) ||
    Boolean(filters.agentId);

  const onClearFilters = () =>
    setFilters({ status: null, agentId: "", search: "", page: DEFAULT_PAGE });

  if (data.items.length === 0) {
    return (
      <>
        <NewMeetingDialog open={isCreateOpen} onOpenChange={setIsCreateOpen} />
        <Empty className="border-border/50 bg-card border border-solid">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              {isAnyFilterActive ? <SearchXIcon /> : <VideoIcon />}
            </EmptyMedia>
            <EmptyTitle>
              {isAnyFilterActive ? "No matching meetings" : "No meetings yet"}
            </EmptyTitle>
            <EmptyDescription>
              {isAnyFilterActive
                ? "Nothing matches these filters. Try a different search or reset the filters."
                : "Create a meeting with one of your agents. Its recording, transcript and summary will show up here."}
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            {isAnyFilterActive ? (
              <Button variant="outline" size="sm" onClick={onClearFilters}>
                <RotateCcwIcon data-icon="inline-start" />
                Reset filters
              </Button>
            ) : (
              <Button size="sm" onClick={() => setIsCreateOpen(true)}>
                <PlusIcon data-icon="inline-start" />
                New meeting
              </Button>
            )}
          </EmptyContent>
        </Empty>
      </>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <DataTable
        data={data.items}
        columns={columns}
        showHeader
        className="border-border/50 bg-card rounded-xl"
        onRowClick={(row) => router.push(`/meetings/${row.id}`)}
      />

      <div className="flex items-center justify-between gap-4">
        <span className="text-muted-foreground text-xs">
          {data.total} {data.total === 1 ? "meeting" : "meetings"}
        </span>
        {data.totalPages > 1 && (
          <DataPagination
            page={filters.page}
            totalPages={data.totalPages}
            onPageChange={(page) => setFilters({ page })}
          />
        )}
      </div>
    </div>
  );
};

export const MeetingsViewLoading = () => (
  <div className="border-border/50 bg-card overflow-hidden rounded-xl border">
    <div className="bg-muted/40 border-border flex gap-6 border-b px-4 py-3">
      <Skeleton className="h-3 w-24" />
      <Skeleton className="h-3 w-16" />
      <Skeleton className="h-3 w-16" />
    </div>
    <div className="divide-border flex flex-col divide-y">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="flex items-center gap-3 px-4 py-3.5">
          <Skeleton className="size-8 rounded-full" />
          <div className="flex flex-1 flex-col gap-1.5">
            <Skeleton className="h-3.5 w-48" />
            <Skeleton className="h-3 w-24" />
          </div>
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="hidden h-3 w-12 sm:block" />
          <Skeleton className="hidden h-3 w-24 sm:block" />
        </div>
      ))}
    </div>
  </div>
);

export const MeetingsViewError = () => (
  <Empty className="border-border/50 bg-card border border-solid">
    <EmptyHeader>
      <EmptyMedia variant="icon">
        <AlertTriangleIcon />
      </EmptyMedia>
      <EmptyTitle>Couldn&apos;t load meetings</EmptyTitle>
      <EmptyDescription>Check your connection and try again.</EmptyDescription>
    </EmptyHeader>
    <EmptyContent>
      <Button
        variant="outline"
        size="sm"
        onClick={() => window.location.reload()}
      >
        <RotateCcwIcon data-icon="inline-start" />
        Retry
      </Button>
    </EmptyContent>
  </Empty>
);
