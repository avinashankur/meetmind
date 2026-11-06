"use client";

import { parseAsStringLiteral, useQueryState } from "nuqs";
import {
  BookOpenTextIcon,
  DownloadIcon,
  FileTextIcon,
  FileVideoIcon,
  MessageSquareTextIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { MeetingGetOne } from "../../types";
import { MeetingSummary } from "./meeting-summary";
import { Transcript } from "./transcript";
import { ChatProvider } from "./chat-provider";

const TABS = ["summary", "transcript", "recording", "chat"] as const;
type Tab = (typeof TABS)[number];

interface Props {
  data: MeetingGetOne;
}

export const CompletedState = ({ data }: Props) => {
  const [tab, setTab] = useQueryState(
    "tab",
    parseAsStringLiteral(TABS)
      .withDefault("summary")
      .withOptions({ clearOnDefault: true }),
  );

  return (
    <Tabs
      value={tab}
      onValueChange={(value) => setTab(value as Tab)}
      className="border-border/50 bg-card min-w-0 gap-0 overflow-hidden rounded-xl border shadow-2xs"
    >
      <div className="border-border/50 bg-muted/40 overflow-x-auto border-b px-4">
        <TabsList variant="line" className="h-11">
          <TabsTrigger value="summary">
            <BookOpenTextIcon />
            Summary
          </TabsTrigger>
          <TabsTrigger value="transcript">
            <FileTextIcon />
            Transcript
          </TabsTrigger>
          <TabsTrigger value="recording">
            <FileVideoIcon />
            Recording
          </TabsTrigger>
          <TabsTrigger value="chat">
            <MessageSquareTextIcon />
            Ask AI
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="summary" className="min-w-0 p-5 sm:p-6">
        <MeetingSummary summary={data.summary} />
      </TabsContent>
      <TabsContent value="transcript" className="min-w-0 p-5 sm:p-6">
        <Transcript meetingId={data.id} />
      </TabsContent>
      <TabsContent value="recording" className="min-w-0 p-5 sm:p-6">
        <Recording url={data.recordingUrl} name={data.name} />
      </TabsContent>
      <TabsContent value="chat" className="min-w-0">
        <ChatProvider meetingId={data.id} agentName={data.agent.name} />
      </TabsContent>
    </Tabs>
  );
};

const Recording = ({ url, name }: { url: string | null; name: string }) => {
  if (!url) {
    return (
      <Empty className="min-h-[280px]">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <FileVideoIcon />
          </EmptyMedia>
          <EmptyTitle>No recording</EmptyTitle>
          <EmptyDescription>
            No recording is available for this meeting.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <video
        src={url}
        controls
        preload="metadata"
        className="aspect-video w-full rounded-lg bg-black"
        aria-label={`Recording of ${name}`}
      />
      <div className="flex items-center justify-between gap-3">
        <span className="text-muted-foreground text-xs">
          Recorded automatically during the call
        </span>
        <Button asChild variant="outline" size="sm">
          <a href={url} target="_blank" rel="noreferrer" download>
            <DownloadIcon data-icon="inline-start" />
            Download
          </a>
        </Button>
      </div>
    </div>
  );
};
