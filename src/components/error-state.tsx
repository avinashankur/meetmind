import { AlertCircleIcon } from "lucide-react";

interface Props {
  title: string;
  description?: string;
}

export const ErrorState = ({ title, description }: Props) => {
  return (
    <div className="flex gap-1">
      <AlertCircleIcon className="text-destructive mt-1 size-4" />
      <div>
        <h2 className="font-medium">{title}</h2>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </div>
  );
};
