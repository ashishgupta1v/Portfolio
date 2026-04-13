#!/bin/sh
set -e

echo ""
echo "========================================="
echo "  Portfolio — Container Bootstrap"
echo "========================================="

echo ""
echo "--> [1/5] Installing Composer dependencies..."
composer install --no-interaction --prefer-dist --optimize-autoloader --no-progress

echo ""
echo "--> [2/5] Installing Node dependencies..."
npm ci --prefer-offline --silent

echo ""
echo "--> [3/5] Building frontend assets (vue-tsc + Vite)..."
npm run build

echo ""
echo "--> [4/5] Running database migrations..."
php artisan migrate --force

echo ""
echo "--> [5/5] Warming Laravel caches..."
php artisan optimize:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo ""
echo "========================================="
echo "  Bootstrap complete — starting PHP-FPM"
echo "========================================="
echo ""

exec php-fpm
