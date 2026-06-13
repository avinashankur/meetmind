import { cn } from "@/lib/utils";

export function H1({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={cn(
        "font-accent scroll-m-20 text-center text-5xl tracking-tight text-balance text-neutral-800",
        className,
      )}
    >
      {children}
    </h1>
  );
}
