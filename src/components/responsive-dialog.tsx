import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

interface Props {
  title: string;
  description: string;
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
}

export const ResponsiveDialog = ({
  title,
  description,
  children,
  open,
  onOpenChange,
  className,
}: Props) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent
          className={cn(
            "border-border/50 bg-card rounded-t-2xl border-t",
            className,
          )}
        >
          <DrawerHeader className="px-6 pt-6 pb-2 text-left">
            <DrawerTitle className="text-foreground text-xl font-bold tracking-tight">
              {title}
            </DrawerTitle>
            <DrawerDescription className="text-muted-foreground mt-1 text-xs sm:text-sm">
              {description}
            </DrawerDescription>
          </DrawerHeader>

          <div className="px-6 pt-2 pb-6">{children}</div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "border-border/50 bg-card gap-5 border p-6 shadow-2xl backdrop-blur-xl sm:max-w-lg sm:rounded-2xl sm:p-7",
          className,
        )}
      >
        <DialogHeader className="gap-1.5 text-left">
          <DialogTitle className="text-foreground text-xl font-bold tracking-tight">
            {title}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-xs leading-normal sm:text-sm">
            {description}
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};
