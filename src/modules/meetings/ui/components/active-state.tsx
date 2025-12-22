import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { VideoIcon } from "lucide-react";
import Link from "next/link";

interface Props {
  meetingId: string;
}

export const ActiveState = ({ meetingId }: Props) => {
  return (
    <div className="rounded-lg bg-white py-8">
      <EmptyState
        title="Meeting is active"
        description="Meeting will end once all participants have left."
        image="/upcoming.svg"
      />
      <div className="mx-auto mt-10 flex w-fit items-center gap-x-2">
        <Button asChild>
          <Link href={`/call/${meetingId}`}>
            <VideoIcon />
            Join Meeting
          </Link>
        </Button>
      </div>
    </div>
  );
};
