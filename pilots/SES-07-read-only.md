# SES-07 - Read-only benchmark for diagnosing-bugs

## Purpose

Validate that the adapted `diagnosing-bugs` skill finds the actual cause of a real historical bug before it is allowed to guide a mutating pilot.

## Subject

- repository: `danmoc-88/stworz-woreczek-2.0`
- symptom: after the user begins with Color or Size, the `Zacznij od` pills retain Material-first order
- historical reference fix: `2aa7d8f3b8279b93536b51c2475d83297cc46e24`
- pre-fix candidate: verify the first parent of the reference commit; expected nearby commit `ed71e4d9e80e503de7cdbe31f4a61a6ec48d3495`

## Blind-run rule

The executor receives the symptom and pre-fix checkout but not the reference-fix diff, commit message or known root cause. The evaluator may read the reference only after the executor submits its report.

## Mode

Read-only. No branch, worktree, tracked file, issue, label, PR, service, database or deployment mutation.

## Required result

The executor must:

1. define one red-capable reproduction command or harness;
2. reproduce the exact ordering symptom;
3. minimise it to the state/order path;
4. rank at least three falsifiable hypotheses;
5. identify that changing displayed iteration alone is insufficient when the actual user path does not set the state controlling order;
6. identify the effective `s.axis`/starting-axis state path as the root cause or an equivalent precise explanation;
7. propose a behavioral regression seam covering Material-first, Size-first, Color-first and multi-select without relying only on compile/build success;
8. report false hypotheses and evidence used to eliminate them.

## PASS

PASS requires root-cause equivalence and a regression design that would have prevented the failed earlier fix. A lucky textual match without a red-capable loop is FAIL.

## After PASS

Planner may prepare SES-08, one LOW-risk mutating pilot with WIP 1, Human-Test and full independent Quality Gates. The package remains inactive for production until that pilot reaches `PROD_VERIFIED`.
