import {
  type CollapsibleContentProps,
  Collapsible as Component,
} from "@justkits/headless-ui/Collapsible";

import { Button } from "@/atoms/Buttons";
import { AppIcon } from "@/atoms/Icons";
import { Text } from "@/atoms/Texts";
import { styles } from "./styles.css";

interface CollapsibleProps extends CollapsibleContentProps {
  label: string;
}

export function Collapsible({
  children,
  label,
  ...rest
}: Readonly<CollapsibleProps>) {
  return (
    <Component>
      <div className={styles.wrapper}>
        <Text variant="bodySmall" className={styles.label}>
          {label}
        </Text>
        <Component.Toggle asChild>
          <Button variant="transparent" className={styles.toggle}>
            <AppIcon icon="chevron-right" size={16} className={styles.icon} />
          </Button>
        </Component.Toggle>
      </div>
      <Component.Content {...rest}>{children}</Component.Content>
    </Component>
  );
}
