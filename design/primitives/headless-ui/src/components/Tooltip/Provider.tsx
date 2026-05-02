import { useCallback, useEffect, useId, useMemo, useRef } from "react";

import { useOpenState } from "@/core/disclosure";
import { useEscapeClose } from "@/core/keyboard";
import { useClickOutside, useLongTouch } from "@/core/pointer";
import { useFloatingPosition, type FloatingPlacement } from "@/core/position";
import { TooltipContext } from "./_internals/contexts";

export interface TooltipProps {
  children: React.ReactNode;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  portal?: boolean;
  position?: FloatingPlacement;
  unmountOnHide?: boolean;
  openDelay?: number;
  closeDelay?: number;
  longTouchDelay?: number;
  disabled?: boolean;
}

export function TooltipProvider({
  children,
  isOpen: controlledOpen,
  onOpenChange,
  portal = false,
  position = "bottom",
  unmountOnHide = false,
  openDelay = 300,
  closeDelay = 700,
  longTouchDelay = 500,
  disabled = false,
}: Readonly<TooltipProps>) {
  const {
    isOpen,
    show: showTooltip,
    hide: hideTooltip,
  } = useOpenState(controlledOpen, onOpenChange);
  const triggerRef = useRef<HTMLElement | null>(null);
  const floatingRef = useRef<HTMLDivElement | null>(null);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const tooltipId = useId();

  const { container, arrow } = useFloatingPosition(
    triggerRef,
    floatingRef,
    position,
    isOpen,
  );

  useClickOutside(floatingRef, hideTooltip, isOpen, triggerRef);
  useEscapeClose(hideTooltip, isOpen);
  useLongTouch(triggerRef, showTooltip, !isOpen && !disabled, longTouchDelay); // 롱터치는 터치 자체에 delay가 있기 때문에, show에 delay를 주지 않는다.

  const showTooltipWithDelay = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(showTooltip, openDelay);
  }, [openDelay, showTooltip]);

  const hideTooltipWithDelay = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(hideTooltip, closeDelay);
  }, [closeDelay, hideTooltip]);

  const clearTimer = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  }, []);

  useEffect(() => {
    return () => clearTimer();
  }, [clearTimer]);

  const contextValue = useMemo(
    () => ({
      disabled,
      isOpen,
      showTooltip,
      showTooltipWithDelay,
      hideTooltip,
      hideTooltipWithDelay,
      clearTimer,
      isPortalMode: portal,
      unmountOnHide,
      tooltipId,
      containerStyles: container,
      arrowStyles: arrow,
      triggerRef,
      floatingRef,
    }),
    [
      disabled,
      isOpen,
      showTooltip,
      showTooltipWithDelay,
      hideTooltip,
      hideTooltipWithDelay,
      clearTimer,
      portal,
      unmountOnHide,
      tooltipId,
      container,
      arrow,
    ],
  );

  return (
    <TooltipContext.Provider value={contextValue}>
      {children}
    </TooltipContext.Provider>
  );
}
