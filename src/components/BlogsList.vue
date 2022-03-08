<template>
	<div class="card">
		<ul class="list">
			<li class="list-item" v-for="blog in blogs" :key="blog.id">
				{{ blog }}
			</li>
		</ul>
	</div>
</template>

<script>
import { useBlogs } from '../use/blogs'

export default {
	async setup() {
		const { blogs } = await useBlogs()
		return { blogs }
	},
}
</script>

<style></style>
