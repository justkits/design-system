import { PopoverArrow } from "./Arrow";
import { PopoverClose } from "./Close";
import { PopoverContent } from "./Content";
import { PopoverTitle } from "./Title";
import { PopoverTrigger } from "./Trigger";
import { PopoverProvider } from "./Provider";

export const Popover = Object.assign(PopoverProvider, {
  Trigger: PopoverTrigger,
  Content: PopoverContent,
  Arrow: PopoverArrow,
  Close: PopoverClose,
  Title: PopoverTitle,
});

export { PopoverArrow } from "./Arrow";
export { PopoverClose } from "./Close";
export { PopoverContent } from "./Content";
export { PopoverTitle } from "./Title";
export { PopoverTrigger } from "./Trigger";
export { PopoverProvider } from "./Provider";

export type { PopoverProps } from "./Provider";
export type { PopoverContentProps } from "./Content";
export type { PopoverTriggerProps } from "./Trigger";
export type { PopoverArrowProps } from "./Arrow";
export type { PopoverCloseProps } from "./Close";
export type { PopoverTitleProps } from "./Title";
