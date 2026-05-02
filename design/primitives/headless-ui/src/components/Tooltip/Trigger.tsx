import { useContext } from "react";

import { AsChild } from "@/core/asChild";
import { TooltipContext } from "./_internals/contexts";

export interface TooltipTriggerProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  | "children"
  | "aria-describedby"
  | "disabled"
  | "onMouseEnter"
  | "onMouseLeave"
  | "onFocus"
  | "onBlur"
  | "onTouchStart"
  | "onTouchEnd"
  | "onTouchMove"
  | "onTouchCancel"
> {
  children: React.ReactNode;
  asChild?: boolean;
  ctxErrMsg?: string;
}

export function TooltipTrigger({
  children,
  asChild = false,
  ctxErrMsg = "Tooltip.Trigger must be used inside the Tooltip wrapper.",
  ...rest
}: Readonly<TooltipTriggerProps>) {
  const context = useContext(TooltipContext);

  if (!context) {
    throw new Error(ctxErrMsg);
  }

  const {
    disabled,
    showTooltip,
    showTooltipWithDelay,
    hideTooltip,
    hideTooltipWithDelay,
    tooltipId,
    triggerRef,
  } = context;

  if (asChild) {
    return (
      <AsChild
        {...rest}
        ref={triggerRef as React.RefObject<HTMLButtonElement>}
        aria-describedby={disabled ? undefined : tooltipId}
        disabled={disabled}
        onMouseEnter={showTooltipWithDelay}
        onMouseLeave={hideTooltipWithDelay}
        onFocus={showTooltip}
        onBlur={hideTooltip}
      >
        {children}
      </AsChild>
    );
  }

  // type는 override 가능
  return (
    <button
      type="button"
      {...rest}
      ref={triggerRef as React.RefObject<HTMLButtonElement>}
      aria-describedby={disabled ? undefined : tooltipId}
      disabled={disabled}
      onMouseEnter={showTooltipWithDelay}
      onMouseLeave={hideTooltipWithDelay}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}
    </button>
  );
}
