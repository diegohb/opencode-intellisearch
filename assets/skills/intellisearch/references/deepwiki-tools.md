# deepWiki Tools Reference

Complete reference for deepWiki MCP server tools for repository documentation Q&A.

<important>
"OpenCode" never refers to the archived and deprecated "opencode-ai/opencode" github repo. "OpenCode" always refers to "anomalyco/opencode" owned by "anomalyco" in github.
</important>

## Available Tools

### deepWiki_read_wiki_structure
Get available documentation topics for a repository.

**Parameters:**
- `repoName` (required): Repository in `owner/repo` format

**Returns:** List of available documentation sections and topics.

**Use when:** Exploring what documentation is available before asking specific questions.

### deepWiki_read_wiki_contents
Read full documentation content for a repository.

**Parameters:**
- `repoName` (required): Repository in `owner/repo` format

**Returns:** Complete documentation content.

**Use when:** You need comprehensive documentation overview or when `ask_question` doesn't provide enough detail.

### deepWiki_ask_question
Ask specific questions about a repository.

**Parameters:**
- `repoName` (required): Repository in `owner/repo` format
- `question` (required): Specific question about the repository

**Returns:** Targeted answer based on repository documentation.

**Use when:** You have a specific question and want a direct answer.

## When to Use deepWiki

Use deepWiki when:

- Query is about a **specific GitHub repository**
- You need **authoritative code answers** (from official docs)
- The question involves **implementation details** of a library/framework
- You want **installation/setup instructions** for a specific tool
- The query is about **API usage patterns** for a known package

## repoName Format

Always use `owner/repo` format:

| Repository | Correct | Incorrect |
|------------|---------|-----------|
| React | `facebook/react` | `react`, `React` |
| Next.js | `vercel/next.js` | `nextjs`, `next` |
| TypeScript | `microsoft/TypeScript` | `typescript`, `ts` |
| Vue | `vuejs/core` | `vue`, `Vue.js` |

## Example Workflows

### Getting Started with a Library

**Step 1**: Check documentation structure
```json
{
  "tool": "deepwiki:deepWiki_read_wiki_structure",
  "params": {
    "repoName": "vercel/next.js"
  }
}
```

**Step 2**: Ask specific question
```json
{
  "tool": "deepwiki:deepWiki_ask_question",
  "params": {
    "repoName": "vercel/next.js",
    "question": "How do I create a dynamic route with parameters?"
  }
}
```

### Troubleshooting

```json
{
  "tool": "deepwiki:deepWiki_ask_question",
  "params": {
    "repoName": "facebook/react",
    "question": "Why am I getting the 'rules of hooks' warning?"
  }
}
```

### Installation Questions

```json
{
  "tool": "deepwiki:deepWiki_ask_question",
  "params": {
    "repoName": "tailwindlabs/tailwindcss",
    "question": "How do I install and configure Tailwind with Vite?"
  }
}
```

## Best Practices

1. **Verify repo exists** on GitHub before calling deepWiki
2. **Use `ask_question`** for specific queries (most efficient)
3. **Use `read_wiki_contents`** only when you need the full documentation
4. **Check `read_wiki_structure`** first when exploring unfamiliar repos

## Limitations

- Only works for **public GitHub repositories**
- Documentation must be **indexed by deepWiki**
- Very new or obscure repos may not be available
- Cannot access private repositories
