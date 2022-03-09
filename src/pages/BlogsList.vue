<template>
	<div class="card">
		<ul class="list">
			<li class="list-item" v-for="blog in blogs" :key="blog.id">
				<span>{{ blog.id }}. {{ blog.title }} </span>
				<p>{{ blog.body }}</p>
				<button class="btgroup">открыть в новом окне</button>
				<button class="btgroup">редактировать</button>
				<button class="btgroup">удалить</button>
			</li>
		</ul>
	</div>
</template>

<script>
import { useBlogsFunction } from '../use/blogsFunction'

export default {
	setup() {
		const { blogs, fetchAllBlogs } = useBlogsFunction()

		return {
			blogs,
			fetchAllBlogs,
		}
	},
}
</script>

<style>
.list-item {
	border: 1px solid grey;
	margin-bottom: 5px;
}

.btgroup {
	margin-right: 5px;
	align-self: end;
}
</style>
