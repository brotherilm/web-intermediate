const staticCacheName = "site-static-v1"; // Jangan ubah versi tanpa alasan yang jelas
const dynamicCacheName = "site-dynamic-v1";
const assets = [
  "/",
  "/index.html",
  "/manifest.json",
  "/favicon.png",
  "/scripts/index.js",
  "/scripts/pages/app.js",
  "/scripts/routes/routes.js",
  "/scripts/routes/url-parser.js",
  "/scripts/utils/auth.js",
  "/scripts/utils/navbar.js",
  "/styles/style.css",
  "/public/icons/icon-192x192.png",
  "/public/icons/icon-512x512.png",
  "/offline.html",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://fonts.googleapis.com/css2?family=Creepster&family=Bitter:wght@400;700&family=Special+Elite&display=swap",
  "https://fonts.gstatic.com/s/materialicons/v47/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2",
];

// Halaman fallback jika konten tidak tersedia offline
const fallbackPage = "/offline.html";

// Batasi ukuran cache
const limitCacheSize = (cacheName, size) => {
  caches.open(cacheName).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(cacheName, size));
      }
    });
  });
};

// install event
self.addEventListener("install", (evt) => {
  console.log("Service worker installed");
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log("Caching shell assets");
      return cache.addAll(assets).catch((error) => {
        console.error("Failed to cache assets:", error);
        // Lanjutkan instalasi meskipun gagal cache beberapa item
        return null;
      });
    })
  );
});

// activate event - cleanup old caches
self.addEventListener("activate", (evt) => {
  console.log("Service worker activated");
  evt.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== staticCacheName && key !== dynamicCacheName)
          .map((key) => {
            console.log("Deleting old cache:", key);
            return caches.delete(key);
          })
      );
    })
  );

  // Gunakan clients.claim() hanya jika benar-benar diperlukan
  // Ini bisa menyebabkan reload jika tidak dikelola dengan baik
  // return self.clients.claim();
});

// fetch event - cache with network fallback strategy
self.addEventListener("fetch", (evt) => {
  // Skip untuk permintaan non-GET dan non-HTTP/HTTPS URLs
  if (evt.request.method !== "GET" || !evt.request.url.startsWith("http")) {
    return;
  }

  // Skip caching untuk permintaan API dan analytics
  if (
    evt.request.url.includes("/api/") ||
    evt.request.url.includes("/analytics/") ||
    evt.request.url.includes("/socket.io/")
  ) {
    return evt.respondWith(fetch(evt.request));
  }

  evt.respondWith(
    caches.match(evt.request).then((cacheRes) => {
      return (
        cacheRes ||
        fetch(evt.request)
          .then((fetchRes) => {
            // Pastikan respons valid sebelum di-cache
            if (
              !fetchRes ||
              fetchRes.status !== 200 ||
              fetchRes.type !== "basic"
            ) {
              return fetchRes;
            }

            return caches.open(dynamicCacheName).then((cache) => {
              // Simpan salinan respons di cache
              cache.put(evt.request.url, fetchRes.clone());
              // Limit ukuran cache dinamis
              limitCacheSize(dynamicCacheName, 30);
              return fetchRes;
            });
          })
          .catch(() => {
            // Fallback untuk HTML requests ketika offline
            if (
              evt.request.headers.get("accept") &&
              evt.request.headers.get("accept").includes("text/html")
            ) {
              return caches.match(fallbackPage);
            }
          })
      );
    })
  );
});

// Tambahkan event untuk menerima pesan dari main thread
self.addEventListener("message", (event) => {
  if (event.data && event.data.action === "skipWaiting") {
    console.log("Skipping waiting and activating new service worker");
    self.skipWaiting();
  }
});
