import { useTRPC } from "@/trpc/client";
import { MeetingGetOne } from "../../types";
// import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { meetingsInsertSchema } from "../../schema";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/form/form-input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { CommandSelect } from "@/components/command-select";
import GeneratedAvatar from "@/components/generated-avatar";
import { NewAgentDialog } from "@/modules/agents/ui/components/new-agent-dialog";

interface MeetingFormProps {
  onSuccess?: (id?: string) => void;
  onCancel?: () => void;
  initialValues?: MeetingGetOne;
}

export const MeetingForm = ({
  onSuccess,
  onCancel,
  initialValues,
}: MeetingFormProps) => {
  const trpc = useTRPC();
  //   const router = useRouter();
  const queryClient = useQueryClient();

  const [agentSearch, setAgentSearch] = useState("");
  const [openNewAgentDialog, setOpenNewAgentDialog] = useState<boolean>(false);

  const agents = useQuery(
    trpc.agents.getMany.queryOptions({ pageSize: 100, search: agentSearch }),
  );

  const createMeeting = useMutation(
    trpc.meetings.create.mutationOptions({
      onSuccess: (data) => {
        queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));

        // TODO: Invalidate free tier usage
        onSuccess?.(data.id);
      },

      onError: (error) => {
        toast.error(error.message);

        // TODO: check if error code is FORBIDDEN, redirect to  /upgrade
      },
    }),
  );

  const updateMeeting = useMutation(
    trpc.meetings.update.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));

        if (initialValues?.id) {
          queryClient.invalidateQueries(
            trpc.meetings.getOne.queryOptions({ id: initialValues.id }),
          );
        }

        onSuccess?.();
      },

      onError: (error) => {
        toast.error(error.message);

        // TODO: check if error code is FORBIDDEN, redirect to  /upgrade
      },
    }),
  );

  const form = useForm<z.infer<typeof meetingsInsertSchema>>({
    resolver: zodResolver(meetingsInsertSchema),
    defaultValues: {
      name: initialValues?.name ?? "",
      agentId: initialValues?.agentId ?? "",
    },
  });

  const isEdit = !!initialValues?.id;
  const isPending = createMeeting.isPending || updateMeeting.isPending;

  const onSubmit = (values: z.infer<typeof meetingsInsertSchema>) => {
    console.log(values);
    if (isEdit) {
      updateMeeting.mutate({ ...values, id: initialValues.id });
    } else {
      createMeeting.mutate(values);
    }
  };

  return (
    <>
      <NewAgentDialog
        open={openNewAgentDialog}
        onOpenChange={setOpenNewAgentDialog}
      />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* This form input is using internal controller */}
          <FormInput
            name="name"
            label="Meeting name"
            placeholder="Meeting Name"
          />
          {/* This on the other hand will require an external form controller */}
          <Controller
            control={form.control}
            name="agentId"
            render={({ field, fieldState: { error } }) => (
              <Field>
                <FieldLabel>Agent</FieldLabel>
                <CommandSelect
                  className="py-6"
                  placeholder="Select an agent"
                  onSearch={setAgentSearch}
                  // 1. Connect Value
                  value={field.value}
                  // 2. Connect Change Handler
                  // Note: CommandSelect usually returns a value, field.onChange expects that value
                  onSelect={(val) => {
                    field.onChange(val);
                  }}
                  options={(agents.data?.items ?? []).map((agent) => ({
                    id: agent.id,
                    value: agent.id,
                    children: (
                      <div className="flex items-center gap-x-2">
                        <GeneratedAvatar
                          seed={agent.name}
                          variant="botttsNeutral"
                        />
                        <span>{agent.name}</span>
                      </div>
                    ),
                  }))}
                />
                {error && <FieldError>{error.message}</FieldError>}
                <FieldDescription>
                  Didn&apos;t found what you are looking for?{" "}
                  <button
                    type="button"
                    onClick={() => setOpenNewAgentDialog(true)}
                    className="text-primary font-medium underline hover:opacity-80"
                  >
                    Create new agent.
                  </button>
                </FieldDescription>
              </Field>
            )}
          />
          <div className="mt-10 flex items-center justify-end gap-2">
            {onCancel && (
              <Button
                variant="ghost"
                disabled={isPending}
                type="button"
                onClick={onCancel}
              >
                Cancel
              </Button>
            )}
            <Button disabled={isPending}>{isEdit ? "Update" : "Create"}</Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};
