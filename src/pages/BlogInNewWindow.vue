<template>
	<div>
		<h1>page with id = {{ $route.params.id }}</h1>

		<p>name {{ id }}</p>
		<p>name {{ idItem.title }}</p>
		<p>name {{ idItem.body }}</p>

		<button @click="$router.push('/')">Вернуться на главную страницу</button>
	</div>
</template>

<script>
import { useRoute } from 'vue-router'
//import { onMounted } from 'vue'
import { useBlogsFunction } from '@/use/blogsFunction'

export default {
	setup() {
		const { idItem, fetchIdBlogs } = useBlogsFunction()
		const route = useRoute()
		const id = route.params.id

		fetchIdBlogs(id)
		return {
			id,
			fetchIdBlogs,
			idItem,
		}
	},
}
</script>

<style></style>
