---
name: intellisearch
description: Searches for technical answers by finding GitHub repositories and querying them with DeepWiki. Use when users ask technical questions about frameworks, libraries, APIs, or need documentation from code repositories.
license: MIT
compatibility: opencode
metadata:
  audience: agents
  topic: github-repository-search
---

## Definitions

| Term | Definition | OpenCode Example |
|------|------------|------------------|
| **Fetch Tool** | Reads content from URL parameter. Returns page content converted to text/markdown. | `webfetch` |
| **Search Tool** | Takes query string and searches web. Encapsulates search engine URLs/API calls. | `websearch` |
| **Native Tool** | Built-in tool provided by agent platform. No external configuration required. | `webfetch`, `websearch` |
| **Third-Party Tool** | External tool from MCP server or plugin. Requires configuration. | `google_search` (MCP) |
| **URI-Based Search** | Using fetch tools with search engine URLs directly. Requires manual URL construction. | `webfetch("https://google.com/search?q=...")` |

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

- **Search Tool** OR **Fetch Tool** - For web search capability
- **DeepWiki** - Repository-specific documentation Q&A for GitHub projects

## Workflow

```
[Detect: search tool or fetch tool?]
              ↓
1. Search with site:github.com pattern
              ↓
2. Extract GitHub repository references
              ↓
3. Query repositories with DeepWiki
              ↓
4. Provide answer based on results
```

**Tool detection & search strategy:** [search-workflow.md](references/search-workflow.md)

## Step 1: Search for GitHub Repositories

**Prefer search tools** (websearch, google_search) when available. Otherwise use fetch tools with URI-based search.

Construct query targeting GitHub repositories:
```
User: "How do I validate semver strings in TypeScript?"
Query: "site:github.com semver validation typescript"
```

**With search tool:**
```json
{ "query": "site:github.com semver validation typescript" }
```

**With fetch tool:** See [search-workflow.md](references/search-workflow.md) for URI-based search engine cycling.

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

**Critical format rules:**
- Single repository: `repoName="owner/repo"`
- Multiple repositories: `repoName=["owner1/repo1", "owner2/repo2"]`
- ❌ Wrong: `repoName=["owner/repo"]` (single-item array causes search failure)

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
1. Detect tools → search tool available
2. Search: `websearch("site:github.com semver validation")`
3. Extract repos: `["semver/semver", "npm/node-semver", "mattfarina/semver-isvalid"]`
4. Query DeepWiki: `ask_question({ repoName: [...], question: "Is there a TypeScript-compatible package for validating semver strings?" })`
5. Provide answer with recommendations

## Tips

- Always search with `site:github.com` to find repositories directly
- Extract all relevant repositories before querying DeepWiki
- Use specific questions that mention the programming language or framework
- Query multiple repositories simultaneously when they're relevant
- Provide context about what the user is trying to accomplish in the DeepWiki question

## Search Operator References

When using fetch tools for URI-based searching, leverage search operators to refine queries:

**Google Search**: `site:github.com` + `""` for exact phrases, `-` to exclude terms
- Full reference: [google-search.md](references/google-search.md)

**Brave Search**: `site:`, `intitle:`, `filetype:`, logical operators (AND/OR/NOT)
- Full reference: [brave-search.md](references/brave-search.md)

**DuckDuckGo**: `site:`, `intitle:`, `inurl:`, `filetype:`, bang shortcuts
- Full reference: [ddg-search.md](references/ddg-search.md)
