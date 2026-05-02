import { useContext } from "react";

import { AsChild } from "@/core/asChild";
import { ContentContext, TooltipContext } from "./_internals/contexts";

export interface TooltipMessageProps extends Omit<
  React.HTMLAttributes<HTMLParagraphElement>,
  "children"
> {
  children: React.ReactNode;
  asChild?: boolean;
  ctxErrMsg?: string; // context가 없는 경우에 대한 에러 메시지
}

export function TooltipMessage({
  children,
  asChild = false,
  ctxErrMsg = "Tooltip.Message must be used inside the Tooltip wrapper.",
  ...rest
}: Readonly<TooltipMessageProps>) {
  const context = useContext(TooltipContext);
  const isInsideContent = useContext(ContentContext);

  if (!context) {
    throw new Error(ctxErrMsg);
  }

  if (!isInsideContent) {
    throw new Error("Tooltip.Message must be used inside Tooltip.Content.");
  }

  if (asChild) {
    return <AsChild {...rest}>{children}</AsChild>;
  }

  return <p {...rest}>{children}</p>;
}
