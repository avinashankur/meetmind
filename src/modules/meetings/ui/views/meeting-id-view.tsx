"use client";

import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { LoadingState } from "@/components/loading-state";
import { ErrorState } from "@/components/error-state";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { MeetingIdHeader } from "../components/meeting-id-header";
import { UpcomingState } from "../components/upcoming-state";
import { ActiveState } from "../components/active-state";
import { CancelledState } from "../components/cancelled-state";
import { ProcessingState } from "../components/processing-state";
import { CompletedState } from "../components/completed-state";

interface Props {
  meetingId: string;
}

export const MeetingIdView = ({ meetingId }: Props) => {
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: meeting } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId }),
  );

  const removeMeeting = useMutation(
    trpc.meetings.remove.mutationOptions({
      onSuccess: () => {
        toast.success("Meeting deleted successfully");
        queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));
        router.push("/meetings");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }),
  );

  const isActive = meeting.status === "active";
  const isCompleted = meeting.status === "completed";
  const isProcessing = meeting.status === "processing";
  const isUpcoming = meeting.status === "upcoming";
  const isCancelled = meeting.status === "cancelled";

  if (!meeting) return <MeetingIdViewError />;

  return (
    <>
      <div className="mb-10">
        <MeetingIdHeader
          meetingId={meetingId}
          data={meeting}
          removeMeeting={removeMeeting}
        />
      </div>

      {isActive && <ActiveState meetingId={meetingId} />}

      {isCompleted && <CompletedState data={meeting} />}

      {isProcessing && <ProcessingState />}

      {isUpcoming && (
        <UpcomingState
          meetingId={meetingId}
          onCancelMeeting={() => {}}
          isCancelling={false}
        />
      )}

      {isCancelled && <CancelledState />}
    </>
  );
};

export const MeetingIdViewLoading = () => {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <LoadingState title="Loading meeting details..." />
    </div>
  );
};

export const MeetingIdViewError = () => {
  return (
    <ErrorState
      title="Meeting not found"
      description="The meeting you are looking for does not exist or has been deleted."
    />
  );
};
