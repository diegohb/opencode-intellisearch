# Changelog

All notable changes to the intellisearch extension for OpenCode will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Removed
- Exa integration and API key requirements
- DuckDuckGo fallback search mechanism
- Memory caching for follow-up queries

### Changed
- **BREAKING**: Simplified to GitHub repository search + DeepWiki workflow
- Updated documentation (README.md, INSTALLATION.md, AGENTS.md)
- Cleaned up unused reference files
- Updated command to be simple skill wrapper with agent: general and subtask: true

## [0.2.0] - 2025-02-03

### Changed
- **BREAKING**: Migrated to Bun-only architecture
- Removed CLI, build scripts, and npm compatibility
- Eliminated ~82% of codebase (450 → ~80 lines)
- Assets now published directly from `assets/` directory
- Plugin now at root level (`plugin.ts`, `index.ts`)
- Simplified testing with path-based plugin loading
- Updated all documentation for Bun-only workflow

### Removed
- CLI (`bin/cli.ts`) - no longer needed
- Build scripts (`scripts/build.ts`, `scripts/detect-pm.ts`)
- npm lockfile support
- Manual installation methods (npx/bunx)
- `source/` and `dist/` directories

## [0.1.0] - 2025-02-01

### Added
- Initial release of intellisearch extension
- Intelligent web search routing between Exa, deepWiki, DuckDuckGo, and webfetch
- Automatic GitHub repository detection for code/technology queries
- Memory caching support for faster follow-up queries
- Token-optimized search strategies
- Graceful fallback handling when primary tools unavailable
- Cross-platform support (Windows, macOS, Linux)
- TypeScript implementation with ESM support
