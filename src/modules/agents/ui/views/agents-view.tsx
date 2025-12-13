"use client";

import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export const AgentsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

  return (
    <div>
      <p>Agents: {JSON.stringify(data, null, 2)}</p>
    </div>
  );
};

export const AgentsViewLoading = () => {
  return <LoadingState title="Loading agents" />;
};

export const AgentsViewError = () => {
  return <LoadingState title="Loading agents" />;
};
