// Florence PWA — service worker (cache-first, offline-ready)
const CACHE = 'florence-v2';

const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './fonts/fonts.css',
  './icons/icon.svg',
  './icons/icon-180.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './fonts/cormorant-garamond-400-italic-latin.woff2',
  './fonts/cormorant-garamond-400-italic-latin-ext.woff2',
  './fonts/cormorant-garamond-400-normal-latin.woff2',
  './fonts/cormorant-garamond-400-normal-latin-ext.woff2',
  './fonts/cormorant-garamond-500-italic-latin.woff2',
  './fonts/cormorant-garamond-500-italic-latin-ext.woff2',
  './fonts/cormorant-garamond-500-normal-latin.woff2',
  './fonts/cormorant-garamond-500-normal-latin-ext.woff2',
  './fonts/cormorant-garamond-600-normal-latin.woff2',
  './fonts/cormorant-garamond-600-normal-latin-ext.woff2',
  './fonts/cormorant-garamond-700-normal-latin.woff2',
  './fonts/cormorant-garamond-700-normal-latin-ext.woff2',
  './fonts/inter-300-normal-latin.woff2',
  './fonts/inter-300-normal-latin-ext.woff2',
  './fonts/inter-400-normal-latin.woff2',
  './fonts/inter-400-normal-latin-ext.woff2',
  './fonts/inter-500-normal-latin.woff2',
  './fonts/inter-500-normal-latin-ext.woff2',
  './fonts/inter-600-normal-latin.woff2',
  './fonts/inter-600-normal-latin-ext.woff2'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((res) => {
        if (!res || res.status !== 200 || res.type === 'opaque') return res;
        const copy = res.clone();
        caches.open(CACHE).then((cache) => cache.put(req, copy));
        return res;
      }).catch(() => caches.match('./index.html'));
    })
  );
});
