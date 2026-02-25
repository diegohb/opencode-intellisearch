# Routing Workflows

Detailed decision trees and workflows for intelligent search routing.

## CRITICAL: Local Codebase is Best Truth Source

When workspace/file context is available, the local codebase is the **BEST TRUTH SOURCE** and MUST be checked before any external search.

**Source Priority (Highest to Lowest):**
1. **LOCAL CODEBASE** - Best for project-specific questions
2. **EXTERNAL REPOS (deepWiki)** - Best for library/framework questions  
3. **WEB SEARCH (Exa)** - Best for general knowledge, news, opinions
4. **FALLBACKS** - DuckDuckGo, webfetch when primary tools unavailable

## Contents

1. [Local Codebase Workflow](#local-codebase-workflow)
2. [Code/Technology Workflow](#codetechnology-workflow)
3. [News Workflow](#news-workflow)
4. [Company Workflow](#company-workflow)
5. [Person Workflow](#person-workflow)
6. [Research Workflow](#research-workflow)
7. [Token Optimization Tips](#token-optimization-tips)
8. [Fallback Chain](#fallback-chain)

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
| No local match | External search | deepWiki/Exa |

---

## Code/Technology Workflow

**Primary use case** - handles framework, library, API, and general coding questions.

### Decision Tree

```
User asks about code/technology
          ↓
    Is it a specific
    GitHub repository?
          ↓
    Yes /    \ No
       /      \
   deepWiki   Search Exa for
   (ask)      "[tech] github"
                   ↓
            GitHub repo found?
                   ↓
              Yes /    \ No
                 /      \
             deepWiki   Opinion/comparison
             (ask)      question?
                            ↓
                       Yes /    \ No
                          /      \
                      Exa        Exa
                   (general)  (technical docs)
```

### Step-by-Step Process

**Step 1: Detect Repository**
```json
{
  "tool": "exa:web_search_exa",
  "params": {
    "query": "[technology] github",
    "type": "fast",
    "num_results": 3
  }
}
```

**Step 2: Route Based on Results**

| Result | Action | Tool |
|--------|--------|------|
| GitHub repo found | Use deepWiki | `deepwiki:deepWiki_ask_question` |
| No repo, opinion question | Get perspectives | `exa:web_search_exa` |
| No repo, technical question | Search docs | `exa:web_search_exa` |

**Example Opinion Question**: "React vs Vue in 2025?"
→ Use Exa for community perspectives

**Example Technical Question**: "How do React hooks work?"
→ Try deepWiki first (facebook/react), fallback to Exa

---

## News Workflow

For current events and time-sensitive information.

### Decision Tree

```
News/current events query
          ↓
    How recent?
          ↓
    Breaking (<6h)   Recent (6-48h)   Older (>48h)
         ↓               ↓               ↓
    maxAgeHours: 6  maxAgeHours: 48  maxAgeHours: 168
    + category: news + category: news  + category: news
```

### Parameters by Urgency

| Urgency | maxAgeHours | num_results | content |
|---------|-------------|-------------|---------|
| Breaking | 6 | 10 | highlights |
| Recent | 24 | 7 | highlights |
| Standard | 48 | 5 | highlights |
| Archive | 168+ | 5 | text |

### Example Queries

**Breaking news:**
```json
{
  "query": "stock market crash today",
  "category": "news",
  "maxAgeHours": 6,
  "num_results": 10
}
```

**Weekly roundup:**
```json
{
  "query": "AI developments this week",
  "category": "news",
  "maxAgeHours": 168,
  "num_results": 7
}
```

---

## Company Workflow

For business research, funding news, and company information.

### Decision Tree

```
Company research query
          ↓
    What type of info?
          ↓
    Financial /    \ General
    funding           info
       ↓               ↓
   company_research  web_search_exa
   _exa              + category: company
   (include_
   financials: true)
```

### Tool Selection

| Information Needed | Tool | Parameters |
|-------------------|------|------------|
| Financial data, funding | `exa:company_research_exa` | `include_financials: true` |
| Recent news about company | `exa:company_research_exa` | `include_news: true` |
| General company info | `exa:web_search_exa` | `category: "company"` |
| Products/services | `exa:web_search_exa` | `category: "company"` |

### Example Queries

**Comprehensive research:**
```json
{
  "tool": "exa:company_research_exa",
  "params": {
    "company_name": "Stripe",
    "include_financials": true,
    "include_news": true
  }
}
```

**Quick lookup:**
```json
{
  "tool": "exa:web_search_exa",
  "params": {
    "query": "Stripe pricing 2025",
    "category": "company",
    "num_results": 5
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
    Professional /    \ Public
    (LinkedIn)          figure
         ↓                ↓
   linkedin_search    web_search_exa
   _exa               + category: people
```

### Tool Selection

| Use Case | Tool | Example |
|----------|------|---------|
| Professional background | `exa:linkedin_search_exa` | "CTO at tech companies" |
| Public figure news | `exa:web_search_exa` + category:people | "Elon Musk latest" |
| General person lookup | `exa:web_search_exa` + category:people | "Author of book" |

### Example Queries

**Professional search:**
```json
{
  "tool": "exa:linkedin_search_exa",
  "params": {
    "query": "VP Engineering San Francisco",
    "type": "auto",
    "num_results": 5
  }
}
```

**Public figure:**
```json
{
  "tool": "exa:web_search_exa",
  "params": {
    "query": "Satya Nadella latest announcements",
    "category": "people",
    "maxAgeHours": 48
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
    Specific paper /    \ General topic
    known title            research
          ↓                  ↓
    web_search_exa       web_search_exa
    + category:          + category:
      research paper       research paper
```

### Parameters for Research

| Query Type | num_results | content | maxAgeHours |
|------------|-------------|---------|-------------|
| Recent papers | 5 | highlights | 2160 (3 months) |
| Seminal works | 10 | text | null (any time) |
| Survey/review | 5 | text | 4320 (6 months) |

### Example Queries

**Recent research:**
```json
{
  "tool": "exa:web_search_exa",
  "params": {
    "query": "transformer architecture improvements 2024",
    "category": "research paper",
    "maxAgeHours": 2160,
    "num_results": 5
  }
}
```

**Classic papers:**
```json
{
  "tool": "exa:web_search_exa",
  "params": {
    "query": "attention is all you need",
    "category": "research paper",
    "num_results": 3,
    "content": "text"
  }
}
```

---

## Token Optimization Tips

### Priority: Local Workspace First

**Most important**: Check local workspace first - it's the most token-efficient AND most authoritative for project-specific questions.

### Progressive Search Strategy

1. **Start with local** - Check workspace files for project-specific questions
2. **Then external** - Use deepWiki/Exa for external library questions
3. **Start small**: Use `type: "fast"` and `highlights` for initial search
4. **Expand only if needed**: Switch to `text` mode for deep analysis
5. **Limit results**: Use minimum `num_results` that satisfies the query
6. **Use deepWiki for code**: Often more concise than web search results

### Content Mode Selection

| Goal | Recommended Mode | Why |
|------|------------------|-----|
| Quick answer | `highlights` | Most token-efficient |
| Summary | `highlights` | Key points only |
| Full context | `text` | Complete information |
| Quotes/citations | `text` | Exact wording needed |

### Result Count Guidelines

| Query Complexity | Recommended num_results |
|-----------------|------------------------|
| Simple factual | 3-5 |
| Comparison | 5-7 |
| Research synthesis | 7-10 |
| Breaking news | 10 |

### Special Rule: GitHub Category Redirect

If a query would use Exa with `category: "github"` about a specific repository, **redirect to deepWiki instead**.

**Example**: "How does React's virtual DOM work?"
- Bad: `exa:web_search_exa` with `category: "github"`
- Good: `deepwiki:deepWiki_ask_question` with `repoName: "facebook/react"`

---

## Fallback Chain

**NOTE**: Local workspace is NOT a fallback - it is the PRIMARY source. External tools are the actual fallbacks when local doesn't apply.

When primary MCP servers fail or external search is needed, use this workflow.

### Source Priority Order (Not Fallback Order)

| Priority | Source | Tool | Use When |
|----------|--------|------|----------|
| 1 (Best) | Local workspace | grep/read | Project-specific questions |
| 2 | deepWiki | deepWiki_ask_question | External GitHub repo questions |
| 3 | Exa | web_search_exa | General web search |
| 4 | DuckDuckGo | duckduckgo_search | Fallback when Exa unavailable |
| 5 | webfetch | webfetch | Direct URL access |

### Actual Fallback Process (For External Tools)

| Priority | Tool | MCP Server | Use Case |
|----------|------|------------|----------|
| 1 | `exa:web_search_exa` | exa | All web searches (default) |
| 2 | `deepwiki:deepWiki_ask_question` | deepwiki | GitHub repository questions |
| 3 | `duckduckgo_search` | None (built-in) | Fallback web search |
| 4 | `webfetch` | None (built-in) | Direct URL fetching |

### When to Use Each Fallback

**Use DuckDuckGo when:**
- Exa MCP server is unavailable
- Exa returns connection errors
- Need quick search without MCP setup
- Token budget constraints for MCP calls

**Use webfetch when:**
- All search tools are unavailable
- You have specific authoritative URLs
- Partial results contain URLs to fetch
- Need content from known documentation sites

**Report failure when:**
- No search tools are available
- No results from any tool
- URLs cannot be fetched
- User input cannot be satisfied

### Fallback Decision Tree

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
No → Check Memory Cache
    ↓
Cache hit?
    ↓
Yes → Use cached routing decision
    ↓
No → Try External Tools (Exa/deepWiki)
    ↓
External tool available?
    ↓
Yes → Execute search → Cache result → Return
    ↓
No → Try DuckDuckGo
    ↓
DuckDuckGo available?
    ↓
Yes → Execute search → Cache result → Return
    ↓
No → Extract URLs from context
    ↓
URLs available?
    ↓
Yes → webfetch URLs → Cache result → Return
    ↓
No → Report clear failure
```

### Memory Caching in Fallback Chain

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
      "source_type": "local|exa|deepwiki|duckduckgo|webfetch",
      "tool_used": "local|exa|deepwiki|duckduckgo|webfetch",
      "local_match": true|false,
      "repo_found": "owner/repo|null",
      "timestamp": "2026-02-01T12:00:00Z",
      "result_summary": "brief summary",
      "category": "local|code|news|company|person|research|general"
    }
  }
}
```

### Fallback Workflow Checklist

Before executing any search:

```
Search Preparation:
- [ ] Check memory cache for similar queries
- [ ] Verify primary tool availability
- [ ] Identify fallback options if needed

During Search:
- [ ] Attempt primary tool first
- [ ] If fails, try DuckDuckGo
- [ ] If no results, try webfetch with URLs
- [ ] Report which tool succeeded

After Search:
- [ ] Cache successful results
- [ ] Note any fallback tools used
- [ ] Update cache timestamp
```

### Error Reporting Format

When searches are performed, report clearly:

```
Search Results:
- Local Workspace: [✓ Match found / ✗ Not project-specific]
- Primary Tool: Exa MCP [✓ available / ✗ unavailable]
- Fallback Used: DuckDuckGo [✓ / ✗] → webfetch [✓ / ✗]
- Results Source: [Local/Exa/DuckDuckGo/webfetch/None]
- Cache Status: [Hit / Miss / Updated]

Summary: [Brief description of results found]
```
