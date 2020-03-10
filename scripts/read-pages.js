const path = require('path')
const readdir = require('fs').readdir
const fileStatus = require('fs').statSync

const baseDir = path.join(__dirname, '../src/pages')
const files = readdir(baseDir)

buildPages(files)

async function buildPages(files) {
	for (file in files) {

		if (fileStatus(file).isDirectory()) {
			buildPages(file)
		}

		else {
			// Gebruik de template om dingen te renderen?
			// Of is het niet zo simpel?
		}

	}
}
