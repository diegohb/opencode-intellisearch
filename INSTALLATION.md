# Installation Guide

Detailed installation instructions for intellisearch extension for OpenCode.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation Options](#installation-options)
- [Option 1: Plugin (Recommended)](#option-1-plugin-recommended)
- [Option 2: Manual CLI](#option-2-manual-cli)
- [Option 3: Bun Link (Local Development)](#option-3-bun-link-local-development)
- [MCP Server Setup](#mcp-server-setup)
- [Verification](#verification)
- [Uninstallation](#uninstallation)
- [Troubleshooting](#troubleshooting)

## Prerequisites

### Required

- [OpenCode](https://opencode.ai) installed and running
- deepWiki access - Register at [docs.opencod.ai](https://docs.opencod.ai)

### Runtime

- [Bun](https://bun.sh/) (Primary) - Fast JavaScript runtime
- [Node.js](https://nodejs.org/) (Alternative) - Version 18+

### Build Tools

- [TypeScript](https://www.typescriptlang.org/) - Included as dev dependency

## Installation Options

intellisearch offers three installation methods:

| Option | Simplicity | Control | Auto-Update | Local Dev |
|--------|--------------|----------|--------------|-----------|
| 1. Plugin (Recommended) | ⭐⭐⭐ | ⭐ | ⭐⭐⭐ | ⭐ |
| 2. Manual CLI | ⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ |
| 3. Bun Link | ⭐⭐ | ⭐⭐⭐ | ⭐ | ⭐⭐⭐ |

## Option 1: Plugin (Recommended)

**Best for**: Users who want the simplest installation with automatic updates

### Installation Steps

1. Install the package (globally or locally):
   ```bash
   # Global
   bun install -g opencode-intellisearch

   # Local
   cd your-project
   bun install opencode-intellisearch
   ```

2. Add to OpenCode config `~/.config/opencode/opencode.json` or project `opencode.json`:
   ```json
   {
     "$schema": "https://opencode.ai/config.json",
     "plugin": ["opencode-intellisearch"]
   }
   ```

3. Restart OpenCode

### How It Works

- OpenCode loads the plugin directly from `node_modules/`
- No file copying or manual installation needed
- Automatic updates via `bun install -g` or `npm install -g`

### File Locations

- **Global**: `~/.bun/install/global/node_modules/opencode-intellisearch/`
- **Local**: `./node_modules/opencode-intellisearch/`

### Pros & Cons

**Pros:**
- Simplest installation method
- Automatic updates via package manager
- No file copying or configuration
- Follows OpenCode conventions

**Cons:**
- Requires npm/bun publish for updates
- Less control during development

## Option 2: Manual CLI

**Best for**: Users who want full control and files in `.opencode/` directory

### Installation Steps

1. Build the project:
   ```bash
   npm install
   npm run build
   ```

2. Run installation command:
   ```bash
   # Install (auto-detects scope)
   node dist/bin/cli.js install

   # Force project install
   node dist/bin/cli.js install --local

   # Force global install
   node dist/bin/cli.js install --global

   # Uninstall (auto-detects scope)
   node dist/bin/cli.js uninstall

   # Force project uninstall
   node dist/bin/cli.js uninstall --local

   # Force global uninstall
   node dist/bin/cli.js uninstall --global
   ```

### Scope Detection

The CLI automatically detects the installation scope:

- **Project install**: `.opencode/` (detected by `package.json` in parent directories)
- **Global install**: `~/.config/opencode/` (default if not in a project)
- Use `--local` or `--global` to override auto-detection

### Symlink vs Copy

The CLI uses symlinks when possible:

**Symlink (default):**
- Auto-updates on package version bump
- Saves disk space
- Fallback to copy if unsupported (e.g., Windows permissions)

**Copy (fallback):**
- Self-contained
- Works everywhere
- Manual updates needed

### CLI Commands

| Command | Description |
|---------|-------------|
| `install` | Install (auto-detects scope) |
| `install --local` | Force install locally to .opencode/ |
| `install --global` | Force install globally to ~/.config/opencode/ |
| `uninstall` | Uninstall (auto-detects scope) |
| `uninstall --local` | Force uninstall from .opencode/ |
| `uninstall --global` | Force uninstall from ~/.config/opencode/ |

### OPENCODE_CONFIG_DIR Support

The CLI respects the `OPENCODE_CONFIG_DIR` environment variable:

```bash
export OPENCODE_CONFIG_DIR=/path/to/my/config-directory
node dist/bin/cli.js install --global
```

If set, global installs will use this directory instead of `~/.config/opencode/`.

### File Locations

**Global:**
```
~/.config/opencode/
├── skills/
│   └── intellisearch/
│       ├── SKILL.md
│       └── references/
└── commands/
    └── search-intelligently.md
```

**Local:**
```
.opencode/
├── skills/
│   └── intellisearch/
│       ├── SKILL.md
│       └── references/
└── commands/
    └── search-intelligently.md
```

### Pros & Cons

**Pros:**
- Full control over installation
- Explicit file copying verification
- Can use for testing/development
- Clear success/error messages
- Files in `.opencode/` directory

**Cons:**
- Requires building TypeScript first
- Extra step compared to plugin method

## Option 3: Bun Link (Local Development)

**Best for**: Development and testing without publishing to npm

### Installation Steps

1. Build and link locally:
   ```bash
   npm install
   npm run build
   bun link
   ```

2. Use in any project:
   ```bash
   # In your project directory
   bun link opencode-intellisearch

   # Or use directly
   bunx opencode-intellisearch install --local
   ```

### Pros & Cons

**Pros:**
- No npm publish required
- Fast iteration cycle
- Full TypeScript source available
- Easy to modify and test

**Cons:**
- Only works on local machine
- Requires bun to be installed
- Manual update when source changes

## Which Option Should You Choose?

### Choose Plugin (Option 1) If:
- You want the simplest installation
- You want automatic updates via npm/bun
- You don't need files in `.opencode/` directory
- You only use one OpenCode project

### Choose Manual CLI (Option 2) If:
- You want full control over file placement
- You're distributing to users without npm/bun access
- You need files in `.opencode/` directory
- You want to verify file placement

### Choose Bun Link (Option 3) If:
- You're developing or testing the extension
- You need to modify source code frequently
- You don't want to publish to npm for testing
- You need full debugging capabilities

## MCP Server Setup

### deepWiki MCP Server

1. Register at [docs.opencod.ai](https://docs.opencod.ai)

2. Get API key

3. Configure in opencode.json:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcpServers": {
    "deepwiki": {
      "command": "deepwiki",
      "env": {
        "DEEPWIKI_API_KEY": "YOUR_DEEPWIKI_API_KEY"
      }
    }
  }
}
```

4. Restart OpenCode

### Optional: Memory Tool

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcpServers": {
    "memory": {
      "command": "memory-tool"
    }
  }
}
```

## Verification

### Verify Files Are Installed

**Bash:**
```bash
# Global installation
ls -la ~/.config/opencode/skills/intellisearch/
ls -la ~/.config/opencode/commands/search-intelligently.md

# Local installation
ls -la .opencode/skills/intellisearch/
ls -la .opencode/commands/search-intelligently.md
```

**PowerShell:**
```powershell
# Global installation
Get-ChildItem $env:USERPROFILE\.config\opencode\skills\intellisearch
Get-ChildItem $env:USERPROFILE\.config\opencode\commands\search-intelligently.md

# Local installation
Get-ChildItem .opencode\skills\intellisearch
Get-ChildItem .opencode\commands\search-intelligently.md
```

### Test in OpenCode

1. Start OpenCode or restart if already running
2. Open a conversation
3. Run a test query:

```bash
/intellisearch What is intellisearch?
```

4. Verify command appears and executes successfully

### Check MCP Server Status

In OpenCode TUI:
```bash
/mcp status
```

Verify `deepwiki` server is running.

## Uninstallation

### Option 1: Plugin Method

Remove from `~/.config/opencode/opencode.json`:
```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": []
}
```

Or uninstall package:
```bash
bun remove -g opencode-intellisearch
```

### Option 2: Manual Method

**CLI:**
```bash
# Uninstall (auto-detects scope)
node dist/bin/cli.js uninstall

# Force project uninstall
node dist/bin/cli.js uninstall --local

# Force global uninstall
node dist/bin/cli.js uninstall --global
```

**Or Bun:**
```bash
bun remove -g opencode-intellisearch
```

Files are automatically removed from:
- `~/.config/opencode/skills/intellisearch/`
- `~/.config/opencode/commands/search-intelligently.md`
- Or `.opencode/skills/intellisearch/`
- Or `.opencode/commands/search-intelligently.md`

### Manual Removal

If automated removal fails, manually remove files:

**Global (Bash):**
```bash
rm -rf ~/.config/opencode/skills/intellisearch
rm -f ~/.config/opencode/commands/search-intelligently.md
```

**Local (Bash):**
```bash
rm -rf .opencode/skills/intellisearch
rm -f .opencode/commands/search-intelligently.md
```

**Global (PowerShell):**
```powershell
Remove-Item -Recurse -Force $env:USERPROFILE\.config\opencode\skills\intellisearch
Remove-Item -Force $env:USERPROFILE\.config\opencode\commands\search-intelligently.md
```

**Local (PowerShell):**
```powershell
Remove-Item -Recurse -Force .opencode\skills\intellisearch
Remove-Item -Force .opencode\commands\search-intelligently.md
```

## Troubleshooting

### Installation Issues

#### "bun command not found"

Install Bun from [bun.sh](https://bun.sh/):
```bash
curl -fsSL https://bun.sh/install | bash
```

#### "npm command not found"

Install Node.js from [nodejs.org](https://nodejs.org/).

#### "Permission denied" when installing globally

```bash
# Bun
sudo bun install -g opencode-intellisearch

# npm
sudo npm install -g opencode-intellisearch
```

#### "Plugin not found" error

**Check:**
1. Run `bun install -g opencode-intellisearch` to ensure installed
2. Verify it's in `opencode.json` plugin list
3. Restart OpenCode

#### "intellisearch: command not found" error

**Check:**
1. Build first: `npm run build`
2. Use full path: `node dist/bin/cli.js install`
3. On Windows, check that Node.js is in your PATH

#### "Symlink creation failed" warning

This is normal on Windows if symlinks are not enabled:
- The CLI will automatically fall back to copying files
- Both methods work identically from OpenCode's perspective
- To enable symlinks on Windows (requires Developer Mode):
  1. Open "Developer Mode" in Windows Settings
  2. Restart terminal and try again

#### "dist directory not found" error

Build the TypeScript project first:
```bash
npm install
npm run build
```

### MCP Server Issues

#### "deepWiki timeout" errors

1. Verify deepWiki MCP server is running
2. Check DEEPWIKI_API_KEY is set
3. Test deepWiki API directly
4. Restart OpenCode

#### MCP servers not appearing in status

1. Check opencode.json syntax is valid
2. Ensure JSON file is saved
3. Restart OpenCode
4. Check OpenCode logs for errors

### Search Issues

#### "All tools failed - Unable to find information"

1. Rephrase your query
2. Check internet connectivity
3. Verify at least one MCP server is working
4. Try simpler query first

#### Searches are slow

1. Use fast mode for repository detection (default)
2. Reduce num_results in query
3. Use highlights instead of full text
4. Check if memory caching is working (speeds up follow-ups)

#### Unexpected routing to wrong tool

1. Check query classification in skill files
2. Verify MCP servers are configured correctly
3. Review routing-workflows.md for logic
4. Report issue on GitHub

### File Permission Issues (Linux/macOS)

```bash
# Fix permissions for skills directory
chmod -R 755 ~/.config/opencode/skills/intellisearch

# Fix command file
chmod 644 ~/.config/opencode/commands/search-intelligently.md
```

### Windows Path Issues

If paths exceed 260 characters (Windows limit):
1. Enable long paths in Windows (Windows 10/11)
2. Use shorter paths for user profile
3. Install in local directory instead

## Getting Help

- Check [GitHub Issues](https://github.com/expert-vision-software/opencode-intellisearch/issues)
- Review [OpenCode Documentation](https://opencode.ai/docs)
- Join [OpenCode Discord](https://discord.gg/opencode)

## Manual Installation

If all automated methods fail, manually copy files from `dist/` directory:

**Linux/macOS Global:**
```bash
mkdir -p ~/.config/opencode/skills ~/.config/opencode/commands
cp -r dist/skills/intellisearch ~/.config/opencode/skills/
cp dist/commands/search-intelligently.md ~/.config/opencode/commands/
```

**Linux/macOS Local:**
```bash
mkdir -p .opencode/skills .opencode/commands
cp -r dist/skills/intellisearch .opencode/skills/
cp dist/commands/search-intelligently.md .opencode/commands/
```

**Windows Global (PowerShell):**
```powershell
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.config\opencode\skills"
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.config\opencode\commands"
Copy-Item -Recurse -Force dist\skills\intellisearch "$env:USERPROFILE\.config\opencode\skills\"
Copy-Item -Force dist\commands\search-intelligently.md "$env:USERPROFILE\.config\opencode\commands\"
```

**Windows Local (PowerShell):**
```powershell
New-Item -ItemType Directory -Force -Path .opencode\skills
New-Item -ItemType Directory -Force -Path .opencode\commands
Copy-Item -Recurse -Force dist\skills\intellisearch .opencode\skills\
Copy-Item -Force dist\commands\search-intelligently.md .opencode\commands\
```

## Development

```bash
# Clone and setup
git clone https://github.com/expert-vision-software/opencode-intellisearch.git
cd opencode-intellisearch

# Install dependencies
npm install

# Build TypeScript
npm run build

# Test CLI
node dist/bin/cli.js install --local

# Link for local testing
bun link

# Test with bunx
bunx opencode-intellisearch install --local
```
