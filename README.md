# intellisearch

Intelligent web search routing for OpenCode with automatic tool selection, graceful fallbacks, and memory caching.

## Features

- **Smart Routing**: Automatically selects best tool (Exa, deepWiki, DuckDuckGo, or webfetch) based on query type
- **GitHub Repository Detection**: Checks for GitHub repos for code/technology queries and routes to deepWiki for authoritative answers
- **Token Optimization**: Uses fast checks and highlights to minimize token usage
- **Graceful Fallbacks**: Falls back through DuckDuckGo and webfetch when primary tools unavailable
- **Memory Caching**: Caches search results for faster follow-up queries (optional)
- **Cross-Platform**: Works on Windows, macOS, and Linux
- **Bun-Native**: Zero build step, runs TypeScript natively with Bun

## Installation

See [INSTALLATION.md](INSTALLATION.md) for detailed installation instructions.

Quick start:
```bash
bun install -g opencode-intellisearch
```

Add to your `~/.config/opencode/opencode.json` or project `opencode.json`:
```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": ["opencode-intellisearch"]
}
```

## Usage

Once installed, the plugin automatically adds the `/intellisearch` command to OpenCode:

```bash
/intellisearch How does React useEffect work?
/intellisearch Latest AI announcements from OpenAI
/intellisearch github:vercel/next.js app router
/intellisearch Do people prefer Zod or Yup for validation?
```

### Testing the Plugin

To test if the plugin is working correctly, try asking:

> What is the best way to check the version of this plugin programmatically in OpenCode via its SDK?

This will verify that:
1. The plugin is loaded
2. The skill and command files are installed
3. The required MCP servers (Exa, DeepWiki) are configured
4. The search routing is functioning

## MCP Server Requirements

This plugin requires these MCP servers:

**Required:**
- **exa** - Primary web search
- **DeepWiki** - Repository Q&A for GitHub projects

**Optional:**
- **memory** - Query result caching

See [INSTALLATION.md](INSTALLATION.md) for MCP server configuration details.

## Documentation

- [Installation Guide](INSTALLATION.md)
- [Contributing Guide](CONTRIBUTING.md)
- [Changelog](CHANGELOG.md)

## License

MIT License - see [LICENSE](LICENSE)
