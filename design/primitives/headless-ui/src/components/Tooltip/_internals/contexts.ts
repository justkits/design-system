import { createContext } from "react";

type TooltipContextType = {
  // Open State
  disabled: boolean;
  isOpen: boolean;
  showTooltip: () => void;
  showTooltipWithDelay: () => void;
  hideTooltip: () => void;
  hideTooltipWithDelay: () => void;
  clearTimer: () => void;
  // 렌더링 관련 상태
  isPortalMode: boolean;
  unmountOnHide: boolean;
  // ARIA 연결을 위한 id
  tooltipId: string;
  // 툴팁 위치 스타일
  containerStyles: React.CSSProperties;
  arrowStyles: React.CSSProperties;
  // DOM 참조
  triggerRef: React.RefObject<HTMLElement | null>;
  floatingRef: React.RefObject<HTMLDivElement | null>;
};

export const TooltipContext = createContext<TooltipContextType | undefined>(
  undefined,
);

// Structure를 위한 Context (Tooltip.Content 내부에 렌더링 여부)
export const ContentContext = createContext(false);
