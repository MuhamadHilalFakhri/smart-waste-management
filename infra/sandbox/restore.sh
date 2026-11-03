#!/bin/sh
set -eu
[ "$#" -eq 2 ] || { echo "Usage: restore.sh backup.sql photos.tar.gz"; exit 1; }
docker compose run --rm -T --no-deps --entrypoint sh mysql -c 'MYSQL_PWD="$MYSQL_ROOT_PASSWORD" mysql -h mysql -u root "$MYSQL_DATABASE"' < "$1"
docker compose run --rm -T --no-deps --entrypoint tar web xzf - -C storage/app < "$2"
