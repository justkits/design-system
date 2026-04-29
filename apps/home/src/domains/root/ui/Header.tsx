"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarToggle } from "@justkits/navigation";
import { Button } from "@justkits/ui/Buttons";
import { AppIcon } from "@justkits/ui/Icons";

import { GithubLogo, JustkitsLogo } from "@/ui/Logo";
import { styles } from "./styles.css";

export function Header() {
  return (
    <header className={styles.header} role="banner">
      <div className={styles.left}>
        <SidebarToggle asChild>
          <Button variant="transparent" className={styles.toggle}>
            <AppIcon size={20} icon="sidebar-open" />
          </Button>
        </SidebarToggle>
        <Link href="/" className={styles.logo}>
          <JustkitsLogo variant="text" size={24} />
        </Link>
      </div>
      <HeaderNav />
      <div className={styles.right}>
        <Link
          href="https://github.com/justkits/justkits"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubLogo size={24} />
        </Link>
        <span>BlogPageLink</span>
      </div>
    </header>
  );
}

function HeaderNav() {
  const pages = [
    { name: "Primitives", href: "/primitives" },
    { name: "Design System", href: "/design-system" },
    { name: "Colors", href: "/colors" },
  ];
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname.startsWith(href);
  };

  return (
    <nav className={styles.nav} role="navigation" aria-label="Main Navigation">
      {pages.map((page) => (
        <div
          key={page.name}
          className={styles.pageWrapper({ isActive: isActive(page.href) })}
        >
          <Link
            href={page.href}
            className={styles.pageLink({ isActive: isActive(page.href) })}
          >
            {page.name}
          </Link>
        </div>
      ))}
    </nav>
  );
}
