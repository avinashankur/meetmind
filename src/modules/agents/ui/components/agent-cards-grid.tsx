"use client";

import { AgentsGetMany } from "../../types";
import { AgentCard } from "./agent-card";

interface AgentCardsGridProps {
  items: AgentsGetMany;
}

export const AgentCardsGrid = ({ items }: AgentCardsGridProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
      {items.map((agent) => (
        <AgentCard key={agent.id} agent={agent} />
      ))}
    </div>
  );
};
