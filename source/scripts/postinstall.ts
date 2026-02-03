#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { detectProjectInstall } from "../src/detect-project-install.js";
import { getOpenCodeDir } from "../src/utils.js";
import { copyDirectory } from "./shared.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.join(__dirname, "..", "..", "dist");

try {
  const isLocal = detectProjectInstall();
  const targetDir = getOpenCodeDir(isLocal);

  console.log("🔧 intellisearch postinstall: Installing skills and commands...");
  console.log(`   Target: ${targetDir}`);

  if (!fs.existsSync(DIST_DIR)) {
    console.warn('⚠️  dist directory not found. Skipping installation.');
    console.warn('   Run "npm run build" first.');
    process.exit(0);
  }

  const assetsDir = path.join(DIST_DIR, "assets");
  if (!fs.existsSync(assetsDir)) {
    console.warn('⚠️  assets directory not found in dist/. Skipping installation.');
    process.exit(0);
  }

  // Copy skills
  const sourceSkillsDir = path.join(assetsDir, "skills", "intellisearch");
  const targetSkillsDir = path.join(targetDir, "skills", "intellisearch");
  
  if (fs.existsSync(sourceSkillsDir)) {
    copyDirectory(sourceSkillsDir, targetSkillsDir);
    console.log("   ✓ Skills installed");
  }

  // Copy command
  const sourceCommandFile = path.join(assetsDir, "commands", "intellisearch.md");
  const targetCommandFile = path.join(targetDir, "commands", "intellisearch.md");
  
  if (fs.existsSync(sourceCommandFile)) {
    fs.copyFileSync(sourceCommandFile, targetCommandFile);
    console.log("   ✓ Commands installed");
  }

  console.log("✅ intellisearch installation complete!");
} catch (error) {
  console.error("❌ intellisearch postinstall failed:", (error as Error).message);
  process.exit(0);
}
