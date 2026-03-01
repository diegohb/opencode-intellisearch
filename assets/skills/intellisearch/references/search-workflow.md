# Web Search Workflow

Tool detection and search strategy for finding GitHub repositories.

## Tool Detection

```
IF search_tool exists (websearch, google_search, brave_search, etc.):
  → Use search tool directly
ELSE IF fetch_tool exists (webfetch, fetch, etc.):
  → Use URI-based search with engine cycling
ELSE:
  → Report: No search capability available
```

## Search Tool Strategy (Preferred)

Use search tools directly - simpler and more reliable:

```json
{ "query": "site:github.com semver validation typescript" }
```

## URI-Based Search Strategy (Fallback)

When only fetch tools available, cycle through search engines:

### Engine Order (try in sequence)

1. **Brave**: `https://search.brave.com/search?q={terms}`
2. **DuckDuckGo**: `https://ddg.gg/?q={terms}`
3. **Google**: `https://www.google.com/search?q={terms}`

### Error Handling Pattern

```
FOR each engine IN [brave, duckduckgo, google]:
  result = fetch(engine_url)
  IF result.success AND has_content:
    RETURN result
  CONTINUE to next engine
RETURN error: all engines failed
```

### Example Implementation

```json
// Try Brave first
{
  "url": "https://search.brave.com/search?q=site:github.com%20semver%20validation",
  "format": "markdown",
  "timeout": 10
}

// If Brave fails, try DuckDuckGo
{
  "url": "https://ddg.gg/?q=site:github.com%20semver%20validation",
  "format": "markdown",
  "timeout": 10
}

// If DDG fails, try Google
{
  "url": "https://www.google.com/search?q=site:github.com%20semver%20validation",
  "format": "markdown",
  "timeout": 10
}
```

## Query Construction

Always prefix with `site:github.com`:

```
site:github.com {technology} {feature} {language}
```

**Examples:**
- `site:github.com react hooks typescript`
- `site:github.com semver validation nodejs`
- `site:github.com "graph database" python`

See operator references for advanced patterns:
- [google-search.md](google-search.md)
- [brave-search.md](brave-search.md)
- [ddg-search.md](ddg-search.md)
