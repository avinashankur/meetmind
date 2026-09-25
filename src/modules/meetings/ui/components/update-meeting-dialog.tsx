import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit meeting</DialogTitle>
          <DialogDescription>
            Update meeting configuration details.
          </DialogDescription>
        </DialogHeader>
        <MeetingForm
          onSuccess={() => {
            onOpenChange(false);
          }}
          onCancel={() => onOpenChange(false)}
          initialValues={initialValues}
        />
      </DialogContent>
    </Dialog>
  );
};
