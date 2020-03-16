const PRECACHE_NAME = 'launcher-precache'
const RUNTIME_CACHE_NAME = 'launcher-runtime-cache'
const PRECACHE_URIS = [
	'/styles/app.css',
	'/scripts/bundle.js'
]

// Precache some static assets
self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(PRECACHE_NAME)
			.then(cache => cache.addAll(PRECACHE_URIS))
			.then(() => self.skipWaiting())
	)
})

/**
 * Removing outdated caches
 * https://developers.google.com/web/ilt/pwa/caching-files-with-service-worker#removing_outdated_caches
 */
self.addEventListener('activate', (event) => {
	const activeCaches = [PRECACHE_NAME, RUNTIME_CACHE_NAME]

	event.waitUntil(
		caches.keys()
			.then(cacheNames => {
				return Promise.all(
					cacheNames
						.filter(cacheName => !activeCaches.includes(cacheName))
						.map(cacheName => caches.delete(cacheName))
				)
			})
	)
})

// Serve assets from cache
// self.addEventListener('fetch', (event) => {
// 	// If some asset is cached, serve from cache, else, put the current file
// 	// in cache and serve just the request url
// 	const { request } = event

// 	event.respondWith(

// 	)
// })
