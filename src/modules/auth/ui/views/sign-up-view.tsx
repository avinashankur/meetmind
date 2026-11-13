"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import FormInput from "@/components/form/form-input";
import { PasswordField } from "@/components/form/password-input";
import { authClient } from "@/lib/auth-client";
import {
  AUTH_REDIRECT,
  AUTH_ROUTES,
  MIN_PASSWORD_LENGTH,
  SIGN_UP_COPY,
} from "@/modules/auth/constants";
import { AuthFormError } from "../components/auth-form-error";
import { AUTH_INPUT_CLASS_NAME } from "../components/auth-input";
import { AuthShell } from "../components/auth-shell";
import { AuthSubmitButton } from "../components/auth-submit-button";
import { SocialAuthButtons } from "../components/social-auth-buttons";

// No confirm-password field: the show/hide toggle covers typos with one less
// field to fill in.
const formSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.email("Enter a valid email address"),
  password: z.string().min(MIN_PASSWORD_LENGTH, {
    error: (ctx) => `Password must have ${ctx.minimum} characters or more`,
  }),
});

type FormSchemaType = z.infer<typeof formSchema>;

export const SignUpView = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const methods = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit = (data: FormSchemaType) => {
    setPending(true);
    setError(null);

    authClient.signUp.email(
      { ...data, callbackURL: AUTH_REDIRECT },
      {
        onSuccess: () => {
          setPending(false);
          router.push(AUTH_REDIRECT);
        },
        onError: (ctx) => {
          setPending(false);
          setError(ctx.error.message);
        },
      },
    );
  };

  return (
    <AuthShell size="lg" copy={SIGN_UP_COPY} switchHref={AUTH_ROUTES.signIn}>
      <SocialAuthButtons disabled={pending} />

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="space-y-3"
          noValidate
        >
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <FormInput
              name="name"
              label="Full name"
              placeholder="Sarah Chen"
              autoComplete="name"
              disabled={pending}
              className={AUTH_INPUT_CLASS_NAME}
            />
            <FormInput
              name="email"
              label="Work email"
              placeholder="you@company.com"
              type="email"
              autoComplete="email"
              disabled={pending}
              className={AUTH_INPUT_CLASS_NAME}
            />
          </div>
          <PasswordField
            name="password"
            label="Password"
            placeholder={`At least ${MIN_PASSWORD_LENGTH} characters`}
            autoComplete="new-password"
            disabled={pending}
            className={AUTH_INPUT_CLASS_NAME}
          />

          <AuthFormError message={error} />

          <div className="pt-1">
            <AuthSubmitButton pending={pending}>
              {SIGN_UP_COPY.submit}
            </AuthSubmitButton>
          </div>
        </form>
      </FormProvider>
    </AuthShell>
  );
};
