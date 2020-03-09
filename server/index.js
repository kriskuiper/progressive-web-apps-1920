require('module-alias/register')

const express = require('express')
const { PORT } = require('@lib/constants')

const app = express()

app.get('/', require('@routes/index'))

app.use(require('@routes/not-found'))
app.use(require('@routes/error'))

app.listen(PORT, () => {
	console.log(`Development server available on http://localhost:${PORT}`)
})
