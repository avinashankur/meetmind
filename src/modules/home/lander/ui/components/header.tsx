"use client";

import Link from "next/link";
import { Logo } from "../../../../../../public/logo";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const HeaderLanding = () => {
  return (
    <header className="absolute top-0 right-0 left-0 z-50 w-full bg-transparent">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5 sm:px-16 sm:py-6">
        {/* Brand */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 transition-opacity hover:opacity-85"
        >
          <Logo
            size={28}
            className="shrink-0 transition-transform group-hover:scale-105"
          />
          <span className="text-primary text-base font-semibold tracking-tight">
            MeetMind
          </span>
        </Link>

        {/* Seamless Actions (No Navigation Links) */}
        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            href="/sign-in"
            className="text-secondary hover:text-primary font-mono text-xs tracking-wider uppercase transition-colors"
          >
            Sign In
          </Link>
          <Button
            asChild
            size="sm"
            className="bg-primary text-primary-foreground h-8 rounded-full px-4 font-mono text-xs tracking-wider uppercase shadow-xs transition-all hover:opacity-90"
          >
            <Link href="/sign-up" className="flex items-center gap-1.5">
              <span>Get Started</span>
              <ArrowRight className="size-3" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};
