import createApp from "./main";

export default function () {
	const { app, router } = createApp()

	return {
		app,
		router
	}
}
