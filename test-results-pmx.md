# PMX Test Results Summary

## Test Environment
- **Project**: C:\dev\projects\playground\aigpt\test-websearch
- **Local Package**: C:\dev\projects\github\opencode-intellisearch (branch: ai-convert-to-plugin)
- **Published Package**: opencode-intellisearch v0.1.2 (npm), v0.1.1 (bun)

---

## Test Results

### TEST 1: npx from project root
**Command**: `npx opencode-intellisearch --local` from `C:\dev\projects\playground\aigpt\test-websearch`

**Result**: ✅ Installation succeeded
**Target**: `C:\dev\projects\playground\aigpt\test-websearch\.opencode`
**Files Created**:
- `.opencode/skills/intellisearch/intellisearch/SKILL.md` (⚠️ double nesting)
- `.opencode/commands/intellisearch.md`

**Issues**:
1. ❌ Skills nested incorrectly: `intellisearch/intellisearch/` instead of `intellisearch/`

---

### TEST 2: bunx from project root
**Command**: `bunx opencode-intellisearch --local` from `C:\dev\projects\playground\aigpt\test-websearch`

**Result**: ❌ FAILED
**Error**: `Unknown command: --local`

**Root Cause**: 
bunx downloaded v0.1.1 from npm, which doesn't have the flag parsing fix. The published npm version is outdated.

---

### TEST 3: npx from .opencode directory
**Command**: `npx opencode-intellisearch --local` from `C:\dev\projects\playground\aigpt\test-websearch\.opencode`

**Result**: ⚠️ Installation succeeded to WRONG location
**Target**: `C:\dev\projects\playground\aigpt\test-websearch\.opencode\.opencode`
**Files Created**:
- `.opencode/.opencode/skills/intellisearch/intellisearch/SKILL.md`
- `.opencode/.opencode/commands/intellisearch.md`

**Issues**:
1. ❌ Wrong target: Created nested `.opencode/.opencode/` instead of using parent
2. ❌ Should detect project root and install there, not in current directory
3. ❌ Double nesting issue (same as TEST 1)

---

### TEST 4: bunx from .opencode directory
**Command**: `bunx opencode-intellisearch --local` from `C:\dev\projects\playground\aigpt\test-websearch\.opencode`

**Result**: ❌ FAILED
**Error**: `Unknown command: --local`

**Root Cause**: Same as TEST 2 - bunx using outdated v0.1.1 from npm

---

### TEST 5: npx from testsub/subdir
**Command**: `npx opencode-intellisearch --local` from `C:\dev\projects\playground\aigpt\test-websearch\testsub\subdir`

**Result**: ⚠️ Installation succeeded to WRONG location
**Target**: `C:\dev\projects\playground\aigpt\test-websearch\testsub\subdir\.opencode`
**Files Created**:
- `testsub/subdir/.opencode/skills/intellisearch/intellisearch/SKILL.md`
- `testsub/subdir/.opencode/commands/intellisearch.md`

**Issues**:
1. ❌ Wrong target: Installed in subdir instead of project root
2. ❌ Should traverse up to find package.json and use that directory
3. ❌ Double nesting issue (same as TEST 1)

---

### TEST 6: bunx from testsub/subdir
**Command**: `bunx opencode-intellisearch --local` from `C:\dev\projects\playground\aigpt\test-websearch\testsub\subdir`

**Result**: ❌ FAILED
**Error**: `Unknown command: --local`

**Root Cause**: Same as TEST 2 and 4 - bunx using outdated v0.1.1 from npm

---

## Summary of Issues Found

### Issue 1: Published Package Version Mismatch
**Severity**: HIGH
**Description**: 
- npm has v0.1.2 (has --local flag support)
- bunx fetches v0.1.1 (missing --local flag support)
- This causes 3 of 6 tests to fail

**Impact**: Users using bunx will get broken experience

### Issue 2: Incorrect Directory Nesting (Skills)
**Severity**: MEDIUM
**Description**: Skills installed to `skills/intellisearch/intellisearch/` instead of `skills/intellisearch/`

**Root Cause**: CLI copies entire `intellisearch` directory into `skills/intellisearch/`, creating double nesting

**Impact**: OpenCode won't find skills in expected location

### Issue 3: Wrong Installation Target (CWD vs Project Root)
**Severity**: HIGH
**Description**: When run from subdirectory, installs to `subdir/.opencode/` instead of project root `.opencode/`

**Root Cause**: `getOpenCodeDir()` uses `process.cwd()` for local installs instead of finding project root

**Impact**: Files installed to wrong location, OpenCode can't find them

### Issue 4: No Project Root Detection
**Severity**: HIGH
**Description**: When run from `.opencode/` directory, creates `.opencode/.opencode/` nested structure

**Root Cause**: Same as Issue 3 - doesn't properly detect and use project root

**Impact**: Complete installation failure - files in wrong location

### Issue 5: Deprecation Warning (npm)
**Severity**: LOW
**Description**: `(node:xxx) [DEP0174] DeprecationWarning: Calling promisify on a function that returns a Promise is likely a mistake.`

**Root Cause**: Likely in fs/promises usage or copy operations

**Impact**: Warning noise, no functional impact

---

## Working vs Broken Matrix

| Test | Location | Tool | Result | Issues |
|------|----------|------|--------|--------|
| 1 | Project root | npx | ⚠️ Working | Issue 2 (double nesting) |
| 2 | Project root | bunx | ❌ Failed | Issue 1 (old version) |
| 3 | .opencode/ | npx | ❌ Broken | Issues 2, 3, 4 |
| 4 | .opencode/ | bunx | ❌ Failed | Issue 1 (old version) |
| 5 | testsub/subdir/ | npx | ❌ Broken | Issues 2, 3 |
| 6 | testsub/subdir/ | bunx | ❌ Failed | Issue 1 (old version) |

**Success Rate**: 1/6 (16.7%) - Only TEST 1 partially works

---

## Required Fixes

1. **Republish to npm** with latest code (fixes Issue 1)
2. **Fix CLI path resolution** to use project root instead of CWD (fixes Issues 3, 4)
3. **Fix skills directory copy** to not create double nesting (fixes Issue 2)
4. **Optional**: Fix deprecation warning

---

## Test Files Status

All test installations have been cleaned up (uninstalled).
