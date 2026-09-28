import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import {
  AgentsView,
  AgentsViewError,
  AgentsViewLoading,
} from "@/modules/agents/ui/views/agents-view";
import { AgentsListHeader } from "@/modules/agents/ui/components/agents-list-header";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SearchParams } from "nuqs/server";
import { loadSearchParam } from "@/modules/agents/params";

interface Props {
  searchParams: Promise<SearchParams>;
}

export const metadata = {
  title: "AI Agents - MeetMind",
  description:
    "Deploy, configure, and manage autonomous AI agents for your meetings.",
};

export default async function Page({ searchParams }: Props) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const filters = await loadSearchParam(searchParams);

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.agents.getMany.queryOptions({
      page: filters.page,
      search: filters.search,
    }),
  );

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-8 sm:px-16 sm:py-10">
      <AgentsListHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<AgentsViewLoading />}>
          <ErrorBoundary fallback={<AgentsViewError />}>
            <AgentsView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </div>
  );
}
