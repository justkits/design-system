import { ComponentType } from "react";
import { createPortal } from "react-dom";

import { useToaster } from "./manager";
import { ToastGroupComponentProps } from "./types";

type ToasterProps = {
  ToastsComponent: ComponentType<ToastGroupComponentProps>;
};

export function Toaster({ ToastsComponent }: Readonly<ToasterProps>) {
  const { toasts, dismissToast } = useToaster();

  if (toasts.length === 0) return null;

  return createPortal(
    <ToastsComponent toasts={toasts} dismiss={dismissToast} />,
    document.body,
  );
}
