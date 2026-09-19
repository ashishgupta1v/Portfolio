import '../css/app.css';
import './bootstrap';

import { createInertiaApp, router } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createApp, DefineComponent, h, nextTick, type App as VueApp } from 'vue';
import { ZiggyVue } from '../../vendor/tightenco/ziggy';
const appName = import.meta.env.VITE_APP_NAME || 'Ashish Gupta';
const sentryDsn = import.meta.env.VITE_SENTRY_DSN as string | undefined;
const env = import.meta.env.VITE_APP_ENV as string | undefined;

let sentryModule: typeof import('@sentry/vue') | null = null;

/**
 * Initialise Sentry asynchronously during browser idle time only when a DSN
 * is provided. Keeping the SDK completely out of the synchronous bundle
 * removes ~454KB of vendor JS parsing from the critical First Contentful Paint.
 */
function scheduleSentryInit(app: VueApp): void {
    if (!sentryDsn || typeof window === 'undefined') return;

    const loadAndInit = async () => {
        try {
            const Sentry = await import('@sentry/vue');
            sentryModule = Sentry;
            (window as any).Sentry = Sentry;

            Sentry.init({
                app,
                dsn: sentryDsn,
                environment: env ?? 'production',
                integrations: [Sentry.browserTracingIntegration()],
                tracesSampleRate: env === 'production' ? 0.1 : 0.05,
            });
        } catch (err) {
            console.warn('[Sentry] Deferred initialization failed', err);
        }
    };

    if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(loadAndInit, { timeout: 3500 });
    } else {
        setTimeout(loadAndInit, 2000);
    }
}

/**
 * Page transitions powered by the View Transitions API (Chrome 111+, Safari
 * 18+). On navigation Inertia fires `start` before the XHR and `finish` after
 * the new page component is mounted. We open a view transition in `start` —
 * the browser screenshots the old state — and resolve it after Vue renders the
 * new state in `finish`, giving a smooth cross-fade with a subtle vertical
 * slide.
 *
 * Browsers without the API fall back to the existing opacity-based fade
 * (body.inertia-navigating CSS class). No errors, no layout shift.
 */
function initRouteTransitions(): void {
    const supportsViewTransitions =
        typeof document !== 'undefined' && 'startViewTransition' in document

    if (!supportsViewTransitions) {
        // Legacy fallback: opacity-based fade controlled via CSS class.
        router.on('start', () => document.body.classList.add('inertia-navigating'))
        router.on('finish', () => document.body.classList.remove('inertia-navigating'))
        return
    }

    // The resolve callback for the current view transition. Kept in
    // module scope so `finish` can reach it after `start` sets it up.
    let pendingResolve: (() => void) | null = null

    router.on('start', () => {
        // If a previous transition is still unresolved (rapid clicks),
        // resolve it immediately so the browser doesn't time-out.
        if (pendingResolve) {
            pendingResolve()
            pendingResolve = null
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(document as any).startViewTransition(
            () =>
                new Promise<void>((resolve) => {
                    pendingResolve = resolve
                }),
        )
    })

    router.on('finish', () => {
        // Wait one tick so Vue has flushed DOM updates for the new page,
        // then resolve — the browser snapshots the new state and animates.
        nextTick(() => {
            if (pendingResolve) {
                pendingResolve()
                pendingResolve = null
            }
        })
    })
}

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

        app.config.errorHandler = (err, instance, info) => {
            console.error('[Vue Global Error]', err, info)
            if (sentryDsn) {
                if (sentryModule) {
                    sentryModule.captureException(err, { extra: { info } })
                } else {
                    import('@sentry/vue').then((Sentry) => {
                        Sentry.captureException(err, { extra: { info } })
                    }).catch(() => {})
                }
            }
        }

        scheduleSentryInit(app)

        app.mount(el)

        initRouteTransitions()
        initNavigationTracking()
    },
    progress: {
        color: '#5eead4',
    },
});
