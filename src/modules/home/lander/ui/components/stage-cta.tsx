"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LedDots } from "./led-dots";

export const StageCta: React.FC = () => {
  return (
    <section
      id="cta"
      className="border-border bg-background text-foreground relative grid min-h-screen place-content-center border-t lg:py-36"
    >
      <div className="mx-auto w-full max-w-6xl px-6 text-center sm:px-16">
        {/* Pill */}
        <div className="text-accent inline-flex items-center gap-2 font-mono text-xs tracking-wider uppercase">
          <span className="bg-accent size-1.5 rounded-full" />
          <span>Intelligent Performance in Production</span>
        </div>

        {/* Headline */}
        <h2 className="text-primary mt-6 text-3xl leading-tight font-normal tracking-tight sm:text-5xl lg:text-6xl">
          Start conducting <br />
          <span className="inline-flex flex-wrap items-center justify-center gap-3">
            <span className="font-normal">more</span>
            <span
              className="text-accent inline-block align-middle"
              style={{ width: "4.85em", height: "0.766em" }}
            >
              <LedDots value="Intelligent" isWord={true} />
            </span>
            <span className="font-normal">meetings.</span>
          </span>
        </h2>

        <p className="text-secondary mx-auto mt-4 max-w-lg text-sm leading-relaxed sm:text-base">
          Deploy real-time voice intelligence to your video calls in under 60
          seconds.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="bg-primary text-primary-foreground h-12 rounded-full px-8 text-sm font-medium shadow-md transition-all hover:opacity-90"
          >
            <Link href="/sign-up" className="flex items-center gap-2">
              <span>Get Started for Free</span>
              <ArrowRight className="size-4" />
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-border text-primary hover:border-primary h-12 rounded-full border bg-transparent px-8 text-sm font-medium transition-all"
          >
            <Link href="/sign-in">Sign In to Workspace</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
