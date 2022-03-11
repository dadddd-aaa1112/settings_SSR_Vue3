<template>
	<div class="container mx-auto px-4">
		<select v-model="sortBy">
			<option value="title">Сортировать по заголовкам</option>
			<option value="body">Сортировать по содержанию</option>
		</select>
		<button class="bg-metal rounded" @click="trueZtoA">Сортировка A..Z</button>
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
import { usePagination } from '../use/pagination'

import AddBlog from '@/pages/AddBlog'
import { ref } from 'vue'

export default {
	components: {
		AddBlog,
	},
	setup() {
		const { removeItem, blogs } = useBlogsFunction()
		const {
			countPage,
			page,
			limit,
			changePage,
			prevPage,
			nextPage,
			fetchAllBlogs,
		} = usePagination(blogs)

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
