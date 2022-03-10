<template>
	<div class="card">
		<select v-model="sortBy">
			<option value="title">Сортировать по заголовкам</option>
			<option value="body">Сортировать по содержанию</option>
		</select>
		<button class="btgroup" @click="trueZtoA">Сортировка A..Z</button>
		<button class="btgroup" @click="falseZtoA">Сортировка Z..A</button>

		<hr />
		<input v-model="searchQuery" placeholder="Поиск...." />
		<hr />
		<AddBlog />
		<hr />
		<img class="spiner" v-if="isLoading" :src="require('/src/assets/1.gif')" />
		<div v-else>
			<ul class="list" v-if="ZtoA">
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

			<ul class="list" v-else>
				<li
					class="list-item"
					v-for="blog in sortedAndSearchedPostsZtoA"
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
import { useSearchAndFilters } from '../use/searchAndFilters'

import AddBlog from '@/pages/AddBlog'
import { onMounted, ref } from 'vue'

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

		const {
			sortBy,
			searchQuery,
			sorteredItems,
			sortedAndSearchedPosts,
			sorteredItemsZtoA,
			sortedAndSearchedPostsZtoA,
			ZtoA,
			falseZtoA,
			trueZtoA,
		} = useSearchAndFilters(blogs)

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
			sorteredItemsZtoA,
			sortedAndSearchedPostsZtoA,
			ZtoA,
			falseZtoA,
			trueZtoA,
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
	margin: 15px;
}

.spiner {
	width: 150px;
}
</style>
