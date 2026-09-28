import { ResponsiveDialog } from "@/components/responsive-dialog";
import { AgentForm } from "./agent-form";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultValues?: {
    name?: string;
    instructions?: string;
  };
}

export const NewAgentDialog = ({
  open,
  onOpenChange,
  defaultValues,
}: Props) => {
  return (
    <ResponsiveDialog
      title="Create New Agent"
      description="Configure an autonomous AI agent to join and assist your meetings"
      open={open}
      onOpenChange={onOpenChange}
    >
      <AgentForm
        defaultValues={defaultValues}
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
      />
    </ResponsiveDialog>
  );
};
