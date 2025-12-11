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

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger className="flex cursor-pointer items-center justify-between rounded-lg border bg-neutral-100 p-2">
          <div className="flex items-center gap-4">
            {data.user.image ? (
              <Avatar>
                <AvatarImage src={data.user.image} />
              </Avatar>
            ) : (
              <GeneratedAvatar
                seed={data.user.name}
                variant="avataaarsNeutral"
              />
            )}
            <div className="flex flex-col text-left text-sm">
              <p className="font-medium">{data.user.name}</p>
              <p className="text-muted-foreground">{data.user.email}</p>
            </div>
          </div>
          <ChevronDownIcon className="size-4" />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="flex items-center gap-2">
            {data.user.image ? (
              <Avatar>
                <AvatarImage src={data.user.image} />
              </Avatar>
            ) : (
              <GeneratedAvatar
                seed={data.user.name}
                variant="avataaarsNeutral"
              />
            )}
            <div>
              <DrawerTitle>{data.user.name}</DrawerTitle>
              <DrawerDescription>{data.user.email}</DrawerDescription>
            </div>
          </DrawerHeader>

          <DrawerFooter>
            <Button className="cursor-pointer" variant="outline">
              <CreditCardIcon className="size-4" />
              Billing
            </Button>
            <Button
              className="cursor-pointer"
              onClick={handleSignOut}
              variant="destructive"
            >
              <LogOutIcon className="size-4" />
              Log Out
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex cursor-pointer items-center justify-between rounded-lg border bg-neutral-100 p-2">
        <div className="flex items-center gap-4">
          {data.user.image ? (
            <Avatar>
              <AvatarImage src={data.user.image} />
            </Avatar>
          ) : (
            <GeneratedAvatar seed={data.user.name} variant="avataaarsNeutral" />
          )}
          <div className="flex flex-col text-left text-sm">
            <p className="font-medium">{data.user.name}</p>
            <p className="text-muted-foreground">{data.user.email}</p>
          </div>
        </div>
        <ChevronDownIcon className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60">
        <DropdownMenuLabel>
          <div className="flex flex-col">
            <span className="truncate font-medium">{data.user.name}</span>
            <span className="text-muted-foreground">{data.user.email}</span>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer">
          <CreditCardIcon className="size-4" />
          Billing
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={handleSignOut}>
          <LogOutIcon className="size-4" />
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
