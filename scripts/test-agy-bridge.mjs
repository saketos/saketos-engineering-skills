import { spawn, spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import assert from "node:assert/strict";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const scratch = fs.mkdtempSync(path.join(process.env.PAPERCLIP_RUN_SCRATCH_DIR || os.tmpdir(), "agy-tests-"));
process.on("exit", () => fs.rmSync(scratch, { recursive: true, force: true }));
const BRIDGE = path.join(__dirname, "agy-paperclip-bridge");

function runTest(name, fakeScriptContent, expectedExitCode, checkOutput) {
  const fakePath = path.join(scratch, `fake-agy-${Date.now()}-${Math.random().toString(36).slice(2)}.sh`);
  fs.writeFileSync(fakePath, fakeScriptContent, { mode: 0o755 });
  try {
    const res = spawnSync(BRIDGE, ["--output-format", "stream-json", "--approval-mode", "yolo", "--prompt", "test"], {
      env: { ...process.env, AGY_BIN: fakePath },
      encoding: "utf8",
      timeout: 5000,
      killSignal: "SIGKILL",
    });
    const exitOk = res.status === expectedExitCode;
    const outputOk = checkOutput(res.stdout, res.stderr, res.status);
    if (!exitOk || !outputOk) {
      console.error(`FAIL: ${name}`);
      console.error(`  Expected exit: ${expectedExitCode}, got: ${res.status}`);
      console.error(`  stdout:`, res.stdout);
      console.error(`  stderr:`, res.stderr);
      process.exit(1);
    }
    console.log(`PASS: ${name} (exit: ${res.status})`);
  } finally {
    try { fs.unlinkSync(fakePath); } catch {}
  }
}

async function runAsyncTest(name, fakeScriptContent, action, expectedExitCode, checkOutput, timeoutMs = 8000) {
  const fakePath = path.join(scratch, `fake-${Date.now()}.sh`);
  fs.writeFileSync(fakePath, fakeScriptContent, { mode: 0o755 });
  const child = spawn(BRIDGE, ["--prompt", "test"], {
    env: { ...process.env, AGY_BIN: fakePath },
    detached: true,
    stdio: ["ignore", "pipe", "pipe"],
  });
  let stdout = "", stderr = "", safetyTimer;
  child.stdout.on("data", chunk => { stdout += chunk; });
  child.stderr.on("data", chunk => { stderr += chunk; });
  const closed = new Promise((resolve, reject) => {
    child.on("error", reject);
    child.on("close", (code, signal) => resolve([code, signal]));
  });
  const deadline = new Promise((_, reject) => {
    safetyTimer = setTimeout(() => reject(new Error(`Test exceeded ${timeoutMs}ms`)), timeoutMs);
  });
  try {
    const [status, signal] = await Promise.race([
      (async () => { await action(child); return closed; })(), deadline,
    ]);
    assert.equal(status, expectedExitCode, `${name}: signal=${signal}; ${stderr}`);
    assert.ok(checkOutput(stdout, stderr, status, signal), `${name}: ${stdout}`);
    // The fixture publishes its own PID only after installing its TERM handler.
    const pid = Number(stderr.match(/READY (\d+)/)?.[1]);
    if (pid) assert.throws(() => process.kill(pid, 0), { code: "ESRCH" });
    console.log(`PASS: ${name} (exit: ${status}; child cleanup verified)`);
  } finally {
    clearTimeout(safetyTimer);
    // A separate process group ensures cleanup also runs on assertion/deadline failure.
    try { process.kill(-child.pid, "SIGKILL"); } catch (error) {
      if (error.code !== "ESRCH") throw error;
    }
    await closed;
    fs.unlinkSync(fakePath);
  }
}

function waitReady(proc) {
  return new Promise(resolve => {
    let data = "";
    const onData = chunk => {
      data += chunk;
      if (/READY \d+\n/.test(data)) {
        proc.stderr.off("data", onData);
        resolve();
      }
    };
    proc.stderr.on("data", onData);
  });
}

// Test 1: Child killed by SIGTERM must exit 143 and emit error, not success
runTest(
  "Child killed by SIGTERM",
  "#!/bin/sh\nkill -TERM $$\n",
  143,
  (stdout, stderr, code) => stdout.includes('"type":"error"') && stdout.includes("SIGTERM") && !stdout.includes('"subtype":"success"')
);

// Test 2: Child outputs nothing and exits 0 must exit 1 and emit error
runTest(
  "Child outputs nothing and exits 0",
  "#!/bin/sh\nexit 0\n",
  1,
  (stdout, stderr, code) => stdout.includes('"type":"error"') && !stdout.includes('"subtype":"success"')
);

// Test 3: Child emits result with ERROR status must exit 1 and emit error
runTest(
  "Child emits result with ERROR status",
  `#!/bin/sh
cat << 'EOF'
{"event":"result","result":{"status":"ERROR","error":"simulated failure"}}
EOF
exit 0
`,
  1,
  (stdout, stderr, code) => stdout.includes('"type":"error"') && stdout.includes("simulated failure") && !stdout.includes('"subtype":"success"')
);

// Test 4: SUCCESS without trailing newline must be parsed via buffer flush on close
runTest(
  "Child emits SUCCESS result without trailing newline",
  `#!/bin/sh
printf '%s' '{"event":"result","result":{"status":"SUCCESS","response":"fixture-ok","usage":{"input_tokens":42,"output_tokens":12}}}'
exit 0
`,
  0,
  (stdout, stderr, code) => {
    const lines = stdout.trim().split("\n").map(l => JSON.parse(l));
    const res = lines.find(l => l.type === "result");
    return res && res.subtype === "success" && res.result === "fixture-ok" && res.usage && res.usage.input_tokens === 42;
  }
);

// Test 5: Full normal SUCCESS with usage and message
runTest(
  "Child emits full normal SUCCESS with usage and message",
  `#!/bin/sh
cat << 'EOF'
{"event":"step_update","step_update":{"step_type":"agent_response","text_delta":"hello world"}}
{"event":"result","result":{"status":"SUCCESS","response":"hello world","usage":{"input_tokens":100,"output_tokens":20}}}
EOF
exit 0
`,
  0,
  (stdout, stderr, code) => {
    const lines = stdout.trim().split("\n").map(l => JSON.parse(l));
    const res = lines.find(l => l.type === "result");
    const msg = lines.find(l => l.type === "message");
    return res && res.subtype === "success" && res.result === "hello world" && msg && msg.content === "hello world" && res.usage?.input_tokens === 100;
  }
);

// Test 6: Bridge terminated by SIGTERM with child emitting SUCCESS on exit
await runAsyncTest(
  "Bridge terminated by SIGTERM with child emitting SUCCESS on exit",
  `#!/bin/sh
trap 'cat << "EOF"
{"event":"result","result":{"status":"SUCCESS","response":"cancelled-fixture"}}
EOF
exit 0' TERM
echo "READY $$" >&2
while true; do
  sleep 0.05
done
`,
  async (proc) => {
    await waitReady(proc);
    proc.kill("SIGTERM");
  },
  143,
  (stdout, stderr, code) =>
    stdout.includes('"type":"error"') &&
    stdout.includes("bridge received signal: SIGTERM") &&
    !stdout.includes('"subtype":"success"') &&
    !stdout.includes('"result":"cancelled-fixture"')
);

// Test 7: Bridge escalates to SIGKILL when child ignores SIGTERM (Recenzent P0 requirement)
let t7Start = 0;
await runAsyncTest(
  "Bridge escalates to SIGKILL when child ignores SIGTERM",
  `#!/usr/bin/env python3
import signal, time, sys, os
signal.signal(signal.SIGTERM, signal.SIG_IGN)
sys.stderr.write(f"READY {os.getpid()}\\n")
sys.stderr.flush()
while True:
    time.sleep(0.05)
`,
  async (proc) => {
    await waitReady(proc);
    t7Start = Date.now();
    proc.kill("SIGTERM");
  },
  143,
  (stdout, stderr, code) => {
    const elapsed = Date.now() - t7Start;
    return (
      stdout.includes('"type":"error"') &&
      stdout.includes("bridge received signal: SIGTERM") &&
      !stdout.includes('"subtype":"success"') &&
      elapsed >= 1800 && elapsed <= 5000
    );
  }
);

console.log("\nALL BRIDGE UNIT TESTS PASSED!");


