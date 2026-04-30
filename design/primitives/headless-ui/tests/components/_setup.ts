export function setupSSR() {
  const originalWindow = globalThis.window;
  const originalDocument = globalThis.document;

  beforeEach(() => {
    vi.stubGlobal("window", undefined);
    vi.stubGlobal("document", undefined);
  });

  afterEach(() => {
    vi.stubGlobal("window", originalWindow);
    vi.stubGlobal("document", originalDocument);
  });
}
