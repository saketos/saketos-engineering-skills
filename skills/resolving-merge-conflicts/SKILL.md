---
name: resolving-merge-conflicts
description: Resolve an authorized merge or rebase conflict by tracing each side to its primary intent.
saketos-version: 0.1.0
upstream-repository: mattpocock/skills
upstream-commit: 2ab958093e83e0ec752e6c1c5932da465bf23e0c
upstream-path: skills/engineering/resolving-merge-conflicts/SKILL.md
upstream-blob: aadb3fcb1dfb43413dff30c2fb4b18b7cf58e90e
default-mode: mutating
mutation-policy: task-packet-and-active-lease-required
---

# Resolving Merge Conflicts


## Saketos governance

- The exact Task Packet and active portfolio governance are authoritative.
- Default to read-only unless the Task Packet explicitly authorizes mutation.
- Every mutating action requires a valid active lease owned by the assigned executor.
- No issue, label, branch, worktree, tracked file, commit, push, PR, merge, deployment, database or secret mutation outside the assigned role and exact Allowed-Paths.
- Do not create a separate queue, lease model or delivery status.
- Internal review and subagents are executor pre-review only, never an independent Quality Gate.
- If a required contract field is missing or contradictory, stop before mutation and report the missing field.


## Preconditions

Use only for an explicitly authorized merge/rebase operation with exact refs, target, Allowed-Paths, active lease and rollback instructions. Do not begin or continue an unrelated merge merely because conflict markers exist.

## Process

1. Record the current operation, refs, merge-base, conflicting files and clean backup evidence.
2. Trace each conflicting side to its primary issue, spec, commits, PR discussion and tests.
3. Resolve hunk by hunk. Preserve both intents when compatible. When incompatible, follow the stated integration goal and record the discarded intent.
4. Do not invent new product behavior during conflict resolution.
5. Run the repository's required conflict-sensitive checks, then the full Task Packet tests.
6. Verify the final diff remains inside Allowed-Paths and contains no conflict markers.
7. Finish the operation only if the contract remains valid and checks pass.
8. If the contract, scope or intended behavior is ambiguous, stop and return the operation to the Integrator with evidence. Aborting may be the correct controlled rollback; never force completion to satisfy the skill.

This skill cannot self-approve, merge to the protected target or declare deployment.
