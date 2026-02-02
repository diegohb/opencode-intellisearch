#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { detectProjectInstall, getOpenCodeDir, installFiles } from './shared.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
  console.error('❌ intellisearch postinstall failed:', (error as Error).message);
  process.exit(0);
}
