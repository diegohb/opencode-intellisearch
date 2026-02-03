# AGENTS.md - OpenCode Extension Package Template

Guidelines for agentic coding agents working on this OpenCode extension repository.

## Build Commands

```bash
# Build TypeScript and copy assets
npm run build

# Build before packaging
npm run prepack

# Local development install
bun link

# Manual CLI installation (for testing)
node dist/bin/cli.js install --local
node dist/bin/cli.js uninstall --local

# Test with npx/bunx
npx opencode-intellisearch --local
bunx opencode-intellisearch --local
```

## Project Structure

```
source/
├── src/              # Plugin and shared utilities
│   ├── plugin.ts     # OpenCode plugin with config hook
│   ├── index.ts      # Plugin export
│   ├── utils.ts      # Async utilities (copyDirectoryAsync)
│   ├── detect-project-install.ts
│   └── shared.ts     # Sync utilities (copyDirectory)
├── bin/              # CLI entry point
│   └── cli.ts        # npx/bunx command handler
├── scripts/          # Build scripts
│   ├── build.ts      # Copies source/assets/ to dist/
│   ├── detect-pm.ts  # Package manager detection
│   └── shared.ts     # Build-time utilities
└── assets/           # Skills and commands (copied to dist/)
    ├── skills/
    └── commands/
dist/                 # Compiled output (gitignored)
```

## Code Style Guidelines

### TypeScript
- Use **named functions** (not arrow functions) where no `this` scoping issues
- Target: ES2022, Module: NodeNext
- Strict mode enabled with all strict flags
- Always use explicit return types on exported functions
- Prefer `async/await` over callbacks

### Imports
```typescript
// Node built-ins first
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// External dependencies
import type { Plugin } from "@opencode-ai/plugin";

// Internal modules (always include .js extension)
import { detectProjectInstall } from "./detect-project-install.js";
import { copyDirectoryAsync } from "./utils.js";
```

### Naming Conventions
- Functions: `camelCase` (e.g., `detectProjectInstall`, `copyDirectoryAsync`)
- Constants: `SCREAMING_SNAKE_CASE` (e.g., `VERSION`, `DIST_DIR`)
- Interfaces: `PascalCase` (e.g., `PluginContext`, `Hooks`)
- Files: `kebab-case.ts` (e.g., `detect-project-install.ts`)

### Error Handling
```typescript
try {
  await copyDirectoryAsync(src, dest);
} catch (error) {
  await client.app.log({
    service: "intellisearch",
    level: "error",
    message: `Failed to copy: ${(error as Error).message}`
  });
  return;
}
```

### Path Handling
Always use `path.join()` for cross-platform compatibility:
```typescript
const targetDir = path.join(process.cwd(), ".opencode");
const skillsDir = path.join(targetDir, "skills");
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
feat: add automatic plugin installation via config hook
fix: correct CLI path resolution for subdirectory installs
refactor: reorganize source files to source/ directory
docs: update installation instructions for bunx usage
test: add PMX test cases for npx and bunx
```

### Before Committing
1. Run `npm run build` - ensure no TypeScript errors
2. Verify assets copied to `dist/skills/` and `dist/commands/`
3. Clean the dist folder.

## Testing Protocol

### Test Project
Use: `C:\dev\projects\playground\aigpt\test-websearch`

### Required Test Cases (6 total)
Execute from different directories within test project:

```bash
# Test 1-2: Project root
cd C:\dev\projects\playground\aigpt\test-websearch
npx opencode-intellisearch --local
bunx opencode-intellisearch --local

# Test 3-4: From .opencode directory
cd C:\dev\projects\playground\aigpt\test-websearch\.opencode
npx opencode-intellisearch --local
bunx opencode-intellisearch --local

# Test 5-6: From nested subdirectory
mkdir -p testsub/subdir
cd testsub/subdir
npx opencode-intellisearch --local
bunx opencode-intellisearch --local
```

**Note:** Use file:test-pmx.bat and log results to file:test-results-pmx.md


### Expected Behavior
- All tests should install to project root `.opencode/`
- Files: `.opencode/skills/intellisearch/` and `.opencode/commands/intellisearch.md`
- No double-nesting of skills directory
- After each test, run uninstall to clean up

### Cleanup After Tests
```bash
node dist/bin/cli.js uninstall --local
# Verify: .opencode/skills/intellisearch/ should not exist
# Verify: .opencode/commands/intellisearch.md should not exist
```

## Helpful Tools

### MCP_DOCKER Tools
Use these for research and problem-solving:

```typescript
// Web search via DuckDuckGo
MCP_DOCKER_mcp-find({ query: "duckduckgo" })
MCP_DOCKER_mcp-add({ name: "duckduckgo" })
MCP_DOCKER_mcp-exec({ name: "search", arguments: { query: "OpenCode plugin config hook" } })

// Fetch documentation
MCP_DOCKER_mcp-exec({ name: "fetch_content", arguments: { url: "https://opencode.ai/docs/plugins/" } })
```

### DeepWiki
Query GitHub repository documentation:
```typescript
deepWiki_read_wiki_structure({ repoName: "anomalyco/opencode" })
deepWiki_read_wiki_contents({ repoName: "anomalyco/opencode" })
deepWiki_ask_question({ 
  repoName: "anomalyco/opencode", 
  question: "How does the plugin config hook work?" 
})
```

### Sequential Thinking
Use for complex problem-solving:
```typescript
sequential_thinking({ 
  thought: "Analyzing why CLI installs to wrong directory...",
  thoughtNumber: 1,
  totalThoughts: 5,
  nextThoughtNeeded: true 
})
```

## Package Publishing

```bash
# Version bump
npm version patch  # or minor/major

# Build and publish
npm run build
npm publish

# For bun compatibility, also publish with bun
bun publish
```

## Key Implementation Details

### Plugin Architecture
- Plugin exports default async function returning `{ hooks: { config?: () => Promise<void> } }`
- Config hook runs once during OpenCode initialization
- Use version marker file to prevent duplicate installs
- Log progress via `client.app.log()`

### CLI Architecture
- Default command: `install` (when no args provided)
- Flags: `--local`, `--global`, `--force`, `--help`
- Auto-detects scope by searching for `package.json` in parent directories
- Supports both symlinks (preferred) and file copies (fallback)

### Asset Installation
Source: `source/assets/` → Compiled to: `dist/skills/` and `dist/commands/`
Plugin/CLI reads from `dist/` and copies to target `.opencode/` directory.
