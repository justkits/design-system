import { useState } from "react";

import { Tooltip } from "@/Tooltip";
import { FloatingPlacement } from "@/_placement";

export function TestComponent({
  content = "툴팁 메시지",
  position = "bottom",
  delay,
  arrow = false,
}: Readonly<{
  content?: string;
  position?: FloatingPlacement;
  delay?: number;
  arrow?: boolean;
}>) {
  return (
    <>
      <Tooltip delay={delay} position={position}>
        <Tooltip.Trigger data-testid="tooltip-trigger">트리거</Tooltip.Trigger>
        <Tooltip.Content data-testid="tooltip-content">
          {content}
          {arrow && <Tooltip.Arrow data-testid="tooltip-arrow" />}
        </Tooltip.Content>
      </Tooltip>
      <button data-testid="outside-button">외부 버튼</button>
    </>
  );
}

export function ControlledComponent() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Tooltip isOpen={open} onOpenChange={setOpen}>
        <Tooltip.Trigger data-testid="tooltip-trigger">트리거</Tooltip.Trigger>
        <Tooltip.Content data-testid="tooltip-content">
          툴팁 메시지
        </Tooltip.Content>
      </Tooltip>
      <button
        data-testid="toggle-button"
        onClick={() => setOpen((prev) => !prev)}
      >
        토글 툴팁
      </button>
    </>
  );
}

export function TwoTooltips() {
  const [open1, setOpen1] = useState(true);
  const [open2, setOpen2] = useState(true);
  return (
    <>
      <Tooltip isOpen={open1} onOpenChange={setOpen1}>
        <Tooltip.Trigger>첫 번째 트리거</Tooltip.Trigger>
        <Tooltip.Content>첫 번째 툴팁</Tooltip.Content>
      </Tooltip>
      <Tooltip isOpen={open2} onOpenChange={setOpen2}>
        <Tooltip.Trigger>두 번째 트리거</Tooltip.Trigger>
        <Tooltip.Content>두 번째 툴팁</Tooltip.Content>
      </Tooltip>
    </>
  );
}
