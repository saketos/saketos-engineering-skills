# BigQuery: datasety, stan pipeline'ow, gotowe zapytania

Projekt: `automatyzacje-saketos`

## Datasety

| dataset | co zawiera | stan |
|---|---|---|
| `analytics_<id>` x12 | surowy eksport GA4, tabele `events_YYYYMMDD` | dziala, aktualny |
| `ga4_api` | `sessions` - sesje per property/kraj/miesiac | dziala, ale malutki (156 wierszy) |
| **`automatyzacje_saketos_airbyte`** | **ZYWY PIPELINE - patrz nizej** | dziala, ~codziennie |
| `gsc_export` | `gsc_search_analytics` | porzucony staging |
| `googleAds` | - | porzucony staging, pusty |
| `searchconsole_daniel` | GSC (region US) | do zweryfikowania |
| `airbyte`, `airbyte_internal`, `automatyzacje_saketos_airbyte` | staging Airbyte | |
| `Brevo` | e-mail marketing | |
| `supabase` | `user_events_leads` | |

## GDZIE SA DANE - czytaj to przed szukaniem

**Zywy pipeline to `automatyzacje_saketos_airbyte`.** Zawiera:

| tabela | co |
|---|---|
| `GSC_search_analytics_by_page` | GSC per strona - **wlasciwa tabela do podzialu blog/sklep** |
| `GSC_search_analytics_by_query` | GSC per fraza |
| `GSC_search_analytics_by_date` | GSC zagregowany dziennie (najblizszy realnym totalom) |
| `GSC_search_analytics_by_device` | GSC per urzadzenie |
| `GSC_search_analytics_all_fields` | wszystkie wymiary razem - **mocno niedoszacowany, nie uzywaj do totalow** |
| `GSC_sites`, `GSC_sitemaps` | metadane |
| `GADS_account_performance_report` | Google Ads per konto/dzien, z impression share |
| `GADS_click_view`, `GADS_geographic_view_with_metrics` | Google Ads szczegoly |
| `BING_*` | Bing Ads |
| `META_*` | Meta Ads |
| `ERP_ORDERS_Metabase_Orders` | zamowienia z ERP (Odoo), z `shipping_country_code` |
| `SUPABASE_*` | kursy walut, user events |

Zakres GSC: **11 domen, od 2025-02-14** - czyli pelny rok do roku JEST mozliwy.
Dane sa swiezsze niz w integracji Ahrefs (o ~tydzien).

**Blad, ktory juz raz popelniono:** datasety `googleAds` i `gsc_export` to porzucony
staging (pierwszy pusty, drugi zatrzymany na 20.06.2026, tylko saketos.pl, retencja
partycji 60 dni). Zajrzenie tylko tam i wyciagniecie wniosku "pipeline nie dziala"
jest bledne. **Zawsze przelec `INFORMATION_SCHEMA.TABLES` po wszystkich datasetach
zanim orzekniesz, ze czegos nie ma.**

## Pulapki tabel GSC w BigQuery

- Partycjonowanie jest po `_airbyte_extracted_at`, nie po `date` - filtr na `date`
  nie przycina partycji, wiec skan bywa drogi. Ograniczaj tez zakres inaczej.
- **Zawsze filtruj `search_type='web'`.** Bez tego wchodzi image search
  (~137 klikniec i 59 tys. wyswietlen miesiecznie na .de) i miesza CTR.
- W `by_page` wyswietlenia sumuja sie wyzej niz total domeny, bo jedno zapytanie
  moze wyswietlic kilka naszych stron. CTR bezwzgledny jest zanizony; porownania
  miedzy segmentami i YoY pozostaja poprawne.
- `all_fields` (query+page+country+device jednoczesnie) pokazuje ~27% rzeczywistych
  klikniec - GSC anonimizuje kombinacje wymiarow. Uzywaj do analizy relatywnej fraz,
  nigdy do totalow.
- `ERP_ORDERS_Metabase_Orders`: kolumna `amount_total_base_cur` wyglada na
  znormalizowana (srednia 17 dla kazdego kraju) - nie uzywaj bez wyjasnienia.
  Liczby zamowien sa wiarygodne, ale obejmuja marketplace'y (Amazon, eBay).

## Klasyfikacja blog vs sklep dla saketos.de (sprawdzona)

```sql
CASE
  WHEN REGEXP_CONTAINS(p, r'#toc-') THEN 'BLOG-anchor'
  WHEN REGEXP_CONTAINS(p, r'^/ptag/|\d{13}/?$|^/\d+-(st|stk)-|\d+\s?x\s?\d+-cm') THEN 'SKLEP'
  WHEN p IN ('/','') THEN 'HOME'
  WHEN ARRAY_LENGTH(SPLIT(TRIM(REGEXP_REPLACE(p, r'^/|/$',''),'/'),'-')) >= 5 THEN 'BLOG'
  ELSE 'SKLEP'
END
```
Slug artykulu ma 5+ czlonow, kategoria 1-4. Produkty maja EAN albo wzorzec rozmiaru.

## Struktura GA4 - o czym pamietac

- Klucz sesji: `CONCAT(user_pseudo_id,'-',CAST((SELECT value.int_value FROM UNNEST(event_params) WHERE key='ga_session_id') AS STRING))`
- Zrodlo: `COALESCE(collected_traffic_source.manual_medium, traffic_source.medium)`.
  **Nie bierz medium tylko ze zdarzenia `session_start`** - czesc sesji go nie ma
  i wynik sie rozjezdza (objaw: jedna sesja z 236 zakupami). Uzyj `ARRAY_AGG(... IGNORE NULLS ORDER BY event_timestamp LIMIT 1)`.
- Przychod: `ecommerce.purchase_revenue` (waluta sklepu), `ecommerce.purchase_revenue_in_usd`.
- Zawsze ograniczaj `_TABLE_SUFFIX BETWEEN 'YYYYMMDD' AND 'YYYYMMDD'`, inaczej skan
  jest drogi.

## Klasyfikacja typow stron (saketos.de)

```sql
CASE
  WHEN path IN ('/','') THEN 'HOME'
  WHEN REGEXP_CONTAINS(path, r'^/(wie-|was-|woraus-|lavendel-|bewaehrte-|handgemachte|hausgemachte|originelle|konfetti|sensorik|jutematerial|alternative|beutel-zur-aufnahme)') THEN 'BLOG'
  WHEN REGEXP_CONTAINS(path, r'-\d{13}/?$') OR REGEXP_CONTAINS(path,r'^/\d+-st-|^/\d+-stk-') THEN 'PRODUCT'
  WHEN REGEXP_CONTAINS(path, r'^/(kasse|warenkorb|mein-konto|authentifizierung)') THEN 'CHECKOUT'
  WHEN REGEXP_CONTAINS(path, r'^/ptag/') THEN 'TAG'
  ELSE 'CATEGORY' END
```
Produkty maja EAN (13 cyfr) na koncu slug albo prefiks `N-st-`/`N-stk-`.

## Gotowe zapytanie: kanaly + konwersja + przychod

```sql
WITH e AS (
  SELECT
    CONCAT(user_pseudo_id,'-',CAST((SELECT value.int_value FROM UNNEST(event_params) WHERE key='ga_session_id') AS STRING)) AS sid,
    event_timestamp, event_name, ecommerce.purchase_revenue AS rev,
    LOWER(COALESCE(collected_traffic_source.manual_medium, traffic_source.medium)) AS medium,
    LOWER(COALESCE(collected_traffic_source.manual_source, traffic_source.source)) AS source
  FROM `automatyzacje-saketos.analytics_299834516.events_*`
  WHERE _TABLE_SUFFIX BETWEEN '20260201' AND '20260727'
),
f AS (
  SELECT sid,
    ARRAY_AGG(medium IGNORE NULLS ORDER BY event_timestamp LIMIT 1)[SAFE_OFFSET(0)] AS medium,
    ARRAY_AGG(source IGNORE NULLS ORDER BY event_timestamp LIMIT 1)[SAFE_OFFSET(0)] AS source
  FROM e GROUP BY sid
),
a AS (
  SELECT e.sid, f.medium, f.source,
    COUNTIF(e.event_name='purchase') AS purchases,
    SUM(IF(e.event_name='purchase', e.rev, 0)) AS revenue
  FROM e JOIN f USING (sid) GROUP BY 1,2,3
)
SELECT
  CASE WHEN medium='organic' THEN 'Organic Search'
       WHEN medium IN ('cpc','ppc','paid') THEN 'Paid Search'
       WHEN medium='referral' THEN 'Referral'
       WHEN medium='email' THEN 'Email'
       WHEN medium IS NULL OR medium IN ('(none)','') THEN 'Direct'
       ELSE CONCAT(medium,' / ',IFNULL(source,'?')) END AS channel,
  COUNT(*) sessions, SUM(purchases) purchases, ROUND(SUM(revenue),2) revenue,
  ROUND(100*SUM(purchases)/COUNT(*),2) cr_pct
FROM a GROUP BY 1 ORDER BY revenue DESC
```

## Gotowe zapytanie: kohorty wg pierwszego wejscia (test intencji zakupowej)

To zapytanie odpowiada na pytanie "czy ruch z bloga kiedykolwiek kupuje", liczac
konwersje w kolejnych sesjach tego samego `user_pseudo_id`, nie tylko w tej samej sesji.
Ograniczenie: `user_pseudo_id` to cookie - konwersje cross-device sa niewidoczne dla
wszystkich kohort jednakowo, wiec porownanie kohort jest wiarygodne, a poziomy bezwzgledne nie.

Pelna wersja: patrz `baseline-de.md`, sekcja "Kohorty".
