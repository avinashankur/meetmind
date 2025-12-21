import { ResponsiveDialog } from "@/components/responsive-dialog";
import { MeetingForm } from "./meeting-form";
import { MeetingGetOne } from "../../types";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues: MeetingGetOne;
}

export const UpdateMeetingDialog = ({
  open,
  onOpenChange,
  initialValues,
}: Props) => {
  return (
    <ResponsiveDialog
      title="Edit Meeting"
      description="Edit meeting"
      open={open}
      onOpenChange={onOpenChange}
    >
      <MeetingForm
        onSuccess={() => {
          onOpenChange(false);
        }}
        onCancel={() => onOpenChange(false)}
        initialValues={initialValues}
      />
    </ResponsiveDialog>
  );
};
