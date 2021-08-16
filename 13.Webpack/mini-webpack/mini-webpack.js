const fs = require('fs')
const babelParser = require('@babel/parser')
const traverse = require('@babel/traverse').default


// 解析依赖信息
const createAsset = (filePath) => {
    // 读取文件方法(同步)
    const content = fs.readFileSync(filePath, 'utf-8');
    // 创建文件对应的ast 需要设置sourceType
    const ast = babelParser.parse(content, {
        // 解析对应esm模块代码
        sourceType: "module"
    })


    // 遍历ast语法树的方法
    traverse(ast, {
        // 当我们读取到的ast当中 每有一个import 就会执行一次此方法
        ImportDeclaration(specifiers) {
            // specifiers ImportDeclaration 结构描述对象
            console.log(specifiers)
        }
    })
}

// 拿到入口文件 依赖 创建出完整的依赖图
createAsset('./index.js')
