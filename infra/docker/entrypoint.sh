#!/bin/sh
set -eu
if [ "${1:-}" = "bootstrap" ]; then
  attempts=0
  until php artisan migrate --force; do
    attempts=$((attempts + 1))
    [ "$attempts" -lt 30 ] || exit 1
    sleep 2
  done
  php artisan db:seed --force
  exit 0
fi
exec "$@"
