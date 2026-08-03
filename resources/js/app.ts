import '../css/app.css';
import './bootstrap';

import { createInertiaApp, router } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createApp, DefineComponent, h, type App as VueApp } from 'vue';
import { ZiggyVue } from '../../vendor/tightenco/ziggy';
import * as Sentry from '@sentry/vue';

const appName = import.meta.env.VITE_APP_NAME || 'Ashish Gupta';
const sentryDsn = import.meta.env.VITE_SENTRY_DSN as string | undefined;
const env = import.meta.env.VITE_APP_ENV as string | undefined;

/**
 * Initialise Sentry for the browser only when a DSN is provided. Keeping the
 * conditional here (rather than an unconditional init with an empty DSN) means
 * the SDK does no work at all in local dev, and the browser doesn't try to
 * POST to a non-existent endpoint. Sampling is aggressive to keep the free
 * quota healthy — errors always send, but only a slice of traces do.
 */
function initSentry(app: VueApp): void {
    if (!sentryDsn) return

    Sentry.init({
        app,
        dsn: sentryDsn,
        environment: env ?? 'production',
        // browserTracingIntegration's typed `router` option expects a Vue
        // Router instance; this app uses Inertia, not vue-router. Sentry's
        // default heuristics still capture navigation transactions from
        // popstate/pushstate, they just won't be labeled with named routes.
        integrations: [Sentry.browserTracingIntegration()],
        tracesSampleRate: env === 'production' ? 0.1 : 0,
        // Session Replay is off by default — enable per-DSN in the Sentry
        // dashboard if wanted; it adds ~100KB and PII considerations.
    })
}

/**
 * Very lightweight, non-blocking page view + client-side navigation tracking
 * for Plausible / Umami / Fathom. If `window.plausible` (or `umami.track`)
 * exists at nav time, we call it. If neither is loaded, this is a no-op —
 * the site works fine without any analytics.
 */
function initNavigationTracking(): void {
    // Fire on client-side Inertia route changes. First page load is captured
    // by the analytics snippet in app.blade.php on script load.
    router.on('navigate', (event) => {
        const url = event.detail.page?.url
        if (!url) return

        // Plausible
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const plausible = (window as any).plausible
        if (typeof plausible === 'function') {
            plausible('pageview', { u: url })
        }

        // Umami
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const umami = (window as any).umami
        if (umami && typeof umami.track === 'function') {
            umami.track(() => ({ url, referrer: document.referrer }))
        }
    })
}

createInertiaApp({
    // Page titles already carry the name (e.g. "Case Studies — Ashish Gupta"),
    // and the server-rendered <title> has no suffix — appending appName here
    // made the tab title change on hydration and read "… - AshishGupta".
    title: (title) => title || appName,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.vue`,
            import.meta.glob<DefineComponent>('./Pages/**/*.vue'),
        ),
    setup({ el, App, props, plugin }) {
        const app = createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(ZiggyVue)

        initSentry(app)

        app.mount(el)

        initNavigationTracking()
    },
    progress: {
        color: '#5eead4',
    },
});
