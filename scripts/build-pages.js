#!/usr/bin/env node

const renderer = require('../lib/renderer')
const writeHTML = require('../lib/write-html')

buildPages()

async function buildPages() {
	const launches = require('../dist/data')
	const indexPageMarkup = renderer.render('views/index.html', { launches })
	const detailPagePromises = launches.map(launch => {
		const launchMarkup = renderer.render('views/detail.html', { launch })
		return writeHTML(`/launches/${launch.flight_number}`, launchMarkup)
	})

	await Promise.all(detailPagePromises)
	await writeHTML('', indexPageMarkup)
}
