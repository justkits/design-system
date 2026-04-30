import { useContext } from "react";

import { ContentContext, PopoverContext } from "./_internals/contexts";

export interface PopoverArrowProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children" | "aria-hidden"
> {
  ctxErrMsg?: string; // context가 없는 경우에 대한 에러 메시지
}

export function PopoverArrow({
  style,
  ctxErrMsg = "Popover.Arrow must be used inside the Popover wrapper.",
  ...rest
}: Readonly<PopoverArrowProps>) {
  const context = useContext(PopoverContext);
  const isInsideContent = useContext(ContentContext);

  if (!context) {
    throw new Error(ctxErrMsg);
  }

  if (!isInsideContent) {
    throw new Error("Popover.Arrow must be used inside Popover.Content.");
  }

  const { arrowStyles } = context;

  return (
    <div
      {...rest}
      style={{
        ...style,
        ...arrowStyles,
      }}
      aria-hidden="true"
    />
  );
}
