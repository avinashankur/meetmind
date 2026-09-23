"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon-sm"
        className={`size-8 rounded-full border border-zinc-200/60 dark:border-zinc-800 ${className ?? ""}`}
        aria-label="Toggle theme"
      >
        <span className="size-4" />
      </Button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`size-8 rounded-full border border-zinc-200/80 bg-zinc-50/50 text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-950 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 ${className ?? ""}`}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="size-3.5 transition-transform hover:rotate-45" />
      ) : (
        <Moon className="size-3.5 transition-transform hover:-rotate-12" />
      )}
    </Button>
  );
}
