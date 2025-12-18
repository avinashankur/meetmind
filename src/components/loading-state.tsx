import { Spinner } from "./ui/spinner";

interface Props {
  title: string;
  description?: string;
}

export const LoadingState = ({ title, description }: Props) => {
  return (
    <div className="flex gap-1 text-sm">
      <Spinner className="mt-1" />
      <div>
        <h2 className="font-medium">{title}</h2>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </div>
  );
};
