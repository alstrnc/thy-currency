const CACHE_NAME = 'cache-v1'
const urlsToCache = ['/']

self.addEventListener('install', event => {
  const preload = caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  event.waitUntil(preload)
})

self.addEventListener('fetch', event => {
  const response = caches.match(event.request).then(match => match || fetch(event.request))
  event.respondWith(response)
})
