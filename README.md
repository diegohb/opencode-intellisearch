# intellisearch

GitHub repository search for OpenCode with automatic DeepWiki integration for technical answers.

## ✨ Features

- **GitHub-First Search**: Searches for GitHub repositories and extracts technical answers directly from code
- **DeepWiki Integration**: Uses DeepWiki for authoritative Q&A on any GitHub repository
- **Automatic Repo Detection**: Identifies GitHub repos from search results and maps them to owner/repo format
- **Simple Workflow**: Search web → Extract GitHub repos → Query DeepWiki → Return results
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

Once installed, the plugin automatically adds the `/search-intelligently` command to OpenCode:

```bash
/search-intelligently How does React useEffect work?
/search-intelligently Tools for validating semver specification strings
/search-intelligently Best way to handle file uploads in Next.js
/search-intelligently Compare Zod vs Yup for validation libraries
/search-intelligently github:vercel/next.js app router patterns
```

## 🔧 Requirements

### Runtime

- **Bun** - Download from [bun.sh](https://bun.sh/)

### MCP Servers

**Required:**
- **deepwiki** - Repository Q&A ([docs](https://docs.devin.ai/work-with-devin/deepwiki-mcp))

### Setup MCP Servers

Configure in `~/.config/opencode/opencode.json` or project `opencode.json`:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcpServers": {
    "deepwiki": {
      "url": "https://mcp.deepwiki.com/mcp"
    }
  }
}
```

## 🧠 How It Works

### Simple Linear Workflow

1. **Search the Web** → Uses webfetch to search for relevant content (prioritizes GitHub repositories)
2. **Extract Repositories** → Scans search results for GitHub URLs and maps to owner/repo format
3. **Query DeepWiki** → Uses DeepWiki to ask questions about detected repositories
4. **Return Results** → Presents authoritative answers from repository documentation and code

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

**"deepWiki unavailable" - Falling back to webfetch:**
- Verify deepWiki MCP server is configured in opencode.json
- Check MCP server status with `/mcp status`

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
- [DeepWiki](https://docs.devin.ai/work-with-devin/deepwiki-mcp) - Repository intelligence
- [OpenCode](https://opencode.ai) - AI coding environment
- [Bun](https://bun.sh) - Fast JavaScript runtime
