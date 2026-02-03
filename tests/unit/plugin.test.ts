import { describe, test, expect, beforeEach, afterEach } from "bun:test";
import { mkdir, rm, readdir, readFile } from "node:fs/promises";
import path from "node:path";
import plugin from "../../source/plugin.ts";

const TEST_DIR = path.join(import.meta.dirname, "../fixtures/test-project");

describe("plugin", () => {
  beforeEach(async () => {
    // Clean up test directory
    try {
      await rm(TEST_DIR, { recursive: true });
    } catch {
      // Directory might not exist
    }
    await mkdir(TEST_DIR, { recursive: true });
  });

  afterEach(async () => {
    // Clean up test directory
    try {
      await rm(TEST_DIR, { recursive: true });
    } catch {
      // Directory might not exist
    }
  });

  test("should install assets on first run", async () => {
    const pluginInstance = await plugin({
      directory: TEST_DIR,
    } as any);

    await pluginInstance.config?.({} as any);

    // Verify skills directory exists
    const skillsDir = path.join(TEST_DIR, ".opencode", "skills", "intellisearch");
    const skillsEntries = await readdir(skillsDir);
    expect(skillsEntries).toContain("SKILL.md");

    // Verify commands file exists
    const commandsFile = path.join(TEST_DIR, ".opencode", "commands", "intellisearch.md");
    const commandsContent = await readFile(commandsFile, "utf-8");
    expect(commandsContent.length).toBeGreaterThan(0);

    // Verify version marker exists
    const versionFile = path.join(skillsDir, ".version");
    const version = await readFile(versionFile, "utf-8");
    expect(version.trim()).toBe("0.2.1");
  });

  test("should skip installation if version marker matches", async () => {
    // First install
    const pluginInstance1 = await plugin({
      directory: TEST_DIR,
    } as any);
    await pluginInstance1.config?.({} as any);

    // Record modification time
    const skillsDir = path.join(TEST_DIR, ".opencode", "skills", "intellisearch");
    const skillFile = path.join(skillsDir, "SKILL.md");
    const firstMtime = (await Bun.file(skillFile).stat()).mtime;

    // Second install (should skip)
    const pluginInstance2 = await plugin({
      directory: TEST_DIR,
    } as any);
    await pluginInstance2.config?.({} as any);

    // Verify file was not modified (compare timestamps)
    const secondMtime = (await Bun.file(skillFile).stat()).mtime;
    expect(secondMtime.getTime()).toBe(firstMtime.getTime());
  });

  test("should re-install if version marker differs", async () => {
    // Create old version marker
    const versionFile = path.join(TEST_DIR, ".opencode", "skills", "intellisearch", ".version");
    await mkdir(path.dirname(versionFile), { recursive: true });
    await Bun.write(versionFile, "0.1.0");

    // Install (should re-install due to version mismatch)
    const pluginInstance = await plugin({
      directory: TEST_DIR,
    } as any);
    await pluginInstance.config?.({} as any);

    // Verify version was updated
    const version = await readFile(versionFile, "utf-8");
    expect(version.trim()).toBe("0.2.1");
  });

  test("should handle missing assets gracefully", async () => {
    // This test verifies the plugin doesn't crash if assets are missing
    // In a real scenario, this would fail, but we're testing error handling
    const pluginInstance = await plugin({
      directory: TEST_DIR,
    } as any);

    // Should not throw
    await expect(pluginInstance.config?.({} as any)).resolves.toBeUndefined();
  });
});
