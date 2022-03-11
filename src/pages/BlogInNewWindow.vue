<template>
	<div>
		<h3>{{ idItem.title }}</h3>
		<p>{{ idItem.body }}</p>

		<button @click="$router.push('/')">Вернуться на главную страницу</button>
	</div>
</template>

<script>
import { useRoute } from 'vue-router'
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
