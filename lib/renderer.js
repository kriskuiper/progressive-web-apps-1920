const Nunjucks = require('nunjucks')

const renderer = new Nunjucks.Environment(
	new Nunjucks.FileSystemLoader('src')
)

module.exports = renderer
