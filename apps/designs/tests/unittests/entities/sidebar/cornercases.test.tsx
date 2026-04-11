import { render, renderHook } from "@testing-library/react";

import { Sidebar, SidebarProvider } from "@entities/sidebar";
import { useInnerSidebar } from "@entities/sidebar/models/context";

describe("Sidebar - Corner Cases", () => {
  it("should warn if Multiple Sidebars are Mounted", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.stubEnv("NODE_ENV", "development");

    render(
      <SidebarProvider>
        <Sidebar />
        <Sidebar />
      </SidebarProvider>,
    );

    expect(warnSpy).toHaveBeenCalledWith(
      "Sidebar is already mounted. Only one Sidebar can be mounted at a time.",
    );
    warnSpy.mockRestore();
    vi.unstubAllEnvs();
  });

  it("should not warn in production even if multiple Sidebars are mounted", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.stubEnv("NODE_ENV", "production");

    render(
      <SidebarProvider>
        <Sidebar />
        <Sidebar />
      </SidebarProvider>,
    );

    expect(warnSpy).not.toHaveBeenCalled();
    warnSpy.mockRestore();
    vi.unstubAllEnvs();
  });

  it("should throw if Sidebar is mounted without Provider", () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => render(<Sidebar />)).toThrow(
      "Sidebar must be used within a SidebarProvider",
    );

    errorSpy.mockRestore();
  });

  it("should throw if useInnerSidebar is called without Provider", () => {
    expect(() => renderHook(() => useInnerSidebar())).toThrow(
      "useInnerSidebar must be used within SidebarProvider.",
    );
  });
});
