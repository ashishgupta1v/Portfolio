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

        {{-- Privacy-friendly analytics via Plausible.
             Queue snippet ensures early calls to window.plausible() do not fail before script loads. --}}
        <script>window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) };</script>
        @if(config('services.plausible.domain'))
            <script
                defer
                data-domain="{{ config('services.plausible.domain') }}"
                src="{{ config('services.plausible.src', 'https://plausible.io/js/script.tagged-events.outbound-links.js') }}"
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

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link rel="preload" href="/fonts/inter-latin-var.woff2" as="font" type="font/woff2" crossorigin>

        <!-- Critical Above-The-Fold CSS -->
        <style>
            :root {
                --bg-primary: #090e14;
                --text-1: #f8fafc;
                --text-2: #94a3b8;
                --accent: #5eead4;
            }
            html, body {
                margin: 0;
                padding: 0;
                background-color: #090e14;
                color: #f8fafc;
                font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                text-rendering: optimizeLegibility;
                -webkit-font-smoothing: antialiased;
            }
            .split-hero {
                min-height: 100vh;
                display: flex;
                align-items: center;
                position: relative;
                overflow: hidden;
            }
            .hero-title {
                font-size: clamp(2rem, 5vw, 3.75rem);
                font-weight: 800;
                line-height: 1.1;
                letter-spacing: -0.02em;
                margin: 0 0 1rem;
            }
            .gradient-text {
                background: linear-gradient(135deg, #ffffff 30%, #5eead4 70%, #a78bfa 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
            .hero-bio {
                font-size: clamp(1rem, 1.5vw, 1.2rem);
                line-height: 1.6;
                color: #94a3b8;
                max-width: 620px;
                margin: 0 0 2rem;
            }
            .btn-primary {
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.85rem 1.75rem;
                background: linear-gradient(135deg, #5eead4 0%, #38bdf8 100%);
                color: #090e14;
                font-weight: 700;
                border-radius: 9999px;
                text-decoration: none;
            }
        </style>

        <!-- Scripts -->
        @vite(['resources/js/app.ts', "resources/js/Pages/{$page['component']}.vue"])
        @inertiaHead
    </head>
    <body>
        <a href="#main-content" class="skip-link">Skip to content</a>
        @inertia
        @routes

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
