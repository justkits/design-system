import { render } from "@testing-library/react";
import * as Navigation from "next/navigation";
import { SidebarProvider } from "@justkits/navigation";

import { DocsLayout } from "@/domains/docs";
import { rootLayoutSetup } from "../_setup";

describe("DocsLayout", () => {
  rootLayoutSetup();

  // Sidebar가 렌더링 되려면, RootLayout으로 감싸야한다.
  it("renders sidebar and contents (children) correctly", async () => {
    vi.spyOn(Navigation, "usePathname").mockReturnValue(
      "/primitives/introduction",
    );

    const jsx = await DocsLayout({
      params: Promise.resolve({ page: "primitives" }),
      children: <div>Component Content</div>,
    });
    const { getByText } = render(<SidebarProvider>{jsx}</SidebarProvider>);

    expect(getByText("Component Content")).toBeTruthy();
    expect(getByText("Introduction")).toBeTruthy();
    expect(getByText("Getting Started")).toBeTruthy();
    expect(getByText("API Reference")).toBeTruthy();
  });
});
