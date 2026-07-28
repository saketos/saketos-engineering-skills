# Saketos Engineering Skills

Kontrolowany zestaw praktyk inżynierskich dla wykonawców Codex, Claude i Kimi.

Ten projekt nie jest bezpośrednią instalacją `mattpocock/skills`. Zawiera zaadaptowane skille, w których governance Saketos, Task Packet v1, lease, Allowed-Paths, niezależne Quality Gates, Integrator i Release Verifier mają zawsze pierwszeństwo.

## Stan startera

- wersja: `0.1.0-prepilot`
- upstream: `mattpocock/skills@2ab958093e83e0ec752e6c1c5932da465bf23e0c`
- zakres aktywny: 7 skillów
- zakres wyłączony: 6 skillów konkurujących z kolejką lub governance
- użycie produkcyjne: **NIEAKTYWNE** do czasu ukończenia SES-01..SES-08 z Issue `saketos/saketos-mission-control#192`

## Aktywne skille

1. `diagnosing-bugs`
2. `tdd`
3. `code-review`
4. `domain-modeling`
5. `codebase-design`
6. `prototype`
7. `resolving-merge-conflicts`

## Pierwsze uruchomienie

```bash
python scripts/validate_skills.py
python -m unittest discover -s tests -v
```

## Zasada nadrzędna

Żaden skill nie może dokonać mutacji bez kompletnego Task Packetu, zgodnego Base-SHA, dokładnych Allowed-Paths i aktywnego lease. Wewnętrzny review wykonawcy nie zastępuje niezależnych Quality Gates.

Pełne reguły: [GOVERNANCE.md](GOVERNANCE.md).
