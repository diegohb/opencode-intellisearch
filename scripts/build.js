const fs = require('fs');
const path = require('path');
const { detectPackageManager } = require('./detect-pm');

const SOURCE_DIR = path.join(__dirname, '..', 'source');
const DIST_DIR = path.join(__dirname, '..', 'dist');
const ROOT_DIR = path.join(__dirname, '..');

const pm = detectPackageManager();

console.log('🔨 Building intellisearch...');
console.log(`📦 Using package manager: ${pm}`);

// Ensure dist directory exists
if (!fs.existsSync(DIST_DIR)) {
  fs.mkdirSync(DIST_DIR, { recursive: true });
}

// Copy source files to dist
function copyDirectory(src, dest) {
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

// Copy plugin entry point
const indexSrc = path.join(ROOT_DIR, 'index.js');
const indexDest = path.join(DIST_DIR, 'index.js');
if (fs.existsSync(indexSrc)) {
  fs.copyFileSync(indexSrc, indexDest);
  console.log(`   ✓ index.js (plugin entry)`);
}

// Copy all contents from source to dist
console.log('');
console.log('Copying files from source/ to dist/...');
copyDirectory(SOURCE_DIR, DIST_DIR);

console.log('');
console.log('✅ Build complete!');
console.log('');
console.log('📦 Distribution files created in dist/');
console.log('');
console.log('📝 Next steps:');
console.log(`   - bun install -g .  (install globally for plugin method)`);
console.log(`   - bun install .  (install locally for plugin method)`);
console.log(`   - ${pm === 'bun' ? 'bunx' : 'npx'} intellisearch install  (manual method)`);
