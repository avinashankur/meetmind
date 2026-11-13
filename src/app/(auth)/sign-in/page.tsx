import { auth } from "@/lib/auth";
import { SignInView } from "@/modules/auth/ui/views/sign-in-view";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_REDIRECT } from "@/modules/auth/constants";

export default async function SignInPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!!session) {
    redirect(AUTH_REDIRECT);
  }

  return (
    <div>
      <SignInView />
    </div>
  );
}
