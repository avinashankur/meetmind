import { Info } from 'lucide-react';
import type React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type Props = {
  icon?: React.ReactNode;
  size?: number;
  info?: string;
};

const InfoTooltip: React.FC<Props> = ({ icon, size = 14, info = '' }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger type="button">
        {icon ? icon : <Info size={size} />}
        <TooltipContent className="px-3 py-1.5 text-xs" side="top">
          {info}
        </TooltipContent>
      </TooltipTrigger>
    </Tooltip>
  </TooltipProvider>
);

export default InfoTooltip;
