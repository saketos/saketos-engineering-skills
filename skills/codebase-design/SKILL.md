---
name: codebase-design
description: Design deep modules with small interfaces, clean seams, leverage, locality and behavioral testability.
saketos-version: 0.1.0
upstream-repository: mattpocock/skills
upstream-commit: 2ab958093e83e0ec752e6c1c5932da465bf23e0c
upstream-path: skills/engineering/codebase-design/SKILL.md
upstream-blob: 16620c24528b737408e78d95dd6a0e01a98d3d63
default-mode: read-only
mutation-policy: task-packet-and-active-lease-required
---

# Codebase Design


## Saketos governance

- The exact Task Packet and active portfolio governance are authoritative.
- Default to read-only unless the Task Packet explicitly authorizes mutation.
- Every mutating action requires a valid active lease owned by the assigned executor.
- No issue, label, branch, worktree, tracked file, commit, push, PR, merge, deployment, database or secret mutation outside the assigned role and exact Allowed-Paths.
- Do not create a separate queue, lease model or delivery status.
- Internal review and subagents are executor pre-review only, never an independent Quality Gate.
- If a required contract field is missing or contradictory, stop before mutation and report the missing field.


## Vocabulary

- **Module**: implementation hidden behind one caller-facing interface.
- **Interface**: everything a caller must know, including invariants and error modes.
- **Seam**: the location where behavior can vary without changing the caller.
- **Adapter**: one concrete implementation at a seam.
- **Depth**: capability delivered per unit of interface complexity.
- **Leverage**: repeated caller value created by depth.
- **Locality**: related change and verification concentrated in one place.

## Design tests

Ask:

1. Can the interface be smaller or simpler?
2. Is complexity hidden once, or repeated across callers?
3. Would deleting the module spread complexity back across the codebase?
4. Do callers and tests use the same public seam?
5. Does a real second adapter justify the seam, or is it speculative?
6. Can dependencies be accepted rather than created internally?
7. Can results be returned rather than hidden in side effects?

## Output

In read-only mode, produce options and trade-offs against the Task Packet. Prefer adapting an existing seam over layering another abstraction. Any refactor proposal must identify blast radius, migration strategy, rollback and tests before it becomes a mutating Task Packet.
