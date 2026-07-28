---
name: prototype
description: Build a controlled throwaway artifact to answer one explicit design question.
saketos-version: 0.1.0
upstream-repository: mattpocock/skills
upstream-commit: 2ab958093e83e0ec752e6c1c5932da465bf23e0c
upstream-path: skills/engineering/prototype/SKILL.md
upstream-blob: e75d5331ceffd9b2c5a9554c3db124d848afa054
default-mode: read-only
mutation-policy: task-packet-and-active-lease-required
---

# Prototype


## Saketos governance

- The exact Task Packet and active portfolio governance are authoritative.
- Default to read-only unless the Task Packet explicitly authorizes mutation.
- Every mutating action requires a valid active lease owned by the assigned executor.
- No issue, label, branch, worktree, tracked file, commit, push, PR, merge, deployment, database or secret mutation outside the assigned role and exact Allowed-Paths.
- Do not create a separate queue, lease model or delivery status.
- Internal review and subagents are executor pre-review only, never an independent Quality Gate.
- If a required contract field is missing or contradictory, stop before mutation and report the missing field.


A prototype answers one question. It is not production code, a hidden parallel application or evidence of deployment.

## Choose the artifact

- logic or state question: use a minimal interactive harness;
- UI question: use clearly separated variants that share one controlled entry point;
- integration question: use mocks or a non-production sandbox unless the Task Packet explicitly authorizes an external test environment.

## Rules

1. State the question and success signal before building.
2. In read-only mode, create the artifact only in an approved sandbox outside tracked product repositories.
3. Writing prototype files into a repository requires a mutating Task Packet, active lease and exact Allowed-Paths.
4. Mark every artifact `PROTOTYPE / NOT FOR PRODUCTION`.
5. Use no production secrets or irreversible data.
6. Provide one command to run and expose the relevant state.
7. Skip polish and speculative architecture.
8. Record the conclusion separately from the artifact.
9. Production code must implement the validated decision under a separate implementation Task Packet.
10. Prototype code must not reach `main` unless the Task Packet explicitly converts it into a maintained test fixture or documentation artifact.
