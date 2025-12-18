import { AgentIdView } from "@/modules/agents/ui/views/agent-id-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { AlertCircle } from "lucide-react";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Spinner } from "@/components/ui/spinner";

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
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<AgentIdLoadingState />}>
        <ErrorBoundary fallback={<AgentIdErrorState />}>
          <AgentIdView agentId={agentId} />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
}

// --- SUB-COMPONENTS ---

function AgentIdLoadingState() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Spinner />
    </div>
  );
}

/**
 * A proper error UI using Shadcn Alert.
 */
function AgentIdErrorState() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 p-8 text-center">
      <div className="bg-destructive/10 text-destructive rounded-full p-4">
        <AlertCircle size={32} />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">
          Something went wrong
        </h2>
        <p className="text-muted-foreground">
          We couldn't load the agent details. This might be a temporary issue.
        </p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" asChild>
          <Link href="/agents">Go Back</Link>
        </Button>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    </div>
  );
}
