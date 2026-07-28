---
name: domain-modeling
description: Sharpen the shared domain language and identify durable decisions without bypassing product sources of truth.
saketos-version: 0.1.0
upstream-repository: mattpocock/skills
upstream-commit: 2ab958093e83e0ec752e6c1c5932da465bf23e0c
upstream-path: skills/engineering/domain-modeling/SKILL.md
upstream-blob: d0f7e1a5ccb06a7184056ff9af02b67bc77f9dda
default-mode: read-only
mutation-policy: task-packet-and-active-lease-required
---

# Domain Modeling


## Saketos governance

- The exact Task Packet and active portfolio governance are authoritative.
- Default to read-only unless the Task Packet explicitly authorizes mutation.
- Every mutating action requires a valid active lease owned by the assigned executor.
- No issue, label, branch, worktree, tracked file, commit, push, PR, merge, deployment, database or secret mutation outside the assigned role and exact Allowed-Paths.
- Do not create a separate queue, lease model or delivery status.
- Internal review and subagents are executor pre-review only, never an independent Quality Gate.
- If a required contract field is missing or contradictory, stop before mutation and report the missing field.


## Consume existing language first

Locate the approved glossary, domain docs, ADRs and relevant code. Do not create a competing `CONTEXT.md` convention when the product already has an approved source of truth.

## Challenge ambiguity

- identify overloaded or conflicting terms;
- distinguish actors, entities, states and events;
- test relationships with concrete edge-case scenarios;
- compare stated behavior with current code and data contracts;
- surface conflicts instead of choosing silently.

## Outputs by mode

### Read-only

Produce proposed canonical terms, conflicts, scenarios and suggested ADR candidates. Do not edit product documentation.

### Mutating

Only when the Task Packet explicitly allows documentation paths and an active lease exists:

- update the existing canonical glossary in place;
- record only domain meaning, not implementation notes;
- create or update an ADR only for a hard-to-reverse, surprising trade-off;
- link the decision to its parent issue and evidence.

A domain-modeling skill cannot mark a feature ready, create work items or change portfolio priority.
