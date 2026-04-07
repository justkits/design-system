import { type ReactNode } from "react";

import { AsChild } from "@/core/asChild";
import { useField, useForm } from "./internals/contexts";

type FieldControlProps = {
  children: ReactNode;
};

export function FieldControl({ children }: Readonly<FieldControlProps>) {
  const { disabled } = useForm();
  const { required, controlId, descriptionId, errorId } = useField(
    "Field.Control must be used within the Field wrapper.",
  );

  const ariaDescribedBy =
    [descriptionId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <AsChild
      id={controlId}
      disabled={disabled}
      required={required}
      aria-invalid={errorId ? "true" : undefined}
      aria-describedby={ariaDescribedBy}
    >
      {children}
    </AsChild>
  );
}
