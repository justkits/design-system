import { type ReactNode, useId, useMemo, useRef, useState } from "react";

import { useClickOutside } from "@/core/clicks/useClickOutside";
import { useFocusTrap } from "@/core/focus/useFocusTrap";
import { useKeyboardEvent } from "@/core/keyboard/useKeyboardEvent";
import { type FloatingPlacement } from "@/core/placement/types";
import { useFloatingPosition } from "@/core/placement/useFloatingPosition";
import { useOpenState } from "@/core/states/useOpenState";
import { PopoverContext } from "./internals/contexts";

type PopoverProps = {
  children: ReactNode;
  portal?: boolean;
  position?: FloatingPlacement;
  offset?: number;
} & (
  | { isOpen: boolean; onOpenChange: (open: boolean) => void }
  | { isOpen?: never; onOpenChange?: never }
);

export function Provider({
  children,
  isOpen: controlledOpen,
  onOpenChange,
  portal = false,
  position = "bottom",
  offset = 16,
}: Readonly<PopoverProps>) {
  const {
    isOpen,
    show: showPopover,
    hide: hidePopover,
  } = useOpenState(controlledOpen, onOpenChange, false);
  const triggerRef = useRef<HTMLElement | null>(null);
  const floatingRef = useRef<HTMLDialogElement | null>(null);
  const contentId = useId();
  const [titleId, setTitleId] = useState<string | undefined>(undefined);
  const [isPending, setPending] = useState(false);

  useClickOutside(floatingRef, hidePopover, isOpen, triggerRef);
  useKeyboardEvent("Escape", hidePopover, isOpen);
  useFocusTrap(floatingRef, isOpen, triggerRef);

  const floatingStyles = useFloatingPosition(
    triggerRef,
    floatingRef,
    position,
    isOpen,
    offset,
  );

  const contextValue = useMemo(
    () => ({
      isOpen,
      showPopover: () => showPopover(),
      hidePopover: () => hidePopover(),
      isPending,
      setPending,
      isPortalMode: portal,
      floatingStyles,
      contentId,
      titleId,
      setTitleId,
      triggerRef,
      floatingRef,
    }),
    [
      isOpen,
      showPopover,
      hidePopover,
      isPending,
      portal,
      floatingStyles,
      contentId,
      titleId,
      setTitleId,
    ],
  );

  return (
    <PopoverContext.Provider value={contextValue}>
      {children}
    </PopoverContext.Provider>
  );
}
