"use client";

import { authClient } from "@/lib/auth-client";
import { Skeleton } from "@/components/ui/skeleton";
import { ChatUI } from "./chat-ui";

interface Props {
  meetingId: string;
  agentName: string;
}

export const ChatProvider = ({ meetingId, agentName }: Props) => {
  const { data, isPending } = authClient.useSession();

  if (isPending || !data?.user) {
    return <Skeleton className="h-[420px] w-full rounded-xl" />;
  }

  return (
    <ChatUI
      meetingId={meetingId}
      agentName={agentName}
      userId={data.user.id}
      userName={data.user.name}
      userImage={data.user.image ?? undefined}
    />
  );
};
