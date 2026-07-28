# Adoption sequence

1. Create private repository `saketos/saketos-engineering-skills`.
2. Import this starter as the initial branch under SES-01.
3. Verify provenance and run validator/tests.
4. Submit exact HEAD to independent Quality Gates.
5. Run SES-07 read-only benchmark.
6. Review benchmark evidence and approve or reject SES-08.
7. Run one LOW-risk mutating pilot with WIP 1.
8. Activate version `1.0.0` only after `PROD_VERIFIED` and a human decision.

Do not copy these skills into product repositories before step 8. During pilots, executors may load them from the dedicated repository at an exact approved commit.
