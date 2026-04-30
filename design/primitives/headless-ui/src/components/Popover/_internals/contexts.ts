import { createContext } from "react";

type PopoverContextValue = {
  isOpen: boolean;
  togglePopover: () => void;
  hidePopover: () => void;
  isPending: boolean;
  setPending: (pending: boolean) => void;
  isPortalMode: boolean;
  unmountOnHide: boolean;
  titleId: string | undefined;
  setTitleId: (id: string | undefined) => void;
  contentId: string;
  triggerRef: React.RefObject<HTMLElement | null>;
  floatingRef: React.RefObject<HTMLDialogElement | null>;
  containerStyles: React.CSSProperties;
  arrowStyles: React.CSSProperties;
};

export const PopoverContext = createContext<PopoverContextValue | null>(null);

// Structure를 위한 Context (Popover.Content 내부에 렌더링 여부)
export const ContentContext = createContext(false);
