importScripts('workbox-sw.prod.v2.1.1.js')

// Create Workbox service worker instance
const workboxSW = new WorkboxSW({ clientsClaim: true })
const cacheParams = (name) => {
return {
    cacheName: name,
    cacheExpiration: {
        maxEntries: 2147483647,
        maxAgeSeconds: 2147483647
    }, cacheableResponse: {statuses: [0, 200]}}
}
const cacheFirstStrategy = (name) => workboxSW.strategies.cacheFirst(cacheParams(name))
const networkFirstStrategy = (name) => workboxSW.strategies.networkFirst(cacheParams(name))


// Placeholder array which is populated automatically by workboxBuild.injectManifest()
workboxSW.precache([
  {
    "url": "/index.html",
    "revision": "0fc83a95c515f4219fbcc525956c753d"
  },
  {
    "url": "service-worker.js",
    "revision": "ec5e5d5cbed4712a1cdffbd460df2330"
  },
  {
    "url": "/static/crypt.js",
    "revision": "ecefb8bbbdab4c01e39588d3f12b2e28"
  },
  {
    "url": "/static/css/app.eb8a9283ead4f4d743c99fc48ea0c596.css",
    "revision": "eb8a9283ead4f4d743c99fc48ea0c596"
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
    "url": "/static/js/app.d4de700545a1405eb544.js",
    "revision": "b193f290e780a7e74b117886a629117c"
  },
  {
    "url": "/static/js/manifest.83bd081c9a8c7d72a062.js",
    "revision": "99ec2117f4d0b3940417cb2ea7dbba61"
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


workboxSW.router.registerRoute(/^https:\/\/fonts\.googleapis\.com\//, cacheFirstStrategy('static-resource'))
workboxSW.router.registerRoute(/^https:\/\/fonts\.gstatic\.com\//, cacheFirstStrategy('static-resource'))
workboxSW.router.registerRoute(/^https:\/\/code\.getmdl\.io\//, cacheFirstStrategy('static-resource'))
workboxSW.router.registerRoute(/^https:\/\/(.+)\.(.+)\.blogspot\.com\//, cacheFirstStrategy('manga-images'))
workboxSW.router.registerRoute(/^http:\/\/(.+)\.(.+)\.blogspot\.com\//, cacheFirstStrategy('manga-images'))
workboxSW.router.registerRoute('https://www.googleapis.com/(.*)', networkFirstStrategy('blog-content'))
workboxSW.router.registerRoute('http://www.googleapis.com/(.*)', networkFirstStrategy('blog-content'))

self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  const title = 'Jap Manga Club';
  const options = {
    body: '新漫畫上架！點此瀏覽更多',
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