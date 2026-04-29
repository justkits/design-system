import { SidebarProvider } from "@justkits/navigation";
import { UIProvider } from "@justkits/ui";
import clsx from "clsx";

import { fontClasses } from "@/lib/fonts";
import { Header } from "./ui/Header";
import { HEADER_HEIGHT, SIDEBAR_WIDTH, styles } from "./styles.css";

type Props = {
  children: React.ReactNode;
};

export function RootLayout({ children }: Readonly<Props>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <UIProvider>
        <SidebarProvider
          scope="page"
          width={SIDEBAR_WIDTH}
          headerHeight={HEADER_HEIGHT}
        >
          <body className={clsx(fontClasses, styles.body)}>
            <Header />
            <main className={styles.main} role="main">
              {children}
            </main>
            <footer role="contentinfo">Footer</footer>
          </body>
        </SidebarProvider>
      </UIProvider>
    </html>
  );
}
