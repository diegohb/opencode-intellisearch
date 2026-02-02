const fs = require('fs');
const path = require('path');

function getOpenCodeDir(isGlobal) {
  if (isGlobal) {
    const configHome = process.env.XDG_CONFIG_HOME || path.join(process.env.HOME, '.config');
    return path.join(configHome, 'opencode');
  } else {
    return path.join(process.cwd(), '.opencode');
  }
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

function uninstall(isGlobal = true) {
  const openCodeDir = getOpenCodeDir(isGlobal);
  const skillsDir = path.join(openCodeDir, 'skills');
  const commandsDir = path.join(openCodeDir, 'commands');

  console.log('🗑️  Uninstalling intellisearch...');
  console.log('');

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

const isGlobal = !process.env.npm_config_local;
uninstall(isGlobal);
