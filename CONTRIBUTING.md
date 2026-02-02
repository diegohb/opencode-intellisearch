# Contributing to intellisearch

Thank you for your interest in contributing to intellisearch!

## Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
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

### Repository Structure

```
intellisearch/
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
│   ├── build.js                 # Build script (source → dist)
│   ├── install.js               # Installation script with PM detection
│   ├── uninstall.js             # Uninstallation script
│   └── detect-pm.js            # Package manager detection
├── dist/                        # Distribution files (generated)
├── package.json                 # npm package configuration
└── README.md                    # Main documentation
```

## Development Setup

### 1. Fork and Clone

```bash
# Fork repository on GitHub
# Clone your fork
git clone https://github.com/yourusername/opencode-intellisearch.git
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

### 3. Test Installation Locally

```bash
# Build dist first
bun run build

# Test installation (uses package manager detection)
bun run install

# Or with npm
npm run build
npm run install
```

### 4. Verify in OpenCode

1. Start OpenCode in current directory
2. Test the command: `/intellisearch test query`
3. Verify skill is loaded by checking OpenCode's skill list

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
- Use references/ directory for detailed information
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
- Handle edge cases in the template

### Reference Documentation

Add detailed information to reference files:

- `exa-tools.md` - Exa MCP tool documentation
- `deepwiki-tools.md` - deepWiki MCP tool documentation
- `fallback-tools.md` - DuckDuckGo and webfetch documentation
- `routing-workflows.md` - Decision trees and workflows

**Documentation Style:**
- Use clear headings
- Include code examples for all APIs/tools
- Provide context for each section
- Link between related files

### Script Development

**Package Manager Detection**

All scripts include automatic package manager detection via `detect-pm.js`:
- Detects Bun or npm at runtime
- Displays appropriate messages
- Works identically with both package managers

**Build Script Guidelines:**
- Detect package manager and show in output
- Copy source files to `dist/`
- Show progress with emoji indicators
- Reference both `bun` and `npm` in help text

**Install/Uninstall Script Guidelines:**
- Use `detect-pm.js` to detect package manager
- Display which package manager is being used
- Check for `dist/` directory and show PM-specific error message
- Show which PM detected in output
- Handle XDG_CONFIG_HOME environment variable

## Testing

### Test Locally

```bash
# After making changes, build dist
bun run build

# Or with npm
npm run build

# Test installation
bun run install

# Verify files are copied
ls -la .opencode/skills/intellisearch/
ls -la .opencode/commands/intellisearch.md

# Test in OpenCode
# Start OpenCode and run: /intellisearch test query
```

### Test Installation Scripts

**Test both Bun and npm:**

```bash
# Test with Bun
bun run build
bun run install
bun run uninstall

# Test with npm
npm run build
npm run install
npm run uninstall
```

### Test Cross-Platform

- Test on Linux, macOS, and Windows
- Test global and local installations
- Test with and without existing installations
- Test with different OpenCode versions
- Test both Bun and npm package managers

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

### Documentation Files

- Use clear, descriptive headings
- Include code examples for all APIs/tools
- Provide context and explanations
- Link to related documentation
- Keep reference information up-to-date

### JavaScript/TypeScript Files

- Use standard Node.js APIs (fs, path) - compatible with both Bun and Node.js
- Use `require()` (works in both Bun and Node.js)
- Use error handling with try/catch where needed
- Add comments for complex logic

### package.json

- Primary scripts should use `bun` command
- Keep npm scripts prefixed with `npm:`
- Include `bun` field for Bun-specific config
- Keep `engines.node` for npm users

## Reporting Issues

### Bug Reports

When reporting bugs, include:

1. **Environment:**
   - OS and version
   - OpenCode version
   - Package manager (Bun/npm)
   - Installation type (global/local)
   - Scripts output with PM detection

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

- Check existing [GitHub Issues](https://github.com/yourusername/opencode-intellisearch/issues)
- Review [OpenCode Documentation](https://opencode.ai/docs)
- Join [OpenCode Discord](https://discord.gg/opencode)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for community
- Show empathy towards other contributors

Thank you for contributing to intellisearch! 🎉
