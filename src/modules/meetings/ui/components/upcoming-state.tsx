import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { VideoIcon } from "lucide-react";
import Link from "next/link";

interface Props {
  meetingId: string;
}

export const UpcomingState = ({ meetingId }: Props) => {
  return (
    <div className="rounded-lg bg-white py-8">
      <EmptyState
        title="Upcoming Meeting"
        description="Your meeting is scheduled for the future."
        image="/upcoming.svg"
      />
      <div className="mx-auto mt-10 flex w-fit items-center gap-x-2">
        <Button asChild>
          <Link href={`/call/${meetingId}`}>
            <VideoIcon />
            Start Meeting
          </Link>
        </Button>
      </div>
    </div>
  );
};
