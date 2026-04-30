import { useContext, useEffect } from "react";

import { AsChild } from "@/core/asChild";
import { ContentContext, PopoverContext } from "./_internals/contexts";

export interface PopoverCloseProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "children" | "type" | "onClick"
> {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>;
  asChild?: boolean;
  ctxErrMsg?: string; // context가 없는 경우에 대한 에러 메시지
}

export function PopoverClose({
  children,
  asChild = false,
  ctxErrMsg = "Popover.Close must be used inside the Popover wrapper.",
  onClick,
  disabled,
  ...rest
}: Readonly<PopoverCloseProps>) {
  const context = useContext(PopoverContext);
  const isInsideContent = useContext(ContentContext);

  if (!context) {
    throw new Error(ctxErrMsg);
  }

  if (!isInsideContent) {
    throw new Error("Popover.Close must be used inside Popover.Content.");
  }

  const { hidePopover, isPending, setPending } = context;

  useEffect(() => {
    return () => setPending(false); // 컴포넌트 언마운트 시 pending 상태 초기화
  }, [setPending]);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const result = onClick?.(e);

    if (typeof result?.then !== "function") {
      hidePopover();
      return;
    }

    setPending(true);

    try {
      await result;
      hidePopover();
    } catch {
      // Promise가 거부되면, Popover는 닫히지 않고 pending 상태만 해제
    } finally {
      setPending(false);
    }
  };

  if (asChild) {
    return (
      <AsChild
        {...rest}
        type="button"
        disabled={isPending || disabled}
        onClick={handleClick}
      >
        {children}
      </AsChild>
    );
  }

  return (
    <button
      {...rest}
      type="button"
      disabled={isPending || disabled}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
