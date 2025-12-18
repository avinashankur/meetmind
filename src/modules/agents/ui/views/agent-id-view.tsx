"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import Link from "next/link";
import {
  Calendar,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Fingerprint,
  Hash,
  Mail,
  MoreVertical,
  Play,
  Settings,
  ShieldCheck,
  Trash2,
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
import GeneratedAvatar from "@/components/generated-avatar";

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
  const trpc = useTRPC();

  const { data } = useSuspenseQuery(
    trpc.agents.getOne.queryOptions({ id: agentId }),
  ) as { data: AgentData };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen w-full p-6 md:px-4">
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
            <Button variant="outline">
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
                <CardTitle className="text-sm font-semibold">Details</CardTitle>
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
                    <Badge variant="secondary" className="text-xs font-normal">
                      Private Agent
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions List */}
            <Card>
              <CardContent className="space-y-1 p-2">
                <Button
                  variant="ghost"
                  className="text-destructive hover:text-destructive hover:bg-destructive/10 w-full justify-between font-normal"
                >
                  Delete Agent
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Helper Component ---
const ActivityRow = ({
  title,
  time,
  status,
  type,
}: {
  title: string;
  time: string;
  status: string;
  type: "meeting" | "system";
}) => (
  <div className="hover:bg-muted/50 group flex cursor-pointer items-center justify-between px-6 py-3 transition-colors">
    <div className="flex items-center gap-3">
      <div
        className={`flex h-8 w-8 items-center justify-center rounded-full ${type === "meeting" ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" : "bg-muted text-muted-foreground"}`}
      >
        {type === "meeting" ? <Video size={14} /> : <Settings size={14} />}
      </div>
      <div>
        <p className="decoration-muted-foreground/30 text-sm leading-none font-medium underline-offset-4 group-hover:underline">
          {title}
        </p>
        <p className="text-muted-foreground mt-1 text-xs">{time}</p>
      </div>
    </div>
    <div className="flex items-center gap-2">
      <Badge
        variant={
          status === "Completed" || status === "Success"
            ? "default"
            : "secondary"
        }
        className="h-5 px-1.5 text-[10px] font-normal"
      >
        {status}
      </Badge>
      <ChevronRight className="text-muted-foreground h-4 w-4 opacity-50 group-hover:opacity-100" />
    </div>
  </div>
);
