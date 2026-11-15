"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BotIcon, PlusIcon, VideoIcon } from "lucide-react";

import { BrandLogo } from "@/components/brand/logo";
import { PrimaryButton } from "@/components/common/primary-button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NewMeetingDialog } from "@/modules/meetings/ui/components/new-meeting-dialog";
import { cn } from "@/lib/utils";
import DashboardUserButton from "./dashboard-user-button";

const navigation = [
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

export const DashboardSidebar = () => {
  const pathname = usePathname();
  const [isNewMeetingOpen, setIsNewMeetingOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Sidebar className="border-sidebar-border bg-sidebar border-r">
      {/* Brand header. The soft brand wash echoes the landing sky. */}
      <SidebarHeader className="relative h-14 shrink-0 flex-row items-center px-4">
        <span
          aria-hidden="true"
          className="from-brand/10 pointer-events-none absolute inset-0 bg-linear-to-b to-transparent"
        />
        <BrandLogo
          href="/meetings"
          size={26}
          className="relative"
          wordmarkClassName="text-base font-semibold tracking-tight"
        />
      </SidebarHeader>

      {/* Mounted on demand so the agent list is only fetched when opened. */}
      {isNewMeetingOpen && (
        <NewMeetingDialog open onOpenChange={setIsNewMeetingOpen} />
      )}

      <SidebarContent className="gap-0 pt-3">
        <div className="px-3 pb-5">
          <PrimaryButton
            onClick={() => setIsNewMeetingOpen(true)}
            className="w-full"
          >
            <PlusIcon className="size-4" />
            New meeting
          </PrimaryButton>
        </div>

        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="text-muted-foreground h-7 px-3 text-xs font-medium">
            Workspace
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <nav aria-label="Workspace">
              <SidebarMenu className="gap-1 px-2">
                {navigation.map((item) => {
                  const active = isActive(item.href);

                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={active}
                        className={cn(
                          "h-10 gap-1 rounded-lg px-2.5 transition-colors",
                          active
                            ? "border-border/60 bg-card text-foreground hover:bg-card active:bg-card active:text-foreground data-[active=true]:bg-card data-[active=true]:text-foreground border shadow-2xs"
                            : "text-muted-foreground hover:bg-card/60 hover:text-foreground",
                        )}
                      >
                        <Link
                          href={item.href}
                          className="flex items-center gap-2"
                        >
                          <span
                            className={cn(
                              "flex size-7 shrink-0 items-center justify-center rounded-lg transition-colors",
                            )}
                          >
                            <item.icon className="size-4" />
                          </span>
                          <span className="text-sm font-medium">
                            {item.label}
                          </span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </nav>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* User footer */}
      <SidebarFooter className="border-sidebar-border/70 border-t p-3">
        <DashboardUserButton />
      </SidebarFooter>
    </Sidebar>
  );
};
