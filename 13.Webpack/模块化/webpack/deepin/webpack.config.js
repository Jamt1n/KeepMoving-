const { resolve } = require('path')

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        path: resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    // 当webpack遇到不能解析的模块时 webpack会找到module对象下面的rules 去匹配对应规则
    // 如果有对应规则匹配时 我们就使用对应的loader去解析
    module: {
        rules: [
            {
                test: /\.txt$/,
                use: 'raw-loader'
            }
        ]
    }
}
