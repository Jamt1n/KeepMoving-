const { resolve } = require('path')

module.exports = {
	mode: 'production', // 切换代码环境
	entry: './index.js',
	output: {
		path: resolve(__dirname, 'dist'),
		filename: '[name].js'
	},
	optimization: {
		usedExports: true
	}
}
