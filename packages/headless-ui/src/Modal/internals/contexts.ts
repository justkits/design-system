import { type RefObject, createContext, useContext } from "react";

type ModalContextValue = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  isPending: boolean;
  setPending: (pending: boolean) => void;
  titleId: string | undefined;
  setTitleId: (id: string | undefined) => void;
  triggerRef: RefObject<HTMLElement | null>;
  floatingRef: RefObject<HTMLDialogElement | null>;
};

export const ModalContext = createContext<ModalContextValue | null>(null);

export function useModal() {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("Modal Components must be used within the Modal wrapper");
  }

  return context;
}

// Structure를 위한 Context (Alert.Content 내부에 렌더링 여부)
export const ContentContext = createContext(false);
