#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const packageJson = require('../package.json');
const SOURCE_DIR = path.join(__dirname, '..', 'source');
const DIST_DIR = path.join(__dirname, '..', 'dist');

const OPENCODE_CONFIG_DIR = process.env.XDG_CONFIG_HOME || path.join(process.env.HOME, '.config');
const OPENCODE_GLOBAL_DIR = path.join(OPENCODE_CONFIG_DIR, 'opencode');

console.log(`intellisearch v${packageJson.version}\n`);

function showHelp() {
  console.log(`
intellisearch - OpenCode intelligent search extension

USAGE:
  intellisearch <command> [options]

COMMANDS:
  install             Install globally (default: ~/.config/opencode/)
  uninstall           Uninstall globally (from ~/.config/opencode/)
  --help, -h        Show this help message

OPTIONS:
  --local, -l       Install/uninstall in current project (.opencode/)
  --global, -g       Force global install/uninstall (~/.config/opencode/)

EXAMPLES:
  # Install globally (recommended)
  npm install -g opencode-intellisearch
  intellisearch install

  # Install locally (current project)
  npm install opencode-intellisearch
  intellisearch install --local

  # Uninstall globally
  intellisearch uninstall

  # Uninstall locally
  intellisearch uninstall --local

PLUGIN INSTALLATION (Alternative):
  For plugin-based installation, add to ~/.config/opencode/opencode.json:
  {
    "plugin": ["opencode-intellisearch"]
  }
  
  This provides auto-loading and updates via npm.
`);
}

function copyDirectory(src, dest) {
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

function install(isLocal) {
  const targetDir = isLocal ? path.join(process.cwd(), '.opencode') : OPENCODE_GLOBAL_DIR;
  const skillsDir = path.join(targetDir, 'skills');
  const commandsDir = path.join(targetDir, 'commands');

  console.log(`📦 Installing intellisearch ${isLocal ? 'locally' : 'globally'}...`);
  console.log(`   Target: ${targetDir}\n`);

  if (!fs.existsSync(DIST_DIR)) {
    console.error('❌ dist directory not found. Run "npm run build" first.');
    process.exit(1);
  }

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
    copyDirectory(distSkillsDir, skillsDir);
    console.log('   ✓ Skills installed');
  }

  if (fs.existsSync(distCommandsDir)) {
    const commandFiles = fs.readdirSync(distCommandsDir);
    commandFiles.forEach(file => {
      fs.copyFileSync(path.join(distCommandsDir, file), path.join(commandsDir, file));
    });
    console.log('   ✓ Commands installed');
  }

  console.log('');
  console.log('✅ Installation successful!');
  console.log('');
  console.log(`🎉 intellisearch is ready to use in ${isLocal ? 'local' : 'global'} OpenCode configuration.`);
}

function removeDirectory(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
    return true;
  }
  return false;
}

function removeFile(file) {
  if (fs.existsSync(file)) {
    fs.unlinkSync(file);
    return true;
  }
  return false;
}

function uninstall(isLocal) {
  const targetDir = isLocal ? path.join(process.cwd(), '.opencode') : OPENCODE_GLOBAL_DIR;
  const skillsDir = path.join(targetDir, 'skills');
  const commandsDir = path.join(targetDir, 'commands');

  console.log(`🗑️  Uninstalling intellisearch ${isLocal ? 'locally' : 'globally'}...`);
  console.log(`   Target: ${targetDir}\n`);

  const intelliSearchSkillsDir = path.join(skillsDir, 'intellisearch');
  const intelliSearchCommandFile = path.join(commandsDir, 'intellisearch.md');

  const removedSkills = removeDirectory(intelliSearchSkillsDir);
  const removedCommand = removeFile(intelliSearchCommandFile);

  if (removedSkills) {
    console.log('   ✓ Removed skills/intellisearch');
  }

  if (removedCommand) {
    console.log('   ✓ Removed commands/intellisearch.md');
  }

  if (!removedSkills && !removedCommand) {
    console.log('ℹ️  intellisearch not found in OpenCode configuration');
  } else {
    console.log('');
    console.log('✅ Uninstallation complete!');
  }

  console.log('');
  console.log('👋 Thank you for using intellisearch!');
}

const command = process.argv[2];
const isLocal = process.argv.includes('--local') || process.argv.includes('-l');
const isGlobal = process.argv.includes('--global') || process.argv.includes('-g');

if (!command || command === '--help' || command === '-h') {
  showHelp();
} else if (command === 'install') {
  install(isLocal);
} else if (command === 'uninstall') {
  uninstall(isLocal);
} else {
  console.error(`\n❌ Unknown command: ${command}`);
  console.error('Run "intellisearch --help" for usage.\n');
  process.exit(1);
}
