const fetch = require('node-fetch')
const renderer = require('@lib/renderer')
const { API_ENDPOINT } = require('@lib/constants')

module.exports = async (request, response, next) => {
	const { id } = request.params

	try {
		const apiResponse = await fetch(`${API_ENDPOINT}/${id}`)
		const launch = await apiResponse.json()

		response.send(renderer.render('views/detail.html', { launch }))
	} catch(error) {
		next(error)
	}
}
