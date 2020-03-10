#!/usr/bin/env node

const { YOUTUBE_EMBED_URL } = require('../lib/constants')
const renderer = require('../lib/renderer')
const writeHTML = require('../lib/write-html')

buildPages()

async function buildPages() {
	const launches = require('../dist/data')
	const indexPageMarkup = renderer.render('views/index.html', { launches, title: 'Launches' })
	const detailPagePromises = launches.map(launch => {
		const launchMarkup = renderer.render('views/detail.html', {
			launch,
			title: launch.mission_name,
			yt_prefix: YOUTUBE_EMBED_URL
		})
		return writeHTML(`/launches/${launch.flight_number}`, launchMarkup)
	})

	await Promise.all(detailPagePromises)
	await writeHTML('', indexPageMarkup)
}
