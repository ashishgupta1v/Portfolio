const CACHE_NAME = 'ashish-portfolio-v2'
const OFFLINE_URL = '/offline'

const PRECACHE_URLS = [
    '/',
    '/offline',
    '/manifest.json',
]

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(PRECACHE_URLS)
        }).then(() => self.skipWaiting())
    )
})

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name !== CACHE_NAME)
                    .map((name) => caches.delete(name))
            )
        }).then(() => self.clients.claim())
    )
})

self.addEventListener('fetch', (event) => {
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request).catch(() => {
                return caches.match(OFFLINE_URL).then((response) => {
                    return response || new Response('Offline', {
                        status: 503,
                        headers: { 'Content-Type': 'text/html' },
                    })
                })
            })
        )
        return
    }

    // For assets: cache-first strategy
    if (event.request.destination === 'style' ||
        event.request.destination === 'script' ||
        event.request.destination === 'image' ||
        event.request.destination === 'font') {
        event.respondWith(
            caches.match(event.request).then((cached) => {
                if (cached) return cached
                return fetch(event.request).then((response) => {
                    if (response.ok) {
                        const clone = response.clone()
                        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone))
                    }
                    return response
                }).catch(() => new Response('', { status: 408 }))
            })
        )
        return
    }

    // Default: network-first
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    )
})
