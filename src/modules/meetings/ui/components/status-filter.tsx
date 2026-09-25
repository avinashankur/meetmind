"use client";

import {
  CircleCheckIcon,
  CircleXIcon,
  ClockArrowUpIcon,
  LoaderIcon,
  VideoIcon,
  SlidersHorizontalIcon,
} from "lucide-react";
import { MeetingStatus } from "../../types";
import { useMeetingsFilter } from "../../hooks/use-meetings-filter";
import { DEFAULT_PAGE } from "@/constants";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const StatusFilter = () => {
  const [filters, setFilters] = useMeetingsFilter();

  const handleValueChange = (value: string) => {
    setFilters({
      status: value === "all" ? null : (value as MeetingStatus),
      page: DEFAULT_PAGE,
    });
  };

  return (
    <Select value={filters.status ?? "all"} onValueChange={handleValueChange}>
      <SelectTrigger
        className="h-9 w-auto min-w-[140px] text-xs sm:text-sm"
        aria-label="Filter by status"
      >
        <SelectValue placeholder="All statuses" />
      </SelectTrigger>
      <SelectContent position="popper" align="start">
        <SelectGroup>
          <SelectItem value="all">
            <SlidersHorizontalIcon className="text-muted-foreground size-3.5" />
            <span>All statuses</span>
          </SelectItem>
          <SelectItem value={MeetingStatus.Upcoming}>
            <ClockArrowUpIcon className="size-3.5 text-sky-600 dark:text-sky-400" />
            <span>Upcoming</span>
          </SelectItem>
          <SelectItem value={MeetingStatus.Active}>
            <VideoIcon className="text-brand size-3.5" />
            <span>Active</span>
          </SelectItem>
          <SelectItem value={MeetingStatus.Processing}>
            <LoaderIcon className="size-3.5 text-amber-600 dark:text-amber-400" />
            <span>Processing</span>
          </SelectItem>
          <SelectItem value={MeetingStatus.Completed}>
            <CircleCheckIcon className="size-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Completed</span>
          </SelectItem>
          <SelectItem value={MeetingStatus.Cancelled}>
            <CircleXIcon className="size-3.5 text-rose-600 dark:text-rose-400" />
            <span>Cancelled</span>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
