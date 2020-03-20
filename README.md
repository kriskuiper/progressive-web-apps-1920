# Launcher, but static
> A follow up of the [Launcher project]() but I now made it into a static site generator, also it is a Progressive Web App.

## Feedback points
1. Could you please take a look at `src/static/service-worker.js` and see if I'm on the right way? :)
2. I probably do want a bit more of a challenge but don't really know what's achievable before the grading could we talk about that?
3. Is there any way for the service-worker to be cleaned up so that I don't have to do all kinds of checks in the fetch handler like

```js
if (isHTMLGetRequest(request)) {
	// do awesome things with HTML
} else if (...) {
	/* etc */
}
```

## Installation
```bash
# Clone the repo
git clone https://github.com/kriskuiper/progressive-web-apps-1920.git

# Install dependencies
npm install

# Run a build to use the latest data, builds static HTML files from
# the data of the SpaceX API
npm run build

# Open up a development server on port 3031
npm run dev
```
