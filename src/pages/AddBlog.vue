<template>
	<div>
		<form @submit.prevent="submit">
			<h4>Create blogs</h4>
			<input placeholder="Название blogs" v-model="form.title" />

			<input placeholder="Описание рецепта" v-model="form.body" />
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
			body: '',
		})

		const formError = ref('')

		const submit = () => {
			if (form.title.trim().length > 3 && form.body.trim().length > 3) {
				const item = {
					title: form.title.trim(),
					body: form.body.trim(),
					id: uniqid(),
				}

				addItem(item)
				formError.value = ''
				form.title = ''
				form.body = ''
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
