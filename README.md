# intellisearch

Intelligent web search routing for OpenCode with automatic tool selection, graceful fallbacks, and memory caching.

## ✨ Features

- **Smart Routing**: Automatically selects best tool (Exa, deepWiki, DuckDuckGo, or webfetch) based on query type
- **GitHub Repository Detection**: Checks for GitHub repos for code/technology queries and routes to deepWiki for authoritative answers
- **Token Optimization**: Uses fast checks and highlights to minimize token usage
- **Graceful Fallbacks**: Falls back through DuckDuckGo and webfetch when primary tools unavailable
- **Memory Caching**: Caches search results for faster follow-up queries (optional)
- **Cross-Platform**: Works on Windows, macOS, and Linux
- **TypeScript + ESM**: Built with TypeScript for type safety, uses ESM for OpenCode plugin compatibility
- **Bun-Native**: Zero build step, runs TypeScript natively with Bun

## 🚀 Installation

Add to your `opencode.json`:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugins": ["opencode-intellisearch"]
}
```

Or install locally in your project:

```bash
bun add -d opencode-intellisearch
```

Then add to your project's `opencode.json`:

```json
{
  "plugins": ["opencode-intellisearch"]
}
```

## 📖 Usage

Once installed, the plugin automatically adds the `/intellisearch` command to OpenCode:

```bash
/intellisearch How does React useEffect work?
/intellisearch Latest AI announcements from OpenAI
/intellisearch github:vercel/next.js app router
/intellisearch Do people prefer Zod or Yup for validation?
```

## 🔧 Requirements

### Runtime

- **Bun** - Download from [bun.sh](https://bun.sh/)

### MCP Servers

**Required:**
- **exa** - Primary web search ([docs](https://docs.exa.ai/reference/exa-mcp))
- **deepwiki** - Repository Q&A ([docs](https://docs.opencod.ai))

**Optional:**
- **duckduckgo** - Fallback search
- **memory** - Query result caching

### Setup MCP Servers

Configure in `~/.config/opencode/opencode.json` or project `opencode.json`:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcpServers": {
    "exa": {
      "type": "http",
      "url": "https://mcp.exa.ai/mcp?exaApiKey=YOUR_API_KEY"
    },
    "deepwiki": {
      "command": "deepwiki",
      "env": {
        "DEEPWIKI_API_KEY": "YOUR_API_KEY"
      }
    }
  }
}
```

## 🧠 How It Works

### Smart Routing Decision Tree

1. **Query Classification** → Code/Tech, News, Company, Person, Research, General
2. **Repository Detection** (for code queries) → Fast Exa check for GitHub repos
3. **Route to Best Tool**:
   - GitHub repo found + factual question → **deepWiki** (authoritative)
   - No repo OR opinion/comparison → **Exa** (community perspectives)
   - News/current events → **Exa** with news category
   - Primary tool unavailable → **DuckDuckGo** → **webfetch**

### Fallback Chain

```
Primary (Exa/deepWiki)
    ↓
Secondary (DuckDuckGo)
    ↓
Tertiary (webfetch)
```

## 📚 Documentation

- [Contributing](CONTRIBUTING.md)
- [Changelog](CHANGELOG.md)

## 🐛 Troubleshooting

### Installation Issues

**"bun command not found" - Bun is not installed:**
- Install Bun from [bun.sh](https://bun.sh/):
  ```bash
  curl -fsSL https://bun.sh/install | bash
  ```

**Plugin not loading:**
- Check OpenCode logs: `~/.local/share/opencode/log/`
- Verify plugin is in `opencode.json` plugins array
- Ensure Bun is installed and in PATH

### Search Issues

**"Exa MCP unavailable" - Falling back to DuckDuckGo:**
- Configure Exa MCP server in opencode.json
- Check EXA_API_KEY environment variable

**"deepWiki timeout" - Falling back to Exa:**
- Verify deepWiki MCP server is running
- Check DEEPWIKI_API_KEY

**All tools failed:**
- Try rephrasing your query
- Check MCP server status with `/mcp status`
- Verify internet connectivity

## 🗑️ Uninstall

Remove from `opencode.json` plugins array:

```json
{
  "plugins": []
}
```

Or for local installs:

```bash
bun remove opencode-intellisearch
```

## 🛠️ Development

```bash
# Install dependencies
bun install

# Type check
bun run check

# Link for local testing
bun link
```

## 📄 License

MIT License - see [LICENSE](LICENSE)

## 🤝 Contributing

Contributions welcome! See [CONTRIBUTING.md](CONTRIBUTING.md)

## 🙏 Acknowledgments

Built with:
- [Exa AI](https://exa.ai) - Neural search engine
- [deepWiki](https://docs.opencod.ai) - Repository intelligence
- [OpenCode](https://opencode.ai) - AI coding environment
- [Bun](https://bun.sh) - Fast JavaScript runtime
