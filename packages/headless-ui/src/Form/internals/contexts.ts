import { createContext, useContext } from "react";

type FormContextValue = {
  disabled: boolean;
};

export const FormContext = createContext<FormContextValue | null>(null);

export function useForm() {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error("Form components must be used within the Form wrapper.");
  }

  return context;
}

type FormFieldContextValue = {
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
