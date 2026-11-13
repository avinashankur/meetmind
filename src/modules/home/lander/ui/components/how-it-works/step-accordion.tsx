"use client";

import {
  memo,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, Plus } from "lucide-react";

import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { type HowItWorksStep, type StepPreview } from "../../../constants";
import { TRANSITION } from "../motion/transitions";
import { SkyStage } from "./sky-stage";

interface StepAccordionProps {
  steps: HowItWorksStep[];
  /** Animated preview stories, keyed by step. */
  previews: Record<StepPreview, ReactNode>;
}

/** Width of a collapsed step tab (`basis-22`), in px. */
const TAB_WIDTH = 88;

/** Tracks an element's inner width. */
function useElementWidth(ref: RefObject<HTMLElement | null>) {
  const [width, setWidth] = useState<number>();
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) =>
      setWidth(entry.contentRect.width),
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);
  return width;
}

const StepNavButton = ({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
}) => (
  <motion.button
    type="button"
    aria-label={label}
    aria-controls="how-it-works-steps"
    onClick={onClick}
    whileTap={{ scale: 0.92 }}
    transition={TRANSITION.hover}
    className="grid size-12 place-items-center rounded-full border border-slate-200 bg-white text-slate-900 shadow-sm transition-colors hover:border-slate-900 hover:bg-slate-900 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
  >
    {children}
  </motion.button>
);

/**
 * Memoized so toggling steps re-renders only the article wrappers, not every
 * panel's sky stage, images and story.
 */
const StepContent = memo(function StepContent({
  step,
  story,
}: {
  step: HowItWorksStep;
  story: ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 gap-6 px-5 pt-1 pb-6 lg:h-full lg:grid-cols-2 lg:gap-10 lg:py-8 lg:pr-8 lg:pl-6">
      <div className="flex min-w-0 flex-col justify-center">
        <span className="font-dm-mono text-xs font-medium tracking-widest text-blue-600 uppercase">
          Step {step.number}
        </span>
        <h3 className="font-tight mt-3 text-4xl leading-none font-semibold tracking-tighter text-slate-900 xl:text-5xl">
          {step.title}
        </h3>
        <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-500">
          {step.description}
        </p>
      </div>
      <SkyStage>
        <AnimatePresence>
          {story && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: TRANSITION.fast }}
              transition={TRANSITION.base}
            >
              {story}
            </motion.div>
          )}
        </AnimatePresence>
      </SkyStage>
    </div>
  );
});

/**
 * Horizontal accordion on desktop (the open step grows while the others shrink
 * to vertical tabs), stacked disclosure list below `lg`.
 *
 * Desktop steps open on hover so the section responds as the pointer sweeps
 * across it; click and keyboard activation still work, which is also the only
 * way to open a step on touch devices.
 *
 * Performance notes: on desktop every panel stays mounted at the open step's
 * final width, so expanding only changes the column width; nothing re-wraps
 * or mounts mid-animation. Each animated story mounts once its step has
 * finished opening, so it plays from the start in full view.
 */
export const StepAccordion = ({ steps, previews }: StepAccordionProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [settledIndex, setSettledIndex] = useState(0);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const canHover = useMediaQuery("(hover: hover)");
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const containerWidth = useElementWidth(containerRef);
  const baseId = useId();

  // Content width of the open step: everything except the collapsed tabs, its
  // own tab and its left border.
  const panelWidth =
    containerWidth === undefined
      ? undefined
      : containerWidth - steps.length * TAB_WIDTH - 1;

  const goTo = (index: number) =>
    setActiveIndex((index + steps.length) % steps.length);

  return (
    <>
      <div className="mt-9 mb-5 flex justify-end gap-2.5 lg:mt-12">
        <StepNavButton
          label="Previous step"
          onClick={() => goTo(activeIndex - 1)}
        >
          <ArrowLeft className="size-4" />
        </StepNavButton>
        <StepNavButton label="Next step" onClick={() => goTo(activeIndex + 1)}>
          <ArrowRight className="size-4" />
        </StepNavButton>
      </div>

      <div
        ref={containerRef}
        id="how-it-works-steps"
        className="flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-blue-900/5 lg:flex-row"
      >
        {steps.map((step, index) => {
          const isActive = index === activeIndex;
          const tabId = `${baseId}-tab-${index}`;
          const panelId = `${baseId}-panel-${index}`;
          // Desktop swaps stories only once the expand settles, so no React
          // mount/unmount work competes with the animation. The outgoing story
          // stays mounted (hidden by its fading panel) until then.
          const showStory = isDesktop ? settledIndex === index : isActive;
          const story = showStory ? previews[step.preview] : null;

          return (
            <motion.article
              key={step.number}
              initial={false}
              animate={{ flexGrow: isActive ? 1 : 0 }}
              transition={reduceMotion ? { duration: 0 } : TRANSITION.expand}
              onAnimationComplete={() => {
                if (isActive) setSettledIndex(index);
              }}
              onMouseEnter={
                isDesktop && canHover ? () => goTo(index) : undefined
              }
              className={cn(
                "flex flex-col border-t border-slate-200 transition-colors duration-300 first:border-t-0",
                "lg:min-w-0 lg:basis-22 lg:flex-row lg:items-stretch lg:overflow-hidden lg:border-t-0 lg:border-l lg:first:border-l-0",
                isActive ? "bg-white" : "bg-slate-50 hover:bg-blue-50",
              )}
            >
              <button
                type="button"
                id={tabId}
                aria-expanded={isActive}
                aria-controls={panelId}
                onClick={() => goTo(index)}
                className="group/tab flex w-full items-center gap-3.5 px-5 py-4 text-slate-400 lg:w-22 lg:flex-none lg:flex-col lg:justify-between lg:px-0 lg:py-6"
              >
                <span
                  className={cn(
                    "font-dm-mono grid size-8 place-items-center rounded-full text-xs font-medium transition-colors duration-300",
                    isActive
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                      : "bg-white text-slate-500 ring-1 ring-slate-200 group-hover/tab:text-blue-600",
                  )}
                >
                  {step.number}
                </span>
                {/* Vertical tab label on desktop; Tailwind has no writing-mode utility. */}
                <b
                  className={cn(
                    "font-tight text-base font-semibold tracking-tight transition-colors duration-300 lg:rotate-180 lg:text-sm lg:[writing-mode:vertical-rl]",
                    isActive
                      ? "text-slate-900"
                      : "text-slate-500 group-hover/tab:text-slate-900",
                  )}
                >
                  {step.title}
                </b>
                <motion.span
                  aria-hidden="true"
                  className="ml-auto text-slate-400 lg:hidden"
                  animate={{ rotate: isActive ? 45 : 0 }}
                  transition={TRANSITION.fast}
                >
                  <Plus className="size-5" />
                </motion.span>
              </button>

              {isDesktop ? (
                // Always mounted at a fixed width; the article clips it.
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={tabId}
                  aria-hidden={!isActive}
                  inert={!isActive}
                  className="flex-none"
                  style={{ width: panelWidth }}
                  initial={false}
                  animate={{ opacity: isActive ? 1 : 0 }}
                  transition={
                    isActive
                      ? { ...TRANSITION.base, delay: 0.25 }
                      : TRANSITION.fast
                  }
                >
                  <StepContent step={step} story={story} />
                </motion.div>
              ) : (
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={tabId}
                      className="overflow-hidden"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={TRANSITION.base}
                    >
                      <StepContent step={step} story={story} />
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </motion.article>
          );
        })}
      </div>
    </>
  );
};
