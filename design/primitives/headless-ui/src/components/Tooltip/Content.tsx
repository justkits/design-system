import { useContext } from "react";

import { Portal } from "@/core/portal";
import { zIndex } from "@/core/zIndex";
import { ContentContext, TooltipContext } from "./_internals/contexts";

export interface TooltipContentProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children" | "id" | "role" | "aria-hidden" | "onMouseEnter" | "onMouseLeave"
> {
  children: React.ReactNode;
  ctxErrMsg?: string;
}

export function TooltipContent({
  children,
  ctxErrMsg = "Tooltip.Content must be used inside the Tooltip wrapper.",
  style,
  ...rest
}: Readonly<TooltipContentProps>) {
  const context = useContext(TooltipContext);

  if (!context) {
    throw new Error(ctxErrMsg);
  }

  const {
    isOpen,
    tooltipId,
    containerStyles,
    floatingRef,
    isPortalMode,
    unmountOnHide,
    hideTooltipWithDelay,
    clearTimer,
  } = context;

  if (unmountOnHide && !isOpen) {
    return null;
  }

  return (
    <Portal isPortalMode={isPortalMode}>
      <ContentContext.Provider value={true}>
        <div
          {...rest}
          id={tooltipId}
          role="tooltip"
          ref={floatingRef}
          onMouseEnter={clearTimer}
          onMouseLeave={hideTooltipWithDelay}
          style={{
            ...containerStyles,
            zIndex: zIndex.tooltip,
            ...style,
          }}
          aria-hidden={!isOpen}
          data-state={isOpen ? "open" : "closed"}
        >
          {children}
        </div>
      </ContentContext.Provider>
    </Portal>
  );
}
