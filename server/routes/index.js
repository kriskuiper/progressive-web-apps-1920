const fetch = require('node-fetch')
const renderer = require('@lib/renderer')
const { API_ENDPOINT } = require('@lib/constants')

module.exports = async (request, response, next) => {
	try {
		const apiResponse = await fetch(API_ENDPOINT)
		const launches = await apiResponse.json(apiResponse)

		response.send(renderer.render('views/index.html', { launches }))
	} catch(error) {
		next(error)
	}
}
