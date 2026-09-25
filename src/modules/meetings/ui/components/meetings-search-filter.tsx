"use client";

import { Input } from "@/components/ui/input";
import { SearchIcon, XIcon } from "lucide-react";
import { useMeetingsFilter } from "../../hooks/use-meetings-filter";
import { DEFAULT_PAGE } from "@/constants";

export const MeetingsSearchFilter = () => {
  const [filters, setFilters] = useMeetingsFilter();

  const handleClear = () => {
    setFilters({
      search: "",
      page: DEFAULT_PAGE,
    });
  };

  return (
    <div className="relative flex-1 sm:w-64 sm:flex-initial">
      <Input
        placeholder="Search meetings..."
        className="bg-background/80 focus:bg-background border-border text-foreground placeholder:text-muted-foreground/60 h-9 w-full rounded-md pr-8 pl-8 text-xs shadow-2xs transition-colors sm:text-sm"
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
          className="text-muted-foreground/70 hover:text-foreground hover:bg-muted absolute top-1/2 right-2.5 -translate-y-1/2 rounded-sm p-0.5 transition-colors"
          aria-label="Clear search"
        >
          <XIcon className="size-3" />
        </button>
      )}
    </div>
  );
};
