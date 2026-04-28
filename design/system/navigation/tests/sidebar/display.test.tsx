import { fireEvent, render } from "@testing-library/react";

import { TestPageSidebar, TestSectionLink, TestSidebar } from "./_setup";

describe("Sidebar - display", () => {
  it("renders and handles toggle correctly", () => {
    const { getByTestId, getByText } = render(<TestSidebar />);

    // SidebarContent의 기본 태그는 aside
    expect(getByTestId("sidebar-content").tagName).toBe("ASIDE");

    const toggle = getByText("Toggle Sidebar");
    expect(getByText("Header")).toBeTruthy();
    expect(getByText("Link 1")).toBeTruthy();
    expect(getByText("Link 2")).toBeTruthy();
    expect(getByText("Footer")).toBeTruthy();

    // 클릭하면 width가 0으로 줄어든다.
    fireEvent.click(toggle);
    expect(getByTestId("sidebar-content").style.width).toBe("0px");

    // 다시 클릭하면 width가 늘어난다. (기본값 280)
    fireEvent.click(toggle);
    expect(getByTestId("sidebar-content").style.width).toBe("280px");
  });

  it("renders sidebar as div instead of aside when scope is page", () => {
    const { getByTestId } = render(<TestPageSidebar />);

    // SidebarContent의 기본 태그는 div
    expect(getByTestId("sidebar-content").tagName).toBe("DIV");
  });

  it("renders and handles section link toggle clicks correctly", () => {
    const { getByTestId, getByText } = render(<TestSidebar />);

    const sectionToggle = getByText("Expand Sublinks");
    const sectionContent = getByTestId("section-link-content");
    // 초기에는 서브 링크들이 보이지 않아야 한다.
    expect(sectionContent.dataset.state).toBe("closed");

    // 먼저, 토글 클릭을 테스트 한다.
    fireEvent.click(sectionToggle);
    expect(sectionContent.dataset.state).toBe("open");

    fireEvent.click(sectionToggle);
    expect(sectionContent.dataset.state).toBe("closed");
  });

  describe("Section Link - active state changes", () => {
    it("handles section link clicks while closed correctly", () => {
      const { getByTestId, getByText, rerender } = render(<TestSectionLink />);

      const sectionLink = getByText("Link");
      const sectionContent = getByTestId("section-link-content");
      // 초기에는 서브 링크들이 보이지 않아야 한다.
      expect(sectionContent.dataset.state).toBe("closed");

      // 닫힌 상태에서 링크를 클릭하면, 서브 링크들이 보여야 한다.
      // rerender로 시뮬레이트
      fireEvent.click(sectionLink);
      rerender(<TestSectionLink isActive />);
      expect(sectionContent.dataset.state).toBe("open");

      // 서브링크를 클릭하면 열린 상태가 유지되어야 한다.
      const subLink1 = getByText("Sub Link 1");
      fireEvent.click(subLink1);
      rerender(<TestSectionLink isSubitemActive />);
      expect(sectionContent.dataset.state).toBe("open");
    });

    it("should initially have sublinks open when active", () => {
      const { getByTestId } = render(<TestSectionLink isActive />);

      const sectionContent = getByTestId("section-link-content");
      // 처음부터 열려있어야 한다.
      expect(sectionContent.dataset.state).toBe("open");
    });

    it("should initially have sublinks open when sublink is active", () => {
      const { getByTestId } = render(<TestSectionLink isSubitemActive />);

      const sectionContent = getByTestId("section-link-content");
      // 처음부터 열려있어야 한다.
      expect(sectionContent.dataset.state).toBe("open");
    });
  });
});
