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
- [Bun](https://bun.sh/) or [Node.js](https://nodejs.org/)
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
│   ├── install.sh                  # Bash installer
│   ├── install.ps1                 # PowerShell installer
│   ├── uninstall.sh                # Bash uninstaller
│   └── uninstall.ps1              # PowerShell uninstaller
├── LICENSE
├── CHANGELOG.md
└── README.md
```

## Development Setup

### 1. Fork and Clone

```bash
# Fork the repository on GitHub
# Clone your fork
git clone https://github.com/yourusername/opencode-intellisearch.git
cd opencode-intellisearch
```

### 2. Install Dependencies

No npm dependencies required for this extension. Skills and commands are markdown-based.

### 3. Test Installation Locally

```bash
# Local test installation
./source/install.sh --local
```

```powershell
# PowerShell
.\source\install.ps1 -Local
```

### 4. Verify in OpenCode

1. Start OpenCode in the current directory
2. Test the command: `/intellisearch test query`
3. Verify skill is loaded by checking `opencode.json`

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
- Include code examples
- Provide context for each section
- Link between related files

### Installation Script Development

**Bash Script Guidelines:**
- Use `set -e` for error handling
- Check for existing installations
- Provide user prompts before overwriting
- Verify installation success
- Use emoji and colors for output
- Support `--help` flag
- Use `$XDG_CONFIG_HOME` if set

**PowerShell Script Guidelines:**
- Use `#Requires -Version 5.1` or higher
- Use parameter binding with `[Parameter()]`
- Check for existing installations
- Provide user prompts before overwriting
- Verify installation success
- Use `Write-Host` with colors
- Support `-Help` parameter
- Handle `$env:XDG_CONFIG_HOME`

## Testing

### Test Locally

```bash
# After making changes, test installation
./source/install.sh --local

# Verify files are copied
ls -la .opencode/skills/intellisearch/
ls -la .opencode/commands/intellisearch.md

# Test in OpenCode
# Start OpenCode and run: /intellisearch test query
```

### Test Installation Scripts

**Bash:**
```bash
# Test different scenarios
./source/install.sh --global
./source/install.sh --local
./source/install.sh --force
./source/install.sh --help

# Test uninstall
./source/uninstall.sh
./source/uninstall.sh --force
```

**PowerShell:**
```powershell
# Test different scenarios
.\source\install.ps1 -Global
.\source\install.ps1 -Local
.\source\install.ps1 -Force

# Test uninstall
.\source\uninstall.ps1
```

### Test Cross-Platform

- Test on Linux, macOS, and Windows
- Test global and local installations
- Test with and without existing installations
- Test with different OpenCode versions

### Test Skill Behavior

1. Install the skill
2. Create test queries for each category:
   - Code/technology queries
   - News queries
   - Company queries
   - Person queries
   - Research queries
3. Verify routing decisions
4. Check fallback behavior when MCP servers unavailable

## Submitting Changes

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
```

### 2. Make Your Changes

- Edit files as needed
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

### 4. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 5. Create Pull Request

- Go to GitHub repository
- Click "Pull Requests"
- Click "New Pull Request"
- Select your branch
- Fill in PR template
- Submit for review

### 6. Address Feedback

- Respond to review comments
- Make requested changes
- Push updates to your branch

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

### Bash Scripts

- Use `set -e` for error handling
- Check for command success with `$?`
- Quote all variable expansions
- Use `[ ]` for tests, `[[ ]]` for complex conditions
- Add comments for complex logic

### PowerShell Scripts

- Use parameter binding
- Test paths with `Test-Path`
- Use `Write-Host` with `-ForegroundColor` for colors
- Use `Join-Path` for path construction
- Add comments for complex logic

## Reporting Issues

### Bug Reports

When reporting bugs, include:

1. **Environment:**
   - OS and version
   - OpenCode version
   - Bash/PowerShell version
   - Installation type (global/local)

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
- Focus on what is best for the community
- Show empathy towards other contributors

Thank you for contributing to intellisearch! 🎉
