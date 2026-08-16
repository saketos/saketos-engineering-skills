---
name: zbriefuj-to
description: Zamienia pomysł albo funkcjonalność z dowolnej rozmowy w zapis w HUB Saketos — z właściwym projektem, sprawdzeniem, co to przypomina, i uczciwą informacją, czy jest to czym wykonać. Uruchamiaj, gdy Daniel mówi „zbriefuj to", „przekaż to do realizacji", „to mi się podoba, zapisz to jako zadanie", albo gdy rozmowa o funkcjonalności dochodzi do ustalenia. NIE uruchamiaj na samo „zapisz" bez kontekstu funkcjonalności — od prostego zapisu pomysłu jest centrala-intake.
---

# Zbriefuj to

Daniel rzuca pomysł albo opisuje funkcjonalność. Ty zamieniasz to w zapis
w HUB Saketos — tak, żeby za miesiąc dało się to znaleźć, zrozumieć i wykonać,
bez wracania do tej rozmowy.

**Briefujesz, nie projektujesz.** Nie wymyślasz rozwiązania za Daniela.

## Zasada nadrzędna

Każde zdanie, które zapiszesz, pochodzi z jednego z trzech źródeł:

1. z tego, co Daniel powiedział,
2. z tego, co zmierzyłeś w bazie,
3. z tego, co znalazłeś jako już zapisane.

**Czego nie wiesz — zapisujesz jako pytanie, nie jako fakt.** Wymyślony
szczegół w karcie zadania jest gorszy niż jego brak, bo wygląda na ustalenie.

---

## Krok 1 — ile to jest rzeczy?

Powiedz wprost: **„Widzę tu N rzeczy do zapisania"** i wypisz każdą jednym
zdaniem. Dwie funkcjonalności to dwa zapisy, nie jeden zbiorczy.

Nie dziel na siłę: jeśli coś nie ma sensu bez drugiego, zostaw razem i napisz,
dlaczego.

## Krok 2 — do którego projektu to należy

HUB agreguje całą firmę, więc **projekt trzeba wskazać, nie założyć**.

| Czego dotyczy rozmowa | Projekt |
|---|---|
| HUB, Mój dzień, Centrala, pętla, backlog, decyzje | `HUB Saketos` |
| PIM, produkty, opisy, atrybuty, zdjęcia, kategorie | `PIM Saketos` |
| sklep, front, koszyk, checkout, SEO, kreator nadruków | **zapytaj** — projekt może nie istnieć |
| Centrum Ofert, wyceny, zapytania od klientów | **zapytaj** |
| coś jeszcze | **zapytaj Daniela, nie zgaduj** |

Jeśli właściwego projektu nie ma w Centrali — **powiedz to i zapytaj**, czy
założyć nowy, czy zapisać pod istniejącym. Nie wpychaj sklepu do HUB-a tylko
dlatego, że HUB istnieje.

## Krok 3 — sprawdź, co to przypomina

**To jest najważniejszy krok i to on odróżnia zapis od wrzucenia na stertę.**

Zanim cokolwiek zapiszesz, przeszukaj Centralę. Szukaj po słowach z problemu,
nie po tytule — tytuły bywają różne dla tej samej sprawy.

Potem powiedz Danielowi po ludzku, co znalazłeś:

- *„To wygląda na to samo, co pozycja X sprzed trzech tygodni"* → propozycja **SCAL**
- *„To rozwija pomysł Y"* → propozycja **POWIĄŻ**
- *„To było już raz zamknięte, z powodem Z"* → propozycja **ZOSTAW ZAMKNIĘTE** albo **WZNÓW**
- *„To jest sprzeczne z decyzją z lipca"* → **zatrzymaj się i zapytaj**
- *„Nie znalazłem nic podobnego"* → **ZAŁÓŻ NOWY**

**Nie scalaj i nie zamykaj niczego sam.** Proponujesz, Daniel rozstrzyga.

Jeżeli w bazie jest coś, co temu przeczy — **nie zapisuj, dopóki Daniel tego
nie rozstrzygnie.** Dwa sprzeczne zapisy są gorsze niż żaden.

### Powiązania, które wolno zapisać

W bazie żyją dziś trzy typy: `duplicates`, `relates_to`, `blocks`. Jeśli
proponujesz powiązanie, nazwij je jednym z tych trzech i powiedz, na jakiej
podstawie. Powiązanie bez uzasadnienia jest szumem.

## Krok 4 — zmierz, jeśli masz dostęp do bazy

Liczby, nie wrażenia. Zwłaszcza:

- ile jest dziś tego, o czym mowa,
- **ile jest przypadków brzegowych, które mogłyby coś ukryć albo usunąć
  z ekranu** — to najczęstsza cicha szkoda,
- czy funkcja/tabela, o której mowa, w ogóle istnieje.

Każdą liczbę zapisz z metryczką: **kiedy zmierzona** i **czy to WYMAGANIE
(ma tak być), czy DIAGNOZA (tak jest dziś)**. Bez tego liczba zestarzeje się
po cichu i unieważni zapis bez powodu.

### Trzy stany dostępu, nie dwa

Odczyt i zapis to nie to samo uprawnienie. Zapis intake jest przypięty do
zalogowanego człowieka, więc sesja może umieć zmierzyć wszystko i nie umieć
zapisać nic. Nazwij swój stan wprost:

| Co masz | Co robisz |
|---|---|
| odczyt i zapis | mierzysz i zapisujesz normalnie |
| **tylko odczyt** | mierzysz, przygotowujesz gotową treść zapisu i mówisz, że zapis wykona sesja z tożsamością Daniela. **Nie mówisz „zapisane".** |
| brak dostępu | piszesz to wprost i zostawiasz miejsce na pomiar |

Sam odczyt to nie porażka — pomiar zostaje i jest wart tyle samo. Porażką
jest zapis ogłoszony bez identyfikatora.

## Krok 5 — zapisz

Zapisz do Centrali jako pomysł, z:

- **tytułem**, po którym da się to poznać za miesiąc,
- **problemem** — co dziś nie działa i po czym Daniel to zauważył,
- **oczekiwanym skutkiem** — po czym poznamy, że zrobione,
- **uzasadnieniem** — dlaczego tak, a nie inaczej,
- **odrzuconymi wariantami** — żeby nikt do nich nie wrócił,
- **przypadkami brzegowymi**,
- **dosłownym cytatem** Daniela, który to uruchomił,
- **pochodzeniem** — z jakiego narzędzia i rozmowy.

**Zapis nie oznacza zgody na realizację ani priorytetu.** Nowy pomysł ląduje
w „wpłynęło" i czeka na decyzję Daniela. Nigdy nie zapisuj, że człowiek coś
zatwierdził.

### Gdy pomysł wyszedł od Ciebie, a nie od Daniela

Mając dostęp do bazy zauważysz rzeczy, których nikt nie zgłosił. To jest
przydatne i nie wolno tego wyrzucić — ale cytatu, który to uruchomił, wtedy
nie ma.

Nie zmyślaj go i nie porzucaj spostrzeżenia. Pokaż je Danielowi jednym
zdaniem i zapytaj, czy zapisać. **Jego odpowiedź jest cytatem.** Dopóki nie
odpowiedział, nie zapisujesz, a w pochodzeniu nigdy nie stoi zdanie, którego
nie powiedział.

## Krok 6 — powiedz prawdę o wykonaniu

To jest miejsce, w którym najłatwiej obiecać coś, czego nie ma.

| Projekt | Co powiedzieć |
|---|---|
| `HUB Saketos` | „Zapisane. Po Twojej akceptacji można to zamienić w zlecenie — pętla bierze robotę co 15 minut." |
| `PIM Saketos` | „Zapisane. **PIM nie ma własnej pętli wykonawczej** — realizacja wymaga człowieka." |
| każdy inny | „Zapisane. **Dla tego projektu nie ma dziś ani kolejki, ani wykonawcy.**" |

**Nigdy nie mów „przekazane do realizacji", jeśli nie ma czego przekazać.**

Dwie rzeczy, których nie zrobisz nawet dla HUB-a, i trzeba to powiedzieć:

- **nie sprawdzisz, czy to nie jest już zrobione** — nie widzisz kodu;
  na ośmiu sprawdzonych zgłoszeniach sześć okazało się już zrobionych,
- **nie udowodnisz, że sprawdzian dziś oblewa** — a to warunek wejścia do kolejki.

Oba kroki wykonuje ktoś z dostępem do repozytorium. Wypisz je jako
**„do zrobienia przy kodzie"**, zamiast udawać, że sprawa jest domknięta.

---

## Granica wobec skilla `centrala-intake`

Oba skille dotykają Centrali i oba mogą się odezwać na słowo „zapisz". Podział
jest taki:

| | `centrala-intake` | `zbriefuj-to` (ten) |
|---|---|---|
| Czym jest | **mechanika** — jak wołać narzędzia Centrali | **procedura** — co zebrać z rozmowy, zanim się zapisze |
| Uruchamia się na | „zapisz", „dodaj do backlogu", „dopisz" | „zbriefuj to", „przekaż do realizacji", koniec rozmowy o funkcjonalności |
| Odpowiada za | dedupe, pochodzenie, wersje, poprawne wywołania | problem, uzasadnienie, odrzucone warianty, powiązania, prawdę o wykonaniu |

**Nie konkurują — uzupełniają się.** Gdy ten skill dochodzi do zapisu, korzysta
z reguł `centrala-intake`: najpierw szukaj, nie twórz duplikatu, zapisz
pochodzenie, nigdy nie deklaruj zapisu bez identyfikatora zwróconego przez
narzędzie.

Jeżeli Daniel mówi samo „zapisz to" o czymś, co nie jest funkcjonalnością —
zostaw to `centrala-intake`.

---

## Format odpowiedzi

1. **ILE TO JEST RZECZY** — „Widzę tu N rzeczy", każda jednym zdaniem.
2. **CO ZNALAZŁEM W CENTRALI** — co to przypomina i co proponuję (scal /
   powiąż / zostaw zamknięte / załóż nowy), z uzasadnieniem.
3. **PYTANIA DO DANIELA** — czego nie da się wywieść z rozmowy.
   **Jeśli są, ZATRZYMAJ SIĘ tutaj i nie zapisuj.**
4. **CO ZAPISAŁEM** — tytuł i identyfikator zwrócony przez Centralę.
   **Nigdy nie mów „zapisane" bez identyfikatora.**
5. **CO DALEJ** — uczciwie, zgodnie z Krokiem 6.

## Czego nie robisz nigdy

- Nie zapisujesz, że Daniel coś zatwierdził.
- Nie promujesz pomysłu do roadmapy bez jego dosłownej zgody.
- Nie tworzysz duplikatu, gdy znalazłeś oczywisty odpowiednik — dopisujesz
  do istniejącego.
- Nie zgadujesz projektu.
- Nie obiecujesz wykonania tam, gdzie nie ma wykonawcy.
- Nie mówisz „gotowe" bez identyfikatora z bazy.

Pisz po polsku, prostym językiem: najpierw po ludzku, potem nazwa systemowa.
Jedno pojęcie na raz.
