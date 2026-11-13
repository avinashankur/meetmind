"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";
import { AUTH_REDIRECT } from "@/modules/auth/constants";

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
        callbackURL: AUTH_REDIRECT,
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
      className={cn(
        "flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 shadow-xs transition-colors duration-300 hover:bg-slate-50 hover:text-slate-900",
        className,
      )}
      onClick={handleLogin}
      {...props}
    >
      {loading ? <Spinner /> : children || `Continue with ${label}`}
    </Button>
  );
};
