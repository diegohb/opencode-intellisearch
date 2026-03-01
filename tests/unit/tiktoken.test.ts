import { describe, test, expect } from "bun:test";
import { getEncoding, encodingForModel } from "js-tiktoken";

describe("js-tiktoken", () => {
  test("getEncoding gpt2 counts basic tokens", () => {
    const enc = getEncoding("gpt2");
    const tokens = enc.encode("hello world");
    expect(tokens.length).toBe(2);
  });

  test("getEncoding cl100k_base handles modern text", () => {
    const enc = getEncoding("cl100k_base");
    const tokens = enc.encode("The quick brown fox jumps over the lazy dog.");
    expect(tokens.length).toBeGreaterThan(0);
    expect(tokens.length).toBeLessThan(20);
  });

  test("encodingForModel gpt-4 matches cl100k_base", () => {
    const enc = encodingForModel("gpt-4");
    const text = "function hello() { return 'world'; }";
    const tokens = enc.encode(text);
    expect(tokens.length).toBeGreaterThan(5);
    expect(tokens.length).toBeLessThan(15);
  });

  test("empty string returns zero tokens", () => {
    const enc = getEncoding("cl100k_base");
    const tokens = enc.encode("");
    expect(tokens.length).toBe(0);
  });

  test("handles code with special characters", () => {
    const enc = getEncoding("cl100k_base");
    const code = `const x = { key: "value", num: 123 };`;
    const tokens = enc.encode(code);
    expect(tokens.length).toBeGreaterThan(0);
  });

  test("handles multiline text", () => {
    const enc = getEncoding("cl100k_base");
    const text = `Line 1
Line 2
Line 3`;
    const tokens = enc.encode(text);
    expect(tokens.length).toBeGreaterThan(0);
  });

  test("approximate token count for markdown", () => {
    const enc = getEncoding("cl100k_base");
    const markdown = `# Heading
    
This is a paragraph with **bold** and *italic* text.

- List item 1
- List item 2
`;
    const tokens = enc.encode(markdown);
    expect(tokens.length).toBeGreaterThan(10);
    expect(tokens.length).toBeLessThan(50);
  });
});
