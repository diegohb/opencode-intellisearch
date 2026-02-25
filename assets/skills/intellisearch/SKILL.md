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

## Local Codebase - Best Truth Source

**CRITICAL**: When workspace/file context is available, the local codebase is the **BEST TRUTH SOURCE** and MUST be prioritized before any external search.

### Best Truth Source Hierarchy

```
Priority Order (Highest to Lowest):
1. LOCAL CODEBASE (workspace files) - Best for project-specific questions
2. EXTERNAL REPOS (deepWiki) - Best for library/framework questions  
3. WEB SEARCH (Exa) - Best for general knowledge, news, opinions
4. FALLBACKS (DuckDuckGo, webfetch) - When primary tools unavailable
```

### When to Use Local Codebase

Always search local workspace FIRST when:
- Question relates to the current project/workspace
- User asks "how does X work in this codebase"
- Query involves project-specific patterns, configs, or structure
- Looking for implementation details within the workspace

### When to Skip Local Codebase

Go directly to external search when:
- Question is about external libraries/frameworks NOT in the workspace
- User explicitly asks about a different project/repository
- Information needed is general (not project-specific)
- Local search already attempted and yielded no relevant results

### Local vs External Decision Tree

```
Question about code/technology?
    ↓
Has workspace/file context available?
    ↓
Yes /    \ No
   ↓        ↓
Search   Check if query mentions
local    specific external repo?
codebase      ↓
    ↓    Yes /    \ No
Found?        ↓        ↓
    ↓     deepWiki  Exa web
Yes /  \ No       search
   ↓     ↓
Use    Try external
local  (deepWiki/Exa)
```

## Required MCP Servers

- **exa** - Web search with category filters (news, company, people, research paper)
- **deepwiki** - Repository-specific documentation Q&A for GitHub projects

## Smart Routing Overview

```
QUERY → Classify → Route

Has workspace context? → YES → Search LOCAL CODEBASE first (BEST TRUTH)
                              ↓ No match / not project-specific
                          NO ↓
Code/Tech? → Check for GitHub repo → Repo found? → deepWiki (authoritative)
                                      ↓ No repo
News?      → Exa (category: news)          → Exa (community perspectives)
Company?   → Exa (category: company)
Person?    → Exa (category: people)
Research?  → Exa (category: research paper)
General?   → Exa (web_search_exa)
```

**Priority Rule**: Always check local workspace before external sources. The local codebase is the authoritative source for project-specific questions.

**Special Rule**: Queries with category "github" redirect to deepWiki.

## Quick Start

**IMPORTANT**: Always check local workspace first. The local codebase is the BEST TRUTH for project-specific questions.

**Local codebase question (project-specific):**
```json
{
  "tool": "grep or read relevant workspace files",
  "params": {
    "query": "search terms in local files"
  }
}
```
If local search yields relevant results → Use local codebase as authority.
If no local match → Proceed to external search.

**Code/technology question (external library):**
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

**NOTE**: The local codebase is NOT a fallback - it is the PRIMARY source. External tools are the fallback when local search doesn't apply or yields no results.

When external MCP servers fail or are unavailable, use this fallback chain:

**Source Priority (not fallback order):**
1. **Primary**: Local workspace files (when project-specific question)
2. **Secondary**: Exa MCP (`exa:web_search_exa`, etc.)
3. **Tertiary**: deepWiki for GitHub repos
4. **Last Resort**: DuckDuckGo tools (if available)
5. **Final**: webfetch (standard OpenCode tool)

**Actual Fallback Process (for external tools):**
```
Exa MCP available?
    ↓ No
Try DuckDuckGo search
    ↓ Unavailable or no results
Use webfetch for specific URLs
    ↓ No URLs available
Report clear failure message
```

**Tool Selection by Source Priority:**

| Priority | Tool | Use When |
|----------|------|----------|
| 1 (Primary) | Local workspace files | Project-specific questions, code in current codebase |
| 2 | `exa:web_search_exa` | Default for all external searches |
| 2 | `deepwiki:deepWiki_ask_question` | GitHub repo questions (when no local match) |
| 3 | `duckduckgo_search` | Exa unavailable |
| 4 | `webfetch` | Direct URL access only |

**Key Principle**: Local workspace is ALWAYS checked first for code/technology questions about the current project.

See [references/fallback-tools.md](references/fallback-tools.md) for detailed fallback documentation.

## Memory Caching

If memory tool is available, cache successful search results for reuse.

**Cache Structure:**
```json
{
  "intellisearch_cache": {
    "[query_hash]": {
      "query": "original query",
      "source_type": "local|exa|deepwiki|duckduckgo|webfetch",
      "tool_used": "exa|deepwiki|duckduckgo|webfetch",
      "repo_found": "owner/repo|null",
      "local_match": true|false,
      "timestamp": "ISO timestamp",
      "result_summary": "brief summary"
    }
  }
}
```

**Cache Check Process:**
1. Before executing a search, check for exact query match
2. Check for semantic similarity (same topic/technology)
3. If cached local match exists → use local workspace results
4. If cached repo found → skip detection, use cached routing decision

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

- **Check local workspace first** - Most token-efficient, always authoritative for project-specific questions
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
