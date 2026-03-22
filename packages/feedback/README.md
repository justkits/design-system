# @justkits/feedback

컴포넌트 트리 어디서든 명령형으로 알림·확인 다이얼로그·토스트를 트리거할 수 있는 상태 관리 패키지다. UI는 전혀 포함되어 있지 않으며, `<Alerter />`·`<Toaster />`에 원하는 UI 컴포넌트를 직접 주입하는 방식으로 동작한다.

## Requirements

- React 19 이상

## Installation

```sh
pnpm add @justkits/feedback
```

---

## Quick Start

### Alert / Confirm

앱 루트에 `<Alerter />`를 마운트하고, `AlertComponent`·`ConfirmComponent`에 원하는 UI를 주입한다.

```tsx
import { Alerter } from "@justkits/feedback";

function App() {
  return (
    <>
      <Alerter
        AlertComponent={({ alert, closeAlert }) => (
          <dialog open>
            <h2>{alert.title}</h2>
            <p>{alert.message}</p>
            <button
              onClick={async () => {
                await alert.onClose?.();
                closeAlert();
              }}
            >
              {alert.closeText ?? "Close"}
            </button>
          </dialog>
        )}
        ConfirmComponent={({ confirm, closeAlert }) => (
          <dialog open>
            <h2>{confirm.title}</h2>
            <p>{confirm.message}</p>
            <button
              onClick={async () => {
                await confirm.onCancel?.();
                closeAlert();
              }}
            >
              {confirm.cancelText ?? "Cancel"}
            </button>
            <button
              onClick={async () => {
                await confirm.onConfirm();
                closeAlert();
              }}
            >
              {confirm.confirmText ?? "Confirm"}
            </button>
          </dialog>
        )}
      />
      {/* 나머지 앱 */}
    </>
  );
}
```

마운트 후에는 컴포넌트 트리 어디서든 명령형으로 호출한다.

```ts
import { showAlert, showConfirm } from "@justkits/feedback";

showAlert("제목", "내용");

showConfirm("삭제하시겠습니까?", "이 작업은 되돌릴 수 없습니다.", () => {
  handleDelete();
});
```

---

### Toast

앱 루트에 `<Toaster />`를 마운트하고, `ToastsComponent`에 원하는 UI를 주입한다. `duration`과 `position` 값은 `ToastObject`에 포함되어 전달되므로, 자동 dismiss 타이머 등의 동작은 주입한 컴포넌트에서 직접 구현한다.

```tsx
import { Toaster } from "@justkits/feedback";

function App() {
  return (
    <>
      <Toaster
        ToastsComponent={({ toasts, dismiss }) => (
          <div style={{ position: "fixed", top: 16, right: 16 }}>
            {toasts.map((toast) => (
              <div key={toast.id}>
                <span>
                  [{toast.type}] {toast.message}
                </span>
                <button onClick={() => dismiss(toast.id)}>✕</button>
              </div>
            ))}
          </div>
        )}
      />
      {/* 나머지 앱 */}
    </>
  );
}
```

마운트 후에는 어디서든 호출한다.

```ts
import { toast } from "@justkits/feedback";

toast.success("저장되었습니다.");
toast.error("오류가 발생했습니다.", { duration: 5000 });
toast.warning("주의가 필요합니다.", { position: "bottom-right" });
toast.info("새로운 업데이트가 있습니다.", { duration: "infinite" });
```

---

## Feature Specification

### Alert vs Confirm

- [x] **Alert**: 단순 알림. `onClose` 콜백은 선택 사항이다.
- [x] **Confirm**: 확인/취소 두 가지 선택지를 제공한다. `onConfirm`은 필수, `onCancel`은 선택 사항이다.

### Alert State Management

- [x] **한 번에 하나의 알림**: 이미 알림이 활성화된 상태에서 추가 호출이 들어오면 무시된다. 개발 환경에서는 경고 메시지가 출력되며, 프로덕션에서는 조용히 무시된다.
- [x] **마운트 감지**: `<Alerter />`가 마운트되지 않은 상태에서 호출하면 경고가 출력된다.

### Toast

- [x] **4가지 타입**: `success` · `error` · `warning` · `info`
- [x] **6가지 위치**: `top-left` · `top-center` · `top-right` · `bottom-left` · `bottom-center` · `bottom-right` (기본값: `top-center`)
- [x] **duration**: ms 단위 숫자 또는 `"infinite"`. 기본값: `3000`. `0` 이하는 무시된다.
- [x] **pre-mount 큐잉**: `<Toaster />`가 마운트되기 전에 호출된 toast는 큐에 저장되어 마운트 직후 flush된다.

---

## Known Issues

### SSR 미지원 (SPA 전용)

현재 이 패키지는 **단일 SPA(Single Page Application) 환경만 지원**한다. SSR 지원은 추후 작업으로 예정되어 있다.

`showAlert()` · `showConfirm()` · `toast.*()` 는 내부적으로 `document.dispatchEvent()`를 사용하므로, 서버 환경에서 호출하면 런타임 오류가 발생한다.

### 다중 React 루트 미지원

`alerterMounted` · `alertActive` · `toastQueue` 등은 모듈 레벨 전역 변수다. 한 페이지에 `ReactDOM.createRoot()`로 생성된 루트가 여럿 존재하는 경우 루트 간 충돌이 발생할 수 있다.
