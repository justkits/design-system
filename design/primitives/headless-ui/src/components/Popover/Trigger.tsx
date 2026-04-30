import { useContext } from "react";

import { AsChild } from "@/core/asChild";
import { PopoverContext } from "./_internals/contexts";

export interface PopoverTriggerProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  | "children"
  | "type"
  | "onClick"
  | "aria-controls"
  | "aria-haspopup"
  | "aria-expanded"
> {
  children: React.ReactNode;
  asChild?: boolean;
  ctxErrMsg?: string;
}

export function PopoverTrigger({
  children,
  asChild = false,
  ctxErrMsg = "Popover.Trigger must be used inside the Popover wrapper.",
  ...rest
}: Readonly<PopoverTriggerProps>) {
  const context = useContext(PopoverContext);

  if (!context) {
    throw new Error(ctxErrMsg);
  }

  const { isOpen, togglePopover, unmountOnHide, contentId, triggerRef } =
    context;
  const ariaControls = unmountOnHide && !isOpen ? undefined : contentId;

  if (asChild) {
    return (
      <AsChild
        {...rest}
        type="button"
        ref={triggerRef as React.RefObject<HTMLButtonElement>}
        aria-controls={ariaControls}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onClick={togglePopover}
      >
        {children}
      </AsChild>
    );
  }

  return (
    <button
      {...rest}
      type="button"
      ref={triggerRef as React.RefObject<HTMLButtonElement>}
      aria-controls={ariaControls}
      aria-haspopup="dialog"
      aria-expanded={isOpen}
      onClick={togglePopover}
    >
      {children}
    </button>
  );
}
