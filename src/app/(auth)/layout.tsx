import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { cn } from "@/lib/utils";
import { AUTH_NAV, AUTH_ROUTES } from "@/modules/auth/constants";
import { LandingMotionProvider } from "@/modules/home/lander/ui/components/motion/landing-motion-provider";
import { landingFontVariables } from "@/modules/home/lander/ui/fonts";

interface Props {
  children: React.ReactNode;
}

const CLOUD_BANK = { width: 2172, height: 724 } as const;

const cloudBankClassName =
  "pointer-events-none absolute bottom-0 left-1/2 h-auto w-full max-w-none min-w-180 -translate-x-1/2";

/**
 * Auth pages share the landing's light "sky" look: the hero gradient and
 * drifting clouds, with the auth card floating in the middle.
 * `theme-light` pins semantic tokens (form fields, alerts) to light mode.
 *
 * The page is pinned to the viewport height and clips overflow, so the card
 * never scrolls; a single back button replaces the landing nav.
 */
export default function Layout({ children }: Props) {
  return (
    <LandingMotionProvider>
      <div
        className={cn(
          "theme-light relative isolate flex h-svh flex-col overflow-hidden bg-linear-to-b from-blue-500 via-blue-300 via-70% to-blue-200 text-slate-900 antialiased",
          landingFontVariables,
        )}
      >
        <div className="pointer-events-none absolute inset-0 bg-radial from-white/25 to-transparent to-70%" />

        <Link
          href={AUTH_ROUTES.home}
          aria-label={AUTH_NAV.backHome}
          title={AUTH_NAV.backHome}
          className="group absolute top-4 left-3.5 z-40 inline-flex size-10 items-center justify-center rounded-full border border-white/50 bg-white/20 text-white shadow-lg inset-shadow-xs shadow-blue-900/20 inset-shadow-white/40 backdrop-blur-sm transition-colors duration-300 hover:border-white/70 hover:bg-white/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 md:left-6"
        >
          <ArrowLeft
            className="size-5 transition-transform duration-300 group-hover:-translate-x-0.5"
            aria-hidden="true"
          />
        </Link>

        <Image
          src="/landing/cloud-rear.png"
          alt=""
          {...CLOUD_BANK}
          sizes="100vw"
          className={cn(cloudBankClassName, "z-10")}
        />
        <Image
          src="/landing/cloud-front.png"
          alt=""
          {...CLOUD_BANK}
          sizes="100vw"
          className={cn(
            cloudBankClassName,
            "z-10 translate-y-1/3 drop-shadow-xl drop-shadow-white",
          )}
        />

        <main className="relative z-30 flex min-h-0 flex-1 items-center justify-center overflow-hidden px-4 py-4 sm:px-6 sm:py-6">
          {children}
        </main>
      </div>
    </LandingMotionProvider>
  );
}
