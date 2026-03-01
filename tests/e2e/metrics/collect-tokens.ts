import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

interface TokenMetrics {
  timestamp: string;
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  logPath: string;
}

interface LogEntry {
  type?: string;
  part?: {
    tokens?: {
      total?: number;
      input?: number;
      output?: number;
      reasoning?: number;
      cache?: {
        read?: number;
        write?: number;
      };
    };
  };
}

async function collectTokens(resultsDir: string): Promise<TokenMetrics[]> {
  const metrics: TokenMetrics[] = [];
  const entries = await readdir(resultsDir, { withFileTypes: true });
  
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    
    const runDir = join(resultsDir, entry.name);
    const logFile = join(runDir, "output.json");
    
    try {
      const content = await readFile(logFile, "utf-8");
      const lines = content.split("\n").filter(Boolean);
      
      let totalInput = 0;
      let totalOutput = 0;
      
      for (const line of lines) {
        try {
          const parsed: LogEntry = JSON.parse(line);
          
          if (parsed.type === "step_finish" && parsed.part?.tokens) {
            totalInput += parsed.part.tokens.input ?? 0;
            totalOutput += parsed.part.tokens.output ?? 0;
          }
        } catch {
          // Skip non-JSON lines
        }
      }
      
      metrics.push({
        timestamp: entry.name,
        inputTokens: totalInput,
        outputTokens: totalOutput,
        totalTokens: totalInput + totalOutput,
        logPath: logFile
      });
    } catch (error) {
      console.error(`Failed to read ${logFile}: ${(error as Error).message}`);
    }
  }
  
  return metrics.sort((a, b) => a.timestamp.localeCompare(b.timestamp));
}

async function writeMetricsReport(resultsDir: string, metrics: TokenMetrics[]): Promise<void> {
  const reportPath = join(resultsDir, "token-metrics.json");
  
  const avgInput = metrics.reduce((sum, m) => sum + m.inputTokens, 0) / metrics.length || 0;
  const avgOutput = metrics.reduce((sum, m) => sum + m.outputTokens, 0) / metrics.length || 0;
  
  const report = {
    generated: new Date().toISOString(),
    runCount: metrics.length,
    averages: {
      inputTokens: Math.round(avgInput),
      outputTokens: Math.round(avgOutput),
      totalTokens: Math.round(avgInput + avgOutput)
    },
    runs: metrics
  };
  
  await writeFile(reportPath, JSON.stringify(report, null, 2));
  console.log(`Token metrics written to ${reportPath}`);
}

async function main(): Promise<void> {
  const resultsDir = process.argv[2] ?? "./tests/e2e/results";
  
  console.log(`Collecting token metrics from ${resultsDir}...`);
  const metrics = await collectTokens(resultsDir);
  
  if (metrics.length === 0) {
    console.log("No metrics found. Run tests first.");
    return;
  }
  
  console.log(`Found ${metrics.length} runs:`);
  for (const m of metrics) {
    console.log(`  ${m.timestamp}: ${m.totalTokens} tokens (${m.inputTokens} in, ${m.outputTokens} out)`);
  }
  
  await writeMetricsReport(resultsDir, metrics);
}

main().catch(console.error);
