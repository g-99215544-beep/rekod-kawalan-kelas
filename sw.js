const CACHE_NAME = 'sksa-pemantauan-v32';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './app-icon-192.png',
  './app-icon-512.png',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap'
];

// Listen for SKIP_WAITING message
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('Received SKIP_WAITING message, activating new version...');
    self.skipWaiting();
  }
});

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache dibuka v32');
        return cache.addAll(urlsToCache);
      })
  );
  // Skip waiting immediately for faster updates
  self.skipWaiting();
});

// Activate event
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Padam cache lama:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - Network first, fallback to cache
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Clone response untuk cache
        if (response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        return caches.match(event.request);
      })
  );
});
