# @justkits/feedback - alert API

본 라이브러리의 `showAlert()`와 `showConfirm()` API 명세서.

> **필수:** `showAlert()`와 `showConfirm()`를 사용하려면 앱 루트에 `<Alerter />` 컴포넌트가 마운트되어 있어야 한다.

## `showAlert()`

```ts
showAlert(title: string, message: string, options?: AlertOptions): void
```

단순 알림 다이얼로그를 표시한다.

### Parameters

| 이름                | 타입                          | 필수 | 설명                               |
| ------------------- | ----------------------------- | ---- | ---------------------------------- |
| `title`             | `string`                      | ✓    | 다이얼로그 제목                    |
| `message`           | `string`                      | ✓    | 본문 메시지                        |
| `options.closeText` | `string`                      |      | 닫기 버튼 텍스트. 기본값: `"닫기"` |
| `options.onClose`   | `() => void \| Promise<void>` |      | 닫기 버튼 클릭 시 호출되는 콜백    |

### Examples

```ts
showAlert("오류", "요청을 처리할 수 없습니다.");

showAlert("완료", "저장되었습니다.", {
  closeText: "확인",
  onClose: () => console.log("closed"),
});
```

---

## `showConfirm()`

```ts
showConfirm(title: string, message: string, onConfirm: () => void | Promise<void>, options?: ConfirmOptions): void
```

확인/취소 다이얼로그를 표시한다.

### Parameters

| 이름                  | 타입                          | 필수 | 설명                                                                   |
| --------------------- | ----------------------------- | ---- | ---------------------------------------------------------------------- |
| `title`               | `string`                      | ✓    | 다이얼로그 제목                                                        |
| `message`             | `string`                      | ✓    | 본문 메시지                                                            |
| `onConfirm`           | `() => void \| Promise<void>` | ✓    | 확인 버튼 클릭 시 호출되는 콜백. 완료 후 다이얼로그가 자동으로 닫힌다. |
| `options.confirmText` | `string`                      |      | 확인 버튼 텍스트. 기본값: `"확인"`                                     |
| `options.cancelText`  | `string`                      |      | 취소 버튼 텍스트. 기본값: `"취소"`                                     |
| `options.onCancel`    | `() => void \| Promise<void>` |      | 취소 버튼 클릭 시 호출되는 콜백                                        |

### Example

```ts
showConfirm("삭제", "정말 삭제하시겠습니까?", async () => {
  await deleteItem(id);
});

showConfirm(
  "삭제",
  "정말 삭제하시겠습니까?",
  async () => {
    await deleteItem(id);
  },
  {
    confirmText: "삭제",
    cancelText: "취소",
    onCancel: () => console.log("cancelled"),
  },
);
```
