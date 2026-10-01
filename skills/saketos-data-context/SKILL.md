---
name: saketos-data-context
description: "Kontekst danych analitycznych Saketos - ID projektu BigQuery, mapowanie property GA4 na domeny, ID projektów Ahrefs/GSC, stan pipeline'ów i gotowe zapytania. Uzywaj ZAWSZE, gdy pytanie dotyczy danych Saketos: SEO, ruchu, sprzedazy, konwersji, Ahrefs, Google Search Console, GA4, BigQuery, Google Ads, wynikow sklepu (saketos.pl/.de/.fr/.it/.es/.at/.nl/.be/.cz/.dk/.co.uk/.eu/.com, ie.saketos.com, dekor-hurt.pl, e-dekoration.de). Uruchamiaj takze przy pytaniach typu \"jak nam idzie w Niemczech\", \"przeanalizuj SEO\", \"sprawdz konwersje\", \"porownaj rynki\", \"ile sprzedalismy organicznie\"."
---

# Kontekst danych Saketos

Ten skill zastepuje pamiec miedzy sesjami. Bez niego kazda sesja od nowa szuka ID projektow
i marnuje na to kilka wywolan narzedzi.

## Zasada nadrzedna: zawsze czytaj referencje przed pierwszym zapytaniem

1. `references/ids.md` - wszystkie ID: BigQuery, GA4, Ahrefs, GSC. Przeczytaj to najpierw.
2. `references/bigquery.md` - schematy i gotowe zapytania SQL. **UWAGA: sekcja o tym, ktory
   dataset jest zywy, jest w tym pliku nieaktualna - obowiazuje pulapka 0 ponizej.**
3. `references/ahrefs.md` - jak korzystac z Ahrefs MCP dla Saketos, znane pulapki.
4. `references/baseline-de.md` - baseline SEO dla saketos.de (stan lipiec 2026), do porownan YoY.

## Pulapka 0: dwa datasety GSC o mylacych nazwach (zweryfikowane 18.09.2026)

W projekcie `automatyzacje-saketos` sa dwa datasety z danymi Airbyte. Rozniaca sie jedna
nazwa kosztowala juz jedna bledna diagnoze "pipeline nie dziala".

| dataset | stan | co ma |
|---|---|---|
| **`airbyte`** | **ZYWY** - dane do 15.09.2026, zaciag 17.09 19:11 | `GSC_search_analytics_all_fields`, `GSC_search_analytics_by_date`, `GSC_sites`, `GADS_*`, `META_*`, `BING_*`, `ERP_ORDERS_Metabase_Orders`, `SUPABASE_*` |
| `automatyzacje_saketos_airbyte` | ZAMROZONY 21.07.2026 | to samo **plus** `GSC_search_analytics_by_query`, `by_page`, `by_device` |

Z tego wynikaja trzy rzeczy:

- **Analiza per fraza i per strona jest mozliwa tylko na zamrozonym datasecie** (dane do
  21.07.2026) albo na `all_fields`, ktory przez anonimizacje GSC pokazuje ok. 27%
  rzeczywistych klikniec. Zawsze napisz, z ktorego zrodla pochodza liczby i do jakiej daty.
- **Swiezosc sprawdzaj zapytaniem, nie z pamieci.** Przed kazda analiza:
  `SELECT MAX(date) FROM ...GSC_search_analytics_by_date`. Lista tabel nie mowi, czy plyna dane.
- **Zanim orzekniesz, ze czegos nie ma**, przelec `__TABLES__` albo `INFORMATION_SCHEMA.TABLES`
  po wszystkich datasetach i porownaj `last_modified_time`. Datasety `googleAds`, `gsc_export`,
  `gsc_api` i `searchconsole_daniel` to porzucone stagingi (pierwszy pusty, `searchconsole_daniel`
  siedzi w regionie US, wiec zapytanie z EU zwroci "dataset not found" - to nie jest blad uprawnien).

Otwarte: zlecenie na dolozenie `by_query` i `by_page` do zywego pipeline'u (18.09.2026, Krzysztof).
Po jego wykonaniu ta tabela wymaga aktualizacji.

## Trzy pulapki metodologiczne, w ktore lam sie nie wpadac

**1. Biznes jest sezonowy.** Nigdy nie porownuj miesiaca do innego miesiaca. Listopad
(Boze Narodzenie) i maj-lipiec (lawenda, komunie, wesela) to szczyty; styczen-luty to dolek.
Porownuj wylacznie rok do roku, ten sam zakres dni. GSC w Ahrefs ma dane od 17.06.2025,
wiec pelny YoY jest mozliwy tylko od lipca.

**2. GSC w Ahrefs ma opoznienie ~2 tygodnie.** Ostatni dzien z danymi bywa 15+ dni wstecz.
Zawsze sprawdz `gsc-performance-history` z `history_grouping: daily`, zeby zobaczyc realny
koniec zakresu. Miesiac czesciowy podzielony przez 30 dni daje falszywy spadek.
Lepsze zrodlo: surowy GSC w BigQuery (swiezszy, od 2025-02-14, wszystkie rynki).
Uwaga: `gsc-keywords` w Ahrefs zwraca pustke dla projektu PL (5952642) - to nie jest blad
zapytania, po prostu nie ma tam danych. Idz do BigQuery.

**2b. Nigdy nie raportuj lacznego ruchu organicznego dla saketos.de.** Zawsze rozdziel
blog od sklepu - lacznie wychodzi spadek, w rozbiciu sklep rosnie o 33% YoY.
Odfiltruj tez anchory `#toc` (24% wyswietlen, 1 klikniecie).

**2c. Zawsze filtruj `search_type='web'`.** Grafiki Google to na saketos.pl 1,46 mln
wyswietlen rocznie wobec 3,42 mln z wyszukiwarki - 30% calosci przy CTR 0,26%. Bez filtra
srednie CTR sa zanizone i wnioski o "slabych" stronach sa falszywe. Na frazach handlowych
udzial Grafik jest jednak sladowy (2-3%), a ich glowne zrodlo to blog.

**3. GA4 widzi ~25% ruchu organicznego z GSC** (consent mode w DE). Kwoty w EUR z GA4 to
dolna granica, nie wartosc rzeczywista. Podawaj je jako "co najmniej", nigdy jako fakt.
Wskazniki wzgledne (CR miedzy typami stron, kohorty) sa wiarygodne - bezwzgledne kwoty nie.

## Czego NIE da sie zrobic

- **Google Ads nie podlacza sie do Ahrefs.** Ahrefs integruje tylko Google Search Console.
  Dane "paid keywords" w Ahrefs to ich wlasne szacunki z crawla, nie Twoje konto.
  Pelny obraz platne+organiczne robi sie w BigQuery, w zywym datasecie `airbyte`,
  gdzie sa i GSC, i Google Ads, i Bing, i Meta, i zamowienia z ERP.

## Waluty

Ahrefs API zwraca wszystkie kwoty w centach USD - dziel przez 100. GA4 `purchase_revenue`
jest w walucie sklepu (EUR dla .de), `purchase_revenue_in_usd` w USD.