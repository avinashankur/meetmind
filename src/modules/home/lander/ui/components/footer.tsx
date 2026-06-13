import Link from "next/link";
import { Logo } from "../../../../../../public/logo";

export const FooterLanding = () => {
  return (
    <footer className="bg-black text-neutral-100">
      <div className="mx-auto max-w-7xl px-4">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Brand Section */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center space-x-2">
                <Logo />
                <h1 className="text-lg font-semibold">MeetMind AI</h1>
              </div>
              <p className="max-w-xs text-sm text-neutral-400">
                Intelligent meeting insights powered by AI.
              </p>
            </div>

            {/* Links Section */}
            <div className="flex flex-col gap-4 md:items-end">
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/sign-in"
                  className="text-sm text-neutral-300 transition-colors hover:text-white"
                >
                  Sign In
                </Link>
                <span className="text-neutral-600">•</span>
                <Link
                  href="/sign-up"
                  className="text-sm font-medium text-white transition-colors hover:text-neutral-200"
                >
                  Create Account
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-neutral-800 py-6">
          <div className="flex flex-col items-center justify-between gap-4 text-xs text-neutral-500 md:flex-row">
            <p>© 2026 MeetMind AI. All rights reserved.</p>
            <Link
              href="/terms"
              className="transition-colors hover:text-neutral-300"
            >
              Terms and Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
