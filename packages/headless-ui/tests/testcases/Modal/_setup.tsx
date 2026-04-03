import { Modal } from "@/Modal";

export function TestComponent({
  omit = undefined,
  onClose,
}: Readonly<{
  omit?: "trigger" | "overlay" | "content" | "title";
  onClose?: () => void | Promise<void>;
}>) {
  return (
    <>
      <Modal>
        {omit !== "trigger" && (
          <Modal.Trigger data-testid="modal-trigger">트리거</Modal.Trigger>
        )}
        {omit !== "overlay" && <Modal.Overlay data-testid="modal-overlay" />}
        {omit !== "content" && (
          <Modal.Content data-testid="modal-content">
            {omit !== "title" && (
              <Modal.Title data-testid="modal-title">모달 제목</Modal.Title>
            )}
            <Modal.Close onClick={onClose} data-testid="modal-close-button">
              닫기
            </Modal.Close>
          </Modal.Content>
        )}
      </Modal>
      <div data-testid="outside-element">외부 요소</div>
    </>
  );
}
