import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router'
import AddBlog from '@/pages/AddBlog'
import BlogsList from '@/pages/BlogsList'
import { isSSR } from '@/helpers'

const routes = [
	{
		path: '/',
		component: BlogsList,
	},
	{
		path: '/add',
		component: AddBlog,
	},
]

export default function createApplicationRouter() {
	const router = createRouter({
		routes,
		history: isSSR() ? createMemoryHistory() : createWebHistory(),
	})

	return router
}
