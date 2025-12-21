import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface Props {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const DataPagination = ({ page, totalPages, onPageChange }: Props) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm">
          Page {page} of {totalPages || 1}
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          disabled={page === 1}
          variant="outline"
          size="sm"
          onClick={() => onPageChange(Math.max(1, page - 1))}
        >
          <ChevronLeftIcon />
          Previous
        </Button>
        <Button
          disabled={page === totalPages || totalPages === 0}
          variant="outline"
          size="sm"
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        >
          Next
          <ChevronRightIcon />
        </Button>
      </div>
    </div>
  );
};
