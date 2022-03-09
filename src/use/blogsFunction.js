import { ref } from 'vue'
import axios from 'axios'

const BASE_URL = `https://jsonplaceholder.typicode.com/posts`

const blogs = ref([])
const idItem = ref([])
export function useBlogsFunction() {
	const fetchAllBlogs = async () => {
		try {
			const response = await axios.get(BASE_URL)
			blogs.value = response.data
		} catch (error) {
			console.log(error)
		}
	}

	const fetchIdBlogs = async (id) => {
		try {
			const response = await axios.get(BASE_URL + `/${id}`)
			idItem.value = response.data
		} catch (error) {
			console.log(error)
		}
	}

	const saveIdBlogs = async (id, item) => {
		try {
			const response = await axios.put(BASE_URL + `/${id}`, {
				item,
			})
			blogs.value = response.data

			console.log('success update')
		} catch (error) {
			console.log(error)
		}
	}

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

	return {
		blogs,
		idItem,
		fetchIdBlogs,
		fetchAllBlogs,
		removeItem,
		addItem,
		saveIdBlogs,
	}
}
