import { HTMLAttributes } from "react";

import { useTooltip } from "./internals/main.context";
import { useTooltipContent } from "./internals/content.context";
import { styles } from "./internals/styles";

/**
 * 툴팁의 방향 화살표. `TooltipContent` 안에서 선택적으로 렌더한다.
 *
 * 수직 방향과 X축 보정값을 컨텍스트에서 자동으로 읽어 위치를 맞춘다.
 * `className`과 `style`로 스타일을 적용할 수 있다.
 * 스크린 리더에서는 숨김 처리된다 (`aria-hidden`).
 */
export function TooltipArrow({
  className,
  style,
  ...rest
}: Readonly<HTMLAttributes<HTMLDivElement>>) {
  const { placement, shiftX, shiftY } = useTooltip();
  useTooltipContent(); // 콘텐츠 밖에서 사용되는 것을 방지하기 위한 훅 호출

  return (
    <div
      aria-hidden="true"
      style={{
        ...style,
        ...styles.arrow(placement, shiftX, shiftY),
      }}
      className={className}
      {...rest}
    />
  );
}
