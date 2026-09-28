"use client";

import { useTRPC } from "@/trpc/client";
import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { format } from "date-fns";
import { toast } from "sonner";
import {
  ArrowRightIcon,
  ChevronRightIcon,
  CopyIcon,
  MoreHorizontalIcon,
  PencilIcon,
  Trash2Icon,
  VideoIcon,
} from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import GeneratedAvatar from "@/components/generated-avatar";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { UpdateAgentDialog } from "../components/update-agent-dialog";

interface Props {
  agentId: string;
}

interface AgentData {
  id: string;
  name: string;
  userId: string;
  instructions: string;
  createdAt: string;
  updatedAt: string;
  meetingCount: number;
}

const statusStyleMap: Record<
  string,
  {
    className: string;
  }
> = {
  upcoming: {
    className: "border-sky-500/25 bg-sky-500/10 text-sky-400",
  },
  processing: {
    className: "border-amber-500/25 bg-amber-500/10 text-amber-400",
  },
  active: {
    className: "border-brand/30 bg-brand/10 text-brand",
  },
  completed: {
    className: "border-emerald-500/25 bg-emerald-500/10 text-emerald-400",
  },
  cancelled: {
    className: "border-rose-500/25 bg-rose-500/10 text-rose-400",
  },
};

export const AgentIdView = ({ agentId }: Props) => {
  const router = useRouter();
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const [updateAgentDialogOpen, setUpdateAgentDialogOpen] =
    useState<boolean>(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);

  const { data } = useSuspenseQuery(
    trpc.agents.getOne.queryOptions({ id: agentId }),
  ) as { data: AgentData };

  const { data: meetingsData } = useQuery(
    trpc.meetings.getMany.queryOptions({
      agentId,
      pageSize: 5,
    }),
  );

  const removeAgent = useMutation(
    trpc.agents.remove.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.agents.getMany.queryOptions({}),
        );
        toast.success(`Agent "${data.name}" deleted`);
        router.push("/agents");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }),
  );

  const handleCopyId = () => {
    navigator.clipboard.writeText(data.id);
    toast.success("Agent ID copied to clipboard");
  };

  const handleCopyInstructions = () => {
    if (!data.instructions) return;
    navigator.clipboard.writeText(data.instructions);
    toast.success("Instructions copied to clipboard");
  };

  const formattedCreated = data.createdAt
    ? format(new Date(data.createdAt), "MMM d, yyyy")
    : "Recently";

  const formattedUpdated = data.updatedAt
    ? format(new Date(data.updatedAt), "MMM d, yyyy")
    : formattedCreated;

  const wordCount = data.instructions
    ? data.instructions.trim().split(/\s+/).filter(Boolean).length
    : 0;

  return (
    <>
      <UpdateAgentDialog
        open={updateAgentDialogOpen}
        onOpenChange={setUpdateAgentDialogOpen}
        initialValues={data}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="border-border bg-card gap-4 border p-6 shadow-2xl sm:max-w-md sm:rounded-xl">
          <AlertDialogHeader className="gap-1.5 text-left">
            <AlertDialogTitle className="text-base font-semibold">
              Delete {data.name}?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground text-xs">
              This action cannot be undone. This will permanently delete this
              agent
              {data.meetingCount > 0 ? (
                <>
                  {" "}
                  and remove its association with{" "}
                  <strong className="text-foreground font-medium">
                    {data.meetingCount}
                  </strong>{" "}
                  {data.meetingCount === 1 ? "meeting" : "meetings"}.
                </>
              ) : (
                "."
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-3 gap-2">
            <AlertDialogCancel
              disabled={removeAgent.isPending}
              className="border-border h-8 rounded-lg text-xs"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground h-8 rounded-lg text-xs"
              disabled={removeAgent.isPending}
              onClick={() => removeAgent.mutate({ id: agentId })}
            >
              {removeAgent.isPending ? (
                <div className="flex items-center gap-1.5">
                  <Spinner className="size-3.5" />
                  <span>Deleting...</span>
                </div>
              ) : (
                "Delete Agent"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="space-y-6">
        {/* Breadcrumbs */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/agents" className="text-xs">
                  Agents
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-foreground text-xs font-medium">
                {data.name}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Page Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex min-w-0 items-center gap-3.5">
            <GeneratedAvatar
              seed={data.name}
              variant="botttsNeutral"
              className="size-11 shrink-0"
            />

            <div className="min-w-0 flex-1 space-y-0.5">
              <h1 className="text-foreground truncate text-xl font-semibold tracking-tight">
                {data.name}
              </h1>

              <div className="text-muted-foreground flex flex-wrap items-center gap-2 text-xs">
                <button
                  type="button"
                  onClick={handleCopyId}
                  title="Click to copy ID"
                  className="text-muted-foreground hover:text-foreground cursor-pointer font-mono text-[11px] transition-colors"
                >
                  #{data.id.slice(0, 8)}
                </button>

                <span>Created {formattedCreated}</span>

                <span>
                  {data.meetingCount}{" "}
                  {data.meetingCount === 1 ? "meeting" : "meetings"}
                </span>
              </div>
            </div>
          </div>

          {/* Top-Right Action Controls */}
          <div className="flex shrink-0 items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setUpdateAgentDialogOpen(true)}
              className="border-border h-8 cursor-pointer gap-1.5 rounded-lg text-xs font-medium"
            >
              <PencilIcon className="text-muted-foreground size-3" />
              <span>Edit</span>
            </Button>

            <Button
              asChild
              size="sm"
              className="bg-primary text-primary-foreground h-8 cursor-pointer gap-1.5 rounded-lg px-3 text-xs font-medium shadow-xs hover:opacity-90"
            >
              <Link href={`/meetings?agentId=${data.id}`}>
                <VideoIcon className="size-3" />
                <span>Schedule meeting</span>
              </Link>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="border-border text-muted-foreground hover:text-foreground size-8 cursor-pointer rounded-lg border"
                  aria-label="More options"
                >
                  <MoreHorizontalIcon className="size-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                sideOffset={6}
                className="border-border bg-card text-card-foreground min-w-[150px] rounded-lg p-1 shadow-md"
              >
                <DropdownMenuItem
                  onClick={() => setUpdateAgentDialogOpen(true)}
                  className="cursor-pointer gap-2 rounded-md px-2 py-1.5 text-xs"
                >
                  <PencilIcon className="text-muted-foreground size-3" />
                  <span>Configure agent</span>
                </DropdownMenuItem>

                <DropdownMenuItem
                  asChild
                  className="cursor-pointer gap-2 rounded-md px-2 py-1.5 text-xs"
                >
                  <Link href={`/meetings?agentId=${data.id}`}>
                    <VideoIcon className="text-muted-foreground size-3" />
                    <span>View meetings</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={handleCopyId}
                  className="cursor-pointer gap-2 rounded-md px-2 py-1.5 text-xs"
                >
                  <CopyIcon className="text-muted-foreground size-3" />
                  <span>Copy ID</span>
                </DropdownMenuItem>

                <div className="bg-border my-1 h-px" />

                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => setDeleteDialogOpen(true)}
                  className="cursor-pointer gap-2 rounded-md px-2 py-1.5 text-xs"
                >
                  <Trash2Icon className="size-3" />
                  <span>Delete agent</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Hairline Divider */}
        <div className="border-border border-b" />

        {/* 2-Column Responsive Workspace with Synchronized Heights */}
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-3">
          {/* Left Column (2/3): Instructions & Meetings */}
          <div className="flex flex-col justify-between space-y-6 lg:col-span-2">
            {/* System Instructions Section */}
            <div className="flex min-h-0 flex-1 flex-col space-y-2">
              <div className="flex h-5 shrink-0 items-center justify-between">
                <div className="flex items-center gap-2">
                  <h2 className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                    System Instructions
                  </h2>
                  <span className="text-muted-foreground/70 font-mono text-[11px]">
                    ({wordCount} {wordCount === 1 ? "word" : "words"})
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {data.instructions && (
                    <button
                      type="button"
                      onClick={handleCopyInstructions}
                      className="text-muted-foreground hover:text-foreground inline-flex cursor-pointer items-center gap-1 text-xs transition-colors"
                    >
                      <CopyIcon className="size-3" />
                      <span>Copy</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setUpdateAgentDialogOpen(true)}
                    className="text-muted-foreground hover:text-foreground inline-flex cursor-pointer items-center gap-1 text-xs transition-colors"
                  >
                    <PencilIcon className="size-3" />
                    <span>Edit</span>
                  </button>
                </div>
              </div>

              {/* Flex-stretched Instructions surface */}
              {data.instructions ? (
                <div className="border-border bg-card text-foreground max-h-[360px] min-h-[110px] flex-1 overflow-y-auto rounded-lg border p-4 font-mono text-xs leading-relaxed whitespace-pre-wrap">
                  {data.instructions}
                </div>
              ) : (
                <div className="border-border text-muted-foreground flex min-h-[110px] flex-1 flex-col items-center justify-center rounded-lg border border-dashed p-6 text-center text-xs">
                  No system instructions configured.{" "}
                  <button
                    type="button"
                    onClick={() => setUpdateAgentDialogOpen(true)}
                    className="text-foreground mt-1 cursor-pointer underline underline-offset-4 hover:opacity-80"
                  >
                    Add instructions
                  </button>
                </div>
              )}
            </div>

            {/* Associated Meetings Section */}
            <div className="shrink-0 space-y-2">
              <div className="flex h-5 items-center justify-between">
                <div className="flex items-center gap-2">
                  <h2 className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                    Associated Meetings
                  </h2>
                  <span className="text-muted-foreground/70 font-mono text-[11px]">
                    ({meetingsData?.total ?? data.meetingCount})
                  </span>
                </div>

                {meetingsData?.total ? (
                  <Link
                    href={`/meetings?agentId=${data.id}`}
                    className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-xs transition-colors"
                  >
                    <span>View all</span>
                    <ArrowRightIcon className="size-3" />
                  </Link>
                ) : null}
              </div>

              {/* Single un-nested list surface */}
              {meetingsData?.items && meetingsData.items.length > 0 ? (
                <div className="border-border bg-card divide-border divide-y overflow-hidden rounded-lg border">
                  {meetingsData.items.map((meeting) => (
                    <Link
                      key={meeting.id}
                      href={`/meetings/${meeting.id}`}
                      className="hover:bg-muted/40 group flex items-center justify-between px-4 py-3 transition-colors"
                    >
                      <div className="min-w-0 flex-1 space-y-0.5">
                        <div className="text-foreground group-hover:text-primary truncate text-xs font-medium">
                          {meeting.name}
                        </div>
                        <div className="text-muted-foreground text-[11px]">
                          {meeting.createdAt
                            ? format(new Date(meeting.createdAt), "MMM d, yyyy")
                            : "Recent"}
                        </div>
                      </div>

                      <div className="ml-3 flex shrink-0 items-center gap-2.5">
                        <span
                          className={cn(
                            "rounded border px-2 py-0.5 text-[10px] font-medium capitalize",
                            statusStyleMap[meeting.status]?.className ||
                              "bg-muted text-muted-foreground",
                          )}
                        >
                          {meeting.status}
                        </span>
                        <ChevronRightIcon className="text-muted-foreground/40 group-hover:text-foreground size-3.5 transition-colors" />
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="border-border text-muted-foreground rounded-lg border border-dashed p-6 text-center text-xs">
                  No meetings conducted with this agent yet.{" "}
                  <Link
                    href={`/meetings?agentId=${data.id}`}
                    className="text-foreground underline underline-offset-4 hover:opacity-80"
                  >
                    Schedule meeting
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Right Column (1/3): Unified Sidebar Inspector with Synchronized Height */}
          <div className="flex min-h-0 flex-col space-y-2">
            <div className="flex h-5 shrink-0 items-center">
              <h2 className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                Properties
              </h2>
            </div>

            <div className="border-border bg-card flex flex-1 flex-col justify-between space-y-4 rounded-lg border p-4">
              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Agent ID</span>
                  <button
                    type="button"
                    onClick={handleCopyId}
                    title="Copy ID"
                    className="text-foreground cursor-pointer font-mono text-[11px] hover:underline"
                  >
                    #{data.id.slice(0, 8)}
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Created</span>
                  <span className="text-foreground">{formattedCreated}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Last modified</span>
                  <span className="text-foreground">{formattedUpdated}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Sessions</span>
                  <span className="text-foreground font-mono">
                    {data.meetingCount}
                  </span>
                </div>
              </div>

              <div className="border-border border-b" />

              <div className="space-y-2">
                <Button
                  asChild
                  size="sm"
                  className="bg-primary text-primary-foreground h-8 w-full cursor-pointer text-xs shadow-xs"
                >
                  <Link href={`/meetings?agentId=${data.id}`}>
                    <VideoIcon className="mr-1.5 size-3.5" />
                    <span>Schedule meeting</span>
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setUpdateAgentDialogOpen(true)}
                  className="border-border h-8 w-full cursor-pointer text-xs"
                >
                  <PencilIcon className="text-muted-foreground mr-1.5 size-3.5" />
                  <span>Configure agent</span>
                </Button>
              </div>

              <div className="border-border border-b" />

              <div>
                <button
                  onClick={() => setDeleteDialogOpen(true)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/15 bg-destructive/10 flex w-full items-center justify-center rounded-lg p-2 text-sm transition-colors duration-300"
                >
                  <Trash2Icon className="text-destructive mr-2 size-3.5" />
                  <span>Delete agent</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
