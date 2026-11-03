FROM php:8.4-fpm-bookworm AS php-base
RUN apt-get update && apt-get install -y --no-install-recommends git unzip libzip-dev libicu-dev libpng-dev libjpeg62-turbo-dev libwebp-dev && docker-php-ext-configure gd --with-jpeg --with-webp && docker-php-ext-install pdo_mysql zip intl gd && rm -rf /var/lib/apt/lists/*
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
WORKDIR /var/www/html
COPY apps/web/ ./
RUN composer install --no-dev --prefer-dist --no-interaction --no-scripts && php artisan package:discover
FROM php-base AS frontend
COPY --from=node:22-bookworm-slim /usr/local/bin/node /usr/local/bin/node
COPY --from=node:22-bookworm-slim /usr/local/lib/node_modules /usr/local/lib/node_modules
RUN ln -s /usr/local/lib/node_modules/npm/bin/npm-cli.js /usr/local/bin/npm
WORKDIR /app
COPY --from=php-base /var/www/html ./
RUN npm ci && npm run build
FROM php-base AS runtime
COPY --from=frontend /app/public/build ./public/build
COPY infra/docker/entrypoint.sh /usr/local/bin/waste-entrypoint
RUN chmod +x /usr/local/bin/waste-entrypoint && chown -R www-data:www-data storage bootstrap/cache
ENTRYPOINT ["waste-entrypoint"]
CMD ["php-fpm"]
FROM nginx:1.27-alpine AS nginx
COPY infra/docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=frontend /app/public /var/www/html/public
