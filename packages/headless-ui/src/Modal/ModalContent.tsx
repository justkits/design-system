import { type DialogHTMLAttributes } from "react";

import { Portal } from "@/core/portal";
import { ContentContext, useModal } from "./internals/contexts";
import { styles } from "./internals/styles";

type ModalContentProps = DialogHTMLAttributes<HTMLDialogElement>;

export function ModalContent({
  children,
  className,
  style,
  ...rest
}: Readonly<ModalContentProps>) {
  const { isOpen, isPending, titleId, floatingRef } = useModal();

  if (!isOpen) return null;

  return (
    <Portal isPortalMode>
      <ContentContext.Provider value={true}>
        <dialog
          ref={floatingRef}
          {...rest}
          style={{ ...styles.modal, ...style }}
          className={className}
          open
          aria-modal="true"
          aria-labelledby={titleId}
          aria-busy={isPending}
        >
          {children}
        </dialog>
      </ContentContext.Provider>
    </Portal>
  );
}
