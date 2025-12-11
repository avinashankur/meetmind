import { createAvatar } from "@dicebear/core";
import { avataaarsNeutral, botttsNeutral } from "@dicebear/collection";

import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

interface GeneratedAvatarProps {
  seed: string;
  className?: string;
  variant: "avataaarsNeutral" | "botttsNeutral";
}

export default function GeneratedAvatar({
  seed,
  className,
  variant,
}: GeneratedAvatarProps) {
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

  return (
    <Avatar className={cn(className)}>
      <AvatarImage src={avatar.toDataUri()} alt="Avatar" />
      <AvatarFallback>{seed.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
}
