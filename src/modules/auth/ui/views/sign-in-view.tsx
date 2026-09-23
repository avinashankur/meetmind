"use client";

import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import FormInput from "@/components/form/form-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordField } from "@/components/form/password-input";
import { Button } from "@/components/ui/button";
import { SeparatorPro } from "@/components/common/separator";
import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Spinner } from "@/components/ui/spinner";
import { SocialButton } from "../social-button";
import { SiGithub, SiGoogle } from "@icons-pack/react-simple-icons";
import { useRouter } from "next/navigation";
import { AlertCircle, ArrowRight } from "lucide-react";
import { Logo } from "../../../../../public/logo";

const formSchema = z.object({
  email: z.email(),
  password: z.string().min(1, "Password is required"),
});

type FormSchemaType = z.infer<typeof formSchema>;

export const SignInView = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>();
  const [pending, setPending] = useState<boolean>(false);

  const methods = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: FormSchemaType) => {
    setPending(true);
    setError(null);

    authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
        callbackURL: "/meetings",
      },
      {
        onSuccess: () => {
          setPending(false);
          router.push("/meetings");
        },
        onError: (ctx) => {
          setPending(false);
          setError(ctx.error.message);
        },
      },
    );
  };

  return (
    <div className="mx-auto w-full max-w-md">
      {/* Brand Anchor */}
      <Link
        href="/"
        className="group mb-5 inline-flex items-center gap-2.5 transition-opacity hover:opacity-85"
      >
        <Logo
          size={26}
          className="shrink-0 transition-transform group-hover:scale-105"
        />
        <span className="text-primary text-base font-semibold tracking-tight">
          MeetMind
        </span>
      </Link>

      <div className="mb-5">
        <div className="text-accent inline-flex items-center gap-2 font-mono text-xs tracking-wider uppercase">
          <span className="bg-accent size-1.5 rounded-full" />
          <span>Workspace Access</span>
        </div>
        <h2 className="text-primary mt-1 text-xl font-semibold tracking-tight sm:text-2xl">
          Welcome back
        </h2>
        <p className="text-secondary mt-1 text-xs">
          Enter your credentials to access your meeting intelligence ledger.
        </p>
      </div>

      {/* Social Logins */}
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        <SocialButton
          provider="google"
          disabled={pending}
          className="flex h-11 items-center justify-center gap-2"
        >
          <SiGoogle className="size-4" />
          <span>Google</span>
        </SocialButton>
        <SocialButton
          provider="github"
          disabled={pending}
          className="flex h-11 items-center justify-center gap-2"
        >
          <SiGithub className="size-4" />
          <span>GitHub</span>
        </SocialButton>
      </div>

      <SeparatorPro className="my-4">
        <span className="text-secondary font-mono text-xs tracking-wider uppercase">
          Or continue with email
        </span>
      </SeparatorPro>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
          <FormInput
            name="email"
            label="Work Email"
            placeholder="sarah@company.com"
            type="email"
            isAsterisk
          />
          <PasswordField
            name="password"
            label="Password"
            placeholder="Enter your password"
            isAsterisk
          />

          {/* Error */}
          {!!error && (
            <div className="border-destructive/20 bg-destructive/10 text-destructive flex items-start gap-2 rounded-xl border p-3 font-mono text-xs">
              <AlertCircle className="mt-0.5 size-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={pending}
            className="bg-primary text-primary-foreground mt-2 h-12 w-full cursor-pointer rounded-xl font-mono text-xs tracking-wider uppercase shadow-xs transition-all hover:opacity-90 active:scale-[0.99]"
          >
            {pending ? (
              <Spinner />
            ) : (
              <span className="flex items-center justify-center gap-2">
                <span>Sign In</span>
                <ArrowRight className="size-4" />
              </span>
            )}
          </Button>
        </form>
      </FormProvider>

      {/* Don't have an account button */}
      <div className="text-secondary mt-4 flex items-center justify-center gap-1.5 font-mono text-xs">
        <span>Don&apos;t have an account?</span>
        <Link
          href="/sign-up"
          className="text-accent font-medium transition-colors hover:underline"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};
