import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import assert from "node:assert/strict";
import { execute } from "/home/daniel/.paperclip/cli/current/node_modules/@paperclipai/adapter-gemini-local/dist/server/index.js";

async function main() {
  const root = await fs.mkdtemp(path.join(process.env.PAPERCLIP_RUN_SCRATCH_DIR || os.tmpdir(), "paperclip-gemini-timeout-test-"));
  let fixturePid;
  try {
  const pidFile = path.join(root, "fixture.pid");
  const fakeCommand = path.join(root, "hanging-gemini.sh");
  await fs.writeFile(fakeCommand, `#!/usr/bin/env python3
import os, time
with open(${JSON.stringify(pidFile)}, "w") as f:
    f.write(str(os.getpid()))
time.sleep(30)
`, { mode: 0o755 });
  const workspace = path.join(root, "workspace");
  await fs.mkdir(workspace, { recursive: true });

  console.log("=== TEST ADAPTER TIMEOUT (Paperclip gemini_local) ===");
  console.log("Config: timeoutSec=2, atrapa='Python sleep 30, PID recorded'");
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
      graceSec: 1,
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

  assert.ok(ok, "Adapter timeout assertions failed");
  fixturePid = Number(await fs.readFile(pidFile, "utf8"));
  assert.ok(Number.isInteger(fixturePid) && fixturePid > 1);
  assert.throws(() => process.kill(fixturePid, 0), { code: "ESRCH" });
  console.log(`PASS: timedOut=true, duration=${durationMs}ms, fixture PID ${fixturePid} absent`);
  } finally {
    // On failure, recover the PID even when execution/assertions threw early.
    if (!fixturePid) fixturePid = Number(await fs.readFile(path.join(root, "fixture.pid"), "utf8").catch(() => ""));
    if (fixturePid > 1) {
      try { process.kill(fixturePid, "SIGKILL"); } catch (error) {
        if (error.code !== "ESRCH") throw error;
      }
    }
    await fs.rm(root, { recursive: true, force: true });
  }
}

main().catch((err) => {
  console.error("Error in test-adapter-timeout:", err);
  process.exit(1);
});
