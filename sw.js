/**
 * Service Worker لتطبيق صدقة جارية
 * يوفر سرعة تحميل فورية ودعم التثبيت كـ PWA
 */

const CACHE_NAME = "sadqah-jaddi-v1";
const ASSETS_TO_CACHE = [
  "./",
  "./index.html",
  "./assets/css/style.css",
  "./assets/js/data.js",
  "./assets/js/azkar-data.js",
  "./assets/js/firebase-config.js",
  "./assets/js/app.js",
  "./assets/js/quran.js",
  "./assets/share-preview.jpg",
  "./manifest.json"
];

// مرحلة التثبيت وتخزين الملفات الأساسية
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch(err => {
        console.warn("Some static assets failed to cache:", err);
      });
    })
  );
  self.skipWaiting();
});

// مرحلة التفعيل وحذف الكاش القديم
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// استراتيجية جلب البيانات (Network First with Cache Fallback)
self.addEventListener("fetch", (event) => {
  // تجاهل طلبات الفيربيز والبث المباشر
  if (
    event.request.url.includes("firebaseio.com") ||
    event.request.url.includes("stream.zeno.fm") ||
    event.request.url.includes("qurango.net") ||
    event.request.url.includes("chrome-extension")
  ) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200 && event.request.method === "GET") {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          if (event.request.headers.get("accept").includes("text/html")) {
            return caches.match("./index.html");
          }
        });
      })
  );
});
