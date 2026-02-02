#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { detectProjectInstall, getOpenCodeDir, installFiles } = require('./shared');

const DIST_DIR = path.join(__dirname, '..', 'dist');

try {
  const isLocal = detectProjectInstall();
  const targetDir = getOpenCodeDir(isLocal);

  console.log('🔧 intellisearch postinstall: Installing skills and commands...');
  console.log(`   Target: ${targetDir}`);

  if (!fs.existsSync(DIST_DIR)) {
    console.warn('⚠️  dist directory not found. Skipping installation.');
    console.warn('   Run "npm run build" first.');
    process.exit(0);
  }

  installFiles(DIST_DIR, targetDir);

  console.log('✅ intellisearch installation complete!');
} catch (error) {
  console.error('❌ intellisearch postinstall failed:', error.message);
  process.exit(0);
}
