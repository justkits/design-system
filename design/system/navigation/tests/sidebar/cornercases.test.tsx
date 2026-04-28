import { fireEvent, render, renderHook } from "@testing-library/react";

import { SidebarMain, SidebarProvider } from "@/sidebar";
import { useSidebar, useInternalSidebar } from "@/sidebar/contexts/sidebar";

function TestComponent() {
  const { toggleSidebar } = useSidebar();

  return <button onClick={toggleSidebar}>Toggle</button>;
}

describe("Sidebar - corner cases", () => {
  const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

  afterEach(() => {
    warnSpy.mockClear();
    vi.unstubAllEnvs();
  });

  it("raises error if useSidebar is used outside of provider", () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    expect(() => renderHook(() => useSidebar())).toThrow(
      "Sidebar must be used within a SidebarProvider.",
    );

    consoleErrorSpy.mockRestore();
  });

  it("raises error if useInternalSidebar is used outside of provider", () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    expect(() => renderHook(() => useInternalSidebar())).toThrow(
      "InternalSidebar must be used within a SidebarProvider.",
    );

    consoleErrorSpy.mockRestore();
  });

  it("warns in console if toggleSidebar is called without mounting sidebar", () => {
    vi.stubEnv("NODE_ENV", "development");

    const { getByText } = render(
      <SidebarProvider>
        <TestComponent />
      </SidebarProvider>,
    );

    const toggle = getByText("Toggle");
    fireEvent.click(toggle);

    expect(warnSpy).toHaveBeenCalledWith(
      "Sidebar is not mounted. Please mount the Sidebar before toggling.",
    );
  });

  it("doesn't warn if toggleSidebar is called without mounting sidebar in production mode", () => {
    vi.stubEnv("NODE_ENV", "production");

    const { getByText } = render(
      <SidebarProvider>
        <TestComponent />
      </SidebarProvider>,
    );

    const toggle = getByText("Toggle");
    fireEvent.click(toggle);

    expect(warnSpy).not.toHaveBeenCalledWith(
      "Sidebar is not mounted. Please mount the Sidebar before toggling.",
    );
  });

  it("warns in console if multiple sidebars are mounted", () => {
    vi.stubEnv("NODE_ENV", "development");

    render(
      <SidebarProvider>
        <SidebarMain>First Sidebar</SidebarMain>
        <SidebarMain>Second Sidebar</SidebarMain>
      </SidebarProvider>,
    );

    expect(warnSpy).toHaveBeenCalledWith(
      "Multiple sidebars detected. Please ensure only one sidebar is mounted at a time.",
    );
  });

  it("doesn't warn if multiple sidebars are mounted in production mode", () => {
    vi.stubEnv("NODE_ENV", "production");

    render(
      <SidebarProvider>
        <SidebarMain>asdfjkl;</SidebarMain>
        <SidebarMain>asdfjkl;</SidebarMain>
      </SidebarProvider>,
    );

    expect(warnSpy).not.toHaveBeenCalledWith(
      "Multiple sidebars detected. Please ensure only one sidebar is mounted at a time.",
    );
  });
});
