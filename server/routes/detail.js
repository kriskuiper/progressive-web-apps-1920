const fetch = require('node-fetch')
const renderer = require('@lib/renderer')
const { API_ENDPOINT, YOUTUBE_EMBED_URL } = require('@lib/constants')

module.exports = async (request, response, next) => {
	const { id } = request.params

	try {
		const apiResponse = await fetch(`${API_ENDPOINT}/${id}`)
		const launch = await apiResponse.json()

		response.send(renderer.render('views/detail.html', {
			launch,
			yt_prefix: YOUTUBE_EMBED_URL,
			title: launch.mission_name
		}))
	} catch(error) {
		next(error)
	}
}
