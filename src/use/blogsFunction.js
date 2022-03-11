import { ref } from 'vue'
import axios from 'axios'

const BASE_URL = `https://jsonplaceholder.typicode.com/posts`
const blogs = ref([])
const idItem = ref(null)

export function useBlogsFunction() {
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
			await axios.put(BASE_URL + `/${id}`, {
				item,
			})
			blogs.value = blogs.value.map((blog) => {
				if (blog.id === id) {
					blog.title = item.title
					blog.body = item.body
				}
				return blog
			})
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
		removeItem,
		addItem,
		saveIdBlogs,
	}
}
