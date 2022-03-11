<template>
	<div class="w-3/5 my-4">
		<h2 v-if="isCreate">Блог создан</h2>
		<form v-else @submit.prevent="submit">
			<h1>Создать блог</h1>
			<div class="py-1">
				<input placeholder="Название блога" v-model="form.title" />
			</div>
			<div class="py-1">
				<input placeholder="Описание блога" v-model="form.body" />
			</div>
			<p>{{ formError }}</p>
			<button class="bg-dark_green hover:bg-dark_grey" type="submit">
				Создать блог
			</button>
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
		const isCreate = ref(false)

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
				isCreate.value = true

				const intervalId = setInterval(() => {
					isCreate.value = false
					clearInterval(intervalId)
				}, 1500)
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
			isCreate,
		}
	},
}
</script>

<style></style>
