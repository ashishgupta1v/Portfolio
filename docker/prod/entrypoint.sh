#!/bin/sh
set -e

echo "========================================="
echo "  Portfolio Backend — Production Startup"
echo "========================================="

# Ensure SQLite file and directory are created and writeable by www-data
if [ "$DB_CONNECTION" = "sqlite" ]; then
    DB_PATH=${DB_DATABASE:-/var/www/html/database/database.sqlite}
    DB_DIR=$(dirname "$DB_PATH")

    echo "Setting up SQLite database at: $DB_PATH"
    mkdir -p "$DB_DIR"
    if [ ! -f "$DB_PATH" ]; then
        touch "$DB_PATH"
        echo "SQLite database file created."
    fi

    # Grant write permissions to www-data for both the file and parent directory
    chown -R www-data:www-data "$DB_DIR"
    chmod -R 775 "$DB_DIR"
fi

# Run database migrations
echo "Running migrations..."
php artisan migrate --force

# Warm Laravel config/route caches for production performance
echo "Warming caches..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo "Starting PHP-FPM..."
exec php-fpm
