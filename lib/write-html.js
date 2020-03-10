const { promisify } = require('util')
const mkdir = require('mkdirp')
const writeFile = promisify(require('fs').writeFile)
const path = require('path')

module.exports = async (dirName = '', markup) => {
	const dir = path.join(__dirname, `../dist/${dirName}`)
	const filePath = path.join(dir, 'index.html')

	return new Promise((resolve, reject) => {
		mkdir(dir)
			.then(() => writeFile(filePath, markup))
			.then(() => {
				console.log(`📘 Written HTML for ${dirName || 'index page'}`)
				resolve()
			})
			.catch(error => {
				reject(error)
			})
	})
}
