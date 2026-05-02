import { Tooltip, TooltipProps } from "@/components/Tooltip";

export function TestComponent({ children, ...rest }: Readonly<TooltipProps>) {
  return (
    <Tooltip {...rest}>
      <Tooltip.Trigger data-testid="tooltip-trigger">Trigger</Tooltip.Trigger>
      <Tooltip.Content data-testid="tooltip-content">
        <Tooltip.Message data-testid="tooltip-message">
          {children}
        </Tooltip.Message>
        <Tooltip.Arrow data-testid="tooltip-arrow" />
      </Tooltip.Content>
    </Tooltip>
  );
}
