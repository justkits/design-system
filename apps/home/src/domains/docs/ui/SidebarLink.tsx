import NextLink from "next/link";
import type {
  DocsBranch,
  DocsLeaf,
  JustkitsDocsFrontmatter,
} from "@justkits/docs";
import {
  SidebarLink as NavLink,
  SectionLinkToggle,
} from "@justkits/navigation";
import { Badge } from "@justkits/ui/Badge";
import { Button } from "@justkits/ui/Buttons";
import { AppIcon } from "@justkits/ui/Icons";
import { Text } from "@justkits/ui/Texts";

import { kebabToTitleCase } from "@/lib/strings";
import { styles } from "./styles.css";

type LinkProps = {
  item: DocsLeaf | DocsBranch;
  isActive: boolean;
};

export function SidebarLink({ item, isActive }: Readonly<LinkProps>) {
  return (
    <NavLink
      href={item.href}
      as={NextLink}
      left={item.type === "leaf" ? <div /> : <Toggle />}
      isActive={isActive}
      right={<SidebarBadge status={item.fields.status} />}
      className={styles.item({ isActive })}
    >
      {isActive && <span className={styles.indicator} />}
      <Text variant="bodySmall" className={styles.itemLabel}>
        {item.label}
      </Text>
    </NavLink>
  );
}

function Toggle() {
  return (
    <SectionLinkToggle asChild>
      <Button variant="transparent" className={styles.toggle}>
        <AppIcon icon="chevron-right" className={styles.toggleIcon} />
      </Button>
    </SectionLinkToggle>
  );
}

function SidebarBadge({
  status,
}: Readonly<{ status: JustkitsDocsFrontmatter["status"] }>) {
  if (status === "coming-soon") {
    return <Badge color="#e18115" label={kebabToTitleCase(status)} />;
  }
  return null;
}
