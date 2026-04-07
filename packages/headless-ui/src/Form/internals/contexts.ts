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
