<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        {{-- Sets data-theme before any CSS/JS loads, so the page never paints
             the wrong palette then flashes to the right one. --}}
        <script>
            (function () {
                var stored = localStorage.getItem('theme');
                var dark = stored === 'dark' || (stored !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches);
                document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
            })();
        </script>

        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#f8fafc">
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#090e14">

        {{-- Rendered server-side: social crawlers never execute the JS that
             Inertia's <Head> component depends on. --}}
        @include('partials.seo')

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
