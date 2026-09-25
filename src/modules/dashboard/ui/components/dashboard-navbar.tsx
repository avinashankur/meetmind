"use client";

import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { useSidebar } from "@/components/ui/sidebar";
import { PanelLeftCloseIcon, PanelLeftIcon, SearchIcon } from "lucide-react";
import { DashboardCommand } from "./dashboard-command";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { usePathname } from "next/navigation";

const pageTitles: Record<string, string> = {
  "/meetings": "Meetings",
  "/agents": "Agents",
  "/upgrade": "Upgrade",
};

export const DashboardNavbar = () => {
  const { state, toggleSidebar, isMobile } = useSidebar();
  const [commandOpen, setCommandOpen] = useState(false);
  const pathname = usePathname();

  const currentTitle =
    pageTitles[pathname] ??
    (pathname.startsWith("/meetings/")
      ? "Meeting Details"
      : pathname.startsWith("/agents/")
        ? "Agent Details"
        : "Dashboard");

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);

    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <nav className="bg-background/80 border-border sticky top-0 z-40 border-b py-2.5 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 sm:px-16">
        {/* Left: Sidebar Toggle + Breadcrumb */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            className="border-border hover:bg-card/80 size-8 rounded-lg transition-colors"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            {state === "collapsed" || isMobile ? (
              <PanelLeftIcon className="size-4" />
            ) : (
              <PanelLeftCloseIcon className="size-4" />
            )}
          </Button>

          <div className="bg-border hidden h-4 w-px sm:block" />

          <div className="hidden items-center gap-2 sm:flex">
            <span className="text-muted-foreground font-mono text-xs tracking-wider uppercase">
              {currentTitle}
            </span>
          </div>
        </div>

        {/* Center / Right: Search & Actions */}
        <div className="flex items-center gap-3">
          <DashboardCommand open={commandOpen} setOpen={setCommandOpen} />

          <Button
            variant="outline"
            size="sm"
            onClick={() => setCommandOpen(true)}
            className="border-border bg-card/60 text-muted-foreground hover:text-foreground hover:bg-card/90 h-8.5 w-[180px] justify-between rounded-lg px-2.5 text-xs font-normal shadow-2xs transition-colors sm:w-[240px]"
          >
            <div className="flex items-center gap-2">
              <SearchIcon className="size-3.5 opacity-60" />
              <span className="font-mono text-xs">Search...</span>
            </div>
            <Kbd className="bg-muted/70 border-border pointer-events-none rounded border px-1.5 py-0.5 font-mono text-[10px]">
              ⌘K
            </Kbd>
          </Button>

          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};
