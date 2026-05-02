import { useContext } from "react";

import { ContentContext, TooltipContext } from "./_internals/contexts";

export interface TooltipArrowProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children" | "aria-hidden"
> {
  // context가 없는 경우에 대한 에러 메시지
  ctxErrMsg?: string;
}

export function TooltipArrow({
  className,
  style,
  ctxErrMsg = "Tooltip.Arrow must be used inside the Tooltip wrapper.",
  ...rest
}: Readonly<TooltipArrowProps>) {
  const context = useContext(TooltipContext);
  const isInsideContent = useContext(ContentContext);

  if (!context) {
    throw new Error(ctxErrMsg);
  }

  if (!isInsideContent) {
    throw new Error("Tooltip.Arrow must be used inside Tooltip.Content.");
  }

  const { arrowStyles } = context;

  return (
    <div
      style={{
        ...arrowStyles,
        ...style,
      }}
      className={className}
      {...rest}
      aria-hidden="true"
    />
  );
}
