import { computed, ref } from 'vue'
export function useSearchAndFilters(blogs) {
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

	return {
		sortBy,
		searchQuery,
		sorteredItems,
		sortedAndSearchedPosts,
	}
}
