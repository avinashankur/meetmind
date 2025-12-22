import { EmptyState } from "@/components/empty-state";

export const CancelledState = () => {
  return (
    <div className="rounded-lg bg-white py-8">
      <EmptyState
        title="Meeting Cancelled"
        description="Meeting was cancelled."
        image="/cancelled.svg"
      />
    </div>
  );
};
