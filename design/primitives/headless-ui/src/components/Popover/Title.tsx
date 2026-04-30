import { useContext, useId, useLayoutEffect } from "react";

import { AsChild } from "@/core/asChild";
import { ContentContext, PopoverContext } from "./_internals/contexts";

export interface PopoverTitleProps extends Omit<
  React.HTMLAttributes<HTMLHeadingElement>,
  "children" | "id"
> {
  children: React.ReactNode;
  asChild?: boolean;
  ctxErrMsg?: string; // context가 없는 경우에 대한 에러 메시지
}

export function PopoverTitle({
  children,
  asChild = false,
  ctxErrMsg = "Popover.Title must be used inside the Popover wrapper.",
  ...rest
}: Readonly<PopoverTitleProps>) {
  const context = useContext(PopoverContext);
  const isInsideContent = useContext(ContentContext);

  if (!context) {
    throw new Error(ctxErrMsg);
  }

  if (!isInsideContent) {
    throw new Error("Popover.Title must be used inside Popover.Content.");
  }

  const { setTitleId } = context;
  const titleId = useId();

  useLayoutEffect(() => {
    setTitleId(titleId);
    return () => setTitleId(undefined);
  }, [titleId, setTitleId]);

  if (asChild) {
    return (
      <AsChild {...rest} id={titleId}>
        {children}
      </AsChild>
    );
  }

  return (
    <h2 {...rest} id={titleId}>
      {children}
    </h2>
  );
}
