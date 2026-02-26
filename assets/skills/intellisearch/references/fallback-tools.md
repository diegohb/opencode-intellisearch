# Fallback Tools Reference

Documentation for fallback handling when primary tools are unavailable.

## Overview

The intellisearch skill routes between three main sources:
1. **Local workspace** - Primary source for project-specific questions
2. **deepWiki** - For GitHub repository questions (code-based answers)
3. **websearch** - OpenCode built-in tool for general queries

## Source Priority

**NOTE**: Local workspace is NOT a fallback - it is the PRIMARY source.

```
Priority Order:
1. LOCAL WORKSPACE - Project-specific questions (always check first)
2. DEEPWIKI - GitHub repository questions (code > docs)
3. WEBSEARCH - General knowledge, news, opinions
```

---

## websearch (OpenCode Built-in)

Standard OpenCode tool for general web search.

**Documentation**: https://opencode.ai/docs/tools/#websearch

### When to Use

- General knowledge questions
- News and current events
- Company/person research
- Discovering GitHub repositories (then switch to deepWiki)
- When deepWiki is unavailable

### Tool: `websearch`

**Parameters:**
- `query` (required): Search query string

**Example Usage:**
```json
{
  "tool": "websearch",
  "params": {
    "query": "React hooks tutorial"
  }
}
```

### GitHub Repo Detection

When websearch finds a GitHub repository, **switch to deepWiki** for code-based answers:

**Example:**
```
Query: "How does Express.js middleware work?"
→ websearch finds "expressjs/express"
→ Switch to deepWiki for code-based answer
→ deepWiki_ask_question with repo "expressjs/express"
```

**Why**: Code is always better than docs. deepWiki provides authoritative answers from the actual codebase.

---

## deepWiki MCP

Repository-specific Q&A for GitHub projects.

**Documentation**: https://docs.devin.ai/work-with-devin/deepwiki-mcp

### When to Use

- Questions about specific GitHub repositories
- Library/framework implementation details
- API usage patterns for known packages
- Installation/setup instructions

### Tool: `deepWiki_ask_question`

**Parameters:**
- `repoName` (required): Repository in `owner/repo` format
- `question` (required): Specific question about the repository

**Example Usage:**
```json
{
  "tool": "deepwiki:deepWiki_ask_question",
  "params": {
    "repoName": "vercel/next.js",
    "question": "How do I create a dynamic route with parameters?"
  }
}
```

### When deepWiki is Unavailable

If deepWiki MCP server is unavailable:
1. Use websearch results as fallback
2. Report that deepWiki was unavailable
3. Continue with websearch findings

---

## Error Handling

### deepWiki Unavailable

| Error | Action |
|-------|--------|
| MCP connection error | Use websearch results |
| Timeout | Use websearch results |
| Repo not indexed | Use websearch results |

### websearch Errors

| Error | Action |
|-------|--------|
| No results found | Try broader query |
| Rate limited | Wait and retry |
| Connection error | Report failure |

### Reporting Fallback Usage

Always report which tool ultimately provided results:

```
Search Results:
- Local Workspace: [✓ Match found / ✗ Not project-specific]
- deepWiki: [✓ Used / ✗ Unavailable / ✗ Not applicable]
- websearch: [✓ Used / ✗ Unavailable]
- Results Source: [Local/deepWiki/websearch/None]

Summary: [Brief description of results found]
```

---

## Decision Matrix

| Situation | Primary | Fallback |
|-----------|---------|----------|
| Project-specific code | Local workspace | websearch |
| GitHub repo docs | deepWiki | websearch |
| General web search | websearch | - |
| News/current events | websearch | - |
| Company research | websearch | - |
| Academic research | websearch | - |

---

## Integration with Memory Caching

When using tools, cache results for reuse:

```javascript
// After successful search
write_memory({
  key: "intellisearch_cache",
  value: {
    "query_hash_abc123": {
      "query": "React Server Components",
      "source_type": "deepwiki",  // or "local" or "websearch"
      "tool_used": "deepwiki",
      "repo_found": "facebook/react",
      "timestamp": "2026-02-01T12:00:00Z",
      "result_summary": "Code-based answer about RSC architecture"
    }
  }
})
```

This prevents repeated searches for the same query.
