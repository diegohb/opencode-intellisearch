---
name: intellisearch
description: Searches for technical answers by finding GitHub repositories and querying them with DeepWiki. Use when users ask technical questions about frameworks, libraries, APIs, or need documentation from code repositories.
license: MIT
compatibility: opencode
metadata:
  audience: agents
  topic: github-repository-search
---

## When to Use

Auto-trigger this skill when users ask about:
- Code/technology questions (frameworks, libraries, APIs)
- Documentation from code repositories
- Implementation details or usage examples
- Specific open-source projects

## Core Principles

1. Technical answers are best sourced directly from code repositories
2. Most technical reference sources exist as GitHub repositories
3. DeepWiki provides the best way to query GitHub repositories

## Required Tools

- **webfetch** - Fetch content from URLs and search engines
- **DeepWiki** - Repository-specific documentation Q&A for GitHub projects

## Workflow

Follow this linear process:

```
1. User asks technical question
       ↓
2. Search with site:github.com pattern
       ↓
3. Extract GitHub repository references
       ↓
4. Map to {owner}/{repo} format
       ↓
5. Query repositories with DeepWiki
       ↓
6. Provide answer based on results
```

## Step 1: Search for GitHub Repositories

When a user asks a technical question, construct a search query that targets GitHub repositories directly.

**Example query:**
```
User: "How do I validate semver strings in TypeScript?"
Search query: "site:github.com semver validation typescript"
```

Use webfetch to search:
```json
{
  "url": "https://www.google.com/search?q=site:github.com%20semver%20validation%20typescript",
  "format": "markdown",
  "timeout": 10
}
```

## Step 2: Extract GitHub Repository References

From the search results, extract GitHub repository URLs using regex patterns.

**Detect these patterns:**
- `https://github.com/{owner}/{repo}` - Standard repository URL
- `https://{owner}.github.io/{repo}` - GitHub Pages site

**Example regex patterns:**
```
github\.com/([\w-]+)/([\w.-]+)
([\w-]+)\.github\.io/([\w.-]+)
```

**Extraction examples:**
- `https://github.com/npm/node-semver` → `npm/node-semver`
- `https://jubianchi.github.io/semver-check` → `jubianchi/semver-check`
- `https://github.com/mattfarina/semver-isvalid` → `mattfarina/semver-isvalid`

## Step 3: Query Repositories with DeepWiki

Use DeepWiki's `ask_question` tool to query the extracted repositories.

**Single repository:**
```json
{
  "repoName": "npm/node-semver",
  "question": "How do I validate semver strings in TypeScript?"
}
```

**Multiple repositories:**
```json
{
  "repoName": ["npm/node-semver", "mattfarina/semver-isvalid", "jubianchi/semver-check"],
  "question": "How do I validate semver strings in TypeScript?"
}
```

The `repoName` parameter accepts both a string (single repo) and an array of strings (multiple repos).

## Step 4: Provide Answer

Interpret DeepWiki responses and provide a clear, actionable answer to the user.

**Include:**
- Best options found
- Specific implementation guidance
- Code examples when available
- Links to relevant repositories

## Example Usage

**User request:**
```
"Find tools to validate semver specification strings"
```

**Process:**
1. Search: `webfetch("https://www.google.com/search?q=site:github.com%20semver%20validation")`
2. Extract repos: `["semver/semver", "npm/node-semver", "mattfarina/semver-isvalid"]`
3. Query DeepWiki: `ask_question({ repoName: [...], question: "Is there a TypeScript-compatible package that can be used locally to validate semver strings?" })`
4. Provide answer with recommendations

## Tips

- Always search with `site:github.com` to find repositories directly
- Extract all relevant repositories before querying DeepWiki
- Use specific questions that mention the programming language or framework
- Query multiple repositories simultaneously when they're relevant
- Provide context about what the user is trying to accomplish in the DeepWiki question
