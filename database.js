self.addEventListener("install", e=>{
  e.waitUntil(
    caches.open("sksa-cache").then(cache=>{
      return cache.addAll([
        "./index.html",
        "./database.js",
        "./manifest.json",
        "./app-icon-192.png",
        "./app-icon-512.png"
      ]);
    })
  );
});

self.addEventListener("fetch", e=>{
  e.respondWith(
    caches.match(e.request).then(res=>{
      return res || fetch(e.request);
    })
  );
});
