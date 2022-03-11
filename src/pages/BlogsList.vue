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
			<ul class="list">
				<li
					class="list-item"
					v-for="blog in ZtoA
						? sortedAndSearchedPosts
						: sortedAndSearchedPostsZtoA"
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

			<span
				:class="{ 'current-page': page === pageNumber }"
				class="btgroup"
				v-for="pageNumber in countPage"
				:key="pageNumber"
				@click="changePage(pageNumber)"
			>
				{{ pageNumber }}
			</span>
			<button class="btgroup" @click="prevPage">Prev page</button>
			<button class="btgroup" @click="nextPage">Next page</button>
		</div>
	</div>
</template>

<script>
import { useBlogsFunction } from '../use/blogsFunction'
import { useSearchAndFilters } from '../use/searchAndFilters'
import axios from 'axios'
import AddBlog from '@/pages/AddBlog'
import { ref } from 'vue'

export default {
	components: {
		AddBlog,
	},
	setup() {
		const { blogs, removeItem } = useBlogsFunction()

		const countPage = ref(0)
		const page = ref(8)
		const limit = ref(7)
		const BASE_URL = `https://jsonplaceholder.typicode.com/posts`

		const fetchAllBlogs = async () => {
			try {
				const response = await axios.get(BASE_URL, {
					params: {
						_page: page.value,
						_limit: limit.value,
					},
				})
				countPage.value = Math.ceil(
					response.headers['x-total-count'] / limit.value
				)
				blogs.value = response.data
			} catch (error) {
				console.log(error)
			}
		}

		const changePage = (pageNumber) => {
			page.value = pageNumber
			fetchAllBlogs()
		}

		const prevPage = () => {
			if (page.value > 1) {
				page.value--
				fetchAllBlogs()
			} else {
				page.value = 1
			}
		}

		const nextPage = () => {
			if (page.value < countPage.value) {
				page.value++
				fetchAllBlogs()
			} else {
				page.value = countPage.value
			}
		}

		const isLoading = ref(true)

		const loaded = () => {
			fetchAllBlogs()
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
			countPage,
			page,
			limit,
			changePage,
			prevPage,
			nextPage,
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

.pages {
	margin: 2px 5px;
}

.current-page {
	border: 1px solid purple;
}
</style>
