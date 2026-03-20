import { useCallback, useEffect, useRef, useState } from "react";

type UseOpenStateReturnType = {
  isOpen: boolean;
  show: (delay?: number) => void;
  hide: () => void;
};

export function useOpenState(
  controlledOpen: boolean | undefined,
  setOpenState: ((open: boolean) => void) | undefined,
  initialState: boolean = false,
): UseOpenStateReturnType {
  const [internalOpen, setInternalOpen] = useState(initialState);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const show = useCallback(
    (delay: number = 0) => {
      const showAction = () => {
        if (isControlled) {
          setOpenState?.(true);
        } else {
          setInternalOpen(true);
        }
      };

      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      if (delay) {
        timeoutRef.current = setTimeout(() => showAction(), delay);
      } else {
        showAction();
      }
    },
    [isControlled, setOpenState],
  );

  const hide = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (isControlled) {
      setOpenState?.(false);
    } else {
      setInternalOpen(false);
    }
  }, [isControlled, setOpenState]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return { isOpen, show, hide };
}
