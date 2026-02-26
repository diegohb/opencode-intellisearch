# Routing Workflows

Detailed decision trees and workflows for intelligent search routing.

## CRITICAL: Local Codebase is Best Truth Source

When workspace/file context is available, the local codebase is the **BEST TRUTH SOURCE** and MUST be checked before any external search.

**Source Priority (Highest to Lowest):**
1. **LOCAL CODEBASE** - Best for project-specific questions
2. **DEEPWIKI (public GitHub repos)** - Best for library/framework questions (code > docs)
3. **WEBSEARCH (OpenCode default)** - Best for general knowledge, news, opinions

**Key Principle**: Code is always better than docs. When websearch finds a public GitHub repo, switch to deepWiki for authoritative code-based answers.

## Contents

1. [Local Codebase Workflow](#local-codebase-workflow)
2. [Code/Technology Workflow](#codetechnology-workflow)
3. [News Workflow](#news-workflow)
4. [Company Workflow](#company-workflow)
5. [Person Workflow](#person-workflow)
6. [Research Workflow](#research-workflow)
7. [Token Optimization Tips](#token-optimization-tips)

---

## Local Codebase Workflow

**ALWAYS check local workspace FIRST** when project context is available.

### Decision Tree

```
Question about code/technology?
    ↓
Is it project-specific? (this codebase, this project)
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

### When to Use Local Codebase

- Questions about "this codebase", "this project", "here"
- Looking for implementation details, patterns, configs
- Questions about project-specific code
- Query relates to the current workspace

### Step-by-Step Process

**Step 1: Check if project-specific**
- Does the query mention "this codebase", "this project", local context?
- Is the question about code that exists in the current workspace?

**Step 2: Search local workspace**
- Use grep/read to search workspace files
- Look for relevant implementations, configs, patterns

**Step 3: Route based on results**

| Result | Action | Tool |
|--------|--------|------|
| Local match found | Use local codebase | grep/read |
| No local match | External search | websearch → deepWiki |

---

## Code/Technology Workflow

**Primary use case** - handles framework, library, API, and general coding questions.

### Decision Tree

```
User asks about code/technology
          ↓
    Is it project-specific?
          ↓
     Yes /    \ No
        /      \
    Search     Use websearch
    local      to find repo
    codebase        ↓
        ↓     GitHub repo found?
    Found?          ↓
        ↓     Yes /    \ No
    Yes /  \ No   ↓        ↓
       ↓     ↓  deepWiki  websearch
    Use    Try  (code >    (general
    local  websearch  docs)    results)
```

### Step-by-Step Process

**Step 1: Check Local Workspace First**
- If project-specific, search local files
- If local match found, use local codebase as authority

**Step 2: Use websearch for External Discovery**
```json
{
  "tool": "websearch",
  "params": {
    "query": "[technology] github repository"
  }
}
```

**Step 3: Route Based on Results**

| Result | Action | Tool |
|--------|--------|------|
| GitHub repo found | Use deepWiki | `deepwiki:deepWiki_ask_question` |
| No repo, opinion question | Get perspectives | `websearch` |
| No repo, technical question | Search docs | `websearch` |

**Example Opinion Question**: "React vs Vue in 2025?"
→ Use websearch for community perspectives

**Example Technical Question**: "How do React hooks work?"
→ Try deepWiki first (facebook/react), fallback to websearch

---

## News Workflow

For current events and time-sensitive information.

### Decision Tree

```
News/current events query
          ↓
     Use websearch
          ↓
     Provide results
```

### Example Queries

**Breaking news:**
```json
{
  "tool": "websearch",
  "params": {
    "query": "stock market crash today"
  }
}
```

**Weekly roundup:**
```json
{
  "tool": "websearch",
  "params": {
    "query": "AI developments this week"
  }
}
```

---

## Company Workflow

For business research, funding news, and company information.

### Decision Tree

```
Company research query
          ↓
     Use websearch
          ↓
     Provide results
```

### Example Queries

**Comprehensive research:**
```json
{
  "tool": "websearch",
  "params": {
    "query": "Stripe company information pricing funding"
  }
}
```

**Quick lookup:**
```json
{
  "tool": "websearch",
  "params": {
    "query": "Stripe pricing 2025"
  }
}
```

---

## Person Workflow

For researching individuals, professionals, or public figures.

### Decision Tree

```
Person research query
          ↓
     Use websearch
          ↓
     Provide results
```

### Example Queries

**Professional search:**
```json
{
  "tool": "websearch",
  "params": {
    "query": "VP Engineering San Francisco tech"
  }
}
```

**Public figure:**
```json
{
  "tool": "websearch",
  "params": {
    "query": "Satya Nadella latest announcements"
  }
}
```

---

## Research Workflow

For academic papers, scientific research, and technical studies.

### Decision Tree

```
Research/academic query
          ↓
     Use websearch
          ↓
     Provide results
```

### Example Queries

**Recent research:**
```json
{
  "tool": "websearch",
  "params": {
    "query": "transformer architecture improvements 2024 research paper"
  }
}
```

**Classic papers:**
```json
{
  "tool": "websearch",
  "params": {
    "query": "attention is all you need paper"
  }
}
```

---

## Token Optimization Tips

### Priority: Local Workspace First

**Most important**: Check local workspace first - it's the most token-efficient AND most authoritative for project-specific questions.

### Progressive Search Strategy

1. **Start with local** - Check workspace files for project-specific questions
2. **Then external** - Use websearch for discovery
3. **Switch to deepWiki** - When GitHub repo found, use deepWiki for code-based answers
4. **Limit scope** - Be specific in search queries

### Content Mode Selection

| Goal | Recommended Tool | Why |
|------|------------------|-----|
| Project-specific | Local workspace | Most authoritative, most token-efficient |
| External library | websearch → deepWiki | Code-based answers are more accurate |
| General knowledge | websearch | Broad coverage |
| News/opinions | websearch | Current perspectives |

### Special Rule: GitHub Repo Detection

When websearch finds a GitHub repository, **switch to deepWiki** for code-based answers.

**Example**: "How does React's virtual DOM work?"
- Step 1: websearch finds "facebook/react"
- Step 2: Switch to deepWiki for code-based answer
- Why: Code is always better than docs

---

## Routing Summary

### Source Priority Order

| Priority | Source | Tool | Use When |
|----------|--------|------|----------|
| 1 (Best) | Local workspace | grep/read | Project-specific questions |
| 2 | deepWiki | deepWiki_ask_question | External GitHub repo questions |
| 3 | websearch | websearch | General knowledge, news, opinions |

### Routing Decision Tree

```
Start Search
    ↓
Is the question project-specific? (this codebase, this project)
    ↓
Yes → Search local workspace (BEST TRUTH)
    ↓
Local match found?
    ↓
Yes → Use local codebase → Cache result → Return
    ↓ No
No → Use websearch
    ↓
GitHub repo found?
    ↓
Yes → Switch to deepWiki (code > docs) → Cache result → Return
    ↓ No
Use websearch results → Cache result → Return
```

### Memory Caching

**Before Any Search:**
1. Check if query is project-specific → check local workspace first
2. Check `intellisearch_cache` in memory
3. Look for exact query match
4. Check for semantic similarity (same topic/technology)
5. If cached local match → use local workspace
6. If cached repo found → skip detection, use cached routing

**After Successful Search:**
1. Create cache entry with query hash
2. Store tool used and repo found (if any)
3. Include timestamp and result summary
4. Write updated cache to memory

**Cache Invalidation Rules:**
- **Local workspace queries**: Invalidate after 30 minutes
- **News queries**: Invalidate after 24 hours (time-sensitive)
- **Technology queries**: Invalidate after 7 days (docs may update)
- **General knowledge**: Keep indefinitely (stable information)
- **Manual override**: Always respect explicit user requests over cache

**Cache Structure:**
```json
{
  "intellisearch_cache": {
    "[query_hash]": {
      "query": "original query",
      "source_type": "local|deepwiki|websearch",
      "tool_used": "local|deepwiki|websearch",
      "local_match": true|false,
      "repo_found": "owner/repo|null",
      "timestamp": "2026-02-01T12:00:00Z",
      "result_summary": "brief summary",
      "category": "local|code|news|company|person|research|general"
    }
  }
}
```

### Routing Workflow Checklist

Before executing any search:

```
Search Preparation:
- [ ] Check if query is project-specific
- [ ] If yes, search local workspace first
- [ ] Check memory cache for similar queries

During Search:
- [ ] If local match found, use local codebase
- [ ] If external, use websearch for discovery
- [ ] If GitHub repo found, switch to deepWiki
- [ ] Report which tool succeeded

After Search:
- [ ] Cache successful results
- [ ] Note source used
- [ ] Update cache timestamp
```

### Error Reporting Format

When searches are performed, report clearly:

```
Search Results:
- Local Workspace: [✓ Match found / ✗ Not project-specific]
- deepWiki: [✓ Used / ✗ Unavailable / ✗ Not applicable]
- websearch: [✓ Used / ✗ Unavailable]
- Results Source: [Local/deepWiki/websearch/None]
- Cache Status: [Hit / Miss / Updated]

Summary: [Brief description of results found]
