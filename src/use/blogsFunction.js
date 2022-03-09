import { ref, onMounted } from 'vue'
import axios from 'axios'

const blogs = ref([])
const BASE_URL = `https://jsonplaceholder.typicode.com/posts`

export function useBlogsFunction() {
	const currentValue = ref(null)

	const fetchAllBlogs = async () => {
		try {
			const response = await axios.get(BASE_URL)
			blogs.value = response.data
		} catch (error) {
			console.log(error)
		}
	}
	onMounted(fetchAllBlogs)
	const removeItem = async (id) => {
		try {
			await axios.delete(BASE_URL + `/${id}`)
			blogs.value = blogs.value.filter((blog) => blog.id !== id)
			console.log('remove success')
		} catch (error) {
			console.log(error)
		}
	}

	const addItem = async (item) => {
		try {
			await axios.post(BASE_URL, {
				item,
			})
			blogs.value.push(item)
			console.log('addItem success')
		} catch (error) {
			console.log(error)
		}
	}

	const selectItem = (id) => {
		currentValue.value = blogs.value.find((blog) => blog.id === id)
	}

	return {
		blogs,
		currentValue,
		fetchAllBlogs,
		removeItem,
		addItem,
		selectItem,
	}
}
