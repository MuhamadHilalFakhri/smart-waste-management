#!/bin/sh
set -eu
docker compose build
docker compose up -d mysql ml
docker compose run --rm bootstrap
docker compose up -d web worker nginx
curl --fail --retry 20 --retry-delay 3 --retry-connrefused http://localhost:8080/up
