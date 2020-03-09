require('module-alias/register')

const path = require('path')
const express = require('express')
const { PORT } = require('@lib/constants')

const app = express()

app.get('/', require('@routes/index'))
app.get('/:id', require('@routes/detail'))

app.use(express.static(path.join(__dirname, '../client/static')))
app.use(require('@routes/not-found'))
app.use(require('@routes/error'))

app.listen(PORT, () => {
	console.log(`Development server available on http://localhost:${PORT}`)
})
