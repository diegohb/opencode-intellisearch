import fs from 'fs';
import path from 'path';

export function detectProjectInstall(): boolean {
  let dir = process.cwd();
  while (dir !== path.dirname(dir)) {
    if (fs.existsSync(path.join(dir, 'package.json'))) {
      return true;
    }
    dir = path.dirname(dir);
  }
  return false;
}

export function getOpenCodeDir(isLocal: boolean): string {
  if (isLocal) {
    return path.join(process.cwd(), '.opencode');
  }

  const configDir = process.env.OPENCODE_CONFIG_DIR ||
    process.env.XDG_CONFIG_HOME ||
    path.join(process.env.HOME || process.env.USERPROFILE || '', '.config');
  return path.join(configDir, 'opencode');
}

export function copyDirectory(src: string, dest: string): void {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

export function createSymlink(src: string, dest: string): boolean {
  try {
    fs.symlinkSync(src, dest, 'dir');
    return true;
  } catch {
    return false;
  }
}

export function removeDirectory(dir: string): boolean {
  if (fs.existsSync(dir)) {
    try {
      fs.rmSync(dir, { recursive: true, force: true });
      return true;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        return false;
      }
      throw error;
    }
  }
  return false;
}

export function removeFile(file: string): boolean {
  if (fs.existsSync(file)) {
    try {
      fs.unlinkSync(file);
      return true;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        return false;
      }
      throw error;
    }
  }
  return false;
}

export function installFiles(DIST_DIR: string, targetDir: string): void {
  const skillsDir = path.join(targetDir, 'skills');
  const commandsDir = path.join(targetDir, 'commands');

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  if (!fs.existsSync(skillsDir)) {
    fs.mkdirSync(skillsDir, { recursive: true });
  }

  if (!fs.existsSync(commandsDir)) {
    fs.mkdirSync(commandsDir, { recursive: true });
  }

  const distSkillsDir = path.join(DIST_DIR, 'skills');
  const distCommandsDir = path.join(DIST_DIR, 'commands');

  if (fs.existsSync(distSkillsDir)) {
    const skillsTarget = path.join(skillsDir, 'intellisearch');

    if (fs.existsSync(skillsTarget)) {
      fs.rmSync(skillsTarget, { recursive: true, force: true });
    }

    const symlinkSuccess = createSymlink(distSkillsDir, skillsTarget);

    if (!symlinkSuccess) {
      copyDirectory(distSkillsDir, skillsTarget);
    }
  }

  if (fs.existsSync(distCommandsDir)) {
    const commandFiles = fs.readdirSync(distCommandsDir);
    for (const file of commandFiles) {
      const srcPath = path.join(distCommandsDir, file);
      const destPath = path.join(commandsDir, file);

      if (fs.existsSync(destPath)) {
        fs.unlinkSync(destPath);
      }

      const symlinkSuccess = createSymlink(srcPath, destPath);

      if (!symlinkSuccess) {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }
}
