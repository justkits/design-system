import { createContext, useContext } from "react";

export const PopoverContentContext = createContext<boolean>(false);

export function usePopoverContent() {
  const isInsideContent = useContext(PopoverContentContext);
  if (!isInsideContent) {
    throw new Error("Popover.Arrow must be used within Popover.Content");
  }
}
