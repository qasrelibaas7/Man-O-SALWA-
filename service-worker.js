const CACHE_NAME = "man-o-salwa-cache-v1";
const urlsToCache = [
    "./index.html",
    "./css/style.css",
    "./js/main.js",
    "./js/firebase.js",
    "./js/maps.js",
    "./manifest.json",
    "./images/logo.png"
    // Add more food images if needed
];

// Install SW and cache files
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log("Opened cache");
            return cache.addAll(urlsToCache);
        })
    );
});

// Activate SW
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(name => {
                    if (name !== CACHE_NAME) {
                        return caches.delete(name);
                    }
                })
            );
        })
    );
});

// Fetch requests
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});