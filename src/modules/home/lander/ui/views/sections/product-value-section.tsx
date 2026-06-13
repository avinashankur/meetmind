import { H1 } from "@/components/typography/typography-h1";
import { CheckCircle2 } from "lucide-react";

export const ProductValueSection = () => {
  const features = [
    "Create custom AI agents with tailored instructions",
    "Invite AI into your meetings for real-time support",
    "Get structured summaries ready for review",
    "Search and discuss past meetings instantly",
  ];

  return (
    <section className="flex min-h-screen items-center bg-white px-6 py-24">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative order-2 lg:order-1">
            <div className="relative mx-auto aspect-square max-w-sm overflow-hidden rounded-[2rem] border border-slate-100 bg-slate-50 shadow-sm">
              {/* Minimal visual representation of the AI interface */}
              <div className="absolute inset-x-6 top-8 bottom-0 flex flex-col gap-4 rounded-t-2xl border border-slate-100 bg-white p-6 shadow-[0_0_40px_-15px_rgba(0,0,0,0.05)]">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-xs font-medium text-white shadow-sm">
                    AI
                  </div>
                  <div>
                    <div className="mb-2 h-4 w-32 rounded-md bg-slate-200" />
                    <div className="h-3 w-20 rounded-md bg-slate-100" />
                  </div>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="h-24 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                    <div className="mb-3 h-3 w-full rounded-md bg-slate-200" />
                    <div className="mb-3 h-3 w-4/5 rounded-md bg-slate-200" />
                    <div className="h-3 w-2/3 rounded-md bg-slate-200" />
                  </div>
                  <div className="h-14 rounded-2xl border border-slate-100 bg-slate-50" />
                  <div className="h-14 rounded-2xl border border-slate-100 bg-slate-50" />
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 max-w-xl lg:order-2">
            <H1 className="mb-6 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              An AI teammate for every meeting
            </H1>
            <p className="mb-8 text-sm leading-relaxed text-slate-600 md:text-base">
              Create custom AI agents with their own instructions, invite them
              into meetings, and let them support the conversation in real time.
              Afterward, MeetMind processes the recording and transcript into a
              structured summary you can review, search, and discuss.
            </p>

            <ul className="space-y-3">
              {features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-slate-900" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
