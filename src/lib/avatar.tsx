import { createAvatar } from "@dicebear/core";
import { botttsNeutral, avataaarsNeutral } from "@dicebear/collection";

interface Props {
  seed: string;
  variant: "botttsNeutral" | "avataaarsNeutral";
}

export const generateAvatarUri = ({ seed, variant }: Props) => {
  let avatar;

  if (variant === "avataaarsNeutral") {
    avatar = createAvatar(avataaarsNeutral, {
      seed,
    });
  } else {
    avatar = createAvatar(botttsNeutral, {
      seed,
    });
  }

  return avatar.toDataUri();
};
