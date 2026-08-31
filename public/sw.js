const CACHE_NAME = 'ashish-portfolio-v3'
const OFFLINE_URL = '/offline'

const PRECACHE_URLS = [
    '/offline',
    '/manifest.json',
]

self.addEventListener('install', (event) => {
    self.skipWaiting()
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(PRECACHE_URLS)
        })
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
    // Only handle GET requests
    if (event.request.method !== 'GET') return

    // Network-first for navigation (HTML)
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

    // For build assets: Stale-While-Revalidate or Network-First to never lock on broken chunks
    if (event.request.url.includes('/build/assets/')) {
        event.respondWith(
            fetch(event.request).then((networkResponse) => {
                if (networkResponse && networkResponse.status === 200) {
                    const responseClone = networkResponse.clone()
                    caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone))
                }
                return networkResponse
            }).catch(() => caches.match(event.request))
        )
        return
    }

    // Default: network-first
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    )
})

