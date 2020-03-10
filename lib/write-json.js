const { promisify } = require('util')
const mkdir = require('mkdirp')
const writeFile = promisify(require('fs').writeFile)
const path = require('path')

module.exports = async (dirName, data) => {
	const dir = path.join(__dirname, `../dist/data/${dirName}`)
	const filePath = path.join(dir, 'index.json')

	return new Promise((resolve, reject) => {
		mkdir(dir)
			.then(() => writeFile(filePath, JSON.stringify(data), 'utf-8'))
			.then(() => {
				console.log(`😃 written json data`)
				resolve()
			})
			.catch(error => {
				reject(error)
			})
	})
}
