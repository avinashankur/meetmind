"use client";

import Link from "next/link";
import { format } from "date-fns";
import {
  CalendarIcon,
  ClockIcon,
  FileStackIcon,
  type LucideIcon,
} from "lucide-react";

import GeneratedAvatar from "@/components/generated-avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn, formatDuration } from "@/lib/utils";
import { MeetingGetOne, MeetingStatus } from "../../types";
import { MeetingActions } from "./meeting-actions";
import { MeetingStatusBadge } from "./meeting-status-badge";

interface Props {
  data: MeetingGetOne;
}

const whenLabel = (data: MeetingGetOne) => {
  const start = new Date(data.startedAt ?? data.createdAt);
  const day = format(start, "MMM d, yyyy");

  if (!data.startedAt) return { value: day, hint: "Created, not started" };
  if (!data.endedAt)
    return { value: day, hint: `Started ${format(start, "h:mm a")}` };
  return {
    value: day,
    hint: `${format(start, "h:mm")} – ${format(new Date(data.endedAt), "h:mm a")}`,
  };
};

const durationLabel = (data: MeetingGetOne) => {
  if (data.status === MeetingStatus.Active)
    return { value: "Live", hint: "Call in progress" };
  if (typeof data.duration === "number" && data.duration > 0)
    return { value: formatDuration(data.duration), hint: "Call length" };
  return { value: "—", hint: "Not recorded yet" };
};

const assetsLabel = (data: MeetingGetOne) => {
  const assets = [
    data.summary && "Summary",
    data.transcriptUrl && "Transcript",
    data.recordingUrl && "Recording",
  ].filter(Boolean) as string[];

  return assets.length
    ? { value: `${assets.length} of 3 ready`, hint: assets.join(", ") }
    : { value: "None yet", hint: "Created after the call" };
};

const StatCard = ({
  label,
  value,
  hint,
  icon: Icon,
  media,
  href,
}: {
  label: string;
  value: string;
  hint: string;
  icon?: LucideIcon;
  media?: React.ReactNode;
  href?: string;
}) => {
  const body = (
    <>
      <div className="bg-muted text-muted-foreground flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-lg">
        {media ?? (Icon && <Icon className="size-4" />)}
      </div>
      <div className="flex min-w-0 flex-col">
        <span className="text-muted-foreground text-xs">{label}</span>
        <span className="text-foreground truncate text-sm font-semibold">
          {value}
        </span>
        <span className="text-muted-foreground truncate text-xs">{hint}</span>
      </div>
    </>
  );

  const className = cn(
    "border-border/50 bg-card flex min-w-0 items-center gap-3 rounded-xl border p-3.5 shadow-2xs",
    href && "hover:border-border transition-colors",
  );

  return href ? (
    <Link href={href} className={className}>
      {body}
    </Link>
  ) : (
    <div className={className}>{body}</div>
  );
};

export const MeetingIdHeader = ({ data }: Props) => {
  const when = whenLabel(data);
  const duration = durationLabel(data);
  const assets = assetsLabel(data);

  return (
    <div className="flex flex-col gap-5">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/meetings">Meetings</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem className="min-w-0">
            <BreadcrumbPage className="truncate">{data.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 flex-wrap items-center gap-3">
          <h1 className="text-foreground truncate text-2xl font-semibold tracking-tight">
            {data.name}
          </h1>
          <MeetingStatusBadge status={data.status} />
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <MeetingActions meeting={data} context="detail" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Agent"
          value={data.agent.name}
          hint="View agent"
          href={`/agents/${data.agent.id}`}
          media={
            <GeneratedAvatar
              seed={data.agent.name}
              variant="botttsNeutral"
              className="size-9 rounded-lg"
            />
          }
        />
        <StatCard
          label="Date"
          value={when.value}
          hint={when.hint}
          icon={CalendarIcon}
        />
        <StatCard
          label="Duration"
          value={duration.value}
          hint={duration.hint}
          icon={ClockIcon}
        />
        <StatCard
          label="Outputs"
          value={assets.value}
          hint={assets.hint}
          icon={FileStackIcon}
        />
      </div>
    </div>
  );
};
