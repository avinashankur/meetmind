"use client";

import { useState } from "react"; // 1. Import useState
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { format } from "date-fns";
import { CalendarDays, MoreVertical, Trash2Icon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LoadingState } from "@/components/loading-state";
import { ErrorState } from "@/components/error-state";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { UpdateMeetingDialog } from "../components/update-meeting-dialog";

interface Props {
  meetingId: string;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-emerald-500/15 text-emerald-700 hover:bg-emerald-500/25 border-emerald-200";
    case "active":
      return "bg-blue-500/15 text-blue-700 hover:bg-blue-500/25 border-blue-200 animate-pulse";
    case "upcoming":
      return "bg-yellow-500/15 text-yellow-700 hover:bg-yellow-500/25 border-yellow-200";
    case "cancelled":
      return "bg-rose-500/15 text-rose-700 hover:bg-rose-500/25 border-rose-200";
    default:
      return "bg-gray-500/15 text-gray-700 border-gray-200";
  }
};

export const MeetingIdView = ({ meetingId }: Props) => {
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [updateMeetingDialogOpen, setUpdateMeetingDialogOpen] = useState(false);

  const { data: meeting } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId }),
  );

  const removeMeeting = useMutation(
    trpc.meetings.remove.mutationOptions({
      onSuccess: () => {
        toast.success("Meeting deleted successfully");
        queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));
        router.push("/meetings");
      },
      onError: (error) => {
        toast.error(error.message);
        setShowDeleteDialog(false);
      },
    }),
  );

  if (!meeting) return <MeetingIdViewError />;

  return (
    <>
      <UpdateMeetingDialog
        open={updateMeetingDialogOpen}
        onOpenChange={setUpdateMeetingDialogOpen}
        initialValues={meeting}
      />
      <div className="space-y-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/meetings">Meetings</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{meeting.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* --- Header Section --- */}
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight">
                {meeting.name}
              </h1>
              <Badge
                variant="outline"
                className={getStatusColor(meeting.status)}
              >
                {meeting.status}
              </Badge>
            </div>
            <p className="text-muted-foreground flex items-center gap-2 text-sm">
              <span className="font-mono text-xs opacity-50">
                ID: {meeting.id}
              </span>
              <span>•</span>
              <CalendarDays className="h-3.5 w-3.5" />
              <span>Created {format(new Date(meeting.createdAt), "PPP")}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setUpdateMeetingDialogOpen(true)}
            >
              Edit Meeting
            </Button>

            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    disabled={removeMeeting.isPending}
                  >
                    <MoreVertical className="h-4 w-4" />
                    <span className="sr-only">Actions</span>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer"
                    // 4. On Click, ONLY open the dialog. Do NOT mutate here.
                    onClick={() => setShowDeleteDialog(true)}
                  >
                    <Trash2Icon className="text-destructive mr-2 h-4 w-4" />
                    Delete Meeting
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <AlertDialog
                open={showDeleteDialog}
                onOpenChange={setShowDeleteDialog}
              >
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure you want to delete this meeting?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      <span className="text-foreground font-semibold">
                        {" "}
                        {meeting.name}{" "}
                      </span>
                      and remove all associated data.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="mt-2">
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
                      {removeMeeting.isPending ? (
                        <Spinner className="mr-2 h-4 w-4 text-white" />
                      ) : (
                        <Trash2Icon className="mr-2 h-4 w-4" />
                      )}
                      {removeMeeting.isPending
                        ? "Deleting..."
                        : "Delete Meeting"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export const MeetingIdViewLoading = () => {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <LoadingState title="Loading meeting details..." />
    </div>
  );
};

export const MeetingIdViewError = () => {
  return (
    <ErrorState
      title="Meeting not found"
      description="The meeting you are looking for does not exist or has been deleted."
    />
  );
};
