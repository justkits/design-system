import { useCallback, useLayoutEffect, useState } from "react";

import { ToastObject, ToastOptions, ToastType } from "./types";

const TOAST_EVENT_NAME = "SHOW_TOAST";

let toasterMounted = false;
let toastQueue: ToastObject[] = [];

export function useToaster() {
  const [toasts, setToasts] = useState<ToastObject[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  useLayoutEffect(() => {
    const toastEventListener = (event: Event) => {
      const newToast = (event as CustomEvent<ToastObject>).detail;
      setToasts((prevToasts) => [...prevToasts, newToast]);
    };

    document.addEventListener(TOAST_EVENT_NAME, toastEventListener);

    return () => {
      document.removeEventListener(TOAST_EVENT_NAME, toastEventListener);
    };
  }, []);

  useLayoutEffect(() => {
    // register
    toasterMounted = true;

    // flush queued toasts that arrived before the Toaster mounted
    if (toastQueue.length > 0) {
      const queued = [...toastQueue];
      toastQueue = [];
      queued.forEach((item) => {
        document.dispatchEvent(
          new CustomEvent(TOAST_EVENT_NAME, { detail: item }),
        );
      });
    }

    return () => {
      // unregister
      toasterMounted = false;
    };
  }, []);

  return { toasts, dismissToast };
}

function showToast(
  type: ToastType,
  message: string,
  options: Partial<ToastOptions> = {},
): void {
  if (typeof options.duration === "number" && options.duration <= 0) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[Toast] duration must be greater than 0. Ignoring toast...",
      );
    }
    return;
  }

  const event = new CustomEvent(TOAST_EVENT_NAME, {
    detail: {
      id: crypto.randomUUID(),
      type,
      message,
      duration: options.duration ?? 3000,
      position: options.position ?? "top-center",
      description: options.description,
    },
  });

  if (toasterMounted) {
    document.dispatchEvent(event);
  } else {
    // Toaster가 아직 마운트되지 않은 경우, Toast를 큐에 저장
    toastQueue.push(event.detail);
  }
}

function success(message: string, options: Partial<ToastOptions> = {}) {
  showToast("success", message, options);
}

function warning(message: string, options: Partial<ToastOptions> = {}) {
  showToast("warning", message, options);
}

function error(message: string, options: Partial<ToastOptions> = {}) {
  showToast("error", message, options);
}

function info(message: string, options: Partial<ToastOptions> = {}) {
  showToast("info", message, options);
}

export const toast = {
  success,
  warning,
  error,
  info,
};
