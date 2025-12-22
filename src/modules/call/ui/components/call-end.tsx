import "@stream-io/video-react-sdk/dist/css/styles.css";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeftIcon } from "lucide-react";

export const CallEnd = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="mb-4 text-center">
        <h6 className="font-medium text-white">You have ended the call</h6>
        <p className="text-muted-foreground text-sm">
          Summary will appear in a moment.
        </p>
      </div>
      <div>
        <div className="mt-10 flex justify-between gap-x-2">
          <Button variant="outline" asChild>
            <Link href={"/meetings"}>
              <ChevronLeftIcon className="mr-2 h-4 w-4" />
              Return to meetings
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
