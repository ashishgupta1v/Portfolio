#!/usr/bin/env bash
set -Eeuo pipefail

APP_DIR="${APP_DIR:-/var/www/portfolio/current}"
WEB_USER="${WEB_USER:-www-data}"
WEB_GROUP="${WEB_GROUP:-www-data}"

for path in "$APP_DIR/storage" "$APP_DIR/bootstrap/cache" "$APP_DIR/database"; do
    if [ ! -e "$path" ]; then
        echo "Skipping missing path: $path"
        continue
    fi

    chown -R "$WEB_USER:$WEB_GROUP" "$path"
    find "$path" -type d -exec chmod 775 {} \;
    find "$path" -type f -exec chmod 664 {} \;
done

echo "Permissions updated for $APP_DIR."
