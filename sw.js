/**
 * Service Worker لتطبيق صدقة جارية
 * يوفر سرعة تحميل فورية ودعم التثبيت كـ PWA
 */

const CACHE_NAME = "sadqah-jaddi-v7";
const ASSETS_TO_CACHE = [
  "./",
  "./index.html",
  "./assets/css/style.css",
  "./assets/js/data.js",
  "./assets/js/azkar-data.js",
  "./assets/js/asmaa-allah-data.js",
  "./assets/js/nawawi-data.js",
  "./assets/js/islamic-guide-data.js",
  "./assets/js/extended-modules.js",
  "./assets/js/firebase-config.js",
  "./assets/js/app.js",
  "./assets/js/quran.js",
  "./assets/icon.svg",
  "./assets/share-preview.jpg",
  "./manifest.json",
  "https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Tajawal:wght@300;400;500;700;800;900&display=swap",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css",
  "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css",
  "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"
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

// استراتيجية جلب البيانات (Network First مع Cache Fallback الذكي لكافة الأصول)
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

  // التخزين المؤقت الذكي لملفات المصحف والأدعية والخطوط
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request)
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
          if (cachedResponse) return cachedResponse;
          if (event.request.headers.get("accept") && event.request.headers.get("accept").includes("text/html")) {
            return caches.match("./index.html");
          }
        });

      return cachedResponse || fetchPromise;
    })
  );
});
