import {
  type ButtonHTMLAttributes,
  type MouseEvent,
  useContext,
  useEffect,
} from "react";

import { AsChild } from "@/core/asChild";
import { ContentContext, useModal } from "./internals/contexts";

type ModalCloseProps = {
  asChild?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void | Promise<void>;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "type">;

export function ModalClose({
  children,
  className,
  style,
  onClick,
  asChild = false,
  disabled,
  ...rest
}: Readonly<ModalCloseProps>) {
  const { closeModal, isPending, setPending } = useModal();

  const isInsideContent = useContext(ContentContext);

  if (!isInsideContent) {
    throw new Error("Modal.Close must be used within Modal.Content");
  }

  useEffect(() => {
    return () => setPending(false);
  }, [setPending]);

  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    const result = onClick?.(e);
    if (!(result instanceof Promise)) {
      closeModal();
      return;
    }
    setPending(true);
    try {
      await result;
      closeModal();
    } catch {
      // Promise가 거부되면, Modal는 닫히지 않고 pending 상태도 해제되어야 한다.
    } finally {
      setPending(false);
    }
  };

  if (asChild) {
    return (
      <AsChild
        className={className}
        style={style}
        {...rest}
        disabled={isPending || disabled}
        onClick={handleClick}
      >
        {children}
      </AsChild>
    );
  }

  return (
    <button
      className={className}
      style={style}
      {...rest}
      type="button"
      disabled={isPending || disabled}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
