const fs = require('fs');
const path = require('path');

const SOURCE_DIR = path.join(__dirname, '..', 'source');
const DIST_DIR = path.join(__dirname, '..', 'dist');

console.log('🔨 Building intellisearch...');

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
console.log('   - npm run install:global  (install globally)');
console.log('   - npm run install:local   (install locally)');
console.log('   - ./dist/install.sh --help  (install with options)');
