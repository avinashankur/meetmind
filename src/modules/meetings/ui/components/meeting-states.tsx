import Link from "next/link";
import { CircleXIcon, VideoIcon } from "lucide-react";

import GeneratedAvatar from "@/components/generated-avatar";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

const surface =
  "border-border/50 bg-card min-h-[340px] border border-solid shadow-2xs";

const AgentMedia = ({ agentName }: { agentName: string }) => (
  <EmptyMedia>
    <GeneratedAvatar
      seed={agentName}
      variant="botttsNeutral"
      className="ring-background size-16 shadow-sm ring-4"
    />
  </EmptyMedia>
);

interface CallStateProps {
  meetingId: string;
  agentName: string;
}

export const UpcomingState = ({ meetingId, agentName }: CallStateProps) => (
  <Empty className={surface}>
    <EmptyHeader>
      <AgentMedia agentName={agentName} />
      <EmptyTitle>{agentName} is ready when you are</EmptyTitle>
      <EmptyDescription>
        Start the call and {agentName} joins automatically. The summary,
        transcript and recording appear here after the call ends.
      </EmptyDescription>
    </EmptyHeader>
    <EmptyContent>
      <Button asChild>
        <Link href={`/call/${meetingId}`}>
          <VideoIcon data-icon="inline-start" />
          Start call
        </Link>
      </Button>
    </EmptyContent>
  </Empty>
);

export const ActiveState = ({ meetingId, agentName }: CallStateProps) => (
  <Empty className={surface}>
    <EmptyHeader>
      <AgentMedia agentName={agentName} />
      <EmptyTitle>Call in progress</EmptyTitle>
      <EmptyDescription>
        {agentName} is in the call. It ends when you leave or hang up.
      </EmptyDescription>
    </EmptyHeader>
    <EmptyContent>
      <Button asChild>
        <Link href={`/call/${meetingId}`}>
          <VideoIcon data-icon="inline-start" />
          Join call
        </Link>
      </Button>
    </EmptyContent>
  </Empty>
);

export const ProcessingState = () => (
  <Empty className={surface}>
    <EmptyHeader>
      <EmptyMedia variant="icon">
        <Spinner />
      </EmptyMedia>
      <EmptyTitle>Writing the summary</EmptyTitle>
      <EmptyDescription>
        The call has ended and the transcript is being summarised. This page
        updates on its own when it&apos;s ready.
      </EmptyDescription>
    </EmptyHeader>
  </Empty>
);

export const CancelledState = () => (
  <Empty className={surface}>
    <EmptyHeader>
      <EmptyMedia variant="icon">
        <CircleXIcon />
      </EmptyMedia>
      <EmptyTitle>Meeting cancelled</EmptyTitle>
      <EmptyDescription>
        This meeting was cancelled, so there&apos;s no recording or summary.
      </EmptyDescription>
    </EmptyHeader>
  </Empty>
);
