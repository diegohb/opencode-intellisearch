import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { detectPackageManager } from './detect-pm.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCE_DIR = path.join(__dirname, '..', '..', 'source');
const DIST_DIR = path.join(__dirname, '..');

const pm = detectPackageManager();

console.log('🔨 Building intellisearch...');
console.log(`📦 Using package manager: ${pm}`);

function copyDirectory(src: string, dest: string): void {
  const entries = fs.readdirSync(src, { withFileTypes: true });

  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath);
      console.log(`   ✓ ${entry.name}/`);
    } else {
      fs.copyFileSync(srcPath, destPath);
      console.log(`   ✓ ${entry.name}`);
    }
  }
}

if (fs.existsSync(SOURCE_DIR)) {
  copyDirectory(SOURCE_DIR, DIST_DIR);
}

const ROOT_DIR = path.join(__dirname, '..', '..');
const packageJsonSrc = path.join(ROOT_DIR, 'package.json');
const packageJsonDest = path.join(DIST_DIR, 'package.json');

if (fs.existsSync(packageJsonSrc)) {
  fs.copyFileSync(packageJsonSrc, packageJsonDest);
  console.log('   ✓ package.json');
}

if (fs.existsSync(SOURCE_DIR)) {
  console.log('');
  console.log('✅ Build complete!');
  console.log('');
  console.log('📦 Distribution files created in dist/');
  console.log('');
  console.log('📝 Next steps:');
  console.log(`   - bun install -g .  (install globally for plugin method)`);
  console.log(`   - bun install .  (install locally for plugin method)`);
  console.log(`   - ${pm === 'bun' ? 'bunx' : 'npx'} intellisearch install  (manual method)`);
} else {
  console.log('⚠️  source/ directory not found. Skipping file copy.');
  console.log('   Run "npm run build" again after adding source files.');
}
