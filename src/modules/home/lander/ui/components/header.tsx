import { Logo } from "../../../../../../public/logo";
import Link from "next/link";

export const HeaderLanding = () => {
  return (
    <div className="bg-yellow-200">
      <header className="mx-auto flex max-w-7xl items-center justify-between py-3">
        <div className="flex items-center gap-x-2">
          <Logo className="size-8" />
          <h3 className="font-semibold">MeetMind AI</h3>
        </div>

        <div className="space-x-4">
          <Link
            href="/sign-in"
            className="text-sm font-semibold text-neutral-800 underline-offset-4"
          >
            Login
          </Link>
          <Link
            href="/sign-up"
            className="shadow-button-inset rounded-xl bg-linear-to-b from-green-500 to-green-600 px-5 py-2.5 text-sm text-white hover:bg-green-700"
          >
            Get Started For Free
          </Link>
        </div>
      </header>
    </div>
  );
};
