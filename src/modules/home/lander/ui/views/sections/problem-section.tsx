import { H1 } from "@/components/typography/typography-h1";
import { FileWarning, Users, PenLine, History } from "lucide-react";

export const ProblemSection = () => {
  const problems = [
    {
      icon: <FileWarning className="h-5 w-5 text-slate-400" />,
      title: "No more scattered notes",
      description:
        "Stop digging through different apps to find what was decided. Everything is unified in one place.",
    },
    {
      icon: <Users className="h-5 w-5 text-slate-400" />,
      title: "No more guessing who said what",
      description:
        "Accurate speaker attribution ensures everyone is accountable for their action items.",
    },
    {
      icon: <PenLine className="h-5 w-5 text-slate-400" />,
      title: "No more rewriting summaries",
      description:
        "Get beautifully formatted meeting summaries the moment your video call ends.",
    },
    {
      icon: <History className="h-5 w-5 text-slate-400" />,
      title: "No more losing context",
      description:
        "Ask your AI about past meetings to instantly recall crucial details and context.",
    },
  ];

  return (
    <section className="flex min-h-screen items-center bg-slate-50 px-6 py-32">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mx-auto mb-16 max-w-3xl">
          <H1 className="mb-6 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Most meetings disappear the moment they end
          </H1>
          <p className="text-base leading-relaxed text-slate-600">
            Decisions get buried in chat threads. Action items are missed.
            People who could not attend have to rely on second-hand updates.
            MeetMind keeps the conversation useful after the call is over.
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <div className="space-y-12">
            {problems.map((problem, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="mt-0.5 flex-shrink-0">{problem.icon}</div>
                <div>
                  <h3 className="mb-1 text-base font-semibold text-slate-900">
                    {problem.title}
                  </h3>
                  <p className="text-base leading-relaxed text-slate-600">
                    {problem.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
