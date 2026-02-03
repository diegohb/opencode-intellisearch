import { copyFile, mkdir, readFile as fsReadFile, stat, writeFile as fsWriteFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { detectProjectInstall } from "./detect-project-install.js";
import { copyDirectoryAsync, getOpenCodeDir } from "./utils.js";

const VERSION = "0.1.2";

interface PluginContext {
  directory: string;
  client: {
    app: {
      log: (opts: { service: string; level: string; message: string }) => Promise<void>;
    };
  };
}

interface Hooks {
  config?: () => Promise<void>;
}

export default async function intellisearchPlugin({ client }: PluginContext): Promise<{ hooks: Hooks }> {
  return {
    hooks: {
      config: async () => {
        const isLocal = detectProjectInstall();
        const targetDir = getOpenCodeDir(isLocal);
        
        const skillsDir = path.join(targetDir, "skills");
        const commandsDir = path.join(targetDir, "commands");
        const targetIntelliSearchDir = path.join(skillsDir, "intellisearch");
        const targetCommandFile = path.join(commandsDir, "intellisearch.md");
        const markerFile = path.join(targetIntelliSearchDir, ".intellisearch-version");
        
        // Check if already installed with correct version
        try {
          const markerContent = await fsReadFile(markerFile, { encoding: "utf-8" });
          if (markerContent.trim() === VERSION) {
            await client.app.log({
              service: "intellisearch",
              level: "info",
              message: `intellisearch v${VERSION} already installed`
            });
            return;
          }
        } catch {
          // Not installed yet, proceed with installation
        }
        
        await client.app.log({
          service: "intellisearch",
          level: "info",
          message: `Installing intellisearch v${VERSION} to ${isLocal ? "local" : "global"} .opencode/`
        });
        
        // Create target directories
        await mkdir(skillsDir, { recursive: true });
        await mkdir(commandsDir, { recursive: true });
        await mkdir(targetIntelliSearchDir, { recursive: true });
        
        // Source directories (from npm package in cache)
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const sourceSkillsDir = path.join(__dirname, "..", "assets", "skills", "intellisearch");
        const sourceCommandFile = path.join(__dirname, "..", "assets", "commands", "intellisearch.md");
        
        // Check source files exist
        try {
          await stat(sourceSkillsDir);
        } catch {
          await client.app.log({
            service: "intellisearch",
            level: "error",
            message: "Source skills directory not found in package"
          });
          return;
        }
        
        try {
          await stat(sourceCommandFile);
        } catch {
          await client.app.log({
            service: "intellisearch",
            level: "error",
            message: "Source command file not found in package"
          });
          return;
        }
        
        // Copy skills
        await copyDirectoryAsync(sourceSkillsDir, targetIntelliSearchDir);
        await client.app.log({
          service: "intellisearch",
          level: "info",
          message: "Skills copied successfully"
        });
        
        // Copy command
        await copyFile(sourceCommandFile, targetCommandFile);
        await client.app.log({
          service: "intellisearch",
          level: "info",
          message: "Command copied successfully"
        });
        
        // Write version marker
        await fsWriteFile(markerFile, VERSION, { encoding: "utf-8" });
        
        await client.app.log({
          service: "intellisearch",
          level: "info",
          message: `Installation complete to ${targetDir}`
        });
      }
    }
  };
}
