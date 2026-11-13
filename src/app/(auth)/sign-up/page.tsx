import { auth } from "@/lib/auth";
import { SignUpView } from "@/modules/auth/ui/views/sign-up-view";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_REDIRECT } from "@/modules/auth/constants";

export default async function SignUpPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!!session) {
    redirect(AUTH_REDIRECT);
  }

  return (
    <div>
      <SignUpView />
    </div>
  );
}
