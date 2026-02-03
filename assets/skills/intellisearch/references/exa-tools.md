# Exa Tools Reference

Complete reference for Exa MCP server tools and configuration options.

## Available Tools

### web_search_exa
General-purpose web search with category filtering.

**Parameters:**
- `query` (required): Search query string
- `type`: `"fast"` or `"auto"` - fast is token-efficient
- `num_results`: Number of results (1-10, default: 5)
- `category`: Filter by content type
- `maxAgeHours`: Limit to recent content

### get_code_context_exa
Get code snippets and context for technical queries.

**Parameters:**
- `query`: Code-related search query
- `type`: `"fast"` or `"auto"`
- `num_results`: Number of code snippets

### company_research_exa
Research company information.

**Parameters:**
- `company_name`: Name of the company
- `include_financials`: Include financial data (boolean)
- `include_news`: Include recent news (boolean)

### linkedin_search_exa
Search for person/LinkedIn information.

**Parameters:**
- `query`: Person name or role
- `type`: `"fast"` or `"auto"`

## Content Configuration

### Search Types

| Type | Use When | Token Impact |
|------|----------|--------------|
| `fast` | Quick checks, repo detection | Low |
| `auto` | Complex queries, best results | Higher |

### Content Modes

| Mode | Returns | Best For |
|------|---------|----------|
| `highlights` | Key snippets | Initial exploration, summaries |
| `text` | Full content | Deep analysis, full articles |

**Recommendation**: Start with `highlights`, switch to `text` only when full content is necessary.

## Category Filters

Use `category` parameter to filter results:

| Category | Best For | Example Queries |
|----------|----------|-----------------|
| `news` | Current events | "AI breakthroughs", "market crash" |
| `company` | Business research | "Stripe pricing", "Tesla earnings" |
| `people` | Person lookup | "Elon Musk latest", "Satya Nadella" |
| `research paper` | Academic content | "transformer architecture", "machine learning survey" |
| `tweet` | Social media | "viral tweets", "announcements" |

## maxAgeHours Guidelines

| Timeframe | Hours | Use Case |
|-----------|-------|----------|
| Breaking | 6 | Live events, breaking news |
| Recent | 24 | Daily updates |
| Weekly | 168 | Week-old information |
| Monthly | 720 | Recent trends |

**Example**: `"maxAgeHours": 48` for news from the last 2 days.

## Code/Tech Search Patterns

### Repository Detection
```json
{
  "query": "[technology] github",
  "type": "fast",
  "num_results": 3
}
```

### Package/Library Lookup
```json
{
  "query": "npm package-name documentation",
  "type": "auto",
  "num_results": 5
}
```

### API Documentation
```json
{
  "query": "API-name docs examples",
  "type": "auto",
  "highlights": true
}
```

## Cost Optimization Tips

1. **Always use `fast` type** for initial/discovery searches
2. **Use `highlights` mode** before requesting full text
3. **Limit `num_results`** to what you actually need
4. **Use `maxAgeHours`** to avoid old, irrelevant content
5. **Switch to deepWiki** for GitHub repositories (often more accurate)

## When Exa is Unavailable

If Exa MCP server is not available, use the fallback chain.

### Fallback Priority

1. **DuckDuckGo search** - Try general web search
2. **webfetch** - Fetch specific URLs directly
3. **Report failure** - Clear message if all tools fail

### Detecting Unavailability

Exa tools may fail with these symptoms:
- Tool not found in available tools list
- Connection errors to MCP server
- Timeout on search requests
- Empty results repeatedly

### Fallback Actions

**If Exa unavailable:**
```json
{
  "tool": "duckduckgo_search",
  "params": {
    "query": "original query",
    "max_results": 5
  }
}
```

**If search returns URLs but content incomplete:**
```json
{
  "tool": "webfetch",
  "params": {
    "url": "https://example.com/docs",
    "format": "markdown"
  }
}
```

**Extract URLs from failed attempts:**
- If Exa returned partial results with URLs, use those URLs with webfetch
- Extract domain from error messages to attempt direct fetch
- Use known authoritative sources (e.g., `https://docs.[library].com`)

See [fallback-tools.md](fallback-tools.md) for complete fallback documentation.
