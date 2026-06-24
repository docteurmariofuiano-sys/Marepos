/* =====================================================================
   DERMATO MG — service worker (mode hors-ligne)
   Stratégie : pré-cache de la coquille à l'installation, puis
   "cache d'abord" avec mise à jour en arrière-plan (stale-while-revalidate).
   Incrémenter CACHE à chaque modification des fichiers pour rafraîchir.
   ===================================================================== */
'use strict';
const CACHE = 'dermato-mg-v3';
const ASSETS = [
  './',
  './index.html',
  './style.css?v=1',
  './data.js?v=1',
  './photos.js?v=1',
  './app.js?v=1',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => c.addAll(ASSETS))
      .then(() => self.skipWaiting())
      .catch(() => {/* installation tolérante : un asset manquant ne bloque pas */})
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  e.respondWith(
    caches.match(req).then((cached) => {
      const network = fetch(req).then((res) => {
        // ne met en cache que les réponses valides de même origine
        if (res && res.ok && new URL(req.url).origin === self.location.origin) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
        }
        return res;
      }).catch(() => cached);
      return cached || network;
    })
  );
});
