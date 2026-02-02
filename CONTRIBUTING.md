# Contributing to intellisearch

Thank you for your interest in contributing to intellisearch!

## Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Package Structure](#package-structure)
- [Making Changes](#making-changes)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)
- [Code Style](#code-style)
- [Reporting Issues](#reporting-issues)

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Bun](https://bun.sh/) (Primary) or [Node.js](https://nodejs.org/) (Alternative)
- OpenCode installed and configured
- Text editor (VS Code recommended)
- Bash or PowerShell terminal

## Development Setup

### 1. Fork and Clone

```bash
# Fork repository on GitHub
# Clone your fork
git clone https://github.com/diegohb/opencode-intellisearch.git
cd opencode-intellisearch
```

### 2. Build Distribution Files

The package uses a `dist/` directory for distribution. Run the build script:

```bash
# Using Bun (Primary)
bun run build

# Using npm (Alternative)
npm run build
```

This copies all files from `source/` to `dist/`.

## Package Structure

```
opencode-intellisearch/
├── source/
│   ├── skills/
│   │   └── intellisearch/
│   │       ├── SKILL.md              # Main skill definition
│   │       └── references/          # Supporting documentation
│   │           ├── exa-tools.md
│   │           ├── deepwiki-tools.md
│   │           ├── fallback-tools.md
│   │           └── routing-workflows.md
│   ├── commands/
│   │   └── intellisearch.md       # TUI command definition
│   ├── README.md
│   ├── INSTALLATION.md
│   ├── CONTRIBUTING.md
│   ├── CHANGELOG.md
│   └── LICENSE
├── scripts/
│   └── build.js                 # Build script (source → dist)
├── bin/
│   └── cli.js                     # Manual install/uninstall CLI
├── dist/                        # Distribution files (generated)
├── package.json                 # npm package configuration
└── README.md                    # Main documentation
```

## Making Changes

### Skill Development

Skills are defined in `source/skills/intellisearch/SKILL.md`.

**SKILL.md Structure:**

```markdown
---
name: skill-name
description: Clear description of when to use this skill
license: MIT
compatibility: opencode
metadata:
  audience: agents
  topic: skill-topic
---

## Content
- Skill purpose and capabilities
- When to use
- Quick examples
```

**Frontmatter Requirements:**
- `name`: 1-64 characters, lowercase alphanumeric with hyphens
- `description`: 1-1024 characters, third-person perspective
- `license`: License type
- `compatibility`: "opencode"
- `metadata`: String-to-string map for categorization

**Best Practices:**
- Use gerund form for skill names (e.g., "web-searching")
- Write descriptions in third person
- Keep primary content concise (~150 tokens)
- Use `references/` directory for detailed information
- Follow progressive disclosure pattern

### Command Development

Commands are defined in `source/commands/intellisearch.md`.

**Command Structure:**

```markdown
---
description: Command description for TUI list
agent: agent-name
model: anthropic/claude-3-5-sonnet-20241022
temperature: 0.2
---

Command template that becomes the agent prompt.
Use $ARGUMENTS for user input.
```

**Best Practices:**
- Keep temperature low (0.1-0.3) for deterministic results
- Use clear, descriptive frontmatter
- Provide examples in command template
- Handle edge cases in template

### CLI Development

The manual CLI is located at `bin/cli.js`.

**CLI Structure:**

```javascript
// Commands available: install, uninstall
// Options: --local, --global, --help

// Usage: intellisearch <command> [options]
```

**Adding New CLI Commands:**

1. Add command handler to `bin/cli.js`
2. Update help text in `showHelp()` function
3. Document the command in README.md and INSTALLATION.md
4. Test all command options

## Testing

### Test Locally

```bash
# After making changes, build dist
bun run build

# Test CLI
./bin/cli.js --help
./bin/cli.js install --local
./bin/cli.js uninstall --local

# Test package installation
bun install -g opencode-intellisearch

# Verify files are copied
ls -la .opencode/skills/intellisearch/
ls -la .opencode/commands/intellisearch.md
# OR for global
ls -la ~/.config/opencode/skills/intellisearch/
ls -la ~/.config/opencode/commands/intellisearch.md

# Test in OpenCode
# Start OpenCode and run: /intellisearch test query
```

### Test Cross-Platform

- Test on Linux, macOS, and Windows
- Test global and local installations
- Test with and without existing installations
- Test with different OpenCode versions
- Test with both Bun and npm

### Test Skill Behavior

1. Install skill
2. Create test queries for each category:
   - Code/technology queries
   - News queries
   - Company queries
   - Person queries
   - Research queries
3. Verify routing decisions
4. Check fallback behavior when MCP servers unavailable
5. Test memory caching (if configured)

## Submitting Changes

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
```

### 2. Make Your Changes

- Edit files in `source/` directory
- Test thoroughly
- Update documentation
- Update CHANGELOG.md

### 3. Commit Changes

```bash
git add source/skills/intellisearch/SKILL.md
git commit -m "Add new routing feature

- Description of what changed
- Why it was changed
- References any related issues"
```

**Commit Message Format:**
- Use conventional commits
- First line: 50 chars or less
- Subsequent lines: more detail

### 4. Build Distribution Files

Before committing, ensure `dist/` is up to date:

```bash
bun run build
```

### 5. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 6. Create Pull Request

- Go to GitHub repository
- Click "Pull Requests"
- Click "New Pull Request"
- Select your branch
- Fill in PR template
- Submit for review

### 7. Address Feedback

- Respond to review comments
- Make requested changes
- Push updates to your branch
- Rebuild `dist/` if needed

## Code Style

### Markdown Files

- Use 2 spaces for indentation
- Use sentence case for headings
- Include blank line before headings
- Use fenced code blocks with language identifier
- Use relative paths for file references
- Use forward slashes for all paths

### SKILL.md Frontmatter

```yaml
---
name: skill-name
description: Third-person description
license: MIT
compatibility: opencode
metadata:
  audience: agents
  topic: category
---
```

### Command Frontmatter

```yaml
---
description: Command description
agent: agent-name
model: model-id
temperature: 0.2
---
```

### JavaScript Files

- Use standard Node.js APIs (`fs`, `path`) - compatible with both Bun and Node.js
- Use `require()` (works in both Bun and Node.js)
- Use error handling with try/catch where needed
- Add comments for complex logic

### CLI Files

- Use `#!/usr/bin/env node` shebang
- Check command arguments from `process.argv[2]`
- Provide clear error messages
- Use emojis for output (✅, ❌, ℹ️)
- Handle both `--local` and `--global` options
- Show help on `--help` or `-h`

### package.json

- Keep `bun` field for Bun-specific config
- Use `bin` field for CLI commands
- Use `peerDependencies` for `@opencode-ai/plugin`
- Keep `engines.node` for npm users
- Keep both Bun and npm in keywords

## Reporting Issues

### Bug Reports

When reporting bugs, include:

1. **Environment:**
   - OS and version
   - OpenCode version
   - Package manager (Bun/npm)
   - Installation type (global/local)
   - CLI command output

2. **Steps to Reproduce:**
   - Clear, numbered steps
   - Expected behavior
   - Actual behavior

3. **Error Messages:**
   - Full error output
   - Screenshots if applicable

4. **Additional Context:**
   - MCP server configuration
   - Other extensions installed
   - Workarounds tried

### Feature Requests

When requesting features, include:

1. **Problem Statement:**
   - What problem does this solve?
   - Why is it important?

2. **Proposed Solution:**
   - How should it work?
   - Use cases and examples

3. **Alternatives Considered:**
   - Other approaches evaluated
   - Why this approach is preferred

### Documentation Improvements

For documentation improvements:

1. Be specific about what's unclear
2. Suggest improved wording
3. Provide examples if helpful
4. Link to relevant sections

## Getting Help

- Check existing [GitHub Issues](https://github.com/diegohb/opencode-intellisearch/issues)
- Review [OpenCode Documentation](https://opencode.ai/docs)
- Join [OpenCode Discord](https://discord.gg/opencode)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the community
- Show empathy towards other contributors

Thank you for contributing to intellisearch! 🎉
