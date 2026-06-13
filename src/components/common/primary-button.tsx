import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface Props {
  className?: string;
  children: React.ReactNode;
}

export const PrimaryButton = ({ className, children }: Props) => {
  return (
    <Button className={cn(className, "rounded-2xl px-6 py-5 hover:opacity-90")}>
      {children}
    </Button>
  );
};
