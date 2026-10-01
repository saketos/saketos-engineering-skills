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
| [`tresc-saketos`](skills/tresc-saketos/SKILL.md) | Pisanie i poprawianie treści sklepu: karty rodzin, kategorie, zastosowania, FAQ. Odsyła do pełnego standardu `docs/tresc/standard-tresci.md` w `saketos-product-forge` | rozmowy Claude i agenci Paperclipa |
| [`natural-writing`](skills/natural-writing/SKILL.md) | Tekst bez manier AI - każdy tekst dla ludzi | rozmowy Claude i agenci Paperclipa |
| [`saketos-data-context`](skills/saketos-data-context/SKILL.md) | ID i pułapki danych: BigQuery, GA4, Ahrefs, GSC | rozmowy Claude i agenci Paperclipa |

## Kopie skilli z konta Claude

`tresc-saketos`, `natural-writing` i `saketos-data-context` są kopią skilli z konta
Claude Daniela (od 1.10.2026). Po co: agenci Paperclipa nie widzą skilli na koncie
Claude, a mają pisać i analizować tak samo jak rozmowy Claude. Paperclip importuje
je z tego repozytorium do biblioteki skilli firmy, przypięte do commita.

- **Źródłem prawdy jest konto Claude.** Tutaj tych plików nie edytuj - kolejna
  synchronizacja nadpisze zmianę. Zmiana skilla idzie w Claude, potem do tego repo
  przez PR.
- **Synchronizacja:** sesja Claude porównuje pliki z kontem i przy różnicy otwiera
  PR do tego repo. Po scaleniu Paperclip aktualizuje swoją kopię (stan aktualizacji:
  `GET /companies/:companyId/skills/:skillId/update-status`).
- **Treść merytoryczna nie żyje w skillu.** Standard treści i dziennik kalibracji
  z poprawek Daniela są w `saketos/saketos-product-forge`,
  `docs/tresc/standard-tresci.md`. Skill `tresc-saketos` jest skrótem i odsyła do
  tego pliku jako pierwszy krok - rozmowy i agenci czytają to samo źródło.
- **Pominięte:** `saketos-data-context/references/baseline-de.md`. Zawiera przychody,
  koszty reklam i ROAS. Finanse nie trafiają do agentów bez osobnej decyzji Daniela.
  Skill wspomina ten plik - dla agenta oznacza to brak dostępu, nie błąd.
- **Znany nieaktualny fragment:** `saketos-data-context/references/ids.md` mówi, że
  Rank Tracker w Ahrefs jest pusty. Od 30.09.2026 ma 1228 fraz w 12 projektach.
  Poprawka idzie w skillu na koncie Claude, nie tutaj.

## Czego tu nie ma i dlaczego

**Procedury pisania zlecenia dla pętli.** Zlecenie powstaje wyłącznie tam, gdzie
jest dostęp do kodu — bo trzeba sprawdzić, czy robota nie jest już zrobiona,
i udowodnić, że sprawdzian dziś oblewa. Tego nie da się zrobić z rozmowy.
Ta procedura mieszka więc przy pętli, w `saketos-mission-control`:
[`petla/JAK-PISAC-ZLECENIE.md`](https://github.com/saketos/saketos-mission-control/blob/main/petla/JAK-PISAC-ZLECENIE.md).

Podział jest celowy: **tutaj to, co wywołuje Daniel; tam to, czego trzyma się
wykonawca z repozytorium.**
