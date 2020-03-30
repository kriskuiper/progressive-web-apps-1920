const { src, dest, series } = require('gulp')
const rev = require('gulp-rev')
const revRewrite = require('gulp-rev-rewrite')

series(
	revision,
	rewriteIndexPage,
	rewriteDetailPages,
	rewriteServiceWorker
)()

function revision() {
	return src(['dist/styles/*.css', 'dist/scripts/*.js'], { base: 'dist' })
		.pipe(dest('dist'))
		.pipe(rev())
		.pipe(dest('dist'))
		.pipe(rev.manifest())
		.pipe(dest('dist/assets'))
}

function rewriteIndexPage() {
	const manifest = src('dist/assets/rev-manifest.json')

	return src('dist/*.html')
		.pipe(revRewrite({ manifest }))
		.pipe(dest('dist'))
}

function rewriteDetailPages() {
	const manifest = src('dist/assets/rev-manifest.json')

	return src('dist/**/**/index.html')
		.pipe(revRewrite({ manifest }))
		.pipe(dest('dist'))
}

function rewriteServiceWorker() {
	const manifest = src('dist/assets/rev-manifest.json')

	return src('dist/service-worker.js')
		.pipe(revRewrite({ manifest }))
		.pipe(dest('dist'))
}

