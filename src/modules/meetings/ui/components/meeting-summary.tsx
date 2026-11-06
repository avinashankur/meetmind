import Markdown, { type Components } from "react-markdown";
import {
  AlignLeftIcon,
  FileTextIcon,
  HashIcon,
  ListChecksIcon,
  type LucideIcon,
} from "lucide-react";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

// Every element maps to theme tokens so the summary reads the same in light and dark.
const components: Components = {
  h1: (props) => (
    <h3
      className="text-foreground mt-5 mb-2 text-sm font-semibold first:mt-0"
      {...props}
    />
  ),
  h2: (props) => (
    <h3
      className="text-foreground mt-5 mb-2 text-sm font-semibold first:mt-0"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="text-foreground mt-5 mb-2 text-sm font-semibold first:mt-0"
      {...props}
    />
  ),
  // Topics inside Notes.
  h4: (props) => (
    <h4
      className="text-foreground mt-5 mb-1.5 text-sm font-semibold first:mt-0"
      {...props}
    />
  ),
  h5: (props) => (
    <h5
      className="text-foreground mt-4 mb-1 text-sm font-medium first:mt-0"
      {...props}
    />
  ),
  h6: (props) => (
    <h6
      className="text-muted-foreground mt-4 mb-1 text-xs font-medium first:mt-0"
      {...props}
    />
  ),
  p: (props) => (
    <p
      className="text-foreground/85 mb-3 leading-relaxed last:mb-0"
      {...props}
    />
  ),
  a: (props) => (
    <a
      className="text-foreground decoration-border hover:decoration-foreground underline underline-offset-4 transition-colors"
      target="_blank"
      rel="noreferrer"
      {...props}
    />
  ),
  ul: (props) => (
    <ul
      className="text-foreground/85 marker:text-muted-foreground mb-3 flex list-disc flex-col gap-1 pl-5 last:mb-0"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="text-foreground/85 marker:text-muted-foreground mb-3 flex list-decimal flex-col gap-1 pl-5 last:mb-0"
      {...props}
    />
  ),
  li: (props) => <li className="pl-0.5 leading-relaxed" {...props} />,
  strong: (props) => (
    <strong className="text-foreground font-semibold" {...props} />
  ),
  blockquote: (props) => (
    <blockquote
      className="border-border text-muted-foreground mb-3 border-l-2 pl-3 italic"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="bg-muted text-foreground rounded px-1.5 py-0.5 font-mono text-[0.85em]"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="bg-muted mb-3 overflow-x-auto rounded-lg p-3 font-mono text-xs"
      {...props}
    />
  ),
  hr: () => <hr className="border-border/50 my-4" />,
  table: (props) => (
    <div className="mb-3 overflow-x-auto">
      <table className="w-full text-left text-sm" {...props} />
    </div>
  ),
  th: (props) => (
    <th
      className="border-border text-muted-foreground border-b px-3 py-2 text-xs font-medium"
      {...props}
    />
  ),
  td: (props) => (
    <td className="border-border/50 border-b px-3 py-2" {...props} />
  ),
};

type Section = { title: string | null; body: string };

/** Split on top-level "### " headings, which the summariser uses for its sections. */
const splitSections = (markdown: string): Section[] => {
  const sections: Section[] = [];
  let current: Section = { title: null, body: "" };

  for (const line of markdown.split("\n")) {
    const match = /^###\s+(.+?)\s*$/.exec(line);
    if (match) {
      if (current.title || current.body.trim()) sections.push(current);
      current = { title: match[1], body: "" };
    } else {
      current.body += `${line}\n`;
    }
  }
  if (current.title || current.body.trim()) sections.push(current);

  return sections;
};

const sectionIcon = (title: string | null): LucideIcon => {
  const key = title?.toLowerCase() ?? "";
  if (key.includes("overview")) return AlignLeftIcon;
  if (key.includes("note") || key.includes("action")) return ListChecksIcon;
  return HashIcon;
};

interface Props {
  summary: string | null;
}

export const MeetingSummary = ({ summary }: Props) => {
  if (!summary?.trim()) {
    return (
      <Empty className="min-h-[280px]">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <FileTextIcon />
          </EmptyMedia>
          <EmptyTitle>No summary</EmptyTitle>
          <EmptyDescription>
            No summary was generated for this meeting.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  const sections = splitSections(summary);

  return (
    <div className="flex min-w-0 flex-col gap-6 text-sm">
      {sections.map((section, index) => {
        const Icon = sectionIcon(section.title);
        const isLead = index === 0 && sections.length > 1;

        return (
          <section key={index} className="flex min-w-0 flex-col gap-3">
            {section.title && (
              <div className="flex items-center gap-2">
                <div className="bg-muted text-muted-foreground flex size-6 items-center justify-center rounded-md">
                  <Icon className="size-3.5" />
                </div>
                <h2 className="text-foreground text-sm font-semibold">
                  {section.title}
                </h2>
              </div>
            )}
            <div
              className={
                isLead
                  ? "bg-muted/40 border-border/40 rounded-lg border p-4"
                  : "min-w-0"
              }
            >
              <Markdown components={components}>{section.body}</Markdown>
            </div>
          </section>
        );
      })}
    </div>
  );
};
