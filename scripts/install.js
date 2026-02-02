const fs = require('fs');
const path = require('path');

const DIST_DIR = path.join(__dirname, '..', 'dist');

function getOpenCodeDir(isGlobal) {
  if (isGlobal) {
    const configHome = process.env.XDG_CONFIG_HOME || path.join(process.env.HOME, '.config');
    return path.join(configHome, 'opencode');
  } else {
    return path.join(process.cwd(), '.opencode');
  }
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

function install(isGlobal = true) {
  const openCodeDir = getOpenCodeDir(isGlobal);
  const skillsDir = path.join(openCodeDir, 'skills');
  const commandsDir = path.join(openCodeDir, 'commands');

  if (!fs.existsSync(DIST_DIR)) {
    console.error('❌ dist directory not found. Run "npm run build" first.');
    process.exit(1);
  }

  console.log(`📦 Installing intellisearch ${isGlobal ? 'globally' : 'locally'}...`);
  console.log(`   Target: ${openCodeDir}`);
  console.log('');

  if (!fs.existsSync(openCodeDir)) {
    fs.mkdirSync(openCodeDir, { recursive: true });
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
    fs.mkdirSync(commandsDir, { recursive: true });
    const commandFiles = fs.readdirSync(distCommandsDir);
    commandFiles.forEach(file => {
      fs.copyFileSync(path.join(distCommandsDir, file), path.join(commandsDir, file));
    });
    console.log('   ✓ Commands installed');
  }

  console.log('');
  console.log('✅ Installation successful!');
  console.log('');
  console.log(`🎉 intellisearch is ready to use in ${isGlobal ? 'global' : 'local'} OpenCode configuration.`);
}

const isGlobal = !process.env.npm_config_local;
install(isGlobal);
