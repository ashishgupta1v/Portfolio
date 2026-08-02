/**
 * Service worker for ashishgupta.dev
 *
 * Caching strategy is deliberately split by resource type, because a
 * blanket cache-first policy would pin stale HTML and make the site
 * impossible to update:
 *
 *   navigations (HTML) -> network-first, cache fallback, then offline page.
 *                         Never serve stale HTML while the network is up.
 *   /build/* assets    -> cache-first. Vite content-hashes these filenames,
 *                         so a given URL's bytes never change.
 *   fonts/img/video    -> stale-while-revalidate. Instant paint, refreshed
 *                         quietly in the background.
 *
 * Nothing dynamic or private is cached: POSTs, /chat, /contact, /admin and
 * cross-origin requests all bypass the worker entirely.
 */

const VERSION = 'v1';
const SHELL_CACHE = `shell-${VERSION}`;
const ASSET_CACHE = `assets-${VERSION}`;
const MEDIA_CACHE = `media-${VERSION}`;
const CURRENT_CACHES = [SHELL_CACHE, ASSET_CACHE, MEDIA_CACHE];

const OFFLINE_URL = '/offline.html';

// Precache only what is guaranteed to exist and is safe to serve stale.
const PRECACHE = [OFFLINE_URL, '/favicon.svg', '/fonts/inter-latin-var.woff2'];

// Paths the worker must never touch.
const BYPASS = [/^\/admin/, /^\/chat/, /^\/contact/, /^\/sitemap\.xml/, /^\/build\/.*\.hot-update/];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches
            .open(SHELL_CACHE)
            // addAll is atomic — one 404 would reject the whole install and
            // leave the site with no worker, so cache entries individually.
            .then((cache) => Promise.all(PRECACHE.map((url) => cache.add(url).catch(() => null))))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches
            .keys()
            .then((keys) =>
                Promise.all(keys.filter((key) => !CURRENT_CACHES.includes(key)).map((key) => caches.delete(key)))
            )
            .then(() => self.clients.claim())
    );
});

function isBypassed(url) {
    return BYPASS.some((pattern) => pattern.test(url.pathname));
}

/** Cache-first: for immutable, content-hashed URLs. */
async function cacheFirst(request, cacheName) {
    const cached = await caches.match(request);
    if (cached) return cached;

    const response = await fetch(request);
    if (response.ok) {
        const cache = await caches.open(cacheName);
        cache.put(request, response.clone());
    }
    return response;
}

/** Stale-while-revalidate: serve cache immediately, refresh in background. */
async function staleWhileRevalidate(request, cacheName) {
    const cached = await caches.match(request);

    const network = fetch(request)
        .then((response) => {
            if (response.ok) {
                caches.open(cacheName).then((cache) => cache.put(request, response.clone()));
            }
            return response;
        })
        .catch(() => cached);

    return cached || network;
}

/** Network-first: for HTML, so a deploy is picked up on the next load. */
async function networkFirst(request) {
    try {
        const response = await fetch(request);
        if (response.ok) {
            const cache = await caches.open(SHELL_CACHE);
            cache.put(request, response.clone());
        }
        return response;
    } catch (error) {
        const cached = await caches.match(request);
        return cached || caches.match(OFFLINE_URL);
    }
}

self.addEventListener('fetch', (event) => {
    const { request } = event;

    if (request.method !== 'GET') return;

    const url = new URL(request.url);

    // Leave cross-origin and sensitive/dynamic paths to the network.
    if (url.origin !== self.location.origin) return;
    if (isBypassed(url)) return;

    if (request.mode === 'navigate') {
        event.respondWith(networkFirst(request));
        return;
    }

    if (url.pathname.startsWith('/build/')) {
        event.respondWith(cacheFirst(request, ASSET_CACHE));
        return;
    }

    if (/^\/(fonts|images|videos)\//.test(url.pathname)) {
        event.respondWith(staleWhileRevalidate(request, MEDIA_CACHE));
    }
});
