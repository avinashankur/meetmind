import { LogInIcon } from "lucide-react";
import {
  DefaultVideoPlaceholder,
  StreamVideoParticipant,
  ToggleAudioPreviewButton,
  ToggleVideoPreviewButton,
  useCallStateHooks,
  VideoPreview,
} from "@stream-io/video-react-sdk";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import { authClient } from "@/lib/auth-client";
import { generateAvatarUri } from "@/lib/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  onJoin: () => void;
}

const DisabledVideoPreview = () => {
  const { data } = authClient.useSession();

  return (
    <DefaultVideoPlaceholder
      participant={
        {
          name: data?.user.name ?? "",
          image:
            data?.user.image ??
            generateAvatarUri({
              seed: data?.user.name ?? "",
              variant: "avataaarsNeutral",
            }),
        } as StreamVideoParticipant
      }
    />
  );
};

const AllowBrowserPermissions = () => {
  return (
    <p className="text-sm">
      Please grant your browser a permission to access your camera and
      microphone.
    </p>
  );
};

export const CallLobby = ({ onJoin }: Props) => {
  const { useCameraState, useMicrophoneState } = useCallStateHooks();

  const { hasBrowserPermission: hasMicPermission } = useCameraState();
  const { hasBrowserPermission: hasCamPermission } = useMicrophoneState();

  const hasBrowserMediaPermission = hasCamPermission && hasMicPermission;

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="mb-4 text-center">
        <h6 className="font-medium text-white">Ready to join?</h6>
        <p className="text-muted-foreground text-sm">
          Set up your call before joining
        </p>
      </div>
      <div>
        <VideoPreview
          DisabledVideoPreview={
            hasBrowserMediaPermission
              ? DisabledVideoPreview
              : AllowBrowserPermissions
          }
        />
        <div className="mt-2 flex gap-x-2">
          <ToggleVideoPreviewButton />
          <ToggleAudioPreviewButton />
        </div>

        <div className="mt-10 flex justify-between gap-x-2">
          <Button variant="outline" asChild>
            <Link href={"/meetings"}>Cancel</Link>
          </Button>
          <Button onClick={onJoin}>
            <LogInIcon />
            Join
          </Button>
        </div>
      </div>
    </div>
  );
};
