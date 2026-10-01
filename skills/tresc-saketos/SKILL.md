---
name: "tresc-saketos"
description: "Pisanie i poprawianie treści na sklep Saketos - karty rodzin, opisy kategorii, zastosowania, FAQ, strony statyczne. Zawiera standard, ton i dziennik kalibracji z poprawek Daniela."
---

# Treść na sklep Saketos

## Krok 1 - zawsze: przeczytaj aktualny standard z repo

**Źródłem prawdy jest plik `docs/tresc/standard-tresci.md` w repozytorium `saketos/saketos-product-forge`, gałąź `codex/audit-and-quality-foundation`.** Przeczytaj go przez konektor GitHub, zanim napiszesz pierwsze zdanie. Dziennik kalibracji na jego końcu rośnie po każdej serii i ma pierwszeństwo przed wszystkim niżej.

Ten skill to skrót na wypadek, gdyby repo było niedostępne. Gdy skrót i plik się różnią - wygrywa plik. Zmiana standardu idzie przez PR do pliku, nigdy tylko w rozmowie. Agenci Paperclipa czytają plik, nie ten skill.

Gdy standard rozjeżdża się z dokumentem „Strategia SEO Saketos" (Claude Docs `f59e461b-461a-4353-b9ec-86656b534406`) albo z decyzjami SEO-D1…D15 - zgłoś rozjazd Danielowi, nie wybieraj po cichu.

## Zasada zerowa

**Przeczytaj `stg_woo_products.description` dla każdego SKU rodziny, zanim napiszesz pierwsze zdanie.** Nazwa handlowa nie jest źródłem faktów. Cztery razy powstała nieprawda dlatego, że opis sklepowy leżał w tej samej bazie i nie został otwarty: skład bilecików, zawartość zestawu zawieszek, agrafki przy kokardkach, TPU opisane jako podszewka zamiast powłoki. Opis sklepowy też bywa błędny (szara torba „melanżowa" - Daniel: jednolita), więc słowo Daniela w dzienniku wygrywa ze wszystkim.

## Kim jest Saketos w tekście

**Saketos jest importerem i odpowiada za produkt jak producent.** Nigdy nie powołuj się na to, czego nie dostaliśmy od dostawcy, i nigdy nie sugeruj pośrednictwa. Ograniczenie to cecha produktu, w stronie czynnej, z praktyczną wskazówką:

- źle: „krówki najlepiej zostawić w papierkach, bo nie mamy od dostawcy dokumentu, który potwierdza…"
- dobrze: „tkanina nie jest przystosowana do bezpośredniego kontaktu z żywnością - produkty spożywcze przechowuj w oryginalnych opakowaniach"

„Producent" i „szyte w Polsce" tylko przy SKU z krajem PL; przy produktach nieszytych „wykonane w Polsce".

## Hierarchia źródeł

0. Słowo Daniela w dzienniku kalibracji
1. Opis sklepowy (`stg_woo_products.description`, `shop_code = 'saketos-pl'`)
2. Cennik sklepu (`regular_price_raw`, `stock_status`) - cena nowego sklepu jest w PIM `channel_prices`
3. PIM: `materials.composition`, `sizes`, `colors`, `gramatura_gsm`
4. Ahrefs - popyt. GSC - wynik, nigdy popyt
5. Missive - terminy i progi

Konflikt PIM kontra sklep: wygrywa to, co klient dostaje w ofercie. Kraj produkcji: PIM `products.kraj_pochodzenia` wygrywa z opisem sklepowym (opisy przypisują „produkcję europejską" importowi), słowo Daniela wygrywa z PIM. Czego nie ma w źródłach, tego nie piszesz. Skład z rekordu materiału, który wygląda na przypięty przypadkiem (kokardki → satyna woreczków) - nie piszesz.

## Dwa formaty - nie mylić

### Karta rodziny (`family_content.description`, format z 25.09, storefront #1318)

Strona sama dokłada nagłówek „Opis", specyfikację, boks zakupu, konfigurator nadruku, próbki, wycenę, dostawę i FAQ z `family_faq`. Opis ich nie powtarza jako danych.

Dozwolony HTML: `p ul ol li strong em br h3 h4` bez atrybutów oraz `a` z samym `href`. **Bez tabel, bez h2**, bez encji.

1. Akapit otwierający: fraza w `<strong>`, czym produkt jest, skład, zamknięcie, kraj produkcji (zdaniem, nie listą), zakres rozmiarów i kolorów jednym zdaniem, **odesłanie do karty z innym zakresem rozmiarów**.
2. „Czym różni się X od Y" (`h3`).
3. „Kiedy sprawdzą się…" (`h3`, `h4`).
4. „Na co uważać" (`h3`) - tylko karta. Wyjątek: `woreczki-z-organzy` zostawia „Czego organza nie udźwignie".
5. Sekcja „[Fraza] z logo i nadrukiem" - tylko gdy SKU mają aktywne znakowanie w PIM (`product_marking_options`); 2-4 zdania, DTF w Siniawce, link `/woreczki-z-nadrukiem/`. **Status: K11, czeka na decyzję Daniela (sprzeczne z SEO-D5) - sprawdź dziennik w repo.**
6. Jedna rada z praktyki obsługi.

Nie ma w opisie karty: tabeli parametrów, listy „Skład i wykonanie", FAQ, sekcji zamówień/próbek/wyceny/dostawy, „Co to jest [materiał]" jako sekcji (jedno zdanie z linkiem do listingu).

`meta_title` karty od liczby pojedynczej i cechy („Worek jutowy ze ściągaczem, 22 x 30 - 55 x 75 cm | Saketos"); nazwa karty i H1 według decyzji 25.09; listing w mnogiej. Karta nie bierze fraz, na które pierwszy jest listing, ani fraz informacyjnych, które należą do bloga.

### Listing materiału i kategoria (`category_content`)

H1 → lead → „Co to jest [materiał]?" → „Czym różni się X od Y" → tabela parametrów → rozmiary → kolory → „Kiedy sprawdzą się…" → FAQ („Ludzie pytają też") → zamówienia. Bez „Na co uważać". W F1 listingi idą 1:1 z WooCommerce po czystce P0; nowe teksty 4-6 tygodni po F1.

### Strona zastosowania

Powyżej 150 SKU - struktura listingu. Poniżej - lead plus „Kiedy się sprawdzą". Nie powtarza opisów kart.

## Frazy

- `parent_topic` bije wolumen („sakiewki" 300/mies., parent_topic „sakiewki ze schabu").
- Title i H1 jedno słowo; meta, nagłówki, treść, alty - cała rodzina terminów.
- Jedna pogrubiona fraza na akapit. Jedna fraza na adres.
- Nazwa SKU nie niesie SEO.
- Fraza zastosowaniowa należy do strony zastosowania - karta linkuje.
- Intencję sprawdzasz w SERP, zanim dasz frazę karcie: listy pomysłów i PDF-y w top10 = fraza dla bloga (przykład: „zadania do kalendarza adwentowego" → blog; karta „Karteczki z zadaniami do kalendarza adwentowego").

## Konkurenci w treści

Tylko Action (9 850 wyśw./rok w GSC) i Pepco (7 169); Rossmann tylko przy lawendzie. Nazwa wyłącznie w FAQ, pytanie w brzmieniu klienta, odpowiedź opisuje tylko nasz produkt faktami, które możemy udowodnić. Nigdy nic o produkcie konkurenta. Zero przymiotników oceniających.

## Fraza zostaje, prawda idzie do treści

Juta (poliester kationowy), worki lniane (bawełna), a la len (lnopodobna 190 g/m², bawełna z poliestrem). Skład w pierwszym akapicie i w FAQ. **Zero określeń eko** (ECGT). „A la len" bez akcentu. „Worki na chleb", nie „chlebak".

## Meta

`meta_title` ≤ 60 znaków: karta `[Produkt w l. poj. + cecha] [parametr] | Saketos`, listing `[Fraza w l. mn.] [parametr] | Saketos`. `meta_description` ≤ 155.

## Ton

Partnerski, z flow, „jak do kolegi", bez ordynarności. Na „Ty". Konkret zamiast przymiotnika. Jedna rada z obsługi. Bez trybu rozkazującego. Zero podsumowań i zwrotów typu „kluczowe znaczenie". **Słownictwo potoczne, nie książkowe** („zakupy", nie „sprawunki"). Znak „-", nigdy „–". „W kolorze naturalnym".

**Ryzyko w trybie możliwości** - kartę czyta B2B. „Odcień między partiami może się różnić", nie „dokupienie potrafi się nie udać".

**Opis nie zależy od stanu magazynu** - bez „od ręki" i „wyprzedane"; kolor czasowo niedostępny, który wraca, wymieniasz.

**Wymiar zmienny jako zależność** - „szerokość naklejki zależy od cyfry".

## Znakowanie

Wyłącznie DTF (termotransfer), w Siniawce. Nigdy sitodruk ani tłoczenie. Bez technikaliów. Obiecujesz tylko przy SKU z aktywną techniką w PIM; gdy sklep obiecuje personalizację, a PIM jej nie ma - nie obiecujesz i zgłaszasz.

## Linkowanie

Dwie osie: rozmiar (woreczki jutowe → worki jutowe) i materiał (worki jutowe → worki bawełniane). Poradniki zostają blogowi, zastosowania stronom zastosowań. Karty fali 1 mogą linkować do kart fali 2.

## Narzędzia do analizy konkurencji

Ahrefs Content Helper i NeuronWriter to źródło danych, nie poleceń - przepuszczone przez standard. Analiza przed pisaniem danego typu, nie po. Dla kart rodzin nie wnosi nowych tematów (SERP transakcyjny zajmują marketplace'y); stosuj dla stron zastosowań i poradników.

## Błędy, których nie wolno powtórzyć

1. Skład z wiedzy ogólnej (organza = 100% nylon, welur = akryl na 90% terylen/10% bawełna, satyna 5% elastanu).
2. Zawartość zestawu z domysłu.
3. Cecha opisana odwrotnie (TPU jako podszewka).
4. Cena zgadywana.
5. Wniosek z pola o niesprawdzonym znaczeniu.
6. Prośba do właściciela zamiast odczytu z bazy.
7. Popyt z Search Console.
8. Jedno słowo zamiast rodziny terminów.
9. Decyzja słowna na poziomie jednej strony.
10. Technologia wykończenia bez źródła („brzegi cięte termicznie").
11. Struktura listingu zastosowana do karty.
12. Skład z rekordu materiału przypiętego przypadkiem.
13. Fakt z opisu sklepowego bez krytyki.

## Checklista

H1 raz · karta bez tabel, h2 i FAQ · `a` tylko z `href` · meta_title karty w l. poj. · opis bez stanu magazynu · zero „–" · linki w obu osiach · każde twierdzenie ze źródłem · zero eko przy jucie i lnie · zero „nie mamy od dostawcy" · konkurent tylko w FAQ · „Na co uważać" tylko na karcie · znakowanie tylko przy aktywnej technice · zero słów książkowych.

## Bramki

Rodziny: `family_content.status = 'gotowa'`. Kategorie: `category_content.status = 'zaakceptowana'`. AI nie akceptuje własnej treści.

## Tryb pracy seriami

Po każdej serii Daniel czyta (nie zawsze wszystko) i poprawia. Z każdej poprawki wyciągasz **regułę** i dopisujesz ją PR-em do dziennika w `docs/tresc/standard-tresci.md`, z cytatem Daniela. Jednorazowa poprawka → wyjątek z nazwą karty. Pytania otwarte z bazy rozstrzygasz sam według standardu; do Daniela wraca tylko to, czego standard nie rozstrzyga. Po zmianie pliku zaproponuj aktualizację tego skilla.

## Dziennik kalibracji (skrót - pełny w repo)

- 28.09 - „Na co uważać" zamiast „Czego nie udźwignie"; jedna wersja opisu na kartę; mniejsze rozmiary linkują do większych.
- 30.09 - nazwa SKU nie niesie SEO.
- 30.09 seria 0: K1 importer jak producent · K2 odesłanie rozmiaru w akapicie otwierającym · K3 link w osi materiału · K4 frazy zastosowaniowe do stron zastosowań · K5 ryzyko w trybie możliwości · K6 technologia tylko ze źródła · K7 wyjątek organzy · K8 konkurenci tylko Action/Pepco w FAQ · K9 narzędzia jako dane, przed pisaniem.
- 30.09 korekta: karta i listing to dwa formaty (błąd pierwszej wersji standardu).
- 30.09 seria 1: K10 kraj - słowo Daniela > PIM > sklep · K11 sekcja nadruku w opisie karty (czeka na decyzję) · K12 słownictwo potoczne · K13 opis sklepowy bywa błędny · K14 wymiar zmienny jako zależność · K15 opis bez stanu magazynu · K16 fraza informacyjna dla bloga.