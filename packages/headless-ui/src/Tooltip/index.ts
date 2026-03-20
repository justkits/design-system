import { TooltipArrow } from "./TooltipArrow";
import { TooltipContent } from "./TooltipContent";
import { TooltipTrigger } from "./TooltipTrigger";
import { Wrapper } from "./Wrapper";

const Tooltip = Object.assign(Wrapper, {
  Trigger: TooltipTrigger,
  Content: TooltipContent,
  Arrow: TooltipArrow,
});

export { Tooltip };
