#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { detectPackageManager } from "../scripts/detect-pm.js";
import { detectProjectInstall } from "../src/detect-project-install.js";
import { getOpenCodeDir } from "../src/utils.js";
import { copyDirectory, createSymlink, removeDirectory, removeFile } from "../scripts/shared.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "..", "package.json"), "utf-8"));
const DIST_DIR = path.join(__dirname, "..");

const pm = detectPackageManager();

console.log(`intellisearch v${packageJson.version}`);
console.log(`Using package manager: ${pm}\n`);

function showHelp(): void {
  console.log(`
intellisearch - OpenCode intelligent search extension

USAGE:
  intellisearch [command] [options]

COMMANDS:
  install             Install files (auto-detects scope, default)
  uninstall           Uninstall files (auto-detects scope)
  --help, -h          Show this help message

OPTIONS:
  --local, -l         Force install/uninstall in current project (.opencode/)
  --global, -g        Force install/uninstall globally (~/.config/opencode/)
  --force, -f         Force reinstall even if already installed

SCOPE DETECTION:
  Automatically detects if installation is in a project:
  - Project install: .opencode/ (detected by package.json in parent directories)
  - Global install: ~/.config/opencode/ (default if not in a project)
  Use --local or --global to override auto-detection.

EXAMPLES:
  # Quick install (npx defaults to install)
  npx opencode-intellisearch

  # Bun equivalent
  bunx opencode-intellisearch

  # Uninstall
  npx opencode-intellisearch uninstall

  # Force reinstall
  npx opencode-intellisearch --force
`);
}

function isInstalled(targetDir: string): boolean {
  const skillsDir = path.join(targetDir, "skills", "intellisearch");
  const commandFile = path.join(targetDir, "commands", "intellisearch.md");
  return fs.existsSync(skillsDir) && fs.existsSync(commandFile);
}

function install(isLocal: boolean, force: boolean): void {
  const targetDir = getOpenCodeDir(isLocal);

  const assetsSkillsDir = path.join(DIST_DIR, "skills", "intellisearch");
  const assetsCommandsDir = path.join(DIST_DIR, "commands");
  
  if (!fs.existsSync(assetsSkillsDir) || !fs.existsSync(assetsCommandsDir)) {
    console.error('❌ dist/skills or dist/commands not found. Run "npm run build" first.');
    process.exit(1);
  }

  if (!force && isInstalled(targetDir)) {
    console.log(`\nℹ️  intellisearch is already installed in ${isLocal ? "local" : "global"} location.`);
    console.log("   Use --force to reinstall.\n");
    return;
  }

  const skillsDir = path.join(targetDir, "skills");
  const commandsDir = path.join(targetDir, "commands");

  console.log(`📦 Installing intellisearch ${isLocal ? "locally" : "globally"}...`);
  console.log(`   Target: ${targetDir}\n`);

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  if (!fs.existsSync(skillsDir)) {
    fs.mkdirSync(skillsDir, { recursive: true });
  }

  if (!fs.existsSync(commandsDir)) {
    fs.mkdirSync(commandsDir, { recursive: true });
  }

  if (fs.existsSync(assetsSkillsDir)) {
    const skillsTarget = path.join(skillsDir, "intellisearch");

    if (fs.existsSync(skillsTarget)) {
      fs.rmSync(skillsTarget, { recursive: true, force: true });
    }

    const symlinkSuccess = createSymlink(assetsSkillsDir, skillsTarget);

    if (symlinkSuccess) {
      console.log("   ✓ Skills installed (symlink)");
    } else {
      copyDirectory(assetsSkillsDir, skillsTarget);
      console.log("   ✓ Skills installed (copy - symlinks not supported)");
    }
  }

  if (fs.existsSync(assetsCommandsDir)) {
    const commandFiles = fs.readdirSync(assetsCommandsDir);
    for (const file of commandFiles) {
      const srcPath = path.join(assetsCommandsDir, file);
      const destPath = path.join(commandsDir, file);

      if (fs.existsSync(destPath)) {
        fs.unlinkSync(destPath);
      }

      const symlinkSuccess = createSymlink(srcPath, destPath);

      if (symlinkSuccess) {
        console.log("   ✓ Commands installed (symlink)");
      } else {
        fs.copyFileSync(srcPath, destPath);
        console.log("   ✓ Commands installed (copy - symlinks not supported)");
      }
    }
  }

  console.log("");
  console.log("✅ Installation successful!");
  console.log("");
  console.log(`🎉 intellisearch is ready to use in ${isLocal ? "local" : "global"} OpenCode configuration.`);
}

function uninstall(isLocal: boolean): void {
  const targetDir = getOpenCodeDir(isLocal);
  const skillsDir = path.join(targetDir, "skills");
  const commandsDir = path.join(targetDir, "commands");

  console.log(`🗑️  Uninstalling intellisearch ${isLocal ? "locally" : "globally"}...`);
  console.log(`   Target: ${targetDir}\n`);

  const intelliSearchSkillsDir = path.join(skillsDir, "intellisearch");
  const intelliSearchCommandFile = path.join(commandsDir, "intellisearch.md");

  const removedSkills = removeDirectory(intelliSearchSkillsDir);
  const removedCommand = removeFile(intelliSearchCommandFile);

  if (removedSkills) {
    console.log("   ✓ Removed skills/intellisearch");
  }

  if (removedCommand) {
    console.log("   ✓ Removed commands/intellisearch.md");
  }

  if (!removedSkills && !removedCommand) {
    console.log("ℹ️  intellisearch not found in OpenCode configuration");
  } else {
    console.log("");
    console.log("✅ Uninstallation complete!");
  }

  console.log("");
  console.log("👋 Thank you for using intellisearch!");
}

const isLocalFlag = process.argv.includes("--local") || process.argv.includes("-l");
const isGlobalFlag = process.argv.includes("--global") || process.argv.includes("-g");
const isForceFlag = process.argv.includes("--force") || process.argv.includes("-f");
const isHelpFlag = process.argv.includes("--help") || process.argv.includes("-h");

let command: string | undefined;

for (let i = 2; i < process.argv.length; i++) {
  const arg = process.argv[i];
  if (!arg.startsWith("-")) {
    command = arg;
    break;
  }
}

command = command || "install";

let isLocal: boolean;

if (isLocalFlag && isGlobalFlag) {
  console.error("\n❌ Cannot specify both --local and --global");
  console.error('Run "intellisearch --help" for usage.\n');
  process.exit(1);
} else if (isLocalFlag) {
  isLocal = true;
} else if (isGlobalFlag) {
  isLocal = false;
} else {
  isLocal = detectProjectInstall();
  console.log(`ℹ️  Auto-detected scope: ${isLocal ? "project (local)" : "global"}\n`);
}

if (isHelpFlag) {
  showHelp();
} else if (command === "install") {
  install(isLocal, isForceFlag);
} else if (command === "uninstall") {
  uninstall(isLocal);
} else {
  console.error(`\n❌ Unknown command: ${command}`);
  console.error('Run "intellisearch --help" for usage.\n');
  process.exit(1);
}
