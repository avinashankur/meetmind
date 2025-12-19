import { Suspense } from "react";
import { getQueryClient, trpc } from "@/trpc/server";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { MeetingsView } from "@/modules/meetings/ui/views/meetings-view";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { MeetingsListHeader } from "@/modules/meetings/ui/components/meetings-list-header";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export default async function MeetingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.meetings.getMany.queryOptions({}));

  return (
    <>
      <MeetingsListHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<MeetingsViewLoading />}>
          <ErrorBoundary fallback={<MeetingsViewError />}>
            <MeetingsView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
}

export const MeetingsViewLoading = () => {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <LoadingState title="Loading Meetings" />
    </div>
  );
};

export const MeetingsViewError = () => {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <ErrorState title="Something went wrong" />
    </div>
  );
};
