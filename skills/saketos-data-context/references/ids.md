# Wszystkie ID i mapowania Saketos

## BigQuery

- **Numer projektu:** `197617307186`
- **ID projektu (uzywaj tego):** `automatyzacje-saketos`
- Lokalizacja wiekszosci datasetow: `EU` (wyjatek: `searchconsole_daniel` w `US`)

## GA4 -> domena (dataset `analytics_<property_id>`)

| property_id | domena | uwagi |
|---|---|---|
| 270710201 | saketos.pl | + b2b.saketos.pl |
| **299834516** | **saketos.de** | + b2b.saketos.de (znikomy ruch) |
| 303627558 | saketos.fr | + b2b.saketos.fr |
| 310098542 | saketos.it | |
| 310694962 | saketos.nl | |
| 326642967 | saketos.co.uk | + saketos-co-uk.translate.goog |
| 331266328 | saketos.cz | |
| 336677662 | saketos.es | |
| 357977476 | saketos.dk | |
| 358302188 | saketos.at | duzy wolumen zdarzen - sprawdz czy nie boty |
| 358342810 | ie.saketos.com | bardzo duzy wolumen - zweryfikowac |
| 258586481 | saketos.be | |

Nie ma osobnego property dla `dekor-hurt.pl` ani `e-dekoration.de` w tym projekcie.

## Ahrefs / GSC - project_id

| project_id | domena |
|---|---|
| 5952638 | saketos.fr |
| 5952639 | saketos.at |
| 5952640 | saketos.es |
| 5952641 | saketos.it |
| 5952642 | saketos.pl |
| 5952643 | saketos.co.uk |
| 5952644 | saketos.eu |
| 5952645 | dekor-hurt.pl |
| 5952646 | saketos.nl |
| 5952647 | saketos.cz |
| 5952648 | saketos.be |
| **5952649** | **saketos.de** |
| 5952650 | saketos.com |
| 5952651 | ie.saketos.com |
| 5952652 | e-dekoration.de |
| 5958978 | saketos.dk |

Wszystkie projekty: `mode: subdomains`, `protocol: both`, wlasciciel `marketing@saketos.pl`,
GSC podlaczone i zweryfikowane.

## Stan konfiguracji Ahrefs (do naprawy)

- **Rank Tracker: 0 slow kluczowych we WSZYSTKICH 16 projektach.** Raporty
  `rank-tracker-*` zwracaja pustke. To najwieksza niewykorzystana czesc subskrypcji.
- **Konkurenci: nieustawieni** (`management-project-competitors` -> `[]`).
  Bez tego `rank-tracker-competitors-*` nie dziala.
- Ahrefs Web Analytics: skrypt zainstalowany (kazdy projekt ma `web_analytics_data_key`).

## Cloudflare

Dwa konta: `Daniel@saketos.pl's Account` (5a7eb722a592fe1ca4af734807464987)
i `Saketos` (78153e0a43da2cc7db3ed82e53e6a6d7).
