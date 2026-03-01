# Search Workflow

Tool detection and search strategy for finding GitHub repositories.

## Tool Priority

```
IF gh auth status succeeds:
  → Use gh search repos (direct GitHub API)
ELSE IF search_tool exists (websearch, google_search, etc.):
  → Use search tool with site:github.com
ELSE IF fetch_tool exists (webfetch, fetch, etc.):
  → Use URI-based search with engine cycling
ELSE:
  → Report: No search capability available
```

## GitHub CLI Strategy (Preferred)

Direct GitHub repository search via `gh` CLI.

**Detection:**
```bash
gh auth status  # Exit 0 = available and authenticated
```

**Search:**
```bash
gh search repos --topic=semver,validation --language=typescript --json nameWithOwner,stargazersCount --limit 10
```

**Process:**
1. Infer topics from query context
2. Infer language if mentioned
3. Get top 10 results
4. Sort by stargazersCount, return top 5

**Full reference:** [gh-cli.md](gh-cli.md)

## Search Tool Strategy (Fallback #1)

Use web search tools with `site:github.com` operator:

```json
{ "query": "site:github.com semver validation typescript" }
```

## URI-Based Strategy (Fallback #2)

When only fetch tools available, cycle through search engines:

| Engine | URL Format |
|--------|------------|
| Brave | `https://search.brave.com/search?q={terms}` |
| DuckDuckGo | `https://ddg.gg/?q={terms}` |
| Google | `https://www.google.com/search?q={terms}` |

**Error handling:** Try each in order, use first success.

**Example:**
```json
{
  "url": "https://search.brave.com/search?q=site:github.com%20semver%20validation",
  "format": "markdown",
  "timeout": 10
}
```

## Query Construction

```
site:github.com {technology} {feature} {language}
```

**Examples:**
- `site:github.com react hooks typescript`
- `site:github.com semver validation nodejs`

## References

- [gh-cli.md](gh-cli.md) - GitHub CLI search details
- [google-search.md](google-search.md) - Google operators
- [brave-search.md](brave-search.md) - Brave operators
- [ddg-search.md](ddg-search.md) - DuckDuckGo operators
