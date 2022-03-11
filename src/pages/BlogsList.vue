<template>
	<div class="container mx-auto">
		<div class="flex">
			<AddBlog />
			<div class="w-2/5 my-4 py-2">
				<select class="text-base font-serif" v-model="sortBy">
					<option class="text-base font-serif" value="title">
						Сортировать по заголовкам
					</option>
					<option class="text-base font-serif" value="body">
						Сортировать по содержанию
					</option>
				</select>
				<div class="py-2">
					<button
						class="bg-dark_green hover:bg-dark_grey text-white font-bold py-2 px-4 my-2 mx-2 rounded text-base"
						@click="trueZtoA"
					>
						Сортировка А..Я
					</button>
					<button
						class="bg-dark_green hover:bg-dark_grey text-white font-bold py-2 px-4 my-2 mx-2 rounded text-base"
						@click="falseZtoA"
					>
						Сортировка Я..А
					</button>
				</div>

				<input v-model="searchQuery" placeholder="Поиск...." />
			</div>
		</div>
		<img class="spiner" v-if="isLoading" :src="require('/src/assets/1.gif')" />
		<div v-else>
			<ul>
				<li
					class="border-y-2 border-black my-4 bg-light"
					v-for="blog in ZtoA
						? sortedAndSearchedPosts
						: sortedAndSearchedPostsZtoA"
					:key="blog.id"
				>
					<div
						class="transition duration-500 ease-in-out bg-light hover:bg-vanil rounded-md p-8"
					>
						<h3>{{ blog.title }}</h3>
						<p>{{ blog.body }}</p>
					</div>
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
				class="my-2 mx-2 text-base font-serif"
				v-for="pageNumber in countPage"
				:key="pageNumber"
				@click="changePage(pageNumber)"
			>
				{{ pageNumber }}
			</span>
			<div class="flex">
				<button
					class="bg-dark_green hover:bg-dark_grey text-white font-bold py-2 px-4 my-2 mx-2 rounded text-base"
					@click="prevPage"
				>
					Предыдущая страница
				</button>
				<button
					class="bg-dark_green hover:bg-dark_grey text-white font-bold py-2 px-4 my-2 mx-2 rounded text-base"
					@click="nextPage"
				>
					Следующая страница
				</button>
			</div>
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
.spiner {
	width: 150px;
}

.current-page {
	border: 2px solid black;
}
</style>
