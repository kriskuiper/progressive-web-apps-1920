#!/usr/bin/env node

const fetch = require('node-fetch')
const writeJSON = require('../lib/write-json')
const { API_ENDPOINT } = require('../lib/constants')

writeData()

async function writeData() {
	try {
		const response = await fetch(API_ENDPOINT)
		const data = await response.json()

		await writeJSON('', data)
	} catch(error) {
		console.error(error)
	}
}
