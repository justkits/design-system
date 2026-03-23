# @justkits/feedback - toast API

본 라이브러리의 `toast` API 명세서.

> **필수:** `toast`를 사용하려면 앱 루트에 `<Toaster />` 컴포넌트가 마운트되어 있어야 한다.

## `toast()`

```ts
toast(message: string, options?: ToastOptions): void
toast.info(message: string, options?: ToastOptions): void
toast.success(message: string, options?: ToastOptions): void
toast.warning(message: string, options?: ToastOptions): void
toast.error(message: string, options?: ToastOptions): void
```

토스트 알림을 표시한다. `toast()`는 `default` 타입으로 표시하며, 서브 메서드를 사용해 의미에 맞는 타입을 지정할 수 있다.

### Parameters

| 이름               | 타입                   | 필수 | 설명                                                                 |
| ------------------ | ---------------------- | ---- | -------------------------------------------------------------------- |
| `message`          | `string`               | ✓    | 표시할 메시지                                                        |
| `options.duration` | `number \| "infinite"` |      | 표시 시간(ms). 기본값: `3000`. `0` 이하는 무시된다.                  |
| `options.dismiss`  | `() => void`           |      | 토스트를 수동으로 닫는 함수. `showToast` 내부에서 자동으로 주입된다. |

### Example

```ts
toast("저장되었습니다.");
toast.info("업데이트가 있습니다.");
toast.success("파일이 업로드되었습니다.");
toast.warning("저장 공간이 부족합니다.", { duration: 3000 }); // 3초간 화면에 표시
toast.error("요청에 실패했습니다.", { duration: "infinite" }); // 유저가 닫을 때까지 화면에 표시
```

---

## `ToastObject`

`<Toaster />`에 주입된 컴포넌트가 수신하는 개별 toast 객체.

| 필드       | 타입                                                       | 설명                               |
| ---------- | ---------------------------------------------------------- | ---------------------------------- |
| `id`       | `string`                                                   | 고유 식별자 (UUID)                 |
| `type`     | `"default" \| "info" \| "success" \| "warning" \| "error"` | toast 타입                         |
| `message`  | `string`                                                   | 표시할 메시지                      |
| `duration` | `number \| "infinite"`                                     | 표시 시간(ms) 또는 무한            |
| `dismiss`  | `() => void`                                               | 호출 시 해당 toast를 상태에서 제거 |

`ToastObject`는 `interface`로 선언되어 있어 Module Augmentation으로 커스텀 필드를 추가할 수 있다. 자세한 내용은 README의 [Extending `ToastObject`](../README.md#extending-toastobject) 섹션을 참고.

---

## 커스텀 필드 사용

[`ToastObject`를 확장](../README.md#extending-toastobject)하면 `toast.*()` 호출 시 커스텀 필드를 바로 전달할 수 있다.

```ts
toast.success("파일이 업로드되었습니다.", {
  position: "bottom-right",
  icon: <CheckIcon />,
});
```
