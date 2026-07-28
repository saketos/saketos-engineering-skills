---
name: diagnosing-bugs
description: Diagnose hard bugs through a reproducible feedback loop before proposing or applying a fix.
saketos-version: 0.1.0
upstream-repository: mattpocock/skills
upstream-commit: 2ab958093e83e0ec752e6c1c5932da465bf23e0c
upstream-path: skills/engineering/diagnosing-bugs/SKILL.md
upstream-blob: f400de7c1937377fec7ff9bae3b0c072670f1e81
default-mode: read-only
mutation-policy: task-packet-and-active-lease-required
---

# Diagnosing Bugs


## Saketos governance

- The exact Task Packet and active portfolio governance are authoritative.
- Default to read-only unless the Task Packet explicitly authorizes mutation.
- Every mutating action requires a valid active lease owned by the assigned executor.
- No issue, label, branch, worktree, tracked file, commit, push, PR, merge, deployment, database or secret mutation outside the assigned role and exact Allowed-Paths.
- Do not create a separate queue, lease model or delivery status.
- Internal review and subagents are executor pre-review only, never an independent Quality Gate.
- If a required contract field is missing or contradictory, stop before mutation and report the missing field.


## 1. Establish the exact symptom

Restate the user-visible failure, affected environment, expected behavior and evidence source. Use the Task Packet wording when present. Do not substitute a nearby failure.

## 2. Build a red-capable feedback loop

Find one deterministic, agent-runnable command that exercises the real path and can fail on the exact symptom. Prefer, in order:

1. focused behavioral test at the highest valid seam;
2. HTTP or CLI reproduction;
3. headless browser assertion;
4. captured trace replay;
5. isolated harness;
6. differential or bisection loop.

Record the command and observed output. Reading code to form a preferred theory before a red-capable loop exists is not diagnosis.

## 3. Reproduce and minimise

Run the loop repeatedly. Reduce the scenario one element at a time until every remaining element is load-bearing. Keep the original reproduction as the final verification path.

## 4. Rank falsifiable hypotheses

Produce 3-5 hypotheses. For each, state a prediction that would disprove it. Use repository history, runtime evidence and domain context. Do not change tracked files in read-only mode.

## 5. Instrument one variable at a time

Prefer debugger or targeted temporary instrumentation. Every temporary marker must have a unique searchable prefix. Performance problems require a baseline measurement before a fix.

## 6. Fix only under a mutating Task Packet

When mutation is authorized:

1. verify the active lease immediately before the first write;
2. create the regression test at the correct seam before the fix;
3. watch it fail;
4. apply the smallest fix inside Allowed-Paths;
5. watch it pass;
6. rerun the original reproduction and required CI;
7. remove temporary instrumentation;
8. report the proven root cause and evidence.

No correct seam is itself an architectural finding. Do not add a misleading shallow test merely to satisfy a checkbox.
