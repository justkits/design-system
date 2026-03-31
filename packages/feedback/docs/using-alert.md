# @justkits/feedback - Using the Alert module (in depth)

본 라이브러리의 `alert` 모듈을 사용하는 구체적인 방법을 여러가지 제안한다.

## Basic Usage

### `<AlertComponent />`와 `<ConfirmComponent />` 준비

```tsx
import { AlertComponentProps, ConfirmComponentProps } from "@justkits/feedback";

export function AlertComponent({ alert }: AlertComponentProps) {
  return (
    <dialog
      open
      style={{
        padding: 24,
        borderRadius: 8,
        border: "1px solid #e5e7eb",
        minWidth: 320,
      }}
    >
      <h2 style={{ margin: "0 0 8px", fontSize: 18, fontWeight: 600 }}>
        {alert.title}
      </h2>
      <p style={{ margin: "0 0 20px", color: "#6b7280" }}>{alert.message}</p>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={alert.onClose}
          style={{
            padding: "8px 16px",
            borderRadius: 6,
            border: "none",
            background: "#111827",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          {alert.closeText}
        </button>
      </div>
    </dialog>
  );
}

export function ConfirmComponent({ confirm }: ConfirmComponentProps) {
  return (
    <dialog
      open
      style={{
        padding: 24,
        borderRadius: 8,
        border: "1px solid #e5e7eb",
        minWidth: 320,
      }}
    >
      <h2 style={{ margin: "0 0 8px", fontSize: 18, fontWeight: 600 }}>
        {confirm.title}
      </h2>
      <p style={{ margin: "0 0 20px", color: "#6b7280" }}>{confirm.message}</p>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
        <button
          onClick={confirm.onCancel}
          style={{
            padding: "8px 16px",
            borderRadius: 6,
            border: "1px solid #e5e7eb",
            background: "#fff",
            cursor: "pointer",
          }}
        >
          {confirm.cancelText}
        </button>
        <button
          onClick={confirm.onConfirm}
          style={{
            padding: "8px 16px",
            borderRadius: 6,
            border: "none",
            background: "#111827",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          {confirm.confirmText}
        </button>
      </div>
    </dialog>
  );
}
```

### `<Alerter />` 마운트

```tsx
import { Alerter } from "@justkits/feedback";
import { AlertComponent, ConfirmComponent } from "./components";

function App() {
  return (
    <>
      <Alerter
        AlertComponent={AlertComponent}
        ConfirmComponent={ConfirmComponent}
      />
      {/* 나머지 앱 */}
    </>
  );
}
```

### alert API 사용

마운트 후에는 컴포넌트 트리 어디서든 명령형으로 호출한다.

```tsx
/// React 컴포넌트 내에서 예시
import { showConfirm } from "@justkits/feedback";

export function Page() {
  const handleLogout = () => {
    showConfirm("Logout", "Are you sure you want to log out?", () => logout());
  };

  return <button onClick={handleLogout}>Log out</button>;
}

/// React 외 예시
import { showAlert } from "@justkits/feedback";

export async function getData() {
  try {
    await fetchData();
  } catch {
    showAlert("Error", "Failed to load data.", { closeText: "Back" });
  }
}
```

더 많은 활용 예시는 [alert API 문서](./alert-api.md)를 참고하면 된다.

---

## With `@justkits/headless-ui`

`@justkits/feedback`의 상태 관리 기능과 `@justkits/headless-ui`의 렌더링 기능을 함께 사용하면 간편하게 앱에서 Alert 기능을 사용할 수 있다.

### Installation

```bash
pnpm add @justkits/feedback @justkits/headless-ui
```

### 컴포넌트 준비

`@justkits/headless-ui`의 `Alert`를 사용해 컴포넌트를 조합한다.

> `isOpen`를 전달한다 — `Alerter`는 alert가 활성화된 동안에만 컴포넌트를 렌더하므로, 마운트된 시점에는 항상 열린 상태다.

> `Alerter`가 이미 `portal` 처리를 하기 때문에, `portal` property는 굳이 사용하지 않아도 괜찮다.

```tsx
// components/AlertComponent.tsx
import type { AlertComponentProps } from "@justkits/feedback";
import { Alert } from "@justkits/headless-ui";

export function AlertComponent({ alert }: AlertComponentProps) {
  return (
    <Alert isOpen>
      <Alert.Overlay className="bg-black/50" />
      <Alert.Content className="fixed! top-1/2! left-1/2! -translate-x-1/2! -translate-y-1/2! bg-white rounded-xl p-6 shadow-lg w-80">
        <Alert.Title className="text-lg font-semibold mb-2">
          {alert.title}
        </Alert.Title>
        <Alert.Message className="text-sm text-gray-600 mb-4">
          {alert.message}
        </Alert.Message>
        <Alert.Button
          onClick={alert.onClose}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          {alert.closeText}
        </Alert.Button>
      </Alert.Content>
    </Alert>
  );
}
```

```tsx
// components/ConfirmComponent.tsx
import type { ConfirmComponentProps } from "@justkits/feedback";
import { Alert } from "@justkits/headless-ui";

export function ConfirmComponent({ confirm }: ConfirmComponentProps) {
  return (
    <Alert isOpen>
      <Alert.Overlay className="bg-black/50" />
      <Alert.Content className="fixed! top-1/2! left-1/2! -translate-x-1/2! -translate-y-1/2! bg-white rounded-xl p-6 shadow-lg w-80">
        <Alert.Title className="text-lg font-semibold mb-2">
          {confirm.title}
        </Alert.Title>
        <Alert.Message className="text-sm text-gray-600 mb-4">
          {confirm.message}
        </Alert.Message>
        <div className="flex gap-2">
          <Alert.Button
            onClick={confirm.onCancel}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
          >
            {confirm.cancelText}
          </Alert.Button>
          <Alert.Button
            onClick={confirm.onConfirm}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            {confirm.confirmText}
          </Alert.Button>
        </div>
      </Alert.Content>
    </Alert>
  );
}
```

### `<Alerter />` 마운트

`Alerter`는 앱 루트에 한 번만 마운트한다. `document.body`에 포털로 렌더된다.

```tsx
// app/layout.tsx (Next.js) 또는 main.tsx (Vite)
import { Alerter } from "@justkits/feedback";
import { AlertComponent } from "@/components/AlertComponent";
import { ConfirmComponent } from "@/components/ConfirmComponent";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Alerter
          AlertComponent={AlertComponent}
          ConfirmComponent={ConfirmComponent}
        />
      </body>
    </html>
  );
}
```

### API 호출

`<Alerter />`를 마운트 했다면, Basic Usage에서의 [예시](#alert-api-사용)와 마찬가지로, [alert API 문서](./alert-api.md)를 참고하여 API를 호출하면 된다.

## With `@justkits/motion`

`@justkits/motion`는 애니메이션을 손쉽게 사용할 수 있는 기능을 제공한다.

### Installation

```bash
pnpm add @justkits/feedback @justkits/motion
```

### Setup

앱 entry point에서 keyframes를 한 번 import한다.

```ts
import "@justkits/motion/keyframes.css";
```

### 컴포넌트에 애니메이션 주입

`useAnimatedExit`를 활용하여 닫기 동작을 가로채어 다이얼로그가 dismiss되기 전에 exit 애니메이션을 재생할 수 있도록 한다.

#### `<AlertComponent />`

`alert.onClose`를 `Alert.Button`에 직접 전달하는 대신 `startClosing`을 전달한다. `useAnimatedExit`가 애니메이션 완료 후 `alert.onClose`를 호출해 다이얼로그를 dismiss한다.

```tsx
import { type AlertComponentProps } from "@justkits/feedback";
import { transition, useAnimatedExit } from "@justkits/motion";

export function AlertComponent({ alert }: AlertComponentProps) {
  const { exiting, startClosing } = useAnimatedExit(300, alert.onClose);

  return (
    <dialog
      open
      style={{
        padding: 24,
        borderRadius: 8,
        border: "1px solid #e5e7eb",
        minWidth: 320,
        backgroundColor: "white",
        ...transition({ name: "pop", duration: 300, exiting }),
      }}
    >
      <h2 style={{ margin: "0 0 8px", fontSize: 18, fontWeight: 600 }}>
        {alert.title}
      </h2>
      <p style={{ margin: "0 0 20px", color: "#6b7280" }}>{alert.message}</p>
      <button
        onClick={startClosing}
        style={{
          padding: "8px 16px",
          borderRadius: 6,
          border: "none",
          background: "#111827",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        {alert.closeText}
      </button>
    </dialog>
  );
}
```

#### `<ConfirmComponent />`

Alert와 동일한 패턴이다. 두 버튼 모두 `startClosing`을 통해 실행되며, 실제 confirm/cancel 콜백은 `useAnimatedExit`에 전달된다.

```tsx
import { type ConfirmComponentProps } from "@justkits/feedback";
import { transition, useAnimatedExit } from "@justkits/motion";

export function ConfirmComponent({ confirm }: ConfirmComponentProps) {
  const { exiting: exitingConfirm, startClosing: startConfirm } =
    useAnimatedExit(300, confirm.onConfirm);
  const { exiting: exitingCancel, startClosing: startCancel } = useAnimatedExit(
    300,
    confirm.onCancel,
  );

  const exiting = exitingConfirm || exitingCancel;

  return (
    <dialog
      open
      style={{
        padding: 24,
        borderRadius: 8,
        border: "1px solid #e5e7eb",
        minWidth: 320,
        backgroundColor: "white",
        ...transition({ name: "pop", duration: 300, exiting }),
      }}
    >
      <h2 style={{ margin: "0 0 8px", fontSize: 18, fontWeight: 600 }}>
        {confirm.title}
      </h2>
      <p style={{ margin: "0 0 20px", color: "#6b7280" }}>{confirm.message}</p>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
        <button
          onClick={startCancel}
          style={{
            padding: "8px 16px",
            borderRadius: 6,
            border: "1px solid #e5e7eb",
            background: "#fff",
            cursor: "pointer",
          }}
        >
          {confirm.cancelText}
        </button>
        <button
          onClick={startConfirm}
          style={{
            padding: "8px 16px",
            borderRadius: 6,
            border: "none",
            background: "#111827",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          {confirm.confirmText}
        </button>
      </div>
    </dialog>
  );
}
```
