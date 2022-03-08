import { ref } from 'vue'
import { useFetch } from './fetch'

export async function useBlogs() {
	const loading = ref(false)
	const { response: blogs, request } = useFetch(
		'https://jsonplaceholder.typicode.com/posts'
	)

	if (!loading.value) {
		await request()
		loading.value = true
	}

	return { blogs }
}
