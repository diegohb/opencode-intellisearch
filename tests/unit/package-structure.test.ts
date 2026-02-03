import { describe, test, expect } from "bun:test";
import { existsSync } from "node:fs";
import path from "node:path";

describe("package structure", () => {
  const repoRoot = path.join(import.meta.dirname, "../..");

  test("should have index.ts at root", () => {
    const indexPath = path.join(repoRoot, "index.ts");
    expect(existsSync(indexPath)).toBe(true);
  });

  test("should have source/plugin.ts", () => {
    const pluginPath = path.join(repoRoot, "source", "plugin.ts");
    expect(existsSync(pluginPath)).toBe(true);
  });

  test("should have assets directory", () => {
    const assetsPath = path.join(repoRoot, "assets");
    expect(existsSync(assetsPath)).toBe(true);
  });

  test("should have assets/skills/intellisearch/SKILL.md", () => {
    const skillPath = path.join(repoRoot, "assets", "skills", "intellisearch", "SKILL.md");
    expect(existsSync(skillPath)).toBe(true);
  });

  test("should have assets/commands/intellisearch.md", () => {
    const commandPath = path.join(repoRoot, "assets", "commands", "intellisearch.md");
    expect(existsSync(commandPath)).toBe(true);
  });

  test("should be able to import index.ts without errors", async () => {
    // This test verifies that the module can be imported successfully
    // If plugin.ts is missing or imports are broken, this will fail
    try {
      const module = await import(path.join(repoRoot, "index.ts"));
      expect(module.default).toBeDefined();
      expect(typeof module.default).toBe("function");
    } catch (error) {
      throw new Error(`Failed to import index.ts: ${error}`);
    }
  });
});
