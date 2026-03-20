import { createContext, useContext } from "react";

export const TooltipContentContext = createContext<boolean>(false);

export function useTooltipContent() {
  const isInsideContent = useContext(TooltipContentContext);
  if (!isInsideContent) {
    throw new Error("TooltipArrow must be used within TooltipContent");
  }
}
