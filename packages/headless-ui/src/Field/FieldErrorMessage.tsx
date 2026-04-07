import {
  type ReactNode,
  type HTMLAttributes,
  useId,
  useLayoutEffect,
} from "react";

import { AsChild } from "@/core/asChild";
import { useField } from "./internals/contexts";

type NormalMessageProps = {
  asChild?: false;
  children: string;
};

type AsChildMessageProps = {
  asChild: true;
  children: ReactNode;
};

type FieldErrorMessageProps = (NormalMessageProps | AsChildMessageProps) &
  Omit<
    HTMLAttributes<HTMLSpanElement>,
    "id" | "children" | "role" | "aria-live"
  >;

export function FieldErrorMessage({
  asChild = false,
  children,
  ...rest
}: FieldErrorMessageProps) {
  const id = useId();
  const { setErrorId } = useField(
    "Field.ErrorMessage must be used within the Field wrapper.",
  );

  useLayoutEffect(() => {
    setErrorId(id);
    return () => setErrorId(undefined);
  }, [id, setErrorId]);

  if (asChild) {
    return (
      <AsChild {...rest} id={id} role="alert" aria-live="polite">
        {children}
      </AsChild>
    );
  }

  return (
    <span {...rest} id={id} role="alert" aria-live="polite">
      {children}
    </span>
  );
}
