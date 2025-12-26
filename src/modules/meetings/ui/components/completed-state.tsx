import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { MeetingGetOne } from "../../types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpenCheckIcon,
  SparklesIcon,
  FileTextIcon,
  FileVideoIcon,
  ClockFadingIcon,
} from "lucide-react";
import GeneratedAvatar from "@/components/generated-avatar";
import Link from "next/link";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { formatDuration } from "@/lib/utils";
import Markdown from "react-markdown";
import { Transcript } from "./transcript";
import { ChatProvider } from "./chat-provider";

interface Props {
  data: MeetingGetOne;
}

export const CompletedState = ({ data }: Props) => {
  return (
    <div className="flex flex-col gap-y-4">
      <Tabs defaultValue="summary">
        <div className="rounded-lg bg-white px-3">
          <ScrollArea>
            <TabsList className="bg-background h-13 justify-center rounded-none p-0">
              <TabsTrigger
                value="summary"
                className="text-muted-foreground bg-background data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground hover:text-accent-foreground h-full rounded-none border-b-2 border-t-transparent data-[state=active]:shadow-none"
              >
                <BookOpenCheckIcon />
                Summary
              </TabsTrigger>
              <TabsTrigger
                value="transcript"
                className="text-muted-foreground bg-background data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground hover:text-accent-foreground h-full rounded-none border-b-2 border-t-transparent data-[state=active]:shadow-none"
              >
                <FileTextIcon />
                Transcript
              </TabsTrigger>
              <TabsTrigger
                value="recording"
                className="text-muted-foreground bg-background data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground hover:text-accent-foreground h-full rounded-none border-b-2 border-t-transparent data-[state=active]:shadow-none"
              >
                <FileVideoIcon />
                Recording
              </TabsTrigger>
              <TabsTrigger
                value="chat"
                className="text-muted-foreground bg-background data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground hover:text-accent-foreground h-full rounded-none border-b-2 border-t-transparent data-[state=active]:shadow-none"
              >
                <SparklesIcon />
                Ask AI
              </TabsTrigger>
            </TabsList>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
        <TabsContent value="chat">
          <ChatProvider meetingId={data.id} meetingName={data.name} />
        </TabsContent>
        <TabsContent value="transcript">
          <Transcript meetingId={data.id} />
        </TabsContent>

        <TabsContent value="recording">
          <div className="rounded-lg border bg-white px-4 py-5">
            <video
              src={data.recordingUrl!}
              className="w-full rounded-lg"
              controls
            />
          </div>
        </TabsContent>
        <TabsContent value="summary">
          <div className="rounded-lg border bg-white">
            <div className="col-span-5 flex flex-col gap-y-5 px-4 py-5">
              <h2 className="">{data.name}</h2>
              <div className="flex items-center gap-x-2">
                <Link
                  href={`/agents/${data.agent.id}`}
                  className="flex items-center gap-x-2 capitalize underline underline-offset-4"
                >
                  <GeneratedAvatar
                    seed={data.agent.name}
                    variant="botttsNeutral"
                  />
                  <p className="">{data.agent.name}</p>
                </Link>
                <p>{data.startedAt ? format(data.startedAt, "PPP") : ""}</p>
              </div>

              <div className="flex items-center gap-x-2">
                <SparklesIcon />
                <p>General Summary</p>
              </div>
              <Badge
                variant="outline"
                className="flex items-center gap-x-2 [&>svg]:size-4"
              >
                <ClockFadingIcon />
                {data.duration ? formatDuration(data.duration) : "No duration"}
              </Badge>

              <div>
                <Markdown
                  components={{
                    h1: (props) => (
                      <h1 className="mb-6 text-2xl font-medium" {...props} />
                    ),
                    h2: (props) => (
                      <h2 className="mb-6 text-xl font-medium" {...props} />
                    ),
                    h3: (props) => (
                      <h3 className="mb-6 text-lg font-medium" {...props} />
                    ),
                    h4: (props) => (
                      <h4 className="text-md mb-2 font-medium" {...props} />
                    ),
                    h5: (props) => (
                      <h5 className="mb-1 text-sm font-medium" {...props} />
                    ),
                    h6: (props) => (
                      <h6 className="mb-1 text-xs font-medium" {...props} />
                    ),
                    p: (props) => (
                      <p className="mb-6 leading-relaxed" {...props} />
                    ),
                    a: (props) => (
                      <a className="text-blue-500 hover:underline" {...props} />
                    ),
                    code: (props) => (
                      <code
                        className="rounded bg-gray-100 px-1 py-1"
                        {...props}
                      />
                    ),
                    pre: (props) => (
                      <pre className="rounded bg-gray-100 p-2" {...props} />
                    ),
                    blockquote: (props) => (
                      <blockquote
                        className="mb-6 border-l-2 border-gray-300 pl-4"
                        {...props}
                      />
                    ),
                    ul: (props) => (
                      <ul className="mb-6 list-inside list-disc" {...props} />
                    ),
                    ol: (props) => (
                      <ol
                        className="mb-6 list-inside list-decimal"
                        {...props}
                      />
                    ),
                    li: (props) => <li className="mb-1" {...props} />,
                    table: (props) => (
                      <table className="mb-6 w-full" {...props} />
                    ),
                    thead: (props) => (
                      <thead className="text-left" {...props} />
                    ),
                    tbody: (props) => <tbody {...props} />,
                    tr: (props) => <tr {...props} />,
                    th: (props) => <th className="px-4 py-2" {...props} />,
                    td: (props) => <td className="px-4 py-2" {...props} />,
                    strong: (props) => (
                      <strong className="font-bold" {...props} />
                    ),
                    em: (props) => <em className="italic" {...props} />,
                    del: (props) => <del className="line-through" {...props} />,
                    ins: (props) => <ins className="underline" {...props} />,
                  }}
                >
                  {data.summary}
                </Markdown>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
