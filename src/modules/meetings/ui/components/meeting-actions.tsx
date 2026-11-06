"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  CopyIcon,
  ExternalLinkIcon,
  LinkIcon,
  MoreHorizontalIcon,
  PencilIcon,
  Trash2Icon,
  VideoIcon,
} from "lucide-react";

import { useTRPC } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { MeetingGetOne, MeetingStatus } from "../../types";
import { UpdateMeetingDialog } from "./update-meeting-dialog";

interface Props {
  meeting: MeetingGetOne;
  /** "list" hides "View details" when already on the detail page. */
  context: "list" | "detail";
}

const itemClassName =
  "hover:bg-accent focus:bg-accent text-foreground cursor-pointer gap-2.5 rounded-lg px-2.5 py-2 text-xs font-medium transition-colors";
const iconClassName = "text-muted-foreground size-3.5";

export const MeetingActions = ({ meeting, context }: Props) => {
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const canJoin =
    meeting.status === MeetingStatus.Upcoming ||
    meeting.status === MeetingStatus.Active;

  const removeMeeting = useMutation(
    trpc.meetings.remove.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.meetings.getMany.queryFilter(),
        );
        toast.success(`Meeting "${meeting.name}" deleted`);
        setIsDeleteOpen(false);
        if (context === "detail") router.push("/meetings");
      },
      onError: (error) => toast.error(error.message),
    }),
  );

  const copy = (value: string, label: string) => {
    navigator.clipboard.writeText(value);
    toast.success(`${label} copied to clipboard`);
  };

  // Table rows are clickable. Portalled dialogs and menus still bubble React
  // events through this tree, so stop them here or they'd open the meeting.
  const stop = (e: React.SyntheticEvent) => e.stopPropagation();

  return (
    <div className="contents" onClick={stop}>
      <UpdateMeetingDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        initialValues={meeting}
      />

      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent className="sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {meeting.name}?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently deletes the meeting along with its summary,
              transcript and recording links. This can&apos;t be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={removeMeeting.isPending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={removeMeeting.isPending}
              className="bg-destructive hover:bg-destructive/90 text-white"
              onClick={(e) => {
                e.preventDefault();
                removeMeeting.mutate({ id: meeting.id });
              }}
            >
              {removeMeeting.isPending && <Spinner data-icon="inline-start" />}
              {removeMeeting.isPending ? "Deleting..." : "Delete meeting"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground hover:bg-muted/80 data-[state=open]:bg-muted data-[state=open]:text-foreground size-8 rounded-lg"
            aria-label={`Actions for ${meeting.name}`}
          >
            <MoreHorizontalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          sideOffset={6}
          className="border-border/80 bg-card/98 text-card-foreground dark:bg-card/90 min-w-[190px] rounded-xl p-1.5 shadow-xl backdrop-blur-md"
        >
          <DropdownMenuGroup>
            {context === "list" && (
              <DropdownMenuItem asChild className={itemClassName}>
                <Link href={`/meetings/${meeting.id}`}>
                  <ExternalLinkIcon className={iconClassName} />
                  Show meeting
                </Link>
              </DropdownMenuItem>
            )}
            {canJoin && (
              <DropdownMenuItem asChild className={itemClassName}>
                <Link href={`/call/${meeting.id}`}>
                  <VideoIcon className={iconClassName} />
                  {meeting.status === MeetingStatus.Active
                    ? "Join call"
                    : "Start call"}
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem
              className={itemClassName}
              onSelect={() => setIsEditOpen(true)}
            >
              <PencilIcon className={iconClassName} />
              Edit meeting
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator className="bg-border/60 my-1" />
          <DropdownMenuGroup>
            <DropdownMenuItem
              className={itemClassName}
              onSelect={() =>
                copy(
                  `${window.location.origin}/meetings/${meeting.id}`,
                  "Meeting link",
                )
              }
            >
              <LinkIcon className={iconClassName} />
              Copy link
            </DropdownMenuItem>
            <DropdownMenuItem
              className={itemClassName}
              onSelect={() => copy(meeting.id, "Meeting ID")}
            >
              <CopyIcon className={iconClassName} />
              Copy meeting ID
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator className="bg-border/60 my-1" />
          <DropdownMenuGroup>
            <DropdownMenuItem
              variant="destructive"
              className="cursor-pointer gap-2.5 rounded-lg px-2.5 py-2 text-xs font-medium"
              onSelect={() => setIsDeleteOpen(true)}
            >
              <Trash2Icon className="size-3.5" />
              Delete meeting
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
