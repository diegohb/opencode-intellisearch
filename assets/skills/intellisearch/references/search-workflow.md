# Web Search Workflow

Tool detection and search strategy for finding GitHub repositories.

## Tool Detection

Before searching, detect available tools:

```
1. Check for search tools: websearch, google_search, brave_search, etc.
2. Check for fetch tools: webfetch, fetch, etc.
3. Branch based on availability
```

## Decision Tree

```
┌─────────────────────────────────────────────────────────┐
│                   AVAILABLE TOOLS                        │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
              ┌───────────────────────┐
              │  Search tools exist?  │
              └───────────────────────┘
                    │           │
                   YES          NO
                    │           │
                    ▼           ▼
         ┌──────────────┐  ┌──────────────────────┐
         │ Use search   │  │ Use fetch tools with │
         │ tool directly│  │ URI-based search     │
         └──────────────┘  └──────────────────────┘
                    │           │
                    │           ▼
                    │    ┌─────────────────────┐
                    │    │ Cycle: Brave → DDG  │
                    │    │ → Google            │
                    │    │ (first success)     │
                    │    └─────────────────────┘
                    │           │
                    └───────────┘
                          │
                          ▼
              ┌───────────────────────┐
              │  Extract GitHub repos │
              └───────────────────────┘
```

## Search Tool Strategy

When search tools are available, use them directly with operators:

```json
{
  "query": "site:github.com semver validation typescript"
}
```

**Benefits:**
- Simpler - no URL construction needed
- Faster - single API call
- More reliable - no parsing HTML

## URI-Based Search Strategy

When only fetch tools are available, use search engine URLs:

### Search Engine URLs

| Engine | URL Format |
|--------|------------|
| Brave | `https://search.brave.com/search?q={terms}` |
| DuckDuckGo | `https://ddg.gg/?q={terms}` |
| Google | `https://www.google.com/search?q={terms}` |

### Error Handling

Try each engine in order until one succeeds:

```
1. Try Brave Search
   ↓ (on error)
2. Try DuckDuckGo
   ↓ (on error)
3. Try Google Search
   ↓ (on error)
4. Report failure
```

### Example Call

```json
{
  "url": "https://search.brave.com/search?q=site:github.com%20semver%20validation",
  "format": "markdown",
  "timeout": 10
}
```

## Query Construction

Always include `site:github.com` to target repositories:

```
site:github.com {search terms}
```

**With context:**
```
site:github.com {technology} {feature} {language}
```

**Example:**
```
site:github.com react hooks typescript
```
