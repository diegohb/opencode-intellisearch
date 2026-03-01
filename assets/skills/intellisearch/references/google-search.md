# Google Search Operators

Source: https://support.google.com/websearch/answer/2466433?hl=en

## Essential Operators

| Operator | Syntax | Example | Purpose |
|----------|--------|---------|---------|
| Exact match | `"phrase"` | `"tallest building"` | Exact phrase match |
| Site search | `site:domain.com` | `site:youtube.com cat videos` | Search specific domain |
| Exclude | `-word` | `jaguar speed -car` | Exclude word from results |

## Usage Notes

- No spaces between operator and search term: `site:nytimes.com` works, `site: nytimes.com` does not
- Operators can be combined: `site:github.com "typescirpt" tutorial -paid`
- Quotes are useful for exact phrases like `"order of the phoenix"`

## Common Patterns for GitHub Search

```bash
# Find repositories
site:github.com typescript validation

# Exact phrase
site:github.com "semantic versioning"

# Exclude results
site:github.com graph database -javascript

# Combined
site:github.com semver typescript validation -test
```
