import { type ReactNode } from "react";
import { getSidebarItems } from "@justkits/docs/next";
import { SidebarContent, SidebarMain } from "@justkits/navigation";

import { SidebarNode } from "./ui/SidebarNode";
import { styles } from "./styles.css";

type Props = {
  params: Promise<{ page: string }>;
  children: ReactNode;
};

export async function DocsLayout({ params, children }: Readonly<Props>) {
  const { page } = await params;

  const items = getSidebarItems(page);

  return (
    <div className={styles.page}>
      <SidebarContent>
        <SidebarMain className={styles.sidebar}>
          {items.map((item, idx) => (
            <SidebarNode key={`${item.label}-${idx}`} item={item} />
          ))}
        </SidebarMain>
      </SidebarContent>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
