import { copyFile, mkdir, readdir, stat } from "fs/promises";
import path from "path";

export async function copyDirectoryAsync(src: string, dest: string): Promise<void> {
  const entries = await readdir(src, { withFileTypes: true });

  if (!(await exists(dest))) {
    await mkdir(dest, { recursive: true });
  }

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      await copyDirectoryAsync(srcPath, destPath);
    } else {
      await copyFile(srcPath, destPath);
    }
  }
}

async function exists(filePath: string): Promise<boolean> {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

export function getOpenCodeDir(isLocal: boolean): string {
  if (isLocal) {
    return path.join(process.cwd(), ".opencode");
  }

  const configDir = process.env.OPENCODE_CONFIG_DIR ||
    process.env.XDG_CONFIG_HOME ||
    path.join(process.env.HOME || process.env.USERPROFILE || "", ".config");
  return path.join(configDir, "opencode");
}
