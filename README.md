# intellisearch

Intelligent web search routing for OpenCode with automatic tool selection, graceful fallbacks, and memory caching.

## ✨ Features

- **Smart Routing**: Automatically selects the best tool (Exa, deepWiki, DuckDuckGo, or webfetch) based on query type
- **GitHub Repository Detection**: Checks for GitHub repos for code/technology queries and routes to deepWiki for authoritative answers
- **Token Optimization**: Uses fast checks and highlights to minimize token usage
- **Graceful Fallbacks**: Falls back through DuckDuckGo and webfetch when primary tools unavailable
- **Memory Caching**: Caches search results for faster follow-up queries (optional)
- **Cross-Platform**: Works on Windows, macOS, and Linux
- **Package Manager Agnostic**: Works with Bun (primary) and npm (fallback)

## 🚀 Quick Start

### Install Globally (Recommended)

**Bun (Primary - Recommended):**
```bash
bun install -g opencode-intellisearch
```

**npm (Alternative):**
```bash
npm install -g opencode-intellisearch
```

### Install Locally (Project-Specific)

**Bunx (Primary):**
```bash
cd your-project
bunx opencode-intellisearch
```

**npx (Alternative):**
```bash
cd your-project
npx opencode-intellisearch
```

## 📖 Usage

```bash
/intellisearch How does React useEffect work?
/intellisearch Latest AI announcements from OpenAI
/intellisearch github:vercel/next.js app router
/intellisearch Do people prefer Zod or Yup for validation?
```

## 🔧 Requirements

### Runtime

- **Bun** (Primary) - Download from [bun.sh](https://bun.sh/)
- **Node.js** (Alternative) - Download from [nodejs.org/](https://nodejs.org/) version 18+

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

- [Installation Guide](INSTALLATION.md)
- [Troubleshooting](#troubleshooting)
- [Contributing](CONTRIBUTING.md)

## 🐛 Troubleshooting

### Installation Issues

**"bun command not found" - Bun is not installed:**
- Install Bun from [bun.sh](https://bun.sh/):
  ```bash
  curl -fsSL https://bun.sh/install | bash
  ```

**"npm command not found" - npm is not installed:**
- Install Node.js from [nodejs.org](https://nodejs.org/)

**"Permission denied" - Cannot install globally:**
```bash
# Bun
sudo bun install -g opencode-intellisearch

# npm
sudo npm install -g opencode-intellisearch
```
Or configure npm to install in your home directory:
```bash
mkdir -p ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH="~/.npm-global/bin:$PATH"
npm install -g opencode-intellisearch
```

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

## 🔧 Manual Installation

If package manager installation fails, manually copy files from `dist/` directory:

**Global:**
```bash
mkdir -p ~/.config/opencode/skills ~/.config/opencode/commands
cp -r dist/skills/* ~/.config/opencode/skills/
cp dist/commands/* ~/.config/opencode/commands/
```

**Local:**
```bash
mkdir -p .opencode/skills .opencode/commands
cp -r dist/skills/* .opencode/skills/
cp dist/commands/* .opencode/commands/
```

## 🗑️  Uninstall

**Bun:**
```bash
bun remove -g opencode-intellisearch
```

**npm:**
```bash
npm uninstall -g opencode-intellisearch
```

Or manually remove files:
```bash
# Global
rm -rf ~/.config/opencode/skills/intellisearch
rm -f ~/.config/opencode/commands/intellisearch.md

# Local
rm -rf .opencode/skills/intellisearch
rm -f .opencode/commands/intellisearch.md
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
