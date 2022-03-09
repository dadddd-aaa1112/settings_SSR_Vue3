<template>
	<div>
		<form @submit.prevent="submit">
			<h4>Create blogs</h4>
			<input placeholder="Название blogs" v-model="form.title" />

			<input placeholder="Описание рецепта" v-model="form.description" />
			<p>{{ formError }}</p>
			<button type="submit">create blogs</button>
		</form>
	</div>
</template>

<script>
import { useBlogsFunction } from '../use/blogsFunction'
import { reactive, ref } from 'vue'
import uniqid from 'uniqid'

export default {
	setup() {
		const { blogs, addItem } = useBlogsFunction()

		const form = reactive({
			title: '',
			description: '',
		})

		const formError = ref('')

		const submit = () => {
			if (form.title.trim().length > 3 && form.description.trim().length > 3) {
				const item = {
					title: form.title.trim(),
					description: form.description.trim(),
					id: uniqid(),
				}

				addItem(item)
				formError.value = ''
				form.title = ''
				form.description = ''
			} else {
				formError.value = 'Блог не может быть пустым или меньше 3 символов'
			}
		}

		return {
			blogs,
			addItem,
			form,
			submit,
			formError,
		}
	},
}
</script>

<style></style>
