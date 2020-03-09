const Nunjucks = require('nunjucks')

const renderer = new Nunjucks.Environment(
	new Nunjucks.FileSystemLoader('client')
)

module.exports = renderer
