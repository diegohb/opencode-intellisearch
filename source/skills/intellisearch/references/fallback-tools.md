# Fallback Tools Reference

Documentation for fallback tools when primary MCP servers are unavailable.

## Overview

When Exa MCP or deepWiki MCP servers fail or are unavailable, use these fallback tools to continue providing web search capabilities.

## Fallback Chain

```
Primary:   Exa MCP → deepWiki MCP
              ↓
Secondary: DuckDuckGo search
              ↓
Tertiary:  webfetch (direct URL access)
              ↓
Failure:   Report unavailable
```

---

## DuckDuckGo Search (Optional)

Optional search tool available in some OpenCode configurations. Use when Exa is unavailable and DuckDuckGo is configured.

**Availability**: Check if `duckduckgo_search` tool is available in your session before using.

### When to Use

- Exa MCP server connection fails
- Need search without MCP configuration
- Token budget constraints
- Quick searches without category filtering

### Tool: `duckduckgo_search` (If Available)

**Parameters:**
- `query` (required): Search query string
- `max_results`: Number of results (default: 5)

**Example Usage:**
```json
{
  "tool": "duckduckgo_search",
  "params": {
    "query": "React hooks tutorial",
    "max_results": 5
  }
}
```

**Note**: If DuckDuckGo is not available in your session, skip directly to webfetch or report unavailability.
```

### Comparison: DuckDuckGo vs Exa

| Feature | DuckDuckGo | Exa |
|---------|------------|-----|
| MCP Required | No | Yes |
| Category Filtering | No | Yes (news, company, etc.) |
| Time Filtering | No | Yes (maxAgeHours) |
| Content Modes | Summary only | highlights/text |
| Code Search | General | Specialized |
| Cost | Lower | Higher |

### DuckDuckGo Best Practices

1. **Broader queries work better** - No category filters, so include context in query
2. **More results may be needed** - Less targeted than Exa
3. **Manual filtering required** - Review results for relevance
4. **Combine with webfetch** - Use URLs from results for full content

**Good queries:**
- "React hooks best practices 2025"
- "Stripe API documentation official"
- "Python async tutorial site:python.org"

**Poor queries (too narrow):**
- "React" (too broad without context)
- Just "hooks" (ambiguous)

---

## webfetch

Standard OpenCode tool for fetching content from specific URLs.

### When to Use

- All search tools are unavailable
- You have known authoritative URLs
- Partial results contain URLs to explore
- Need content from specific documentation sites

### Tool: `webfetch`

**Parameters:**
- `url` (required): Full URL to fetch
- `format`: Output format - `"markdown"`, `"text"`, or `"html"` (default: markdown)

**Example Usage:**
```json
{
  "tool": "webfetch",
  "params": {
    "url": "https://react.dev/docs/hooks-intro",
    "format": "markdown"
  }
}
```

### Extracting URLs from Failed Attempts

When Exa or DuckDuckGo partially fails but returns URLs:

**1. From Error Messages:**
- Extract domain from connection errors
- Attempt direct fetch to main documentation site

**2. From Partial Results:**
- If search returns URLs but not full content
- webfetch each URL for complete information

**3. Known Authoritative Sources:**

| Technology | Likely Documentation URL |
|------------|-------------------------|
| React | `https://react.dev/docs/[topic]` |
| Vue | `https://vuejs.org/guide/[topic]` |
| Next.js | `https://nextjs.org/docs/[topic]` |
| TypeScript | `https://www.typescriptlang.org/docs/[topic]` |
| Python | `https://docs.python.org/3/[topic]` |
| npm package | `https://www.npmjs.com/package/[name]` |

**Example:**
```
User asks about "zod validation"

If search fails:
  Try: webfetch({
    url: "https://zod.dev/",
    format: "markdown"
  })
```

### webfetch Limitations

- Requires knowing the URL in advance
- Some sites block automated fetching
- JavaScript-rendered content may not load
- Rate limits may apply

---

## Complete Fallback Examples

### Example 1: Exa Unavailable, Use DuckDuckGo

```javascript
// Primary tool fails
// User asks: "What are React Server Components?"

// Fallback to DuckDuckGo
duckduckgo_search({
  query: "React Server Components explained",
  max_results: 5
})

// Results provide URLs
// Optionally webfetch key URLs for more detail
webfetch({
  url: "https://react.dev/blog/2023/03/22/react-server-components",
  format: "markdown"
})
```

### Example 2: All Search Tools Unavailable

```javascript
// Both Exa and DuckDuckGo fail
// User asks about "Next.js app router"

// Use known authoritative URL
webfetch({
  url: "https://nextjs.org/docs/app",
  format: "markdown"
})

// If that fails, try alternative sources
webfetch({
  url: "https://github.com/vercel/next.js/tree/canary/docs",
  format: "markdown"
})
```

### Example 3: Partial Results with URLs

```javascript
// Exa returns connection error but partial results show URLs
// Results snippet: "See documentation at https://docs.example.com/..."

// Extract and fetch the URL
webfetch({
  url: "https://docs.example.com/guide",
  format: "markdown"
})
```

---

## Error Handling for Fallbacks

### DuckDuckGo Errors

| Error | Action |
|-------|--------|
| No results found | Broaden query, try synonyms |
| Rate limited | Wait briefly, retry |
| Connection error | Skip to webfetch |

### webfetch Errors

| Error | Action |
|-------|--------|
| 404 Not Found | Try alternative URL paths |
| 403 Forbidden | Site blocks automation, try alternative source |
| Timeout | Retry once, then skip |
| Content too short | JavaScript-rendered site, try alternative |

### Reporting Fallback Usage

Always report which tool ultimately provided results:

```
Search Results:
✗ Exa MCP: Unavailable
✓ DuckDuckGo: 5 results found
✗ webfetch: Not needed

Source: DuckDuckGo (fallback)
[Results summary]
```

---

## Decision Matrix

| Situation | Primary | Fallback | Last Resort |
|-----------|---------|----------|-------------|
| General web search | Exa | DuckDuckGo | - |
| GitHub repo docs | deepWiki | Exa + DuckDuckGo | webfetch docs site |
| News/current events | Exa (category: news) | DuckDuckGo | - |
| Company research | Exa (category: company) | DuckDuckGo | Company website |
| Academic research | Exa (category: research paper) | DuckDuckGo | Direct journal URLs |
| Code examples | Exa | DuckDuckGo | GitHub raw URLs |

---

## Integration with Memory Caching

When using fallback tools, still cache results:

```javascript
// After successful fallback search
write_memory({
  key: "intellisearch_cache",
  value: {
    "query_hash_abc123": {
      "query": "React Server Components",
      "tool_used": "duckduckgo",  // Note fallback tool
      "repo_found": null,
      "timestamp": "2026-02-01T12:00:00Z",
      "result_summary": "5 results about RSC architecture",
      "fallback_used": true  // Mark as fallback
    }
  }
})
```

This prevents repeated fallback attempts for the same query.
