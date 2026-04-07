import { createContext, useContext } from "react";

type FormFieldContextValue = {
  disabled: boolean;
  required: boolean;
  controlId: string;
  descriptionId: string | undefined;
  setDescriptionId: (id: string | undefined) => void;
  errorId: string | undefined;
  setErrorId: (id: string | undefined) => void;
};

export const FormFieldContext = createContext<FormFieldContextValue | null>(
  null,
);

export function useField(fallbackMsg: string) {
  const context = useContext(FormFieldContext);

  if (!context) {
    throw new Error(fallbackMsg);
  }

  return context;
}
