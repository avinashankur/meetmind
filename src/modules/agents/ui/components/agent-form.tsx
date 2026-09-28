"use client";

import { useTRPC } from "@/trpc/client";
import { AgentGetOne } from "../../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import { agentInsertSchema } from "../../schema";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/form/form-input";
import GeneratedAvatar from "@/components/generated-avatar";
import FormTextarea from "@/components/form/form-textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AGENT_TEMPLATES, AgentTemplate } from "../../constants";
import { Spinner } from "@/components/ui/spinner";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

interface AgentFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  initialValues?: AgentGetOne;
  defaultValues?: {
    name?: string;
    instructions?: string;
  };
}

export const AgentForm = ({
  onSuccess,
  onCancel,
  initialValues,
  defaultValues,
}: AgentFormProps) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const createAgent = useMutation(
    trpc.agents.create.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.agents.getMany.queryOptions({}));
        toast.success("Agent created successfully");
        onSuccess?.();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }),
  );

  const updateAgent = useMutation(
    trpc.agents.update.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.agents.getMany.queryOptions({}));

        if (initialValues?.id) {
          queryClient.invalidateQueries(
            trpc.agents.getOne.queryOptions({ id: initialValues.id }),
          );
        }

        toast.success("Agent updated successfully");
        onSuccess?.();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }),
  );

  const form = useForm<z.infer<typeof agentInsertSchema>>({
    resolver: zodResolver(agentInsertSchema),
    defaultValues: {
      name: initialValues?.name ?? defaultValues?.name ?? "",
      instructions:
        initialValues?.instructions ?? defaultValues?.instructions ?? "",
    },
  });

  useEffect(() => {
    if (defaultValues) {
      if (defaultValues.name) form.setValue("name", defaultValues.name);
      if (defaultValues.instructions)
        form.setValue("instructions", defaultValues.instructions);
    }
  }, [defaultValues, form]);

  const isEdit = !!initialValues?.id;
  const isPending = createAgent.isPending || updateAgent.isPending;
  const agentName = form.watch("name");

  const onSelectTemplate = (template: AgentTemplate) => {
    form.setValue("name", template.name, { shouldValidate: true });
    form.setValue("instructions", template.instructions, {
      shouldValidate: true,
    });
  };

  const onSubmit = (values: z.infer<typeof agentInsertSchema>) => {
    if (isEdit) {
      updateAgent.mutate({ ...values, id: initialValues.id });
    } else {
      createAgent.mutate(values);
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        {/* Avatar & Identity Preview - Soft tonal surface with delicate framing */}
        <div className="bg-muted/30 border-border/40 flex items-center gap-3.5 rounded-xl border p-3.5">
          <div className="bg-card border-border/40 flex size-12 shrink-0 items-center justify-center rounded-xl border shadow-2xs">
            <GeneratedAvatar
              seed={agentName.trim() || "Agent Preview"}
              variant="botttsNeutral"
              className="size-10"
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <p className="text-foreground truncate text-sm font-semibold">
                {agentName.trim() || "Agent Name"}
              </p>
              {agentName.trim() && (
                <span className="bg-muted/80 border-border/40 text-muted-foreground rounded-md border px-1.5 py-0.5 font-mono text-[10px] tracking-wider uppercase">
                  Preview
                </span>
              )}
            </div>
            <p className="text-muted-foreground mt-0.5 text-xs">
              Avatar dynamically updates as you type the agent&apos;s name
            </p>
          </div>
        </div>

        {/* Quick starter templates (only in create mode) - Delicate pill borders */}
        {!isEdit && (
          <div className="space-y-2">
            <div className="text-muted-foreground font-mono text-[11px] font-medium tracking-wider uppercase">
              Or start with a template:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {AGENT_TEMPLATES.map((tmpl) => {
                const isSelected = agentName.trim() === tmpl.name;
                return (
                  <button
                    key={tmpl.label}
                    type="button"
                    onClick={() => onSelectTemplate(tmpl)}
                    className={cn(
                      "inline-flex cursor-pointer items-center rounded-lg px-2.5 py-1 text-xs font-medium transition-all",
                      isSelected
                        ? "bg-primary text-primary-foreground border-primary border font-semibold shadow-2xs"
                        : "bg-muted/40 border-border/40 text-secondary hover:text-foreground hover:bg-muted/70 hover:border-border/60 border",
                    )}
                  >
                    {tmpl.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <FormInput
          name="name"
          label="Agent Name"
          placeholder="e.g. Meeting Notetaker, Tech Interviewer"
          className="bg-muted/20 border-border/50 hover:border-border/80 focus:border-ring focus:bg-background text-foreground placeholder:text-muted-foreground/50 focus-visible:ring-ring/40 rounded-xl border shadow-2xs transition-colors focus-visible:ring-1"
          isAsterisk
        />

        <FormTextarea
          name="instructions"
          label="System Instructions"
          placeholder="Define how this agent should behave during meetings, what notes to capture, or questions to ask..."
          rows={5}
          className="bg-muted/20 border-border/50 hover:border-border/80 focus:border-ring focus:bg-background text-foreground placeholder:text-muted-foreground/50 focus-visible:ring-ring/40 rounded-xl border shadow-2xs transition-colors focus-visible:ring-1"
          isAsterisk
          description="These instructions guide the agent's real-time voice and analysis behavior during calls."
        />

        <div className="mt-6 flex items-center justify-end gap-2.5 pt-2">
          {onCancel && (
            <Button
              variant="ghost"
              disabled={isPending}
              type="button"
              onClick={onCancel}
              className="text-muted-foreground hover:text-foreground border-border/40 hover:bg-muted/60 h-9 cursor-pointer rounded-lg border px-4 text-sm font-medium transition-colors"
            >
              Cancel
            </Button>
          )}
          <Button
            disabled={isPending}
            className="bg-primary text-primary-foreground flex h-9 cursor-pointer items-center gap-2 rounded-lg px-4 text-sm font-medium shadow-xs transition-all hover:opacity-90"
          >
            {isPending && <Spinner className="size-3.5" />}
            <span>
              {isPending
                ? isEdit
                  ? "Saving..."
                  : "Creating..."
                : isEdit
                  ? "Save Changes"
                  : "Create Agent"}
            </span>
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
