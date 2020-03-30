# A static site generator and PWA, built from scratch
> A follow up of the [Launcher project](https://github.com/kriskuiper/web-app-from-scratch-1920) but I now made it into a static site generator, also it is a Progressive Web App.

## Description
This project is based on the [Web apps from scratch repo](https://github.com/kriskuiper/web-app-from-scratch-1920) but I've built it into a static site generator. 

Instead of using client-side JavaScript to bootstrap all markup of the application all markup is now prebuild when running `npm run build`.

## Installation
```bash
# Clone the repo
git clone https://github.com/kriskuiper/progressive-web-apps-1920.git

# Install dependencies
npm install

# Run a build to use the latest data, builds static HTML files from
# the data of the SpaceX API
npm run build

# Open up a development server on localhost:3031
npm run dev
```

## 1. Client-side rendering vs. server-side rendering vs. a static site generator

### Client-side rendering
When doing client-side rendering you use JavaScript to put markup into the document. Therefore your JavaScript code first has to be downloaded and parsed before the user can see anything.

#### Pros
- The application can be easily be built into something very interactive
- Makes the website feel more like a native app, which is a good thing apperently :man_shrugging:

#### Cons
- The application doesn't work at all when JavaScript is unavailable for some reason
- You make it harder for Google to index your site, so byebye SEO :wave:
- Parsing JavaScript is very cumbersome for a browser, so when having a bad connection, loading the _first contentful paint_ can take a lot of time

#### When would I use client-side rendering?
I'd use this when building some kind of internal application for a company. Something like an analytics dashboard of some kind or a web application for the Human Resources department. You don't need Google to index this dashboard thing because it's merely a tool for internal use. Also you can do more assumptions about the context of use, internet connections etc.

### Server-side rendering
With server-side rendering the browser does a lookup to some server to know how the page should be rendered. Beware that it does this on every page refresh, even if the page itself isn't changed.

#### Pros
- You can progressively enhance almost everything by leaning on browser capabilities as much as possible
- You've got pretty good SEO out of the box since the server sends a built-out HTML file to the browser
- Building the front-end of a server-side rendered application is pretty simple compared to the other two in this list when doing it from scratch
- I tend to lean more towards using all of the browser capabilities instead (or before) building some fancy feature with JavaScript

#### Cons
- You have to maintain a server
- The server parses the page on every page refresh, even when content hasn't changed, this seems unecessary
- Dealing with a lot of traffic can become a pain because you have to scale the (amount of) servers you use accordingly
- A server-side rendered application can be more prone to network issues (doesn't have to be when you're using a service worker, more on that later)

#### When would I use server-side rendering?
I'd use this when the content of an application changes a lot and the application needs the SEO pros. Also I think you have to check if the client has the money to manage the servers, since that's not something I'd want to do as a front-end developer.

### Static site generator / static-rendering?
The way a static site generator works is that you write some scripts that use data to write html files in a folder-like structure. After a so called 'build' is finished you can serve the application via a CDN service like Now or Netlify because al you're serving are plain HTML files. It is a bit like using FTP but the whole building process is automated by you, the front-end developer.

#### Pros
- Serving static files is the fastest way to serve a web page to a user
- You can still have some server-side functionality by making use of [serverless functions](https://zeit.co/docs/v2/serverless-functions/introduction)
- Static files get served, this means no problems with SEO :thumbs_up:
- You (almost) have got total control over performance optimalizations of the website :rocket:

#### Cons
- It takes a lot of configuration to get the whole flow of updating a static website working since you have to automate a lot of things
- When doing a lot of things during build time, the build process can take up a lot of time which can lead to issues at your CDN service

#### When would I use static-rendering?
I'd make use of this technique when the content of a website doesn't change that often and performance is key. A small e-commerce website without a frequently updating stock would be a good candidate in my opinion.

## 2. Using a service worker
> For the full implementation, go to [the service-worker file]()

This application heavily uses a service-worker so the application also works offline and files can be served from cache instead of having to go to the server every time.

### What is a service worker?
In short a web worker is a web worker that makes use of browser cache and can intercept network requests. You can use it to cache files and make your website or application work offline.

### Pre-caching assets
We've got three assets (CSS, JS and an offline page) that we know the user definately needs, now and in the future, so we can tell the service worker to put them in the cache during the install event:

```js
self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(PRECACHE_NAME)
			.then(cache => cache.addAll(PRECACHE_ASSETS))
			.then(() => self.skipWaiting())
	)
})
```

### Dynamically cache pages
When a user navigates to a different page we can also intercept that request and put the html file in the cache we can serve the page from cache the next time the user visits the page instead of having to do a network request:

```js
self.addEventListener('fetch', (event) => {
	// If some asset is cached, serve from cache, else, put the current file
	// in cache and serve just the request url
	const { request } = event

	if (isCoreGetRequest(request)) {
		event.respondWith(
			caches.open(PRECACHE_NAME)
				.then(cache => cache.match(request.url))
		)
	} else if (isHtmlGetRequest(request)) {
		event.respondWith(
			caches.open(RUNTIME_CACHE_NAME)
				.then(cache => cache.match(request.url))
				.then(response => response || fetchAndCache(request, RUNTIME_CACHE_NAME))
				.catch(error => {
					console.error(error)

					return caches.open(PRECACHE_NAME)
						.then(cache => cache.match('/offline.html'))
				})
		)
	}
})
```

### Giving feedback if a user has no or a flaky internet connection
Since we're using a service worker to intercept network requests, we can also give the user feedback when they're offline. If the page the user visits is available in cache, we can just serve that page straight from cache. However, if a user did not visit the page and is offline while trying to visit it we can still give some feedback by telling them they're offline by using the offline page which is always in cache since it's a precached asset.

### Cache invalidation and file revisioning
When updating for example the CSS of the application, you have to tell the browser that it has to invalidate the cached version and use the new version of the file. This is where file revisioning comes into play.

Every pre-cached file gets a newly created hash when It's updated. During build time, when the file is not byte-to-byte the same, the hash gets updated and all references to the file get updated too, including those in the service worker.

This way the browser always uses the latest version of the CSS file and therefore the styling is always up to date. This is the same for the JavaScript file of the application.

## 3. Optimizing the critical rendering path


## Project wishlist
- [ ] Make a src/pages folder map the output a la Gatsby or Nuxt instead of having to fiddle around with the `build-pages` script when the content of the application changes.
