# Saketos Skills Governance

## Precedence

The order of authority is:

1. active Saketos portfolio governance and Issue #139;
2. the exact Task Packet version and contract hash;
3. repository ADRs and local product sources of truth;
4. this repository's Saketos-adapted skill;
5. upstream skill wording.

A lower source can never widen permissions granted by a higher source.

## Read-only mode

Read-only work may inspect repositories, history, issues, PRs, logs, CI, schemas and documentation. It must not change tracked files, worktrees, branches, labels, issues, PRs, external services, databases, secrets or deployments.

## Mutating mode

A mutating run is valid only when all are present:

- one Task-ID and one immutable Task Packet version;
- exact repository, Base-SHA and target branch;
- exact Allowed-Paths and Forbidden-Paths;
- one concrete assigned executor;
- active non-expired lease recorded before the first mutation;
- acceptance criteria and required tests;
- risk and Human-Test policy;
- required Quality Gates.

No skill may invent missing permissions or silently extend scope.

## Role separation

- Executor may implement and run its own pre-review.
- Executor and its subagents cannot provide an independent Quality Gate.
- Quality Gates do not merge.
- Integrator does not declare production deployment.
- Release Verifier alone may confirm `PROD_VERIFIED`.

## Queue and state

Skills may not create a parallel queue, triage state machine, issue taxonomy or lease model. Portfolio state remains in Issue #139 and the approved Mission Control runtime.

## Stop conditions

Stop without mutation and report the exact missing contract element when:

- Task Packet or Base-SHA is missing;
- Allowed-Paths are broad, ambiguous or contradictory;
- the lease is absent, expired or owned by another executor;
- the requested operation exceeds the assigned role;
- a source-of-truth conflict cannot be resolved from existing authority;
- credentials, production data or destructive actions are unexpectedly required.
