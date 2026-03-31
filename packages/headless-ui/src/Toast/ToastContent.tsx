import { type HTMLAttributes } from "react";

import { Portal } from "@/core/portal";
import { zIndices } from "@/core/zindex";
import { ContentContext, useToast } from "./internals/contexts";

type ToastContentProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  | "role"
  | "aria-live"
  | "aria-atomic"
  | "onMouseEnter"
  | "onMouseLeave"
  | "onFocus"
  | "onBlur"
>;

export function ToastContent({
  children,
  className,
  style,
  ...rest
}: Readonly<ToastContentProps>) {
  const { isOpen, isPortalMode, pauseTimer, resumeTimer, floatingRef } =
    useToast();

  if (!isOpen) return null;

  return (
    <Portal isPortalMode={isPortalMode}>
      <ContentContext.Provider value={true}>
        <div
          className={className}
          style={{ zIndex: zIndices.toast, ...style }}
          {...rest}
          ref={floatingRef}
          role="status"
          aria-live="polite"
          aria-atomic="true"
          onMouseEnter={pauseTimer}
          onMouseLeave={resumeTimer}
          onFocus={pauseTimer}
          onBlur={resumeTimer}
        >
          {children}
        </div>
      </ContentContext.Provider>
    </Portal>
  );
}
