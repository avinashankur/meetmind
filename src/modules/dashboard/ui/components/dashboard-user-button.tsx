"use client";

import GeneratedAvatar from "@/components/generated-avatar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
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
import { ChevronDownIcon, CreditCardIcon, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function DashboardUserButton() {
  const { data } = authClient.useSession();
  const isMobile = useIsMobile();
  const router = useRouter();

  const handleSignOut = () => {
    authClient.signOut({
      fetchOptions: {
        onRequest: () => {},
        onSuccess: () => {
          router.push("/sign-in");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
          console.log(ctx.error);
        },
      },
    });
  };

  if (!data || !data.user) return null;

  const userAvatar = data.user.image ? (
    <Avatar className="ring-border size-8 rounded-full ring-1">
      <AvatarImage src={data.user.image} />
    </Avatar>
  ) : (
    <GeneratedAvatar
      seed={data.user.name}
      variant="avataaarsNeutral"
      className="ring-border size-8 rounded-full ring-1"
    />
  );

  const userInfo = (
    <div className="flex min-w-0 flex-1 flex-col text-left">
      <span className="text-foreground truncate text-sm font-medium">
        {data.user.name}
      </span>
      <span className="text-muted-foreground truncate font-mono text-[11px]">
        {data.user.email}
      </span>
    </div>
  );

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger className="border-border bg-card/70 hover:bg-card text-foreground flex w-full cursor-pointer items-center justify-between gap-3 rounded-xl border p-2 shadow-2xs transition-colors">
          <div className="flex min-w-0 flex-1 items-center gap-2.5">
            {userAvatar}
            {userInfo}
          </div>
          <ChevronDownIcon className="text-muted-foreground size-4 shrink-0" />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="flex items-center gap-3">
            {userAvatar}
            <div>
              <DrawerTitle className="text-left">{data.user.name}</DrawerTitle>
              <DrawerDescription className="text-left font-mono text-xs">
                {data.user.email}
              </DrawerDescription>
            </div>
          </DrawerHeader>

          <DrawerFooter className="gap-2">
            <Button
              className="cursor-pointer justify-start gap-2 rounded-xl"
              variant="outline"
              onClick={() => router.push("/upgrade")}
            >
              <CreditCardIcon className="size-4" />
              <span>Billing & Plan</span>
            </Button>
            <Button
              className="cursor-pointer justify-start gap-2 rounded-xl"
              onClick={handleSignOut}
              variant="destructive"
            >
              <LogOutIcon className="size-4" />
              <span>Log Out</span>
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="border-border bg-card/70 hover:bg-card text-foreground flex w-full cursor-pointer items-center justify-between gap-3 rounded-xl border p-2 shadow-2xs outline-hidden transition-colors">
        <div className="flex min-w-0 flex-1 items-center gap-2.5">
          {userAvatar}
          {userInfo}
        </div>
        <ChevronDownIcon className="text-muted-foreground size-4 shrink-0" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="border-border bg-popover w-56 rounded-xl shadow-md"
        align="end"
        side="top"
      >
        <DropdownMenuLabel className="py-2 font-normal">
          <div className="flex flex-col space-y-0.5">
            <span className="text-foreground truncate text-sm font-medium">
              {data.user.name}
            </span>
            <span className="text-muted-foreground truncate font-mono text-[11px]">
              {data.user.email}
            </span>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-border" />

        <DropdownMenuItem
          className="cursor-pointer gap-2 py-2 text-xs"
          onClick={() => router.push("/upgrade")}
        >
          <CreditCardIcon className="text-muted-foreground size-4" />
          <span>Billing & Plan</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-border" />

        <DropdownMenuItem
          className="cursor-pointer gap-2 py-2 text-xs text-rose-600 focus:text-rose-600 dark:text-rose-400 dark:focus:text-rose-400"
          onClick={handleSignOut}
        >
          <LogOutIcon className="size-4" />
          <span>Log Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
