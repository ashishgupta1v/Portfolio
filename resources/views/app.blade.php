<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        {{-- Sets data-theme before any CSS/JS loads, so the page never paints
             the wrong palette then flashes to the right one. --}}
        <script>
            (function () {
                document.documentElement.setAttribute('data-theme', 'dark');
            })();
        </script>

        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#f8fafc">
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#090e14">

        {{-- Rendered server-side: social crawlers never execute the JS that
             Inertia's <Head> component depends on. --}}
        @include('partials.seo')

        {{-- Privacy-friendly analytics. Loaded only if configured, so local
             dev and unauthenticated preview environments send nothing. Set
             PLAUSIBLE_DOMAIN in .env (e.g. "ashishgupta.dev") to enable.
             The script is async — no blocking on first paint. --}}
        @if(config('services.plausible.domain'))
            <script
                defer
                data-domain="{{ config('services.plausible.domain') }}"
                src="{{ config('services.plausible.src', 'https://plausible.io/js/script.js') }}"
            ></script>
        @endif

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
    </head>
    <body>
        <a href="#main-content" class="skip-link">Skip to content</a>
        @inertia

        @production
            <script>
                if ('serviceWorker' in navigator) {
                    window.addEventListener('load', () => {
                        navigator.serviceWorker.register('/sw.js?v=v3').catch(() => {});
                    });
                }
            </script>
        @endproduction
    </body>
</html>
