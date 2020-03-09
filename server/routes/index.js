const renderer = require('@lib/renderer')

module.exports = (request, response, next) => {
	response.send(renderer.render('views/index.html'))
}
