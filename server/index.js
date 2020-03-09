require('module-alias/register')

const express = require('express')
const { PORT } = require('@lib/constants')

const app = express()

app.get('/', require('@routes/index'))

app.listen(PORT, () => {
	console.log(`Development server available on http://localhost:${PORT}`)
})
