# Upstream provenance

Adaptacje w tym repozytorium są oparte na projekcie:

- repository: `mattpocock/skills`
- pinned commit: `2ab958093e83e0ec752e6c1c5932da465bf23e0c`
- license: MIT
- source author: Matt Pocock

## Source lock

| Skill | Upstream path | Git blob SHA |
|---|---|---|
| diagnosing-bugs | `skills/engineering/diagnosing-bugs/SKILL.md` | `f400de7c1937377fec7ff9bae3b0c072670f1e81` |
| tdd | `skills/engineering/tdd/SKILL.md` | `9a2e1d2a1ad856b0d5903dd002209ff8c32c9a48` |
| code-review | `skills/engineering/code-review/SKILL.md` | `2a0b5240731b927caa9ac0bf43c3e2af9dc3f0a7` |
| domain-modeling | `skills/engineering/domain-modeling/SKILL.md` | `d0f7e1a5ccb06a7184056ff9af02b67bc77f9dda` |
| codebase-design | `skills/engineering/codebase-design/SKILL.md` | `16620c24528b737408e78d95dd6a0e01a98d3d63` |
| prototype | `skills/engineering/prototype/SKILL.md` | `e75d5331ceffd9b2c5a9554c3db124d848afa054` |
| resolving-merge-conflicts | `skills/engineering/resolving-merge-conflicts/SKILL.md` | `aadb3fcb1dfb43413dff30c2fb4b18b7cf58e90e` |

## Update policy

Upstream updates are never applied automatically. An update requires:

1. a pinned new upstream commit;
2. a diff audit against the current source lock;
3. a new Saketos version;
4. validator and regression tests;
5. independent Quality Gates;
6. explicit activation decision.
