"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";

type AuthProvider = "google" | "github";
type ButtonProps = React.ComponentProps<typeof Button>;

interface SocialButtonProps extends ButtonProps {
  provider: AuthProvider;
  children?: React.ReactNode;
}

export const SocialButton = ({
  provider,
  className,
  children,
  ...props
}: SocialButtonProps) => {
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    await authClient.signIn.social(
      {
        provider: provider,
        callbackURL: "/",
      },
      {
        onSuccess: () => {
          toast.success(`Redirecting to ${provider}...`);
        },
        onError: (ctx) => {
          setLoading(false);
          toast.error(ctx.error.message || "Something went wrong");
        },
      },
    );
  };

  // Capitalize first letter for default label
  const label = provider.charAt(0).toUpperCase() + provider.slice(1);

  return (
    <Button
      variant="outline"
      type="button"
      disabled={loading || props.disabled}
      className={cn("w-full", className)}
      onClick={handleLogin}
      {...props}
    >
      {loading ? <Spinner /> : children || `Continue with ${label}`}
    </Button>
  );
};
