import { EmptyState } from "@/components/empty-state";

export const ProcessingState = () => {
  return (
    <div className="rounded-lg bg-white py-8">
      <EmptyState
        title="Meeting completed"
        description="Meeting has been completed. A summary will appear here soon."
        image="/processing.svg"
      />
    </div>
  );
};
