"use client";

import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import FormInput from "@/components/form/form-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordField } from "@/components/form/password-input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { SeparatorPro } from "@/components/common/separator";
import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";

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
      },
      {
        onSuccess: () => {
          setPending(false);
          router.push("/");
          toast.success("Logged in successfully.")
        },
        onError: (ctx) => {
          setPending(false);
          setError(ctx.error.message);
        },
      },
    );

    toast.success("Form submitted successfully.");
  };

  return (
    <div className="mx-auto max-w-md">
      <div className="mb-10">
        <h2 className="text-2xl font-semibold">Sign In</h2>
        <p className="text-muted-foreground text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam,
          delectus.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Button
          disabled={pending}
          variant="outline"
          className="flex-1"
          type="button"
        >
          Sign In with Google
        </Button>
        <Button
          disabled={pending}
          variant="outline"
          className="flex-1"
          type="button"
        >
          Sign In with GitHub
        </Button>
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
          <Button type="submit" disabled={pending} className="w-full">
            {pending && <Spinner />}
            Submit
          </Button>
        </form>
      </FormProvider>

      {/* Don't have an account button */}
      <div className="mt-10 flex items-center gap-1 text-sm">
        <p className="">Don&apos;t have an account?</p>
        <Link href="/sign-up" className="font-semibold underline">
          Sign Up
        </Link>
      </div>
    </div>
  );
};
