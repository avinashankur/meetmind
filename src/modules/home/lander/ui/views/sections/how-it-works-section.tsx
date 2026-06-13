import { H1 } from "@/components/typography/typography-h1";
import { Bot, Calendar, Video, FileText, MessageSquare } from "lucide-react";

export const HowItWorksSection = () => {
  const steps = [
    {
      title: "Create an agent",
      bullets: [
        "Give your AI agent a name",
        "Set custom instructions for meeting behavior",
      ],
      icon: <Bot className="h-4 w-4" />,
    },
    {
      title: "Start or schedule a meeting",
      bullets: ["Run your video meeting", "Attach your selected AI agent"],
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      title: "Meet with live AI support",
      bullets: [
        "AI participates during the conversation",
        "MeetMind quietly captures the meeting context",
      ],
      icon: <Video className="h-4 w-4" />,
    },
    {
      title: "Review the summary",
      bullets: [
        "MeetMind processes the transcript",
        "Receive a clean, structured meeting summary",
      ],
      icon: <FileText className="h-4 w-4" />,
    },
    {
      title: "Ask follow-up questions",
      bullets: [
        "Return to the meeting later",
        "Chat with AI about decisions and next steps",
      ],
      icon: <MessageSquare className="h-4 w-4" />,
    },
  ];

  return (
    <section className="flex min-h-screen items-center bg-slate-100 px-6 py-24">
      <div className="mx-auto w-full max-w-3xl">
        <div className="mb-16">
          <H1 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            From scheduled call to usable knowledge
          </H1>
          <p className="text-sm text-slate-500">In just a few simple steps.</p>
        </div>

        <div className="relative ml-4 space-y-8 border-l border-slate-200 pb-4 md:ml-6">
          {steps.map((step, index) => (
            <div key={index} className="relative pl-8">
              <div className="absolute top-0 -left-[17px] flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm">
                {step.icon}
              </div>
              <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm md:p-6">
                <div className="mb-1.5 text-xs font-semibold tracking-wider text-slate-400 uppercase">
                  Step {index + 1}
                </div>
                <h3 className="mb-3 text-base font-semibold text-slate-900">
                  {step.title}
                </h3>
                <ul className="list-disc space-y-1.5 pl-4">
                  {step.bullets.map((bullet, i) => (
                    <li key={i} className="text-sm text-slate-600">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
