---
name: code-review
description: Perform executor pre-review of an exact diff against repository standards and the originating specification.
saketos-version: 0.1.0
upstream-repository: mattpocock/skills
upstream-commit: 2ab958093e83e0ec752e6c1c5932da465bf23e0c
upstream-path: skills/engineering/code-review/SKILL.md
upstream-blob: 2a0b5240731b927caa9ac0bf43c3e2af9dc3f0a7
default-mode: read-only
mutation-policy: task-packet-and-active-lease-required
---

# Code Review


## Saketos governance

- The exact Task Packet and active portfolio governance are authoritative.
- Default to read-only unless the Task Packet explicitly authorizes mutation.
- Every mutating action requires a valid active lease owned by the assigned executor.
- No issue, label, branch, worktree, tracked file, commit, push, PR, merge, deployment, database or secret mutation outside the assigned role and exact Allowed-Paths.
- Do not create a separate queue, lease model or delivery status.
- Internal review and subagents are executor pre-review only, never an independent Quality Gate.
- If a required contract field is missing or contradictory, stop before mutation and report the missing field.


## Scope

This skill is executor pre-review. It cannot approve the author's work, satisfy a Portfolio Quality Gate, merge or deploy.

## 1. Pin the comparison

Resolve and record the Task Packet Base-SHA, exact HEAD, target branch, commit list and three-dot diff. Fail closed on an invalid ref, empty unexpected diff or files outside Allowed-Paths.

## 2. Identify authorities

Read, in order:

1. Task Packet and originating issue/spec;
2. repository ADRs and domain glossary;
3. coding standards and contribution rules;
4. acceptance criteria and required tests.

## 3. Review two independent axes

### Standards

Report documented-standard violations and material design smells such as duplicated logic, mysterious names, data clumps, primitive obsession, repeated branching, shotgun surgery, divergent change and speculative generality. Treat smells as judgment calls, not automatic blockers.

### Specification

Report missing or partial requirements, incorrect behavior, scope creep and unverifiable claims. Quote or precisely reference the governing requirement.

## 4. Evidence

For every finding include severity, file/hunk, authority, observed evidence and smallest compliant remediation. Do not silently fix findings in read-only review.

## 5. Output

Keep Standards and Specification results separate. End with exact finding counts and whether the diff is ready to be submitted to independent Quality Gates.
