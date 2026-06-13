import { H1 } from "@/components/typography/typography-h1";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const PrivacySection = () => {
  return (
    <section className="min-h-screen bg-slate-100 py-42">
      <H1>Privacy and security first</H1>

      {/* Accordions */}
      <div className="mx-auto mt-10 w-fit">
        <Accordion
          type="single"
          collapsible
          defaultValue="data-collected"
          className="w-xl"
        >
          <AccordionItem value="data-collected" className="py-3">
            <AccordionTrigger className="text-md">
              What data does MeetMind collect during a meeting?
            </AccordionTrigger>
            <AccordionContent>
              When you host or join a call, MeetMind processes audio and video
              for the session, generates a transcript and recording, and stores
              meeting details such as title, timestamps, transcript URL,
              recording URL, and an AI-generated summary tied to your account.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="data-storage" className="py-3">
            <AccordionTrigger className="text-md">
              Where is my meeting data stored?
            </AccordionTrigger>
            <AccordionContent>
              Your account, agents, and meeting records are stored in our
              PostgreSQL database. Transcripts and recordings are hosted via
              Stream&apos;s infrastructure; we store references and summaries in
              your MeetMind account.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="ai-training" className="py-3">
            <AccordionTrigger className="text-md">
              Does MeetMind use my meeting content to train AI models?
            </AccordionTrigger>
            <AccordionContent>
              MeetMind uses AI, including OpenAI, to transcribe, summarize, and
              power post-meeting chat. Your content is processed to deliver
              those features for your account — not sold as a dataset. For
              provider-specific training policies, see OpenAI and Stream&apos;s
              documentation.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="access-control" className="py-3">
            <AccordionTrigger className="text-md">
              Who can access my meetings and transcripts?
            </AccordionTrigger>
            <AccordionContent>
              Meeting data is tied to the account that created it. Access is
              enforced through authenticated sessions — only you, when signed
              in, can view and manage your meetings, agents, transcripts, and
              summaries.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="third-parties" className="py-3">
            <AccordionTrigger className="text-md">
              Which third parties process my data?
            </AccordionTrigger>
            <AccordionContent>
              MeetMind relies on trusted infrastructure partners: Stream for
              video, transcription, recording, and chat; OpenAI for
              summarization and AI responses; Neon and PostgreSQL for data
              storage; and Inngest for background processing. These services
              handle data only as needed to run the product.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="account-security" className="py-3">
            <AccordionTrigger className="text-md">
              How is my account protected?
            </AccordionTrigger>
            <AccordionContent>
              Sign-in supports email and password plus Google and GitHub OAuth.
              Sessions are token-based, and we record basic session metadata
              such as IP address and browser to help keep accounts secure. All
              traffic is served over HTTPS.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="deletion" className="py-3">
            <AccordionTrigger className="text-md">
              Can I delete my meetings and AI agents?
            </AccordionTrigger>
            <AccordionContent>
              Yes. You can permanently delete individual meetings or agents from
              your dashboard. Deleting an agent also removes its associated
              meetings. Deleted records are removed from MeetMind&apos;s
              database; copies on third-party systems may be subject to their
              retention policies.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="agent-instructions" className="py-3">
            <AccordionTrigger className="text-md">
              What happens to my AI agent instructions?
            </AccordionTrigger>
            <AccordionContent>
              Custom instructions you write for each agent are stored in your
              account and used only to guide that agent during and after
              meetings. They are not shared with other users and are deleted
              when you remove the agent.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};
