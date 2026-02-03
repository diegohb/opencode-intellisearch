---
name: intellisearch
description: Intelligent web search routing with automatic fallback handling and memory caching. Selects between Exa web search, deepWiki repository Q&A, DuckDuckGo, and webfetch based on query type and tool availability. Use for all web searches, code questions, documentation lookups, and research tasks.
license: MIT
compatibility: opencode
metadata:
  audience: agents
  topic: intelligent-search
---

## When to Use

Auto-trigger this skill when users ask about:
- Code/technology questions (frameworks, libraries, APIs)
- Current events or time-sensitive information
- Company or person research
- Academic/research queries
- General knowledge requiring external sources
- When uncertain if information exists in training data

## Required MCP Servers

- **exa** - Web search with category filters (news, company, people, research paper)
- **deepwiki** - Repository-specific documentation Q&A for GitHub projects

## Smart Routing Overview

```
QUERY → Classify → Route

Code/Tech? → Check for GitHub repo → Repo found? → deepWiki (authoritative)
                                      ↓ No repo
News?      → Exa (category: news)          → Exa (community perspectives)
Company?   → Exa (category: company)
Person?    → Exa (category: people)
Research?  → Exa (category: research paper)
General?   → Exa (web_search_exa)
```

**Special Rule**: Queries with category "github" redirect to deepWiki.

## Quick Start

**Code/technology question:**
```json
{
  "tool": "exa:web_search_exa",
  "params": {
    "query": "technology github",
    "type": "fast",
    "num_results": 3
  }
}
```
If repo found → use `deepwiki:deepWiki_ask_question`

**News query:**
```json
{
  "tool": "exa:web_search_exa",
  "params": {
    "query": "breaking news topic",
    "category": "news",
    "maxAgeHours": 48
  }
}
```

**Company research:**
```json
{
  "tool": "exa:web_search_exa",
  "params": {
    "query": "company name",
    "category": "company"
  }
}
```

**Repository documentation:**
```json
{
  "tool": "deepwiki:deepWiki_ask_question",
  "params": {
    "repoName": "owner/repo",
    "question": "How do I implement X?"
  }
}
```

## Fallback Strategy

When primary MCP servers fail or are unavailable, use this fallback chain:

**Priority Order:**
1. **Primary**: Exa MCP (`exa:web_search_exa`, etc.)
2. **Secondary**: DuckDuckGo tools (if available)
3. **Tertiary**: webfetch (standard OpenCode tool)

**Fallback Process:**
```
Exa MCP available?
    ↓ No
Try DuckDuckGo search
    ↓ Unavailable or no results
Use webfetch for specific URLs
    ↓ No URLs available
Report clear failure message
```

**Tool Selection by Fallback Level:**

| Level | Tool | Use When |
|-------|------|----------|
| Primary | `exa:web_search_exa` | Default for all searches |
| Primary | `deepwiki:deepWiki_ask_question` | GitHub repo questions |
| Secondary | `duckduckgo_search` | Exa unavailable |
| Tertiary | `webfetch` | Direct URL access only |

See [references/fallback-tools.md](references/fallback-tools.md) for detailed fallback documentation.

## Memory Caching

If memory tool is available, cache successful search results for reuse.

**Cache Structure:**
```json
{
  "intellisearch_cache": {
    "[query_hash]": {
      "query": "original query",
      "tool_used": "exa|deepwiki|duckduckgo|webfetch",
      "repo_found": "owner/repo|null",
      "timestamp": "ISO timestamp",
      "result_summary": "brief summary"
    }
  }
}
```

**Cache Check Process:**
1. Before executing a search, check for exact query match
2. Check for semantic similarity (same topic/technology)
3. If cached repo found → skip detection, use cached routing decision

**Cache Operations:**
```javascript
// Before search: Check memory
check_memory({
  key: "intellisearch_cache"
})

// After successful search: Update cache
write_memory({
  key: "intellisearch_cache",
  value: updated_cache
})
```

**Cache Benefits:**
- Skip redundant repo detection for known technologies
- Reuse routing decisions for follow-up questions
- Reduce token usage on repeated queries

## Error Handling

Handle failures gracefully with clear reporting:

**MCP Unavailable:**
- Automatically use fallback chain
- Report which fallback tool succeeded
- Continue with degraded functionality

**No Results:**
- Try broader search terms
- Use different tool in fallback chain
- Report clearly: "No results found from [tool name]"

**Partial Results:**
- Present what was found
- Note any limitations
- Suggest alternative approaches

**Error Response Template:**
```
Tool Status:
- Exa MCP: [available/unavailable]
- DuckDuckGo: [available/unavailable]
- Results: [X found from primary tool / fallback used / none found]

Result Summary: [brief description]
Fallback Used: [none/duckduckgo/webfetch]
```

## Token Optimization

- Use `"type": "fast"` for repository detection
- Use `"highlights"` for initial queries (saves tokens vs "text")
- Use deepWiki for code repos (more accurate, often more concise)
- Reserve `"text"` mode for full content analysis
- Check memory cache before executing new searches

## References

- **Exa tools**: See [references/exa-tools.md](references/exa-tools.md)
- **deepWiki tools**: See [references/deepwiki-tools.md](references/deepwiki-tools.md)
- **Routing workflows**: See [references/routing-workflows.md](references/routing-workflows.md)
- **Fallback tools**: See [references/fallback-tools.md](references/fallback-tools.md)
