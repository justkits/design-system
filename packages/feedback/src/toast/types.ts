export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export const toastPositions: ToastPosition[] = [
  "top-left",
  "top-center",
  "top-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
];

export type ToastType = "success" | "warning" | "error" | "info";

export type ToastOptions = {
  /**
   * Toast가 자동으로 사라지기까지의 시간 (ms). 기본값: 3000 (3초)
   * 0이나 음수로 설정하면, 무시된다.
   */
  duration: number | "infinite";
  position: ToastPosition;
  description?: string;
};

export type ToastObject = {
  id: string;
  type: ToastType;
  message: string;
} & ToastOptions;

export type ToastGroupComponentProps = {
  toasts: ToastObject[];
  dismiss: (id: string) => void;
};
