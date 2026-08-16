# Saketos Engineering Skills

Prywatne, kontrolowane repozytorium skillów inżynierskich Saketos.

Pełny zestaw jest wprowadzany wyłącznie przez Pull Request zgodny z governance Saketos.

## Układ

Jeden katalog na skill, plik `SKILL.md` w środku:

```
skills/
└── <nazwa-skilla>/
    └── SKILL.md
```

`SKILL.md` zaczyna się nagłówkiem `name` i `description`. Opis decyduje o tym,
**kiedy** skill się uruchamia — jest instrukcją dla modelu, nie streszczeniem
dla człowieka. Warto w nim napisać także, kiedy skilla **nie** uruchamiać.

## Skille

| Skill | Do czego | Kto go wywołuje |
|---|---|---|
| [`zbriefuj-to`](skills/zbriefuj-to/SKILL.md) | Zamienia pomysł albo funkcjonalność z dowolnej rozmowy w zapis w HUB Saketos: właściwy projekt, sprawdzenie co to przypomina, uczciwa informacja czy jest to czym wykonać | Daniel, z dowolnej rozmowy |

## Czego tu nie ma i dlaczego

**Procedury pisania zlecenia dla pętli.** Zlecenie powstaje wyłącznie tam, gdzie
jest dostęp do kodu — bo trzeba sprawdzić, czy robota nie jest już zrobiona,
i udowodnić, że sprawdzian dziś oblewa. Tego nie da się zrobić z rozmowy.
Ta procedura mieszka więc przy pętli, w `saketos-mission-control`:
[`petla/JAK-PISAC-ZLECENIE.md`](https://github.com/saketos/saketos-mission-control/blob/main/petla/JAK-PISAC-ZLECENIE.md).

Podział jest celowy: **tutaj to, co wywołuje Daniel; tam to, czego trzyma się
wykonawca z repozytorium.**
