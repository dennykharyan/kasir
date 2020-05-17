import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
	model: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'Index',
			component: () => import('../views/Main.vue'),
			meta: {
				title: 'main',
				metaTags: [
					{
						name: 'desciption',
						content: ''
					},
					{
						property: '',
						content: ''
					}
				]
			}
		}
	],
	scrollBehavior (to, from, savedPosition) {
		return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({ x: 0, y: 0 })
            }, 300)
        })
	}
})

export default router
