import axios from 'axios'
import { ref } from 'vue'

export function usePagination(blogs) {
	const countPage = ref(0)
	const page = ref(1)
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
	return {
		countPage,
		page,
		limit,
		changePage,
		prevPage,
		nextPage,
		fetchAllBlogs,
	}
}
