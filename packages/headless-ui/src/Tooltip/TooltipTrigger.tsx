import { type ButtonHTMLAttributes, type RefObject } from "react";

import { useTooltip } from "./internals/main.context";

type TooltipTriggerProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  | "aria-describedby"
  | "onMouseEnter"
  | "onMouseLeave"
  | "onFocus"
  | "onBlur"
  | "onTouchStart"
  | "onTouchEnd"
  | "onTouchMove"
  | "onTouchCancel"
  | "type"
>;

/**
 * 툴팁을 트리거하는 요소. `<button>`으로 렌더된다.
 */
export function TooltipTrigger({
  children,
  ...rest
}: Readonly<TooltipTriggerProps>) {
  const { showTooltip, hideTooltip, tooltipId, delay, triggerRef } =
    useTooltip();

  return (
    <button
      ref={triggerRef as RefObject<HTMLButtonElement>}
      aria-describedby={tooltipId}
      onMouseEnter={() => showTooltip(delay)}
      onMouseLeave={hideTooltip}
      onFocus={() => showTooltip()}
      onBlur={hideTooltip}
      type="button"
      {...rest}
    >
      {children}
    </button>
  );
}
