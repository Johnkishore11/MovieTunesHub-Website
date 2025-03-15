const CACHE_NAME = "ai-tour-guider-v2";
const STATIC_CACHE_URLS = [
    "/",
    "/index.html",
    "/offline.html",
    "/manifest.json",
    "/favicon.ico",
    "/assets/icons/icon-192x192.png",
    "/assets/icons/icon-512x512.png",
    "/src/styles/index.css",
    "/src/index.js"
];

// Install Service Worker
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(STATIC_CACHE_URLS);
        })
    );
    self.skipWaiting(); // Forces activation immediately
});

// Fetch Event - Implements Stale-While-Revalidate
self.addEventListener("fetch", (event) => {
    if (event.request.method !== "GET") return;

    // Avoid caching API requests (GraphQL, REST, etc.)
    if (event.request.url.includes("/api/")) {
        return fetch(event.request);
    }

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) return cachedResponse;

            return fetch(event.request)
                .then((networkResponse) => {
                    return caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                })
                .catch(() => caches.match("/offline.html"));
        })
    );
});

// Activate - Removes Old Caches
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
    self.clients.claim(); // Ensures new service worker takes control immediately
});
