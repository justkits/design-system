import { Collapsible, CollapsibleProps } from "@/components/Collapsible";

type Props = CollapsibleProps & {
  role?: "region" | "group";
};

export function TestCollapsible({
  children,
  role = "region",
  ...rest
}: Readonly<Props>) {
  return (
    <Collapsible {...rest}>
      <Collapsible.Toggle>Toggle</Collapsible.Toggle>
      <Collapsible.Content role={role}>{children}</Collapsible.Content>
    </Collapsible>
  );
}
