import { createSSRApp } from "vue";
import App from './App'
import createRouter from "./router";

export default function createApp() {
	const app = createSSRApp(App)
	const router = createRouter()

	app.use(router)

	return {
		app,
		router
	}
}
