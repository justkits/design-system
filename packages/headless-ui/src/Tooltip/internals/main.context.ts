import { createContext, useContext } from "react";

import { FloatingPlacement } from "@/_placement";

type TooltipContextType = {
  isOpen: boolean;
  showTooltip: () => void;
  hideTooltip: () => void;
  tooltipId: string;
  placement: FloatingPlacement;
  shiftX: number;
  shiftY: number;
};

export const TooltipContext = createContext<TooltipContextType | undefined>(
  undefined,
);

export function useTooltip() {
  const context = useContext(TooltipContext);
  if (!context) {
    throw new Error("useTooltip must be used within Tooltip");
  }
  return context;
}
