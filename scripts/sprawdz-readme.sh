#!/bin/sh
# Sprawdza, że README nie nazywa tego repozytorium prywatnym
# i że zostawia zdanie o publicznej widoczności.
set -eu
readme="${1:-README.md}"
if grep -n -i 'prywatn' "$readme"; then
  echo "plik nazywa repozytorium prywatnym: $readme" >&2
  exit 1
fi
grep -F 'Publiczne repozytorium procedur inżynierskich Saketos.' "$readme" >/dev/null
grep -F 'Widoczność zostaje publiczna.' "$readme" >/dev/null
echo "ok $readme"
