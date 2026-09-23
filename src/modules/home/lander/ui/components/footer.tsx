import Link from "next/link";
import { Logo } from "../../../../../../public/logo";
import { ThemeToggle } from "@/components/theme-toggle";

export const FooterLanding = () => {
  return (
    <footer className="border-border bg-background text-secondary border-t">
      <div className="mx-auto w-full max-w-6xl px-6 py-12 sm:px-16 lg:py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Brand Col */}
          <div className="flex max-w-sm flex-col gap-3">
            <Link href="/" className="flex items-center gap-2.5">
              <Logo size={24} />
              <span className="text-primary text-base font-semibold tracking-tight">
                MeetMind
              </span>
            </Link>
            <p className="text-secondary text-xs leading-relaxed font-normal">
              Real-time voice intelligence, low-latency acoustic processing, and
              automated meeting deliverables.
            </p>
          </div>

          {/* Clean Navigation Links */}
          <div className="grid grid-cols-2 gap-10 text-xs sm:gap-16">
            {/* Architecture Links */}
            <div>
              <h4 className="text-primary font-mono text-xs font-medium tracking-wider uppercase">
                Architecture
              </h4>
              <ul className="mt-3.5 space-y-2.5 font-normal">
                <li>
                  <a
                    href="#voice-engine"
                    className="hover:text-primary transition-colors"
                  >
                    Voice Engine
                  </a>
                </li>
                <li>
                  <a
                    href="#synthesis"
                    className="hover:text-primary transition-colors"
                  >
                    Action Engine
                  </a>
                </li>
                <li>
                  <a
                    href="#memory"
                    className="hover:text-primary transition-colors"
                  >
                    Memory Ledger
                  </a>
                </li>
                <li>
                  <a
                    href="#security"
                    className="hover:text-primary transition-colors"
                  >
                    Security & FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* Access & Legal Links */}
            <div>
              <h4 className="text-primary font-mono text-xs font-medium tracking-wider uppercase">
                Workspace
              </h4>
              <ul className="mt-3.5 space-y-2.5 font-normal">
                <li>
                  <Link
                    href="/sign-up"
                    className="text-accent font-semibold hover:underline"
                  >
                    Get Started
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sign-in"
                    className="hover:text-primary transition-colors"
                  >
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-primary transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="hover:text-primary transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Minimal Bottom Bar */}
        <div className="border-border text-secondary mt-12 flex flex-col items-center justify-between gap-4 border-t pt-6 font-mono text-xs sm:flex-row">
          <p>
            © {new Date().getFullYear()} MeetMind. Built for Intelligent
            Performance.
          </p>
          <div className="flex items-center gap-3">
            <span className="text-xs tracking-wider text-zinc-400 uppercase">
              Theme
            </span>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
};
