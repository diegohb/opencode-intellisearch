# Installation Guide

Installation instructions for intellisearch OpenCode extension.

## Prerequisites

- [OpenCode](https://opencode.ai) installed and running
- [Bun](https://bun.sh/) - Required for plugin installation

## Installation

### Plugin Installation

**This is the only supported installation method.**

1. Install the package:
   ```bash
   bun install -g opencode-intellisearch
   ```

2. Add to your OpenCode configuration (`~/.config/opencode/opencode.json` or project `opencode.json`):
   ```json
   {
     "$schema": "https://opencode.ai/config.json",
     "plugin": ["opencode-intellisearch"]
   }
   ```

3. Restart OpenCode

The plugin will automatically install the skill and command files on first run.

### How It Works

- OpenCode loads the plugin from `~/.cache/opencode/node_modules/opencode-intellisearch/`
- The plugin's config hook copies files to `.opencode/` directory:
  - Skill: `.opencode/skills/intellisearch/SKILL.md`
  - Command: `.opencode/commands/intellisearch.md`
- A version marker prevents duplicate installations
- Updates are automatic when you run `bun install -g opencode-intellisearch` again

## MCP Server Setup

The intellisearch skill requires these MCP servers:

### Required MCP Servers

**Exa** - Web search with category filters
```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "exa": {
      "type": "remote",
      "url": "https://mcp.exa.ai/mcp",
      "enabled": true
    }
  }
}
```

**DeepWiki** - Repository documentation Q&A
```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "DeepWiki": {
      "type": "remote",
      "url": "https://mcp.deepwiki.com/mcp",
      "enabled": true
    }
  }
}
```

### Optional MCP Servers

**Memory** - Cache search results
```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "memory": {
      "type": "local",
      "command": ["npx", "-y", "@modelcontextprotocol/server-memory"],
      "enabled": true
    }
  }
}
```

### Permissions

Configure permissions for intellisearch to work correctly:
```json
{
  "$schema": "https://opencode.ai/config.json",
  "permission": {
    "*": "deny",
    "DeepWiki*": "allow",
    "memory*": "allow",
    "exa*": "allow",
    "webfetch": "ask"
  }
}
```

## Verification

### Check Files Are Installed

```bash
# Check skill files
ls -la .opencode/skills/intellisearch/

# Check command file
ls -la .opencode/commands/intellisearch.md

# Check version marker
cat .opencode/skills/intellisearch/.version
```

### Test in OpenCode

1. Start OpenCode or restart if already running
2. Open a conversation
3. Run a test query:

```
/intellisearch What is intellisearch?
```

4. Verify the command appears and executes successfully

### Check MCP Server Status

In OpenCode:
```
/mcp status
```

Verify `exa` and `DeepWiki` servers are running.

## Uninstallation

### Remove Plugin

Remove from your OpenCode configuration (`~/.config/opencode/opencode.json` or project `opencode.json`):
```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": []
}
```

### Uninstall Package

```bash
bun remove -g opencode-intellisearch
```

### Remove Installed Files

```bash
# Remove skill and command files
rm -rf .opencode/skills/intellisearch
rm -f .opencode/commands/intellisearch.md
```

## Development

For development and testing instructions, see [CONTRIBUTING.md](CONTRIBUTING.md).

## Troubleshooting

### "Plugin not found" error

1. Run `bun install -g opencode-intellisearch` to ensure installed
2. Verify it's in your `opencode.json` plugin list
3. Restart OpenCode

### Files not appearing in .opencode/

1. Check OpenCode logs for errors: `~/.local/share/opencode/log`
2. Verify plugin is loaded in configuration
3. Try removing and re-adding plugin from `opencode.json`
4. Restart OpenCode

### MCP servers not working

1. Verify MCP server configuration in `opencode.json`
2. Check that URLs are correct and accessible
3. Test MCP servers directly:
   - Exa: Visit https://mcp.exa.ai/mcp
   - DeepWiki: Visit https://mcp.deepwiki.com/mcp
4. Restart OpenCode after making configuration changes

### "intellisearch" command not responding

1. Verify skill file exists: `.opencode/skills/intellisearch/SKILL.md`
2. Verify command file exists: `.opencode/commands/intellisearch.md`
3. Check that required MCP servers are running: `/mcp status`
4. Review OpenCode logs for errors

## Getting Help

- Check [GitHub Issues](https://github.com/diegohb/opencode-intellisearch/issues)
- Review [OpenCode Documentation](https://opencode.ai/docs)
- Join [OpenCode Discord](https://discord.gg/opencode)
