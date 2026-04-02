import { render } from "@testing-library/react";

import { Code, Quote, Text } from "@/Texts";

describe("Code", () => {
  it("renders block code correctly", () => {
    const { getByText } = render(
      <Code variant="block">console.log('Hello World');</Code>,
    );
    const element = getByText("console.log('Hello World');");
    expect(element.tagName).toBe("PRE");
  });

  it("renders inline code correctly", () => {
    const { getByText } = render(<Code variant="inline">const x = 10;</Code>);
    const element = getByText("const x = 10;");
    expect(element.tagName).toBe("CODE");
  });

  it("renders keyboard code correctly", () => {
    const { getByText } = render(<Code variant="keyboard">Ctrl + C</Code>);
    const element = getByText("Ctrl + C");
    expect(element.tagName).toBe("KBD");
  });

  it("renders sample code correctly", () => {
    const { getByText } = render(<Code variant="sample">Sample Text</Code>);
    const element = getByText("Sample Text");
    expect(element.tagName).toBe("SAMP");
  });
});

describe("Quote", () => {
  it("renders block quote correctly", () => {
    const { getByText } = render(
      <Quote variant="block">
        "The only limit to our realization of tomorrow is our doubts of today."
      </Quote>,
    );
    const element = getByText(
      '"The only limit to our realization of tomorrow is our doubts of today."',
    );
    expect(element.tagName).toBe("BLOCKQUOTE");
  });

  it("renders inline quote correctly", () => {
    const { getByText } = render(
      <Quote variant="inline">
        "The only limit to our realization of tomorrow is our doubts of today."
      </Quote>,
    );
    const element = getByText(
      '"The only limit to our realization of tomorrow is our doubts of today."',
    );
    expect(element.tagName).toBe("Q");
  });

  it("renders citation correctly", () => {
    const { getByText } = render(
      <Quote variant="citation">Albert Einstein</Quote>,
    );
    const element = getByText("Albert Einstein");
    expect(element.tagName).toBe("CITE");
  });
});

describe("Text", () => {
  it("renders hero text correctly", () => {
    const { getByText } = render(<Text variant="hero">Hello World</Text>);
    const element = getByText("Hello World");
    expect(element.tagName).toBe("H1");
  });

  it("renders titleLarge text as h1 correctly", () => {
    const { getByText } = render(
      <Text variant="titleLarge" as="h1">
        Hello World
      </Text>,
    );
    const element = getByText("Hello World");
    expect(element.tagName).toBe("H1");
  });
});
