"use client";

import { useRouter } from "next/navigation";
import { format } from "date-fns";
import {
  CopyIcon,
  VideoIcon,
  CalendarIcon,
  ArrowUpRightIcon,
} from "lucide-react";
import { toast } from "sonner";
import GeneratedAvatar from "@/components/generated-avatar";
import { AgentsGetMany } from "../../types";
import { AgentRowActions } from "@/modules/agents/ui/components/agent-row-actions";

interface AgentCardProps {
  agent: AgentsGetMany[number];
}

export const AgentCard = ({ agent }: AgentCardProps) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/agents/${agent.id}`);
  };

  const handleCopyId = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(agent.id);
    toast.success("Agent ID copied to clipboard");
  };

  const formattedDate = agent.createdAt
    ? format(new Date(agent.createdAt), "MMM d, yyyy")
    : "Recently";

  return (
    <div
      onClick={handleCardClick}
      className="group bg-card hover:bg-card/90 border-border/40 hover:border-border/80 relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
    >
      {/* Top Identity Block */}
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3.5">
            <div className="bg-muted/50 border-border/40 flex size-12 shrink-0 items-center justify-center rounded-xl border transition-transform group-hover:scale-105">
              <GeneratedAvatar
                seed={agent.name}
                variant="botttsNeutral"
                className="size-10"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-foreground group-hover:text-primary truncate text-base font-semibold tracking-tight transition-colors">
                {agent.name}
              </h3>
              <div className="mt-0.5 flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyId}
                  title="Copy Agent ID"
                  className="hover:text-foreground text-muted-foreground/70 hover:bg-muted/60 inline-flex cursor-pointer items-center gap-1 rounded px-1.5 py-0.5 font-mono text-[10px] transition-colors"
                >
                  <span>#{agent.id.slice(0, 6)}</span>
                  <CopyIcon className="size-2.5" />
                </button>
              </div>
            </div>
          </div>

          <div onClick={(e) => e.stopPropagation()}>
            <AgentRowActions agent={agent} />
          </div>
        </div>

        {/* System Instructions excerpt - Delicate framing */}
        <div className="bg-muted/30 border-border/30 group-hover:bg-muted/50 group-hover:border-border/50 relative my-4 rounded-xl border p-3.5 transition-colors">
          <div className="text-muted-foreground/70 mb-1 font-mono text-[10px] font-medium tracking-wider uppercase">
            Instructions
          </div>
          <p className="text-secondary line-clamp-3 text-xs leading-relaxed font-normal">
            {agent.instructions || "No instructions provided."}
          </p>
        </div>
      </div>

      {/* Footer Metrics & Link - Spaced naturally without horizontal divider lines */}
      <div className="flex items-center justify-between pt-1 text-xs">
        <div className="flex items-center gap-2.5">
          <span className="bg-muted/50 border-border/40 text-secondary inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium">
            <VideoIcon className="text-muted-foreground size-3" />
            <span>
              {agent.meetingCount}{" "}
              {agent.meetingCount === 1 ? "meeting" : "meetings"}
            </span>
          </span>

          <span className="text-muted-foreground/70 hidden items-center gap-1 text-[11px] sm:inline-flex">
            <CalendarIcon className="size-3" />
            <span>{formattedDate}</span>
          </span>
        </div>

        <div className="text-muted-foreground group-hover:text-foreground flex items-center gap-1 text-xs font-medium transition-colors">
          <span>Details</span>
          <ArrowUpRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </div>
  );
};
