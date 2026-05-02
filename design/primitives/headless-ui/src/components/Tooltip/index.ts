import { TooltipProvider } from "./Provider";
import { TooltipArrow } from "./Arrow";
import { TooltipContent } from "./Content";
import { TooltipMessage } from "./Message";
import { TooltipTrigger } from "./Trigger";

export const Tooltip = Object.assign(TooltipProvider, {
  Trigger: TooltipTrigger,
  Content: TooltipContent,
  Message: TooltipMessage,
  Arrow: TooltipArrow,
});

export { TooltipProvider } from "./Provider";
export { TooltipTrigger } from "./Trigger";
export { TooltipContent } from "./Content";
export { TooltipMessage } from "./Message";
export { TooltipArrow } from "./Arrow";

export type { TooltipProps } from "./Provider";
export type { TooltipTriggerProps } from "./Trigger";
export type { TooltipContentProps } from "./Content";
export type { TooltipMessageProps } from "./Message";
export type { TooltipArrowProps } from "./Arrow";
