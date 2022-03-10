import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router'
import AddBlog from '@/pages/AddBlog'
import BlogsList from '@/pages/BlogsList'
import BlogInNewWindow from '@/pages/BlogInNewWindow'
import BlogsEdit from '@/pages/BlogsEdit'
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
	{
		path: '/blogs/:id',
		component: BlogInNewWindow,
	},
	{
		path: '/blogs/edit/:id',
		component: BlogsEdit,
	},
]

export default function createApplicationRouter() {
	const router = createRouter({
		routes,
		history: isSSR() ? createMemoryHistory() : createWebHistory(),
	})

	return router
}
