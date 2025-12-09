"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const HomeView = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { data: session, isPending } = authClient.useSession();

  const handleSignOut = () => {
    authClient.signOut({
      fetchOptions: {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: () => {
          toast.success("Use signed out");
          setLoading(false);
          router.push("/sign-in");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
          setLoading(false);
        },
      },
    });
  };

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  // No one's gonna see this section because we are checking session on the home
  // page itself with apis which is faster instead of this kind of fetch request
  if (!session) {
    return (
      <div>
        <p>You are not logged in!</p>
        <Button onClick={() => router.push("/sign-in")}>Sign in page</Button>
      </div>
    );
  }

  return (
    <div>
      <p>Logged in as: {session.user.name}</p>
      <p>{session.user.email}</p>

      <Button disabled={loading} onClick={handleSignOut}>
        {loading && <Spinner />}
        Log Out
      </Button>
    </div>
  );
};
