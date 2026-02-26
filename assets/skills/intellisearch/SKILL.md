---
name: intellisearch
description: Intelligent search routing between local codebase, deepWiki MCP for GitHub repositories, and OpenCode websearch. Prioritizes local code as best truth source, then deepWiki for public repos, then websearch for general queries. Use for all web searches, code questions, documentation lookups, and research tasks.
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
2. DEEPWIKI (public GitHub repos) - Best for library/framework questions (code > docs)
3. WEBSEARCH (OpenCode default) - Best for general knowledge, news, opinions
```

**Key Principle**: Code is always better than docs. When you find a public GitHub repo during websearch, switch to deepWiki for authoritative answers from the actual code.

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
Search   Use websearch to
local    find GitHub repo
codebase      ↓
     ↓    GitHub repo found?
Found?        ↓
     ↓    Yes /    \ No
Yes /  \ No   ↓        ↓
   ↓     ↓  deepWiki  websearch
Use    Try  (code is   (general
local  websearch  better)   results)
```

## Required MCP Servers

- **deepwiki** - Repository-specific Q&A for GitHub projects (code-based answers)
- **websearch** - OpenCode built-in tool for general web search

## Smart Routing Overview

```
QUERY → Classify → Route

Has workspace context? → YES → Search LOCAL CODEBASE first (BEST TRUTH)
                              ↓ No match / not project-specific
                          NO ↓
Code/Tech? → websearch to find GitHub repo → Repo found? → deepWiki (code-based answers)
                                              ↓ No repo
News/Company/Person/Research/General? → websearch (OpenCode default)
```

**Priority Rule**: Always check local workspace before external sources. The local codebase is the authoritative source for project-specific questions.

**Code > Docs Rule**: When websearch finds a public GitHub repository, switch to deepWiki for authoritative code-based answers instead of relying on documentation.

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
  "tool": "websearch",
  "params": {
    "query": "technology library github"
  }
}
```
If websearch finds a GitHub repo → switch to deepWiki:
```json
{
  "tool": "deepwiki:deepWiki_ask_question",
  "params": {
    "repoName": "owner/repo",
    "question": "How do I implement X?"
  }
}
```

**General web search:**
```json
{
  "tool": "websearch",
  "params": {
    "query": "search query"
  }
}
```

**Repository documentation (known repo):**
```json
{
  "tool": "deepwiki:deepWiki_ask_question",
  "params": {
    "repoName": "owner/repo",
    "question": "How do I implement X?"
  }
}
```

## Routing Strategy

**NOTE**: The local codebase is NOT a fallback - it is the PRIMARY source. External tools are used when local search doesn't apply or yields no results.

**Source Priority:**
1. **Primary**: Local workspace files (when project-specific question)
2. **Secondary**: deepWiki for GitHub repos (code-based answers)
3. **Tertiary**: websearch (OpenCode default for general queries)

**Routing Process:**
```
1. Is question project-specific?
   → YES: Search local workspace first
   → Found? Use local codebase (BEST TRUTH)
   
2. Is question about external library/framework?
   → Use websearch to find GitHub repo
   → GitHub repo found? Switch to deepWiki (code > docs)
   → No repo? Use websearch results
   
3. Is question general knowledge/news/research?
   → Use websearch directly
```

**Tool Selection:**

| Question Type | Primary Tool | Fallback |
|---------------|--------------|----------|
| Project-specific code | Local workspace (grep/read) | websearch |
| External library/framework | websearch → deepWiki | websearch results |
| Known GitHub repo | deepWiki directly | websearch |
| General knowledge | websearch | - |
| News/current events | websearch | - |

**Key Principle**: Local workspace is ALWAYS checked first for code/technology questions about the current project.

## Memory Caching

If memory tool is available, cache successful search results for reuse.

**Cache Structure:**
```json
{
  "intellisearch_cache": {
    "[query_hash]": {
      "query": "original query",
      "source_type": "local|deepwiki|websearch",
      "tool_used": "local|deepwiki|websearch",
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

**deepWiki Unavailable:**
- Fall back to websearch results
- Report that deepWiki was unavailable
- Continue with websearch findings

**No Results:**
- Try broader search terms
- Report clearly: "No results found"

**Partial Results:**
- Present what was found
- Note any limitations
- Suggest alternative approaches

**Error Response Template:**
```
Tool Status:
- Local Workspace: [match found / not project-specific]
- deepWiki: [available/unavailable]
- websearch: [available/unavailable]
- Results: [X found / none found]

Result Summary: [brief description]
Source Used: [local/deepwiki/websearch]
```

## Token Optimization

- **Check local workspace first** - Most token-efficient, always authoritative for project-specific questions
- **Use deepWiki for GitHub repos** - Code-based answers are more accurate and often more concise than docs
- **Use websearch for discovery** - Find GitHub repos, then switch to deepWiki for detailed answers
- **Check memory cache** before executing new searches
- **Limit query scope** - Be specific in search queries

## References

- **deepWiki tools**: See [references/deepwiki-tools.md](references/deepwiki-tools.md)
- **Routing workflows**: See [references/routing-workflows.md](references/routing-workflows.md)
