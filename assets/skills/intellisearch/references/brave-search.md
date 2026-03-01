# Brave Search Operators

Source: https://search.brave.com/help/operators

## File & Content Operators

| Operator | Syntax | Example | Purpose |
|----------|--------|---------|---------|
| File extension | `ext:ext` | `honda gx120 manual ext:pdf` | Specific file extension |
| File type | `filetype:type` | `evaluation filetype:pdf` | File type (pdf, doc, etc.) |
| In body | `inbody:term` | `nvidia 1080 ti inbody:"founders edition"` | Term in page body |
| In title | `intitle:term` | `seo conference intitle:2023` | Term in page title |
| In page | `inpage:term` | `oscars 2024 inpage:"best costume"` | Term in title or body |

## Location & Language Operators

| Operator | Syntax | Example | Purpose |
|----------|--------|---------|---------|
| Language | `lang:code` or `language:code` | `visas lang:es` | Language (ISO 639-1 code) |
| Location | `loc:code` or `location:code` | `niagara falls loc:ca` | Country/region (ISO 3166-1 alpha-2) |

## Site & Term Operators

| Operator | Syntax | Example | Purpose |
|----------|--------|---------|---------|
| Site | `site:domain.com` | `goggles site:brave.com` | Search specific site |
| Include | `+term` | `gpu +freesync` | Must contain term |
| Exclude | `-term` | `office -microsoft` | Must not contain term |
| Exact match | `"phrase"` | `"order of the phoenix"` | Exact phrase |

## Logical Operators

| Operator | Syntax | Example | Purpose |
|----------|--------|---------|---------|
| AND | `term AND term` | `visa loc:gb AND lang:en` | All conditions met |
| OR | `term OR term` | `inpage:australia OR inpage:"new zealand"` | Any condition met |
| NOT | `term NOT condition` | `brave search NOT site:brave.com` | Excludes condition |

## Usage Notes

- Search operators are experimental and in early development
- Can place operators anywhere in query
- Language codes: ISO 639-1 (en, es, fr, etc.)
- Country codes: ISO 3166-1 alpha-2 (us, ca, gb, etc.)

## Common Patterns for GitHub Search

```bash
# Find PDF documentation
site:github.com "user guide" filetype:pdf

# Language-specific results
site:github.com react hooks lang:en

# Combined conditions
site:github.com typescript validator intitle:library AND loc:us

# Exclude specific results
site:github.com graph database -mongodb
```
