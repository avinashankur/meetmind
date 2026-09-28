import { AgentIdView } from "@/modules/agents/ui/views/agent-id-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { AlertCircle } from "lucide-react";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  params: Promise<{
    agentId: string;
  }>;
}

// 1. Add Dynamic Metadata for SEO/Tab Title
export async function generateMetadata() {
  return {
    title: `Agent - Dashboard`,
    description: "Manage and configure your AI agent settings.",
  };
}

export default async function AgentPage({ params }: Props) {
  const { agentId } = await params;

  // Prefetching data on the server
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.agents.getOne.queryOptions({ id: agentId }),
  );

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-8 sm:px-16 sm:py-10">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<AgentIdLoadingState />}>
          <ErrorBoundary fallback={<AgentIdErrorState />}>
            <AgentIdView agentId={agentId} />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function AgentIdLoadingState() {
  return (
    <div className="space-y-6">
      <div className="bg-muted h-4 w-32 animate-pulse rounded" />

      {/* Header Skeleton */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3.5">
          <div className="bg-muted size-11 animate-pulse rounded-full" />
          <div className="space-y-1.5">
            <div className="bg-muted h-5 w-40 animate-pulse rounded" />
            <div className="bg-muted h-3.5 w-48 animate-pulse rounded" />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="bg-muted h-8 w-18 animate-pulse rounded-lg" />
          <div className="bg-muted h-8 w-32 animate-pulse rounded-lg" />
        </div>
      </div>

      <div className="border-border border-b" />

      {/* 2-Column Skeleton with Synchronized Height */}
      <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-3">
        <div className="flex flex-col justify-between space-y-6 lg:col-span-2">
          <div className="flex min-h-0 flex-1 flex-col space-y-2">
            <div className="bg-muted h-5 w-32 animate-pulse rounded" />
            <div className="border-border bg-card h-32 flex-1 animate-pulse rounded-lg border" />
          </div>

          <div className="space-y-2">
            <div className="bg-muted h-5 w-28 animate-pulse rounded" />
            <div className="border-border bg-card h-28 animate-pulse rounded-lg border" />
          </div>
        </div>

        <div className="flex min-h-0 flex-col space-y-2">
          <div className="bg-muted h-5 w-20 animate-pulse rounded" />
          <div className="border-border bg-card flex flex-1 animate-pulse flex-col justify-between space-y-4 rounded-lg border p-4">
            <div className="space-y-2.5">
              <div className="bg-muted h-3.5 w-full rounded" />
              <div className="bg-muted h-3.5 w-full rounded" />
              <div className="bg-muted h-3.5 w-full rounded" />
            </div>
            <div className="bg-muted mt-auto h-8 w-full rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

function AgentIdErrorState() {
  return (
    <div className="bg-card border-border/40 rounded-2xl border p-10 text-center shadow-xs backdrop-blur-sm sm:p-14">
      <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400">
        <AlertCircle size={24} />
      </div>
      <h2 className="text-foreground mt-4 text-lg font-medium tracking-tight">
        Agent not found
      </h2>
      <p className="text-secondary mx-auto mt-1 max-w-md text-xs sm:text-sm">
        We couldn&apos;t load the agent details. The agent may have been removed
        or you may not have access.
      </p>
      <div className="mt-6 flex justify-center gap-2.5">
        <Button
          variant="outline"
          asChild
          className="border-border/50 h-9 rounded-lg"
        >
          <Link href="/agents">Back to Agents</Link>
        </Button>
        <Button
          onClick={() => window.location.reload()}
          className="bg-primary text-primary-foreground h-9 rounded-lg"
        >
          Try Again
        </Button>
      </div>
    </div>
  );
}
