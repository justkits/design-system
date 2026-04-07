import { type ReactNode, type HTMLAttributes, useRef } from "react";

import { AsChild } from "@/core/asChild";
import { useAutoFocus } from "@/core/keyboard/useAutoFocus";
import { useForm } from "./internals/contexts";

type NormalProps = {
  asChild?: false;
  children: string;
};

type AsChildProps = {
  asChild: true;
  children: ReactNode;
};

type FormError = (NormalProps | AsChildProps) &
  Omit<
    HTMLAttributes<HTMLDivElement>,
    "id" | "children" | "role" | "aria-live" | "tabIndex"
  >;

export function FormErrorMessage({
  asChild = false,
  children,
  ...rest
}: FormError) {
  useForm();
  const ref = useRef<HTMLDivElement>(null);
  useAutoFocus(ref, true);

  if (asChild) {
    return (
      <AsChild {...rest} role="alert" aria-live="assertive" tabIndex={-1}>
        {children}
      </AsChild>
    );
  }

  return (
    <div {...rest} ref={ref} role="alert" aria-live="assertive" tabIndex={-1}>
      {children}
    </div>
  );
}
