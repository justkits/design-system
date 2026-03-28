import { type HTMLAttributes, useContext } from "react";

import { AsChild } from "@/core/asChild";
import { ContentContext, useTooltip } from "./internals/contexts";

type TooltipMessageProps = {
  asChild?: boolean;
} & Omit<HTMLAttributes<HTMLParagraphElement>, "id" | "aria-describedby">;

export function TooltipMessage({
  children,
  className,
  style,
  asChild = false,
  ...rest
}: Readonly<TooltipMessageProps>) {
  // Tooltip 내부에서 렌더링 되는지 확인
  const { messageId } = useTooltip();

  const isInsideContent = useContext(ContentContext);

  if (!isInsideContent) {
    throw new Error("Tooltip.Message must be used within Tooltip.Content");
  }

  if (asChild) {
    return (
      <AsChild className={className} style={style} {...rest} id={messageId}>
        {children}
      </AsChild>
    );
  }

  return (
    <p className={className} style={style} {...rest} id={messageId}>
      {children}
    </p>
  );
}
