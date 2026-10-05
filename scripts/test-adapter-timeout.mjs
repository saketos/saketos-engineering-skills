import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { execute } from "/home/daniel/.paperclip/cli/current/node_modules/@paperclipai/adapter-gemini-local/dist/server/index.js";

async function main() {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "paperclip-gemini-timeout-test-"));
  const fakeCommand = path.join(root, "hanging-gemini.sh");
  await fs.writeFile(fakeCommand, "#!/bin/sh\nsleep 10\n", { mode: 0o755 });
  const workspace = path.join(root, "workspace");
  await fs.mkdir(workspace, { recursive: true });

  console.log("=== TEST ADAPTER TIMEOUT (Paperclip gemini_local) ===");
  console.log("Config: timeoutSec=2, atrapa='sleep 10'");
  const tStart = Date.now();

  const result = await execute({
    runId: "run-timeout-probe",
    agent: {
      id: "agent-timeout-probe",
      companyId: "company-timeout-probe",
      name: "Gemini Timeout Probe",
      adapterType: "gemini_local",
      adapterConfig: { engine: "cli", timeoutSec: 2 },
    },
    runtime: {
      sessionId: null,
      sessionParams: null,
      sessionDisplayId: null,
      taskKey: null,
    },
    config: {
      engine: "cli",
      command: fakeCommand,
      cwd: workspace,
      timeoutSec: 2,
      env: {},
      promptTemplate: "test timeout prompt",
    },
    context: {},
    authToken: "dummy-token",
    onLog: async () => {},
  });

  const durationMs = Date.now() - tStart;
  console.log(`Execution completed in: ${durationMs}ms`);
  console.log("Result:", JSON.stringify(result, null, 2));

  // Assertions
  const ok =
    result.timedOut === true &&
    result.errorMessage === "Timed out after 2s" &&
    durationMs >= 1900 &&
    durationMs <= 4000;

  if (!ok) {
    console.error("FAIL: Adapter timeout assertions failed!");
    process.exit(1);
  }

  // Cleanup
  await fs.rm(root, { recursive: true, force: true });
  console.log("Cleanup: temporary directories and process trees removed.");
  console.log("PASS: Adapter timeout successfully proven (timedOut: true, errorMessage: 'Timed out after 2s')");
  process.exit(0);
}

main().catch((err) => {
  console.error("Error in test-adapter-timeout:", err);
  process.exit(1);
});
