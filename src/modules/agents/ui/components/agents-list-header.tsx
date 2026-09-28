"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  PlusIcon,
  RotateCcwIcon,
  LayoutGridIcon,
  ListIcon,
} from "lucide-react";
import { NewAgentDialog } from "./new-agent-dialog";
import { AgentsSearchFilter } from "./agents-search-filter";
import { useAgentsFilters } from "../../hooks/use-agents-filter";
import { DEFAULT_PAGE } from "@/constants";
import { cn } from "@/lib/utils";

export const AgentsListHeader = () => {
  const [filters, setFilters] = useAgentsFilters();
  const [isDialogOpen, setDialogOpen] = useState(false);

  const isSearchActive = Boolean(filters.search);
  const isGridView = filters.view !== "table";

  const onClearFilters = () => {
    setFilters({
      search: "",
      page: DEFAULT_PAGE,
    });
  };

  return (
    <>
      <NewAgentDialog open={isDialogOpen} onOpenChange={setDialogOpen} />

      <div className="flex flex-col gap-3 pb-6 sm:flex-row sm:items-center sm:justify-between">
        {/* Left: Search Filter & Reset */}
        <div className="flex flex-1 flex-wrap items-center gap-2">
          <AgentsSearchFilter />

          {isSearchActive && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-muted-foreground hover:text-foreground hover:bg-muted/60 h-9 cursor-pointer gap-1.5 rounded-lg px-3 text-xs font-normal transition-colors sm:text-sm"
            >
              <RotateCcwIcon className="size-3.5" />
              <span>Reset</span>
            </Button>
          )}
        </div>

        {/* Right: View Switcher (Grid/Table) & Primary Action */}
        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          {/* Segmented View Toggle with subtle framing */}
          <div className="bg-muted/40 border-border/40 flex items-center rounded-lg border p-0.5">
            <button
              type="button"
              onClick={() => setFilters({ view: "grid" })}
              aria-label="Grid view"
              className={cn(
                "flex h-8 cursor-pointer items-center gap-1.5 rounded-md px-2.5 text-xs font-medium transition-all",
                isGridView
                  ? "bg-card border-border/30 text-foreground border font-semibold shadow-2xs"
                  : "text-muted-foreground hover:text-foreground hover:bg-card/40 border border-transparent",
              )}
            >
              <LayoutGridIcon className="size-3.5" />
              <span>Grid</span>
            </button>
            <button
              type="button"
              onClick={() => setFilters({ view: "table" })}
              aria-label="Table view"
              className={cn(
                "flex h-8 cursor-pointer items-center gap-1.5 rounded-md px-2.5 text-xs font-medium transition-all",
                !isGridView
                  ? "bg-card border-border/30 text-foreground border font-semibold shadow-2xs"
                  : "text-muted-foreground hover:text-foreground hover:bg-card/40 border border-transparent",
              )}
            >
              <ListIcon className="size-3.5" />
              <span>Table</span>
            </button>
          </div>

          <Button
            onClick={() => setDialogOpen(true)}
            className="bg-primary text-primary-foreground flex h-9 shrink-0 cursor-pointer items-center gap-2 rounded-lg px-4 text-sm font-medium shadow-xs transition-all hover:opacity-90"
          >
            <PlusIcon className="size-4" />
            <span>New agent</span>
          </Button>
        </div>
      </div>
    </>
  );
};
