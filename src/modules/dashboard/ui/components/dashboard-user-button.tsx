"use client";

import GeneratedAvatar from "@/components/generated-avatar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { authClient } from "@/lib/auth-client";
import { ChevronDownIcon, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const triggerClassName =
  "group border-sidebar-border/70 bg-card/70 text-foreground hover:bg-card data-[state=open]:bg-card flex w-full cursor-pointer items-center gap-2.5 rounded-xl border p-2 text-left shadow-2xs outline-hidden transition-colors focus-visible:ring-2 focus-visible:ring-sidebar-ring";

const chevronClassName =
  "text-muted-foreground size-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180";

export default function DashboardUserButton() {
  const { data } = authClient.useSession();
  const isMobile = useIsMobile();
  const router = useRouter();

  const handleSignOut = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      },
    });
  };

  if (!data || !data.user) return null;

  const userAvatar = data.user.image ? (
    <Avatar className="size-8 rounded-full">
      <AvatarImage src={data.user.image} />
    </Avatar>
  ) : (
    <GeneratedAvatar
      seed={data.user.name}
      variant="avataaarsNeutral"
      className="size-8 rounded-full"
    />
  );

  const userInfo = (
    <div className="flex min-w-0 flex-1 flex-col">
      <span className="text-foreground truncate text-sm font-medium">
        {data.user.name}
      </span>
      <span className="text-muted-foreground truncate text-xs">
        {data.user.email}
      </span>
    </div>
  );

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger className={triggerClassName}>
          {userAvatar}
          {userInfo}
          <ChevronDownIcon className={chevronClassName} />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="flex items-center gap-3">
            {userAvatar}
            <div className="min-w-0">
              <DrawerTitle className="truncate text-left">
                {data.user.name}
              </DrawerTitle>
              <DrawerDescription className="truncate text-left text-xs">
                {data.user.email}
              </DrawerDescription>
            </div>
          </DrawerHeader>

          <DrawerFooter>
            <Button
              className="cursor-pointer justify-start gap-2 rounded-xl"
              onClick={handleSignOut}
              variant="destructive"
            >
              <LogOutIcon className="size-4" />
              <span>Sign out</span>
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={triggerClassName}>
        {userAvatar}
        {userInfo}
        <ChevronDownIcon className={chevronClassName} />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="border-border/80 bg-card/98 text-card-foreground dark:bg-card/90 w-(--radix-dropdown-menu-trigger-width) min-w-0 rounded-xl p-1.5 shadow-xl backdrop-blur-md"
        align="end"
        side="top"
        sideOffset={6}
      >
        <DropdownMenuLabel className="px-2.5 py-2 font-normal">
          <div className="flex min-w-0 flex-col">
            <span className="text-foreground truncate text-sm font-medium">
              {data.user.name}
            </span>
            <span className="text-muted-foreground truncate text-xs">
              {data.user.email}
            </span>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-border/60 my-1" />

        <DropdownMenuGroup>
          <DropdownMenuItem
            variant="destructive"
            className="cursor-pointer gap-2.5 rounded-lg px-2.5 py-2 text-xs font-medium transition-colors"
            onClick={handleSignOut}
          >
            <LogOutIcon className="size-3.5" />
            <span>Sign out</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
