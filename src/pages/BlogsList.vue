<template>
	<div class="card">
		<ul class="list">
			<li class="list-item" v-for="blog in blogs" :key="blog.id">
				<span>{{ blog.id }}. {{ blog.title }} </span>
				<p>{{ blog.body }}</p>
				<button class="btgroup" @click="$router.push(`/blogs/${blog.id}`)">
					открыть в новом окне
				</button>
				<button class="btgroup" @click="$router.push(`/blogs/edit/${blog.id}`)">
					редактировать
				</button>
				<button class="btgroup" @click="removeItem(blog.id)">удалить</button>
			</li>
		</ul>
		<BlogsItem :title="title" />
	</div>
</template>

<script>
import { useBlogsFunction } from '../use/blogsFunction'
import BlogsItem from '@/pages/BlogsItem'

export default {
	components: {
		BlogsItem,
	},
	setup() {
		const { blogs, fetchAllBlogs, removeItem } = useBlogsFunction()

		return {
			blogs,
			fetchAllBlogs,
			removeItem,
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
