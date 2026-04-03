import { ModalClose } from "./ModalClose";
import { ModalContent } from "./ModalContent";
import { ModalOverlay } from "./ModalOverlay";
import { ModalTitle } from "./ModalTitle";
import { ModalTrigger } from "./ModalTrigger";
import { Provider } from "./Provider";

export const Modal = Object.assign(Provider, {
  Trigger: ModalTrigger,
  Overlay: ModalOverlay,
  Content: ModalContent,
  Title: ModalTitle,
  Close: ModalClose,
});
