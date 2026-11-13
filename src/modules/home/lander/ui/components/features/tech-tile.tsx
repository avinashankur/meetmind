import {
  SiBetterauth,
  SiDrizzle,
  SiNextdotjs,
  SiOpenai,
  SiPostgresql,
  SiTrpc,
} from "@icons-pack/react-simple-icons";
import { Video, Workflow, type LucideIcon } from "lucide-react";

import { TECH_STACK, type TechIcon } from "../../../constants";
import { BentoCaption, BentoTile } from "./bento-tile";

type IconComponent = LucideIcon | typeof SiNextdotjs;

/** Brand marks where Simple Icons has them; neutral glyphs otherwise. */
const techIcons: Record<TechIcon, IconComponent> = {
  nextjs: SiNextdotjs,
  trpc: SiTrpc,
  stream: Video,
  openai: SiOpenai,
  inngest: Workflow,
  postgres: SiPostgresql,
  drizzle: SiDrizzle,
  betterauth: SiBetterauth,
};

/** Logo grid of the infrastructure MeetMind runs on. */
export const TechTile = () => (
  <BentoTile span="md:col-span-2" className="bg-blue-100">
    <ul className="grid grid-cols-4 gap-2">
      {TECH_STACK.map(({ label, icon }) => {
        const Icon = techIcons[icon];
        return (
          <li
            key={label}
            title={label}
            className="grid aspect-square place-items-center rounded-2xl bg-white/70 text-slate-500 transition-colors duration-300 hover:bg-white hover:text-slate-900 sm:aspect-auto sm:h-20"
          >
            <Icon className="size-6" aria-label={label} />
          </li>
        );
      })}
    </ul>
    <BentoCaption
      title="Built on infrastructure you trust."
      description="Stream, OpenAI Realtime, Inngest, Neon and more."
      className="pt-6"
    />
  </BentoTile>
);
