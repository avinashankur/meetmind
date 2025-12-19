"use client";

import { DataTable } from "@/components/data-table";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { columns } from "../components/columns";
import { LoadingState } from "@/components/loading-state";
import { ErrorState } from "@/components/error-state";
import { EmptyState } from "@/components/empty-state";

export const MeetingsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));

  return (
    <div>
      <DataTable data={data.items} columns={columns} />
      {data.items.length === 0 && (
        <EmptyState
          title="Create your first Meeting"
          description="Schedule a meeting to connect with others. Each meeting lets you collborat, share ideas, and interact with participants in real time."
        />
      )}
    </div>
  );
};

export const MeetingsViewLoading = () => {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <LoadingState title="Loading meetings" />
    </div>
  );
};

export const MeetingsViewError = () => {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <ErrorState title="Something went wrong" />
    </div>
  );
};
