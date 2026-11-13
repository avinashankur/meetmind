"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

import { Spinner } from "@/components/ui/spinner";
import { LandingButton } from "@/modules/home/lander/ui/components/landing-button";
import { NudgeOnHover } from "@/modules/home/lander/ui/components/motion/hover";

interface AuthSubmitButtonProps {
  pending: boolean;
  children: React.ReactNode;
}

/** The landing's glossy dark CTA as a form submit, with shine and nudge. */
export const AuthSubmitButton = ({
  pending,
  children,
}: AuthSubmitButtonProps) => (
  <LandingButton asChild variant="dark" size="lg" className="w-full">
    <motion.button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      initial="rest"
      whileHover={pending ? undefined : "hover"}
      whileTap={pending ? undefined : { scale: 0.98 }}
      className="h-11 disabled:cursor-not-allowed disabled:opacity-80"
    >
      {pending ? (
        <Spinner />
      ) : (
        <>
          {children}
          <NudgeOnHover>
            <ArrowRight className="size-4" />
          </NudgeOnHover>
        </>
      )}
    </motion.button>
  </LandingButton>
);
