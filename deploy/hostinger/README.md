# Hostinger KVM2 Deployment

This bundle deploys the portfolio to a plain Linux VPS without Docker. It assumes Ubuntu 24.04 LTS, Nginx, PHP 8.3 FPM, Node.js 20, and either SQLite or PostgreSQL.

## What this deployment path uses

- Nginx serves the Laravel `public/` directory directly.
- PHP-FPM runs the application through `public/index.php`.
- Vite builds static assets on the server during deploy.
- SQLite is the recommended default for this portfolio because the site is mostly read-heavy and the content is seeded.
- The queue worker and scheduler units are included as optional templates, but they are not required for the current app if you keep `QUEUE_CONNECTION=sync` and do not add scheduled jobs.

## Files in this folder

- `nginx/portfolio-http.conf`: initial Nginx site config before SSL is issued.
- `nginx/portfolio-https.conf`: Nginx site config after Let's Encrypt is active.
- `systemd/portfolio-queue.service`: optional queue worker.
- `systemd/portfolio-scheduler.service`: optional scheduler runner.
- `systemd/portfolio-scheduler.timer`: optional scheduler timer.
- `scripts/deploy.sh`: repeatable deployment script for app updates.
- `scripts/fix-permissions.sh`: storage and cache permission reset script.

## Required from your side

Before this can be completed on the VPS, you need to provide or decide these items:

1. The production domain name, including whether both root and `www` should resolve.
2. SSH access to the Hostinger KVM2 instance with a sudo-capable user.
3. The server OS and version. These instructions assume Ubuntu 24.04 LTS.
4. Whether you want SQLite or PostgreSQL in production. SQLite is the simplest path for this portfolio.
5. If you want PostgreSQL, the database name, username, password, and whether it is local or hosted externally.

## Recommended production environment

Copy `.env.production.example` to `.env` on the server, then replace at least these values:

- `APP_KEY`
- `APP_URL`
- `SESSION_DOMAIN` if you want cookies locked to a domain
- Database settings if you are not using SQLite

Recommended runtime choices for the current app:

- `APP_ENV=production`
- `APP_DEBUG=false`
- `SESSION_DRIVER=file`
- `CACHE_STORE=file`
- `QUEUE_CONNECTION=sync`
- `DB_CONNECTION=sqlite`

## Manual VPS setup

### 1. Point DNS to Hostinger

Create these DNS records at your domain registrar:

```text
A     @                    <your-kvm2-public-ip>    # ashishgupta.dev
A     www                  <your-kvm2-public-ip>    # www.ashishgupta.dev
A     ashgpt.dev           <your-kvm2-public-ip>    # legacy redirect
A     www.ashgpt.dev       <your-kvm2-public-ip>    # legacy redirect
```

Wait until `dig your-domain.com` or `nslookup your-domain.com` resolves to the VPS.

### 2. SSH into the server

```bash
ssh root@your-kvm2-public-ip
```

Create a sudo-capable deploy user if you do not want to operate as root:

```bash
adduser deploy
usermod -aG sudo deploy
rsync --archive --chown=deploy:deploy ~/.ssh /home/deploy
```

Then reconnect:

```bash
ssh deploy@your-kvm2-public-ip
```

### 3. Install the runtime

```bash
sudo apt update
sudo apt install -y nginx git unzip curl sqlite3 certbot python3-certbot-nginx \
    php8.3 php8.3-cli php8.3-fpm php8.3-mbstring php8.3-xml php8.3-curl \
    php8.3-zip php8.3-bcmath php8.3-sqlite3 php8.3-pgsql
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

Install Composer globally if it is not already present:

```bash
cd /tmp
curl -sS https://getcomposer.org/installer -o composer-setup.php
php composer-setup.php
sudo mv composer.phar /usr/local/bin/composer
rm composer-setup.php
```

### 4. Clone the app

```bash
sudo mkdir -p /var/www/portfolio
sudo chown -R $USER:$USER /var/www/portfolio
git clone <your-repo-url> /var/www/portfolio/current
cd /var/www/portfolio/current
```

### 5. Create the production env file

```bash
cp .env.production.example .env
php artisan key:generate --show
nano .env
```

Paste the generated key into `APP_KEY`.

If you are using SQLite:

```bash
touch database/database.sqlite
```

### 6. Install app dependencies and build assets

```bash
composer install --no-dev --prefer-dist --optimize-autoloader --no-interaction
npm ci
npm run build
```

### 7. Prepare Laravel storage and database

```bash
php artisan migrate --force
php artisan db:seed --class=PortfolioSeeder --force
sudo APP_DIR=/var/www/portfolio/current bash deploy/hostinger/scripts/fix-permissions.sh
```

### 8. Configure Nginx

Use the domain-aware templates in:

- `deploy/hostinger/nginx/portfolio-http.conf`
- `deploy/hostinger/nginx/portfolio-https.conf`

Then install the HTTP config first:

```bash
sudo cp deploy/hostinger/nginx/portfolio-http.conf /etc/nginx/sites-available/portfolio
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/portfolio
sudo nginx -t
sudo systemctl reload nginx
```

### 9. Issue the SSL certificate

```bash
sudo certbot --nginx -d ashishgupta.dev -d www.ashishgupta.dev -d ashgpt.dev -d www.ashgpt.dev
```

After cert issuance succeeds, switch to the HTTPS config:

```bash
sudo cp deploy/hostinger/nginx/portfolio-https.conf /etc/nginx/sites-available/portfolio
sudo nginx -t
sudo systemctl reload nginx
```

### 10. Cache Laravel for production

```bash
php artisan optimize:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache
```

### 11. Deploy updates later

```bash
cd /var/www/portfolio/current
git pull origin main
bash deploy/hostinger/scripts/deploy.sh
```

If you need to refresh seeded portfolio content during a deploy:

```bash
cd /var/www/portfolio/current
RUN_SEEDER=1 bash deploy/hostinger/scripts/deploy.sh
```

## Optional systemd units

The current portfolio does not require these units if you keep `QUEUE_CONNECTION=sync` and do not add scheduled tasks. They are included only for future growth.

### Queue worker

```bash
sudo cp deploy/hostinger/systemd/portfolio-queue.service /etc/systemd/system/portfolio-queue.service
sudo systemctl daemon-reload
sudo systemctl enable --now portfolio-queue.service
```

Only enable this after you switch to an async queue driver such as `database` or `redis`.

### Scheduler

```bash
sudo cp deploy/hostinger/systemd/portfolio-scheduler.service /etc/systemd/system/portfolio-scheduler.service
sudo cp deploy/hostinger/systemd/portfolio-scheduler.timer /etc/systemd/system/portfolio-scheduler.timer
sudo systemctl daemon-reload
sudo systemctl enable --now portfolio-scheduler.timer
```

Only enable this after you add scheduled tasks in Laravel.

## Verification checklist

Run these after deployment:

```bash
curl -I https://ashishgupta.dev
curl -I https://ashgpt.dev
php artisan about
sudo systemctl status nginx --no-pager
sudo systemctl status php8.3-fpm --no-pager
```

Expected outcome:

- The site responds with HTTP 200.
- `https://ashgpt.dev/*` responds with a 301 redirect to `https://ashishgupta.dev/*`.
- `public/build/manifest.json` exists.
- `storage/` and `bootstrap/cache/` are writable by the web user.
- The portfolio page renders without Vite dev-server references.

## Notes for this repo

- `public/index.php` is the entrypoint used on the VPS.
- Legacy serverless runtime/config files have been removed to keep deployment path VPS-only.
