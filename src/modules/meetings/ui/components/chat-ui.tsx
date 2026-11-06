"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import type { Channel, LocalMessage } from "stream-chat";
import { useCreateChatClient } from "stream-chat-react";
import Markdown from "react-markdown";
import { format } from "date-fns";
import { ArrowUpIcon, MessageSquareTextIcon } from "lucide-react";

import { useTRPC } from "@/trpc/client";
import GeneratedAvatar from "@/components/generated-avatar";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Bubble, BubbleContent } from "@/components/ui/bubble";
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
} from "@/components/ui/message";
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

interface Props {
  meetingId: string;
  agentName: string;
  userId: string;
  userName: string;
  userImage: string | undefined;
}

const SUGGESTIONS = [
  "What were the key decisions?",
  "List the action items and owners",
  "Summarise this meeting in three bullet points",
];

/** Stop showing "thinking" if the agent never answers (webhook failure). */
const REPLY_TIMEOUT_MS = 60_000;

export const ChatUI = ({
  meetingId,
  agentName,
  userId,
  userName,
  userImage,
}: Props) => {
  const trpc = useTRPC();
  const { mutateAsync: generateChatToken } = useMutation(
    trpc.meetings.generateChatToken.mutationOptions(),
  );

  const client = useCreateChatClient({
    apiKey: process.env.NEXT_PUBLIC_STREAM_CHAT_API_KEY!,
    tokenOrProvider: generateChatToken,
    userData: { id: userId, name: userName, image: userImage },
  });

  const [channel, setChannel] = useState<Channel>();
  const [messages, setMessages] = useState<LocalMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [isAwaitingReply, setIsAwaitingReply] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const replyTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (!client) return;

    const ch = client.channel("messaging", meetingId, { members: [userId] });
    let cancelled = false;

    const sync = () => setMessages([...ch.state.messages]);

    ch.watch()
      .then(() => {
        if (cancelled) return;
        setChannel(ch);
        sync();
      })
      .catch(() => !cancelled && setLoadError(true));

    const sub = ch.on("message.new", (event) => {
      sync();
      if (event.user?.id && event.user.id !== userId) {
        clearTimeout(replyTimeout.current);
        setIsAwaitingReply(false);
      }
    });

    return () => {
      cancelled = true;
      sub.unsubscribe();
      clearTimeout(replyTimeout.current);
    };
  }, [client, meetingId, userId]);

  const send = useCallback(
    async (text: string) => {
      const value = text.trim();
      if (!channel || !value || isAwaitingReply) return;

      setDraft("");
      setIsAwaitingReply(true);
      clearTimeout(replyTimeout.current);
      replyTimeout.current = setTimeout(
        () => setIsAwaitingReply(false),
        REPLY_TIMEOUT_MS,
      );

      try {
        await channel.sendMessage({ text: value });
        setMessages([...channel.state.messages]);
      } catch {
        setDraft(value);
        setIsAwaitingReply(false);
      }
    },
    [channel, isAwaitingReply],
  );

  if (loadError) {
    return (
      <Empty className="min-h-[320px]">
        <EmptyHeader>
          <EmptyTitle>Chat unavailable</EmptyTitle>
          <EmptyDescription>
            Couldn&apos;t connect to the chat. Reload the page to try again.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  const isReady = Boolean(client && channel);

  return (
    <div className="flex h-[min(620px,calc(100vh-22rem))] min-h-[420px] min-w-0 flex-col">
      <div className="relative min-h-0 flex-1">
        {!isReady ? (
          <div className="flex size-full items-center justify-center">
            <Spinner className="text-muted-foreground" />
          </div>
        ) : messages.length === 0 && !isAwaitingReply ? (
          <Empty className="size-full">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <MessageSquareTextIcon />
              </EmptyMedia>
              <EmptyTitle>Ask {agentName} about this meeting</EmptyTitle>
              <EmptyDescription>
                Answers are based on the meeting summary.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent className="flex-row flex-wrap justify-center">
              {SUGGESTIONS.map((suggestion) => (
                <Button
                  key={suggestion}
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                  onClick={() => send(suggestion)}
                >
                  {suggestion}
                </Button>
              ))}
            </EmptyContent>
          </Empty>
        ) : (
          <MessageScrollerProvider autoScroll>
            <MessageScroller>
              <MessageScrollerViewport>
                <MessageScrollerContent className="mx-auto w-full max-w-3xl gap-6 p-4 sm:p-6">
                  {messages.map((message) => {
                    const isMine = message.user?.id === userId;
                    return (
                      <MessageScrollerItem
                        key={message.id}
                        messageId={message.id}
                        scrollAnchor={isMine}
                      >
                        <Message align={isMine ? "end" : "start"}>
                          {!isMine && (
                            <MessageAvatar>
                              <GeneratedAvatar
                                seed={agentName}
                                variant="botttsNeutral"
                                className="size-8"
                              />
                            </MessageAvatar>
                          )}
                          <MessageContent>
                            {isMine ? (
                              <Bubble variant="default" align="end">
                                <BubbleContent className="whitespace-pre-wrap">
                                  {message.text}
                                </BubbleContent>
                              </Bubble>
                            ) : (
                              <Bubble variant="muted">
                                <BubbleContent className="[&_li]:my-0.5 [&_ol]:list-decimal [&_ol]:pl-5 [&_p:not(:last-child)]:mb-2 [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:pl-5">
                                  <Markdown>{message.text ?? ""}</Markdown>
                                </BubbleContent>
                              </Bubble>
                            )}
                            <MessageFooter>
                              {format(message.created_at, "h:mm a")}
                            </MessageFooter>
                          </MessageContent>
                        </Message>
                      </MessageScrollerItem>
                    );
                  })}

                  {isAwaitingReply && (
                    <MessageScrollerItem messageId="pending-reply">
                      <Message align="start">
                        <MessageAvatar>
                          <GeneratedAvatar
                            seed={agentName}
                            variant="botttsNeutral"
                            className="size-8"
                          />
                        </MessageAvatar>
                        <MessageContent>
                          <Bubble variant="muted">
                            <BubbleContent className="text-muted-foreground flex-row items-center gap-2">
                              <Spinner />
                              {agentName} is thinking
                            </BubbleContent>
                          </Bubble>
                        </MessageContent>
                      </Message>
                    </MessageScrollerItem>
                  )}
                </MessageScrollerContent>
              </MessageScrollerViewport>
              <MessageScrollerButton variant="outline" />
            </MessageScroller>
          </MessageScrollerProvider>
        )}
      </div>

      <form
        className="border-border/50 bg-muted/30 border-t p-3"
        onSubmit={(e) => {
          e.preventDefault();
          send(draft);
        }}
      >
        <InputGroup className="bg-background mx-auto max-w-3xl">
          <InputGroupTextarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send(draft);
              }
            }}
            placeholder={`Ask ${agentName} about this meeting`}
            aria-label="Message"
            rows={1}
            className="max-h-40 min-h-11"
            disabled={!isReady}
          />
          <InputGroupAddon align="block-end">
            <InputGroupButton
              type="submit"
              size="icon-xs"
              variant="default"
              className="ml-auto rounded-full"
              disabled={!isReady || !draft.trim() || isAwaitingReply}
              aria-label="Send message"
            >
              <ArrowUpIcon />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </form>
    </div>
  );
};
