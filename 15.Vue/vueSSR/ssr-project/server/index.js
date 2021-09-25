const path = require('path')
const app = new (require('koa'))()
const router = new (require('koa-router'))()
const server = require('koa-static')
const mount = require('koa-mount')
const { renderToString } = require("@vue/server-renderer")
const manifest = require('../dist/server/ssr-manifest.json')
const appPath = path.join(__dirname, '../dist/server', manifest['app.js'])
const htmlTemplate = require('fs').readFileSync('./ssr-project/dist/client/index.html', "utf-8")

const createApp = require(appPath).default

// app.use(server('/assets', path.resolve(__dirname, '../dist/client/assets')))

// app.use(server(path.resolve(__dirname, '../dist/client')))

app.use(mount('/css', server(path.resolve(__dirname, '../dist/client/css'))))
app.use(mount('/js', server(path.resolve(__dirname, '../dist/client/js'))))

router.get('/(.*)', async ctx => {
	// console.log("manifest", manifest['app.js'])
	const { app, router: vueRouter } = createApp()
	// console.log("createApp", createApp)
	// console.log("app", app)

	// ctx.url 实际上就是后端接收到的请求地址 -> 路由地址
	await vueRouter.push(ctx.url)
	// 与 client 端相同 等待路由挂载完毕
	await vueRouter.isReady()

	const appContent = await renderToString(app)

	ctx.body = htmlTemplate.replace(
		'<div id="app">',
		`<div id="app">${appContent}`
	)
})

app.use(router.routes())
app.listen(2233, () => {
	console.log("http://localhost:2233 服务已启动")
})
