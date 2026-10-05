import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BRIDGE = path.join(__dirname, "agy-paperclip-bridge");

function runTest(name, fakeScriptContent, expectedExitCode, checkOutput) {
  const fakePath = `/tmp/fake-agy-${Date.now()}-${Math.random().toString(36).slice(2)}.sh`;
  fs.writeFileSync(fakePath, fakeScriptContent, { mode: 0o755 });
  try {
    const res = spawnSync(BRIDGE, ["--output-format", "stream-json", "--approval-mode", "yolo", "--prompt", "test"], {
      env: { ...process.env, AGY_BIN: fakePath },
      encoding: "utf8",
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

console.log("\nALL BRIDGE UNIT TESTS PASSED!");
