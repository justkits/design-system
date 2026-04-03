import { type HTMLAttributes, useContext } from "react";

import { Portal } from "@/core/portal";
import { ContentContext, useModal } from "./internals/contexts";
import { styles } from "./internals/styles";

type ModalOverlayProps = Omit<HTMLAttributes<HTMLDivElement>, "children">;

export function ModalOverlay({
  className,
  style,
  ...rest
}: Readonly<ModalOverlayProps>) {
  const { isOpen } = useModal();

  const isInsideContent = useContext(ContentContext);

  if (isInsideContent && process.env.NODE_ENV !== "production") {
    console.warn(
      "Modal.Overlay should be rendered outside of Modal.Content. Please move Modal.Overlay outside of Modal.Content to avoid unexpected behavior.",
    );
  }

  if (!isOpen) return null;

  return (
    <Portal isPortalMode>
      <div
        className={className}
        style={{ ...styles.overlay, ...style }}
        {...rest}
      />
    </Portal>
  );
}
