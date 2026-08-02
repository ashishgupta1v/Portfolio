<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="theme-color" content="#090e14">
        <meta name="description" content="Ashish Gupta - Full Stack Developer Portfolio">

        <title inertia>{{ config('app.name', 'Ashish Gupta') }}</title>

        <!-- Favicon / app icons -->
        <link rel="icon" href="/favicon.svg" type="image/svg+xml">
        <link rel="apple-touch-icon" href="/images/icon-192.png">

        <!-- PWA -->
        <link rel="manifest" href="/manifest.json">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
        <meta name="apple-mobile-web-app-title" content="Ashish Gupta">

        <!-- Fonts (self-hosted — no third-party round-trip) -->
        <link rel="preload" href="/fonts/inter-latin-var.woff2" as="font" type="font/woff2" crossorigin>

        <!-- Scripts -->
        @routes
        @vite(['resources/js/app.ts', "resources/js/Pages/{$page['component']}.vue"])
        @inertiaHead

        @if(request()->routeIs('portfolio'))
            <link rel="preload" as="video" href="/videos/hero-sequence.webm" type="video/webm" fetchpriority="high">
        @endif
    </head>
    <body>
        @inertia

        @production
            <script>
                if ('serviceWorker' in navigator) {
                    window.addEventListener('load', () => {
                        navigator.serviceWorker.register('/sw.js').catch(() => {});
                    });
                }
            </script>
        @endproduction
    </body>
</html>
