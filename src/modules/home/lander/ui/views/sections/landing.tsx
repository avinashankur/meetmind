import { H1 } from "@/components/typography/typography-h1";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export const LandingSection = () => {
  return (
    <section className="grid min-h-[91.6vh] place-content-center bg-yellow-200 px-6 py-24">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-black/5 px-4 py-2 text-sm font-medium text-slate-900">
            <Sparkles className="h-4 w-4" />
            <span>Introducing AI teammates for your meetings</span>
          </div>
          <H1 className="mb-8 text-4xl font-semibold md:text-6xl">
            Meetings that remember, summarize, and answer back
          </H1>
          <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-slate-800">
            MeetMind brings <strong>AI agents</strong> into your video meetings
            to <strong>listen, participate, transcribe</strong>, and turn every
            conversation into <strong>clear next steps</strong>.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/sign-up"
              className="shadow-button-inset inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-b from-slate-700 to-slate-900 px-8 py-4 text-sm font-medium text-white"
            >
              Get Started For Free
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
