const PRECACHE_NAME = 'launcher-precache'
const RUNTIME_CACHE_NAME = 'launcher-runtime-cache'
const HTML_CACHE_NAME = 'launcher-html-cache'
const PRECACHE_ASSETS = ['/styles/app.css', '/offline.html']

// Precache some static assets
self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(PRECACHE_NAME)
			.then(cache => cache.addAll(PRECACHE_ASSETS))
			.then(() => self.skipWaiting())
	)
})

/**
 * Remove outdated caches
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
			.then(() => self.clients.claim())
	)
})

// Serve assets from cache
self.addEventListener('fetch', (event) => {
	// If some asset is cached, serve from cache, else, put the current file
	// in cache and serve just the request url
	const { request } = event

	event.respondWith(
		fetchAndCache(request, HTML_CACHE_NAME)
	)
})

function fetchAndCache(request, cacheName) {
	return fetch(request.url)
		.then(response => {
			if (!response.ok) {
				throw new TypeError('Bad response status!')
			}

			caches.open(cacheName)
				// You can't fiddle with the original response because
				// of how things work, so we have to clone the response.
				.then(
					cache => cache.put(request, response.clone())
						.then(() => response)
				)
		})
}

function isCoreGetRequest(request) {
	return request.method === 'GET' && PRECACHE_ASSETS.includes(getPathName(request))
}

function getPathName(request) {
	const url = new URL(request.url)

	return url.pathname
}


