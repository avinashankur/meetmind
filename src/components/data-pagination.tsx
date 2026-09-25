import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface Props {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const DataPagination = ({ page, totalPages, onPageChange }: Props) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 py-2">
      <div>
        <p className="text-muted-foreground font-mono text-xs tracking-wider uppercase">
          PAGE{" "}
          <span className="text-foreground font-semibold">
            [{page < 10 ? `0${page}` : page}]
          </span>{" "}
          OF{" "}
          <span className="text-foreground font-semibold">
            [{totalPages < 10 ? `0${totalPages || 1}` : totalPages || 1}]
          </span>
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          disabled={page === 1}
          variant="outline"
          size="sm"
          className="border-border hover:bg-card/80 h-8 rounded-full px-3 font-mono text-xs tracking-wider uppercase transition-colors disabled:opacity-40"
          onClick={() => onPageChange(Math.max(1, page - 1))}
        >
          <ChevronLeftIcon className="mr-0.5 size-3.5" />
          Prev
        </Button>
        <Button
          disabled={page === totalPages || totalPages === 0}
          variant="outline"
          size="sm"
          className="border-border hover:bg-card/80 h-8 rounded-full px-3 font-mono text-xs tracking-wider uppercase transition-colors disabled:opacity-40"
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        >
          Next
          <ChevronRightIcon className="ml-0.5 size-3.5" />
        </Button>
      </div>
    </div>
  );
};
