"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { BotIcon, SparklesIcon, VideoIcon } from "lucide-react";
import Link from "next/link";
import { Logo } from "../../../../../public/logo";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import DashboardUserButton from "./dashboard-user-button";

const firstSection = [
  {
    icon: VideoIcon,
    label: "Meetings",
    href: "/meetings",
  },
  {
    icon: BotIcon,
    label: "Agents",
    href: "/agents",
  },
];

const secondSection = [
  {
    icon: SparklesIcon,
    label: "Upgrade",
    href: "/upgrade",
  },
];

export const DashboardSidebar = () => {
  const pathname = usePathname();

  return (
    <Sidebar className="border-border bg-sidebar border-r">
      {/* Brand Header */}
      <SidebarHeader className="border-border/80 border-b px-4 py-3.5">
        <Link
          href="/"
          className="group flex items-center gap-2.5 transition-opacity hover:opacity-85"
        >
          <Logo
            size={26}
            className="shrink-0 transition-transform group-hover:scale-105"
          />
          <div className="flex items-center gap-2">
            <span className="text-primary text-base font-semibold tracking-tight">
              MeetMind
            </span>
          </div>
        </Link>
      </SidebarHeader>

      {/* Main Navigation */}
      <SidebarContent className="py-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1 px-1">
              {firstSection.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href + "/"));

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        "h-10 w-full rounded-xl px-3 transition-colors",
                        isActive
                          ? "bg-card text-foreground border-border border font-medium shadow-2xs"
                          : "text-muted-foreground hover:text-foreground hover:bg-card/50",
                      )}
                    >
                      <Link
                        href={item.href}
                        className="flex items-center gap-3"
                      >
                        <item.icon
                          className={cn(
                            "size-4 shrink-0 transition-colors",
                            isActive ? "text-brand" : "text-muted-foreground",
                          )}
                        />
                        <span className="text-sm tracking-tight">
                          {item.label}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Upgrade Section */}
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu className="gap-1 px-1">
              {secondSection.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        "h-10 w-full rounded-xl px-3 transition-colors",
                        isActive
                          ? "bg-card text-foreground border-border border font-medium shadow-2xs"
                          : "text-muted-foreground hover:text-foreground hover:bg-card/50",
                      )}
                    >
                      <Link
                        href={item.href}
                        className="flex items-center gap-3"
                      >
                        <item.icon className="size-4 shrink-0 text-amber-500" />
                        <span className="text-sm tracking-tight">
                          {item.label}
                        </span>
                        <span className="ml-auto rounded-full border border-amber-500/20 bg-amber-500/10 px-2 py-0.5 font-mono text-[10px] font-medium tracking-wider text-amber-600 uppercase dark:text-amber-400">
                          Pro
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* User Footer */}
      <SidebarFooter className="border-border/80 border-t p-3">
        <DashboardUserButton />
      </SidebarFooter>
    </Sidebar>
  );
};
