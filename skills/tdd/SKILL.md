---
name: tdd
description: Implement behavior with controlled red-green vertical slices at Task-Packet-approved seams.
saketos-version: 0.1.0
upstream-repository: mattpocock/skills
upstream-commit: 2ab958093e83e0ec752e6c1c5932da465bf23e0c
upstream-path: skills/engineering/tdd/SKILL.md
upstream-blob: 9a2e1d2a1ad856b0d5903dd002209ff8c32c9a48
default-mode: mutating
mutation-policy: task-packet-and-active-lease-required
---

# Test-Driven Development


## Saketos governance

- The exact Task Packet and active portfolio governance are authoritative.
- Default to read-only unless the Task Packet explicitly authorizes mutation.
- Every mutating action requires a valid active lease owned by the assigned executor.
- No issue, label, branch, worktree, tracked file, commit, push, PR, merge, deployment, database or secret mutation outside the assigned role and exact Allowed-Paths.
- Do not create a separate queue, lease model or delivery status.
- Internal review and subagents are executor pre-review only, never an independent Quality Gate.
- If a required contract field is missing or contradictory, stop before mutation and report the missing field.


## Preconditions

TDD may mutate only when the Task Packet already identifies the behavior, acceptance criteria, required tests and permitted seam or authorizes the executor to select one inside Allowed-Paths. Do not re-ask Daniel about a seam already resolved by the contract.

## Test quality

A durable test verifies externally observable behavior through a public interface. It must survive internal refactoring and use an expected value independent from the implementation.

Avoid:

- tests coupled to private methods or internal collaborators;
- tautological expected values;
- broad snapshots without a specific behavioral claim;
- writing a horizontal batch of imagined tests before implementation;
- speculative abstractions for future cases not in the Task Packet.

## Controlled loop

For each vertical slice:

1. verify exact HEAD, clean scope and active lease;
2. write one focused failing test;
3. run it and capture the red evidence;
4. write only enough implementation to pass;
5. run the focused test and capture green evidence;
6. run adjacent regression tests;
7. repeat for the next acceptance criterion.

Run typecheck and focused tests regularly, then the full required test suite once the Task Packet is complete. TDD success does not waive independent Quality Gates or production verification.
