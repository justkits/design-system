import {
  type ButtonHTMLAttributes,
  type ReactElement,
  cloneElement,
  isValidElement,
} from "react";

import { useTooltip } from "./internals/main.context";

type TooltipTriggerProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  | "aria-describedby" // override를 방지하기 위해 제거
  | "onMouseEnter"
  | "onMouseLeave"
  | "onFocus"
  | "onBlur"
  | "onTouchStart" // useLongTouch 훅에서 직접 처리하므로 제거
  | "onTouchEnd"
  | "onTouchMove"
  | "onTouchCancel"
  | "type"
> & {
  asChild?: boolean;
};

/**
 * 툴팁을 트리거하는 요소. 기본적으로 `<button>`으로 렌더된다.
 *
 * `asChild`를 사용하면 자식 요소에 트리거 동작을 위임한다.
 * 자식이 이미 `<button>`인 경우 중첩을 피하기 위해 사용한다.
 *
 * @param asChild - `true`이면 자식 요소를 트리거로 사용한다. 기본값 `false`.
 */
export function TooltipTrigger({
  children,
  asChild = false,
  ...rest
}: Readonly<TooltipTriggerProps>) {
  const { showTooltip, hideTooltip, tooltipId } = useTooltip();

  const triggerProps = {
    "aria-describedby": tooltipId,
    onMouseEnter: showTooltip,
    onMouseLeave: hideTooltip,
    onFocus: showTooltip,
    onBlur: hideTooltip,
  };

  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<Record<string, unknown>>;
    return cloneElement(child, {
      ...rest,
      ...triggerProps,
      onMouseEnter: (e: MouseEvent) => {
        (child.props.onMouseEnter as ((e: MouseEvent) => void) | undefined)?.(
          e,
        );
        showTooltip();
      },
      onMouseLeave: (e: MouseEvent) => {
        (child.props.onMouseLeave as ((e: MouseEvent) => void) | undefined)?.(
          e,
        );
        hideTooltip();
      },
      onFocus: (e: FocusEvent) => {
        (child.props.onFocus as ((e: FocusEvent) => void) | undefined)?.(e);
        showTooltip();
      },
      onBlur: (e: FocusEvent) => {
        (child.props.onBlur as ((e: FocusEvent) => void) | undefined)?.(e);
        hideTooltip();
      },
    });
  }

  return (
    <button {...rest} {...triggerProps} type="button">
      {children}
    </button>
  );
}
