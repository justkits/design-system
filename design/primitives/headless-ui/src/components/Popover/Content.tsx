import { useContext } from "react";

import { Portal } from "@/core/portal";
import { zIndex } from "@/core/zIndex";
import { ContentContext, PopoverContext } from "./_internals/contexts";

export interface PopoverContentProps extends Omit<
  React.DialogHTMLAttributes<HTMLDialogElement>,
  | "children"
  | "role"
  | "id"
  | "open"
  | "tabIndex"
  | "aria-labelledby"
  | "aria-label"
> {
  children: React.ReactNode;
  ctxErrMsg?: string; // context가 없는 경우에 대한 에러 메시지
}

export function PopoverContent({
  children,
  style,
  ctxErrMsg = "Popover.Content must be used inside the Popover wrapper.",
  ...rest
}: Readonly<PopoverContentProps>) {
  const context = useContext(PopoverContext);

  if (!context) {
    throw new Error(ctxErrMsg);
  }

  const {
    isOpen,
    isPortalMode,
    unmountOnHide,
    isPending,
    titleId,
    contentId,
    floatingRef,
    containerStyles,
  } = context;

  if (unmountOnHide && !isOpen) {
    return null;
  }

  return (
    <Portal isPortalMode={isPortalMode}>
      <ContentContext.Provider value={true}>
        <dialog
          {...rest}
          id={contentId}
          ref={floatingRef}
          open={isOpen}
          tabIndex={-1}
          style={{
            ...containerStyles,
            zIndex: zIndex.popover,
            ...style,
          }}
          aria-label={titleId ? undefined : "Popover Content"}
          aria-labelledby={titleId}
          aria-busy={isPending}
          data-state={isOpen ? "open" : "closed"}
        >
          {children}
        </dialog>
      </ContentContext.Provider>
    </Portal>
  );
}
