const { terser } = require('rollup-plugin-terser')

module.exports = [
	{
		input: 'src/static/scripts/index.js',
		output: {
			file: 'dist/scripts/bundle.js'
		},
		plugins: [
			terser()
		]
	},
	{
		input: 'src/static/service-worker.js',
		output: {
			file: 'dist/service-worker.js'
		}
	}
]
