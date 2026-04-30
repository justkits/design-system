import { useCallback, useId, useMemo, useRef, useState } from "react";

import { useOpenState } from "@/core/disclosure";
import { useAutoFocus, useEscapeClose, useFocusTrap } from "@/core/keyboard";
import { useClickOutside } from "@/core/pointer";
import { useFloatingPosition, type FloatingPlacement } from "@/core/position";
import { PopoverContext } from "./_internals/contexts";

export interface PopoverProps {
  children: React.ReactNode;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  portal?: boolean;
  position?: FloatingPlacement;
  unmountOnHide?: boolean;
}

export function PopoverProvider({
  children,
  isOpen: controlledOpen,
  onOpenChange,
  portal = false,
  position = "bottom",
  unmountOnHide = false,
}: Readonly<PopoverProps>) {
  const {
    isOpen,
    show: showPopover,
    hide: hidePopover,
  } = useOpenState(controlledOpen, onOpenChange, false);
  const triggerRef = useRef<HTMLElement | null>(null);
  const floatingRef = useRef<HTMLDialogElement | null>(null);
  const [isPending, setPending] = useState<boolean>(false);
  const [titleId, setTitleId] = useState<string | undefined>(undefined);
  const contentId = useId();

  useClickOutside(floatingRef, hidePopover, isOpen, triggerRef);
  useEscapeClose(hidePopover, isOpen);
  useAutoFocus(floatingRef, isOpen, triggerRef);
  useFocusTrap(floatingRef, isOpen);

  const { container, arrow } = useFloatingPosition(
    triggerRef,
    floatingRef,
    position,
    isOpen,
  );

  const togglePopover = useCallback(() => {
    if (isOpen) {
      hidePopover();
    } else {
      showPopover();
    }
  }, [isOpen, showPopover, hidePopover]);

  const contextValue = useMemo(
    () => ({
      isOpen,
      togglePopover,
      hidePopover,
      isPending,
      setPending,
      isPortalMode: portal,
      unmountOnHide,
      titleId,
      setTitleId,
      contentId,
      triggerRef,
      floatingRef,
      containerStyles: container,
      arrowStyles: arrow,
    }),
    [
      isOpen,
      togglePopover,
      hidePopover,
      isPending,
      setPending,
      portal,
      unmountOnHide,
      titleId,
      setTitleId,
      contentId,
      container,
      arrow,
    ],
  );

  return (
    <PopoverContext.Provider value={contextValue}>
      {children}
    </PopoverContext.Provider>
  );
}
