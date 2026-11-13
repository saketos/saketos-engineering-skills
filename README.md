# Saketos Engineering Skills

Publiczne repozytorium procedur inżynierskich Saketos. Widoczność zostaje publiczna. Nie umieszczaj tu finansów, danych osobowych, spraw pracowniczych ani sekretów.

Zmiany wchodzą przez pull request. Dla trzech skilli skopiowanych z konta Claude źródłem prawdy zostaje to konto. Ten plik opisuje układ repozytorium.

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

## Helper załączników: w runie, nie w checkout

Instrukcje wykonawców Paperclipa bywają odsyłać do
`skills/paperclip/scripts/paperclip-upload-artifact.sh`. Ten plik **nie istnieje
w tym checkout** i nie może istnieć: skill `paperclip` instaluje runtime
Paperclipa w katalogu tymczasowym danego runu, a nie z tego repozytorium.
W checkout są tylko `skills/natural-writing`, `skills/saketos-data-context`,
`skills/tresc-saketos`, `skills/zbriefuj-to` i `scripts/sprawdz-readme.sh`.
Odtworzenie błędu (drukuje `brak`):

```sh
test -f skills/paperclip/scripts/paperclip-upload-artifact.sh && echo jest || echo brak
```

**Jak znaleźć helpera.** Leży on w katalogu `SKILL.md` skilla `paperclip`
faktycznie dostarczonego w bieżącym runie. Uruchomienie skilla zgłasza ścieżkę
jego `SKILL.md` — bierz ją z kontekstu tego runu, nigdy z pamięci poprzedniego.
Katalog zawiera identyfikator runu i zmienia się za każdym razem, więc nie
zapisuj takich ścieżek w plikach repo ani w komentarzach.

```sh
# SCIEZKA_SKILL_MD — ścieżka SKILL.md raportowana przy wywołaniu skilla w tym runie
skill_dir=$(dirname "$SCIEZKA_SKILL_MD")
helper="$skill_dir/scripts/paperclip-upload-artifact.sh"
test -f "$helper" && echo "helper: $helper"
```

**Jak uruchomić.** Przez `bash` — instalowane pliki mogą nie zachować bitu
wykonywalności. Helper używa zmiennych środowiskowych runu
(`PAPERCLIP_API_URL`, `PAPERCLIP_API_KEY`, `PAPERCLIP_COMPANY_ID`,
`PAPERCLIP_TASK_ID`, `PAPERCLIP_RUN_ID`); ich wartości zostają w runie —
nie wklejaj tokenów do plików w repo.

```sh
bash "$helper" sciezka/do/wyniku.png \
  --title "Tytuł deliverable" \
  --summary "Co plik zawiera" \
  --dry-run
```

`--dry-run` wypisuje rozwiązane ustawienia uploadu bez wywołania API — tak
sprawdza się składnię polecenia bez próbnego uploadu.

**Attachment i artifact work product.** Helper wgrywa plik jako załącznik
issue, tworzy work product `artifact` z nim związany i drukuje markdown linki
bezpieczne dla komentarza. Dostarczenie pliku to dwa powiązane byty:
załącznik (plik trzymany po stronie Paperclipa, dostępny poza workspace)
i work product `artifact` (ścieżka dostępu do przeglądu dla boardu i recenzenta
— komentarz jej nie zastępuje). Obowiązek: końcowy komentarz zawiera link do
załącznika albo work productu; lokalna ścieżka w workspace nie jest samodzielną
drogą dostępu.

**Gdy helpera brak.** Nie kopiuj skilla runtime do tego repo — kopie się
zestarzeją, a Paperclip i tak instaluje skill w każdym runie. Użyj oficjalnego
workflow z `references/artifacts.md` tego skilla: najpierw multipart upload
załącznika na `/api/companies/<companyId>/issues/<taskId>/attachments`
(nagłówki autoryzacji i `X-Paperclip-Run-Id`), potem work product na
`/api/issues/<taskId>/work-products` z
`{"type": "artifact", "provider": "paperclip", "metadata": {"attachmentId": "<id>"}}`.
Plik, który celowo zostaje w workspace, opisuje work product z
`metadata.resourceRef.kind: "workspace_file"` i ścieżką względną — nie
absolutną.
