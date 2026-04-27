import * as fs from "node:fs";

import { Scanner } from "@/scanner/manager";

describe("Scanner", () => {
  const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

  afterEach(() => {
    logSpy.mockClear();
    warnSpy.mockClear();
  });

  it("should scan contents directory and build manifest correctly", () => {
    const scanner = new Scanner({
      contentsDir: "test-contents",
      outputDir: "test-output",
      baseUrl: "/docs",
    });

    scanner.run();

    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        "✅ [Justkits Docs] Manifest generated successfully",
      ),
    );
  });

  it("should throw error if contentsDir is outside of current working directory", () => {
    expect(
      () =>
        new Scanner({
          contentsDir: "../outside-contents",
          outputDir: "test-output",
          baseUrl: "/docs",
        }),
    ).toThrow("[Justkits Docs] Invalid contentsDir");
  });

  it("should throw error if outputDir is outside of current working directory", () => {
    expect(
      () =>
        new Scanner({
          contentsDir: "test-contents",
          outputDir: "../outside-output",
          baseUrl: "/docs",
        }),
    ).toThrow("[Justkits Docs] Invalid outputDir");
  });

  it("should create contentsDir and outputDir if they do not exist and run scanner correctly", () => {
    const mkdirMock = vi.fn();
    vi.spyOn(fs, "existsSync").mockImplementation((path) => {
      if (
        path.toString().endsWith("new-contents") ||
        path.toString().endsWith("test-output")
      ) {
        return false;
      }
      return true;
    });
    vi.spyOn(fs, "mkdirSync").mockImplementation(mkdirMock);

    const scanner = new Scanner({
      contentsDir: "new-contents",
      outputDir: "test-output",
      baseUrl: "/docs",
    });

    expect(mkdirMock).toHaveBeenCalledWith(
      expect.stringContaining("new-contents"),
      { recursive: true },
    );

    scanner.run();

    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        "✅ [Justkits Docs] Manifest generated successfully",
      ),
    );

    expect(mkdirMock).toHaveBeenCalledWith(
      expect.stringContaining("test-output"),
      { recursive: true },
    );
  });

  it("should warn if branch or group folders have no children", () => {
    vi.spyOn(fs, "existsSync").mockImplementation((path) => {
      if (path.toString().endsWith("01-Group/index.mdx")) return false;
      return true;
    });
    // @ts-expect-error - 테스트 환경에서 readdirSync의 타입은 간략하게 처리
    vi.spyOn(fs, "readdirSync").mockImplementation((path) => {
      if (path.toString().endsWith("contents")) {
        // 첫번째는 pages
        return [{ name: "page", isDirectory: () => true }];
      }
      if (path.toString().endsWith("page")) {
        // 두번째는 group과 branch
        return [
          { name: "01-Group", isDirectory: () => true },
          { name: "02-Branch", isDirectory: () => true },
        ];
      }
      if (path.toString().endsWith("01-Group")) {
        return [{ name: "index.mdx", isDirectory: () => false }];
      }
      return [];
    });

    const scanner = new Scanner({
      contentsDir: "test-contents",
      outputDir: "test-output",
      baseUrl: "/docs",
    });

    scanner.run();

    expect(warnSpy).toHaveBeenCalledTimes(2);
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        '⚠️ [Justkits Docs] Branch "02-Branch" only has index.mdx and no other children. Consider adding content or converting it to a leaf.',
      ),
    );
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        '⚠️ [Justkits Docs] Group "01-Group" has no children. Consider adding content or converting it to a leaf.',
      ),
    );
  });

  it("should warn if branch has group as child", () => {
    // @ts-expect-error - 테스트 환경에서 readdirSync의 타입은 간략하게 처리
    vi.spyOn(fs, "readdirSync").mockImplementation((path) => {
      if (path.toString().endsWith("contents")) {
        // 첫번째는 pages
        return [{ name: "page", isDirectory: () => true }];
      }
      if (path.toString().endsWith("page")) {
        // 두번째는 group과 branch
        return [{ name: "02-Branch", isDirectory: () => true }];
      }
      if (path.toString().endsWith("02-Branch")) {
        return [
          { name: "01-Group", isDirectory: () => true },
          { name: "index.mdx", isDirectory: () => false },
        ];
      }
      return [{ name: "01-content.mdx", isDirectory: () => false }];
    });

    const scanner = new Scanner({
      contentsDir: "test-contents",
      outputDir: "test-output",
      baseUrl: "/docs",
    });

    scanner.run();

    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        '⚠️ [Justkits Docs] Branch "02-Branch" contains a non-leaf child "Group". Only leaves are allowed inside branches. Skipping.',
      ),
    );
  });

  it("should warn if branch has another branch as child", () => {
    // @ts-expect-error - 테스트 환경에서 readdirSync의 타입은 간략하게 처리
    vi.spyOn(fs, "readdirSync").mockImplementation((path) => {
      if (path.toString().endsWith("contents")) {
        // 첫번째는 pages
        return [{ name: "page", isDirectory: () => true }];
      }
      if (path.toString().endsWith("page")) {
        // 두번째는 group과 branch
        return [{ name: "02-Branch", isDirectory: () => true }];
      }
      if (path.toString().endsWith("02-Branch")) {
        return [
          { name: "01-Group", isDirectory: () => true },
          { name: "index.mdx", isDirectory: () => false },
        ];
      }
      return [
        { name: "01-content.mdx", isDirectory: () => false },
        { name: "index.mdx", isDirectory: () => false },
      ];
    });

    const scanner = new Scanner({
      contentsDir: "test-contents",
      outputDir: "test-output",
      baseUrl: "/docs",
    });

    scanner.run();

    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        '⚠️ [Justkits Docs] Branch "02-Branch" contains a non-leaf child "Group". Only leaves are allowed inside branches. Skipping.',
      ),
    );
  });

  it("should warn if group has another group as child", () => {
    vi.spyOn(fs, "existsSync").mockImplementation((path) => {
      if (path.toString().endsWith("01-Group/index.mdx")) return false;
      if (path.toString().endsWith("01-SubGroup/index.mdx")) return false;
      return true;
    });
    // @ts-expect-error - 테스트 환경에서 readdirSync의 타입은 간략하게 처리
    vi.spyOn(fs, "readdirSync").mockImplementation((path) => {
      if (path.toString().endsWith("contents")) {
        // 첫번째는 pages
        return [{ name: "page", isDirectory: () => true }];
      }
      if (path.toString().endsWith("page")) {
        // 두번째는 group과 branch
        return [{ name: "01-Group", isDirectory: () => true }];
      }
      if (path.toString().endsWith("01-Group")) {
        return [
          { name: "01-SubGroup", isDirectory: () => true },
          { name: "02-content.mdx", isDirectory: () => false },
        ];
      }
      return [{ name: "01-content.mdx", isDirectory: () => false }];
    });

    const scanner = new Scanner({
      contentsDir: "test-contents",
      outputDir: "test-output",
      baseUrl: "/docs",
    });

    scanner.run();

    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        '⚠️ [Justkits Docs] Group "01-Group" contains a nested group "SubGroup". Nested groups are not allowed. Skipping.',
      ),
    );
  });

  it("should throw if dir name does not follow expected format", () => {
    // 숫자-슬러그 형식이어야 한다.
    // @ts-expect-error - 테스트 환경에서 readdirSync의 타입은 간략하게 처리
    vi.spyOn(fs, "readdirSync").mockImplementation((path) => {
      if (path.toString().endsWith("contents")) {
        // 첫번째는 pages
        return [{ name: "page", isDirectory: () => true }];
      }
      if (path.toString().endsWith("page")) {
        // 두번째는 group과 branch
        return [{ name: "Group", isDirectory: () => true }];
      }
      return [];
    });

    const scanner = new Scanner({
      contentsDir: "test-contents",
      outputDir: "test-output",
      baseUrl: "/docs",
    });

    expect(() => scanner.run()).toThrow(
      '[Justkits Docs] Invalid file/folder name "Group": must be in the format "{order}-{slug}" (e.g. "01-introduction.mdx" or "02-getting-started").',
    );
  });

  it("should warn any non-.mdx files", () => {
    // @ts-expect-error - 테스트 환경에서 readdirSync의 타입은 간략하게 처리
    vi.spyOn(fs, "readdirSync").mockImplementation((path) => {
      if (path.toString().endsWith("contents")) {
        // 첫번째는 pages
        return [{ name: "page", isDirectory: () => true }];
      }
      if (path.toString().endsWith("page")) {
        // 두번째는 group과 branch
        return [
          { name: "example.txt", isDirectory: () => false },
          { name: "01-example.mdx", isDirectory: () => false },
        ];
      }
      return [];
    });

    const scanner = new Scanner({
      contentsDir: "test-contents",
      outputDir: "test-output",
      baseUrl: "/docs",
    });

    scanner.run();

    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        '⚠️ [Justkits Docs] Skipping unsupported file "example.txt"',
      ),
    );
    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        "✅ [Justkits Docs] Manifest generated successfully",
      ),
    );
  });
});
