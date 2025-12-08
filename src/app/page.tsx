"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { data: session, error } = authClient.useSession();

  const handleSignOut = () => {
    authClient.signOut({
      fetchOptions: {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: () => {
          toast.success("Use signed out");
          setLoading(false);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
          setLoading(false);
        },
      },
    });
  };

  if (error || !session) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">You are not logged in.</p>
        <Button onClick={() => router.push("/sign-in")}>Go to Sign In</Button>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      Logged in as {session.user.name}
      <Button disabled={loading} onClick={handleSignOut}>
        {loading && <Spinner />}
        Log Out
      </Button>
    </div>
  );
}
