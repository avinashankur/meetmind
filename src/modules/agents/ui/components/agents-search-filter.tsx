"use client";

import { Input } from "@/components/ui/input";
import { useAgentsFilters } from "../../hooks/use-agents-filter";
import { SearchIcon, XIcon } from "lucide-react";
import { DEFAULT_PAGE } from "@/constants";

export const AgentsSearchFilter = () => {
  const [filters, setFilters] = useAgentsFilters();

  const handleClear = () => {
    setFilters({
      search: "",
      page: DEFAULT_PAGE,
    });
  };

  return (
    <div className="relative flex-1 sm:w-64 sm:flex-initial">
      <Input
        placeholder="Search agents"
        className="bg-card text-foreground placeholder:text-muted-foreground/60 focus-visible:ring-ring h-9 w-full rounded-lg border-0 pr-8 pl-8 text-xs shadow-2xs transition-colors focus-visible:ring-1 sm:text-sm"
        value={filters.search}
        onChange={(e) =>
          setFilters({
            search: e.target.value,
            page: DEFAULT_PAGE,
          })
        }
      />
      <SearchIcon className="text-muted-foreground/70 pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2" />
      {filters.search && (
        <button
          type="button"
          onClick={handleClear}
          className="text-muted-foreground/70 hover:text-foreground hover:bg-muted absolute top-1/2 right-2.5 -translate-y-1/2 cursor-pointer rounded-md p-0.5 transition-colors"
          aria-label="Clear search"
        >
          <XIcon className="size-3" />
        </button>
      )}
    </div>
  );
};
