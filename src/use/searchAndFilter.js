import { ref, computed } from 'vue'

export function useSortedPosts(posts) {
	const selectedSort = ref('')
	const sortedPosts = computed(() => {
		return [...posts.value].sort((post1, post2) =>
			post1[selectedSort.value]?.localeCompare(post2[selectedSort.value])
		)
	})

	return {
		selectedSort,
		sortedPosts,
	}
}

export function useSearchPosts(sortedPosts) {
	const searchQuery = ref('')

	const sortedAndSearchedPosts = computed(() => {
		return sortedPosts.value.filter((post) =>
			post.title.toLowerCase().includes(searchQuery.value.toLowerCase())
		)
	})

	return {
		searchQuery,
		sortedAndSearchedPosts,
	}
}
