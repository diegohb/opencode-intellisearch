# Installation Guide

Detailed installation instructions for intellisearch extension for OpenCode.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation Methods](#installation-methods)
- [Global Installation](#global-installation)
- [Local Installation](#local-installation)
- [MCP Server Setup](#mcp-server-setup)
- [Verification](#verification)
- [Uninstallation](#uninstallation)
- [Troubleshooting](#troubleshooting)

## Prerequisites

### Required

- **Bun** (Primary) - Download from [bun.sh](https://bun.sh/)
- **Node.js & npm** (Alternative) - Download from [nodejs.org/](https://nodejs.org/) version 18+
- [OpenCode](https://opencode.ai) installed and running
- Exa API key - Get from [Exa Dashboard](https://dashboard.exa.ai)
- deepWiki access - Register at [docs.opencod.ai](https://docs.opencod.ai)

### Optional

- DuckDuckGo tools (for fallback search)
- Memory tool (for query caching)

## Installation Methods

### Method 1: Bun Global Install (Recommended)

Install globally to make intellisearch available to all OpenCode projects:

```bash
bun install -g opencode-intellisearch
```

This will automatically:
1. Install the package globally
2. Detect package manager (Bun/npm)
3. Copy skill files to `~/.config/opencode/skills/intellisearch/`
4. Copy command files to `~/.config/opencode/commands/`
5. Verify installation

### Method 2: Bunx Local Install (Project-Specific)

Install only for current project without global installation:

```bash
cd your-project
bunx opencode-intellisearch
```

This will:
1. Download and run the package
2. Detect package manager
3. Copy skill files to `.opencode/skills/intellisearch/`
4. Copy command files to `.opencode/commands/`
5. Verify installation

### Method 3: npm Global Install (Alternative)

```bash
npm install -g opencode-intellisearch
```

### Method 4: npx Local Install (Alternative)

```bash
cd your-project
npx opencode-intellisearch
```

### Method 5: Manual Installation

See [Manual Installation](#manual-installation) section below.

## Global Installation

Global installation makes intellisearch available to all OpenCode projects.

### Using Bun (Primary)

```bash
# Install globally
bun install -g opencode-intellisearch

# Installation is automatic - package manager detection and file copying happens on install
```

### Using npm (Alternative)

```bash
# Install globally
npm install -g opencode-intellisearch

# Installation is automatic - same behavior as Bun
```

### Installation Locations

**Linux/macOS:**
- Config directory: `~/.config/opencode/` or `$XDG_CONFIG_HOME/opencode/`
- Skills: `~/.config/opencode/skills/intellisearch/`
- Commands: `~/.config/opencode/commands/intellisearch.md`

**Windows:**
- Config directory: `%USERPROFILE%\.config\opencode\`
- Skills: `%USERPROFILE%\.config\opencode\skills\intellisearch\`
- Commands: `%USERPROFILE%\.config\opencode\commands\intellisearch.md`

### Permissions

If you get a permission error:

```bash
# Bun
sudo bun install -g opencode-intellisearch

# npm
sudo npm install -g opencode-intellisearch
```

Or configure your package manager to install in your home directory:

```bash
# npm configuration
mkdir -p ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH="~/.npm-global/bin:$PATH"
npm install -g opencode-intellisearch
```

## Local Installation

Local installation makes intellisearch available only to current project.

### Using Bunx (Recommended)

```bash
# Navigate to your project
cd your-project

# Run bunx to install locally
bunx opencode-intellisearch
```

### Using npx (Alternative)

```bash
# Navigate to your project
cd your-project

# Run npx to install locally
npx opencode-intellisearch
```

### Installation Locations

**All Platforms:**
- Skills: `./.opencode/skills/intellisearch/`
- Commands: `./.opencode/commands/intellisearch.md`

## MCP Server Setup

### Exa MCP Server

1. Get API key from [Exa Dashboard](https://dashboard.exa.ai)

2. Configure in `~/.config/opencode/opencode.json` or project `opencode.json`:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcpServers": {
    "exa": {
      "type": "http",
      "url": "https://mcp.exa.ai/mcp?exaApiKey=YOUR_EXA_API_KEY"
    }
  }
}
```

3. Restart OpenCode to apply changes

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

### Optional: DuckDuckGo

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcpServers": {
    "duckduckgo": {
      "command": "duckduckgo-search"
    }
  }
}
```

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
ls -la ~/.config/opencode/commands/intellisearch.md

# Local installation
ls -la .opencode/skills/intellisearch/
ls -la .opencode/commands/intellisearch.md
```

**PowerShell:**
```powershell
# Global installation
Get-ChildItem $env:USERPROFILE\.config\opencode\skills\intellisearch
Get-ChildItem $env:USERPROFILE\.config\opencode\commands\intellisearch.md

# Local installation
Get-ChildItem .opencode\skills\intellisearch
Get-ChildItem .opencode\commands\intellisearch.md
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

Verify `exa` and `deepwiki` servers are running.

## Uninstallation

### Using Bun (Primary)

**Global:**
```bash
bun remove -g opencode-intellisearch
```

**Local:**
```bash
bun remove opencode-intellisearch
```

### Using npm (Alternative)

**Global:**
```bash
npm uninstall -g opencode-intellisearch
```

**Local:**
```bash
npm uninstall opencode-intellisearch
```

The uninstall script will automatically:
- Detect the package manager
- Remove `~/.config/opencode/skills/intellisearch/` or `.opencode/skills/intellisearch/`
- Remove `~/.config/opencode/commands/intellisearch.md` or `.opencode/commands/intellisearch.md`

### Manual Uninstallation

**Global (Bash):**
```bash
rm -rf ~/.config/opencode/skills/intellisearch
rm -f ~/.config/opencode/commands/intellisearch.md
```

**Local (Bash):**
```bash
rm -rf .opencode/skills/intellisearch
rm -f .opencode/commands/intellisearch.md
```

**Global (PowerShell):**
```powershell
Remove-Item -Recurse -Force $env:USERPROFILE\.config\opencode\skills\intellisearch
Remove-Item -Force $env:USERPROFILE\.config\opencode\commands\intellisearch.md
```

**Local (PowerShell):**
```powershell
Remove-Item -Recurse -Force .opencode\skills\intellisearch
Remove-Item -Force .opencode\commands\intellisearch.md
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

**Linux/macOS:**
```bash
# Bun
sudo bun install -g opencode-intellisearch

# npm
sudo npm install -g opencode-intellisearch
```

**Or configure npm to use your home directory:**
```bash
mkdir -p ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH="~/.npm-global/bin:$PATH"
npm install -g opencode-intellisearch
```

**Windows:** Run as Administrator

#### "dist directory not found"

The package wasn't built. Run:
```bash
bun run build

# Or with npm
npm run build
```

Then try installing again.

### MCP Server Issues

#### "Exa MCP unavailable" in searches

1. Verify API key is correct
2. Check opencode.json configuration
3. Test Exa API directly:
   ```bash
   curl -X POST https://api.exa.ai/search \
     -H "x-api-key: YOUR_API_KEY" \
     -H "Content-Type: application/json" \
     -d '{"query": "test", "numResults": 1}'
   ```
4. Restart OpenCode

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
chmod 644 ~/.config/opencode/commands/intellisearch.md
```

### Windows Path Issues

If paths exceed 260 characters (Windows limit):
1. Enable long paths in Windows (Windows 10/11)
2. Use shorter paths for user profile
3. Install in local directory instead

## Getting Help

- Check [GitHub Issues](https://github.com/yourusername/opencode-intellisearch/issues)
- Review [OpenCode Documentation](https://opencode.ai/docs)
- Join [OpenCode Discord](https://discord.gg/opencode)

## Manual Installation

If all automated methods fail, manually copy files from `dist/` directory:

**Linux/macOS Global:**
```bash
mkdir -p ~/.config/opencode/skills ~/.config/opencode/commands
cp -r dist/skills/intellisearch ~/.config/opencode/skills/
cp dist/commands/intellisearch.md ~/.config/opencode/commands/
```

**Linux/macOS Local:**
```bash
mkdir -p .opencode/skills .opencode/commands
cp -r dist/skills/intellisearch .opencode/skills/
cp dist/commands/intellisearch.md .opencode/commands/
```

**Windows Global (PowerShell):**
```powershell
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.config\opencode\skills"
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.config\opencode\commands"
Copy-Item -Recurse -Force dist\skills\intellisearch "$env:USERPROFILE\.config\opencode\skills\"
Copy-Item -Force dist\commands\intellisearch.md "$env:USERPROFILE\.config\opencode\commands\"
```

**Windows Local (PowerShell):**
```powershell
New-Item -ItemType Directory -Force -Path .opencode\skills
New-Item -ItemType Directory -Force -Path .opencode\commands
Copy-Item -Recurse -Force dist\skills\intellisearch .opencode\skills\
Copy-Item -Force dist\commands\intellisearch.md .opencode\commands\
```
