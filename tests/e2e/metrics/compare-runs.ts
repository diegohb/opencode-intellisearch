import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

interface Solution {
  name: string;
  githubRepo?: string;
}

interface RunResult {
  timestamp: string;
  solutions: Solution[];
  searchSuccess: boolean;
  searchFailures: string[];
  rawOutput: string;
}

interface ConsistencyReport {
  generated: string;
  runCount: number;
  consistency: {
    jaccardScore: number;
    commonSolutions: string[];
    allSolutions: string[];
  };
  searchSuccessRate: number;
  tokenMetrics: {
    average: number;
    min: number;
    max: number;
    stdDev: number;
  };
  runs: RunResult[];
}

function extractSolutions(text: string): Solution[] {
  const solutions: Solution[] = [];
  
  const githubRegex = /github\.com\/([a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+)/gi;
  const repoMatches = text.match(githubRegex) ?? [];
  const uniqueRepos = [...new Set(repoMatches)];
  
  for (const repo of uniqueRepos) {
    const name = repo.split("/")[1] ?? repo;
    solutions.push({ name, githubRepo: repo });
  }
  
  const namePatterns = [
    /(?:solution|option|library|database):\s*\*\*([^*]+)\*\*/gi,
    /\|\s*\*\*([^*]+)\*\*\s*\|/gi,
    /^\s*[-*]\s+\*\*([^*]+)\*\*/gm
  ];
  
  for (const pattern of namePatterns) {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      const name = match[1].trim();
      if (!solutions.some(s => s.name.toLowerCase() === name.toLowerCase())) {
        solutions.push({ name });
      }
    }
  }
  
  return solutions;
}

function detectSearchFailures(text: string): { success: boolean; failures: string[] } {
  const failures: string[] = [];
  
  const failurePatterns = [
    { pattern: /captcha|bot detection|blocked/i, name: "Captcha/Block" },
    { pattern: /redirect.*enablejs|please click/i, name: "JS Redirect" },
    { pattern: /repository not found|not indexed/i, name: "DeepWiki Not Found" },
    { pattern: /403|401|forbidden|unauthorized/i, name: "Auth Error" },
    { pattern: /timeout|timed out/i, name: "Timeout" }
  ];
  
  for (const { pattern, name } of failurePatterns) {
    if (pattern.test(text)) {
      failures.push(name);
    }
  }
  
  return {
    success: failures.length === 0,
    failures
  };
}

function jaccardSimilarity(set1: Set<string>, set2: Set<string>): number {
  const intersection = new Set([...set1].filter(x => set2.has(x)));
  const union = new Set([...set1, ...set2]);
  return union.size === 0 ? 0 : intersection.size / union.size;
}

function calculateStdDev(values: number[]): number {
  if (values.length === 0) return 0;
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const squaredDiffs = values.map(v => Math.pow(v - mean, 2));
  return Math.sqrt(squaredDiffs.reduce((a, b) => a + b, 0) / values.length);
}

async function compareRuns(resultsDir: string): Promise<ConsistencyReport> {
  const runs: RunResult[] = [];
  const entries = await readdir(resultsDir, { withFileTypes: true });
  
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    
    const runDir = join(resultsDir, entry.name);
    const outputFile = join(runDir, "output.json");
    
    try {
      const content = await readFile(outputFile, "utf-8");
      const { success: searchSuccess, failures } = detectSearchFailures(content);
      
      runs.push({
        timestamp: entry.name,
        solutions: extractSolutions(content),
        searchSuccess,
        searchFailures: failures,
        rawOutput: content
      });
    } catch (error) {
      console.error(`Failed to read ${outputFile}: ${(error as Error).message}`);
    }
  }
  
  runs.sort((a, b) => a.timestamp.localeCompare(b.timestamp));
  
  const allSolutionNames = new Set<string>();
  for (const run of runs) {
    for (const sol of run.solutions) {
      allSolutionNames.add(sol.name.toLowerCase());
    }
  }
  
  let totalJaccard = 0;
  let comparisons = 0;
  const commonSolutions = new Set<string>(allSolutionNames);
  
  for (let i = 0; i < runs.length; i++) {
    const setI = new Set(runs[i].solutions.map(s => s.name.toLowerCase()));
    
    for (let j = i + 1; j < runs.length; j++) {
      const setJ = new Set(runs[j].solutions.map(s => s.name.toLowerCase()));
      totalJaccard += jaccardSimilarity(setI, setJ);
      comparisons++;
      
      const intersection = [...setI].filter(x => setJ.has(x));
      for (const sol of intersection) {
        if (!commonSolutions.has(sol)) {
          // Not common across all runs
        }
      }
    }
  }
  
  const avgJaccard = comparisons > 0 ? totalJaccard / comparisons : 0;
  
  const successRate = runs.filter(r => r.searchSuccess).length / runs.length;
  
  const report: ConsistencyReport = {
    generated: new Date().toISOString(),
    runCount: runs.length,
    consistency: {
      jaccardScore: Math.round(avgJaccard * 100) / 100,
      commonSolutions: [...commonSolutions],
      allSolutions: [...allSolutionNames]
    },
    searchSuccessRate: Math.round(successRate * 100) / 100,
    tokenMetrics: {
      average: 0,
      min: 0,
      max: 0,
      stdDev: 0
    },
    runs
  };
  
  return report;
}

async function main(): Promise<void> {
  const resultsDir = process.argv[2] ?? "./tests/e2e/results";
  
  console.log(`Comparing runs in ${resultsDir}...`);
  const report = await compareRuns(resultsDir);
  
  const reportPath = join(resultsDir, "consistency-report.json");
  await writeFile(reportPath, JSON.stringify(report, null, 2));
  
  console.log("\n=== Consistency Report ===");
  console.log(`Runs analyzed: ${report.runCount}`);
  console.log(`Jaccard similarity: ${report.consistency.jaccardScore}`);
  console.log(`Search success rate: ${report.searchSuccessRate * 100}%`);
  console.log(`Unique solutions found: ${report.consistency.allSolutions.length}`);
  console.log(`\nReport written to ${reportPath}`);
}

main().catch(console.error);
