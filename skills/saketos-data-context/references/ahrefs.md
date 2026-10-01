# Ahrefs MCP - jak pracowac na danych Saketos

## Kolejnosc dzialania

1. `mcp__Ahrefs__doc` z nazwa narzedzia PRZED pierwszym uzyciem - schematy w liscie
   narzedzi sa niepelne i wywolanie bez tego czesto konczy sie bledem.
2. Dla domeny zawsze `mode: subdomains`. `mode: domain` gubi www i subdomeny.
3. Gdy odpowiedz zawiera `render_with`, wywolaj wskazane narzedzie renderujace
   (`render-data-table`, `render-time-series-chart`, `render-scorecard`).
4. Kwoty z API sa w **centach USD** - dziel przez 100.

## Pulapki, ktore juz kosztowaly czas

- `site-explorer-organic-competitors`: nie ma kolumny `keywords_total`.
  Dostepne: `share, traffic, keywords_competitor, value, group_mode, keywords_target,
  competitor_url, competitor_domain, domain_rating, pages, keywords_common`.
- `site-explorer-pages-by-backlinks` i `pages-by-internal-links`: nie ma kolumny `url`.
  Uzywaj `url_to`, `refdomains_target`, `links_to_target`, `url_rating_target`, `title_target`.
- `keywords-explorer-overview`: `target_position` przyjmuje tylko `in_top10` lub `in_top100`
  (nie `any`).
- `gsc-performance-by-position` dla projektu PL zwraca pustke - dziala dla 5952649 (DE).
  Filtr `country` dla niektorych projektow wycina wszystko; probuj tez bez niego.
- **GSC w Ahrefs ma opoznienie ~2 tygodnie.** Zanim policzysz spadek miesieczny,
  sprawdz `history_grouping: daily`, gdzie realnie koncza sie dane.

## Czego Ahrefs NIE zrobi

- **Nie podlaczysz Google Ads.** Ahrefs integruje sie tylko z Google Search Console.
  Kolumny `paid_keywords`, `paid_traffic`, `paid_cost` w `site-explorer-metrics` to
  szacunki Ahrefsa z ich wlasnego crawla SERP-ow, nie dane z konta Google Ads.
- Nie ma tez natywnej integracji z GA4. Do Ahrefs Web Analytics wpycha sie dane
  wlasnym skryptem (jest zainstalowany).
- Do laczenia platnych i organicznych: BigQuery, dataset
  `automatyzacje_saketos_airbyte` (jest tam i GSC, i Google Ads, i Bing, i Meta,
  i zamowienia z ERP) albo konektor Ahrefs do Looker Studio.

## Co warto skonfigurowac (obecnie nieuzywane)

1. **Rank Tracker** - zero slow kluczowych w kazdym z 16 projektow. Dodac liste fraz
   komercyjnych dla DE (z `baseline-de.md`) + konkurentow, wtedy zaczna dzialac raporty
   `rank-tracker-overview`, `rank-tracker-competitors-*` i share of voice.
2. **Konkurenci w projektach** - `management-project-competitors` zwraca `[]`.
   Sensowni konkurenci DE: organzabeutel24.de, organza-shop.de, kroell-verpackung.de
   (mali, pure-play, wysoki share), geschenke-online.de, taschenprint.de, greengiving.de.
3. **Portfolios** - `portfolio_id` w narzedziach `gsc-*` agreguje dane z wielu projektow.
   Przydatne do widoku DACH (de+at+ch) i calej grupy.
