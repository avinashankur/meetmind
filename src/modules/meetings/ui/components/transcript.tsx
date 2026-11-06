"use client";

import { useMemo, useState } from "react";
import Highlighter from "react-highlight-words";
import { useQuery } from "@tanstack/react-query";
import { FileTextIcon, SearchIcon, SearchXIcon } from "lucide-react";

import { useTRPC } from "@/trpc/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { formatTimestamp } from "@/lib/utils";

interface Props {
  meetingId: string;
}

const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export const Transcript = ({ meetingId }: Props) => {
  const trpc = useTRPC();
  const { data, isPending } = useQuery(
    trpc.meetings.getTranscript.queryOptions({ id: meetingId }),
  );
  const [searchQuery, setSearchQuery] = useState("");

  const query = searchQuery.trim().toLowerCase();
  const items = useMemo(
    () =>
      (data ?? []).filter((item) =>
        query ? item.text.toLowerCase().includes(query) : true,
      ),
    [data, query],
  );

  if (isPending) {
    return (
      <div className="flex flex-col gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex gap-3">
            <Skeleton className="size-8 rounded-full" />
            <div className="flex flex-1 flex-col gap-2">
              <Skeleton className="h-3 w-32" />
              <Skeleton className="h-3.5 w-full max-w-lg" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!data?.length) {
    return (
      <Empty className="min-h-[280px]">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <FileTextIcon />
          </EmptyMedia>
          <EmptyTitle>No transcript</EmptyTitle>
          <EmptyDescription>
            No transcript is available for this meeting.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  // Consecutive lines from the same speaker read as one turn.
  const turns = items.reduce<{ speakerId: string; lines: typeof items }[]>(
    (acc, item) => {
      const last = acc[acc.length - 1];
      if (last && last.speakerId === item.speaker_id) last.lines.push(item);
      else acc.push({ speakerId: item.speaker_id, lines: [item] });
      return acc;
    },
    [],
  );

  return (
    <div className="flex min-w-0 flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <InputGroup className="bg-background max-w-sm">
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupInput
            placeholder="Search transcript"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search transcript"
          />
          {query && (
            <InputGroupAddon align="inline-end">
              <InputGroupText className="font-mono text-xs tabular-nums">
                {items.length} {items.length === 1 ? "match" : "matches"}
              </InputGroupText>
            </InputGroupAddon>
          )}
        </InputGroup>
        <span className="text-muted-foreground hidden text-xs sm:inline">
          {turns.length} {turns.length === 1 ? "turn" : "turns"} ·{" "}
          {new Set(data.map((item) => item.speaker_id)).size} speakers
        </span>
      </div>

      {turns.length === 0 ? (
        <Empty className="bg-muted/30 min-h-[220px]">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <SearchXIcon />
            </EmptyMedia>
            <EmptyTitle>No matches</EmptyTitle>
            <EmptyDescription>
              Nothing in the transcript matches &ldquo;{searchQuery.trim()}
              &rdquo;.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <ol className="-mx-2 flex flex-col gap-0.5">
          {turns.map((turn) => {
            const speaker = turn.lines[0].user;
            return (
              <li
                key={`${turn.speakerId}-${turn.lines[0].start_ts}`}
                className="hover:bg-muted/50 flex gap-3 rounded-lg px-2 py-2.5 transition-colors"
              >
                <Avatar className="size-8 shrink-0">
                  <AvatarImage src={speaker.image} alt={speaker.name} />
                  <AvatarFallback className="text-xs">
                    {initials(speaker.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex min-w-0 flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-foreground text-sm font-medium">
                      {speaker.name}
                    </span>
                    <span className="bg-muted text-muted-foreground rounded px-1.5 py-0.5 font-mono text-[10px] tabular-nums">
                      {formatTimestamp(turn.lines[0].start_ts)}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    {turn.lines.map((line) => (
                      <Highlighter
                        key={line.start_ts}
                        className="text-foreground/85 text-sm leading-relaxed"
                        highlightClassName="bg-brand/20 text-foreground rounded-sm px-0.5"
                        searchWords={query ? [query] : []}
                        autoEscape
                        textToHighlight={line.text}
                      />
                    ))}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
};
