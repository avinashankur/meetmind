"use client";

import { useTRPC } from "@/trpc/client";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import Link from "next/link";
import {
  Calendar,
  CheckCircle2,
  ClipboardList,
  Fingerprint,
  Hash,
  Mail,
  MoreVertical,
  Play,
  Settings,
  ShieldCheck,
  Trash2,
  TrashIcon,
  Video,
} from "lucide-react";

// --- SHADCN IMPORTS ---
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import GeneratedAvatar from "@/components/generated-avatar";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";
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

export const AgentIdView = ({ agentId }: Props) => {
  const router = useRouter();
  const trpc = useTRPC();
  const [updateAgentDialogOpen, setUpdateAgentDialogOpen] =
    useState<boolean>(false);

  const queryClient = useQueryClient();

  const { data } = useSuspenseQuery(
    trpc.agents.getOne.queryOptions({ id: agentId }),
  ) as { data: AgentData };

  const removeAgent = useMutation(
    trpc.agents.remove.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.agents.getMany.queryOptions({}),
        );

        // TODO: invalidate free tier usage
        router.push("/agents");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }),
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <>
      <UpdateAgentDialog
        open={updateAgentDialogOpen}
        onOpenChange={setUpdateAgentDialogOpen}
        initialValues={data}
      />
      <div className="">
        <div className="mx-auto max-w-6xl space-y-6 px-4">
          {/* --- BREADCRUMB --- */}
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/agents">Agents</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{data.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* --- HEADER --- */}
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
            <div className="flex items-start gap-4">
              <GeneratedAvatar
                seed={data.name}
                variant="botttsNeutral"
                className="size-16"
              />

              <div className="space-y-1">
                <h1 className="text-foreground text-3xl font-bold tracking-tight">
                  {data.name}
                </h1>
                <div className="text-muted-foreground flex flex-wrap items-center gap-2 text-sm">
                  <Badge
                    variant="outline"
                    className="font-mono text-xs font-normal"
                  >
                    <Hash size={10} className="mr-1 inline" />
                    {data.id}
                  </Badge>
                  <span className="text-muted-foreground/30 hidden sm:inline">
                    |
                  </span>
                  <span className="text-xs">
                    Created {formatDate(data.createdAt)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => setUpdateAgentDialogOpen(true)}
              >
                <Settings className="mr-2 h-4 w-4" />
                Configure
              </Button>
              <Button>
                <Play className="mr-2 h-4 w-4" />
                Test Agent
              </Button>

              {/* Mobile Actions Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="md:hidden">
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View Logs</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    Delete Agent
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* --- MAIN GRID --- */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* === LEFT COLUMN (2/3) === */}
            <div className="flex flex-col gap-6 lg:col-span-2">
              {/* 1. System Instructions */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                  <div className="flex items-center gap-2">
                    <ClipboardList className="text-muted-foreground h-4 w-4" />
                    <CardTitle className="text-base">
                      System Instructions
                    </CardTitle>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 text-xs">
                    Edit
                  </Button>
                </CardHeader>
                <Separator />
                <CardContent className="pt-6">
                  <ScrollArea className="bg-muted/50 h-[200px] w-full rounded-md border p-4">
                    <pre className="text-foreground font-mono text-sm leading-relaxed whitespace-pre-wrap">
                      {data.instructions || "No instructions provided."}
                    </pre>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* 2. Integrations */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400">
                        <Calendar className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">Google Calendar</h4>
                        <p className="text-muted-foreground mt-1 text-xs">
                          Read/write events
                        </p>
                        <div className="mt-3 flex items-center gap-1.5">
                          <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                          </span>
                          <span className="text-xs font-medium text-green-600 dark:text-green-400">
                            Active
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">Email Gateway</h4>
                        <p className="text-muted-foreground mt-1 text-xs">
                          Inbox processing
                        </p>
                        <div className="mt-3 flex items-center gap-1.5">
                          <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                          </span>
                          <span className="text-xs font-medium text-green-600 dark:text-green-400">
                            Active
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* === RIGHT COLUMN (1/3) === */}
            <div className="flex flex-col gap-4">
              {/* Stats Card */}
              <Card>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm font-medium">
                        Total Meetings
                      </p>
                      <p className="mt-2 text-3xl font-bold">
                        {data.meetingCount}
                      </p>
                    </div>
                    <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-full">
                      <Video className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="text-muted-foreground mt-4 flex items-center gap-2 text-xs">
                    <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                    <span className="font-medium text-green-600 dark:text-green-400">
                      Operational
                    </span>
                    <span>• Updated {formatDate(data.updatedAt)}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Details Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-semibold">
                    Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-muted-foreground text-xs font-medium">
                      Owner ID
                    </span>
                    <div className="flex items-center gap-2">
                      <Fingerprint className="text-muted-foreground h-3.5 w-3.5" />
                      <code className="bg-muted truncate rounded px-1.5 py-0.5 font-mono text-xs">
                        {data.userId}
                      </code>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-muted-foreground text-xs font-medium">
                      Created At
                    </span>
                    <div className="flex items-center gap-2">
                      <Calendar className="text-muted-foreground h-3.5 w-3.5" />
                      <span className="text-sm">
                        {formatDate(data.createdAt)}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-muted-foreground text-xs font-medium">
                      Security
                    </span>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="text-muted-foreground h-3.5 w-3.5" />
                      <Badge
                        variant="secondary"
                        className="text-xs font-normal"
                      >
                        Private Agent
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Actions List */}
              <Card>
                <CardContent className="space-y-1 p-2">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        disabled={removeAgent.isPending}
                        variant="ghost"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10 w-full justify-between font-normal"
                      >
                        {removeAgent.isPending ? <Spinner /> : "Delete Agent"}
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you sure you want to delete {data.name}?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          {data.meetingCount === 0 &&
                            "This action cannot be undone. This will permanently delete this agent and remove all associated data from our servers."}
                          This action cannot be undone. This will permanently
                          delete <strong>{data.meetingCount} </strong>
                          {data.meetingCount === 1
                            ? "meeting"
                            : "meetings"}{" "}
                          from the server
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter className="mt-6">
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-destructive hover:bg-destructive/80"
                          disabled={removeAgent.isPending}
                          onClick={() =>
                            removeAgent.mutate({
                              id: agentId,
                            })
                          }
                        >
                          <TrashIcon />
                          {removeAgent.isPending ? <Spinner /> : "Delete Agent"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
