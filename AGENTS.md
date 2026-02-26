# AGENTS.md - OpenCode Extension Package Template

Guidelines for agentic coding agents working on this OpenCode extension repository.

## Development Commands

```bash
# TypeScript type checking (no build step - Bun runs TS natively)
bun run check

# Run tests
bun test
bun run test:watch  # Watch mode

# Local development (link to OpenCode plugin cache)
bun link
bun link opencode-intellisearch --cwd $home/.cache/opencode/node_modules/
# Alternative: ln -s $(pwd) ~/.cache/opencode/node_modules/opencode-intellisearch

# Unlink when done
bun unlink
```

## Project Structure

```
├── assets/           # Skills and commands (published directly)
│   ├── skills/
│   │   └── intellisearch/
│   │       └── SKILL.md
│   └── commands/
│       └── intellisearch.md
├── plugin.ts         # OpenCode plugin with config hook (~45 lines)
├── index.ts          # Plugin re-export
├── package.json      # Bun-native configuration
├── tsconfig.json     # Bun-optimized TypeScript config
└── tests/            # Bun test suite
    ├── unit/         # Unit tests
    └── integration/  # Integration tests
```

## Code Style Guidelines

### TypeScript
- Use **named functions** (not arrow functions) where no `this` scoping issues
- Target: ESNext, Module: ESNext
- Strict mode enabled with all strict flags
- Always use explicit return types on exported functions
- Prefer `async/await` over callbacks
- **Bun-native**: Import with `.ts` extensions, no compilation needed

### Imports
```typescript
// Node built-ins first (use node: prefix)
import { mkdir, copyFile } from "node:fs/promises";
import path from "node:path";

// External dependencies
import type { Plugin } from "@opencode-ai/plugin";

// Internal modules (include .ts extension for Bun)
import { default as plugin } from "./plugin.ts";
```

### Naming Conventions
- Functions: `camelCase` (e.g., `copyDirectory`, `installAssets`)
- Constants: `SCREAMING_SNAKE_CASE` (e.g., `VERSION`)
- Interfaces: `PascalCase` (e.g., `PluginContext`)
- Files: `kebab-case.ts`

### Error Handling
```typescript
try {
  await copyDir(src, dest);
} catch (error) {
  await client.app.log({
    service: "intellisearch",
    level: "error",
    message: `Failed to copy: ${(error as Error).message}`
  });
}
```

### Path Handling
Always use `path.join()` for cross-platform compatibility:
```typescript
const targetDir = path.join(directory, ".opencode");
const assetsDir = path.join(import.meta.dirname, "assets");
```

## Development Workflow

### Branch Naming
All work branches must start with `ai-`:
```bash
git checkout -b ai-feature-name
git checkout -b ai-fix-bug-description
```

### Commit Messages
Follow conventional commits:
```
feat: add bun-native TypeScript support
fix: correct asset path resolution
refactor: remove CLI and build scripts
docs: update installation for bun-only
```

### Before Committing
1. Run `bun run check` - ensure no TypeScript errors
2. Verify assets are in `assets/skills/` and `assets/commands/`
3. Test locally using bun link workflow

## Testing Protocol

### Test Project
Use: `C:\dev\projects\playground\aigpt\test-websearch`

### Quick Test (Path-based - Recommended)

This method tests the plugin directly from the source directory without publishing or linking.

1. **Configure OpenCode** - Edit test project's `.opencode/opencode.json`:
   ```json
   {
     "$schema": "https://opencode.ai/config.json",
     "plugin": ["C:/dev/projects/github/opencode-intellisearch"]
   }
   ```

2. **Run Test Command**:
   ```bash
   cd C:\dev\projects\playground\aigpt\test-websearch
   opencode run "test hello"
   ```

3. **Check Logs**:
   - Windows: `C:\Users\%USERNAME%\.local\share\opencode\log`
   - Look for plugin loading and asset installation messages

4. **Verify Assets Installed**:
   ```bash
   # Check skills
   ls .opencode/skills/intellisearch/
   # Expected: SKILL.md, .version
   
   # Check commands
   ls .opencode/commands/intellisearch.md
   ```

5. **Verify Version Marker**:
   ```bash
   cat .opencode/skills/intellisearch/.version
   # Expected: 0.2.0
   ```

### Cleanup Phase
```bash
# 1. Remove plugin from opencode.json
# 2. Clean test project assets
rm -rf C:\dev\projects\playground\aigpt\test-websearch\.opencode\skills\intellisearch
rm C:\dev\projects\playground\aigpt\test-websearch\.opencode\commands\intellisearch.md
# Or simply: rm -rf .opencode/
```

## Helpful Tools

### Web Fetching
Use `webfetch` to retrieve web content for searches:

```typescript
// Fetch documentation pages
webfetch({ 
  url: "https://opencode.ai/docs/plugins/",
  format: "markdown",
  timeout: 30 
})
```

### DeepWiki
Query GitHub repository documentation:
```typescript
deepWiki_read_wiki_structure({ repoName: "anomalyco/opencode" })
deepWiki_read_wiki_contents({ repoName: "anomalyco/opencode" })
deepWiki_ask_question({ 
  repoName: "anomalyco/opencode", 
  question: "Where does OpenCode load npm plugins from?" 
})
```

### Simplified Workflow
1. Search with `webfetch` for GitHub repositories (`site:github.com`)
2. Extract repository names from search results
3. Use DeepWiki tools to query repositories for answers
4. Reference: `assets/skills/intellisearch/deepwiki-tools.md`

## Package Publishing

```bash
# Version bump
npm version patch  # or minor/major

# Publish (bun only)
bun publish
```

## Key Implementation Details

### Plugin Architecture
- Plugin exports default async function returning `{ hooks: { config?: () => Promise<void> } }`
- Config hook runs once during OpenCode initialization
- Assets are copied from package `assets/` directory to project `.opencode/`
- Use version marker file (`.version`) to prevent duplicate installs
- Log progress via `client.app.log()`
- OpenCode installs npm plugins to `~/.cache/opencode/node_modules/`

### Asset Installation
Source: `assets/` (published directly in package)
→ Plugin copies to: `.opencode/skills/intellisearch/` and `.opencode/commands/intellisearch.md`
