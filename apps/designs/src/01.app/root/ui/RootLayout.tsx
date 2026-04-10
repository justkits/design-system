import { type ReactNode } from "react";
import { Google_Sans, Kalam } from "next/font/google";
import { ThemeProvider, ThemeScript } from "@justkits/theme";
import { clsx } from "clsx";

import { Footer } from "@widgets/footer";
import { Header } from "@widgets/header";
import { SidebarProvider } from "@entities/sidebar";

import "@justkits/design-foundations/reset.css";
import "@justkits/motion/keyframes.css";
import "./globals.css";
import { styles } from "./styles.css";

type Props = {
  children: ReactNode;
};

const googleSans = Google_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const kalam = Kalam({
  weight: ["300", "400", "700"],
  variable: "--font-kalam",
  subsets: ["latin"],
});

export function RootLayout({ children }: Readonly<Props>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body
        className={clsx(googleSans.className, kalam.className, styles.body)}
      >
        <ThemeProvider>
          <SidebarProvider>
            <Header />
            <main className={styles.main} role="main">
              {children}
            </main>
            <Footer />
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
