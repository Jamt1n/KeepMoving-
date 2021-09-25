## 2021-08-20 直播答疑

### 问题答疑

| 3.问题详细描述                                               |
| ------------------------------------------------------------ |
| 1、第六章第四节示例，因为初始化赋值没有加state属性所以点completed无反应，这个是不是因为对象不是响应式的，所以用obj.prop增加属性不响应呢？用ξnextTick会不会有用呢？ <br />2、watch监听一个数组，加了immediate：true，但是在handler中对这个数组又进行了赋值。开发环境运行，页面能正常渲染，只是控制台有针对此代码的warning。但生产环境整个页面加载不出来。这俩环境有什么差异吗？ |
| 针对作业需求的展开，vue-router是否可以实现根据是否登陆对login/edit两个链接进行显示/隐藏，另外如果登陆了，url里的login可以重定向到edit, 反之edit可以重定向到login (Login.vue和Edit.vue是否只能通过Event Bus和vuex store的方式修改App.vue中的显示状态？) |

### 服务端渲染

#### 当下困境

SPA页面首屏渲染速度较差且SEO优化差。

#### 什么是SSR？

简单来说就是将组件或者页面通过服务器生成html字符串再发送到浏览器。

(jsp)

#### 为什么要使用SSR

SSR是直接将渲染好的html返回到客户端 无需通过js进行操作

所以对SEO优化以及渲染速度均有比较好的优化效果

#### 服务端

我们通过koa+koa-router实现一个简单的服务端接口。

```js
const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()

app.use(router.routes())
app.listen(3000)
```

#### vue-server-renderer

```js
// vue2
const Vue = require('vue')
const renderer = require('vue-server-renderer').createRenderer()

const app = new Vue({
  data: () => ({ msg: 'hello' }),
  template: `<div>{{ msg }}</div>`
})

renderer.renderToString(app, (err, html) => {
  //渲染得到的字符串作为回调函数的第二个参数传入
  console.log(html)
})

// vue3
const { createSSRApp } = require('vue')
const { renderToString } = require('@vue/server-renderer')

const app = createSSRApp({
  data: () => ({ msg: 'hello' }),
  template: `<div>{{ msg }}</div>`
})

;(async () => {
  const html = await renderToString(app)
  console.log(html)
})()
```

#### 变得复杂

前面只是直接将app中的模板打印出来，并没有做到真实将html渲染到页面当中，所以接下来我们创建一个html模板，通过html模板来实现类似vue中的渲染操作。

```html
<!-- html模板 -->
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
<div id="app"></div>
</body>
</html>
```

```js
const Koa = require("koa");
const Router = require("koa-router");
const fs = require("fs");
const { renderToString } = require("@vue/server-renderer");
const { createSSRApp } = require('vue')

const app = new Koa();
const router = new Router();
const templateHTML = fs.readFileSync("./index.html", "utf-8");

const page = createSSRApp({
  template: '<div>{{msg}}</div>',
  setup() {
    return {
      msg: '这里是通过ssr渲染出来的html页面'
    }
  }
})

router.get("/(.*)", async ctx => {
  const appContent = await renderToString(page)
  ctx.body = templateHTML.replace('<div id="app">', `<div id="app">${appContent}`)
});
```

#### 通用代码

在编写单独的客户端代码时，每个用户都会在各自的浏览器中使用一个干净的实例(上下文、this)。

但是Node服务器是长期运行的进程，当代码第一次被导入进程时，它会被执行一次然后保存到内存当中。它将被共享于每次发来的请求之间。

所以为了保证我们在每个请求时都拥有一个干净且互相隔离的应用实例，我们需要编写一个工厂函数来重复地执行，并为每个请求创建干净的应用实例(vue.js官网称为避免有状态的单例模式)。

```js
// app.js
const { createSSRApp } = require('vue')

function createApp() {
  return createSSRApp({
    template: `<div>{{msg}}</div>`,
    setup() {
      return {
        msg: '这里是通过ssr渲染出来的html页面'
      }
    }
  })
}

module.exports = {
  createApp,
};
```

#### 构建

至此为止我们是完全通过服务端直接渲染静态html，并没有真实用到vue的能力。所以接下来我们要搭建一个真实的vue项目。

但同时我们面临着一个问题，至此我们依然没有真正使用到`.vue`文件，这样终归是不利于我们开发的。所以自然而然我们就能想到通过webpack处理服务端代码，通过`vue-loader`处理`.vue`文件，还能处理node中无法处理的CSS文件。

同时我们还需要分隔客户端构建，因为除了node，我们还需要处理低版本浏览器的兼容性。

所以我们会使用webpack同时打包客户端和服务端应用。服务端的包会被引入到服务端用来渲染html，客户端的包将会被送至浏览器用于hydrate静态标记。

![786a415a-5fee-11e6-9c11-45a2cfdf085c](https://cloud.githubusercontent.com/assets/499550/17607895/786a415a-5fee-11e6-9c11-45a2cfdf085c.png)

```js
// main.js
import { createSSRApp } from 'vue'
import App from './App.vue'

// 创建根组件的工厂函数 同上
export default function createApp() {
  const app = createSSRApp(App)

  return {
    app
  }
}
// entry-client.js
import createApp from "./main";

const { app } = createApp()

app.mount('#app')
// entry-server.js
import createApp from "./main";

export default function() {
  const { app } = createApp()

  return {
    app
  }
}
```

#### 构建配置

SSR渲染项目的webpack配置与客户端项目大体比较相似，但是也有几个关键点不尽相同：

1. 我们需要专门为服务端代码创建一个webpack manifest。
2. 我们应该将应用依赖变为外部扩展使服务端构建可以更快的生成更小的包文件。
3. 我们需要将webpack的编译目标改为node。
4. 构建服务端入口时，需要定义环境变量指明当前位服务端渲染。

```js
// vue.config.js
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const nodeExternals = require('webpack-node-externals')
const webpack = require('webpack')

module.exports = {
  chainWebpack: webpackConfig => {
    // 我们需要禁用 cache loader，否则客户端构建会从服务端构建使用缓存过的组件
    webpackConfig.module.rule('vue').uses.delete('cache-loader')
    webpackConfig.module.rule('js').uses.delete('cache-loader')
    webpackConfig.module.rule('ts').uses.delete('cache-loader')
    webpackConfig.module.rule('tsx').uses.delete('cache-loader')

    if (!process.env.SSR) {
      // 将入口指向应用的客户端入口文件
      webpackConfig
        .entry('app')
        .clear()
        .add('./src/entry-client.js')
      return
    }

    // 将入口指向应用的服务端入口文件
    webpackConfig
      .entry('app')
      .clear()
      .add('./src/entry-server.js')

    // 这允许 webpack 以适合于 Node 的方式处理动态导入，
    // 同时也告诉 `vue-loader` 在编译 Vue 组件的时候抛出面向服务端的代码。
    webpackConfig.target('node')
    // 这会告诉服务端的包使用 Node 风格的导出
    webpackConfig.output.libraryTarget('commonjs2')

    webpackConfig
      .plugin('manifest')
      .use(new WebpackManifestPlugin({ fileName: 'ssr-manifest.json' }))

    // https://webpack.js.org/configuration/externals/#function
    // https://github.com/liady/webpack-node-externals
    // 将应用依赖变为外部扩展。
    // 这使得服务端构建更加快速并生成更小的包文件。

    // 不要将需要被 webpack 处理的依赖变为外部扩展
    // 也应该把修改 `global` 的依赖 (例如各种 polyfill) 整理成一个白名单
    webpackConfig.externals(nodeExternals({ allowlist: /\.(css|vue)$/ }))

    webpackConfig.optimization.splitChunks(false).minimize(false)

    webpackConfig.plugins.delete('preload')
    webpackConfig.plugins.delete('prefetch')
    webpackConfig.plugins.delete('progress')
    webpackConfig.plugins.delete('friendly-errors')

    webpackConfig.plugin('limit').use(
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      })
    )
  }
}
// package.json
...
"scripts": {
  "build:client": "vue-cli-service build --dest dist/client",
  "build:server": "SSR=1 vue-cli-service build --dest dist/server",
  "build": "npm run build:client && npm run build:server"
}
```

#### 服务端改造

webpack配置好，还需要对原本的服务端代码进行改造

```js
// server/server.js
const path = require('path')
const fs = require('fs')
const Koa = require("koa");
const Router = require("koa-router");
const manifest = require('../dist/server/ssr-manifest.json')
const {renderToString} = require("@vue/server-renderer");

const app = new Koa();
const router = new Router();

// 读取manifest文件中入口文件的真实路径
const appPath = path.join(__dirname, '../dist', 'server', manifest['app.js'])
// 读取html模板
const indexTemplate = fs.readFileSync(
	path.join(__dirname, '../dist/client/index.html'),
	'utf-8'
)

const createApp = require(appPath).default

router.get("/(.*)", async ctx => {
	const { app: page } = createApp()
	const appContent = await renderToString(page)
	ctx.body = indexTemplate.replace('<div id="app">', `<div id="app">${appContent}`)
});

app.use(router.routes());

app.listen(2233, () => {
	console.log("http://localhost:2233 端口已启动");
});
```

#### 处理静态资源

![image-20210809110932876](file:///Users/zhangyuxuan/Downloads/2021-01-08-webpack-02/%E8%AF%BE%E4%BB%B6/assets/image-20210809110932876.png?lastModify=1629439371)

服务端改造后我们还需要处理静态资源，由于我们直接将html文件通过fs模块进行读取，导致无法正确加载静态资源，所以我们需要`koa-static`处理静态资源：

```
app.use(serve(path.join(__dirname, '../dist/client')))
```

#### "前端"路由

现在我们使用`vue-router`给项目添加路由，首先路由需要像应用实例一样，在每个请求都需要有一个干净的实例，所以我们实现一个`createRouter`函数：

```js
// router.js
import {createMemoryHistory, createRouter as cr, createWebHistory} from "vue-router";
import Home from "@/views/Home";
import About from "@/views/About";

// 判断是否为服务端环境
const isServer = typeof window === 'undefined';
// 如果为服务端环境下，使用缓存路由
const history = isServer ? createMemoryHistory() : createWebHistory()

const routes = [
	{
		path: '/home',
		component: Home
	},
	{
		path: '/about',
		component: About
	}
]

export default function createRouter() {
  
	return cr({ routes, history })
}
```

实现创建路由函数后在创建app实例中注册路由：

```js
// main.js
export default function createApp() {
	const app = createSSRApp(App)
	const router = createRouter()

	app.use(router)

	return {
		app,
		router
	}
}
```

服务端/客户端入口文件导出router：

```js
// entry-client.js
const { app, router } = createApp()

app.mount('#app')
// entry-server.js
export default function() {
	const { app, router } = createApp()

	return {
		app,
		router
	}
}
```

针对服务端代码进行修改：

```js
// server.js
router.get("/(.*)", async ctx => {
	const { app: page, router: vueRouter } = createApp()
	await vueRouter.push(ctx.url)
	await vueRouter.isReady()

	const appContent = await renderToString(page)
	ctx.body = indexTemplate.replace('<div id="app">', `<div id="app">${appContent}`)
});
```

#### 客户端激活

Hydration 是在 Vue 在获取静态 HTML，从服务端发出，然后转化为可反应客户端数据变化的动态 DOM 的过程中被引入到客户端的。

因为服务端已经渲染出了标记，我们显然不希望将其扔掉并重新创建所有的 DOM 元素。取而代之的是我们想要“hydrate”这些静态标记并使其变得可交互。

Vue 提供了一个 `createSSRApp` 方法用来在客户端代码中 (在这个例子中是 `entry-client.js`) 告诉 Vue hydrate 现有的静态 HTML 而不是重新创建所有的 DOM 元素。

#### Hydration 警告

确保 SSR 工作的第一个关键是确保应用在客户端和服务端的状态一致。密切留意不要依赖浏览器特有的 API (如窗口宽度、设备能力或 localStorage) 或服务器特有的 API (如 Node 内置的)，且留意在不同环境下输出不同结果的代码 (诸如时区、时间戳、规范化 URL 或生成随机数字)。

第二个关键是留意 SSR + 客户端 hydration 时 HTML 的有效性会因浏览器不同而不同。例如在 Vue 模板中编写：

```html
<table>
  <tr>
    <td>hi</td>
  </tr>
</table>
```

浏览器会在 `<table>` 内自动注入 `<tbody>`，然而通过 Vue 生成的虚拟 DOM 并不会包含 `<tbody>`，因此会导致不匹配。为了确保匹配正确，请确保模板中编写的 HTML 是有效的。

