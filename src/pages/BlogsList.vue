<template>
	<div class="card">
		<select v-model="sortBy">
			<option value="title">Сортировать по заголовкам</option>
			<option value="body">Сортировать по содержанию</option>
		</select>

		<hr />
		<input v-model="searchQuery" placeholder="Поиск...." />
		<hr />
		<AddBlog />
		<hr />
		<img class="spiner" v-if="isLoading" :src="require('/src/assets/1.gif')" />
		<div v-else>
			<ul class="list">
				<li
					class="list-item"
					v-for="blog in sortedAndSearchedPosts"
					:key="blog.id"
				>
					<span>{{ blog.id }}. {{ blog.title }} </span>
					<p>{{ blog.body }}</p>
					<button class="btgroup" @click="$router.push(`/blogs/${blog.id}`)">
						открыть в новом окне
					</button>
					<button
						class="btgroup"
						@click="$router.push(`/blogs/edit/${blog.id}`)"
					>
						редактировать
					</button>
					<button class="btgroup" @click="removeItem(blog.id)">удалить</button>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { useBlogsFunction } from '../use/blogsFunction'

import AddBlog from '@/pages/AddBlog'
import { onMounted, computed, ref } from 'vue'

export default {
	components: {
		AddBlog,
	},
	setup() {
		const { blogs, fetchAllBlogs, removeItem } = useBlogsFunction()

		const isLoading = ref(true)

		const loaded = () => {
			onMounted(fetchAllBlogs)
			isLoading.value = false
		}
		loaded()

		const sortBy = ref('title')
		const searchQuery = ref('')

		const sorteredItems = computed(() => {
			return [...blogs.value].sort((post1, post2) =>
				post1[sortBy.value]?.localeCompare(post2[sortBy.value])
			)
		})

		const sortedAndSearchedPosts = computed(() => {
			return sorteredItems.value.filter((post) =>
				post.title.toLowerCase().includes(searchQuery.value.toLowerCase())
			)
		})

		console.log(sortedAndSearchedPosts)

		return {
			blogs,
			fetchAllBlogs,
			removeItem,
			isLoading,
			loaded,
			sortBy,
			sorteredItems,
			searchQuery,
			sortedAndSearchedPosts,
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
}

.spiner {
	width: 150px;
}
</style>
