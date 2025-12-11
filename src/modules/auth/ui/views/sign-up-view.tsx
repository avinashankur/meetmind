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
    error: "Passwords dont't match",
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
    <div className="mx-auto max-w-md">
      <div className="mb-5">
        <h2 className="text-2xl font-semibold">Sign Up</h2>
        <p className="text-muted-foreground text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam,
          delectus.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <SocialButton provider="google" disabled={pending} className="flex-1">
          <SiGoogle />
          Google
        </SocialButton>
        <SocialButton provider="github" disabled={pending} className="flex-1">
          <SiGithub />
          GitHub
        </SocialButton>
      </div>

      <SeparatorPro className="my-5">Or</SeparatorPro>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
          <FormInput
            name="name"
            label="Name"
            placeholder="John Doe"
            isAsterisk
          />
          <FormInput
            name="email"
            label="Email"
            placeholder="john@doe.com"
            isAsterisk
          />
          <PasswordField name="password" label="Password" isAsterisk />
          <PasswordField
            name="confirmPassword"
            label="Confirm password"
            isAsterisk
          />

          {/* Error */}
          {!!error && <p className="text-destructive text-sm">{error}</p>}

          {/* Submit Button */}
          <Button type="submit" disabled={pending} className="w-full">
            {pending && <Spinner />}
            Submit
          </Button>
        </form>
      </FormProvider>

      {/* Don't have an account button */}
      <div className="mt-10 flex items-center gap-1 text-sm">
        <p className="">Already have an account?</p>
        <Link href="/sign-in" className="font-semibold underline">
          Sign In
        </Link>
      </div>
    </div>
  );
};
