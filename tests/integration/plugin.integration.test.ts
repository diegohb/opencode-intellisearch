import { describe, test, expect, beforeAll, afterAll } from "bun:test";
import { mkdir, rm, readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import plugin from "../../plugin.ts";

const TEST_PROJECT_DIR = path.join(import.meta.dirname, "../fixtures/integration-test-project");

describe("integration", () => {
  beforeAll(async () => {
    // Clean up and create fresh test project
    try {
      await rm(TEST_PROJECT_DIR, { recursive: true });
    } catch {
      // Directory might not exist
    }
    await mkdir(TEST_PROJECT_DIR, { recursive: true });
  });

  afterAll(async () => {
    // Clean up test project
    try {
      await rm(TEST_PROJECT_DIR, { recursive: true });
    } catch {
      // Directory might not exist
    }
  });

  describe("plugin installation", () => {
    test("should create complete .opencode structure", async () => {
      const pluginInstance = await plugin({
        directory: TEST_PROJECT_DIR,
      } as any);

      await pluginInstance.config?.();

      // Verify directory structure
      const opencodeDir = path.join(TEST_PROJECT_DIR, ".opencode");
      const entries = await readdir(opencodeDir);
      expect(entries).toContain("skills");
      expect(entries).toContain("commands");

      // Verify skills subdirectory
      const skillsDir = path.join(opencodeDir, "skills", "intellisearch");
      const skillEntries = await readdir(skillsDir);
      expect(skillEntries).toContain("SKILL.md");
      expect(skillEntries).toContain(".version");

      // Verify commands file
      const commandsFile = path.join(opencodeDir, "commands", "intellisearch.md");
      const commandsStats = await stat(commandsFile);
      expect(commandsStats.isFile()).toBe(true);
    });

    test("should copy skill files correctly", async () => {
      const pluginInstance = await plugin({
        directory: TEST_PROJECT_DIR,
      } as any);

      await pluginInstance.config?.();

      // Verify skill file content
      const skillFile = path.join(TEST_PROJECT_DIR, ".opencode", "skills", "intellisearch", "SKILL.md");
      const skillContent = await readFile(skillFile, "utf-8");
      
      // Should have frontmatter
      expect(skillContent).toContain("---");
      expect(skillContent).toContain("name:");
      expect(skillContent).toContain("description:");
      
      // Should have content
      expect(skillContent.length).toBeGreaterThan(100);
    });

    test("should copy command file correctly", async () => {
      const pluginInstance = await plugin({
        directory: TEST_PROJECT_DIR,
      } as any);

      await pluginInstance.config?.();

      // Verify command file content
      const commandFile = path.join(TEST_PROJECT_DIR, ".opencode", "commands", "intellisearch.md");
      const commandContent = await readFile(commandFile, "utf-8");
      
      // Should have frontmatter
      expect(commandContent).toContain("---");
      expect(commandContent).toContain("description:");
      expect(commandContent).toContain("temperature:");
      
      // Should have command template
      expect(commandContent.length).toBeGreaterThan(500);
    });
  });

  describe("version management", () => {
    test("should create correct version marker", async () => {
      const pluginInstance = await plugin({
        directory: TEST_PROJECT_DIR,
      } as any);

      await pluginInstance.config?.();

      const versionFile = path.join(TEST_PROJECT_DIR, ".opencode", "skills", "intellisearch", ".version");
      const version = await readFile(versionFile, "utf-8");
      
      // Should match current version
      expect(version.trim()).toBe("0.2.0");
    });

    test("should not overwrite files when version matches", async () => {
      // First install
      const pluginInstance1 = await plugin({
        directory: TEST_PROJECT_DIR,
      } as any);
      await pluginInstance1.config?.();

      // Get file stats after first install
      const skillFile = path.join(TEST_PROJECT_DIR, ".opencode", "skills", "intellisearch", "SKILL.md");
      const firstStats = await stat(skillFile);

      // Second install (should skip)
      const pluginInstance2 = await plugin({
        directory: TEST_PROJECT_DIR,
      } as any);
      await pluginInstance2.config?.();

      // Get file stats after second install
      const secondStats = await stat(skillFile);

      // File should not have been modified (compare timestamps)
      expect(secondStats.mtime.getTime()).toBe(firstStats.mtime.getTime());
    });
  });

  describe("cross-platform compatibility", () => {
    test("should use correct path separators", async () => {
      const pluginInstance = await plugin({
        directory: TEST_PROJECT_DIR,
      } as any);

      await pluginInstance.config?.();

      // Verify paths were created correctly
      // This implicitly tests path.join works correctly
      const skillsExist = await stat(path.join(TEST_PROJECT_DIR, ".opencode", "skills", "intellisearch"))
        .then(() => true)
        .catch(() => false);
      
      const commandsExist = await stat(path.join(TEST_PROJECT_DIR, ".opencode", "commands", "intellisearch.md"))
        .then(() => true)
        .catch(() => false);

      expect(skillsExist).toBe(true);
      expect(commandsExist).toBe(true);
    });
  });
});
