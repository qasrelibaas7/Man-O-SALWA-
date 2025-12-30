const cacheName = 'man-o-salwa-v1';
const filesToCache = [
    '/',
    'index.html',
    'styles.css',
    'script.js',
    'manifest.json',
    'images/logo.png',
    'images/banner.jpg',
    // Add more images
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName).then(cache => cache.addAll(filesToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => response || fetch(event.request))
    );
});
