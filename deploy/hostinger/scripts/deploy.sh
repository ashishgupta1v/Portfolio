#!/usr/bin/env bash
set -Eeuo pipefail

APP_DIR="${APP_DIR:-/var/www/portfolio/current}"
RUN_SEEDER="${RUN_SEEDER:-0}"
SEEDER_CLASS="${SEEDER_CLASS:-Database\\Seeders\\PortfolioSeeder}"
PHP_FPM_SERVICE="${PHP_FPM_SERVICE:-php8.3-fpm}"

require_cmd() {
    if ! command -v "$1" >/dev/null 2>&1; then
        echo "Missing required command: $1" >&2
        exit 1
    fi
}

require_cmd php
require_cmd composer
require_cmd npm

cd "$APP_DIR"

ensure_sqlite_database_file() {
    # Read DB config from .env and make sure SQLite database file exists before migrations.
    php -r '
require __DIR__ . "/vendor/autoload.php";

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->safeLoad();

$connection = $_ENV["DB_CONNECTION"] ?? $_SERVER["DB_CONNECTION"] ?? "sqlite";
if ($connection !== "sqlite") {
    exit(0);
}

$database = $_ENV["DB_DATABASE"] ?? $_SERVER["DB_DATABASE"] ?? (__DIR__ . "/database/database.sqlite");
if ($database === "") {
    $database = __DIR__ . "/database/database.sqlite";
}

$directory = dirname($database);
if (!is_dir($directory) && !mkdir($directory, 0775, true) && !is_dir($directory)) {
    fwrite(STDERR, "Failed to create SQLite directory: {$directory}" . PHP_EOL);
    exit(1);
}

if (!file_exists($database) && !touch($database)) {
    fwrite(STDERR, "Failed to create SQLite database file: {$database}" . PHP_EOL);
    exit(1);
}
' || {
        echo "Failed to prepare SQLite database file." >&2
        exit 1
    }
}

trap 'php artisan up || true' EXIT

php artisan down --retry=60 || true
composer install --no-dev --prefer-dist --optimize-autoloader --no-interaction
npm ci
npm run build
ensure_sqlite_database_file
php artisan migrate --force

if [ "$RUN_SEEDER" = "1" ]; then
    php artisan db:seed --class="$SEEDER_CLASS" --force
fi

php artisan optimize:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache
php artisan up
trap - EXIT

if command -v systemctl >/dev/null 2>&1; then
    systemctl reload "$PHP_FPM_SERVICE" || true
    systemctl reload nginx || true
    systemctl try-restart portfolio-queue.service || true
fi

echo "Deployment complete."
