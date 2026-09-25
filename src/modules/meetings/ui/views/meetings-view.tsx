"use client";

import { useState } from "react";
import { DataTable } from "@/components/data-table";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { columns } from "../components/columns";
import { useRouter } from "next/navigation";
import { useMeetingsFilter } from "../../hooks/use-meetings-filter";
import { DataPagination } from "@/components/data-pagination";
import { NewMeetingDialog } from "../components/new-meeting-dialog";
import { DEFAULT_PAGE } from "@/constants";
import { Button } from "@/components/ui/button";
import {
  PlusIcon,
  RotateCcwIcon,
  AlertTriangleIcon,
  SearchXIcon,
  Loader2Icon,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export const MeetingsView = () => {
  const trpc = useTRPC();
  const [filters, setFilters] = useMeetingsFilter();
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
  const router = useRouter();

  const { data } = useSuspenseQuery(
    trpc.meetings.getMany.queryOptions({ ...filters }),
  );

  const isAnyFilterActive =
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
      <NewMeetingDialog open={isCreateOpen} onOpenChange={setIsCreateOpen} />

      {data.items.length > 0 ? (
        <div className="space-y-4">
          {/* Surface Plate */}
          <div className="border-border bg-card overflow-hidden rounded-2xl border shadow-xs backdrop-blur-sm">
            {/* Top Bar */}
            <div className="border-border bg-muted/20 flex items-center justify-between border-b px-5 py-3 text-xs">
              <span className="text-primary font-medium">
                All meetings ({data.total})
              </span>
            </div>

            {/* Table */}
            <DataTable
              data={data.items}
              columns={columns}
              showHeader={true}
              className="rounded-none border-0 bg-transparent"
              onRowClick={(row) => router.push(`/meetings/${row.id}`)}
            />
          </div>

          {/* Pagination Controls */}
          {data.totalPages > 1 && (
            <DataPagination
              page={filters.page}
              totalPages={data.totalPages}
              onPageChange={(page) => setFilters({ page })}
            />
          )}
        </div>
      ) : isAnyFilterActive ? (
        /* Empty State: No Matches */
        <div className="border-border bg-card rounded-2xl border p-10 text-center shadow-xs backdrop-blur-sm sm:p-14">
          <div className="bg-muted/60 border-border mx-auto flex size-12 items-center justify-center rounded-full border">
            <SearchXIcon className="text-muted-foreground size-5" />
          </div>

          <h3 className="text-primary mt-4 text-lg font-medium tracking-tight">
            No meetings match your filter
          </h3>

          <p className="text-secondary mx-auto mt-1 max-w-md text-xs sm:text-sm">
            No meetings matched your search criteria. Try resetting your
            filters.
          </p>

          <div className="mt-5">
            <Button
              variant="outline"
              size="sm"
              onClick={onClearFilters}
              className="border-border hover:bg-muted/80 h-9 gap-2 rounded-full px-4 text-xs"
            >
              <RotateCcwIcon className="size-3.5" />
              <span>Reset filters</span>
            </Button>
          </div>
        </div>
      ) : (
        /* Empty State: First Time */
        <div className="border-border bg-card relative overflow-hidden rounded-2xl border p-8 text-center shadow-xs backdrop-blur-sm sm:p-14">
          <div className="bg-brand/5 border-brand/20 relative mx-auto mb-5 flex size-16 items-center justify-center rounded-full border">
            <svg
              className="text-brand size-8"
              viewBox="0 0 40 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle
                cx="20"
                cy="20"
                r="16"
                strokeDasharray="3 3"
                opacity="0.6"
              />
              <circle cx="20" cy="20" r="10" opacity="0.8" />
              <circle cx="20" cy="20" r="4" fill="currentColor" />
            </svg>
          </div>

          <h2 className="text-primary text-xl font-medium tracking-tight sm:text-2xl">
            No meetings yet
          </h2>

          <p className="text-secondary mx-auto mt-1.5 max-w-md text-xs sm:text-sm">
            Schedule your first meeting with an AI agent to get automated
            recordings, transcripts, and summaries.
          </p>

          <div className="mt-6 flex justify-center">
            <Button
              onClick={() => setIsCreateOpen(true)}
              className="bg-primary text-primary-foreground flex h-9 items-center gap-2 rounded-md px-4 text-sm font-medium shadow-xs transition-all hover:opacity-90"
            >
              <PlusIcon className="size-4" />
              <span>Create meeting</span>
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export const MeetingsViewLoading = () => {
  return (
    <div className="border-border bg-card overflow-hidden rounded-2xl border shadow-xs backdrop-blur-sm">
      <div className="border-border bg-muted/20 flex items-center justify-between border-b px-5 py-3">
        <div className="flex items-center gap-2">
          <Loader2Icon className="text-muted-foreground size-3.5 animate-spin" />
          <span className="text-muted-foreground text-xs font-medium">
            Loading meetings...
          </span>
        </div>
        <Skeleton className="bg-muted h-4 w-20 rounded-sm" />
      </div>

      <div className="bg-muted/40 border-border grid grid-cols-4 gap-4 border-b px-5 py-3">
        <Skeleton className="bg-muted h-3 w-32 rounded-sm" />
        <Skeleton className="bg-muted h-3 w-24 rounded-sm" />
        <Skeleton className="bg-muted h-3 w-20 rounded-sm" />
        <Skeleton className="bg-muted ml-auto h-3 w-16 rounded-sm" />
      </div>

      <div className="divide-border divide-y">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="space-y-2">
              <Skeleton className="bg-muted h-4 w-48 rounded-sm sm:w-64" />
              <div className="flex items-center gap-2">
                <Skeleton className="bg-muted size-4 rounded-full" />
                <Skeleton className="bg-muted h-3 w-24 rounded-sm" />
                <Skeleton className="bg-muted h-3 w-16 rounded-sm" />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Skeleton className="bg-muted h-6 w-20 rounded-full" />
              <Skeleton className="bg-muted hidden h-4 w-16 rounded-sm sm:block" />
              <Skeleton className="bg-muted h-4 w-12 rounded-sm" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const MeetingsViewError = () => {
  return (
    <div className="border-border bg-card rounded-2xl border p-8 text-center shadow-xs backdrop-blur-sm sm:p-12">
      <div className="mx-auto flex size-12 items-center justify-center rounded-full border border-rose-500/20 bg-rose-500/10 text-rose-600 dark:text-rose-400">
        <AlertTriangleIcon className="size-5" />
      </div>

      <h3 className="text-primary mt-3 text-lg font-medium tracking-tight">
        Something went wrong
      </h3>

      <p className="text-secondary mx-auto mt-1 max-w-md text-xs sm:text-sm">
        Failed to load meetings. Please check your connection and try again.
      </p>

      <div className="mt-5">
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.location.reload()}
          className="border-border hover:bg-muted/80 h-9 gap-2 rounded-full px-4 text-xs"
        >
          <RotateCcwIcon className="size-3.5" />
          <span>Retry</span>
        </Button>
      </div>
    </div>
  );
};
