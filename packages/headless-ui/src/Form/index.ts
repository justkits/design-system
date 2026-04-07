import { Provider } from "./Provider";
import { FormSubmit } from "./FormSubmit";
import { FormErrorMessage } from "./FormErrorMessage";

export type { FormProps } from "./Provider";

export const Form = Object.assign(Provider, {
  Submit: FormSubmit,
  ErrorMessage: FormErrorMessage,
});
