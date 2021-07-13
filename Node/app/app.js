// 使用 Node.js 内置 require 方法引入核心模块 -> http
const http = require('http');

// const server = new http.Server();
// 和new的方式没有区别
const server = http.createServer();

// 注册request事件回调函数，当有客户端连接请求被监听到的时候执行回调
server.on('request', (req,res)=> {
    console.log('有客户端请求');
    // 写入数据
    // res.write('hello')
    // 结束数据写入
    // res.end()

    // 也可以直接调用
    res.end('Hello')
})

// 指定当前 Server 需要监听的主机
server.listen(8888, '0.0.0.0', () => {
    console.log(`服务器启动成功`);
});
