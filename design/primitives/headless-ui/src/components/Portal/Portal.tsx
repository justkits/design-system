import { Portal as Component } from "@/core/portal";

export function Portal({ children }: Readonly<{ children: React.ReactNode }>) {
  return <Component isPortalMode>{children}</Component>;
}
