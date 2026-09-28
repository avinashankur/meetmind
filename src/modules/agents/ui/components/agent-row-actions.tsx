"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  CopyIcon,
  ExternalLinkIcon,
  MoreHorizontalIcon,
  PencilIcon,
  Trash2Icon,
  VideoIcon,
} from "lucide-react";
import { AgentsGetMany, AgentGetOne } from "../../types";
import { UpdateAgentDialog } from "./update-agent-dialog";

interface AgentRowActionsProps {
  agent: AgentsGetMany[number];
}

export const AgentRowActions = ({ agent }: AgentRowActionsProps) => {
  const router = useRouter();
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const removeAgent = useMutation(
    trpc.agents.remove.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.agents.getMany.queryOptions({}),
        );
        toast.success(`Agent "${agent.name}" deleted`);
        setIsDeleteOpen(false);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }),
  );

  const onCopyId = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(agent.id);
    toast.success("Agent ID copied to clipboard");
  };

  const onScheduleMeeting = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/meetings?agentId=${agent.id}`);
  };

  const onViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/agents/${agent.id}`);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeAgent.mutate({ id: agent.id });
  };

  return (
    <>
      <UpdateAgentDialog
        open={isUpdateOpen}
        onOpenChange={setIsUpdateOpen}
        initialValues={agent as unknown as AgentGetOne}
      />

      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent
          onClick={(e) => e.stopPropagation()}
          className="bg-card gap-5 border-0 p-6 shadow-2xl backdrop-blur-xl sm:max-w-md sm:rounded-2xl sm:p-7"
        >
          <AlertDialogHeader className="gap-1.5 text-left">
            <AlertDialogTitle>Delete {agent.name}?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              agent
              {agent.meetingCount > 0 ? (
                <>
                  {" "}
                  and all associations with its{" "}
                  <strong>{agent.meetingCount}</strong>{" "}
                  {agent.meetingCount === 1 ? "meeting" : "meetings"}.
                </>
              ) : (
                " and remove its instructions from your account."
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-4">
            <AlertDialogCancel
              disabled={removeAgent.isPending}
              onClick={(e) => e.stopPropagation()}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
              disabled={removeAgent.isPending}
              onClick={handleDelete}
            >
              {removeAgent.isPending ? (
                <div className="flex items-center gap-2">
                  <Spinner className="size-3.5" />
                  <span>Deleting...</span>
                </div>
              ) : (
                "Delete Agent"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DropdownMenu>
        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground hover:bg-muted/80 data-[state=open]:bg-muted data-[state=open]:text-foreground size-8 cursor-pointer rounded-lg transition-colors"
            aria-label="Agent options"
          >
            <MoreHorizontalIcon className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          sideOffset={6}
          className="border-border/80 bg-card/98 text-card-foreground dark:bg-card/90 min-w-[180px] rounded-xl p-1.5 shadow-xl backdrop-blur-md"
          onClick={(e) => e.stopPropagation()}
        >
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={onViewDetails}
              className="hover:bg-accent focus:bg-accent text-foreground cursor-pointer gap-2.5 rounded-lg px-2.5 py-2 text-xs font-medium transition-colors"
            >
              <ExternalLinkIcon className="text-muted-foreground size-3.5" />
              <span>View details</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                setIsUpdateOpen(true);
              }}
              className="hover:bg-accent focus:bg-accent text-foreground cursor-pointer gap-2.5 rounded-lg px-2.5 py-2 text-xs font-medium transition-colors"
            >
              <PencilIcon className="text-muted-foreground size-3.5" />
              <span>Configure agent</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={onScheduleMeeting}
              className="hover:bg-accent focus:bg-accent text-foreground cursor-pointer gap-2.5 rounded-lg px-2.5 py-2 text-xs font-medium transition-colors"
            >
              <VideoIcon className="text-muted-foreground size-3.5" />
              <span>Schedule meeting</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={onCopyId}
              className="hover:bg-accent focus:bg-accent text-foreground cursor-pointer gap-2.5 rounded-lg px-2.5 py-2 text-xs font-medium transition-colors"
            >
              <CopyIcon className="text-muted-foreground size-3.5" />
              <span>Copy agent ID</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator className="bg-border/60 my-1" />
          <DropdownMenuGroup>
            <DropdownMenuItem
              variant="destructive"
              onClick={(e) => {
                e.stopPropagation();
                setIsDeleteOpen(true);
              }}
              className="cursor-pointer gap-2.5 rounded-lg px-2.5 py-2 text-xs font-medium transition-colors"
            >
              <Trash2Icon className="size-3.5" />
              <span>Delete agent</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default AgentRowActions;
