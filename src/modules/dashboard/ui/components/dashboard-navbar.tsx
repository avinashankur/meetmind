"use client";

import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { useSidebar } from "@/components/ui/sidebar";
import { PanelLeftCloseIcon, PanelLeftIcon, SearchIcon } from "lucide-react";
import { DashboardCommand } from "./dashboard-command";
import { useEffect, useState } from "react";

export const DashboardNavbar = () => {
  const { state, toggleSidebar, isMobile } = useSidebar();
  const [commandOpen, setCommandOpen] = useState(false);

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
    <nav className="bg-background flex items-center gap-x-2 border-b px-2 py-3">
      <DashboardCommand open={commandOpen} setOpen={setCommandOpen} />

      <Button variant="outline" className="size-9" onClick={toggleSidebar}>
        {state === "collapsed" || isMobile ? (
          <PanelLeftIcon className="size-4" />
        ) : (
          <PanelLeftCloseIcon className="size-4" />
        )}
      </Button>
      <Button
        className="text-muted-foreground hover:text-muted-foreground h-9 w-[240px] justify-start font-normal"
        variant="outline"
        size="sm"
        onClick={() => setCommandOpen((open) => !open)}
      >
        <SearchIcon />
        Search
        <Kbd className="pointer-events-none ml-auto">&#8984; K</Kbd>
      </Button>
    </nav>
  );
};
