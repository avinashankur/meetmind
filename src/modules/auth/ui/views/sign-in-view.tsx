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
  SIGN_IN_COPY,
} from "@/modules/auth/constants";
import { AuthFormError } from "../components/auth-form-error";
import { AUTH_INPUT_CLASS_NAME } from "../components/auth-input";
import { AuthShell } from "../components/auth-shell";
import { AuthSubmitButton } from "../components/auth-submit-button";
import { SocialAuthButtons } from "../components/social-auth-buttons";

const formSchema = z.object({
  email: z.email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type FormSchemaType = z.infer<typeof formSchema>;

export const SignInView = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const methods = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data: FormSchemaType) => {
    setPending(true);
    setError(null);

    authClient.signIn.email(
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
    <AuthShell copy={SIGN_IN_COPY} switchHref={AUTH_ROUTES.signUp}>
      <SocialAuthButtons disabled={pending} />

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="space-y-3"
          noValidate
        >
          <FormInput
            name="email"
            label="Email"
            placeholder="you@company.com"
            type="email"
            autoComplete="email"
            disabled={pending}
            className={AUTH_INPUT_CLASS_NAME}
          />
          <PasswordField
            name="password"
            label="Password"
            placeholder="Enter your password"
            autoComplete="current-password"
            disabled={pending}
            className={AUTH_INPUT_CLASS_NAME}
          />

          <AuthFormError message={error} />

          <div className="pt-1">
            <AuthSubmitButton pending={pending}>
              {SIGN_IN_COPY.submit}
            </AuthSubmitButton>
          </div>
        </form>
      </FormProvider>
    </AuthShell>
  );
};
