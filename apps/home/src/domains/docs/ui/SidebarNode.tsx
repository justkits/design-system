"use client";

import { usePathname } from "next/navigation";
import type { DocsBranch, DocsGroup, DocsLeaf, DocsNode } from "@justkits/docs";
import { SectionLinkContent, SectionLinkProvider } from "@justkits/navigation";
import { Collapsible } from "@justkits/ui/Collapsible";

import { SidebarLink } from "./SidebarLink";
import { styles } from "./styles.css";

export function SidebarNode({ item }: Readonly<{ item: DocsNode }>) {
  if (item.type === "leaf") {
    return <Leaf leaf={item} />;
  } else if (item.type === "branch") {
    return <Branch branch={item} />;
  } else {
    return <Group group={item} />;
  }
}

function Leaf({
  leaf,
}: Readonly<{
  leaf: DocsLeaf;
}>) {
  const pathname = usePathname();
  const isActive = pathname === leaf.href;

  return <SidebarLink item={leaf} isActive={isActive} />;
}

function Branch({
  branch,
}: Readonly<{
  branch: DocsBranch;
}>) {
  const pathname = usePathname();
  const isActive = pathname === branch.href;

  return (
    <SectionLinkProvider
      isActive={isActive}
      isSubitemActive={pathname.startsWith(branch.href)}
    >
      <SidebarLink item={branch} isActive={isActive} />
      <SectionLinkContent className={styles.subitems}>
        {branch.children.map((leaf) => (
          <Leaf key={leaf.href} leaf={leaf} />
        ))}
      </SectionLinkContent>
    </SectionLinkProvider>
  );
}

function Group({ group }: Readonly<{ group: DocsGroup }>) {
  return (
    <Collapsible label={group.label}>
      <div className={styles.subitems}>
        {group.children.map((child) => (
          <GroupChild key={child.href} child={child} />
        ))}
      </div>
    </Collapsible>
  );
}

function GroupChild({
  child,
}: Readonly<{
  child: DocsBranch | DocsLeaf;
}>) {
  if (child.type === "branch") {
    return <Branch branch={child} />;
  } else {
    return <Leaf leaf={child} />;
  }
}
