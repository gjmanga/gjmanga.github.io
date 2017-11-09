importScripts('workbox-sw.prod.v2.1.1.js')

// Create Workbox service worker instance
const workboxSW = new WorkboxSW({ clientsClaim: true })
const cacheFirstStrategy = workboxSW.strategies.cacheFirst({cacheExpiration: {
      maxEntries: 2147483647,
      maxAgeSeconds: 2147483647
    }, cacheableResponse: {statuses: [0, 200]}});

// Placeholder array which is populated automatically by workboxBuild.injectManifest()
workboxSW.precache([
  {
    "url": "/index.html",
    "revision": "2e21ee29b6ab1b87eedd67976199d556"
  },
  {
    "url": "service-worker.js",
    "revision": "e3c4cac3f27d545ff5d4e7bb9e270213"
  },
  {
    "url": "/static/crypt.js",
    "revision": "ecefb8bbbdab4c01e39588d3f12b2e28"
  },
  {
    "url": "/static/css/app.d48922fa174e5c729206b5ac8f077652.css",
    "revision": "d48922fa174e5c729206b5ac8f077652"
  },
  {
    "url": "/static/img/icons/android-chrome-192x192.png",
    "revision": "fa651aecfc4c1f21fb9c7c0ec60974ed"
  },
  {
    "url": "/static/img/icons/android-chrome-512x512.png",
    "revision": "9b9c6c89c92e5bb841067944de3e466c"
  },
  {
    "url": "/static/img/icons/apple-touch-icon-120x120.png",
    "revision": "936d6e411cabd71f0e627011c3f18fe2"
  },
  {
    "url": "/static/img/icons/apple-touch-icon-152x152.png",
    "revision": "1a034e64d80905128113e5272a5ab95e"
  },
  {
    "url": "/static/img/icons/apple-touch-icon-180x180.png",
    "revision": "c43cd371a49ee4ca17ab3a60e72bdd51"
  },
  {
    "url": "/static/img/icons/apple-touch-icon-60x60.png",
    "revision": "9a2b5c0f19de617685b7b5b42464e7db"
  },
  {
    "url": "/static/img/icons/apple-touch-icon-76x76.png",
    "revision": "af28d69d59284dd202aa55e57227b11b"
  },
  {
    "url": "/static/img/icons/apple-touch-icon.png",
    "revision": "e06552396e954fc6ddabea07ba308492"
  },
  {
    "url": "/static/img/icons/favicon-16x16.png",
    "revision": "ab827c537ba95dc20585b5e8ceacc601"
  },
  {
    "url": "/static/img/icons/favicon-32x32.png",
    "revision": "499fb32654b66fcaa0b8d9729c1dbbbd"
  },
  {
    "url": "/static/img/icons/msapplication-icon-144x144.png",
    "revision": "b89032a4a5a1879f30ba05a13947f26f"
  },
  {
    "url": "/static/img/icons/mstile-150x150.png",
    "revision": "744b3f2c9bc3f0b7339082d73954177f"
  },
  {
    "url": "/static/js/app.1ec3aab6b6c65bca69ad.js",
    "revision": "4977d8433e07ec2f5f6004c526ba1e6b"
  },
  {
    "url": "/static/js/manifest.bdc772b6700e83c002f8.js",
    "revision": "c56a1e5e265ba585bd8d60af1ce41300"
  },
  {
    "url": "/static/js/vendor.79d79b0dd0c8e1ee7a00.js",
    "revision": "432c29be620a7101727b15acfc71186c"
  },
  {
    "url": "workbox-sw.prod.v2.1.1.js",
    "revision": "2a5638f9e33d09efc487b96804a0aa11"
  }
])


workboxSW.router.registerRoute(/^https:\/\/fonts\.googleapis\.com\//, cacheFirstStrategy)
workboxSW.router.registerRoute(/^https:\/\/fonts\.gstatic\.com\//, cacheFirstStrategy)
workboxSW.router.registerRoute(/^https:\/\/code\.getmdl\.io\//, cacheFirstStrategy)
workboxSW.router.registerRoute(/^https:\/\/(.+)\.(.+)\.blogspot\.com\//, cacheFirstStrategy)
workboxSW.router.registerRoute(/^http:\/\/(.+)\.(.+)\.blogspot\.com\//, cacheFirstStrategy)
workboxSW.router.registerRoute('https://www.googleapis.com/(.*)', cacheFirstStrategy)
workboxSW.router.registerRoute('http://www.googleapis.com/(.*)', cacheFirstStrategy)

self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  const title = 'Manga';
  const options = {
    body: 'New Manga has been uploaded.',
    icon: 'static/img/icons/android-chrome-512x512.png',
    badge: 'static/img/icons/android-chrome-512x512.png'
  };
  
  const notificationPromise = self.registration.showNotification(title, options);
  event.waitUntil(notificationPromise);
});
self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click Received.');

  event.notification.close();

  event.waitUntil(
    clients.openWindow('https://developers.google.com/web/')
  );
});