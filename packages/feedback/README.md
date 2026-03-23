# @justkits/feedback

React를 위한 Headless, Imperative Alert/Confirm/Toast 매니저

컴포넌트 트리 어디서든 명령형으로 알림·확인 다이얼로그·토스트를 트리거할 수 있는 상태 관리 패키지다.

## Key Features

1. **Bring Your Own UI**: 라이브러리 내부에 하드코딩된 스타일은 없다. 프로젝트에 알맞는 UI 컴포넌트를 그대로 연결해서 사용하면 된다.
2. **자유로운 호출**: React 컴포넌트 내부 뿐만 아니라, 일반 유틸리티 함수, 비동기 로직, API 인터셉터 등 React 생명주기 밖에서도 자유롭게 호출할 수 있다.
3. **SSR 호환**: NextJS 등 SSR 환경에서도 Hydration 에러나 `window is not defined` 에러 없이 안전하게 동작한다.
4. **동시성 제어**: 여러 알림이 동시에 호출되어 화면이 겹치거나 엉망이 되는 것을 방어한다. 한 번에 하나의 알림만 깔끔하게 처리된다.

## Installation

```sh
pnpm add @justkits/feedback
```

- React 19 이상이 필요하다.

---

## Quick Start

### Alert / Confirm

원하는 스타일링이 적용된 `<AlertComponent />`와 `<ConfirmComponent />`를 준비하여, 앱 루트에 `<Alerter />`에 주입하여 마운트하고, 컴포넌트 트리 어디서든 명령형으로 호출한다.

- `alert` 모듈 사용에 대한 더 자세한 내용은 [Alert 사용법 문서](./docs/using-alert.md)에서 찾을 수 있다.
- `showAlert()`와 `showConfirm()`에 대한 상세한 API 명세서는 [해당 문서](./docs/alert-api.md)에서 찾을 수 있다.

---

### Toast

원하는 스타일링이 적용된 `<ToastsComponent />`를 준비하여, 앱 루트에 `<Toaster />`에 주입하여 마운트하고, 컴포넌트 트리 어디서든 명령형으로 호출한다.

- `toast` 모듈 사용에 대한 더 자세한 내용은 [Toast 사용법 문서](./docs/using-toast.md)에서 찾을 수 있다.
- 상세한 `toast()` API 명세서는 [해당 문서](./docs/toast-api.md)에서 찾을 수 있다.

**자동 dismiss 타이머 등의 동작은 주입한 컴포넌트에서 직접 구현한다.** exit 애니메이션이 필요한 경우, 애니메이션 완료 시점에 `toast.dismiss()`를 호출하면 된다. 간단한 예시는 [예시 문서](./docs/examples.md#기본-사용법---toaster)에서 찾을 수 있다.

---

## With `@justkits/headless-ui`

`@justkits/headless-ui`의 `Alert`·`Toast` 컴포넌트를 이 패키지와 함께 사용하는 것을 강력하게 추천한다. 접근성(ARIA), 포커스 트랩, 스크롤 잠금, 자동 dismiss 타이머, hover 시 타이머 일시정지 등이 기본 제공된다. 해당 컴포넌트를 사용하면 스타일링만 처리하면 된다. 자세한 사용법과 전체 예시는 [Using Alert 문서](./docs/using-alert.md)와 [Using Toast 문서](./docs//using-toast.md)에 자세하게 설명되어 있다.

**정리**

- `@justkits/feedback`는 **상태**를 담당한다 — 활성 alert·toast 큐를 관리하고, 컴포넌트 트리 어디서든 명령형으로 트리거할 수 있는 API(`showAlert`, `showConfirm`, `toast`)를 제공한다.
- `@justkits/headless-ui`는 **렌더링**을 담당한다 — 스타일 없이 접근성만 갖춘 UI 프리미티브(`Alert`, `Toast`)를 제공하며, 직접 스타일을 입혀 사용한다.

---

## With `@justkits/motion`

`Alert`나 `Toast`를 렌더링 함에 있어, 자연스러운 애니메이션을 주입하는 것 역시 권장된다. 간편하게 애니메이션 기능을 추가하기 위해 `@justkits/motion` 라이브러리를 사용하는 것을 강력하게 추천한다. [Using Alert 문서](./docs/using-alert.md)와 [Using Toast 문서](./docs//using-toast.md)에 각 컴포넌트에 enter/exit 애니메이션을 `@justkits/motion`의 `transition()`과 `useAnimatedExit()`을 활용해 추가하는 방법을 자세하게 설명한다.

`@justkits/motion`의 전체 API, 애니메이션 목록, 토큰 타입은 [motion 패키지 README →](https://github.com/justkits/design-system/packages/motion/README.md)를 참고한다.

---

## Feature Specification

### Alert / Confirm

- [x] **Alert**: 단순 알림. `onClose` 콜백은 선택 사항이다.
- [x] **Confirm**: 확인/취소 두 가지 선택지를 제공한다. `onConfirm`은 필수, `onCancel`은 선택 사항이다.
- [x] **한 번에 하나의 알림**: 이미 알림이 활성화된 상태에서 추가 호출이 들어오면 무시된다. 개발 환경에서는 경고 메시지가 출력되며, 프로덕션에서는 조용히 무시된다.
- [x] **SSR**: 서버 환경에서 호출하면 조용히 무시된다. blocking 다이얼로그는 서버에서 선제적으로 표시하는 것이 의미 없으므로, SSR 큐잉을 지원하지 않는다.

### Toast

- [x] **5가지 타입**: `default` · `success` · `error` · `warning` · `info`
- [x] **duration**: ms 단위 숫자 또는 `"infinite"`. 기본값: `3000`. `0` 이하는 무시된다.
- [x] **SSR**: 서버 환경에서 호출하면 조용히 무시된다. `<Toaster />`는 서버에서 아무것도 렌더하지 않는다.

---

## Extending `ToastObject`

`ToastObject`는 `interface`로 선언되어 있어 Module Augmentation으로 커스텀 필드를 추가할 수 있다. `icon`, `actions`, `position` 등 여러 유용한 필드를 추가할 수 있다.

```ts
// your-types.d.ts
import "@justkits/feedback";

declare module "@justkits/feedback" {
  interface ToastObject {
    icon?: React.ReactNode; // or maybe string
    position?: "top-center" | "bottom-right";
    actions?: {
      label: string;
      onClick: () => void;
    }[];
  }
}
```

이후 `toast.*()` 호출 시 커스텀 필드를 전달할 수 있다.

```ts
toast.success("저장되었습니다.", {
  position: "bottom-right",
  icon: <CheckIcon />,
  actions: { label: "자세히 보기", onClick: redirect.to("/details") },
});
```

그리고 주입하는 `<ToastsComponent />`에서 해당 필드들을 처리하면 된다.

```tsx
import { ToastsComponentProps } from "@justkits/feedback";

const positionStyles: Record<
  NonNullable<ToastObject["position"]>,
  React.CSSProperties
> = {
  "top-center": {
    position: "fixed",
    top: 16,
    left: "50%",
    transform: "translateX(-50%)",
  },
  "bottom-right": { position: "fixed", bottom: 16, right: 16 },
};

function ToastsComponent({ toasts }: ToastsComponentProps) {
  const grouped = Object.groupBy(toasts, (t) => t.position ?? "bottom-right");

  return (
    <>
      {(
        Object.entries(grouped) as [
          NonNullable<ToastObject["position"]>,
          ToastObject[],
        ][]
      ).map(([position, items]) => (
        <div key={position} style={positionStyles[position]}>
          {items.map((toast) => (
            <Toast key={toast.id} toast={toast} />
          ))}
        </div>
      ))}
    </>
  );
}
```

> **참고:** `AlertObject`·`ConfirmObject`는 `type`으로 선언되어 있어 Module Augmentation이 불가능하다.

---

## SSR

두 모듈 모두 `document`가 없는 서버 환경에서 안전하게 동작한다.

- **Alert**: 서버 환경에서 `showAlert()`·`showConfirm()` 호출 시 조용히 무시된다. 개발 환경에서는 콘솔 경고가 출력된다. `<Alerter />`는 서버에서 아무것도 렌더하지 않는다.
- **Toast**: 서버 환경에서 `toast.*()` 호출 시 조용히 무시된다. 개발 환경에서는 콘솔 경고가 출력된다. `<Toaster />`는 서버에서 아무것도 렌더하지 않는다.

따라서 데이터를 클라이언트로 전달한 뒤, API 호출은 클라이언트에서 처리하는 것을 권장한다.

---

## Known Issues

### 다중 React 루트 미지원

alert 상태·toast 상태는 모듈 레벨 전역 변수다. 한 페이지에 `ReactDOM.createRoot()`로 생성된 루트가 여럿 존재하는 경우 루트 간 충돌이 발생할 수 있다.

### Toaster exit 애니메이션

모든 toast가 dismiss되면 `<Toaster />`의 포털이 DOM에서 완전히 제거된다. exit 애니메이션이 필요한 경우, 주입된 컴포넌트 내에서 애니메이션 완료 후 `dismiss(id)`를 호출해야 한다. `dismiss(id)`를 호출하는 즉시 해당 toast는 상태에서 제거되며, 마지막 toast라면 포털도 함께 제거된다.

> exit 애니메이션 구현에는 `@justkits/motion`을 활용할 수 있다.

### Toast 상태 무제한 누적

`<Toaster />`가 마운트되기 전에 호출된 `toast.*()` 는 전역 상태에 무제한으로 누적된다. `<Toaster />`가 마운트되면 누적된 toast가 한꺼번에 렌더된다. `<Toaster />`가 영구적으로 마운트되지 않는 경우(예: 조건부 렌더링 오류), 상태가 계속 증가한다. 정상적인 앱 구성에서는 문제가 되지 않는다.
