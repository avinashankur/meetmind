"use client";

import React, { useEffect } from "react";
import { LedDots } from "./led-dots";
import { StageFilterDefs } from "./stage-filter-defs";
import { SpeedCard, ContextCard, ConnectionsCard } from "./performance-cards";

export const PerformanceStage: React.FC = () => {
  useEffect(() => {
    // Add entrance-active class for entrance animations
    document.documentElement.classList.add("entrance-active");

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      document.documentElement.classList.remove("entrance-active");
      return;
    }

    const failsafe = setTimeout(() => {
      document.documentElement.classList.remove("entrance-active");
    }, 3200);

    const isMobile = window.innerWidth < 768;
    const targetSelector = isMobile
      ? ".card--speed .learn-more"
      : ".card--connections .learn-more";
    const targetElement = document.querySelector(targetSelector);

    const handleAnimationEnd = () => {
      clearTimeout(failsafe);
      document.documentElement.classList.remove("entrance-active");
    };

    if (targetElement) {
      targetElement.addEventListener("animationend", handleAnimationEnd, {
        once: true,
      });
    }

    return () => {
      clearTimeout(failsafe);
      document.documentElement.classList.remove("entrance-active");
      if (targetElement) {
        targetElement.removeEventListener("animationend", handleAnimationEnd);
      }
    };
  }, []);

  return (
    <main className="stage">
      {/* SVG Filters & Textures */}
      <StageFilterDefs />

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-between px-6 sm:px-16">
        {/* Masthead */}
        <header className="masthead pt-8">
          <h1 className="headline text-primary">
            <span className="headline__line">
              Built for{" "}
              <span
                className="dot-word text-accent"
                data-dots="Intelligent"
                aria-label="Intelligent"
              >
                <LedDots value="Intelligent" isWord={true} />
              </span>
            </span>
            <span className="headline__line">Performance</span>
          </h1>

          <p className="intro text-secondary">
            Create custom AI teammates that participate directly in
            <br className="desktop-break" /> your video calls. They listen,
            respond, transcribe, summarize,
            <br className="desktop-break" /> and answer follow-up questions when
            the meeting ends.
          </p>
        </header>

        {/* Cards Row */}
        <section className="cards" aria-label="Performance capabilities">
          <SpeedCard />
          <ContextCard />
          <ConnectionsCard />
        </section>

        {/* Scroll indicator for downstream stages */}
        <div className="z-10 mt-8 flex items-center justify-center pt-2 text-center">
          <a
            href="#voice-engine"
            className="group border-border bg-card text-secondary hover:bg-card/90 hover:text-primary inline-flex items-center gap-2 rounded-full border px-3.5 py-1 font-mono text-xs tracking-wider uppercase backdrop-blur-sm transition-all"
          >
            <span>Architecture & Telemetry</span>
            <span className="transition-transform group-hover:translate-y-0.5">
              ↓
            </span>
          </a>
        </div>
      </div>
    </main>
  );
};
