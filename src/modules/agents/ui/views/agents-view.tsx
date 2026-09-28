"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useAgentsFilters } from "../../hooks/use-agents-filter";
import { DEFAULT_PAGE } from "@/constants";
import { DataTable } from "@/components/data-table";
import { DataPagination } from "@/components/data-pagination";
import { columns } from "../components/columns";
import { AgentCardsGrid } from "@/modules/agents/ui/components/agent-cards-grid";
import { NewAgentDialog } from "../components/new-agent-dialog";
import { AGENT_TEMPLATES } from "../../constants";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertTriangleIcon,
  BotIcon,
  Loader2Icon,
  PlusIcon,
  RotateCcwIcon,
  SearchXIcon,
} from "lucide-react";

export const AgentsView = () => {
  const router = useRouter();
  const trpc = useTRPC();
  const [filters, setFilters] = useAgentsFilters();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [defaultTemplate, setDefaultTemplate] = useState<
    { name: string; instructions: string } | undefined
  >(undefined);

  const { data } = useSuspenseQuery(
    trpc.agents.getMany.queryOptions({
      page: filters.page,
      search: filters.search,
    }),
  );

  const isSearchActive = Boolean(filters.search);
  const isGridView = filters.view !== "table";

  const onClearFilters = () => {
    setFilters({
      search: "",
      page: DEFAULT_PAGE,
    });
  };

  const handleOpenWithTemplate = (tmpl: {
    name: string;
    instructions: string;
  }) => {
    setDefaultTemplate(tmpl);
    setIsCreateOpen(true);
  };

  const handleOpenBlank = () => {
    setDefaultTemplate(undefined);
    setIsCreateOpen(true);
  };

  return (
    <>
      <NewAgentDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        defaultValues={defaultTemplate}
      />

      {data.items.length > 0 ? (
        <div className="space-y-4">
          {/* Content: Direct Grid or Seamless Table without heavy nested borders */}
          {isGridView ? (
            <div className="space-y-3">
              <div className="text-muted-foreground flex items-center justify-between px-1 font-mono text-xs">
                <span className="tracking-wider uppercase">
                  {data.total} {data.total === 1 ? "Agent" : "Agents"}
                </span>
                {isSearchActive && (
                  <span className="text-secondary font-sans normal-case">
                    Matching &ldquo;{filters.search}&rdquo;
                  </span>
                )}
              </div>
              <AgentCardsGrid items={data.items} />
            </div>
          ) : (
            <div className="bg-card border-border/40 overflow-hidden rounded-2xl border shadow-xs">
              <div className="bg-muted/20 border-border/30 flex items-center justify-between border-b px-5 py-3 text-xs">
                <span className="text-primary font-medium">
                  All agents ({data.total})
                </span>
                {isSearchActive && (
                  <span className="text-muted-foreground">
                    matching &ldquo;{filters.search}&rdquo;
                  </span>
                )}
              </div>
              <DataTable
                data={data.items}
                columns={columns}
                showHeader={true}
                className="rounded-none border-0 bg-transparent"
                onRowClick={(row) => router.push(`/agents/${row.id}`)}
              />
            </div>
          )}

          {/* Pagination Controls */}
          {data.totalPages > 1 && (
            <div className="pt-2">
              <DataPagination
                page={filters.page}
                totalPages={data.totalPages}
                onPageChange={(page) => setFilters({ page })}
              />
            </div>
          )}
        </div>
      ) : isSearchActive ? (
        /* Empty State: No search matches - Subtle framing */
        <div className="bg-card/70 border-border/40 rounded-2xl border p-10 text-center shadow-xs backdrop-blur-sm sm:p-14">
          <div className="bg-muted/60 border-border/40 text-muted-foreground mx-auto flex size-12 items-center justify-center rounded-full border">
            <SearchXIcon className="size-5" />
          </div>

          <h3 className="text-primary mt-4 text-lg font-medium tracking-tight">
            No agents match your search
          </h3>

          <p className="text-secondary mx-auto mt-1 max-w-md text-xs sm:text-sm">
            No agents found matching &ldquo;{filters.search}&rdquo;. Try
            checking for typos or reset your search.
          </p>

          <div className="mt-5">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="bg-muted/50 border-border/40 hover:bg-muted text-foreground h-9 cursor-pointer gap-2 rounded-lg border px-4 text-xs transition-colors"
            >
              <RotateCcwIcon className="size-3.5" />
              <span>Reset search</span>
            </Button>
          </div>
        </div>
      ) : (
        /* Empty State: First-time onboarding - Subtle framing */
        <div className="bg-card/70 border-border/40 relative overflow-hidden rounded-2xl border p-8 text-center shadow-xs backdrop-blur-sm sm:p-14">
          <div className="bg-brand/10 text-brand relative mx-auto mb-5 flex size-16 items-center justify-center rounded-full">
            <BotIcon className="size-8" />
          </div>

          <h2 className="text-primary text-xl font-medium tracking-tight sm:text-2xl">
            No AI agents yet
          </h2>

          <p className="text-secondary mx-auto mt-1.5 max-w-md text-xs sm:text-sm">
            Create an autonomous AI agent to join your meetings, transcribe
            conversations in real time, and follow your customized instructions.
          </p>

          <div className="mt-6 flex justify-center">
            <Button
              onClick={handleOpenBlank}
              className="bg-primary text-primary-foreground flex h-9 cursor-pointer items-center gap-2 rounded-lg px-4 text-sm font-medium shadow-xs transition-all hover:opacity-90"
            >
              <PlusIcon className="size-4" />
              <span>Create agent</span>
            </Button>
          </div>

          {/* Quick Starter Templates - Subtle card borders */}
          <div className="mt-10 pt-4">
            <div className="text-muted-foreground/80 mb-4 font-mono text-xs font-medium tracking-wider uppercase">
              Or start with a template:
            </div>

            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
              {AGENT_TEMPLATES.slice(0, 3).map((tmpl) => (
                <div
                  key={tmpl.label}
                  onClick={() =>
                    handleOpenWithTemplate({
                      name: tmpl.name,
                      instructions: tmpl.instructions,
                    })
                  }
                  className="group/card bg-muted/30 border-border/40 hover:border-border/70 hover:bg-muted/60 flex cursor-pointer flex-col justify-between rounded-xl border p-4 text-left shadow-2xs transition-all hover:-translate-y-0.5 hover:shadow-xs"
                >
                  <div>
                    <h4 className="text-foreground group-hover/card:text-primary text-xs font-semibold">
                      {tmpl.label}
                    </h4>
                    <p className="text-muted-foreground mt-1 line-clamp-2 text-[11px] leading-relaxed">
                      {tmpl.description}
                    </p>
                  </div>
                  <div className="text-brand mt-3 flex items-center gap-1 text-[11px] font-medium">
                    <span>Use template</span>
                    <PlusIcon className="size-3 transition-transform group-hover/card:translate-x-0.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const AgentsViewLoading = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <Loader2Icon className="text-muted-foreground size-3.5 animate-spin" />
          <span className="text-muted-foreground text-xs font-medium">
            Loading agents...
          </span>
        </div>
        <Skeleton className="bg-muted h-3.5 w-16 rounded-sm" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="bg-card/50 flex flex-col justify-between rounded-2xl p-5 shadow-xs"
          >
            <div>
              <div className="flex items-center gap-3.5">
                <Skeleton className="bg-muted size-12 rounded-xl" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="bg-muted h-4 w-28 rounded-sm" />
                  <Skeleton className="bg-muted h-3 w-16 rounded-sm" />
                </div>
              </div>

              <div className="bg-muted/30 my-4 space-y-2 rounded-xl p-3.5">
                <Skeleton className="bg-muted h-2.5 w-16 rounded-sm" />
                <Skeleton className="bg-muted h-3 w-full rounded-sm" />
                <Skeleton className="bg-muted h-3 w-4/5 rounded-sm" />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <Skeleton className="bg-muted h-5 w-20 rounded-md" />
              <Skeleton className="bg-muted h-4 w-12 rounded-sm" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const AgentsViewError = () => {
  return (
    <div className="bg-card/70 rounded-2xl p-8 text-center shadow-xs backdrop-blur-sm sm:p-12">
      <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400">
        <AlertTriangleIcon className="size-5" />
      </div>

      <h3 className="text-primary mt-3 text-lg font-medium tracking-tight">
        Something went wrong
      </h3>

      <p className="text-secondary mx-auto mt-1 max-w-md text-xs sm:text-sm">
        Failed to load AI agents. Please check your connection and try again.
      </p>

      <div className="mt-5">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => window.location.reload()}
          className="bg-muted/60 hover:bg-muted text-foreground h-9 cursor-pointer gap-2 rounded-lg px-4 text-xs transition-colors"
        >
          <RotateCcwIcon className="size-3.5" />
          <span>Retry</span>
        </Button>
      </div>
    </div>
  );
};
