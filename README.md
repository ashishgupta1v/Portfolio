# Personal Portfolio - Ashish Gupta

A full-stack developer portfolio built with Laravel 13, Vue 3, Inertia.js, Three.js, GSAP, Tailwind CSS, and TypeScript.

## Stack

- Backend: PHP 8.3+, Laravel 13, Inertia.js, SQLite
- Frontend: Vue 3, TypeScript, GSAP, Three.js, Tailwind CSS
- Build: Vite 8, vue-tsc, npm
- Hosting: Hostinger KVM2 VPS (Nginx + PHP-FPM)

## Local Setup

Prerequisites:

- PHP 8.3+
- Composer
- Node.js 20+
- npm

Install and build:

```bash
composer setup
```

Run development services:

```bash
composer dev
```

Run tests:

```bash
composer test
```

## Production Deployment (VPS)

This project is configured for VPS deployment.

- Web server: Nginx
- PHP runtime: PHP-FPM
- Database: SQLite by default for this portfolio
- TLS: Let's Encrypt via Certbot

Deployment docs:

- `deploy/hostinger/README.md`
- `deploy/hostinger/nginx/`
- `deploy/hostinger/systemd/`
- `deploy/hostinger/scripts/`

## Recommended Update Flow

On the VPS:

```bash
git pull
composer install --no-dev --prefer-dist --optimize-autoloader --no-interaction
npm ci
npm run build
php artisan migrate --force
php artisan optimize:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache
```

## Project Structure

```text
portfolio/
├── app/
├── bootstrap/
├── config/
├── database/
├── deploy/hostinger/
├── docker/
├── public/
├── resources/
├── routes/
├── storage/
├── tests/
├── composer.json
├── package.json
└── vite.config.js
```
