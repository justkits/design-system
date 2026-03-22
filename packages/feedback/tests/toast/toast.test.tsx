import { act, fireEvent, render } from "@testing-library/react";

import { toast } from "@/toast/manager";
import { toastPositions } from "@/toast/types";
import { TestComponent } from "./_setup";

describe("Toaster - toast", () => {
  it("should render all types of toasts", () => {
    vi.useFakeTimers();

    const { getByText } = render(<TestComponent />);

    act(() => {
      toast.info("Info Toast");
      toast.success("Success Toast");
      toast.warning("Warning Toast");
      toast.error("Error Toast");
    });

    expect(getByText("Info Toast")).toBeTruthy();
    expect(getByText("Success Toast")).toBeTruthy();
    expect(getByText("Warning Toast")).toBeTruthy();
    expect(getByText("Error Toast")).toBeTruthy();
  });

  it("should remove toast from queue on dismiss", () => {
    const { getByText, queryByText } = render(<TestComponent />);

    act(() => {
      toast.info("Dismissable Toast", { duration: 5000 });
    });

    const toastElement = getByText("Dismissable Toast");
    expect(toastElement).toBeTruthy();

    act(() => {
      const dismissButton = getByText("Dismiss");
      fireEvent.click(dismissButton);
    });

    expect(queryByText("Dismissable Toast")).toBeNull();
  });

  it("should queue toast when Toaster is not mounted and flush on mount", () => {
    const consoleWarnSpy = vi
      .spyOn(console, "warn")
      .mockImplementation(() => {});

    toast.info("Queued Toast");

    expect(consoleWarnSpy).not.toHaveBeenCalled();
    consoleWarnSpy.mockRestore();

    // Mount Toaster after queuing — queued toast should be flushed immediately
    const { getByText } = render(<TestComponent />);
    expect(getByText("Queued Toast")).toBeTruthy();
  });

  it("should warn if duration is invalid", () => {
    const consoleWarnSpy = vi
      .spyOn(console, "warn")
      .mockImplementation(() => {});

    toast.info("Invalid Duration Toast", { duration: 0 });

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      "[Toast] duration must be greater than 0. Ignoring toast...",
    );

    consoleWarnSpy.mockRestore();
  });

  it("should not log warning in production environment", () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = "production";

    const consoleWarnSpy = vi
      .spyOn(console, "warn")
      .mockImplementation(() => {});

    toast.info("Invalid Duration Toast", { duration: 0 });

    expect(consoleWarnSpy).not.toHaveBeenCalled();

    consoleWarnSpy.mockRestore();
    process.env.NODE_ENV = originalEnv;
  });

  it("should accept infinite duration and render the toast", () => {
    const consoleWarnSpy = vi
      .spyOn(console, "warn")
      .mockImplementation(() => {});

    const { getByText } = render(<TestComponent />);

    act(() => {
      toast.info("Infinite Toast", { duration: "infinite" });
    });

    expect(getByText("Infinite Toast")).toBeTruthy();
    expect(consoleWarnSpy).not.toHaveBeenCalled();

    consoleWarnSpy.mockRestore();
  });

  it("should warn and ignore toast if duration is negative", () => {
    const consoleWarnSpy = vi
      .spyOn(console, "warn")
      .mockImplementation(() => {});

    const { queryByText } = render(<TestComponent />);

    act(() => {
      toast.info("Negative Duration Toast", { duration: -1 });
    });

    expect(queryByText("Negative Duration Toast")).toBeNull();
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      "[Toast] duration must be greater than 0. Ignoring toast...",
    );

    consoleWarnSpy.mockRestore();
  });

  it("should render multiple concurrent toasts", () => {
    const { getByText } = render(<TestComponent />);

    act(() => {
      toast.success("First Toast");
      toast.error("Second Toast");
      toast.warning("Third Toast");
    });

    expect(getByText("First Toast")).toBeTruthy();
    expect(getByText("Second Toast")).toBeTruthy();
    expect(getByText("Third Toast")).toBeTruthy();
  });

  it("cornercase - has 6 possible positions", () => {
    expect(Object.keys(toastPositions)).toHaveLength(6);
  });
});
