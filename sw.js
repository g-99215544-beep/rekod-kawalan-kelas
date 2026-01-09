self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('sksa-cache-v1').then(cache => {
      return cache.addAll([
        '/index_full.html',
        '/database.js',
        '/manifest.json',
        '/app-icon-192.png',
        '/app-icon-512.png'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
