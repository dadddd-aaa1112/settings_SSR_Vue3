import { computed, ref } from 'vue'
export function useSearchAndFilters(blogs) {
	const sortBy = ref('title')
	const searchQuery = ref('')
	const ZtoA = ref(true)

	const falseZtoA = () => {
		ZtoA.value = false
	}

	const trueZtoA = () => {
		ZtoA.value = true
	}

	const sorteredItems = computed(() => {
		return [...blogs.value].sort((post1, post2) =>
			post1[sortBy.value]?.localeCompare(post2[sortBy.value])
		)
	})

	const sorteredItemsZtoA = computed(() => {
		return [...blogs.value].sort((post1, post2) =>
			post2[sortBy.value]?.localeCompare(post1[sortBy.value])
		)
	})

	const sortedAndSearchedPosts = computed(() => {
		return sorteredItems.value.filter((post) =>
			post.title.toLowerCase().includes(searchQuery.value.toLowerCase())
		)
	})

	const sortedAndSearchedPostsZtoA = computed(() => {
		return sorteredItemsZtoA.value.filter((post) =>
			post.title.toLowerCase().includes(searchQuery.value.toLowerCase())
		)
	})

	return {
		sortBy,
		searchQuery,
		sorteredItems,
		sortedAndSearchedPosts,
		sorteredItemsZtoA,
		sortedAndSearchedPostsZtoA,
		ZtoA,
		falseZtoA,
		trueZtoA,
	}
}
