"use client";

import Link from "next/link";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowLeftIcon, SearchXIcon } from "lucide-react";

import { useTRPC } from "@/trpc/client";
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
import { MeetingStatus } from "../../types";
import { MeetingIdHeader } from "../components/meeting-id-header";
import {
  ActiveState,
  CancelledState,
  ProcessingState,
  UpcomingState,
} from "../components/meeting-states";
import { CompletedState } from "../components/completed-state";
import {
  isTransitionalStatus,
  MEETING_POLL_INTERVAL_MS,
} from "../components/meeting-status-badge";

interface Props {
  meetingId: string;
}

export const MeetingIdView = ({ meetingId }: Props) => {
  const trpc = useTRPC();

  const { data: meeting } = useSuspenseQuery({
    ...trpc.meetings.getOne.queryOptions({ id: meetingId }),
    // Picks up active → processing → completed without a reload.
    refetchInterval: (query) =>
      query.state.data && isTransitionalStatus(query.state.data.status)
        ? MEETING_POLL_INTERVAL_MS
        : false,
  });

  return (
    <div className="flex min-w-0 flex-col gap-6">
      <MeetingIdHeader data={meeting} />

      {meeting.status === MeetingStatus.Upcoming && (
        <UpcomingState meetingId={meetingId} agentName={meeting.agent.name} />
      )}
      {meeting.status === MeetingStatus.Active && (
        <ActiveState meetingId={meetingId} agentName={meeting.agent.name} />
      )}
      {meeting.status === MeetingStatus.Processing && <ProcessingState />}
      {meeting.status === MeetingStatus.Completed && (
        <CompletedState data={meeting} />
      )}
      {meeting.status === MeetingStatus.Cancelled && <CancelledState />}
    </div>
  );
};

export const MeetingIdViewLoading = () => (
  <div className="flex flex-col gap-8">
    <div className="flex flex-col gap-6">
      <Skeleton className="h-4 w-40" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-7 w-64" />
        <Skeleton className="h-3.5 w-80" />
      </div>
    </div>
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-[74px] rounded-xl" />
      ))}
    </div>
    <Skeleton className="h-[420px] w-full rounded-xl" />
  </div>
);

export const MeetingIdViewError = () => (
  <Empty className="border-border/50 bg-card min-h-[340px] border border-solid shadow-2xs">
    <EmptyHeader>
      <EmptyMedia variant="icon">
        <SearchXIcon />
      </EmptyMedia>
      <EmptyTitle>Meeting not found</EmptyTitle>
      <EmptyDescription>
        It may have been deleted, or the link is wrong.
      </EmptyDescription>
    </EmptyHeader>
    <EmptyContent>
      <Button asChild variant="outline" size="sm">
        <Link href="/meetings">
          <ArrowLeftIcon data-icon="inline-start" />
          Back to meetings
        </Link>
      </Button>
    </EmptyContent>
  </Empty>
);
