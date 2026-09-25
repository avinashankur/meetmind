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
import {
  Zap,
  BrainCircuit,
  ShieldCheck,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { Logo } from "../../../../../public/logo";

const formSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.email(),
    password: z.string().min(8, {
      error: (ctx) => {
        return `Password must have ${ctx.minimum} characters or more`;
      },
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords don't match",
    path: ["confirmPassword"],
  });

type FormSchemaType = z.infer<typeof formSchema>;

export const SignUpView = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>();
  const [pending, setPending] = useState<boolean>(false);

  const methods = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: FormSchemaType) => {
    setPending(true);
    setError(null);

    authClient.signUp.email(
      {
        name: data.name,
        email: data.email,
        password: data.password,
        callbackURL: "/",
      },
      {
        onSuccess: () => {
          setPending(false);
          router.push("/");
        },
        onError: (ctx) => {
          setPending(false);
          setError(ctx.error.message);
        },
      },
    );
  };

  return (
    <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12 xl:gap-16">
      {/* Left Column: Industrial Brand & Telemetry Showcase (5 cols) */}
      <div className="space-y-4 lg:col-span-5">
        <div>
          <Link
            href="/"
            className="group inline-flex items-center gap-2.5 transition-opacity hover:opacity-85"
          >
            <Logo
              size={26}
              className="shrink-0 transition-transform group-hover:scale-105"
            />
            <span className="text-primary text-base font-semibold tracking-tight">
              MeetMind
            </span>
          </Link>

          <h1 className="text-primary mt-2 text-2xl leading-tight font-normal tracking-tight sm:text-3xl lg:text-4xl">
            From conversation to{" "}
            <span className="text-brand">structured knowledge</span>.
          </h1>

          <p className="text-secondary mt-2 text-xs leading-relaxed font-normal sm:text-sm">
            Deploy in-call AI teammates that listen, transcribe with
            diarization, and synthesize executive action notes in real time.
          </p>
        </div>

        {/* Technical Telemetry Ledger (Open Spec Sheet, No Card) */}
        <div className="border-border/70 border-y py-3 font-mono text-xs">
          <span className="text-secondary block pb-2 text-xs tracking-wider uppercase">
            System Telemetry & Specs
          </span>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-secondary flex items-center gap-2">
                <Zap className="text-brand size-3" />
                <span>Cadence Latency</span>
              </div>
              <span className="text-primary font-semibold">184ms Duplex</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-secondary flex items-center gap-2">
                <BrainCircuit className="text-brand size-3" />
                <span>Synthesis Model</span>
              </div>
              <span className="text-primary font-semibold">
                GPT-4o via Inngest
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-secondary flex items-center gap-2">
                <ShieldCheck className="text-brand size-3" />
                <span>Data Retention</span>
              </div>
              <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                Zero Model Training
              </span>
            </div>
          </div>
        </div>

        <p className="text-secondary font-mono text-xs leading-relaxed">
          No credit card required. WebRTC audio and memory ledger ready in
          seconds.
        </p>
      </div>

      {/* Right Column: Open Registration Form (7 cols, No Enclosing Card) */}
      <div className="lg:col-span-7">
        <div className="mx-auto w-full max-w-md">
          {/* Header */}
          <div className="mb-4 sm:mb-5">
            <h2 className="text-primary mt-0.5 text-xl font-semibold tracking-tight sm:text-2xl">
              Create your account
            </h2>
            <p className="text-secondary mt-1 text-xs">
              Enter your credentials to initialize your meeting intelligence
              workspace.
            </p>
          </div>

          {/* Social Sign-In Buttons */}
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

          {/* Hairline Divider */}
          <SeparatorPro className="my-4">
            <span className="text-secondary font-mono text-xs tracking-wider uppercase">
              Or continue with email
            </span>
          </SeparatorPro>

          {/* Registration Form */}
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <FormInput
                name="name"
                label="Full Name"
                placeholder="Sarah Chen"
                isAsterisk
              />

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
                placeholder="Minimum 8 characters"
                isAsterisk
              />

              <PasswordField
                name="confirmPassword"
                label="Confirm Password"
                placeholder="Re-enter your password"
                isAsterisk
              />

              {/* Error Alert */}
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
                    <span>Create Workspace Account</span>
                    <ArrowRight className="size-4" />
                  </span>
                )}
              </Button>
            </form>
          </FormProvider>

          {/* Existing Account Footer Link */}
          <div className="text-secondary mt-4 flex items-center justify-center gap-1.5 font-mono text-xs">
            <span>Already have an account?</span>
            <Link
              href="/sign-in"
              className="text-brand font-medium transition-colors hover:underline"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
