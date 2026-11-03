#!/bin/sh
set -eu
mkdir -p backups
stamp=$(date +%Y%m%d-%H%M%S)
docker compose run --rm --no-deps --entrypoint sh mysql -c 'MYSQL_PWD="$MYSQL_ROOT_PASSWORD" mysqldump -h mysql -u root --single-transaction "$MYSQL_DATABASE"' > "backups/$stamp.sql"
docker compose run --rm --no-deps --entrypoint tar web czf - -C storage/app . > "backups/$stamp-photos.tar.gz"
printf 'Backup: %s\n' "$stamp"
