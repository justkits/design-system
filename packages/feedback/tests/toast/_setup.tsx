import { Toaster } from "@/toast/Toaster";
import { ToastGroupComponentProps } from "@/toast/types";

function TestToastGroup({
  toasts,
  dismiss,
}: Readonly<ToastGroupComponentProps>) {
  const handleDismiss = (id: string) => {
    dismiss(id);
  };

  return (
    <div>
      {toasts.map((toast) => (
        <div key={toast.id}>
          <p>{toast.message}</p>
          <button onClick={() => handleDismiss(toast.id)}>Dismiss</button>
        </div>
      ))}
    </div>
  );
}

export function TestComponent() {
  return <Toaster ToastsComponent={TestToastGroup} />;
}
