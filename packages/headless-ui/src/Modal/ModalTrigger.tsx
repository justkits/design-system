import { type ButtonHTMLAttributes, type RefObject, useContext } from "react";

import { AsChild } from "@/core/asChild";
import { ContentContext, useModal } from "./internals/contexts";

type ModalTriggerProps = {
  asChild?: boolean;
} & Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "type" | "onClick" | "aria-haspopup"
>;

export function ModalTrigger({
  children,
  asChild = false,
  ...rest
}: Readonly<ModalTriggerProps>) {
  const { openModal, triggerRef } = useModal();

  const isInsideContent = useContext(ContentContext);

  if (isInsideContent && process.env.NODE_ENV !== "production") {
    console.warn(
      "Modal.Trigger should be rendered outside of Modal.Content. Please move Modal.Trigger outside of Modal.Content to avoid unexpected behavior.",
    );
  }

  if (asChild) {
    return (
      <AsChild
        {...rest}
        aria-haspopup="dialog"
        onClick={openModal}
        ref={triggerRef}
      >
        {children}
      </AsChild>
    );
  }

  return (
    <button
      {...rest}
      aria-haspopup="dialog"
      type="button"
      onClick={openModal}
      ref={triggerRef as RefObject<HTMLButtonElement>}
    >
      {children}
    </button>
  );
}
