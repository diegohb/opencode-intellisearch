# Best client-side Graph DBs for .NET and Aurelia

**Session ID:** ses_361f9d874ffetM3r6jIvgHmU9c
**Created:** 2/27/2026, 2:35:29 AM
**Updated:** 3/1/2026, 2:34:14 AM

---

## User

---

## Assistant (General · MiniMax-M2.5 · 116.9s)

**Tool: task**

**Input:**
```json
{
  "prompt": "Use the `skill` tool to load the `intellisearch` skill, then use it to answer this query:\n\n search the internet, do not use internal knowledge. show me 3 graph db solutions that fit best with my application and provide analysis (pros/cons). consider tech stack and current deployment model - preferring client-side solution over backend. \n\nbackend: dotnet 9 c# webapi\nfrontend: vitejs + aurelia 2",
  "description": "Search GitHub repositories for technical answers using DeepWiki",
  "subagent_type": "general",
  "command": "search-intelligently"
}
```

**Output:**
```
task_id: ses_357b02ce5ffe1TwNRCYDXt7weN (for resuming to continue this task if needed)

<task_result>
Based on my research, here are the **3 best graph database solutions** for your tech stack (ViteJS + Aurelia 2 frontend, .NET 9 WebAPI backend), prioritizing client-side solutions:

---

## 1. **TinkerGraph-js** (jbmusso/tinkergraph-js)
A pure JavaScript implementation of Apache TinkerPop's TinkerGraph - an in-memory graph database.

| Pros                                 | Cons                                  |
| ------------------------------------ | ------------------------------------- |
| Works in both Node.js and browser    | Not published to npm (manual install) |
| Implements standard TinkerPop API    | Not production-ready (WIP)            |
| ~20k vertices/second performance     | Low community activity (73 stars)     |
| Supports vertices, edges, properties | No TypeScript types                   |
| Idiomatic JavaScript API             | Limited documentation                 |

**Best for:** If you need standard graph operations and can work with the TinkerPop API pattern.

---

## 2. **Kùzu WASM** (unswdb/kuzu-wasm)
WebAssembly port of Kùzu embedded graph database - runs entirely in the browser.

| Pros                                       | Cons                        |
| ------------------------------------------ | --------------------------- |
| Runs in browser via WebAssembly            | Very new project (23 stars) |
| Cypher query language support              | Still in development        |
| Embedded (no backend required)             | Limited browser testing     |
| High-performance (compiled to WASM)        | May have larger bundle size |
| Compatible with standard graph DB patterns | Less community support      |

**Best for:** If you want Cypher query support and willing to use bleeding-edge WASM technology.

---

## 3. **LokiJS** (techfort/LokiJS)
Fast in-memory JavaScript document database with graph-like capabilities.

| Pros                                | Cons                                     |
| ----------------------------------- | ---------------------------------------- |
| Very popular (6.8k stars)           | Document-oriented, not native graph DB   |
| Runs in browser, Node, NativeScript | No native edge/relationship queries      |
| Excellent performance (1.1M ops/s)  | Requires workarounds for graph relations |
| Built-in indexing & views           | You model relationships manually         |
| Persistence adapters available      |                                          |
| Active community & good docs        |                                          |

**Best for:** If you need a fast client-side store and can model relationships within documents (or use its joins feature).

---

## Recommendation

For your **client-side preference** with ViteJS + Aurelia 2:

1. **First choice: LokiJS** - Most mature, excellent browser support, easy integration with Vite/Aurelia
2. **Second choice: TinkerGraph-js** - If you need true graph operations
3. **Alternative: Kùzu WASM** - If you want Cypher and are comfortable with early-stage tech

All three run entirely client-side, requiring no backend graph DB - fitting your preference perfectly.
</task_result>
```

---

## User

---

## Assistant (Plan · MiniMax-M2.5 · 7.4s)

_Thinking:_

The user wants me to summarize the task output and continue with the task. Let me analyze what happened:

1. The task was executed using an "intellisearch" skill that searches GitHub repositories using DeepWiki
2. The results show 3 graph DB solutions for a ViteJS + Aurelia 2 frontend with .NET 9 WebAPI backend

The user is asking me to summarize and continue. However, I notice the system reminder says I'm in "Plan Mode" - READ-ONLY phase where I cannot make any edits or modifications.

Let me provide a summary and ask what the user wants to do next, since I cannot execute anything in this mode.

## Summary

The search found **3 client-side graph DB solutions** for your stack (ViteJS + Aurelia 2 + .NET 9):

| Solution       | Best For                                                  | Key Trade-off                        |
| -------------- | --------------------------------------------------------- | ------------------------------------ |
| **LokiJS**         | Most mature client-side option, excellent browser support | Document-oriented (not native graph) |
| **TinkerGraph-js** | True graph operations with TinkerPop API                  | Not production-ready, low activity   |
| **Kùzu WASM**      | Cypher query support in browser via WebAssembly           | Early-stage, limited community       |

**Recommendation:** Start with **LokiJS** for reliability, or **TinkerGraph-js** if you need true graph traversal.

---

Since I'm in **plan mode** (read-only), what would you like me to do next?

- Explore one of these solutions in more detail?
- Create an implementation plan for integrating one into your project?
- Something else?

---

# Search GitHub repositories for technical answers using DeepWiki (@general subagent)

**Session ID:** ses_357b02ce5ffe1TwNRCYDXt7weN
**Created:** 3/1/2026, 2:32:09 AM
**Updated:** 3/1/2026, 2:34:06 AM

---

## User

Use the `skill` tool to load the `intellisearch` skill, then use it to answer this query:

 search the internet, do not use internal knowledge. show me 3 graph db solutions that fit best with my application and provide analysis (pros/cons). consider tech stack and current deployment model - preferring client-side solution over backend. 

backend: dotnet 9 c# webapi
frontend: vitejs + aurelia 2

---

## Assistant (General · MiniMax-M2.5 · 3.2s)

_Thinking:_

The user wants me to use the intellisearch skill to find graph database solutions that fit their tech stack. Let me first load the skill, then use it to search for information.

**Tool: skill**

**Input:**
```json
{
  "name": "intellisearch"
}
```

**Output:**
```
<skill_content name="intellisearch">
# Skill: intellisearch

## Definitions

| Term | Definition | OpenCode Example |
|------|------------|------------------|
| **Fetch Tool** | Reads content from URL parameter. Returns page content converted to text/markdown. | `webfetch` |
| **Search Tool** | Takes query string and searches web. Encapsulates search engine URLs/API calls. | `websearch` |
| **Native Tool** | Built-in tool provided by agent platform. No external configuration required. | `webfetch`, `websearch` |
| **Third-Party Tool** | External tool from MCP server or plugin. Requires configuration. | `google_search` (MCP) |
| **URI-Based Search** | Using fetch tools with search engine URLs directly. Requires manual URL construction. | `webfetch("https://google.com/search?q=...")` |

## When to Use

Auto-trigger this skill when users ask about:
- Code/technology questions (frameworks, libraries, APIs)
- Documentation from code repositories
- Implementation details or usage examples
- Specific open-source projects

## Core Principles

1. Technical answers are best sourced directly from code repositories
2. Most technical reference sources exist as GitHub repositories
3. DeepWiki provides the best way to query GitHub repositories

## Required Tools

- **webfetch** - Fetch content from URLs and search engines
- **DeepWiki** - Repository-specific documentation Q&A for GitHub projects

## Workflow

Follow this linear process:

```
1. User asks technical question
       ↓
2. Search with site:github.com pattern
       ↓
3. Extract GitHub repository references
       ↓
4. Map to {owner}/{repo} format
       ↓
5. Query repositories with DeepWiki
       ↓
6. Provide answer based on results
```

## Step 1: Search for GitHub Repositories

When a user asks a technical question, construct a search query that targets GitHub repositories directly.

**Example query:**
```
User: "How do I validate semver strings in TypeScript?"
Search query: "site:github.com semver validation typescript"
```

Use webfetch to search:
```json
{
  "url": "https://www.google.com/search?q=site:github.com%20semver%20validation%20typescript",
  "format": "markdown",
  "timeout": 10
}
```

## Step 2: Extract GitHub Repository References

From the search results, extract GitHub repository URLs using regex patterns.

**Detect these patterns:**
- `https://github.com/{owner}/{repo}` - Standard repository URL
- `https://{owner}.github.io/{repo}` - GitHub Pages site

**Example regex patterns:**
```
github\.com/([\w-]+)/([\w.-]+)
([\w-]+)\.github\.io/([\w.-]+)
```

**Extraction examples:**
- `https://github.com/npm/node-semver` → `npm/node-semver`
- `https://jubianchi.github.io/semver-check` → `jubianchi/semver-check`
- `https://github.com/mattfarina/semver-isvalid` → `mattfarina/semver-isvalid`

## Step 3: Query Repositories with DeepWiki

Use DeepWiki's `ask_question` tool to query the extracted repositories.

**Single repository:**
```json
{
  "repoName": "npm/node-semver",
  "question": "How do I validate semver strings in TypeScript?"
}
```

**Multiple repositories:**
```json
{
  "repoName": ["npm/node-semver", "mattfarina/semver-isvalid", "jubianchi/semver-check"],
  "question": "How do I validate semver strings in TypeScript?"
}
```

The `repoName` parameter accepts both a string (single repo) and an array of strings (multiple repos).

**Critical format rules:**
- Single repository: `repoName="owner/repo"`
- Multiple repositories: `repoName=["owner1/repo1", "owner2/repo2"]`
- ❌ Wrong: `repoName=["owner/repo"]` (single-item array causes search failure)

## Step 4: Provide Answer

Interpret DeepWiki responses and provide a clear, actionable answer to the user.

**Include:**
- Best options found
- Specific implementation guidance
- Code examples when available
- Links to relevant repositories

## Example Usage

**User request:**
```
"Find tools to validate semver specification strings"
```

**Process:**
1. Search: `webfetch("https://www.google.com/search?q=site:github.com%20semver%20validation")`
2. Extract repos: `["semver/semver", "npm/node-semver", "mattfarina/semver-isvalid"]`
3. Query DeepWiki: `ask_question({ repoName: [...], question: "Is there a TypeScript-compatible package that can be used locally to validate semver strings?" })`
4. Provide answer with recommendations

## Tips

- Always search with `site:github.com` to find repositories directly
- Extract all relevant repositories before querying DeepWiki
- Use specific questions that mention the programming language or framework
- Query multiple repositories simultaneously when they're relevant
- Provide context about what the user is trying to accomplish in the DeepWiki question

Base directory for this skill: file:///C:/dev/projects/playground/aigpt/test-websearch/.opencode/skills/intellisearch
Relative paths in this skill (e.g., scripts/, reference/) are relative to this base directory.
Note: file list is sampled.

<skill_files>
<file>C:\dev\projects\playground\aigpt\test-websearch\.opencode\skills\intellisearch\references\deepwiki-tools.md</file>
<file>C:\dev\projects\playground\aigpt\test-websearch\.opencode\skills\intellisearch\.version</file>
</skill_files>
</skill_content>
```

---

## Assistant (General · MiniMax-M2.5 · 8.5s)

_Thinking:_

Now I need to search for graph database solutions that fit with the user's tech stack:
- Backend: .NET 9 C# WebAPI
- Frontend: ViteJS + Aurelia 2
- Preference: Client-side solution over backend

Let me search for graph databases that work well with this stack, particularly client-side options.

**Tool: webfetch**

**Input:**
```json
{
  "format": "markdown",
  "url": "https://www.google.com/search?q=site:github.com+graph+database+javascript+client-side+in-memory"
}
```

**Output:**
```
Google Search

Please click [here](/httpservice/retry/enablejs?sei=huujabS_BdfuiLMP9ZL0yAI) if you are not redirected within a few seconds.

If you're having trouble accessing Google Search, please [click here](/search?q=site:github.com+graph+database+javascript+client-side+in-memory&sca_esv=296e1942f0aaa35a&emsg=SG_REL&sei=huujabS_BdfuiLMP9ZL0yAI), or send [feedback](https://support.google.com/websearch).
```

---

## Assistant (General · MiniMax-M2.5 · 4.2s)

_Thinking:_

The Google search URL didn't work well. Let me try a different approach - searching for specific graph database solutions that would work with a client-side JavaScript approach.

**Tool: webfetch**

**Input:**
```json
{
  "format": "markdown",
  "url": "https://duckduckgo.com/?q=site%3Agithub.com+javascript+in-memory+graph+database+library"
}
```

**Output:**
```
site:github.com javascript in-memory graph database library at DuckDuckGo 

[DuckDuckGo](/)

You are being redirected to the non-JavaScript site.

Click [here](/html/?q=site%3Agithub.com%20javascript%20in%2Dmemory%20graph%20database%20library) if it doesn't happen automatically.
```

---

## Assistant (General · MiniMax-M2.5 · 3.0s)

_Thinking:_

Let me try to search for specific graph database solutions that are client-side and work with JavaScript/TypeScript.

**Tool: webfetch**

**Input:**
```json
{
  "format": "markdown",
  "url": "https://html.duckduckgo.com/html/?q=site%3Agithub.com+javascript+in-memory+graph+database+library"
}
```

**Output:**
```
     site:github.com javascript in-memory graph database library at DuckDuckGo         

[](/html/ "DuckDuckGo")

 

All Regions Argentina Australia Austria Belgium (fr) Belgium (nl) Brazil Bulgaria Canada (en) Canada (fr) Catalonia Chile China Colombia Croatia Czech Republic Denmark Estonia Finland France Germany Greece Hong Kong Hungary Iceland India (en) Indonesia (en) Ireland Israel (en) Italy Japan Korea Latvia Lithuania Malaysia (en) Mexico Netherlands New Zealand Norway Pakistan (en) Peru Philippines (en) Poland Portugal Romania Russia Saudi Arabia Singapore Slovakia Slovenia South Africa Spain (ca) Spain (es) Sweden Switzerland (de) Switzerland (fr) Taiwan Thailand (en) Turkey US (English) US (Spanish) Ukraine United Kingdom Vietnam (en)

Any Time Past Day Past Week Past Month Past Year

## [GitHub - brandonbloom/jseg: A super simple, in-memory, JS graph database.](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Fbrandonbloom%2Fjseg&rut=af20cd05732f0d07e3a9d216d3266c3885753b80ed5951e1eaa8d18ba8ddcfbe)

 [![](//external-content.duckduckgo.com/ip3/github.com.ico)](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Fbrandonbloom%2Fjseg&rut=af20cd05732f0d07e3a9d216d3266c3885753b80ed5951e1eaa8d18ba8ddcfbe)[github.com/brandonbloom/jseg](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Fbrandonbloom%2Fjseg&rut=af20cd05732f0d07e3a9d216d3266c3885753b80ed5951e1eaa8d18ba8ddcfbe)

[A super simple, **in-memory**, JS **graph** **database**. Contribute to brandonbloom/jseg development by creating an account on GitHub.](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Fbrandonbloom%2Fjseg&rut=af20cd05732f0d07e3a9d216d3266c3885753b80ed5951e1eaa8d18ba8ddcfbe)

## [in-memory-database · GitHub Topics · GitHub](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Ftopics%2Fin%2Dmemory%2Ddatabase%3Fl%3Djavascript&rut=efff7cde2507fba3206081e924e6af0dd5feadfcf1ba8d8d67082e981961df57)

 [![](//external-content.duckduckgo.com/ip3/github.com.ico)](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Ftopics%2Fin%2Dmemory%2Ddatabase%3Fl%3Djavascript&rut=efff7cde2507fba3206081e924e6af0dd5feadfcf1ba8d8d67082e981961df57)[github.com/topics/in-memory-database?l=javascript](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Ftopics%2Fin%2Dmemory%2Ddatabase%3Fl%3Djavascript&rut=efff7cde2507fba3206081e924e6af0dd5feadfcf1ba8d8d67082e981961df57)

[Star 42 Code Issues Pull requests Deprecated: Use the @encapsule/arccore package that includes the **graph** **library** **javascript** **graph**\-algorithms directed-**graph** **graph**\-theory arccore breadth-first-search data-modeling depth-first-search **in**\-**memory**\-storage json-container **in**\-**memory**\-**database** edge-classification Updated Aug 21, 2018 **JavaScript**](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Ftopics%2Fin%2Dmemory%2Ddatabase%3Fl%3Djavascript&rut=efff7cde2507fba3206081e924e6af0dd5feadfcf1ba8d8d67082e981961df57)

## [GitHub - dxnn/dagoba: A tiny in-memory graph database](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Fdxnn%2Fdagoba&rut=c0d10d244c36f4ddd953ab0bc0faf72caf49bbc91a9d1b1a12e7192268f4510d)

 [![](//external-content.duckduckgo.com/ip3/github.com.ico)](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Fdxnn%2Fdagoba&rut=c0d10d244c36f4ddd953ab0bc0faf72caf49bbc91a9d1b1a12e7192268f4510d)[github.com/dxnn/dagoba](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Fdxnn%2Fdagoba&rut=c0d10d244c36f4ddd953ab0bc0faf72caf49bbc91a9d1b1a12e7192268f4510d)

[A tiny **in-memory** **graph** **database**. Contribute to dxnn/dagoba development by creating an account on GitHub.](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Fdxnn%2Fdagoba&rut=c0d10d244c36f4ddd953ab0bc0faf72caf49bbc91a9d1b1a12e7192268f4510d)

## [GitHub - memgraph/memgraph: Open-source graph database, tuned for ...](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Fmemgraph%2Fmemgraph&rut=ed55d64e83f5803c7e91d5f4a9bedfb7ffe280286beffecb768a542f52f30778)

 [![](//external-content.duckduckgo.com/ip3/github.com.ico)](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Fmemgraph%2Fmemgraph&rut=ed55d64e83f5803c7e91d5f4a9bedfb7ffe280286beffecb768a542f52f30778)[github.com/memgraph/memgraph](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Fmemgraph%2Fmemgraph&rut=ed55d64e83f5803c7e91d5f4a9bedfb7ffe280286beffecb768a542f52f30778)

[Memgraph is an open source **graph** **database** built for real-time streaming and compatible with Neo4j. Whether you're a developer or a data scientist with interconnected data, Memgraph will get you the immediate actionable insights fast. Memgraph directly connects to your streaming infrastructure. You can ingest data from sources like Kafka, SQL, or plain CSV files. Memgraph provides a standard ...](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Fmemgraph%2Fmemgraph&rut=ed55d64e83f5803c7e91d5f4a9bedfb7ffe280286beffecb768a542f52f30778)

## [A pure JavaScript implementation of TinkerPop's TinkerGraph in-memory ...](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Fjbmusso%2Ftinkergraph%2Djs&rut=db32a079baf45eedbf10806feda7fb1beeca4158d6fbf4f9707975d33ab6835d)

 [![](//external-content.duckduckgo.com/ip3/github.com.ico)](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Fjbmusso%2Ftinkergraph%2Djs&rut=db32a079baf45eedbf10806feda7fb1beeca4158d6fbf4f9707975d33ab6835d)[github.com/jbmusso/tinkergraph-js](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Fjbmusso%2Ftinkergraph%2Djs&rut=db32a079baf45eedbf10806feda7fb1beeca4158d6fbf4f9707975d33ab6835d)

[A pure **JavaScript** implementation of the TinkerGraph **in-memory** **graph** **database** from the Apache TinkerPop framework that works in Node.js and in the browser. This **library** is rather low-level as it only exposes a raw property **graph** data structure (more formally: a directed, binary, attributed multi-**graph**).](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Fjbmusso%2Ftinkergraph%2Djs&rut=db32a079baf45eedbf10806feda7fb1beeca4158d6fbf4f9707975d33ab6835d)

## [GitHub - techfort/LokiJS: javascript embeddable / in-memory database](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Ftechfort%2FLokiJS&rut=9f4d89a3cca885544be56e05c3cb13286cf2206944c21a987170aa42918e78d6)

 [![](//external-content.duckduckgo.com/ip3/github.com.ico)](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Ftechfort%2FLokiJS&rut=9f4d89a3cca885544be56e05c3cb13286cf2206944c21a987170aa42918e78d6)[github.com/techfort/LokiJS](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Ftechfort%2FLokiJS&rut=9f4d89a3cca885544be56e05c3cb13286cf2206944c21a987170aa42918e78d6)

[The super fast **in-memory** **javascript** document oriented **database**. Enable offline-syncing to your SQL/NoSQL **database** servers with SyncProxy !! Code-free real time syncing, ideal for mobile, electron and web apps.](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Ftechfort%2FLokiJS&rut=9f4d89a3cca885544be56e05c3cb13286cf2206944c21a987170aa42918e78d6)

## [GitHub - cfu288/SylvieJS: javascript embeddable / in-memory database](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Fcfu288%2FSylvieJS&rut=336e96dce7f0be2e7a5559eed36ce7019bf28e96e465f0c9f929c8b44639fb0c)

 [![](//external-content.duckduckgo.com/ip3/github.com.ico)](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Fcfu288%2FSylvieJS&rut=336e96dce7f0be2e7a5559eed36ce7019bf28e96e465f0c9f929c8b44639fb0c)[github.com/cfu288/SylvieJS](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Fcfu288%2FSylvieJS&rut=336e96dce7f0be2e7a5559eed36ce7019bf28e96e465f0c9f929c8b44639fb0c)

[The super fast **in-memory** **javascript** document oriented **database**. See our Documentation. This repo is a fork of the original LokiJS repository. SylvieJS aims to be a drop-**in** replacement for LokiJS. The objectives of this fork are to modernize the API and the codebase: Migrate codebase to ES6 Export SylvieJS as an ES Module Add API for Async/Await + Promises instead of callbacks Use TypeScript ...](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Fcfu288%2FSylvieJS&rut=336e96dce7f0be2e7a5559eed36ce7019bf28e96e465f0c9f929c8b44639fb0c)

## [GitHub - jb123/GraphAnalyticsLib: First ever - A Graph Anlaytics ...](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Fjb123%2FGraphAnalyticsLib&rut=e054b0c5e35a0a6de07852a77854a84afa7fc466703c82aa7fa553e6e9256b5e)

 [![](//external-content.duckduckgo.com/ip3/github.com.ico)](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Fjb123%2FGraphAnalyticsLib&rut=e054b0c5e35a0a6de07852a77854a84afa7fc466703c82aa7fa553e6e9256b5e)[github.com/jb123/GraphAnalyticsLib](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Fjb123%2FGraphAnalyticsLib&rut=e054b0c5e35a0a6de07852a77854a84afa7fc466703c82aa7fa553e6e9256b5e)

[About First ever - A **Graph** Anlaytics **Library** providing the user with an **in-memory** **graph** and **graph** analytics algorithms enabling the user to create, store, manage, process and most importantly analyze **graphs** for insights and other purposes, purely written in **Javascript** without any external dependencies.](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Fjb123%2FGraphAnalyticsLib&rut=e054b0c5e35a0a6de07852a77854a84afa7fc466703c82aa7fa553e6e9256b5e)

## [GitHub - vinnichase/got: got is a fluent, functional, zero-dependency ...](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Fvinnichase%2Fgot&rut=7e725ead263a43ecf8895043f722a631d5bc66c7dd5742ab57f4b33e52f51bc7)

 [![](//external-content.duckduckgo.com/ip3/github.com.ico)](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Fvinnichase%2Fgot&rut=7e725ead263a43ecf8895043f722a631d5bc66c7dd5742ab57f4b33e52f51bc7)[github.com/vinnichase/got](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Fvinnichase%2Fgot&rut=7e725ead263a43ecf8895043f722a631d5bc66c7dd5742ab57f4b33e52f51bc7)

[Usage As any other **graph** **database** a got **graph** consists of exact two entities: nodes and edges. Nodes have a property id which uniquely identifies them in the whole **graph**. Additionally each node can contain an arbitrarily structured **JavaScript** object.](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Fvinnichase%2Fgot&rut=7e725ead263a43ecf8895043f722a631d5bc66c7dd5742ab57f4b33e52f51bc7)

## [GitHub - threepointone/jsgraphthinggie: A super simple, in-memory, JS ...](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Fthreepointone%2Fjsgraphthinggie&rut=4097b02affbb3dd0038eccb537bb6d67d4ab94410451b106723f249202708d96)

 [![](//external-content.duckduckgo.com/ip3/github.com.ico)](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Fthreepointone%2Fjsgraphthinggie&rut=4097b02affbb3dd0038eccb537bb6d67d4ab94410451b106723f249202708d96)[github.com/threepointone/jsgraphthinggie](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Fthreepointone%2Fjsgraphthinggie&rut=4097b02affbb3dd0038eccb537bb6d67d4ab94410451b106723f249202708d96)

[A super simple, **in-memory**, JS **graph** **database**. Contribute to threepointone/jsgraphthinggie development by creating an account on GitHub.](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Fthreepointone%2Fjsgraphthinggie&rut=4097b02affbb3dd0038eccb537bb6d67d4ab94410451b106723f249202708d96)

         

[Feedback](//duckduckgo.com/feedback.html)

![](//duckduckgo.com/t/sl_h)
```

---

## Assistant (General · MiniMax-M2.5 · 7.1s)

_Thinking:_

Now I have some candidate repositories. Let me also search for more specific options that work well with .NET and JavaScript frameworks, particularly ones that might have .NET clients or be usable in the browser.

**Tool: webfetch**

**Input:**
```json
{
  "format": "markdown",
  "url": "https://html.duckduckgo.com/html/?q=site%3Agithub.com+javascript+graph+database+browser+aurelia"
}
```

**Output:**
```
     site:github.com javascript graph database browser aurelia at DuckDuckGo         

[](/html/ "DuckDuckGo")

 

All Regions Argentina Australia Austria Belgium (fr) Belgium (nl) Brazil Bulgaria Canada (en) Canada (fr) Catalonia Chile China Colombia Croatia Czech Republic Denmark Estonia Finland France Germany Greece Hong Kong Hungary Iceland India (en) Indonesia (en) Ireland Israel (en) Italy Japan Korea Latvia Lithuania Malaysia (en) Mexico Netherlands New Zealand Norway Pakistan (en) Peru Philippines (en) Poland Portugal Romania Russia Saudi Arabia Singapore Slovakia Slovenia South Africa Spain (ca) Spain (es) Sweden Switzerland (de) Switzerland (fr) Taiwan Thailand (en) Turkey US (English) US (Spanish) Ukraine United Kingdom Vietnam (en)

Any Time Past Day Past Week Past Month Past Year

## [GitHub - aurelia/aurelia: Aurelia 2, a standards-based, front-end ...](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Faurelia%2Faurelia&rut=cbae313ba892e1283845f34abb61210741009e622b062531f433cf5b1dff0e33)

 [![](//external-content.duckduckgo.com/ip3/github.com.ico)](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Faurelia%2Faurelia&rut=cbae313ba892e1283845f34abb61210741009e622b062531f433cf5b1dff0e33)[github.com/aurelia/aurelia](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Faurelia%2Faurelia&rut=cbae313ba892e1283845f34abb61210741009e622b062531f433cf5b1dff0e33)

[**Aurelia** is a modern, front-end **JavaScript** framework for building **browser**, mobile, and desktop applications. It focuses on aligning closely with web platform specifications, using convention over configuration, and having minimal framework intrusion.](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Faurelia%2Faurelia&rut=cbae313ba892e1283845f34abb61210741009e622b062531f433cf5b1dff0e33)

## [aurelia - GitHub](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Faurelia&rut=a813440d0aa5640b0cfbdc9bf9c3091653a2ce7264e467171080dee60c2e86ca)

 [![](//external-content.duckduckgo.com/ip3/github.com.ico)](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Faurelia&rut=a813440d0aa5640b0cfbdc9bf9c3091653a2ce7264e467171080dee60c2e86ca)[github.com/aurelia](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Faurelia&rut=a813440d0aa5640b0cfbdc9bf9c3091653a2ce7264e467171080dee60c2e86ca)

[A standards-based, front-end framework designed for high-performing, ambitious applications. - **aurelia**](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Faurelia&rut=a813440d0aa5640b0cfbdc9bf9c3091653a2ce7264e467171080dee60c2e86ca)

## [GitHub - aurelia/framework: The Aurelia 1 framework entry point ...](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Faurelia%2Fframework&rut=448885f5dd005f4ec7eec216f34ffcd58f372138c9b0db8e55b48ea66579a065)

 [![](//external-content.duckduckgo.com/ip3/github.com.ico)](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Faurelia%2Fframework&rut=448885f5dd005f4ec7eec216f34ffcd58f372138c9b0db8e55b48ea66579a065)[github.com/aurelia/framework](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Faurelia%2Fframework&rut=448885f5dd005f4ec7eec216f34ffcd58f372138c9b0db8e55b48ea66579a065)

[**Aurelia** is a modern, front-end **JavaScript** framework for building **browser**, mobile, and desktop applications. It focuses on aligning closely with web platform specifications, using convention over configuration, and having minimal framework intrusion. Basically, we want you to just write your code without the framework getting in your way. 😉 This library is part of the **Aurelia** platform. It ...](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Faurelia%2Fframework&rut=448885f5dd005f4ec7eec216f34ffcd58f372138c9b0db8e55b48ea66579a065)

## [GitHub - levelgraph/levelgraph: Graph database JS style for Node.js and ...](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Flevelgraph%2Flevelgraph&rut=b91e5a3e67b73226c4f66d181aea9cf48396f5a0f94fda4556f6a9ca61db231c)

 [![](//external-content.duckduckgo.com/ip3/github.com.ico)](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Flevelgraph%2Flevelgraph&rut=b91e5a3e67b73226c4f66d181aea9cf48396f5a0f94fda4556f6a9ca61db231c)[github.com/levelgraph/levelgraph](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Flevelgraph%2Flevelgraph&rut=b91e5a3e67b73226c4f66d181aea9cf48396f5a0f94fda4556f6a9ca61db231c)

[**Graph** **database** JS style for Node.js and the **Browser**. Built upon LevelUp and LevelDB. - levelgraph/levelgraph](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Flevelgraph%2Flevelgraph&rut=b91e5a3e67b73226c4f66d181aea9cf48396f5a0f94fda4556f6a9ca61db231c)

## [Network Graph · holtsetio/aurelia · GitHub](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Fholtsetio%2Faurelia%2Fnetwork&rut=cf9188321b9c83d8d365decb67ba1b476df781e432e12d8101d9d24fb40ca88a)

 [![](//external-content.duckduckgo.com/ip3/github.com.ico)](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Fholtsetio%2Faurelia%2Fnetwork&rut=cf9188321b9c83d8d365decb67ba1b476df781e432e12d8101d9d24fb40ca88a)[github.com/holtsetio/aurelia/network](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Fholtsetio%2Faurelia%2Fnetwork&rut=cf9188321b9c83d8d365decb67ba1b476df781e432e12d8101d9d24fb40ca88a)

[Realtime procedural jellyfish in the **browser** using three.js WebGPURenderer. - Network **Graph** · holtsetio/**aurelia**](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Fholtsetio%2Faurelia%2Fnetwork&rut=cf9188321b9c83d8d365decb67ba1b476df781e432e12d8101d9d24fb40ca88a)

## [GitHub - aurelia-contrib/awesome-aurelia: A curated list of amazingly ...](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Faurelia%2Dcontrib%2Fawesome%2Daurelia&rut=2b32834cc2172d1760762d0ff239b59f21cbaf3c4f676a6f3374eefb58159528)

 [![](//external-content.duckduckgo.com/ip3/github.com.ico)](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Faurelia%2Dcontrib%2Fawesome%2Daurelia&rut=2b32834cc2172d1760762d0ff239b59f21cbaf3c4f676a6f3374eefb58159528)[github.com/aurelia-contrib/awesome-aurelia](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Faurelia%2Dcontrib%2Fawesome%2Daurelia&rut=2b32834cc2172d1760762d0ff239b59f21cbaf3c4f676a6f3374eefb58159528)

[**Aurelia** is a next gen **JavaScript** client framework for mobile, desktop and web that leverages simple conventions to empower your creativity.](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Faurelia%2Dcontrib%2Fawesome%2Daurelia&rut=2b32834cc2172d1760762d0ff239b59f21cbaf3c4f676a6f3374eefb58159528)

## [GitHub - aurelia/v1-documentation: Aurelia v1 documentation](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Faurelia%2Fv1%2Ddocumentation&rut=208c04e45a268b62fc226bee5acb80e8209170aff812a147814046c1c7eb1d98)

 [![](//external-content.duckduckgo.com/ip3/github.com.ico)](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Faurelia%2Fv1%2Ddocumentation&rut=208c04e45a268b62fc226bee5acb80e8209170aff812a147814046c1c7eb1d98)[github.com/aurelia/v1-documentation](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Faurelia%2Fv1%2Ddocumentation&rut=208c04e45a268b62fc226bee5acb80e8209170aff812a147814046c1c7eb1d98)

[What is **Aurelia** 1? Welcome to **Aurelia** 1, the powerful, open-source **JavaScript** framework for crafting extraordinary web applications. At its core, **Aurelia** 1 is more than just a framework; it believes in the unbridled power of open web standards. With **Aurelia** 1, your development experience is streamlined, intuitive, and flexible.](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Faurelia%2Fv1%2Ddocumentation&rut=208c04e45a268b62fc226bee5acb80e8209170aff812a147814046c1c7eb1d98)

## [GitHub - aurelia/pal-browser: The browser-based implementation of ...](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Faurelia%2Fpal%2Dbrowser&rut=bb29b75afd5676ff4f5c7194f8e98cc418b253d4e6df19eead01cf0da58bba18)

 [![](//external-content.duckduckgo.com/ip3/github.com.ico)](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Faurelia%2Fpal%2Dbrowser&rut=bb29b75afd5676ff4f5c7194f8e98cc418b253d4e6df19eead01cf0da58bba18)[github.com/aurelia/pal-browser](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Faurelia%2Fpal%2Dbrowser&rut=bb29b75afd5676ff4f5c7194f8e98cc418b253d4e6df19eead01cf0da58bba18)

[This library is part of the **Aurelia** platform and contains the **browser**\-specific implementation of the platform abstraction layer. To keep up to date on **Aurelia**, please visit and subscribe to the official blog and our email list.](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Faurelia%2Fpal%2Dbrowser&rut=bb29b75afd5676ff4f5c7194f8e98cc418b253d4e6df19eead01cf0da58bba18)

## [GitHub - grofit/aurelia-chart: A chart element for aurelia which is ...](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Fgrofit%2Faurelia%2Dchart&rut=059864e7206b053fa1ac2a7df3e8d12f055a6ca978bcbf92890fa8df166c1972)

 [![](//external-content.duckduckgo.com/ip3/github.com.ico)](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Fgrofit%2Faurelia%2Dchart&rut=059864e7206b053fa1ac2a7df3e8d12f055a6ca978bcbf92890fa8df166c1972)[github.com/grofit/aurelia-chart](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Fgrofit%2Faurelia%2Dchart&rut=059864e7206b053fa1ac2a7df3e8d12f055a6ca978bcbf92890fa8df166c1972)

[**Aurelia**\-Chart A simple binding to let **aurelia** and chartjs (2.x) come together for the greater good. It supports the basic **graph** types and should work with any custom ones.](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Fgrofit%2Faurelia%2Dchart&rut=059864e7206b053fa1ac2a7df3e8d12f055a6ca978bcbf92890fa8df166c1972)

## [aurelia · GitHub Topics · GitHub](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Ftopics%2Faurelia%3Fl%3Djavascript&rut=d73ebfda43004b300c83e59e31050e30b26dc9ee2d5d58a042fefb4f85354f2c)

 [![](//external-content.duckduckgo.com/ip3/github.com.ico)](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Ftopics%2Faurelia%3Fl%3Djavascript&rut=d73ebfda43004b300c83e59e31050e30b26dc9ee2d5d58a042fefb4f85354f2c)[github.com/topics/aurelia?l=javascript](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Ftopics%2Faurelia%3Fl%3Djavascript&rut=d73ebfda43004b300c83e59e31050e30b26dc9ee2d5d58a042fefb4f85354f2c)

[**Aurelia** is a next generation **JavaScript** client framework that leverages simple conventions to empower your creativity.](//duckduckgo.com/l/?uddg=https%3A%2F%2Fgithub.com%2Ftopics%2Faurelia%3Fl%3Djavascript&rut=d73ebfda43004b300c83e59e31050e30b26dc9ee2d5d58a042fefb4f85354f2c)

         

[Feedback](//duckduckgo.com/feedback.html)

![](//duckduckgo.com/t/sl_h)
```

---

## Assistant (General · MiniMax-M2.5 · 20.9s)

_Thinking:_

I found several relevant graph database options. Let me now query some of these repositories to get more details about them. I'll focus on:
1. jbmusso/tinkergraph-js - TinkerGraph in-memory for browser
2. dxnn/dagoba - Tiny in-memory graph database
3. levelgraph/levelgraph - Graph database for Node.js and Browser

Let me also search for more popular/useful options.

Now let me query these repositories for more details:

**Tool: DeepWiki_ask_question**

**Input:**
```json
{
  "question": "What are the main features, API capabilities, and browser compatibility of this graph database library?",
  "repoName": "[\"jbmusso/tinkergraph-js\", \"dxnn/dagoba\", \"levelgraph/levelgraph\", \"techfort/LokiJS\"]"
}
```

**Output:**
```
Error processing question: Repository not found. Visit https://deepwiki.com to index it. Requested repos: ["jbmusso/tinkergraph-js", "dxnn/dagoba", "levelgraph/levelgraph", "techfort/LokiJS"]
```

---

## Assistant (General · MiniMax-M2.5 · 4.8s)

_Thinking:_

The DeepWiki doesn't have these repositories indexed. Let me try different ones that might be more popular and well-known, or try to get more information from the GitHub pages directly.

**Tool: webfetch**

**Input:**
```json
{
  "format": "markdown",
  "url": "https://github.com/jbmusso/tinkergraph-js"
}
```

**Output:**
```
                     GitHub - jbmusso/tinkergraph-js: A pure JavaScript implementation of TinkerPop's TinkerGraph in-memory graph database                                             

[Skip to content](#start-of-content)  

## Navigation Menu

Toggle navigation

[](/)

[Sign in](/login?return_to=https%3A%2F%2Fgithub.com%2Fjbmusso%2Ftinkergraph-js)

Appearance settings

  

-   Platform
    
    -   AI CODE CREATION
        
        -   [
            
            GitHub CopilotWrite better code with AI
            
            ](https://github.com/features/copilot)
        -   [
            
            GitHub SparkBuild and deploy intelligent apps
            
            ](https://github.com/features/spark)
        -   [
            
            GitHub ModelsManage and compare prompts
            
            ](https://github.com/features/models)
        -   [
            
            MCP RegistryNewIntegrate external tools
            
            ](https://github.com/mcp)
        
    -   DEVELOPER WORKFLOWS
        
        -   [
            
            ActionsAutomate any workflow
            
            ](https://github.com/features/actions)
        -   [
            
            CodespacesInstant dev environments
            
            ](https://github.com/features/codespaces)
        -   [
            
            IssuesPlan and track work
            
            ](https://github.com/features/issues)
        -   [
            
            Code ReviewManage code changes
            
            ](https://github.com/features/code-review)
        
    -   APPLICATION SECURITY
        
        -   [
            
            GitHub Advanced SecurityFind and fix vulnerabilities
            
            ](https://github.com/security/advanced-security)
        -   [
            
            Code securitySecure your code as you build
            
            ](https://github.com/security/advanced-security/code-security)
        -   [
            
            Secret protectionStop leaks before they start
            
            ](https://github.com/security/advanced-security/secret-protection)
        
    -   EXPLORE
        
        -   [Why GitHub](https://github.com/why-github)
        -   [Documentation](https://docs.github.com)
        -   [Blog](https://github.blog)
        -   [Changelog](https://github.blog/changelog)
        -   [Marketplace](https://github.com/marketplace)
        
    
    [View all features](https://github.com/features)
    
-   Solutions
    
    -   BY COMPANY SIZE
        
        -   [Enterprises](https://github.com/enterprise)
        -   [Small and medium teams](https://github.com/team)
        -   [Startups](https://github.com/enterprise/startups)
        -   [Nonprofits](https://github.com/solutions/industry/nonprofits)
        
    -   BY USE CASE
        
        -   [App Modernization](https://github.com/solutions/use-case/app-modernization)
        -   [DevSecOps](https://github.com/solutions/use-case/devsecops)
        -   [DevOps](https://github.com/solutions/use-case/devops)
        -   [CI/CD](https://github.com/solutions/use-case/ci-cd)
        -   [View all use cases](https://github.com/solutions/use-case)
        
    -   BY INDUSTRY
        
        -   [Healthcare](https://github.com/solutions/industry/healthcare)
        -   [Financial services](https://github.com/solutions/industry/financial-services)
        -   [Manufacturing](https://github.com/solutions/industry/manufacturing)
        -   [Government](https://github.com/solutions/industry/government)
        -   [View all industries](https://github.com/solutions/industry)
        
    
    [View all solutions](https://github.com/solutions)
    
-   Resources
    
    -   EXPLORE BY TOPIC
        
        -   [AI](https://github.com/resources/articles?topic=ai)
        -   [Software Development](https://github.com/resources/articles?topic=software-development)
        -   [DevOps](https://github.com/resources/articles?topic=devops)
        -   [Security](https://github.com/resources/articles?topic=security)
        -   [View all topics](https://github.com/resources/articles)
        
    -   EXPLORE BY TYPE
        
        -   [Customer stories](https://github.com/customer-stories)
        -   [Events & webinars](https://github.com/resources/events)
        -   [Ebooks & reports](https://github.com/resources/whitepapers)
        -   [Business insights](https://github.com/solutions/executive-insights)
        -   [GitHub Skills](https://skills.github.com)
        
    -   SUPPORT & SERVICES
        
        -   [Documentation](https://docs.github.com)
        -   [Customer support](https://support.github.com)
        -   [Community forum](https://github.com/orgs/community/discussions)
        -   [Trust center](https://github.com/trust-center)
        -   [Partners](https://github.com/partners)
        
    
    [View all resources](https://github.com/resources)
    
-   Open Source
    
    -   COMMUNITY
        
        -   [
            
            GitHub SponsorsFund open source developers
            
            ](https://github.com/sponsors)
        
    -   PROGRAMS
        
        -   [Security Lab](https://securitylab.github.com)
        -   [Maintainer Community](https://maintainers.github.com)
        -   [Accelerator](https://github.com/accelerator)
        -   [Archive Program](https://archiveprogram.github.com)
        
    -   REPOSITORIES
        
        -   [Topics](https://github.com/topics)
        -   [Trending](https://github.com/trending)
        -   [Collections](https://github.com/collections)
        
    
-   Enterprise
    
    -   ENTERPRISE SOLUTIONS
        
        -   [
            
            Enterprise platformAI-powered developer platform
            
            ](https://github.com/enterprise)
        
    -   AVAILABLE ADD-ONS
        
        -   [
            
            GitHub Advanced SecurityEnterprise-grade security features
            
            ](https://github.com/security/advanced-security)
        -   [
            
            Copilot for BusinessEnterprise-grade AI features
            
            ](https://github.com/features/copilot/copilot-business)
        -   [
            
            Premium SupportEnterprise-grade 24/7 support
            
            ](https://github.com/premium-support)
        
    
-   [Pricing](https://github.com/pricing)

Search or jump to...

# Search code, repositories, users, issues, pull requests...

Search

Clear

[Search syntax tips](https://docs.github.com/search-github/github-code-search/understanding-github-code-search-syntax)

# Provide feedback

We read every piece of feedback, and take your input very seriously.

 Include my email address so I can be contacted

Cancel Submit feedback

# Saved searches

## Use saved searches to filter your results more quickly

Name  

Query 

To see all available qualifiers, see our [documentation](https://docs.github.com/search-github/github-code-search/understanding-github-code-search-syntax).

Cancel Create saved search

[Sign in](/login?return_to=https%3A%2F%2Fgithub.com%2Fjbmusso%2Ftinkergraph-js)

[Sign up](/signup?ref_cta=Sign+up&ref_loc=header+logged+out&ref_page=%2F%3Cuser-name%3E%2F%3Crepo-name%3E&source=header-repo&source_repo=jbmusso%2Ftinkergraph-js)

Appearance settings

Resetting focus

You signed in with another tab or window. Reload to refresh your session. You signed out in another tab or window. Reload to refresh your session. You switched accounts on another tab or window. Reload to refresh your session. Dismiss alert

[jbmusso](/jbmusso) / **[tinkergraph-js](/jbmusso/tinkergraph-js)** Public

-   [Notifications](/login?return_to=%2Fjbmusso%2Ftinkergraph-js) You must be signed in to change notification settings
-   [Fork 7](/login?return_to=%2Fjbmusso%2Ftinkergraph-js)
-   [Star 73](/login?return_to=%2Fjbmusso%2Ftinkergraph-js)
    

A pure JavaScript implementation of TinkerPop's TinkerGraph in-memory graph database

### License

[MIT license](/jbmusso/tinkergraph-js/blob/master/LICENSE)

[73 stars](/jbmusso/tinkergraph-js/stargazers) [7 forks](/jbmusso/tinkergraph-js/forks) [Branches](/jbmusso/tinkergraph-js/branches) [Tags](/jbmusso/tinkergraph-js/tags) [Activity](/jbmusso/tinkergraph-js/activity)

[Star](/login?return_to=%2Fjbmusso%2Ftinkergraph-js)

[Notifications](/login?return_to=%2Fjbmusso%2Ftinkergraph-js) You must be signed in to change notification settings

-   [Code](/jbmusso/tinkergraph-js)
-   [Issues 2](/jbmusso/tinkergraph-js/issues)
-   [Pull requests 0](/jbmusso/tinkergraph-js/pulls)
-   [Actions](/jbmusso/tinkergraph-js/actions)
-   [Projects](/jbmusso/tinkergraph-js/projects)
-   [Wiki](/jbmusso/tinkergraph-js/wiki)
-   [Security 0](/jbmusso/tinkergraph-js/security)
-   [Insights](/jbmusso/tinkergraph-js/pulse)

Additional navigation options

-   [Code](/jbmusso/tinkergraph-js)
-   [Issues](/jbmusso/tinkergraph-js/issues)
-   [Pull requests](/jbmusso/tinkergraph-js/pulls)
-   [Actions](/jbmusso/tinkergraph-js/actions)
-   [Projects](/jbmusso/tinkergraph-js/projects)
-   [Wiki](/jbmusso/tinkergraph-js/wiki)
-   [Security](/jbmusso/tinkergraph-js/security)
-   [Insights](/jbmusso/tinkergraph-js/pulse)

# jbmusso/tinkergraph-js

   

 master

[Branches](/jbmusso/tinkergraph-js/branches)[Tags](/jbmusso/tinkergraph-js/tags)

[](/jbmusso/tinkergraph-js/branches)[](/jbmusso/tinkergraph-js/tags)

Go to file

Code

Open more actions menu

## Folders and files

Name

Name

Last commit message

Last commit date

## Latest commit

## History

[38 Commits](/jbmusso/tinkergraph-js/commits/master/)

[](/jbmusso/tinkergraph-js/commits/master/)38 Commits

[src](/jbmusso/tinkergraph-js/tree/master/src "src")

[src](/jbmusso/tinkergraph-js/tree/master/src "src")

[test](/jbmusso/tinkergraph-js/tree/master/test "test")

[test](/jbmusso/tinkergraph-js/tree/master/test "test")

[.babelrc](/jbmusso/tinkergraph-js/blob/master/.babelrc ".babelrc")

[.babelrc](/jbmusso/tinkergraph-js/blob/master/.babelrc ".babelrc")

[.editorconfig](/jbmusso/tinkergraph-js/blob/master/.editorconfig ".editorconfig")

[.editorconfig](/jbmusso/tinkergraph-js/blob/master/.editorconfig ".editorconfig")

[.gitignore](/jbmusso/tinkergraph-js/blob/master/.gitignore ".gitignore")

[.gitignore](/jbmusso/tinkergraph-js/blob/master/.gitignore ".gitignore")

[Gulpfile.js](/jbmusso/tinkergraph-js/blob/master/Gulpfile.js "Gulpfile.js")

[Gulpfile.js](/jbmusso/tinkergraph-js/blob/master/Gulpfile.js "Gulpfile.js")

[LICENSE](/jbmusso/tinkergraph-js/blob/master/LICENSE "LICENSE")

[LICENSE](/jbmusso/tinkergraph-js/blob/master/LICENSE "LICENSE")

[README.md](/jbmusso/tinkergraph-js/blob/master/README.md "README.md")

[README.md](/jbmusso/tinkergraph-js/blob/master/README.md "README.md")

[package.json](/jbmusso/tinkergraph-js/blob/master/package.json "package.json")

[package.json](/jbmusso/tinkergraph-js/blob/master/package.json "package.json")

View all files

## Repository files navigation

-   [README](#)
-   [MIT license](#)

# tinkergraph-js

[](#tinkergraph-js)

A pure JavaScript implementation of the TinkerGraph in-memory graph database from the [Apache TinkerPop framework](http://tinkerpop.incubator.apache.org/) that works in Node.js and in the browser.

This library is rather low-level as it only exposes a raw property graph data structure (more formally: a directed, binary, attributed multi-graph). It is perfectly fine for use if your library needs an in-memory data structure with a simple public API. If you're looking for a higher level graph data structure, checkout the Gremlin JavaScript implementation of TinkerGraph: [gremlin-tinkergraph](https://github.com/jbmusso/gremlin-tinkergraph).

This library is a work in progress and is not yet published on npm. It is not production ready.

## Install

[](#install)

```
$ npm install jbmusso/tinkergraph-js --save
```

Run tests with:

```
$ npm test
```

## Usage

[](#usage)

The library is a port of TinkerGraph, without the Gremlin implementation. It tries to mimic while still providing more idiomatic JavaScript function signatures.

### Graph structure

[](#graph-structure)

#### Adding a vertex

[](#adding-a-vertex)

g.addVertex('key1', 'value1', 'key2', 'value2');
g.addVertex({ key: 'value', key2: 'value2' }); // Alternatively, JS only

#### Adding an edge

[](#adding-an-edge)

vertex.addEdge('label', vertex, { key: 'value' });

## Performance

[](#performance)

tinkergraph-js uses iterators, ES6 Map and Set classes.

On my laptop (2.3 Ghz i7 cpu, 16 Gb ram), tinkergraph-js adds approximately 20000 vertices per second to the graph.

## About

A pure JavaScript implementation of TinkerPop's TinkerGraph in-memory graph database

### Resources

[Readme](#readme-ov-file)

### License

[MIT license](#MIT-1-ov-file)

### Uh oh!

There was an error while loading. Please reload this page.

[Activity](/jbmusso/tinkergraph-js/activity)

### Stars

[**73** stars](/jbmusso/tinkergraph-js/stargazers)

### Watchers

[**8** watching](/jbmusso/tinkergraph-js/watchers)

### Forks

[**7** forks](/jbmusso/tinkergraph-js/forks)

[Report repository](/contact/report-content?content_url=https%3A%2F%2Fgithub.com%2Fjbmusso%2Ftinkergraph-js&report=jbmusso+%28user%29)

## [Releases](/jbmusso/tinkergraph-js/releases)

No releases published

## [Packages 0](/users/jbmusso/packages?repo_name=tinkergraph-js)

### Uh oh!

There was an error while loading. Please reload this page.

### Uh oh!

There was an error while loading. Please reload this page.

## [Contributors](/jbmusso/tinkergraph-js/graphs/contributors)

### Uh oh!

There was an error while loading. Please reload this page.

## Languages

-   [JavaScript 100.0%](/jbmusso/tinkergraph-js/search?l=javascript)

## Footer

[](https://github.com)© 2026 GitHub, Inc.

### Footer navigation

-   [Terms](https://docs.github.com/site-policy/github-terms/github-terms-of-service)
-   [Privacy](https://docs.github.com/site-policy/privacy-policies/github-privacy-statement)
-   [Security](https://github.com/security)
-   [Status](https://www.githubstatus.com/)
-   [Community](https://github.community/)
-   [Docs](https://docs.github.com/)
-   [Contact](https://support.github.com?tags=dotcom-footer)
-   Manage cookies
-   Do not share my personal information

You can’t perform that action at this time.
```

---

## Assistant (General · MiniMax-M2.5 · 5.9s)

_Thinking:_

Good, I got some details on tinkergraph-js. Now let me fetch more information about the other options.

**Tool: webfetch**

**Input:**
```json
{
  "format": "markdown",
  "url": "https://github.com/techfort/LokiJS"
}
```

**Output:**
```
                     GitHub - techfort/LokiJS: javascript embeddable / in-memory database                                             

[Skip to content](#start-of-content)  

## Navigation Menu

Toggle navigation

[](/)

[Sign in](/login?return_to=https%3A%2F%2Fgithub.com%2Ftechfort%2FLokiJS)

Appearance settings

  

-   Platform
    
    -   AI CODE CREATION
        
        -   [
            
            GitHub CopilotWrite better code with AI
            
            ](https://github.com/features/copilot)
        -   [
            
            GitHub SparkBuild and deploy intelligent apps
            
            ](https://github.com/features/spark)
        -   [
            
            GitHub ModelsManage and compare prompts
            
            ](https://github.com/features/models)
        -   [
            
            MCP RegistryNewIntegrate external tools
            
            ](https://github.com/mcp)
        
    -   DEVELOPER WORKFLOWS
        
        -   [
            
            ActionsAutomate any workflow
            
            ](https://github.com/features/actions)
        -   [
            
            CodespacesInstant dev environments
            
            ](https://github.com/features/codespaces)
        -   [
            
            IssuesPlan and track work
            
            ](https://github.com/features/issues)
        -   [
            
            Code ReviewManage code changes
            
            ](https://github.com/features/code-review)
        
    -   APPLICATION SECURITY
        
        -   [
            
            GitHub Advanced SecurityFind and fix vulnerabilities
            
            ](https://github.com/security/advanced-security)
        -   [
            
            Code securitySecure your code as you build
            
            ](https://github.com/security/advanced-security/code-security)
        -   [
            
            Secret protectionStop leaks before they start
            
            ](https://github.com/security/advanced-security/secret-protection)
        
    -   EXPLORE
        
        -   [Why GitHub](https://github.com/why-github)
        -   [Documentation](https://docs.github.com)
        -   [Blog](https://github.blog)
        -   [Changelog](https://github.blog/changelog)
        -   [Marketplace](https://github.com/marketplace)
        
    
    [View all features](https://github.com/features)
    
-   Solutions
    
    -   BY COMPANY SIZE
        
        -   [Enterprises](https://github.com/enterprise)
        -   [Small and medium teams](https://github.com/team)
        -   [Startups](https://github.com/enterprise/startups)
        -   [Nonprofits](https://github.com/solutions/industry/nonprofits)
        
    -   BY USE CASE
        
        -   [App Modernization](https://github.com/solutions/use-case/app-modernization)
        -   [DevSecOps](https://github.com/solutions/use-case/devsecops)
        -   [DevOps](https://github.com/solutions/use-case/devops)
        -   [CI/CD](https://github.com/solutions/use-case/ci-cd)
        -   [View all use cases](https://github.com/solutions/use-case)
        
    -   BY INDUSTRY
        
        -   [Healthcare](https://github.com/solutions/industry/healthcare)
        -   [Financial services](https://github.com/solutions/industry/financial-services)
        -   [Manufacturing](https://github.com/solutions/industry/manufacturing)
        -   [Government](https://github.com/solutions/industry/government)
        -   [View all industries](https://github.com/solutions/industry)
        
    
    [View all solutions](https://github.com/solutions)
    
-   Resources
    
    -   EXPLORE BY TOPIC
        
        -   [AI](https://github.com/resources/articles?topic=ai)
        -   [Software Development](https://github.com/resources/articles?topic=software-development)
        -   [DevOps](https://github.com/resources/articles?topic=devops)
        -   [Security](https://github.com/resources/articles?topic=security)
        -   [View all topics](https://github.com/resources/articles)
        
    -   EXPLORE BY TYPE
        
        -   [Customer stories](https://github.com/customer-stories)
        -   [Events & webinars](https://github.com/resources/events)
        -   [Ebooks & reports](https://github.com/resources/whitepapers)
        -   [Business insights](https://github.com/solutions/executive-insights)
        -   [GitHub Skills](https://skills.github.com)
        
    -   SUPPORT & SERVICES
        
        -   [Documentation](https://docs.github.com)
        -   [Customer support](https://support.github.com)
        -   [Community forum](https://github.com/orgs/community/discussions)
        -   [Trust center](https://github.com/trust-center)
        -   [Partners](https://github.com/partners)
        
    
    [View all resources](https://github.com/resources)
    
-   Open Source
    
    -   COMMUNITY
        
        -   [
            
            GitHub SponsorsFund open source developers
            
            ](https://github.com/sponsors)
        
    -   PROGRAMS
        
        -   [Security Lab](https://securitylab.github.com)
        -   [Maintainer Community](https://maintainers.github.com)
        -   [Accelerator](https://github.com/accelerator)
        -   [Archive Program](https://archiveprogram.github.com)
        
    -   REPOSITORIES
        
        -   [Topics](https://github.com/topics)
        -   [Trending](https://github.com/trending)
        -   [Collections](https://github.com/collections)
        
    
-   Enterprise
    
    -   ENTERPRISE SOLUTIONS
        
        -   [
            
            Enterprise platformAI-powered developer platform
            
            ](https://github.com/enterprise)
        
    -   AVAILABLE ADD-ONS
        
        -   [
            
            GitHub Advanced SecurityEnterprise-grade security features
            
            ](https://github.com/security/advanced-security)
        -   [
            
            Copilot for BusinessEnterprise-grade AI features
            
            ](https://github.com/features/copilot/copilot-business)
        -   [
            
            Premium SupportEnterprise-grade 24/7 support
            
            ](https://github.com/premium-support)
        
    
-   [Pricing](https://github.com/pricing)

Search or jump to...

# Search code, repositories, users, issues, pull requests...

Search

Clear

[Search syntax tips](https://docs.github.com/search-github/github-code-search/understanding-github-code-search-syntax)

# Provide feedback

We read every piece of feedback, and take your input very seriously.

 Include my email address so I can be contacted

Cancel Submit feedback

# Saved searches

## Use saved searches to filter your results more quickly

Name  

Query 

To see all available qualifiers, see our [documentation](https://docs.github.com/search-github/github-code-search/understanding-github-code-search-syntax).

Cancel Create saved search

[Sign in](/login?return_to=https%3A%2F%2Fgithub.com%2Ftechfort%2FLokiJS)

[Sign up](/signup?ref_cta=Sign+up&ref_loc=header+logged+out&ref_page=%2F%3Cuser-name%3E%2F%3Crepo-name%3E&source=header-repo&source_repo=techfort%2FLokiJS)

Appearance settings

Resetting focus

You signed in with another tab or window. Reload to refresh your session. You signed out in another tab or window. Reload to refresh your session. You switched accounts on another tab or window. Reload to refresh your session. Dismiss alert

[techfort](/techfort) / **[LokiJS](/techfort/LokiJS)** Public

-   [Notifications](/login?return_to=%2Ftechfort%2FLokiJS) You must be signed in to change notification settings
-   [Fork 482](/login?return_to=%2Ftechfort%2FLokiJS)
-   [Star 6.8k](/login?return_to=%2Ftechfort%2FLokiJS)
    

javascript embeddable / in-memory database

[http:/techfort.github.io/LokiJS](http:/techfort.github.io/LokiJS "http:/techfort.github.io/LokiJS")

### License

[MIT license](/techfort/LokiJS/blob/master/LICENSE.txt)

[6.8k stars](/techfort/LokiJS/stargazers) [482 forks](/techfort/LokiJS/forks) [Branches](/techfort/LokiJS/branches) [Tags](/techfort/LokiJS/tags) [Activity](/techfort/LokiJS/activity)

[Star](/login?return_to=%2Ftechfort%2FLokiJS)

[Notifications](/login?return_to=%2Ftechfort%2FLokiJS) You must be signed in to change notification settings

-   [Code](/techfort/LokiJS)
-   [Issues 29](/techfort/LokiJS/issues)
-   [Pull requests 6](/techfort/LokiJS/pulls)
-   [Actions](/techfort/LokiJS/actions)
-   [Projects](/techfort/LokiJS/projects)
-   [Wiki](/techfort/LokiJS/wiki)
-   [Security 0](/techfort/LokiJS/security)
-   [Insights](/techfort/LokiJS/pulse)

Additional navigation options

-   [Code](/techfort/LokiJS)
-   [Issues](/techfort/LokiJS/issues)
-   [Pull requests](/techfort/LokiJS/pulls)
-   [Actions](/techfort/LokiJS/actions)
-   [Projects](/techfort/LokiJS/projects)
-   [Wiki](/techfort/LokiJS/wiki)
-   [Security](/techfort/LokiJS/security)
-   [Insights](/techfort/LokiJS/pulse)

# techfort/LokiJS

   

 master

[Branches](/techfort/LokiJS/branches)[Tags](/techfort/LokiJS/tags)

[](/techfort/LokiJS/branches)[](/techfort/LokiJS/tags)

Go to file

Code

Open more actions menu

## Folders and files

Name

Name

Last commit message

Last commit date

## Latest commit

## History

[1,353 Commits](/techfort/LokiJS/commits/master/)

[](/techfort/LokiJS/commits/master/)1,353 Commits

[.github](/techfort/LokiJS/tree/master/.github ".github")

[.github](/techfort/LokiJS/tree/master/.github ".github")

[benchmark](/techfort/LokiJS/tree/master/benchmark "benchmark")

[benchmark](/techfort/LokiJS/tree/master/benchmark "benchmark")

[build](/techfort/LokiJS/tree/master/build "build")

[build](/techfort/LokiJS/tree/master/build "build")

[demos/desktop\_app](/techfort/LokiJS/tree/master/demos/desktop_app "This path skips through empty directories")

[demos/desktop\_app](/techfort/LokiJS/tree/master/demos/desktop_app "This path skips through empty directories")

[docs](/techfort/LokiJS/tree/master/docs "docs")

[docs](/techfort/LokiJS/tree/master/docs "docs")

[examples](/techfort/LokiJS/tree/master/examples "examples")

[examples](/techfort/LokiJS/tree/master/examples "examples")

[original](/techfort/LokiJS/tree/master/original "original")

[original](/techfort/LokiJS/tree/master/original "original")

[presentations](/techfort/LokiJS/tree/master/presentations "presentations")

[presentations](/techfort/LokiJS/tree/master/presentations "presentations")

[spec](/techfort/LokiJS/tree/master/spec "spec")

[spec](/techfort/LokiJS/tree/master/spec "spec")

[src](/techfort/LokiJS/tree/master/src "src")

[src](/techfort/LokiJS/tree/master/src "src")

[tutorials](/techfort/LokiJS/tree/master/tutorials "tutorials")

[tutorials](/techfort/LokiJS/tree/master/tutorials "tutorials")

[.editorconfig](/techfort/LokiJS/blob/master/.editorconfig ".editorconfig")

[.editorconfig](/techfort/LokiJS/blob/master/.editorconfig ".editorconfig")

[.gitattributes](/techfort/LokiJS/blob/master/.gitattributes ".gitattributes")

[.gitattributes](/techfort/LokiJS/blob/master/.gitattributes ".gitattributes")

[.gitignore](/techfort/LokiJS/blob/master/.gitignore ".gitignore")

[.gitignore](/techfort/LokiJS/blob/master/.gitignore ".gitignore")

[.jshintrc](/techfort/LokiJS/blob/master/.jshintrc ".jshintrc")

[.jshintrc](/techfort/LokiJS/blob/master/.jshintrc ".jshintrc")

[.npmignore](/techfort/LokiJS/blob/master/.npmignore ".npmignore")

[.npmignore](/techfort/LokiJS/blob/master/.npmignore ".npmignore")

[.travis.yml](/techfort/LokiJS/blob/master/.travis.yml ".travis.yml")

[.travis.yml](/techfort/LokiJS/blob/master/.travis.yml ".travis.yml")

[CHANGELOG.md](/techfort/LokiJS/blob/master/CHANGELOG.md "CHANGELOG.md")

[CHANGELOG.md](/techfort/LokiJS/blob/master/CHANGELOG.md "CHANGELOG.md")

[CONTRIBUTING.md](/techfort/LokiJS/blob/master/CONTRIBUTING.md "CONTRIBUTING.md")

[CONTRIBUTING.md](/techfort/LokiJS/blob/master/CONTRIBUTING.md "CONTRIBUTING.md")

[LICENSE.txt](/techfort/LokiJS/blob/master/LICENSE.txt "LICENSE.txt")

[LICENSE.txt](/techfort/LokiJS/blob/master/LICENSE.txt "LICENSE.txt")

[OVERVIEW.md](/techfort/LokiJS/blob/master/OVERVIEW.md "OVERVIEW.md")

[OVERVIEW.md](/techfort/LokiJS/blob/master/OVERVIEW.md "OVERVIEW.md")

[README.md](/techfort/LokiJS/blob/master/README.md "README.md")

[README.md](/techfort/LokiJS/blob/master/README.md "README.md")

[benchmark.html](/techfort/LokiJS/blob/master/benchmark.html "benchmark.html")

[benchmark.html](/techfort/LokiJS/blob/master/benchmark.html "benchmark.html")

[bower.json](/techfort/LokiJS/blob/master/bower.json "bower.json")

[bower.json](/techfort/LokiJS/blob/master/bower.json "bower.json")

[docs-conf.json](/techfort/LokiJS/blob/master/docs-conf.json "docs-conf.json")

[docs-conf.json](/techfort/LokiJS/blob/master/docs-conf.json "docs-conf.json")

[karma.build.conf.js](/techfort/LokiJS/blob/master/karma.build.conf.js "karma.build.conf.js")

[karma.build.conf.js](/techfort/LokiJS/blob/master/karma.build.conf.js "karma.build.conf.js")

[karma.conf.js](/techfort/LokiJS/blob/master/karma.conf.js "karma.conf.js")

[karma.conf.js](/techfort/LokiJS/blob/master/karma.conf.js "karma.conf.js")

[package-lock.json](/techfort/LokiJS/blob/master/package-lock.json "package-lock.json")

[package-lock.json](/techfort/LokiJS/blob/master/package-lock.json "package-lock.json")

[package.json](/techfort/LokiJS/blob/master/package.json "package.json")

[package.json](/techfort/LokiJS/blob/master/package.json "package.json")

[test.db](/techfort/LokiJS/blob/master/test.db "test.db")

[test.db](/techfort/LokiJS/blob/master/test.db "test.db")

View all files

## Repository files navigation

-   [README](#)
-   [Contributing](#)
-   [MIT license](#)

# LokiJS

[](#lokijs)

The super fast in-memory javascript document oriented database.

Enable offline-syncing to your SQL/NoSQL database servers with [SyncProxy](https://www.syncproxy.com) !! Code-free real time syncing, ideal for mobile, electron and web apps.

[![Join the chat at https://gitter.im/techfort/LokiJS](https://camo.githubusercontent.com/abe08b740a4156153736f791393ec4da6619c4be73212e75769f52edacc0e2b5/68747470733a2f2f6261646765732e6769747465722e696d2f4a6f696e253230436861742e737667)](https://gitter.im/techfort/LokiJS?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) [![alt CI-badge](https://camo.githubusercontent.com/21cecd117d61079a4b938ab2cabcb0df182fb64e53808d98086a1ea054ebd1ec/68747470733a2f2f7472617669732d63692e6f72672f74656368666f72742f4c6f6b694a532e7376673f6272616e63683d6d6173746572)](https://camo.githubusercontent.com/21cecd117d61079a4b938ab2cabcb0df182fb64e53808d98086a1ea054ebd1ec/68747470733a2f2f7472617669732d63692e6f72672f74656368666f72742f4c6f6b694a532e7376673f6272616e63683d6d6173746572) [![npm version](https://camo.githubusercontent.com/af6d3b205e41e4ba7caa6b5df2cca6fc25cbb2434894af5736895044266d7f5d/68747470733a2f2f62616467652e667572792e696f2f6a732f6c6f6b696a732e737667)](http://badge.fury.io/js/lokijs) [![alt packagequality](https://camo.githubusercontent.com/7acdb31bdd531a031d92baaeabb456b18da71ad81247b47dc1af009d6781f1ea/687474703a2f2f6e706d2e7061636b6167657175616c6974792e636f6d2f736869656c642f6c6f6b696a732e737667)](http://packagequality.com/#?package=lokijs)

## Overview

[](#overview)

LokiJS is a document oriented database written in javascript, published under MIT License. Its purpose is to store javascript objects as documents in a nosql fashion and retrieve them with a similar mechanism. Runs in node (including cordova/phonegap and node-webkit), [nativescript](http://www.nativescript.org) and the browser. LokiJS is ideal for the following scenarios:

1.  client-side in-memory db is ideal (e.g., a session store)
2.  performance critical applications
3.  cordova/phonegap mobile apps where you can leverage the power of javascript and avoid interacting with native databases
4.  data sets loaded into a browser page and synchronised at the end of the work session
5.  node-webkit desktop apps
6.  nativescript mobile apps that mix the power and ubiquity of javascript with native performance and ui

LokiJS supports indexing and views and achieves high-performance through maintaining unique and binary indexes (indices) for data.

## Demo

[](#demo)

The following demos are available:

-   [Sandbox / Playground](https://rawgit.com/techfort/LokiJS/master/examples/sandbox/LokiSandbox.htm)
-   a node-webkit small demo in the folder demos/desktop\_app. You can launch it by running `/path/to/nw demos/desktop_app/`

## Wiki

[](#wiki)

Example usage can be found on the [wiki](https://github.com/techfort/LokiJS/wiki)

## Main Features

[](#main-features)

1.  Fast performance NoSQL in-memory database, collections with unique index (1.1M ops/s) and binary-index (500k ops/s)
2.  Runs in multiple environments (browser, node, nativescript)
3.  Dynamic Views for fast access of data subsets
4.  Built-in persistence adapters, and the ability to support user-defined ones
5.  Changes API
6.  Joins

## Current state

[](#current-state)

LokiJS is at version 1.3 \[Eostre\].

As LokiJS is written in JavaScript it can be run on any environment supporting JavaScript such as browsers, node.js/node-webkit, nativescript mobile framework and hybrid mobile apps (such as phonegap/cordova).

Made by [@techfort](http://twitter.com/tech_fort), with the precious help of Dave Easterday.

*[Leave a tip](https://gratipay.com/techfort/) or give us a star if you find LokiJS useful!*

## Installation

[](#installation)

For browser environments you simply need the lokijs.js file contained in src/

You can use bower to install lokijs with `bower install lokijs`

For node and nativescript environments you can install through `npm install lokijs`.

## Roadmap

[](#roadmap)

-   exactIndex
-   key-value datastore
-   MRU cache
-   MongoDB API compatibility
-   server standalone (tcp and http servers and clients)
-   replication and horizontal scaling

## Contact

[](#contact)

For help / enquiries contact [joe.minichino@gmail.com](mailto:joe.minichino@gmail.com)

## Commercial Support

[](#commercial-support)

For commercial support contact [info.techfort@gmail.com](mailto:info.techfort@gmail.com)

## License

[](#license)

Copyright (c) 2015 TechFort [joe.minichino@gmail.com](mailto:joe.minichino@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## About

javascript embeddable / in-memory database

[http:/techfort.github.io/LokiJS](http:/techfort.github.io/LokiJS "http:/techfort.github.io/LokiJS")

### Resources

[Readme](#readme-ov-file)

### License

[MIT license](#MIT-1-ov-file)

### Contributing

[Contributing](#contributing-ov-file)

### Uh oh!

There was an error while loading. Please reload this page.

[Activity](/techfort/LokiJS/activity)

### Stars

[**6.8k** stars](/techfort/LokiJS/stargazers)

### Watchers

[**152** watching](/techfort/LokiJS/watchers)

### Forks

[**482** forks](/techfort/LokiJS/forks)

[Report repository](/contact/report-content?content_url=https%3A%2F%2Fgithub.com%2Ftechfort%2FLokiJS&report=techfort+%28user%29)

## [Releases](/techfort/LokiJS/releases)

[36 tags](/techfort/LokiJS/tags)

## [Packages 0](/users/techfort/packages?repo_name=LokiJS)

### Uh oh!

There was an error while loading. Please reload this page.

### Uh oh!

There was an error while loading. Please reload this page.

## [Contributors](/techfort/LokiJS/graphs/contributors)

### Uh oh!

There was an error while loading. Please reload this page.

## Languages

-   [JavaScript 98.3%](/techfort/LokiJS/search?l=javascript)
-   [HTML 1.7%](/techfort/LokiJS/search?l=html)

## Footer

[](https://github.com)© 2026 GitHub, Inc.

### Footer navigation

-   [Terms](https://docs.github.com/site-policy/github-terms/github-terms-of-service)
-   [Privacy](https://docs.github.com/site-policy/privacy-policies/github-privacy-statement)
-   [Security](https://github.com/security)
-   [Status](https://www.githubstatus.com/)
-   [Community](https://github.community/)
-   [Docs](https://docs.github.com/)
-   [Contact](https://support.github.com?tags=dotcom-footer)
-   Manage cookies
-   Do not share my personal information

You can’t perform that action at this time.
```

---

## Assistant (General · MiniMax-M2.5 · 9.8s)

_Thinking:_

Good, now I have information on LokiJS. Let me also get more information on other options, specifically looking for graph-specific databases.

**Tool: webfetch**

**Input:**
```json
{
  "format": "markdown",
  "url": "https://github.com/dxnn/dagoba"
}
```

**Output:**
```
                     GitHub - dxnn/dagoba: A tiny in-memory graph database                                             

[Skip to content](#start-of-content)  

## Navigation Menu

Toggle navigation

[](/)

[Sign in](/login?return_to=https%3A%2F%2Fgithub.com%2Fdxnn%2Fdagoba)

Appearance settings

  

-   Platform
    
    -   AI CODE CREATION
        
        -   [
            
            GitHub CopilotWrite better code with AI
            
            ](https://github.com/features/copilot)
        -   [
            
            GitHub SparkBuild and deploy intelligent apps
            
            ](https://github.com/features/spark)
        -   [
            
            GitHub ModelsManage and compare prompts
            
            ](https://github.com/features/models)
        -   [
            
            MCP RegistryNewIntegrate external tools
            
            ](https://github.com/mcp)
        
    -   DEVELOPER WORKFLOWS
        
        -   [
            
            ActionsAutomate any workflow
            
            ](https://github.com/features/actions)
        -   [
            
            CodespacesInstant dev environments
            
            ](https://github.com/features/codespaces)
        -   [
            
            IssuesPlan and track work
            
            ](https://github.com/features/issues)
        -   [
            
            Code ReviewManage code changes
            
            ](https://github.com/features/code-review)
        
    -   APPLICATION SECURITY
        
        -   [
            
            GitHub Advanced SecurityFind and fix vulnerabilities
            
            ](https://github.com/security/advanced-security)
        -   [
            
            Code securitySecure your code as you build
            
            ](https://github.com/security/advanced-security/code-security)
        -   [
            
            Secret protectionStop leaks before they start
            
            ](https://github.com/security/advanced-security/secret-protection)
        
    -   EXPLORE
        
        -   [Why GitHub](https://github.com/why-github)
        -   [Documentation](https://docs.github.com)
        -   [Blog](https://github.blog)
        -   [Changelog](https://github.blog/changelog)
        -   [Marketplace](https://github.com/marketplace)
        
    
    [View all features](https://github.com/features)
    
-   Solutions
    
    -   BY COMPANY SIZE
        
        -   [Enterprises](https://github.com/enterprise)
        -   [Small and medium teams](https://github.com/team)
        -   [Startups](https://github.com/enterprise/startups)
        -   [Nonprofits](https://github.com/solutions/industry/nonprofits)
        
    -   BY USE CASE
        
        -   [App Modernization](https://github.com/solutions/use-case/app-modernization)
        -   [DevSecOps](https://github.com/solutions/use-case/devsecops)
        -   [DevOps](https://github.com/solutions/use-case/devops)
        -   [CI/CD](https://github.com/solutions/use-case/ci-cd)
        -   [View all use cases](https://github.com/solutions/use-case)
        
    -   BY INDUSTRY
        
        -   [Healthcare](https://github.com/solutions/industry/healthcare)
        -   [Financial services](https://github.com/solutions/industry/financial-services)
        -   [Manufacturing](https://github.com/solutions/industry/manufacturing)
        -   [Government](https://github.com/solutions/industry/government)
        -   [View all industries](https://github.com/solutions/industry)
        
    
    [View all solutions](https://github.com/solutions)
    
-   Resources
    
    -   EXPLORE BY TOPIC
        
        -   [AI](https://github.com/resources/articles?topic=ai)
        -   [Software Development](https://github.com/resources/articles?topic=software-development)
        -   [DevOps](https://github.com/resources/articles?topic=devops)
        -   [Security](https://github.com/resources/articles?topic=security)
        -   [View all topics](https://github.com/resources/articles)
        
    -   EXPLORE BY TYPE
        
        -   [Customer stories](https://github.com/customer-stories)
        -   [Events & webinars](https://github.com/resources/events)
        -   [Ebooks & reports](https://github.com/resources/whitepapers)
        -   [Business insights](https://github.com/solutions/executive-insights)
        -   [GitHub Skills](https://skills.github.com)
        
    -   SUPPORT & SERVICES
        
        -   [Documentation](https://docs.github.com)
        -   [Customer support](https://support.github.com)
        -   [Community forum](https://github.com/orgs/community/discussions)
        -   [Trust center](https://github.com/trust-center)
        -   [Partners](https://github.com/partners)
        
    
    [View all resources](https://github.com/resources)
    
-   Open Source
    
    -   COMMUNITY
        
        -   [
            
            GitHub SponsorsFund open source developers
            
            ](https://github.com/sponsors)
        
    -   PROGRAMS
        
        -   [Security Lab](https://securitylab.github.com)
        -   [Maintainer Community](https://maintainers.github.com)
        -   [Accelerator](https://github.com/accelerator)
        -   [Archive Program](https://archiveprogram.github.com)
        
    -   REPOSITORIES
        
        -   [Topics](https://github.com/topics)
        -   [Trending](https://github.com/trending)
        -   [Collections](https://github.com/collections)
        
    
-   Enterprise
    
    -   ENTERPRISE SOLUTIONS
        
        -   [
            
            Enterprise platformAI-powered developer platform
            
            ](https://github.com/enterprise)
        
    -   AVAILABLE ADD-ONS
        
        -   [
            
            GitHub Advanced SecurityEnterprise-grade security features
            
            ](https://github.com/security/advanced-security)
        -   [
            
            Copilot for BusinessEnterprise-grade AI features
            
            ](https://github.com/features/copilot/copilot-business)
        -   [
            
            Premium SupportEnterprise-grade 24/7 support
            
            ](https://github.com/premium-support)
        
    
-   [Pricing](https://github.com/pricing)

Search or jump to...

# Search code, repositories, users, issues, pull requests...

Search

Clear

[Search syntax tips](https://docs.github.com/search-github/github-code-search/understanding-github-code-search-syntax)

# Provide feedback

We read every piece of feedback, and take your input very seriously.

 Include my email address so I can be contacted

Cancel Submit feedback

# Saved searches

## Use saved searches to filter your results more quickly

Name  

Query 

To see all available qualifiers, see our [documentation](https://docs.github.com/search-github/github-code-search/understanding-github-code-search-syntax).

Cancel Create saved search

[Sign in](/login?return_to=https%3A%2F%2Fgithub.com%2Fdxnn%2Fdagoba)

[Sign up](/signup?ref_cta=Sign+up&ref_loc=header+logged+out&ref_page=%2F%3Cuser-name%3E%2F%3Crepo-name%3E&source=header-repo&source_repo=dxnn%2Fdagoba)

Appearance settings

Resetting focus

You signed in with another tab or window. Reload to refresh your session. You signed out in another tab or window. Reload to refresh your session. You switched accounts on another tab or window. Reload to refresh your session. Dismiss alert

[dxnn](/dxnn) / **[dagoba](/dxnn/dagoba)** Public

-   [Notifications](/login?return_to=%2Fdxnn%2Fdagoba) You must be signed in to change notification settings
-   [Fork 17](/login?return_to=%2Fdxnn%2Fdagoba)
-   [Star 112](/login?return_to=%2Fdxnn%2Fdagoba)
    

A tiny in-memory graph database

### License

[MIT license](/dxnn/dagoba/blob/master/LICENSE)

[112 stars](/dxnn/dagoba/stargazers) [17 forks](/dxnn/dagoba/forks) [Branches](/dxnn/dagoba/branches) [Tags](/dxnn/dagoba/tags) [Activity](/dxnn/dagoba/activity)

[Star](/login?return_to=%2Fdxnn%2Fdagoba)

[Notifications](/login?return_to=%2Fdxnn%2Fdagoba) You must be signed in to change notification settings

-   [Code](/dxnn/dagoba)
-   [Issues 1](/dxnn/dagoba/issues)
-   [Pull requests 1](/dxnn/dagoba/pulls)
-   [Actions](/dxnn/dagoba/actions)
-   [Projects](/dxnn/dagoba/projects)
-   [Wiki](/dxnn/dagoba/wiki)
-   [Security 0](/dxnn/dagoba/security)
-   [Insights](/dxnn/dagoba/pulse)

Additional navigation options

-   [Code](/dxnn/dagoba)
-   [Issues](/dxnn/dagoba/issues)
-   [Pull requests](/dxnn/dagoba/pulls)
-   [Actions](/dxnn/dagoba/actions)
-   [Projects](/dxnn/dagoba/projects)
-   [Wiki](/dxnn/dagoba/wiki)
-   [Security](/dxnn/dagoba/security)
-   [Insights](/dxnn/dagoba/pulse)

# dxnn/dagoba

   

 master

[Branches](/dxnn/dagoba/branches)[Tags](/dxnn/dagoba/tags)

[](/dxnn/dagoba/branches)[](/dxnn/dagoba/tags)

Go to file

Code

Open more actions menu

## Folders and files

Name

Name

Last commit message

Last commit date

## Latest commit

## History

[112 Commits](/dxnn/dagoba/commits/master/)

[](/dxnn/dagoba/commits/master/)112 Commits

[detritus](/dxnn/dagoba/tree/master/detritus "detritus")

[detritus](/dxnn/dagoba/tree/master/detritus "detritus")

[examples](/dxnn/dagoba/tree/master/examples "examples")

[examples](/dxnn/dagoba/tree/master/examples "examples")

[tests](/dxnn/dagoba/tree/master/tests "tests")

[tests](/dxnn/dagoba/tree/master/tests "tests")

[.gitignore](/dxnn/dagoba/blob/master/.gitignore ".gitignore")

[.gitignore](/dxnn/dagoba/blob/master/.gitignore ".gitignore")

[LICENSE](/dxnn/dagoba/blob/master/LICENSE "LICENSE")

[LICENSE](/dxnn/dagoba/blob/master/LICENSE "LICENSE")

[README.md](/dxnn/dagoba/blob/master/README.md "README.md")

[README.md](/dxnn/dagoba/blob/master/README.md "README.md")

[chapter.md](/dxnn/dagoba/blob/master/chapter.md "chapter.md")

[chapter.md](/dxnn/dagoba/blob/master/chapter.md "chapter.md")

[dagoba.js](/dxnn/dagoba/blob/master/dagoba.js "dagoba.js")

[dagoba.js](/dxnn/dagoba/blob/master/dagoba.js "dagoba.js")

[gulpfile.js](/dxnn/dagoba/blob/master/gulpfile.js "gulpfile.js")

[gulpfile.js](/dxnn/dagoba/blob/master/gulpfile.js "gulpfile.js")

[index.html](/dxnn/dagoba/blob/master/index.html "index.html")

[index.html](/dxnn/dagoba/blob/master/index.html "index.html")

[package.json](/dxnn/dagoba/blob/master/package.json "package.json")

[package.json](/dxnn/dagoba/blob/master/package.json "package.json")

View all files

## Repository files navigation

-   [README](#)
-   [MIT license](#)

# Dagoba

[](#dagoba)

A tiny, extensible in-memory graph database

## About

A tiny in-memory graph database

### Resources

[Readme](#readme-ov-file)

### License

[MIT license](#MIT-1-ov-file)

### Uh oh!

There was an error while loading. Please reload this page.

[Activity](/dxnn/dagoba/activity)

### Stars

[**112** stars](/dxnn/dagoba/stargazers)

### Watchers

[**5** watching](/dxnn/dagoba/watchers)

### Forks

[**17** forks](/dxnn/dagoba/forks)

[Report repository](/contact/report-content?content_url=https%3A%2F%2Fgithub.com%2Fdxnn%2Fdagoba&report=dxnn+%28user%29)

## [Releases](/dxnn/dagoba/releases)

No releases published

## [Packages 0](/users/dxnn/packages?repo_name=dagoba)

### Uh oh!

There was an error while loading. Please reload this page.

### Uh oh!

There was an error while loading. Please reload this page.

## [Contributors](/dxnn/dagoba/graphs/contributors)

### Uh oh!

There was an error while loading. Please reload this page.

## Languages

-   [JavaScript 67.6%](/dxnn/dagoba/search?l=javascript)
-   [HTML 32.4%](/dxnn/dagoba/search?l=html)

## Footer

[](https://github.com)© 2026 GitHub, Inc.

### Footer navigation

-   [Terms](https://docs.github.com/site-policy/github-terms/github-terms-of-service)
-   [Privacy](https://docs.github.com/site-policy/privacy-policies/github-privacy-statement)
-   [Security](https://github.com/security)
-   [Status](https://www.githubstatus.com/)
-   [Community](https://github.community/)
-   [Docs](https://docs.github.com/)
-   [Contact](https://support.github.com?tags=dotcom-footer)
-   Manage cookies
-   Do not share my personal information

You can’t perform that action at this time.
```

---

## Assistant (General · MiniMax-M2.5 · 4.9s)

_Thinking:_

Now I have three good candidates. Let me also search for more graph-specific libraries that work well with TypeScript/JavaScript and are suitable for browser environments.

**Tool: webfetch**

**Input:**
```json
{
  "format": "markdown",
  "url": "https://html.duckduckgo.com/html/?q=site%3Agithub.com+javascript+graph+visualization+library+typescript"
}
```

**Output:**
```
    DuckDuckGo           

  
[DuckDuckGo](/html/)  
  

Unfortunately, bots use DuckDuckGo too.

Please complete the following challenge to confirm this search was made by a human.

Select all squares containing a duck:

 ![ ](../assets/anomaly/images/challenge/b9bce0c1dc594c3480d1b3644a292f1b.jpg)

 ![ ](../assets/anomaly/images/challenge/f96f89ab9e564afb9c6f9fe716a3cf37.jpg)

 ![ ](../assets/anomaly/images/challenge/720d685b76ac4756a2055ac8fa9bfb46.jpg)

 ![ ](../assets/anomaly/images/challenge/81d2944ab2c24601b9e065f1d20cb3ea.jpg)

 ![ ](../assets/anomaly/images/challenge/a29bf17245514df7b174086fe11d5a7b.jpg)

 ![ ](../assets/anomaly/images/challenge/e2bf58b9ec5143fea8aad5278bf7421d.jpg)

 ![ ](../assets/anomaly/images/challenge/8437cf62dcb746a7878202fcf58d0db2.jpg)

 ![ ](../assets/anomaly/images/challenge/d9a34a82af2f40b2b09e501ff8fe8bf4.jpg)

 ![ ](../assets/anomaly/images/challenge/b02f09884ff1420bb0e61fac63ad7e07.jpg)

Submit

 Images not loading?

Please email the following code to:

error-lite@duckduckgo.com

Code: d4cd0dabcf4caa22ad92fab40844c786

  

![](//duckduckgo.com/t/tqadb?6563455&s=lite&cc=botnet&iadb=0&p=b9bce0c1dc594c3480d1b3644a292f1b-f96f89ab9e564afb9c6f9fe716a3cf37-720d685b76ac4756a2055ac8fa9bfb46-81d2944ab2c24601b9e065f1d20cb3ea-a29bf17245514df7b174086fe11d5a7b-e2bf58b9ec5143fea8aad5278bf7421d-8437cf62dcb746a7878202fcf58d0db2-d9a34a82af2f40b2b09e501ff8fe8bf4-b02f09884ff1420bb0e61fac63ad7e07&i=-1&o=ClnIDAg73zcLMWgWUPTtEyGe2dTRRHsde9hBeRzQiTc%3D%0A&c=dadb&gk=d4cd0dabcf4caa22ad92fab40844c786&sc=1&e=0&r=use)
```

---

## Assistant (General · MiniMax-M2.5 · 4.1s)

_Thinking:_

The search is blocked. Let me search for popular graph libraries for JavaScript that could work well with Aurelia and ViteJS.

**Tool: webfetch**

**Input:**
```json
{
  "format": "markdown",
  "url": "https://github.com/topics/graph-database?l=javascript"
}
```

**Output:**
```
                   graph-database · GitHub Topics · GitHub                                                               

[Skip to content](#start-of-content)  

## Navigation Menu

Toggle navigation

[](/)

[Sign in](/login?return_to=https%3A%2F%2Fgithub.com%2Ftopics%2Fgraph-database%3Fl%3Djavascript)

Appearance settings

  

-   Platform
    
    -   AI CODE CREATION
        
        -   [
            
            GitHub CopilotWrite better code with AI
            
            ](https://github.com/features/copilot)
        -   [
            
            GitHub SparkBuild and deploy intelligent apps
            
            ](https://github.com/features/spark)
        -   [
            
            GitHub ModelsManage and compare prompts
            
            ](https://github.com/features/models)
        -   [
            
            MCP RegistryNewIntegrate external tools
            
            ](https://github.com/mcp)
        
    -   DEVELOPER WORKFLOWS
        
        -   [
            
            ActionsAutomate any workflow
            
            ](https://github.com/features/actions)
        -   [
            
            CodespacesInstant dev environments
            
            ](https://github.com/features/codespaces)
        -   [
            
            IssuesPlan and track work
            
            ](https://github.com/features/issues)
        -   [
            
            Code ReviewManage code changes
            
            ](https://github.com/features/code-review)
        
    -   APPLICATION SECURITY
        
        -   [
            
            GitHub Advanced SecurityFind and fix vulnerabilities
            
            ](https://github.com/security/advanced-security)
        -   [
            
            Code securitySecure your code as you build
            
            ](https://github.com/security/advanced-security/code-security)
        -   [
            
            Secret protectionStop leaks before they start
            
            ](https://github.com/security/advanced-security/secret-protection)
        
    -   EXPLORE
        
        -   [Why GitHub](https://github.com/why-github)
        -   [Documentation](https://docs.github.com)
        -   [Blog](https://github.blog)
        -   [Changelog](https://github.blog/changelog)
        -   [Marketplace](https://github.com/marketplace)
        
    
    [View all features](https://github.com/features)
    
-   Solutions
    
    -   BY COMPANY SIZE
        
        -   [Enterprises](https://github.com/enterprise)
        -   [Small and medium teams](https://github.com/team)
        -   [Startups](https://github.com/enterprise/startups)
        -   [Nonprofits](https://github.com/solutions/industry/nonprofits)
        
    -   BY USE CASE
        
        -   [App Modernization](https://github.com/solutions/use-case/app-modernization)
        -   [DevSecOps](https://github.com/solutions/use-case/devsecops)
        -   [DevOps](https://github.com/solutions/use-case/devops)
        -   [CI/CD](https://github.com/solutions/use-case/ci-cd)
        -   [View all use cases](https://github.com/solutions/use-case)
        
    -   BY INDUSTRY
        
        -   [Healthcare](https://github.com/solutions/industry/healthcare)
        -   [Financial services](https://github.com/solutions/industry/financial-services)
        -   [Manufacturing](https://github.com/solutions/industry/manufacturing)
        -   [Government](https://github.com/solutions/industry/government)
        -   [View all industries](https://github.com/solutions/industry)
        
    
    [View all solutions](https://github.com/solutions)
    
-   Resources
    
    -   EXPLORE BY TOPIC
        
        -   [AI](https://github.com/resources/articles?topic=ai)
        -   [Software Development](https://github.com/resources/articles?topic=software-development)
        -   [DevOps](https://github.com/resources/articles?topic=devops)
        -   [Security](https://github.com/resources/articles?topic=security)
        -   [View all topics](https://github.com/resources/articles)
        
    -   EXPLORE BY TYPE
        
        -   [Customer stories](https://github.com/customer-stories)
        -   [Events & webinars](https://github.com/resources/events)
        -   [Ebooks & reports](https://github.com/resources/whitepapers)
        -   [Business insights](https://github.com/solutions/executive-insights)
        -   [GitHub Skills](https://skills.github.com)
        
    -   SUPPORT & SERVICES
        
        -   [Documentation](https://docs.github.com)
        -   [Customer support](https://support.github.com)
        -   [Community forum](https://github.com/orgs/community/discussions)
        -   [Trust center](https://github.com/trust-center)
        -   [Partners](https://github.com/partners)
        
    
    [View all resources](https://github.com/resources)
    
-   Open Source
    
    -   COMMUNITY
        
        -   [
            
            GitHub SponsorsFund open source developers
            
            ](https://github.com/sponsors)
        
    -   PROGRAMS
        
        -   [Security Lab](https://securitylab.github.com)
        -   [Maintainer Community](https://maintainers.github.com)
        -   [Accelerator](https://github.com/accelerator)
        -   [Archive Program](https://archiveprogram.github.com)
        
    -   REPOSITORIES
        
        -   [Topics](https://github.com/topics)
        -   [Trending](https://github.com/trending)
        -   [Collections](https://github.com/collections)
        
    
-   Enterprise
    
    -   ENTERPRISE SOLUTIONS
        
        -   [
            
            Enterprise platformAI-powered developer platform
            
            ](https://github.com/enterprise)
        
    -   AVAILABLE ADD-ONS
        
        -   [
            
            GitHub Advanced SecurityEnterprise-grade security features
            
            ](https://github.com/security/advanced-security)
        -   [
            
            Copilot for BusinessEnterprise-grade AI features
            
            ](https://github.com/features/copilot/copilot-business)
        -   [
            
            Premium SupportEnterprise-grade 24/7 support
            
            ](https://github.com/premium-support)
        
    
-   [Pricing](https://github.com/pricing)

Search or jump to...

# Search code, repositories, users, issues, pull requests...

Search

Clear

[Search syntax tips](https://docs.github.com/search-github/github-code-search/understanding-github-code-search-syntax)

# Provide feedback

We read every piece of feedback, and take your input very seriously.

 Include my email address so I can be contacted

Cancel Submit feedback

# Saved searches

## Use saved searches to filter your results more quickly

Name  

Query 

To see all available qualifiers, see our [documentation](https://docs.github.com/search-github/github-code-search/understanding-github-code-search-syntax).

Cancel Create saved search

[Sign in](/login?return_to=https%3A%2F%2Fgithub.com%2Ftopics%2Fgraph-database%3Fl%3Djavascript)

[Sign up](/signup?ref_cta=Sign+up&ref_loc=header+logged+out&ref_page=%2Ftopics%2Fgraph-database&source=header)

Appearance settings

Resetting focus

You signed in with another tab or window. Reload to refresh your session. You signed out in another tab or window. Reload to refresh your session. You switched accounts on another tab or window. Reload to refresh your session. Dismiss alert

[Explore](/explore) [Topics](/topics) [Trending](/trending) [Collections](/collections) [Events](/events) [GitHub Sponsors](/sponsors/explore)

#

# graph-database

[Star](/login?return_to=%2Ftopic.graph-database)

## Here are 79 public repositories matching this topic...

*Language:* JavaScript

Filter by language

[All 1,040](https://github.com/topics/graph-database) [Python 265](https://github.com/topics/graph-database?l=python) [Java 130](https://github.com/topics/graph-database?l=java) [JavaScript 79](https://github.com/topics/graph-database?l=javascript) [TypeScript 70](https://github.com/topics/graph-database?l=typescript) [Rust 55](https://github.com/topics/graph-database?l=rust) [Jupyter Notebook 54](https://github.com/topics/graph-database?l=jupyter+notebook) [Go 44](https://github.com/topics/graph-database?l=go) [HTML 32](https://github.com/topics/graph-database?l=html) [C++ 29](https://github.com/topics/graph-database?l=c%2B%2B) [C 19](https://github.com/topics/graph-database?l=c)

*Sort:* Most stars

Sort options

[Most stars](/topics/graph-database?l=javascript&o=desc&s=stars) [Fewest stars](/topics/graph-database?l=javascript&o=asc&s=stars) [Most forks](/topics/graph-database?l=javascript&o=desc&s=forks) [Fewest forks](/topics/graph-database?l=javascript&o=asc&s=forks) [Recently updated](/topics/graph-database?l=javascript&o=desc&s=updated) [Least recently updated](/topics/graph-database?l=javascript&o=asc&s=updated)

### [alephdata](/alephdata) / [aleph](/alephdata/aleph)

[Star 2.3k](/login?return_to=%2Falephdata%2Faleph)

-   [Code](/alephdata/aleph)
-   [Issues](/alephdata/aleph/issues)
-   [Pull requests](/alephdata/aleph/pulls)
-   [Discussions](/alephdata/aleph/discussions)

Search and browse documents and data; find the people and companies you look for.

[python](/topics/python "Topic: python") [osint](/topics/osint "Topic: osint") [journalism](/topics/journalism "Topic: journalism") [graph-database](/topics/graph-database "Topic: graph-database") [data-search](/topics/data-search "Topic: data-search") [investigative-journalism](/topics/investigative-journalism "Topic: investigative-journalism")

-   Updated Feb 20, 2026
-   JavaScript

### [fortunejs](/fortunejs) / [fortune](/fortunejs/fortune)

[Star 1.5k](/login?return_to=%2Ffortunejs%2Ffortune)

-   [Code](/fortunejs/fortune)
-   [Issues](/fortunejs/fortune/issues)
-   [Pull requests](/fortunejs/fortune/pulls)

Non-native graph database abstraction layer for Node.js and web browsers.

[data-access-layer](/topics/data-access-layer "Topic: data-access-layer") [database-adapter](/topics/database-adapter "Topic: database-adapter") [graph-database](/topics/graph-database "Topic: graph-database") [database-abstraction](/topics/database-abstraction "Topic: database-abstraction")

-   Updated Jul 12, 2024
-   JavaScript

### [brandonbloom](/brandonbloom) / [jseg](/brandonbloom/jseg)

[Star 478](/login?return_to=%2Fbrandonbloom%2Fjseg)

-   [Code](/brandonbloom/jseg)
-   [Issues](/brandonbloom/jseg/issues)
-   [Pull requests](/brandonbloom/jseg/pulls)

A super simple, in-memory, JS graph database.

[graphql](/topics/graphql "Topic: graphql") [relay](/topics/relay "Topic: relay") [json](/topics/json "Topic: json") [graph-database](/topics/graph-database "Topic: graph-database") [datomic](/topics/datomic "Topic: datomic")

-   Updated Feb 25, 2022
-   JavaScript

### [apache](/apache) / [age-viewer](/apache/age-viewer)

[Star 352](/login?return_to=%2Fapache%2Fage-viewer)

-   [Code](/apache/age-viewer)
-   [Issues](/apache/age-viewer/issues)
-   [Pull requests](/apache/age-viewer/pulls)

Graph database optimized for fast analysis and real-time data processing. It is provided as an extension to PostgreSQL.

[analytics](/topics/analytics "Topic: analytics") [postgresql](/topics/postgresql "Topic: postgresql") [graph-database](/topics/graph-database "Topic: graph-database") [graphdb](/topics/graphdb "Topic: graphdb") [postgresql-extension](/topics/postgresql-extension "Topic: postgresql-extension") [multi-model-dbms](/topics/multi-model-dbms "Topic: multi-model-dbms") [age-database](/topics/age-database "Topic: age-database")

-   Updated May 8, 2024
-   JavaScript

### [jbmusso](/jbmusso) / [gremlin-javascript](/jbmusso/gremlin-javascript)

[Star 215](/login?return_to=%2Fjbmusso%2Fgremlin-javascript)

-   [Code](/jbmusso/gremlin-javascript)
-   [Issues](/jbmusso/gremlin-javascript/issues)
-   [Pull requests](/jbmusso/gremlin-javascript/pulls)

JavaScript tools for graph processing in Node.js and the browser inspired by the Apache TinkerPop API

[graph-database](/topics/graph-database "Topic: graph-database") [gremlin](/topics/gremlin "Topic: gremlin") [graphdb](/topics/graphdb "Topic: graphdb") [tinkerpop](/topics/tinkerpop "Topic: tinkerpop") [gremlin-server](/topics/gremlin-server "Topic: gremlin-server") [gremlin-driver](/topics/gremlin-driver "Topic: gremlin-driver")

-   Updated Apr 21, 2018
-   JavaScript

### [neo4j-examples](/neo4j-examples) / [movies-javascript-bolt](/neo4j-examples/movies-javascript-bolt)

[Star 189](/login?return_to=%2Fneo4j-examples%2Fmovies-javascript-bolt)

-   [Code](/neo4j-examples/movies-javascript-bolt)
-   [Issues](/neo4j-examples/movies-javascript-bolt/issues)
-   [Pull requests](/neo4j-examples/movies-javascript-bolt/pulls)

Neo4j Movies Example with webpack-in-browser app using the neo4j-javascript-driver

[javascript](/topics/javascript "Topic: javascript") [neo4j](/topics/neo4j "Topic: neo4j") [graph](/topics/graph "Topic: graph") [graph-database](/topics/graph-database "Topic: graph-database") [bolt](/topics/bolt "Topic: bolt") [cypher](/topics/cypher "Topic: cypher") [movies-api](/topics/movies-api "Topic: movies-api")

-   Updated Dec 9, 2025
-   JavaScript

### [gremlin-orm](/gremlin-orm) / [gremlin-orm](/gremlin-orm/gremlin-orm)

[Star 147](/login?return_to=%2Fgremlin-orm%2Fgremlin-orm)

-   [Code](/gremlin-orm/gremlin-orm)
-   [Issues](/gremlin-orm/gremlin-orm/issues)
-   [Pull requests](/gremlin-orm/gremlin-orm/pulls)

gremlin-orm is an ORM for graph databases in Node.js

[javascript](/topics/javascript "Topic: javascript") [node](/topics/node "Topic: node") [orm](/topics/orm "Topic: orm") [graph-database](/topics/graph-database "Topic: graph-database") [gremlin](/topics/gremlin "Topic: gremlin")

-   Updated Dec 4, 2017
-   JavaScript

### [niclasko](/niclasko) / [Cypher.js](/niclasko/Cypher.js)

[Star 67](/login?return_to=%2Fniclasko%2FCypher.js)

-   [Code](/niclasko/Cypher.js)
-   [Issues](/niclasko/Cypher.js/issues)
-   [Pull requests](/niclasko/Cypher.js/pulls)

Cypher graph database for Javascript

[javascript](/topics/javascript "Topic: javascript") [database](/topics/database "Topic: database") [knowledge-graph](/topics/knowledge-graph "Topic: knowledge-graph") [graph-database](/topics/graph-database "Topic: graph-database") [graphdb](/topics/graphdb "Topic: graphdb") [knowledge-base](/topics/knowledge-base "Topic: knowledge-base") [cypher](/topics/cypher "Topic: cypher") [cypher-query-language](/topics/cypher-query-language "Topic: cypher-query-language") [connected-data](/topics/connected-data "Topic: connected-data") [api-calls](/topics/api-calls "Topic: api-calls") [large-language-models](/topics/large-language-models "Topic: large-language-models") [llms](/topics/llms "Topic: llms") [prompt-chaining](/topics/prompt-chaining "Topic: prompt-chaining")

-   Updated May 26, 2025
-   JavaScript

### [lnshi](/lnshi) / [node-cayley](/lnshi/node-cayley)

[Star 50](/login?return_to=%2Flnshi%2Fnode-cayley)

-   [Code](/lnshi/node-cayley)
-   [Issues](/lnshi/node-cayley/issues)
-   [Pull requests](/lnshi/node-cayley/pulls)

Node.js client for open-source graph database cayley([https://github.com/cayleygraph/cayley](https://github.com/cayleygraph/cayley)).

[nodejs](/topics/nodejs "Topic: nodejs") [graph-database](/topics/graph-database "Topic: graph-database") [cayley](/topics/cayley "Topic: cayley")

-   Updated Mar 19, 2018
-   JavaScript

### [renderpci](/renderpci) / [dedalo](/renderpci/dedalo)

[Star 44](/login?return_to=%2Frenderpci%2Fdedalo)

-   [Code](/renderpci/dedalo)
-   [Issues](/renderpci/dedalo/issues)
-   [Pull requests](/renderpci/dedalo/pulls)

Dédalo: Cultural Heritage & Oral History Management System

[thesaurus](/topics/thesaurus "Topic: thesaurus") [openapi](/topics/openapi "Topic: openapi") [ontology](/topics/ontology "Topic: ontology") [graph-database](/topics/graph-database "Topic: graph-database") [digital-humanities](/topics/digital-humanities "Topic: digital-humanities") [archeology](/topics/archeology "Topic: archeology") [nosql-database](/topics/nosql-database "Topic: nosql-database") [heritage](/topics/heritage "Topic: heritage") [cultural-heritage](/topics/cultural-heritage "Topic: cultural-heritage") [oral-histories](/topics/oral-histories "Topic: oral-histories") [cultural-analytics](/topics/cultural-analytics "Topic: cultural-analytics")

-   Updated Feb 5, 2026
-   JavaScript

### [lmangani](/lmangani) / [kibana\_graph](/lmangani/kibana_graph)

[Sponsor](/sponsors/lmangani)

[Star 40](/login?return_to=%2Flmangani%2Fkibana_graph)

-   [Code](/lmangani/kibana_graph)
-   [Issues](/lmangani/kibana_graph/issues)
-   [Pull requests](/lmangani/kibana_graph/pulls)

Interactive Network Graph Visualization For Kibana (unmaintained)

[plugin](/topics/plugin "Topic: plugin") [kibana](/topics/kibana "Topic: kibana") [graph](/topics/graph "Topic: graph") [network](/topics/network "Topic: network") [gun](/topics/gun "Topic: gun") [graph-database](/topics/graph-database "Topic: graph-database") [vis](/topics/vis "Topic: vis") [elastic](/topics/elastic "Topic: elastic") [visjs](/topics/visjs "Topic: visjs") [gundb](/topics/gundb "Topic: gundb") [relations](/topics/relations "Topic: relations")

-   Updated Aug 8, 2018
-   JavaScript

### [mikestaub](/mikestaub) / [slack-lunch-club](/mikestaub/slack-lunch-club)

[Star 35](/login?return_to=%2Fmikestaub%2Fslack-lunch-club)

-   [Code](/mikestaub/slack-lunch-club)
-   [Issues](/mikestaub/slack-lunch-club/issues)
-   [Pull requests](/mikestaub/slack-lunch-club/pulls)

🍕 Meet new members of your slack teams via weekly lunch matches!

[react](/topics/react "Topic: react") [graphql](/topics/graphql "Topic: graphql") [aws](/topics/aws "Topic: aws") [styled-components](/topics/styled-components "Topic: styled-components") [serverless](/topics/serverless "Topic: serverless") [graph-database](/topics/graph-database "Topic: graph-database") [arangodb](/topics/arangodb "Topic: arangodb")

-   Updated Jan 21, 2021
-   JavaScript

### [semagrow](/semagrow) / [semagrow](/semagrow/semagrow)

[Star 35](/login?return_to=%2Fsemagrow%2Fsemagrow)

-   [Code](/semagrow/semagrow)
-   [Issues](/semagrow/semagrow/issues)
-   [Pull requests](/semagrow/semagrow/pulls)

A SPARQL query federator of heterogeneous data sources

[linked-data](/topics/linked-data "Topic: linked-data") [sparql](/topics/sparql "Topic: sparql") [rdf](/topics/rdf "Topic: rdf") [void](/topics/void "Topic: void") [distributed](/topics/distributed "Topic: distributed") [graph-database](/topics/graph-database "Topic: graph-database") [triplestore](/topics/triplestore "Topic: triplestore") [federated](/topics/federated "Topic: federated") [sparql-endpoints](/topics/sparql-endpoints "Topic: sparql-endpoints") [semagrow](/topics/semagrow "Topic: semagrow")

-   Updated Dec 16, 2022
-   JavaScript

### [JorgeCeja](/JorgeCeja) / [graphql-yoga-starter](/JorgeCeja/graphql-yoga-starter)

[Star 31](/login?return_to=%2FJorgeCeja%2Fgraphql-yoga-starter)

-   [Code](/JorgeCeja/graphql-yoga-starter)
-   [Issues](/JorgeCeja/graphql-yoga-starter/issues)
-   [Pull requests](/JorgeCeja/graphql-yoga-starter/pulls)

✅ Production level graphql server using nodejs and mongodb or postgresql without prisma

[graphql](/topics/graphql "Topic: graphql") [mongodb](/topics/mongodb "Topic: mongodb") [postgresql](/topics/postgresql "Topic: postgresql") [graphql-server](/topics/graphql-server "Topic: graphql-server") [graph-database](/topics/graph-database "Topic: graph-database") [graphql-yoga](/topics/graphql-yoga "Topic: graphql-yoga")

-   Updated May 20, 2018
-   JavaScript

### [coneda](/coneda) / [kor](/coneda/kor)

[Star 30](/login?return_to=%2Fconeda%2Fkor)

-   [Code](/coneda/kor)
-   [Issues](/coneda/kor/issues)
-   [Pull requests](/coneda/kor/pulls)

ConedaKOR – store.manage.retrieve.

[research](/topics/research "Topic: research") [graph-database](/topics/graph-database "Topic: graph-database") [digital-humanities](/topics/digital-humanities "Topic: digital-humanities") [art-history](/topics/art-history "Topic: art-history") [digital-asset-management](/topics/digital-asset-management "Topic: digital-asset-management")

-   Updated Feb 26, 2026
-   JavaScript

### [shutterstock](/shutterstock) / [gremlin-aws-sigv4](/shutterstock/gremlin-aws-sigv4)

[Star 29](/login?return_to=%2Fshutterstock%2Fgremlin-aws-sigv4)

-   [Code](/shutterstock/gremlin-aws-sigv4)
-   [Issues](/shutterstock/gremlin-aws-sigv4/issues)
-   [Pull requests](/shutterstock/gremlin-aws-sigv4/pulls)

Extension for Apache's TinkerPop3 Gremlin JS driver compatible with IAM Database Authentication for Neptune

[graph-database](/topics/graph-database "Topic: graph-database") [gremlin](/topics/gremlin "Topic: gremlin") [tinkerpop3](/topics/tinkerpop3 "Topic: tinkerpop3") [aws-neptune](/topics/aws-neptune "Topic: aws-neptune")

-   Updated Oct 16, 2025
-   JavaScript

### [memgraph](/memgraph) / [starlink](/memgraph/starlink)

[Star 28](/login?return_to=%2Fmemgraph%2Fstarlink)

-   [Code](/memgraph/starlink)
-   [Issues](/memgraph/starlink/issues)
-   [Pull requests](/memgraph/starlink/pulls)
-   [Discussions](/memgraph/starlink/discussions)

This project implements dynamic shortest-path routing for Starlink using Memgraph. Starlink satellites are low earth orbit communications satellites currently being launched and operated by SpaceX.

[graph-algorithms](/topics/graph-algorithms "Topic: graph-algorithms") [graph-database](/topics/graph-database "Topic: graph-database") [cypher](/topics/cypher "Topic: cypher") [starlink](/topics/starlink "Topic: starlink") [memgraph](/topics/memgraph "Topic: memgraph")

-   Updated May 16, 2024
-   JavaScript

### [giapnguyen74](/giapnguyen74) / [gstate](/giapnguyen74/gstate)

[Star 27](/login?return_to=%2Fgiapnguyen74%2Fgstate)

-   [Code](/giapnguyen74/gstate)
-   [Issues](/giapnguyen74/gstate/issues)
-   [Pull requests](/giapnguyen74/gstate/pulls)

A crazy state management for lazy programmers

[redux](/topics/redux "Topic: redux") [javascript](/topics/javascript "Topic: javascript") [state-management](/topics/state-management "Topic: state-management") [graph-database](/topics/graph-database "Topic: graph-database")

-   Updated Jul 25, 2018
-   JavaScript

### [unswdb](/unswdb) / [kuzu-wasm](/unswdb/kuzu-wasm)

[Star 23](/login?return_to=%2Funswdb%2Fkuzu-wasm)

-   [Code](/unswdb/kuzu-wasm)
-   [Issues](/unswdb/kuzu-wasm/issues)
-   [Pull requests](/unswdb/kuzu-wasm/pulls)
-   [Discussions](/unswdb/kuzu-wasm/discussions)

WebAssembly version of Kùzu database

[javascript](/topics/javascript "Topic: javascript") [embedded](/topics/embedded "Topic: embedded") [browser](/topics/browser "Topic: browser") [database](/topics/database "Topic: database") [webassembly](/topics/webassembly "Topic: webassembly") [olap](/topics/olap "Topic: olap") [graph-database](/topics/graph-database "Topic: graph-database") [graphdb](/topics/graphdb "Topic: graphdb") [cypher](/topics/cypher "Topic: cypher")

-   Updated Feb 28, 2025
-   JavaScript

### [webmaxru](/webmaxru) / [angular-neo4j](/webmaxru/angular-neo4j)

[Star 17](/login?return_to=%2Fwebmaxru%2Fangular-neo4j)

-   [Code](/webmaxru/angular-neo4j)
-   [Issues](/webmaxru/angular-neo4j/issues)
-   [Pull requests](/webmaxru/angular-neo4j/pulls)

Neo4j Bolt driver wrapper for Angular

[angular](/topics/angular "Topic: angular") [neo4j](/topics/neo4j "Topic: neo4j") [graph](/topics/graph "Topic: graph") [neo4j-driver](/topics/neo4j-driver "Topic: neo4j-driver") [graph-database](/topics/graph-database "Topic: graph-database") [cypher](/topics/cypher "Topic: cypher")

-   Updated Jan 4, 2023
-   JavaScript

 Load more…

## Improve this page

Add a description, image, and links to the graph-database topic page so that developers can more easily learn about it.

[Curate this topic](https://github.com/github/explore/tree/master/CONTRIBUTING.md?source=add-description-graph-database)

## Add this topic to your repo

To associate your repository with the graph-database topic, visit your repo's landing page and select "manage topics."

[Learn more](https://docs.github.com/en/articles/classifying-your-repository-with-topics)

## Footer

[](https://github.com)© 2026 GitHub, Inc.

### Footer navigation

-   [Terms](https://docs.github.com/site-policy/github-terms/github-terms-of-service)
-   [Privacy](https://docs.github.com/site-policy/privacy-policies/github-privacy-statement)
-   [Security](https://github.com/security)
-   [Status](https://www.githubstatus.com/)
-   [Community](https://github.community/)
-   [Docs](https://docs.github.com/)
-   [Contact](https://support.github.com?tags=dotcom-footer)
-   Manage cookies
-   Do not share my personal information

You can’t perform that action at this time.
```

---

## Assistant (General · MiniMax-M2.5 · 40.6s)

_Thinking:_

I found several interesting options. Let me look at a few more specific ones:
1. fortunejs/fortune - Non-native graph database abstraction layer for Node.js and web browsers
2. unswdb/kuzu-wasm - WebAssembly version of Kùzu database (embedded, browser)
3. brandonbloom/jseg - Simple in-memory JS graph database

Let me also check the kuzu-wasm one as it's a newer approach (WASM).

Based on my research, here are the **3 best graph database solutions** for your tech stack (ViteJS + Aurelia 2 frontend, .NET 9 WebAPI backend), prioritizing client-side solutions:

---

## 1. **TinkerGraph-js** (jbmusso/tinkergraph-js)
A pure JavaScript implementation of Apache TinkerPop's TinkerGraph - an in-memory graph database.

| Pros                                 | Cons                                  |
| ------------------------------------ | ------------------------------------- |
| Works in both Node.js and browser    | Not published to npm (manual install) |
| Implements standard TinkerPop API    | Not production-ready (WIP)            |
| ~20k vertices/second performance     | Low community activity (73 stars)     |
| Supports vertices, edges, properties | No TypeScript types                   |
| Idiomatic JavaScript API             | Limited documentation                 |

**Best for:** If you need standard graph operations and can work with the TinkerPop API pattern.

---

## 2. **Kùzu WASM** (unswdb/kuzu-wasm)
WebAssembly port of Kùzu embedded graph database - runs entirely in the browser.

| Pros                                       | Cons                        |
| ------------------------------------------ | --------------------------- |
| Runs in browser via WebAssembly            | Very new project (23 stars) |
| Cypher query language support              | Still in development        |
| Embedded (no backend required)             | Limited browser testing     |
| High-performance (compiled to WASM)        | May have larger bundle size |
| Compatible with standard graph DB patterns | Less community support      |

**Best for:** If you want Cypher query support and willing to use bleeding-edge WASM technology.

---

## 3. **LokiJS** (techfort/LokiJS)
Fast in-memory JavaScript document database with graph-like capabilities.

| Pros                                | Cons                                     |
| ----------------------------------- | ---------------------------------------- |
| Very popular (6.8k stars)           | Document-oriented, not native graph DB   |
| Runs in browser, Node, NativeScript | No native edge/relationship queries      |
| Excellent performance (1.1M ops/s)  | Requires workarounds for graph relations |
| Built-in indexing & views           | You model relationships manually         |
| Persistence adapters available      |                                          |
| Active community & good docs        |                                          |

**Best for:** If you need a fast client-side store and can model relationships within documents (or use its joins feature).

---

## Recommendation

For your **client-side preference** with ViteJS + Aurelia 2:

1. **First choice: LokiJS** - Most mature, excellent browser support, easy integration with Vite/Aurelia
2. **Second choice: TinkerGraph-js** - If you need true graph operations
3. **Alternative: Kùzu WASM** - If you want Cypher and are comfortable with early-stage tech

All three run entirely client-side, requiring no backend graph DB - fitting your preference perfectly.

---

