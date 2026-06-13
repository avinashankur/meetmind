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
    <div className="mx-auto max-w-md">
      <div className="mb-10">
        <h2 className="text-2xl font-semibold">Sign In</h2>
        <p className="text-muted-foreground text-sm">
          Welcome back! Please enter your details to sign in.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <SocialButton
          provider="google"
          disabled={pending}
          className="flex-1 rounded-xl py-5 hover:bg-neutral-50"
        >
          <SiGoogle />
          Google
        </SocialButton>
        <SocialButton
          provider="github"
          disabled={pending}
          className="flex-1 rounded-xl py-5 hover:bg-neutral-50"
        >
          <SiGithub />
          GitHub
        </SocialButton>
      </div>

      <SeparatorPro className="my-10">Or</SeparatorPro>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
          <FormInput
            name="email"
            label="Email"
            placeholder="john@doe.com"
            isAsterisk
          />
          <PasswordField name="password" label="Password" isAsterisk />

          {/* Error */}
          {!!error && <p className="text-destructive text-sm">{error}</p>}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={pending}
            className="shadow-button-inset w-full rounded-2xl bg-linear-to-b from-neutral-700 to-neutral-900 py-6 hover:bg-neutral-800"
          >
            {pending && <Spinner />}
            Submit
          </Button>
        </form>
      </FormProvider>

      {/* Don't have an account button */}
      <div className="mt-5 flex items-center justify-center gap-1 text-sm">
        <p>Don&apos;t have an account?</p>
        <Link href="/sign-up" className="font-semibold underline">
          Sign Up
        </Link>
      </div>
    </div>
  );
};
