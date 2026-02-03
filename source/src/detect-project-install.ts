import fs from "fs";
import path from "path";

export function detectProjectInstall(): boolean {
  let dir = process.cwd();
  while (dir !== path.dirname(dir)) {
    if (fs.existsSync(path.join(dir, "package.json"))) {
      return true;
    }
    dir = path.dirname(dir);
  }
  return false;
}
